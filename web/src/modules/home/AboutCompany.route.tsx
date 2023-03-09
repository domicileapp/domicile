import { lazy } from 'react'

import type RouteConfig from '@/routes/RouteConfig'

const Page = lazy(async () => import('./AboutCompany'))

const config: RouteConfig = {
  element: <Page />,
  path: 'about/:info/:id',
  parent: 'HomeLayout',
}

export default config
