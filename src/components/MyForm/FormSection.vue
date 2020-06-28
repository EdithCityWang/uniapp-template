<template>
	<view class="my_form_section">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.my_form_section {
		background-color: #fff;
		box-shadow:0px 0px 12px rgba(0,0,0,0.08);
		margin-top: 20rpx;
	}
</style>
