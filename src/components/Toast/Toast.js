import { Container, ToastContainer } from './ToastStyle'
import React, { useEffect, useRef, useState } from 'react'

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

  const clearToast = () => {
    console.log('STATE')

    //setEffectState(temp)
    //setToastState(temp)
  }

  useEffect(() => {
    console.log('mounted')

    const parentTimer = setInterval(() => {
      if (counter.current < toastState.length && toastState.length > 0) {
        ;(async () => {
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

  return (
    <Container>
      {toastState.map((value, index) => {
        return (
          <ToastContainer
            className={value.type}
            ref={(ref) => (toastRef.current[index] = ref)}
            key={index}
            dismiss={effectState[index]?.dismiss}>
            <div
              className='toast-dismiss'
              onClick={() => manualClearToastEffect(index)}>
              X
            </div>
            <div className='toast-detail'>
              <span className='toast-header'>{value.title + ' ' + index}</span>
              <span className='toast-detail'>{value.message}</span>
            </div>
          </ToastContainer>
        )
      })}
    </Container>
  )
}

export default Toast
