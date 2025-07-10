<script setup lang="ts">
import {ref} from 'vue';
import {MdEditor} from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import F_card from "@/components/web/f_card.vue";
import {reactive} from "vue";
import {articleAddApi, type articleAddType, articleDetailApi, articleTagOptionsApi} from "@/api/article_api";
import {Message} from "@arco-design/web-vue";
import router from "@/router";
import F_cover_cutter from "@/components/web/f_cover_cutter.vue";
import {IconImage} from "@arco-design/web-vue/es/icon";
import {getOptions, type optionsType} from "@/api";
import {articleCategoryOptionsApi} from "@/api/article_api";
import {userStorei} from "@/stores/user_store";
import {aiAnalysisApi, type aiAnalysisType} from "@/api/ai_api";
import {onUploadImg} from "@/api/image_api";
import {IconDelete} from "@arco-design/web-vue/es/icon";

const store = userStorei()
const form = reactive<articleAddType>({
  title: "",
  content: "",
  abstract: "",
  status: 1, // 2是发布，1是草稿
  // categoryID: null,
  coverURL: "",
  tags: [],
  openForComment: true
})
interface Props {
  articleId?: number
}
const props = defineProps<Props>()

async function getData(){
  const res = await articleDetailApi(props.articleId as number)
  if (res.code){
    Message.error(res.msg)
    return
  }
  form.title = res.data.title
  form.content = res.data.content
  form.abstract = res.data.abstract
  form.categoryID = res.data.categoryID
  // form.status = res.data.status as 1 | 2
  form.coverURL = res.data.coverURL
  form.tags = res.data.tags
  form.openForComment = res.data.openForComment
}

if (props.articleId){
  getData()
}



const emits = defineEmits(["ok"])

const categoryOptions = ref<optionsType[]>([])
const tagOptions = ref<optionsType[]>([])

getOptions(categoryOptions, articleCategoryOptionsApi)
getOptions(tagOptions, articleTagOptionsApi)


const formRef = ref()

async function create(status: 1 | 2) {
  form.status = status
  const val = await formRef.value.validate()
  if (val) return

  emits("ok", form)
}

function coverBack(data: string) {
  form.coverURL = data
}

const aiData = reactive<aiAnalysisType>({
  title: "",
  abstract: "",
  category: "",
  tags: []
})

async function paste(e: ClipboardEvent) {
  if (!store.siteInfo.ai.enable) {
    return
  }
  // const text = e.clipboardData?.getData('text');
  // 获取图片
  // 读取到图片对象
  const file = e.clipboardData?.files[0];
  if (file) {
    // 粘贴的是图片
    return
  }
  if (form.title != "" && form.abstract != "" && form.tags.length > 0) {
    return
  }
  const res = await aiAnalysisApi(form.content)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  Object.assign(aiData, res.data)
  if (form.title == "") {
    form.title = aiData.title
  }
  if (form.abstract == "") {
    form.abstract = aiData.abstract
  }
  if (form.tags.length == 0) {
    form.tags = aiData.tags
  }

}

async function aiGen() {
  if (!store.siteInfo.ai.enable) {
    return
  }
  if (form.title != "" && form.abstract != "" && form.tags.length > 0) {
    Message.error("请将需要 AI 辅助生成的项目留空")
    return
  }
  if (form.content.length > 20000 || form.content.length < 100) {
    Message.error("文章内容不符合要求（长度 100-20000）")
    return
  }
  const res = await aiAnalysisApi(form.content)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  Object.assign(aiData, res.data)
  if (form.title == "") {
    form.title = aiData.title
  }
  if (form.abstract == "") {
    form.abstract = aiData.abstract
  }
  if (form.tags.length == 0) {
    form.tags = aiData.tags
  }

}

function coverRemove(){
  form.coverURL = ""
}

</script>

<template>
  <a-form class="f_article_form_com" ref="formRef" :model="form" :label-col-props="{span: 0}"
          :wrapper-col-props="{span: 24}">
    <a-form-item field="title" validate-trigger="blur" :rules="[{required: true, message:'请输入文章标题'}]">
      <a-input v-model="form.title" placeholder="请输入标题（建议20字以内）"></a-input>
    </a-form-item>
    <a-form-item>
      <a-textarea v-model="form.abstract" :auto-size="{minRows: 3, maxRows: 4}" placeholder="文章简介"></a-textarea>
    </a-form-item>
    <a-form-item field="content" validate-trigger="blur" :rules="[{required: true, message:'请输入文章内容'}]">
<!--      <MdEditor @onUploadImg="onUploadImg" @paste="paste" v-model="form.content" placeholder="请输入文章内容"></MdEditor>-->
      <MdEditor @onUploadImg="onUploadImg" v-model="form.content" placeholder="请输入文章内容"></MdEditor>
    </a-form-item>
    <a-collapse :default-active-key="[1]" :bordered="false">
      <a-collapse-item header="更多设置" :key="1">

        <div class="form-container">
          <a-form :label-col-props="{span: 14}" :wrapper-col-props="{span: 20}" class="form2" label-align="left"
                  :model="form">
            <a-form-item content-class="article_cover_col" label="设置文章封面">

                <f_cover_cutter style="width: 100%; height: 30%" @ok="coverBack">
                  <div class="cover_mask">
                    <IconImage></IconImage>
                    <span>本地上传</span>
                  </div>
                </f_cover_cutter>

              <div class="addr">
                <a-input v-model="form.coverURL" placeholder="URL地址"></a-input>
              </div>
              <div class="show" v-if="form.coverURL">
                <a-image :src="form.coverURL" :width="300">
                  <template #extra>
                    <IconDelete @click="coverRemove"></IconDelete>
                  </template>
                </a-image>
              </div>
              <template #help>
                <div v-if="store.siteInfo.cloud.enable">
                  云服务供应商：七牛云
                </div>
              </template>
            </a-form-item>
          </a-form>

          <a-form :label-col-props="{span: 14}" :wrapper-col-props="{span: 24}" class="form3" label-align="left"
                  :model="form">
            <a-form-item label="请选择文章分类">
              <a-select v-model="form.categoryID" placeholder="文章分类" :options="categoryOptions" style="cursor: pointer"></a-select>
              <template #help>
                <span v-if="aiData.category">基于ai推荐 适合的分类名称： {{ aiData.category }}</span>
              </template>
            </a-form-item>
            <a-form-item label="文章标签">
              <a-select allow-create allow-clear multiple :options="tagOptions" v-model="form.tags"
                        placeholder="请输入标签" style="cursor: pointer"></a-select>
            </a-form-item>
            <a-form-item label="AI 辅助生成">
              <div class="aiGen">
                <span>根据文章内容，由AI生成留空的题目、简介及标签</span>
                <a-button @click="aiGen()">一键生成</a-button>
              </div>
            </a-form-item>
            <a-form-item label="设置评论状态">
              <a-checkbox v-model="form.openForComment">开启评论</a-checkbox>
            </a-form-item>
          </a-form>
        </div>

      </a-collapse-item>
    </a-collapse>


    <div class="actions">
      <a-button @click="create(1)">存为草稿</a-button>
      <a-button type="primary" @click="create(2)">{{ props.articleId ? '更新' : '发布文章'}}</a-button>
    </div>
  </a-form>
</template>

<style lang="less">
.f_article_form_com {

  .arco-collapse {
    margin-bottom: 10px;
  }

  .arco-collapse-item {
    .arco-collapse-item-header {
      padding: 0;
      border: none;

      .arco-collapse-item-icon-hover {
        left: 62px;
      }
    }

    .arco-collapse-item-content {
      padding-right: 0;
      background: transparent;
      padding-left: 0;
    }
  }

  .form-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap; // 如果屏幕小可自动换行
    gap: 20px;

    .form2 {
      flex: 1 1 45%;

      .arco-row {
        display: flex;
        flex-direction: column;
      }

      .cover_mask {
        width: 100%;
        height: 120px;
        cursor: pointer;
        border: @f_border;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: var(--color-text-2);

        span {
          font-size: 12px;
        }

        svg {
          font-size: 30px;
        }
      }

      .article_cover_col {
        flex-direction: column;

        > div {
          width: 100%;
        }

        .msg {
          color: var(--color-text-3);
          margin-bottom: 10px;
          font-size: 12px;
        }

        .addr {
          margin-top: 10px;
        }

        .show {
          margin-top: 10px;
          .arco-image-footer{
            display: flex;
            justify-content: center;
            .arco-image-footer-extra{
              padding-left: 0;
              svg{
                font-size: 20px;
                cursor: pointer;
              }
            }
          }
        }
      }

      .aiGen {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%; // 确保占满一行

        .text {
          flex: 1;
          white-space: nowrap; // 防止换行
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }

    .form3 {
      flex: 1 1 50%;
      .arco-row {
        display: flex;
        flex-direction: column;
      }

      .cover_mask {
        width: 100%;
        height: 120px;
        cursor: pointer;
        border: @f_border;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: var(--color-text-2);

        span {
          font-size: 12px;
        }

        svg {
          font-size: 30px;
        }
      }

      .article_cover_col {
        flex-direction: column;

        > div {
          width: 100%;
        }

        .msg {
          color: var(--color-text-3);
          margin-bottom: 10px;
          font-size: 12px;
        }

        .addr {
          margin-top: 10px;
        }

        .show {
          margin-top: 10px;
          .arco-image-footer{
            display: flex;
            justify-content: center;
            .arco-image-footer-extra{
              padding-left: 0;
              svg{
                font-size: 20px;
                cursor: pointer;
              }
            }
          }
        }
      }

      .aiGen {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%; // 确保占满一行

        .text {
          flex: 1;
          white-space: nowrap; // 防止换行
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }


  .actions {
    display: flex;
    justify-content: flex-end; // 靠右对齐
    .arco-btn {
      margin-left: 10px;
    }
  }
}
</style>