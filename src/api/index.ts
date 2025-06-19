import axios from "axios";
import {Message} from "@arco-design/web-vue";

export interface baseResponse<T> {
    code: number;
    data: T; // 泛型, T 类型
    msg: string;
}

export const useAxios = axios.create({
    timeout: 6000,
    baseURL: "", // 在使用前端代理的情况下，这里必须留空，不然会跨域
})

useAxios.interceptors.request.use((config) => {
    config.headers.set("token", "xxx")
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