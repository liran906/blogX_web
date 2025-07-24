<script setup lang="ts">

import router from "@/router";
import {userStorei} from "@/stores/user_store";
import {ref} from "vue";
import {goUser} from "@/utils/go_router";
import F_avatar from "@/components/web/f_avatar.vue";

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
  {title: "个人信息", name: "userInfo"},
  {title: "注销退出", name: "logout"},
])

if (store.isAdmin){
  options.value = [
    {title: "个人信息", name: "userInfo"},
    {title: "用户列表", name: "userList"},
    {title: "系统信息", name: "settings"},
    {title: "注销退出", name: "logout"},
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