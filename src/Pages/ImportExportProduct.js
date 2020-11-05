import { CancelButton, RetryButton, SubmitButton } from '../components/Button'
import React, { useEffect, useRef, useState } from 'react'
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil'

import { Container } from './ImportExportProductStyle'
import { ResponsiveTable } from '../components'
import atomState from '../Atoms/Atoms'
import clsx from 'clsx'
import io from 'socket.io-client'
import { postRequest } from '../Services'
import { useHistory } from 'react-router-dom'

const ImportExportProduct = () => {
  const socket = io.connect(process.env.REACT_APP_SOCKET_IO)
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
  const [actionTabs, setActionTabs] = useState({ id: 1, action_type: 'Import' })
  const scrollRef = useRef([])

  const SOCKET_EVENT = {
    joinRoom: 'join_room',
    userGranted: 'USER_GRANTED',
    productScanner: 'PRODUCT_SCANNER',
  }

  const onCancleScanning = () => {
    resetModalState()
    history.goBack()
  }

  useEffect(() => {
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
    return () => {
      resetModalState()
      socket.removeAllListeners()
      socket.disconnect()
    }
  }, [readProductListState])

  const onEdit = (selectedList) =>
    history.push(
      '/import-export/edit-product/' + readProductListState[selectedList].product_serial_number,
    )

  const onDismissModal = () => resetModalState()

  const cancleTransaction = () => {
    resetReadProductListDefaultValue()
    onDismissModal()
    history.push('/import-export')
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
        referenceNumber: Math.random() * 1000,
        actionType: actionTabs.id,
        username: userState.username,
        productList: readProductListState,
      }
      const response = await postRequest(
        `${process.env.REACT_APP_API}/import-export-product`,
        body,
        userState.accessToken,
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
        color: '#04adf6',
      },
      onClickPositiveButton: () => resetReadProductListDefaultValue(),
      dismissFN: onDismissModal,
    }))
  }

  const onClickActionTab = (action) => {
    if (!action.disable) {
      setActionTabs({ id: action.id, action_type: action.action_type })
    }
  }

  const MOCK_CHOICES = [
    { id: 1, action_type: 'Import', disable: false },
    { id: 2, action_type: 'Export', disable: false },
    { id: 3, action_type: 'Expired', disable: true },
    { id: 4, action_type: 'Damaged', disable: false },
  ]

  const titleArray = [
    { title: 'Serial number', type: 'product_serial_number', isSort: false },
    { title: 'Product name', type: 'product_name', isSort: false },
    { title: 'Company', type: 'company_name', isSort: false },
    { title: 'Detail', type: 'detail', isSort: false },
    { title: 'Amount', type: 'amount', isSort: false },
    { title: 'Actions', type: 'status', isSort: false },
  ]
  const fixedDataColumn = ['product_serial_number', 'product_name']
  const scrollDataColumn = ['company_name', 'detail', 'amount', 'status']
  const centerColumn = ['amount']
  return (
    <Container blur={modalState.isDisplay}>
      <div className='action-tabs-container'>
        {MOCK_CHOICES.map((value, index) => {
          return (
            <div
              key={index}
              onClick={() => onClickActionTab(value)}
              className={clsx(
                'action-tabs',
                actionTabs.id === value.id && 'focus-tab',
                value.disable && 'disable-tab',
              )}>
              <span
                className={clsx(
                  'tab-title',
                  actionTabs.id === value.id && 'focus-title',
                )}>
                {value.action_type}
              </span>
            </div>
          )
        })}
      </div>
      <div className='header'>
        <span>{actionTabs.action_type}</span>
      </div>
      <div className='content'>
        <ResponsiveTable
          ref={scrollRef}
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
          darkHeader
        />
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
