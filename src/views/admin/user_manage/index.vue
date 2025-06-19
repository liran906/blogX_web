<script setup lang="ts">

import F_list from "@/components/admin/f_list.vue";
import {userListApi, type userListType} from "@/api/user_api";
import type {columnType} from "@/components/admin/f_list.vue";

const columns = [
  {title: "ID", dataIndex: 'id'},
  {title: "用户名", dataIndex: 'username'},
  {title: "昵称", dataIndex: 'nickname'},
  {title: "头像", slotName: 'avatar'},
  {title: "角色", dataIndex: 'role'},
  {title: "注册时间", slotName: 'createdAt', dateFormat: "current"}, //dateFormat: date 只显示日期 time 只显示时间 current 显示过去了多久 默认：日期+时间
  {title: "操作", slotName: 'action'},
]

</script>

<template>
  <div>
    <f_list :url="userListApi" :columns="columns">
      <template #avatar="{record}:{record: userListType}">
        <a-avatar :image-url="record.avatarURL"></a-avatar>
      </template>
      <template #action_left>
        <a-button>预览</a-button>
      </template>
    </f_list>
  </div>
</template>

<style scoped>

</style>