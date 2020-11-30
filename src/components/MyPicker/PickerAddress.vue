<template>
	<view class="my_picker my_picker_address">
		<view class="my_picker_wrapper" @click="open">
			<view class="my_picker_content">
				<text v-if="selectedValue.length === 0" class="input_placeholder">{{ placeholder }}</text>
				<text v-else>{{ selectedValue.join('') }}</text>
			</view>
			<text :class="'icon iconfont ' + iconName"></text>
		</view>
		
		<my-modal 
			:show-footer="false" 
			ref="addressPickerModal"
			class-name="address_picker_modal"
		>
			<view slot="header" class="address_picker_modal_header">
				<button class="default mini plain" type="default" size="mini" plain @click="close">取消</button>
				<button class="primary mini plain" type="primary" size="mini" plain @click="handleConfirm">完成</button>
			</view>
			<view slot="content">
				<picker-view class="my_picker_address_picker_view" :value="selectIdx" @change="bindChange">
					<picker-view-column>
						<view class="item" v-for="(item,index) in provinces" :key="index">{{ item.Name }}</view>
					</picker-view-column>
					<picker-view-column>
						<view class="item" v-for="(item,index) in citys" :key="index">{{ item.Name }}</view>
					</picker-view-column>
					<picker-view-column>
						<view class="item" v-for="(item,index) in areas" :key="index">{{ item.Name }}</view>
					</picker-view-column>
				</picker-view>
			</view>
		</my-modal>
	</view>
	
</template>

<script>
	export default {
		props: {
			// 默认值id集合
			value: {
				type: Array,
				default: () => {
					return [0, 0, 0]
				}
			},
			// 选择器类型 selector,multiSelector,time, date, region
			mode: {
				type: String,
				default: 'region'
			},
			placeholder: {
				type: String,
				default: "请选择"
			},
			iconName: {
				type: String,
				default: 'iconxuanze'
			}
		},
		data() {
			return {
				provinces: [], // 省
				citys: [], // 市
				areas: [], // 区
				selectIdx: [0, 0, 0], // 初始数据
				selectedValue: [], // 初始地址
				selectedData: {
					ids: [],
					values: [],
					items: []
				}
			}
		},
		mounted() {
			this.$store.dispatch('getRegionTreeData').then(data => {
				this.provinces = data;
				this.bindChange({
					detail: {
						value: [0, 0, 0]
					}
				}); // 处理数据
			})
		},
		methods: {
			/**
			 * @description 打开
			 */
			open() {
				this.$refs.addressPickerModal.open();
			},
			/**
			 * @description 关闭弹层
			 */
			close() {
				this.$refs.addressPickerModal.close();
			},
			
			/**
			 * @description 获取两个数组中不同的所在index
			 * @param {Object} arr1
			 * @param {Object} arr2
			 */
			getDiffIndex(arr1, arr2) {
				for(let i = 0; i < arr1.length - 1; i++) {
					for(let j = 0; j < arr2.length - 1; j++) {
						if(arr1[i] !== arr2[j]) {
							return i;
						}
					}
				}
			},
			
			/**
			 * @description 处理数据
			 */
			handleColumns(val) {
				// let diffIndex = this.getDiffIndex(val, this.selectIdx);
				
				// // 省
				// if(diffIndex === 0) {
				// 	this.selectIdx = [val[0], 0, 0];
				// } else if(diffIndex === 1) {
				// 	this.selectIdx = [val[0], val[1], 0];
				// }
				
				let [ provinceIndex, cityIndex, areaIndex ] = this.selectIdx;
			
				this.citys = this.provinces[provinceIndex].Nodes ? this.provinces[provinceIndex].Nodes : [];
				this.areas = this.citys[cityIndex].Nodes ? this.citys[cityIndex].Nodes : [];
			},
			
			/**
			 * @description value 改变时触发 change 事件，event.detail = {valu
			 */
			bindChange (e) {
				// this.handleColumns(e.detail.value);
				this.selectIdx = e.detail.value;
				let [ provinceIndex, cityIndex, areaIndex ] = this.selectIdx;
							
				this.citys = this.provinces[provinceIndex].Nodes ? this.provinces[provinceIndex].Nodes : [];
				this.areas = this.citys[cityIndex].Nodes ? this.citys[cityIndex].Nodes : [];
				
				let items = [
					this.provinces[provinceIndex],
					this.citys[cityIndex],
					this.areas[areaIndex]
				];
				
				this.selectedData = {
					ids: items.map(item => {
						return item ? item.Id : null;
					}),
					values: items.map(item => {
						return item ? item.Name : '';
					}),
					items: items
				}
				
			},
			
			/**
			 * @description 完成
			 */
			handleConfirm() {
				this.$emit('on-change', this.selectedData);
				this.$emit('input', this.selectedData.ids);
				this.selectedValue = this.selectedData.values;
				this.close();
			}
		},
		watch: {
			value(newVal) {
				if(newVal.length > 0) {
					console.log(newVal, '=====')
					this.$store.dispatch('getRegionTreeData').then(data => {
						this.provinces = data;
						let provinceIndex = this.provinces.findIndex(item => item.Id === newVal[0]);
						let cityIndex = this.provinces[provinceIndex].Nodes.findIndex(item => item.Id === newVal[1]);
						let areaIndex = this.provinces[provinceIndex].Nodes[cityIndex].Nodes.findIndex(item => item.Id === newVal[2]);
						
						this.bindChange({
							detail: {
								value: [provinceIndex, cityIndex, areaIndex]
							}
						})
						
						this.selectedValue = this.selectedData.values;
					})
					
				}
			}
		}
	}
</script>

<style lang="scss">
	.my_picker_address {
		position: relative;
		
		.iconfont {
			right: 0;
			position: absolute;
			color: $uni-text-color;
			z-index: 10;
			top: 50%;
			font-size: 32rpx;
			width: 42rpx;
			height: 42rpx;
			text-align: center;
			line-height: 42rpx;
			margin-top: -21rpx;
		}
		
		.iconxuanze {
			transform: scale(0.4);
			color: $uni-text-color-secondary;
		}
	}
	
	.my_picker_content {
		font-size: $uni-font-size-base;
		padding-right: 50rpx;
		color: $uni-text-color;
	}
	
	.my_picker_address_picker_view {
		width: 100%;
		height: 400rpx;
		
		.item {
			// height: 70rpx;
			line-height: 70rpx;
			font-size: $uni-font-size-base;
		}
	}
	
	.address_picker_modal_header {
		button.mini {
			font-size: 30rpx;
		}
	}
</style>
