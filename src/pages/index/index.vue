<template>
	<view>
		<my-form class="demo_index_page" :label-width="200">
			<my-form-section>
				<my-form-item label="自定义导航" @click.native="toPage('/pages/myComponents/customNavigator')">
					<view slot="extra" class="icon iconfont iconxuanze-right"></view>
				</my-form-item>
				<my-form-item label="置顶提示" @click.native="toPage('/pages/myComponents/fixedTip')">
					<view slot="extra" class="icon iconfont iconxuanze-right" ></view>
				</my-form-item>
				<my-form-item label="空列表" @click.native="toPage('/pages/myComponents/emptyList')">
					<view slot="extra" class="icon iconfont iconxuanze-right" ></view>
				</my-form-item>
				<my-form-item label="图片批量上传" @click.native="toPage('/pages/myComponents/uploadPics')">
					<view slot="extra" class="icon iconfont iconxuanze-right" ></view>
				</my-form-item>
				<my-form-item label="时间选择器" @click.native="toPage('/pages/myComponents/timeSelector')">
					<view slot="extra" class="icon iconfont iconxuanze-right" ></view>
				</my-form-item>
			</my-form-section>
			<my-form-section>
				<my-form-item label="form表单校验" @click.native="toPage('/pages/myComponents/formValidator')">
					<view slot="extra" class="icon iconfont iconxuanze-right" ></view>
				</my-form-item>
			</my-form-section>
			<my-form-section>
				<my-form-item label="富文本解析器" @click.native="toPage('/pages/myComponents/htmlParse')">
					<view slot="extra" class="icon iconfont iconxuanze-right" ></view>
				</my-form-item>
				<my-form-item label="4*n宫格" @click.native="toPage('/pages/myComponents/grids')">
					<view slot="extra" class="icon iconfont iconxuanze-right" ></view>
				</my-form-item>
				<my-form-item label="地址选择器" @click.native="toPage('/pages/myComponents/addressSelector')">
					<view slot="extra" class="icon iconfont iconxuanze-right" ></view>
				</my-form-item>
				<my-form-item label="tabs" @click.native="toPage('/pages/myComponents/tabs')">
					<view slot="extra" class="icon iconfont iconxuanze-right" ></view>
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
			/**
			 * @description 跳转页面
			 * @param {String} path 跳转路径 
			 */
			toPage (path) {
				console.log(path)
				uni.navigateTo({
					url: path
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.demo_index_page {
		.iconfont {
			font-size: 20rpx;
		}
	}
</style>
