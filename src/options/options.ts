import type {optionsType} from "@/api";

export interface optionsColorType  extends  optionsType{
    color?: string
}
export const articleStatusOptions = [
    {label: "草稿", value: 1, color: "cyan"},
    {label: "审核", value: 2, color: "orange"},
    {label: "发布", value: 3, color: "blue"},
    {label: "拒绝", value: 4, color: "red"},
]

export const roleOptions = [
    {label: "管理员", value: 1, color: "red"},
    {label: "用户", value: 2, color: "blue"},
    {label: "访客", value: 3, color: "gray"},
]

export const logLevelOptions = [
    {label: "debug", value: 1, color: "gray"},
    {label: "trace", value: 2, color: "gray"},
    {label: "info", value: 3, color: "blue"},
    {label: "warn", value: 4, color: "gold"},
    {label: "error", value: 5, color: "orange"},
    {label: "fatal", value: 6, color: "red"},
    {label: "panic", value: 7, color: "black"},
]