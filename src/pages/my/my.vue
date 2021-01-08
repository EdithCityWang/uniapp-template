'<template>
	<view class="tabbar_page my_page">
		<view class="user_box">
			<image class="bg" src="../../static/images/bg_my.png"></image>
			
			<view class="user_info_box">
				<image class="logo" src="/static/images/icon_head_def.png"></image>
				<text class="username">{{ userInfo.Account }}</text>
				<text class="userrank">{{ userInfo.Role && userInfo.Role.Remark ?  userInfo.Role.Remark : '' }}</text>
			</view>
		</view>
	<!-- 	<my-form :label-width="200">
			<my-form-section>
				<my-form-item label="地址管理" @click.native="toPage('/pagesAddress/address/address')">
					<view slot="extra" class="icon iconfont iconxuanze-right"></view>
				</my-form-item>
			</my-form-section>
		</my-form> -->
		
		<button class="primary circle large plain" type="primary" data-shape="circle" size="large" @click="myLogout" plain>退出登录</button>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	import { logout } from "@/api/base.js"
	export default {
		computed: {
			...mapState({
				userInfo: state => state.user.userInfo
			})
		},
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		onShow() {

		},
		methods: {
			/**
			 * @description 跳转页面
			 * @param {String} path 跳转路径 
			 */
			toPage (path) {
				uni.navigateTo({
					url: path
				})
			},
			
			/**
			 * @description 退出登录
			 */
			myLogout () {
				uni.showModal({
					title: '提示',
					content: '确认退出吗？',
					success(res) {
						if(res.confirm) {
							logout().then(res => {
								if(res._OK) {
									uni.clearStorageSync('userInfo'); // 清除缓存
									uni.reLaunch({
										url: '/pages/login/login'
									})
								} else {
									uni.showToast({
										icon: 'none',
										title: res.data.message || '退出失败'
									})
								}
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.my_page {
		button {
			margin: 100rpx 80rpx 0;
		}
		
		.iconfont {
			transform: scale(0.7);
			font-size: 20rpx;
		}
		
		.user_box {
			position: relative;
			z-index: 1;
			height: 240rpx;
		
			.bg {
				width: 100%;
				position: absolute;
				height: 240rpx;
				left: 0;
				right: 0;
				top: 0;
				z-index: 10;
			}
			
			.user_info_box {
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				z-index: 11;
				display: flex;
				justify-content: center;
				flex-direction: column;
				padding: 0 0 0 190rpx;
				color: #FFFFFF;
				font-size: 26rpx;
				
				.logo {
					z-index: 12;
					position: absolute;
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
					left: 60rpx;
					top: 50%;
					margin-top: -50rpx;
				}
				
				.username {
					font-size: 32rpx;
					font-weight: bold;
					margin-bottom: 8rpx;
				}
			}
		}
	}
</style>
