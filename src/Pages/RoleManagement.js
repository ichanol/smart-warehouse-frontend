import { DropDown, FilterIcon, ResponsiveTable, SearchBox } from '../components'
import React, { useEffect, useRef, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { Container } from './RoleManagementStyle'
import { Pagination } from '../components'
import { atomState } from '../Atoms/'
import { debounce } from 'lodash'
import { request } from '../Services'
import { useHistory } from 'react-router-dom'

const ProductManagement = () => {
  const history = useHistory()

  const userState = useRecoilValue(atomState.userState)
  const setToastState = useSetRecoilState(atomState.toastState)
  const [roleListState, setRoleListState] = useRecoilState(
    atomState.roleListState,
  )

  const scrollRef = useRef([])
  const searchRef = useRef()
  const dropDownRef = useRef()

  const [numberPerPage, setNumberPerPage] = useState(20)
  const [activePage, setActivePage] = useState(1)
  const [totalPage, setTotalPage] = useState([])
  const [totalRecord, setTotalRecord] = useState(null)
  const [refreshFlag, setRefreshFlag] = useState(false)
  const [search, setSearch] = useState({ status: false, data: [], text: '' })
  const [sort, setSort] = useState({ column: null, desc: false })
  const [filter, setFilter] = useState({
    available: false,
    notAvailable: false,
  })

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

  const queryParams = {
    column: sort.column,
    desc: sort.desc,
    search: search.text === '' ? null : search.text,
    status: statusFilterHandler(),
    page: activePage,
    numberPerPage,
  }

  const getRoleList = async () => {
    try {
      const { success, result, totalPages, totalRecords } = await request(
        '/roles',
        queryParams,
        userState.accessToken,
        'get',
      )
      if (success) {
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
        const temp = []
        for (let i = 1; i <= totalPages; i = i + 1) {
          temp.push(i)
        }
        setTotalPage(temp)
        setRoleListState(parseData)
        setTotalRecord(totalRecords)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const searchRoleList = async () => {
    try {
      if (search.text === '') {
        setSearch({ ...search, data: [] })
      } else {
        const { result } = await request(
          '/roles',
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
      const cloneProductList = [...roleListState]
      cloneProductList[primaryIndex] = {
        ...cloneProductList[primaryIndex],
        status: !cloneProductList[primaryIndex].status,
      }

      const temp = cloneProductList[primaryIndex]
      const body = { role_name: temp.role_name, status: temp.status }
      const { success } = await request(
        '/roles',
        body,
        userState.accessToken,
        'delete',
      )

      if (success) {
        setRoleListState(cloneProductList)
        setToastState((oldState) => [
          ...oldState,
          {
            onClick: () => {},
            title: 'Success',
            message: 'Update role successfully',
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
    history.push(`/role-management/edit/${roleListState[index].role_name}`)

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
    getRoleList()
  }, [sort, activePage, numberPerPage, filter, refreshFlag])

  useEffect(() => {
    searchRoleList()
  }, [search.text])

  const titleArray = [
    { title: 'Role name', type: 'role_name', isSort: true },
    { title: 'Detail', type: null, isSort: false },
    { title: 'Users', type: 'totalUser', isSort: true },
    { title: 'Created at', type: 'created_at', isSort: true },
    { title: 'Updated at', type: 'updated_at', isSort: true },
    { title: 'Actions', type: null, isSort: false },
  ]
  const centerColumn = ['totalUser']
  const fixedDataColumn = ['role_name', 'detail']
  const scrollDataColumn = ['totalUser', 'created_at', 'updated_at', 'status']
  const itemPerPageList = [20, 40, 60, 80, 100]

  return (
    <Container>
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
            <DropDown
              ref={dropDownRef}
              selectedValue={numberPerPage}
              choices={itemPerPageList}
              onSelect={onChangeNumberPerPage}
              fullWidth={false}
              placeholder
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
          centerColumn={centerColumn}
          actionColumn='status'
          deleteButton={false}
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
