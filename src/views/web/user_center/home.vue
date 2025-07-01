<script setup lang="ts">

import F_card from "@/components/web/f_card.vue";
import {userCenterStorei} from "@/stores/user_center_store";
import {userDetailUpdateApi, type userDetailUpdateRequest} from "@/api/user_api";
import {Message} from "@arco-design/web-vue";

const store = userCenterStorei()

async function userUpdateColumn() {

  const res = await userDetailUpdateApi({
    themeID: store.userDetail.themeID,
  })
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
}


</script>

<template>
  <div class="user_center_home_view">
    <f_card title="主页设置">
      <a-form :model="store.userDetail" :label-col-props="{span: 4}" label-align="left">
        <a-form-item class="home_style_item" label="主页样式">
          <a-radio-group v-model="store.userDetail.themeID">
            <a-radio :value="1">
              <img src="@/assets/img/home_banner/01_default.png" alt="">
              <div class="text">默认样式</div>
            </a-radio>
            <a-radio :value="2">
              <img src="@/assets/img/home_banner/02_balloon.png" alt="">
              <div class="text">湖光山色</div>
            </a-radio>
            <a-radio :value="3">
              <img src="@/assets/img/home_banner/03_cubes.jpg" alt="">
              <div class="text">立方体</div>
            </a-radio>
            <a-radio :value="4">
              <img src="@/assets/img/home_banner/04_mc.jpg" alt="">
              <div class="text">我的世界</div>
            </a-radio>
            <a-radio :value="5">
              <img src="@/assets/img/home_banner/05_f22.jpeg" alt="">
              <div class="text">F22猛禽</div>
            </a-radio>
            <a-radio :value="6">
              <img src="@/assets/img/home_banner/06_lalaland.jpg" alt="">
              <div class="text">爱乐之城</div>
            </a-radio>
            <a-radio :value="7">
              <img src="@/assets/img/home_banner/07_interstellar.png" alt="">
              <div class="text">星际穿越</div>
            </a-radio>
            <a-radio :value="8">
              <img src="@/assets/img/home_banner/08_budapest.jpg" alt="">
              <div class="text">布达佩斯</div>
            </a-radio>
            <a-radio :value="9">
              <img src="@/assets/img/home_banner/09_jupiter.jpg" alt="">
              <div class="text">土星</div>
            </a-radio>
            <a-radio :value="10">
              <img src="@/assets/img/home_banner/10_redleaves.webp" alt="">
              <div class="text">红叶</div>
            </a-radio>
            <a-radio :value="11">
              <img src="@/assets/img/home_banner/11_dune.webp" alt="">
              <div class="text">沙漠落日</div>
            </a-radio>
            <a-radio :value="12">
              <img src="@/assets/img/home_banner/12_aurora.webp" alt="">
              <div class="text">极光</div>
            </a-radio>
            <a-radio :value="13">
              <img src="@/assets/img/home_banner/13_leaves.webp" alt="">
              <div class="text">树叶</div>
            </a-radio>
            <a-radio :value="14">
              <img src="@/assets/img/home_banner/14_virtual.webp" alt="">
              <div class="text">数字山峦</div>
            </a-radio>
            <a-radio :value="15">
              <img src="@/assets/img/home_banner/15_spiritedaway.jpg" alt="">
              <div class="text">千与千寻</div>
            </a-radio>
            <a-radio :value="16">
              <img src="@/assets/img/home_banner/16_earth.png" alt="">
              <div class="text">地球</div>
            </a-radio>

          </a-radio-group>
        </a-form-item>
      </a-form>
      <a-button @click="userUpdateColumn" type="primary">更新</a-button>
    </f_card>
  </div>
</template>

<style lang="less">
.user_center_home_view {
  .arco-form {
    .home_style_item {
      flex-direction: column;

      .arco-radio-group {
        display: grid;
        grid-template-columns: repeat(5, minmax(170px, 1fr));
        grid-gap: 20px;
      }

      .arco-radio {
        width: 100%;
        border: @f_border;
        border-radius: 5px;
        display: flex;
        flex-direction: column-reverse;
        justify-content: center;
        align-items: center;
        padding: 10px;

        .arco-radio-label {
          margin-left: 0;

          img {
            aspect-ratio: 3 / 1;
            width: 100%;
            object-fit: cover;  // 裁剪填充
            object-position: center;
            display: block;
          }

          .text {
            text-align: center;
            margin-bottom: 5px;
            color: var(--color-text-2);
          }
        }
      }
    }
  }
}
</style>