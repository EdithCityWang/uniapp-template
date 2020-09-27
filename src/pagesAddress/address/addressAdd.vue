<template>
	<my-form class="address_add_page" :model="postdata" ref="postdata" :rules="rulesCustom" :label-width="155">
		<view class="address_add_form">
			<view class="address_add_form_top">
				<my-form-item label="收货人" prop="nickName">
					<input type="text" :disable-default-padding="true" v-model.trim="postdata.nickName" placeholder="请填写收货人地址" placeholder-class="input_placeholder" />
				</my-form-item>
				<my-form-item label="手机号码" prop="mobile">
					<input v-model.trim="postdata.mobile" :disable-default-padding="true" type="number" maxlength="11" placeholder="请填写收货人手机号" placeholder-class="input_placeholder" />
				</my-form-item>
				<my-form-item label="所在地区" prop="area">
					<my-picker-address v-model="postdata.area" placeholder="省 市 区" @on-change="areaChange"></my-picker-address>
				</my-form-item>
				<my-form-item label="详细地址" prop="addr" class="form_item_textarea">
					<textarea v-model.trim="postdata.addr" :disable-default-padding="true" maxlength="50" placeholder-class="input_placeholder" placeholder="街道、楼牌号等" />
				</my-form-item>
			</view>
			<view class="address_add_form_bottom">
				<my-form-item class="form_item_switch" label="设为默认地址" :label-width="400">
					<view class="default_box" slot="label">
						<view>设置默认地址</view>
						<text>提醒：每次下单会默认推荐使用该地址</text>
					</view>
					<!-- #e6bc7a -->
					<switch :color="primary_color" :checked="postdata.isDefault" @change="switchChange" />
				</my-form-item>
				<view style="height: 208rpx;"></view>
				
				<button v-if="pageType === 'add'" class="btn_footer" type="primary" size="large" data-shape="circle" @click="handleSubmit('postdata')">保存</button>
				<view v-else class="address_add_page_footer">
					<button type="primary" size="large" data-shape="circle" plain @click="remove">删除</button>
					<button type="primary" size="large" data-shape="circle" @click="handleSubmit('postdata')">保存</button>
				</view>
			</view>
		</view>
	</my-form>
</template>

<script>
	import {
		addAddress,
		editAddress,
		getAddressList,
		deleteAddress
	} from '@/api/base.js';
	import tWeixin from '@/tools/weixin.js';
	import { primary_color } from '@/static/styles/variables.scss.js';
	
	export default {
		data() {
			return {
				primary_color: primary_color,
				pages: [
					{
						type: 'add',
						title: '添加地址'
					},
					{
						type: 'edit',
						title: '编辑地址'
					},
					{
						type: 'choose',
						title: '选择地址'
					}
				],
				pageType: 'add', // 页面类型：add添加；edit编辑
				postdata: {
					nickName: '', // 联系人姓名
					mobile: '', // 手机号码
					area: [], // 地区
					addr: '', // 详细地址
					isDefault: false, // 是否默认 1为默认 0为非默认
					code: '', // 省code
					cityCode: '', // 市code
					areaCode: '' // 区code
				},
				rulesCustom: {
					nickName: [
						{ required: true, message: '请填写收货人地址' }
					],
					mobile: [
						{ required: true, message: '请填写收货人手机号' },
						{ pattern: 'mobile', message: '手机号格式不正确' }
					],
					area: [
						{ required: true, type: 'array', message: '请选择地区' }
					],
					addr: [
						{ required: true, message: '请填写详细地址' }
					]
				}
			}
		},
		onLoad(options) {
			let { type = 'add', id = '' } = options;
			this.pageType = type;
			
			uni.setNavigationBarTitle({
				title: this.pages.find(item => item.type === type).title
			})
			
			if(type === 'edit' && id) {
				getAddressList({
					Id: Number(id)
				}).then(res => {
					if(res._OK && res.data.data.length > 0) {
						this.postdata = {
							...this.postdata,
							...res.data.data[0],
							area: res.data.data[0].area.split(' ')
						}
					}
				})
			}
		},
		methods: {
			/**
			 * @description 选择地区
			 */
			areaChange(e) {
				this.postdata.code = e.code[0];
				this.postdata.cityCode = e.code[1];
				this.postdata.areaCode = e.code[2];
			},
			/**
			 * @description swtch按钮
			 */
			switchChange(e) {
				this.postdata.isDefault = e.target.value;
			},
			
			/**
			 * @description 提交表单
			 */
			handleSubmit(name) {
				this.$refs[name].validate(valid => {
					console.log(valid)
					if(valid) {
						let postdata = JSON.parse(JSON.stringify(this.postdata));
						postdata.isDefault = Number(postdata.isDefault);
						postdata.area = postdata.area.join(' ');
						if(this.pageType === 'add') {
							addAddress(postdata).then(res => {
								if(res._OK) {
									uni.showToast({
										icon: 'success',
										title: res.data.message || '添加成功'
									})
									uni.navigateBack({
										delta: 1
									})
								} else {
									uni.showToast({
										icon: 'none',
										title: res.data.message || '添加失败'
									})
								}
							})
						} else {
							editAddress(postdata).then(res => {
								if(res._OK) {
									uni.showToast({
										icon: 'success',
										title: res.data.message || '修改成功'
									})
									uni.navigateBack({
										delta: 1
									})
								} else {
									uni.showToast({
										icon: 'none',
										title: res.data.message || '修改失败'
									})
								}
							})
						}
					}
				})
			},
			
			/**
			 * @description 删除地址
			 */
			remove() {
				let _this = this;
				tWeixin.showModal({
					title: '提示',
					content: '确定删除？',
					success(res) {
						if(res.confirm) {
							deleteAddress({
								addrId: _this.postdata.Id
							}).then(res => {
								if(res._OK) {
									uni.showToast({
										icon: 'success',
										title: res.data.message || '删除成功'
									})
									uni.navigateBack({
										delta: 1
									})
								} else {
									uni.showToast({
										icon: 'none',
										title: res.data.message || '删除失败'
									})
								}
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
@import '@/pagesAddress/static/styles/addressCommon.scss';

.address_add_page_footer {
	position: fixed;
	display: flex;
	justify-content: space-between;
	bottom: 64rpx;
	left: 50rpx;
	right: 50rpx;
	
	button {
		flex: 1;
		
		&[type=primary] {
			color: $uni-text-color;
		}
	}
	
	button + button {
		margin-left: 50rpx;
	}
}
.address_add_form {
	min-height: 100vh;
	border-top: 2rpx solid #EAEAEA;
	display: flex;
	flex-direction: column;
	
	/* #ifdef H5 */
	min-height: calc(100vh - #{$nav-height});
	/* #endif */
	
	.address_add_form_top {
		background-color: $uni-color-white;
	}
	
	.first_child {
		.my_form_item::after {
			content: none;
		}
	}
	
	.address_add_form_bottom {
		margin-top: 20rpx;
		flex: 1;
		background-color: $uni-color-white;
	}
	
	.form_item_textarea {
		textarea {
			width: initial;
			height: 100rpx;
			line-height: 1.33;
		}
		
		/* #ifdef MP-WEIXIN */
		/deep/ .my_form_item {
			align-items: flex-start !important;
			
			&::after {
				content: none;
			}
			
			.my_form_item_label,
			.my_form_item_content {
				padding: 30rpx 0;
				line-height: 1.33;
			}
		}
		/* #endif */
	}
	
	.form_item_switch {
		position: relative;
		min-height: 100rpx;
		
		
		/* #ifdef MP-WEIXIN */
		/deep/ .my_form_item {
			
			.my_form_item_label {
				padding: 50rpx 0 33rpx;
				
				.default_box {
					view {
						margin-bottom: 20rpx;
					}
					
					text {
						font-size: 22rpx;
						color: $uni-text-color-regular;
					}
				}
			}
			.my_form_item_content {
				display: flex;
				justify-content: flex-end;
				align-items: center;
				padding: 0;
				min-height: 150rpx;
				
				switch {
					transform: scale(0.7);
				}
			}
		}
		/* #endif */ 
		/* #ifdef H5 */
		&::after {
			position: absolute;
			content: '';
			left: 20rpx;
			right: 20rpx;
			top: initial;
			bottom: 0;
			height: 2rpx;
			background-color: $uni-border-color;
		}
		
		/deep/ .my_form_item_label {
			padding: 50rpx 0 33rpx;
			
			.default_box {
				view {
					margin-bottom: 20rpx;
				}
				
				text {
					font-size: 22rpx;
					color: $uni-text-color-regular;
				}
			}
		}
		/deep/ .my_form_item_content {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			padding: 0;
			min-height: 150rpx;
			
			switch {
				transform: scale(0.7);
			}
		}
		/* #endif */
	}
}

.first_child::after {
	content: none;
}
</style>
