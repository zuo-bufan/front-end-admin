import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [ vue() ],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
	server: {
		port: 8080, //默认启动端口
		open: true, //自动打开浏览器
		cors: true //允许跨域
	},
	css: {
		// css预处理器
		preprocessorOptions: {
			scss: {
				// 引入 mixin.scss 这样就可以在全局中使用 mixin.scss中预定义的变量了
				// 给导入的路径最后加上 ;
				additionalData: '@import "@/assets/style/mixin.scss";'
			}
		}
	},
	define: {
		__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true'
	}
});
