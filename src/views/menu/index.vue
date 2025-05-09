<!-- 
  author: zkz
  @createTime: 2024-08-07 15:51:55
  @Description: 首页菜单页面
 -->
<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <!-- 菜单区域 -->
        <el-menu default-active="1" class="el-menu-vertical-demo" router>
          <div class="title">通用后台管理系统</div>
          <el-menu-item index="home">
            <el-icon>
              <House />
            </el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="overview">
            <el-icon>
              <Document />
            </el-icon>
            <span>系统概览</span>
          </el-menu-item>
          <el-sub-menu index="3">
            <template #title>
              <el-icon>
                <User />
              </el-icon>
              <span>用户管理</span>
            </template>
            <el-menu-item-group title="管理员管理">
              <el-menu-item index="product_manage">产品管理员</el-menu-item>
              <el-menu-item index="users_manage">用户管理员</el-menu-item>
              <el-menu-item index="message_manage">消息管理员</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="员工管理">
              <el-menu-item index="user_list">用户列表</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="4">
            <template #title>
              <el-icon>
                <TakeawayBox />
              </el-icon>
              <span>产品管理</span>
            </template>
            <el-menu-item-group title="入库管理">
              <el-menu-item index="product_list">产品列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="出库管理">
              <el-menu-item index="out_manage">出库列表</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="5">
            <template #title>
              <el-icon>
                <ChatDotSquare />
              </el-icon>
              <span>消息管理</span>
            </template>
            <el-menu-item-group title="消息管理">
              <el-menu-item index="message_list">消息列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="回收站">
              <el-menu-item index="recycle">回收站</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-menu-item index="file">
            <el-icon>
              <Files />
            </el-icon>
            <span>合同管理</span>
          </el-menu-item>
          <el-menu-item index="operation">
            <el-icon>
              <DocumentCopy />
            </el-icon>
            <span>操作日志</span>
          </el-menu-item>
          <el-menu-item index="loginlog">
            <el-icon>
              <Notebook />
            </el-icon>
            <span>登录日志</span>
          </el-menu-item>
          <el-menu-item index="set">
            <el-icon>
              <Tools />
            </el-icon>
            <span>系统设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span class="header-left-content"
            >尊敬的 {{ userStore.name }} 欢迎您登录本系统👼</span
          >
          <div class="header-right-content">
            <el-badge
              :value="msgStore.read_list.length || 0"
              class="item"
              @click="openDepartmentMsgHangdle"
            >
              <el-icon :size="25">
                <Message />
              </el-icon>
            </el-badge>

            <el-avatar :size="24" :src="userStore.imageUrl" />
            <el-dropdown>
              <span class="el-dropdown-link">
                设置
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="goGitee('前端')"
                    >前端代码仓库</el-dropdown-item
                  >
                  <el-dropdown-item @click="goGitee('后端')"
                    >后端代码仓库</el-dropdown-item
                  >
                  <!-- <el-dropdown-item>设置账号</el-dropdown-item> -->
                  <!-- <el-dropdown-item>更改头像</el-dropdown-item> -->
                  <el-dropdown-item @click="loginout"
                    >退出登录</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <DepartmentMsg
      ref="departmentmsgRef"
      @success="getNotReadList"
    ></DepartmentMsg>
  </div>
</template>

<script lang="ts" setup>
import { Menu as IconMenu } from "@element-plus/icons-vue";
import { reactive, toRefs, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserInfor } from "@/store/userinfor.js";
import { CaretBottom } from "@element-plus/icons-vue";
import DepartmentMsg from "@/components/department_msg.vue";
import { getReadListAndStatus } from "@/api/dep_msg.js";
import { useUnreadMessage } from "@/store/unreadmessage.js";
// store
const userStore = useUserInfor();
const msgStore = useUnreadMessage();

const router = useRouter();
// 退出登录
const loginout = () => {
  // 清除所有本地存储
  localStorage.clear();
  sessionStorage.clear();
  router.push("/login");
};
// 跳转到代码仓库
const goGitee = (type: string) => {
  if (type === "前端") {
    window.open("https://gitee.com/zuo-bufan/front-end-admin");
  } else if (type === "后端") {
    window.open("https://gitee.com/zuo-bufan/vue-zkz-admin");
  }
};
// 获取未读消息列表长度
// const notReadListLength = ref(0);
const getNotReadList = async () => {
  msgStore.getUnreadMessage(sessionStorage.getItem("id"));
};
getNotReadList();

//打开消息弹框
const departmentmsgRef = ref();
const openDepartmentMsgHangdle = () => {
  departmentmsgRef.value.open();
};
</script>

<style lang="scss" scoped>
.el-aside {
  height: 100vh;
  background-color: #2b303b;
  width: 210px;
  overflow-x: hidden;

  .el-menu {
    background-color: #2b303b;
    width: 210px;
    height: 100vh;
    border-right: 0;
  }

  .title {
    padding: 20px;
    display: flex;
    justify-content: center;
    color: #fff;
    background-color: #2b303b;
  }

  .el-menu-item {
    color: #fff;
  }
}

.el-header {
  display: flex;
  height: 55px;
  background-color: #2b303b;
  color: #c1c6c8;
  justify-content: space-between;
  align-items: center;

  .header-left-content {
    font-size: 14px;
  }

  .header-right-content {
    width: 160px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    * {
      cursor: pointer;
    }
  }
}

.el-main {
  --el-main-padding: 0;
  background: #f3f4fa;
}

.el-menu-item:hover {
  background: #006eff;
}

:deep(.el-sub-menu__title:hover) {
  background: #006eff;
}

:deep(.el-sub-menu__title) {
  color: #fff;
}

:deep(.el-menu--inline) {
  background-color: #2b303b;
}
.item {
  margin-top: 10px;
  margin-right: 30px;
}
</style>