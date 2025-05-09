<!-- 
  author: zkz
  @createTime: 2024-08-28 17:03:22
  @Description: 系统概览页面内容
 -->
<template>
  <!-- 头部面包屑 -->
  <breadCrumb ref="breadcrumb" :item="item"></breadCrumb>
  <!-- 外壳 -->
  <div class="overview-wrapped">
    <!-- 顶部内容外壳 -->
    <div class="top-content-wrapped">
      <!-- 个人信息 -->
      <div class="person-infor">
        <!-- 用户头像外壳 -->
        <div class="person-avatar-wrapped">
          <!-- 用户头像 -->
          <el-avatar :size="100" :src="userStore.imageUrl" />
          <!-- 所属部门 -->
          <div class="department">所属部门：{{ userData.department }}</div>
          <!-- 所属公司 -->
          <div class="company">所属公司：{{ userData.company }}</div>
        </div>
        <!-- 竖线 -->
        <div class="line-wrapped">
          <div class="line"></div>
        </div>
        <!-- 详细信息外壳 -->
        <div class="detail-infor-wrapped">
          <p>姓名：{{ userData.name }}</p>
          <p>性别：{{ userData.sex }}</p>
          <p>身份：{{ userData.identity }}</p>
          <p>分管领域：超级管理员</p>
          <p>权限：最高权限</p>
        </div>
      </div>
      <div ref="manageuserRef" class="pie"></div>
    </div>
    <!-- 中间内容外壳 -->
    <div class="mid-content-wrapped">
      <!-- 中间内容左边外壳 -->
      <div ref="productCategoryRef" class="mid-content-left"></div>
      <!-- 中间内容右边外壳 -->
      <div class="mid-content-right">
        <div class="title">常用管理</div>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="button-area" @click="routerTo('users_manage')">
              <img class="locaiton-icon" src="@/assets/svg/user.svg" alt="" />
              <span class="button-name">用户管理</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="button-area" @click="routerTo('product_list')">
              <img
                class="locaiton-icon"
                src="@/assets/svg/chanpin.svg"
                alt=""
              />
              <span class="button-name">产品管理</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="button-area" @click="routerTo('message_list')">
              <img class="locaiton-icon" src="@/assets/svg/notice.svg" alt="" />
              <span class="button-name">系统消息</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="button-area" @click="routerTo('set')">
              <img class="locaiton-icon" src="@/assets/svg/person.svg" alt="" />
              <span class="button-name">个人信息</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="button-area">
              <img class="locaiton-icon" src="@/assets/svg/xinxi.svg" alt="" />
              <span class="button-name">部门信息</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="button-area" @click="routerTo('set')">
              <img
                class="locaiton-icon"
                src="@/assets/svg/setting.svg"
                alt=""
              />
              <span class="button-name">系统设置</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 底部内容外壳 -->
    <div class="footer-content-wrapped">
      <div ref="massageLevelRef" class="footer-content-left"></div>
      <div ref="massageAllDayRef" class="footer-content-right"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import breadCrumb from "@/components/BreadCrumb.vue";
import { useUserInfor } from "@/store/userinfor.js";
import { getUserInfor } from "@/api/userinfor.js";
import {
  getCompanyName,
  getCategoryAndNumber,
  getAdminAndNumber,
  getMessageAndNumber,
  getLoginAndNumber,
} from "@/api/overview.js";
import * as echarts from "echarts";
import { useRouter } from "vue-router";
const router = useRouter();
// 用户状态管理
const userStore = useUserInfor();
const breadcrumb = ref();
const item = reactive({
  first: "系统概览",
  second: "",
  imgIcon: import.meta.env.VITE_APP_SVGURL + "/assets/svg/overview.svg",
});
interface userData {
  name: string;
  sex: string;
  identity: string;
  department: string;
  company: string;
}
const userData: userData = reactive({
  name: "",
  sex: "",
  identity: "",
  department: "",
  company: "",
});

// 常用管理按钮点击事件
const routerTo = (path: string) => {
  router.push(`\/${path}`);
};

// 获取用户基本信息
const getUserInforFn = async () => {
  const res = await getUserInfor(sessionStorage.getItem("id"));
  userData.name = res.name;
  userData.sex = res.sex;
  userData.identity = res.identity;
  userData.department = res.department;
};
getUserInforFn();
// 获取公司名称
const getCompanyNameFn = async () => {
  const res = await getCompanyName();
  userData.company = res;
};
getCompanyNameFn();
// onMounted 生命周期
onMounted(() => {
  manageUser();
  productCategoryBar();
  massageLevel();
  massageAllDay();
});
const manageuserRef = ref();
// 管理员与用户对比图
const manageUser = async () => {
  // 通过类名 初始化
  const mu = echarts.init(manageuserRef.value);
  mu.showLoading();
  const manageUserData = await getAdminAndNumber();
  console.log(manageUserData);
  mu.hideLoading();
  // 设置基本的参数
  manageuserRef.value.setAttribute("_echarts_instance_", "");
  // 设置基本的参数
  mu.setOption({
    title: {
      text: "管理与用户对比图",
      // subtext: 'Fake Data',
      left: "center",
      top: "5",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
      padding: [50, 20, 10, 10],
    },
    series: [
      {
        // name: 'Access From',
        type: "pie",
        radius: "65%",
        top: "30",
        left: "50",
        data: manageUserData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  });
  // 用于echarts响应式
  window.addEventListener("resize", function () {
    mu.resize();
  });
};

// 产品类别图
const productCategoryRef = ref();
const productCategoryBar = async () => {
  const pcb = echarts.init(productCategoryRef.value);
  pcb.showLoading();
  const categoryData = await getCategoryAndNumber();
  pcb.hideLoading();
  productCategoryRef.value.setAttribute("_echarts_instance_", "");
  pcb.setOption({
    title: {
      text: "产品类别库存总价图",
      top: "3%",
      textStyle: {
        fontSize: 16,
      },
    },
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      // 食品类，服装类，鞋帽类，日用品类，家具类，家用电器类，纺织品类，五金类
      data: categoryData.category,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: categoryData.price,
        type: "bar",
        barWidth: 40,
        colorBy: "data",
      },
    ],
  });
  window.addEventListener("resize", function () {
    pcb.resize();
  });
};
// 公告等级分布图
const massageLevelRef = ref();
const massageLevel = async () => {
  const ml = echarts.init(massageLevelRef.value);
  ml.showLoading();
  const messageData = await getMessageAndNumber();
  ml.hideLoading();
  massageLevelRef.value.setAttribute("_echarts_instance_", "");
  ml.setOption({
    title: {
      text: "公告等级分布图",
      top: "3%",
      textStyle: {
        fontSize: 16,
      },
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "20%",
      left: "center",
    },
    series: [
      {
        // name: 'Access From',
        type: "pie",
        radius: ["35%", "65%"],
        avoidLabelOverlap: false,
        top: "50",
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: messageData,
      },
    ],
  });
  window.addEventListener("resize", function () {
    ml.resize();
  });
};

// 消息每日总量图
const massageAllDayRef = ref();
const massageAllDay = async () => {
  // 底部日期的实现
  // let dd = new Date()
  // let week = []
  // for (let i = 1; i < 8; i++) {
  // 	dd.setDate(dd.getDate() - 1)
  // 	// 得到日期并且把斜杠替换成横杠
  // 	week.push(dd.toLocaleDateString().replace(/\//g, "-"))
  // }

  // let number = []
  // week.forEach(async (e) => {
  // 	// 如果在Moment中不加'YYYY-MM-DD'会提示警告
  // 	let day = moment(e, 'YYYY-MM-DD').format('YYYY-MM-DD')
  // 	// 调用每天登录人数的接口
  // 	const res = await everydaynumberofpeople(day)
  // 	number.push(res.number)
  // })
  const mad = echarts.init(massageAllDayRef.value);
  mad.showLoading();
  const loginData = await getLoginAndNumber();
  mad.hideLoading();
  massageAllDayRef.value.setAttribute("_echarts_instance_", "");
  mad.setOption({
    title: {
      text: "每日登录人数图",
      top: "3%",
      textStyle: {
        fontSize: 16,
      },
    },
    tooltip: {
      trigger: "item",
    },
    xAxis: {
      type: "category",
      data: loginData.week,
      axisLabel: {
        interval: 0, // 设置间隔为 0，强制显示所有标签
        rotate: 20, // 将标签旋转 45 度
      },
    },
    yAxis: {
      type: "value",
      interval: 1,
      splitNumber: 5, // 设置 y 轴刻度为 5 个
      axisLabel: {
        formatter: "{value} 人",
      },
    },
    series: [
      {
        data: loginData.number,
        type: "line",
      },
    ],
  });
  window.addEventListener("resize", function () {
    mad.resize();
  });
};
</script>


<style lang="scss" scoped>
// 总览内容
.overview-wrapped {
  padding: 8px;
  height: calc(100vh - 101px);
  background: #f5f5f5;
  overflow: auto;

  // 上部分内容 个人资料 + 饼状图
  .top-content-wrapped {
    height: 43%;
    display: flex;

    // 个人信息
    .person-infor {
      height: 100%;
      margin-right: 8px;
      width: calc(50% - 8px);
      display: flex;
      background: #fff;

      // 头像区域
      .person-avatar-wrapped {
        display: flex;
        width: 50%;
        height: 100%;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        // 职务
        .department {
          margin-top: 8px;
          font-size: 14px;
        }

        // 公司
        .company {
          margin: 10px 0px;
          font-size: 12px;
        }
      }

      // 分割线
      .line-wrapped {
        height: 100%;
        display: flex;
        align-items: center;

        .line {
          height: 199px;
          border: 1px solid #d3d3d3;
        }
      }

      // 详细信息区域
      .detail-infor-wrapped {
        height: 100%;
        width: calc(50% - 1px);
        margin-left: 50px;
        font-size: 12px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
      }
    }

    // 饼状图
    .pie {
      width: calc(50%);
      height: 100%;
      background: #fff;
    }
  }

  // 中间部分内容 消息阅读量图 产品类别图
  .mid-content-wrapped {
    margin-top: 8px;
    height: calc(50% - 8px);
    display: flex;

    // 中间左部分
    .mid-content-left {
      margin-right: 8px;
      width: calc(60% - 8px);
      background: #fff;
    }

    // 中间右部分
    .mid-content-right {
      width: calc(40%);
      background: #fff;
      padding: 8px;

      // 标题
      .title {
        font-size: 14px;
        margin-bottom: 8px;
      }

      // 按钮区域
      .button-area {
        margin-bottom: 8px;
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        background: #f5f5f5;

        // 按钮名字
        .button-name {
          margin-top: 10px;
          font-size: 12px;
        }
      }

      // 按钮变色
      .button-area:hover {
        background: #e4efff;
      }
    }
  }

  // 底部内容
  .footer-content-wrapped {
    margin-top: 8px;
    height: calc(38% - 8px);
    display: flex;

    // 底部左部分
    .footer-content-left {
      margin-right: 8px;
      height: 100%;
      width: calc(30% - 8px);
      background: #fff;
    }

    // 底部右部分
    .footer-content-right {
      height: 100%;
      width: calc(70%);
      background: #fff;
    }
  }
}
</style>