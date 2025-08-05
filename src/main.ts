import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/base.css'
import App from './App.vue'
import router from './router'
import "nprogress/nprogress.css";

import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import '@/assets/public.less'
import "@/assets/iconfont.css"
import "@/assets/iconfont_1.css"
import "@/assets/theme.css"
import {apiMock} from "@/mock";
import i18n from '@/locales'

const app = createApp(App)

// apiMock()
app.use(createPinia())
app.use(router)
app.use(ArcoVue)
app.use(ArcoVueIcon)
app.use(i18n)

app.mount('#app')