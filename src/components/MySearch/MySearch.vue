<template>
	<view :class="'search_box ' + className">
		<view class="icon iconfont iconsousuo1"></view>
		<input type="text" :placeholder="placeholder" :placeholder-class="placeholderClass" />
	</view>
</template>

<script>
	export default {
		props: {
			// input提示
			placeholder: {
				type: String,
				default: '请输入鹿只编号'
			},
			placeholderClass: {
				type: String,
				default: 'input_placeholder'
			},
			className: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.search_box {
		background-color: #F6F6F6;
		padding: 0 30rpx;
		position: relative;
		box-sizing: border-box;
		height: 120rpx;
		display: flex;
		align-items: center;
		align-items: center;
		
		input {
			height: 80rpx;
			border-radius: 40rpx;
			background-color: #fff;
			border: 2rpx solid #DCDCDC;
			padding: 0 30rpx 0 68rpx;
			font-size: 24rpx;
			width: 100%;
		}
		
		.iconfont {
			position: absolute;
			font-size: 28rpx;
			color: #999999;
			left: 62rpx;
			top: 50%;
			width: 50rpx;
			line-height: 50rpx;
			margin-top: -25rpx;
		}
	}
</style>
