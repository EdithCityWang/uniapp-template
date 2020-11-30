<template>
	<view :class="'my_grids ' + className">
		<view 
			v-for="(item, index) in contentData" 
			:key="index"
			class="my_grid_item"
			:style="{
				width: 1 / columns * 100 + '%',
				paddingLeft: gutter + 'rpx',
				paddingRight: gutter + 'rpx',
				paddingTop: distance + 'rpx',
				paddingBottom: distance + 'rpx'
			}"
			@click="toPage(item.path)"
		>
			<view v-if="item.icon" :class="'my_grid_item_icon iconfont ' + item.icon"></view>
			<image class="my_grid_item_image" v-if="item.image" :src="item.image" mode="aspectFit"></image>
			<text class="my_grid_item_title">{{ item.text }}</text>
			<text class="my_grid_item_tip" v-if="item.tip">{{ item.tip }}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			className: String,
			// 一行列数，默认4列
			columns: {
				type: Number,
				default: 4
			},
			// 左右距离，单位rpx，默认20rpx
			gutter: {
				type: Number,
				default: 20
			},
			// 上下距离，单位rpx，默认20rpx
			distance: {
				type: Number,
				default: 20
			},
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

<style lang="scss">
.my_grids {
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
	flex-wrap: wrap;	
}
.my_grid_item {
	width: 25%;
	// height: 157rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	padding-top: 35rpx;
	padding-bottom: 35rpx;
}

.my_grid_item_icon {
	font-size: 50rpx;
	color: $uni-text-color;
	margin-bottom: 16rpx;
	line-height: 1;
}
.my_grid_item_title {
	color: $uni-text-color-regular;
	font-size: $uni-font-size-sm;
	
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
}

.my_grid_item_image {
	width: 70rpx;
	height: 70rpx;
	margin-bottom: 16rpx;
}

.my_grid_item_tip {
	color: $uni-text-color-secondary;
	font-size: 22rpx;
	margin-top: 17rpx;
	text-align: center;
	line-height: 1.3;
}
</style>
