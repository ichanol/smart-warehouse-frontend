import React from 'react'
import { Sentry } from 'react-activity'
import { useRecoilValue } from 'recoil'
import atomState from '../../Atoms/Atoms'
import '../../../node_modules/react-activity/dist/react-activity.css'

import { Container } from './ModalStyle'
const Modal = () => {
  const modalState = useRecoilValue(atomState.modalState)

  return (
    <Container
      isDisplay={modalState.isDisplay}
      isIndicator={modalState.isIndicator}
      color={modalState.positiveButton.color}
      onClick={modalState.dismissFN}>
      <div className='modal'>
        {modalState.title && (
          <div className='header'>
            <span>{modalState.title}</span>
          </div>
        )}
        {modalState.isIndicator && (
          <div className='activity-wrapper'>
            <Sentry size={50} color='rgba(4,173,246,1)' speed={0.75} />
          </div>
        )}
        {modalState.detail && (
          <div className='detail'>
            <span>{modalState.detail}</span>
          </div>
        )}

        <div className='button-wrapper'>
          <button
            type='button'
            onClick={modalState.negativeButtonFN}
            className={`${modalState.modalType}-negative-button`}>
            {modalState.negativeButton.text}
          </button>
          <button
            type='button'
            onClick={modalState.positiveButtonFN}
            className={`${modalState.modalType}-positive-button`}>
            {modalState.positiveButton.text}
          </button>
        </div>
      </div>
    </Container>
  )
}

export default Modal
