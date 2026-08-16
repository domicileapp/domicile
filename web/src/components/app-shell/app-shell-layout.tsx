import { AppShell, Burger, Container, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import type { ReactNode } from 'react'

interface AppShellLayoutProps {
  children: ReactNode
}

export function AppShellLayout(props: AppShellLayoutProps) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure()
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure()

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
          <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
          Domicile
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">Nav here</AppShell.Navbar>
      <AppShell.Main>
        <Container fluid>{props.children}</Container>
      </AppShell.Main>
    </AppShell>
  )
}
