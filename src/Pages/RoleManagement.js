import { Container, SelectFile, UploadIndicator } from './RoleManagementStyle'
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

const ProductManagement = () => {
  const source = axios.CancelToken.source()

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
  const setModalState = useSetRecoilState(atomState.modalState)
  const resetModalState = useResetRecoilState(atomState.modalState)
  const [roleListState, setRoleListState] = useRecoilState(
    atomState.roleListState,
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

  const UploadProgress = (
    <div>
      <span>{uploadPercent} %</span>
      <UploadIndicator percent={uploadPercent} />
    </div>
  )

  useEffect(() => {
    if (uploadPercent) {
      setModalState((oldState) => ({
        ...oldState,
        detail: UploadProgress,
      }))
    }
  }, [uploadPercent])

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

  const downloadTemplate = async () => {
    const response = await requestHandler(
      '/uploadfile/role',
      true,
      null,
      'get',
      0,
      0,
      true,
    )
    blobFileDownloader(response, 'role.xlsx')
  }

  const onSubmitFile = async (file) => {
    try {
      resetModalState()
      const uploadingEvent = ({ loaded, total }) => {
        const percent = Math.floor((loaded * 100) / total)
        setUploadPercent(percent)
      }

      const formData = new FormData()
      formData.append('uploadDocument', file)

      setModalState((oldState) => ({
        ...oldState,
        isDisplay: true,
        title: 'Uploading',
        detail: UploadProgress,
        positiveButton: { ...oldState.positiveButton, text: 'cancel' },
        onClickPositiveButton: () => {
          console.log('cancel')
          source.cancel('abort service request')
          resetModalState()
        },
      }))

      const { success } = await requestHandler(
        '/uploadfile/role',
        true,
        formData,
        'post',
        source,
        0,
        false,
        uploadingEvent,
      )
      if (success) {
        const timer = setTimeout(() => {
          resetModalState()
          setUploadPercent(0)
          setToastState((oldState) => [
            ...oldState,
            {
              onClick: () => {},
              title: 'Success',
              message: 'Upload role record successfully',
              dismiss: false,
              type: 'success',
            },
            {
              onClick: () => {},
              title: 'Information',
              message: 'Refresh to see new record',
              dismiss: false,
              type: 'info',
            },
          ])
          clearTimeout(timer)
        }, 1500)
      }
    } catch (error) {
      resetModalState()
      setUploadPercent(0)
      setToastState((oldState) => [
        ...oldState,
        {
          onClick: () => {},
          title: 'Failed',
          message: 'Failed to upload file. Try again.',
          dismiss: false,
          type: 'error',
        },
      ])
    }
  }

  const onFileChange = ({
    target: {
      files: { 0: file },
    },
  }) => {
    let fileToUpload
    if (file) {
      fileToUpload = file
    } else {
      fileToUpload = uploadDocument
    }
    const SubmitFile = (
      <SelectFile>
        <span>Only .xlsx, .csv extension</span>
        <label className='input-wrapper'>
          <FileIcon fill={fileToUpload?.name ? 700 : 300} />
          <input type='file' accept='.xlsx, .csv' onChange={onFileChange} />
          <span className='file-name'>{fileToUpload?.name}</span>
          {fileToUpload?.name && (
            <span className='change-file'>Click to change file</span>
          )}
          {!fileToUpload?.name && <span>Click here to add file</span>}
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
      onClickPositiveButton: () => onSubmitFile(fileToUpload),
    }))
    setUploadDocument(fileToUpload)
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
    }))
  }

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
            />
            <div className='create-button-wrapper'>
              <CreateButton
                onCreateNew={() => history.push('/role-management/create')}
                onUploadFile={onSelectUploadMenu}
                onDownloadTemplate={downloadTemplate}
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
