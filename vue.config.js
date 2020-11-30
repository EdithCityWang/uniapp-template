let scssVariables = require('./src/static/styles/variables.scss.js');

module.exports = {
    publicPath: './',
    lintOnSave: true,
    productionSourceMap: false,
    css: {
        loaderOptions: {
            scss: {
				prependData: Object.keys(scssVariables)
					.map(k => `\$${k.replace('_', '-')}: ${scssVariables[k]};`)
					.join('\n')
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
						'./src/static/styles/uni.scss'
					]
				})
		})
	},
    devServer: {
        port: 3030,
        open: true,
        proxy: 'http://192.168.1.116:3000',
    }
}