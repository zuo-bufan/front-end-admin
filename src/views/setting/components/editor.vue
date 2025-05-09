<!-- 
  author: zkz
  @createTime: 2024-08-27 15:35:56
  @Description: wangEditor插件开源 Web 富文本编辑器，开箱即用，配置简单 https://www.wangeditor.com/
  @useMethods:https://coderwang.blog.csdn.net/article/details/132203209?spm=1001.2014.3001.5502
 -->
<template>
  <el-dialog
    v-model="state.dialogFormVisible"
    :title="title"
    width="600px"
    destroy-on-close
  >
    <div style="border: 1px solid #ccc">
      <!-- wangEditor结构 -->
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 500px; overflow-y: hidden"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
      />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="yes"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { onBeforeUnmount, ref, shallowRef, reactive } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { bus } from "@/utils/mitt.js";
import { ElMessage } from "element-plus";
import { operationLog } from "@/api/log.js";
// changecompanyintro
import { changeCompanyIntroduce, getCompanyIntroduce } from "@/api/setting.js";
const title = ref();
// 内容 HTML
const valueHtml = ref();
bus.on("editorTitle", async (id: number) => {
  if (id == 1) {
    title.value = "编辑公司介绍";
    valueHtml.value = await getCompanyIntroduce("公司介绍");
  }
  if (id == 2) {
    title.value = "编辑公司架构";
    valueHtml.value = await getCompanyIntroduce("公司架构");
  }
  if (id == 3) {
    title.value = "编辑公司战略";
    valueHtml.value = await getCompanyIntroduce("公司战略");
  }
  if (id == 4) {
    title.value = "编辑公司高层";
    valueHtml.value = await getCompanyIntroduce("公司高层");
  }
});
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();
// mode
const mode = ref("default");

const toolbarConfig = {
  excludeKeys: [],
};
const editorConfig = {
  placeholder: "请输入内容...",
  MENU_CONF: {
    uploadImage: {
      //上传图片配置
      server: "http://127.0.0.1:3000/set/uploadCompanyPicture", //上传接口地址
      fieldName: "file", //上传文件名
      methods: "post",
      metaWithUrl: true, // 参数拼接到 url 上
      // 单个文件上传成功之后
      // onSuccess(file, res) {
      // },
      // 自定义插入图片
      customInsert(res, insertFn) {
        insertFn(res.url);
      },
    },
  },
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
  // 'group-image',

  // 排除菜单组，写菜单组 key 的值即可
];
// 点击确认 修改文案
const yes = async () => {
  // 去除 编辑两个字
  console.log(title.value.slice(-4));
  // 两个参数 set_text set_name
  const res = await changeCompanyIntroduce(
    valueHtml.value,
    title.value.slice(-4)
  );
  console.log(res);
  if (res.status == 0) {
    ElMessage({
      message: "修改公司介绍成功！",
      type: "success",
    });
    await operationLog({
      operation_person: localStorage.getItem("name"),
      operation_content: "修改公司介绍",
      operation_level: 1,
    });
    state.dialogFormVisible = false;
  } else {
    state.dialogFormVisible = false;
    ElMessage.error("修改公司介绍失败，请检查网络是否通畅！");
  }
};

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
const state = reactive({
  dialogFormVisible: false,
});

// 取消删除
const cancel = () => {
  ElMessage.info("取消编辑！");
  state.dialogFormVisible = false;
};

// 暴露open方法
const open = () => {
  valueHtml.value = "";
  state.dialogFormVisible = true;
};
defineExpose({
  open,
});

// 取消订阅/监听
onBeforeUnmount(() => {
  bus.all.clear();
});
</script>
<style lang="scss" scoped>
</style>