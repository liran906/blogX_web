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

import type {baseResponse, listResponse, optionsFunc, optionsType, paramsType} from "@/api"
import { reactive, ref } from "vue"
import {Message, type TableColumnData, type TableData, type TableRowSelection} from "@arco-design/web-vue";
import { dateTemFormat, type dateTemType } from "@/utils/date"
import {defaultDeleteApi, defaultPostApi, defaultPutApi} from "@/api";
import type {emitFnType, formListType} from "@/components/admin/f_modal_form.vue";
import F_modal_form from "@/components/admin/f_modal_form.vue";
import {articleStatusOptions, type optionsColorType} from "@/options/options";
import F_label from "@/components/common/f_label.vue";

// 列定义扩展：继承自 arco 的 TableColumnData，并可选地添加日期格式化字段
export interface columnType extends TableColumnData {
  dateFormat?: dateTemType
  type?: "date" | "options" | "switch"
  options?: optionsColorType
}

// 自定义的批量操作对象
export interface actionGroupType {
  label: string
  value?: number
  callback: (keyList: number[]) => void
}

// 自定义的过滤标签
export interface filterGroupType {
  label: string
  source: optionsType[] | optionsFunc
  options?: optionsType[]
  column?: string
  params?: paramsType
  callback?: (value: number | string) => void
  width?: number
}

// 接收父组件传入的 props 参数类型定义
interface Props {
  // *必要字段 路由+列名
  url: (params?: paramsType) => Promise<baseResponse<listResponse<any>>> // 列表请求函数
  columns: columnType[] // 表格列配置

  // *primaryKey 的名字
  rowKey?: string // 默认值是“id”

  // 默认参数
  defaultParams?: Object

  // 自定义组件
  actionGroup?: actionGroupType[] // 自定义批量操作列表
  filterGroup?: filterGroupType[] // 自定义搜索过滤列表
  limit?: number

  // *定制化列表功能 默认都是开启的
  noDefaultDelete?: boolean // 是否启用默认删除 如果为 ture 那么要上抛问题到父组件
  noBatchDelete?: boolean // 是否启用批量删除
  noAdd?: boolean // 是否启用新建对象
  noEdit?: boolean // 是否启用编辑对象
  noDelete?: boolean // 是否启用删除对象
  noActionGroup?: boolean // 是否启用操作下拉菜单
  noCheck?: boolean // 是否启用全选
  noPage?: boolean // 是否启用分页

  // *定制化列表视图
  searchPlaceholder?: string // 搜索栏 placeholder
  addLabel?: string // 新建对象的图标上的显示内容，默认是“添加”
  editLabel?: string // 编辑对象的图标上的显示内容，默认是“编辑”
  deleteLabel?: string // 删除对象的图标上的显示内容，默认是“删除”

  // 表单
  formList?: formListType[]
  addFormLabel?: string
  editFormLabel?: string
}

// 接收 props（使用 defineProps 声明）
const props = defineProps<Props>()

// 这是对 props 中传进来的 参数 做了解构赋值，
// 如果父组件没有传入 相应的值，就用默认的。
const {
  rowKey = "id",
  noDefaultDelete = false,
  searchPlaceholder = "搜索",
  addLabel = "添加",
  editLabel = "编辑",
  deleteLabel = "删除",
  limit = 10,
} = props

const actionGroupOptions = ref<actionGroupType[]>([])

// 初始化批量操作
function initActionGroup() {
  let index = 0
  // 一般都有删除操作，但先判断一下
  if (!props.noBatchDelete) {
    actionGroupOptions.value.push({
      label: "批量删除",
      value: 1,
      callback: (keyList: number[]) => {
        baseDelete(keyList)
        selectedKeys.value = []
      }
    })
    index = 1
  }
  index++
  // 循环其他自定义的批量操作（如有）
  const actionGroup = props.actionGroup || []
  for (const action of actionGroup) {
    actionGroupOptions.value.push({
      label: action.label,
      value: index,
      callback: action.callback,
    })
  }
}

initActionGroup()

// 初始化搜索过滤
const filterGroups = ref<filterGroupType[]>([])

async function initFilterGroup() {
  filterGroups.value = []
  for (const f of props.filterGroup || []) {
    if (typeof f.source === 'function') {
      const res = await f.source(f.params)
      if (res.code) {
        Message.error(res.msg)
        continue
      }
      f.options = res.data
    } else {
      f.options = f.source
    }
    if (!f.callback) {
      // 如果没有callback，那就走默认行为
      f.callback = (value) => {
        if (f.column) {
          const p: { [key: string]: any } = {}
          p[f.column] = value
          getList(p)
        }
      }
    }
    filterGroups.value.push(f)
  }
}

initFilterGroup()

// 加载状态（控制 a-spin 加载效果）
const loading = ref(false)

// 响应式数据结构，包含表格数据 list 和总数量 count
const data = reactive<listResponse<any>>({
  list: [],
  count: 0,
})

// 请求参数（如分页、关键词等）
const params = reactive<paramsType>({
  limit: props.noPage ? -1 : limit, // 每页数量
})

// 获取列表数据函数（初始化和分页变化时都会调用）
async function getList(newParams?: paramsType) {
  // 判断有没有默认的params
  if (props.defaultParams){
    Object.assign(params, props.defaultParams)
  }

  loading.value = true

  // 调用父组件传入的请求函数(一般会传入后端API调用函数)
  if (newParams) {
    Object.assign(params, newParams)  // 外部传入的新参数（如：搜索、筛选）加上 内部默认参数（如：分页、关键词）
  }
  const res = await props.url(params) // 由父组件传入的 API 方法

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

// 如果执行失败，上抛父组件的消息
const emits = defineEmits<{
  (e: 'delete', keyList: number[] | string[]): void
  (e: 'add'): void
  (e: 'edit', record: any): void
  (e: "row-click", record: any): void
}>()

/*
    * 默认删除函数

    * 逻辑：
    结合父组件传进来的 url 字符串提取出接口路径，作为参数调用 defaultDeleteApi() 来执行删除操作

    * 入参：
    @param record - 当前行的数据对象，来自表格渲染时的作用域插槽传参（data.record）

    * 说明：
    在 <a-table-column> 中使用插槽渲染操作列时，会传入一个作用域对象 `data`，其结构类似：
    {
      record: { id: 1, name: "Alice", ... }, // 当前行完整的数据对象
      rowIndex: 0,                           // 当前行索引
      column: { ... },                       // 当前列的配置信息
      ... 其他信息
    }

    所以：
    - 在模板中你看到的 `data.record` 就是传给这个函数的 `record`；
    - record[rowKey] 就是这行数据的唯一主键值，通常是 id；
    - 我们通过它调用通用删除 API：defaultDeleteApi(url, [主键数组])

    * QA
    Q “为什么不直接写死 URL？为什么要用正则提出来？”
    A 这是为了保持 f_list 组件的“通用性”，因为 props.url 是你父组件传进来的列表查询接口：
      `<f_list :url="userListApi" />`
      它可能是 /api/user、/api/article、/api/xxx 等等。
      而删除接口我才用的是类似 /api/user，你这里的做法是假设接口命名规律类似，只是 get 请求换为 delete 请求，
      所以用字符串匹配 URL，再交给统一的删除接口 defaultDeleteApi() 去处理，达到复用目的。
*/
async function remove(record: any) {
  const key = record[rowKey] // 提取当前行的主键值，例如 id
  baseDelete([key])
}

async function baseDelete(keyList: number[]) {
  if (noDefaultDelete) {
    // 不启用默认删除 上抛问题给父组件
    emits("delete", keyList)
    return
  }

  const array = /\"(.*?)\"/.exec(props.url.toString()) // 正则匹配字符串里的 URL
  if (array?.length !== 2) {
    return
  }

  const url = array[1] // 提取 url，例如 "/api/user/list"

  const res = await defaultDeleteApi(url, keyList) // 调用默认删除接口
  if (res.code) {
    Message.error(res.msg)
    return
  }

  getList() // 删除成功后重新刷新列表
  Message.success(res.msg)
}

const modalFormRef = ref()

function edit(record: any) {
  if (props.formList?.length) {
    modalFormRef.value.setForm(record)
    visible.value = true
    return
  }
  emits("edit", record)
}

function add() {
  if (props.formList?.length) {
    visible.value = true
    return
  }

  emits("add")
}

// 分页切换时重新请求数据
function pageChange() {
  getList()
}

// 搜索框触发搜索时调用
function search() {
  getList()
}

// 刷新
function refresh() {
  getList()
  Message.success("刷新成功")
}

const selectedKeys = ref([]);

// 批量选择
const rowSelection = reactive<TableRowSelection>({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: false,
});
const actionValue = ref()

function actionGroupAction() {
  const action = actionGroupOptions.value.find((value) => value.value === actionValue.value)
  if (action) {
    action.callback(selectedKeys.value)
  }
}

function rowClick(record: TableData, ev: Event) {
  emits("row-click", record)
}

const visible = ref(false)

async function create(form: any, fn?: emitFnType) {
  const array = /\"(.*?)\"/.exec(props.url.toString())
  if (array?.length !== 2) {
    return
  }
  const url = array[1]

  const res = await defaultPostApi(url, form)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  getList()
  fn(true)
}

async function update(form: any, fn?: emitFnType) {
  const array = /\"(.*?)\"/.exec(props.url.toString())
  if (array?.length !== 2) {
    return
  }
  const url = array[1]

  const res = await defaultPutApi(url, form)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  getList()
  fn(true)
}

// 对外抛出
defineExpose({
  getList,
  data,
})

</script>

<template>
  <div class="f_list_com">
    <!-- 🔹 表单 -->
    <f_modal_form
        ref="modalFormRef"
        @create="create"
        @update="update"
        v-if="props.formList?.length"
        :add-label="props.addFormLabel"
        :edit-label="props.editFormLabel"
        v-model:visible="visible"
        :form-list="props.formList"></f_modal_form>

    <!-- 🔹 顶部操作区域（创建、批量操作、搜索等） -->
    <div class="f_list_head">

      <!-- 新建 -->
      <slot name="action_add">
        <div class="action_create" v-if="!noAdd">
          <a-button type="primary" @click="add">{{ addLabel }}</a-button>
        </div>
      </slot>

      <!-- 批量操作 -->
      <div class="action_group" v-if="!noActionGroup">
        <a-select style="width: 140px;" placeholder="操作" v-model="actionValue" :options="actionGroupOptions"></a-select>
        <a-button type="primary" status="danger" @click="actionGroupAction" v-if="actionValue">执行</a-button>
      </div>

      <!-- 搜索 -->
      <div class="action_search" @keydown.enter="search">
        <a-input-search :placeholder="searchPlaceholder" v-model="params.key" @search="search"></a-input-search>
      </div>

      <!-- 过滤 -->
      <div class="action_filter">
        <a-select v-for="item in filterGroups" :style="{width: item.width + 'px'}" allow-clear
                  @change="item.callback as any" :placeholder="item.label"
                  :options="item.options as optionsType[]"></a-select>
      </div>

      <!-- 其他搜索 -->
      <div class="action_search_slot">
        <slot name="search_other"></slot>
      </div>

      <!-- 刷新 -->
      <div class="action_flush" @click="refresh">
        <icon-refresh @click="getList" />
      </div>
    </div>

    <!-- 🔹 表格区域 -->
    <div class="f_list_body">
      <!-- 表格加载状态包裹 -->
      <a-spin :loading="loading" tip="加载中...">
        <div class="f_list_table">
          <!-- 全选按钮 -->
          <a-table @row-click="rowClick"
                   :data="data.list"
                   :row-key="rowKey"
                   v-model:selectedKeys="selectedKeys"
                   :row-selection="props.noCheck ? undefined : rowSelection "
                   :pagination="false">
            <!-- 表格列定义 -->
            <template #columns>
              <template v-for="col in props.columns">
                <!-- 普通列直接绑定属性 -->
                <a-table-column v-if="col.type === 'date'" v-bind="col">
                  <template #cell="data">
                    {{ dateTemFormat(data.record[col.dataIndex], col.dateFormat) }}
                  </template>
                </a-table-column>
                <a-table-column v-else-if="col.type === 'options'" v-bind="col">
                  <template #cell="data">
                    <f_label :options="col.options" :value="data.record[col.dataIndex]"></f_label>
                  </template>
                </a-table-column>
                <a-table-column v-else-if="col.type === 'switch'" v-bind="col">
                  <template #cell="data">
                    <a-switch :model-value="data.record[col.dataIndex]"></a-switch>
                  </template>
                </a-table-column>

                <!-- 插槽列 -->
                <a-table-column v-else-if="col.slotName" v-bind="col">
                  <template #cell="data">
                    <!-- 操作列 -->
                    <div class="col_actions" v-if="col.slotName === 'action'">
                      <slot v-bind="data" name="action_left"></slot>
                      <a-button v-if="!noEdit" type="primary" @click="edit(data.record)">{{ editLabel }}</a-button>
                      <a-popconfirm v-if="!noDelete" @ok="remove(data.record)" content="确定要删除该记录吗？">
                        <a-button type="primary" status="danger">{{ deleteLabel }}</a-button>
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

                <!-- 兜底处理普通列 -->
                <a-table-column v-else v-bind="col" />
              </template>
            </template>
          </a-table>
        </div>

        <!-- 🔹 分页控件 -->
        <div class="f_list_page" v-if="!props.noPage">
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

    .action_group {
      display: flex;
      align-items: center;

      button {
        margin-left: 10px;
      }

    }

    .action_filter {
      .arco-select {
        margin-right: 10px;

        &:last-child {
          margin-right: 0;
        }
      }
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