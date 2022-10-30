import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { useAuthStore } from './auth.store'

const authStore = useAuthStore()

export const useTasksStore = defineStore({
  id: 'tasks',
  state: () => ({
    tasks: null,
    loading: true,
  }),
  actions: {
    async getAllTasks() {
      try {
        this.loading = true
        const tasks = await api.get('/tasks', {
          headers: {
            Authorization: `Bearer ${authStore.user.accessToken}`,
          },
        })
        this.tasks = tasks.data
        console.log(tasks.data)
        this.loading = false
      } catch (error) {
        console.error(error)
      }
    },
  },
})
