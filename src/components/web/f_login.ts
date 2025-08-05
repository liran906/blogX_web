import F_login_modal from "@/components/web/f_login_modal.vue";
import {createApp, defineComponent, h, ref} from "vue";
import i18n from '@/locales'

const visible = ref<boolean | undefined>(undefined)

interface options {
    to?: string // 将要去哪里
    reload?: boolean // 是否刷新页面
}

export function showLogin(options?: options) {
    if (visible.value === undefined) {
        // 生成虚拟dom
        const component = defineComponent({
            render: () => h(F_login_modal, {
                visible: visible.value,
                to: options?.to,
                reload: options?.reload,
                "onUpdate:visible": () => {
                    visible.value = false
                },
                onDestruction() {
                    // 销毁组件
                    app.unmount()
                    document.getElementById("login_100")?.remove()
                    visible.value = undefined
                }
            })
        })
        // 生成app
        const app = createApp(component)
        
        // 安装i18n插件
        app.use(i18n)

        // 挂载到真实dom上
        const div = document.createElement("div")
        div.id = "login_100"
        app.mount(div)

        document.body.append(div)


    }

    visible.value = true
}