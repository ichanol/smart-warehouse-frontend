import { CancelButton, RetryButton, SubmitButton } from '../components/Button'
import React, { useEffect } from 'react'
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil'

import { Container } from './ImportExportProductStyle'
import ImportExportTable from '../components/Table/ImportExportTable'
import atomState from '../Atoms/Atoms'
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
  const resetUserAction = useSetRecoilState(atomState.userActionSelector())

  const SOCKET_EVENT = {
    joinRoom: 'join_room',
    userGranted: 'USER_GRANTED',
    productScanner: 'PRODUCT_SCANNER',
  }

  const onCancleScanning = () => {
    resetUserAction()
    resetModalState()
    history.push('/import-export')
  }

  useEffect(() => {
    socket.emit(SOCKET_EVENT.joinRoom, { room: userState.username })
    if (!userState.isUserCardVerify && !readProductListState.length) {
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
      '/import-export/edit-product/' + selectedList.product_serial_number,
    )

  const onDismissModal = () => resetModalState()

  const cancleTransaction = () => {
    resetUserAction()
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
        actionType: userState.action.id,
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
        setToastState((oldState) => ({
          ...oldState,
          display: true,
          title: 'Success',
          message: 'Save Successfully',
        }))
        history.push('/import-export')
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

  return (
    <Container blur={modalState.isDisplay}>
      <div className='header'>
        <span>{userState.action.actionType}</span>
      </div>
      <div className='content'>
        <ImportExportTable editFN={onEdit} deleteFN={onDelete} />
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
