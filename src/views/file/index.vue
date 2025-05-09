<!-- /* 
* @Author: zkz    
* @CreateTime: 2025-02-11 11:24:46
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
            <el-upload
              v-model:file-list="fileList"
              class="upload-demo"
              :action="baseUrl"
              :before-upload="beforeUploadFn"
              :on-success="handleSuccess"
              :on-exceed="handleExceed"
              :show-file-list="false"
              :limit="3"
              multiple
            >
              <el-button type="primary">上传文件</el-button>
            </el-upload>
          </div>
        </div>
        <div class="table-content">
          <el-table :data="tableData" style="width: 100%" border>
            <el-table-column type="index"></el-table-column>
            <el-table-column
              prop="file_name"
              label="文件名称"
              width="200"
            ></el-table-column>
            <el-table-column prop="file_size" label="文件大小">
              <template #default="{ row }">
                {{ Math.round(row.file_size) }}KB
              </template>
            </el-table-column>
            <el-table-column
              prop="upload_person"
              label="上传用户"
            ></el-table-column>
            <el-table-column
              prop="download_number"
              label="下载次数"
            ></el-table-column>
            <el-table-column prop="upload_time" label="上传时间" width="150">
              <template #default="scope">
                {{ scope.row.upload_time.slice(0, 10) }}
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200">
              <template #default="scope">
                <el-button
                  size="small"
                  type="info"
                  @click="
                    handleDownload(scope.row.download_number, scope.row.id)
                  "
                  >下载</el-button
                >
                <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.row.id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <!-- 底部 -->
          <div class="table-footer">
            <el-pagination
              :page-size="1"
              :pager-count="7"
              :current-page="paginationData.fileCurrentPage"
              :page-count="paginationData.filePageCount"
              layout="total, prev, pager, next"
              :total="fileListTotal"
              @current-change="fileCurrentChange"
              background
            />
          </div>
        </div>
      </div>
    </div>
    <deleteDialog ref="deleteRef" @deleteSuccess="deleteFn" />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import breadCrumb from "@/components/BreadCrumb.vue";
import { Search } from "@element-plus/icons-vue";
import type { UploadProps, UploadUserFile } from "element-plus";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  getFileListLength,
  returnFileListData,
  bindFileAndUser,
  downloadFile,
  updateDownloadFileNumber,
  searchFile,
} from "@/api/file.js";
import { bus } from "@/utils/mitt";
import deleteDialog from "./components/delete.vue";
import { operationLog } from "@/api/log.js";
import { useUserInfor } from "@/store/userinfor.js";
// store
const userStore = useUserInfor();
const breadcrumb = ref();
const item = reactive({
  first: "合同管理",
  imgIcon: import.meta.env.VITE_APP_SVGURL + "/assets/svg/hetong.svg",
});
const searchInput = ref("");
const handleSearchChange = async () => {
  tableData.value = await searchFile(searchInput.value);
};
// 文件上传
const fileList = ref<UploadUserFile[]>([]);
const baseUrl = import.meta.env.VITE_API_BASEURL + "/file/uploadFile";
const beforeUploadFn: UploadProps["beforeUpload"] = (rawFile) => {
  // 提示用户是否有权限
  if (userStore.identity !== "超级管理员") {
    ElMessage({
      type: "warning",
      message: "当前为演示账号，不支持操作",
    });
    return false;
  }
};
const handleExceed: UploadProps["onExceed"] = () => {
  ElMessage.warning("最多只能上传3个文件");
};
const handleSuccess = (response: any) => {
  if (response.status === 0) {
    (async () => {
      await bindFileAndUser(localStorage.getItem("name"), response.url);
      await operationLog({
        operation_person: localStorage.getItem("name"),
        operation_content: "上传文件",
        operation_level: 2,
      });
    })();
    ElMessage.success("上传成功");
    getfileFirstPageList();
  } else {
    ElMessage.error(response.msg);
  }
};
// 表格数据
const tableData = ref([
  {
    id: 1,
    file_name: "合同1",
    download_number: 3,
    upload_time: "2021-01-01 12:00:00",
    file_size: "100M",
    upload_person: "张三",
  },
]);

// 分页
const paginationData = reactive({
  filePageCount: 1, //总页数
  fileCurrentPage: 1, //当前所处页数
});
// 获取文件列表总的数量
const fileListTotal = ref<number>(0);
const fileListlength = async () => {
  const res = await getFileListLength();
  fileListTotal.value = res.length;
  paginationData.filePageCount = Math.ceil(res.length / 10);
};
fileListlength();
//默认获取第一页的数据
const getfileFirstPageList = async () => {
  const res = await returnFileListData(paginationData.fileCurrentPage);
  tableData.value = res;
};
getfileFirstPageList();
// 监听文件列表的变化分页事件
const fileCurrentChange = async (value: number) => {
  const res = await returnFileListData(value);
  tableData.value = res;
  paginationData.fileCurrentPage = value;
};

/**
 * 彻底删除
 * @param id 要删除的消息id
 */
const deleteRef = ref();
const handleDelete = (id: number) => {
  // 提示用户是否有权限
  if (userStore.identity !== "超级管理员") {
    ElMessage({
      type: "warning",
      message: "当前为演示账号，不支持操作",
    });
    return;
  }

  bus.emit("deleteID", id);
  deleteRef.value.open();
};
/**
 * 删除成功的回调
 */
const deleteFn = () => {
  fileListlength();
  getfileFirstPageList();
};
/**
 * 下载文件
 * @param id 要下载的文件id
 */
const handleDownload = async (download_number: number, id: number) => {
  ElMessageBox.confirm("您确定要下载该文件吗?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      await updateDownloadFileNumber(download_number, id);
      const url = await downloadFile(id);
      await operationLog({
        operation_person: localStorage.getItem("name"),
        operation_content: "下载文件",
        operation_level: 2,
      });
      deleteFn();
      window.open(url);
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消下载",
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