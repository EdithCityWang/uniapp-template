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
	export default {
		data() {
			return {

			}
		},
		onLoad() {

		},
		onShow() {
			
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>

</style>
