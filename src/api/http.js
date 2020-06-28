import axios from '@/api/api';

// 获取微信公众号配置信息
export const getWxConfig = (params) => axios.get('/weixin/config', {params})

// 上传图片
export const uploadToOss = (params) => axios.upload('/api/upload/uploadToOss', {
	...params,
	custom: {
		loading: true,
		loadingTitle: '正在上传...'
	}
})

// 登录
export const login = (params) => axios.post('/api/tenantUser/login', params, {
	custom: {
		loading: true,
		loadingTitle: '正在登录...'
	}
})

// 退出登录
export const logout = (params) => axios.post('/api/tenantUser/logOffForMobile', params, {
	custom: {
		loading: true,
		loadingTitle: '正在退出...'
	}
})