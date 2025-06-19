import axios from "axios";
import {Message} from "@arco-design/web-vue";
import {userStorei} from "@/stores/user_store";

// 基本响应结构
export interface baseResponse<T> {
    code: number;
    data: T; // 泛型, T 类型
    msg: string;
}

// 列表响应结构
export interface listResponse<T> {
    list: T[];
    count: number;
}

// 列表查询参数结构
export interface paramsType {
    key?: string;
    limit?: number;
    page?: number;
    order?: string;
    startTime?: string;
    endTime?: string;
}

export const useAxios = axios.create({
    timeout: 6000,
    baseURL: "", // 在使用前端代理的情况下，这里必须留空，不然会跨域
})

useAxios.interceptors.request.use((config) => {
    const userStore = userStorei()
    config.headers.set("token", userStore.userInfo.token)
    return config
})

useAxios.interceptors.response.use((respond) => {
    if (respond.status === 200){
        return respond.data
    }
    return respond
}, (respond)=>{
    Message.error(respond.message)
})