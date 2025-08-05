<script setup lang="ts">
import F_card from "@/components/common/f_card.vue";
import {type Component, ref} from "vue";
import {IconUser} from "@arco-design/web-vue/es/icon";
import F_component from "@/components/common/f_component.vue";
import router from "@/router";
import {useI18n} from "vue-i18n";

interface quickType {
  label: string
  icon: string | Component
  name: string
}

const {t} = useI18n()

const list: quickType[] = [
  {label: t('admin.userList'), icon: "iconfont icon-list", name: "userList"},
  {label: t('admin.articleList'), icon: "iconfont icon-navicon-wzgl", name: "articleList"},
  {label: t('admin.siteSettings'), icon: "iconfont icon-wangzhan", name: "siteManageSite"},
  {label: t('admin.aiSettings'), icon: "iconfont icon-wuguan", name: "siteManageAi"},
  {label: t('admin.bannerSettings'), icon: "iconfont icon-banner", name: "bannerList"},
  {label: t('admin.logList'), icon: "iconfont icon-xitongrizhi", name: "logList"},
]

function goRouter(item: quickType) {
  router.push({name: item.name})
}

</script>

<template>
  <f_card :title="t('admin.quickEntrance')" class="f_quick_entrance">
    <div class="item" v-for="item in list">
      <div class="icon" @click="goRouter(item)">
        <f_component :is="item.icon"></f_component>
      </div>
      <div class="label">{{ item.label }}</div>
    </div>
  </f_card>
</template>

<style lang="less">
.f_quick_entrance {
  .body {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-row-gap: 20px;

    .item {
      display: flex;
      flex-direction: column;
      align-items: center;

      &:last-child {
        margin-right: 0;
      }

      .icon {
        width: 60px;
        height: 60px;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 22px;
        background-color: var(--color-fill-2);
        cursor: pointer;
        transition: all .3s;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.08);
        }
      }

      .label {
        margin-top: 5px;
        color: var(--color-text-2);
      }
    }
  }
}
</style>