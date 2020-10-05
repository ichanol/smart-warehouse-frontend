import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  useRecoilCallback,
  useRecoilValue,
  useRecoilState,
  useResetRecoilState,
} from 'recoil'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import 'react-activity/dist/react-activity.css'
import {
  Container,
  Form,
  Header,
  Head,
  Input,
  Error,
  Button,
} from './LoginStyle.js'

import { Modal } from '../components/Modal'
import atomState from '../Atoms/Atoms'

const Login = () => {
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { register, handleSubmit, errors } = useForm()

  const userState = useRecoilValue(atomState.userState)
  const [modalState, setModalState] = useRecoilState(atomState.modalState)
  const resetDefaultModalState = useResetRecoilState(atomState.modalState)

  const onTryAgain = () => resetDefaultModalState()

  const onForgotPassword = () => resetDefaultModalState()

  const submitLogIn = useRecoilCallback(({ set }) => async () => {
    try {
      const request = {
        username: username,
        password: password,
      }

      const response = await axios.post(process.env.REACT_APP_LOGIN, request)
      const { data } = response

      set(atomState.userState, (oldState) => {
        const newUserState = { ...oldState }
        newUserState.username = username
        newUserState.accessToken = data.accessToken
        newUserState.refreshToken = data.refreshToken
        newUserState.isLogin = data.success
        return newUserState
      })

      history.push('/overview')
    } catch (error) {
      if (error.message === 'Request failed with status code 404') {
        setModalState((oldState) => {
          const temp = { ...oldState }
          temp.isDisplay = true
          temp.modalType = 'confirm'
          temp.title = 'Login failed'
          temp.isIndicator = false
          temp.detail = 'Username or password incorrect'
          temp.negativeButtonFN = onForgotPassword
          temp.positiveButtonFN = onTryAgain
          temp.positiveButton = {
            text: 'Try again',
          }
          temp.negativeButton = {
            text: 'Forgot password ?',
          }
          return temp
        })
      } else if (error.message === 'Network Error') {
        setModalState((oldState) => {
          const temp = { ...oldState }
          temp.isDisplay = true
          temp.modalType = 'error'
          temp.title = 'Network error'
          temp.isIndicator = false
          temp.detail = "Can't connect to the server"
          temp.negativeButtonFN = onForgotPassword
          temp.positiveButtonFN = onTryAgain
          temp.positiveButton = {
            text: 'Try again',
          }
          return temp
        })
      }
    }
  })

  useEffect(() => {
    if (userState.isLogin) {
      history.push('/overview')
    } else {
    }
  }, [])

  return (
    <Container>
      <Modal />
      <Form blur={modalState.isDisplay}>
        <Header>
          <Head>LOG IN</Head>
        </Header>

        <form className='login-form' onSubmit={handleSubmit(submitLogIn)}>
          <Input
            id='username'
            name='username'
            ref={register({
              required: true,
              maxLength: 15,
            })}
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Error>
            {errors.username?.type === 'required' && 'Username is require'}
            {errors.username?.type === 'maxLength' && 'Max'}
          </Error>
          <Input
            id='password'
            name='password'
            ref={register({
              required: true,
              maxLength: 15,
            })}
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Error>
            {errors.password?.type === 'required' && 'Password is require'}
            {errors.password?.type === 'maxLength' && 'Max'}
          </Error>
          <Button type='submit'>Log in</Button>
        </form>
      </Form>
    </Container>
  )
}

export default Login
