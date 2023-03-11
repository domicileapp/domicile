import { lazy } from 'react'

import type RouteConfig from '@/routes/RouteConfig'

const Page = lazy(async () => import('./Recipes'))

const config: RouteConfig = {
  element: <Page />,
  index: true,
  parent: 'RecipesLayout',
}

export default config
