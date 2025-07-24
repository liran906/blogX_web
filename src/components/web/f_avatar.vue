<script setup lang="ts">
import { computed, ref } from 'vue'
import { Avatar } from '@arco-design/web-vue'

// 通用头像组件 props
const props = defineProps({
  avatarUrl: {
    type: String,
    default: ''
  },
  nickname: {
    type: String,
    default: ''
  },
  size: {
    type: Number,
    default: 40
  }
})

// 调试输出
console.log('🔍 F_avatar props:', props)

// 图片加载状态
const imageLoaded = ref(true)

// 取首字母（大写）
const firstLetter = computed(() => {
  const letter = props.nickname ? props.nickname[0].toUpperCase() : ''
  console.log('📝 首字母:', letter, '昵称:', props.nickname)
  return letter
})

// 是否显示图片
const showImage = computed(() => {
  return props.avatarUrl && imageLoaded.value
})

// 图片加载失败处理
function onImageError() {
  console.log('❌ 图片加载失败:', props.avatarUrl)
  imageLoaded.value = false
}

// 图片加载成功处理
function onImageLoad() {
  console.log('✅ 图片加载成功:', props.avatarUrl)
  imageLoaded.value = true
}
</script>

<template>
  <a-avatar
    class="avatar_1"
    :image-url="showImage ? props.avatarUrl : ''"
    :size="props.size"
    @error="onImageError"
    @load="onImageLoad"
  >
    {{ firstLetter }}
  </a-avatar>
</template>

<style lang="less">
.avatar_1 {
  cursor: pointer;
  background: rgb(var(--arcoblue-6)) !important;
  color: #fff !important;
  font-weight: bold;
  font-size: 18px;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}
</style>