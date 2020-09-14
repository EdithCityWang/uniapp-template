module.exports = {
    publicPath: './',
    lintOnSave: true,
    productionSourceMap: false,
    css: {
        loaderOptions: {
            scss: {
				
            }
        }
    },
	chainWebpack: config => {
		const oneOfsMap = config.module.rule('scss').oneOfs.store
		oneOfsMap.forEach(item => {
			item
				.use('sass-resources-loader')
				.loader('sass-resources-loader')
				.options({
					resources: [
						'./src/static/styles/uni.scss',
						'./src/static/styles/iconfont.scss',
						'./src/static/styles/common.scss'
					]
				})
		})
	},
    devServer: {
        port: 3030,
        open: true,
        proxy: "http://192.168.43.8:3000",
    }
}