<template>
	<view class="address_page">
		<view v-for="(item, index) in dataObj.list" :key="index" hover-class="none" class="my_card address_box" @click="chooseAddress(item)">
			<view class="address_contact">
				<text>{{ item.nickName }}</text>
				<text>{{ item.mobile }}</text>
				<view v-if="item.isDefault === 1" class="my_tag">默认</view>
			</view>
			<view class="address_detail">
				{{ item.area.replace(/\s+/g, '') + item.addr }}
			</view>
			<uni-icons type="arrowright" size="18"></uni-icons>
		</view>
		<template v-if="!postdata.loading && dataObj.list.length === 0">
			<view style="height: 147rpx"></view>
			<my-list-empty :empty-image="require('@/pagesAddress/static/images/img_address_empty.png')" tip-text="暂时还没有任何地址"></my-list-empty>
		</template>
		<view style="height: 208rpx;"></view>
		<!-- <button v-if="userInfo.Token && !userInfo.Mobile" class="btn_footer" type="primary" size="large" data-shape="circle" open-type="getPhoneNumber" @getphonenumber="getphonenumber">+ 新增收货地址</button> -->
		<button class="btn_footer" type="primary" size="large" data-shape="circle" @click="toPage('/pagesAddress/address/addressAdd?type=add')">+ 新增收货地址</button>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import {
		getAddressList
	} from '@/api/base.js';
	
	export default {
		data() {
			return {
				postdata: {
					loading: true // 数据请求加载状态
				},
				pageType: 'normal', // 页面类型 normal正常；choose 选择地址
				dataObj: {
					list: [],
					pages: 0,
					total: 0
				}
			};
		},
		computed: {
			...mapState({
				userInfo: state => state.user.userInfo
			})
		},
		onLoad(options) {
			let { type = 'normal' } = options;
			this.pageType = type;
		},
		onShow() {
			this.netGetAddressList(); // 获取地址列表
		},
		methods: {
			/**
			 * @description 跳转页面
			 */
			toPage(url) {
				uni.navigateTo({
					url: url
				})
			},
			
			/**
			 * @description 授权手机号
			 */
			getphonenumber(e) {
				if(e.detail.encryptedData) {
					this.$store.dispatch('weixinBindPhone', e.detail).then(res => {
						this.toPage('/pages/address/addressAdd?type=add');
					})
				}
			},
			
			/**
			 * @description 获取地址列表
			 */
			netGetAddressList() {
				this.postdata.loading = true;
				getAddressList().then(res => {
					this.postdata.loading = false;
					if(res._OK) {
						this.dataObj.list = res.data.data || []
					}
				}).catch(() => {
					this.postdata.loading = false;
				})
			},
			
			/**
			 * @description 选择地址
			 * @param {Object} item 地址信息 
			 */
			chooseAddress(item) {
				if(this.pageType === 'choose') {
					uni.setStorageSync('choosedAddress', item); // 存储地址信息到本地
					uni.navigateBack({
						delta: 1
					})
				} else {
					this.toPage('/pagesAddress/address/addressAdd?type=edit&id=' + item.Id)
				}
			}
		}
	}
</script>

<style lang="scss">
@import '@/pagesAddress/static/styles/addressCommon.scss';

.address_page {
	background-color: $uni-color-white;
	min-height: 100vh;
	border-top: 2rpx solid #EAEAEA;
	
	&.list_tempty {
		padding-top: 147rpx;
	}
	
	/* #ifdef H5 */
	min-height: calc(100vh - #{$nav-height});
	/* #endif */
	
	.address_box {
		position: relative;
		margin: 0;
		box-shadow: none;
		padding-left: 23rpx;
		
		&::after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 22rpx;
			right: 22rpx;
			height: 2rpx;
			background-color: $uni-border-color;
		}
	}
}
</style>
