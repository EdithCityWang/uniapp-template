<template>
	<view class="my_picker">
		<picker @change="bindChange" :mode="mode" :value="selectedIndex" :range="range" :range-key="rangeKey" :disabled="range.length === 0">
			<view class="my_picker_content">
				<text :style="{ color: selectedValue ? '#333333' : '#999999'}">{{ range.length === 0 ? '暂无数据' : (selectedValue || placeholder) }}</text>
			</view>
			<text class="icon iconfont iconxuanze"></text>
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
				
				this.selectedValue = this.range[value][this.rangeKey];
				this.selectedIndex = value;
				
				this.$emit('on-change', {
					index: value,
					item: this.range[value]
				});

				this.$emit('input', this.range[value].Id);
			}
		},
		watch: {
			value(newVal) {
				let index = this.range.findIndex(item => item.Id === newVal);
				if(index >= 0) {
					this.selectedValue = this.range[index][this.rangeKey];
					this.selectedIndex = index;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my_picker {
		position: relative;
		
		.my_picker_content {
			font-size: 30rpx;
			padding-right: 50rpx;
		}
		
		.iconfont {
			right: 0;
			position: absolute;
			color: #2E3344;
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
			color: #999999;
		}
	}
</style>
