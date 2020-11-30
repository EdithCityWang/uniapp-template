export default {
	'money': /^(([1-9]\d{0,5}|0)([.]\d{0,2})?)?$/, // 金额，两位小数
	'weight': /^(([1-9]\d{0,5}|0)([.]\d{0,3})?)?$/, // 体重，三位小数
	'mobile': /^1\d{10}$/, // 手机号码，11位
	// 身份证号码 18 15位
	'idCard': /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/,
	// 邮箱
	'email': /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
	// 车牌校验
	'plateNumber': /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/,
}