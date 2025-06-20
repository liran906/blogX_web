<script setup lang="ts">

import F_list, {type filterGroupType} from "@/components/admin/f_list.vue";
import {userListApi, type userListType} from "@/api/user_api";
import type {columnType} from "@/components/admin/f_list.vue";
import {reactive, ref} from "vue";
import F_modal_form, {type formListType} from "@/components/admin/f_modal_form.vue";

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
    label: "昵称", field: "nick_name", type: "input", rules: {required: true}, validateTrigger: "blur"
  }
]
const form = reactive({})
const visible = ref(false)





function remove(keyList: number[]){
  console.log(keyList)
}

function ok(form: object, fn: (val: boolean) => void) {
  // console.log(form)
  // fn(false)
}
</script>

<template>
  <div>
    <f_modal_form @ok="ok" v-model:visible="visible" title="创建用户" :form-list="formList"></f_modal_form>
    <f_list @add="visible=true" :filter-group="filters" :url="userListApi" :columns="columns">
      <template #avatar="{record}:{record: userListType}">
        <a-avatar :image-url="record.avatarURL"></a-avatar>
      </template>
    </f_list>
  </div>
</template>

<style scoped>

</style>