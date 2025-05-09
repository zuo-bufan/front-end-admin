/**
 * author: zkz
 * @createTime: 2024-08-21 10:25:05
 * @Description: 用户信息的状态管理
 */
import {
	defineStore
} from 'pinia'
import {
	getUserInfor
} from '@/api/userinfor.js'
// 你可以任意命名 `defineStore()` 的返回值，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。
// (比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useUserInfor = defineStore('userinfor', {
	// 其他配置...
	state: () => {
		return {
			imageUrl: '',
			name: '',
			sex: '',
			department: '',
			identity: '',
			email: '',
			account:''
		}
	},
	actions: {
		// 获取用户基本信息
		async userInfor(id) {
			const res = await getUserInfor(id)
			// console.log(res);
			this.imageUrl = res.image_url
			this.name = res.name
			this.sex = res.sex
			this.department = res.department
			this.identity = res.identity
			this.email = res.email
			this.account = res.account
		}
	}
}, {
	persist: {
		// 存储全部数据
		enabled: true,
		key: 'userinfor',
		Storage: localStorage
	}
})