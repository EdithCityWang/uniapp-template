<template>
	<view class="upload_box">
		<view class="image_list">
			<view class="image_item" v-for="(item, index) in files" :key="index">
				<view class="icon iconfont iconshanchu" @click="removeItem(index)"></view>
				<image :src="item"></image>
			</view>
			<view class="upload" v-if="files.length < limit" @click="handleUpload">
				<view class="icon iconfont iconshangchuan"></view>
				<text>{{ btnText }}</text>
			</view>
		</view>
		<view class="upload_tip" v-if="tip">{{ tip }}</view>
	</view>
</template>

<script>
import { uploadToOss } from '@/api/http';

export default {
	props: {
		// 提示信息
		tip: {
			type: String,
			default: ''
		},
		// 按钮文字
		btnText: {
			type: String,
			default: ''
		},
		// 最多限制张数
		limit: {
			type: Number,
			default: 1
		},
		// 图片类型，用于同个页面多个图片上传组件区分
		imgType: {
			type: String,
			default: 'image'
		}
	},
	model: {
		type: Array,
		event: 'on-change-value'
	},
	data() {
		return {
			files: [],
			file: ''
		};
	},
	methods: {
		/**
		 * @description 删除图片
		 * @param {Number} index 图片所在索引值
		 */
		removeItem(index) {
			console.log(index);
			this.files.splice(index, 1);

			this.sendMessage(); // 发送信息父组件
		},
		
		uploadImg(url) {
			return new Promise((resolve, reject) => {
				uploadToOss({
					filePath: url,
					fileType: 'image',
					name: 'file',
				}).then(res => {
					if(res._OK) {
						resolve(res.data.data);
					} else {
						uni.showModal({
							title: '提示',
							content: res.data.message || '上传失败'
						})
						
						return new Promise.reject(res);
					}
				}).catch(err => {
					return new Promise.reject(err);
				})
			})
		},
		
		/**
		 * @description 上传图片
		 */
		async uploads(tempFilePaths) {
			let arr = [];
			for(let i = 0; i < tempFilePaths.length; i++) {
				arr[i] = await this.uploadImg(tempFilePaths[i]);
			}
			
			return arr;
		},
		
		/**
		 * @description 上传图片
		 */
		handleUpload() {
			let _this = this;
			
			uni.chooseImage({
				count: _this.limit,
				async success(chooseImageRes) {
					let files = await _this.uploads(chooseImageRes.tempFilePaths);
					_this.files = [..._this.files, ...files];
					console.log(files, "====")
					_this.sendMessage();
					
				}
			});
		},
		/**
		 * @description 发送信息给父组件
		 */
		sendMessage() {
			this.$emit('on-change', {
				files: this.files,
				imgType: this.imgType
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.upload_box {
	.upload {
		width: 120rpx;
		height: 120rpx;
		border: 2rpx solid #d9d9d9;
		font-size: 24rpx;
		color: #999999;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		margin-bottom: 20rpx;

		.iconfont {
			margin-bottom: 8rpx;
		}
	}

	.image_list {
		display: flex;
		flex-wrap: wrap;

		.image_item {
			position: relative;
			width: 120rpx;
			height: 120rpx;
			margin: 0 20rpx 20rpx 0;
			z-index: 1;

			image {
				width: 120rpx;
				height: 120rpx;
			}

			.iconfont {
				color: #ff0000;
				font-size: 30rpx;
				position: absolute;
				z-index: 10;
				right: 0;
				top: 0;
			}
		}
	}
}

.upload_tip {
	color: #999999;
	font-size: 24rpx;
	margin-top: -10rpx;
}
</style>
