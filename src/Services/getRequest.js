import axios from 'axios'

const getRequest = async (URL, BODY, TOKEN = false, METHOD) => {
  const api = axios.create({
    baseURL: `${process.env.REACT_APP_API}`,
  })

  switch (METHOD) {
    case 'get':
      try {
        if (TOKEN) {
          const response = await api.get(URL, {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            },
            params: BODY,
          })
          return response.data
        } else {
          const response = await api.post(URL)
          return response.data
        }
      } catch (error) {
        throw new Error(error)
      }

    case 'post':
      try {
        if (TOKEN) {
          const response = await api.post(URL, BODY, {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            },
          })
          return response.data
        } else {
          const response = await api.post(URL, BODY)
          return response.data
        }
      } catch (error) {
        throw error
      }
    case 'put':
      try {
        if (TOKEN) {
          const response = await api.put(URL, BODY, {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            },
          })
          return response.data
        } else {
          const response = await api.put(URL, BODY)
          return response.data
        }
      } catch (error) {
        throw error
      }
    default:
      try {
        if (TOKEN) {
          const response = await api.delete(URL, {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            },
          })
          return response.data
        } else {
          const response = await api.delete(URL, BODY)
          return response.data
        }
      } catch (error) {
        throw error
      }
  }
}

export default getRequest
