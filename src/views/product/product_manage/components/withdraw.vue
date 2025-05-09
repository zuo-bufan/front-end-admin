<!-- 
 * @Author: zkz    
 * @CreateTime: 2025-03-11 08:56:56
 * @Description: 审核产品弹框组件
 -->
<template>
  <el-dialog
    v-model="dialogFormVisible"
    title="撤销申请"
    width="400"
    draggable
    @close="cancelOption"
  >
    <div>
      <div style="margin: 10px 0px">确定取消此产品的出库申请吗？</div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelOption">取消</el-button>
        <el-button type="primary" @click="saveWithdraw">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, onBeforeUnmount } from "vue";
import { bus } from "@/utils/mitt.js";
import { ElMessage } from "element-plus";
import { withdrawApplyProduct } from "@/api/product.js";

const withdrawId = ref(0);
// 监听事件
bus.on("withdrawauditId", (id: number) => {
  withdrawId.value = id;
});
// 弹框开关
const dialogFormVisible = ref(false);

// 撤销申请
const emit = defineEmits(["success"]);
const saveWithdraw = async () => {
  const res = await withdrawApplyProduct(withdrawId.value);
  dialogFormVisible.value = false;
  if (res.status == 0) {
    ElMessage({
      message: res.message,
      type: "success",
    });
    emit("success");
  } else {
    ElMessage.error("撤销申请失败");
  }
};

// 取消提交操作
const cancelOption = () => {
  dialogFormVisible.value = false;
};

// 打开弹框
const open = () => {
  dialogFormVisible.value = true;
};
// 对外暴露
defineExpose({
  open,
});
// 取消订阅/监听
onBeforeUnmount(() => {
  bus.all.clear();
});
</script>

<style lang="scss" scoped>
.register-form {
  padding: 0px 30px;
}
</style>