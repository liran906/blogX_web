<script setup lang="ts">

import F_point from "@/components/common/f_point.vue";
import router from "@/router";
import {userStorei} from "@/stores/user_store";
import { useI18n } from 'vue-i18n'

const store = userStorei()
const { t } = useI18n()

function select(val: string) {
  router.push({
    name: val
  })
}

if (store.isLogin) {
  store.unReadMsg()
}


</script>

<template>
  <f_point :count="store.unReadMsgAll" class="f_nav_msg_com">
    <a-dropdown class="f_nav_msg_dropdown" @select="select">
      <a href="javascript:void 0">{{ t('nav.messages') }}</a>
      <template #content>
        <a-doption value="msgComment">
          <f_point :count="store.unMsgInfo.commentMsgCount">{{ t('nav.commentsAndMentions') }}</f_point>
        </a-doption>
        <a-doption value="msgDigg">
          <f_point :count="store.unMsgInfo.diggMsgCount">{{ t('nav.likesAndCollects') }}</f_point>
        </a-doption>
        <a-doption value="msgChat">
          <f_point :count="store.unMsgInfo.privateMsgCount">{{ t('nav.privateMessages') }}</f_point>
        </a-doption>
        <a-doption value="msgSystem">
          <f_point :count="store.unMsgInfo.systemMsgCount">{{ t('nav.systemNotifications') }}</f_point>
        </a-doption>
      </template>
    </a-dropdown>
  </f_point>
</template>

<style lang="less">
.f_nav_msg_dropdown {
  .arco-dropdown-option-content {
    padding: 0 6px;
  }
}
</style>