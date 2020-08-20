import React from 'react'
import Navbar from '../components/navbar/navbar'
import IETable from '../components/tables/IETable'
import EditBtn from '../components/button/editButton'
import RetryBtn from '../components/button/retryButton'
import CancelBtn from '../components/button/cancelButton'
import SubmitBtn from '../components/button/submitButton'

import './ImportExport.css'

function IEProduct() {

  return (
    <div className='ie-container'>
      <Navbar />
      <div className='ie-header'>
        <label>Import - Export</label>
      </div>
      <IETable />
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