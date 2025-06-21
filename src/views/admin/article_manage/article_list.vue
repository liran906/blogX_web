<script setup lang="ts">
// M
import F_list, {type filterGroupType} from "@/components/admin/f_list.vue";
import type {columnType} from "@/components/admin/f_list.vue";
import {type formListType} from "@/components/admin/f_modal_form.vue";
import {reactive, ref} from "vue";
import type {articleListType} from "@/api/article_api";
import {articleListApi} from "@/api/article_api";
import {articleStatusOptions} from "@/options/options";

const columns = [
  {title: "ID", dataIndex: 'id', width: 55},
  {title: "文章标题", dataIndex: 'title'},
  {title: "发布用户", slotName: 'user', width: 150},
  {title: "文章封面", slotName: 'cover'}, // todo
  {title: "浏览", dataIndex: 'readCount', width: 60}, //
  {title: "评论", dataIndex: 'commentCount', width: 60},
  {title: "点赞", dataIndex: 'likeCount', width: 60}, //
  {title: "收藏", dataIndex: 'collectCount', width: 60},
  {title: "是否开启评论", dataIndex: 'openForComment', type: "switch"},
  {title: "状态", dataIndex: 'status', type: "options", options: articleStatusOptions},
  {title: "分类", slotName: 'category'}, // todo
  {title: "发布时间", dataIndex: 'createdAt', type: "date"},
  {title: "更新时间", dataIndex: 'updateAt', type: "date", dateFormat: "current"},
  {title: "操作", slotName: 'action', width: 60},
]
const visible = ref(false)
const fListRef = ref()

function edit(record: articleListType) {
  visible.value = true
}


async function handler() {

}

</script>

<template>
  <div>
    <f_list
        ref="fListRef"
        @edit="edit"
        :url="articleListApi"
        :default-params="{type: 3}"
        :columns="columns">
      <template #cover="{record}:{record: articleListType}">
        <a-image v-if="record.coverURL" :src="record.coverURL" height="50px"></a-image>
        <span v-else>-</span>
      </template>
      <template #user="{record}:{record: articleListType}">
        <a-avatar :image-url="record.userAvatarURL" :size="30"></a-avatar>
        <span style="margin-left: 5px">{{ record.userNickname }}</span>
      </template>
      <template #category="{record}:{record: articleListType}">
        <span>{{ record.categoryName ? record.categoryName : '-' }}</span>
      </template>
    </f_list>
  </div>
</template>