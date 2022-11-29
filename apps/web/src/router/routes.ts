import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/DashboardPage.vue') },
    ],
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
  },
  {
    path: '/inventory',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/InventoryPage.vue') },
    ],
  },
  {
    path: '/chores',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/ChoresPage.vue') }],
  },
  {
    path: '/health',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/HealthPage.vue') }],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
