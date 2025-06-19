<script setup lang="ts">
import {userListApi} from "@/api/user_api";

userListApi().then(response => {
  console.log(response);
})
</script>

<template>
  <router-view></router-view>
</template>