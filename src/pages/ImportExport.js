import React, { useState } from 'react'
import {
  RetryBtn,
  CancelBtn,
  SubmitBtn,
  ImportExportTable,
  Navbar,
  data,
} from '../components'
import { Header, Head, BlockBtn } from './ImportExportStyle'
import { useHistory } from 'react-router-dom'

function ImportExportProduct() {

  const history = useHistory()
  const [selected, setSelected] = useState([])

  const select = (value) => {
    data.find((v, index) => {
      if (value === data[index].no) {
        setSelected(data[index])
        history.push({
          pathname: '/edit-product',
          state: {
            selected: data[index],
          },
        })
      }
    })
  }

  return (
    <container>
      <Navbar />
      <Header>
        <Head>Import - Export</Head>
      </Header>
      <ImportExportTable
        selected={selected}
        data={data}
        select={select}
      />
      <BlockBtn>
        <div >
          <RetryBtn />
        </div>
        <div style={{ display: "flex" }}>
          <CancelBtn />
          <SubmitBtn />
        </div>
      </BlockBtn>
    </container>
  )
}

export default ImportExportProduct
