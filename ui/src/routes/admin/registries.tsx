import { Title } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/registries')({
  component: RouteComponent,
  staticData: {
    navName: 'Registries',
  },
})

function RouteComponent() {
  return (
    <div>
      <Title order={3}>Registries</Title>
    </div>
  )
}
