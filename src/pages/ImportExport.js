import React, { useEffect, useState } from 'react'
import axios from 'axios'
import io from 'socket.io-client'

import {
  RetryBtn,
  CancelBtn,
  SubmitBtn,
  ImportExportTable,
  Navbar,
  data,
  Modal,
} from '../components'
import { Container, Header, Head, BlockTable, BlockBtn, Content } from './ImportExportStyle'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const ImportExportProduct = (props) => {

  const history = useHistory()
  const { handleSubmit } = useForm()
  const [data, setData] = useState([])
  const [action, setAction] = useState('')
  const responsable = 12345
  const referenceNumber = 555
  const socket = io.connect(process.env.REACT_APP_SOCKET_IO)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [selected, setSelected] = useState([])
  const [productList, setProductList] = useState(null)

  // const callApi = async () => {
  //   const response = await fetch('http://192.168.56.1:8000/test')
  //   const body = await response.json()
  //   setData(body)
  //   return body
  // }

  const retry = async () => {
    const response = await fetch('http://192.168.56.1:8000/test')
    const body = await response.json()
    setData(body)
    console.log('Retry')
    setAction('')
    return body
  }

  const submit = () => {
    axios({
      url: 'http://192.168.56.1:8000/update-data',
      method: 'post',
      data: {
        data: data,
        action: action,
        responsable: responsable,
        referenceNumber: referenceNumber,
      },
    })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        throw err
      })
    setData([])
    setAction('')
  }


  

  const select = (value) => {
    data.find((v, index) => {
      if (value === data[index].no) {
        history.push({
          pathname: '/edit-product',
          state: {
            value: data[index],
            data: data,
          },
        })
      }
    })
  }

  // const removeRow = (rowNumber) => {
  //   data.find((v, index) => {
  //     if (rowNumber === v.no) {
  //       setData()
  //     }
  //   })
  // }

  const dropdownSelect = (e) => {
    setAction(e.target.value)
  }

  useEffect(() => {
    const { username } = props.location.state
    console.log(username)
    socket.emit('join_room', { room: username })

    socket.on('PRODUCT_SCANNER', ({ success, productData }) => {
      setProductList(productData)
      setIsLoading(!success)
      console.log(productData)
    })

    return () => {
      socket.off('PRODUCT_SCANNER')
    }
  }, [productList])

  return (
    <Container>
      <Modal isShow={isLoading} dismissButton={false} />
      <Modal
        isShow={isError}
        dismissModal
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
        <ImportExportTable
          data={data}
          select={select}
        //removeRow={removeRow}
        />
      </BlockTable>
      <BlockBtn onSubmit={handleSubmit(submit)} style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <div >
          <RetryBtn retry={retry} />
        </div>
        <div style={{ display: "flex" }}>
          <CancelBtn />
          <SubmitBtn />
        </div>
        <select
          value={action}
          required
          onChange={dropdownSelect}
        >
          <option value='' disabled selected hidden>Select Type</option>
          <option value='1'>Import</option>
          <option value='2'>Export</option>
          <option value='3'>Expired</option>
          <option value='4'>Damaged</option>
        </select>
      </BlockBtn>
      </Content>
    </Container>


}

export default ImportExportProduct
