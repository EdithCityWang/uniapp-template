import {
	getShopInfo,
	getRegionTree,
	getServiceMobile
} from '@/api/base.js';

import util from '@/tools/util.js';

export default {
	state: {
		// 用户信息
		userInfo: uni.getStorageSync('userInfo') || {
			Token: "",
			Id: 0,
			Mobile: ""
		},
		// 地区三联集合
		regionTree: uni.getStorageSync('regionTree') || []
	},
	mutations: {
		// 设置用户信息
		SET_USER(state, userInfo) {
			uni.setStorageSync('userInfo', userInfo);
			state.userInfo = userInfo;
		},
		// 设置地区数据
		SET_REGIONTREE(state, regionTree) {
			uni.setStorageSync('regionTree', regionTree);
			state.regionTree = regionTree;
		}
	},
	actions: {
		// 获取用户信息
		getUserInfo({ commit }, data) {
			let userInfo = uni.getStorageSync('userInfo');
			// console.log(userInfo, "===============")
			return new Promise((resolve, reject) => {
				if(data) {
					commit('SET_USER', data);
					resolve(data);
				} 
				else if (userInfo) {
					commit('SET_USER', userInfo);
					resolve(data);
				} else {
					reject(data);
				}
			})
		},
		
		/**
		 * @description 获取地区数据
		 */
		getRegionTreeData({ commit, state }) {
			return new Promise((resolve, reject) => {
				let regionTree = uni.getStorageSync('regionTree') || [];
				
				if(regionTree && regionTree.length) {
					commit('SET_REGIONTREE', regionTree);
					resolve(regionTree);
					return false;
				}
				
				getRegionTree().then(res => {
					if(res._OK) {
						commit('SET_REGIONTREE', res.data.data);
						resolve(res.data.data);
					} else {
						reject(res);
					}
				}).catch(err => {
					reject(res);
				})
			})
		}
	}
}