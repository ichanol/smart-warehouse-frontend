import React from 'react'
import { Redirect } from 'react-router-dom'

const RedirectNotFound = () => {
  return <Redirect to='/not-found' />
}

export default RedirectNotFound
