import MainContent from '@/common/layout/MainContent'
import PageWithNavigationSidebar from '@/common/layout/PageWithNavigationSidebar'
import type { SidebarOption } from '@/common/layout/Sidebar'
import RouteChildren from '@/routes/RouteChildren'
import { useLayout } from '@/app/Layout'
import Blender from '@mui/icons-material/Blender'
import Add from '@mui/icons-material/Add'

const options: SidebarOption[] = [
  {
    Icon: Add,
    label: 'New recipe',
    link: '/recipes/new',
  },
  { Icon: Blender, label: 'Recipes', link: '/recipes' },
]

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
