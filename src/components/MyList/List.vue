<template>
	<view :class="'my_list ' + className">
		<slot />
	</view>
</template>

<script>
	export default {
		props: {
			className: String
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">

</style>
