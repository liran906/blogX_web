// M
import {type baseResponse, type listResponse, type optionsType, type paramsType, useAxios} from "@/api/index";

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
    userID?: number
    status?: number
    categoryID?:number
    collectionID?:number
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
    "isLiked": boolean
    "isCollected": boolean
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

export interface articleAddType {
    "title": string
    "content":string
    abstract: string
    "status": 1|2
    "categoryID"?: number
    "coverURL": string
    "tags": string[]
    "openForComment": boolean
}

export function articleAddApi(data: articleAddType):Promise<baseResponse<string>>{
    return  useAxios.post("/api/article", data)
}

export function articleCategoryOptionsApi(): Promise<baseResponse<optionsType[]>> {
    return useAxios.get("/api/article/category/options")
}

export function articleTagOptionsApi(): Promise<baseResponse<optionsType[]>> {
    return useAxios.get("/api/article/tag/options")
}
export interface articleEditType extends articleAddType {
    id: number
}
export function articleUpdateApi(data: articleEditType):Promise<baseResponse<string>>{
    return  useAxios.put("/api/article", data)
}
export function articleRemoveApi(id: number):Promise<baseResponse<string>>{
    return useAxios.delete("/api/article/" + id.toString())
}

export interface collectionArticleListRequest extends paramsType {
    "collectionID": number
}
export function collectionArticleListApi(params: collectionArticleListRequest):Promise<baseResponse<listResponse<articleListType>>>{
    return useAxios.get("/api/article/collection/", {params})
}

export function articleDiggApi(id: number):Promise<baseResponse<string>>{
    return  useAxios.post("/api/article/" + id.toString())
}
export interface articleCollectRequest{
    "articleID": number
    "collectionID"?: number
}
export function articleCollectApi(data: articleCollectRequest):Promise<baseResponse<string>>{
    return useAxios.post("/api/article/collect/", data)
}

export function articleLookApi(articleID: number):Promise<baseResponse<string>>{
    return useAxios.post("/api/article/history", {articleID})
}