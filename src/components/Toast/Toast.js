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
      const timer1 = setTimeout(() => {
        setDisplay(false)
        clearTimeout(timer1)
      }, 2500)
      const timer2 = setTimeout(() => {
        setToastState((oldState) => {
          const temp = { ...oldState }
          temp.display = false
          return temp
        })
        clearTimeout(timer2)
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
