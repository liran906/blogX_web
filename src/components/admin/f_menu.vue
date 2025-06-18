<script setup lang="ts">

import type {Component} from "vue";
import {IconHome, IconUser, IconSettings, IconDashboard} from "@arco-design/web-vue/es/icon";
import F_component from "@/components/common/f_component.vue";

interface MenuType {
  title: string
  name: string
  icon?: string | Component
  children?: MenuType[]
  role?: number
}

const menuList: MenuType[] = [
  // {title: "数据统计", name: "home", icon: IconDashboard},
  {title: "数据统计", name: "home", icon: "iconfont icon-shuju"},
  {
    title: "用户管理", role: 1, name: "userManage", icon: "iconfont icon-yonghuguanli", children: [
      {title: "用户列表", name: "userList", icon: "iconfont icon-list",}
    ]
  },
  {
    title: "文章管理", role: 1, name: "articleManage", icon: "iconfont icon-wenzhangguanli", children: [
      {title: "文章列表", name: "articleList", icon: "iconfont icon-navicon-wzgl",}
    ]
  },
  {
    title: "系统管理", role: 1, name: "settingsManage", icon: "iconfont icon-setting", children: [
      {
        title: "站点配置", name: "siteManage", icon: "iconfont icon-zhandianpeizhi", children: [
          {title: "网站设置", name: "siteManageSite", icon: "iconfont icon-wangzhan"},
          {title: "邮箱设置", name: "siteManageEmail", icon: "iconfont icon-youxiang"},
          {title: "QQ设置", name: "siteManageQQ", icon: "iconfont icon-qq"},
          {title: "AI设置", name: "siteManageAi", icon: "iconfont icon-wuguan"},
          {title: "对象存储设置", name: "siteManageQiNiu", icon: "iconfont icon-yuntupian"},
        ]
      },
      {title: "Banner管理", name: "bannerList", icon: "iconfont icon-banner"},
      {title: "日志列表", name: "logList", icon: "iconfont icon-xitongrizhi"},
    ]
  },
]

</script>

<template>
  <div class="f_menu scrollbar">
    <a-menu
        show-collapse-button>
      <template v-for="menu in menuList">
        <a-menu-item :key="menu.name" v-if="!menu.children">
          <template #icon>
            <f_component :is="menu.icon"></f_component>
          </template>
          {{ menu.title }}
        </a-menu-item>
        <a-sub-menu :key="menu.name" v-else :title="menu.title">
          <template #icon>
            <f_component :is="menu.icon"></f_component>
          </template>
          <a-menu-item :key="sub.name" v-for="sub in menu.children">
            {{ sub.title }}
            <template #icon>
              <f_component :is="menu.icon"></f_component>
            </template>
          </a-menu-item>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<style scoped>
.f_menu {
  height: calc(100% - 90px);
  overflow-y: auto;
  overflow-x: hidden;
}
</style>