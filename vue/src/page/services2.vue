<template>
	<div class="services_main">
		<!--顶部导航-->
		<div class="top_title">
			<router-link to="index">
				<img class="top_back" src="static/image/back.png">
			</router-link>
			<div class="top_word">服务项目申请</div>
		</div>
		<!--正文-->
		<div class="services_con">
			<img class="con_background" src="static/image/SI001_01.jpg">
			<div class="con_bigRow fix">
				<div class="con_littitle fl">服务项目</div>
				<div class="con_title fl">事故拖车</div>
			</div>
			<vue-form class="con_littleRow" :class="ser" :state="formstate" @submit.prevent="onSubmit">
				<validate tag="label" class="littlerow fix">
					<div class="con_littitle fl">申请人</div>
					<input type="text" class="text" placeholder="单行输入" v-model="drivername" maxlength="30" required name="name">
					<field-messages class="fl" name="name">
						<div class="namehint" slot="required">必填</div>
					</field-messages>
				</validate>
				<validate tag="label" class="littlerow fix">
					<div class="con_littitle fl">车牌号码</div>
					<input type="text" class="text" placeholder="单行输入" v-model="carNo" maxlength="8" required name="carno">
					<field-messages class="fl" name="carno">
						<div class="namehint" slot="required">必填</div>
					</field-messages>
				</validate>
				<validate tag="label" class="littlerow fix">
					<div class="con_littitle fl">救援地址</div>
					<div @click="mapView(1)" class="fix">
						<div class="text">{{selectAddress2}}</div>
						<img class="map" src="static/image/add.png">
					</div>
				</validate>
				<validate tag="label" class="littlerow fix">
					<div class="con_littitle fl">路况</div>
					<input @click="serRoadview = true" type="text" class="text" placeholder="路面/地库/小区" readonly="readonly" v-model="serRoad" required name="road">
					<field-messages class="fl" name="road">
						<div class="namehint" slot="required">必填</div>
					</field-messages>
				</validate>
				<validate tag="label" class="littlerow fix">
					<div class="con_littitle fl">手机号码</div>
					<input type="text" class="text" placeholder="单行输入" readonly="readonly" onfocus="this.blur()" v-model="reportorphonenumber" maxlength="11" required name="num">
					<field-messages class="fl" name="num">
						<div class="namehint" slot="required">必填</div>
					</field-messages>
				</validate>
				<validate tag="label" class="littlerow fix">
					<div class="con_littitle fl">是否仍在事故现场</div>
					<div class="fix fl">
						<input @click="twoAdd = false" type="radio" class="radio fl" name="radio" value="1" checked="checked"><div class="yn fl">是</div>
					</div>
					<div class="fix fl">
						<input @click="twoAdd = true" type="radio" class="radio fl" name="radio" value="2"><div class="yn fl">否</div>
					</div>
				</validate>
				<validate tag="label" class="littlerow fix">
					<div class="con_littitle fl">出险情况</div>
					<input @click="seraaview = true" type="text" class="text" placeholder="请选择出险情况" readonly="readonly" v-model="seraa" required name="aa">
					<field-messages class="fl" name="aa">
						<div class="namehint" slot="required">必填</div>
					</field-messages>
				</validate>
				<validate tag="label" class="littlerow fix" v-show="twoAdd">
					<div class="con_littitle fl">出险地址</div>
					<div @click="mapView(2)" class="fix">
						<div class="text">{{selectAddress3}}</div>
						<img class="map" src="static/image/add.png">
					</div>
				</validate>
				<button v-show="information1" type="submit" class="con_button">立即申请</button>
				<router-link :to='{path: "information", query: {id: this.id}}'>
					<div v-show="information2" class="con_button">绑定信息</div>
				</router-link>
			</vue-form>
			<div class="hint">
				<p>温馨提示：</p>
				<p>1、事故救援服务对象为9座以下非营运客车且在保单有效期内，具体请您查阅保单特别约定。</p>
				<p>2、在保单有效期内，如果您发生保险事故，为防止被保险车辆损失扩大、帮助车辆脱离困境，可向我们申请提供事故救援服务。</p>
				<p>3、我们将按就近原则，在合理公里数范围内为您提供事故救援服务。</p>
				<p>4、我们的服务区域范围为中国境内，不包括港澳台地区、交通管制区域（高速公路、快速干道等）。</p>
			</div>
			<div class="logo">
				<img src="static/image/logo.png">
			</div>
			<div v-show="serRoadview" class="serRoadview">
				<form>
					<label>路面<input @click="serRoadview = false" type="radio" v-model="serRoad" value="路面"/></label>
					<label>地库<input @click="serRoadview = false" type="radio" v-model="serRoad" value="地库"/></label>
					<label>小区<input @click="serRoadview = false" type="radio" v-model="serRoad" value="小区"/></label>
				</form>
			</div>
			<div v-show="seraaview" class="serRoadview">
				<form>
					<label>本车行驶中撞固定物，仅赔付本车<input @click="seraaview = false" type="radio" v-model="seraa" value="本车行驶中撞固定物，仅赔付本车"/></label>
					<label>水淹车<input @click="seraaview = false" type="radio" v-model="seraa" value="水淹车"/></label>
				</form>
			</div>
		</div>
		<div id="mapPage1">
			<iframe width="100%" height="100%" frameborder='0' src="http://apis.map.qq.com/tools/locpicker?search=1&type=1&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp">
			</iframe>
		</div>
		<div id="mapPage2">
			<iframe width="100%" height="100%" frameborder='0' src="http://apis.map.qq.com/tools/locpicker?search=1&type=1&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp">
			</iframe>
		</div>
		<!--通过 iframe 嵌入前端定位组件，此处隐藏定位组件，使用了定位组件的在定位中视觉特效 -->
		<iframe id="geoPage" width="0" height="0" frameborder="0" scrolling="no" src="https://apis.map.qq.com/tools/geolocation?key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp&effect=zoom"></iframe>
	</div>
</template>
<script>
import Vue from 'vue'
export default{
	name: 'app',
	data(){
		return{
			lat: '',
			lng: '',
			selectAddress2: '',
			selectAddress3: '',
			formstate: {},
			ser: '',
			drivername: '',
			carNo: '',
			reportorphonenumber: '',

			id: '',
			serRoad: '',
			serRoadId: '',
			serRoadview: false,
			seraa: '',
			seraaId: '',
			seraaview: false,
			twoAdd: false,

			province: '',
			city: '',
			cun: '',

			onSpot: '',
			adcode: '',

			flag: '',

			rreturn: '',
			rreturn1: '',
			rreturn2: '',

			information1: true,
			information2: false,

			// 第几个框调用地图
			index: '',
		}
	},
	watch:{
		// 监听申请人，去掉空格
		drivername(){
			this.drivername = this.drivername.replace(/[ ]/g, '');
		},
		// 监听车牌，去掉空格
		carNo(){
			this.carNo = this.carNo.replace(/[ ]/g, '');
		},
	},
	beforeMount(){
		this.$nextTick(function(){
			this.getData();
		});
	},
	created:function(){
		this.id = this.$route.query.id;
	},
	mounted: function(){
		let _this = this;
		// 定位
		var loc;
		var isMapInit = false;
		//监听定位组件的message事件
		window.addEventListener('message', function(event){
			loc = event.data; // 接收位置信息
			// console.log('location', loc);
			if(loc  && loc.module == 'geolocation'){
				// 定位成功,防止其他应用也会向该页面post信息，需判断module是否为'geolocation'
				var url = Util.ajaxPath.devRuturnUrl+loc.lat+","+loc.lng+Util.ajaxPath.QQkey+"&output=jsonp";
				$.ajax({
					type: "get",
					url: url,
					dataType: "jsonp",
					success:function (data){
						// console.log(data)
						let locProvince = data.result.ad_info.province;
						let locCity = data.result.ad_info.city;
						let locCun = data.result.ad_info.district;
						let locLat = data.result.ad_info.location.lat;
						let locLng = data.result.ad_info.location.lng;
						let locAddress = data.result.address;
						let locAdcode = data.result.ad_info.adcode;
						_this.province = locProvince;
						_this.city = locCity;
						_this.cun = locCun;
						_this.lat = locLat;
						_this.lng = locLng;
						_this.selectAddress2 = locAddress;
						_this.adcode = locAdcode;
						// 判定是否在该地区可以执行该服务
						_this.$http.post(Util.ajaxPath.devProductUrl+'init',{serviceType: _this.id,province: _this.province,city: _this.city,cun: _this.cun,carNo: _this.carNo},{emulateJSON : true}).then(function (res){
							_this.flag = res.body.data.flag.flag;
							if(_this.flag == 0){
								this.$message({
									showClose: true,
									message: '服务申请失败，请拨打95589咨询！',
									type: 'warning',
									center: true
								});
							}
						});
					}
				});
			}else{ 
				// 定位组件在定位失败后，也会触发message, event.data为null
				// alert('定位失败，请手动点选')
			}
		}, false);
		// 为防止定位组件在message事件监听前已经触发定位成功事件，在此处显示请求一次位置信息
		document.getElementById("geoPage").contentWindow.postMessage('getLocation', '*');
		// 腾讯地图组件
		window.addEventListener('message', function(event){
			// 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
			// console.log('测试有没有进来')
			// 这里能打印第几个地图就可以做对应的操作
			// console.log(_this.index)
			var loc = event.data;
			if (loc && loc.module == 'locationPicker'){
				// 防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
				// console.log('location', loc);
				$("#mapPage" + _this.index).hide();
				if(_this.index == 1){
					var url = Util.ajaxPath.devRuturnUrl+loc.latlng.lat+","+loc.latlng.lng+Util.ajaxPath.QQkey+"&output=jsonp";
					$.ajax({
						type: "get",
						url: url,
						dataType: "jsonp",
						success:function (data){
							// console.log(data)
							let locProvince2 = data.result.ad_info.province;
							let locCity2 = data.result.ad_info.city;
							let locCun2 = data.result.ad_info.district;
							let locLat2 = data.result.ad_info.location.lat;
							let locLng2 = data.result.ad_info.location.lng;
							let locAddress2 = data.result.address;
							let locAdcode2 = data.result.ad_info.adcode;
							_this.province = locProvince2;
							_this.city = locCity2;
							_this.cun = locCun2;
							_this.lat = locLat2;
							_this.lng = locLng2;
							_this.selectAddress2 = locAddress2;
							_this.adcode = locAdcode2;
							// 判定是否在该地区可以执行该服务
							_this.$http.post(Util.ajaxPath.devProductUrl+'init',{serviceType: _this.id,province: _this.province,city: _this.city,cun: _this.cun,carNo: _this.carNo},{emulateJSON : true}).then(function (res){
								_this.flag = res.body.data.flag.flag;
								if(_this.flag == 0){
									this.$message({
										showClose: true,
										message: '服务申请失败，请拨打95589咨询！',
										type: 'warning',
										center: true
									});
								}
							});
						}
					});
				}else if(_this.index == 2){
					var url = Util.ajaxPath.devRuturnUrl+loc.latlng.lat+","+loc.latlng.lng+Util.ajaxPath.QQkey+"&output=jsonp";
					$.ajax({
						type: "get",
						url: url,
						dataType: "jsonp",
						success:function(data){
							// console.log(data)
							let locAddress3 = data.result.address;
							_this.selectAddress3 = locAddress3;
						}
					});
				}
			}
		}, false);
	},
	methods:{
		getData:function(){
			let _this = this;
			// 初始接口，是否认证
			this.$http.post(Util.ajaxPath.devIdentificationUrl,{emulateJSON : true}).then(function (res){
				_this.rreturn1 = res.body;
				if(_this.rreturn1.succ == false){
					this.information1 = false;
					this.information2 = true;
				};
			});
			// 初始接口，获取车主信息
			this.$http.post(Util.ajaxPath.devProductUrl+'searchUser',{emulateJSON : true}).then(function (res){
				_this.ser = res.body.data;
				_this.drivername = _this.ser.drivername;
				_this.carNo = _this.ser.carNo;
				_this.reportorphonenumber = _this.ser.reportorphonenumber;
			});
		},
		mapView:function(index){
			this.index = index;
			$("#mapPage" + index).show();
			let _this = this;
		},
		onSubmit:function(){
			let _this = this;
			// console.log(this.formstate.$valid);
			// vform表单验证
			if(this.formstate.$valid==true){
				// 通用车牌
				// const carNoReg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
				// 新能源车牌
				// const carNoReg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
				// 总车牌正则
				const carNoReg = /^([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$)))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$)/;
				// 手机号正则
				const phoneReg = /^1[3|4|5|7|8]{1}\d{9}/;
				const type = 'register';
				// 验证车牌
				if(!carNoReg.test(this.carNo)){
					this.$message({
						showClose: true,
						message: '请输入正确车牌号码',
						type: 'warning',
						center: true
					});
					return;
				};
				// 验证手机号
				if(!phoneReg.test(this.reportorphonenumber)){
					this.$message({
						showClose: true,
						message: '请输入正确手机号码',
						type: 'warning',
						center: true
					});
					return;
				};
				// 转路况
				if(this.serRoad == '路面'){
					this.serRoadId = '01';
				}else if(this.serRoad == '地库'){
					this.serRoadId = '02';
				}else if(this.serRoad == '小区'){
					this.serRoadId = '03';
				};
				// 转险情
				if(this.seraa == '本车行驶中撞固定物，仅赔付本车'){
					this.seraaId = '01';
				}else if(this.seraa == '水淹车'){
					this.seraaId = '05';
				};
				// 两个地址是否一样
				if(this.twoAdd == false){
					this.selectAddress3 = this.selectAddress2;
					this.onSpot = 1;
				}else{
					this.onSpot = 0;
				};
				// 提交
				if(this.flag == '1' && this.selectAddress2 !== ''){
					$(".con_button").attr("disabled","true").css("background","#b1b1b1");
					setTimeout(function(){
						$(".con_button").removeAttr("disabled").css("background","#006cb7");
					}, 5000);
					this.$http.post(Util.ajaxPath.devProductUrl+'subCarNo',{carNo: this.carNo,province: this.province,city: this.city,cun: this.cun},{emulateJSON : true}).then(function (res){
						_this.rreturn2 = res.body;
						if(_this.rreturn2.succ == false){
							this.$message({
								showClose: true,
								message: _this.rreturn2.errMsg,
								type: 'warning',
								center: true
							});
						}else{
							this.$http.post(Util.ajaxPath.devProductUrl+'sumbit',{drivername: this.drivername,reportorphonenumber: this.reportorphonenumber,carNo: this.carNo,province: this.province,city: this.city,cun: this.cun,dangerPlace: this.selectAddress2,serviceType: this.id,traffic: this.serRoadId,lat: this.lat,lng: this.lng,dangerAddr: this.selectAddress3,dangerText: this.seraaId,onSpot: this.onSpot,adcode: this.adcode},{emulateJSON : true}).then(function (res){
								_this.rreturn = res.body;
								if(_this.rreturn.succ == false){
									this.$message({
										showClose: true,
										message: _this.rreturn.errMsg,
										type: 'warning',
										center: true
									});
								}else{
									this.$message({
										showClose: true,
										message: '提交成功！',
										type: 'success',
										center: true
									});
									setTimeout(function(){
										_this.$router.push({name: 'map', query: {lat: _this.lat,lng: _this.lng,carNo: _this.carNo,id: _this.id,uuid: _this.rreturn.data.uuid,province: _this.province,city: _this.city,policyNo: _this.rreturn2.data.policyNo}});
									},1000)
								};
							});
						};
					});
				}else{
					this.$message({
						showClose: true,
						message: '服务申请失败，请拨打95589咨询！',
						type: 'warning',
						center: true
					});
				}
			}else{
				this.$message({
					showClose: true,
					message: '请填写完整信息！',
					type: 'warning',
					center: true
				});
			}
		}
	}
}
</script>
<style lang="scss">
.services_main{
	.top_title{
		width: 100%; height: 1rem; background: #006cb7; position: fixed; left: 0; top: 0; z-index: 99;
		.top_back{ width: 0.66rem; height: 0.66rem; position: absolute; left: 0.24rem; top: 0.17rem; }
		.top_word{ line-height: 1rem; text-align: center; font-size: 0.32rem; color: #fff; }
	}
	.services_con{
		padding-top: 1rem;
		.con_background{ display: block; width: 100%; height: 100%; padding-bottom: 0.2rem; }
		.con_bigRow{
			height: 0.6rem; border-left: 0.2rem solid #006cb7;
			.con_littitle{ width: 2.4rem; height: 0.6rem; line-height: 0.6rem; text-align: center; font-size: 0.28rem; color: #000; }
			.con_title{ height: 0.6rem; line-height: 0.6rem; font-size: 0.28rem; color: #000; }
		}
		.con_littleRow{
			padding: 0 0.2rem; position: relative; z-index: 0;
			.littlerow{ display: block; border-bottom: 1px solid #cbcbcb; height: 0.8rem; position: relative; }
			.con_littitle{ width: 2.4rem; line-height: 0.8rem; text-align: center; font-size: 0.28rem; color: #000; }
			.text{ float: left; margin-top: 0.1rem; width: 4rem; height: 0.6rem; line-height: 0.6rem; text-indent: 0.1rem; font-size: 0.28rem; background: #fff; border: 1px solid #cbcbcb; border-radius: 0.1rem; outline: medium; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
			input.radio{ margin: 0.25rem 0 0 0.4rem; width: 0.3rem; height: 0.3rem; }
			.yn{ padding-right: 0.4rem; line-height: 0.8rem; font-size: 0.28rem; color: #000; }
			.map{ display: block; width: 0.3rem; height: 0.3rem; position: absolute; right: 1rem; top: 0.25rem; }
			.namehint{ padding-left: 0.1rem; height: 0.8rem; line-height: 0.8rem; font-size: 0.2rem; color: red; }
		}
		.con_button{ display: block; margin: 0.4rem auto 0; width: 6.9rem; height: 0.8rem; line-height: 0.8rem; text-align: center; font-size: 0.34rem; color: #fff; background: #006cb7; border-radius: 0.1rem; position: relative; z-index: -1; }
		.hint{
			padding: 0.2rem 0 0 0.4rem;
			p{ padding: 0 0.24rem 0.2rem 0; line-height: 0.36rem; font-size: 0.26rem; color: #000; }
		}
		.logo{
			padding: 0.2rem 0 0.4rem; width: 100%; height: 0.48rem; background: #f0f0f0;
			img{ display: block; margin: 0 auto; width: 1.704rem; height: 0.48rem; }
		}
		.serRoadview{
			width: 100%; height: 100%; position: fixed; left: 0; bottom: 0; z-index: 50;
			form{ width: 100%; background: #fff; position: fixed; left: 0; bottom: 0; z-index: 50; }
			label{ display: block; width: 100%; height: 0.8rem; line-height: 0.8rem; text-align: center; font-size: 0.28rem; color: #000; }
			label+label{ border-top: 1px solid #cbcbcb; }
			input{ display: none; }
		}
	}
	#mapPage1{ display: none; width: 100%; height: 100%; position: fixed; left: 0; top: 0; z-index: 99; }
	#mapPage2{ display: none; width: 100%; height: 100%; position: fixed; left: 0; top: 0; z-index: 99; }
	#geoPage{ display: none; }
}
</style>