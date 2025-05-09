<template>
  <el-dialog v-model="dialogVisible" :title="title" width="30%">
    <span class="dialog-content" v-if="title === '恢复公告'"
      >您确定要 <b> 恢复 </b>该公告吗？</span
    >
    <span class="dialog-content" v-else-if="title === '彻底删除公告'"
      >请谨慎操作，您确定要 <b> 彻底删除 </b>该公告吗？</span
    >
    <span class="dialog-content" v-else>您确定要 <b> 删除 </b>该公告吗？</span>
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
import { changeUserReadList, changeUserReadListButDel } from "@/api/dep_msg.js";
import {
  firstDeleteMessage,
  restoreMessage,
  deleteMessage,
} from "@/api/message";
import { operationLog } from "@/api/log.js";
import { ElMessage } from "element-plus";
import { tracking } from "@/utils/operation.js";
import { useUnreadMessage } from "@/store/unreadmessage.js";
const msgStore = useUnreadMessage();
const dialogVisible = ref(false);
const title = ref();
const messageid = ref();
const department = ref();
bus.on("deleteMessage", (obj: any) => {
  messageid.value = obj.id;
  department.value = obj.message_receipt_object;
  title.value = obj.name;
});
bus.on("restoreID", (row: any) => {
  messageid.value = row.id;
  department.value = row.message_receipt_object;
  title.value = "恢复公告";
});
bus.on("deleteID", (id: number) => {
  messageid.value = id;
  title.value = "彻底删除公告";
});

const emit = defineEmits([
  "deleteCompanySuccess",
  "deleteSystemSuccess",
  "Success",
]);
const optionsMessage = async () => {
  if (title.value === "恢复公告") {
    const res = await restoreMessage(messageid.value);
    if (res.status === 0) {
      dialogVisible.value = false;
      ElMessage({
        message: "恢复公告成功",
        type: "success",
      });
      tracking("恢复公告", localStorage.getItem("name"), "恢复消息公告", 1);
      await changeUserReadList(department.value, messageid.value);
      msgStore.getUnreadMessage(sessionStorage.getItem("id"));
      emit("Success");
    }
  } else if (title.value === "彻底删除公告") {
    const res = await deleteMessage(messageid.value);
    if (res.status === 0) {
      dialogVisible.value = false;
      ElMessage({
        message: "删除成功",
        type: "success",
      });
      tracking(
        "彻底删除公告",
        localStorage.getItem("name"),
        "彻底删除消息公告",
        3
      );
      emit("Success");
    }
  } else {
    const res = await firstDeleteMessage(messageid.value);
    await changeUserReadListButDel(messageid.value, department.value);
    msgStore.getUnreadMessage(sessionStorage.getItem("id"));
    if (res.status === 0) {
      dialogVisible.value = false;
      ElMessage({
        message: "删除成功",
        type: "success",
      });
      if (title.value === "公司公告删除") {
        emit("deleteCompanySuccess");
        tracking(
          "公司公告删除",
          localStorage.getItem("name"),
          "公司公告删除",
          3
        );
      } else if (title.value === "系统公告删除") {
        tracking(
          "系统公告删除",
          localStorage.getItem("name"),
          "系统公告删除",
          3
        );
        emit("deleteSystemSuccess");
      }
    }
  }
};

const closeDialog = () => {
  dialogVisible.value = false;
  if (title.value === "恢复公告") {
    ElMessage({
      message: "取消恢复",
      type: "info",
    });
  } else {
    ElMessage({
      message: "取消删除",
      type: "info",
    });
  }
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