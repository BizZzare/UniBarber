import axios from "axios"

const BASE_API_URL = process.env.REACT_APP_BASE_URL

export function checkStatus(responseData) {
  if (responseData.status >= 200 && responseData.status < 300)
    return responseData?.data

  const error = new Error(
    (responseData.data.response && responseData.data.response.message) || '',
  )
  error.response = responseData?.data
  throw error
}


export default function processRequest(url = '', method = 'GET', data = {}) {
    let headers = {
      'Content-Type': 'application/json',
    }

    console.log(url, method);

    return axios({
      method,
      data: JSON.stringify(data),
      headers,
      url: BASE_API_URL + url,
    })
      .then((res) => checkStatus(res))
      .catch((err) => {
        throw err
      })
  }