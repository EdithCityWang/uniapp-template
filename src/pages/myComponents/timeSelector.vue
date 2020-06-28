<template>
	<view class="form_page">
		<my-form class="my_form" :label-width="180">
			<my-form-section>
				<my-form-item label="出生日期" prop="BirthDay">
					<my-picker-date mode="date" format="yyyy-mm-dd" icon-name="iconrili" placeholder="选择日期"></my-picker-date>
				</my-form-item>
				<my-form-item label="出生时间">
					<my-picker-date mode="datetime" format="yyyy-mm-dd hh:ii:ss" icon-name="iconrili"  placeholder="选择时间"></my-picker-date>
				</my-form-item>
				<my-form-item label="时分">
					<my-picker-date mode="time" format="hh:ii" icon-name="icontime"  placeholder="选择时间"></my-picker-date>
				</my-form-item>
				<my-form-item label="日期范围">
					<my-picker-date mode="range" format="yyyy-mm-dd" icon-name="iconrili"  placeholder="选择时间"></my-picker-date>
				</my-form-item>
				<my-form-item label="时间范围">
					<my-picker-date mode="rangetime" format="yyyy-mm-dd hh:ii:ss" icon-name="iconrili"  placeholder="选择时间"></my-picker-date>
				</my-form-item>
			</my-form-section>
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
						Name: '公鹿'
					},
					{
						Id: 'female',
						Name: '母鹿'
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

</style>
