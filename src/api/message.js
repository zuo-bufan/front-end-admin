/* 
* @Author: zkz    
* @CreateTime: 2025-01-06 14:45:40
*/
import instance from '../http/index';

/**
 * 发布消息
 * @param {string} message_title 消息标题
 * @param {string} message_category 消息分类 
 * @param {string} message_publish_department 发布部门  
 * @param {string} message_publish_name 发布人姓名 
 * @param {string} message_receipt_object 接收对象 
 * @param {string} message_content 消息内容
 * @param {number} message_level 0:普通消息 1:紧急消息 2:重要消息 3:紧急且重要消息
 * @returns 
 */
export const publishMessage = (data) => {
	const {
		message_title,
		message_category,
		message_publish_department,
		message_publish_name,
		message_receipt_object,
		message_content,
		message_level
	} = data;
	return instance({
		url: '/msg/publishMessage',
		method: 'post',
		data: {
			message_title,
			message_category,
			message_publish_department,
			message_publish_name,
			message_receipt_object,
			message_content,
			message_level
		}
	});
};

/**
 * 获取公司公告列表
 * @returns []
 */
export const companyMessageList = () => {
	return instance({
		url: '/msg/companyMessageList',
		method: 'post'
	});
};
/**
 * 获取系统消息列表
 * @returns []
 */
export const systemMessageList = () => {
	return instance({
		url: '/msg/systemMessageList',
		method: 'post'
	});
};

/**
 * 编辑消息接口
 * @param {string} message_title 消息标题
 * @param {string} message_publish_name 发布人姓名
 * @param {string} message_publish_department 发布部门
 * @param {string} message_receipt_object 接收对象
 * @param {string} message_content 消息内容
 * @param {number} message_level 0:普通消息 1:紧急消息 2:重要消息 3:紧急且重要消息
 * @param {number} id 消息id
 */
export const editMessage = (data) => {
	const {
		message_title,
		message_publish_name,
		message_publish_department,
		message_receipt_object,
		message_content,
		message_level,
		id
	} = data;
	return instance({
		url: '/msg/editMessage',
		method: 'post',
		data: {
			message_title,
			message_publish_name,
			message_publish_department,
			message_receipt_object,
			message_content,
			message_level,
			id
		}
	});
};

/**
 * 根据发布部门搜索消息列表接口
 * @param {string} message_publish_department 消息发布部门
 * @returns []
 */
export const searchMessageByDepartment = (message_publish_department) => {
	return instance({
		url: '/msg/searchMessageByDepartment',
		method: 'post',
		data: {
			message_publish_department
		}
	});
};

/**
 * 根据发布等级搜索消息列表接口
 * @param {number} message_level 消息发布等级
 * @returns []
 * 0:普通消息 1:紧急消息 2:重要消息 3:紧急且重要消息
 */
export const searchMessageByLevel = (message_level) => {
	return instance({
		url: '/msg/searchMessageByLevel',
		method: 'post',
		data: {
			message_level
		}
	});
};

/**
 * 获取公告系统消息接口
 * @param {string} id 消息id
 * @returns {}
 */
export const getMessage = (id) => {
	return instance({
		url: '/msg/getMessage',
		method: 'post',
		data: {
			id
		}
	});
};

/**
 * 更新点击次数接口
 * @param {number} id 消息id
 * @param {number} message_click_number 点击次数
 * @returns {}
 */
export const updateClickNumber = (data) => {
	const { id, message_click_number } = data;
	return instance({
		url: '/msg/updateClickNumber',
		method: 'post',
		data: {
			id,
			message_click_number
		}
	});
};

/**
 * 首次删除消息接口
 * @param {number} id 消息id
 * @returns {}
 */
export const firstDeleteMessage = (id) => {
	return instance({
		url: '/msg/firstDeleteMessage',
		method: 'post',
		data: {
			id
		}
	});
};

/**
 * 获取回收站消息列表接口
 * @returns [] 
 */
export const getRecycleMessageList = () => {
	return instance({
		url: '/msg/getRecycleMessageList',
		method: 'post'
	});
};
/**
 * 获取回收站消息数量接口
 * @returns {}
 */
export const getRecycleMessageCount = () => {
	return instance({
		url: '/msg/getRecycleMessageCount',
		method: 'post'
	});
};
/**
 * 获取监听换页回收站列表数据接口
 * @param {pager} pager 当前页码
 */
export const returnRecycleMessageListData = (pager) => {
	return instance({
		url: '/msg/returnRecycleMessageListData',
		method: 'post',
		data: {
			pager
		}
	});
};
/**
 * 还原删除操作接口
 * @param {number} id 消息id
 * @returns {}
 */
export const restoreMessage = (id) => {
	return instance({
		url: '/msg/restoreMessage',
		method: 'post',
		data: {
			id
		}
	});
};

/**
 * 彻底删除操作接口
 * @param {number} id 消息id
 * @returns {}
 */
export const deleteMessage = (id) => {
	return instance({
		url: '/msg/deleteMessage',
		method: 'post',
		data: {
			id
		}
	});
};
/**
 * 获取公司公告列表分页长度接口
 * @returns {}
 */
export const getCompanyMessageCount = () => {
	return instance({
		url: '/msg/getCompanyMessageCount',
		method: 'post'
	});
};
/**
 * 获取系统公告列表分页长度接口
 */
export const getSystemMessageCount = () => {
	return instance({
		url: '/msg/getSystemMessageCount',
		method: 'post'
	});
};
/**
 * 获取监听换页公司公告列表数据接口
 * @param {pager} pager 当前页码
 * @param {number} number 每页条数
 */
export const returnCompanyMessageListData = (pager) => {
	return instance({
		url: '/msg/returnCompanyMessageListData',
		method: 'post',
		data: {
			pager
		}
	});
};
/**
 * 获取监听换页系统公告列表数据接口 
 * @param {number} pager 当前页码
 * @param {number} number 每页条数
 * @param {string} req 
 * @param {string} res 
 */
export const returnSystemMessageListData = (pager) => {
	return instance({
		url: '/msg/returnSystemMessageListData',
		method: 'post',
		data: {
			pager
		}
	});
};
