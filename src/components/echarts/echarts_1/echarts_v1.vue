<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import * as echarts from 'echarts';
import type { EChartsOption, EChartsType } from "echarts";
import { theme } from "@/components/common/f_theme";

// Props 类型定义增加 growthRateList
interface Props {
  class: string
  countList: number[]
  dateList: string[]
  growthRateList?: number[]  // 新增的增长率数据
}

const props = defineProps<Props>()

let myChart: echarts.ECharts | null = null

// initEcharts 函数中添加双 y 轴配置
function initEcharts() {
  const textColor = getComputedStyle(document.body).getPropertyValue("--color-text-1")
  const lineColor = getComputedStyle(document.body).getPropertyValue("--color-neutral-2")

  let themeColor = ['#1c5ae0', '#15c5be']
  if (theme.value === "dark") {
    themeColor = ['#1c5ae0', '#15c5be']
  }

  const series = [
    {
      name: '数值',
      data: props.countList,
      type: 'line',
      smooth: true,
    }
  ]

  if (props.growthRateList && props.growthRateList.length) {
    series.push({
      name: '增长率',
      data: props.growthRateList,
      type: 'line',
      smooth: true,
      yAxisIndex: 1
    })
  }

  const option: EChartsOption = {
    color: themeColor,
    xAxis: {
      type: 'category',
      data: props.dateList,
      show: true,
      axisLine: {
        show: true,
        lineStyle: {
          color: lineColor
        }
      },
      axisLabel: {
        show: true,
        color: textColor
      }
    },
    grid: {
      left: '4%',    // 增加左侧间距
      right: '4%',   // 增加右侧间距
      bottom: '3%',
      top: '3%',
      containLabel: true
    },
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          show: false  // 不显示左侧数值
        },
        splitLine: {
          lineStyle: {
            color: lineColor
          }
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: lineColor
          }
        }
      },
      {
        type: 'value',
        axisLabel: {
          show: false  // 不显示右侧增长率
        },
        splitLine: { show: false },
        axisLine: {
          show: true,
          lineStyle: {
            color: lineColor
          }
        }
      }
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    series,
    legend: {  // 移除图例
      show: false
    }
  }

  myChart?.setOption(option);
}

watch(() => props.dateList, initEcharts)
watch(() => theme.value, initEcharts)

onMounted(() => {
  const chartDom = document.querySelector("." + props.class) as HTMLDivElement;
  if (chartDom) {
    myChart = echarts.init(chartDom);
    initEcharts()
  }
})
</script>

<template>
  <div class="echarts_v1" :class="props.class"></div>
</template>

<style lang="less">
.echarts_v1 {
  width: 100%;
  height: 100%;
}
</style>