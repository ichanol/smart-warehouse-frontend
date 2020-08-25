import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'

import {
  EditBtn,
  RetryBtn,
  CancelBtn,
  SubmitBtn,
  ImportExportTable,
  Navbar,
  data,
  Modal,
} from '../components'
import { Header, Head, BlockBtn, Container, Content } from './ImportExportStyle'

const ImportExportProduct = (props) => {
  const socket = io.connect(process.env.REACT_APP_SOCKET_IO)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [selected, setSelected] = useState([])
  const [productList, setProductList] = useState(null)

  const select = (value) => {
    data.find((v, index) => {
      if (value === data[index].no) {
        setSelected(data[index])
      }
    })
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

        {productList && (
          <ImportExportTable data={productList} select={select} />
        )}

        <BlockBtn>
          <EditBtn />
          <RetryBtn />
          <CancelBtn />
          <SubmitBtn />
        </BlockBtn>
      </Content>
    </Container>
  )
}

export default ImportExportProduct
