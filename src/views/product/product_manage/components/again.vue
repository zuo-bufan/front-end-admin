<!-- /* 
* @Author: zkz    
* @CreateTime: 2025-03-11 09:47:54
* @description: 再次申请出库
*/ -->
<template>
  <el-dialog
    v-model="dialogFormVisible"
    title="再次申请"
    width="400"
    draggable
    @close="cancelOption"
  >
    <div>
      <div style="margin: 10px 0px">请确认，此操作将再次申请产品出库</div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelOption">取消</el-button>
        <el-button type="primary" @click="saveAgainApply">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, onBeforeUnmount } from "vue";
import { bus } from "@/utils/mitt.js";
import { ElMessage } from "element-plus";
import { applyOutProduct } from "@/api/product.js";

// 监听事件
bus.on("aginApplyid", (row: any) => {
  formData.id = row.id;
  formData.product_out_id = row.product_out_id;
  formData.product_inwarehouse_number = row.product_inwarehouse_number;
  formData.product_single_price = row.product_single_price;
  formData.product_out_number = row.product_out_number;
  formData.product_out_apply_person = row.product_out_apply_person;
  formData.apply_memo = row.apply_memo;
});
// 弹框开关
const dialogFormVisible = ref(false);
interface formData {
  id: number;
  product_out_id: number;
  product_inwarehouse_number: number;
  product_single_price: number;
  product_out_number: number;
  product_out_apply_person: string;
  apply_memo: string;
}
const formData = reactive({
  id: null,
  product_out_id: null,
  product_inwarehouse_number: null,
  product_single_price: null,
  product_out_number: null,
  product_out_apply_person: "",
  apply_memo: "",
});

// 撤销申请
const emit = defineEmits(["success"]);
const saveAgainApply = async () => {
  const res = await applyOutProduct(formData);
  dialogFormVisible.value = false;
  if (res.status == 0) {
    ElMessage({
      message: res.message,
      type: "success",
    });
    emit("success");
  } else {
    ElMessage.error("申请出库失败");
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