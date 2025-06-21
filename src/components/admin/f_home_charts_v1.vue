<script setup lang="ts">
import Echarts_v1 from "@/components/echarts/echarts_1/echarts_v1.vue";
import {reactive} from "vue";
import {dataGrowthApi, type dataGrowthType} from "@/api/data_api";
import {Message} from "@arco-design/web-vue";

interface Props {
  type: 1 | 2 | 3 | 4
}

const props = defineProps<Props>()

// 初始化数据结构
const data = reactive<{
  dateList: string[]
  countList: number[]
  growthRateList: number[]
  growthNum: number
  growthRate: number
}>({
  dateList: [],
  countList: [],
  growthRateList: [],
  growthNum: 0,
  growthRate: 0,
})

// 修改 getData 函数部分:
async function getData() {
  const res = await dataGrowthApi(props.type, 1); // 加上 interval 参数
  if (res.code) {
    Message.error(res.msg);
    return;
  }

  // 从返回数据中提取所需信息
  const { valueMap, growthMap, growthRateMap } = res.data;
  
  // 按日期顺序排序所有数据
  data.dateList = Object.keys(valueMap)
  data.countList = data.dateList.map(date => valueMap[date]);
  
  // 计算最新的增长数据
  const lastDate = data.dateList[data.dateList.length - 1];
  data.growthNum = growthMap[lastDate] || 0;
  
  // 处理增长率,将百分比字符串转为数值
  const lastGrowthRate = growthRateMap[lastDate] || "0%";
  data.growthRate = parseGrowthRate(lastGrowthRate);
  
  // 转换所有增长率数据用于图表显示
  data.growthRateList = data.dateList.map(date => {
    const rate = growthRateMap[date];
    if (!rate) return 0;
    return parseGrowthRate(rate);
  });
}

// 添加一个解析增长率的辅助函数
function parseGrowthRate(rate: string): number {
  if (!rate || rate === '0%') return 0;
  if (rate === 'infinite%') return 100;
  return parseFloat(rate.replace('%', ''));
}

getData()
</script>

<template>
  <div class="f_charts_v1_com">
    <echarts_v1
        :class="`growth_${props.type}`"
        :count-list="data.countList"
        :date-list="data.dateList"
        :growth-rate-list="data.growthRateList"
    />
  </div>
</template>

<style lang="less">
.f_charts_v1_com {
  height: 200px;
}
</style>