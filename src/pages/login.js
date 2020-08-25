import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Dots } from 'react-activity'
import io from 'socket.io-client'
import 'react-activity/dist/react-activity.css'
import { Form, Header, Head, Input, Button } from './loginStyle.js'
import { useHistory } from 'react-router-dom'

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
          //  Then user will join a specific room to real time communicate with server
          //  User has to waiting for server to send USER_GRANTED event
          socket.emit('join_room', { room: username })
        }
      })
      .catch((error) => {
        //  If login failed, server will response with status code 404
        setIsError(true)
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
    //  Add socket event listener to observe for USER_GRANTED event from server
    //  If server received a request from HARDWARE and the server process is success
    //  Server will fire USER_GRANTED event and send information to user
    //  If access's granted user will successfully login
    //  then navigate to another page
    socket.on('USER_GRANTED', ({ message, granted, room }) => {
      setIsloading(!granted)
      history.push('/import-export')
    })
    //  Remove socket event listener when unmounted
    return () => {
      socket.off('USER_GRANTED')
    }
  }, [])
  return (
    <Form>
      {isLoading && <Dots />}
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
        <Button type='submit'>Log in</Button>
      </form>
    </Form>
  )
}

export default Login
