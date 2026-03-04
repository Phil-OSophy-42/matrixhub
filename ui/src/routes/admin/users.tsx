import { Title } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/users')({
  component: RouteComponent,
  staticData: {
    navName: 'Users',
  },
})

function RouteComponent() {
  return (
    <div>
      <Title order={3}>Users</Title>
    </div>
  )
}
