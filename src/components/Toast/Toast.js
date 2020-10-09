import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import atomState from '../../Atoms/Atoms'

import { ToastContainer } from './ToastStyle'

const Toast = () => {
  const [toastState, setToastState] = useRecoilState(atomState.toastState)
  const [display, setDisplay] = useState(false)

  useEffect(() => {
    if (toastState.display) {
      setDisplay(true)
      const setDisplayTimer = setTimeout(() => {
        setDisplay(false)
        clearTimeout(setDisplayTimer)
      }, 2500)
      const setToastStateTimer = setTimeout(() => {
        setToastState((oldState) => ({
          ...oldState,
          display: false,
        }))
        clearTimeout(setToastStateTimer)
      }, 3000)
    } else {
    }
  }, [toastState])

  return toastState.display ? (
    <ToastContainer isDisplay={display}>
      <div className='toast-detail'>
        <span className='toast-header'>{toastState.title}</span>
        <span className='toast-detail'>{toastState.message}</span>
      </div>
    </ToastContainer>
  ) : null
}

export default Toast
