import axios from 'axios'

const getRequest = async (URL, TOKEN = false, params) => {
  const api = axios.create({
    baseURL: `${process.env.REACT_APP_API}`,
  })

  try {
    if (TOKEN) {
      const response = await api.get(URL, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
        params: params,
      })
      return response.data
    } else {
      const response = await api.post(URL)
      return response.data
    }
  } catch (error) {
    throw new Error(error)
  }
}

export default getRequest
