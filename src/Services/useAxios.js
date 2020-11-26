import { useEffect, useState } from 'react'

import axios from 'axios'
import requestHandler from './requestHandler'

const useAxios = (URL, TOKEN = false, BODY, METHOD, timeout = 0) => {
  const [data, setData] = useState([])
  const [fetchTrigger, setFetchTrigger] = useState(false)
  const [trigger, setTrigger] = useState(false)

  const source = axios.CancelToken.source()

  const fireRequest = async () => {
    const response = await requestHandler(
      URL,
      TOKEN,
      BODY,
      METHOD,
      source,
      timeout,
    )
    setData(response)
  }

  useEffect(() => {
    if (fetchTrigger) {
      fireRequest()
    }
    return () => {
      source.cancel('abort service request')
    }
  }, [fetchTrigger, trigger])

  return [data, trigger, setTrigger, setFetchTrigger]
}

export default useAxios
