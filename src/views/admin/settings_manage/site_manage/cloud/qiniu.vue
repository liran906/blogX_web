<script setup lang="ts">
// M
import F_site from "@/components/admin/site/f_site.vue";
import F_title from "@/components/common/f_title.vue";
import type {aiResponse, emailResponse, cloudResponse} from "@/api/site_api";
import F_image_upload from "@/components/common/f_image_upload.vue";
</script>

<template>
  <div class="ai_view">
    <a-row>
      <a-col :span="8">
        <f_site name="cloud" v-slot="{form}:{form: cloudResponse}">
          <f_title>对象存储设置设置</f_title>
          <div class="body">
            <a-form :label-col-props="{span: 4}" :wrapper-col-props="{span: 20}">
              <a-form-item label="服务商">
                <a href="https://www.qiniu.com/" target="_blank">七牛云</a>
              </a-form-item>
              <a-form-item label="是否启用">
                <a-switch v-model="form.qny.enable"></a-switch>
              </a-form-item>
              <a-form-item label="同步本地">
                <a-switch v-model="form.qny.localSave"></a-switch>
              </a-form-item>
              <a-form-item label="accessKey">
                <a-input placeholder="accessKey" v-model="form.qny.accessKey"></a-input>
              </a-form-item>
              <a-form-item label="secretKey">
                <a-input placeholder="secretKey" type="password" v-model="form.qny.secretKey"></a-input>
              </a-form-item>
              <a-form-item label="存储桶">
                <a-input placeholder="bucket" v-model="form.qny.bucket"></a-input>
              </a-form-item>
              <a-form-item label="访问uri">
                <a-input placeholder="uri" v-model="form.qny.uri"></a-input>
                <template #help>
                  一般是你的协议加你的域名 如：http://image.domain.com
                </template>
              </a-form-item>
              <a-form-item label="地区">
                <a-input placeholder="region" v-model="form.qny.region"></a-input>
                <template #help>
                  参考 <a href="https://blog.csdn.net/Coin_Collecter/article/details/129813929" target="_blank">七牛云的对象存储区域和访问域名对应表</a>
                </template>
              </a-form-item>
              <a-form-item label="上传目录">
                <a-input placeholder="prefix" v-model="form.qny.prefix"></a-input>
              </a-form-item>
              <a-form-item label="大小限制">
                <a-input-number placeholder="大小限制" v-model="form.qny.size"></a-input-number>
                <template #help>
                  单位MB
                </template>
              </a-form-item>
              <!--              <a-form-item label="过期时间">-->
              <!--                <a-input-number placeholder="过期时间" v-model="form.qny.expiry"></a-input-number>-->
              <!--                <template #help>-->
              <!--                  用于生成客户端上传凭证的过期时间，单位秒-->
              <!--                </template>-->
              <!--              </a-form-item>-->
              <div class="site_update_btn"></div>
            </a-form>
          </div>
        </f_site>
      </a-col>
    </a-row>

  </div>
</template>