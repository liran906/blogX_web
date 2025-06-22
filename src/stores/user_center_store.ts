import {defineStore} from 'pinia'
import {userDetailApi, type userDetailType} from "@/api/user_api";
import {Message} from "@arco-design/web-vue";
interface userStoreType {
    userDetail: userDetailType
}


export const userCenterStorei = defineStore('userCenterStore', {
    state: (): userStoreType => {
        return {
            userDetail: {
                "id": 0,
                "createdAt": "",
                "username": "",
                "email": "",
                "hasPassword": false,
                "nickname": "",
                "nicknameUpdate": 0, // 秒级时间戳
                "avatarURL": "",
                "bio": "",
                "openid": "",
                "gender": 0,
                "phone": "",
                "country": "",
                "province": "",
                "city": "",
                "status": 0,
                "lastLoginTime": "",
                "lastLoginIP": "",
                "registerSource": 0,
                "dateOfBirth": "",
                "articleCount": 0,
                "readCount": 0,
                "likeCount": 0,
                "collectCount": 0,
                "fansCount": 0,
                "followingCount": 0,
                "role": 0,
                "siteAge": 0,
                "tags": [],
                "updatedAt": "",
                "themeID": 0,
                "displayCollections": false,
                "displayFans": false,
                "displayFollowing": false,
                "receiveCommentNotify": false,
                "receiveLikeNotify": false,
                "receiveCollectNotify": false,
                "receivePrivateMessage": false,
                "receiveStrangerMessage": false,
                "homepageVisitCount": 0,
            }
        }
    },
    actions: {
        async getUserDetail(){
            const res = await userDetailApi()
            if (res.code){
                Message.error(res.msg)
                return
            }
            Object.assign(this.userDetail, res.data)

        }
    },
    getters: {

    }
})