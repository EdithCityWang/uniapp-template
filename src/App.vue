<script>
import { mapState } from 'vuex';
import { getWxConfig } from '@/api/http';
export default {
	computed: {
		...mapState(['userInfo'])
	},
	data() {
		return {
			isOpenBle: false
		}
	},
	onLaunch: function() {},
	onShow: function() {
		console.log('App Show');
		// 获取微信公众号配置信息
		// getWxConfig().then(res => {
		// 	console.log(res, "===")
		// })
		
		// 如果没有token则跳回登录页
		this.$store.dispatch('getUserInfo').catch(res => {
			uni.reLaunch({
				url: 'pages/login/login'
			});
		})
	},
	onHide: function() {
		console.log('App Hide');
	},
	methods: {
		
	}
};
</script>

<style lang="scss">
@import url('static/styles/iconfont.scss');

/*每个页面公共css */
page {
	color: #020433;
	font-size: 28rpx;
	line-height: 1.3;
	background-color: #f6f6f6;
}

page,
view,
text {
	box-sizing: border-box;
}

image {
	display: block;
}

.c_999 {
	color: #999999;
}

.btn_primary {
	background: linear-gradient(135deg, rgba(69, 170, 82, 1) 0%, rgba(35, 165, 160, 1) 100%);
	line-height: 100rpx;
	font-size: 28rpx;
}

.btn_primary[size=mini] {
	border-radius: 8rpx;
	line-height: 58rpx;
}

.btn_add[type='primary'][plain] {
	background-color: #ffffff;
	color: #2aa68f;
	font-size: 30rpx;
	line-height: 80rpx;
	border-radius: 40rpx;
	border: 2rpx solid #2aa68f;
	padding: 0 56rpx;
}

.tabbar_page {
	overflow-y: auto;
	height: 100%;
	box-shadow: inset 0rpx -20rpx 10rpx -20rpx rgba(0, 0, 0, 0.2);
	border: 2rpx solid transparent;
}

.my_form {
	color: #333333;

	.input_placeholder {
		color: #999999;
	}

	.form_item_btn {
		padding: 60rpx 48rpx;
	}

	.radio-group {
		display: flex;

		label {
			font-size: 30rpx;

			radio {
				margin-right: 14rpx;
			}
		}

		label + label {
			display: flex;
			align-items: center;
			margin-left: 126rpx;
		}
	}

	.form_item_textarea {
		margin-top: 38rpx;
		width: 100%;
		height: 100rpx;
	}
}

.card_box {
	padding: 30rpx;

	.card_item {
		background-color: #fff;
		border-radius: 10rpx;
		box-shadow: 0rpx 0rpx 15rpx 5rpx rgba(0, 0, 0, 0.1);
		margin-bottom: 18rpx;
		padding: 0 30rpx;

		.card_item_title {
			color: #333333;
			font-size: 30rpx;
			display: flex;
			justify-content: space-between;
			padding: 30rpx 0;
			font-weight: bold;
		}

		.card_item_content {
			border-top: 2rpx solid #f3f3f3;
			font-size: 30rpx;
			padding: 20rpx 0 32rpx;

			.card_item_view {
				display: flex;
				margin-bottom: 20rpx;

				text {
					color: #666666;
				}

				view {
					color: #333333;
				}
			}

			.card_item_view:last-child {
				margin-bottom: 0;
			}
		}
		
		.card_item_footer {
			display: flex;
			justify-content: flex-end;
			padding: 20rpx 0;
			border-top: 2rpx solid #f3f3f3;
			
			button{
				margin: 0;
				
			}
		}
	}
}

.input_placeholder {
	color: #999999
}
</style>
