'<template>
	<view class="tabbar_page my_page">
		<view class="user_box">
			<image class="bg" src="../../static/images/bg_my.png" mode=""></image>
			
			<view class="user_info_box">
				<image class="logo" src="/static/images/icon_head_def.png"></image>
				<text class="username">{{ userInfo.Account }}</text>
				<text class="userrank">{{ userInfo.Role.Remark }}</text>
			</view>
		</view>
		<button class="btn_add" type="primary" @click="myLogout" plain>退出登录</button>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	import { logout } from "@/api/http"
	export default {
		computed: {
			...mapState(['userInfo'])
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
	page {
		overflow-y: auto;
		height: 100%;
	}
	
	.my_page {
		.btn_add {
			margin: 100rpx 80rpx 0;
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
			
		.btn_logout {
			display: flex;
			justify-content: space-between;
			background-color: #FFFFFF;
			box-shadow:0px 0px 12rpx rgba(0,0,0,0.08);
			border-radius: 0;
			margin-top: 40rpx;
			font-size: 30rpx;
			line-height: 114rpx;
			padding: 0 40rpx;
			
			.iconfont {
				font-size: 20rpx;
				color: #999999;
			}
		}
		
		.btn_logout:after {
			border: none;
		}
	}
</style>
