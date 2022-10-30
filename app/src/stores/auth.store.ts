import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')),
    returnUrl: null,
  }),
  actions: {
    async login(username: string, password: string) {
      const user = await api.post('/auth/login', { username, password })
      this.user = user.data

      localStorage.setItem('user', JSON.stringify(user.data))
      ;(api.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${this.user.accessToken}`),
        this.router.push(this.returnUrl || '/')
    },
    logout() {
      this.user = null
      localStorage.removeItem('user')
      this.router.push('/login')
    },
  },
})
