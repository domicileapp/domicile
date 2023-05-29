import { lazy } from 'react'

import type RouteConfig from '@/routes/RouteConfig'

const Page = lazy(async () => import('./EditRecipe'))

const config: RouteConfig = {
  element: <Page />,
  path: ':id/edit',
  parent: 'RecipesLayout',
}

export default config
