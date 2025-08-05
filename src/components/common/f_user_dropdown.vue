<script setup lang="ts">

import router from "@/router";
import {userStorei} from "@/stores/user_store";
import {ref} from "vue";
import {goUser} from "@/utils/go_router";
import F_avatar from "@/components/web/f_avatar.vue";
import {useI18n} from "vue-i18n";

const {t} = useI18n();
const store = userStorei();

function handleSelect(val: string) {
  if (val === "logout"){
    // 注销流程
    store.userLogout()
    return
  }
  router.push({name: val})
}

interface OptionType {
  name: string
  title: string
}

const options = ref<OptionType[]>([
  {title: t('userCenter.profile'), name: "userInfo"},
  {title: t('user.logout'), name: "logout"},
])

if (store.isAdmin){
  options.value = [
    {title: t('userCenter.profile'), name: "userInfo"},
    {title: t('admin.userManage'), name: "userList"},
    {title: t('admin.settings'), name: "settings"},
    {title: t('user.logout'), name: "logout"},
  ]
}


</script>

<template>
  <a-dropdown @select="handleSelect" :popup-max-height="false">
    <div class="f_user_dropdown_com">
      <f_avatar :size="35" :image-url="store.userInfo.avatar" :nickname="store.userInfo.nickName"/>
      <span class="user_name">{{ store.userInfo.userName }}</span>
      <icon-down/>
    </div>


    <template #content>
      <a-doption v-for="item in options" :value="item.name">{{ item.title }}</a-doption>
    </template>
  </a-dropdown>
</template>

<style lang="less">
.f_user_dropdown_com {
  cursor: pointer;

  .user_name {
    margin: 0 5px;
  }

  svg {
    margin-right: 0 !important;
  }
}
</style>