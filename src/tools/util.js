export default {
	getQueryString (name) {
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
		var r = window.location.search.substr(1).match(reg);
		if (r != null) {
		return unescape(r[2]);
		}
		return null;
	},
	/**
	   * 时间戳转为日期格式
	   * time: 时间戳，如1506505252
	   * */
	formatDate (time, format = 'yyyy-MM-dd hh:mm:ss') {
	    var date = new Date(time)
	    var year = date.getFullYear()
	    var month = date.getMonth() + 1 // 月份是从0开始的
	    var day = date.getDate()
	    var hour = date.getHours()
	    var min = date.getMinutes()
	    var sec = date.getSeconds()
	    var preArr = Array.apply(null, Array(10)).map(function (elem, index) {
	      return '0' + index
	    }) /// /开个长度为10的数组 格式为 00 01 02 03
	    var newTime = format
	      .replace(/yyyy/g, year)
	      .replace(/MM/g, preArr[month] || month)
	      .replace(/dd/g, preArr[day] || day)
	      .replace(/hh/g, preArr[hour] || hour)
	      .replace(/mm/g, preArr[min] || min)
	      .replace(/ss/g, preArr[sec] || sec)
	    return newTime
	},
}