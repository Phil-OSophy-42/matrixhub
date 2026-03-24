import {
  Button, Checkbox, Group, InputWrapper, rem, Skeleton, Stack, TextInput,
} from '@mantine/core'
import { ProjectType } from '@matrixhub/api-ts/v1alpha1/project.pb'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { updateProjectMutationOptions } from '../projects.mutation'
import { useProject } from '../projects.query'

const projectRouteApi = getRouteApi('/(auth)/(app)/projects/$projectId')

export function ProjectSettingsPage() {
  const { t } = useTranslation()
  const { projectId } = projectRouteApi.useParams()
  const {
    data: project, isLoading,
  } = useProject(projectId)
  const mutation = useMutation(updateProjectMutationOptions())

  const isProxy = !!project?.registryUrl

  const projectSettingForm = useForm({
    defaultValues: {
      type: project?.type ?? ProjectType.PROJECT_TYPE_PRIVATE,
    },
    onSubmit: async ({ value }) => {
      await mutation.mutateAsync({
        name: projectId,
        type: value.type,
      })
    },
  })

  if (isLoading) {
    return (
      <Stack pt="lg" gap="md" align="flex-start">
        <Skeleton height={rem('32px')} width={rem('120px')} radius="sm" />
        <Skeleton height={rem('20px')} width={rem('200px')} radius="sm" />
        <Skeleton height={rem('20px')} width={rem('150px')} radius="sm" />

        <Group gap="md">
          <Skeleton height={rem('36px')} width={rem('80px')} radius="sm" />
          <Skeleton height={rem('36px')} width={rem('80px')} radius="sm" />
        </Group>
      </Stack>
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        projectSettingForm.handleSubmit()
      }}
    >
      <Stack pt="lg" gap="md" align="flex-start">
        <Stack gap="xs">
          <projectSettingForm.Field name="type">
            {field => (
              <InputWrapper label={t('projects.detail.settingsPage.projectType')}>
                <Checkbox
                  checked={field.state.value === ProjectType.PROJECT_TYPE_PUBLIC}
                  onChange={(event) => {
                    field.setValue(event.currentTarget.checked
                      ? ProjectType.PROJECT_TYPE_PUBLIC
                      : ProjectType.PROJECT_TYPE_PRIVATE)
                  }}
                  label={t('projects.type.public')}
                />
              </InputWrapper>
            )}
          </projectSettingForm.Field>
        </Stack>

        {isProxy && (
          <>
            <TextInput
              label={t('projects.detail.settingsPage.proxyAddress')}
              value={project?.registryUrl ?? ''}
              w={rem('260px')}
              disabled
            />
            <TextInput
              label={t('projects.detail.settingsPage.proxyOrganization')}
              value={project?.organization ?? ''}
              w={rem('260px')}
              disabled
            />
          </>
        )}

        <Group gap="md">
          <projectSettingForm.Subscribe selector={s => [s.isSubmitting]}>
            {([isSubmitting]) => (
              <>
                <Button
                  type="submit"
                  loading={isSubmitting}
                >
                  {t('projects.detail.settingsPage.save')}
                </Button>
                <Button
                  variant="default"
                  onClick={() => projectSettingForm.reset()}
                >
                  {t('projects.detail.settingsPage.cancel')}
                </Button>
              </>
            )}
          </projectSettingForm.Subscribe>
        </Group>
      </Stack>
    </form>
  )
}
