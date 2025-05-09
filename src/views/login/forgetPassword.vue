<!-- 
  author: zkz
  @createTime: 2024-08-07 11:06:11
  @Description: 忘记密码页面
 -->
<template>
	<div>
		<!-- 忘记密码 -->
		<el-dialog v-model="state.forgetPasswordDialog" draggable width="400" title="忘记密码">
			<el-form ref="verifyRef" class="register-form" :model="forgetData" :rules="forgetRules"
				:label-position="labelPosition">
				<el-form-item label="输入您的注册账号" prop="account">
					<el-input v-model="forgetData.account" placeholder="输入您的注册账号"></el-input>
				</el-form-item>
				<el-form-item label="输入您的个人邮箱" prop="email">
					<el-input v-model="forgetData.email" placeholder="输入您的个人邮箱"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="state.forgetPasswordDialog = false">取消</el-button>
					<el-button type="primary" @click="forgetPwdNext">下一步</el-button>
				</span>
			</template>
		</el-dialog>
		<!-- 修改密码 -->
		<el-dialog v-model="state.changePasswordDialog" draggable width="400" title="修改密码">
			<el-form ref="resetRef" class="register-form" :model="forgetData" :rules="forgetRules"
				:label-position="labelPosition">
				<el-form-item label="输入您的新密码" prop="password">
					<el-input v-model="forgetData.password" show-password placeholder="输入您的新密码"></el-input>
				</el-form-item>
				<el-form-item label="再次确认您的新密码" prop="repassword">
					<el-input v-model="forgetData.repassword" show-password placeholder="再次确认您的新密码"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="state.changePasswordDialog = false">取消</el-button>
					<el-button type="primary" @click="goSavePassword">确认</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts" setup>
	import { reactive, ref } from 'vue'
	import { verify, resetPassword } from '@/api/login.js';
	import { ElMessage } from 'element-plus'
	// 表单定位top
	const labelPosition = ref('top')
	// 表单对象接口
	interface forgetData {
		account : number,
		email : string,
		password : string,
		repassword : string
	}
	// 表单验证规则
	const forgetRules = reactive({
		account: [
			{ required: true, message: '请输入您的注册账号', trigger: 'blur' },
		],
		email: [
			{ required: true, message: '请输入您的注册邮箱', trigger: 'blur' },
		],
		password: [
			{ required: true, message: '请输入您的注册邮箱', trigger: 'blur' },
		],
		repassword: [
			{ required: true, message: '请输入您的注册邮箱', trigger: 'blur' },
		],
	})
	// 表单对象
	const forgetData : forgetData = reactive({
		account: null,
		email: '',
		password: '',
		repassword: ''
	})
	// 控制=弹窗 默认关闭
	const state = reactive({
		forgetPasswordDialog: false,
		changePasswordDialog: false
	})
	// 打开弹框
	const open = () => {
		state.forgetPasswordDialog = true
	}
	// 忘记密码下一步
	const verifyRef = ref()
	const forgetPwdNext = async () => {
		verifyRef.value.validate(async (valid, fields) => {
			if (valid) {
				const res = await verify(forgetData)
				console.log(res);
				if (res.status == 0) {
					ElMessage({
						message: "验证成功",
						type: 'success',
					})
					localStorage.setItem('id', res.id)
					state.forgetPasswordDialog = false
					state.changePasswordDialog = true
					verifyRef.value.resetFields()
				} else {
					ElMessage.error('验证失败，请检查数据是否正确')
				}
			}
		})
	}
	// 确认修改密码 重置密码
	const resetRef = ref()
	const goSavePassword = async () => {
		resetRef.value.validate(async (valid, fields) => {
			if (valid) {
				if (forgetData.password == forgetData.repassword) {
					const res = await resetPassword(localStorage.getItem('id'), forgetData.password)
					console.log(res);
					if (res.status == 0) {
						ElMessage({
							message: "修改成功",
							type: 'success',
						})
						state.changePasswordDialog = false
						resetRef.value.resetFields()
					} else {
						ElMessage.error('修改失败，请检查数据是否正确')
					}
				} else {
					ElMessage.error('请检查两次输入的密码是否一致')
				}
			}
		})
	}
	// 对外暴露
	defineExpose({
		open
	})
</script>

<style lang="scss" scoped>
	.register-form {
		.el-input {
			width: 80%;
			height: 30px;
			line-height: 30px;
		}
	}
</style>