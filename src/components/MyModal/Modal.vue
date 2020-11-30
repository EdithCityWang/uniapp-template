<template>
	<view :class="'my_modal ' + className" v-if="show">
		<view class="my_modal_mask" @click="handleMaskClose"></view>
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
			<view class="my_modal_footer" v-if="showFooter">
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
			className: String, // 自定义样式
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
			},
			// 是否显示footer
			showFooter: {
				type: Boolean,
				default: true
			},
			// 是否允许点击遮罩层关闭
			maskClosable: {
				type: Boolean,
				default: true
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
			 * @description 点击遮罩层关闭
			 */
			handleMaskClose() {
				if(!this.maskClosable) {
					return false;
				}
				this.close()
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
// @keyframes myfirst{
// 	0% {opacity: 0; margin-top: 700rpx;}/*初始状态 透明度为0*/  
// 	40% {opacity: 0.5; margin-top: 300rpx;}/*过渡状态 透明度为0*/  
// 	100% {opacity: 1; margin-top: 0;}/*结束状态 透明度为1*/  
// 	from {margin-top: 700rpx;}
// 	to {margin-top: 0;}
// }
.my_modal {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 99;
	display: flex;
	justify-content: center;
	align-items: center;
}

.my_modal_mask {
	position: absolute;
	background-color: $uni-bg-color-mask;
	z-index: 100;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
}

.my_modal_wrapper {
	position: relative;
	background-color: $uni-bg-color;
	border-radius: $my-modal-border-radius;
	width: 622rpx;
	z-index: 101;
	// animation: myfirst 0.6s;
	// animation-timing-function: ease;
}

.my_modal_header {
	padding: 46rpx 48rpx 0;
	color: $uni-text-color;
	text-align: center;
	font-size: $uni-font-size-lg;
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
			font-size: $uni-font-size-lg;
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
