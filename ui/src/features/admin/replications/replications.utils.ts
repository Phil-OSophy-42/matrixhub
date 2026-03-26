import type { SyncPolicyItem } from '@matrixhub/api-ts/v1alpha1/sync_policy.pb'

export function getReplicationRowId(item: SyncPolicyItem) {
  return String(item.id ?? item.name ?? '-')
}
