<template>
	<view class="my_tab_bar_box">
		<view :style="'height: ' + option.height + 'rpx;'"></view>
		<view 
			class="my_tab_bar" 
			:style="{
				height: option.height + 'rpx',
				backgroundColor: option.backgroundColor,
				borderColor: option.borderStyle
			}"
		>
			<view 
				open-type="reLaunch" 
				class="my_tab_bar_item"
				hover-class="none" 
				v-for="(item, index) in option.list" 
				:key="index" 
				:url="item.pagePath"
				@click="handleClick(index)"
				:style="{
					color: (currentIndex === index) ? option.selectedColor : option.color,
				}"
			>
				<image :src="(currentIndex === index) ? item.selectedIconPath : item.iconPath"></image>
				<text>{{ item.text }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import util from '@/tools/util.js'
	
	export default {
		data() {
			return {
				// 配置信息
				option: {
					"height": 100,
					"color": "#404B69",
					"selectedColor": "#26A69A",
					"borderStyle": "white",
					"backgroundColor": "#ffffff",
					"list": [
						{
							"pagePath": "/pagesStaff/pages/index/index",
							"iconPath": "/pagesStaff/static/images/icon_enter.png",
							"selectedIconPath": "/pagesStaff/static/images/icon_enter_selected.png",
							"text": "录入"
						}, 
						{
							"pagePath": "/pagesStaff/pages/my/my",
							"iconPath": "/pagesStaff/static/images/icon_my.png",
							"selectedIconPath": "/pagesStaff/static/images/icon_my_selected.png",
							"text": "我的"
						}
					]
				},
				currentIndex: 0 // 当前索引值
			};
		},
		mounted() {
			// let pages = getCurrentPages();
			// let currentPage = pages[pages.length - 1].route;
			this.currentIndex = this.option.list.findIndex(item => {
				return item.pagePath.includes(util.getCurrentPage())
			});
		},
		methods: {
			/**
			 * @description 点击tabbar item
			 * @param {Number} index 点击所在索引值
			 */
			handleClick(index) {
				this.currentIndex = index;
				
				uni.reLaunch({
					url: this.option.list[index].pagePath
				})
			}
		}
	}
</script>

<style lang="scss">
.my_tab_bar {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	border-top-style: 1rpx solid;
}

.my_tab_bar_item {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	flex: 1;
	
	image {
		width: 48rpx;
		height: 48rpx;
	}
	
	text {
		font-size: 20rpx;
	}
}
</style>
