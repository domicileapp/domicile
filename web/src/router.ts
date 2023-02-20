import {
  createRouter,
  createWebHistory,
  type Router,
  type NavigationGuardNext,
  type RouteLocationNormalized,
  type RouteRecordRaw,
} from 'vue-router'
import { nextTick } from 'vue'

// Pinia Store
import { useGlobal } from '@/store'

// Components
import AboutPage from '@/views/AboutPage.vue'
import HomePage from '@/views/HomePage.vue'
import TasksPage from '@/views/TasksPage.vue'
import CookingPage from '@/views/CookingPage.vue'
import LoginPage from '@/views/LoginPage.vue'

/** Router Rules */
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage,
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: TasksPage,
  },
  {
    path: '/cooking',
    name: 'Cooking',
    component: CookingPage,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
]

/** Vue Router */
const router: Router = createRouter({
  /**
   * History Mode
   *
   * @see {@link https://router.vuejs.org/guide/essentials/history-mode.html}
   */
  history: createWebHistory(import.meta.env.BASE_URL), // createWebHashHistory(import.meta.env.BASE_URL)
  routes,
})

// Global before guards
// https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards}
router.beforeEach(
  async (
    _to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const globalStore = useGlobal()
    // Show Loading
    globalStore.setLoading(true)
    await nextTick()

    next()
  }
)

// Global After Hooks
// https://router.vuejs.org/guide/advanced/navigation-guards.html#global-after-hooks}
router.afterEach(() => {
  const globalStore = useGlobal()
  // Hide Loading
  globalStore.setLoading(false)
})

export default router
