import { defineStore } from 'pinia'

/** Global state */
type GlobalState = {
  /** Loading overlay */
  loading: boolean
}

/** Global Store */
export default defineStore('global', {
  // Default Global State
  state: (): GlobalState => ({
    loading: true,
  }),
  // Getters
  getters: {},
  // Actions
  actions: {
    /** Show loading Overlay */
    setLoading(display: boolean) {
      this.loading = display
    },
  },
  persist: {
    key: import.meta.env.VITE_APP_WEBSTORAGE_NAMESPACE || 'vuetify',
    storage: window.localStorage,
  },
})
