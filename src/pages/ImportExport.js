import React, { useState } from 'react'
import Navbar from '../components/navbar/navbar'
import ImportExportTable from '../components/tables/IETable'
import { EditBtn, RetryBtn, CancelBtn, SubmitBtn } from '../components/button/Button'
import { data } from '../components/mockData/mockImport'

import './ImportExport.css'

function ImportExportProduct() {

  const [selected, setSelected] = useState([])



  const select = (value) => {
    data.find((v, index) => {
      if (value === data[index].No) {
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
