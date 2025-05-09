<!-- 
  author: zkz
  @createTime: 2024-10-28 16:55:59
  @Description: 出库列表页面
 -->
<template>
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
              v-model="searchProductInput"
              style="width: 200px"
              size="large"
              placeholder="输入入库编号进行搜索"
              :suffix-icon="Search"
            />
          </div>
        </div>
      </div>
      <div class="table-content">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column
            prop="product_out_id"
            label="出库编号"
          ></el-table-column>
          <el-table-column
            prop="product_out_number"
            label="出库数量"
          ></el-table-column>
          <el-table-column
            prop="product_out_price"
            label="出库数量"
          ></el-table-column>
          <el-table-column
            prop="product_out_apply_person"
            label="出库申请人"
          ></el-table-column>
          <el-table-column
            prop="product_out_audit_person"
            label="出库审核人"
          ></el-table-column>
          <el-table-column
            prop="product_audit_time"
            label="审核时间"
            width="180"
          >
            <template #default="{ row }">
              {{ row.product_audit_time?.slice(0, 19) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="audit_memo"
            label="备注"
            width="180"
          ></el-table-column>
        </el-table>
        <!-- 底部 -->
        <div class="table-footer">
          <el-pagination
            :page-size="1"
            :pager-count="7"
            :current-page="paginationData.getOutProductCurrentPage"
            :page-count="paginationData.getOutProductPageCount"
            layout="total, prev, pager, next"
            :total="getOutProductTotal"
            @current-change="getOutProductCurrentChange"
            background
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import breadCrumb from "@/components/BreadCrumb.vue";
import { getOutProductLength, returnOutProductListData } from "@/api/product";

const breadcrumb = ref();
const item = reactive({
  first: "产品管理",
  second: "出库列表",
  imgIcon: import.meta.env.VITE_APP_SVGURL + "/assets/svg/user.svg",
});
// 表格数据
const tableData = ref([]);

// 搜索输入框的值
const searchProductInput = ref("");
// 分页
const paginationData = reactive({
  getOutProductPageCount: 1, //产品列表总页数
  getOutProductCurrentPage: 1, //产品列表当前所处页数
});
// 获取产品列表总的数量
const getOutProductTotal = ref<number>(0);
const getOutgetOutProductlength = async () => {
  const res = await getOutProductLength();
  getOutProductTotal.value = res.length;
  paginationData.getOutProductPageCount = Math.ceil(res.length / 10);
};
getOutgetOutProductlength();
//默认获取第一页的数据
const getOutProductFirstPageList = async () => {
  const res = await returnOutProductListData(
    paginationData.getOutProductCurrentPage
  );
  tableData.value = res;
};
getOutProductFirstPageList();
// 监听产品列表的变化分页事件
const getOutProductCurrentChange = async (value: number) => {
  const res = await returnOutProductListData(value);
  tableData.value = res;
  paginationData.getOutProductCurrentPage = value;
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