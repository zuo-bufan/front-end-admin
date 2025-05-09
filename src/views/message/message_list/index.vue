<template>
  <div>
    <!-- 头部面包屑 -->
    <breadCrumb ref="breadcrumb" :item="item"></breadCrumb>
    <div class="table-wrapped">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="公告管理" name="first">
          <!-- 顶部 -->
          <div class="table-top">
            <!-- 表格顶部 -->
            <div class="table-header">
              <div class="left-wrapped">
                <div class="search-wrapped">
                  <el-select
                    v-model="departmet"
                    placeholder="选择部门进行筛选"
                    style="width: 180px"
                    @change="handleDepartmentChange"
                  >
                    <el-option
                      v-for="(item, index) in departmentData"
                      :key="index"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                  <el-radio-group
                    v-model="levelRadio"
                    @change="handleLevelChange"
                  >
                    <el-radio value="一般">一般</el-radio>
                    <el-radio value="重要">重要</el-radio>
                    <el-radio value="必要">必要</el-radio>
                  </el-radio-group>
                </div>
              </div>
              <div class="button-wrapped">
                <el-button type="primary" plain @click="showAllMessage"
                  >全部公告</el-button
                >
                <el-button type="primary" @click="handlePublish(1)">
                  发布公司公告</el-button
                >
              </div>
            </div>
            <!-- 表格内容 -->
            <div class="table-content">
              <el-table :data="companyTableData" border style="width: 100%">
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column
                  prop="message_title"
                  label="公告主题"
                  width="320"
                ></el-table-column>
                <el-table-column
                  prop="message_category"
                  label="类别"
                ></el-table-column>
                <el-table-column
                  prop="message_publish_department"
                  label="发布部门"
                ></el-table-column>
                <el-table-column prop="message_publish_name" label="发布人">
                </el-table-column>
                <el-table-column
                  prop="message_receipt_object"
                  label="接收对象"
                ></el-table-column>
                <el-table-column
                  prop="message_level"
                  label="公告等级"
                ></el-table-column>
                <el-table-column prop="" label="发布时间" width="200">
                  <template #default="{ row }">
                    <div>{{ row.message_create_time?.slice(0, 19) }}</div>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="最新编辑时间" width="200">
                  <template #default="{ row }">
                    <div>
                      {{ row.message_update_time?.slice(0, 19) }}
                    </div>
                  </template></el-table-column
                >
                <el-table-column
                  prop="message_click_number"
                  label="阅读人数"
                ></el-table-column>
                <el-table-column label="操作" width="180" fixed="right">
                  <template #default="{ row }">
                    <div>
                      <el-button
                        type="success"
                        @click="handleEdit(row, '公司公告编辑')"
                        >编辑</el-button
                      >
                      <el-button
                        type="danger"
                        @click="
                          handleDelete(
                            row.id,
                            row.message_receipt_object,
                            '公司公告删除'
                          )
                        "
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
                  :current-page="paginationData.companyCurrentPage"
                  :page-count="paginationData.companyPageCount"
                  layout="total, prev, pager, next"
                  :total="companyMessageListTotal"
                  @current-change="companyCurrentChange"
                  background
                />
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="系统消息" name="second">
          <!-- 顶部 -->
          <div class="table-top">
            <!-- 表格顶部 -->
            <div class="table-header">
              <div class="left-wrapped">
                <div class="search-wrapped"></div>
              </div>
              <div class="button-wrapped">
                <el-button type="primary" @click="handlePublish(2)"
                  >发布系统公告</el-button
                >
              </div>
            </div>
            <!-- 表格内容 -->
            <div class="table-content">
              <el-table :data="systemTableData" border style="width: 100%">
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column
                  prop="message_title"
                  label="消息主题"
                  width="320"
                ></el-table-column>
                <el-table-column
                  prop="message_publish_name"
                  label="发布者"
                ></el-table-column>
                <el-table-column
                  prop="message_click_number"
                  label="阅读人数"
                ></el-table-column>
                <el-table-column label="发布时间" width="200">
                  <template #default="{ row }">
                    <div>{{ row.message_create_time?.slice(0, 19) }}</div>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="180" fixed="right">
                  <template #default="{ row }">
                    <div>
                      <el-button
                        type="success"
                        @click="handleEdit(row, '系统公告编辑')"
                        >编辑</el-button
                      >
                      <el-button
                        type="danger"
                        @click="
                          handleDelete(
                            row.id,
                            row.message_receipt_object,
                            '系统公告删除'
                          )
                        "
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
                  :current-page="paginationData.systemCurrentPage"
                  :page-count="paginationData.systemPageCount"
                  layout="total, prev, pager, next"
                  :total="systemMessageListTotal"
                  @current-change="systemCurrentChange"
                  background
                />
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <publish
      ref="publishRef"
      @handleCompanySuccess="handleCompanySuccess"
      @handleSystemSuccess="handleSystemSuccess"
    />
    <deleteDialog
      ref="deleteRef"
      @deleteCompanySuccess="handleCompanySuccess"
      @deleteSystemSuccess="handleSystemSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import publish from "@/views/message/components/publish_dialog.vue";
import deleteDialog from "@/views/message/components/delete.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import breadCrumb from "@/components/BreadCrumb.vue";
import type { TabsPaneContext } from "element-plus";
import {
  companyMessageList,
  systemMessageList,
  searchMessageByDepartment,
  searchMessageByLevel,
  getCompanyMessageCount,
  returnCompanyMessageListData,
  getSystemMessageCount,
  returnSystemMessageListData,
} from "@/api/message";
import { getDepartment } from "@/api/setting.js";
import { bus } from "@/utils/mitt";
import { useUserInfor } from "@/store/userinfor.js";
// store
const userStore = useUserInfor();
const breadcrumb = ref();
const item = reactive({
  first: "消息管理",
  second: "消息列表",
  imgIcon: import.meta.env.VITE_APP_SVGURL + "/assets/svg/msglist.svg",
});
//公司公告数据
const companyTableData = ref([]);
//系统公告数据
const systemTableData = ref([]);

// tab
const activeName = ref("first");
const handleClick = (tab: TabsPaneContext) => {
  if (tab.props.label === "公告管理") {
    getCompanyFirstPageList();
  } else if (tab.props.label === "系统消息") {
    getSystemFirstPageList();
  }
};
/**
 * 获取公司公告数据
 */
// const getcompanyTableData = async () => {
//   //模拟接口请求数据
//   const res = await companyMessageList();
//   companyTableData.value = res;
// };
/**
 * 获取系统公告数据
 */
// const getsystemTableData = async () => {
//   //模拟接口请求数据
//   const res = await systemMessageList();
//   systemTableData.value = res;
// };
// getcompanyTableData();

//发布弹窗 ref
const publishRef = ref();
/**
 * 发布公告
 * @param message 要发布的消息
 */
const handlePublish = (id: number) => {
  // 提示用户是否有权限
  if (userStore.identity !== "超级管理员") {
    ElMessage({
      type: "warning",
      message: "当前为演示账号，不支持操作",
    });
    return;
  }
  bus.emit("openPublish", id);
  publishRef.value.open();
};
/**
 * 编辑公告
 * @param row 要编辑的公告数据
 */
const handleEdit = (row: any, title: string) => {
  // 提示用户是否有权限
  if (userStore.identity !== "超级管理员") {
    ElMessage({
      type: "warning",
      message: "当前为演示账号，不支持操作",
    });
    return;
  }
  row.title = title;
  bus.emit("openEdit", row);
  publishRef.value.open();
};
/**
 * 删除公告
 * @param id 要删除的公告id
 */
const deleteRef = ref();
const handleDelete = (
  id: number,
  message_receipt_object: string,
  name: string
) => {
  // 提示用户是否有权限
  if (userStore.identity !== "超级管理员") {
    ElMessage({
      type: "warning",
      message: "当前为演示账号，不支持操作",
    });
    return;
  }

  let obj = {
    id: id,
    message_receipt_object: message_receipt_object,
    name: name,
  };
  bus.emit("deleteMessage", obj);
  deleteRef.value.open();
};

/**
 * 发布公司公告成功回调
 * @param message 发布的消息
 * @param id 发布的消息id
 */
const handleCompanySuccess = () => {
  //发布公司公告
  getCompanyFirstPageList();
};
/**
 * 编辑公司公告发布成功回调
 * @param message 发布的消息
 * @param id 发布的消息id
 */
const handleSystemSuccess = () => {
  //编辑公司公告
  getSystemFirstPageList();
};

//根据部门搜索
const departmet = ref("");
/**
 * 获取项目选择列表
 */
const departmentData = ref([]);
const getdepartment = async () => {
  departmentData.value = await getDepartment();
};
getdepartment();
/**
 * 根据部门筛选
 */
const handleDepartmentChange = async () => {
  companyTableData.value = await searchMessageByDepartment(departmet.value);
  companyMessageListTotal.value = companyTableData.value.length;
};

/**
 * 公告等级筛选
 */
const levelRadio = ref();
const handleLevelChange = async () => {
  companyTableData.value = await searchMessageByLevel(levelRadio.value);
  companyMessageListTotal.value = companyTableData.value.length;
};
/**
 * 显示全部公告
 */
const showAllMessage = () => {
  departmet.value = "";
  levelRadio.value = 0;
  getCompanyFirstPageList();
  getSystemFirstPageList();
};

// 分页
const paginationData = reactive({
  companyPageCount: 1, //总页数
  companyCurrentPage: 1, //当前所处页数
  systemPageCount: 1, //总页数
  systemCurrentPage: 1, //当前所处页数
});
// 获取公司公告列表总的数量
const companyMessageListTotal = ref<number>(0);
const companyMessageListlength = async () => {
  const res = await getCompanyMessageCount();
  companyMessageListTotal.value = res.length;
  paginationData.companyPageCount = Math.ceil(res.length / 10);
};
companyMessageListlength();
//默认获取第一页的数据
const getCompanyFirstPageList = async () => {
  const res = await returnCompanyMessageListData(
    paginationData.companyCurrentPage
  );
  companyTableData.value = res;
  companyMessageListTotal.value = companyTableData.value.length;
};
getCompanyFirstPageList();
// 监听公司公告分页事件
const companyCurrentChange = async (value: number) => {
  const res = await returnCompanyMessageListData(value);
  companyTableData.value = res;
  paginationData.companyCurrentPage = value;
};

// 获取系统消息列表总的数量
const systemMessageListTotal = ref<number>(0);
const systemMessageListlength = async () => {
  const res = await getSystemMessageCount();
  systemMessageListTotal.value = res.length;
  paginationData.systemPageCount = Math.ceil(res.length / 10);
};
systemMessageListlength();
//默认获取第一页的数据
const getSystemFirstPageList = async () => {
  const res = await returnSystemMessageListData(
    paginationData.systemCurrentPage
  );
  systemTableData.value = res;
};
getSystemFirstPageList();
// 监听系统消息分页事件
const systemCurrentChange = async (value: number) => {
  const res = await returnSystemMessageListData(value);
  systemTableData.value = res;
  paginationData.systemCurrentPage = value;
};
</script>

<style lang="scss" scoped>
.el-radio-group {
  margin-left: 30px;
}

:deep(.el-input__inner) {
  height: 32px;
}
</style>