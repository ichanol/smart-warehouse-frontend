import { Redirect, Route } from 'react-router-dom'

import React from 'react'
import atomState from '../Atoms/Atoms'
import { useRecoilValue } from 'recoil'

const PrivateRoute = ({ component: Component, routePermission, ...rest }) => {
  const userState = useRecoilValue(atomState.userState)

  const [matchedPermission] = userState.permission.filter(
    (value) => value.permission === routePermission,
  )
  const { status } = matchedPermission?.permission
    ? matchedPermission
    : { status: false }
  const isUserAuthorized = !!status

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isUserAuthorized) {
          return <Component {...props} />
        } else {
          return <Redirect to={'/'} />
        }
      }}
    />
  )
}

export default PrivateRoute

/**
 * const verifyRefreshToken = () => {
    try {
      const { exp: refreshTokenExpiredTime } = verify(
        userState.refreshToken,
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
        userState.accessToken,
        process.env.REACT_APP_ACCESS_TOKEN,
      )
      return true
    } catch (error) {
      return false
    }
  }

  const verifyUserToken = async(isAccessTokenValid, isRefreshTokenValid, source) => {
    if (!isAccessTokenValid && isRefreshTokenValid) {
      // await requestNewToken(source)
      console.log('renewToken')
    } else if (!isAccessTokenValid && !isRefreshTokenValid) {
      console.log('go to home')
      // resetUserStateDefaultValue()
      // resetReadProductListStateDefaultValue()
    }
  }

  const verifyUserTokenHandler = (source) => {
    // const isAccessTokenValid = verifyAccessToken()
    // const isRefreshTokenValid = verifyRefreshToken()
    // verifyUserToken(isAccessTokenValid, isRefreshTokenValid, source)
  }
 */
