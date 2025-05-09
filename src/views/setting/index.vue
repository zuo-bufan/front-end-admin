<!-- 
  author: zkz
  @createTime: 2024-08-17 15:23:56
  @Description: 系统设置页面内容
 -->
<template>
  <div>
    <breadCrumb ref="breadcrumb" :item="item"></breadCrumb>
    <!-- 外壳 -->
    <div class="common-wrapped">
      <!-- 内壳 -->
      <div class="common-content">
        <el-tabs
          v-model="activeName"
          class="demo-tabs"
          @tab-click="handleClick"
        >
          <el-tab-pane label="账号详情" name="first">
            <div class="account-info-wrapped">
              <span>用户头像：</span>
              <div class="account-info-content">
                <!-- action 是上传头像的接口 -->
                <el-upload
                  class="avatar-uploader"
                  :action="baseUrl"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img
                    v-if="userStore.imageUrl"
                    :src="userStore.imageUrl"
                    class="avatar"
                  />
                  <el-icon v-else class="avatar-uploader-icon">
                    <Plus />
                  </el-icon>
                </el-upload>
              </div>
            </div>
            <div class="account-info-wrapped">
              <span>用户账号：</span>
              <div class="account-info-content">
                <el-input v-model="userStore.account" disabled></el-input>
              </div>
            </div>
            <div class="account-info-wrapped">
              <span>用户密码：</span>
              <div class="account-info-content">
                <el-button type="primary" @click="goChangePassword"
                  >修改密码</el-button
                >
              </div>
            </div>
            <div class="account-info-wrapped">
              <span>用户姓名：</span>
              <div class="account-info-content">
                <el-input v-model="userStore.name"></el-input>
                <el-button class="btn-save" type="primary" @click="saveName"
                  >保存</el-button
                >
              </div>
            </div>
            <div class="account-info-wrapped">
              <span>用户性别：</span>
              <div class="account-info-content">
                <el-select v-model="userStore.sex" style="width: 240px">
                  <el-option label="男" value="man" />
                  <el-option label="女" value="woman" />
                </el-select>
                <el-button class="btn-save" type="primary" @click="saveSex"
                  >保存</el-button
                >
              </div>
            </div>
            <div class="account-info-wrapped">
              <span>用户身份：</span>
              <div class="account-info-content">
                <el-input v-model="userStore.identity" disabled></el-input>
              </div>
            </div>
            <div class="account-info-wrapped">
              <span>用户部门：</span>
              <div class="account-info-content">
                <el-input v-model="userStore.department" disabled></el-input>
              </div>
            </div>
            <div class="account-info-wrapped">
              <span>用户邮箱：</span>
              <div class="account-info-content">
                <el-input v-model="userStore.email"></el-input>
                <el-button class="btn-save" type="primary" @click="saveEmail"
                  >保存</el-button
                >
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="公司信息" name="second">
            <div class="account-info-wrapped">
              <span>公司名称：</span>
              <div class="account-info-content">
                <el-input v-model="companyName"></el-input>
                <el-button
                  class="btn-save"
                  type="primary"
                  @click="changeCompanyname"
                  >编辑公司名称</el-button
                >
              </div>
            </div>
            <div class="account-info-wrapped">
              <span>公司介绍：</span>
              <div class="account-info-content">
                <el-button type="success" @click="openEditor(1)"
                  >编辑公司介绍</el-button
                >
              </div>
            </div>
            <div class="account-info-wrapped">
              <span>公司架构：</span>
              <div class="account-info-content">
                <el-button type="success" @click="openEditor(2)"
                  >编辑公司架构</el-button
                >
              </div>
            </div>
            <div class="account-info-wrapped">
              <span>公司战略：</span>
              <div class="account-info-content">
                <el-button type="success" @click="openEditor(3)"
                  >编辑公司战略</el-button
                >
              </div>
            </div>
            <div class="account-info-wrapped">
              <span>现任高层：</span>
              <div class="account-info-content">
                <el-button type="success" @click="openEditor(4)"
                  >编辑现任高层</el-button
                >
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="首页管理" name="third">
            <div class="home-wrapped">
              <!-- 提示 -->
              <div class="tips">
                <span> 提示：点击图片框进行切换首页轮播图 </span>
              </div>
              <!-- 轮播图 -->
              <div
                class="swiper-wrapped"
                v-for="(item, index) in swiperData"
                :key="index"
              >
                <div class="swiper-name">轮播图{{ index + 1 }}：</div>
                <el-upload
                  class="avatar-uploader"
                  action="http://127.0.0.1:3000/set/uploadSwiper"
                  :show-file-list="false"
                  :on-success="handleSwiperSuccess"
                  :before-upload="beforeAvatarUpload"
                  :data="item"
                >
                  <template #trigger>
                    <img
                      v-if="imageUrl[index]"
                      :src="imageUrl[index]"
                      class="swiper"
                    />
                    <el-icon v-else class="avatar-uploader-icon1">
                      <Plus />
                    </el-icon>
                  </template>
                </el-upload>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="其他设置" name="fourth">
            <div class="other-set">
              <div class="department-set">
                <span>部门设置：</span>
                <el-tag
                  v-for="tag in dynamicTags"
                  :key="tag"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)"
                >
                  {{ tag }}
                </el-tag>
                <el-input
                  v-if="inputVisible"
                  ref="InputRef"
                  v-model="inputValue"
                  class="w-20"
                  size="small"
                  @keyup.enter="handleInputConfirm"
                  @blur="handleInputConfirm"
                />
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput"
                >
                  + 添加部门
                </el-button>
              </div>
              <div class="department-set">
                <span>产品设置：</span>
                <el-tag
                  v-for="tag in productTags"
                  :key="tag"
                  closable
                  :disable-transitions="false"
                  @close="productHandleClose(tag)"
                >
                  {{ tag }}
                </el-tag>
                <el-input
                  v-if="productInputVisible"
                  ref="productInputRef"
                  v-model="productInputValue"
                  class="w-20"
                  size="small"
                  @keyup.enter="handleInputConfirm1"
                  @blur="handleInputConfirm1"
                />
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput1"
                >
                  + 添加产品类型
                </el-button>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
  <change ref="changeP"></change>
  <editor ref="editorP"></editor>
</template>

<script lang="ts" setup>
import { ref, reactive, nextTick, toRaw } from "vue";
import breadCrumb from "@/components/BreadCrumb.vue";
import type { TabsPaneContext } from "element-plus";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import type { UploadProps } from "element-plus";
import {
  bindAccount,
  changeName,
  changeSex,
  changeEmail,
} from "@/api/userinfor.js";
import { useUserInfor } from "@/store/userinfor.js";
import { bus } from "@/utils/mitt.js";
import change from "./components/changePassword.vue";
import editor from "./components/editor.vue";
import {
  getCompanyName,
  changeCompanyName,
  getAllSwiper,
  setDepartment,
  getDepartment,
  getProduct,
  setProduct,
} from "@/api/setting.js";
import { ElInput } from "element-plus";
import type { InputInstance } from "element-plus";
import { operationLog } from "@/api/log.js";
const breadcrumb = ref();
const item = reactive({
  first: "系统设置",
  second: "",
  imgIcon: import.meta.env.VITE_APP_SVGURL + "/assets/svg/location.svg",
});
const changeP = ref();
// tabs标签
const activeName = ref("first");
const handleClick = (tab: TabsPaneContext, event: Event) => {
  // console.log(tab, event)
};
// store
const userStore = useUserInfor();

const handleAvatarSuccess: UploadProps["onSuccess"] = (response) => {
  // imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  console.log(response);
  if (response.status == 0) {
    userStore.$patch({
      imageUrl: response.url,
    });
    ElMessage({
      message: "更新头像成功",
      type: "success",
    }),
      (async () => {
        await bindAccount(userStore.account, response.onlyId, response.url);
        await operationLog({
          operation_person: localStorage.getItem("name"),
          operation_content: "更新头像",
          operation_level: 1,
        });
      })();
  } else {
    ElMessage.error("更新头像失败");
  }
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("头像必须是JPG或PNG格式!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("头像必须小于2MB!");
    return false;
  }
  return true;
};
// 打开修改密码弹框
const goChangePassword = () => {
  changeP.value.open();
};
// 修改姓名
const saveName = async () => {
  const res = await changeName(sessionStorage.getItem("id"), userStore.name);
  // console.log(res);
  if (res.status == 0) {
    ElMessage({
      message: "修改成功",
      type: "success",
    });
    await operationLog({
      operation_person: localStorage.getItem("name"),
      operation_content: "修改用户名称",
      operation_level: 2,
    });
  } else {
    ElMessage.error("修改失败，请重新输入！");
  }
};
// 修改性别
const saveSex = async () => {
  const res = await changeSex(sessionStorage.getItem("id"), userStore.sex);
  console.log(res);
  if (res.status == 0) {
    ElMessage({
      message: "修改成功",
      type: "success",
    });
    await operationLog({
      operation_person: localStorage.getItem("name"),
      operation_content: "修改用户性别",
      operation_level: 2,
    });
  } else {
    ElMessage.error("修改失败，请重新输入！");
  }
};
// 修改邮箱
const saveEmail = async () => {
  const res = await changeEmail(sessionStorage.getItem("id"), userStore.email);
  console.log(res);
  if (res.status == 0) {
    ElMessage({
      message: "修改成功",
      type: "success",
    });
    await operationLog({
      operation_person: localStorage.getItem("name"),
      operation_content: "修改用户邮箱",
      operation_level: 2,
    });
  } else {
    ElMessage.error("修改失败，请重新输入！");
  }
};

// 公司名称
const companyName = ref();
const getCompanyname = async () => {
  companyName.value = await getCompanyName();
};
getCompanyname();
// 修改公司名称
const changeCompanyname = async () => {
  const res = await changeCompanyName(companyName.value);
  if (res.status == 0) {
    ElMessage({
      message: "修改成功!",
      type: "success",
    });
    await operationLog({
      operation_person: localStorage.getItem("name"),
      operation_content: "修改公司名称",
      operation_level: 1,
    });
  } else {
    ElMessage.error("修改失败，请重新输入！");
  }
};
// 富文本组件ref
const editorP = ref();
// 打开 富文本 公司介绍弹框
const openEditor = (id: number) => {
  // mitt.js 事件总线
  bus.emit("editorTitle", id);
  editorP.value.open();
};

// 首页管理
const swiperData = [
  { name: "swiper1" },
  { name: "swiper2" },
  { name: "swiper3" },
  { name: "swiper4" },
  { name: "swiper5" },
  { name: "swiper6" },
];
// 上传轮播图
const baseUrl = import.meta.env.VITE_API_BASEURL + "/user/uploadAvatar";
const imageUrl = ref([]);
const handleSwiperSuccess: UploadProps["onSuccess"] = async (response) => {
  // console.log(response);
  getAllSwiperFn();
  await operationLog({
    operation_person: localStorage.getItem("name"),
    operation_content: "修改首页轮播图",
    operation_level: 1,
  });
};
// 获取所有轮播图
const getAllSwiperFn = async () => {
  const res = await getAllSwiper();
  // console.log(res);
  imageUrl.value = res.data;
};
getAllSwiperFn();

// 部门设置模块
const inputValue = ref("");
const dynamicTags = ref([]);
const inputVisible = ref(false);
const InputRef = ref<InputInstance>();
// 获取部门设置标签
const getdepartment = async () => {
  dynamicTags.value = await getDepartment();
};
getdepartment();
// 关闭标签删除
const handleClose = async (tag: string) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
  const res = await setDepartment(JSON.stringify(dynamicTags.value));
  if (res.status == 0) {
    ElMessage({
      message: "删除部门设置成功!",
      type: "success",
    });
    await operationLog({
      operation_person: localStorage.getItem("name"),
      operation_content: "删除部门设置",
      operation_level: 1,
    });
  } else {
    ElMessage.error("删除部门设置失败，请重新输入！");
  }
};
// 添加显示输入框
const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    InputRef.value!.input!.focus();
  });
};
// 输入确定添加标签
const handleInputConfirm = async () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value);
    const res = await setDepartment(JSON.stringify(dynamicTags.value));
    if (res.status == 0) {
      ElMessage({
        message: "添加部门设置成功!",
        type: "success",
      });
      await operationLog({
        operation_person: localStorage.getItem("name"),
        operation_content: "添加部门设置",
        operation_level: 1,
      });
    } else {
      ElMessage.error("添加部门设置失败，请重新输入！");
    }
  }
  inputVisible.value = false;
  inputValue.value = "";
};

// 产品设置模块
const productInputValue = ref("");
const productTags = ref([]);
const productInputVisible = ref(false);
const productInputRef = ref<InputInstance>();
// 获取部门设置标签
const getproduct = async () => {
  productTags.value = await getProduct();
};
getproduct();
// 关闭标签删除
const productHandleClose = async (tag: string) => {
  productTags.value.splice(productTags.value.indexOf(tag), 1);
  const res = await setProduct(JSON.stringify(productTags.value));
  if (res.status == 0) {
    ElMessage({
      message: "删除产品设置成功!",
      type: "success",
    });
    await operationLog({
      operation_person: localStorage.getItem("name"),
      operation_content: "删除产品设置",
      operation_level: 1,
    });
  } else {
    ElMessage.error("删除产品设置失败，请重新输入！");
  }
};
// 添加显示输入框
const showInput1 = () => {
  productInputVisible.value = true;
  nextTick(() => {
    productInputRef.value!.input!.focus();
  });
};
// 输入确定添加标签
const handleInputConfirm1 = async () => {
  console.log(productInputValue.value);
  if (productInputValue.value) {
    productTags.value.push(productInputValue.value);
    const res = await setProduct(JSON.stringify(productTags.value));
    if (res.status == 0) {
      ElMessage({
        message: "添加产品设置成功!",
        type: "success",
      });
      await operationLog({
        operation_person: localStorage.getItem("name"),
        operation_content: "添加产品设置",
        operation_level: 1,
      });
    } else {
      ElMessage.error("添加产品设置失败，请重新输入！");
    }
  }
  productInputVisible.value = false;
  productInputValue.value = "";
};

// // 账号信息
// const accountdata = reactive({
// 	account: '', //账号
// 	identity: '', //用户身份
// 	department: '', //用户部门
// 	name: '',//用户姓名
// 	sex: '', //用户性别
// 	email: '' //用户邮箱
// })
</script>

<style lang="scss" scoped>
// 外壳
.common-wrapped {
  padding: 8px;
  background-color: #f5f5f5;
  // height: 100%;
  height: calc(100vh - 101px);
  font-size: 14px;

  // 内容
  .common-content {
    padding: 0 10px;
    height: 100%;
    background-color: #fff;
    overflow: auto;

    //账号信息外壳
    .account-info-wrapped {
      display: flex;
      align-items: center;
      padding-left: 50px;
      padding-bottom: 15px;

      // 账号信息内容
      .account-info-content {
        display: flex;
        margin: 0 16px 0 5px;

        .btn-save {
          margin-left: 20px;
        }
      }
    }

    // 首页管理外壳
    .home-wrapped {
      padding-left: 50px;
      display: flex;
      flex-direction: column;

      .tips {
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        span {
          font-size: 14px;
          color: silver;
        }
      }

      // 轮播图样式
      .swiper-wrapped {
        display: flex;
        margin-bottom: 16px;

        .swiper-name {
          font-size: 14px;
          margin-bottom: 24px;
          margin-right: 3px;
        }

        .swiper {
          width: 336px;
          height: 96px;
        }
      }
    }
  }
}

.other-set {
  padding-left: 50px;
  font-size: 14px;

  .department-set {
    margin-bottom: 24px;

    span {
      margin-right: 24px;
    }
  }
}

// tabs标签
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

// 头像
.avatar-uploader .avatar {
  width: 120px;
  height: 120px;
  display: block;
}

// 输入框的长度
:deep(.el-input) {
  width: 240px;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  text-align: center;
}

.el-icon.avatar-uploader-icon1 {
  font-size: 28px;
  color: #8c939d;
  width: 336px;
  height: 96px;
  text-align: center;
}
</style>