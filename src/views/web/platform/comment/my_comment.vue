<script setup lang="ts">
import {type commentListType} from "@/api/comment_api";
import {dateTimeFormat} from "@/utils/date";
import F_a from "@/components/common/f_a.vue";
import F_label from "@/components/common/f_label.vue";
import {relationOptions} from "@/options/options";
import Comment_list from "@/components/web/comment/comment_list.vue";

</script>

<template>
  <div class="my_comment_view">
    <comment_list :type="2" v-slot="{item}:{item: commentListType}">
      <div class="info">
        <div class="article">
          评论了文章：
          <router-link to="">{{ item.articleTitle }}</router-link>
        </div>
        <div class="content">
          <a-typography-text :ellipsis="{rows: 2, css: true}">
            {{ item.content }}
          </a-typography-text>
        </div>
        <div class="data">
          <span class="date">{{ dateTimeFormat(item.createdAt) }}</span>
          <span class="digg">
              <i title="点赞" class="iconfont icon-dianzanliang"></i>
              <span>{{ item.likeCount }}</span>
            </span>
        </div>
      </div>
    </comment_list>
  </div>
</template>

<style lang="less">
.my_comment_view {
  .item {
    display: flex;
    margin-top: 10px;
    border-bottom: @f_border;
    padding-bottom: 10px;

    .check {
      width: 25px;
      margin-top: 13px;
    }
    .info{
      margin-left: 10px;

      .article{
        color: var(--color-text-2);
      }
      .content {
        height: 3rem;
        margin: 5px 0;
        padding-right: 10px;
      }
      .data {
        color: var(--color-text-2);
        display: flex;
        align-items: center;
        font-size: 12px;

        .date {

        }

        .digg {
          margin: 0 10px;

          i {
            cursor: pointer;
            font-size: 12px;
            margin-right: 5px;
          }
        }

        a {
          color: var(--color-text-2);
        }
      }
    }
  }
}
</style>