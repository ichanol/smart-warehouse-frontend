import { useEffect, useState } from 'react'

import { atomState } from '../Atoms'
import axios from 'axios'
import { useSetRecoilState } from 'recoil'

const useAxios = (URL, TOKEN = false, BODY, METHOD, timeout = 0) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const setModalState = useSetRecoilState(atomState.modalState)

  const baseAxios = axios.create({
    baseURL: `${process.env.REACT_APP_API}`,
  })

  const requestHandler = async (source) => {
    try {
      const options = {
        cancelToken: source.token,
        timeout: timeout,
      }
      switch (METHOD) {
        case 'get':
          if (TOKEN) {
            options.headers = {
              Authorization: `Bearer ${TOKEN}`,
            }
            options.params = BODY
            const response = await baseAxios.get(URL, options)
            setData(response.data)
            setLoading(false)
            return response.data
          } else {
            const response = await baseAxios.get(URL, options)
            setData(response.data)
            setLoading(false)
            return response.data
          }
        case 'post':
          if (TOKEN) {
            options.headers = {
              Authorization: `Bearer ${TOKEN}`,
            }
            const response = await baseAxios.post(URL, BODY, options)
            setData(response.data)
            setLoading(false)
            return response.data
          } else {
            const response = await baseAxios.post(URL, BODY, options)
            setData(response.data)
            setLoading(false)
            return response.data
          }
        case 'put':
          if (TOKEN) {
            options.headers = {
              Authorization: `Bearer ${TOKEN}`,
            }
            const response = await baseAxios.put(URL, BODY, options)
            setData(response.data)
            setLoading(false)
            return response.data
          } else {
            const response = await baseAxios.put(URL, BODY, options)
            setData(response.data)
            setLoading(false)
            return response.data
          }
        case 'delete':
          options.data = { source: BODY }
          if (TOKEN) {
            options.headers = {
              Authorization: `Bearer ${TOKEN}`,
            }
            const response = await baseAxios.delete(URL, options)
            setData(response.data)
            setLoading(false)
            return response.data
          } else {
            const response = await baseAxios.delete(URL, options)
            setData(response.data)
            setLoading(false)
            return response.data
          }
        default:
          if (TOKEN) {
            options.headers = {
              Authorization: `Bearer ${TOKEN}`,
            }
            options.params = BODY
            const response = await baseAxios.get(URL, options)
            setData(response.data)
            setLoading(false)
            return response.data
          } else {
            const response = await baseAxios.get(URL, options)
            setData(response.data)
            setLoading(false)
            return response.data
          }
      }
    } catch (error) {
      setLoading(false)
      //   return error
      //   setModalState((oldState) => ({
      //     ...oldState,
      //     isDisplay: true,
      //     modalType: 'confirm',
      //     title: 'Login failed',
      //     isIndicator: false,
      //     detail: 'Username or password incorrect',
      //     onClickNegativeButton: onForgotPassword,
      //     onClickPositiveButton: onTryAgain,
      //     positiveButton: {
      //       text: 'Try again',
      //     },
      //     negativeButton: {
      //       text: 'Forgot password ?',
      //     },
      //   }))
    }
  }

  useEffect(() => {
    const source = axios.CancelToken.source()
    requestHandler(source)
    return () => {
      console.log('clean axios')
      source.cancel('Cancelling in cleanup')
    }
  }, [URL, timeout])

  return [data, loading]
}

export default useAxios
