import axios from 'axios'
import { verify } from 'jsonwebtoken'

const requestNewToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken')
    const response = await axios.get(process.env.REACT_APP_RENEW_TOKEN, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    })
    const { newAccessToken, newRefreshToken, username } = response.data
    localStorage.setItem('accessToken', newAccessToken)
    localStorage.setItem('refreshToken', newRefreshToken)

    return { accessToken: newAccessToken, username }
  } catch (error) {
    return false
  }
}

const checkRefreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken')

    const { exp: refreshTokenExpiredTime } = verify(
      refreshToken,
      process.env.REACT_APP_REFRESHER_TOKEN,
    )

    const isExpired = Date.now() >= refreshTokenExpiredTime * 1000

    if (isExpired) {
      return false
    } else {
      return requestNewToken()
    }
  } catch (error) {
    return false
  }
}

const checkLogin = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken')

    const { exp: accessTokenExpiredTime, payload: username } = verify(
      accessToken,
      process.env.REACT_APP_ACCESS_TOKEN,
    )

    const isExpired = Date.now() >= accessTokenExpiredTime * 1000

    if (isExpired) {
      return await checkRefreshToken()
    } else {
      return { accessToken, username }
    }
  } catch (error) {
    return await checkRefreshToken()
  }
}

export default checkLogin
