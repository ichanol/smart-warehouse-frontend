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
  const [roleListState, setRoleListState] = useRecoilState(
    atomState.roleListState,
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

  const isSorting = (URL, sortingOptions, isFirstParam = false) => {
    if (sortingOptions) {
      URL = URL + (isFirstParam ? '' : '&') + sortingOptions
      return URL
    } else if (sort.status) {
      URL =
        URL +
        (isFirstParam ? '' : '&') +
        `sort=${sort.option.type},${sort.option.desc}`
      return URL
    } else {
      return URL
    }
  }

  const isFiltering = (URL, filterOptions, isFirstParam = false) => {
    if (filterOptions?.available && filterOptions?.notAvailable) {
      URL = URL + (isFirstParam ? '' : '&') + 'status=2'
      return URL
    } else if (!filterOptions?.available && !filterOptions?.notAvailable) {
      return URL
    } else if (filterOptions?.available) {
      URL = URL + (isFirstParam ? '' : '&') + 'status=1'
      return URL
    } else if (filterOptions?.notAvailable) {
      URL = URL + (isFirstParam ? '' : '&') + 'status=0'
      return URL
    } else if (filter.available && filter.notAvailable) {
      URL = URL + (isFirstParam ? '' : '&') + 'status=2'
      return URL
    } else if (!filter.available && !filter.notAvailable) {
      return URL
    } else if (filter.available) {
      URL = URL + (isFirstParam ? '' : '&') + 'status=1'
      return URL
    } else if (filter.notAvailable) {
      URL = URL + (isFirstParam ? '' : '&') + 'status=0'
      return URL
    } else {
      URL = URL
      return URL
    }
  }

  const isSearching = (URL, keyword, isFirstParam = false) => {
    if (keyword) {
      URL = URL + (isFirstParam ? '' : '&') + `search=${keyword}`
      return URL
    } else if (search.text) {
      URL = URL + (isFirstParam ? '' : '&') + `search=${search.text}`
      return URL
    } else {
      return URL
    }
  }

  const getRoleList = async (
    pageToFetch,
    sortingOptions,
    perPage = numberPerPage,
    filterOptions,
    keyword,
  ) => {
    try {
      let URL = `${process.env.REACT_APP_API}/roles/${perPage}/${pageToFetch}?`

      if (
        (sortingOptions || sort.status) &&
        (filter.available || filter.notAvailable || filterOptions) &&
        (keyword || search.text)
      ) {
        const withSortURL = isSorting(URL, sortingOptions, true)
        const withFilterURL = isFiltering(withSortURL, filterOptions)
        const withSearchURL = isSearching(withFilterURL, keyword)
        URL = withSearchURL
      } else if (
        (filter.available || filter.notAvailable || filterOptions) &&
        (keyword || search.text)
      ) {
        const withFilterURL = isFiltering(URL, filterOptions, true)
        const withSearchURL = isSearching(withFilterURL, keyword)
        URL = withSearchURL
      } else if ((sortingOptions || sort.status) && (keyword || search.text)) {
        const withSortURL = isSorting(URL, sortingOptions, true)
        const withSearchURL = isSearching(withSortURL, keyword)
        URL = withSearchURL
      } else if (
        (sortingOptions || sort.status) &&
        (filter.available || filter.notAvailable || filterOptions)
      ) {
        const withSortURL = isSorting(URL, sortingOptions, true)
        const withFilterURL = isFiltering(withSortURL, filterOptions)
        URL = withFilterURL
      } else if (keyword || search.text) {
        URL = isSearching(URL, keyword, true)
      } else if (sortingOptions || sort.status) {
        URL = isSorting(URL, sortingOptions, true)
      } else {
        URL = isFiltering(URL, filterOptions, true)
      }
      const { success, result, totalPages, totalRecords } = await getRequest(
        URL,
        userState.accessToken,
      )

      console.log('URL', URL)

      const parseData = result.map((value, index) => {
        const temp = { ...value }
        temp.permission = JSON.parse(temp.permission)
        for (const [permissionName, isPermitted] of Object.entries(
          temp.permission,
        )) {
          temp.permission[permissionName] = isPermitted
        }
        return temp
      })
      if (success) {
        const temp = []
        for (let i = 1; i <= totalPages; i = i + 1) {
          temp.push(i)
        }
        setTotalPage(temp)
        setRoleListState(parseData)
        setTotalRecord(totalRecords)
        console.log('parseData', parseData)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const searchRoleList = async (searchFor) => {
    try {
      const URL = `${process.env.REACT_APP_API}/roles?search=${searchFor}`
      const { result } = await getRequest(URL, userState.accessToken)
      if (result && result.length > 0) {
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
    getRoleList(pageNumber)
  }

  const onSortByColumn = (columnType) => {
    if (columnType) {
      setSort({
        ...sort,
        status: true,
        option: { type: columnType, desc: !sort.option.desc },
      })
      const sortOptions = `sort=${columnType},${!sort.option.desc}`
      getRoleList(activePage, sortOptions)
    }
  }

  const onChangeNumberPerPage = (number, primaryIndex) => {
    dropDownRef.current.scrollTop = 40 * (primaryIndex - 1)
    setNumberPerPage(number)
    setActivePage(1)
    getRoleList(1, null, number)
  }

  const onSearchInputChange = debounce((text) => {
    setSearch((oldState) => ({ ...oldState, text: text }))
    searchRoleList(text)
  }, 500)

  const onToggleSwitch = async (primaryIndex) => {
    const cloneProductList = [...roleListState]
    cloneProductList[primaryIndex] = {
      ...cloneProductList[primaryIndex],
      status: !cloneProductList[primaryIndex].status,
    }
    console.log(cloneProductList[primaryIndex])
    const temp = cloneProductList[primaryIndex]
    const body = { id: temp.id, status: temp.status}
    const URL = `${process.env.REACT_APP_API}/roles`
    console.log(cloneProductList[primaryIndex])
    console.log(URL, body)
    const { success } = await putRequest(URL, body, userState.accessToken)
    if (success) {
      setRoleListState(cloneProductList)
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
    getRoleList(activePage, null, numberPerPage, filterOptions)
  }

  const onSubmitSearch = (event) => {
    if (event.key === 'Enter') {
      getRoleList(1, null, numberPerPage, null, search.text)
      setActivePage(1)
    }
  }

  const onClearSearchBox = () => {
    searchRef.current.value = ''
    setSearch((oldState) => ({ ...oldState, text: '' }))
  }

  const onEdit = (index) => {
    history.push(`/role-management/edit/${roleListState[index].role_name}`)
  }

  useEffect(() => {
    getRoleList(1)
  }, [])

  const titleArray = [
    { title: 'Role name', type: 'role_name', isSort: true },
    { title: 'Detail', type: null, isSort: false },
    { title: 'Users', type: 'totalUser', isSort: true },
    { title: 'Created at', type: 'created_at', isSort: true },
    { title: 'Updated at', type: 'updated_at', isSort: true },
    { title: 'Actions', type: null, isSort: false },
  ]

  /**
   * http://localhost:3000/role-management?orderby=id,name|desc
id: 1
permission: "["new", "updated", "permission"]"
       */
  const fixedDataColumn = ['role_name', 'detail']
  const scrollDataColumn = ['totalUser', 'created_at', 'updated_at', 'status']
  const itemPerPageList = [20, 40, 60, 80, 100]

  return (
    <Container isSort={sort.status} sortType={sort.option.type}>
      <div className='header'>
        <span>Role Management</span>
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
              field='role_name'
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
              onClick={() => history.push('/role-management/create')}>
              Create
            </div>
          </div>
        </div>
        <ResponsiveTable
          ref={scrollRef}
          title={titleArray}
          data={roleListState}
          sort={sort}
          onSortByColumn={onSortByColumn}
          onToggleSwitch={onToggleSwitch}
          onEdit={onEdit}
          fixedDataColumn={fixedDataColumn}
          scrollDataColumn={scrollDataColumn}
          actionColumn='status'
        />
        {roleListState.length > 0 && (
          <div className='number-of-items-indicator'>
            Show {(activePage - 1) * numberPerPage + 1} -{' '}
            {(activePage - 1) * numberPerPage + roleListState.length} of{' '}
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
