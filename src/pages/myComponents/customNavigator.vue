<template>
 	<view class="custom_navigator_page">
 		<uni-nav-bar left-icon="back" :status-bar="true" :fixed="true" @clickLeft="back">
 			<uni-segmented-control class="navbar_box" :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#2AA68F"></uni-segmented-control>
 		</uni-nav-bar>
 		<view class="filter_box" :style="'top:' + filterBoxTop + 'px'">
 			<my-picker-selector v-model="Status" :range="statusArr" range-key="Name" placeholder="所有状态"></my-picker-selector>
 			<my-picker-selector v-model="CateId" :range="cates" range-key="Name" placeholder="所有分类"></my-picker-selector>
 			<my-picker-date v-model="Time" mode="date" icon-name="iconxuanze" placeholder="选择日期"></my-picker-date>
 		</view>
		
 		<view class="content">
 			<view v-if="current === 0">记录</view>
 			<view v-if="current === 1">使用</view>
 		</view>
 	</view>
 </template>
 
 <script>
 	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
 	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
	
 	export default {
 		components: {
 			uniNavBar,
 			uniSegmentedControl
 		},
 		data() {
 			return {
				filterBoxTop: 44,
 				items: ['记录', '使用'],
 				current: 0,
 				cates: [], // 分类
				Time: "",
				CateId: null,
				Status: '',
				statusArr: [
					{
						Id: '',
						Name: '所有状态'
					},
					{
						Id: 'invalid',
						Name: '未入库'
					},
					{
						Id: 'valid',
						Name: '已入库'
					}
				]
 			}
 		},
		onLoad() {
			this.filterBoxTop = uni.getSystemInfoSync()['statusBarHeight'] + 45;
		},
 		onShow() {

 		},
 		methods: {
 			onClickItem(e) {
 				// if (this.current !== e.currentIndex) {
 					this.current = e.currentIndex;
 					// 初始化数据
 					this.StoreHouseId = 0; // 仓库id
 					this.CateId = 0; // 分类id
 					this.Status = ""; // 入库状态
 					this.Time = ""; // 割取时间
 				// }
 			},
 			/**
 			 * @description 返回上一页
 			 */
 			back() {
 				uni.navigateBack({
 					delta: 1
 				})
 			}
 		},
		onReachBottom() {
			if(this.current === 0) {
				this.$refs.antlerGet.pullUpMore();
			} else if(this.current === 1) {
				this.$refs.antlerInRecord.pullUpMore();
			} else {
				this.$refs.antlerSell.pullUpMore();
			}
		}
 	}
 </script>
 
 <style lang="scss">
 	@import '@/uni.scss';
 	
	.custom_navigator_page {

		.content {
			padding-top: 80rpx;
		}
		
		.navbar_box {
			margin: 0 auto;
			
			.segmented-control__item + .segmented-control__item {
				margin-left: 40rpx;
			}
		}
		
		.filter_box {
			background-color: #FFFFFF;
			position: fixed;
			z-index: 999;
			
			top: 44px;
			
			right: 0;
			left: 0;
			
			display: flex;
			justify-content: space-around;
			
			.my_picker {
				height: 80rpx;
				line-height: 80rpx;
			}
		}
	}
 	
 </style>
 