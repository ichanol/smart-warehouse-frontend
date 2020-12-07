import {
  CreateButton,
  DropDown,
  FilterButton,
  NumberIndicator,
  ResponsiveTable,
  SearchBox as useSearchBox,
} from '../components'
import React, { useEffect, useState } from 'react'
import { requestHandler, useAxios } from '../Services'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { Container } from './UserManagementStyle'
import { Pagination } from '../components'
import { atomState } from '../Atoms/'
import { useHistory } from 'react-router-dom'

const UserManagement = () => {
  const history = useHistory()

  const setToastState = useSetRecoilState(atomState.toastState)
  const [userListState, setUserListState] = useRecoilState(
    atomState.userListState,
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
  ] = useSearchBox(searchSuggest, 'username')

  const queryParams = {
    column: sort.column,
    desc: sort.desc,
    search: searchText === '' ? null : searchText,
    status: statusFilterHandler(),
    page: activePage,
    numberPerPage,
  }

  const [
    userListData,
    userListDataTrigger,
    setUserListDataTrigger,
    setFetchUserListData,
  ] = useAxios('/users', true, queryParams, 'get')

  const [
    searchUserListData,
    searchUserListDataTrigger,
    setSearchUserListDataTrigger,
    setFetchSearchUserListData,
  ] = useAxios('/users', true, queryParams, 'get')

  useEffect(() => {
    setFetchUserListData(true)
    const { result, totalPages, totalRecords } = userListData
    setUserListState(result)
    setTotalRecord(totalRecords)
    if (totalPages) {
      setTotalPage(new Array(totalPages).fill(1))
    } else {
      setTotalPage([])
    }
  }, [userListData])

  useEffect(() => {
    setUserListDataTrigger(!userListDataTrigger)
  }, [sort, numberPerPage, activePage, searchTrigger, filter])

  useEffect(() => {
    if (searchText !== '') {
      setFetchSearchUserListData(true)
      setSearchUserListDataTrigger(!searchUserListDataTrigger)
    }
  }, [searchText])

  useEffect(() => {
    setSearchSuggest(searchUserListData.result)
    setTrigger(!trigger)
  }, [searchUserListData])

  const onClickPageNumber = (pageNumber) => setActivePage(pageNumber)

  const onSortByColumn = (columnType) =>
    setSort({ column: columnType, desc: !sort.desc })

  const onChangeNumberPerPage = (number) => {
    setNumberPerPage(number)
    setActivePage(1)
  }

  const onToggleSwitch = async (primaryIndex) => {
    try {
      const cloneProductList = [...userListState]
      cloneProductList[primaryIndex] = {
        ...cloneProductList[primaryIndex],
        status: !cloneProductList[primaryIndex].status,
      }

      const { success } = await requestHandler(
        '/users',
        true,
        cloneProductList[primaryIndex],
        'delete',
      )

      if (success) {
        setUserListState(cloneProductList)
        setToastState((oldState) => [
          ...oldState,
          {
            onClick: () => {},
            title: 'Success',
            message: 'Update user successfully',
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
    history.push(`/user-management/edit/${userListState[index].username}`)

  const titleArray = [
    { title: 'Firstname', type: 'firstname', isSort: true },
    { title: 'Lastname', type: 'lastname', isSort: true },
    { title: 'Username', type: 'username', isSort: true },
    { title: 'E-mail', type: 'email', isSort: true },
    { title: 'Role', type: 'role_name', isSort: true },
    { title: 'Detail', type: 'detail', isSort: true },
    { title: 'Created at', type: 'created_at', isSort: true },
    { title: 'Updated at', type: 'updated_at', isSort: true },
    { title: 'Actions', type: null, isSort: false },
  ]

  const fixedDataColumn = ['firstname', 'lastname']
  const scrollDataColumn = [
    'username',
    'email',
    'role_name',
    'detail',
    'created_at',
    'updated_at',
    'status',
  ]
  const centerColumn = []
  const itemPerPageList = [20, 40, 60, 80, 100]

  return (
    <Container>
      <div className='header'>
        <span>User Management</span>
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
                onCreateNew={() => history.push('/user-management/create')}
                onSelectFile={() => console.log('select file')}
                onDownloadTemplate={() => console.log('download')}
              />
            </div>
          </div>
        </div>
        <ResponsiveTable
          title={titleArray}
          data={userListState}
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
          numberOfShown={userListState?.length}
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

export default UserManagement
