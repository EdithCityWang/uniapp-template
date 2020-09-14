<template>
	<u-parse :content="content"></u-parse>
</template>

<script>
	import uParse from '@/components/feng-parse/parse.vue';
	
	export default {
		components: {
			uParse
		},
		data() {
			return {
				content: '<p><em>abc123</em></p>'
			};
		}
	}
</script>

<style lang="scss">

</style>
