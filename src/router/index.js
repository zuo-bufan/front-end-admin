/**
 * author: zkz
 * @createTime: 2024-08-05 15:21:11
 * @Description: 配置路由
 */
import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
	{
		path: '/',
		redirect: '/login'
	},
	{
		name: 'login',
		path: '/login',
		component: () => import('@/views/login/index.vue')
	},
	{
		name: 'menu',
		path: '/menu',
		component: () => import('@/views/menu/index.vue'),
		children: [
			{
				name: 'home',
				path: '/home',
				component: () => import('@/views/home/index.vue')
			},
			{
				name: 'set',
				path: '/set',
				component: () => import('@/views/setting/index.vue')
			},
			{
				name: 'overview',
				path: '/overview',
				component: () => import('@/views/overview/index.vue')
			},
			{
				name: 'product_manage',
				path: '/product_manage',
				component: () => import('@/views/user_manage/product_manage/index.vue')
			},
			{
				name: 'users_manage',
				path: '/users_manage',
				component: () => import('@/views/user_manage/users_manage/index.vue')
			},
			{
				name: 'message_manage',
				path: '/message_manage',
				component: () => import('@/views/user_manage/message_manage/index.vue')
			},
			{
				name: 'user_list',
				path: '/user_list',
				component: () => import('@/views/user_manage/user_list/index.vue')
			},
			{
				name: 'product_list',
				path: '/product_list',
				component: () => import('@/views/product/product_manage/index.vue')
			},
			{
				name: 'out_manage',
				path: '/out_manage',
				component: () => import('@/views/product/out_manage/index.vue')
			},
			{
				name: 'message_list',
				path: '/message_list',
				component: () => import('@/views/message/message_list/index.vue')
			},
			{
				name: 'recycle',
				path: '/recycle',
				component: () => import('@/views/message/recycle/index.vue')
			},
			{
				name: 'file',
				path: '/file',
				component: () => import('@/views/file/index.vue')
			},
			{
				name: 'operation',
				path: '/operation',
				component: () => import('@/views/operation_log/index.vue')
			},
			{
				name: 'loginlog',
				path: '/loginlog',
				component: () => import('@/views/login_log/index.vue')
			}
		]
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
});

// 全局路由前置守卫
router.beforeEach((to, from, next) => {
	if (to.path === '/login') {
		next();
	} else {
		const token = localStorage.getItem('token');
		if (token) {
			next();
		} else {
			next('/login');
		}
	}
});

export default router;
