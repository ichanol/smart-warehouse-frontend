import React, { useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useRecoilValue, useResetRecoilState } from 'recoil'

import { atomState } from '../Atoms'
import { verify } from 'jsonwebtoken'

const PrivateRoute = ({ component: Component, routePermission, ...rest }) => {
  const userState = useRecoilValue(atomState.userState)
  const resetUserStateDefaultValue = useResetRecoilState(atomState.userState)

  const [matchedPermission] = userState.permission.filter(
    (value) => value.permission === routePermission,
  )
  const { status } = matchedPermission?.permission
    ? matchedPermission
    : { status: false }
  const isUserAuthorized = !!status

  const verifyRefreshToken = () => {
    try {
      const { exp: refreshTokenExpiredTime } = verify(
        window.localStorage.getItem('refreshToken'),
        process.env.REACT_APP_REFRESHER_TOKEN,
      )
      return true
    } catch (error) {
      return false
    }
  }

  const verifyAccessToken = () => {
    try {
      const { exp: accessTokenExpiredTime } = verify(
        window.localStorage.getItem('accessToken'),
        process.env.REACT_APP_ACCESS_TOKEN,
      )
      return true
    } catch (error) {
      return false
    }
  }

  const verifyUserToken = (isAccessTokenValid, isRefreshTokenValid) => {
    if (!isAccessTokenValid && !isRefreshTokenValid) {
      resetUserStateDefaultValue()
    }
  }

  const verifyUserTokenHandler = () => {
    const isAccessTokenValid = verifyAccessToken()
    const isRefreshTokenValid = verifyRefreshToken()
    verifyUserToken(isAccessTokenValid, isRefreshTokenValid)
  }

  useEffect(() => {
    verifyUserTokenHandler()
  }, [])

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isUserAuthorized || routePermission === 'public') {
          return <Component {...props} />
        } else {
          return <Redirect to={'/'} />
        }
      }}
    />
  )
}

export default PrivateRoute
