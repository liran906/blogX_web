import {type baseResponse, type listResponse, type paramsType, useAxios} from "@/api/index";

export interface articleSearchType {
    "id": number
    "createdAt": string
    "updatedAt": string
    "title": string,
    "abstract": string
    "categoryID": number
    "tags": string[]
    "coverURL": string
    "userID": number
    "readCount": number
    "likeCount": number
    "commentCount": number
    "collectCount": number
    "openForComment": boolean
    "status": number
    "pinnedByAdmin": boolean
    "categoryName": string
    "userNickname": string
    "userAvatarURL": string
}

export interface articleSearchRequest extends paramsType {
    tag?: string
    type: number // 0 猜你喜欢  1 最新发布  2最多回复 3最多点赞 4最多收藏
}

export function articleSearchApi(params: articleSearchRequest): Promise<baseResponse<listResponse<articleSearchType>>> {
    return useAxios.get("/api/search/article", {params})
}

export interface tagListType{
    "tag": string,
    "articleCount": number
}
export interface tagListRequest extends paramsType{

}
export function tagListApi(params: tagListRequest):Promise<baseResponse<listResponse<tagListType>>>{
    return useAxios.get("/api/search/tags", {params})
}

export interface textSearchType {
    "articleID": number
    "head": string
    flag: string
    "body":string
}

export function textSearchApi(params: paramsType):Promise<baseResponse<listResponse<textSearchType>>>{
    return useAxios.get("/api/search/text", {params})
}