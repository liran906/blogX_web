<script setup lang="ts">

/*
组件说明（整体功能与设计思路）

这段代码是典型的 抽象通用列表组件 封装方式。

这个 f_list.vue 组件主要用于展示具有通用结构的表格列表，具备以下功能特点：
	•	由父组件传入请求函数 url 和列配置 columns，组件内部无需关心具体业务逻辑；
	•	封装了常见的 表格渲染、搜索框、分页逻辑、加载状态控制；
	•	支持使用 插槽 自定义操作列和扩展搜索项，满足不同页面需求；
	•	极强的复用性：多个页面可共用同一个 f_list，只需传入不同的接口函数与列配置即可快速搭建功能列表页面。

这种思路可以显著提升开发效率，避免重复代码，是实际项目中常见的企业级组件封装模式。
 */

import type { baseResponse, listResponse, paramsType } from "@/api"
import { reactive, ref } from "vue"
import { Message, type TableColumnData } from "@arco-design/web-vue"
import { dateTemFormat, type dateTemType } from "@/utils/date"

// 列定义扩展：继承自 arco 的 TableColumnData，并可选地添加日期格式化字段
export interface columnType extends TableColumnData {
  dateFormat?: dateTemType
}

// 接收父组件传入的 props 参数类型定义
interface Props {
  url: (params?: paramsType) => Promise<baseResponse<listResponse<any>>> // 列表请求函数
  columns: columnType[] // 表格列配置
}

// 接收 props（使用 defineProps 声明）
const props = defineProps<Props>()

// 加载状态（控制 a-spin 加载效果）
const loading = ref(false)

// 响应式数据结构，包含表格数据 list 和总数量 count
const data = reactive<listResponse<any>>({
  list: [],
  count: 0,
})

// 请求参数（如分页、关键词等）
const params = reactive<paramsType>({
  limit: 10, // 每页数量
})

// 获取列表数据函数（初始化和分页变化时都会调用）
async function getList() {
  loading.value = true
  const res = await props.url(params) // 调用父组件传入的请求函数
  loading.value = false
  if (res.code) {
    Message.error(res.msg) // 请求失败提示
    return
  }
  data.list = res.data.list // 渲染表格数据
  data.count = res.data.count // 设置分页总数
}

// 首次挂载时加载列表
getList()

// 删除按钮点击事件（内部未实现，可由插槽扩展）
function remove() {}

// 编辑按钮点击事件（内部未实现，可由插槽扩展）
function update(record: any) {}

// 分页切换时重新请求数据
function pageChange() {
  getList()
}

// 搜索框触发搜索时调用
function search() {
  getList()
}
</script>

<template>
  <div class="f_list_com">
    <!-- 🔹 顶部操作区域（创建、批量操作、搜索） -->
    <div class="f_list_head">
      <div class="action_create">
        <a-button type="primary">创建</a-button>
      </div>
      <div class="action_group">
        <a-select placeholder="操作"></a-select>
      </div>
      <div class="action_search" @keydown.enter="search">
        <a-input-search placeholder="搜索" v-model="params.key" @search="search" />
      </div>
      <div class="action_search_slot">
        <!-- 🔸 可拓展 slot 内容 -->
      </div>
      <div class="action_flush">
        <icon-refresh @click="getList" />
      </div>
    </div>

    <!-- 🔹 表格区域 -->
    <div class="f_list_body">
      <!-- 表格加载状态包裹 -->
      <a-spin :loading="loading" tip="加载中...">
        <div class="f_list_table">
          <a-table :data="data.list" :pagination="false">
            <!-- 表格列定义 -->
            <template #columns>
              <template v-for="col in props.columns">
                <!-- 普通列直接绑定属性 -->
                <a-table-column v-if="col.dataIndex" v-bind="col" />

                <!-- 插槽列 -->
                <a-table-column v-else-if="col.slotName" v-bind="col">
                  <template #cell="data">
                    <!-- 操作列 -->
                    <div class="col_actions" v-if="col.slotName === 'action'">
                      <slot v-bind="data" name="action_left"></slot>
                      <a-button type="primary" @click="update(data.record)">编辑</a-button>
                      <a-popconfirm @ok="remove" content="确定要删除该记录吗？">
                        <a-button type="primary" status="danger">删除</a-button>
                      </a-popconfirm>
                      <slot v-bind="data" name="action_right"></slot>
                    </div>

                    <!-- 时间列，格式化处理 -->
                    <div v-if="col.slotName === 'createdAt'">
                      {{ dateTemFormat(data.record[col.slotName], col.dateFormat) }}
                    </div>

                    <!-- 自定义插槽列 -->
                    <slot v-else :name="col.slotName" v-bind="data"></slot>
                  </template>
                </a-table-column>
              </template>
            </template>
          </a-table>
        </div>

        <!-- 🔹 分页控件 -->
        <div class="f_list_page">
          <a-pagination
              show-total
              @change="pageChange"
              :total="data.count"
              v-model:current="params.page"
              :page-size="params.limit"
          />
        </div>
      </a-spin>
    </div>
  </div>
</template>

<style lang="less">
.f_list_com {
  .f_list_head {
    padding: 20px 20px 10px 20px;
    border-bottom: @f_border;
    display: flex;
    align-items: center;
    position: relative;

    .action_create,
    .action_group,
    .action_search,
    .action_search_slot {
      margin-right: 10px;
    }

    .action_flush {
      position: absolute;
      right: 20px;
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--color-fill-2);
      border-radius: 5px;
      cursor: pointer;
    }
  }

  .f_list_body {
    padding: 10px 20px 20px 20px;

    > .arco-spin {
      width: 100%;
    }

    .f_list_page {
      display: flex;
      justify-content: center;
      margin-top: 10px;
    }

    .col_actions {
      button {
        margin-right: 10px;

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}
</style>