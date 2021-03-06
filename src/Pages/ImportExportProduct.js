import {
  CancelButton,
  ResponsiveTable,
  RetryButton,
  SubmitButton,
  TextArea,
} from '../components'
import React, { useEffect, useState } from 'react'
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil'

import { Container } from './ImportExportProductStyle'
import atomState from '../Atoms/Atoms'
import clsx from 'clsx'
import { debounce } from 'lodash'
import io from 'socket.io-client'
import { requestHandler } from '../Services'
import { useHistory } from 'react-router-dom'

const ImportExportProduct = () => {
  const socket = io.connect(process.env.REACT_APP_SOCKET_IO)

  const MOCK_WAREHOUSE = 1
  const history = useHistory()

  const [readProductListState, setReadProductListState] = useRecoilState(
    atomState.readProductListState,
  )
  const [userState, setUserState] = useRecoilState(atomState.userState)
  const resetReadProductListDefaultValue = useResetRecoilState(
    atomState.readProductListState,
  )
  const setToastState = useSetRecoilState(atomState.toastState)
  const [modalState, setModalState] = useRecoilState(atomState.modalState)
  const resetModalState = useResetRecoilState(atomState.modalState)

  const [selectedTab, setSelectedTab] = useState({
    id: 1,
    action_name: 'Import',
  })
  const [preventSocket, setPreventSocket] = useState(false)
  const [menuTabs, setMenuTabs] = useState([])
  const [transactionRemark, setTransactionRemark] = useState('')

  const SOCKET_EVENT = {
    joinRoom: 'join_room',
    userGranted: 'USER_GRANTED',
    productScanner: 'PRODUCT_SCANNER',
  }

  const onCancleScanning = () => {
    resetModalState()
    history.goBack()
  }

  const getActionList = async () => {
    try {
      const { success, result } = await requestHandler(
        '/import-export-product',
        true,
        {},
        'get',
      )
      if (success) {
        setMenuTabs(result)
      }
      return true
    } catch (error) {
      return false
    }
  }

  const socketHandler = async () => {
    if (await getActionList()) {
      socket.emit(SOCKET_EVENT.joinRoom, { room: userState.username })
      if (!userState.isUserCardVerify && !readProductListState.length) {
        console.log('no card, nolist')
        setModalState((oldState) => ({
          ...oldState,
          modalType: 'error',
          isDisplay: true,
          title: 'Please scan your card',
          isIndicator: true,
          detail: 'Scan your card to proceed next step',
          positiveButton: {
            display: true,
            text: 'cancel',
          },
          onClickPositiveButton: onCancleScanning,
        }))
        socket.on(SOCKET_EVENT.userGranted, ({ message, granted, room }) => {
          socket.off(SOCKET_EVENT.userGranted)
          setUserState((oldState) => ({
            ...oldState,
            isUserCardVerify: true,
          }))
          setModalState((oldState) => ({
            ...oldState,
            modalType: 'error',
            isDisplay: true,
            title: 'Please wait',
            isIndicator: true,
            detail: 'Device is scanning for products',
            positiveButton: {
              text: 'cancel',
            },
            onClickPositiveButton: onCancleScanning,
          }))
          socket.on(SOCKET_EVENT.productScanner, ({ success, productData }) => {
            socket.off(SOCKET_EVENT.productScanner)
            resetModalState()
            setReadProductListState(productData)
          })
        })
      } else if (!userState.isUserCardVerify) {
        console.log('no card')
        setModalState((oldState) => ({
          ...oldState,
          modalType: 'error',
          isDisplay: true,
          title: 'Please scan your card',
          isIndicator: true,
          detail: 'Scan your card to proceed next step',
          positiveButton: {
            display: true,
            text: 'cancel',
          },
          onClickPositiveButton: onCancleScanning,
        }))
        socket.on(SOCKET_EVENT.userGranted, ({ message, granted, room }) => {
          socket.off(SOCKET_EVENT.userGranted)
          setUserState((oldState) => ({
            ...oldState,
            isUserCardVerify: true,
          }))
          resetModalState()
        })
      } else if (!readProductListState.length) {
        console.log('no list')
        setModalState((oldState) => ({
          ...oldState,
          modalType: 'error',
          isDisplay: true,
          title: 'Please wait',
          isIndicator: true,
          detail: 'Device is scanning for products',
          positiveButton: {
            text: 'cancel',
          },
          onClickPositiveButton: onCancleScanning,
        }))
        socket.on(SOCKET_EVENT.productScanner, ({ success, productData }) => {
          socket.off(SOCKET_EVENT.productScanner)
          resetModalState()
          setReadProductListState(productData)
        })
      }
    } else {
      history.goBack()
    }
  }

  useEffect(() => {
    if (preventSocket) {
    } else {
      socketHandler()
    }
    return () => {
      resetModalState()
      socket.removeAllListeners()
      socket.disconnect()
    }
  }, [readProductListState])

  const onEdit = (selectedList) =>
    history.push(
      '/import-export/edit-product/' +
        readProductListState[selectedList].product_id,
    )

  const onDismissModal = () => resetModalState()

  const cancleTransaction = () => {
    setPreventSocket(true)
    resetReadProductListDefaultValue()
    onDismissModal()
    history.goBack()
  }

  const onCancle = () => {
    setModalState((oldState) => ({
      ...oldState,
      modalType: 'confirm',
      isDisplay: true,
      title: 'Are you sure ?',
      detail: 'You are going back to menu',
      isIndicator: false,
      negativeButton: {
        text: 'no',
      },
      onClickNegativeButton: onDismissModal,
      positiveButton: {
        text: 'yes',
      },
      onClickPositiveButton: cancleTransaction,
      dismissFN: onDismissModal,
    }))
  }

  const confirmDeleteSelectedList = (selectedList) => {
    const updatedProductList = readProductListState.filter(
      (value, index) => value.id !== selectedList.id,
    )
    setReadProductListState(updatedProductList)
    onDismissModal()
  }

  const onSubmit = async () => {
    try {
      const body = {
        referenceNumber: Math.round(Math.random() * 1000),
        actionType: selectedTab.id,
        username: userState.username,
        productList: readProductListState,
        transactionRemark,
        warehouse: MOCK_WAREHOUSE,
      }
      const response = await requestHandler(
        '/import-export-product',
        true,
        body,
        'post',
      )
      if (response.success) {
        resetReadProductListDefaultValue()
        setToastState((oldState) => [
          ...oldState,
          {
            title: 'Success',
            message: 'Save successfully',
            dismiss: false,
            type: 'success',
          },
        ])
      }
    } catch (error) {
      setModalState((oldState) => ({
        ...oldState,
        isDisplay: true,
        modalType: 'error',
        title: 'Submit failed',
        isIndicator: false,
        detail: 'Something went wrong. Please try again',
        positiveButton: {
          text: 'Try again',
        },
        onClickPositiveButton: onDismissModal,
      }))
    }
  }

  const onDelete = (selectedList) => {
    const DetailForConfirmDeleteModal = (
      <span>
        You are going to remove
        <br />
        <span className='hightlight'>
          {selectedList && selectedList.product_name}{' '}
        </span>
        from the list.
      </span>
    )
    setModalState((oldState) => ({
      ...oldState,
      modalType: 'confirm',
      isDisplay: true,
      title: 'Are you sure ?',
      detail: DetailForConfirmDeleteModal,
      isIndicator: false,
      negativeButton: {
        display: true,
        text: 'cancle',
      },
      onClickNegativeButton: onDismissModal,
      positiveButton: {
        display: true,
        text: 'delete',
      },
      onClickPositiveButton: () => confirmDeleteSelectedList(selectedList),
      dismissFN: onDismissModal,
    }))
  }

  const onRetry = () => {
    setModalState((oldState) => ({
      ...oldState,
      modalType: 'confirm',
      isDisplay: true,
      title: 'Are you sure ?',
      detail: 'You are going to scan for product again',
      isIndicator: false,
      negativeButton: {
        text: 'cancle',
      },
      onClickNegativeButton: onDismissModal,
      positiveButton: {
        text: 'retry',
        color: 'blue',
      },
      onClickPositiveButton: () => resetReadProductListDefaultValue(),
      dismissFN: onDismissModal,
    }))
  }

  const onClickActionTab = (action) => {
    if (!action.disable) {
      setSelectedTab({ id: action.id, action_name: action.action_name })
    }
  }

  const onValueChange = debounce((value) => setTransactionRemark(value), 300)

  const titleArray = [
    { title: 'Serial number', type: 'product_id', isSort: false },
    { title: 'Product name', type: 'product_name', isSort: false },
    { title: 'Company', type: 'company_name', isSort: false },
    { title: 'Remark', type: 'detail', isSort: false },
    { title: 'Amount', type: 'amount', isSort: false },
    { title: 'Actions', type: 'status', isSort: false },
  ]
  const fixedDataColumn = ['product_id', 'product_name']
  const scrollDataColumn = [
    'company_name',
    'product_detail',
    'amount',
    'status',
  ]
  const centerColumn = ['amount']

  const scanUser = async () => {
    const body = {
      username: userState.username,
    }
    const result = await requestHandler(
      '/detect-user-RFID',
      false,
      body,
      'post',
    )
  }
  const scanProduct = async () => {
    const body = {
      username: userState.username,
      data: [
        {
          product_id: 'a3KEeZbXBx',
          amount: 100,
        },
        {
          product_id: 'xEBjTv2RhB',
          amount: 200,
        },
        {
          product_id: '7i8xzdx1OO',
          amount: 300,
        },
        {
          product_id: '7YcgFL8zb9',
          amount: 400,
        },
        {
          product_id: 'XmUwfOCzKv',
          amount: 50,
        },
        {
          product_id: 'Y3nSy3Wcsw',
          amount: 50,
        },
        {
          product_id: 'WWcQZYpEEw',
          amount: 150,
        },
        {
          product_id: 'BImPJwGAZE',
          amount: 75,
        },
        {
          product_id: '4Eh8SiaaWK',
          amount: 500,
        },
        {
          product_id: 'Db6yY11WIj',
          amount: 50,
        },
      ],
    }
    const result = await requestHandler(
      '/detect-product-RFID',
      false,
      body,
      'post',
    )
  }
  return (
    <Container>
      {/* <div className='mock-button-user' onClick={scanUser}>
        Scan user
      </div>
      <div className='mock-button-product' onClick={scanProduct}>
        Scan Product
      </div> */}
      <div className='action-tabs-container'>
        {menuTabs.map((value, index) => {
          return (
            <div
              key={index}
              onClick={() => onClickActionTab(value)}
              className={clsx(
                'action-tabs',
                selectedTab.id === value.id && 'focus-tab',
              )}>
              <span
                className={clsx(
                  'tab-title',
                  selectedTab.id === value.id && 'focus-title',
                )}>
                {value.action_name}
              </span>
            </div>
          )
        })}
      </div>
      <div className='content'>
        <ResponsiveTable
          title={titleArray}
          fixedDataColumn={fixedDataColumn}
          centerColumn={centerColumn}
          scrollDataColumn={scrollDataColumn}
          toggleButton={false}
          actionColumn='status'
          onEdit={onEdit}
          onDelete={onDelete}
          data={readProductListState}
          indexCounter
        />
        <div className='text-area-wrapper'>
          <TextArea
            placeholder='Transaction Remark'
            onValueChange={onValueChange}
            valueType='detail'
          />
        </div>
        <div className='button-wrapper'>
          <div className='list-manipulate-button'>
            <RetryButton action={onRetry} />
            <div className='cancle-button-wrapper'>
              <CancelButton action={onCancle} />
            </div>
          </div>
          <SubmitButton action={onSubmit} />
        </div>
      </div>
    </Container>
  )
}

export default ImportExportProduct
