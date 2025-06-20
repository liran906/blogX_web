<script setup lang="ts">
import F_list, {type filterGroupType} from "@/components/admin/f_list.vue";
import {userListApi, type userListType} from "@/api/user_api";
import type {columnType} from "@/components/admin/f_list.vue";
import {type formListType} from "@/components/admin/f_modal_form.vue";

const columns = [
  {title: "ID", dataIndex: 'id'},
  {title: "用户名", dataIndex: 'username'},
  {title: "昵称", dataIndex: 'nickname'},
  {title: "头像", slotName: 'avatar'},
  {title: "角色", dataIndex: 'role'},
  {title: "注册时间", slotName: 'createdAt', dateFormat: "current"}, //dateFormat: date 只显示日期 time 只显示时间 current 显示过去了多久 默认：日期+时间
  {title: "操作", slotName: 'action'},
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
  }
]

const formList: formListType[] = [
  {
    label: "用户名", field: "username", type: "input", editDisable: true, rules: {required: true}, validateTrigger: "blur",
  },
  {
   label: "密码", field: "password", type: "password", editDisable: true, rules: {required: true}, validateTrigger: "blur",
  },
  {
    label: "邮箱", field: "email", type: "input", editDisable: true, rules: {required: true}, validateTrigger: "blur"
  },
  {
    label: "昵称", field: "nickname", type: "input", rules: {required: true}, validateTrigger: "blur"
  },
  {
    label: "角色", field: "role", type:"select", rules: {required: true}, validateTrigger: "blur", source: [
      {label: "管理员", value: 1},
      {label: "用户", value: 2},
      {label: "游客", value: 3},
    ],
  }
]

</script>

<template>
  <div>
    <f_list
        ref="fListRef"
        :url="userListApi"
        :filter-group="filters"
        add-form-label="创建用户"
        edit-form-label="编辑用户"
        :form-list="formList"
        :columns="columns">
      <template #avatar="{record}:{record: userListType}">
        <a-avatar :image-url="record.avatarURL"></a-avatar>
      </template>
    </f_list>
  </div>
</template>

<style scoped>

</style>