import MainContent from '@/common/layout/MainContent'
import Page from '@/common/layout/Page'
import RouteChildren from '@/routes/RouteChildren'
import { useLayout } from '@/app/Layout'

export default function Layout() {
  useLayout({ currentModule: 'Configuration' })
  return (
    <Page>
      <MainContent header='Configuration'>
        <RouteChildren />
      </MainContent>
    </Page>
  )
}
