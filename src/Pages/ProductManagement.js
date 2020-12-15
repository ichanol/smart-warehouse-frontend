import {
  CreateButton,
  DropDown,
  FilterButton,
  NumberIndicator,
  Pagination,
  ResponsiveTable,
  SearchBox as useSearchBox,
} from '../components'
import React, { useEffect, useState } from 'react'
import { requestHandler, useAxios } from '../Services'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { Container } from './ProductManagementStyle'
import { atomState } from '../Atoms/'
import { useHistory } from 'react-router-dom'

const ProductManagement = () => {
  const titleArray = [
    { title: 'Serial number', type: 'product_id', isSort: true },
    { title: 'Product name', type: 'product_name', isSort: true },
    { title: 'Company', type: 'company_name', isSort: true },
    { title: 'Detail', type: 'detail', isSort: true },
    { title: 'Location', type: 'location', isSort: true },
    { title: 'Created at', type: 'created_at', isSort: true },
    { title: 'Updated at', type: 'updated_at', isSort: true },
    { title: 'Created by', type: 'created_by', isSort: true },
    { title: 'Actions', type: null, isSort: false },
  ]

  const fixedDataColumn = ['product_id', 'product_name']
  const scrollDataColumn = [
    'company_name',
    'detail',
    'location',
    'created_at',
    'updated_at',
    'created_by',
    'status',
  ]
  const centerColumn = ['created_by']
  const itemPerPageList = [
    { name: 10 },
    { name: 20 },
    { name: 30 },
    { name: 50 },
    { name: 100 },
  ]

  const history = useHistory()

  const setToastState = useSetRecoilState(atomState.toastState)
  const [productListState, setProductListState] = useRecoilState(
    atomState.productListState,
  )

  const [numberPerPage, setNumberPerPage] = useState(20)
  const [activePage, setActivePage] = useState(1)
  const [totalPage, setTotalPage] = useState([])
  const [totalRecord, setTotalRecord] = useState(null)
  const [sort, setSort] = useState({ column: null, desc: false })
  const [filter, setFilter] = useState({
    available: false,
    notAvailable: false,
  })
  const [searchSuggest, setSearchSuggest] = useState([])

  const statusFilterHandler = () => {
    if (
      (filter.available && filter.notAvailable) ||
      (!filter.available && !filter.notAvailable)
    ) {
      return null
    } else if (filter.available) {
      return '1'
    } else if (filter.notAvailable) {
      return '0'
    } else {
      return null
    }
  }

  const [
    searchText,
    searchTrigger,
    trigger,
    setTrigger,
    SearchBoxComponent,
  ] = useSearchBox(searchSuggest)

  const queryParams = {
    column: sort.column,
    desc: sort.desc,
    search: searchText === '' ? null : searchText,
    status: statusFilterHandler(),
    page: activePage,
    numberPerPage,
  }

  const [
    productListData,
    productListDataTrigger,
    setProductListDataTrigger,
    setFetchProductListData,
  ] = useAxios('/products', true, queryParams, 'get')

  const [
    searchProductListData,
    searchProductListDataTrigger,
    setSearchProductListDataTrigger,
    setFetchSearchProductListData,
  ] = useAxios('/products', true, queryParams, 'get')

  useEffect(() => {
    setFetchProductListData(true)
    const { result, totalPages, totalRecords } = productListData
    setProductListState(result)
    setTotalRecord(totalRecords)
    if (totalPages) {
      setTotalPage(new Array(totalPages).fill(1))
    } else {
      setTotalPage([])
    }
  }, [productListData])

  useEffect(() => {
    setProductListDataTrigger(!productListDataTrigger)
  }, [sort, numberPerPage, activePage, searchTrigger, filter])

  useEffect(() => {
    if (searchText !== '') {
      setFetchSearchProductListData(true)
      setSearchProductListDataTrigger(!searchProductListDataTrigger)
    }
  }, [searchText])

  useEffect(() => {
    setSearchSuggest(searchProductListData.result)
    setTrigger(!trigger)
  }, [searchProductListData])

  const onClickPageNumber = (pageNumber) => setActivePage(pageNumber)

  const onSortByColumn = (columnType) =>
    setSort({ column: columnType, desc: !sort.desc })

  const onChangeNumberPerPage = (index) => {
    setNumberPerPage(itemPerPageList[index].name)
    setActivePage(1)
  }

  const onToggleSwitch = async (primaryIndex) => {
    try {
      const cloneProductList = [...productListState]
      cloneProductList[primaryIndex] = {
        ...cloneProductList[primaryIndex],
        status: !cloneProductList[primaryIndex].status,
      }

      const { success } = await requestHandler(
        '/products',
        true,
        cloneProductList[primaryIndex],
        'delete',
      )

      if (success) {
        setProductListState(cloneProductList)
        setToastState((oldState) => [
          ...oldState,
          {
            onClick: () => {},
            title: 'Success',
            message: 'Update product successfully',
            dismiss: false,
            type: 'success',
          },
        ])
      }
    } catch (error) {
      setToastState((oldState) => [
        ...oldState,
        {
          onClick: () => {},
          title: 'Failed',
          message: 'Failed to update. Try again.',
          dismiss: false,
          type: 'error',
        },
      ])
    }
  }

  const onCheckBoxChange = (filterType) => {
    const filterOptions = { ...filter }
    filterOptions[filterType] = !filterOptions[filterType]
    setFilter(filterOptions)
    setActivePage(1)
  }

  const onEdit = (index) =>
    history.push(
      `/product-management/edit/${productListState[index].product_id}`,
    )

  return (
    <Container>
      <div className='header'>
        <span>Product Management</span>
      </div>
      <div className='content'>
        <div className='tools-bar-wrapper'>
          <div className='tools-bar'>{SearchBoxComponent}</div>
          <div className='tools-bar'>
            <div className='filter-wrapper'>
              <FilterButton
                filter={filter}
                onCheckBoxChange={onCheckBoxChange}
              />
            </div>
            <DropDown
              selectedValue={numberPerPage}
              choices={itemPerPageList}
              onSelect={onChangeNumberPerPage}
              fullWidth={false}
              placeholder
            />
            <div className='create-button-wrapper'>
              <CreateButton
                onCreateNew={() => history.push('/product-management/create')}
                onSelectFile={() => console.log('select file')}
                onDownloadTemplate={() => console.log('download')}
              />
            </div>
          </div>
        </div>
        <ResponsiveTable
          title={titleArray}
          data={productListState}
          sort={sort}
          onSortByColumn={onSortByColumn}
          onToggleSwitch={onToggleSwitch}
          onEdit={onEdit}
          fixedDataColumn={fixedDataColumn}
          scrollDataColumn={scrollDataColumn}
          centerColumn={centerColumn}
          actionColumn='status'
          deleteButton={false}
        />
        <NumberIndicator
          numberPerPage={numberPerPage}
          activePage={activePage}
          totalRecord={totalRecord}
          numberOfShown={productListState?.length}
        />
        <Pagination
          activePage={activePage}
          totalPage={totalPage}
          onChangePage={onClickPageNumber}
        />
      </div>
    </Container>
  )
}

export default ProductManagement
