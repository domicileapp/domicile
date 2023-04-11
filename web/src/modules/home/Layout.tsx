import HomeIcon from '@mui/icons-material/Home'
import InfoIcon from '@mui/icons-material/Info'
import ListIcon from '@mui/icons-material/List'

import MainContent from '@/common/layout/MainContent'
import PageWithNavigationSidebar from '@/common/layout/Page'
import type { SidebarOption } from '@/common/layout/Sidebar'
import RouteChildren from '@/routes/RouteChildren'
import { useLayout } from '@/app/Layout'

const options: SidebarOption[] = [
  { Icon: HomeIcon, label: 'Home', link: '/' },
  { Icon: InfoIcon, label: 'Info', link: 'about' },
  { Icon: ListIcon, label: 'Todos', link: 'todos' },
]

export default function Layout() {
  useLayout({ currentModule: 'Home' })

  return (
    <PageWithNavigationSidebar sidebarOptions={options}>
      <MainContent header='Home layout'>
        <RouteChildren />
      </MainContent>
    </PageWithNavigationSidebar>
  )
}
