<template>
	<div class="information_main">
		<!--顶部导航-->
		<div class="top_title">
			<img @click="$router.history.go(-1)" class="top_back" src="static/image/back.png">
			<div class="top_word">认证信息</div>
		</div>
		<!--正文-->
		<div class="identification">
			<vue-form class="con_littleRow" :state="formstate" @submit.prevent="onSubmit">
				<validate tag="label" class="littlerow fix">
					<div class="con_littitle fl">用户名</div>
					<input type="text" class="text" placeholder="请输入用户名" v-model="userName" maxlength="30" required name="name">
					<field-messages class="fl" name="name">
						<div class="namehint" slot="required">必填</div>
					</field-messages>
				</validate>
				<validate tag="label" class="littlerow fix">
					<div class="con_littitle fl">证件类型</div>
					<input @click="cardTypeview = true" type="text" class="text" onfocus="this.blur()" v-model="cardType" required name="cardType">
					<field-messages class="fl" name="cardType">
						<div class="namehint" slot="required">必填</div>
					</field-messages>
				</validate>
				<validate tag="label" class="littlerow fix">
					<div class="con_littitle fl">证件号码</div>
					<input type="text" class="text" placeholder="请输入证件号码" v-model="cardId" maxlength="18" required name="cardId">
					<field-messages class="fl" name="cardId">
						<div class="namehint" slot="required">必填</div>
					</field-messages>
				</validate>
				<validate tag="label" class="littlerow fix">
					<div class="con_littitle fl">手机号码</div>
					<input type="text" class="text" placeholder="请输入手机号码" v-model="phoneNum" maxlength="11" required name="phoneNum">
					<div class="sendcode" @click="sendcode(this)">{{codemessage}}</div>
					<field-messages class="fl" name="phoneNum">
						<div class="namehint" slot="required">必填</div>
					</field-messages>
				</validate>
				<validate tag="label" class="littlerow fix">
					<div class="con_littitle fl">验证码</div>
					<input type="text" class="text" placeholder="请输入验证码" v-model="validNum" maxlength="4" required name="validNum">
					<field-messages class="fl" name="validNum">
						<div class="namehint" slot="required">必填</div>
					</field-messages>
				</validate>
				<input type="text" v-model="targetAction" style="display:none" >
				<input type="text" v-model="lvl" style="display:none" >
				<button type="submit" class="con_button">提交</button>
			</vue-form>
			<div v-show="cardTypeview" class="cardTypeview">
				<form>
					<label>身份证<input @click="cardTypeview = false" type="radio" v-model="cardType" value="身份证"/></label>
				</form>
			</div>
		</div>
	</div>
</template>
<script>
import Vue from 'vue'
export default{
	name: 'app',
	data(){
		return{
			id: '',
			rreturn1: '',
			rreturn2: '',
			rreturn3: '',
			formstate: {},
			userName: '',
			cardType: '身份证',
			cardId: '',
			phoneNum: '',
			validNum: '',
			targetAction: 'ajax',
			lvl: '20',

			cardTypeview: false,
			cardTypeId: '',

			countdown: 60,
			codemessage: '获取验证码',
			firstTime: true,
		}
	},
	watch:{
		userName(){
			this.userName = this.userName.replace(/[ ]/g, '');
		},
		cardId(){
			this.cardId = this.cardId.replace(/[^\d]/g, '');
		},
		phoneNum(){
			this.phoneNum = this.phoneNum.replace(/[^\d]/g, '');
		},
		validNum(){
			this.validNum = this.validNum.replace(/[ ]/g, '');
		},
	},
	created(){
		this.id = this.$route.query.id;
	},
	mounted(){
	},
	methods:{
		//倒计时功能
		settime:function(elem){
			let _this = this;
			if(this.countdown == 0){
				if(this.firstTime){
					this.codemessage = "获取验证码";
				}else{
					this.codemessage = "再次发送";
				}
				this.countdown = 60;
			}else{
				this.countdown--;
				this.codemessage = this.countdown + "秒后重发";
				setTimeout(function(){
					_this.settime(elem);
				}, 1000)
			}
		},
		sendcode:function(elem){
			let _this = this;
			this.firstTime = this.firstTime ? '': '';
			if(this.phoneNum !== ''){
				const phoneReg = /^1[3|4|5|7|8]{1}\d{9}/;
				const type = 'register';
				if(!phoneReg.test(this.phoneNum)){
					this.$message({
						showClose: true,
						message: '请输入正确手机号码',
						type: 'warning',
						center: true
					});
					return;
				};
				//防止连续发送
				if(this.countdown == 60){
					this.settime(elem, this.countdown);
					this.$http.post(Util.ajaxPath.devSendcodeUrl,{phoneNum: this.phoneNum},{emulateJSON : true}).then(function (res){
						_this.rreturn1 = res.body;
						if(_this.rreturn1.succ == false){
							this.$message({
								showClose: true,
								message: _this.rreturn1.errMsg,
								type: 'warning',
								center: true
							});
						}else{
							this.$message({
								showClose: true,
								message: '发送成功！',
								type: 'success',
								center: true
							});
							alert(_this.rreturn1.data)
						};
					});
				};
			}else{
				this.$message({
					showClose: true,
					message: '请输入手机号码',
					type: 'warning',
					center: true
				});
			}
		},
		onSubmit:function(){
			let _this = this;
			// console.log(this.formstate.$valid);
			// vform表单验证
			if(this.formstate.$valid==true){
				// alert("提交成功");
				const cardIdReg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
				const type = 'register';
				// 验证身份证
				if(!cardIdReg.test(this.cardId)){
					this.$message({
						showClose: true,
						message: '请输入正确证件号码',
						type: 'warning',
						center: true
					});
					return;
				};
				// 转身份证
				if(this.cardType == '身份证'){
					this.cardTypeId = '01';
				};
				$(".con_button").attr("disabled","true").css("background","#b1b1b1");
				setTimeout(function(){
					$(".con_button").removeAttr("disabled").css("background","#0170c2");
				}, 5000);
				// 提交
				this.$http.post(Util.ajaxPath.devRegisterUrl,{userName: this.userName,cardType: this.cardTypeId,cardId: this.cardId,phoneNum: this.phoneNum,validNum: this.validNum,targetAction: this.targetAction,lvl: this.lvl},{emulateJSON : true}).then(function (res){
					_this.rreturn2 = res.body;
					if(_this.rreturn2.succ == false){
						this.$message({
							showClose: true,
							message: _this.rreturn2.errMsg,
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
						// 跳转
						if(_this.id == 'SI001_01'){
							setTimeout(function(){
								_this.$router.push({name: 'services1', query: { id: "SI001_01"}});
							},1000)
						}else if(_this.id == 'SI049'){
							setTimeout(function(){
								_this.$router.push({name: 'services2', query: { id: "SI049"}});
							},1000)
						}else if(_this.id == 'SI001_03'){
							setTimeout(function(){
								_this.$router.push({name: 'services1', query: { id: "SI001_03"}});
							},1000)
						}else if(_this.id == 'SI001_04'){
							setTimeout(function(){
								_this.$router.push({name: 'services1', query: { id: "SI001_04"}});
							},1000)
						}else if(_this.id == 'SI001_05'){
							setTimeout(function(){
								_this.$router.push({name: 'services1', query: { id: "SI001_05"}});
							},1000)
						}else if(_this.id == 'C001'){
							// 初始接口，是否绑定有效车险保单
							this.$http.post(Util.ajaxPath.devProductUrl2+'userInfo',{emulateJSON : true}).then(function (res){
								_this.rreturn3 = res.body;
								if(_this.rreturn3.succ == true){
									if(_this.rreturn3.data.carList == ''){
										setTimeout(function(){
											_this.$router.push({name: 'carInformation', query: {id: 0}});
										},1000)
									}else{
										setTimeout(function(){
											_this.$router.push({name: 'carInformation', query: {id: 1}});
										},1000)
									}
								}else{
									setTimeout(function(){
										_this.$router.push({name: 'index', query: {}});
									},1000)
								};
							});
						};
					};
				});
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
.information_main{
	.top_title{
		width: 100%; height: 1rem; background: #006cb7; position: fixed; left: 0; top: 0; z-index: 99;
		.top_back{ width: 0.66rem; height: 0.66rem; position: absolute; left: 0.24rem; top: 0.17rem; }
		.top_word{ line-height: 1rem; text-align: center; font-size: 0.32rem; color: #fff; }
	}
	.identification{
		padding-top: 1rem;
		.con_littleRow{
			padding: 0.2rem; position: relative; z-index: 0;
			.littlerow{ display: block; border-bottom: 1px solid #cbcbcb; height: 0.8rem; position: relative; }
			.con_littitle{ width: 2.4rem; line-height: 0.8rem; text-align: center; font-size: 0.28rem; color: #000; }
			.text{ float: left; margin-top: 0.1rem; width: 4rem; height: 0.6rem; line-height: 0.6rem; text-indent: 0.1rem; font-size: 0.28rem; background: #f0f0f0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
			.sendcode{ height: 0.4rem; line-height: 0.4rem; font-size: 0.28rem; color: #000; text-decoration: underline; position: absolute; right: 0.8rem; top: 0.18rem; }
			.namehint{ padding-left: 0.1rem; height: 0.8rem; line-height: 0.8rem; font-size: 0.2rem; color: red; }
		}
		.con_button{ display: block; margin: 0.4rem auto 0; width: 6.9rem; height: 0.8rem; line-height: 0.8rem; text-align: center; font-size: 0.34rem; color: #fff; background: #0170c2; border-radius: 0.1rem; position: relative; z-index: -1; }
		.cardTypeview{
			width: 100%; height: 100%; position: fixed; left: 0; bottom: 0; z-index: 101;
			form{ width: 100%; background: #fff; position: fixed; left: 0; bottom: 0; z-index: 50; }
			label{ display: block; width: 100%; height: 0.8rem; line-height: 0.8rem; text-align: center; font-size: 0.28rem; color: #000; }
			label+label{ border-top: 1px solid #cbcbcb; }
			input{ display: none; }
		}
	}
}
</style>