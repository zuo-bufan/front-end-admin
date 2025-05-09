<!-- 
  * @Author: zkz    
  * @CreateTime: 2025-02-25 16:09:32
  * @Description: 审核产品弹框组件
 -->
<template>
  <el-dialog
    v-model="dialogFormVisible"
    title="审核产品"
    width="400"
    draggable
    @close="cancelOption"
  >
    <el-form
      ref="resetRef"
      class="register-form"
      :model="formData"
      label-position="left"
      :rules="rules"
    >
      <div>
        <div style="margin: 10px 0px">确定审核此产品的出库吗？</div>
        <div style="margin: 10px 0px">
          <el-radio-group
            v-model="formData.product_out_status"
            @change="changeStatus"
          >
            <el-radio value="同意" size="large">同意</el-radio>
            <el-radio value="否决" size="large">否决</el-radio>
          </el-radio-group>
        </div>
      </div>
      <el-input
        v-model="formData.audit_memo"
        placeholder="请输入审核备注"
        type="textarea"
        :rows="3"
      ></el-input>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelOption">取消</el-button>
        <el-button type="primary" @click="saveCreateAdmin">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, onBeforeUnmount } from "vue";
import { bus } from "@/utils/mitt.js";
import { ElMessage } from "element-plus";
import { auditProduct } from "@/api/product.js";

// 监听事件
bus.on("auditProductId", (row: any) => {
  formData.id = row.id;
  formData.product_out_id = row.product_out_id;
  formData.product_out_number = row.product_out_number;
  formData.product_single_price = row.product_single_price;
  formData.product_out_audit_person = localStorage.getItem("name");
  formData.product_out_apply_person = row.product_out_apply_person;
  formData.product_out_status = row.product_out_status;
  formData.product_inwarehouse_number = row.product_inwarehouse_number;
});
// 弹框开关
const dialogFormVisible = ref(false);
interface formData {
  id: number;
  product_out_id: number;
  product_out_number: number;
  product_single_price: number;
  product_out_audit_person: string;
  product_out_apply_person: string;
  product_out_status: string;
  product_inwarehouse_number: number;
  audit_memo: string;
}
const formData = reactive({
  id: 0,
  product_out_id: 0,
  product_out_number: 0,
  product_single_price: 0,
  product_out_audit_person: "",
  product_out_apply_person: "",
  product_out_status: "",
  product_inwarehouse_number: 0,
  audit_memo: "",
});
const rules = reactive({
  // audit_memo: [{ required: true, message: "请输入审核备注", trigger: "blur" }],
});
const changeStatus = (val: string) => {
  formData.product_out_status = val;
};

// 保存添加的数据
const emit = defineEmits(["success"]);
const resetRef = ref();
const saveCreateAdmin = () => {
  resetRef.value.validate(async (valid) => {
    if (valid) {
      const res = await auditProduct(formData);
      dialogFormVisible.value = false;
      if (res.status == 0) {
        ElMessage({
          message: res.message,
          type: "success",
        });
        emit("success");
      } else {
        ElMessage.error("审核产品失败");
      }
    }
  });
};

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
</style>