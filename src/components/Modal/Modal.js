import React from 'react'
import { Sentry } from 'react-activity'
import { useRecoilValue } from 'recoil'
import atomState from '../../Atoms/Atoms'
import 'react-activity/dist/react-activity.css'

import { ModalBox, Header, Detail, Container } from './ModalStyle'
const Modal = () => {
  const modalState = useRecoilValue(atomState.modalState)

  return (
    <Container isDisplay={modalState.isDisplay} onClick={modalState.dismissFN}>
      <ModalBox
        isDisplay={modalState.isDisplay }
        paddingTop={modalState.primaryButton}
        isIndicator={modalState.isIndicator}
        primaryButtonColor={modalState.primaryButton.color}
        primaryButtonFill={modalState.primaryButton.fill}
        primaryButtonStroke={modalState.primaryButton.stroke}
        secondaryButtonColor={modalState.secondaryButton.color}
        secondaryButtonFill={modalState.secondaryButton.fill}
        secondaryButtonStroke={modalState.secondaryButton.stroke}
        flex={modalState.isFlex}>
        {modalState.header && (
          <Header>
            <span>{modalState.header}</span>
          </Header>
        )}
        {modalState.isIndicator && (
          <div className='activity-wrapper'>
            <Sentry size={50} color='rgba(4,173,246,1)' speed={0.75} />
          </div>
        )}
        {modalState.detail && (
          <Detail>
            <span>{modalState.detail}</span>
          </Detail>
        )}
        <div className='button-wrapper'>
          {modalState.primaryButton.display ? (
            <button
              type='button'
              onClick={modalState.primaryButtonFN}
              className='primary-button'>
              {modalState.primaryButton.text}
            </button>
          ) : null}
          {modalState.secondaryButton.display ? (
            <button
              type='button'
              onClick={modalState.secondaryButtonFN}
              className='secondary-button'>
              {modalState.secondaryButton.text}
            </button>
          ) : null}
        </div>
      </ModalBox>
    </Container>
  )
}

export default Modal
