<!-- /* 
* @Author: zkz    
* @CreateTime: 2025-02-14 09:09:43
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
                placeholder="输入操作人进行搜索"
                :suffix-icon="Search"
                @change="handleSearchChange"
              />
            </div>
          </div>
          <div class="button-wrapped">
            <el-button type="primary" @click="handletrancate"
              >清空操作日志</el-button
            >
          </div>
        </div>
        <div class="table-content">
          <el-table :data="tableData" style="width: 100%" border>
            <el-table-column type="index"></el-table-column>
            <el-table-column
              prop="operation_person"
              label="操作人"
            ></el-table-column>
            <el-table-column prop="operation_content" label="操作内容">
            </el-table-column>
            <el-table-column prop="operation_level" label="操作等级">
              <template #default="{ row }">
                <div>
                  <el-tag v-if="row.operation_level == 1">低级</el-tag>
                  <el-tag type="warning" v-else-if="row.operation_level == 2"
                    >中级</el-tag
                  >
                  <el-tag type="danger" v-else-if="row.operation_level == 3"
                    >高级</el-tag
                  >
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="operation_time" label="操作时间" width="200">
              <template #default="scope">
                {{ scope.row.operation_time.slice(0, 19) }}
              </template>
            </el-table-column>
          </el-table>
          <!-- 底部 -->
          <div class="table-footer">
            <el-pagination
              :page-size="1"
              :pager-count="7"
              :current-page="paginationData.operationCurrentPage"
              :page-count="paginationData.operationPageCount"
              layout="total, prev, pager, next"
              :total="operationListTotal"
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
  operationLogListLength,
  returnoperationLogListData,
  operationLogDelete,
  operationSearchLogList,
} from "@/api/log.js";
import { bus } from "@/utils/mitt";
import { useUserInfor } from "@/store/userinfor.js";
// store
const userStore = useUserInfor();
const breadcrumb = ref();
const item = reactive({
  first: "操作日志",
  imgIcon: import.meta.env.VITE_APP_SVGURL + "/assets/svg/hetong.svg",
});
const searchInput = ref("");
const handleSearchChange = async () => {
  tableData.value = await operationSearchLogList(searchInput.value);
};

// 表格数据
const tableData = ref([]);

// 分页
const paginationData = reactive({
  operationPageCount: 1, //总页数
  operationCurrentPage: 1, //当前所处页数
});
// 获取文件列表总的数量
const operationListTotal = ref<number>(0);
const operationListlength = async () => {
  const res = await operationLogListLength();
  operationListTotal.value = res.length;
  paginationData.operationPageCount = Math.ceil(res.length / 10);
};
operationListlength();
//默认获取第一页的数据
const getOperationFirstPageList = async () => {
  const res = await returnoperationLogListData(
    paginationData.operationCurrentPage
  );
  tableData.value = res;
};
getOperationFirstPageList();
// 监听文件列表的变化分页事件
const fileCurrentChange = async (value: number) => {
  const res = await returnoperationLogListData(value);
  tableData.value = res;
  paginationData.operationCurrentPage = value;
};

/**
 * 清空操作日志成功的回调
 */
const deleteFn = () => {
  operationListlength();
  getOperationFirstPageList();
};
/**
 * 清空操作日志
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

  ElMessageBox.confirm("您确定要清空操作日志吗?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      const res = await operationLogDelete();
      if (res.status === 0) {
        ElMessage({
          type: "success",
          message: "删除成功",
        });
        deleteFn();
      } else {
        ElMessage({
          type: "error",
          message: "删除失败",
        });
      }
    })
    .catch(() => {
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