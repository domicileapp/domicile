import '@patternfly/react-core/dist/styles/base.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { LayoutWrapper } from './LayoutWrapper/LayoutWrapper'
import routes from './routes'

function App() {
  const router = createBrowserRouter(routes)
  return (
    <RouterProvider router={router}>
      <LayoutWrapper />
    </RouterProvider>
  )
}

export default App
