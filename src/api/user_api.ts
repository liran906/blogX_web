import {useAxios} from "@/api/index";

export function userListApi(){
    return useAxios.get("/api/ping")
}