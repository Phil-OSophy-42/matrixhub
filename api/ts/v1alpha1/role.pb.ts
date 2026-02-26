/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../fetch.pb"
import * as MatrixhubV1alpha1Utils from "./utils.pb"

export enum RoleScope {
  ROLE_SCOPE_UNSPECIFIED = "ROLE_SCOPE_UNSPECIFIED",
  ROLE_SCOPE_PLATFORM = "ROLE_SCOPE_PLATFORM",
  ROLE_SCOPE_PROJECT = "ROLE_SCOPE_PROJECT",
}

export type RoleInfo = {
  id?: number
  name?: string
  displayName?: string
}

export type ListRolesRequest = {
  scope?: RoleScope
  page?: number
  pageSize?: number
}

export type ListRolesResponse = {
  roles?: RoleInfo[]
  pagination?: MatrixhubV1alpha1Utils.Pagination
}

export class Role {
  static ListRoles(req: ListRolesRequest, initReq?: fm.InitReq): Promise<ListRolesResponse> {
    return fm.fetchReq<ListRolesRequest, ListRolesResponse>(`/api/v1alpha1/roles?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
}