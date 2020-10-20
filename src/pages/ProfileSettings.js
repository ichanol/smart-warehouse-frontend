import React from 'react'
import axios from 'axios'

const ProfileSettings = () => {
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
  return (
    <React.Fragment>
      <h1>ProfileSettings</h1>
      <input type='file' onChange={onFileChange} />
    </React.Fragment>
  )
}

export default ProfileSettings
