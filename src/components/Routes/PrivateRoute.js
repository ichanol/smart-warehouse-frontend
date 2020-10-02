import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import axios from 'axios'
import { verify } from 'jsonwebtoken'
import { useRecoilCallback, useRecoilValue, useResetRecoilState } from 'recoil'
import atomState from '../../Atoms/Atoms'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const userState = useRecoilValue(atomState.userState)
  const resetUserStateDefaultValue = useResetRecoilState(atomState.userState)
  const resetReadProductListStateDefaultValue = useResetRecoilState(
    atomState.readProductListState,
  )

  const storage = window.localStorage.getItem('userState')

  const requestNewToken = useRecoilCallback(({ set }) => async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_RENEW_TOKEN, {
        headers: {
          Authorization: `Bearer ${JSON.parse(storage).value.refreshToken}`,
        },
      })
      const { newAccessToken, newRefreshToken } = response.data
      set(atomState.userState, (oldState) => {
        const newState = { ...oldState }
        newState.accessToken = newAccessToken
        newState.refreshToken = newRefreshToken
        return newState
      })
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
        JSON.parse(storage).value.refreshToken,
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
        JSON.parse(storage).value.accessToken,
        process.env.REACT_APP_ACCESS_TOKEN,
      )
      return true
    } catch (error) {
      return false
    }
  }

  useEffect(() => {
    console.log('///')
    console.log({ ...rest })

    const isAccessTokenValid = verifyAccessToken()
    const isRefreshTokenValid = verifyRefreshToken()
    if (!isAccessTokenValid && isRefreshTokenValid) {
      requestNewToken()
    } else if (!isAccessTokenValid && !isRefreshTokenValid) {
      resetUserStateDefaultValue()
      resetReadProductListStateDefaultValue()
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
