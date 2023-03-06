import axios from 'axios'

const API_URL =
  'http://localhost:3000/api/v1/auth/' || process.env.API_LOGIN_URL

export const login = (username: string, password: string) => {
  return axios
    .post(API_URL + 'login', {
      username,
      password,
    })
    .then((res) => {
      if (res.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(res.data))
      }

      return res.data
    })
}

export const logout = () => {
  localStorage.removeItem('user')
}

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user')
  if (userStr) return JSON.parse(userStr)
  return null
}
