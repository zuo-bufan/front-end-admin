<template>
  <div class="main">
    <div class="container" :class="{ 'right-panel-active': isSignUp }">
      <!-- 注册表单 -->
      <div class="form-container sign-up-container">
        <form @submit.prevent="onSignUp">
          <h1>创建账号</h1>
          <span class="personal-info">
            没钱才上班还是上班才没钱，我不明白哪个环节出了问题，难道有中间商赚差价？</span
          >
          <input
            type="text"
            placeholder="账号"
            v-model="registerForm.account"
          />
          <input
            type="password"
            placeholder="密码"
            v-model="registerForm.password"
          />
          <input
            type="password"
            placeholder="确认密码"
            v-model="registerForm.repassword"
          />
          <button type="submit">注 册</button>
        </form>
      </div>

      <!-- 登录表单 -->
      <div class="form-container sign-in-container">
        <form @submit.prevent="onSignIn">
          <h1>后台管理系统</h1>
          <span class="forget-password" @click="forgetPassword">忘记密码</span>
          <input type="text" placeholder="账号" v-model="loginForm.account" />
          <input
            type="password"
            placeholder="密码"
            v-model="loginForm.password"
          />
          <button type="submit">登 录</button>
        </form>
      </div>

      <!-- 右侧覆盖层 -->
      <div class="overlay-container">
        <div class="overlay">
          <!-- 左侧欢迎内容 -->
          <div class="overlay-panel overlay-left">
            <h1>欢迎回来！</h1>
            <p>别怕眼睛近视，因为在你的面前，除了失败什么也没有。</p>
            <button class="ghost" @click="toggleForm('signIn')">登 录</button>
          </div>

          <!-- 右侧欢迎内容 -->
          <div class="overlay-panel overlay-right">
            <h1>你好，朋友！</h1>
            <p>人还是要乐观 心碎了就对自己说碎碎平安</p>
            <button class="ghost" @click="toggleForm('signUp')">注 册</button>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-content">
      <p>Copyright © 2024-2025 All rights reserved.</p>
      <p>Powered by Vue 3 + Vite 4 + Element Plus</p>
      <p>Design by <a href="https://gitee.com/zuobufan">Zuobufan</a></p>
    </div>
  </div>
  <Forget ref="forgetP"></Forget>
</template>

<script lang="ts" setup>
import Forget from "./forgetPassword.vue";
import { reactive, ref } from "vue";
import { register, login } from "@/api/login.js";
import { loginLog, operationLog } from "@/api/log.js";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { useUserInfor } from "@/store/userinfor.js";

const router = useRouter();
const store = useUserInfor();
// 数据绑定
// 表单接口
interface formData {
  account: number;
  password: string;
  repassword?: string;
}
// 登录表单数据
const loginForm: formData = reactive({
  account: "123456",
  password: "z123456",
});
// 注册表单数据
const registerForm: formData = reactive({
  account: null,
  password: "",
  repassword: "",
});

const isSignUp = ref(false); // 当前是否为注册页面

// 方法
const toggleForm = (action) => {
  if (action === "signUp") {
    isSignUp.value = true;
  } else {
    isSignUp.value = false;
  }
};

/**
 * 登录功能处理函数
 *
 * @returns 无返回值
 */

const onSignIn = async (event) => {
  event.preventDefault(); // 阻止表单默认的提交行为
  // 登录逻辑
  if (loginForm.account == "" || loginForm.password == "") {
    ElMessage.error("账号或密码不能为空");
    return;
  }
  const res = await login(loginForm);
  if (res.message == "登录成功") {
    ElMessage({
      message: "登录成功",
      type: "success",
    });
    const { token } = res;
    const { id, name, department } = res.data;
    await loginLog({
      account: loginForm.account,
      name: name,
      email: res.data.email,
    });
    await operationLog({
      operation_person: name,
      operation_content: "登录账号",
      operation_level: 1,
    });
    sessionStorage.setItem("id", id);
    sessionStorage.setItem("department", department);
    localStorage.setItem("token", token);
    localStorage.setItem("name", name);
    store.userInfor(id);
    router.push("/home");
  } else {
    ElMessage.error("登录失败");
  }
};

/**
 * 注册功能
 *
 * @returns 无返回值
 */
const onSignUp = async (event) => {
  event.preventDefault(); // 阻止表单默认的提交行为
  if (
    registerForm.account == "" ||
    registerForm.password == "" ||
    registerForm.repassword == ""
  ) {
    ElMessage.error("账号或密码或确认密码不能为空");
    return;
  }
  // 注册逻辑
  if (registerForm.password == registerForm.repassword) {
    const res = await register(registerForm);
    console.log(res);
    if (res.status == 0) {
      ElMessage({
        message: "注册成功！",
        type: "success",
      });
      isSignUp.value = false;
    } else {
      ElMessage.error("注册失败，请检查数据是否正确");
    }
  } else {
    ElMessage({
      message: "请检查两次输入的密码是否一致",
      type: "warning",
    });
  }
};

/**
 * 打开忘记密码对话框
 */
const forgetP = ref();
const forgetPassword = () => {
  forgetP.value.open();
};
</script>

<style scoped lang="scss">
// 定义变量
$primary-color: #ff4b2b; // 主颜色
$form-background: rgba(45, 52, 54, 1); // 表单背景色
$input-border: #fff; // 输入框边框颜色
$input-height: 240px; // 输入框固定宽度
$input-font-family: "PLay", sans-serif; // 输入框字体
$transition-duration: 0.6s; // 动画过渡时间
$shadow-color: rgba(0, 0, 0, 0.25); // 阴影颜色

.main {
  font-family: "Montserrat", sans-serif;
  background: #f6f5f7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url("https://images.unsplash.com/photo-1500993855538-c6a99f437aa7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80");
  background-size: cover;
}

// 页面容器
.container {
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: absolute;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
  opacity: 0.8;

  // 注册和登录内容切换动画
  &.right-panel-active {
    .sign-in-container {
      transform: translateX(100%);
    }
    .overlay-container {
      transform: translateX(-100%);
    }
    .sign-up-container {
      transform: translateX(100%);
      opacity: 1;
      z-index: 5;
    }
    .overlay {
      transform: translateX(50%);
    }
    .overlay-left {
      transform: translateX(0);
    }
    .overlay-right {
      transform: translateX(20%);
    }
  }
}

// 表单容器
.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all $transition-duration ease-in-out;

  // 表单背景和布局
  & form {
    background: $form-background;
    display: flex;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: beige;
  }

  // 输入框样式
  input {
    background: #eee;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
  }

  // 特定类型的输入框样式
  input {
    width: $input-height; // 固定宽度
    text-align: center;
    background: transparent;
    border: none;
    border-bottom: 1px solid $input-border;
    font-family: $input-font-family;
    font-size: 16px;
    font-weight: bold;
    padding: 10px 0;
    transition: border 0.5s;
    outline: none;
    color: $input-border;
  }
}

// 社交登录按钮容器
.social-container {
  margin: 20px 0;

  // 社交按钮样式
  a {
    border: 1px solid #ddd; // 边框颜色
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    height: 40px;
    width: 40px;
    transition: background-color 0.3s;
    &:hover {
      background-color: #ddd;
    }
  }
}

// 按钮样式
button {
  border-radius: 20px;
  border: 1px solid $primary-color;
  background: $primary-color;
  color: $input-border;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  cursor: pointer;
  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }

  &.ghost {
    border-color: $primary-color;
  }
}

// 覆盖层容器
.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform $transition-duration ease-in-out;
  z-index: 100;

  // 覆盖层样式
  .overlay {
    background: transparent;
    color: #fff;
    position: absolute;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;

    // 右侧覆盖层面板
    .overlay-panel {
      position: absolute;
      top: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0 10px;
      height: 100%;
      width: 50%;
      text-align: center;
      transform: translateX(0);
      transition: transform 0.6s ease-in-out;
      h1 {
        font-weight: bold;
        margin: 0;
        color: beige;
      }

      p {
        font-size: 14px;
        font-weight: bold;
        line-height: 20px;
        letter-spacing: 0.5px;
        margin: 20px 0 30px;
      }

      // 左侧面板
      &.overlay-left {
        transform: translateX(0%);
      }

      // 右侧面板
      &.overlay-right {
        right: 0;
        transform: translateX(0);
      }
    }
  }
}

// 注册和登录容器的特定样式
.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.sign-up-container {
  left: 0;
  width: 50%;
  z-index: 1;
  opacity: 0;
}
.personal-info {
  font-size: 12px;
  color: #fff;
  margin-bottom: 20px;
  line-height: 1.5;
}
.forget-password {
  font-size: 12px;
  color: #fff;
  text-decoration: underline;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    color: $primary-color;
    text-decoration: none;
  }
  &:active {
    transform: scale(0.95);
  }
}
// 底部内容
.bottom-content {
  position: absolute;
  bottom: 20px;
  text-align: center;
  font-size: 12px;
  color: #fff;
  a {
    color: #fff;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  p {
    margin: 5px 0;
  }
}
</style>
