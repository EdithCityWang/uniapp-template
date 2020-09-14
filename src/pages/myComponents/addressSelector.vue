<template>
	<my-form>
		<my-form-section>
			<my-form-item label="选择地址" :label-width="168">
				<picker-address></picker-address>
			</my-form-item>
		</my-form-section>
	</my-form>
</template>

<script>
	import pickerAddress from '@/components/MyPicker/PickerAddress'
	
	export default {
		components: {
			pickerAddress
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">

</style>
