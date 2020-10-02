import React, { useEffect, useState } from 'react'
import axios from 'axios'
import io from 'socket.io-client'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useResetRecoilState, useRecoilState } from 'recoil'
import atomState from '../Atoms/Atoms'

import {
  RetryBtn,
  CancelBtn,
  SubmitBtn,
  ImportExportTable,
  Navbar,
  Modal,
} from '../components'
import {
  Container,
  Header,
  Head,
  BlockTable,
  BlockBtn,
  Content,
} from './ImportExportStyle'

const ImportExportProduct = () => {
  const { handleSubmit } = useForm()
  const history = useHistory()
  const socket = io.connect(process.env.REACT_APP_SOCKET_IO)
  const [readProductListState, setReadProductListState] = useRecoilState(
    atomState.readProductListState,
  )
  const [userState, setUserState] = useRecoilState(atomState.userState)
  const resetReadProductListDefaultValue = useResetRecoilState(
    atomState.readProductListState,
  )

  const [isWaitForProduct, setIsWaitForProduct] = useState(
    readProductListState.length ? false : true,
  )
  const [isWaitForUser, setIsWaitForUser] = useState(
    !userState.isUserCardVerify,
  )
  const [isError, setIsError] = useState(false)

  const [action, setAction] = useState('')

  const dropdownSelect = (e) => {
    setAction(e.target.value)
  }

  const submit = async () => {
    try {
      const body = {
        referenceNumber: Math.random() * 1000,
        actionType: 1,
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
      }
    } catch (error) {
      setIsError(true)
    }
  }

  const editSelectedList = (selectedKey) => {
    readProductListState.find((value, key) => {
      if (selectedKey === key) {
        history.push({
          pathname: '/edit-product',
          state: {
            selectedProduct: value,
            productData: readProductListState,
            username: userState.username,
          },
        })
      }
    })
  }

  const deleteSelectedList = (selectedKey) => {
    const accumulator = [...readProductListState]
    const updatedProductList = accumulator.filter(
      (value, key) => key !== selectedKey,
    ) /**UPDATE */
    setReadProductListState(updatedProductList)
  }

  const dismissError = () => setIsError(false)

  useEffect(() => {
    if (readProductListState.length === 0) {
      socket.emit('join_room', { room: userState.username })

      socket.on('USER_GRANTED', ({ message, granted, room }) => {
        socket.off('USER_GRANTED')
        setUserState((oldState) => {
          const newUserState = { ...oldState }
          newUserState.isUserCardVerify = true
          return newUserState
        })
        setIsWaitForUser(!granted)
        socket.on('PRODUCT_SCANNER', ({ success, productData }) => {
          setIsWaitForProduct(!success)
          setReadProductListState(productData)
        })
      })
    } else {
      setIsWaitForUser(false)
    }
    /* if (props.location.state) {
      setProductList(props.location.state.data)
      setUsername(props.location.state.username)
    } else {
      (async () => {
        const credential = await checkLogin()
        if (credential) {
          setUsername(credential.username)
          socket.emit('join_room', { room: credential.username })

          socket.on('PRODUCT_SCANNER', ({ success, productData }) => {
            setProductList(productData)
            setIsLoading(!success)
          })
        } else {
          history.push('/')
          localStorage.clear()
        }
      })()
    } */
    return () => {
      socket.off('PRODUCT_SCANNER')
    }
  }, [])
  //add information while loading in login page
  //dismiss button change to bottom position
  //eye icon weird behavior
  //logo
  //active menu
  //multiple delete?
  //description => remark/note
  //padding textarea
  //validate input
  //add toast
  return (
    <Container>
      <Modal isDisplay={isWaitForProduct} primaryButton={false} />
      <Modal isDisplay={isWaitForUser} primaryButton={false} />
      <Modal
        isDisplay={isError}
        primaryButtonFN={dismissError}
        header='Error'
        isIndicator={false}
        detail='sdsd'
      />
      <Navbar />
      <Content blur={isWaitForProduct || isError || isWaitForUser}>
        <Header>
          <Head>Import - Export</Head>
        </Header>

        <BlockTable>
          {readProductListState && (
            <ImportExportTable
              data={readProductListState}
              editFN={editSelectedList}
              deleteFN={deleteSelectedList}
            />
          )}
        </BlockTable>
        <BlockBtn
          onSubmit={handleSubmit(submit)}
          style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <div>
            <RetryBtn />
          </div>
          <div style={{ display: 'flex' }}>
            <CancelBtn />
            <SubmitBtn action={() => {}} />
          </div>
          {/* <select value={action} required onChange={dropdownSelect}>
            <option value='' disabled selected hidden>
              Select Type
            </option>
            <option value='1'>Import</option>
            <option value='2'>Export</option>
            <option value='3'>Expired</option>
            <option value='4'>Damaged</option>
          </select> */}
        </BlockBtn>
      </Content>
    </Container>
  )
}

export default ImportExportProduct
