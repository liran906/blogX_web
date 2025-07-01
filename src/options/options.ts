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

export const registerSourceOptions = [
    {label: "邮箱注册", value: 1, color: "blue"},
    {label: "QQ注册", value: 2, color: "orange"},
    {label: "命令行注册", value: 3, color: "red"},
]

export const loginTypeOptions = [
    {label: "账号密码", value: 1, color: "blue"},
    {label: "邮箱密码", value: 2, color: "cyan"},
    {label: "QQ登录", value: 3, color: "cyan"},
    {label: "微信登录", value: 4, color: "green"},
]

export const relationOptions = [
    {label: "陌生人", value: 1, color: "gray"},
    {label: "已关注", value: 2, color: "purple"},
    {label: "粉丝", value: 3, color: "cyan"},
    {label: "好友", value: 4, color: "orange"},
    {label: "我", value: 5, color: "gold"},
]

export const bannerTypeOptions = [
    {label: "banner", value: 1, color: "blue"},
    {label: "推广", value: 2, color: "orange"},
]

export const siteMsgTypeOptions = [
    {label: "评论了你的文章", value: 1, color: ""},
    {label: "回复了你的评论", value: 2, color: ""},
    {label: "点赞了你的文章", value: 3, color: ""},
    {label: "取消了点赞", value: 4, color: ""},
    {label: "点赞了你的评论", value: 5, color: ""},
    {label: "取消了评论点赞", value: 6, color: ""},
    {label: "收藏了你的文章", value: 7, color: ""},
    {label: "取消了收藏", value: 8, color: ""},
    {label: "系统通知", value: 9, color: ""},
]