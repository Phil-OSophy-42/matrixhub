import {
  ActionIcon,
  Button,
  Group,
  Paper,
  Stack,
  Title,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
  IconApiApp as ProjectIcon,
  IconRefresh,
  IconHomePlus,
} from '@tabler/icons-react'
import {
  getRouteApi,
  useRouter,
} from '@tanstack/react-router'
import {
  useCallback,
  useMemo,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'

import { CreateProjectModal } from '../components/CreateProjectModal'
import { DeleteProjectModal } from '../components/DeleteProjectModal'
import { ProjectsTable } from '../components/ProjectsTable'
import { useProjects } from '../projects.query'

import type { Project } from '@matrixhub/api-ts/v1alpha1/project.pb'

const projectsRouteApi = getRouteApi('/(auth)/(app)/projects/')

export function ProjectsPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const navigate = projectsRouteApi.useNavigate()
  const search = projectsRouteApi.useSearch()

  const {
    data, isLoading,
  } = useProjects({
    query: search.query ?? '',
    page: search.page ?? 1,
  })

  const projects = useMemo(() => data?.projects ?? [], [data?.projects])
  const pagination = data?.pagination

  const [createOpened, createHandlers] = useDisclosure(false)
  const [deleteOpened, deleteHandlers] = useDisclosure(false)
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null)

  const handleSearchChange = useCallback((value: string) => {
    if (value === (search.query ?? '')) {
      return
    }

    void navigate({
      replace: true,
      search: prev => ({
        ...prev,
        page: 1,
        query: value,
      }),
    })
  }, [navigate, search.query])

  const handleDelete = useCallback((project: Project) => {
    setDeleteTarget(project)
    deleteHandlers.open()
  }, [deleteHandlers])

  const handleRefresh = useCallback(() => {
    void router.invalidate()
  }, [router])

  const handlePageChange = useCallback((page: number) => {
    void navigate({
      search: prev => ({
        ...prev,
        page,
      }),
    })
  }, [navigate])

  return (
    <Stack gap="lg" pt="lg">
      <Group gap="sm">
        <ProjectIcon size={24} />
        <Title order={2}>{t('projects.title')}</Title>
      </Group>

      <Paper>
        <ProjectsTable
          records={projects}
          pagination={pagination}
          loading={isLoading}
          page={search.page ?? 1}
          searchValue={search.query ?? ''}
          onSearchChange={handleSearchChange}
          onDelete={handleDelete}
          onPageChange={handlePageChange}
          toolbarExtra={(
            <>
              <ActionIcon
                variant="subtle"
                color="gray"
                size="lg"
                onClick={handleRefresh}
                loading={isLoading}
              >
                <IconRefresh size={20} />
              </ActionIcon>
              <Button
                onClick={createHandlers.open}
                leftSection={<IconHomePlus size={16} />}
              >
                {t('projects.create')}
              </Button>
            </>
          )}
        />
      </Paper>

      <CreateProjectModal
        opened={createOpened}
        onClose={createHandlers.close}
      />

      <DeleteProjectModal
        project={deleteTarget}
        opened={deleteOpened}
        onClose={deleteHandlers.close}
      />
    </Stack>
  )
}
