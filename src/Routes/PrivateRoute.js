import React, { useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useRecoilCallback, useRecoilValue, useResetRecoilState } from 'recoil'

import atomState from '../Atoms/Atoms'
import { getRequest } from '../Services'
import { verify } from 'jsonwebtoken'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const userState = useRecoilValue(atomState.userState)
  const resetUserStateDefaultValue = useResetRecoilState(atomState.userState)
  const resetReadProductListStateDefaultValue = useResetRecoilState(
    atomState.readProductListState,
  )

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
    const isAccessTokenValid = verifyAccessToken()
    const isRefreshTokenValid = verifyRefreshToken()
    verifyUserToken(isAccessTokenValid, isRefreshTokenValid)
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
