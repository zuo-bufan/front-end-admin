import {
	createApp
} from 'vue'
import App from './App.vue'
import router from './router/index.js'
import pinia from './store/index.js'
// import "sn-console"
import "zkz-log"
// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 导入pinia
// 引入国际化
import zhCn from 'element-plus/es/locale/lang/zh-cn'
log.copyright()
// 创建实例
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}
// Element Plus 提供了全局配置国际化的配置。
app.use(ElementPlus, {
	locale: zhCn,
})
app.use(router).use(pinia).mount('#app')