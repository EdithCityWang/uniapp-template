<template>
	<view class="swiper_box">
		<view class="swiper_wrap">
			<swiper class="swiper_list"
				:style="{
					height: swiperOpts.height + 'rpx'
				}"
				:indicator-dots="swiperOpts.indicatorDots" 
				:autoplay="swiperOpts.autoplay" 
				:interval="swiperOpts.interval" 
				:duration="swiperOpts.duration"
				:indicator-color="swiperOpts.indicatorColor"
				:indicator-active-color="swiperOpts.indicatorActiveColor"
				:current="swiperOpts.current"
				@change="swiperChange"
			>
				<swiper-item class="swiper_item" v-for="(item, index) in contentData" :key="index">
					<image :src="imageKey ? item[imageKey] : item" mode="scaleToFill"></image>
				</swiper-item>
			</swiper>
			<view :class="'swiper_pagination ' + swiperOpts.mode">
				<text v-if="swiperOpts.mode === 'indexs'">{{ swiperOpts.current + 1 }}/{{ contentData.length }}</text>
				<view v-else-if="swiperOpts.mode === 'round'" class="round_list">
					<text :class="{
						'round_item': true,
						'active': swiperOpts.current === index
					}" v-for="(item, index) in contentData" :key="index"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			// 轮播图数据
			contentData: {
				type: Array,
				default: []
			},
			options: Object,
			// 图片地址属性名，用于获取图片地址
			imageKey: String, 
		},
		data() {
			return {
				// 轮播图相关默认
				swiperOpts: {
					mode: 'dot', // 分页模式：dot圆点，indexs页码索引；round 圆点+长
					height: 680, // 轮播图高度，单位rpx
					current: 0, // 当前所在滑块儿的index
					indicatorDots: false, // 是否显示面板指示点
					indicatorColor: "rgba(0, 0, 0, 0.3)", // 指示点颜色
					indicatorActiveColor: "#3EB18E", // 当前选中的指示点颜色
					autoplay: true, // 是否自动切换
					interval: 5000, // 自动切换时间间隔
					duration: 1000, // 滑动动画时长
				}
			}
		},
		mounted() {
			this.swiperOpts = {
				...this.swiperOpts,
				...this.options
			}
		},
		methods: {
			/**
			 * @description 轮播图切换事件
			 */
			swiperChange(e) {
				let { current = 0 } = e.detail;
				this.swiperOpts.current = current;
			}
		}
	}
</script>

<style lang="scss" scoped>
.swiper_box {
	.swiper_wrap {
		position: relative;
		z-index: 1;
	}
	
	.swiper_list {
		.swiper_item {
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
	
	/* 分页 */
	.swiper_pagination {
		position: absolute;
		z-index: 11;
		left: 0;
		right: 0;
		bottom: 10rpx;
		
		&.indexs {
			right: 0;
			bottom: 40rpx;
			left: auto;
			
			background-color: rgba(0, 0, 0, 0.6);
			color: #fff;
			font-size: 22rpx;
			text-align: center;
			border-radius: 40rpx 0 0 40rpx;
			padding: 5rpx 16rpx;
		}
		
		&.round {
			.round_list {
				display: flex;
				justify-content: center;
				align-items: center;
				
				.round_item {
					width: 10rpx;
					height: 6rpx;
					background-color: rgba(0, 0, 0, 0.5);
					border-radius: 6rpx;
					
					&.active {
						width: 30rpx;
						background-color: #EC1A54;
					}
				}
				
				.round_item + .round_item {
					margin-left: 3rpx;
				}
			}
		}
	}
}	
</style>
