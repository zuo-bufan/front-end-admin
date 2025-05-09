<!-- /* 
* @Author: zkz    
* @CreateTime: 2025-03-18 09:35:17
* @description: 部门消息弹框组件
*/ -->
<template>
  <el-dialog
    v-model="dialogVisible"
    title="部门消息"
    width="700px"
    center
    @click="closeDialogRefresh"
  >
    <el-container>
      <el-aside width="350px">
        <div class="message-list-wrapped">
          <div class="list-table-content">
            <el-table
              :data="tableData"
              style="width: 100%"
              highlight-current-row
              @row-click="getDetailsFn"
            >
              <el-table-column type="index" width="30" />
              <el-table-column type="index" width="12">
                <template #default="{ row }">
                  <div
                    :class="ifRead(row.id) ? 'icon-read' : 'icon-unread'"
                  ></div>
                </template>
              </el-table-column>
              <el-table-column prop="message_title" label="主题">
                <template #default="{ row }">
                  <div class="title">{{ row.message_title }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="message_level" label="等级" width="80">
                <template #default="{ row }">
                  <el-tag
                    class="mx-1"
                    v-if="row.message_level === '一般'"
                    round
                    >{{ row.message_level }}</el-tag
                  >
                  <el-tag
                    class="mx-1"
                    round
                    type="wraning"
                    v-if="row.message_level === '重要'"
                    >{{ row.message_level }}</el-tag
                  >
                  <el-tag
                    class="mx-1"
                    round
                    type="danger"
                    v-if="row.message_level === '必要'"
                    >{{ row.message_level }}</el-tag
                  >
                </template>
              </el-table-column>
              <el-table-column
                prop="message_create_time"
                label="发布日期"
                width="110"
              >
                <template #default="{ row }">
                  <div>{{ row.message_create_time?.slice(0, 10) }}</div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-aside>
      <el-main>
        <div class="detail-content" v-if="messageInfor.message_title !== ''">
          <div>{{ messageInfor.message_title }}</div>
          <div v-html="messageInfor.message_content"></div>
        </div>
        <div class="detail-content" v-else>请点击列表中的消息进行查看</div>
      </el-main>
    </el-container>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import {
  getDepartmentMsg,
  getDepartmentMsgList,
  getReadListAndStatus,
  clickReadListDelete,
} from "@/api/dep_msg.js";
import { updateClickNumber } from "@/api/message.js";
import { useUnreadMessage } from "@/store/unreadmessage.js";
const msgStore = useUnreadMessage();
// 表格数据
const tableData = ref([]);
// 未读id列表数据
const readIdList = ref([]);
//
const messageInfor = reactive({
  message_title: "",
  message_content: "",
});
// 获取部门消息列表
const getDepartmentMsgListFn = async () => {
  const id = sessionStorage.getItem("id");
  const department = sessionStorage.getItem("department");
  if (department !== null) {
    const res = await getReadListAndStatus(id);
    tableData.value = await getDepartmentMsg(department);
    if (res[0].read_status == 0) {
      const { read_list } = await getDepartmentMsgList({ id, department });
      readIdList.value = JSON.parse(read_list);
    } else {
      readIdList.value = JSON.parse(res[0].read_list);
    }
  }
};
//获取消息详情
const getDetailsFn = async (row: any) => {
  await updateClickNumber({
    id: row.id,
    message_click_number: row.message_click_number,
  });
  await clickReadListDelete({
    id: sessionStorage.getItem("id"),
    readid: row.id,
  });
  msgStore.getUnreadMessage(sessionStorage.getItem("id"));
  messageInfor.message_title = row.message_title;
  messageInfor.message_content = row.message_content;
  getDepartmentMsgListFn();
};
// 判断是否已读
const ifRead = (id: number) => {
  if (readIdList.value.indexOf(id) !== -1) {
    return false;
  } else {
    return true;
  }
};
const emit = defineEmits(["success"]);
//关闭弹框刷新首页的未读数量
const closeDialogRefresh = () => {
  emit("success");
  // dialogVisible.value = false;
};
// 弹框控制
const dialogVisible = ref(false);
// 打开弹框
const open = () => {
  dialogVisible.value = true;
  getDepartmentMsgListFn();
};

defineExpose({ open });
</script>

<style lang="scss" scoped>
.el-aside {
  padding-left: 8px;
  min-height: 300px;
}
.el-main {
  min-height: 300px;
  --el-main-padding: 0px;
  border-left: 1px solid #eee;
}
.message-list-wrapped {
  height: 300px;
}
.list-table-content {
  min-height: 10px;
  padding: 8px;
  .el-table {
    font-size: 13px;
  }
}
.title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.detail-content {
  padding: 8px;
}
.icon-read {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #a9a9a9;
  padding: 2px;
  margin-right: 5px;
}
.icon-unread {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ffa500;
  margin-right: 5px;
}
</style>
