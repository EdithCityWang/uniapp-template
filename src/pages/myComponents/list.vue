<template>
	<view>
<!-- 		title: String, // 列表标题
		content: String, // 列表详情
		thumb: String, // 列表缩略图
		// 列表缩略图位置：left左；right右
		thumbPosition: { 
			type: String,
			default: 'left'
		},
		// 略缩图尺寸，可选值，lg:大图; medium:一般; sm:小图;
		thumbSize: {
			type: Object,
			default: () => {
				return {
					width: variables.img_size_base,
					height: variables.img_size_base
				}
			}
		},
		url: String, // 跳转路径 -->
		<my-list>
			<my-list-item 
				title="正常列表项" 
				content="正常列表项内容正常列表项内容" 
				thumb="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607330955621&di=7e7d228ceae91f5ae342ce204bbd1a1d&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F30%2F29%2F01300000201438121627296084016.jpg"
			>
			</my-list-item>
			<my-list-item
				title="图片靠右列表项" 
				content="图片靠右列表项内容" 
				thumbPosition="right"
				thumb="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607330955621&di=7e7d228ceae91f5ae342ce204bbd1a1d&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F30%2F29%2F01300000201438121627296084016.jpg"
			>
			</my-list-item>
			<my-list-item
				title="自定义图片大小列表项" 
				content="自定义图片大小列表项内容" 
				:thumbSize="{ width: 200, height: 150 }"
				thumb="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607330955621&di=7e7d228ceae91f5ae342ce204bbd1a1d&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F30%2F29%2F01300000201438121627296084016.jpg"
			>
			</my-list-item>
			<my-list-item
				url="/pages/myComponents/emptyList"
				title="空列表" 
				content="跳转页面跳转页面跳转页面跳转页面" 
				:thumbSize="{ width: 200, height: 150 }"
				thumb="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607330955621&di=7e7d228ceae91f5ae342ce204bbd1a1d&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F30%2F29%2F01300000201438121627296084016.jpg"
			>
			</my-list-item>
			<my-list-item
				:thumbSize="{ width: 200, height: 150 }"
				thumb="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607330955621&di=7e7d228ceae91f5ae342ce204bbd1a1d&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F30%2F29%2F01300000201438121627296084016.jpg"
			>
				<view slot="content">
					<view>自定义列表内容</view>
					<text style="color: red;">自定义列表内容自定义列表内容</text>
				</view>
			</my-list-item>
		</my-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">

</style>
