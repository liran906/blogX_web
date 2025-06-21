<script setup lang="ts">
// M
import F_list, {type filterGroupType} from "@/components/admin/f_list.vue";
import type {columnType} from "@/components/admin/f_list.vue";
import {type formListType} from "@/components/admin/f_modal_form.vue";
import {reactive, ref} from "vue";
import {
  articleDetailApi,
  type articleDetailType,
  type articleExamineRequest,
  type articleListType
} from "@/api/article_api";
import {articleListApi} from "@/api/article_api";
import {articleStatusOptions} from "@/options/options";
import {Message} from "@arco-design/web-vue";
import F_user from "@/components/common/f_user.vue";
import {articleExamineApi} from "@/api/article_api";
import {adminArticleTopApi} from "@/api/user_api";

const columns = [
  {title: "ID", dataIndex: 'id', width: 55},
  {title: "文章标题", dataIndex: 'title'},
  {title: "发布用户", slotName: 'user', width: 150},
  {title: "文章封面", slotName: 'cover'},
  {title: "数据：阅/赞/评/藏",  slotName: 'counts', width: 150},
  {title: "开启评论", dataIndex: 'openForComment', type: "switch"},
  {title: "状态", dataIndex: 'status', type: "options", options: articleStatusOptions},
  {title: "分类", slotName: 'category'},
  {title: "文章置顶", slotName: 'adminTop'},
  {title: "发布时间", dataIndex: 'createdAt', type: "date"},
  {title: "更新时间", dataIndex: 'updatedAt', type: "date", dateFormat: "current"},
  {title: "操作", slotName: 'action', width: 60},
]
const visible = ref(false)
const fListRef = ref()

const data = reactive<articleDetailType>({
  "id": 0,
  "createdAt": "",
  "updatedAt": "",
  "title": "",
  "abstract": "",
  "content": "",
  "tags": [],
  coverURL: "",
  "userID": 0,
  "readCount": 0,
  "likeCount": 0,
  "commentCount": 0,
  "collectCount": 0,
  "openForComment": false,
  "status": 0,
  "username": "",
  "userNickname": "",
  "userAvatarURL": ""
})

async function edit(record: articleListType) {
  if (record.id !== data.id){
    const res = await articleDetailApi(record.id)
    if (res.code){
      Message.error(res.msg)
      return
    }
    Object.assign(data, res.data)
  }
  visible.value = true
}

const form = reactive<articleExamineRequest>({
  articleID: 0,
  status: 3,
  msg:""
})

async function handler() {
  if (data.status != 2){
    return  true
  }
  form.articleID = data.id
  const res = await articleExamineApi(form)
  if (res.code){
    Message.error(res.msg)
    return false
  }
  Message.success(res.msg)
  fListRef.value.getList()
  return  true
}

async function adminArticleTop(record: articleListType) {
  if (record.status !== 3){
    Message.warning("只能置顶已发布的文章")
    record.pinnedByAdmin = !record.pinnedByAdmin
    return
  }
  const res = await adminArticleTopApi(record.id)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
}

</script>

<template>
  <div>
    <a-modal v-model:visible="visible" title="文章审核" :on-before-ok="handler"  modal-class="article_examine_modal" :width="1000">
      <a-form :label-col-props="{ span: 2 }" :wrapper-col-props="{ span: 22 }">
        <a-form-item label="文章标题">{{ data.title }}</a-form-item>
        <a-form-item label="文章简介">{{ data.abstract }}</a-form-item>
        <a-form-item label="发布用户">
          <f_user :nickname="data.userNickname" :avatar="data.userAvatarURL"></f_user>
        </a-form-item>
        <a-form-item label="文章分类">{{ data.categoryName }}</a-form-item>
        <a-form-item label="文章标签">
          <a-tag style="margin-right: 10px" v-for="tag in data.tags">{{ tag }}</a-tag>
        </a-form-item>
        <a-form-item label="文章正文">
          <div style="white-space: pre-line; word-break: break-word; max-height: 400px; overflow-y: auto;">
            {{ data.content }}
          </div>
        </a-form-item>
        <a-form-item label="审核"  v-if="data.status === 2" >
          <a-radio-group v-model="form.status">
            <a-radio :value="3">审核通过</a-radio>
            <a-radio :value="4">审核不通过</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="拒绝原因" v-if="form.status === 4">
          <a-textarea v-model="form.msg" placeholder="拒绝原因"></a-textarea>
        </a-form-item>
      </a-form>
    </a-modal>
    <f_list
        ref="fListRef"
        @edit="edit"
        no-add
        :url="articleListApi"
        :default-params="{type: 3}"
        :columns="columns">
      <template #cover="{record}:{record: articleListType}">
        <a-image v-if="record.coverURL" :src="record.coverURL" height="50px"></a-image>
        <span v-else>-</span>
      </template>
      <template #user="{record}:{record: articleListType}">
        <f_user :nickname="record.userNickname" :avatar="record.userAvatarURL"></f_user>
      </template>
      <template #category="{record}:{record: articleListType}">
        <span>{{ record.categoryName ? record.categoryName : '-' }}</span>
      </template>
      <template #counts="{record}:{record: articleListType}">
        <span>{{ record.readCount }} / {{record.likeCount}} / {{record.commentCount}} / {{record.collectCount}}</span>
      </template>
      <template #adminTop="{record}:{record: articleListType}">
        <a-switch v-model="record.pinnedByAdmin" @change="adminArticleTop(record)"></a-switch>
      </template>
    </f_list>
  </div>
</template>