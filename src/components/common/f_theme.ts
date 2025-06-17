import {ref} from "vue";

// export 主题变量和函数，任何组件都能读取以及调用
// 一般在 ts 文件里 export （而不在 vue 文件）。
export const theme = ref('')

// 设置主题色
export function setTheme(val: string) {
    if (val === 'dark') {
        document.body.setAttribute('arco-theme', 'dark')
    } else {
        document.body.removeAttribute('arco-theme');
    }
    theme.value = val;
    localStorage.setItem('theme', theme.value);
}

// 持久化保存主题色(刷新之后还是原来的主题)
export function loadTheme() {
    const val = localStorage.getItem('theme')
    if (val && val === 'dark') {
        setTheme(val)
    }
}