import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { useAuthStore } from './auth.store'
import { ITask } from '@domicile/contracts'

const authStore = useAuthStore()

export const useTasksStore = defineStore({
  id: 'tasks',
  state: () => ({
    tasks: [] as ITask[],
    task: {} as ITask,
    loading: true,
  }),
  actions: {
    async getAllTasks() {
      try {
        this.loading = true
        const tasksData = await api.get('/tasks')
        this.tasks = tasksData.data
        console.log(tasksData.data)
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    async createTask(task: ITask) {
      try {
        this.loading = true
        const createTask = await api.post('/tasks', { task })
        this.task = createTask.data
        this.getAllTasks()
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },
  },
})
