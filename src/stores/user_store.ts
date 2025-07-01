import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {userInfoApi, userLogoutApi} from "@/api/user_api";
import {Message} from "@arco-design/web-vue";
import {parseToken} from "@/utils/parse_token";
import router from "@/router";
import {siteApi, type siteResponse} from "@/api/site_api";
import {unReadMsgApi, type unReadMsgType} from "@/api/site_msg_api";

interface userInfoType {
    userID: number
    nickName: string
    userName: string
    avatar: string
    role: number
    token: string
    "homePageVisitCount": number
    "articleCount": number
    "fansCount": number
    "followingCount": number
    "ipLocation": string
}

interface userStoreType {
    userInfo: userInfoType
    siteInfo: siteResponse
    unMsgInfo: unReadMsgType
}

export const userStorei = defineStore('userStore', {
    state: (): userStoreType => {
        return {
            userInfo: {
                userID: 0,
                nickName: "",
                userName: "",
                avatar: "",
                role: 0,
                token: "",
                homePageVisitCount: 0,
                articleCount: 0,
                fansCount: 0,
                followingCount: 0,
                ipLocation: ""
            },
            siteInfo: {
                "cloud": {
                    "enable": false
                },
                "ai": {
                    "enable": false
                },
                "siteInfo": {
                    "title": "",
                    "logoURL": "",
                    "enableICP": false,
                    "icp": "",
                    "mode": 1
                },
                "project": {
                    "title": "",
                    "icon": "",
                    "webPath": ""
                },
                "seo": {
                    "keywords": "",
                    "description": ""
                },
                "about": {
                    "siteDate": "",
                    "qqURL": "",
                    "version": "",
                    "wechatURL": "",
                    "gitee": "",
                    "bilibili": "",
                    "github": ""
                },
                "login": {
                    "qqLogin": false,
                    "usernamePwdLogin": true,
                    "emailRegister": false,
                    "captcha": false
                },
                "indexRight": {
                    "list": []
                },
                "article": {
                    "autoApprove": false,
                    "commentDepth": 4
                }
            },
            unMsgInfo: {
                commentMsgCount: 0,
                diggMsgCount: 0,
                privateMsgCount: 0,
                systemMsgCount: 0,
            }
        }
    },
    actions: {
        saveUserInfo(token: string) {
            // 传一个token过来，然后重新去调用户信息接口
            this.userInfo.token = token
            const payLoad = parseToken(token)
            this.userInfo.userID = payLoad.userID
            this.userInfo.role = payLoad.role

            userInfoApi(payLoad.userID).then(res => {
                if (res.code) {
                    Message.error(res.msg)
                    return
                }

                this.userInfo = {
                    userID: res.data.userID,
                    nickName: res.data.nickname,
                    userName: res.data.nickname,
                    avatar: res.data.avatarURL,
                    role: payLoad.role,
                    token: token,
                    homePageVisitCount: res.data.homePageVisitCount,
                    articleCount: res.data.articleCount,
                    fansCount: res.data.fansCount,
                    followingCount: res.data.followingCount,
                    ipLocation: res.data.ipLocation,
                }
                // 持久化
                localStorage.setItem("userInfo", JSON.stringify(this.userInfo))
            })
        },
        loadUserInfo() {
            const val = localStorage.getItem("userInfo")
            if (!val){
                return
            }
            try {
                this.userInfo = JSON.parse(val)
            } catch (error) {
                console.log(error)
                return
            }

            // 判断token有没有过期
            const payLoad = parseToken(this.userInfo.token) // exp的时间是秒
            const nowTime = new Date().getTime() // 单位是毫秒
            if (payLoad.exp * 1000 - nowTime <= 0){
                Message.warning("token已过期")
                localStorage.removeItem("userInfo")
                router.push({name: "web_home"})
                return;
            }

            console.log(this.userInfo)
        },
        async userLogout() {
            const res = await userLogoutApi()
            localStorage.removeItem("userInfo")
            this.userInfo = {
                userID: 0,
                nickName: "",
                userName: "",
                avatar: "",
                role: 0,
                token: "",
                homePageVisitCount: 0,
                articleCount: 0,
                fansCount: 0,
                followingCount: 0,
                ipLocation: ""
            }
            Message.success("用户注销成功")
            router.push({name: "web_home"})
        },
        async loadSiteInfo() {
            const res = await siteApi("site")
            if (res.code) {
                Message.error(res.msg)
                return
            }
            Object.assign(this.siteInfo, res.data)
        },
        async unReadMsg() {
            const res = await unReadMsgApi()
            if (res.code) {
                Message.error(res.msg)
                return
            }
            Object.assign(this.unMsgInfo, res.data)
        }
    },
    getters: {
        isLogin(): boolean {
            return !!this.userInfo.userID
        },

        isAdmin(): boolean {
            return this.userInfo.role === 1
        },
        unReadMsgAll(): number {
            return this.unMsgInfo.commentMsgCount + this.unMsgInfo.diggMsgCount + this.unMsgInfo.privateMsgCount + this.unMsgInfo.systemMsgCount
        }
    }
})
