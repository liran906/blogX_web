<script setup lang="ts">
import { pwdLoginApi, type pwdLoginRequest } from "@/api/user_api"
import { reactive, ref } from "vue"
import { Message } from "@arco-design/web-vue"
import {userStorei} from "@/stores/user_store";
import router from "@/router";
import { useRoute } from "vue-router";

const route = useRoute()

// ✅ 创建登录表单数据对象，使用 reactive 使其响应式（适配 v-model）
// 字段名与后端接口 pwdLoginRequest 类型保持一致
const loginFormData = reactive<pwdLoginRequest>({
  username: "",
  password: ""
})

const userStore = userStorei()

// ✅ 引用 a-form 组件实例，用于调用 validate 方法进行前端表单校验
// 初始值为 undefined，绑定在 <a-form ref="loginFormRef"> 后自动赋值
const loginFormRef = ref()

// ✅ 登录按钮点击事件（async 函数因为涉及异步验证 + 异步 API 请求）
async function handleLogin() {
  // 调用 Arco Design 的表单校验方法，返回错误对象（若有）
  const validationResult = await loginFormRef.value.validate()

  // 若表单验证未通过，则终止后续逻辑（例如用户名/密码为空）
  if (validationResult) return

  // ✅ 通过封装的 API 方法发送登录请求，请求体即 loginFormData 对象
  const response = await pwdLoginApi(loginFormData)

  // 若后端返回 code 非 0，表示登录失败，弹出错误提示并退出函数
  if (response.code) {
    Message.error(response.msg)
    return
  }

  // ✅ 登录成功提示
  Message.success(response.msg)

  // ✅ 登录成功后的常见操作建议（此处视项目需求决定是否添加）：
  // 1. 保存 token（如 localStorage.setItem("token", response.data)）
  // 2. 调用用户信息接口，获取用户权限/角色等       *** 我们采用这个方法 ***
  // 3. 页面跳转（如 router.push("/dashboard")）
  userStore.saveUserInfo(response.data)

  // 看是否有重定向请求，如果有就访问重定向页面
  const redirect = route.query.redirect
  if (redirect) {
    router.push(redirect as string)
    return
  }
  // 没有重定向请求就去 web
  router.push({ path: "/" })
}
</script>

<template>
  <div class="login_view">
    <div class="login_mask">
      <a-form
          ref="loginFormRef"
          :model="loginFormData"
          :label-col-props="{ span: 0 }"
          :wrapper-col-props="{ span: 24 }"
      >
        <div class="title">用户登录</div>

        <!-- ✅ 用户名输入框，field 和 v-model 分别用于表单验证 和 数据双向绑定 -->
        <a-form-item
            label="用户名"
            field="username"
            @keydown.enter="handleLogin"
            :rules="[{ required: true, message: '请输入用户名' }]"
        >
          <a-input placeholder="请输入用户名" v-model="loginFormData.username">
            <template #prefix>
              <icon-user />
            </template>
          </a-input>
        </a-form-item>

        <!-- ✅ 密码输入框 -->
        <a-form-item
            label="密码"
            field="password"
            @keydown.enter="handleLogin"
            :rules="[{ required: true, message: '请输入密码' }]"
        >
          <a-input
              type="password"
              placeholder="请输入密码"
              v-model="loginFormData.password"
          >
            <template #prefix>
              <icon-lock />
            </template>
          </a-input>
        </a-form-item>

        <!-- ✅ 登录按钮 -->
        <a-form-item>
          <a-button type="primary" @click="handleLogin" long>登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<style lang="less">
.login_view {
  background: url(@/assets/img/bg.png) 50% / cover no-repeat;
  position: relative;
  height: 100vh;

  .login_mask {
    width: 400px;
    height: 100vh;
    --color-bg: white;
    background-color: var(--login_bg);
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .arco-form {
      padding: 40px;
    }

    .title {
      font-size: 26px;
      font-weight: 600;
      text-align: center;
      color: @primary-6;
      margin-bottom: 10px;
    }
  }
}
</style>