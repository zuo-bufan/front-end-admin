/**
 * author: zkz
 * @createTime: 2024-08-27 14:59:35
 * @Description: 系统设置的接口处理函数
 */
import instance from '@/http/index.js'

/**
 * 获取所有轮播图
 * @param { } data 
 * @returns 
 */
export const getAllSwiper = () => {
	return instance({
		url: '/set/getAllSwiper',
		method: 'POST',
	})
}
/**
 * 获取公司名称
 * @param { } data 
 * @returns 
 */
export const getCompanyName = () => {
	return instance({
		url: '/set/getCompanyName',
		method: 'POST',
	})
}
/**
 * 修改公司名称
 * @param {set_value } data 
 * @returns 
 */
export const changeCompanyName = (set_value) => {
	return instance({
		url: '/set/changeCompanyName',
		method: 'POST',
		data: {
			set_value
		}
	})
}
/**
 * 编辑公司介绍
 * @param { set_name, set_text} data 
 * @returns 
 */
export const changeCompanyIntroduce = (set_text, set_name) => {
	return instance({
		url: '/set/changeCompanyIntroduce',
		method: 'POST',
		data: {
			set_text,
			set_name
		}
	})
}
/**
 * 获取公司介绍
 * @param {set_name } data 
 * @returns 
 */
export const getCompanyIntroduce = (set_name) => {
	return instance({
		url: '/set/getCompanyIntroduce',
		method: 'POST',
		data: {
			set_name
		}
	})
}
/**
 * 获取所有公司信息
 * @param {set_name } data 
 * @returns 
 */
export const getAllCompanyIntroduce = () => {
	return instance({
		url: '/set/getAllCompanyIntroduce',
		method: 'POST',
	})
}

// --------- 其他设置模块

/**
 * 部门设置
 * @param { set_value } data 
 * @returns 
 */
export const setDepartment = (set_value) => {
	return instance({
		url: '/set/setDepartment',
		method: 'POST',
		data: {
			set_value
		}
	})
}
/**
 * 获取部门
 * @param { set_value } data 
 * @returns 
 */
export const getDepartment = () => {
	return instance({
		url: '/set/getDepartment',
		method: 'POST',
	})
}
/**
 * 产品设置
 * @param { set_value } data 
 * @returns 
 */
export const setProduct = (set_value) => {
	return instance({
		url: '/set/setProduct',
		method: 'POST',
		data: {
			set_value
		}
	})
}
/**
 * 获取产品
 * @param { set_value } data 
 * @returns 
 */
export const getProduct = () => {
	return instance({
		url: '/set/getProduct',
		method: 'POST',
	})
}