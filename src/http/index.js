/**
 * author: zkz
 * @createTime: 2024-08-06 10:09:02
 * @Description: axios 用于请求后端数据
 */
import axios from 'axios';
//引入进度条（必须引入nprogress.css的样式）
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';

const instance = axios.create({
	baseURL: import.meta.env.VITE_API_BASEURL,
	timeout: 5000
	// headers: {
	// 	'Content-Type': 'application/x-www-from-urlencoded'
	// }
});

// 请求拦截器
instance.interceptors.request.use(
	(config) => {
		// 在发送请求之前做什么
		Nprogress.start();
		return config;
	},
	(err) => {
		Nprogress.done();
		return Promise.reject(err);
	}
);

// 响应拦截器
instance.interceptors.response.use(
	(res) => {
		// 对响应数据做什么
		Nprogress.done();
		return res.data;
	},
	(err) => {
		Nprogress.done();
		return Promise.reject(err);
	}
);

export default instance;
