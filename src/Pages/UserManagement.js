import {
  Container,
  SelectFile,
  UploadIndicator,
} from './UserManagementStyle'
import {
  CreateButton,
  DropDown,
  FileIcon,
  FilterButton,
  NumberIndicator,
  Pagination,
  ResponsiveTable,
  SearchBox as useSearchBox,
} from '../components'
import React, { useEffect, useState } from 'react'
import { requestHandler, useAxios } from '../Services'
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil'

import { atomState } from '../Atoms/'
import axios from 'axios'
import { blobFileDownloader } from '../Utils'
import { useHistory } from 'react-router-dom'

const UserManagement = () => {
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
  const itemPerPageList = [
    { name: 10 },
    { name: 20 },
    { name: 30 },
    { name: 50 },
    { name: 100 },
  ]
  const source = axios.CancelToken.source()

  const history = useHistory()

  const setToastState = useSetRecoilState(atomState.toastState)
  const setModalState = useSetRecoilState(atomState.modalState)
  const resetModalState = useResetRecoilState(atomState.modalState)
  const [userListState, setUserListState] = useRecoilState(
    atomState.userListState,
  )

  const [uploadDocument, setUploadDocument] = useState()
  const [uploadPercent, setUploadPercent] = useState(0)
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

  // useEffect(() => {
  //   setModalState((oldState) => ({
  //     ...oldState,
  //     isDisplay: true,
  //     title: 'Uploading',
  //     detail: UploadProgress,
  //     // dismissFN: () => resetModalState(),
  //     positiveButton: { ...oldState.positiveButton, text: 'cancel' },
  //     onClickPositiveButton: () => source.cancel('abort service request'),
  //   }))
  // }, [uploadPercent])

  const onClickPageNumber = (pageNumber) => setActivePage(pageNumber)

  const onSortByColumn = (columnType) =>
    setSort({ column: columnType, desc: !sort.desc })

  const onChangeNumberPerPage = (index) => {
    setNumberPerPage(itemPerPageList[index].name)
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

  const downloadTemplate = async () => {
    const response = await requestHandler(
      '/uploadfile/user',
      true,
      null,
      'get',
      0,
      0,
      true,
    )
    blobFileDownloader(response, 'user_template.xlsx')
  }

  const onFileChange = ({
    target: {
      files: { 0: file },
    },
  }) => {
    const SubmitFile = (
      <SelectFile>
        <span>Only .xlsx, .csv extension</span>
        <label className='input-wrapper'>
          <FileIcon fill={file?.name ? 700 : 300} />
          <input type='file' accept='.xlsx, .csv' onChange={onFileChange} />
          <span className='file-name'>{file?.name}</span>
          {file?.name && (
            <span className='change-file'>Click to change file</span>
          )}
          {!file?.name && <span>Click here to add file</span>}
        </label>
      </SelectFile>
    )
    setModalState((oldState) => ({
      ...oldState,
      detail: SubmitFile,
      negativeButton: { text: 'cancel' },
      positiveButton: { text: 'submit', color: 'green' },
      modalType: 'confirm',
      fullWidthButton: true,
      onClickNegativeButton: resetModalState,
      onClickPositiveButton: () => console.log(2323),
    }))
    setUploadDocument(file)
  }

  const onSelectUploadMenu = () => {
    const SelectFileToUpload = (
      <SelectFile>
        <span>Only file with .xlsx, .csv extension</span>
        <label className='input-wrapper'>
          <FileIcon />
          <input type='file' accept='.xlsx, .csv' onChange={onFileChange} />
          <span>Click here to add file</span>
        </label>
      </SelectFile>
    )
    setModalState((oldState) => ({
      ...oldState,
      isDisplay: true,
      title: 'Select file',
      detail: SelectFileToUpload,
      positiveButton: {
        ...oldState.positiveButton,
        text: 'cancel',
      },
      onClickPositiveButton: () => resetModalState(),
      // source.cancel('abort service request'),
    }))
  }

  const onSubmitFile = async () => {
    try {
      const UploadProgress = (
        <div>
          <span>{uploadPercent} %</span>
          <UploadIndicator percent={uploadPercent} />
        </div>
      )

      const uploadingEvent = (progressEvent) => {
        const { loaded, total } = progressEvent
        const percent = Math.floor((loaded * 100) / total)
        console.log(`${loaded}kb of ${total}kb | ${percent}%`)
        if (percent < 100) {
          setUploadPercent(percent)
        } else {
          // resetModalState()
        }
      }

      // const onFileUpload = () => {
      //   const formData = new FormData()
      //   formData.append('uploadDocument', uploadDocument)
      //   axios
      //     .post(process.env.REACT_APP_API + '/uploadfile', formData)
      //     .then((res) => console.log(res))
      //     .catch((err) => console.log(err))
      // }
    } catch (error) {}
  }

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
            />
            <div className='create-button-wrapper'>
              <CreateButton
                onCreateNew={() => history.push('/user-management/create')}
                onUploadFile={onSelectUploadMenu}
                onDownloadTemplate={downloadTemplate}
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
