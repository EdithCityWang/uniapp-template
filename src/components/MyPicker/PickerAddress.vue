<template>
	<view class="my_picker">
		<picker mode="region" :value="selectedValue" @change="bindChange">
			<view class="'my_picker_content">
				<text v-if="selectedValue.length === 0" class="input_placeholder">{{ placeholder }}</text>
				<text v-else>{{ selectedValue.join('') }}</text>
			</view>
			<text class="icon iconfont iconxiala"></text>
		</picker>
	</view>
	
</template>

<script>
	// import _cityData from './city-data/CodeCity.json';
	
	export default {
		props: {
			// 默认值
			value: {
				type: Array,
				default: []
			},
			// 选择器类型 selector,multiSelector,time, date, region
			mode: {
				type: String,
				default: 'region'
			},
			placeholder: {
				type: String,
				default: "请选择"
			}
		},
		// #ifdef H5
		// model: {
		// 	prop: 'selectedId',
		// 	event: 'on-change-value'
		// },
		// #endif
		data() {
			return {
				// cityData: _cityData,
				selectedValue: [] // 被选中的值
			}
		},
		methods: {
			/**
			 * @description value 改变时触发 change 事件，event.detail = {valu
			 */
			bindChange (e) {
				this.selectedValue = e.detail.value;
				
				this.$emit('on-change', e.detail);
				this.$emit('input', this.selectedValue);
			}
		},
		watch: {
			value(newVal) {
				this.selectedValue = newVal || []
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my_picker {
		position: relative;
		
		.my_picker_content {
			font-size: $uni-font-size-base;
			padding-right: 50rpx;
			color: $uni-text-color;
		}
		
		.iconfont {
			right: 0;
			position: absolute;
			color: $uni-text-color;
			z-index: 10;
			top: 50%;
			font-size: 32rpx;
			width: 42rpx;
			height: 42rpx;
			text-align: center;
			line-height: 42rpx;
			margin-top: -21rpx;
		}
		
		.iconxuanze {
			transform: scale(0.4);
			color: $uni-text-color-secondary;
		}
	}
</style>
