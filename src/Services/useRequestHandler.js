import { useRecoilState, useResetRecoilState } from 'recoil'

import { atomState } from '../Atoms'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const useRequestHandler = async (
  URL,
  TOKEN = false,
  BODY,
  METHOD,
  source,
  timeout = 0,
) => {
  const [userState, setUserState] = useRecoilState(atomState.userState)
  const resetUserStateDefaultValue = useResetRecoilState(atomState.userState)
  const baseAxiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_API}`,
  })

  const history = useHistory()

  let isSentRenewToken = false

  baseAxiosInstance.interceptors.response.use(
    (response) => {
      return response
    },
    async (error) => {
      try {
        const originalRequest = { ...error.config }

        if (error?.response?.status === 403 && !isSentRenewToken) {
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
          //   setData(response.data)
          return response.data
        } else {
          const response = await baseAxiosInstance.get(URL, options)
          //   setData(response.data)
          return response.data
        }
      case 'post':
        if (TOKEN) {
          options.headers = {
            Authorization: `Bearer ${userState.accessToken}`,
          }
          const response = await baseAxiosInstance.post(URL, BODY, options)
          //   setData(response.data)
          return response.data
        } else {
          const response = await baseAxiosInstance.post(URL, BODY, options)
          //   setData(response.data)
          return response.data
        }
      case 'put':
        if (TOKEN) {
          options.headers = {
            Authorization: `Bearer ${userState.accessToken}`,
          }
          const response = await baseAxiosInstance.put(URL, BODY, options)
          //   setData(response.data)
          return response.data
        } else {
          const response = await baseAxiosInstance.put(URL, BODY, options)
          //   setData(response.data)
          return response.data
        }
      case 'delete':
        options.data = { source: BODY }
        if (TOKEN) {
          options.headers = {
            Authorization: `Bearer ${userState.accessToken}`,
          }
          const response = await baseAxiosInstance.delete(URL, options)
          //   setData(response.data)
          return response.data
        } else {
          const response = await baseAxiosInstance.delete(URL, options)
          //   setData(response.data)
          return response.data
        }
      default:
        if (TOKEN) {
          options.headers = {
            Authorization: `Bearer ${userState.accessToken}`,
          }
          options.params = BODY
          const response = await baseAxiosInstance.get(URL, options)
          //   setData(response.data)
          return response.data
        } else {
          const response = await baseAxiosInstance.get(URL, options)
          //   setData(response.data)
          return response.data
        }
    }
  } catch (error) {
    source.cancel()
    // setData([])
    return Promise.reject(error)
  }
}
export default useRequestHandler
