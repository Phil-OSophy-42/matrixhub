import {
  Box, Collapse, Group, Text,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useTranslation } from 'react-i18next'

import { Route } from '@/routes/(auth)/(app)/models'
import { ModelCard } from '@/shared/components/resource-card/ModelCard.tsx'
import { ResourceCardGrid } from '@/shared/components/ResourceCardGrid'

export function HotModelList() {
  const { t } = useTranslation()
  const [opened, { toggle }] = useDisclosure(false)
  const { items = [] } = Route.useLoaderData()
  const hotModels = items.slice(0, 6)

  const cardElements = hotModels.map((model) => {
    const projectId = model.project?.trim() ?? '-'
    const modelName = model.name?.trim() ?? '-'

    return <ModelCard key={`${projectId}/${modelName}`} model={model} />
  })

  return (
    <Box>
      <Group justify="space-between">
        <Text fz="md" fw={600} lh="20px" mb="sm">
          {t('model.recommend') }
        </Text>
        {hotModels.length > 4 && (
          <Text component="button" type="button" onClick={toggle} fz="sm">
            {t('model.viewMore')}
          </Text>
        )}
      </Group>
      <Box miw={780} maw={1380}>
        <ResourceCardGrid>
          {cardElements.slice(0, 4)}
        </ResourceCardGrid>
        <Collapse in={opened}>
          <Box pt="lg">
            <ResourceCardGrid>
              {cardElements.slice(4)}
            </ResourceCardGrid>
          </Box>
        </Collapse>
      </Box>
    </Box>
  )
}
