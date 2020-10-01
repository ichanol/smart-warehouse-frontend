import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  RetryBtn,
  CancelBtn,
  SubmitBtn,
  ImportExportTable,
  Navbar,
} from '../components'
import { Container, Header, Head, BlockTable, BlockBtn } from './ImportExportStyle'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'

function ImportExportProduct(props) {

  const history = useHistory()
  const { handleSubmit } = useForm()
  const [data, setData] = useState([])
  const [action, setAction] = useState('')
  const responsable = 12345
  const referenceNumber = 555

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

  useEffect(() => {
    // callApi()
    if (props.location.state) {
      setData(props.location.state.data)
    }
  }, [])

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

  const dropdownSelect = (e) => {
    setAction(e.target.value)
  }

  return (
    <Container>
      <Navbar selectedMenu={1} />
      <Header>
        <Head>Import -Export</Head>
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
      </BlockBtn>
    </Container>
  )
}

export default ImportExportProduct
