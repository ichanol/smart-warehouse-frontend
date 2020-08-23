import React, { useState } from 'react'
import { EditBtn, RetryBtn, CancelBtn, SubmitBtn, ImportExportTable, Navbar, data } from '../components'
import { Header, Head, BlockBtn } from './ImportExportStyle'

function ImportExportProduct() {

  const [selected, setSelected] = useState([])

  const select = (value) => {
    data.find((v, index) => {
      if (value === data[index].no) {
        setSelected(data[index])
      }
    })
  }

  return (
    <div className='ie-container'>
      <Navbar />
      <Header>
        <Head>Import - Export</Head>
      </Header>
      <ImportExportTable
        data={data}
        select={select}
      />
      <BlockBtn>
        <EditBtn />
        <RetryBtn />
        <CancelBtn />
        <SubmitBtn />
      </BlockBtn>
    </div>
  )
}

export default ImportExportProduct
