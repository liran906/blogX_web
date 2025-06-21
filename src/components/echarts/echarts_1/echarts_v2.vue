<script setup lang="ts">
import * as echarts from 'echarts';
import {onMounted, reactive, watch} from "vue";
import {theme} from "@/components/common/f_theme";
import type {dataGrowthType} from "@/api/data_api";
import {dataGrowthApi} from "@/api/data_api";
import {Message} from "@arco-design/web-vue";

type EChartsOption = echarts.EChartsOption;
let myChart: echarts.ECharts | null = null

const data = reactive<{
  dateList: string[]
  countList: number[]
  growthRateList: number[]
}>({
  dateList: [],
  countList: [],
  growthRateList: [],
})

async function getData() {
  const res = await dataGrowthApi(3, 3)  // type=3 表示文章数据，interval=3 表示年度数据
  if (res.code) {
    Message.error(res.msg)
    return
  }
  
  // 从返回数据中提取信息
  const { valueMap, growthRateMap } = res.data;
  
  // 按日期顺序排序数据
  data.dateList = Object.keys(valueMap)
  data.countList = data.dateList.map(date => valueMap[date]);
  
  // 转换增长率数据
  data.growthRateList = data.dateList.map(date => {
    const rate = growthRateMap[date] || '0%';
    if (rate === 'infinite%') return 100;
    return parseFloat(rate.replace('%', ''));
  });
}

function initEcharts() {
  let option: EChartsOption;

  const textColor = getComputedStyle(document.body).getPropertyValue("--color-text-1")
  const lineColor = getComputedStyle(document.body).getPropertyValue("--color-neutral-2")

  let themeColor = ['#1c5ae0', '#15c5be']
  if (theme.value === "dark") {
    themeColor = ['#1c5ae0', '#15c5be']
  }

  option = {
    color: themeColor,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    grid: {
      left: '2%',
      right: '2%',
      bottom: '3%',
      top: "10%",
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: data.dateList,
        axisLine: {
          lineStyle: {
            color: lineColor
          }
        },
        axisLabel: {
          color: textColor
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        splitLine: {
          lineStyle: {
            color: lineColor
          }
        },
        axisLine: {
          lineStyle: {
            color: lineColor
          }
        },
        axisLabel: {
          color: textColor
        }
      },
      {
        type: 'value',
        splitLine: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: lineColor
          }
        },
        axisLabel: {
          color: textColor,
          formatter: '{value}%'
        }
      }
    ],
    series: [
      {
        name: '文章数量',
        type: 'line',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: data.countList,
        smooth: true,
      },
      {
        name: '增长率',
        type: 'line',
        yAxisIndex: 1,
        data: data.growthRateList,
        smooth: true,
      }
    ]
  };
  option && myChart?.setOption(option);
}

onMounted(async () => {
  await getData()
  const chartDom = document.querySelector('.user_login_echarts') as HTMLDivElement;
  myChart = echarts.init(chartDom);
  initEcharts()
})

watch(() => theme.value, () => {
  initEcharts()
})
</script>

<template>
  <div class="user_login_echarts"></div>
</template>

<style lang="less">
.user_login_echarts {
  width: 100%;
  height: 300px;
  background-color: var(--color-bg-1);
  border-radius: 5px;
}
</style>