/* 
* @Author: zkz    
* @CreateTime: 2025-03-12 10:14:50
* @description: 产品概览相关接口
*/
import instance from '@/http/index.js';

/**
 * 获取产品类别和总价
 * @returns {Array} 产品类别和总价
 */
export const getCategoryAndNumber = () => {
	return instance({
		url: '/ov/getCategoryAndNumber',
		method: 'post'
	});
};
/**
 * 获取不同用户角色和对应的数量
 * @returns {Array} 不同用户角色和对应的数量
 * @param {Object} params 查询参数
 * @returns {Array} 产品列表
 */
export const getAdminAndNumber = () => {
	return instance({
		url: '/ov/getAdminAndNumber',
		method: 'post'
	});
};
/**
 * 获取不同消息等级对应的数量
 * @returns {Array} 不同消息等级对应的数量
 * @param {Object} params 查询参数
 * @returns {Array} 产品列表
 */
export const getMessageAndNumber = () => {
	return instance({
		url: '/ov/getMessageAndNumber',
		method: 'post'
	});
};
/**
 * 获取七天内登录次数
 * @returns {Array} 七天内登录次数
 * @param {Object} params 查询参数
 * @returns {Array} 产品列表
 */
export const getLoginAndNumber = () => {
	return instance({
		url: '/ov/getLoginAndNumber',
		method: 'post'
	});
};
/**
 * 获取公司名称
 * @returns 
 */
export const getCompanyName = () => {
	return instance({
		url: '/ov/getCompanyName',
		method: 'POST'
	});
};
