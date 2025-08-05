<script setup lang="ts">
import F_welcome from "@/components/admin/f_welcome.vue";
import F_quick_entrance from "@/components/admin/f_quick_entrance.vue";
import F_version from "@/components/common/f_version.vue";
import F_title from "@/components/common/f_title.vue";
import F_home_charts_v1 from "@/components/admin/f_home_charts_v1.vue";
import Echarts_v2 from "@/components/echarts/echarts_1/echarts_v2.vue";
import Echarts_v3 from "@/components/echarts/echarts_1/echarts_v3.vue";
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

</script>

<template>
  <div class="home_view">
    <div class="left">
      <f_welcome></f_welcome>
      <div class="charts charts_4">
        <div class="item">
          <f_title :type="2">{{ t('admin.visitorsCount') }}</f_title>
          <f_home_charts_v1 :type="1"></f_home_charts_v1>
        </div>
        <div class="item">
          <f_title :type="2">{{ t('admin.clickCount') }}</f_title>
          <f_home_charts_v1 :type="2"></f_home_charts_v1>
        </div>
        <div class="item">
          <f_title :type="2">{{ t('admin.newArticles') }}</f_title>
          <f_home_charts_v1 :type="3"></f_home_charts_v1>
        </div>
        <div class="item">
          <f_title :type="2">{{ t('admin.newUsers') }}</f_title>
          <f_home_charts_v1 :type="4"></f_home_charts_v1>
        </div>
      </div>
      <div class="charts charts_2">
        <div class="item">
          <f_title :type="2">{{ t('admin.yearlyArticleStats') }}</f_title>
          <div class="body">
            <echarts_v2></echarts_v2>
          </div>
        </div>
        <div class="item">
          <f_title :type="2">{{ t('admin.systemResources') }}</f_title>
          <div class="body">
            <echarts_v3></echarts_v3>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <f_quick_entrance></f_quick_entrance>
      <f_version></f_version>
    </div>
  </div>
</template>

<style lang="less">
.home_view {
  background-color: inherit !important;
  display: flex;
  justify-content: space-between;

  > .left {
    width: 75%;

    .charts {
      margin-bottom: 20px;
      grid-column-gap: 20px;
      display: grid;

      .item {
        background: var(--color-bg-1);
        border-radius: 5px;
        padding: 20px 10px;
      }
    }

    .charts_4 {
      grid-template-columns: repeat(4, 1fr);  // 改为4列布局
    }

    .charts_2 {
      grid-template-columns: 7fr 3fr;
    }
  }

  > .right {
    width: calc(25% - 20px);

    .f_quick_entrance {
      margin-bottom: 20px;
    }
  }
}
</style>