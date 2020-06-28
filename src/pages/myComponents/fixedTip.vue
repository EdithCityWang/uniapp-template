<template>
	<view class="form_page">
		<my-fixed-tip></my-fixed-tip>
	</view>
</template>

<script>	
	import myFixedTip from "@/components/MyFixedTip/FixedTip"
	export default {
		components: {
			myFixedTip
		},
		data() {
			return {
				postdata: {
					"Pics":[], // 图片
				},
				// 表单校验
				rulesCustom: {
					Pics: [
						{ required: true, type: "array", length: 5, message: "请上传图片"}
					],
				},
			}
		},
		onLoad() {

		},
		onShow() {

		},
		methods: {

			/**
			 * @description 上传图片
			 * @param {Object} {
				 * files {Array} 图片地址集合
			 }
			 */
			uploadImgs({ files = [] }) {
				this.postdata.Pics = files;
			},
			
			/**
			 * @description 提交表单
			 */
			handleSubmit(name) {
				let _this = this;
				this.$refs[name].validate((valid, errorsArr) => {
					if(valid) {
						uni.showToast({
							icon: 'none',
							title: 'success'
						})
					}
				})
				
			}
		}
	}
</script>

<style lang="scss" scoped>

	
</style>
