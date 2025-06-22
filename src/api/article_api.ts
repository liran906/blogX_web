// M
import {type baseResponse, type listResponse, type paramsType, useAxios} from "@/api/index";

export interface articleListType {
    "id": number
    "createdAt": string
    "updatedAt": string
    "title": string
    "abstract": string
    "categoryID"?: number
    "categoryName"?: string //
    "tags": string[] //
    "coverURL": string //
    "userID": number
    "readCount": number //
    "likeCount": number //
    "commentCount": number
    "collectCount": number
    "openForComment": boolean //
    "status": number // 状态  1草稿 2审核中  3已发布
    "pinnedByUser": boolean  //
    "pinnedByAdmin": boolean //
    "userNickname": string
    "userAvatarURL": string //
}

export interface articleListRequest extends paramsType {
    type: 1 | 2 | 3
    userID?: number
    collectID?: number
    status?: number
}

export function articleListApi(params: articleListRequest): Promise<baseResponse<listResponse<articleListType>>> {
    return useAxios.get("/api/article", {params})
}

export interface articleDetailType {
    "id": number
    "createdAt": string
    "updatedAt": string
    "title": string
    "abstract": string
    "content": string
    "categoryID"?: number,
    "categoryName"?: string //
    "tags": string[]
    "coverURL": string
    "userID": number
    "readCount": number
    "likeCount": number
    "commentCount": number
    "collectCount": number
    "openForComment": false,
    "status": number
    "username": string
    "userNickname": string
    "userAvatarURL": string
}

export function articleDetailApi(id: number): Promise<baseResponse<articleDetailType>> {
    return useAxios.get("/api/article/" + id.toString())
}

export interface articleExamineRequest {
    "articleID": number
    "status": number // 3 审核通过 4 不通过
    msg: string
}

export function articleExamineApi(data: articleExamineRequest):Promise<baseResponse<string>>{
    return useAxios.post("/api/article/review", data)
}


export interface articleHistoryListType {
    "historyID": number
    "createdAt": string
    "userID": number
    "articleID": number
    "nickname": string
    "avatarURL": string
    "title": string
    "coverURL": string
}

export interface articleHistoryListRequest extends paramsType {
    type: 1 | 2
}

export function articleHistoryListApi(params: articleHistoryListRequest): Promise<baseResponse<listResponse<articleHistoryListType>>> {
    return useAxios.get("/api/article/history", {params})
}

export function articleHistoryRemoveApi(idList: number[]): Promise<baseResponse<string>> {
    return useAxios.delete("/api/article/history", {data: {idList}})
}