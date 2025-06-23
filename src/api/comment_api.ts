import {type baseResponse, type listResponse, type paramsType, useAxios} from "@/api/index";

export interface commentListType {
    "id": number
    "createdAt": string
    "content": string
    "userID": number
    "userNickname": string
    "userAvatarURL": string
    "articleID": number
    "articleTitle": string
    "articleCoverURL": string
    "likeCount": number
    "relation"?: 1 | 2 | 3 | 4 | 5 // 陌生人  已关注  粉丝  好友  自己
    "isMe": true
    visible?: boolean
}

export interface commentListRequest extends paramsType {
    type: 1 | 2 | 3
}

export function commentListApi(params: commentListRequest): Promise<baseResponse<listResponse<commentListType>>> {
    return useAxios.get("/api/comment", {params})
}

export function commentRemoveApi(id: number):Promise<baseResponse<string>>{
    return  useAxios.delete("/api/comment/" + id.toString())
}


export interface commentCreateRequest {
    "content": string
    "articleID": number
    "parentID"?: number
}

export function commentCreateApi(data: commentCreateRequest):Promise<baseResponse<string>>{
    return useAxios.post("/api/comment", data)
}