import {type baseResponse, useAxios} from "@/api/index";


export interface aiAnalysisType {
    "title": string
    "abstract":string
    "category": string
    "tags": string[]
}

export function aiAnalysisApi(content: string): Promise<baseResponse<aiAnalysisType>> {
    return useAxios.post("/api/ai", {content})
}