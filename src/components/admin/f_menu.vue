<script setup lang="ts">
import type {Component} from "vue";
import {IconHome, IconUser, IconSettings} from "@arco-design/web-vue/es/icon";
import F_component from "@/components/common/f_component.vue";
import {ref} from "vue";
import {collapsed} from "@/components/admin/f_menu";
import router from "@/router";
import {useRoute} from "vue-router";
import {watch} from "vue";
import F_menu_item from "@/components/admin/f_menu_item.vue";

const route = useRoute()

interface MenuType {
  title: string
  name: string
  icon?: string | Component
  children?: MenuType[]
  role?: number
}


const menuList: MenuType[] = [
  {title: "首页", name: "home", icon: IconHome},
  {
    title: "个人中心", name: "userCenter", icon: IconUser, children: [
      {title: "个人信息", name: "userInfo", icon: "iconfont icon-yonghuxinxi-"}
    ]
  },
  {
    title: "用户管理", role: 1, name: "userManage", icon: "iconfont icon-yonghuguanli", children: [
      {title: "用户列表", name: "userList", icon: "iconfont icon-yonghuguanli_huaban",}
    ]
  },
  {
    title: "系统管理", role: 1, name: "settingsManage", icon: "iconfont icon-xitongpeizhi", children: [
      {
        title: "站点配置", name: "siteManage", icon: IconSettings, children: [
          {title: "网站设置", name: "siteManageSite", icon: IconSettings},
          {title: "邮箱设置", name: "siteManageEmail", icon: IconSettings},
          {title: "QQ设置", name: "siteManageQQ", icon: IconSettings},
          {title: "AI设置", name: "siteManageAi", icon: IconSettings},
        ]
      },
      {title: "日志列表", name: "logList", icon: IconSettings},
    ]
  },
]

function menuItemClick(key: string) {
  router.push({
    name: key
  })
}

const openKeys = ref<string[]>([])
const selectedKeys = ref<string[]>([])

function initRoute() {
  if (route.matched.length === 3) {
    openKeys.value = [route.matched[1].name as string]
  }

  selectedKeys.value = [route.name as string]
}

watch(() => route.name, () => {
  initRoute()
}, {immediate: true})


</script>

<template>
  <div class="f_menu" :class="{collapsed: collapsed}">
    <div class="f_menu_inner scrollbar">
      <a-menu
          @menu-item-click="menuItemClick"
          v-model:collapsed="collapsed"
          v-model:open-keys="openKeys"
          v-model:selected-keys="selectedKeys"
          show-collapse-button>
        <f_menu_item :list="menuList"></f_menu_item>
      </a-menu>
    </div>

  </div>
</template>

<style lang="less">
.f_menu {
  height: calc(100vh - 90px);
  position: relative;

  &.collapsed {
    .arco-menu-collapse-button {
      left: 48px !important;
    }
  }

  &:hover {
    .arco-menu-collapse-button {
      opacity: 1 !important;
    }
  }

  .f_menu_inner {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;

    .arco-menu {
      position: inherit;

      .arco-menu-collapse-button {
        top: 50%;
        transform: translate(-50%, -50%);
        left: 240px;
        transition: all .3s;
        opacity: 0;
      }
    }
  }
}
</style>