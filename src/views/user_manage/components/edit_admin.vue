<!-- 
  author: zkz
  @createTime: 2024-09-10 09:55:46
  @Description: 编辑管理员信息
 -->
<template>
  <el-dialog
    v-model="dialogFormVisible"
    title="编辑管理员信息"
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
          disabled
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
            v-for="item in departmentData"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelOption">取消</el-button>
        <el-button type="primary" @click="saveAdmin">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, onBeforeUnmount } from "vue";
import { ElMessage } from "element-plus";
import { bus } from "@/utils/mitt.js";
import { getUserInfor, editAdmin } from "@/api/userinfor.js";
import { getDepartment } from "@/api/setting.js";
import { tracking } from "@/utils/operation";
bus.on("editTitle", async (id: number) => {
  const res = await getUserInfor(id);
  formData.id = res.id;
  formData.account = res.account;
  formData.name = res.name;
  formData.sex = res.sex;
  formData.email = res.email;
  formData.department = res.department;
});
// 弹框开关
const dialogFormVisible = ref(false);
interface formData {
  id?: number;
  account: number;
  name: string;
  sex: string;
  email: string;
  department: string;
}
const formData = reactive({
  id: null,
  account: null,
  name: "",
  sex: "",
  email: "",
  department: "",
});

const rules = reactive({
  name: [{ required: true, message: "请输入要修改的姓名", trigger: "blur" }],
  sex: [{ required: true, message: "请输入要修改的性别", trigger: "blur" }],
  email: [{ required: true, message: "请输入要修改的邮箱", trigger: "blur" }],
  department: [
    { required: true, message: "请输入要修改的部门", trigger: "blur" },
  ],
});

// 保存修改信息
const emit = defineEmits(["success"]);
const resetRef = ref();
const saveAdmin = () => {
  resetRef.value.validate(async (valid) => {
    if (valid) {
      const res = await editAdmin(formData);
      dialogFormVisible.value = false;
      if (res.status == 0) {
        ElMessage({
          message: res.message,
          type: "success",
        });
        tracking("修改", localStorage.getItem("name"), formData.name, 1);
        emit("success");
      } else {
        ElMessage.error("修改失败");
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