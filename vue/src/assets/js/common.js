/**
 * Created by Administrator on 2017/8/24.
 */
import Vue from 'vue'

let ajaxPath = {
	// 全部接口请求地址前缀
	devProductUrl: "/wxweb/car/serv/",
	// 二期接口请求地址前缀
	devProductUrl2: "/wxweb/car/servtwo/",
	// 认证接口请求地址前缀
	devIdentificationUrl: "/wxweb/car/main/checkUser",
	// 发送验证码请求地址前缀
	devSendcodeUrl: "/wxweb/sms/verifyCode/sendVerifyCode",
	// 提交注册请求地址前缀
	devRegisterUrl: "/wxweb/user/register/submit",
	// 转换接口请求地址前缀
	devRuturnUrl: "http://apis.map.qq.com/ws/geocoder/v1/?location=",
	// 腾讯地图key
	// 生产
	// QQkey: "&key=UUGBZ-FB7RS-JWDOU-6TGXQ-2TDA2-SFFUG",
	// 测试
	QQkey: "&key=NOWBZ-3R5WR-VE3W3-WCPQH-OMXYF-MFBUB",

	// 设置cookie
	setCookie (c_name,value,expiredays) {
		var exdate=new Date()
		exdate.setDate(exdate.getDate()+expiredays)
		document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
	},

	// 获取cookie
	getCookie (c_name) {
		if (document.cookie.length>0) {
			let c_start=document.cookie.indexOf(c_name + "=")
			if (c_start!=-1) {
				c_start=c_start + c_name.length+1
				let c_end=document.cookie.indexOf(";",c_start)
				if (c_end==-1) c_end=document.cookie.length
				return unescape(document.cookie.substring(c_start,c_end))
			}
		}
		return ""
	},

	// 判断对象是否为空
	isEmptyObject(e) {
		var t;
		for (t in e)
			return true;
		return false;
	},

	bus : new Vue(),
};

export { ajaxPath };

