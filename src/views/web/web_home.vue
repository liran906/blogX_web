<script setup lang="ts">

import F_nav from "@/components/web/f_nav.vue";
import F_footer from "@/components/web/f_footer.vue";
import F_main from "@/components/web/f_main.vue";
import Banner_list from "@/components/web/index/banner_list.vue";
import Article_search_list from "@/components/web/index/article_search_list.vue";
import Tag_list from "@/components/web/index/tag_list.vue";
import Auth_recommend from "@/components/web/index/auth_recommend.vue";
import Article_recommend from "@/components/web/index/article_recommend.vue";
import About from "@/components/web/index/about.vue";
import Extension from "@/components/web/index/extension.vue";
import Feedback from "@/components/web/index/feedback.vue";

import {userStorei} from "@/stores/user_store";

const store = userStorei()

const map = {
  "标签云": Tag_list,
  "作者推荐": Auth_recommend,
  "文章推荐": Article_recommend,
  "关于本站": About,
  "独家推广": Extension,
  "用户反馈": Feedback,
}
</script>

<template>
  <div class="web_home_view">
    <f_nav no-scroll></f_nav>
    <f_main>
      <div class="banner">
        <banner_list></banner_list>
      </div>
      <div class="body">
        <div class="left">
          <article_search_list></article_search_list>
        </div>
        <div class="right">
          <template v-for="item in store.siteInfo.indexRight.list">
            <component v-if="item.enable" :is="map[item.title]"></component>
          </template>
        </div>
      </div>

    </f_main>
  </div>
</template>

<style  lang="less">
.web_home_view{
  .f_container{
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    margin-left: 12.5px;

    .f_banner_com{
      margin-top: 20px;
    }

    .body{
      display: flex;
      justify-content: space-between;
      //height: calc(100% - 320px);

      > .left{
        width: calc(100% - 280px);

        .article_search_list_com {
          margin-top: 20px;
        }
      }
      > .right{
        width: 260px;
        padding: 20px 0;
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
    }
  }
}
</style>