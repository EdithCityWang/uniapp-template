import Request from 'luch-request' // 使用npm
import store from '@/store'
import config from '@/tools/config.js'

const axios = new Request();

// #ifndef H5
axios.config.baseURL = config.baseURL; // 测试环境
// #endif

axios.interceptors.request.use((config) => { // 可使用async await 做异步操作
	config.header = {
		...config.header
	}
	
	config.custom = {
		...config.custom,
		loadingTitle: config.custom.loadingTitle || '加载中...'
	}

	if (store.getters.publicToken) {
		config.header.Token = store.getters.publicToken;
	}
	// 如果token不存在，return Promise.reject(config) 会取消本次请求
	// else {
	// 	return Promise.reject(config)
	// }
	
	if (config.custom.loading) {
		uni.showLoading({
			title: config.custom.loadingTitle
		})
	}
	
	return config
	
}, config => { // 可使用async await 做异步操作
	return Promise.reject(config)
})

axios.interceptors.response.use((response) => { /* 对响应成功做点什么 可使用async await 做异步操作*/
	if (Number(response.statusCode) !== 200) { // 服务端返回的状态码不等于200，则reject()
	   return Promise.reject(response) // return Promise.reject 可使promise状态进入catch
	}
	
	// 用户未登录或者登录失效
	if(response.data.state === '403') {
		logout();
		// return Promise.reject(response) // return Promise.reject 可使promise状态进入catch
	}
	
	response._OK = response.data.state === 'success' // 接口请求状态，成功的话_OK为true
	
	uni.hideLoading();

	return response
}, (response) => { /*  对响应错误做点什么 （statusCode !== 200）*/
	console.log(response)
	uni.hideLoading();
	return Promise.reject(response)
})

/**
 * @description 跳转至登录页
 */
function logout() {
	uni.clearStorageSync('userInfo');
	uni.reLaunch({
		url: '/pages/login/login'
	})
}

export default axios;
