import axios from 'axios'
import axiosInstance from './axiosInstance'

const requestHandler = async (
  URL,
  TOKEN,
  BODY,
  METHOD,
  sourceFromHook,
  timeout = 0,
) => {
  let source
  let response

  if (sourceFromHook) {
    source = sourceFromHook
  } else {
    source = axios.CancelToken.source()
  }

  const options = {
    cancelToken: source.token,
    timeout: timeout,
  }
  if (TOKEN) {
    options.headers = {
      Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
    }
  }

  try {
    switch (METHOD) {
      case 'get':
        options.params = BODY
        response = await axiosInstance.get(URL, options)
        return response.data
      case 'post':
        response = await axiosInstance.post(URL, BODY, options)
        return response.data
      case 'put':
        response = await axiosInstance.put(URL, BODY, options)
        return response.data
      default:
        options.data = { source: BODY }
        response = await axiosInstance.delete(URL, options)
        return response.data
    }
  } catch (error) {
    source.cancel()
    return Promise.reject(error)
  }
}

export default requestHandler
