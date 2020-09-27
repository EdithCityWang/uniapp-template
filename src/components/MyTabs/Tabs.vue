<template>
	<scroll-view class="tabs" :scroll-x="true" :scroll-into-view="currentViewId" :scroll-with-animation="true">
		<view 
			v-for="(item, index) in ranges" 
			:key="item[labelValue]"
			:id="'tab_item_' + item[labelValue]" 
			:class="'tab_item' + ((index === current) ? ' active' : '')" 
			:style="{
				color: (index === current) ? defaultOptions.activeColor : defaultOptions.color,
				backgroundColor: (index === current) ? defaultOptions.activeBgColor: defaultOptions.bgColor
			}"
			@click="handleClick(item, index)"
		>
			<text>{{ item[label] }}</text>
			<view 
				v-if="index === current" 
				class="tab_item_active_line"
				:style="{
					backgroundColor: defaultOptions.activeColor
				}"
			></view>
		</view>
	</scroll-view>
</template>

<script>
	import variables from '@/static/styles/variables.scss.js'
	export default {
		props: {
			value: Number || String,
			ranges: Array, // 列表
			label: String, // 名称
			labelValue: String, // 获得的属性值
			options: Object, // 基本配置
		},
		data() {
			return {
				current: 0 // 当前索引值，默认0
			};
		},
		computed: {
			currentViewId() {
				return `tab_item_${this.value}`
			},
			defaultOptions() {
				return {
					...{
						color: variables.text_color_regular, // 字色
						bgColor: variables.bg_color,	// 背景色
						activeColor: variables.primary_color,	// 激活状态字色
						activeBgColor: variables.bg_color	// 激活状态背景色
					},
					...this.options
				}
			}
		},
		methods: {
			/**
			 * @description 点击
			 * @param {Object} item 对象
			 * @param {Number} index 所在索引值  
			 */
			handleClick(item, index) {
				if(this.current === index) {
					return false;
				}
				
				this.current = index;
				this.$emit('on-change', {
					item: item,
					index: index,
					value: item[this.labelValue]
				});
				this.$emit('input', item[this.labelValue]);
			}
		}
	}
</script>

<style lang="scss" scoped>
.tabs {
	white-space: nowrap;
	// padding: 0 30rpx;
	// background-color: #FFFFFF;
	
	.tab_item {
		display: inline-block;
		line-height: 90rpx;
		font-size: 30rpx;
		color: $uni-text-color-regular;
		padding: 0 39rpx;
		
		&.active {
			position: relative;
			color: $uni-color-primary;
			font-weight: bold;
			
			.tab_item_active_line {
				position: absolute;
				content: '';
				width: 40rpx;
				height: 6rpx;
				background-color: $uni-color-primary;
				bottom: 0;
				left: 50%;
				margin-left: -20rpx;
			}
		}
	}
}
</style>
