import { Suspense } from 'react'
import { Outlet } from 'react-router'
import LoadingPage from 'src/pages/Loading'

const LayoutPublic = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Outlet />
    </Suspense>
  )
}

export default LayoutPublic
