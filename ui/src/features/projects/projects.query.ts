import { Projects } from '@matrixhub/api-ts/v1alpha1/project.pb'
import { queryOptions } from '@tanstack/react-query'

export const DEFAULT_PROJECTS_PAGE_SIZE = 10

export interface ProjectsSearch {
  query: string
  page: number
}

// -- Query key factory --
export const projectKeys = {
  all: ['projects'] as const,
  lists: () => [...projectKeys.all, 'list'] as const,
  list: (params: { query: string
    page: number }) =>
    [...projectKeys.lists(), params] as const,
  detail: (projectId: string) => ['projects', projectId] as const,
}

export function projectDetailQueryOptions(projectId: string) {
  return queryOptions({
    queryKey: projectKeys.detail(projectId),
    queryFn: () => Projects.GetProject({ name: projectId }),
  })
}
