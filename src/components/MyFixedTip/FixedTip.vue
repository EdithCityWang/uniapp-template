<template>
	<view>
		<view class="bluetooth_tip" v-if="isShow">
			<text>{{ textTips }}</text>
			<view class="icon iconfont iconguanbi" @click="closeTip"></view>
		</view>
		<view style="height: 112rpx;" v-if="isShow"></view>
	</view>
</template>

<script>
	export default {
		props: {
			textTips: {
				type: String,
				default: '温馨提示：只有比别人更早,更勤奋的努力,才能尝到成功的滋味。谁也不能随随便便成功,它来自彻底的自我管理和毅力。'
			}
		},
		data() {
			return {
				isShow: true, // 提示框是否显示，默认显示
			}
		},
		methods: {
			/**
			 * @description 关闭tip
			 */
			closeTip() {
				this.isShow = false;
			}
		}
	}
</script>
<style lang="scss" scoped>
.bluetooth_tip {
	position: fixed;
	top: 0;
	/* #ifdef H5 */
	top: $nav-height;
	/* #endif */
	left: 0;
	right: 0;
	padding: 0 80rpx 0 30rpx;
	color: #999999;
	background-color: #ffffff;
	font-size: 24rpx;
	z-index: 999;
	line-height: 1.6;
	height: 112rpx;
	display: flex;
	align-items: center;
	
	.iconfont {
		position: absolute;
		right: 30rpx;
		top: 20rpx;
		font-size: 24rpx;
	}
}
</style>
