<script setup lang="ts">
import F_card from "@/components/web/f_card.vue";
import {reactive} from "vue";
import {useI18n} from 'vue-i18n';
import type{listResponse} from "@/api";
import {
  articleRecommendListApi,
  type articleRecommendListType,
} from "@/api/article_api";
import type {articleSearchType} from "@/api/search_api";

const {t} = useI18n();

const data = reactive<listResponse<articleSearchType>>({
  list: [],
  count: 0
})

async function getData() {
  const res = await articleRecommendListApi()
  data.list = res.data.list
}

getData()

</script>

<template>
  <f_card :title="t('home.articleRecommend')" class="article_recommend_com">
    <div class="item" v-for="item in data.list">
      <router-link :to="{name: 'articleDetail', params: {id: item.id}}">
        <a-typography-text :ellipsis="{rows: 1}">{{ item.title }}</a-typography-text>
      </router-link>
    </div>
  </f_card>
</template>

<style lang="less">
.article_recommend_com {
  .body {
    display: flex;
    flex-direction: column;

    .item {
      padding: 5px 0;

      a {
        display: block;
        color: var(--color-text-2);
        font-size: 14px;
        transition: color 0.2s;

        &:hover {
          color: var(--color-primary);
        }
      }
    }
  }
}
</style>