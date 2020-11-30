<template>
	<view :class="'my_swiper_box ' + className">
		<swiper class="my_swiper_list"
			:style="{
				height: swiperOpts.height + 'rpx'
			}"
			:circular="swiperOpts.circular"
			:indicator-dots="false" 
			:autoplay="swiperOpts.autoplay" 
			:interval="swiperOpts.interval" 
			:duration="swiperOpts.duration"
			:indicator-color="swiperOpts.indicatorColor"
			:indicator-active-color="swiperOpts.indicatorActiveColor"
			:current="current"
			@change="swiperChange"
		>
			<swiper-item class="my_swiper_item" v-for="(item, index) in contentData" :key="index">
				<image @click.native="swiperItemClick(index)" :src="imageKey ? item[imageKey] : item" mode="scaleToFill"></image>
			</swiper-item>
		</swiper>
		<view v-if="swiperOpts.indicatorDots" :class="'my_swiper_pagination ' + swiperOpts.mode">
			<text v-if="swiperOpts.mode === 'indexs'">{{ current + 1 }}/{{ contentData.length }}</text>
			<view v-else-if="swiperOpts.mode === 'round' || swiperOpts.mode === 'dot'" :class="swiperOpts.mode + '_list'">
				<text
					v-for="(item, index) in contentData" :key="index"
					:class="(swiperOpts.mode + '_item') + (current === index ? ' active' : '')" 
					:style="{
						backgroundColor: current === index ? swiperOpts.indicatorActiveColor : swiperOpts.indicatorColor
					}"
				></text>
			</view>
		</view>
	</view>
</template>

<script>
	import variables from '@/static/styles/variables.scss.js'
	
	export default {
		props: {
			// 轮播图自定义样式
			className: String,
			// 轮播图数据
			contentData: {
				type: Array,
				default: []
			},
			options: Object,
			// 图片地址属性名，用于获取图片地址
			imageKey: String, 
		},
		computed: {
			swiperOpts() {
				
				let options = {
					...this.defaultOpts,
					...this.options
				}
				this.current = options.current || 0
				return options;
			}
		},
		data() {
			return {
				// 轮播图相关默认
				defaultOpts: {
					current: 0,
					mode: 'dot', // 分页模式：dot圆点，indexs页码索引；round 圆点+长
					height: 680, // 轮播图高度，单位rpx
					indicatorDots: false, // 是否显示面板指示点
					indicatorColor: "rgba(0, 0, 0, 0.3)", // 指示点颜色
					indicatorActiveColor: variables.primary_color, // 当前选中的指示点颜色
					autoplay: true, // 是否自动切换
					interval: 5000, // 自动切换时间间隔
					duration: 500, // 滑动动画时长
					circular: true, // 是否采用衔接滑动，即播放到末尾后重新回到开头
				},
				current: 0 // 当前索引值
			}
		},
		methods: {
			/**
			 * @description 轮播图切换事件
			 */
			swiperChange(e) {
				let { current = 0, source } = e.detail;
				console.log(source, "swiper======")
				if(source === 'autoplay' || source === 'touch') {
				    //根据官方 source 来进行判断swiper的change事件是通过什么来触发的，autoplay是自动轮播。touch是用户手动滑动。其他的就是未知问题。抖动问题主要由于未知问题引起的，所以做了限制，只有在自动轮播和用户主动触发才去改变current值，达到规避了抖动bug
					this.current = current;
				}
			},
			
			/**
			 * @description 点击轮播图事件
			 * @param {Number} index 点击轮播图所在索引值 
			 */
			swiperItemClick(index) {
				this.$emit('on-item-click', {
					value: index
				});
			}
		}
	}
</script>

<style lang="scss">
.my_swiper_box {
	position: relative;
	z-index: 1;
}	

.my_swiper_item {
	image{
		width: 100%;
		height: 100%;
	}
}

/* 分页 */
.my_swiper_pagination {
	position: absolute;
	z-index: 11;
	left: 0;
	right: 0;
	bottom: 30rpx;
	
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
					background-color: $uni-color-primary;
				}
			}
			
			.round_item + .round_item {
				margin-left: 3rpx;
			}
		}
	}
	
	&.dot {
		.dot_list {
			display: flex;
			justify-content: center;
			align-items: center;
			
			.dot_item {
				width: 16rpx;
				height: 16rpx;
				background-color: rgba(0, 0, 0, 0.5);
				border-radius: 100%;
				
				&.active {
					background-color: $uni-color-primary;
				}
			}
			
			.dot_item + .dot_item {
				margin-left: 16rpx;
			}
		}
	}
}
</style>
