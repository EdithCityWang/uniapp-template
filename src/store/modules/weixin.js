import tWeixin from '@/tools/weixin.js';
import util from '@/tools/util.js';
import {
	wxLogin,
	wxBindPhone
} from '@/api/base.js'

export default {
	state: {
		// 微信登录code值
		code: ''
	},
	mutations: {
		// 设置微信登录code值
		SET_CODE(state, code) {
			state.code = code;
		}
	},
	actions: {
		/**
		 * @description 登录，+校验登录态是否失效
		 */
		getWeixinCode({ commit, state }) { 
			// console.log(commit)
			return new Promise((resolve) => {
				if(!state.code) {
					util.login().then(code => {
						commit('SET_CODE', code);
						resolve()
					})
				} else {
					tWeixin.checkSession().then(() => {
						resolve()
					}).catch(() => {
						util.login().then(code => {
							commit('SET_CODE', code);
							resolve()
						})
					})
				}
			})
		},
		
		/**
		 * @description 授权用户信息，并登录
		 */
		 weixinLogin({ commit, state, dispatch, rootState }, data) {
			return new Promise(async (resolve, reject) => {
				if(!data.encryptedData) {
					reject(data)
				} else {
					let code = await util.login()
					// console.log(code, JSON.stringify(data),'-------------------')
					// return;
					wxLogin({
						Code: code,
						Iv: data.iv,
						EncryptData: data.encryptedData,
						UpUserId: rootState.user.upUserId
					}).then(async res => {
						if(res._OK) {
							res.data.data.AvatarUrl = data.userInfo.avatarUrl;
							resolve(res)
						} else {
							reject(res)
						}
					}).catch(err => {
						reject(err)
					})
				}
			})
		},
		/**
		 * @description 绑定手机号
		 */
		weixinBindPhone({ commit, state, dispatch, rootState }, data) {
			console.log(data)
			return new Promise(async (resolve, reject) => {
				let code = await util.login()

				wxBindPhone({
					Code: code,
					Iv: data.iv,
					EncryptData: data.encryptedData
				}).then(async res => {
					if(res._OK) {
						uni.showToast({
							title: '绑定成功'
						})
						await dispatch('getUserInfo', {
							...rootState.user.userInfo,
							Mobile: res.data.data.Mobile
						}, { root: true }); // 存储个人信息
						resolve(res)
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.message || '绑定失败'
						})
					}
				})
			})
			
		}
	}
}