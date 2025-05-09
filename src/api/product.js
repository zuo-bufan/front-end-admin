/**
 * author: zkz
 * @createTime: 2024-10-23 10:34:02
 * @Description: 产品管理模块接口 api
 */
import instance from '@/http/index.js';

/**
 * 产品入库  创建产品
 * @param {number} product_id   产品id
 * @param {string} product_name 产品名称
 * @param {string} product_category 产品类别
 * @param {string} product_unit 产品单位
 * @param {number} product_inwarehouse_number 产品入库数量
 * @param {number} product_single_price 产品单价
 * @param {string} product_create_person 创建人
 * @param {string} in_memo 备注
 * @param {string} product_update_time 更新时间
 * @param {string} product_create_time 创建时间
 * @returns 
 */
export const createProduct = (data) => {
	const { product_id, ...in_memo } = data;
	return instance({
		url: '/pro/createProduct',
		method: 'POST',
		data: {
			product_id,
			...in_memo
		}
	});
};
/**
 * 删除产品
 * @param {string} id 产品id
 * @returns 
 */
export const deleteProduct = (id) => {
	return instance({
		url: '/pro/deleteProduct',
		method: 'POST',
		data: {
			id
		}
	});
};
/**
 * 获取产品修改回显
 * @param {number} id 产品id
 * @returns 
 */
export const editProductShow = (id) => {
	return instance({
		url: '/pro/editProductShow',
		method: 'POST',
		data: {
			id
		}
	});
};
/**
 * 产品出库  出库产品
 * @param {number} product_id 产品id
 * @param {string} product_out_id 出库单号
 * @param {number} product_single_price 产品单价
 * @param {number} product_out_number 出库数量
 * @param {string} product_out_apply_person 申请人
 * @param {string} apply_memo 备注
 * @param {string} product_out_status 申请出库状态
 */
/**
 * 编辑产品
 * @param {string} product_name 产品名称
 * @param {string} product_category 产品类别
 * @param {string} product_unit 产品单位
 * @param {number} product_inwarehouse_number 产品入库数量
 * @param {number} product_single_price 产品单价
 * @param {string} in_memo 备注
 * @param {number} id 产品id
 * @returns 
 */
export const editProduct = (data) => {
	const { id, ...product_name } = data;
	return instance({
		url: '/pro/editProduct',
		method: 'POST',
		data: {
			id,
			...product_name
		}
	});
};
/**
 * 获取产品列表 产品入库数量大于0的产品
 * @returns 
 */
export const getProductList = () => {
	return instance({
		url: '/pro/getProductList',
		method: 'POST'
	});
};
/**
 * 产品申请出库
  * @param {number} id 产品id
 * @param {string} product_out_id 出库单号
 * @param {number} product_single_price 产品单价
 * @param {number} product_out_number 出库数量
 * @param {string} product_out_apply_person 申请人
 * @param {string} apply_memo 备注
 * @param {string} product_out_status 申请出库状态
 * @returns 
 */
export const applyOutProduct = (data) => {
	const { id, ...apply_memo } = data;
	return instance({
		url: '/pro/applyOutProduct',
		method: 'POST',
		data: {
			id,
			...apply_memo
		}
	});
};
/**
 * 产品审核列表
 * @returns 
 */
export const applyProductList = () => {
	return instance({
		url: '/pro/applyProductList',
		method: 'POST'
	});
};
/**
 * 对产品进行撤回申请
 * @param {number} id 产品id
 * @returns 
 */
export const withdrawApplyProduct = (id) => {
	return instance({
		url: '/pro/withdrawApplyProduct',
		method: 'POST',
		data: {
			id
		}
	});
};
/**
 * 产品审核
 * @param {number} id 产品id
 * @param {number} product_out_id 出库单号
 * @param {string} product_out_status 申请出库状态  同意/否决
 * @param {string} audit_memo 审核备注
 * @param {number} product_out_price 出库总价
 * @param {string} product_out_audit_person 审核人
 * @param {string} product_out_apply_person 申请人
 * @param {number} product_inwarehouse_number 产品入库数量
 * @param {number} product_single_price 产品单价
 * @param {number} product_out_number 出库数量
 * @returns 
 */
export const auditProduct = (data) => {
	const { id, ...audit_memo } = data;
	return instance({
		url: '/pro/auditProduct',
		method: 'POST',
		data: {
			id,
			...audit_memo
		}
	});
};
/**
 * 通过入库编号对产品进行搜索
 * @param {number} product_id 产品id
 * @returns 
 */
export const searchProductForId = (product_id) => {
	return instance({
		url: '/pro/searchProductForId',
		method: 'POST',
		data: {
			product_id
		}
	});
};
/**
 * 通过出库申请编号对产品进行搜索
 * @param {number} product_out_id 出库申请编号
 * @returns 
 */
export const searchProductForApplyId = (product_out_id) => {
	return instance({
		url: '/pro/searchProductForApplyId',
		method: 'POST',
		data: {
			product_out_id
		}
	});
};
/**
* 通过出库编号对产品进行搜索
 * @param {number} product_out_id 出库编号
 * @returns 
 */
export const searchProductForOutId = (product_out_id) => {
	return instance({
		url: '/pro/searchProductForOutId',
		method: 'POST',
		data: {
			product_out_id
		}
	});
};
/**
 * 获取产品总数
 * @returns 
 */
export const getProductLength = () => {
	return instance({
		url: '/pro/getProductLength',
		method: 'POST'
	});
};
/**
 * 获取申请出库产品总数
 * @returns 
 */
export const getApplyProductLength = () => {
	return instance({
		url: '/pro/getApplyProductLength',
		method: 'POST'
	});
};
/**
 * 获取出库产品总数
 * @returns 
 */
export const getOutProductLength = () => {
	return instance({
		url: '/pro/getOutProductLength',
		method: 'POST'
	});
};
/**
 * 监听换页返回数据 页码 pager   产品页面
 *  limit 10 为我们拿到多少条数据 offset是我们跳过多少条数据
 * @param {number} pager 页码
 * @returns 
 */
export const returnProductListData = (pager) => {
	return instance({
		url: '/pro/returnProductListData',
		method: 'POST',
		data: {
			pager
		}
	});
};
/**
 * 监听换页返回数据 页码 pager   申请出库页面
 *  limit 10 为我们拿到多少条数据 offset是我们跳过多少条数据
 * @param {number} pager 页码
 * @returns 
 */
export const returnApplyProductListData = (pager) => {
	return instance({
		url: '/pro/returnApplyProductListData',
		method: 'POST',
		data: {
			pager
		}
	});
};
/**
 * 监听换页返回数据 页码 pager   出库页面
 *  limit 10 为我们拿到多少条数据 offset是我们跳过多少条数据
 * @param {number} pager 页码
 * @returns 
 */
export const returnOutProductListData = (pager) => {
	return instance({
		url: '/pro/returnOutProductListData',
		method: 'POST',
		data: {
			pager
		}
	});
};
