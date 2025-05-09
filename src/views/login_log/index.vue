<!-- /* 
* @Author: zkz    
* @CreateTime: 2025-02-14 10:45:52
*/ -->
<template>
  <div>
    <!-- 头部面包屑 -->
    <breadCrumb ref="breadcrumb" :item="item"></breadCrumb>
    <div class="table-wrapped">
      <!-- 顶部 -->
      <div class="table-top">
        <!-- 表格顶部 -->
        <div class="table-header">
          <div class="left-wrapped">
            <div class="search-wrapped">
              <el-input
                v-model="searchInput"
                style="width: 200px"
                placeholder="输入账号进行搜索"
                :suffix-icon="Search"
                @change="handleSearchChange"
              />
            </div>
          </div>
          <div class="button-wrapped">
            <el-button type="primary" @click="handletrancate"
              >清空登录日志</el-button
            >
          </div>
        </div>
        <div class="table-content">
          <el-table :data="tableData" style="width: 100%" border>
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="account" label="账号"></el-table-column>
            <el-table-column prop="name" label="姓名"> </el-table-column>
            <el-table-column prop="email" label="邮箱"> </el-table-column>
            <el-table-column prop="login_time" label="登录时间" width="200">
              <template #default="scope">
                {{ scope.row.login_time.slice(0, 19) }}
              </template>
            </el-table-column>
          </el-table>
          <!-- 底部 -->
          <div class="table-footer">
            <el-pagination
              :page-size="1"
              :pager-count="7"
              :current-page="paginationData.loginCurrentPage"
              :page-count="paginationData.loginPageCount"
              layout="total, prev, pager, next"
              :total="loginListTotal"
              @current-change="fileCurrentChange"
              background
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import breadCrumb from "@/components/BreadCrumb.vue";
import { Search } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  loginLogListLength,
  returnloginLogListData,
  loginLogDelete,
  loginSearchLogList,
} from "@/api/log.js";
import { bus } from "@/utils/mitt";
import { useUserInfor } from "@/store/userinfor.js";
// store
const userStore = useUserInfor();
// 面包屑
const breadcrumb = ref();
const item = reactive({
  first: "登录日志",
  imgIcon: import.meta.env.VITE_APP_SVGURL + "/assets/svg/user.svg",
});
const searchInput = ref("");
const handleSearchChange = async () => {
  tableData.value = await loginSearchLogList(searchInput.value);
};

// 表格数据
const tableData = ref([]);

// 分页
const paginationData = reactive({
  loginPageCount: 1, //总页数
  loginCurrentPage: 1, //当前所处页数
});
// 获取文件列表总的数量
const loginListTotal = ref<number>(0);
const loginListlength = async () => {
  const res = await loginLogListLength();
  loginListTotal.value = res.length;
  paginationData.loginPageCount = Math.ceil(res.length / 10);
};
loginListlength();
//默认获取第一页的数据
const getloginFirstPageList = async () => {
  const res = await returnloginLogListData(paginationData.loginCurrentPage);
  tableData.value = res;
};
getloginFirstPageList();
// 监听文件列表的变化分页事件
const fileCurrentChange = async (value: number) => {
  const res = await returnloginLogListData(value);
  tableData.value = res;
  paginationData.loginCurrentPage = value;
};

/**
 * 清空登录日志成功的回调
 */
const deleteFn = () => {
  loginListlength();
  getloginFirstPageList();
};
/**
 * 清空登录日志
 */
const handletrancate = async () => {
  // 提示用户是否有权限
  if (userStore.identity !== "超级管理员") {
    ElMessage({
      type: "warning",
      message: "当前为演示账号，不支持操作",
    });
    return;
  }

  // 确认清空登录日志
  ElMessageBox.confirm("您确定要清空登录日志吗?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      // 调用删除登录日志的函数
      const res = await loginLogDelete();
      // 判断删除结果
      if (res.status === 0) {
        // 删除成功
        ElMessage({
          type: "success",
          message: "删除成功",
        });
        deleteFn();
      } else {
        // 删除失败
        ElMessage({
          type: "error",
          message: "删除失败",
        });
      }
    })
    .catch(() => {
      // 用户取消删除
      ElMessage({
        type: "info",
        message: "取消删除",
      });
    });
};
</script>

<style lang="scss" scoped>
.table-wrapped {
  padding: 8px;
  background-color: #f5f5f5;
  height: calc(100vh - 101px);
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .demo-tabs {
    background-color: #fff;
    padding: 8px;
  }

  .table-top {
    .table-header {
      padding: 0 24px 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 48px;
      background: #fff;
      .left-wrapped {
        display: flex;
        align-items: center;
        justify-content: center;
        .search-wrapped {
          margin-right: 24px;
          display: flex;
        }
      }
    }

    .table-content {
      padding: 0px 24px 20px;
      background-color: #fff;
    }
  }

  .table-footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
}
</style>