<template>
	<navigator
		:url="url"
		hover-class="none"
		:class="'my_list_item ' + className"
	>
		<image 
			v-if="isThumb"
			class="my_list_item_thumb" 
			:src="thumb"
			mode="scaleToFill"
			:style="imgStyle"
		></image>
		<view 
			class="my_list_item_content"
			:style="contentStyle"
		>
			<slot name="content">
				<view class="my_list_item_title">{{ title }}</view>
				<view class="my_list_item_desc">{{ content }}</view>
			</slot>
		</view>
	</navigator>
</template>
<script>	
	import variables from '@/static/styles/variables.scss.js'
	
	export default {
		props: {
			className: String,
			title: String, // 列表标题
			content: String, // 列表详情
			// 是否有缩略图，默认true
			isThumb: {
				type: Boolean,
				default: true
			},
			thumb: String, // 列表缩略图
			// 列表缩略图位置：left左；right右
			thumbPosition: { 
				type: String,
				default: 'left'
			},
			// 略缩图尺寸，可选值，lg:大图; medium:一般; sm:小图;
			thumbSize: {
				type: Object,
				default: () => {
					return {
						width: variables.img_size_base,
						height: variables.img_size_base
					}
				}
			},
			url: String, // 跳转路径
		},
		computed: {
			imgStyle() {
				return {
					width: this.thumbSize.width + 'rpx',
					height: this.thumbSize.height + 'rpx',
					left: this.thumbPosition === 'left' ? (20 + 'rpx') : 'auto',
					right: this.thumbPosition === 'right' ? (20 + 'rpx') : 'auto'
				}
			},
			contentStyle() {
				let contentStyle = {
					minHeight: 'auto',
					paddingLeft: 0,
					paddingRight: 0
				};
				
				if(this.isThumb) {
					contentStyle = {
						...contentStyle,
						minHeight: this.thumbSize.height + 'rpx',
						paddingLeft: this.thumbPosition === 'left' ? (thumbSize.width + 20 + 'rpx') : 0,
						paddingRight: this.thumbPosition === 'right' ? (thumbSize.width + 20 + 'rpx') : 0
					}
				}
				
				return contentStyle;
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			/**
			 * @description 跳转页面
			 * @param {String} path 跳转路径
			 */
			toPage(path) {
				uni.navigateTo({
					url: path
				});
			}
		}
	}
</script>

<style lang="scss">
.my_list_item {
	position: relative;
	padding: 20rpx;
	background-color: $uni-bg-color;
}
.my_list_item::after {
	content: '';
	position: absolute;
	height: 2rpx;
	left: 20rpx;
	right: 20rpx;
	bottom: 0;
	background-color: #F1F1F1;
}
.my_list_item_thumb {
	position: absolute;
	top: 20rpx;
	border-radius: $uni-border-radius-base;
}
.my_list_item_title {
	font-size: 28rpx;
	text-overflow: ellipsis;
	overflow: hidden;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	line-clamp: 2;
	-webkit-box-orient: vertical;
	margin-bottom: 10rpx;
}

.my_list_item_desc {
	color: #C7C7C7;
	font-size: 24rpx;
}
</style>
