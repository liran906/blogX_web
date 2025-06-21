// 引入 Node.js 原生模块，用于将文件路径 URL 转为本地路径
import { fileURLToPath, URL } from 'node:url'

// 引入 Vite 的核心配置函数 defineConfig，用于提供类型提示
import { defineConfig } from 'vite'

// 引入 Vue 插件，使 Vite 能识别和处理 .vue 文件
import vue from '@vitejs/plugin-vue'

// 用于加载环境变量，例如 .env.development、.env.production
import { loadEnv } from "vite"

// 引入类型，约束加载的环境变量结构（可选）
import type { EnvMeta } from "./env"

// 指定 .env 文件的目录
const envDir = "./"

// 默认导出 Vite 配置对象，支持传入当前构建模式（如 development / production）
export default defineConfig((config) => {
  // 加载对应 mode（开发/生产）的环境变量，并断言其类型
  const env = loadEnv(config.mode, envDir) as EnvMeta

  // 打印加载的环境变量值，可用于调试
  console.log(env.VITE_SERVER_URL)

  return {
    // 插件配置：加载 Vue 插件，使 .vue 文件可用
    plugins: [vue()],

    // CSS 相关配置
    css: {
      preprocessorOptions: {
        less: {
          // 预定义 Less 变量，可用于主题定制
          modifyVars: {
            // 'primary-6': "red", // 示例：修改主色
          },
          // 每个 Less 文件自动注入此文件（常用于全局变量/混入）
          additionalData: '@import "@/assets/var.less";',
          // 允许在 less 中写 JS 表达式
          javascriptEnabled: true,
        }
      }
    },

    // 模块路径别名配置
    resolve: {
      alias: {
        // 使用 @ 代替 /src 目录
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },

    // 本地开发服务器配置（前端服务器）
    server: {
      host: "0.0.0.0", // 允许外部访问（如局域网 IP 访问）
      port: 8008,     // 本地启动端口

      // 配置接口代理（解决前端跨域）
      proxy: {
        "/api": {
          target: env.VITE_SERVER_URL, // 把以 /api 开头的请求代理到该地址
          // 可选配置：rewrite: path => path.replace(/^\/api/, '')
        },
        "/uploads": {
          target: env.VITE_SERVER_URL
        }
      }
    },

    // 指定环境变量目录
    envDir: envDir,
    define: {
      // enable hydration mismatch details in production build
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true'
    }
  }
})