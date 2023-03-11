import MainContent from '@/common/layout/MainContent'
import PageWithNavigationSidebar from '@/common/layout/PageWithNavigationSidebar'
import type { SidebarOption } from '@/common/layout/Sidebar'
import RouteChildren from '@/routes/RouteChildren'
import { useLayout } from '@/app/Layout'
import BlenderIcon from '@mui/icons-material/Blender'

const options: SidebarOption[] = [{ Icon: BlenderIcon, label: 'Recipes', link: '/recipes' }]

export default function Layout() {
  useLayout({ currentModule: 'Recipes' })
  return (
    <PageWithNavigationSidebar sidebarOptions={options}>
      <MainContent header='Recipes'>
        <RouteChildren />
      </MainContent>
    </PageWithNavigationSidebar>
  )
}
