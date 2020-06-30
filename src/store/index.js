import Vue from "vue"
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		// 微信配置信息
		// wxConfig: {
		// 	"appId": "",
		// 	"appSecret": "",
		// 	"jsapi_ticket": "",
		// 	"nonceStr": "",
		// 	"timestamp": "",
		// 	"signature": ""
		// },
		// 用户信息
		userInfo: {
			token: ""
		}
	},
	mutations: {
		// 设置用户信息
		setUserInfo(state, data) {
			state.userInfo = data;
		}
	},
	getters: {

	},
	actions: {
		// 获取用户信息
		getUserInfo({ commit }, data) {
			let userInfo = uni.getStorageSync('userInfo');
			console.log(userInfo, "===============")
			return new Promise((resolve, reject) => {
				if(data) {
					commit('setUserInfo', data);
					uni.setStorageSync('userInfo', data);
					resolve(data);
				} 
				else if (userInfo) {
					commit('setUserInfo', userInfo);
					uni.setStorageSync('userInfo', userInfo);
					resolve(data);
				} else {
					reject(data);
				}
			})
		}
	}
})
