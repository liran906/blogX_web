<script setup lang="ts">
import F_nav from "@/components/web/f_nav.vue";
import F_main from "@/components/web/f_main.vue";
import {useRoute} from "vue-router";
import {userStorei} from "@/stores/user_store";
import {IconPlus} from "@arco-design/web-vue/es/icon";
import {IconMessage} from "@arco-design/web-vue/es/icon";
import {IconCheck} from "@arco-design/web-vue/es/icon";

const store = userStorei()
const route = useRoute()
import {userBaseStorei} from "@/stores/user_base_store";
import F_a from "@/components/common/f_a.vue";
import {ref, watch} from "vue";
import router from "@/router";
import {Message} from "@arco-design/web-vue";
import {showLogin} from "@/components/web/f_login";
import type {baseResponse} from "@/api";
import {focusUserApi, focusUserRemoveApi} from "@/api/focus_api";
import {goUser} from "@/utils/go_router";
import F_avatar from "@/components/web/f_avatar.vue";

const baseStore = userBaseStorei()

const text = ref("")

async function search(){
  router.push({
    name: route.name as string,
    query: {
      ...route.query,
      key: text.value,
    },
    params: route.params,
  })
}

async function focus(isFocus: boolean) {
  if (!store.isLogin){
    Message.warning("请登录")
    showLogin({reload: true})
    return
  }
  let res: baseResponse<string>
  if (isFocus) {
    res = await focusUserApi({focusUserID: baseStore.userBase.userID})
  } else {
    res = await focusUserRemoveApi({focusUserID: baseStore.userBase.userID})
  }
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  baseStore.getUserBaseInfo(baseStore.userBase.userID)
}


watch(()=>route.params.id, ()=>{
  const id = Number(route.params.id)
  if (!isNaN(id)){
    baseStore.getUserBaseInfo(id)
  }
}, {immediate: true})


// todo
// watch(() => baseStore.userBase.themeID, (newID) => {
//   const themeColorMap: Record<number, string> = {
//     1: '#165DFF', // 默认
//     2: '#3B80FF', // 湖光山色
//     3: '#9C27B0', // 立方体
//     4: '#4CAF50', // 我的世界
//     5: '#E53935', // F22猛禽
//     6: '#BA68C8', // 爱乐之城
//     7: '#FF8F00', // 星际穿越
//     8: '#FF4081', // 布达佩斯
//     9: '#FDD835', // 土星
//     10: '#D32F2F', // 红叶
//     11: '#FF7043', // 沙漠落日
//     12: '#00ACC1', // 极光
//     13: '#66BB6A', // 树叶
//     14: '#7C4DFF', // 数字山峦
//     15: '#EC407A', // 千与千寻
//     16: '#2196F3', // 地球
//   }
//
//   const color = themeColorMap[newID] || '#409EFF'
//
//   document.documentElement.style.setProperty('--primary-6', '220, 220, 255'); // 这是默认蓝色
//   document.documentElement.style.setProperty('--color-primary', color)
//   document.documentElement.style.setProperty('--arcoblue-6', color)
// }, { immediate: true })




</script>

<template>
  <div class="user_view" :class="`user_style_${baseStore.userBase.themeID}`">
    <div class="banner"></div>
    <f_nav no-scroll></f_nav>
    <f_main>
      <div class="user_info">
        <div class="avatar">
          <f_avatar @click="goUser(baseStore.userBase.userID)" :size="65" :image-url="baseStore.userBase.avatarURL" :nickname="baseStore.userBase.nickname"/>
        </div>
        <div class="info">
          <div class="nick">
            <span>{{ baseStore.userBase.nickname }}</span>
            <a-tag>站龄{{ baseStore.userBase.siteAge }}年</a-tag>
          </div>
          <div class="data">
            <span>
              <span>{{ baseStore.userBase.homePageVisitCount }}</span> <span>总访问量</span>
            </span>
            <span>
              <span>{{ baseStore.userBase.articleCount }}</span> <span>文章</span>
            </span>
            <span>
              <span>{{ baseStore.userBase.fansCount }}</span> <span>粉丝</span>
            </span>
            <span>
              <span>{{ baseStore.userBase.followingCount }}</span> <span>关注</span>
            </span>
          </div>
          <div class="place">ip归属： {{ baseStore.userBase.ipLocation }}</div>
        </div>
        <div class="actions">
          <template v-if="baseStore.userBase.userID != store.userInfo.userID">
            <f_a>
              <a-button @click="focus(true)" size="mini" type="outline" v-if="!(baseStore.userBase.relation === 2 || baseStore.userBase.relation === 4)">
                <template #icon>
                  <icon-plus />
                </template>
                关注
              </a-button>
              <a-button @click="focus(false)" v-else size="mini" type="primary">
                <template #icon>
                  <icon-check />
                </template>
                已关注
              </a-button>
            </f_a>

            <router-link to="">
              <a-button size="mini" type="outline">
                <template #icon>
                  <icon-message />
                </template>
                私信</a-button>
            </router-link>
          </template>
          <template v-else>
            <router-link :to="{name: 'userCenterInfo'}">
              <a-button size="mini" type="outline">编辑资料</a-button>
            </router-link>
            <router-link :to="{name: 'platformArticle'}">
              <a-button size="mini"  type="outline">管理博文</a-button>
            </router-link>
          </template>
        </div>
      </div>
      <div class="user_sub_view">
        <div class="head">
          <div class="left">
            <router-link :to="{name: 'userArticle'}">{{ baseStore.isMe ? '我的文章' : '他的文章' }}</router-link>
            <router-link :to="{name: 'userArticleCollect'}" v-if="baseStore.isMe || baseStore.userBase.displayCollections" to="">{{ baseStore.isMe ? '我的收藏' : '他的收藏' }}</router-link>
            <router-link :to="{name: 'userFocusList'}" v-if="baseStore.isMe || baseStore.userBase.displayFollowing" to="">{{ baseStore.isMe ? '我的关注' : '他的关注' }}</router-link>
            <router-link :to="{name: 'userFansList'}" v-if="baseStore.isMe || baseStore.userBase.displayFans" to="">{{ baseStore.isMe ? '我的粉丝' : '他的粉丝' }}</router-link>
          </div>
          <a-input-search v-model="text" @keydown.enter="search" @search="search" placeholder="搜TA的内容"></a-input-search>
        </div>
        <div class="body">
          <router-view></router-view>
        </div>

      </div>
    </f_main>
  </div>
</template>

<style lang="less">
@import "@/assets/user_theme.less";
.user_view {
  height: calc(100vh - 60px);
  position: relative;
  padding-top: 60px;

  .f_main_com {
    min-height: 100%;

    .f_container {
      z-index: 1;
      margin-bottom: 20px;
    }
  }

  .user_info {
    background: var(--color-bg-1);
    border-radius: 5px;
    padding: 10px;
    position: relative;
    display: flex;
    margin-top: 20px;

    .avatar {
      width: 100px;

      .arco-avatar {
        position: absolute;
        left: 20px;
        top: -10px;
      }
    }

    .info {
      width: calc(100% - 100px);

      .nick {
        display: flex;
        align-items: center;

        span:nth-child(1) {
          color: var(--color-text-2);
          margin-right: 10px;
        }
      }

      .data {
        margin: 5px 0;

        > span {
          margin-right: 20px;

          span:nth-child(1) {
            font-size: 18px;
            color: var(--color-text-1);
            font-weight: 600;
          }

          span:nth-child(2) {
            color: var(--color-text-2);
          }
        }
      }

      .place {
        color: var(--color-text-2);
        margin-top: 10px;
        font-size: 12px;
      }
    }

    .actions{
      position: absolute;
      right: 10px;
      a{
        margin-left: 10px;

        .arco-btn{
          border-radius: 100px;
        }
      }
    }
  }

  .user_sub_view {
    margin-top: 20px;
    border-radius: 5px;
    background: var(--color-bg-1);

    .head {
      border-bottom: @f_border;
      padding: 10px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .arco-input-wrapper {
        width: 200px;
        border-radius: 100px;
      }

      .left {
        a {
          color: var(--color-text-1);
          font-size: 15px;
          margin-right: 30px;
        }

        a.router-link-active {
          color: rgb(var(--arcoblue-6));
        }
      }
    }

    .body {
      height: calc(100vh - 270px);
    }
  }
}
</style>