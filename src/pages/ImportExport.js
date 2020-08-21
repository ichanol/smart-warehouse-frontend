import React, { useState } from 'react'
import { EditBtn, RetryBtn, CancelBtn, SubmitBtn, ImportExportTable, Navbar, data } from '../components'

import './ImportExport.css'

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
      <div className='ie-header'>
        <label>Import - Export</label>
      </div>
      <ImportExportTable
        selected={selected}
        data={data}
        select={select}
      />
      <div className='button-block'>
        <EditBtn />
        <RetryBtn />
        <CancelBtn />
        <SubmitBtn />
      </div>
    </div>
  )
}

export default ImportExportProduct
