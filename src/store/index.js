import Vue from "vue"
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		// 微信配置信息
		// wxConfig: {
		// 	"appId": "wxb970a60e95c439ce",
		// 	"appSecret": "eb1d6214716882795cee5d3edc129dc6",
		// 	"jsapi_ticket": "kgt8ON7yVITDhtdwci0qeekWcgK20N1oBe1FwwU2btEN030OUj-B7cjA0YU0NADOdBfWM8hMycxIaTSf6lbsSw",
		// 	"nonceStr": "ew0q915k1ro",
		// 	"timestamp": "1591580044",
		// 	"signature": "491f61d09f99c114aa15509e3c4f7fff1b232922"
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
