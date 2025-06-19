<script setup lang="ts">

import F_list from "@/components/admin/f_list.vue";
import {userListApi, type userListType} from "@/api/user_api";

const columns = [
  {title: "ID", dataIndex: 'id'},
  {title: "用户名", dataIndex: 'username'},
  {title: "昵称", dataIndex: 'nickname'},
  {title: "头像", slotName: 'avatar'},
  {title: "角色", dataIndex: 'role'},
  {title: "注册时间", dataIndex: 'createdAt'},
]

</script>

<template>
  <div>
    <f_list :url="userListApi" :columns="columns">
      <template #avatar="{record}:{record: userListType}">
        <a-avatar :image-url="record.avatarURL"></a-avatar>
      </template>
    </f_list>
  </div>
</template>

<style scoped>

</style>