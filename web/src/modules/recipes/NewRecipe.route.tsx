import { lazy } from 'react'

import type RouteConfig from '@/routes/RouteConfig'

const Page = lazy(async () => import('./NewRecipe'))

const config: RouteConfig = {
  element: <Page />,
  path: 'new',
  parent: 'RecipesLayout',
}

export default config
