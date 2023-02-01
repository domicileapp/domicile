import axios from 'axios'
import tokenService from './token.service'

const BASE_URL = 'http://localhost:3000/api/v1'

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    common: {
      Authorization: localStorage.getItem('accessToken'),
      // 'Access-Control-Allow-Headers': true,
    },
  },
  // withCredentials: true,
})

api.interceptors.response.use(
  (res) => {
    return res
  },
  async (err) => {
    const originalConfig = err.config
    if (originalConfig.url !== '/auth/login' && err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true
      }

      try {
        const rs = await api.post('/auth/refresh', {
          refreshToken: tokenService.getLocalRefreshToken(),
        })

        const { accessToken } = rs.data

        // refresh the token here
        // update the token
        tokenService.updateLocalAccessToken(accessToken)

        return api(originalConfig)
      } catch (_error) {
        return Promise.reject(_error)
      }
    }
  }
)

export { axios, api }
