import {
  Anchor,
  Badge,
  Text,
} from '@mantine/core'
import { ProjectType } from '@matrixhub/api-ts/v1alpha1/project.pb'
import { Link } from '@tanstack/react-router'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { DataTable } from '@/shared/components/DataTable'
import { formatDateTime } from '@/shared/utils/date'

import type { Project } from '@matrixhub/api-ts/v1alpha1/project.pb'
import type { Pagination } from '@matrixhub/api-ts/v1alpha1/utils.pb'
import type { MRT_ColumnDef } from 'mantine-react-table'
import type { ReactNode } from 'react'

function isPublicProject(type?: ProjectType) {
  return type === ProjectType.PROJECT_TYPE_PUBLIC
}

type ProjectCellProps = Parameters<NonNullable<MRT_ColumnDef<Project>['Cell']>>[0]

function ProjectNameCell({ row }: ProjectCellProps) {
  const name = row.original.name

  if (!name) {
    return <Text fw={600}>-</Text>
  }

  return (
    <Anchor
      fw={600}
      underline="never"
      renderRoot={props => (
        <Link
          {...props}
          to="/projects/$projectId"
          params={{ projectId: name }}
        />
      )}
    >
      {name}
    </Anchor>
  )
}

function ProjectVisibilityCell({ row }: ProjectCellProps) {
  const { t } = useTranslation()
  const isPublic = isPublicProject(row.original.type)

  return (
    <Badge
      color={isPublic ? 'green' : 'yellow'}
      variant="light"
    >
      {isPublic
        ? t('projects.visibility.public')
        : t('projects.visibility.private')}
    </Badge>
  )
}

function ProjectProxyCell({ row }: ProjectCellProps) {
  const { t } = useTranslation()
  const enabled = row.original.enabledRegistry

  return (
    <Badge
      color={enabled ? 'green' : 'red'}
      variant="light"
    >
      {enabled
        ? t('projects.boolean.yes')
        : t('projects.boolean.no')}
    </Badge>
  )
}

function ProjectActionsCell({
  row,
  table,
}: ProjectCellProps) {
  const { t } = useTranslation()
  const onDelete = (
    table.options.meta as { onDelete?: (project: Project) => void } | undefined
  )?.onDelete

  return (
    <Anchor
      component="button"
      size="sm"
      onClick={() => onDelete?.(row.original)}
    >
      {t('projects.actions.delete')}
    </Anchor>
  )
}

export interface ProjectsTableProps {
  records: Project[]
  pagination?: Pagination
  page: number
  loading?: boolean
  searchValue?: string
  onSearchChange?: (value: string) => void
  onDelete: (item: Project) => void
  onPageChange: (page: number) => void
  toolbarExtra?: ReactNode
}

export function ProjectsTable({
  records,
  pagination,
  page,
  loading,
  searchValue,
  onSearchChange,
  onDelete,
  onPageChange,
  toolbarExtra,
}: ProjectsTableProps) {
  const { t } = useTranslation()

  const columns = useMemo<MRT_ColumnDef<Project>[]>(() => [
    {
      accessorKey: 'name',
      header: t('projects.table.name'),
      Cell: ProjectNameCell,
    },
    {
      id: 'type',
      enableSorting: false,
      header: t('projects.table.visibility'),
      Cell: ProjectVisibilityCell,
    },
    {
      id: 'enabledRegistry',
      enableSorting: false,
      header: t('projects.table.proxy'),
      Cell: ProjectProxyCell,
    },
    {
      accessorKey: 'modelCount',
      header: t('projects.table.modelCount'),
    },
    {
      accessorKey: 'datasetCount',
      header: t('projects.table.datasetCount'),
    },
    {
      id: 'updatedAt',
      header: t('projects.table.updatedAt'),
      accessorFn: row => formatDateTime(row.updatedAt),
    },
    {
      id: 'actions',
      enableSorting: false,
      header: t('projects.table.actions'),
      Cell: ProjectActionsCell,
    },
  ], [t])

  return (
    <DataTable
      data={records}
      columns={columns}
      pagination={pagination}
      page={page}
      loading={loading}
      emptyTitle={t('projects.table.empty')}
      searchPlaceholder={t('projects.searchPlaceholder')}
      searchValue={searchValue}
      onSearchChange={onSearchChange}
      toolbarExtra={toolbarExtra}
      onPageChange={onPageChange}
      getRowId={row => String(row.name)}
      tableOptions={{
        meta: { onDelete },
      }}
    />
  )
}
