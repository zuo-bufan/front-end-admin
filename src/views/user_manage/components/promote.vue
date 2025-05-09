<!-- 
  author: zkz
  @createTime: 2024-10-11 17:12:04
  @Description: 赋权处理页面
 -->
<template>
  <el-dialog
    v-model="dialogPromoteVisible"
    title="赋权操作"
    width="500px"
    center
    draggable
  >
    <el-radio-group v-model="radio" class="group_radio">
      <el-radio value="产品管理员" size="large">产品管理员</el-radio>
      <el-radio value="用户管理员" size="large">用户管理员</el-radio>
      <el-radio value="消息管理员" size="large">消息管理员</el-radio>
    </el-radio-group>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogPromoteVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmPromote">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { bus } from "@/utils/mitt.js";
import { changeIdentityToAdmin } from "@/api/userinfor.js";
import { ElMessage } from "element-plus";
import { tracking } from "@/utils/operation";
const userid = ref();
const name = ref();
bus.on("promoteId", (obj: any) => {
  userid.value = obj.id;
  name.value = obj.name;
});
const radio = ref();

// 确定赋权
const confirmPromote = async () => {
  dialogPromoteVisible.value = false;
  const res = await changeIdentityToAdmin(userid.value, radio.value);
  if (res.status == 0) {
    ElMessage({
      message: res.message,
      type: "success",
    });
    tracking("赋权", localStorage.getItem("name"), name.value, 3);
    bus.emit("offDialog", 1);
  } else {
    ElMessage.error(res.message);
  }
};

// 控制弹框显示
const dialogPromoteVisible = ref(false);
// 打开弹框
const open = () => {
  dialogPromoteVisible.value = true;
};
//向外暴露
defineExpose({
  open,
});
</script>

<style lang="scss" scoped>
.group_radio {
  display: flex;
  justify-content: center;
}
</style>