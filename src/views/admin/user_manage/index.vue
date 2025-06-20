<script setup lang="ts">

import F_list, {type filterGroupType} from "@/components/admin/f_list.vue";
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

const actionGroup = [
  {
    label: "批量升级",
    callback: function (keyList: number[]) {
      console.log(keyList)
    }
  }
]

const filters: filterGroupType[] = [
  {
    label:"角色过滤",
    source: [
      {label: "管理员", value: 1},
      {label: "用户", value: 2},
      {label: "游客", value: 3},
    ],
    column: "role",
    width: 140,
    // callback: (value: number)=>{
    //   console.log("父", value)
    // }
  },
  // todo 这里接口不对
  // {
  //   label: "文章分类",
  //   source: articleCategoryOptionsApi,
  //   column: "category",
  //   width: 140,
  // }
]

function remove(keyList: number[]){
  console.log(keyList)
}

</script>

<template>
  <div>
    <f_list :actionGroup="actionGroup" :filter-group="filters" :url="userListApi" :columns="columns">
      <template #avatar="{record}:{record: userListType}">
        <a-avatar :image-url="record.avatarURL"></a-avatar>
      </template>
    </f_list>
  </div>
</template>

<style scoped>

</style>