import React, { useEffect, useState } from 'react'
import axios from 'axios'
import io from 'socket.io-client'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'

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
import checkLogin from '../middleware/CheckLogin'

const ImportExportProduct = (props) => {
  const socket = io.connect(process.env.REACT_APP_SOCKET_IO)
  const { handleSubmit } = useForm()
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [isLoading, setIsLoading] = useState(
    props.location.state ? false : true,
  )
  const [isError, setIsError] = useState(false)
  const [action, setAction] = useState('')
  const [productList, setProductList] = useState(null)

  const dropdownSelect = (e) => {
    setAction(e.target.value)
  }

  const submit = async () => {
    try {
      const body = {
        referenceNumber: 788,
        actionType: 1,
        username: username,
        productList: productList,
      }
      const response = await axios.post(
        process.env.REACT_APP_CREATE_TRANSACTION,
        body,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        },
      )
      const { success } = response.data
      if (success) {
        console.log(success)
      }
    } catch (error) {
      setIsError(true)
    }
  }

  const editSelectedList = (selectedKey) => {
    productList.find((value, key) => {
      if (selectedKey === key) {
        history.push({
          pathname: '/edit-product',
          state: {
            selectedProduct: value,
            productData: productList,
            username,
          },
        })
      }
    })
  }

  const deleteSelectedList = (selectedKey) => {
    const accumulator = [...productList]
    const updatedProductList = accumulator.filter(
      (value, key) => key !== selectedKey,
    )
    setProductList(updatedProductList)
  }

  const dismissError = () => setIsError(false)

  useEffect(() => {
    if (props.location.state) {
      setProductList(props.location.state.data)
      setUsername(props.location.state.username)
    } else {
      ;(async () => {
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
    }
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
      <Modal isShow={isLoading} dismissButton={false} />
      <Modal
        isShow={isError}
        dismissModal={dismissError}
        header='Error'
        isIndicator={false}
        detail='sdsd'
      />
      <Navbar />
      <Content blur={isLoading || isError}>
        <Header>
          <Head>Import - Export</Head>
        </Header>

        <BlockTable>
          {productList && (
            <ImportExportTable
              data={productList}
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
