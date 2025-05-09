<!-- 
  author: zkz
  @createTime: 2024-09-06 10:43:31
  @Description: 用户列表页面
 -->
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
                size="large"
                placeholder="输入账号进行搜索"
                :suffix-icon="Search"
                @change="searchAdmin()"
              />
            </div>
            <div class="select-wrapped">
              <el-select
                v-model="formData.department"
                style="width: 200px"
                placeholder="请选择部门"
                clearable
                @change="searchForDepartment"
                @clear="clearOption"
              >
                <el-option
                  v-for="(item, index) in departmentData"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="button-wrapped">
            <el-button plain type="primary" @click="selectBanUser"
              >筛选冻结用户</el-button
            >
            <el-button plain type="primary" @click="getadminlist"
              >显示全部用户</el-button
            >
          </div>
        </div>
        <!-- 表格内容 -->
        <div class="table-content">
          <el-table
            :data="tableData"
            style="width: 100%"
            border
            @cell-dblclick="showUserInfor"
          >
            <el-table-column type="index" width="50" />
            <el-table-column prop="account" label="账号" />
            <el-table-column prop="name" label="姓名" />
            <el-table-column prop="sex" label="性别" />
            <el-table-column prop="department" label="部门" />
            <el-table-column prop="email" label="邮箱" width="150" />
            <el-table-column prop="status" label="状态">
              <template #default="{ row }">
                <div>
                  <el-tag class="ml-2" v-if="row.status == 1" type="danger"
                    >冻结</el-tag
                  >
                  <el-tag class="ml-2" type="success" v-else>正常</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="create_time" label="创建时间">
              <template #default="{ row }">
                <div>{{ row.create_time?.slice(0, 10) }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="update_time" label="更新时间">
              <template #default="{ row }">
                <div>{{ row.update_time?.slice(0, 10) }}</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="160">
              <template #default="{ row }">
                <div>
                  <el-button
                    type="primary"
                    @click="toBanUser(row.id, row.name)"
                    :disabled="row.status == 1"
                    >冻结</el-button
                  >
                  <el-button
                    type="success"
                    @click="toHotUser(row.id, row.name)"
                    :disabled="row.status == 0"
                    >解冻</el-button
                  >
                </div>
              </template>
            </el-table-column>
          </el-table>
          <!-- 底部 -->
          <div class="table-footer">
            <el-pagination
              :page-size="2"
              :pager-count="7"
              :current-page="paginationData.currentPage"
              :page-count="paginationData.pageCount"
              layout="prev, pager, next"
              :total="adminTotal"
              @current-change="currentChange"
              background
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <userinfo ref="userinfoRef" @success="delOption"></userinfo>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import breadCrumb from "@/components/BreadCrumb.vue";
import {
  getAdminListLength,
  returnListData,
  searchUser,
  searchUserByDepartment,
  getBanList,
  banUser,
  hotUser,
} from "@/api/userinfor";
import { getDepartment } from "@/api/setting.js";
import { ElMessage } from "element-plus";
import { bus } from "@/utils/mitt.js";
import userinfo from "@/views/user_manage/components/user_infor.vue";
import { tracking } from "@/utils/operation";
const breadcrumb = ref();
const item = reactive({
  first: "用户管理",
  second: "用户列表",
  imgIcon: import.meta.env.VITE_APP_SVGURL + "/assets/svg/user.svg",
});
// 赋权成功后刷新页面数据
bus.on("offDialog", (id: number) => {
  if (id == 1) {
    getadminlist();
    getAdminlistlength();
  }
});
// 编辑成功后刷新页面数据
bus.on("edituserId", (id: number) => {
  if (id == 2) {
    getadminlist();
  }
});
// 表格数据
const tableData = ref([]);
const formData = reactive({
  department: "",
});

// 搜索关键词
const searchInput = ref<number>();
const searchAdmin = async () => {
  tableData.value = await searchUser(searchInput.value);
};

//  通过部门对用户进行搜索
const searchForDepartment = async () => {
  tableData.value = await searchUserByDepartment(formData.department);
};
// 清空选择框
const clearOption = () => {
  getadminlist();
};
// 获取项目选择列表
const departmentData = ref([]);
const getdepartment = async () => {
  departmentData.value = await getDepartment();
};
getdepartment();

// 筛选冻结用户
const selectBanUser = async () => {
  tableData.value = await getBanList();
};

// 冻结用户
const toBanUser = async (id, name) => {
  const res = await banUser(id);
  if (res.status == 0) {
    ElMessage({
      message: res.message,
      type: "success",
    });
    tracking("冻结", localStorage.getItem("name"), name, 3);
    getadminlist();
  } else {
    ElMessage.error("冻结用户失败");
  }
};
// 解冻用户
const toHotUser = async (id, name) => {
  const res = await hotUser(id);
  if (res.status == 0) {
    ElMessage({
      message: res.message,
      type: "success",
    });
    tracking("解冻", localStorage.getItem("name"), name, 3);
    getadminlist();
  } else {
    ElMessage.error("解冻用户失败");
  }
};
// 显示用户信息弹框
const userinfoRef = ref();
const showUserInfor = (row: any) => {
  bus.emit("userId", row);
  userinfoRef.value.open();
};

// 删除成功后回调刷新页面数据和分页
const delOption = () => {
  getadminlist();
  getAdminlistlength();
};

// 分页
const paginationData = reactive({
  pageCount: 1, //总页数
  currentPage: 1, //当前所处页数
});
// 获取管理员的数量
const adminTotal = ref<number>(0);
const getAdminlistlength = async () => {
  const res = await getAdminListLength("用户管理员");
  adminTotal.value = res.length;
  paginationData.pageCount = Math.ceil(res.length / 10);
};
getAdminlistlength();
//默认获取第一页的数据
const getFirstPageList = async () => {
  const res = await returnListData(paginationData.currentPage, "用户管理员");
  tableData.value = res;
};
getFirstPageList();
// 监听分页事件
const currentChange = async (value: number) => {
  const res = await returnListData(value, "用户管理员");
  tableData.value = res;
  paginationData.currentPage = value;
};
//获取管理员列表
const getadminlist = () => {
  getFirstPageList();
};
getadminlist();
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

  .table-top {
    .table-header {
      padding: 0 24px 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 48px;
      background: #fff;
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

:deep(.el-input__inner) {
  height: 32px;
}
</style>