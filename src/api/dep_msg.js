/* 
* @Author: zkz    
* @CreateTime: 2025-03-17 16:39:13
* @description: 部门消息相关接口
*/
import instance from '@/http/index';
/**
 * 获取部门消息列表
 * @param {number} id 用户id
 * @param {string} department 部门
 */
export const getDepartmentMsgList = (data) => {
	const { id, department } = data;
	return instance({
		url: '/dm/getDepartmentMsgList',
		method: 'post',
		data: {
			id,
			department
		}
	});
};
/**
 * 获取部门消息
 * @param {string} department 部门
 */
export const getDepartmentMsg = (department) => {
	return instance({
		url: '/dm/getDepartmentMsg',
		method: 'post',
		data: {
			department
		}
	});
};
/**
 * 返回用户的的阅读列表
 * @param {number} id 用户id
 * return {Array} 阅读列表
 */
export const getReadListAndStatus = (id) => {
	return instance({
		url: '/dm/getReadListAndStatus',
		method: 'post',
		data: {
			id
		}
	});
};
/**
 * 用户点击消息后，对read_list进行删减 参数 消息的readid 以及用户的id
 * @param {number} id 用户id
 * @param {number} readid 消息的id
 */
export const clickReadListDelete = (data) => {
	const { id, readid } = data;
	return instance({
		url: '/dm/clickReadListDelete',
		method: 'post',
		data: {
			id,
			readid
		}
	});
};
/**
 * 把新发布的文章id 插入到当前所属部门的用户的read_list中
 * @param {number} department 部门
 * @param {number} msgid 新文章id
 */
export const changeUserReadList = (department, msgid) => {
	return instance({
		url: '/dm/changeUserReadList',
		method: 'post',
		data: {
			department,
			msgid
		}
	});
};
/**
 * 把删除的文章id 从当前所属部门的用户的read_list中删除
 * @param {number} department 部门
 * @param {number} delid 删除文章id
 */
export const changeUserReadListButDel = (delid, department) => {
	return instance({
		url: '/dm/changeUserReadListButDel',
		method: 'post',
		data: {
			delid,
			department
		}
	});
};
