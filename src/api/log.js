/* 
* @Author: zkz    
* @CreateTime: 2025-02-14 09:38:46
*/
import instance from '@/http/index.js';

/**
 * 操作日志记录
 * @param {int} operation_person
 * @param {string} operation_content
 * @param {string} operation_level
 */
export const operationLog = (data) => {
	const { operation_person, operation_content, operation_level } = data;
	return instance({
		url: '/oplog/operationLog',
		method: 'post',
		data: {
			operation_person,
			operation_content,
			operation_level
		}
	});
};
/**
 *  操作日志列表
 * @param {*} req 
 * @param {*} res 
 */
export const operationLogList = (req, res) => {
	return instance({
		url: '/oplog/operationLogList',
		method: 'post'
	});
};
/**
 *  操作日志关键字搜索列表
 * @param {*} req 
 * @param {*} res 
 */
export const operationSearchLogList = (operation_person) => {
	return instance({
		url: '/oplog/operationSearchLogList',
		method: 'post',
		data: {
			operation_person
		}
	});
};
/**
 * 操作日志列表长度
 * @param {*} req 
 * @param {*} res 
 */
export const operationLogListLength = (req, res) => {
	return instance({
		url: '/oplog/operationLogListLength',
		method: 'post'
	});
};
/**
 * 监听换页返回数据 操作日志列表
 * @param {*} req 
 * @param {*} res 
 */
export const returnoperationLogListData = (pager) => {
	return instance({
		url: '/oplog/returnoperationLogListData',
		method: 'post',
		data: {
			pager
		}
	});
};
/**
 * 操作日志删除 清空表数据
 * @param {*} req 
 */
export const operationLogDelete = (req) => {
	return instance({
		url: '/oplog/operationLogDelete',
		method: 'post'
	});
};

/******************************************************************************** */
/******************************************************************************** */
/******************************************************************************** */

/**
 * 登录日志记录
 * @param {int} account
 * @param {string} name
 * @param {string} email
 */
export const loginLog = (data) => {
	const { account, name, email } = data;
	return instance({
		url: '/log/loginLog',
		method: 'post',
		data: {
			account,
			name,
			email
		}
	});
};
/**
 *  登录日志列表
 * @param {*} req 
 * @param {*} res 
 */
export const loginLogList = (req, res) => {
	return instance({
		url: '/log/loginLogList',
		method: 'post'
	});
};
/**
 *  登录日志关键字搜索列表
 * @param {*} req 
 * @param {*} res 
 */
export const loginSearchLogList = (account) => {
	return instance({
		url: '/log/loginSearchLogList',
		method: 'post',
		data: {
			account
		}
	});
};
/**
 * 登录日志列表长度
 * @param {*} req 
 * @param {*} res 
 */
export const loginLogListLength = (req, res) => {
	return instance({
		url: '/log/loginLogListLength',
		method: 'post'
	});
};
/**
 * 监听换页返回数据 登录日志列表
 * @param {*} req 
 * @param {*} res 
 */
export const returnloginLogListData = (pager) => {
	return instance({
		url: '/log/returnloginLogListData',
		method: 'post',
		data: {
			pager
		}
	});
};
/**
 * 登录日志删除 清空表数据
 * @param {*} req 
 */
export const loginLogDelete = (req) => {
	return instance({
		url: '/log/loginLogDelete',
		method: 'post'
	});
};
