import React, { useEffect } from 'react'
import axios from 'axios'

import { Navbar } from '../components'
import { Container } from './MenuStyle'
import {
  useRecoilValue,
  useSetRecoilState,
  useRecoilCallback,
  Snapshot,
} from 'recoil'
import atomState from '../Atoms/Atoms'
import { userLoginSelector } from '../Selectors/UserSelector'

const Menu = () => {
  const username = useRecoilValue(atomState.userState)
  const setUsername = useSetRecoilState(userLoginSelector('eiei'))

  const test = useRecoilCallback(({ set }) => async () => {
    try {
      const response = await axios.post(process.env.REACT_APP_LOGIN, {
        username: 'tip',
        password: 'tip',
      })
      const { data } = response
      set(atomState.userState, data)
    } catch (error) {
      console.log(error)
    }
  })

  useEffect(() => {
    //console.log('menu', username)
  }, [username])

  return (
    <Container>
      {username.username}
      <Navbar />
      <button
        type='button'
        onClick={() => {
          //test()
        }}>
        enter
      </button>
    </Container>
  )
}

export default Menu
