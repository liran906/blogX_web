<script setup lang="ts">
import F_avatar from "@/components/web/f_avatar.vue";

interface Props {
  avatar: string
  nickname: string
  size?: number
}

const props = defineProps<Props>()
const {size=40}= props
</script>

<template>
  <div class="f_user_com">
    <f_avatar :image-url="props.avatar" :size="size" :nickname="props.nickname"/>
    <span class="text">{{ props.nickname }}</span>
  </div>
</template>

<style lang="less">
.f_user_com{
  .text{
    margin-left: 2px
  }
}
</style>