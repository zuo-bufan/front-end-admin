<!-- 
  author: zkz
  @createTime: 2024-08-21 16:59:36
  @Description: 用户修改密码弹框组件
 -->
<template>
  <!-- 修改密码 -->
  <el-dialog
    v-model="state.changePasswordDialog"
    draggable
    width="400"
    title="修改密码"
  >
    <el-form
      ref="resetRef"
      class="register-form"
      :model="changePasswordData"
      :rules="forgetRules"
      :label-position="labelPosition"
    >
      <el-form-item label="请输入您的原密码" prop="oldPassword">
        <el-input
          v-model="changePasswordData.oldPassword"
          show-password
          placeholder="请输入您的原密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="请输入您的新密码" prop="newPassword">
        <el-input
          v-model="changePasswordData.newPassword"
          show-password
          placeholder="请输入您的新密码"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="state.changePasswordDialog = false">取消</el-button>
        <el-button type="primary" @click="goSavePassword">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { changePassword } from "@/api/userinfor.js";
import { operationLog } from "@/api/log.js";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
const router = useRouter();
// 表单定位top
const labelPosition = ref("top");
// 表单对象接口
interface changePasswordData {
  oldPassword: string;
  newPassword: string;
}
// 表单验证规则
const forgetRules = reactive({
  oldPassword: [
    { required: true, message: "请输入您的原密码", trigger: "blur" },
  ],
  newPassword: [
    { required: true, message: "请输入您的新密码", trigger: "blur" },
  ],
});
// 表单对象
const changePasswordData: changePasswordData = reactive({
  oldPassword: "",
  newPassword: "",
});
// 控制=弹窗 默认关闭
const state = reactive({
  changePasswordDialog: false,
});
// 打开弹框
const open = () => {
  state.changePasswordDialog = true;
};
// 确认修改密码 重置密码
const resetRef = ref();
const goSavePassword = async () => {
  resetRef.value.validate(async (valid, fields) => {
    if (valid) {
      if (changePasswordData.oldPassword && changePasswordData.newPassword) {
        const res = await changePassword(
          sessionStorage.getItem("id"),
          changePasswordData.oldPassword,
          changePasswordData.newPassword
        );
        // console.log(res);
        if (res.status == 0) {
          ElMessage({
            message: "修改成功",
            type: "success",
          });
          await operationLog({
            operation_person: localStorage.getItem("name"),
            operation_content: "修改密码",
            operation_level: 3,
          });
          state.changePasswordDialog = false;
          resetRef.value.resetFields();
          router.push("/login");
        } else {
          ElMessage.error("修改失败，请检查数据是否正确");
        }
      } else {
        ElMessage.error("请检查输入的密码");
      }
    }
  });
};
// 对外暴露
defineExpose({
  open,
});
</script>

<style lang="scss" scoped>
</style>