import { useEffect, useState } from 'react'
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil'

import { atomState } from '../Atoms'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const useAxios = (URL, TOKEN = false, BODY, METHOD, timeout = 0) => {
  const [data, setData] = useState([])
  const history = useHistory()

  const setModalState = useSetRecoilState(atomState.modalState)
  const [userState, setUserState] = useRecoilState(atomState.userState)
  const resetUserStateDefaultValue = useResetRecoilState(atomState.userState)

  let isSentRenewToken = false

  const baseAxiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_API}`,
  })
  const source = axios.CancelToken.source()

  baseAxiosInstance.interceptors.response.use(
    (response) => {
      return response
    },
    async (error) => {
      try {
        const originalRequest = { ...error.config }

        if (error.response.status === 403 && !isSentRenewToken) {
          isSentRenewToken = true
          const response = await baseAxiosInstance.get('/renewtoken', {
            cancelToken: source.token,
            headers: {
              Authorization: `Bearer ${userState.refreshToken}`,
            },
          })
          const { newAccessToken } = response.data
          setUserState((oldState) => ({
            ...oldState,
            accessToken: response.data.newAccessToken,
            refreshToken: response.data.newRefreshToken,
          }))
          originalRequest.headers.Authorization = 'Bearer ' + newAccessToken
          return baseAxiosInstance.request(originalRequest)
        }
        return Promise.reject(error)
      } catch (renewTokenError) {
        resetUserStateDefaultValue()
        history.push('/')
        return Promise.reject(renewTokenError)
      }
    },
  )

  const requestHandler = async () => {
    try {
      const options = {
        cancelToken: source.token,
        timeout: timeout,
      }
      switch (METHOD) {
        case 'get':
          if (TOKEN) {
            options.headers = {
              Authorization: `Bearer ${userState.accessToken}`,
            }
            options.params = BODY
            const response = await baseAxiosInstance.get(URL, options)
            setData(response.data)
            return response.data
          } else {
            const response = await baseAxiosInstance.get(URL, options)
            setData(response.data)
            return response.data
          }
        case 'post':
          if (TOKEN) {
            options.headers = {
              Authorization: `Bearer ${userState.accessToken}`,
            }
            const response = await baseAxiosInstance.post(URL, BODY, options)
            setData(response.data)
            return response.data
          } else {
            const response = await baseAxiosInstance.post(URL, BODY, options)
            setData(response.data)
            return response.data
          }
        case 'put':
          if (TOKEN) {
            options.headers = {
              Authorization: `Bearer ${userState.accessToken}`,
            }
            const response = await baseAxiosInstance.put(URL, BODY, options)
            setData(response.data)
            return response.data
          } else {
            const response = await baseAxiosInstance.put(URL, BODY, options)
            setData(response.data)
            return response.data
          }
        case 'delete':
          options.data = { source: BODY }
          if (TOKEN) {
            options.headers = {
              Authorization: `Bearer ${userState.accessToken}`,
            }
            const response = await baseAxiosInstance.delete(URL, options)
            setData(response.data)
            return response.data
          } else {
            const response = await baseAxiosInstance.delete(URL, options)
            setData(response.data)
            return response.data
          }
        default:
          if (TOKEN) {
            options.headers = {
              Authorization: `Bearer ${userState.accessToken}`,
            }
            options.params = BODY
            const response = await baseAxiosInstance.get(URL, options)
            setData(response.data)
            return response.data
          } else {
            const response = await baseAxiosInstance.get(URL, options)
            setData(response.data)
            return response.data
          }
      }
    } catch (error) {
      source.cancel()
      return Promise.reject(error)
    }
  }

  useEffect(() => {
    requestHandler()

    return () => {
      source.cancel('Cancelling in cleanup')
    }
  }, [URL, timeout])

  return data
}

export default useAxios

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
