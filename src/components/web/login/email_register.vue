<script setup lang="ts">

import {Button, Form, FormItem, Input, Message} from "@arco-design/web-vue";
import {reactive, ref} from "vue";
import {emailRegisterApi, type emailRegisterType} from "@/api/user_api";
import {useI18n} from "vue-i18n";

const {t} = useI18n()
const formRef = ref()
const emits = defineEmits(["ok"])

interface Props {
  emailId: string
}

const props = defineProps<Props>()
const form = reactive<emailRegisterType>({
  emailID: "",
  emailCode: "",
  username: "",
  password: "",
  rePwd: ""
})

function rePwdValida(value: string | undefined, callback: (error?: string) => void) {
  if (value !== form.password) {
    callback(t('user.passwordMismatch'))
  }
}

async function handler() {
  const val = await formRef.value.validate()
  if (val) return
  form.emailID = props.emailId
  const res = await emailRegisterApi(form)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  emits("ok", res.data)
}
</script>

<template>
  <Form ref="formRef" :model="form" :label-col-props="{span: 0}" :wrapper-col-props="{span: 24}">
    <FormItem field="emailCode" :rules="[{required: true, message: t('user.emailCodeRequired')}]">
      <Input v-model="form.emailCode" :placeholder="t('user.emailCode')"></Input>
    </FormItem>
    <FormItem field="username" :rules="[{required: true, message: t('user.usernameRequired')}]">
      <Input v-model="form.username" :placeholder="t('user.username')"></Input>
    </FormItem>
    <FormItem field="password" :rules="[{required: true, message: t('user.passwordRequired')}]">
      <Input v-model="form.password" type="password" :placeholder="t('user.password')"></Input>
    </FormItem>
    <FormItem field="rePwd" :rules="[{required: true, message: t('user.confirmPasswordRequired')}, {validator: rePwdValida}]">
      <Input v-model="form.rePwd" type="password" :placeholder="t('user.confirmPassword')"></Input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handler" long>{{ t('user.register') }}</Button>
    </FormItem>
  </Form>
</template>