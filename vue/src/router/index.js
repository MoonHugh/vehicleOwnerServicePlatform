import Vue from 'vue'
import Router from 'vue-router'

// // 业务员专属功能
// import salesman from '../page/salesman.vue'
// // 业务员代申领功能
// import replace from '../page/replace.vue'
// // 业务员代申领套餐
// import setMeal from '../page/setMeal.vue'
// // 用户链接
// import userLinks from '../page/userLinks.vue'

Vue.use(Router)

export default new Router({
	routes: [
		{
			// 首页
			path: '/',
			name: 'default',
			component: resolve => require(['../page/index.vue'], resolve)
		},
		{
			// 首页
			path: '/index',
			name: 'index',
			component: resolve => require(['../page/index.vue'], resolve)
		},
		{
			// 服务项目
			path: '/services1',
			name: 'services1',
			component: resolve => require(['../page/services1.vue'], resolve)
		},
		{
			// 服务项目
			path: '/services2',
			name: 'services2',
			component: resolve => require(['../page/services2.vue'], resolve)
		},
		{
			// 绑定信息
			path: '/information',
			name: 'information',
			component: resolve => require(['../page/information.vue'], resolve)
		},
		{
			// 地图
			path: '/map',
			name: 'map',
			component: resolve => require(['../page/map.vue'], resolve)
		},
		{
			// 我的订单
			path: '/myorder',
			name: 'myorder',
			component: resolve => require(['../page/myorder.vue'], resolve)
		},
		{
			// 订单详情
			path: '/orderdetails',
			name: 'orderdetails',
			component: resolve => require(['../page/orderdetails.vue'], resolve)
		},
		{
			// 评价
			path: '/evaluate',
			name: 'evaluate',
			component: resolve => require(['../page/evaluate.vue'], resolve)
		},
		{
			// 报案成功
			path: '/report',
			name: 'report',
			component: resolve => require(['../page/report.vue'], resolve)
		},
		{
			// 绑定车辆信息
			path: '/carInformation',
			name: 'carInformation',
			component: resolve => require(['../page/carInformation.vue'], resolve)
		},
		{
			// 验证车辆信息
			path: '/carVerification',
			name: 'carVerification',
			component: resolve => require(['../page/carVerification.vue'], resolve)
		},
		// {
		// 	path: '/salesman',
		// 	name: 'salesman',
		// 	component: salesman
		// },
		// {
		// 	path: '/replace',
		// 	name: 'replace',
		// 	component: replace
		// },
		// {
		// 	path: '/setMeal',
		// 	name: 'setMeal',
		// 	component: setMeal
		// },
		// {
		// 	path: '/userLinks',
		// 	name: 'userLinks',
		// 	component: userLinks
		// }
	]
})
