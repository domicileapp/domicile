import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

interface Credentials {
  username: string
  password: string
}

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    loading: false as boolean,
    user: null,
    loggedIn: localStorage.getItem('accessToken') ? true : false,
  }),
  getters: {},
  actions: {
    async login(credentials: Credentials) {
      this.loading = true
      const response = (await api.post('auth/login', credentials)).data

      if (response) {
        const accessToken = `Bearer ${response.accessToken}`
        localStorage.setItem('accessToken', accessToken)
        api.defaults.headers.common['Authorization'] = accessToken
        this.user = response
        this.loggedIn = true
        this.loading = false
        this.router.push('/')
      }
    },
    async logout() {
      const response = await (await api.post('auth/logout')).data
      if (response) {
        localStorage.removeItem('accessToken')
        this.$reset()
      }
    },
    async refreshToken() {},
  },
  persist: true,
})
