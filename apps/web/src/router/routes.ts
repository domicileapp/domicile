import { RouteRecordRaw } from 'vue-router'
import router from '.'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/DashboardPage.vue') }],
    meta: { requireAuth: true },
  },
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [{ path: '', component: () => import('pages/LoginPage.vue') }],
  },
  {
    path: '/tasks',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/TaskPage.vue') }],
    meta: { requireAuth: true },
  },
  {
    path: '/inventory',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/InventoryPage.vue') }],
    meta: { requireAuth: true },
  },
  {
    path: '/chores',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/ChoresPage.vue') }],
    meta: { requireAuth: true },
  },
  {
    path: '/health',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/HealthPage.vue') }],
    meta: { requireAuth: true },
  },
  {
    path: '/recipes',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/RecipesPage.vue') }],
    meta: { requireAuth: true },
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
