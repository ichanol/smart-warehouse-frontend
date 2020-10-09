import axios from 'axios'

const getRequest = async (URL, TOKEN = false) => {
  try {
    if (TOKEN) {
      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      return response.data
    } else {
      const response = await axios.post(URL)
      return response.data
    }
  } catch (error) {
    throw new Error(error)
  }
}

export default getRequest
