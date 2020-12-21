import React from 'react'
import { atomState } from '../Atoms'
import axios from 'axios'
import { blobFileDownloader } from '../Utils'
import { requestHandler } from '../Services'
import { useRecoilState } from 'recoil'
import { useState } from 'react'

const ProfileSettings = () => {
  const [toastState, setToastState] = useRecoilState(atomState.toastState)
  const [uploadDocument, setUploadDocument] = useState()

  const onFileChange = (e) => {
    setUploadDocument(e.target.files[0])
    console.log(e.target.files[0])
  }

  const onFileUpload = () => {
    const formData = new FormData()
    formData.append('uploadDocument', uploadDocument)
    axios
      .post(process.env.REACT_APP_API + '/uploadfile', formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }
  const toastType = ['success', 'error', 'warning', 'info']

  const onGenerateReport = async (reportNumber) => {
    const response = await requestHandler(
      '/uploadfile/user',
      true,
      null,
      'get',
      0,
      0,
      true,
    )
    console.log(response)
    blobFileDownloader(response, `${reportNumber}.xlsx`)
  }
  return (
    <React.Fragment>
      <h1>ProfileSettings</h1>
      <input type='file' onChange={onFileChange} accept='.xlsx, .csv' />
      <button onClick={onFileUpload}>submit</button>
      <button onClick={onGenerateReport}>submit</button>
      {/* <button
        type='button'
        onClick={() => {
          setToastState([
            ...toastState,
            {
              onClick: () => {},
              title: 'Title',
              message: Math.random(),
              dismiss: false,
              type: toastType[Math.round(Math.random() * 3)],
            },
          ])
        }}>
        add new toast
      </button> */}
    </React.Fragment>
  )
}

export default ProfileSettings
