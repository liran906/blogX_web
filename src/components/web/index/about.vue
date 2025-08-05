<script setup lang="ts">
import F_card from "@/components/web/f_card.vue";
import {userStorei} from "@/stores/user_store";
import { useI18n } from 'vue-i18n'

const store = userStorei()
const { t } = useI18n()

const version = import.meta.env.VITE_VERSION
</script>

<template>
  <f_card :title="t('about.title')" class="about_com">
    <div class="item" v-if="store.siteInfo.about.siteDate">
      <span>{{ t('about.siteDate') }}</span>
      <span>{{ store.siteInfo.about.siteDate }}</span>
    </div>
    <div class="item">
      <span>{{ t('about.siteVersion') }}</span>
      <span>{{ version }}</span>
    </div>
    <div class="item">
      <span>{{ t('about.contactAuthor') }}</span>
    </div>
    <div class="item icons">

      <div class="icon qq_icon">
        <img src="@/assets/img/QQ.svg" alt="qq">
        <div class="popup">
          <img class="qr" :src="store.siteInfo.about.qqURL" alt="">
        </div>
      </div>

      <div class="icon wechat_icon">
        <img src="@/assets/img/index/wechat.svg" alt="wechat">
        <div class="popup">
          <img class="qr" :src="store.siteInfo.about.wechatURL" alt="">
        </div>
      </div>

      <div class="icon" v-if="store.siteInfo.about.bilibili">
        <a :href="store.siteInfo.about.bilibili" target="_blank"> <img src="@/assets/img/index/bilibili.svg" alt=""></a>
      </div>
      <div class="icon" v-if="store.siteInfo.about.gitee">
        <a :href="store.siteInfo.about.gitee" target="_blank"> <img src="@/assets/img/index/gitee-copy.svg" alt=""></a>
      </div>
      <div class="icon" v-if="store.siteInfo.about.github">
        <a :href="store.siteInfo.about.github" target="_blank"><img src="@/assets/img/index/Github.svg" alt=""></a>
      </div>
    </div>
    <div class="item beian" v-if="store.siteInfo.siteInfo.enableICP">
      <a href="http://beian.miit.gov.cn"> <img src="@/assets/img/beian.png" alt="">
        <span>{{ store.siteInfo.siteInfo.icp }}</span></a>
    </div>

  </f_card>
</template>

<style lang="less">
.about_com {
  .body {
    display: flex;
    flex-direction: column;
    overflow: visible; // ✅ 显式禁用滚动条（如果有全局 scrollbar）

    .item {
      display: flex;
      align-items: center;
      width: 100%;
      flex-wrap: nowrap;
      color: var(--color-text-2);
      font-size: 15px;
      margin-bottom: 10px;

      span:nth-child(2) {
        margin-left: 5px;
      }
    }

    .icons {
      display: flex;
      justify-content: space-around;
      margin-top: 20px;

      .icon {
        cursor: pointer;
        position: relative;

        img {
          width: 30px;
          height: 30px;
        }

        .qq,
        .wechat {
          position: absolute;
          width: 100px;
          height: 100px;
          bottom: 40px;
          left: -30px;
          opacity: 0;
          padding: 10px;
        }

        .popup {
          position: absolute;
          bottom: 40px;
          left: -30px;
          opacity: 0;
          pointer-events: none; // ✅ 避免 hover 到透明层触发自己
          transition: opacity 0.2s;
        }

        &:hover .popup {
          opacity: 1;
          pointer-events: auto;
        }

        .qr {
          width: 100px;
          height: 100px;
          padding: 10px;
          background: #fff;
          border-radius: 6px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }
      }

      .qq_icon:hover .qq,
      .wechat_icon:hover .wechat {
        opacity: 1;
      }
    }

    .beian {
      justify-content: center;

      a {
        display: flex;
        align-items: center;
        color: var(--color-text-2);
      }
    }
  }
}
</style>