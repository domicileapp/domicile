import { LoginPage } from '@patternfly/react-core'
import { RouteObject } from 'react-router'
import { PublicLayout } from 'src/components/layout'
import { GuestGuard } from 'src/components/layout/guards'

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <GuestGuard>
        <PublicLayout />
      </GuestGuard>
    ),
    children: [
      {
        index: true,
        path: 'login',
        element: <LoginPage loginTitle='Login' />,
      },
    ],
  },
]

export default routes
