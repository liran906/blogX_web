<script setup lang="ts">

import F_card from "@/components/web/f_card.vue";
import {showUpdatePwd} from "@/components/common/f_update_password";
import {reactive} from "vue";
import type {listResponse} from "@/api";
import {loginRecordApi, type loginRecordType} from "@/api/user_api";
import {Message} from "@arco-design/web-vue";
import {dateTimeFormat} from "../../../utils/date";
import {loginTypeOptions, registerSourceOptions} from "@/options/options";
import F_label from "@/components/common/f_label.vue";

const data= reactive<listResponse<loginRecordType>>({
  list:[],
  count:0
})

const params = reactive({
  page: 1,
  limit: 10,
})

async function getData() {
  const res = await loginRecordApi(params)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Object.assign(data, res.data)
}

function pageChange(page: number) {
  params.page = page
  getData()
}

getData()


</script>

<template>
  <div class="user_center_login_record_view">
    <f_card title="登录日志">

      <div style="color: var(--color-text-1);">
        若发现异常登录，请尽快 <a href="javascript:void 0" @click="showUpdatePwd">修改密码</a>
      </div>

      <div class="login_list">
        <div class="list_header">
          <span class="date">登录时间</span>
          <span class="loginType">登录方式</span>
          <span class="addr">IP归属地</span>
          <span class="ua">登录设备</span>
        </div>
        <div class="item" v-for="item in data.list">
          <span class="date">{{dateTimeFormat(item.createdAt)}}</span>
          <span class="loginType">
            <f_label :options="loginTypeOptions" :value="item.loginType"></f_label>
          </span>
          <span class="addr">{{ item.ipLocation }}({{item.ip}})</span>
          <span class="ua">{{item.ua}}</span>
        </div>
      </div>

    </f_card>
    <!-- 🔹 分页控件 -->
    <div class="f_list_page">
      <a-pagination
          show-total
          @change="pageChange"
          :total="data.count"
          v-model:current="params.page"
          :page-size="params.limit"
      />
    </div>
  </div>
</template>

<style lang="less">
.user_center_login_record_view {
  .list_header {
    display: flex;
    justify-content: space-between;
    background: var(--color-fill-3);
    padding: 10px 20px;
    font-weight: bold;
    color: var(--color-text-1);
    text-align: center;

    span {
      display: inline-block;
    }

    .date {
      width: 190px;
    }

    .ua {
      width: 500px;
    }

    .addr {
      width: 200px;
      text-align: center;
    }

    .loginType {
      width: 90px;
    }
  }
  .login_list {
    margin-top: 10px;
    .item{
      align-items: center;
      background: var(--color-fill-1);
      display: flex;
      justify-content: space-between;
      padding: 10px 20px;
      color: var(--color-text-1);
      &:nth-child(even){
        background: var(--color-fill-2);
      }

      .date{
        width: 200px;
      }

      .ua{
        align-items: center;
        width: 500px;
      }

      .addr{
        text-align: center;
        width: 200px;
      }

      .loginType{
        width: 90px;
      }
    }
  }
  .f_list_page {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: 20px;
  }
}
</style>