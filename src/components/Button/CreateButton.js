import { CreateIcon, TemplateIcon, UploadIcon } from '../Icon'
import React, { useState } from 'react'

import { Container } from './CreateButtonStyle'

const CreateButton = ({ onCreateNew, onUploadFile, onDownloadTemplate }) => {
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
        <div className='create-new-button-menu' onClick={onUploadFile}>
          <UploadIcon />
          <span className='create-new-menu-title'>Import csv / excel</span>
        </div>
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
