<script setup lang="ts">

import {ref} from "vue";


// 是否是全屏
const isFullScreen = ref<boolean>(false);

// 全屏
function fullScreen() {
  // 加?（可选链）防止报错 相当于 if...exists...
  document.documentElement?.requestFullscreen();
  isFullScreen.value = true;
}

// 退出全屏
function exitFullScreen() {
  document?.exitFullscreen();
  isFullScreen.value = false;
}

</script>

<template>
  <icon-fullscreen v-if="!isFullScreen" @click="fullScreen"/>
  <icon-fullscreen-exit v-else @click="exitFullScreen"/>
</template>

<style scoped>

</style>