<script setup lang="ts">
import {reactive} from "vue";
import type {listResponse} from "@/api";
import {articleSearchApi, type articleSearchRequest, type articleSearchType} from "@/api/search_api";
import {Message} from "@arco-design/web-vue";
import {dateCurrentFormat} from "../../../utils/date";
import {goArticle, goUser} from "@/utils/go_router";
import F_avatar from "@/components/web/f_avatar.vue";
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const data = reactive<listResponse<articleSearchType>>({
  list: [],
  count: 0
})

const params = reactive<articleSearchRequest>({
  page: 1,
  limit: 10,
  type: 0,
})

async function getData() {
  const res = await articleSearchApi(params)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  data.list = res.data.list
  data.count = res.data.count
}

async function setType(t: number) {
  params.type = t
  getData()
}

getData()

console.log(data)

</script>

<template>
  <div class="article_search_list_com">
    <div class="head">
      <div class="left">
        <span :class="{active: params.type === 0}" @click="setType(0)">{{ t('home.guessYouLike') }}</span>
        <span :class="{active: params.type === 1}" @click="setType(1)">{{ t('home.latestPublished') }}</span>
        <span :class="{active: params.type === 2 }" @click="setType(2)">{{ t('home.mostReplies') }}</span>
        <span :class="{active: params.type === 3}" @click="setType(3)">{{ t('home.mostLikes') }}</span>
        <span :class="{active: params.type === 4}" @click="setType(4)">{{ t('home.mostCollects') }}</span>
      </div>
      <a-input-search @search="getData" @keydown.enter="getData" v-model="params.key"
                      :placeholder="t('home.searchInterestingArticles')"></a-input-search>
    </div>
    <div class="list">
      <div class="item" v-for="item in data.list">
        <div class="admin_top" v-if="item.pinnedByAdmin">
          <i class="iconfont icon-zhiding"></i>
          {{ t('home.adminPinned') }}
        </div>
        <div class="top_info">
          <f_avatar @click="goUser(item.userID)" :size="30" :avatar-url="item.userAvatarURL" :nickname="item.userNickname"/>
          <span @click="goUser(item.userID)" class="nick" style="color: var(--color-text-1)">{{ item.userNickname }}</span>
          <span class="date">{{ t('home.lastUpdated', {date: dateCurrentFormat(item.updatedAt)}) }}</span>
        </div>
        <div class="article_info">
          <div class="cover" v-if="item.coverURL">
            <img @click="goArticle(item.id)" :src="item.coverURL" alt="">
          </div>
          <div class="info">
            <div class="title" v-html="item.title" @click="goArticle(item.id)"></div>
            <div class="abs">
              <a-typography-text :ellipsis="{rows: 2, css: true}">
                <div v-html="item.abstract"></div>
              </a-typography-text>
            </div>
            <div class="data">
              <div class="catalog" v-if="item.categoryName">
                {{ item.categoryName }}
              </div>
              <div class="data_list">
                  <span>
                <i class="iconfont icon-liulan"></i>
                {{ item.readCount }}
              </span>
                <span>
                <i class="iconfont icon-dianzan_kuai"></i>
                {{ item.likeCount }}
              </span>
                <span>
                <i class="iconfont icon-shoucang1"></i>
                {{ item.collectCount }}
              </span>
                <span>
                <i class="iconfont icon-pinglun1"></i>
                {{ item.commentCount }}
              </span>
              </div>

              <div class="tags">
                <a-overflow-list>
                  <a-tag v-for="tag in item.tags">{{ tag }}</a-tag>
                </a-overflow-list>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="page" v-if="data.list && data.list.length">
      <a-pagination show-total :total="data.count" :page-size="params.limit" v-model:current="params.page"
                    @change="getData"></a-pagination>
    </div>
    <div class="empty" v-else>
      <a-empty :description="t('common.noData')"/>
    </div>
  </div>
</template>

<style lang="less">
.article_search_list_com {
  background-color: var(--color-bg-1);
  border-radius: 5px;

  .head {
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: @f_border;

    .arco-input-wrapper {
      width: 200px;
      border-radius: 100px;
    }

    .left {
      span {
        cursor: pointer;
        margin-right: 20px;
        color: var(--color-text-1);

        &.active {
          color: rgb(var(--arcoblue-6));
        }

      }
    }


  }

  .list {
    padding: 0 20px 10px 20px;

    .item {
      padding: 10px 0;
      border-bottom: @f_border;
      position: relative;

      .admin_top {
        position: absolute;
        right: 0;
        top: 10px;
        color: rgb(var(--arcoblue-6));
        font-size: 12px;
        display: flex;
        align-items: center;
        i{
          margin-right: 5px;
        }
      }

      em {
        color: red;
      }

      .top_info {
        display: flex;
        align-items: center;

        .nick {
          margin-left: 10px;
          cursor: pointer;
        }

        .date {
          margin-left: 20px;
          font-size: 12px;
          color: var(--color-text-2);
        }
      }

      .article_info {
        display: flex;
        margin-top: 5px;

        .cover {
          height: 100px;
          width: 177px;
          flex-shrink: 0;
          margin-right: 10px;
          border-radius: 5px;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            cursor: pointer;
          }
        }

        .info {
          .title {
            font-size: 17px;
            font-weight: 600;
            color: var(--color-text-1);
            cursor: pointer;
          }

          .abs {
            margin: 5px 0;
          }

          .data {
            display: flex;
            align-items: center;
            .catalog{
              margin-right: 10px;
              color: var(--color-text-2);
            }

            .data_list {
              display: flex;
              align-items: center;
              color: var(--color-text-2);

              span {
                margin-right: 10px;

                i {
                  margin-right: 5px;
                }
              }
            }

            .tags {
              span {
                margin-right: 10px;
              }
            }
          }
        }
      }
    }
  }

  .page {
    display: flex;
    justify-content: center;
    padding: 10px 0 20px 0;
  }
}
</style>