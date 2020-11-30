<template>
	<uni-icons :class="'icon_back ' + className" type="arrowleft" :color="color" :size="size" @click="back"></uni-icons>
</template>

<script>
	export default {
		props: {
			className: String, // 自定义样式
			// 按钮颜色
			color: {
				type: String,
				default: '#333333'
			},
			// 按钮大小
			size: {
				type: Number,
				default: 24
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			/**
			 * @description 返回上一页
			 */
			back() {
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style lang="scss">
.icon_back {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 60rpx;
	height: 60rpx;
	position: fixed;
	z-index: 99;
	// background-color: rgba($color: #000000, $alpha: 0.3);
	border-radius: 100rpx;
	top: calc(var(#{$status-bar-height}) + 12rpx);
	left: 25rpx;
	// box-shadow: 0 0 5rpx 5rpx rgba($color: #000000, $alpha: 0.3);
}
</style>
