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