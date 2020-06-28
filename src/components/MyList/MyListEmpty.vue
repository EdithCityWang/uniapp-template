<template>
	<view class="my_list_empty">
		<image src="../../static/images/img_empty.png" mode=""></image>
		<text>暂无记录</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.my_list_empty {
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	margin-top: 30%;
	
	image {
		width: 400rpx;
		height: 260rpx;
	}
	
	text {
		font-size: 32rpx;
		color: #999999;
		margin-top: 46rpx;
	}
}
</style>
