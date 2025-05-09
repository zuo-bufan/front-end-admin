<!-- 
  author: zkz
  @createTime: 2024-08-17 15:28:51
  @Description: 面包屑组件
 -->
<template>
	<div class="bread-crumb">
		<img class="locaiton-icon" :src="props.item.imgIcon" alt="" />
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>{{props.item.first}}</el-breadcrumb-item>
			<el-breadcrumb-item v-if="props.item.second">{{props.item.second}}</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
</template>

<script setup>
	const props = defineProps(['item'])
</script>

<style lang="scss" scoped>
	.bread-crumb {
		height: 30px;
		padding: 0 8px;
		display: flex;
		align-items: center;
		.locaiton-icon{
			width: 16px;
			height: 16px;
			font-size: 16px;
			margin-right: 5px;
		}
	}

	:deep(.el-breadcrumb__item) {
		height: 30px;
		line-height: 30px;
		font-size: 14px;
	}
	:deep(el-breadcrumb__inner){
		font-weight: 500;
	}
</style>