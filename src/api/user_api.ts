import {type baseResponse, type listResponse, type optionsType, type paramsType, useAxios} from "@/api/index";

export interface pwdLoginRequest {
    username: string;
    password: string;
}

// 登录
export function pwdLoginApi(data: pwdLoginRequest): Promise<baseResponse<string>> {
    return useAxios.post("/api/user/login", data)
}

export interface userInfoType {
    "id": number
    "createdAt": string
    "username": string
    "email": string
    "hasPassword": boolean
    "nickname": string
    "avatarURL": string
    "bio": string
    "openid": string
    "gender": number
    "phone": string
    "country": string
    "province": string
    "city": string
    "status": number
    "lastLoginTime": string
    "lastLoginIP": string
    "registerSource": number
    "dateOfBirth": string
    "articleCount": number
    "readCount": number
    "likeCount": number
    "collectCount": number
    "fansCount": number
    "followingCount": number
    "role": number
    "siteAge": number
    "tags": string
    "updatedAt": string
    "themeID": number
    "displayCollections": boolean
    "displayFans": boolean
    "displayFollowing": boolean
    "receiveCommentNotify": boolean
    "receiveLikeNotify": boolean
    "receiveCollectNotify": boolean
    "receivePrivateMessage": boolean
    "receiveStrangerMessage": boolean
    "homepageVisitCount": number
}

// 用户信息
export function userInfoApi():Promise<baseResponse<userInfoType>>{
    return  useAxios.get("/api/user/0")
}

// 注销登录
export function userLogoutApi():Promise<baseResponse<string>>{
    return useAxios.delete("/api/user/logout")
}

export interface userListType{
    "id": number,
    "username": string,
    "createdAt": string,
    "email": string,
    "status": number,
    "nickname": string,
    "avatarURL": string,
    "role": number,
    "articleCount": number,
    "siteAge": number,
    "lastLoginIP": string,
    "lastLoginIPAddr": string,
    "lastLoginTime": string,
    "registerSource": number
}

// 用户列表
export function userListApi(params?: paramsType):Promise<baseResponse<listResponse<userListType>>> {
    return useAxios.get("/api/user/list", {params})
}

// todo 这里接口不对
// export function articleCategoryOptionsApi(params?: paramsType): Promise<baseResponse<optionsType[]>> {
//     return useAxios.get("/api/article/category")
// }