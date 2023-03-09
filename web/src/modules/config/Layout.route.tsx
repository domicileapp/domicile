import { lazy } from 'react'

import type RouteConfig from '@/routes/RouteConfig'

const Layout = lazy(async () => import('./Layout'))

const config: RouteConfig = {
  name: 'ConfigurationLayout',
  element: <Layout />,
  path: '/configuration',
}

export default config
