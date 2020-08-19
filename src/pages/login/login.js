import React, { useState } from 'react'
import axios from 'axios'

import './login.css'

function Login() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    let request = {
      username: username,
      password: password
    }
    axios.post('http://localhost:8000/users/login', request)
      .then(res => {
        console.log(res.data.message)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className='form'>
      <div className='header'>
        <label>LOG IN</label>
      </div>
      <form className='login-form' onSubmit={handleSubmit}>
        <input
          id='username'
          placeholder='Username'
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          id='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className='button-block'>
          <button type='submit'>Log in</button>
        </div>
      </form>
    </div>
  )
}

export default Login