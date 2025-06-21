// M
import {type baseResponse, type listResponse, type paramsType, useAxios} from "@/api/index";

export interface logListType {
    "id": number
    "createdAt": string
    "updatedAt": string
    "logType": number
    "title": string
    "content": string
    "level": number
    "userID": number
    "ip": string
    "ipLocation": string //
    "isRead": boolean,
    "loginStatus": boolean,
    "username": string
    "password": string //
    "loginType": number
    "serviceName": string
    "userNickname": string
    "userAvatarURL": string //
}

export interface logListParams extends paramsType {
    logType: 1 | 2 | 3
}

export function logListApi(params: logListParams):Promise<baseResponse<listResponse<logListType>>>{
    return  useAxios.get("/api/logs", {params})
}

export function logReadApi(id: number):Promise<baseResponse<string>>{
    return useAxios.get("/api/logs/" + id.toString())
}