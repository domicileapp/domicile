import { lazy } from 'react'

import type RouteConfig from '@/routes/RouteConfig'

const Layout = lazy(async () => import('./Layout'))

const config: RouteConfig = {
  name: 'HomeLayout',
  element: <Layout />,
  path: '/',
}

export default config
