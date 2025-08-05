<script setup lang="ts">
import { reactive, ref } from "vue";
import F_nav_msg from "@/components/web/f_nav_msg.vue";
import F_nav_avatar from "@/components/web/f_nav_avatar.vue";
import F_text_search_modal from "@/components/web/f_text_search_modal.vue";
import { userStorei } from "@/stores/user_store";
import F_ai_modal from "@/components/web/f_ai_modal.vue";
import F_theme from "@/components/common/f_theme.vue";
import F_language_switcher from "@/components/common/f_language_switcher.vue";
import { useI18n } from 'vue-i18n'

const store = userStorei()
const { t } = useI18n()

interface Props {
  noScroll?: boolean
  scrollTop?: number
}

const props = defineProps<Props>()
const { noScroll = false, scrollTop = 200 } = props

const isShow = ref(noScroll)

if (!noScroll) {
  window.onscroll = () => {
    isShow.value = document.documentElement.scrollTop >= scrollTop;
  };
}

const visible = ref(false)
const key = ref("")
const textSearchRef = ref()

function search() {
  visible.value = true
  if (key.value) {
    textSearchRef.value.setSearch(key.value)
  }
}

const aiVisible = ref(false)
</script>

<template>
  <div class="f_nav" :class="{ isShow }">
    <div class="nav-inner">
      <div class="nav-left">
        <a href="/" class="brand">
          <span class="n1">GenerationBlog</span>
        </a>
        <span class="n2">
          {{ store.siteInfo.siteInfo.mode === 1 ? t('nav.communityMode') : t('nav.blogMode') }}
        </span>
        <f_language_switcher class="language-switch" />
        <f_theme class="theme-switch" />

      </div>

      <div class="nav-center">
        <i v-if="store.siteInfo.ai.enable" @click="aiVisible = true" class="iconfont icon-dengpao"></i>
        <a-input-search
            v-model="key"
            @search="search"
            @keydown.enter="search"
            :placeholder="t('nav.search')"
        />
      </div>

      <div class="nav-right">
        <f_nav_avatar />
        <f_nav_msg />
        <router-link class="history" :to="{ name: 'userCenterHistory' }">{{ t('nav.history') }}</router-link>
        <router-link :to="{ name: 'platformArticleAdd' }">
          <a-button type="primary" class="post-btn">
            <i class="iconfont icon-jia"></i>
            <span>{{ t('nav.publish') }}</span>
          </a-button>
        </router-link>
      </div>
    </div>

    <f_ai_modal v-if="store.siteInfo.ai.enable" v-model:visible="aiVisible" />
    <f_text_search_modal ref="textSearchRef" v-model:visible="visible" />
  </div>
</template>

<style lang="less">
.f_nav {
  width: 100vw;
  height: 60px;
  position: fixed;
  top: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  transition: all 0.3s;
  color: white;

  &.isShow {
    background-color: var(--color-bg-1);
    color: var(--color-text-2);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.06);

    .n1 {
      color: var(--color-text-1);
    }

    .n2,
    a,
    .theme-switch,
    .language-switch {
      color: var(--color-text-2) !important;
    }
  }

  .nav-inner {
    width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .nav-left {
    display: flex;
    align-items: center;

    .brand {
      .n1 {
        font-size: 16px;
        color: var(--color-text-1);
      }
    }

    .n2 {
      margin: 0 10px;
      font-size: 14px;
      color: var(--color-text-2);
    }

    .theme-switch,
    .language-switch {
      cursor: pointer;
      color: var(--color-text-2);
    }
  }

  .nav-center {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;

    i {
      margin-right: 10px;
      font-size: 20px;
      color: rgb(var(--arcoblue-6));
      cursor: pointer;
    }

    .arco-input-wrapper {
      width: 400px;
      border-radius: 20px;
    }
  }

  .nav-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 20px;

    .arco-avatar,
    .f_nav_msg_com {
      margin-right: 0;
    }

    .post-btn {
      border-radius: 200px;
      font-size: 12px;
      display: flex;
      align-items: center;

      i {
        font-size: 14px;
        margin-right: 3px;
        margin-top: 1px;
      }
    }
  }
}
</style>
