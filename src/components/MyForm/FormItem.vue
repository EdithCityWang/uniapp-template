<template>
	<view class="my_form_item">
		<view class="my_form_item_label" :style="labelStyles">{{ label }}</view>
		<view class="my_form_item_content"><slot></slot></view>
		<view class="my_form_item_extra"><slot name="extra"></slot></view>
	</view>
</template>

<script>
import schema from 'async-validator';

function getPropByPath(obj, path) {
	let tempObj = obj;
	path = path.replace(/\[(\w+)\]/g, '.$1');
	path = path.replace(/^\./, '');
	let keyArr = path.split('.');
	let i = 0;
	for (let len = keyArr.length; i < len - 1; ++i) {
		let key = keyArr[i];
		if (key in tempObj) {
			tempObj = tempObj[key];
		} else {
			throw new Error('[iView warn]: please transfer a valid prop path to form item!');
		}
	}
	return {
		o: tempObj,
		k: keyArr[i],
		v: tempObj[keyArr[i]]
	};
}
	
export default {
	props: {
		label: String, // 标签文本
		labelWidth: Number, // 表单域标签的宽度
		prop: {
			type: String,
			default: ""
		}, // 对应表单域model里的字段
		rules: Array // 表单校验
	},
	// 获取Form组件共享数据
	inject: ['FormInstance'],
	computed: {
		// form item值
		fieldValue () {
			const model = this.FormInstance.model;
			if (!model || !this.prop) { return; }
			let path = this.prop;
			if (path.indexOf(':') !== -1) {
				path = path.replace(/:/, '.');
			}
			return getPropByPath(model, path).v;
		},
		// label样式
		labelStyles() {
			console.log(this.labelWidth, this.FormInstance.labelWidth)
			return `width: ${this.labelWidth || this.FormInstance.labelWidth}rpx`;
		}
	},
	data() {
		return {
			regxs: {
				'money': /^(([1-9]\d{0,5}|0)([.]\d{0,2})?)?$/,
				'weight': /^(([1-9]\d{0,5}|0)([.]\d{0,3})?)?$/,
				'mobile': /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/, // 手机号码，11位
				// 身份证号码 18 15位
				'idCard': /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/,
			}
		};
	},
	created() {
		// console.log(this.prop)
		if(this.prop) {
			this.FormInstance.addFormItem(this); // 新增formItem
		}
	},
	methods: {
		/**
		 * @description 获取rules
		 * @return {Array} 校验表单
		 */
		getRules() {
			let formRules = this.FormInstance.rules[this.prop] || [];
			let selfRules = this.rules || [];
			
			// 为了兼容微信小程序，将pattern
			let newRules = JSON.parse(JSON.stringify((selfRules.length > 0 ? selfRules : formRules)));
			
			newRules.forEach(item => {
				if(item.pattern) {
					item.pattern = this.regxs[item.pattern];
				}
			});

			return newRules;
		},
		/**
		 * @description 校验form item
		 * @param {Function} callback 回调函数
		 */
		validate(callback) {
			// 获取校验
			let descriptor = {};
			descriptor[this.prop] = this.getRules();
			// console.log(this.prop, descriptor[this.prop])
			if(!descriptor[this.prop]){
				return false
			}
			
			let validator = new schema(descriptor);
			
			// 获取校验数据
			let model = {};
			model[this.prop] = this.fieldValue;
	
			validator.validate(model, { firstFields: true }, (errors, fields) => {
				if (errors) {
					// return handleErrors(errors, fields);
				}
				callback(errors);
			});
		}
	},
	destroyed() {
		this.FormInstance.removeFormItem(this);
	}
};
</script>

<style lang="scss">
.my_form_item {
	position: relative;
	min-height: 114rpx;
	display: flex;
	align-items: flex-start;
	// z-index: 1;
	padding: 0 40rpx;

	.my_form_item_label {
		font-size: 30rpx;
		color: #333333;
		padding: 36rpx 0;
	}

	.my_form_item_content {
		padding: 36rpx 0;
		flex: 1;
	}

	.my_form_item_extra {
		// width: 40rpx;
		text-align: center;
		line-height: 42rpx;
		position: absolute;
		top: 50%;
		right: 40rpx;
		margin-top: -21rpx;
		z-index: 10;
	}
}

.my_form_item::after {
	content: '';
	position: absolute;
	left: 40rpx;
	right: 40rpx;
	top: 0;
	height: 2rpx;
	background-color: #f2f2f2;
	z-index: 10;
}
</style>
