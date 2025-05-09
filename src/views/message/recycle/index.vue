<template>
  <div>
    <!-- 头部面包屑 -->
    <breadCrumb ref="breadcrumb" :item="item"></breadCrumb>
    <!-- 内容区域 -->
    <div class="table-wrapped">
      <!-- 顶部 -->
      <div class="table-top">
        <!-- 表格顶部 -->
        <div class="table-header">
          <div class="left-wrapped">
            <div class="search-wrapped"></div>
          </div>
          <div class="button-wrapped"></div>
        </div>
        <!-- 表格内容 -->
        <div class="table-content">
          <el-table :data="recycleTableData" border style="width: 100%">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column
              prop="message_title"
              label="公告主题"
              width="220"
            ></el-table-column>
            <el-table-column
              prop="message_category"
              label="消息类别"
            ></el-table-column>
            <el-table-column
              prop="message_publish_department"
              label="发布部门"
            ></el-table-column>
            <el-table-column
              prop="message_receipt_object"
              label="接收对象"
            ></el-table-column>
            <el-table-column prop="" label="删除日期" width="200">
              <template #default="{ row }">
                <div>{{ row.message_delete_time?.slice(0, 10) }}</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="180" fixed="right">
              <template #default="{ row }">
                <div>
                  <el-button
                    type="success"
                    size="small"
                    @click="handleRestore(row)"
                    >恢复</el-button
                  >
                  <el-button
                    type="danger"
                    size="small"
                    @click="handleDelete(row.id)"
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
              :current-page="paginationData.recycleCurrentPage"
              :page-count="paginationData.recyclePageCount"
              layout="total, prev, pager, next"
              :total="recycleMessageListTotal"
              @current-change="recycleCurrentChange"
              background
            />
          </div>
        </div>
      </div>
    </div>
    <deleteDialog ref="deleteRef" @Success="getRecycleMessageListData" />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import breadCrumb from "@/components/BreadCrumb.vue";
import deleteDialog from "../components/delete.vue";
import {
  getRecycleMessageList,
  getRecycleMessageCount,
  returnRecycleMessageListData,
} from "@/api/message";
import { bus } from "@/utils/mitt";
const breadcrumb = ref();
const item = reactive({
  first: "消息管理",
  second: "回收站",
  imgIcon: import.meta.env.VITE_APP_SVGURL + "/assets/svg/msgrecycle.svg",
});
// 搜索框值
const searchValue = ref("");
//回收删除消息列表数据
const recycleTableData = ref([]);
/**
 * 恢复或删除操作后刷新回收站消息列表接口
 */
const getRecycleMessageListData = () => {
  companyMessageListlength();
  getRecycleFirstPageList();
};
/**
 * 还原删除
 * @param row 当前行数据
 */
const deleteRef = ref();
const handleRestore = (row: any) => {
  bus.emit("restoreID", row);
  deleteRef.value.open();
};
/**
 * 彻底删除
 * @param id 要删除的消息id
 */
const handleDelete = (id: number) => {
  bus.emit("deleteID", id);
  deleteRef.value.open();
};

// 分页
const paginationData = reactive({
  recyclePageCount: 1, //总页数
  recycleCurrentPage: 1, //当前所处页数
});
// 获取回收站列表总的数量
const recycleMessageListTotal = ref<number>(0);
const companyMessageListlength = async () => {
  const res = await getRecycleMessageCount();
  recycleMessageListTotal.value = res.length;
  paginationData.recyclePageCount = Math.ceil(res.length / 10);
};
companyMessageListlength();
//默认获取第一页的数据
const getRecycleFirstPageList = async () => {
  const res = await returnRecycleMessageListData(
    paginationData.recycleCurrentPage
  );
  recycleTableData.value = res;
};
getRecycleFirstPageList();
// 监听回收站分页事件
const recycleCurrentChange = async (value: number) => {
  const res = await returnRecycleMessageListData(value);
  recycleTableData.value = res;
  paginationData.recycleCurrentPage = value;
};
</script>

<style lang="scss" scoped>
.table-wrapped {
  padding: 8px;
  height: calc(100vh - 101px);
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  overflow: auto;
  .table-top {
    .table-header {
      height: 0;
    }
  }
}
</style>