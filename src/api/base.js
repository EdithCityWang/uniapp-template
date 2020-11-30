import axios from '@/api/api';

// 获取微信公众号配置信息
export const getWxConfig = (params) => axios.get('/weixin/config', {params})

// 微信登录授权
export const wxLogin = (params) => axios.post('/api/user/wxLogin', params, {
	custom: {
		loading: true,
		loadingTitle: '正在登录...'
	}
})

// 绑定手机号
export const wxBindPhone = (params) => axios.post('/api/user/bindRegister', params, {
	custom: {
		loading: true,
		loadingTitle: '正在绑定...'
	}
})

// 获取地区三联列表
export const getRegionTree = (params) => axios.post('/api/region/getRegionTree', params)

// 获取用户信息
export const getUserInfo = (params) => axios.post('/api/user/info', params)

// 获取商户信息
export const getTenantInfo = (params) => axios.post('/api/tenant/getTenantById', params)

// 上传图片
export const uploadToOss = (params) => axios.upload('/api/upload/uploadToOss', {
	...params,
	custom: {
		loading: true,
		loadingTitle: '正在上传...'
	}
})

// 获取地址列表
export const getAddressList = (params) => axios.post('/api/addr/getAddrList', params, {
	custom: {
		loading: true
	}
})

// 添加地址
export const addAddress = (params) => axios.post('/api/addr/addUserAddr', params, {
	custom: {
		loadingTitle: '保存中...',
		loading: true
	}
})

// 编辑地址
export const editAddress = (params) => axios.post('/api/addr/updateUserAddr', params, {
	custom: {
		loadingTitle: '修改中...',
		loading: true
	}
})

// 删除地址
export const deleteAddress = (params) => axios.post('/api/addr/delUserAddr', params, {
	custom: {
		loadingTitle: '正在删除...',
		loading: true
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