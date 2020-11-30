/**
 * 使用场景：
 * 1. script 中使用：引入import variables from 'variables.scss.js'
 * 2. style 中使用：无需引入，但是下划线“_”改为“-”使用，例如 $primary-color
 */
const variables = {
	'primary_color': '#5D874E',
	'warning_color': '#E3501A',
	'text_color': '#333333',
	'text_color_secondary': '#999999',
	'text_color_regular': '#666666',
	'bg_color': '#ffffff',
	'img_size_base': '150rpx'
}

module.exports = variables;