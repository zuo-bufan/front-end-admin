<!-- 
  author: zkz
  @createTime: 2024-08-07 16:45:52
  @Description: 首页内容
 -->
<template>
  <!-- 头部面包屑 -->
  <breadCrumb ref="breadcrumb" :item="item"></breadCrumb>
  <!-- 首页外壳 -->
  <div class="home-wrapped">
    <!-- 轮播图外壳 -->
    <div class="swiper-wrapped">
      <el-carousel
        :interval="4000"
        indicator-position="outside"
        type="card"
        height="240px"
      >
        <el-carousel-item v-for="(item, index) in imageUrl" :key="index">
          <!-- <h3 text="2xl" justify="center">{{ item }}</h3> -->
          <img class="swiper-img" :src="item" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 栅格布局外壳 -->
    <div class="layout-wrapped">
      <el-row :gutter="20">
        <el-col
          :span="6"
          v-for="(item, index) in companyintroduce"
          :key="item.id"
          @click="openIntroduce(index + 1)"
        >
          <div class="company-message-area">
            <span>{{ item.set_name }}</span>
            <div v-html="item.set_text" class="company-intro"></div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 表格外壳 -->
    <div class="two-table-wrapped">
      <!-- 公司公告 -->
      <div class="company-notice">
        <span class="m-title">公司公告</span>
        <el-table
          :data="companyData"
          style="width: 100%"
          :show-header="false"
          @cell-dblclick="openCompanyNotice"
        >
          <el-table-column prop="message_title">
            <template #default="{ row }">
              <div class="mesg-title">{{ row.message_title }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="message_level">
            <template #default="{ row }">
              <el-tag class="mx-1" v-if="row.message_level === '一般'" round>{{
                row.message_level
              }}</el-tag>
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
          <el-table-column prop="message_publish_department" />
          <el-table-column width="110">
            <template #default="{ row }">
              <div>{{ row.message_create_time?.slice(0, 10) }}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 系统消息 -->
      <div class="system-message">
        <span class="m-title">系统消息</span>
        <el-table
          :data="systemData"
          style="width: 100%"
          :show-header="false"
          @cell-dblclick="openSystemNotice"
        >
          <el-table-column prop="message_title">
            <template #default="{ row }">
              <div class="mesg-title">{{ row.message_title }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="message_level">
            <template #default="{ row }">
              <el-tag class="mx-1" v-if="row.message_level === '一般'" round>{{
                row.message_level
              }}</el-tag>
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
          <el-table-column width="110">
            <template #default="{ row }">
              <div>{{ row.message_create_time?.slice(0, 10) }}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
  <introduceVue ref="introP"></introduceVue>
  <Msg ref="msgRef"></Msg>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import breadCrumb from "@/components/BreadCrumb.vue";
import { getAllSwiper, getAllCompanyIntroduce } from "@/api/setting.js";
import { bus } from "@/utils/mitt.js";
import introduceVue from "./components/introduce.vue";
import { companyMessageList, systemMessageList } from "@/api/message.js";
import Msg from "@/components/common_msg.vue";
const breadcrumb = ref();
const item = reactive({
  first: "首页",
  second: "",
  imgIcon: import.meta.env.VITE_APP_SVGURL + "/assets/svg/home.svg",
});
// 表格数据  公司公告
const companyData = ref([]);
// 表格数据  系统消息
const systemData = ref([]);

// 获取公司公告和系统消息列表
const getMessageListFn = async () => {
  companyData.value = await companyMessageList();
  systemData.value = await systemMessageList();
};
getMessageListFn();

// 轮播图
const imageUrl = ref([]);
// 获取所有轮播图
const getAllSwiperFn = async () => {
  const res = await getAllSwiper();
  // console.log(res);
  imageUrl.value = res.data;
};
getAllSwiperFn();

// 公司介绍
const companyintroduce = ref();
const getCompanyIntroduceFn = async () => {
  const res = await getAllCompanyIntroduce();
  const [name, ...into] = res.data;
  companyintroduce.value = into;
};
getCompanyIntroduceFn();
// 打开公司介绍编辑
const introP = ref();
const openIntroduce = (id) => {
  console.log(id);
  bus.emit("intro", id);
  introP.value.open();
};
// 打开公司公告信息详情
const msgRef = ref();
const openCompanyNotice = (row: any) => {
  bus.emit("cpyid", row);
  msgRef.value.open();
};
// 打开系统消息信息详情
const openSystemNotice = (row: any) => {
  bus.emit("sysid", row);
  msgRef.value.open();
};
</script>

<style lang="scss" scoped>
@mixin table-class {
  height: 240px;
  width: 48%;
  display: flex;
  flex-direction: column;

  .m-title {
    font-size: 14px;
    margin-bottom: 5px;
    border-bottom: 1px solid #ea0709;
  }
}

// 首页外壳
.home-wrapped {
  padding: 8px;
  height: calc(100vh - 101px);
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  overflow: auto;

  // 轮播外壳
  .swiper-wrapped {
    padding: 0 20px;
    background-color: #fff;
    margin-bottom: 8px;

    .swiper-img {
      width: 100%;
      height: 100%;
    }
  }

  // 栅格布局外壳
  .layout-wrapped {
    padding: 8px;
    margin-bottom: 8px;
    background-color: #fff;

    // 公司信息区域
    .company-message-area {
      background-color: #f5f5f5;
      height: 200px;
      padding: 8px;
      cursor: pointer;

      // 标题
      span {
        border-bottom: 1px solid #409eff;
        font-size: 14px;
      }

      .company-intro {
        text-indent: 24px;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 3;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }
    }

    .company-message-area:hover {
      cursor: pointer;
      background-color: #eef5ff;
    }
  }

  // 表格外壳
  .two-table-wrapped {
    height: 300px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #fff;

    .company-notice {
      @include table-class;
    }

    .system-message {
      @include table-class;
    }
  }
}

// 轮播图默认样式
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

// 栅格布局样式
.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.mesg-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>