import { DropDown, FilterIcon, ResponsiveTable, SearchBox } from '../components'
import React, { useEffect, useRef, useState } from 'react'
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil'

import { Container } from './ProductManagementStyle'
import { Pagination } from '../components'
import { atomState } from '../Atoms/'
import { debounce } from 'lodash'
import { request } from '../Services'
import { useHistory } from 'react-router-dom'

const ProductManagement = () => {
  const history = useHistory()
  const userState = useRecoilValue(atomState.userState)
  const setModalState = useSetRecoilState(atomState.modalState)
  const resetDefaultModalState = useResetRecoilState(atomState.modalState)
  const [numberPerPage, setNumberPerPage] = useState(20)
  const [activePage, setActivePage] = useState(1)
  const [totalPage, setTotalPage] = useState([])
  const [totalRecord, setTotalRecord] = useState(null)
  const [refreshFlag, setRefreshFlag] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [productListState, setProductListState] = useRecoilState(
    atomState.productListState,
  )
  const scrollRef = useRef([])
  const searchRef = useRef()
  const dropDownRef = useRef()
  const [filter, setFilter] = useState({
    available: false,
    notAvailable: false,
  })
  const [search, setSearch] = useState({ status: false, data: [], text: '' })
  const [sort, setSort] = useState({ column: null, desc: false })

  const queryParams = {
    column: sort.column,
    desc: sort.desc,
    search: search.text === '' ? null : search.text,
    status: (() => {
      if (
        (filter.available && filter.notAvailable) ||
        (!filter.available && !filter.notAvailable)
      ) {
        console.log('both')
        return null
      } else if (filter.available) {
        return '1'
      } else if (filter.notAvailable) {
        return '0'
      } else {
        return null
      }
    })(),
    page: activePage,
    numberPerPage,
  }

  const dismissModal = () => resetDefaultModalState()

  const getProductsList = async () => {
    try {
      const { success, result, totalPages, totalRecords } = await request(
        '/products',
        queryParams,
        userState.accessToken,
        'get',
      )
      if (success) {
        console.log(result)
        const temp = []
        for (let i = 1; i <= totalPages; i = i + 1) {
          temp.push(i)
        }
        setTotalPage(temp)
        setProductListState(result)
        setTotalRecord(totalRecords)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const searchProductList = async () => {
    try {
      if (search.text === '') {
        setSearch({ ...search, data: [] })
      } else {
        const { result } = await request(
          '/products',
          queryParams,
          userState.accessToken,
          'get',
        )

        if (result && result.length > 0) {
          setSearch((oldState) => ({ ...oldState, status: true, data: result }))
        } else {
          setSearch((oldState) => ({ ...oldState, status: false, data: [] }))
        }
      }
    } catch (error) {
      setSearch((oldState) => ({ ...oldState, status: false, data: [] }))
      console.log(error)
    }
  }

  const onClickPageNumber = (pageNumber) => setActivePage(pageNumber)

  const onSortByColumn = (columnType) =>
    setSort({ column: columnType, desc: !sort.desc })

  const onChangeNumberPerPage = (number, primaryIndex) => {
    dropDownRef.current.scrollTop = 40 * (primaryIndex - 1)
    setNumberPerPage(number)
    setActivePage(1)
  }

  const onToggleSwitch = async (primaryIndex) => {
    try {
      const cloneProductList = [...productListState]
      cloneProductList[primaryIndex] = {
        ...cloneProductList[primaryIndex],
        status: !cloneProductList[primaryIndex].status,
      }

      const { success } = await request(
        '/products',
        cloneProductList[primaryIndex],
        userState.accessToken,
        'delete',
      )

      if (success) {
        setProductListState(cloneProductList)
      }
    } catch (error) {
      console.log(error)
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

  const onSearchInputChange = debounce(
    (text) => setSearch({ ...search, text }),
    300,
  )

  const onSearchBoxBlur = () =>
    setSearch((oldState) => ({
      ...oldState,
      status: false,
      data: [],
    }))

  const onSearchBoxFocus = () =>
    setSearch((oldState) => ({ ...oldState, status: true, data: [] }))

  const onClearSearchBox = () => {
    searchRef.current.value = ''
    setSearch({ ...search, text: '' })
    setRefreshFlag(!refreshFlag)
  }

  const onSubmitSearch = (event) => {
    if (event.key === 'Enter') {
      setActivePage(1)
      setSearch({ ...search, status: false })
      setRefreshFlag(!refreshFlag)
    }
  }

  useEffect(() => {
    getProductsList()
  }, [sort, activePage, numberPerPage, filter, refreshFlag])

  useEffect(() => {
    searchProductList()
  }, [search.text])

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
  const itemPerPageList = [20, 40, 60, 80, 100]

  return (
    <Container //isSort={sort.status} sortType={sort.option.type}
    >
      <div className='header'>
        <span>Product Management</span>
      </div>
      <div className='content'>
        <div className='tools-bar-wrapper'>
          <div className='tools-bar'>
            <SearchBox
              ref={searchRef}
              onSearchInputChange={onSearchInputChange}
              onSubmitSearch={onSubmitSearch}
              onSearchBoxBlur={onSearchBoxBlur}
              onSearchBoxFocus={onSearchBoxFocus}
              onClearSearchBox={onClearSearchBox}
              text={search.text}
              data={search.data}
              status={search.status}
            />
          </div>
          <div className='tools-bar'>
            <div className='filter'>
              <div className='filter-button'>
                <FilterIcon width={30} />
                <div className='filter-options'>
                  <div className='options'>
                    <div className='options-name'>
                      <span>Status</span>
                    </div>
                    <div className='option-actions'>
                      <div className='checkbox'>
                        <label className='custom-checkbox'>
                          <input
                            type='checkbox'
                            checked={filter.available}
                            onChange={() => onCheckBoxChange('available')}
                          />
                          <span className='box' />
                        </label>
                        <span className='title'>Available</span>
                      </div>
                      <div className='checkbox'>
                        <label className='custom-checkbox'>
                          <input
                            type='checkbox'
                            checked={filter.notAvailable}
                            onChange={() => onCheckBoxChange('notAvailable')}
                          />
                          <span className='box' />
                        </label>
                        <span className='title'>Not Available</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='item-per-page-placeholder'>
              <span>Shows: </span>
            </div>
            <DropDown
              ref={dropDownRef}
              selectedValue={numberPerPage}
              choices={itemPerPageList}
              onSelect={onChangeNumberPerPage}
            />
            <div
              className='create-new-button'
              onClick={() => history.push('/product-management/create')}>
              Create
            </div>
          </div>
        </div>
        <ResponsiveTable
          ref={scrollRef}
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
        {productListState.length > 0 && (
          <div className='number-of-items-indicator'>
            Show {(activePage - 1) * numberPerPage + 1} -{' '}
            {(activePage - 1) * numberPerPage + productListState.length} of{' '}
            {totalRecord}
          </div>
        )}
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
