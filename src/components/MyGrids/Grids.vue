<template>
	<view class="my_grids">
		<view v-for="(item, index) in contentData" :key="index"  class="my_grid_item" @click="toPage(item.path)">
			<view v-if="item.icon" :class="'iconfont ' + item.icon"></view>
			<image v-if="item.image" :src="item.image" mode=""></image>
			<text>{{ item.text }}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			contentData: Array
		},
		data() {
			return {
				
			};
		},
		methods: {
			/**
			 * @description 跳转页面
			 */
			toPage(url) {
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.my_grids {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	
	.my_grid_item {
		width: 25%;
		height: 157rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		
		view {
			font-size: 50rpx;
			color: $uni-color-primary;
			margin-bottom: 16rpx;
		}
		text {
			color: $uni-text-color-regular;
			font-size: 24rpx;
			
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
		}
		
		image {
			width: 70rpx;
			height: 70rpx;
			margin-bottom: 16rpx;
		}
	}
}
</style>
