import React, { useState, useEffect } from 'react'
import axios from 'axios'
import io from 'socket.io-client'
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
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import Modal from '../components/Modal/Modal'
import checkLogin from '../middleware/CheckLogin'

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

  const submitLogIn = async (e) => {
    try {
      const request = {
        username: username,
        password: password,
      }

      //  If user's login is successfully, server will response with access token and refresh token
      const response = await axios.post(process.env.REACT_APP_LOGIN, request)
      const { data } = response

      const socket = io.connect(process.env.REACT_APP_SOCKET_IO)

      setIsloading(true)

      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)

      //  Then user will join a specific room to real time communicate with server
      //  User has to waiting for server to send USER_GRANTED event
      socket.emit('join_room', { room: username })

      //  Add socket event listener to observe for USER_GRANTED event from server
      //  If server has received a request from HARDWARE and the process is succe
      //  Server will fire USER_GRANTED event and send information to user
      //  If access's granted user will successfully login
      //  then navigate to another page
      socket.on('USER_GRANTED', ({ message, granted, room }) => {
        //  Remove socket event listener
        socket.off('USER_GRANTED')

        setIsloading(!granted)

        //  Navigate to other page
        history.push('/menu')
      })
    } catch (error) {
      //  If login failed, server will response with status code 404
      //  And if server's down, error will occur
      //  Show the error modal with error message
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
      setIsError(true)
      setIsloading(false)
    }
  }

  useEffect(() => {
    (async () => {
      const credential = await checkLogin()
      if (credential) {
        history.push('/menu')
      } else {
        localStorage.clear()
      }
    })()
  }, [])

  const dismissError = () => setIsError(false)

  return (
    <Container>
      <Modal
        isShow={isError}
        dismissModal={dismissError}
        header={errorMsg.header}
        detail={errorMsg.message}
        isIndicator={false}
      />
      <Modal isShow={isLoading} dismissButton={false} />
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
