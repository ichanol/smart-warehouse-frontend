import React, { useState, useEffect } from 'react'
import axios from 'axios'
import io from 'socket.io-client'
import { useHistory } from 'react-router-dom'

import { Form, Header, Head, Input, Button, Container } from './loginStyle.js'
import Modal from '../components/Modal/Modal'

const socket = io.connect(process.env.REACT_APP_SOCKET_IO)

const Login = () => {
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState({ accessToken: '', refreshToken: '' })
  const [isLoading, setIsloading] = useState(false)
  const [isError, setIsError] = useState(false)

  const submitLogIn = (e) => {
    e.preventDefault()
    const request = {
      username: username,
      password: password,
    }
    axios
      .post(process.env.REACT_APP_LOGIN, request)
      .then((res) => {
        //  If login success, server will response with access token and refresh token
        const { status, data } = res
        if (status === 200) {
          setToken({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          })
          setIsloading(true)
          localStorage.setItem('accessToken', data.accessToken)
          localStorage.setItem('refreshToken', data.refreshToken)

          //  Then user will join a specific room to real time communicate with server
          //  User has to waiting for server to send USER_GRANTED event
          socket.emit('join_room', { room: username })

          //  Add socket event listener to observe for USER_GRANTED event from server
          //  If server received a request from HARDWARE and the server process is success
          //  Server will fire USER_GRANTED event and send information to user
          //  If access's granted user will successfully login
          //  then navigate to another page
          socket.on('USER_GRANTED', ({ message, granted, room }) => {
            setIsloading(!granted)
            console.log(username)
            history.push({
              pathname: '/import-export',
              state: {
                username: username,
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
              },
            })
          })
        }
      })
      .catch((error) => {
        //  If login failed, server will response with status code 404
        setIsError(true)
        setIsloading(false)
      })
  }

  const requestNewToken = () => {
    // Embedded an old refresh token in body to send a request
    axios
      .post(process.env.REACT_APP_REQUEST_NEW_TOKEN, {
        token: `Bearer ${token.refreshToken}`,
      })
      .then((res) => {
        // If old refresh token's working properly
        // Server will response with new access token and refresh token
        setToken({
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken,
        })
      })
      .catch((err) => {
        // If old refresh token's expired
        // Force log out to make user log in again to receive a new access token
      })
  }

  const sendMOCKrequest = () => {
    // Embedded access token in Authorization header to send a request
    axios
      .get(process.env.REACT_APP_MOCK_REQUEST, {
        headers: { Authorization: `Bearer ${token.accessToken}` },
      })
      .then((res) => {
        // If access token's working properly
        // Do something with response from server
      })
      .catch((err) => {
        // If access token's expired
        // Send request to ask for new access token and new refresh token from server
        // by using old refresh token that's still working
        requestNewToken()
      })
  }

  useEffect(() => {
    //  Remove socket event listener when unmounted
    return () => {
      console.log('UNMOUNTED')
      socket.off('USER_GRANTED')
    }
  }, [])

  const dismissError = () => setIsError(false)

  return (
    <Container>
      <Modal
        isShow={isError}
        dismissModal={dismissError}
        header={'Error'}
        detail={'Error details'}
        isIndicator={false}
      />
      <Modal isShow={isLoading} dismissButton={false} />
      <Form blur={isLoading || isError}>
        <Header>
          <Head>LOG IN</Head>
        </Header>
        <form className='login-form' onSubmit={submitLogIn}>
          <Input
            id='username'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            id='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type='submit'>
            <span>Log in</span>
          </Button>
        </form>
      </Form>
    </Container>
  )
}

export default Login
