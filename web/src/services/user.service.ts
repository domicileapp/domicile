import axios from 'axios'

const API_URL = 'http://localhost:3000/api/v1/'

export const publicContent = () => {
  return axios.get(API_URL + '')
}
