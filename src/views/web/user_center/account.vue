<script setup lang="ts">
import {userCenterStorei} from "@/stores/user_center_store";
import {reactive, onMounted} from "vue";
import {showUpdatePwd} from "@/components/common/f_update_password";
import {showUpdateEmail} from "@/components/common/f_update_email";
import F_card from "@/components/web/f_card.vue";
import {userDetailUpdateApi, type userDetailUpdateRequest} from "@/api/user_api";
import {Message} from "@arco-design/web-vue";

const userCenterStore = userCenterStorei()

const form = reactive({})

// 确保页面加载时获取最新用户数据
onMounted(() => {
  userCenterStore.getUserDetail()
})

async function userUpdateColumn(column: "subscribe", value: boolean) {
  const data: userDetailUpdateRequest = {}
  data[column] = value

  const res = await userDetailUpdateApi(data)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  
  // 刷新用户数据确保与后端同步
  await userCenterStore.getUserDetail()
}



</script>

<template>
  <div class="user_center_account_view">
    <f_card title="账号设置">
      <a-form :model="form" :label-col-props="{span: 2}">
        <a-form-item label="订阅报告">
          <a-switch v-model="userCenterStore.userDetail.subscribe" @change="userUpdateColumn('subscribe', $event as boolean)"></a-switch>
          <template #help>订阅后您将收到网站会自动发送每日分析报告至您的邮箱</template>
        </a-form-item>
        <a-form-item label="密码">
          <span v-if="userCenterStore.userDetail.hasPassword">
            <span class="col" style="color: var(--color-text-1);">******</span> <a href="javascript:void 0" @click="showUpdatePwd"> 修改密码</a>
          </span>
          <span v-else>未启用</span>
        </a-form-item>
        <a-form-item label="邮箱" style="color: var(--color-text-1);">
          <span class="col">{{ userCenterStore.userDetail.email}}</span>
          <a href="javascript:void 0" @click="showUpdateEmail">{{ userCenterStore.userDetail.email === '' ? '绑定邮箱' : '修改邮箱' }}</a>
        </a-form-item>
        <a-form-item label="登录记录">
          <router-link :to="{name: 'userCenterLoginRecord'}">查看记录</router-link>
        </a-form-item>
      </a-form>
    </f_card>
  </div>
</template>

<style  lang="less">
.user_center_account_view{
  background: var(--color-bg-1);
  border-radius: 5px;
  .head{
    padding: 20px 20px 10px 20px;
    border-bottom: @f_border;
    font-weight: 600;
    font-size: 16px;
  }
  .body{
    padding: 10px 20px 20px 20px;
    .arco-row{
      margin-bottom: 10px;
    }
    a{
      margin-left: 10px;
    }
    .col{
      margin-left: 10px;
    }
  }
}
</style>