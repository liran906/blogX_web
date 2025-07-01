import {defineStore} from 'pinia'
import {userInfoApi, type userInfoType} from "@/api/user_api";
import {Message} from "@arco-design/web-vue";
import {userStorei} from "@/stores/user_store";

const store = userStorei()
interface userBaseType {
    userBase: userInfoType
}


export const userBaseStorei = defineStore('userBaseStore', {
    state: (): userBaseType => {
        return {
            userBase: {
                userID: 0,
                siteAge: 0,
                avatarURL: "",
                nickname: "",
                homePageVisitCount: 0,
                articleCount: 0,
                fansCount: 0,
                followingCount: 0,
                ipLocation: "",
                themeID: 0,
                displayCollections: false,
                displayFans: false,
                displayFollowing: false,
                relation: 0,
            }
        }
    },
    actions: {
        async getUserBaseInfo(id: number) {
            const res = await userInfoApi(id)
            if (res.code) {
                Message.error(res.msg)
                return
            }
            Object.assign(this.userBase, res.data)
        }
    },
    getters: {
        isMe(): boolean {
            return this.userBase.userID === store.userInfo.userID
        }
    }
})