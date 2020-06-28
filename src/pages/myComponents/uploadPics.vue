<template>
	<view class="form_page">
		<my-form class="my_form" ref="postdata" :model="postdata" :rules="rulesCustom" :label-width="168">
			<my-form-section>
				<my-form-item label="图片" prop="Pics">
					<my-upload-pic btn-text="上传图片" :limit="5" tip="最多上传5张" @on-change="uploadImgs"></my-upload-pic>
				</my-form-item>
			</my-form-section>
			<view class="form_item_btn">
				<button type="primary" class="btn_primary" form-type="submit" @click="handleSubmit('postdata')">提交信息</button>
			</view>
		</my-form>
	</view>
</template>

<script>	
	export default {
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
