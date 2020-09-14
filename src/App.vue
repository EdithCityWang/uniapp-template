<script>
import { mapState } from 'vuex';
import { getWxConfig } from '@/api/http';
export default {
	computed: {
		...mapState(['userInfo'])
	},
	data() {
		return {
			isOpenBle: false
		}
	},
	onLaunch: function() {},
	onShow: function() {
		console.log('App Show');
		// 获取微信公众号配置信息
		// getWxConfig().then(res => {
		// 	console.log(res, "===")
		// })
		
		// 如果没有token则跳回登录页
		this.$store.dispatch('getUserInfo').catch(res => {
			uni.reLaunch({
				url: 'pages/login/login'
			});
		})
	},
	onHide: function() {
		console.log('App Hide');
	},
	methods: {
		
	}
};
</script>

<style lang="scss">
@import '@/static/styles/common.scss'
</style>
