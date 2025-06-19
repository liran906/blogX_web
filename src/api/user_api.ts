import {type baseResponse, useAxios} from "@/api/index";

export interface pwdLoginRequest {
    username: string;
    password: string;
}


export function pwdLoginApi(data: pwdLoginRequest): Promise<baseResponse<string>> {
    return useAxios.post("/api/user/login", data)
}