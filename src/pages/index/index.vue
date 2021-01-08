<template>
	<view class="demo_index_page">
		<my-list>
			<my-list-item :is-thumb="false" url="/pages/myComponents/customNavigator">
				<view slot="content" class="list_item_content">
					<text>自定义导航</text>
					<uni-icons type="arrowright"></uni-icons>
				</view>
			</my-list-item>
			<my-list-item :is-thumb="false" url="/pages/myComponents/fixedTip">
				<view slot="content" class="list_item_content">
					<text>置顶提示</text>
					<uni-icons type="arrowright"></uni-icons>
				</view>
			</my-list-item>
			<my-list-item :is-thumb="false" url="/pages/myComponents/emptyList">
				<view slot="content" class="list_item_content">
					<text>空列表</text>
					<uni-icons type="arrowright"></uni-icons>
				</view>
			</my-list-item>
			<my-list-item :is-thumb="false" url="/pages/myComponents/list">
				<view slot="content" class="list_item_content">
					<text>列表</text>
					<uni-icons type="arrowright"></uni-icons>
				</view>
			</my-list-item>
			<my-list-item :is-thumb="false" url="/pages/myComponents/uploadPics">
				<view slot="content" class="list_item_content">
					<text>图片批量上传</text>
					<uni-icons type="arrowright"></uni-icons>
				</view>
			</my-list-item>
			<my-list-item :is-thumb="false" url="/pages/myComponents/timeSelector">
				<view slot="content" class="list_item_content">
					<text>时间选择器</text>
					<uni-icons type="arrowright"></uni-icons>
				</view>
			</my-list-item>
		</my-list>
		<my-list>
			<my-list-item :is-thumb="false" url="/pages/myComponents/formValidator">
				<view slot="content" class="list_item_content">
					<text>form表单校验</text>
					<uni-icons type="arrowright"></uni-icons>
				</view>
			</my-list-item>
			<my-list-item :is-thumb="false" url="/pages/myComponents/htmlParse">
				<view slot="content" class="list_item_content">
					<text>富文本解析器</text>
					<uni-icons type="arrowright"></uni-icons>
				</view>
			</my-list-item>
			<my-list-item :is-thumb="false" url="/pages/myComponents/grids">
				<view slot="content" class="list_item_content">
					<text>4*n宫格</text>
					<uni-icons type="arrowright"></uni-icons>
				</view>
			</my-list-item>
			<my-list-item :is-thumb="false" url="/pages/myComponents/tabs">
				<view slot="content" class="list_item_content">
					<text>tabs</text>
					<uni-icons type="arrowright"></uni-icons>
				</view>
			</my-list-item>
			<my-list-item :is-thumb="false" url="/pages/myComponents/swiperDemo">
				<view slot="content" class="list_item_content">
					<text>轮播图swiper</text>
					<uni-icons type="arrowright"></uni-icons>
				</view>
			</my-list-item>
		</my-list>
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

		}
	}
</script>

<style lang="scss">
	.demo_index_page {
		/deep/ .my_list_item {
			padding: 36rpx 40rpx;
			
			.list_item_content {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		}
	}
</style>
