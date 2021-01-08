<template>
	<view class="login_page">
		<image class="login_logo" src="/static/images/logo.png"></image>
		<view class="login_title">
			<text>Hi,</text>
			<text>欢迎登录</text>
		</view>
		<form class="login_form" @submit="formSubmit">
			<view class="form_item_input">
				<view class="form_item_label" v-show="!!postdata.Account">账号</view>
				<input v-model.trim="postdata.Account" name="Account" placeholder="请输入账号" placeholder-style="color: #95A0B6;" />
			</view>
			<view class="form_item_input">
				<view class="form_item_label" v-show="!!postdata.Password">密码</view>
				<input v-model.trim="postdata.Password" type="password" password name="Password" placeholder="请输入密码" placeholder-style="color: #95A0B6;" />
			</view>
			<view class="form_item_btn">
				<button class="primary large" type="primary" size="large" form-type="submit">登录</button>
			</view>
		</form>
	</view>
</template>

<script>
import { login } from '@/api/base.js';

export default {
	data() {
		return {
			postdata: {
				Account: '',
				Password: ''
			}
		};
	},
	onLoad() {},
	onShow() {},
	methods: {
		/**
		 * @description 登录
		 */
		formSubmit(e) {
			let { Account = '', Password = '' } = e.detail.value;

			if (!Account || Account === '') {
				uni.showToast({
					title: '请输入账号',
					icon: 'none'
				});

				return false;
			}

			if (!Password || Password === '') {
				uni.showToast({
					title: '请输入密码',
					icon: 'none'
				});

				return false;
			}

			login({
				Account,
				Password
			}).then(res => {
				if (res._OK) {
					this.$store.dispatch('getUserInfo', res.data.data);
					uni.switchTab({
						url: "/pages/index/index"
					})
				} else {
					uni.showModal({
						title: '提示',
						content: res.data.message || '登录失败'
					})
				}
				console.log(res);
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.login_page {
	padding: 100rpx 48rpx 48rpx;

	.login_logo {
		width: 178rpx;
		height: 178rpx;
		margin: 0 auto;
	}

	.login_title {
		font-size: 60rpx;
		margin: 50rpx 0 66rpx;
		line-height: 1.6;

		text {
			display: block;
		}
	}

	.login_form {
		.form_item_input {
			background-color: #ffffff;
			height: 108rpx;
			border: 2rpx solid #f0f0f0;
			border-radius: 12rpx;
			margin-bottom: 32rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding: 0 32rpx;

			input {
				font-size: 28rpx;
			}

			.form_item_label {
				font-size: 24rpx;
				color: #404b69;
				margin-bottom: 8rpx;
			}
		}

		.form_item_btn {
			margin-top: 116rpx;
			
			.form_item_tip {
				color: #999999;
				margin-top: 20rpx;
				font-size: 24rpx;
			}
		}
	}
}
</style>
