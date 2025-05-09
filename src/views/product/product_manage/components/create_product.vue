<!-- 
  author: zkz
  @createTime: 2024-11-01 16:02:23
  @Description: 创建产品组件
 -->
<template>
  <el-dialog
    v-model="dialogFormVisible"
    title="创建产品"
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
      label-width="100px"
    >
      <el-form-item label="入库编号" prop="product_id">
        <el-input
          v-model="formData.product_id"
          placeholder="请输入入库编号"
        ></el-input>
      </el-form-item>
      <el-form-item label="产品名称" prop="product_name">
        <el-input
          v-model="formData.product_name"
          placeholder="请输入产品名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="产品类别" prop="product_category">
        <el-select
          v-model="formData.product_category"
          placeholder="请选择产品类别"
        >
          <el-option
            v-for="(item, index) in categoryData"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="单位" prop="product_unit">
        <el-select v-model="formData.product_unit" placeholder="请选择单位">
          <el-option label="个" value="个"></el-option>
          <el-option label="包" value="包"></el-option>
          <el-option label="盒" value="盒"></el-option>
          <el-option label="条" value="条"></el-option>
          <el-option label="只" value="只"></el-option>
          <el-option label="支" value="支"></el-option>
          <el-option label="毫升" value="毫升"></el-option>
          <el-option label="升" value="升"></el-option>
          <el-option label="斤" value="斤"></el-option>
          <el-option label="两" value="两"></el-option>
          <el-option label="张" value="张"></el-option>
          <el-option label="套" value="套"></el-option>
          <el-option label="箱" value="箱"></el-option>
          <el-option label="桶" value="桶"></el-option>
          <el-option label="盆" value="盆"></el-option>
          <el-option label="杯" value="杯"></el-option>
          <el-option label="棵" value="棵"></el-option>
          <el-option label="根" value="根"></el-option>
          <el-option label="片" value="片"></el-option>
          <el-option label="颗" value="颗"></el-option>
          <el-option label="盏" value="盏"></el-option>
          <el-option label="把" value="把"></el-option>
          <el-option label="条" value="条"></el-option>
          <el-option label="颗" value="颗"></el-option>
          <el-option label="盒" value="盒"></el-option>
          <el-option label="箱" value="箱"></el-option>
          <el-option label="盆" value="盆"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="库存数量" prop="product_inwarehouse_number">
        <el-input
          v-model="formData.product_inwarehouse_number"
          placeholder="请输入库存数量"
        ></el-input>
      </el-form-item>
      <el-form-item label="产品单价" prop="product_single_price">
        <el-input
          v-model="formData.product_single_price"
          placeholder="请输入产品单价"
        ></el-input>
      </el-form-item>
      <el-form-item label="入库操作人" prop="product_create_person">
        <el-input
          v-model="formData.product_create_person"
          placeholder="请输入入库操作人"
        ></el-input>
      </el-form-item>
      <el-form-item label="入库备注" prop="in_memo">
        <el-input
          v-model="formData.in_memo"
          placeholder="请输入入库备注"
          type="textarea"
          :rows="2"
        ></el-input>
      </el-form-item>
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
import { createProduct } from "@/api/product.js";
import { getProduct } from "@/api/setting.js";
const title = ref("");
bus.on("createProductId", (id: number) => {});
// 弹框开关
const dialogFormVisible = ref(false);
interface formData {
  product_id: number;
  product_name: string;
  product_category: string;
  product_unit: string;
  product_inwarehouse_number: number;
  product_single_price: number;
  product_create_person: string;
  in_memo: string;
}
const formData = reactive({
  product_id: null,
  product_name: "",
  product_category: "",
  product_unit: "",
  product_inwarehouse_number: null,
  product_single_price: null,
  product_create_person: "",
  in_memo: "",
});

const rules = reactive({
  product_id: [{ required: true, message: "请输入入库编号", trigger: "blur" }],
  product_name: [
    { required: true, message: "请输入产品名称", trigger: "blur" },
  ],
  product_category: [
    { required: true, message: "请输入产品类别", trigger: "blur" },
  ],
  product_unit: [{ required: true, message: "请输入单位", trigger: "blur" }],
  product_inwarehouse_number: [
    { required: true, message: "请输入库存数量", trigger: "blur" },
  ],
  product_single_price: [
    { required: true, message: "请输入产品单价", trigger: "blur" },
  ],
  product_create_person: [
    { required: true, message: "请输入入库操作人", trigger: "blur" },
  ],
  in_memo: [{ required: true, message: "请输入入库备注", trigger: "blur" }],
});

// 保存添加的数据
const emit = defineEmits(["success"]);
const resetRef = ref();
const saveCreateAdmin = () => {
  resetRef.value.validate(async (valid) => {
    if (valid) {
      const res = await createProduct(formData);
      dialogFormVisible.value = false;
      if (res.status == 0) {
        ElMessage({
          message: res.message,
          type: "success",
        });
        emit("success");
      } else {
        ElMessage.error("创建失败");
      }
    }
  });
};

// 获取产品类别数据
const categoryData = ref([]);
const getProductCategory = async () => {
  categoryData.value = await getProduct();
};

// 取消提交操作
const cancelOption = () => {
  dialogFormVisible.value = false;
  resetRef.value.resetFields();
};

// 打开弹框
const open = () => {
  dialogFormVisible.value = true;
  getProductCategory();
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