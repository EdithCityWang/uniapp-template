import store from '@/store';
import moment from 'moment';
moment.locale('zh-cn');

import { primary_color } from '@/static/styles/variables.scss.js';

export default {
	getQueryString (name, path) {
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
		var r = null;
		if(path) {
			r = path.split('?')[1].match(reg);
		} else {
			r = window.location.search.substr(1).match(reg);
		}
		if (r != null) {
		return unescape(r[2]);
		}
		return null;
	},
	/**
	   * 时间戳转为日期格式
	   * time: 时间戳，如1506505252
	   * */
	formatDate: function (time, format = 'YYYY-MM-DD hh:mm:ss') {
	    return moment(time).format(format)
	},
	/**
	 * @description 获取当前页面
	 * @return {String} 当前页面url
	 */
	getCurrentPage() {
		let pages = getCurrentPages();
		return pages[pages.length - 1].route;
	},
	
	/**
	 * @description 确认框
	 * @param {Object} options 
	 */
	showModal(options) {
		uni.showModal({
			confirmColor: primary_color,
			...options
		})
	},
	
	/**
	 * @description 获取登录态code，适用于微信/支付宝小程序
	 */
	login() {
		return new Promise((resolve, reject) => {
			// 获取服务供应商，再获取code
			this.getProvider('oauth').then(provider => {
				uni.login({
					provider: provider[0],
					success(res) {
					    resolve(res.code);
					},
					fail(err) {
						reject(err)
					}
				})
			})
			
		})
	},
	
	/**
	 * @description 更新小程序版本，适用于微信/支付宝小程序
	 */
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
				content: '当前版本过低，无法使用该功能，请升级到最新版本后重试。'
			})
		}
	},
	
	/**
	 * @description 获取服务供应商
	 * @param {Object} service 服务类型：oauth授权登录；share分享；payment支付；push推送
	 */
	getProvider(service) {
		return new Promise((resolve, reject) => {
			uni.getProvider({
			    service: service || 'payment',
			    success(res) {
					resolve(res.provider)
			    },
				fail(err) {
					reject(err)
				}
			});
		})
	},
	
	/**
	 * @description 微信/支付宝支付
	 */
	requestPayment(options) {
		return new Promise((resolve, reject) => {
			// 获取服务供应商，再调起支付
			this.getProvider('payment').then(provider => {
				uni.requestPayment({
				    provider: provider[0],
					...options,
				    success(res) {
				        console.log('success:', res);
						// 支付成功后的回调函数
						uni.showToast({
							icon: 'success',
							title: '支付成功'
						});
						setTimeout(() => {
							resolve(res)
						}, 500)
						resolve(res);
				    },
				    fail(err) {
						console.log('fail', err)
				        reject(err);
				    }
				});
			})
		})
	},
	
	/**
	 * @description 拨打客服电话
	 */
	makePhoneCall() {
		let serviceMobile = store.state.user.serviceMobile;
		
		if(!serviceMobile) {
			store.dispatch('getServiceMobileState').then(mobile => {
				uni.makePhoneCall({
				    phoneNumber: mobile
				});
			}).catch(() => {
				this.showModal({
					title: '提示',
					content: '暂无客服电话哦~'
				});
			})
		} else {
			uni.makePhoneCall({
			    phoneNumber: serviceMobile
			});
		}
	},
	
	/**
	 * 通过屏幕大小来缩放长度
	 * @param {int} length 要缩放的长度
	 */
	convertLength(length) {
		return Math.round(wx.getSystemInfoSync().windowWidth * length / 750);
	},
	
	/**
	 * @description 下载文件资源到本地，客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径。
	 * @param {Object} options  
	 * {
		* url 下载资源的 url
		* header HTTP 请求 Header, header 中不能设置 Referer。
	 * }
	 */
	downloadFile(options) {
		return new Promise((resolve, reject) => {
			uni.downloadFile({
				...options,
				success(res) {
					resolve(res)
				},
				fail(err) {
					reject(err)
				}
			})
		})
	},
	
	/**
	 * @description 保存图片到系统相册
	 */
	saveImageToPhotosAlbum(options) {
		return new Promise((resolve, reject) => {
			uni.saveImageToPhotosAlbum({
				...options,
				success(res) {
					resolve(res)
				},
				fail(err) {
					reject(err)
				}
			})
		})
	}
}
