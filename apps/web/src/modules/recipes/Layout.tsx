import MainContent from '@/common/layout/MainContent'
import PageWithNavigationSidebar from '@/common/layout/Page'
import RouteChildren from '@/routes/RouteChildren'
import { useLayout } from '@/app/Layout'
import Blender from '@mui/icons-material/Blender'
import Add from '@mui/icons-material/Add'

export default function Layout() {
  useLayout({ currentModule: 'Recipes' })
  return (
    <PageWithNavigationSidebar>
      <MainContent>
        <RouteChildren />
      </MainContent>
    </PageWithNavigationSidebar>
  )
}
