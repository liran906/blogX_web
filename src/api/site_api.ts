
// M

import {type baseResponse, useAxios} from "@/api/index";

export interface siteResponse {
    "cloud": {
        "enable": boolean
    },
    "ai": {
        "enable": boolean
    },
    "siteInfo": {
        "title": string
        "logoURL": string //
        "enableICP": boolean
        "icp": string
        "mode": 1 | 2
    },
    "project": {
        "title": string
        "icon": string
        "webPath": string
    },
    "seo": {
        "keywords": string
        "description": string
    },
    "about": {
        "siteDate": string
        "qqURL": string //
        "version": string
        "wechatURL": string //
        "gitee": string
        "bilibili": string
        "github": string
    },
    "login": {
        "qqLogin": boolean
        "usernamePwdLogin": boolean
        "emailRegister": boolean //
        "captcha": boolean
    },
    "indexRight": {
        "list": indexRightType[]
    },
    "article": {
        "autoApprove": boolean //
        "commentDepth": number //
    }
}

export interface indexRightType {
    title: string
    enable: boolean
}

export interface emailResponse {
    "domain": string
    "port": number
    "sendEmail": string
    "authCode": string
    "alias": string //
    "ssl": boolean
    "tls": boolean
}

export interface qqResponse {
    "appID": string
    "appKey":string
    "redirect": string
}

export interface cloudResponse {
    "qny": qiNiuType
}

export interface qiNiuType {
    "enable": boolean
    "localSave": boolean // 开启云存储后，是否存到本地
    "accessKey": string
    "secretKey": string
    "bucket": string
    "uri": string
    "region": string
    "prefix": string
    "size": number // 单位MB
    // "expiry": number // 单位秒
}

export interface aiResponse {
    "enable": boolean,
    "secretKey": string
    "nickname": string
    "avatarURL": string //
    "abstract": string
}

interface siteBaseResponse {
    site: siteResponse
    email: emailResponse
    qq: qqResponse
    cloud: cloudResponse //
    ai: aiResponse
}


export type siteName = "site" | "email" | "qq" | "cloud" | "ai"


export function siteApi<T extends siteName>(name: T): Promise<baseResponse<siteBaseResponse[T]>> {
    return useAxios.get("/api/site/" + name)
}

export function siteUpdateApi<T extends siteName>(name: T, data: siteBaseResponse[T]):Promise<baseResponse<string>>{
    return useAxios.put("/api/site/" + name, data)
}

export function siteQQLoginUrlApi():Promise<baseResponse<string>>{
    return useAxios.get("/api/site/qq_url")
}


export interface qiniuUploadConfigType {
    "token": string
    "key": string
    "region": string
    "url": string
    "size": number
}

export function qiniuUploadConfigApi():Promise<baseResponse<qiniuUploadConfigType>>{
    return useAxios.post("/api/images/qiniu")
}

export interface aiSiteInfoType {
    "enable": boolean
    "nickname":string
    "avatarURL": string
    "abstract": string
}

export function aiSiteInfoApi():Promise<baseResponse<aiSiteInfoType>>{
    return useAxios.get("/api/site/ai_info")
}