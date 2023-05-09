import { LoadingPage } from '@/pages'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

const LayoutPublic = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Outlet />
    </Suspense>
  )
}

export default LayoutPublic
