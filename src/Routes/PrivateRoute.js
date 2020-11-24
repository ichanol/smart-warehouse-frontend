import React, { useEffect } from 'react'
import { Redirect, Route, useHistory } from 'react-router-dom'
import { getRequest, useAxios } from '../Services'
import { useRecoilCallback, useRecoilValue, useResetRecoilState } from 'recoil'

import atomState from '../Atoms/Atoms'
import { verify } from 'jsonwebtoken'

const PrivateRoute = ({ component: Component, routePermission, ...rest }) => {
  const history = useHistory()

  const userState = useRecoilValue(atomState.userState)
  const resetUserStateDefaultValue = useResetRecoilState(atomState.userState)
  const resetReadProductListStateDefaultValue = useResetRecoilState(
    atomState.readProductListState,
  )

  const [matchedPermission] = userState.permission.filter(
    (value) => value.permission === routePermission,
  )
  const { status } = matchedPermission?.permission
    ? matchedPermission
    : { status: true }
  const isUserAuthorized = !!status === true

  const requestNewToken = useRecoilCallback(({ set }) => async () => {
    try {
      const response = await getRequest(
        `${process.env.REACT_APP_API}/renewtoken`,
        userState.refreshToken,
      )
      set(atomState.userState, (oldState) => ({
        ...oldState,
        accessToken: response.newAccessToken,
        refreshToken: response.newRefreshToken,
      }))
      history.go(0)
      return true
    } catch (error) {
      resetUserStateDefaultValue()
      resetReadProductListStateDefaultValue()
      return false
    }
  })

  const verifyRefreshToken = () => {
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

  const verifyUserToken = (isAccessTokenValid, isRefreshTokenValid) => {
    if (!isAccessTokenValid && isRefreshTokenValid) {
      requestNewToken()
    } else if (!isAccessTokenValid && !isRefreshTokenValid) {
      resetUserStateDefaultValue()
      resetReadProductListStateDefaultValue()
    }
  }

  useEffect(() => {
    console.log(routePermission, 'Authorized:', isUserAuthorized)
    if (!isUserAuthorized) {
      history.goBack()
    } else {
      const isAccessTokenValid = verifyAccessToken()
      const isRefreshTokenValid = verifyRefreshToken()
      verifyUserToken(isAccessTokenValid, isRefreshTokenValid)
    }
  }, [])

  return (
    <Route
      {...rest}
      render={(props) => {
        if (userState.isLogin) {
          return <Component {...props} />
        } else {
          return <Redirect to={'/'} />
        }
      }}
    />
  )
}

export default PrivateRoute
