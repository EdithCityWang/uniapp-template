import { primary_color } from '@/static/styles/variables.scss.js'

export default {
	// 确认框
	showModal(options) {
		uni.showModal({
			confirmColor: primary_color,
			...options
		})
	},
	
	// 校验登录态是否过期
	checkSession() {
		return new Promise((resolve, reject) => {
			uni.checkSession({
				success(res) {
					resolve(res)
				},
				fail(err) {
					reject(err)
				}
			})
		})
	},
	
	// 获取登录态code
	login() {
		return new Promise((resolve, reject) => {
			uni.login({
				provider: 'weixin',
				success(res) {
				    resolve(res.code);
				},
				fail(err) {
					reject(err)
				}
			})
		})
	},
	
	// 更新小程序版本
	autoUpdate() {
		if(uni.canIUse('getUpdateManager')) {
			const updateManager = uni.getUpdateManager();
			
			updateManager.onCheckForUpdate((res) => {
				// 请求完新版本信息的回调
				if(res.hasUpdate) {
					updateManager.onUpdateReady((res) => {
					    this.showModal({
							title: '更新提示',
							content: '新版本已经准备好，是否重启应用？',
							success(res) {
								if (res.confirm) {
									// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
									updateManager.applyUpdate();
								}
							}
						});
					});
					
					updateManager.onUpdateFailed((res) => {
						// 新的版本下载失败
						this.showModal({
					        title: '已经有新版本了哟~',
					        content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
					    })
					});
				}
			});
		} else {
			this.showModal({
				title: '提示',
				content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
			})
		}
	}
}