import routes from '@/routes'
import { useRoutes } from 'react-router-dom'

const MyNavigationComponent = () => <>{useRoutes(routes)}</>
export default MyNavigationComponent
