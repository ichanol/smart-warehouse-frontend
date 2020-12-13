import { CreateIcon, TemplateIcon, UploadIcon } from '../Icon'
import React, { useState } from 'react'

import { Container } from './CreateButtonStyle'

const CreateButton = ({ onCreateNew, onSelectFile, onDownloadTemplate }) => {
  const [isDismissMenu, setIsDismissMenu] = useState(false)
  return (
    <Container>
      <span className='create-new-button-title'>Create</span>
      <input
        type='checkbox'
        onChange={() => setIsDismissMenu(!isDismissMenu)}
      />
      <div className='create-new-context-menu'>
        <div className='create-new-button-menu' onClick={onCreateNew}>
          <CreateIcon />
          <span className='create-new-menu-title'>Create new</span>
        </div>
        <label className='create-new-button-menu'>
          <UploadIcon />
          <input type='file' onChange={onSelectFile} accept='.xlsx, .csv' />
          <span className='create-new-menu-title'>Import csv / excel</span>
        </label>
        <div className='create-new-button-menu' onClick={onDownloadTemplate}>
          <TemplateIcon />
          <span className='create-new-menu-title'>Template</span>
        </div>
      </div>
      {isDismissMenu && <div className='dismiss-menu' />}
    </Container>
  )
}

export default CreateButton
