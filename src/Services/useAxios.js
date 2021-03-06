import { useEffect, useState } from 'react'
import { useResetRecoilState, useSetRecoilState } from 'recoil'

import { atomState } from '../Atoms'
import axios from 'axios'
import requestHandler from './requestHandler'
import { useHistory } from 'react-router-dom'

const useAxios = (URL, TOKEN = false, BODY, METHOD, timeout = 0) => {
  const history = useHistory()

  const resetUserState = useResetRecoilState(atomState.userState)
  // const setModalState = useSetRecoilState(atomState.modalState)

  const [data, setData] = useState([])
  const [fetchTrigger, setFetchTrigger] = useState(false)
  const [trigger, setTrigger] = useState(false)

  const source = axios.CancelToken.source()

  const fireRequest = async () => {
    try {
      const response = await requestHandler(
        URL,
        TOKEN,
        BODY,
        METHOD,
        source,
        timeout,
      )
      setData(response)
    } catch (error) {
      if (error.statusCode === 403) {
        resetUserState()
        history.push('/')
      } else {
        setData({})
      }
    }
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
