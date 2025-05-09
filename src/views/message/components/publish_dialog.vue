<template>
  <div>
    <el-dialog
      :title="title"
      v-model="dialogFormVisible"
      width="50%"
      @close="closeDialog"
    >
      <el-form
        ref="formRef"
        :model="FormData"
        label-width="120px"
        style="max-width: 600px"
        :rules="rules"
        label-position="left"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item label="消息标题" prop="message_title">
          <el-input
            type="text"
            v-model="FormData.message_title"
            style="width: 220px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="发布部门"
          prop="message_publish_department"
          v-if="title == '发布公告' || title == '公司公告编辑'"
        >
          <el-select
            v-model="FormData.message_publish_department"
            placeholder="请选择发布部门"
            style="width: 220px"
          >
            <el-option
              v-for="(item, index) in options"
              :key="index"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布人" prop="message_publish_name">
          <el-input
            type="text"
            v-model="FormData.message_publish_name"
            style="width: 220px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="接收部门"
          prop="message_receipt_object"
          v-if="title == '发布公告' || title == '公司公告编辑'"
        >
          <el-select
            v-model="FormData.message_receipt_object"
            placeholder="接收部门"
            style="width: 220px"
          >
            <el-option
              v-for="(item, index) in allOptions"
              :key="index"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="公告等级"
          prop="message_level"
          v-if="title == '发布公告' || title == '公司公告编辑'"
        >
          <el-select
            v-model="FormData.message_level"
            placeholder="公告等级"
            style="width: 220px"
          >
            <el-option label="一般" value="一般" />
            <el-option label="重要" value="重要" />
            <el-option label="必要" value="必要" />
          </el-select>
        </el-form-item>
        <el-form-item label="消息内容" prop="message_content">
          <div style="border: 1px solid #ccc">
            <!-- wangEditor结构 -->
            <Toolbar
              style="border-bottom: 1px solid #ccc"
              :editor="editorRef"
              :defaultConfig="toolbarConfig"
              :mode="mode"
            />
            <Editor
              style="height: 200px; overflow-y: hidden"
              v-model="FormData.message_content"
              :defaultConfig="editorConfig"
              :mode="mode"
              @onCreated="handleCreated"
            />
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="savePublishMessage"
            >发布消息</el-button
          >
          <el-button @click="closeDialog">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { ref, reactive, shallowRef, onBeforeUnmount } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { bus } from "@/utils/mitt.js";
import { publishMessage, getMessage, editMessage } from "@/api/message.js";
import { getDepartment } from "@/api/setting.js";
import { ElMessage } from "element-plus";
import { tracking } from "@/utils/operation.js";
import { changeUserReadList } from "@/api/dep_msg.js";
import { useUnreadMessage } from "@/store/unreadmessage.js";
const msgStore = useUnreadMessage();
const dialogFormVisible = ref(false);
interface FormData {
  id: number;
  message_title: string;
  message_publish_name: string;
  message_content: string;
  message_publish_department: string;
  message_category: string;
  message_receipt_object: string;
  message_level: string;
}
// 表单数据
const FormData = reactive({
  id: 1,
  message_title: "",
  message_publish_name: "",
  message_content: "",
  message_publish_department: "",
  message_category: "",
  message_receipt_object: "",
  message_level: "",
});

const rules = reactive({
  message_title: [
    { required: true, message: "请输入消息标题", trigger: "blur" },
  ],
  message_publish_department: [
    { required: true, message: "请输入消息内容", trigger: "blur" },
  ],
  message_publish_name: [
    { required: true, message: "请输入发布人", trigger: "blur" },
  ],
  message_receipt_object: [
    { required: true, message: "请选择接收部门", trigger: "blur" },
  ],
  message_level: [
    { required: true, message: "请选择公告等级", trigger: "blur" },
  ],
  message_content: [
    { required: true, message: "请输入消息内容", trigger: "blur" },
  ],
});
const title = ref("");
bus.on("openPublish", (id: number) => {
  if (id == 1) {
    title.value = "发布公告";
  } else if (id == 2) {
    title.value = "发布系统公告";
  }
});
bus.on("openEdit", (row: any) => {
  console.log(row);
  title.value = row.title;
  FormData.id = row.id;
  FormData.message_title = row.message_title;
  FormData.message_publish_name = row.message_publish_name;
  FormData.message_content = row.message_content;
  FormData.message_publish_department = row.message_publish_department;
  FormData.message_receipt_object = row.message_receipt_object;
  FormData.message_level = row.message_level;
});

// 不包括全体成员
const options = ref([]);
// 包括全体成员
const allOptions = ref([]);
/**
 * 获取项目选择列表
 */
const getdepartment = async () => {
  const res = await getDepartment();
  let data = [];
  let allData = [];
  for (let i = 0; i < res.length; i++) {
    let obj = {
      value: res[i],
    };
    data.push(obj);
    allData.push(obj);
  }
  options.value = data;
  allData.push({ value: "全体成员" });
  allOptions.value = allData;
};

const open = () => {
  getdepartment();
  dialogFormVisible.value = true;
};

/**
 * 发布消息
 * @param formData 表单数据
 * @returns
 */

const emit = defineEmits(["handleCompanySuccess", "handleSystemSuccess"]);
const formRef = ref();
const savePublishMessage = () => {
  formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      if (title.value == "发布公告") {
        FormData.message_category = "公司公告";
        const res = await publishMessage(FormData);
        // console.log(res);
        dialogFormVisible.value = false;
        formRef.value.resetFields();
        if (res.status === 0) {
          ElMessage({
            message: res.message,
            type: "success",
          });
          tracking(
            "公司公告发布",
            localStorage.getItem("name"),
            FormData.message_title,
            1
          );
          // 发布成功后，更新接收部门的未读消息列表
          await changeUserReadList(res.department, res.id);
          msgStore.getUnreadMessage(sessionStorage.getItem("id"));
          emit("handleCompanySuccess");
        } else {
          ElMessage.error("创建失败");
        }
      } else if (title.value == "公司公告编辑") {
        const res = await editMessage(FormData);
        // console.log(res);
        dialogFormVisible.value = false;
        formRef.value.resetFields();
        if (res.status === 0) {
          ElMessage({
            message: res.message,
            type: "success",
          });
          tracking(
            "公司公告编辑",
            localStorage.getItem("name"),
            FormData.message_title,
            1
          );
          emit("handleCompanySuccess");
        } else {
          ElMessage.error("编辑失败");
        }
      } else if (title.value == "系统公告编辑") {
        const res = await editMessage(FormData);
        // console.log(res);
        dialogFormVisible.value = false;
        formRef.value.resetFields();
        if (res.status === 0) {
          ElMessage({
            message: res.message,
            type: "success",
          });
          tracking(
            "系统公告编辑",
            localStorage.getItem("name"),
            FormData.message_title,
            1
          );
          emit("handleSystemSuccess");
        } else {
          ElMessage.error("编辑失败");
        }
      } else if (title.value == "发布系统公告") {
        FormData.message_category = "系统公告";
        const res = await publishMessage(FormData);
        // console.log(res);
        dialogFormVisible.value = false;
        if (res.status === 0) {
          ElMessage({
            message: res.message,
            type: "success",
          });
          tracking(
            "系统公告发布",
            localStorage.getItem("name"),
            FormData.message_title,
            1
          );
          emit("handleSystemSuccess");
        } else {
          ElMessage.error("创建失败");
        }
      }
    }
  });
};

// Editor实例
// 编辑器实例，必须用 shallowRef
// 内容 HTML
// const valueHtml = ref();
const editorRef = shallowRef();
// mode
const mode = ref("default");

const toolbarConfig = {
  excludeKeys: [],
};
const editorConfig = {
  placeholder: "请输入公告内容...",
  // MENU_CONF: {
  // uploadImage: {
  //   //上传图片配置
  //   server: "http://127.0.0.1:3000/set/uploadCompanyPicture", //上传接口地址
  //   fieldName: "file", //上传文件名
  //   methods: "post",
  //   metaWithUrl: true, // 参数拼接到 url 上
  //   // 单个文件上传成功之后
  //   // onSuccess(file, res) {
  //   // },
  //   // 自定义插入图片
  //   customInsert(res, insertFn) {
  //     insertFn(res.url);
  //   },
  // },
  // },
};
// 上传图片，修改 uploadImage 菜单配置
// 需要注意的是，如何去修改参数？
toolbarConfig.excludeKeys = [
  "blockquote",
  "bgColor",
  "color",
  "group-more-style",
  "fontFamily",
  "bulletedList",
  "numberedList",
  "lineHeight",
  "todo",
  "emotion",
  "insertLink",
  "group-video",
  "insertTable",
  "codeBlock",
  "divider",
  "fullScreen",
  "group-image",

  // 排除菜单组，写菜单组 key 的值即可
];
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};

/**
 * 关闭弹窗
 */
const closeDialog = () => {
  formRef.value.resetFields();
  dialogFormVisible.value = false;
};

defineExpose({ open });

// 取消订阅/监听
onBeforeUnmount(() => {
  bus.all.clear();
});
</script>

<style lang="scss" scoped>
</style>