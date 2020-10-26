import {
  CancelIcon,
  ErrorIcon,
  InformationIcon,
  SuccessIcon,
  WarningIcon,
} from '../Icon'
import { Container, ToastContainer } from './ToastStyle'
import React, { useEffect, useRef, useState } from 'react'

import { COLORS } from '../../Constant'
import atomState from '../../Atoms/Atoms'
import { useRecoilState } from 'recoil'

const Toast = () => {
  const [toastState, setToastState] = useRecoilState(atomState.toastState)
  const [effectState, setEffectState] = useState(toastState)

  const toastRef = useRef([])
  const counter = useRef(0)

  const autoClearToastEffect = (primaryIndex) => {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        const temp = [...toastState]
        temp[primaryIndex] = { ...temp[primaryIndex], dismiss: true }
        setEffectState(temp)
        counter.current = counter.current + 1
        clearTimeout(timer)
        return resolve(true)
      }, 0)
    })
  }

  const manualClearToastEffect = (primaryIndex) => {
    /* const temp = [...toastState]
    temp[primaryIndex] = { ...temp[primaryIndex], dismiss: true }
    */
    const temp = toastState.filter((value, index) => index !== primaryIndex)
    setToastState(temp)
  }

  useEffect(() => {
    console.log('mounted')

    const parentTimer = setInterval(() => {
      if (counter.current < toastState.length && toastState.length > 0) {
        (async () => {
          await autoClearToastEffect(counter.current)
          const x = await setTimeout(() => {
            toastRef.current[counter.current - 1].style.display = 'none'
            clearTimeout(x)
          }, 1000)
        })()
      } else if (toastState.length === 0) {
        clearInterval(parentTimer)
      } else {
        setToastState([])
        setEffectState([])
        counter.current = 0
        clearInterval(parentTimer)
      }
    }, 4000)

    return () => {
      console.log('unmounted')
      clearInterval(parentTimer)
    }
  }, [toastState])

  const toastIcon = {
    success: { component: <SuccessIcon />, crossColor: COLORS.green[600] },
    error: { component: <ErrorIcon />, crossColor: COLORS.red[600] },
    warning: { component: <WarningIcon />, crossColor: COLORS.yellow[600] },
    info: { component: <InformationIcon />, crossColor: COLORS.blue[600] },
  }

  return (
    <Container>
      {toastState.map((value, index) => {
        return (
          <ToastContainer
            onClick={value.onClick}
            className={value.type}
            ref={(ref) => (toastRef.current[index] = ref)}
            key={index}
            dismiss={effectState[index]?.dismiss}>
            <div className='toast-detail'>
              <span>{value.message}</span>
            </div>
            <div className='toast-header'>{value.title}</div>
            <div
              className='toast-dismiss'
              onClick={() => manualClearToastEffect(index)}>
              <CancelIcon
                width={20}
                stroke={toastIcon[value.type].crossColor}
                fill={toastIcon[value.type].crossColor}
              />
            </div>
            <div className='toast-icon'>{toastIcon[value.type].component}</div>
          </ToastContainer>
        )
      })}
    </Container>
  )
}

export default Toast
