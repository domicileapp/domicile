import { defineStore } from 'pinia'

/** Config State */
type ConfigState = {
  /** Dark Theme mode */
  themeDark: boolean
}

/** Config Store */
export default defineStore('config', {
  // Default Config State
  state: (): ConfigState => ({
    themeDark:
      window.matchMedia('(prefers-color-scheme: dark)').matches || true,
  }),
  actions: {
    toggleTheme() {
      this.themeDark = !this.themeDark
    },
  },
  persist: {
    key: import.meta.env.VITE_APP_WEBSTORAGE_NAMESPACE || 'vuetify',
    storage: window.sessionStorage,
  },
})
