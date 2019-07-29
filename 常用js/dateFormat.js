// 关于date的常用方法
// var d = new Date();
// console.log(d); // 输出：Mon Nov 04 2013 21:50:33 GMT+0800 (中国标准时间)
// console.log(d.toDateString()); // 日期字符串，输出：Mon Nov 04 2013
// console.log(d.toGMTString()); // 格林威治时间，输出：Mon, 04 Nov 2013 14:03:05 GMT
// console.log(d.toISOString()); // 国际标准组织（ISO）格式，输出：2013-11-04T14:03:05.420Z
// console.log(d.toJSON()); // 输出：2013-11-04T14:03:05.420Z
// console.log(d.toLocaleDateString()); // 转换为本地日期格式，视环境而定，输出：2013年11月4日
// console.log(d.toLocaleString()); // 转换为本地日期和时间格式，视环境而定，输出：2013年11月4日 下午10:03:05
// console.log(d.toLocaleTimeString()); // 转换为本地时间格式，视环境而定，输出：下午10:03:05
// console.log(d.toString()); // 转换为字符串，输出：Mon Nov 04 2013 22:03:05 GMT+0800 (中国标准时间)
// console.log(d.toTimeString()); // 转换为时间字符串，输出：22:03:05 GMT+0800 (中国标准时间)
// console.log(d.toUTCString()); // 转换为世界时间，输出：Mon, 04 Nov 2013 14:03:05 GMT


// 传入fmt为你需要转化的格式,返回一个字符窜
Date.prototype.Format = function (fmt) { 
    // 定义一个名为o的变量，所有的属性名为正则匹配规则，属性值为需要替代的值
	var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    // 对年份进行单独处理
    if (/(y+)/.test(fmt)) 
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
}
// 将‘2018/9/11’ 转化为 ‘20180911’
var time1 = new Date('2018/9/11').Format("yyyyMMdd"); 

// 将当前时间转化为 指定格式 格式中字母出现的次数为至少保留的位数
// "yyyy-M-dd hh:mm:ss" => "2018-9-10 12:02:09"
// "yyyy-MM-dd hh:mm:ss" => "2018-09-10 12:02:09"
// "yy-MM-dd hh:mm:ss" => "18-09-10 12:02:09"
var time2 = new Date().Format("yyyy-M-dd hh:mm:ss");
console.log(time1)
console.log(time2)
/**
 * 另外推荐moment.js 一个很好用的时间处理插件
 * 
 */
