<script setup lang="ts">
import F_nav from "@/components/web/f_nav.vue";
import F_main from "@/components/web/f_main.vue";
import {MdPreview, MdCatalog} from "md-editor-v3";
import "md-editor-v3/lib/preview.css"
import {articleDetailApi, type articleDetailType, articleDiggApi, articleLookApi} from "@/api/article_api";
import {Message} from "@arco-design/web-vue";
import {type articleCollectRequest, articleCollectApi} from "@/api/article_api";
import {onUnmounted} from "vue";
import {IconEdit} from "@arco-design/web-vue/es/icon";
import {onMounted} from "vue";
import F_avatar from "@/components/web/f_avatar.vue";

const scrollElement = document.documentElement;
import {useRoute} from "vue-router";
import {reactive, ref, watch} from "vue";
import {dateTimeFormat} from "@/utils/date";
import {theme} from "@/components/common/f_theme";
import F_article_collect_modal from "@/components/web/article/f_article_collect_modal.vue";
import Article_comment from "@/components/web/comment/article_comment.vue";
import {goArticleEdit, goUser} from "@/utils/go_router";
import {userStorei} from "@/stores/user_store";
import {showLogin} from "@/components/web/f_login";

const store = userStorei()
const route = useRoute()
const data = reactive<articleDetailType>({
  id: 0,
  createdAt: "",
  updatedAt: "",
  title: "",
  abstract: "",
  content: "",
  categoryID: 0,
  categoryName: "",
  tags: [],
  coverURL: "",
  userID: 0,
  readCount: 0,
  likeCount: 0,
  commentCount: 0,
  collectCount: 0,
  openForComment: false,
  status: 0,
  username: "",
  userNickname: "",
  userAvatarURL: "",
  "isLiked": false,
  "isCollected": false
})

async function getData() {
  const res = await articleDetailApi(Number(route.params.id))
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Object.assign(data, res.data)

  setTimeout(look, 2000)
}

async function look() {
  const res = await articleLookApi(data.id)
  if (res.code) {
    Message.error(res.msg)
    return
  }
}

watch(() => route.params.id, () => {
  getData()
}, {immediate: true})

onMounted(() => {
  const id = route.query.id
  setTimeout(() => {
    if (id) {
      const div = document.getElementById(id) as HTMLDivElement
      if (div) {
        document.documentElement.scrollTo({top: div.offsetTop, behavior: "smooth"})
      }

    }
  }, 500)
})

const isFixed = ref(false)

function scroll() {
  const top = document.documentElement.scrollTop
  if (top >= 210) {
    isFixed.value = true
  } else {
    isFixed.value = false
  }
}

window.addEventListener("scroll", scroll)

onUnmounted(() => {
  window.removeEventListener("scroll", scroll)
})

async function digg() {
  if (!store.isLogin) {
    showLogin({reload: true})
    return
  }
  const res = await articleDiggApi(data.id)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  data.isLiked = !data.isLiked
  if (data.isLiked) {
    data.likeCount++
  } else {
    data.likeCount--
  }
}

const visible = ref(false)

async function collect() {
  if (!store.isLogin) {
    showLogin({reload: true})
    return
  }
  visible.value = true
}

async function collectArticle(id: number) {
  const res = await articleCollectApi({articleID: data.id, collectionID: id})
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  if (res.msg === "收藏成功") {
    data.isCollected = true
    data.collectCount++
  } else {
    data.collectCount--
  }
  return
}

function goTop() {
  document.documentElement.scrollTo({top: 0, behavior: "smooth"})
}

const articleCommentRef = ref()

function goComment() {
  const div = document.querySelector(".add_comment") as HTMLDivElement
  const top = div.offsetTop
  document.documentElement.scrollTo({top: top, behavior: "smooth"})

  setTimeout(() => {
    articleCommentRef.value.focus()
  }, 800)
}


</script>

<template>
  <div class="article_detail_view">
    <f_nav no-scroll></f_nav>
    <f_main>
      <f_article_collect_modal :article-id="data.id" @select="collectArticle"
                               v-model:visible="visible"></f_article_collect_modal>
      <div class="article_container">
        <div class="article_content">
          <div class="head">
            <div class="title">
              <span>{{ data.title }}</span>
              <IconEdit style="margin-left: 10px; cursor: pointer" title="去编辑" @click="goArticleEdit(data.id)"
                        v-if="data.userID === store.userInfo.userID"></IconEdit>
            </div>
            <div class="date">{{ dateTimeFormat(data.createdAt) }}</div>
            <div class="tags">
              <a-tag v-for="item in data.tags">{{ item }}</a-tag>
            </div>
          </div>
          <div class="body">
            <MdPreview :id="`md_${data.id}`" :theme="theme" :model-value="data.content"></MdPreview>
          </div>
        </div>

        <article_comment v-if="data.openForComment" ref="articleCommentRef"
                         :article-id="Number(route.params.id)"></article_comment>

      </div>
      <div class="article_info">
        <div class="user_info">
          <div class="user">
            <f_avatar :size="60" :avatar-url="data.userAvatarURL" :nickname="data.userNickname" @click="goUser(data.userID)"/>
          </div>
          <div class="nick" @click="goUser(data.userID)">{{ data.userNickname }}</div>
          <div class="data">
            <div class="item">
              <span>{{ data.readCount }}</span>
              <span><i class="iconfont icon-liulan"></i></span>
            </div>
            <div class="item">
              <span>{{ data.likeCount }}</span>
              <span><i class="iconfont icon-dianzan_kuai"></i></span>
            </div>
            <div class="item">
              <span>{{ data.collectCount }}</span>
              <span><i class="iconfont icon-shoucang1"></i></span>
            </div>
            <div class="item">
              <span>{{ data.commentCount }}</span>
              <span><i class="iconfont icon-pinglun1"></i></span>
            </div>
          </div>
        </div>
        <div class="catalog_action" :class="{isFixed: isFixed}">
          <div class="catalog">
            <div class="head">文章目录</div>
            <div class="body scrollbar">
              <MdCatalog :offsetTop="61" :scrollElementOffsetTop="60" :editorId="`md_${data.id}`"
                         :scrollElement="scrollElement"
                         :theme="theme"></MdCatalog>
            </div>
          </div>
          <div class="article_action">
            <i title="点赞" @click="digg" class="iconfont icon-dianzan_kuai" :class="{active: data.isLiked}"></i>
            <i title="收藏" @click="collect" class="iconfont icon-shoucang1" :class="{active: data.isCollected}"></i>
            <i title="回到顶部" @click="goTop" class="iconfont icon-zhiding"></i>
            <i title="去评论" @click="goComment" class="iconfont icon-pinglun1"></i>
          </div>
        </div>

      </div>
    </f_main>
  </div>
</template>

<style lang="less">
.article_detail_view {

  .f_container {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .article_container {
    width: calc(100% - 280px);

    .article_content {
      background: var(--color-bg-1);
      border-radius: 5px;

      .head {
        padding: 20px 20px 10px 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-bottom: @f_border;

        .title {
          font-size: 20px;
          font-weight: 600;
          color: var(--color-text-1);
        }

        .date {
          color: var(--color-text-2);
          font-size: 12px;
          margin: 10px 0;
        }

        .tags {
          span {
            margin-right: 10px;

            &:last-child {
              margin-right: 0;
            }
          }
        }
      }

      .body {
        padding: 10px 20px 20px 20px;

        .md-editor-preview-wrapper {
          padding: 0;
          background-color: var(--color-bg-1);

          .md-editor-code-head {
            z-index: 999;
          }
        }
      }
    }

    .article_comment {
      margin-top: 20px;
      border-radius: 5px;
      background: var(--color-bg-1);

      .add_comment {
        padding: 20px;
        position: relative;

        .arco-btn {
          position: absolute;
          right: 30px;
          bottom: 30px;
          z-index: 2;
        }
      }
    }
  }

  .article_info {
    width: 260px;


    .user_info {
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: var(--color-bg-1);
      border-radius: 5px;

      .arco-avatar-circle {
        cursor: pointer;
      }

      .nick {
        margin: 10px 0 20px 0;
        color: var(--color-text-1);
        cursor: pointer;
      }

      .data {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        width: 100%;

        .item {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;

          span:nth-child(1) {
            font-size: 16px;
            color: var(--color-text-1);
            margin-bottom: 3px;
          }

          i {
            font-size: 18px;
            color: var(--color-text-2);
          }

          .icon-liulan {
            font-size: 20px;
          }

          .icon-pinglun1 {
            font-size: 20px;
            margin-top: 3px;
          }
        }
      }
    }

    .catalog_action {
      .md-editor-catalog {
        position: relative;
      }

      &.isFixed {
        position: fixed;
        top: 60px;
        width: 260px;
      }
    }

    .catalog {
      background: var(--color-bg-1);
      border-radius: 5px;
      margin-top: 20px;

      .head {
        padding: 20px 20px 10px 20px;
        border-bottom: @f_border;
        font-weight: 600;
        color: var(--color-text-1);
      }

      .body {
        padding: 10px 20px 20px 20px;
        max-height: calc(100vh - 240px);
        overflow-y: auto;

        .md-editor-catalog-active > span {
          color: rgb(var(--arcoblue-6));
        }

        .md-editor-catalog-link span:hover {
          color: rgb(var(--arcoblue-5));
        }

        .md-editor-catalog-indicator {
          background-color: rgb(var(--arcoblue-6));
        }
      }
    }


    .article_action {
      background: var(--color-bg-1);
      border-radius: 5px;
      margin-top: 20px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      justify-items: center;
      align-items: center;
      padding: 10px 0;

      i {
        padding: 10px;
        cursor: pointer;
        border-radius: 5px;
        color: var(--color-text-2);

        &:hover {
          background: var(--color-fill-1);
        }

        &.active {
          color: rgb(var(--arcoblue-6));
        }
      }
    }
  }
}
</style>