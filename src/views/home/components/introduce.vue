<!-- 
  author: zkz
  @createTime: 2024-08-28 16:09:58
  @Description: 公司介绍的编辑弹框
 -->
<template>
	<el-dialog v-model="state.dialogFormVisible" :title="title" width="600px" center destroy-on-close>
		<el-container>
			<el-mian>
				<div class="content" v-html="valueHtml"></div>
			</el-mian>
		</el-container>
	</el-dialog>
</template>
<script lang="ts" setup>
	import {
		onBeforeUnmount, ref, shallowRef,
		reactive
	} from 'vue'
	import { bus } from "@/utils/mitt.js"
	import { getCompanyIntroduce } from '@/api/setting.js'
	const title = ref()
	// 内容 HTML
	const valueHtml = ref()
	bus.on("intro", async (id : number) => {
		if (id == 1) {
			title.value = '公司介绍'
			valueHtml.value = await getCompanyIntroduce('公司介绍')
		}
		if (id == 2) {
			title.value = '公司架构'
			valueHtml.value = await getCompanyIntroduce('公司架构')
		}
		if (id == 3) {
			title.value = '公司战略'
			valueHtml.value = await getCompanyIntroduce('公司战略')
		}
		if (id == 4) {
			title.value = '公司高层'
			valueHtml.value = await getCompanyIntroduce('公司高层')
		}
	})

	const state = reactive({
		dialogFormVisible: false,
	});

	// 取消删除
	const cancel = () => {
		ElMessage.error("取消编辑！");
		state.dialogFormVisible = false;
	};

	// 暴露open方法
	const open = () => {
		valueHtml.value = ''
		state.dialogFormVisible = true;
	};
	defineExpose({
		open,
	});

	// 取消订阅/监听
	onBeforeUnmount(() => {
		bus.all.clear()
	})
</script>
<style lang="scss" scoped>
	.content {
		min-height: 300px;
	}
</style>