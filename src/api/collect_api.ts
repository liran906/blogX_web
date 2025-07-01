import {type baseResponse, type listResponse, type paramsType, useAxios} from "@/api/index";

export interface collectListType {
    "id": number
    "createdAt": string
    "updatedAt": string
    "title": string
    "abstract": string
    "coverURL": string
    "userID": number
    "isDefault": boolean
    "articleCount": number
    "articleUse": boolean
}

export interface collectListRequest extends paramsType {
    userID?: number
    articleID?: number
}

export function collectListApi(params: collectListRequest): Promise<baseResponse<listResponse<collectListType>>> {
    return useAxios.get("/api/article/collections", {params})
}

export interface collectCreateRequest {
    "id": number
    "title": string
    "abstract": string
}

export function collectCreateApi(data: collectCreateRequest): Promise<baseResponse<string>> {
    return useAxios.post("/api/article/collections", data)
}

export function collectRemoveApi(idList: number[]): Promise<baseResponse<string>> {
    return useAxios.delete("/api/article/collections", {data: {idList}})
}

export function collectArticleRemoveApi(idList: number[]): Promise<baseResponse<string>> {
    return useAxios.delete("/api/article/collections", {data: {idList}})
}