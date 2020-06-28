<template>
	<form @submit="submit"><slot></slot></form>
</template>

<script>
export default {
	props: {
		model: Object, // 数据模型
		rules: Object, // 校验对象
		labelWidth: Number
	},
	// 与FormItem组件共享数据
	provide() {
		return { FormInstance: this };
	},
	data() {
		return {
			// 校验集合
			fields: []
		};
	},
	methods: {
		/**
		 * @description 校验表单
		 * @param {Function} callback 回调
		 */
		validate(callback) {
			return new Promise(resolve => {
				let valid = true;
				let count = 0;
				let errorsArr = [];
				this.fields.forEach(field => {
					field.validate(errors => {
						// console.log(errors)
						if (errors) {
							valid = false;
							errorsArr.push(errors[0])
						}
					
						if (++count === this.fields.length) {
							// all finish
							resolve(valid);
							if (typeof callback === 'function') {
								if(!valid) {
									uni.showToast({
										icon: 'none',
										title: errorsArr[0].message
									})
								}
								callback(valid, errorsArr);
							}
						}
					});
				});
			});
		},

		/**
		 * @description 提交表单
		 */
		submit(e) {
			// this.$emit('on-submit', e);
		},
		/**
		 * @description 新增form-item的校验
		 * @param {Object} field
		 */
		addFormItem(field) {
			if (field) this.fields.push(field);
			return false;
		},
		removeFormItem(field) {
			if (field.prop) this.fields.splice(this.fields.indexOf(field), 1);
			return false;
		}
	}
};
</script>

<style lang="scss" scoped></style>
