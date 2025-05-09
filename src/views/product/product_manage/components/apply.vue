<!-- /* 
* @Author: zkz    
* @CreateTime: 2025-02-24 17:09:35
* @description: 申请出库弹框
*/ -->
<template>
  <el-dialog
    v-model="dialogFormVisible"
    title="申请出库"
    width="400"
    draggable
    @close="cancelOption"
  >
    <div class="product-name">
      您申请出库的产品名称为：<span style="color: red">{{ product_name }}</span>
    </div>
    <div class="product-name">
      产品库存数量为：<span
        :style="{
          color: productStatusColor,
        }"
        >{{ formData.product_inwarehouse_number }}</span
      >
    </div>
    <el-form
      ref="resetRef"
      class="register-form"
      :model="formData"
      label-position="left"
      :rules="rules"
      label-width="120px"
    >
      <el-form-item label="申请出库编号" prop="product_out_id">
        <el-input
          v-model="formData.product_out_id"
          placeholder="请输入申请出库编号"
        ></el-input>
      </el-form-item>
      <el-form-item label="出库数量" prop="product_out_number">
        <el-input
          v-model="formData.product_out_number"
          placeholder="请输入出库数量"
        ></el-input>
      </el-form-item>
      <el-form-item label="出库单价" prop="product_single_price">
        <el-input
          v-model="formData.product_single_price"
          placeholder="请输入出库单价"
          :disabled="true"
        ></el-input>
      </el-form-item>

      <el-form-item label="出库申请人" prop="product_out_apply_person">
        <el-input
          v-model="formData.product_out_apply_person"
          placeholder="请输入出库申请人"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="申请备注" prop="apply_memo">
        <el-input
          v-model="formData.apply_memo"
          placeholder="请输入申请备注"
          type="textarea"
          :rows="2"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelOption">取消</el-button>
        <el-button
          type="primary"
          @click="saveCreateAdmin"
          :disabled="
            formData.product_out_number > formData.product_inwarehouse_number
          "
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, onBeforeUnmount, computed } from "vue";
import { bus } from "@/utils/mitt.js";
import { ElMessage } from "element-plus";
import { applyOutProduct } from "@/api/product.js";
const product_name = ref("");
// 接收产品列表传值
bus.on("applyOutId", (obj: any) => {
  formData.id = obj.id;
  formData.product_inwarehouse_number = obj.product_inwarehouse_number;
  formData.product_single_price = obj.product_single_price;
  product_name.value = obj.product_name;
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
  product_out_apply_person: localStorage.getItem("name"),
  apply_memo: "",
});

const rules = reactive({
  product_out_id: [
    { required: true, message: "请输入申请出库编号", trigger: "blur" },
  ],
  product_single_price: [
    { required: true, message: "请输入出库单价", trigger: "blur" },
  ],
  product_out_number: [
    { required: true, message: "请输入出库数量", trigger: "blur" },
  ],
  product_out_apply_person: [
    { required: true, message: "请输入出库申请人", trigger: "blur" },
  ],
  apply_memo: [{ required: true, message: "请输入申请备注", trigger: "blur" }],
});

// 保存申请出库
const emit = defineEmits(["success"]);
const resetRef = ref();
const saveCreateAdmin = () => {
  resetRef.value.validate(async (valid) => {
    if (valid) {
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
    }
  });
};

const statusColors = {
  low: "#e6a23c",
  medium: "#67c23a",
  high: "#f56c6c",
};

const productStatusColor = computed(() => {
  const number = formData.product_inwarehouse_number || 0;
  if (number < 100) {
    return statusColors.low;
  } else if (number <= 300) {
    return statusColors.medium;
  } else {
    return statusColors.high;
  }
});

// 取消提交操作
const cancelOption = () => {
  dialogFormVisible.value = false;
  resetRef.value.resetFields();
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
.product-name {
  font-size: 15px;
  font-weight: bold;
  margin: 10px 0 20px 30px;
}
</style>