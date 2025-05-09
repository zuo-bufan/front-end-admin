<!-- 
  author: zkz
  @createTime: 2024-09-06 10:33:19
  @Description: 用户管理页面
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
          <div class="search-wrapped">
            <el-input
              v-model="searchInput"
              style="width: 240px"
              size="large"
              placeholder="输入账号进行搜索"
              :suffix-icon="Search"
              clearable
              @clear="searchInput = ''"
              @change="searchAdmin()"
            />
          </div>
          <div class="button-wrapped">
            <el-button type="primary" @click="addAdmin(2)"
              >添加用户管理</el-button
            >
          </div>
        </div>
        <!-- 表格内容 -->
        <div class="table-content">
          <el-table :data="tableData" style="width: 100%" border>
            <el-table-column type="index" width="50" />
            <el-table-column prop="account" label="账号" />
            <el-table-column prop="name" label="姓名" />
            <el-table-column prop="department" label="部门" />
            <el-table-column prop="email" label="邮箱" width="150" />
            <el-table-column prop="" label="创建时间">
              <template #default="{ row }">
                <div>{{ row.create_time?.slice(0, 10) }}</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="160">
              <template #default="scope">
                <div>
                  <el-button type="success" @click="editOPtion(scope.row.id)"
                    >编辑</el-button
                  >
                  <el-button
                    plain
                    type="danger"
                    @click="delOption(scope.row.id)"
                    >删除</el-button
                  >
                </div>
              </template>
            </el-table-column>
          </el-table>
          <!-- 底部 -->
          <div class="table-footer">
            <el-pagination
              :page-size="1"
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
    <create ref="createRef" @success="getadminlist"></create>
    <edit ref="editRef" @success="getadminlist"></edit>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import breadCrumb from "@/components/BreadCrumb.vue";
import { Search } from "@element-plus/icons-vue";
import create from "../components/create_admin.vue";
import edit from "../components/edit_admin.vue";
import { bus } from "@/utils/mitt.js";
import {
  changeIdentityToUser,
  searchUser,
  getAdminListLength,
  returnListData,
} from "@/api/userinfor";
import { ElMessage, ElMessageBox } from "element-plus";
const breadcrumb = ref();
const item = reactive({
  first: "用户管理",
  second: "用户管理员",
  imgIcon: import.meta.env.VITE_APP_SVGURL + "/assets/svg/person.svg",
});
// 搜索关键词
const searchInput = ref<number>();
const searchAdmin = async () => {
  const res = await searchUser(searchInput.value);
  // console.log(res);
  if (res.length > 0) {
    tableData.value = res.filter((item) => item.identity == "用户管理员");
  }
};
// 表格数据
const tableData = ref([]);

// 添加管理员
const createRef = ref();
const addAdmin = (id: number) => {
  bus.emit("createTitle", id);
  createRef.value.open();
};
// 修改管理员信息
const editRef = ref();
const editOPtion = (id: number) => {
  bus.emit("editTitle", id);
  editRef.value.open();
};
// 删除管理员
const delOption = (id) => {
  ElMessageBox.confirm("是否将该条数据降级为用户管理员?", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      const res = await changeIdentityToUser(id);
      getadminlist();
      getAdminlistlength();
      ElMessage({
        type: "success",
        message: "删除成功",
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消删除",
      });
    });
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