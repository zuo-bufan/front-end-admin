<!-- /* 
* @Author: zkz    
* @CreateTime: 2025-03-21 14:34:44
* @description: 公共消息弹框组件
*/ -->
<template>
  <el-dialog
    v-model="dialogVisible"
    title="公共消息"
    width="600px"
    center
    @click="closeDialogRefresh"
  >
    <el-container>
      <el-main>
        <!-- 主题 -->
        <div class="title">消息主题：{{ formData.message_title }}</div>
        <!-- 内容 -->
        <div class="content">
          消息内容：
          <div class="content-text" v-html="formData.message_content"></div>
        </div>
      </el-main>
      <el-aside width="200px">
        <div class="publish-msg">
          发布部门：{{ formData.message_publish_department }}
        </div>
        <div class="publish-msg">
          发布人：{{ formData.message_publish_name }}
        </div>
        <div class="publish-msg">类别：{{ formData.message_category }}</div>
        <div class="publish-msg">
          等级：
          <el-tag class="mx-1" v-if="formData.message_level === '一般'" round>{{
            formData.message_level
          }}</el-tag>
          <el-tag
            class="mx-1"
            round
            type="wraning"
            v-if="formData.message_level === '重要'"
            >{{ formData.message_level }}</el-tag
          >
          <el-tag
            class="mx-1"
            round
            type="danger"
            v-if="formData.message_level === '必要'"
            >{{ formData.message_level }}</el-tag
          >
        </div>
        <div class="publish-msg">
          发布时间：{{ formData.message_create_time?.slice(0, 10) }}
        </div>
      </el-aside>
    </el-container>
  </el-dialog>
</template>

<script lang = "ts" setup>
import { reactive, ref } from "vue";
import { bus } from "@/utils/mitt.js";
const dialogVisible = ref(false);
// 公司公告信息
bus.on("cpyid", (row: any) => {
  formData.message_publish_department = row.message_publish_department;
  formData.message_title = row.message_title;
  formData.message_category = row.message_category;
  formData.message_publish_name = row.message_publish_name;
  formData.message_content = row.message_content;
  formData.message_level = row.message_level;
  formData.message_create_time = row.message_create_time;
});
// 系统消息信息
bus.on("sysid", (row: any) => {
  formData.message_publish_department = row.message_publish_department;
  formData.message_title = row.message_title;
  formData.message_category = row.message_category;
  formData.message_publish_name = row.message_publish_name;
  formData.message_content = row.message_content;
  formData.message_level = row.message_level;
  formData.message_create_time = row.message_create_time;
});

const formData = reactive({
  message_publish_department: "",
  message_title: "",
  message_publish_name: "",
  message_category: "",
  message_receipt_object: "",
  message_content: "",
  message_level: "",
  message_create_time: "",
});

const open = () => {
  dialogVisible.value = true;
};
defineExpose({
  open,
});
</script>

<style lang="scss" scoped>
.el-main {
  min-height: 300px;
  --el-main-padding: 20px;
  border-right: 1px solid #eee;
}
.el-aside {
  padding-right: 8px;
}
.title {
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  margin-left: 8px;
  border-bottom: 1px solid #eee;
}
.content {
  padding: 10px;
  font-size: 14px;
  line-height: 24px;
  word-break: break-all;
  .content-text {
    margin-left: 70px;
  }
}
.publish-msg {
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;
  padding: 3px 15px;
}
</style>