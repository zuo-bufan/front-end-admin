/* 
* @Author: zkz    
* @CreateTime: 2025-02-19 10:26:15
* @description: 记录用户管理操作日志
*/
import { operationLog } from '@/api/log.js';
/**
 * 记录用户管理操作日志
 * @param {*} module 
 * @param {*} operation_person 
 * @param {*} operation_objcet 
 * @param {*} operation_level 
 */
export const tracking = async (module, operation_person, operation_objcet, operation_level) => {
	const operationMap = {
		删除: `对管理员 '${operation_objcet}' 进行了删除操作`,
		修改: `对管理员 '${operation_objcet}' 进行了修改操作`,
		新增: `对管理员 '${operation_objcet}' 进行了新增操作`,
		赋权: `对管理员 '${operation_objcet}' 进行了赋权操作`,
		冻结: `对管理员 '${operation_objcet}' 进行了冻结操作`,
		解冻: `对管理员 '${operation_objcet}' 进行了解冻操作`,
		恢复公告: `对回收站进行了'${operation_objcet}'操作`,
		彻底删除公告: `对回收站进行了'${operation_objcet}'操作`,
		公司公告删除: `对消息列表进行了'${operation_objcet}'操作`,
		系统公告删除: `对消息列表进行了'${operation_objcet}'操作`
	};

	let operation_content = operationMap[module] || `对消息管理 '${operation_objcet}'主题进行了${module}操作`;

	if (operationMap.hasOwnProperty(module) || module.includes('公告')) {
		await operationLog({
			operation_person,
			operation_content,
			operation_level
		});
	}
};
