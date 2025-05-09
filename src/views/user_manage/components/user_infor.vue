<!-- 
  author: zkz
  @createTime: 2024-10-11 16:14:35
  @Description: 用户信息弹框显示页面
 -->
<template>
  <el-dialog
    v-model="dialogUserVisible"
    title="用户信息"
    width="500px"
    center
    draggable
  >
    <el-container>
      <el-aside width="200px">
        <el-avatar
          shape="square"
          :size="120"
          :src="userData.imageUrl"
        ></el-avatar>
      </el-aside>
      <el-main>
        <div>账号：{{ userData.account }}</div>
        <div>姓名：{{ userData.name }}</div>
        <div>性别：{{ userData.sex }}</div>
        <div>部门：{{ userData.department }}</div>
        <div>邮箱：{{ userData.email }}</div>
        <div>
          状态：
          <span v-if="userData.status == 0" class="green">正常</span>
          <span v-else class="red">冻结</span>
        </div>
      </el-main>
    </el-container>
    <el-footer>
      <span @click="editUser(userData.id)">编辑</span>
      <span @click="goPromote(userData.id, userData.name)">赋权</span>
      <span @click="delOption(userData.id, userData.account)">删除用户</span>
    </el-footer>
  </el-dialog>
  <promote ref="promoteRef"></promote>
  <edit ref="editRef"></edit>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref } from "vue";
import promote from "./promote.vue";
import edit from "./edit_user.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { deleteUser } from "@/api/userinfor.js";
import { bus } from "@/utils/mitt.js";
import { tracking } from "@/utils/operation";
// 控制弹框显示
const dialogUserVisible = ref(false);
bus.on("userId", (row: any) => {
  // console.log(row);
  userData.id = row.id;
  userData.account = row.account;
  userData.name = row.name;
  userData.sex = row.sex;
  userData.email = row.email;
  userData.department = row.department;
  userData.status = row.status;
  userData.imageUrl = row.image_url;
});
// 赋权成功后关闭
bus.on("offDialog", (id: number) => {
  if (id == 1) {
    dialogUserVisible.value = false;
  }
});
// 编辑成功后关闭
bus.on("edituserId", (id: number) => {
  if (id == 2) {
    dialogUserVisible.value = false;
  }
});

interface userData {
  id: number;
  account: number;
  name: string;
  sex: string;
  email: string;
  department: string;
  status: number;
  imageUrl: string;
}
// 用户信息存储数据
const userData = reactive({
  id: 0,
  account: 0,
  name: "",
  sex: "",
  email: "",
  department: "",
  status: 0,
  imageUrl: "",
});

// 打开赋权弹框
const promoteRef = ref();
const goPromote = (id: number, name: string) => {
  let obj = { id: id, name: name };
  bus.emit("promoteId", obj);
  promoteRef.value.open();
};
// 打开编辑弹框
const editRef = ref();
const editUser = (id: number) => {
  bus.emit("editId", id);
  editRef.value.open();
};

// 删除管理员
const emit = defineEmits(["success"]);
const delOption = (id, account) => {
  dialogUserVisible.value = false;
  ElMessageBox.confirm("是否永久删除该条数据?", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      const res = await deleteUser(id, account);
      ElMessage({
        type: "success",
        message: "删除成功",
      });
      tracking("删除", localStorage.getItem("name"), userData.name, 3);
      emit("success");
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消删除",
      });
      dialogUserVisible.value = true;
    });
};

// 打开弹框
const open = () => {
  dialogUserVisible.value = true;
};
//向外暴露
defineExpose({
  open,
});
</script>

<style lang="scss" scoped>
.el-main {
  --el-main-padding: 0;

  div {
    margin-bottom: 8px;
  }
}

.el-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
  --el-footer-height: 40px;

  span {
    margin-left: 8px;
    color: #409eff;
    cursor: pointer;
  }
}

.green {
  color: green;
}

.red {
  color: red;
}
</style>