<template>
	<view :class="'my_list_empty ' + className">
		<image :src="emptyImage" mode="widthFix"></image>
		<text>{{ tipText }}</text>
		<button v-if="showButton" type="primary" size="medium" shape="circle" plain>去逛逛</button>
	</view>
</template>

<script>
	export default {
		props: {
			emptyImage: {
				type: [String, Object],
				default: require('@/static/images/img_empty.png')
			}, // 空列表图片
			className: String, // 组件class名称，用于自定义样式
			tipText: {
				type: String,
				default: '暂无记录'
			},
			// 是否展示按钮
			showButton: {
				type: Boolean,
				default: false
			},
			// 按钮名称
			buttonText: {
				type: String,
				default: '去逛逛'
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.my_list_empty {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	
	image {
		width: $my-list-empty-image-width;
	}
	
	text {
		font-size: $my-list-empty-font-size;
		color: $my-list-empty-color;
		margin-top: 46rpx;
	}
	
	button {
		margin-top: 60rpx;
	}
}
</style>
