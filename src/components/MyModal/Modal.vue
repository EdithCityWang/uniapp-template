<template>
	<view class="my_modal" v-if="show">
		<view class="my_modal_wrapper">
			<view class="my_modal_header">
				<slot name="header">
					<text>{{ title }}</text>
				</slot>
			</view>
			<view class="my_modal_content">
				<slot name="content">
					<text>{{ message }}</text>
				</slot>
			</view>
			<view class="my_modal_footer">
				<slot name="footer">
					<view class="btn_group">
						<button class="btn_cancel" type="default" @click="cancel">取消</button>
						<button class="btn_confirm" type="default" @click="confirm">确认</button>
					</view>
				</slot>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			// 标题
			title: {
				type: String,
				default: ''
			},
			// 消息
			message: {
				type: String,
				default: ''
			},
			// 弹窗高度，单位rpx
			height: {
				type: Number,
				default: 378
			},
			// 在关闭之前是否拦截，默认不拦截
			beforeClose: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				show: false // 是否显示弹窗，默认隐藏
			};
		},
		methods: {
			/**
			 * @description 关闭弹层
			 */
			close() {
				this.show = false;
			},
			
			/**
			 * @description 显示弹层
			 */
			open() {
				this.show = true;
			},
			
			/**
			 * @description 点击取消按钮
			 */
			cancel() {
				this.$emit('on-cancel', this.close, {
					confirm: false
				})
				
				if(!this.beforeClose) {
					this.close();
				}
			},
			
			/**
			 * @description 点击确认按钮
			 */
			confirm() {
				this.$emit('on-confirm', this.close, {
					confirm: true
				})
				
				if(!this.beforeClose) {
					this.close();
				}
			}
		}
	}
</script>

<style lang="scss">
.my_modal {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 100;
	background-color: $uni-bg-color-mask;
	display: flex;
	justify-content: center;
	align-items: center;
}

.my_modal_wrapper {
	background-color: $uni-bg-color;
	border-radius: $my-modal-border-radius;
	width: 622rpx;
}

.my_modal_header {
	padding: 46rpx 48rpx 0;
	color: $uni-text-color;
	text-align: center;
	font-size: 30rpx;
	font-weight: bold;
}

.my_modal_content {
	padding: 24rpx 48rpx 36rpx;
	text-align: center;
}

.my_modal_footer {
	border-top: 2rpx solid $my-modal-button-border-color;
	
	.btn_group {
		display: flex;
		justify-content: center;
		align-items: center;
		
		button {
			flex: 1;
			background-color: $uni-bg-color;
			font-size: 30rpx;
			line-height: 96rpx;
			border-radius: 0;
			
			&:after {
				border-radius: 0;
				border: none;
			}
			
			&.btn_cancel {
				color: $uni-text-color;
				border-right: 2rpx solid $my-modal-button-border-color;
				border-bottom-left-radius: $my-modal-border-radius;
			}
			
			&.btn_confirm {
				color: $uni-text-color-link;
				border-bottom-right-radius: $my-modal-border-radius;
			}
		}
	}
}
</style>
