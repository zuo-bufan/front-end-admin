/**
 * author: zkz
 * @createTime: 2024-08-08 11:20:37
 * @Description: 登录接口
 */
import instance from '@/http/index.js'

/**
 * 注册
 * @param {account,password} data 
 * @returns 
 */
export const register = data => {
	const {
		account,
		password
	} = data
	return instance({
		url: '/api/register',
		method: 'POST',
		data: {
			account,
			password
		}
	})
}

/**
 * 登录
 * @param {account,password} data 
 * @returns 
 */
export const login = data => {
	const {
		account,
		password
	} = data
	return instance({
		url: '/api/login',
		method: 'POST',
		data: {
			account,
			password
		}
	})
}
/**
 * 验证账号与邮箱是否一致
 * @param {account,email} data 
 * @returns 
 */
export const verify = data => {
	const {
		account,
		email
	} = data
	return instance({
		url: '/user/verifyAccountAndEmail',
		method: 'POST',
		data: {
			account,
			email
		}
	})
}
/**
 * 登录页面修改密码
 * @param {id,newPassword} data 
 * @returns 
 */
export const resetPassword = (id, newPassword) => {
	return instance({
		url: '/user/changePasswordInLogin',
		method: 'POST',
		data: {
			id,
			newPassword
		}
	})
}