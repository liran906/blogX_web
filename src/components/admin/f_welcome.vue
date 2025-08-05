<script setup lang="ts">
import {reactive, ref} from "vue";
import {type dataSumType, dataSumApi, type weatherType} from "@/api/data_api";
import {userStorei} from "@/stores/user_store";
import {computed} from "vue";
import {Message} from "@arco-design/web-vue";
import {useI18n} from "vue-i18n";

interface Props {
  noWeather?: boolean
  noHelp?: boolean
}

const props = defineProps<Props>()
const store = userStorei()
const {t} = useI18n()
const data = reactive<dataSumType>({
  flowCount: 0,
  clickCount: 0,
  userCount: 0,
  articleCount: 0,
  messageCount: 0,
  commentCount: 0,
  newLoginCount: 0,
  newSignCount: 0,
})

async function getData() {
  const res = await dataSumApi()
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Object.assign(data, res.data)
}
getData()

const weatherData = reactive<weatherType>({
  "province": "江苏",
  "city": "南京市",
  "adcode": "210000",
  "weather": "晴",
  "temperature": "32",
  "winddirection": "西南",
  "windpower": "≤3",
  "humidity": "55",
  "reporttime": "2024-05-26 14:01:47",
  "temperature_float": "34.0",
  "humidity_float": "55.0"
})

const temperatureLabel = computed(() => {
  const num = Number(weatherData.temperature)
  if (num > 40) {
    return t('admin.weather.veryHot')
  }
  if (num > 30) {
    return t('admin.weather.hot')
  }
  if (num > 10) {
    return t('admin.weather.nice')
  }
  if (num > 0) {
    return t('admin.weather.cold')
  }
  return t('admin.weather.veryCold')
})

const welcomeTitle = computed(() => {
  const now = new Date()
  const h = now.getHours()
  if (h < 9 && h >= 6) {
    return t('admin.greeting.morning')
  }
  if (h >= 9 && h < 12) {
    return t('admin.greeting.forenoon')
  }
  if (h >= 12 && h < 14) {
    return t('admin.greeting.noon')
  }
  if (h >= 14 && h < 16) {
    return t('admin.greeting.afternoon')
  }
  if (h >= 16 && h < 20) {
    return t('admin.greeting.evening')
  }
  if (h >= 20 && h < 24) {
    return t('admin.greeting.night')
  }
  return t('admin.greeting.morning')
})

// getData()

</script>

<template>
  <div class="f_welcome">
    <div class="title">{{ welcomeTitle }} {{ store.userInfo.nickName }}，{{ t('admin.welcome.startWork') }}</div>
    <div v-if="!props.noWeather" class="weather">
      {{ weatherData.province }} · {{ weatherData.city }} {{ t('admin.weather.today') }} {{ weatherData.weather }}，{{
        weatherData.temperature
      }}℃，{{ temperatureLabel }}
    </div>
    <div class="statistics">
      <a-statistic animation :title="t('admin.stats.todayVisits')" :value="data.flowCount" show-group-separator/>
      <a-statistic animation :title="t('admin.stats.todayClicks')" :value="data.clickCount" show-group-separator/>
      <a-statistic animation :title="t('admin.stats.totalUsers')" :value="data.userCount" show-group-separator/>
      <a-statistic animation :title="t('admin.stats.totalArticles')" :value="data.articleCount" show-group-separator/>
      <a-statistic animation :title="t('admin.stats.totalMessages')" :value="data.messageCount" show-group-separator/>
      <a-statistic animation :title="t('admin.stats.totalComments')" :value="data.commentCount" show-group-separator/>
      <a-statistic animation :title="t('admin.stats.todayLogins')" :value="data.newLoginCount" show-group-separator/>
      <a-statistic animation :title="t('admin.stats.todayRegisters')" :value="data.newSignCount" show-group-separator/>
    </div>
    <div class="extra" v-if="!props.noHelp">
      {{ t('admin.welcome.systemIntro') }} <a href="">{{ t('admin.systemHelp') }}</a> {{ t('admin.welcome.betterUse') }}
    </div>
  </div>
</template>

<style lang="less">
.f_welcome {
  width: 100%;
  background-color: var(--color-bg-1);
  border-radius: 5px;
  margin-bottom: 20px;
  background-image: url("@/assets/img/home_bg.png");
  background-size: 500px;
  background-repeat: no-repeat;
  background-position: right center;
  padding: 40px 20px;
  color: var(--color-text-2);

  .title {
    font-size: 22px;
    color: var(--color-text-1);
  }

  .weather {
    margin-top: 20px;
  }

  .statistics {
    margin-top: 20px;

    .arco-statistic {
      margin-right: 30px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .extra {
    margin-top: 20px;

    a {
      text-decoration: none;
      color: @primary-6;
    }
  }
}
</style>