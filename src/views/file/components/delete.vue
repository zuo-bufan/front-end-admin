<template>
  <el-dialog v-model="dialogVisible" :title="title" width="30%">
    <span class="dialog-content">您确定要 <b> 删除 </b>该文件吗？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="optionsMessage"> 确定 </el-button>
        <el-button @click="closeDialog"> 取消 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, ref } from "vue";
import { bus } from "@/utils/mitt.js";
import { deleteFile } from "@/api/file.js";
import { ElMessage } from "element-plus";
import { operationLog } from "@/api/log.js";
const dialogVisible = ref(false);
const title = ref();
const fileid = ref();

bus.on("deleteID", (id: number) => {
  fileid.value = id;
  title.value = "删除文件";
});

const emit = defineEmits(["deleteSuccess"]);
const optionsMessage = async () => {
  const res = await deleteFile(fileid.value);
  if (res.status === 0) {
    dialogVisible.value = false;
    ElMessage({
      message: "删除成功",
      type: "success",
    });
    await operationLog({
      operation_person: localStorage.getItem("name"),
      operation_content: "删除合同管理文件",
      operation_level: 3,
    });
    emit("deleteSuccess");
  }
};

const closeDialog = () => {
  dialogVisible.value = false;
  ElMessage({
    message: "取消删除",
    type: "info",
  });
};

const open = () => {
  dialogVisible.value = true;
};

defineExpose({ open });

onBeforeUnmount(() => {
  bus.all.clear();
});
</script>

<style lang="scss" scoped>
.dialog-content {
  display: block;
  padding: 20px;
}
</style>