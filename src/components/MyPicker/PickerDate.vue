<template>
	<view :class="'my_picker ' + className">
		<view class="my_picker_content" @click="showPickerFn">
			<text :style="{ color: selectedValue ? '#333333' : '#999999'}">{{ selectedValue || placeholder }}</text>
			<text :class="'icon iconfont ' + iconName"></text>
		</view>
		<mx-date-picker 
			:show="showPicker" 
			:value="selectedValue" 
			:type="mode" 
			:format="format"
			:color="color"
			:showSeconds="showSeconds"
			:showHoliday="showHoliday"
			:showTips="showTips"
			:beginText="beginText"
			:endText="endText"
			@confirm="onSelected" 
			@cancel="onCancel"
		/>
	</view>
</template>

<script>
	import MxDatePicker from "@/components/MyPicker/mx-datepicker/mx-datepicker.vue";
	export default {
		components: {
			MxDatePicker
		},
		props: {
			value: [String, Array],
			// 选择器类型 selector,multiSelector,time, date, region
			// date（日期）、time（时间）、datetime（日期时间）、range（日期范围）、rangetime（日期时间范围）
			mode: {
				type: String,
				default: 'date'
			},
			className: String, // 自定义样式
			placeholder: {
				type: String,
				default: "请选择"
			},
			iconName: {
				type: String,
				default: 'iconrili'
			},
			// 日期格式化 默认yyyy-mm-dd hh:ii:ss
			format: {
				type: String,
				default: ""
			},
			// 分隔符,range/rangetime有效
			separator: {
				type: String,
				default: "-"
			},
			//颜色
			color: {
				type: String,
				default: '#409eff'
			},
			
			//显示公历节日
			showHoliday: {
				type: Boolean,
				default: true
			},
			//显示提示
			showTips: {
				type: Boolean,
				default: false
			},
			//开始文案 针对type为范围选择时生效
			beginText: {
				type: String,
				default: '开始'
			},
			//结束文案 针对type为范围选择时生效
			endText: {
				type: String,
				default: '结束'
			}
		},
		// model: {
		// 	prop: 'selectedValue',
		// 	event: 'on-change'
		// },
		computed: {
			//是否显示秒 针对type为datetime或time时生效
			showSeconds() {
				return this.format.indexOf("ss") != -1;
			}
		},
		data() {
			return {
				showPicker: false,
				selectedValue: "" // 被选中的值
			}
		},
		methods: {
			/**
			 * @description 点击按钮显示日期选择控制器
			 */
			showPickerFn() {
				this.showPicker = true
			},
			
			/**
			 * @description 选择日期comfirm
			 */
			onSelected(e) {
				this.selectedValue = Array.isArray(e.value) ?  e.value.join(this.separator) : e.value;
				this.showPicker = false; // 隐藏
				console.log(e.value)
				this.$emit('on-change', e.value);
				this.$emit("input", e.value);
			},
			
			/**
			 * @description 取消
			 */
			onCancel() {
				this.showPicker = false; // 隐藏
			}
		},
		watch: {
			value(newVal) {
				this.selectedValue = Array.isArray(newVal) ?  e.value.join(newVal) : newVal;
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
