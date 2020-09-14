<template>
	<view class="form_page">
		<my-form class="my_form" ref="postdata" :model="postdata" :rules="rulesCustom" :label-width="168">
			<my-form-section>
				<my-form-item label="昵称" prop="Nickname">
					<input type="text" v-model.trim="postdata.Nickname" placeholder="输入昵称" placeholder-class="input_placeholder" />
				</my-form-item>
			</my-form-section>
			<my-form-section>
				<my-form-item label="出生日期" prop="BirthDay">
					<my-picker-date v-model="postdata.BirthDay" mode="date" icon-name="iconrili" placeholder="选择日期"></my-picker-date>
				</my-form-item>
			</my-form-section>
			<my-form-section>
				<my-form-item label="性别" prop="Gender">
					<my-picker-selector v-model="postdata.Gender" :range="sexArr" range-key="Name" placeholder="选择性别"></my-picker-selector>
				</my-form-item>
				<my-form-item label="有无疾病">
					<radio-group class="radio-group" @change="radioChange">
						<label><radio size="40" value="1" :checked="postdata.IsSick" color="#27A698" />有</label>
						<label><radio size="40" value="0" :checked="!postdata.IsSick" color="#27A698" />无</label>
					</radio-group>
				</my-form-item>
				<my-form-item class="form_item_sick" prop="SicknessDescription" v-if="postdata.IsSick">
					<textarea maxlength="300" v-model.trim="postdata.SicknessDescription" class="form_item_textarea" value="" placeholder="输入病症" placeholder-class="input_placeholder" />
				</my-form-item>
			</my-form-section>
			<view class="form_item_btn">
				<button type="primary" size="large" form-type="submit" @click="handleSubmit('postdata')">提交信息</button>
			</view>
		</my-form>
	</view>
</template>

<script>
	import { 
		addDeer, 
		getDeerCates, 
		getDeerHouses, 
		getDeerSources,
		getTenantUsers
	} from "@/api/http"
	import utils from "@/tools/util"
	
	export default {
		data() {
			return {
				postdata: { 
					"Nickname":"", // 昵称
					"BirthDay":"", // 生日
					"Gender": "", // 性别
					"IsSick": false,  // 是否有疾病， 默认无false
					"SicknessDescription": "", // 疾病描述
				},
				// 表单校验
				rulesCustom: {
					Nickname: [
						{ required: true, message: "请输入昵称" }
					],
					BirthDay: [
						{ required: true, message: "请选择生日"}
					],
					Gender: [
						{ required: true, message: "请选择性别"}
					],
					SicknessDescription: [
						{ required: false, message: "请输入疾病描述"}
					],
				},
				// 性别列表
				sexArr: [
					{
						Id: 'male',
						Name: '男'
					},
					{
						Id: 'female',
						Name: '女'
					}
				],
			}
		},
		onLoad() {

		},
		onShow() {
			
		},
		methods: {
			/**
			 * @description 是否有疾病
			 */
			radioChange (e) {
				this.postdata.IsSick = Boolean(Number(e.detail.value));
			},

			/**
			 * @description 提交表单
			 * @param {String} name ref实例名称
			 */
			handleSubmit(name) {
				console.log(this.postdata);
				let _this = this;
				this.$refs[name].validate((valid, errorsArr) => {
					if(valid) {
						uni.showToast({
							icon: 'none',
							title: 'success'
						});
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.form_page {
	.form_item_btn {
		padding: 30rpx;
	}
}
</style>
