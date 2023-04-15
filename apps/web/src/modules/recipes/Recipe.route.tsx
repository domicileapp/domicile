import { lazy } from 'react'

import type RouteConfig from '@/routes/RouteConfig'

const Page = lazy(async () => import('./Recipe'))

const config: RouteConfig = {
  element: <Page />,
  path: ':id',
  parent: 'RecipesLayout',
}

export default config
