import React, { useEffect } from 'react'
import axios from 'axios'
import io from 'socket.io-client'
import { useHistory } from 'react-router-dom'
import { useResetRecoilState, useRecoilState, useSetRecoilState } from 'recoil'
import atomState from '../../Atoms/Atoms'

import { Container } from './ImportExportProductStyle'
import ImportExportTable from '../newComponents/Table/ImportExportTable'
import {
  CancelButton,
  RetryButton,
  SubmitButton,
} from '../newComponents/Button'

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

  const onCancleScanning = () => {
    resetUserAction()
    resetModalState()
    history.push('/import-export')
  }

  useEffect(() => {
    socket.emit('join_room', { room: userState.username })
    if (!userState.isUserCardVerify && !readProductListState.length) {
      setModalState((oldState) => {
        const temp = { ...oldState }
        temp.isDisplay = true
        temp.header = 'Please scan your card'
        temp.isIndicator = true
        temp.detail = 'Scan your card to proceed next step'
        temp.primaryButton = {
          display: true,
          text: 'cancel',
          color: 'white',
          fill: '#eb2d2d',
          stroke: '#eb2d2d',
        }
        temp.primaryButtonFN = onCancleScanning
        return temp
      })
      socket.on('USER_GRANTED', ({ message, granted, room }) => {
        socket.off('USER_GRANTED')
        setUserState((oldState) => {
          const newUserState = { ...oldState }
          newUserState.isUserCardVerify = true
          return newUserState
        })
        setModalState((oldState) => {
          const temp = { ...oldState }
          temp.isDisplay = true
          temp.header = 'Please wait'
          temp.isIndicator = true
          temp.detail = 'Device is scanning for products'
          temp.primaryButton = {
            display: true,
            text: 'cancel',
            color: 'white',
            fill: '#eb2d2d',
            stroke: '#eb2d2d',
          }
          temp.primaryButtonFN = onCancleScanning
          return temp
        })
        socket.on('PRODUCT_SCANNER', ({ success, productData }) => {
          socket.off('PRODUCT_SCANNER')
          resetModalState()
          setReadProductListState(productData)
        })
      })
    } else if (!userState.isUserCardVerify) {
      setModalState((oldState) => {
        const temp = { ...oldState }
        temp.isDisplay = true
        temp.header = 'Please scan your card'
        temp.isIndicator = true
        temp.detail = 'Scan your card to proceed next step'
        temp.primaryButton = {
          display: true,
          text: 'cancel',
          color: 'white',
          fill: '#eb2d2d',
          stroke: '#eb2d2d',
        }
        temp.primaryButtonFN = onCancleScanning
        return temp
      })
      socket.on('USER_GRANTED', ({ message, granted, room }) => {
        socket.off('USER_GRANTED')
        setUserState((oldState) => {
          const newUserState = { ...oldState }
          newUserState.isUserCardVerify = true
          return newUserState
        })
        resetModalState()
      })
    } else if (!readProductListState.length) {
      setModalState((oldState) => {
        const temp = { ...oldState }
        temp.isDisplay = true
        temp.header = 'Please wait'
        temp.isIndicator = true
        temp.detail = 'Device is scanning for products'
        temp.primaryButton = {
          display: true,
          text: 'cancel',
          color: 'white',
          fill: '#eb2d2d',
          stroke: '#eb2d2d',
        }
        temp.primaryButtonFN = onCancleScanning
        return temp
      })
      socket.on('PRODUCT_SCANNER', ({ success, productData }) => {
        socket.off('PRODUCT_SCANNER')
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
    setModalState((oldState) => {
      const temp = { ...oldState }
      temp.isDisplay = true
      temp.isFlex = true
      temp.header = 'Are you sure ?'
      temp.detail = 'You are going back to menu'
      temp.isIndicator = false
      temp.primaryButton = {
        display: true,
        text: 'no',
        color: 'gray',
        fill: 'transparent',
        stroke: 'transparent',
      }
      temp.primaryButtonFN = onDismissModal
      temp.secondaryButton = {
        display: true,
        text: 'yes',
        color: 'white',
        fill: '#eb2d2d',
        stroke: '#eb2d2d',
      }
      temp.secondaryButtonFN = cancleTransaction
      temp.dismissFN = onDismissModal
      return temp
    })
  }

  const confirmDeleteSelectedList = (selectedList) => {
    const accumulator = [...readProductListState]
    const updatedProductList = accumulator.filter(
      (value, key) => value.id !== selectedList.id,
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
      const response = await axios.post(
        process.env.REACT_APP_CREATE_TRANSACTION,
        body,
        {
          headers: {
            Authorization: `Bearer ${userState.accessToken}`,
          },
        },
      )
      const { success } = response.data
      if (success) {
        resetReadProductListDefaultValue()
        setToastState((oldState) => {
          const temp = { ...oldState }
          temp.display = true
          temp.title = 'Success'
          temp.message = 'Save Successfully'
          return temp
        })
        history.push('/import-export')
      }
    } catch (error) {
      setModalState((oldState) => {
        const temp = { ...oldState }
        temp.isDisplay = true
        temp.header = 'Submit failed'
        temp.isIndicator = false
        temp.detail = 'Something went wrong. Please try again'
        temp.primaryButton = {
          display: true,
          text: 'Try again',
          color: 'white',
          fill: '#eb2d2d',
          stroke: '#eb2d2d',
        }
        temp.primaryButtonFN = onDismissModal
        return temp
      })
    }
  }

  const onDelete = (selectedList) => {
    const DetailForConfirmDeleteModal = (
      <span>
        You are going to remove
        <br />
        <span className='hightlight'>
          {selectedList ? selectedList.product_name : null}{' '}
        </span>
        from the list.
      </span>
    )
    setModalState((oldState) => {
      const temp = { ...oldState }
      temp.isDisplay = true
      temp.isFlex = true
      temp.header = 'Are you sure ?'
      temp.detail = DetailForConfirmDeleteModal
      temp.isIndicator = false
      temp.primaryButton = {
        display: true,
        text: 'cancle',
        color: 'gray',
        fill: 'transparent',
        stroke: 'transparent',
      }
      temp.primaryButtonFN = onDismissModal
      temp.secondaryButton = {
        display: true,
        text: 'delete',
        color: 'white',
        fill: '#eb2d2d',
        stroke: '#eb2d2d',
      }
      temp.secondaryButtonFN = () => confirmDeleteSelectedList(selectedList)
      temp.dismissFN = onDismissModal
      return temp
    })
  }

  const onRetry = () => {
    setModalState((oldState) => {
      const temp = { ...oldState }
      temp.isDisplay = true
      temp.isFlex = true
      temp.header = 'Are you sure ?'
      temp.detail = 'You are going to scan for product again'
      temp.isIndicator = false
      temp.primaryButton = {
        display: true,
        text: 'cancle',
        color: 'gray',
        fill: 'transparent',
        stroke: 'transparent',
      }
      temp.primaryButtonFN = onDismissModal
      temp.secondaryButton = {
        display: true,
        text: 'retry',
        color: 'white',
        fill: '#04adf6',
        stroke: '#04adf6',
      }
      temp.secondaryButtonFN = () => resetReadProductListDefaultValue()
      temp.dismissFN = onDismissModal
      return temp
    })
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
