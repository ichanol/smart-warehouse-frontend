import React from 'react'
import { atomState } from '../Atoms'
import axios from 'axios'
import { useRecoilState } from 'recoil'

const ProfileSettings = () => {
  const [toastState, setToastState] = useRecoilState(atomState.toastState)
  const onFileChange = (e) => {
    console.log(e.target.files[0])
  }

  /* const onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData()

    // Update the formData object
    formData.append(
      'myFile',
      this.state.selectedFile,
      this.state.selectedFile.name,
    )

    // Details of the uploaded file
    console.log(this.state.selectedFile)

    // Request made to the backend api
    // Send formData object
    axios.post('api/uploadfile', formData)
  } */
  const toastType = ['success', 'error', 'warning', 'info']
  return (
    <React.Fragment>
      <h1>ProfileSettings</h1>
      <input type='file' onChange={onFileChange} />
      <button
        type='button'
        onClick={() => {
          setToastState([
            ...toastState,
            { title: 'Title', message: Math.random(), dismiss: false, type: toastType[Math.round(Math.random() * 3)] },
          ])
        }}>
        add new toast
      </button>
    </React.Fragment>
  )
}

export default ProfileSettings
