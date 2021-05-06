import {
  Button,
  Container,
  Error,
  Form,
  Head,
  Header,
  Input,
} from './LoginStyle'
import React, { useEffect, useState } from 'react'
import {
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
} from 'recoil'

import { Modal } from '../components'
import atomState from '../Atoms/Atoms'
import { requestHandler } from '../Services'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

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

  const errorHandler = (error) => {
    if (
      parseInt(error?.message, 10) >= 400 &&
      parseInt(error?.message, 10) < 500
    ) {
      setModalState((oldState) => ({
        ...oldState,
        isDisplay: true,
        modalType: 'confirm',
        title: 'Login failed',
        isIndicator: false,
        detail: 'Username or password incorrect',
        onClickNegativeButton: onForgotPassword,
        onClickPositiveButton: onTryAgain,
        positiveButton: {
          text: 'Try again',
        },
        negativeButton: {
          text: 'Forgot password ?',
        },
      }))
    } else {
      setModalState((oldState) => ({
        ...oldState,
        isDisplay: true,
        modalType: 'error',
        title: 'Network error',
        isIndicator: false,
        detail: "Can't connect to the server",
        onClickNegativeButton: onForgotPassword,
        onClickPositiveButton: onTryAgain,
        positiveButton: {
          text: 'Try again',
        },
      }))
    }
  }

  const submitLogIn = useRecoilCallback(({ set }) => async () => {
    try {
      const requestBody = {
        username: username,
        password: password,
      }
      const response = await requestHandler(
        '/login',
        false,
        requestBody,
        'post',
      )
      window.localStorage.setItem('accessToken', response.accessToken)
      window.localStorage.setItem('refreshToken', response.refreshToken)
      set(atomState.userState, (oldState) => ({
        ...oldState,
        username: username,
        isLogin: response.success,
        permission: response.permission,
      }))

      const { permission } = response
      const temp = permission.filter((value) => value.status === 1)
      history.push(temp[0].url)
    } catch (error) {
      errorHandler(error)
    }
  })

  useEffect(() => {
    if (userState.isLogin) {
      history.push('/overview')
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
            onChange={(event) => setUsername(event.target.value)}
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
              maxLength: 20,
            })}
            type='password'
            placeholder='Password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
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
