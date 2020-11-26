import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API}`,
})

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    try {
      const originalRequest = { ...error.config }

      if (error?.response?.status === 403 && !originalRequest.retry) {
        originalRequest.retry = true
        const response = await axiosInstance.get('/renewtoken', {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem('refreshToken')}`,
          },
        })
        window.localStorage.setItem('accessToken', response.data.newAccessToken)
        window.localStorage.setItem('refreshToken', response.data.newRefreshToken)
        originalRequest.headers.Authorization = 'Bearer ' + response.data.newAccessToken
        return axiosInstance.request(originalRequest)
      }
      return Promise.reject(error)
    } catch (renewTokenError) {
      return Promise.reject(renewTokenError)
    }
  },
)

export default axiosInstance
