import { lazy } from 'react'

import type RouteConfig from '@/routes/RouteConfig'

const Layout = lazy(async () => import('./Layout'))

const config: RouteConfig = {
  name: 'RecipesLayout',
  element: <Layout />,
  path: '/recipes',
}

export default config
