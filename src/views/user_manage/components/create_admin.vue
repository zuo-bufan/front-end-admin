<!-- 
  author: zkz
  @createTime: 2024-09-09 11:22:21
  @Description: 创建管理员组件
 -->
<template>
  <el-dialog
    v-model="dialogFormVisible"
    :title="title"
    width="400"
    draggable
    @close="cancelOption"
  >
    <el-form
      ref="resetRef"
      class="register-form"
      :model="formData"
      :rules="rules"
    >
      <el-form-item label="账号" prop="account">
        <el-input
          v-model="formData.account"
          placeholder="请输入管理员账号"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="formData.password"
          placeholder="请输入管理员密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input
          v-model="formData.name"
          placeholder="请输入管理员姓名"
        ></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="formData.sex" placeholder="请选择性别">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input
          v-model="formData.email"
          placeholder="请输入管理员邮箱"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门" prop="department">
        <el-select v-model="formData.department" placeholder="请选择部门">
          <el-option
            v-for="(item, index) in departmentData"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
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
import { createAdmin } from "@/api/userinfor";
import { getDepartment } from "@/api/setting.js";
import { tracking } from "@/utils/operation";
const title = ref("");
bus.on("createTitle", (id: number) => {
  if (id == 1) {
    title.value = "新建产品管理员";
    formData.identity = "产品管理员";
  } else if (id == 2) {
    title.value = "新建用户管理员";
    formData.identity = "用户管理员";
  } else if (id == 3) {
    title.value = "新建消息管理员";
    formData.identity = "消息管理员";
  }
});
// 弹框开关
const dialogFormVisible = ref(false);
interface formData {
  account: number;
  password: string;
  name: string;
  sex: string;
  email: string;
  department: string;
  identity: string;
}
const formData = reactive({
  account: null,
  password: "",
  name: "",
  sex: "",
  email: "",
  department: "",
  identity: "",
});

const rules = reactive({
  account: [{ required: true, message: "请输入管理员的账号", trigger: "blur" }],
  password: [
    { required: true, message: "请输入管理员的密码", trigger: "blur" },
  ],
  name: [{ required: true, message: "请输入管理员的姓名", trigger: "blur" }],
  sex: [{ required: true, message: "请输入管理员的性别", trigger: "blur" }],
  email: [{ required: true, message: "请输入管理员的邮箱", trigger: "blur" }],
  department: [
    { required: true, message: "请输入管理员的部门", trigger: "blur" },
  ],
});

// 保存添加的数据
const emit = defineEmits(["success"]);
const resetRef = ref();
const saveCreateAdmin = () => {
  resetRef.value.validate(async (valid) => {
    if (valid) {
      const res = await createAdmin(formData);
      dialogFormVisible.value = false;
      if (res.status == 0) {
        ElMessage({
          message: res.message,
          type: "success",
        });
        tracking("新增", localStorage.getItem("name"), formData.name, 2);
        emit("success");
      } else {
        ElMessage.error("创建失败");
      }
    }
  });
};

// 取消提交操作
const cancelOption = () => {
  dialogFormVisible.value = false;
  resetRef.value.resetFields();
};

// 获取项目选择列表
const departmentData = ref([]);
const getdepartment = async () => {
  departmentData.value = await getDepartment();
};
getdepartment();
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
  padding: 20px 30px;
}
</style>