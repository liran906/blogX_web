import {type baseResponse, type listResponse, type paramsType, useAxios} from "@/api/index";

export interface categoryListRequest extends paramsType {
  type: 1 | 2 | 3
  userID: number
}

export interface categoryListType {
  "id": number
  "createdAt": string
  "updatedAt": string
  "name": string
  "userID": number
  "articleCount": number
}

export function categoryListApi(params: categoryListRequest): Promise<baseResponse<listResponse<categoryListType>>> {
return useAxios.get("/api/article/category", {params})
}

export interface categoryCreateRequest {
  id: number
  title: string
}

export function categoryCreateApi(data: categoryCreateRequest): Promise<baseResponse<string>> {
  return useAxios.post("/api/article/category", data)
}

export function categoryRemoveApi(idList: number[]): Promise<baseResponse<string>> {
  return useAxios.delete("/api/article/category", {data: {idList}})
}