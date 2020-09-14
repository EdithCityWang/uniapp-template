<template>
	<my-grids :content-data="list"></my-grids>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					{
						icon: 'iconcc-head',
						text: '空列表',
						path: '/pages/myComponents/emptyList'
					},
					{
						icon: 'iconcc-head',
						text: '时间选择器',
						path: '/pages/myComponents/timeSelector'
					},
					{
						icon: 'iconcc-head',
						text: '富文本解析器',
						path: '/pages/myComponents/htmlParse'
					},
					{
						icon: 'iconcc-head',
						text: '多图上传',
						path: '/pages/myComponents/uploadPics'
					},
					{
						icon: 'iconcc-head',
						text: '富文本解析器',
						path: '/pages/myComponents/htmlParse'
					},
					{
						icon: 'iconcc-head',
						text: '多图上传',
						path: '/pages/myComponents/uploadPics'
					}
				]
			};
		}
	}
</script>

<style lang="scss">

</style>
