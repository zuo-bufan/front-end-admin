/* 
* @Author: zkz    
* @CreateTime: 2025-03-20 17:18:25
* @description: 未读消息的状态管理
*/
import { defineStore } from 'pinia';
import { getReadListAndStatus, getDepartmentMsg } from '@/api/dep_msg.js';

export const useUnreadMessage = defineStore(
	'unreadmessage',
	{
		state: () => {
			return {
				read_list: [], // 未读消息列表
				msg_list: [] // 消息列表
			};
		},
		actions: {
			async getUnreadMessage(id) {
				this.read_list = [];
				this.msg_list = [];
				const res = await getReadListAndStatus(id);
				this.read_list = JSON.parse(res[0].read_list);
				this.msg_list = await getDepartmentMsg(sessionStorage.getItem('department'));
			}
		}
	},
	{
		persist: {
			// 存储全部数据
			enabled: true,
			key: 'unreadmessage',
			Storage: localStorage
		}
	}
);
