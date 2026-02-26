/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../fetch.pb"
import * as GoogleProtobufTimestamp from "../google/protobuf/timestamp.pb"
import * as GoogleProtobufWrappers from "../google/protobuf/wrappers.pb"
import * as MatrixhubV1alpha1Role from "./role.pb"
import * as MatrixhubV1alpha1Utils from "./utils.pb"

export enum ProjectType {
  PROJECT_TYPE_UNSPECIFIED = "PROJECT_TYPE_UNSPECIFIED",
  PROJECT_TYPE_PRIVATE = "PROJECT_TYPE_PRIVATE",
  PROJECT_TYPE_PUBLIC = "PROJECT_TYPE_PUBLIC",
}

export enum MemberType {
  MEMBER_TYPE_UNSPECIFIED = "MEMBER_TYPE_UNSPECIFIED",
  MEMBER_TYPE_USER = "MEMBER_TYPE_USER",
  MEMBER_TYPE_GROUP = "MEMBER_TYPE_GROUP",
}

export type CreateProjectRequest = {
  name?: string
  type?: ProjectType
  registryId?: GoogleProtobufWrappers.Int32Value
}

export type CreateProjectResponse = {
  projectId?: number
}

export type ListProjectsRequest = {
  name?: string
  type?: ProjectType
  page?: number
  pageSize?: number
}

export type ListProjectsResponse = {
  projects?: Project[]
  pagination?: MatrixhubV1alpha1Utils.Pagination
}

export type GetProjectRequest = {
  name?: string
}

export type GetProjectResponse = {
  name?: string
}

export type DeleteProjectRequest = {
  id?: number
}

export type DeleteProjectResponse = {
}

export type UpdateProjectRequest = {
  id?: number
  type?: ProjectType
}

export type UpdateProjectResponse = {
}

export type Project = {
  id?: number
  name?: string
  type?: ProjectType
  registryId?: GoogleProtobufWrappers.Int32Value
  updatedAt?: GoogleProtobufTimestamp.Timestamp
}

export type ListProjectMembersRequest = {
  projectId?: number
  username?: string
  page?: number
  pageSize?: number
}

export type ListProjectMembersResponse = {
  members?: ProjectMember[]
  pagination?: MatrixhubV1alpha1Utils.Pagination
}

export type ProjectMember = {
  userId?: string
  username?: string
  memberType?: MemberType
  role?: MatrixhubV1alpha1Role.RoleInfo
}

export type AddProjectMemberWithRoleRequest = {
  projectId?: number
  memberType?: MemberType
  memberId?: string
  roleId?: number
}

export type AddProjectMemberWithRoleResponse = {
}

export type RemoveProjectMemberRequest = {
  projectId?: number
  members?: MemberToRemove[]
}

export type MemberToRemove = {
  memberType?: MemberType
  memberId?: string
}

export type RemoveProjectMemberResponse = {
}

export type UpdateProjectMemberRoleRequest = {
  projectId?: number
  memberType?: MemberType
  memberId?: string
  roleId?: number
}

export type UpdateProjectMemberRoleResponse = {
}

export class Projects {
  static CreateProject(req: CreateProjectRequest, initReq?: fm.InitReq): Promise<CreateProjectResponse> {
    return fm.fetchReq<CreateProjectRequest, CreateProjectResponse>(`/api/v1alpha1/projects`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static ListProjects(req: ListProjectsRequest, initReq?: fm.InitReq): Promise<ListProjectsResponse> {
    return fm.fetchReq<ListProjectsRequest, ListProjectsResponse>(`/api/v1alpha1/projects?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static GetProject(req: GetProjectRequest, initReq?: fm.InitReq): Promise<GetProjectResponse> {
    return fm.fetchReq<GetProjectRequest, GetProjectResponse>(`/api/v1alpha1/projects/${req["name"]}?${fm.renderURLSearchParams(req, ["name"])}`, {...initReq, method: "GET"})
  }
  static UpdateProject(req: UpdateProjectRequest, initReq?: fm.InitReq): Promise<UpdateProjectResponse> {
    return fm.fetchReq<UpdateProjectRequest, UpdateProjectResponse>(`/api/v1alpha1/projects/${req["id"]}`, {...initReq, method: "PUT", body: JSON.stringify(req, fm.replacer)})
  }
  static DeleteProject(req: DeleteProjectRequest, initReq?: fm.InitReq): Promise<DeleteProjectResponse> {
    return fm.fetchReq<DeleteProjectRequest, DeleteProjectResponse>(`/api/v1alpha1/projects/${req["id"]}`, {...initReq, method: "DELETE"})
  }
  static ListProjectMembers(req: ListProjectMembersRequest, initReq?: fm.InitReq): Promise<ListProjectMembersResponse> {
    return fm.fetchReq<ListProjectMembersRequest, ListProjectMembersResponse>(`/api/v1alpha1/projects/${req["projectId"]}/members?${fm.renderURLSearchParams(req, ["projectId"])}`, {...initReq, method: "GET"})
  }
  static AddProjectMemberWithRole(req: AddProjectMemberWithRoleRequest, initReq?: fm.InitReq): Promise<AddProjectMemberWithRoleResponse> {
    return fm.fetchReq<AddProjectMemberWithRoleRequest, AddProjectMemberWithRoleResponse>(`/api/v1alpha1/projects/${req["projectId"]}/member`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static RemoveProjectMember(req: RemoveProjectMemberRequest, initReq?: fm.InitReq): Promise<RemoveProjectMemberResponse> {
    return fm.fetchReq<RemoveProjectMemberRequest, RemoveProjectMemberResponse>(`/api/v1alpha1/projects/${req["projectId"]}/members`, {...initReq, method: "DELETE"})
  }
  static UpdateProjectMemberRole(req: UpdateProjectMemberRoleRequest, initReq?: fm.InitReq): Promise<UpdateProjectMemberRoleResponse> {
    return fm.fetchReq<UpdateProjectMemberRoleRequest, UpdateProjectMemberRoleResponse>(`/api/v1alpha1/projects/${req["projectId"]}/member/role`, {...initReq, method: "PUT", body: JSON.stringify(req, fm.replacer)})
  }
}