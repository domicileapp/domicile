import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useUsersStore = defineStore({
  id: 'users',
  state: () => ({
    users: {},
  }),
  actions: {
    async getAll() {
      this.users = { loading: true }
      api
        .get('/users')
        .then((users) => (this.users = users))
        .catch((error) => (this.users = { error }))
    },
  },
})
