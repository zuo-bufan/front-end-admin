/**
 * author: zkz
 * @createTime: 2024-08-21 10:06:02
 * @Description: pinia状态管理组件
 */
import { createPinia } from 'pinia'
import { createPersistedState } from "pinia-persistedstate-plugin";
const pinia = createPinia()
//注册状态持久化插件 pinia-persistedstate-plugin
pinia.use(createPersistedState()) 

export default pinia