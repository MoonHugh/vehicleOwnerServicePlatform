<template>
	<div class="carInformation_main">
		<!--顶部导航-->
		<div class="top_title">
			<router-link to="index">
				<img class="top_back" src="static/image/back.png">
			</router-link>
			<div class="top_word">车主服务平台</div>
		</div>
		<!--正文-->
		<div class="carInformation_content">
			<!--无保单-->
			<ul v-show="index1" class="con_bigRow fix">
				<li>
					<div class="con_title">您已完成认证。</div>
					<div class="con_mword">未找到您名下的太平投保车辆。</div>
					<div class="con_bword">请输入车牌号/保单号查询</div>
					<vue-form class="con_littleRow fix" :class="ser" :state="formstate" @submit.prevent="onSubmit">
						<validate tag="label" class="littlerow fl">
							<input @click="serNo = true" type="text" class="con_text1" onfocus="this.blur()" v-model="serRoad" required name="serNo">
							<img class="triangleimg" src="static/image/triangle.png">
							<div v-show="serNo" class="serNo">
								<form>
									<label>车牌号<input @click="serNo = false" type="radio" v-model="serRoad" value="车牌号" name="serNo"></label>
									<label>保单号<input @click="serNo = false" type="radio" v-model="serRoad" value="保单号" name="serNo"></label>
								</form>
							</div>
						</validate>
						<validate tag="label" class="littlerow fr">
							<input type="text" class="con_text2" placeholder="请输入车牌号/保单号查询" v-model="carNo" maxlength="30" required name="carno"  @keyup.enter="onSubmit">
							<img class="searchimg" src="static/image/search.png">
						</validate>
						<div v-show="words" class="con_sword fl">{{hint}}</div>
						<button type="submit" class="con_button fl">绑定投保车辆</button>
					</vue-form>
				</li>
			</ul>
			<!--有保单-->
			<ul v-show="index2" class="con_bigRow fix">
				<li>
					<div class="con_title">您已完成认证。</div>
					<div class="con_mword">已找到您名下的太平投保车辆。</div>
					<div class="con_bword">请选择车辆：</div>
					<ul class="con_smlRow">
						<li @click="backIndex(item.carNo)" v-for="item in carNoList">车牌：{{item.carNo}}</li>
					</ul>
				</li>
			</ul>
		</div>
		<!--logo-->
		<div class="logo">
			<img src="static/image/logo.png">
		</div>
		<!--确定弹框-->
		<div v-show="isView" class="isView">
			<div class="isrow">
				<div class="isword">
					<p>是否确定已选择车牌？</p>
					<p>{{backCarNo}}</p>
				</div>
				<div class="fixed">
					<div @click="backIndex2()" class="isyes">确定</div>
					<div @click="isView = false" class="isno">取消</div>
				</div>
			</div>
		</div>
		<!--底部按钮-->
		<!-- <div class="bottom_button fix">
			<router-link to="index"><div class="button_carInformation fl">首页</div></router-link>
			<router-link to="myorder"><div class="button_indent fr">我的订单</div></router-link>
		</div> -->
	</div>
</template>
<script>
import Vue from 'vue'
export default{
	name: 'app',
	data(){
		return{
			id: '',
			index1: '',
			index2: '',
			formstate: {},
			ser: '',
			carNo: '',
			serNo: '',
			serRoad: '车牌号',
			rreturn: '',
			carNoList: '',
			rreturn1: '',
			words: '',
			hint: '',
			carNo1: '',
			PolicyNo1: '',
			backCarNo: '',
			isView: '',
		}
	},
	watch:{
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
	created(){
		this.id = this.$route.query.id;
	},
	mounted(){
		let _this = this;
		if(this.id == 0){
			this.index1 = true;
		}else if(this.id == 1){
			this.index2 = true;
		}
	},
	methods:{
		getData:function(){
			let _this = this;
			if(this.id == 1){
				// 初始接口，是否绑定有效车险保单
				this.$http.post(Util.ajaxPath.devProductUrl2+'userInfo',{emulateJSON : true}).then(function (res){
					_this.rreturn = res.body;
					if(_this.rreturn.succ == true){
						_this.carNoList = _this.rreturn.data.carList;
					};
				});	
			}
		},
		// 无保单
		onSubmit:function(){
			let _this = this;
			// console.log(this.formstate.$valid);
			// vform表单验证
			if(this.formstate.$valid==true){
				// alert("提交成功");
				if(_this.serRoad == '车牌号'){
					// 总车牌正则
					const carNoReg = /^([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$)))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$)/;
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
					// 提交
					this.$http.post(Util.ajaxPath.devProductUrl2+'carNoPolicy',{carNo: this.carNo,subpolicyno: ''},{emulateJSON : true}).then(function (res){
						_this.rreturn1 = res.body;
						if(_this.rreturn1.succ == false){
							this.words = true;
							this.hint = _this.rreturn1.errMsg;
						}else{
							this.$router.push({name: 'carVerification', query: {carNo: _this.carNo}});
						}
					});
				}else if(_this.serRoad == '保单号'){
					// 提交
					this.$http.post(Util.ajaxPath.devProductUrl2+'carNoPolicy',{carNo: '',subpolicyno: this.carNo},{emulateJSON : true}).then(function (res){
						_this.rreturn1 = res.body;
						if(_this.rreturn1.succ == false){
							this.words = true;
							this.hint = _this.rreturn1.errMsg;
						}else{
							this.$router.push({name: 'carVerification', query: {policyNo: _this.carNo}});
						}
					});
				}
			}else{
				this.$message({
					showClose: true,
					message: '请输入车牌号/保单号查询！',
					type: 'warning',
					center: true
				});
			}
		},
		// 有保单
		backIndex:function(backCarNo){
			let _this = this;
			_this.backCarNo = backCarNo;
			this.isView = true;
		},
		// 有保单
		backIndex2:function(){
			let _this = this;
			// 回传车牌
			this.$http.post(Util.ajaxPath.devProductUrl2+'choiceCarNo',{carNo: this.backCarNo},{emulateJSON : true}).then(function (res){
				_this.rreturn = res.body;
				if(_this.rreturn.succ == true){
					this.$router.push({name: 'index', query: {}});
				};
			});
		}
	}
}
</script>
<style lang="scss">
.carInformation_main{
	.top_title{
		width: 100%; height: 1rem; background: #006cb7; position: fixed; left: 0; top: 0; z-index: 99;
		.top_back{ width: 0.66rem; height: 0.66rem; position: absolute; left: 0.24rem; top: 0.17rem; }
		.top_word{ line-height: 1rem; text-align: center; font-size: 0.32rem; color: #fff; }
	}
	.carInformation_content{
		padding-top: 1rem; min-height: 10.26rem;
		.con_bigRow{
			background: #fff;
			li{ padding: 0.2rem 0; position: relative; }
		}
		.con_title{ height: 0.6rem; line-height: 0.6rem; text-indent: 0.2rem; font-size: 0.26rem; color: #000; border-left: 0.2rem solid #006cb7; }
		.con_mword{ padding: 0 0.4rem; line-height: 0.6rem; font-size: 0.26rem; }
		.con_bword{ padding: 0 0.4rem; height: 1rem; line-height: 1rem; font-size: 0.3rem;  font-weight: bold; }
		.con_text1{ margin-left: 0.4rem; width: 1.2rem; height: 0.6rem; line-height: 0.6rem; text-indent: 0.2rem; border: 1px solid #a8a3a8; border-radius: 0.1rem; }
		.con_text2{ margin-right: 0.4rem; width: 5rem; height: 0.6rem; line-height: 0.6rem; text-indent: 0.2rem; border: 1px solid #a8a3a8; border-radius: 0.1rem; }
		.con_sword{ padding: 0.4rem 0.4rem 0; line-height: 0.6rem; font-size: 0.26rem; color: #a8a3a8; }
		.con_littleRow{ position: relative; }
		.triangleimg{ width: 0.2rem; height: 0.2rem; position: absolute; left: 1.38rem; top: 0.24rem; z-index: 50; }
		.serNo{
			width: 1.2rem; border-radius: 0.1rem; position: absolute; left: 0.4rem; top: calc(0.6rem + 2px); z-index: 50;  background: #eee;
			form{ width: 1.2rem; }
			label{ display: block; width: 1.2rem; height: 0.6rem; line-height: 0.6rem; text-align: center; font-size: 0.28rem; color: #000; }
			label+label{ border-top: 1px solid #cbcbcb; }
			input{ display: none; }
		}
		.searchimg{ width: 0.3rem; height: 0.3rem; position: absolute; right: 0.56rem; top: 0.18rem; z-index: 50; }
		.con_button{ display: block; margin: 0.4rem 0 0 0.35rem; width: 6.8rem; height: 0.8rem; line-height: 0.8rem; text-align: center; font-size: 0.34rem; color: #fff; background: #006cb7; border-radius: 0.1rem; }
		.con_smlRow{
			padding: 0 0.4rem;
			li{ padding: 0; line-height: 0.6rem; font-size: 0.26rem; text-indent: 0.2rem; border-bottom: 1px solid #cbcbcb; }
		}
	}
	.logo{
		width: 100%; height: 0.48rem; background: #f0f0f0;
		img{ display: block; margin: 0 auto; width: 1.704rem; height: 0.48rem; }
	}
	.isView{
		width: 100%; height: 100%; position: fixed; left: 0; top: 0; z-index: 99;
		.isrow{ margin: -1.5rem 0 0 -3rem; width: 6rem; height: 3rem; background: #fff; border: 1px solid #cbcbcb; border-radius: 0.4rem; position: fixed; left: 50%; top: 50%; z-index: 99; }
		.isword{
			padding: 0.26rem 0.3rem; height: 1.4rem; line-height: 0.6rem; text-align: center; font-size: 0.32rem;
			p:nth-child(odd){ font-weight: bold; }
		}
		.isyes{ margin-left: 0.6rem; float: left; width: 1.6rem; height: 0.8rem; line-height: 0.8rem; text-align: center; font-size: 0.36rem; color: #fff; background: #006cb7; border-radius: 0.2rem; }
		.isno{ margin-right: 0.6rem; float: right; width: 1.6rem; height: 0.8rem; line-height: 0.8rem; text-align: center; font-size: 0.36rem; color: #fff; background: #006cb7; border-radius: 0.2rem; }
	}
	.bottom_button{
		width: 100%; height: 1rem; line-height: 1rem; background: #fff; position: fixed; left: 0; bottom: 0; z-index: 50;
		.button_carInformation{ width: 2rem; text-align: center; font-size: 0.26rem; color: #000; }
		.button_indent{ width: 2rem; text-align: center; font-size: 0.26rem; color: #000; }
	}
}
</style>