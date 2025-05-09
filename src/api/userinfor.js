/**
 * author: zkz
 * @createTime: 2024-08-21 10:33:56
 * @Description: 用户信息接口方法
 */
import instance from '@/http/index.js'
/**
 * 获取用户基本信息
 * @param {id} data 
 * @returns 
 */
export const getUserInfor = id => {
	return instance({
		url: '/user/getUserInfo',
		method: 'POST',
		data: {
			id
		}
	})
}
/**
 * 绑定账号 接收参数 account onlyId url
 * @param {account,onlyId,url} data 
 * @returns 
 */
export const bindAccount = (account, onlyId, url) => {
	return instance({
		url: '/user/bindAccount',
		method: 'POST',
		data: {
			account,
			onlyId,
			url
		}
	})
}
/**
 * 修改用户密码 先输入旧密码oldPassword 新密码newPassword id
 * @param {id,oldPassword,newPassword} data 
 * @returns 
 */
export const changePassword = (id, oldPassword, newPassword) => {
	return instance({
		url: '/user/changePassword',
		method: 'POST',
		data: {
			id,
			oldPassword,
			newPassword
		}
	})
}
/**
 * 修改名称 接收参数 id name 
 * @param {id,name} data 
 * @returns 
 */
export const changeName = (id, name) => {
	return instance({
		url: '/user/changeName',
		method: 'POST',
		data: {
			id,
			name
		}
	})
}
/**
 * 修改性别 接收参数 id sex
 * @param {id,sex} data 
 * @returns 
 */
export const changeSex = (id, sex) => {
	return instance({
		url: '/user/changeSex',
		method: 'POST',
		data: {
			id,
			sex
		}
	})
}
/**
 * 修改邮箱 接收参数 id email
 * @param {id,email} data 
 * @returns 
 */
export const changeEmail = (id, email) => {
	return instance({
		url: '/user/changeEmail',
		method: 'POST',
		data: {
			id,
			email
		}
	})
}


// --------------------------------用户管理
/**
 * 添加管理员 接收参数 account password name sex department email identity
 * @param {account,password,name,sex,department,email,identity} data 
 * @returns 
 */
export const createAdmin = (data) => {
	const {
		account,
		...identity
	} = data
	return instance({
		url: '/user/createAdmin',
		method: 'POST',
		data: {
			account,
			...identity
		}
	})
}

/**
 * 获取管理员列表  接收参数 identity
 * @param {identity} data 
 * @returns 
 */
export const getAdminList = identity => {
	return instance({
		url: '/user/getAdminList',
		method: 'POST',
		data: {
			identity
		}
	})
}

/**
 * 编辑管理员信息  接收参数 id,name,sex,email,department
 * @param {id,name,sex,email,department} data 
 * @returns 
 */
export const editAdmin = (data) => {
	const {
		id,
		...identity
	} = data
	return instance({
		url: '/user/editAdmin',
		method: 'POST',
		data: {
			id,
			...identity
		}
	})
}

/**
 * 对管理员取消赋权  接收参数 id
 * @param {id} data 
 * @returns 
 */
export const changeIdentityToUser = (id) => {
	return instance({
		url: '/user/changeIdentityToUser',
		method: 'POST',
		data: {
			id
		}
	})
}

/**
 * 对用户进行赋权  接收参数 identity id
 * @param {identity,id} data 
 * @returns 
 */
export const changeIdentityToAdmin = (id, identity) => {
	return instance({
		url: '/user/changeIdentityToAdmin',
		method: 'POST',
		data: {
			id,
			identity
		}
	})
}

/**
 * 通过账号对产品管理员进行搜索  接收参数 account
 * @param {account} data 
 * @returns 
 */
export const searchProductAdmin = (account) => {
	return instance({
		url: '/user/searchProductAdmin',
		method: 'POST',
		data: {
			account
		}
	})
}
/**
 * 通过账号对消息管理员进行搜索  接收参数 account
 * @param {account} data 
 * @returns 
 */
export const searchMessageAdmin = (account) => {
	return instance({
		url: '/user/searchMessageAdmin',
		method: 'POST',
		data: {
			account
		}
	})
}
/**
 * 通过账号对用户进行搜索  接收参数 account
 * @param {account} data 
 * @returns 
 */
export const searchUser = (account) => {
	return instance({
		url: '/user/searchUser',
		method: 'POST',
		data: {
			account
		}
	})
}

/**
 * 通过部门对用户进行搜索  接收参数 department
 * @param {department} data 
 * @returns 
 */
export const searchUserByDepartment = (department) => {
	return instance({
		url: '/user/searchUserByDepartment',
		method: 'POST',
		data: {
			department
		}
	})
}

/**
 * 冻结用户  接收参数 id
 * @param {id} data 
 * @returns 
 */
export const banUser = (id) => {
	return instance({
		url: '/user/banUser',
		method: 'POST',
		data: {
			id
		}
	})
}

/**
 * 解冻用户  接收参数 id
 * @param {id} data 
 * @returns 
 */
export const hotUser = (id) => {
	return instance({
		url: '/user/hotUser',
		method: 'POST',
		data: {
			id
		}
	})
}

/**
 * 获取冻结用户列表  接收参数
 * @param { } data 
 * @returns 
 */
export const getBanList = () => {
	return instance({
		url: '/user/getBanList',
		method: 'POST'
	})
}

/**
 * 删除用户  接收参数 id account
 * @param {id ,account} data 
 * @returns 
 */
export const deleteUser = (id, account) => {
	return instance({
		url: '/user/deleteUser',
		method: 'POST',
		data: {
			id,
			account
		}
	})
}

/**
 * 获取对应身份的一个总人数  接收参数 identity
 * @param {identity} data 
 * @returns 
 */
export const getAdminListLength = (identity) => {
	return instance({
		url: '/user/getAdminListLength',
		method: 'POST',
		data: {
			identity
		}
	})
}
/**
 * 监听换页返回数据  接收参数 pager identity
 * @param {pager,identity} data 
 * @returns 
 */
export const returnListData = (pager, identity) => {
	return instance({
		url: '/user/returnListData',
		method: 'POST',
		data: {
			pager,
			identity
		}
	})
}