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

import { Container } from './RoleManagementStyle'
import { atomState } from '../Atoms/'
import { useHistory } from 'react-router-dom'

const ProductManagement = () => {
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
  const itemPerPageList = [
    { name: 10 },
    { name: 20 },
    { name: 30 },
    { name: 50 },
    { name: 100 },
  ]

  const history = useHistory()

  const setToastState = useSetRecoilState(atomState.toastState)
  const [roleListState, setRoleListState] = useRecoilState(
    atomState.roleListState,
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
  ] = useSearchBox(searchSuggest, 'role_name')

  const queryParams = {
    column: sort.column,
    desc: sort.desc,
    search: searchText === '' ? null : searchText,
    status: statusFilterHandler(),
    page: activePage,
    numberPerPage,
  }
  const [
    roleListData,
    roleListDataTrigger,
    setRoleListDataTrigger,
    setFetchRoleListData,
  ] = useAxios('/roles', true, queryParams, 'get')

  const [
    searchRoleListData,
    searchRoleListDataTrigger,
    setSearchRoleListDataTrigger,
    setFetchSearchRoleListData,
  ] = useAxios('/roles', true, queryParams, 'get')

  useEffect(() => {
    setFetchRoleListData(true)
    const { result, totalPages, totalRecords } = roleListData
    setRoleListState(result)
    setTotalRecord(totalRecords)
    if (totalPages) {
      setTotalPage(new Array(totalPages).fill(1))
    } else {
      setTotalPage([])
    }
  }, [roleListData])

  useEffect(() => {
    setRoleListDataTrigger(!roleListDataTrigger)
  }, [sort, numberPerPage, activePage, searchTrigger, filter])

  useEffect(() => {
    if (searchText !== '') {
      setFetchSearchRoleListData(true)
      setSearchRoleListDataTrigger(!searchRoleListDataTrigger)
    }
  }, [searchText])

  useEffect(() => {
    setSearchSuggest(searchRoleListData.result)
    setTrigger(!trigger)
  }, [searchRoleListData])

  const onClickPageNumber = (pageNumber) => setActivePage(pageNumber)

  const onSortByColumn = (columnType) =>
    setSort({ column: columnType, desc: !sort.desc })

  const onChangeNumberPerPage = (index) => {
    setNumberPerPage(itemPerPageList[index].name)
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
      const { success } = await requestHandler('/roles', true, body, 'delete')
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

  return (
    <Container>
      <div className='header'>
        <span>Role Management</span>
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
                onCreateNew={() => history.push('/role-management/create')}
                onSelectFile={() => console.log('select file')}
                onDownloadTemplate={() => console.log('download')}
              />
            </div>
          </div>
        </div>
        <ResponsiveTable
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
        <NumberIndicator
          numberPerPage={numberPerPage}
          activePage={activePage}
          totalRecord={totalRecord}
          numberOfShown={roleListState?.length}
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
