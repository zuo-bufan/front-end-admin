<!-- 
  author: zkz
  @createTime: 2024-08-06 09:40:53
  @Description: 登录页面
 -->
<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header-wrapped">
        <div class="header-content">
          <h3>通用后台管理系统</h3>
          <span class="welcome">欢迎您的登录</span>
        </div>
      </el-header>
      <el-main>
        <div class="login-wrapped">
          <el-card class="box-card">
            <el-tabs v-model="activeName" class="demo-tabs" stretch>
              <el-tab-pane label="登录" name="first">
                <el-form
                  ref="loginform"
                  class="login-form"
                  :model="loginForm"
                  :rules="loginRules"
                >
                  <el-form-item label="账号" prop="account">
                    <el-input
                      v-model="loginForm.account"
                      placeholder="请输入账号"
                      @keyup.enter="goLogin"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="password">
                    <el-input
                      v-model="loginForm.password"
                      placeholder="请输入密码"
                      show-password
                      @keyup.enter="goLogin"
                    ></el-input>
                  </el-form-item>
                  <div class="foot-wrapped">
                    <div class="forget-password">
                      <span class="test-account">
                        <b>测试账号：</b> 123456 <b> 密码：</b> z123456
                      </span>
                      <span class="forget-pwd-btn" @click="forgetPassword"
                        >忘记密码</span
                      >
                    </div>
                    <div class="foot-btn">
                      <el-button type="primary" @click="goLogin"
                        >登录</el-button
                      >
                    </div>
                    <div class="foot-go-register">
                      还没有账号？<span class="go-register">马上注册</span>
                    </div>
                  </div>
                </el-form>
              </el-tab-pane>
              <el-tab-pane label="注册" name="second">
                <el-form
                  ref="registerform"
                  class="register-form"
                  :model="registerForm"
                  :rules="registerRules"
                >
                  <el-form-item label="账号" prop="account">
                    <el-input
                      v-model="registerForm.account"
                      placeholder="账号长度3-12位"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="password">
                    <el-input
                      v-model="registerForm.password"
                      placeholder="密码需长度6-12位含字母数字"
                      show-password
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="确认密码" prop="repassword">
                    <el-input
                      v-model="registerForm.repassword"
                      placeholder="请再次输入密码"
                      show-password
                    ></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="goRegister"
                      >注册</el-button
                    >
                  </el-form-item>
                </el-form>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </div>
      </el-main>
      <el-footer class="footer-wrapped">
        <div class="footer-content">
          <div>
            <span>阿里云博客专家</span> | <span>CSDN论坛UP博主</span> |
            <span>网络工程师</span> | <span>华为HCIA</span> |
            <span>野生技能自学协会会员</span>
          </div>
        </div>
        <div class="copyright">
          <span>Copyright @ 前端小左 版权所有</span>
        </div>
      </el-footer>
    </el-container>
    <Forget ref="forgetP"></Forget>
  </div>
</template>
<script lang="ts" setup>
import Forget from "./forgetPassword.vue";
import { reactive, ref } from "vue";
import { register, login } from "@/api/login.js";
import { loginLog, operationLog } from "@/api/log.js";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { useUserInfor } from "@/store/userinfor.js";
const activeName = ref("first");
const router = useRouter();
const loginform = ref(null);
const registerform = ref(null);
const store = useUserInfor();
// 表单接口
interface formData {
  account: number;
  password: string;
  repassword?: string;
}
// 登录表单数据
const loginForm: formData = reactive({
  account: null,
  password: "",
});
const loginRules = reactive({
  account: [{ required: true, message: "请输入账号", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});
const registerRules = reactive({
  account: [
    { required: true, message: "请输入账号", trigger: "blur" },
    { min: 3, max: 12, message: "账号长度限制为3-12位", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 12, message: "密码长度限制为6-12位", trigger: "blur" },
  ],
  repassword: [
    { required: true, message: "请输入确认密码", trigger: "blur" },
    { min: 6, max: 12, message: "密码长度限制为6-12位", trigger: "blur" },
  ],
});
// 注册表单数据
const registerForm: formData = reactive({
  account: null,
  password: "",
  repassword: "",
});
// 注册按钮触发事件
const goRegister = () => {
  registerform.value.validate(async (valid, fields) => {
    if (valid) {
      if (registerForm.password === registerForm.repassword) {
        const { data } = await register(registerForm);
        console.log(data);
        if (data.message == "注册账号成功！") {
          ElMessage({
            message: "注册成功！",
            type: "success",
          });
          activeName.value = "first";
          registerform.value.resetFields();
        } else {
          ElMessage.error("注册失败，请检查数据是否正确");
        }
      } else {
        ElMessage({
          message: "请检查两次输入的密码是否一致",
          type: "warning",
        });
      }
    }
  });
};

// 登录按钮触发事件
const goLogin = () => {
  loginform.value.validate(async (valid, fields) => {
    if (valid) {
      const res = await login(loginForm);
      // console.log(res);
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
    }
  });
};

const forgetP = ref();
// 忘记密码
const forgetPassword = () => {
  forgetP.value.open();
};
</script>
<style lang="scss" scoped>
.header-wrapped {
  .header-content {
    width: 1100px;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    align-items: center;

    .welcome {
      font-size: 13px;
    }
  }
}

.el-main {
  background-image: url("@/assets/qi.jpg");
  height: 520px;
  --el-main-padding: 0;

  .login-wrapped {
    width: 1100px;
    height: 520px;
    margin: 0 auto;

    .box-card {
      width: 350px;
      height: 375px;
      float: right;
      position: relative;
      top: 14%;

      .el-form {
        margin-top: 30px;

        .foot-wrapped {
          display: flex;
          flex-direction: column;

          .forget-password {
            display: flex;
            justify-content: space-between;
            .test-account {
              font-size: 12px;
              color: #999;
            }

            .forget-pwd-btn {
              font-size: 12px;
              color: #409eff;
              cursor: pointer;
            }
          }

          .foot-btn {
            margin-top: 10px;

            .el-button {
              width: 100%;
              height: 45px;
              font-size: 16px;
            }
          }

          .foot-go-register {
            margin-top: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 12px;

            .go-register {
              color: #409eff;
              cursor: pointer;
            }
          }
        }
      }

      .register-form {
        .el-button {
          width: 100%;
          height: 45px;
          font-size: 16px;
        }
      }
    }
  }
}

.footer-wrapped {
  margin-top: 10px;

  .footer-content {
    width: 1100px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    color: #666;

    span {
      margin-left: 5px;
      padding-right: 5px;
    }
  }

  .copyright {
    margin-top: 5px;
    text-align: center;
    font-size: 13px;
    color: #666;
  }
}

// tabs标签
:deep(.el-tabs__item) {
  color: #333;
  font-size: 18px;
}

// 输入框高度
:deep(.el-input__inner) {
  height: 40px;
}

// 输入框标签字体高度
:deep(.el-from-item_label) {
  height: 40px;
  line-height: 40px;
}
</style>