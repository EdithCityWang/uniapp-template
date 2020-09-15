<template>
	<my-tabs v-model="postdata.selectedId" :options="tabsOptions" :ranges="cates" label="Name" label-value="Id" @on-change="handleChange"></my-tabs>
</template>

<script>
	export default {
		data() {
			return {
				postdata: {
					Id: 10
				},
				// tabs基本配置
				tabsOptions: {
					color: '#26A69A',
					activeColor: '#26A69A'
				},
				cates: [
					{
						Name: '芒果',
						Id: 1
					},
					{
						Name: '香蕉',
						Id: 2
					},
					{
						Name: '苹果',
						Id: 3
					},
					{
						Name: '葡萄',
						Id: 4
					},
					{
						Name: '木糖醇',
						Id: 5
					},
					{
						Name: '面巾纸',
						Id: 6
					},
					{
						Name: '咖啡',
						Id: 7
					},
					{
						Name: '保温杯',
						Id: 8
					},
					{
						Name: '手机',
						Id: 9
					},
					{
						Name: '口香糖',
						Id: 10
					}
				]
			};
		},
		methods: {
			/**
			 * @description choose tab item
			 */
			handleChange(e) {
				console.log(e)
			}
		}
	}
</script>

<style lang="scss">

</style>
