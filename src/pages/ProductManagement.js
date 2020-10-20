import { DropDown, FilterIcon, ResponsiveTable, SearchBox } from '../components'
import React, { useEffect, useRef, useState } from 'react'
import { getRequest, putRequest } from '../Services'
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
  const [sort, setSort] = useState({
    status: false,
    option: { type: null, desc: false },
  })

  const dismissModal = () => resetDefaultModalState()

  const getProductsList = async (
    pageToFetch,
    sortingOptions,
    perPage = numberPerPage,
    filterOptions,
    keyword,
  ) => {
    try {
      let URL = `${
        process.env.REACT_APP_API
      }/products/${perPage}/${pageToFetch}?`

      if (
        (sortingOptions || sort.status) &&
        (filter.available || filter.notAvailable || filterOptions) &&
        (keyword || search.text)
      ) {
        if (sortingOptions) {
          URL = URL + sortingOptions
        } else if (sort.status) {
          URL = URL + `sort=${sort.option.type},${sort.option.desc}`
        } else {
          URL = URL
        }

        if (filterOptions?.available && filterOptions?.notAvailable) {
          URL = URL + '&status=2'
        } else if (filterOptions?.available) {
          URL = URL + '&status=1'
        } else if (filterOptions?.notAvailable) {
          URL = URL + '&status=0'
        } else if (filter.available && filter.notAvailable) {
          URL = URL + '&status=2'
        } else if (filter.available) {
          URL = URL + '&status=1'
        } else if (filter.notAvailable) {
          URL = URL + '&status=0'
        } else if (
          (!filter.available && !filter.notAvailable) ||
          (!filterOptions?.available && !filterOptions?.notAvailable)
        ) {
          URL = `${
            process.env.REACT_APP_API
          }/products/${perPage}/${pageToFetch}?`
          if (sortingOptions) {
            URL = URL + sortingOptions
          } else if (sort.status) {
            URL = URL + `sort=${sort.option.type},${sort.option.desc}`
          } else {
            URL = URL
          }
        } else {
          URL = URL
        }

        if (keyword) {
          URL = URL + `&search=${keyword}`
        } else if (search.text) {
          URL = URL + `&search=${search.text}`
        } else {
          URL = URL
        }
      } else if (
        (filter.available || filter.notAvailable || filterOptions) &&
        (keyword || search.text)
      ) {
        console.log('HEREEEEEEEEEEEEEEEEEE')
        if (filterOptions?.available && filterOptions?.notAvailable) {
          URL = URL + 'status=2'
        } else if (filterOptions?.available) {
          URL = URL + 'status=1'
        } else if (filterOptions?.notAvailable) {
          URL = URL + 'status=0'
        } else if (filter.available && filter.notAvailable) {
          URL = URL + 'status=2'
        } else if (filter.available) {
          URL = URL + 'status=1'
        } else if (filter.notAvailable) {
          URL = URL + 'status=0'
        } else if (
          (!filter.available && !filter.notAvailable) ||
          (!filterOptions?.available && !filterOptions?.notAvailable)
        ) {
          URL = `${
            process.env.REACT_APP_API
          }/products/${perPage}/${pageToFetch}?`
          if (sortingOptions) {
            URL = URL + sortingOptions
          } else if (sort.status) {
            URL = URL + `sort=${sort.option.type},${sort.option.desc}`
          } else {
            URL = URL
          }
        } else {
          URL = URL
        }

        if (keyword) {
          URL = URL + `&search=${keyword}`
        } else if (search.text) {
          URL = URL + `&search=${search.text}`
        } else {
          URL = URL
        }
      } else if ((sortingOptions || sort.status) && (keyword || search.text)) {
        if (sortingOptions) {
          URL = URL + sortingOptions
        } else if (sort.status) {
          URL = URL + `sort=${sort.option.type},${sort.option.desc}`
        } else {
          URL = URL
        }

        if (keyword) {
          URL = URL + `&search=${keyword}`
        } else if (search.text) {
          URL = URL + `&search=${search.text}`
        } else {
          URL = URL
        }
      } else if (
        (sortingOptions || sort.status) &&
        (filter.available || filter.notAvailable || filterOptions)
      ) {
        if (sortingOptions) {
          URL = URL + sortingOptions
        } else if (sort.status) {
          URL = URL + `sort=${sort.option.type},${sort.option.desc}`
        } else {
          URL = URL
        }

        if (filterOptions?.available && filterOptions?.notAvailable) {
          URL = URL + '&status=2'
        } else if (filterOptions?.available) {
          URL = URL + '&status=1'
        } else if (filterOptions?.notAvailable) {
          URL = URL + '&status=0'
        } else if (filter.available && filter.notAvailable) {
          URL = URL + '&status=2'
        } else if (filter.available) {
          URL = URL + '&status=1'
        } else if (filter.notAvailable) {
          URL = URL + '&status=0'
        } else if (
          (!filter.available && !filter.notAvailable) ||
          (!filterOptions?.available && !filterOptions?.notAvailable)
        ) {
          URL = `${
            process.env.REACT_APP_API
          }/products/${perPage}/${pageToFetch}?`
          if (sortingOptions) {
            URL = URL + sortingOptions
          } else if (sort.status) {
            URL = URL + `sort=${sort.option.type},${sort.option.desc}`
          } else {
            URL = URL
          }
        } else {
          URL = URL
        }
      } else if (keyword) {
        URL = URL + `&search=${keyword}`
      } else if (search.text) {
        URL = URL + `&search=${search.text}`
      } else if (sortingOptions) {
        URL = URL + sortingOptions
      } else if (sort.status) {
        URL = URL + `sort=${sort.option.type},${sort.option.desc}`
      } else if (filterOptions?.available && filterOptions?.notAvailable) {
        URL = URL + 'status=2'
      } else if (filterOptions?.available) {
        URL = URL + 'status=1'
      } else if (filterOptions?.notAvailable) {
        URL = URL + 'status=0'
      } else if (filter.available && filter.notAvailable) {
        URL = URL + 'status=2'
      } else if (filter.available) {
        URL = URL + 'status=1'
      } else if (filter.notAvailable) {
        URL = URL + 'status=0'
      } else if (
        (!filter.available && !filter.notAvailable) ||
        (!filterOptions?.available && !filterOptions?.notAvailable)
      ) {
        URL = `${process.env.REACT_APP_API}/products/${perPage}/${pageToFetch}?`
        if (sortingOptions) {
          URL = URL + sortingOptions
        } else if (sort.status) {
          URL = URL + `sort=${sort.option.type},${sort.option.desc}`
        } else {
          URL = URL
        }
      } else {
        URL = URL
      }
      const { success, result, totalPages, totalRecords } = await getRequest(
        URL,
        userState.accessToken,
      )
      console.log(URL)
      if (success) {
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

  const searchProductList = async (searchFor) => {
    try {
      const URL = `${process.env.REACT_APP_API}/products?search=${searchFor}`
      const { result } = await getRequest(URL, userState.accessToken)
      if (result.length > 0) {
        setSearch((oldState) => ({ ...oldState, status: true, data: result }))
      } else {
        setSearch((oldState) => ({ ...oldState, status: false, data: [] }))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onClickPageNumber = (pageNumber) => {
    setActivePage(pageNumber)
    getProductsList(pageNumber)
  }

  const onSortByColumn = (columnType) => {
    setSort({
      ...sort,
      status: true,
      option: { type: columnType, desc: !sort.option.desc },
    })
    const sortOptions = `sort=${columnType},${!sort.option.desc}`
    getProductsList(activePage, sortOptions)
  }

  const onChangeNumberPerPage = (number, primaryIndex) => {
    dropDownRef.current.scrollTop = 40 * (primaryIndex - 1)
    setNumberPerPage(number)
    setActivePage(1)
    getProductsList(1, null, number)
  }

  const onSearchInputChange = debounce((text) => {
    setSearch((oldState) => ({ ...oldState, text: text }))
    searchProductList(text)
  }, 500)

  const onToggleSwitch = async (primaryIndex) => {
    const cloneProductList = [...productListState]
    cloneProductList[primaryIndex] = {
      ...cloneProductList[primaryIndex],
      status: !cloneProductList[primaryIndex].status,
    }
    const URL = `${process.env.REACT_APP_API}/products`
    const { success } = await putRequest(
      URL,
      cloneProductList[primaryIndex],
      userState.accessToken,
    )
    if (success) {
      setProductListState(cloneProductList)
    }
  }

  const onSearchBoxBlur = () =>
    setSearch((oldState) => ({
      ...oldState,
      status: false,
      data: [],
    }))

  const onSearchBoxFocus = () =>
    setSearch((oldState) => ({ ...oldState, status: true }))

  const onCheckBoxChange = (filterType) => {
    const filterOptions = { ...filter }
    filterOptions[filterType] = !filterOptions[filterType]
    setFilter(filterOptions)
    getProductsList(activePage, null, numberPerPage, filterOptions)
  }

  const onSubmitSearch = (event) => {
    if (event.key === 'Enter') {
      getProductsList(1, null, numberPerPage, null, search.text)
      setActivePage(1)
    }
  }

  const onClearSearchBox = () => {
    searchRef.current.value = ''
    setSearch((oldState) => ({ ...oldState, text: '' }))
  }

  const onEdit = (index) => {
    history.push(`/product-management/edit/${productListState[index].product_id}`)
  }

  useEffect(() => {
    getProductsList(1)
  }, [])

  const titleArray = [
    { title: 'Serial number', type: 'product_id', isSort: true },
    { title: 'Product name', type: 'product_name', isSort: true },
    { title: 'Company', type: 'company_name', isSort: true },
    { title: 'Detail', type: 'detail', isSort: true },
    { title: 'Location', type: 'location', isSort: true },
    { title: 'Created at', type: 'created_at', isSort: true },
    { title: 'Updated at', type: 'updated_at', isSort: true },
    { title: 'Actions', type: 'actions', isSort: false },
  ]

  const fixedDataColumn = ['product_id', 'product_name', 'company_name']
  const scrollDataColumn = [
    'detail',
    'location',
    'created_at',
    'updated_at',
    'status',
  ]
  const itemPerPageList = [20, 40, 60, 80, 100]

  return (
    <Container isSort={sort.status} sortType={sort.option.type}>
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
          actionColumn='status'
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
