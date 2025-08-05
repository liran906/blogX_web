<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const handleLanguageChange = () => {
  // 切换语言
  const newLocale = locale.value === 'zh-CN' ? 'en-US' : 'zh-CN'
  
  // 直接更新 i18n 实例和本地存储
  locale.value = newLocale
  localStorage.setItem('locale', newLocale)
  
  // 标记这是用户手动选择的语言，下次访问时优先使用
  localStorage.setItem('isManualLanguageSelection', 'true')
}
</script>

<template>
  <span @click="handleLanguageChange" class="language-switcher" :title="`当前语言: ${locale}`">
    <svg class="arco-icon arco-icon-language" 
         viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" 
         stroke-width="4" stroke-linecap="butt" stroke-linejoin="miter">
      <path d="m42 43-2.385-6M26 43l2.384-6m11.231 0-.795-2-4.18-10h-1.28l-4.181 10-.795 2m11.231 0h-11.23M17 5l1 5M5 11h26M11 11s1.889 7.826 6.611 12.174C22.333 27.522 30 31 30 31"></path>
      <path d="M25 11s-1.889 7.826-6.611 12.174C13.667 27.522 6 31 6 31"></path>
    </svg>
  </span>
</template>

<style lang="less" scoped>
.language-switcher {
  margin-right: 10px;
  cursor: pointer;
  color: var(--color-text-2);
  
  .arco-icon {
    width: 16px;
    height: 16px;
  }
}
</style>