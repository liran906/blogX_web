<script setup lang="ts">
import {collectCreateApi} from "@/api/collect_api";
import {useI18n} from 'vue-i18n';
import {Message} from "@arco-design/web-vue";

interface Props {
  id?: number
  visible: boolean
  title: string
  abstract?: string
}

const props = defineProps<Props>()
const emits = defineEmits(["update:visible", "update:title", "update:abstract", "ok"])
const {t} = useI18n()

async function addCategoryHandler() {
  const res = await collectCreateApi({
    id: props.id as number,
    title: props.title,
    abstract: props.abstract as string,
  })
  if (res.code) {
    Message.error(res.msg)
    return false
  }
  Message.success(res.msg)
  emits("ok")
  cancel()
  return  true
}

function cancel(){
  emits("update:visible", false)
}

function titleInput(val: string) {
  emits("update:title", val)
}

function abstractInput(val: string) {
  emits("update:abstract", val)
}

</script>

<template>
  <a-modal @cancel="cancel" width="30%" :title="props.id ? t('action.editCollection') : t('action.createCollection')" :visible="props.visible"
           :on-before-ok="addCategoryHandler">
    <a-form ref="formRef" :model="props" :label-col-props="{span: 7}" :wrapper-col-props="{span: 17}">
      <a-form-item :label="t('collection.title')" field="title" :validate-trigger="'blur'"
                   :rules="[{required: true, message: t('form.collectionTitleRequired')}]">
        <a-input :placeholder="t('collection.title')" @input="titleInput"></a-input>
      </a-form-item>
      <a-form-item v-if="props.abstract !== undefined" :label="t('collection.description')">
        <a-textarea :placeholder="t('collection.description')" :auto-size="{minRows: 2, maxRows: 4}"
                    @input="abstractInput"></a-textarea>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style scoped lang="less">

</style>