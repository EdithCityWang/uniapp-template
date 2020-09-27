<template>
	<view>
		<my-swiper :content-data='images' :options="swiperOpts"></my-swiper>
		<my-form :label-width="200">
			<my-form-section>
				<my-form-item label="是否显示面板指示点">
					<switch :checked="swiperOpts.indicatorDots" :color="variables.primary_color" data-prop="indicatorDots" @change="handleChange" />
				</my-form-item>
				<my-form-item label="是否自动切换">
					<switch :checked="swiperOpts.autoplay" :color="variables.primary_color" data-prop="autoplay" @change="handleChange" />
				</my-form-item>
				<my-form-item label="当前选中的指示点颜色">
					<radio-group name="indicatorActiveColor" data-prop="indicatorActiveColor" @change="handleChange">
						<label v-for="(item, index) in colors">
							<radio :value="item.value" :checked="swiperOpts.indicatorActiveColor === item.value" :color="variables.primary_color" /><text>{{ item.label }}</text>
						</label>
					</radio-group>
				</my-form-item>
				<my-form-item label="指示点颜色">
					<radio-group name="indicatorColor" data-prop="indicatorColor" @change="handleChange">
						<label v-for="(item, index) in colors">
							<radio :value="item.value" :checked="swiperOpts.indicatorColor === item.value" :color="variables.primary_color" /><text>{{ item.label }}</text>
						</label>
					</radio-group>
				</my-form-item>
				<my-form-item label="分页模式">
					<radio-group name="mode" data-prop="mode" @change="handleChange">
						<label v-for="(item, index) in modes">
							<radio :value="item.value" :checked="swiperOpts.mode === item.value" :color="variables.primary_color" /><text>{{ item.label }}</text>
						</label>
					</radio-group>
				</my-form-item>
			</my-form-section>
		</my-form>
	</view>
</template>

<script>
	import variables from '@/static/styles/variables.scss.js'
	
	export default {
		data() {
			return {
				variables: variables,
				images: [
					'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601202971561&di=70e8d80dfce36ca538983c084daa6eaf&imgtype=0&src=http%3A%2F%2Fa4.att.hudong.com%2F22%2F59%2F19300001325156131228593878903.jpg',
					'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601202971561&di=70e8d80dfce36ca538983c084daa6eaf&imgtype=0&src=http%3A%2F%2Fa4.att.hudong.com%2F22%2F59%2F19300001325156131228593878903.jpg',
					'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601202971561&di=70e8d80dfce36ca538983c084daa6eaf&imgtype=0&src=http%3A%2F%2Fa4.att.hudong.com%2F22%2F59%2F19300001325156131228593878903.jpg',
					'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601202971561&di=70e8d80dfce36ca538983c084daa6eaf&imgtype=0&src=http%3A%2F%2Fa4.att.hudong.com%2F22%2F59%2F19300001325156131228593878903.jpg'
				],
				colors: [
					{
						label: '黄色',
						value: 'yellow'
					},
					{
						label: '蓝色',
						value: 'blue'
					},
					{
						label: '红色',
						value: 'red'
					}
				],
				// 分页模式列表 dot圆点，indexs页码索引；round 圆点+长
				modes: [
					{
						label: '圆点',
						value: 'dot'
					},
					{
						label: '页码索引',
						value: 'indexs'
					},
					{
						label: '圆点+长',
						value: 'round'
					}
				],
				swiperOpts: {
					mode: 'round', // 分页模式：dot圆点，indexs页码索引；round 圆点+长
					height: 680, // 轮播图高度，单位rpx
					current: 0, // 当前所在滑块儿的index
					indicatorDots: false, // 是否显示面板指示点
					indicatorColor: "rgba(0, 0, 0, 0.3)", // 指示点颜色
					indicatorActiveColor: 'red', // 当前选中的指示点颜色
					autoplay: true, // 是否自动切换
					interval: 5000, // 自动切换时间间隔
					duration: 1000, // 滑动动画时长
				}
			};
		},
		methods: {
			handleChange(e) {
				this.swiperOpts[e.target.dataset.prop] = e.detail.value;
			}
		}
	}
</script>

<style lang="scss">

</style>
