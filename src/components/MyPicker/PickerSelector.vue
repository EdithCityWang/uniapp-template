<template>
	<view class="my_picker">
		<picker 
			@change="bindChange" 
			:mode="mode"
			:start="start"
			:end="end"
			:fields="fields"
			:value="selectedIndex"
			:range="range" 
			:range-key="rangeKey" 
			:disabled="(mode === 'selector' && range.length === 0) || disabled"
		>
			<view>
				<view class="my_picker_content">
					<text :style="{ color: selectedValue ? '#333333' : '#999999'}">{{ (mode === 'selector' && range.length === 0) ? '暂无数据' : (selectedValue || placeholder) }}</text>
				</view>
				<text :class="'icon iconfont ' + iconName"></text>
			</view>
		</picker>
	</view>
	
</template>

<script>
	export default {
		props: {
			value: [String, Number],
			// 选择器类型 selector,multiSelector,time, date, region
			mode: {
				type: String,
				default: 'selector'
			},
			// mode 为 selector 或 multiSelector 时，range 有效
			range: {
				type: Array,
				default: []
			},
			// 当 range 是一个 Object Array 时，通过 range-key 来指定 Object 中 key 的值作为选择器显示内容
			rangeKey: {
				type: String,
				default: ""
			},
			placeholder: {
				type: String,
				default: "请选择"
			},
			// selector(date, time)表示有效日期范围的开始，字符串格式为"YYYY-MM-DD"
			start: String, 
			// 表示有效日期范围的结束，字符串格式为"YYYY-MM-DD"
			end: String,
			// 有效值 year、month、day，表示选择器的粒度，默认为 day，App 端未配置此项时使用系统 UI
			fields: {
				type: String,
				default: 'day'
			},
			// 是否禁用
			disabled: {
				type: Boolean,
				default: false
			},
			iconName: {
				type: String,
				default: 'iconxuanze'
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
				selectedIndex: null, // 被选中的索引值
				selectedValue: "" // 被选中的值
			}
		},
		methods: {
			/**
			 * @description value 改变时触发 change 事件，event.detail = {valu
			 */
			bindChange (e) {
				let { value = 0 } = e.detail;
				
				console.log(value, '====')
				this.selectedIndex = value;
				
				if(this.mode === 'selector') {
					this.selectedValue = this.range[value][this.rangeKey];
					
					
					this.$emit('on-change', {
						index: value,
						item: this.range[value]
					});
					
					this.$emit('input', this.range[value].Id);
				} else if(this.mode === 'date' || this.mode === 'time') {
					this.selectedValue = value;
					
					this.$emit('on-change', {
						value: value
					});
					
					this.$emit('input', value);
				}
				
			}
		},
		watch: {
			value(newVal) {
				console.log(newVal, "================")
				if(this.mode === 'selector' || this.mode === 'multiSelector') {
					let index = this.range.findIndex(item => item.Id === newVal);
					if(index >= 0) {
						this.selectedValue = this.range[index][this.rangeKey];
						this.selectedIndex = index;
					}
				} else if(this.mode === 'date' || this.mode === 'time'){
					this.selectedValue = newVal || '';
				}
			}
		}
	}
</script>

<style lang="scss">
	.my_picker {
		position: relative;
		
		.iconfont {
			right: 0;
			position: absolute;
			color: $uni-text-color;
			z-index: 10;
			top: 50%;
			font-size: 32rpx;
			width: 42rpx;
			text-align: center;
			line-height: 42rpx;
			margin-top: -21rpx;
		}
		
		.iconxuanze {
			transform: scale(0.4);
			color: $uni-text-color-secondary;
		}
	}
	
	.my_picker_content {
		font-size: $uni-font-size-base;
		padding-right: 50rpx;
	}
</style>
