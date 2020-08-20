import React, { useState } from 'react'
import Navbar from '../components/navbar/navbar'
import IETable from '../components/tables/IETable'
import EditBtn from '../components/button/editButton'
import RetryBtn from '../components/button/retryButton'
import CancelBtn from '../components/button/cancelButton'
import SubmitBtn from '../components/button/submitButton'

import './ImportExport.css'

function IEProduct() {

  const [selected, setSelected] = useState([])

  let data = [
    {
      No: 1,
      ProductID: 12345,
      ProductName: 'AAAAAAAAA',
      Amount: 1000,
      Time: '',
    },
    {
      No: 2,
      ProductID: 2,
      ProductName: 'B',
      Amount: 2,
      Time: '',
    },
    {
      No: 3,
      ProductID: 3,
      ProductName: 'C',
      Amount: 3,
      Time: '',
    }
  ]

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
      <IETable
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

export default IEProduct