import axios from 'axios'

const postRequest = async (URL, BODY, TOKEN = false) => {
  try {
    if (TOKEN) {
      const response = await axios.post(URL, BODY, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      return response.data
    } else {
      const response = await axios.post(URL, BODY)
      return response.data
    }
  } catch (error) {
    if (error?.response?.status) {
      throw new Error(error?.response?.status)
    } else {
      throw new Error(error)
    }
  }
}

export default postRequest
