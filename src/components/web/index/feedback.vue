<script setup lang="ts">
import F_card from "@/components/web/f_card.vue";
import {reactive} from "vue";
import {feedbackCreateApi, type feedbackCreateRequest} from "@/api/feedback_api";
import {Message} from "@arco-design/web-vue";

const form = reactive<feedbackCreateRequest>({
  email: "",
  content: ""
})

async function add(){
  const res = await feedbackCreateApi(form)
  if (res.code){
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  form.email = ""
  form.content = ""
}


</script>

<template>
  <f_card title="用户反馈">
    <div class="feedback-form">
      <div class="input">
        <a-input v-model="form.email" placeholder="请输入邮箱" allow-clear />
      </div>
      <div class="text_area">
        <a-textarea
            v-model="form.content"
            :auto-size="{ minRows: 3, maxRows: 4 }"
            placeholder="请输入反馈内容"
            allow-clear
        />
      </div>
      <div class="button">
        <a-button @click="add" long type="primary">提交</a-button>
      </div>
    </div>
  </f_card>
</template>

<style scoped lang="less">
.feedback-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 260px; // 或 100% 看需求

  .input,
  .text_area,
  .button {
    width: 100%;
  }
}
</style>