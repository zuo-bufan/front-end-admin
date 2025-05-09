<!-- 
  author: zkz
  @createTime: 2024-10-24 15:50:58
  @Description: 产品列表页面
 -->
<template>
  <div>
    <!-- 头部面包屑 -->
    <breadCrumb ref="breadcrumb" :item="item"></breadCrumb>
    <div class="table-wrapped">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="产品列表" name="first">
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
                    @change="searchProductListChange"
                  />
                </div>
              </div>
              <div class="button-wrapped">
                <el-button type="primary" @click="addCreateP"
                  >添加产品</el-button
                >
              </div>
            </div>
            <!-- 表格内容 -->
            <div class="table-content">
              <el-table :data="tableData" border style="width: 100%">
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column
                  prop="product_id"
                  label="入库编号"
                  width="200"
                ></el-table-column>
                <el-table-column
                  prop="product_name"
                  label="产品名称"
                  width="160"
                ></el-table-column>
                <el-table-column
                  prop="product_category"
                  label="产品类别"
                  width="100"
                ></el-table-column>
                <el-table-column
                  prop="product_unit"
                  label="单位"
                ></el-table-column>
                <el-table-column
                  prop="product_inwarehouse_number"
                  label="库存数量"
                  width="100"
                >
                </el-table-column>
                <el-table-column
                  prop="product_single_price"
                  label="产品单价"
                  width="150"
                ></el-table-column>
                <el-table-column
                  prop="product_all_price"
                  label="库存总价"
                  width="100"
                ></el-table-column>
                <el-table-column
                  prop="product_status"
                  label="库存状态"
                  width="100"
                >
                  <template #default="{ row }">
                    <el-tag
                      class="ml-2"
                      type="danger"
                      v-if="row.product_inwarehouse_number < 100"
                      >库存较少</el-tag
                    >
                    <el-tag
                      class="ml-2"
                      type="success"
                      v-else-if="
                        row.product_inwarehouse_number >= 100 &&
                        row.product_inwarehouse_number < 300
                      "
                      >库存正常</el-tag
                    >
                    <el-tag
                      class="ml-2"
                      type="warning"
                      v-else-if="row.product_inwarehouse_number >= 300"
                      >库存过剩</el-tag
                    >
                  </template>
                </el-table-column>
                <el-table-column
                  prop="product_create_person"
                  label="入库负责人"
                  width="100"
                ></el-table-column>
                <el-table-column
                  prop="product_create_time"
                  label="入库时间"
                  width="200"
                ></el-table-column>
                <el-table-column
                  prop="product_update_time"
                  label="最后修改时间"
                  width="200"
                ></el-table-column>
                <el-table-column
                  prop="in_memo"
                  label="入库备注"
                  width="200"
                ></el-table-column>
                <el-table-column label="操作" fixed="right" width="220">
                  <template #default="{ row }">
                    <div>
                      <el-button
                        size="small"
                        type="primary"
                        @click="
                          applyOut(
                            row.id,
                            row.product_name,
                            row.product_single_price,
                            row.product_inwarehouse_number
                          )
                        "
                        :disabled="
                          row.product_out_status === '申请出库' ||
                          row.product_inwarehouse_number == 0
                        "
                        >申请出库</el-button
                      >
                      <el-button
                        size="small"
                        type="success"
                        :disabled="row.product_out_status === '申请出库'"
                        @click="editProduct(row.id)"
                        >编辑</el-button
                      >
                      <el-button
                        size="small"
                        type="danger"
                        :disabled="row.product_out_status === '申请出库'"
                        @click="deleteProductOpen(row.id)"
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
                  :current-page="paginationData.productListCurrentPage"
                  :page-count="paginationData.productListPageCount"
                  layout="total, prev, pager, next"
                  :total="productListListTotal"
                  @current-change="productListCurrentChange"
                  background
                />
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审核列表" name="second">
          <!-- 顶部 -->
          <div class="table-top">
            <!-- 表格顶部 -->
            <div class="table-header">
              <div class="left-wrapped">
                <div class="search-wrapped">
                  <el-input
                    v-model="searchAuditInput"
                    style="width: 200px"
                    size="large"
                    placeholder="输入出库编号进行搜索"
                    :suffix-icon="Search"
                    @change="searchApplyProductListChange"
                  />
                </div>
              </div>
            </div>
            <!-- 表格内容 -->
            <div class="table-content">
              <el-table :data="applyTableData" border style="width: 100%">
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column
                  prop="product_out_id"
                  label="申请出库编号"
                  width="200"
                ></el-table-column>
                <el-table-column
                  prop="product_name"
                  label="产品名称"
                  width="200"
                ></el-table-column>
                <el-table-column
                  prop="product_out_number"
                  label="申请出库数量"
                  width="200"
                ></el-table-column>
                <el-table-column
                  prop="product_out_price"
                  label="申请出库总价"
                  width="200"
                ></el-table-column>
                <el-table-column
                  prop="product_out_apply_person"
                  label="申请人"
                  width="100"
                ></el-table-column>
                <el-table-column
                  prop="product_apply_time"
                  label="申请出库时间"
                  width="200"
                ></el-table-column>
                <el-table-column
                  prop="product_out_audit_person"
                  label="审核人"
                  width="100"
                ></el-table-column>
                <el-table-column
                  prop="product_audit_time"
                  label="审核时间"
                  width="200"
                ></el-table-column>
                <el-table-column
                  prop="product_out_status"
                  label="审核状态"
                  width="100"
                >
                  <template #default="{ row }">
                    <el-tag>{{ row.product_out_status }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="apply_memo"
                  label="申请出库备注"
                  width="200"
                ></el-table-column>
                <el-table-column
                  prop="audit_memo"
                  label="审核备注"
                  width="200"
                ></el-table-column>
                <el-table-column label="操作" fixed="right" width="250">
                  <template #default="{ row }">
                    <div>
                      <el-button
                        size="small"
                        type="primary"
                        @click="auditProductShow(row)"
                        >审核</el-button
                      >
                      <el-button
                        size="small"
                        type="success"
                        @click="withdrawAudit(row.id)"
                        >撤回申请</el-button
                      >
                      <el-button
                        size="small"
                        type="danger"
                        @click="againApplyProductOpen(row)"
                        :disabled="row.product_out_status === '申请出库'"
                        >再次申请</el-button
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
                  :current-page="paginationData.applyProductListCurrentPage"
                  :page-count="paginationData.applyProductListPageCount"
                  layout="total, prev, pager, next"
                  :total="applyProductListListTotal"
                  @current-change="applyProductListCurrentChange"
                  background
                />
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
  <!-- 创建产品弹框 -->
  <CreateProduct
    ref="createRef"
    @success="getproductListFirstPageList"
  ></CreateProduct>
  <!-- 修改产品弹框 -->
  <EditProduct
    ref="editRef"
    @success="getproductListFirstPageList"
  ></EditProduct>
  <!-- 申请出库弹框 -->
  <Apply ref="applyRef" @success="getproductListFirstPageList"></Apply>
  <!-- 审核出库弹框 -->
  <Audit ref="auditRef" @success="getApplyProductListFirstPageList"></Audit>
  <!-- 撤销审核 -->
  <Withdraw
    ref="withdrawRef"
    @success="getApplyProductListFirstPageList"
  ></Withdraw>
  <!-- 再次申请 -->
  <Again
    ref="againApplyRef"
    @success="getApplyProductListFirstPageList"
  ></Again>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import breadCrumb from "@/components/BreadCrumb.vue";
import type { TabsPaneContext } from "element-plus";
import CreateProduct from "./components/create_product.vue";
import EditProduct from "./components/edit_product.vue";
import Apply from "./components/apply.vue";
import Audit from "./components/audit.vue";
import Withdraw from "./components/withdraw.vue";
import Again from "./components/again.vue";
import {
  getProductLength,
  returnProductListData,
  getApplyProductLength,
  returnApplyProductListData,
  deleteProduct,
  searchProductForId,
  searchProductForApplyId,
} from "@/api/product";
import { bus } from "@/utils/mitt.js";
import { ElMessage, ElMessageBox } from "element-plus";
import { useUserInfor } from "@/store/userinfor.js";
// store
const userStore = useUserInfor();
const breadcrumb = ref();
const item = reactive({
  first: "产品管理",
  second: "产品列表",
  imgIcon: import.meta.env.VITE_APP_SVGURL + "/assets/svg/user.svg",
});
// tab
const activeName = ref("first");
const handleClick = (tab: TabsPaneContext, event: Event) => {
  if (tab.props.label === "产品列表") {
    getproductListFirstPageList();
  } else if (tab.props.label === "审核列表") {
    getApplyProductListFirstPageList();
  }
};
// 产品列表搜索框值
const searchProductInput = ref<number>();
// 产品列表搜索事件
const searchProductListChange = async () => {
  tableData.value = await searchProductForId(searchProductInput.value);
};
// 审核列表搜索框值
const searchAuditInput = ref();
// 审核列表搜索事件
const searchApplyProductListChange = async () => {
  applyTableData.value = await searchProductForApplyId(searchAuditInput.value);
};
// 产品列表表格数据
const tableData = ref([]);
// 审核列表表格数据
const applyTableData = ref([]);

// 打开添加弹框
const createRef = ref();
const addCreateP = () => {
  createRef.value.open();
};
// 打开申请出库弹框
const applyRef = ref();
const applyOut = (
  id: number,
  name: string,
  product_single_price: number,
  product_inwarehouse_number: number
) => {
  let obj = {
    id: id,
    product_name: name,
    product_single_price,
    product_inwarehouse_number,
  };
  bus.emit("applyOutId", obj);
  applyRef.value.open();
};
// 打开编辑弹框
const editRef = ref();
const editProduct = (id: number) => {
  bus.emit("editProductId", id);
  editRef.value.open();
};
// 打开审核弹框
const auditRef = ref();
const auditProductShow = (row: any) => {
  bus.emit("auditProductId", row);
  auditRef.value.open();
};
// 打开撤销审核弹框
const withdrawRef = ref();
const withdrawAudit = (id: number) => {
  bus.emit("withdrawauditId", id);
  withdrawRef.value.open();
};
// 打开再次申请弹框
const againApplyRef = ref();
const againApplyProductOpen = (row: any) => {
  bus.emit("aginApplyid", row);
  againApplyRef.value.open();
};
// 打开删除弹框
const deleteProductOpen = (id: number) => {
  // 提示用户是否有权限
  if (userStore.identity !== "超级管理员") {
    ElMessage({
      type: "warning",
      message: "当前为演示账号，不支持操作",
    });
    return;
  }

  ElMessageBox.confirm("是否确认删除该产品?", "警告", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      const res = await deleteProduct(id);
      if (res.status == 0) {
        ElMessage({
          type: "success",
          message: "删除产品成功",
        });
        getproductListFirstPageList();
      }
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消删除操作",
      });
    });
};

// 分页
const paginationData = reactive({
  productListPageCount: 1, //产品列表总页数
  productListCurrentPage: 1, //产品列表当前所处页数
  applyProductListPageCount: 1, //审核列表总页数
  applyProductListCurrentPage: 1, //审核列表当前所处页数
});
// 获取产品列表总的数量
const productListListTotal = ref<number>(0);
const productListListlength = async () => {
  const res = await getProductLength();
  productListListTotal.value = res.length;
  paginationData.productListPageCount = Math.ceil(res.length / 10);
};
productListListlength();
//默认获取第一页的数据
const getproductListFirstPageList = async () => {
  const res = await returnProductListData(
    paginationData.productListCurrentPage
  );
  tableData.value = res;
};
getproductListFirstPageList();
// 监听产品列表的变化分页事件
const productListCurrentChange = async (value: number) => {
  const res = await returnProductListData(value);
  tableData.value = res;
  paginationData.productListCurrentPage = value;
};

// 获取审核列表总的数量
const applyProductListListTotal = ref<number>(0);
const applyProductListlength = async () => {
  const res = await getApplyProductLength();
  applyProductListListTotal.value = res.length;
  paginationData.applyProductListPageCount = Math.ceil(res.length / 10);
};
applyProductListlength();
//默认获取第一页的数据
const getApplyProductListFirstPageList = async () => {
  const res = await returnApplyProductListData(
    paginationData.applyProductListCurrentPage
  );
  applyTableData.value = res;
};
getApplyProductListFirstPageList();
// 监听审核列表的变化分页事件
const applyProductListCurrentChange = async (value: number) => {
  const res = await returnApplyProductListData(value);
  applyTableData.value = res;
  paginationData.applyProductListCurrentPage = value;
};
</script>

<style lang="scss" scoped>
:deep(.el-input__inner) {
  height: 32px;
}
</style>