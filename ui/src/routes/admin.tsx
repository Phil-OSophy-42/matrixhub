import {
  AppShell,
  NavLink,
  ScrollArea,
  Stack,
  Title,
} from '@mantine/core'
import {
  createFileRoute,
  Link,
  Outlet,
  useRouter,
  useRouterState,
} from '@tanstack/react-router'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/admin')({
  component: AdminLayout,
})

function AdminNavbar() {
  const router = useRouter()
  const activeRouteIds = useRouterState({
    select: state => state.matches.map(match => match.routeId),
  })

  const adminRoute = router.routesById['/admin']
  const navRoutes = useMemo(() => {
    const children = adminRoute?.children

    if (!children) {
      return []
    }

    return Object.values(children)
      .filter(route => typeof route.options.staticData?.navName === 'string')
      .sort((a, b) => (a.rank ?? 0) - (b.rank ?? 0))
  }, [adminRoute])

  return (
    <ScrollArea h="100%">
      <Stack gap={0}>
        {navRoutes.map((route) => {
          const isActive = activeRouteIds.includes(route.id)

          return (
            <NavLink
              key={route.id}
              label={route.options.staticData?.navName ?? route.id}
              component={Link}
              to={route.to}
              active={isActive}
            />
          )
        })}
      </Stack>
    </ScrollArea>
  )
}

function AdminLayout() {
  const { t } = useTranslation()

  return (
    <AppShell
      padding="md"
      header={{
        height: 60,
      }}
      navbar={{
        width: 200,
        breakpoint: '',
      }}
    >
      <AppShell.Header p="md">
        <Title order={2}>{t('translation.title', 'Matrix Hub')}</Title>
      </AppShell.Header>

      <AppShell.Navbar>
        <AdminNavbar />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}
