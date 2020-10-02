import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRecoilCallback, useRecoilValue } from 'recoil'
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
} from './loginStyle.js'

import Modal from '../components/Modal/Modal'
import atomState from '../Atoms/Atoms'

const Login = () => {
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsloading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMsg, setErrorMsg] = useState({
    header: 'Error',
    message: "Can't connect to the server",
  })
  const { register, handleSubmit, errors } = useForm()

  const userState = useRecoilValue(atomState.userState)

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

      history.push('/menu')
    } catch (error) {
      if (error.message === 'Request failed with status code 404') {
        setErrorMsg({
          header: 'Login failed',
          message: 'Username or password incorrect',
        })
      } else if (error.message === 'Network Error') {
        setErrorMsg({
          header: 'Error',
          message: "Can't connect to the server",
        })
      }
      setIsloading(false)
      setIsError(true)
    }
  })

  useEffect(() => {
    if (userState.isLogin) {
      history.push('/menu')
    } else {
    }
  }, [])

  const onTryAgain = () => setIsError(false)
  const onForgotPassword = () => setIsError(false)

  return (
    <Container>
      <Modal
        isDisplay={isError}
        isFlex={false}
        header={errorMsg.header}
        detail={errorMsg.message}
        isIndicator={false}
        primaryButton={{
          display: true,
          text: 'Forgot password ?',
          color: 'gray',
          fill: 'white',
          stroke: 'transparent',
        }}
        primaryButtonFN={onForgotPassword}
        secondaryButton={{
          display: true,
          text: 'Try again',
          color: 'white',
          fill: '#1fe073',
          stroke: '#1fe073',
        }}
        secondaryButtonFN={onTryAgain}
      />
      <Form blur={isLoading || isError}>
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
