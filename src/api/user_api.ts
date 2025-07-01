import {type baseResponse, type listResponse, type optionsType, type paramsType, useAxios} from "@/api/index";

export interface pwdLoginRequest {
    username: string;
    password: string;
    captchaID: string
    captchaCode: string
}

// 登录
export function pwdLoginApi(data: pwdLoginRequest): Promise<baseResponse<string>> {
    return useAxios.post("/api/user/login", data)
}

// 详细信息
export interface userDetailType {
    "id": number
    "createdAt": string
    "username": string
    "email": string
    "hasPassword": boolean
    "nickname": string
    "nicknameUpdate": number // 秒级时间戳
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
    "tags": string[]
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
// 详细用户信息
export function userDetailApi():Promise<baseResponse<userDetailType>>{
    return  useAxios.get("/api/user/0")
}

export interface userInfoType {
    "userID": number
    "siteAge": number //
    "avatarURL": string //
    "nickname": string
    "homePageVisitCount": number //
    "articleCount": number
    "fansCount": number
    "followingCount": number //
    "ipLocation": string //
    "themeID": number
    "displayCollections": boolean
    "displayFans": boolean
    "displayFollowing": boolean
    "relation": 0 | 1 | 2 | 3 | 4 | 5
}

// 用户信息
export function userInfoApi(userID: number): Promise<baseResponse<userInfoType>> {
    return useAxios.get("/api/user/brief", {params: {id: userID}})
}

// 注销登录
export function userLogoutApi():Promise<baseResponse<string>>{
    return useAxios.delete("/api/user/logout")
}


// todo 这里接口不对
// export function articleCategoryOptionsApi(params?: paramsType): Promise<baseResponse<optionsType[]>> {
//     return useAxios.get("/api/article/category")
// }

export function userArticleTopApi(aid: number): Promise<baseResponse<string>> {
    return useAxios.put("/api/article/pin/" + aid.toString())
}

export function adminArticleTopApi(aid: number):Promise<baseResponse<string>>{
    return useAxios.put("/api/article/admin_pin/" + aid.toString())
}

export interface userListType{
    "id": number,
    "createdAt": string
    "username": string,
    "nickname": string,
    "avatarURL": string,
    "articleCount": number,
    "indexCount":number, // todo ???
    "lastLoginIP": string,
    "lastLoginIPAddr": string,
    "lastLoginTime": string,
}

// 用户列表
export function userListApi(params?: paramsType):Promise<baseResponse<listResponse<userListType>>> {
    return useAxios.get("/api/user/list", {params})
}

export interface userUpdateAdminRequest {
    userID: number
    username: string
    nickname: string
    avatarURL: string
    bio?: string
    role?: number
}

export function userUpdateAdminApi(data: userUpdateAdminRequest):Promise<baseResponse<string>>{
    return  useAxios.put("/api/user/admin_update", data)
}

export interface sendEmailType {
    "type": 1|2|3
    "email": string
    "captchaID": string
    "captchaCode": string
}

export interface sendEmailResponse {
    emailID: string
}

export function sendEmailApi(data: sendEmailType): Promise<baseResponse<sendEmailResponse>> {
    return useAxios.post("/api/user/send_email", data)
}

export interface emailRegisterType {
    "emailID": string
    "emailCode": string
    "username": string
    "password": string
    rePwd: string
}

export function emailRegisterApi(data: emailRegisterType): Promise<baseResponse<string>> {
    return useAxios.post("/api/user/register_email", data)
}

export function qqLoginApi(code:string):Promise<baseResponse<string>>{
    return  useAxios.post("/api/user/qq", {code})
}

export interface userDetailUpdateRequest {
    nickname?: string
    avatarURL?: string
    bio?: string
    tags?: string[]
    displayCollections?: boolean
    displayFans?: boolean
    displayFollowing?: boolean
    themeID?: number
    gender?: number
    phone?: string
    country?: string
    province?: string
    city?: string
    dateOfBirth?: string
}

export function userDetailUpdateApi(data: userDetailUpdateRequest): Promise<baseResponse<string>> {
    return useAxios.put("/api/user/update", data)
}

export interface userPwdUpdateType {
    "oldPwd": string
    "pwd": string
    rePwd: string
}

export function userPwdUpdateApi(data: userPwdUpdateType):Promise<baseResponse<string>>{
    return useAxios.put("/api/user/password", data)
}

export interface userEmailUpdateType {
    "emailID": string
    "emailCode": string
}


export function userEmailUpdateApi(data: userEmailUpdateType): Promise<baseResponse<string>> {
    return useAxios.put("/api/user/bind_email", data)
}

export interface loginRecordType {
    "id": number
    "createdAt": string
    "userID": number
    "username": string
    "userNickname": string
    "ip": string
    "ipLocation": string
    "addr": string
    "ua": string
    "loginType": number
}

export interface loginRecordRequest extends paramsType {
    userID?: number
    page?: number
    limit?: number
}

export function loginRecordApi(params: loginRecordRequest): Promise<baseResponse<listResponse<loginRecordType>>> {
    return useAxios.get("/api/user/login_list/", {params})
}