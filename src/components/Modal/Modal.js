import '../../../node_modules/react-activity/dist/react-activity.css'

import { COLORS } from '../../Constant'
import { Container } from './ModalStyle'
import ModalButton from '../Button/ModalButton'
import React from 'react'
import { Sentry } from 'react-activity'
import atomState from '../../Atoms/Atoms'
import clsx from 'clsx'
import { useRecoilValue } from 'recoil'

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
            <Sentry size={50} color={COLORS.blue[500]} speed={0.75} />
          </div>
        )}
        {modalState.detail && (
          <div className='detail'>
            <span>{modalState.detail}</span>
          </div>
        )}

        <div className={clsx('button-wrapper', modalState.fullWidthButton && 'full-width')}>
          <ModalButton
            value={modalState.negativeButton.text}
            action={modalState.onClickNegativeButton}
            className={`${modalState.modalType}-negative-button`}
          />
          <ModalButton
            value={modalState.positiveButton.text}
            action={modalState.onClickPositiveButton}
            className={`${modalState.modalType}-positive-button`}
          />
        </div>
      </div>
    </Container>
  )
}

export default Modal
