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
    devServer: {
        port: 3030,
        open: true,
        proxy: "http://192.168.1.111:3000",
    }
}