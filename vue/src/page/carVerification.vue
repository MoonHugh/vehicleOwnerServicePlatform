<template>
	<div class="carVerification_main">
		<!--顶部导航-->
		<div class="top_title">
			<router-link :to='{path: "carInformation", query: {id: 0}}'>
				<img class="top_back" src="static/image/back.png">
			</router-link>
			<div class="top_word">服务项目申请</div>
		</div>
		<!--正文-->
		<div class="carVerification_con">
			<div class="carVerification_c">
				<div v-show="showCar" class="con_bigRow fix">
					<div class="con_littitle fl">车牌</div>
					<div class="con_title fl">{{carNo}}</div>
				</div>
				<div v-show="showPol" class="con_bigRow fix">
					<div class="con_littitle fl">保单</div>
					<div class="con_title fl">{{policyNo}}</div>
				</div>
				<vue-form class="con_littleRow" :class="ser" :state="formstate" @submit.prevent="onSubmit">
					<validate tag="label" class="littlerow fix">
						<div class="con_littitle fl">被保险人姓名</div>
						<input type="text" class="text" placeholder="单行输入" v-model="userName" maxlength="30" required name="name">
						<field-messages class="fl" name="name">
							<div class="namehint" slot="required">必填</div>
						</field-messages>
					</validate>
					<validate tag="label" class="littlerow fix">
						<div class="con_littitle fl">身份证号</div>
						<input type="text" class="text" placeholder="单行输入" v-model="idNumber" maxlength="30" required name="idNumber">
						<field-messages class="fl" name="idNumber">
							<div class="namehint" slot="required">必填</div>
						</field-messages>
					</validate>
					<div v-show="showPol" class="littlerow fix">
						<div class="con_littitle fl">车牌号</div>
						<input type="text" class="text" placeholder="保单号/车架号二选一填写" v-model="carnoPolicyno" maxlength="30">
					</div>
					<div v-show="showCar" class="littlerow fix">
						<div class="con_littitle fl">保单号</div>
						<input type="text" class="text" placeholder="保单号/车架号二选一填写" v-model="carnoPolicyno" maxlength="30">
					</div>
					<div class="littlerow fix">
						<div class="con_littitle fl">车架号</div>
						<input type="text" class="text" placeholder="保单号/车架号二选一填写" v-model="serviceType" maxlength="30">
					</div>
					<button type="submit" class="con_button">马上绑定</button>
				</vue-form>
			</div>
		</div>
		<!--logo-->
		<div class="logo">
			<img src="static/image/logo.png">
		</div>
		<!--底部按钮-->
		<!-- <div class="bottom_button fix">
			<router-link to="index"><div class="button_home fl">首页</div></router-link>
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
			showCar: '',
			showPol: '',
			name: '',
			formstate: {},
			ser: '',
			carNo: '',
			userName: '',
			idNumber: '',
			policyNo: '',
			serviceType: '',
			rreturn: '',
			carnoPolicyno: '',
		}
	},
	watch:{
		// 监听被保险人姓名，去掉空格
		userName(){
			this.userName = this.userName.replace(/[ ]/g, '');
		},
		// 监听身份证号，去掉空格
		idNumber(){
			this.idNumber = this.idNumber.replace(/[ ]/g, '');
		},
		// 监听车牌号/保单号，去掉空格
		carnoPolicyno(){
			this.carnoPolicyno = this.carnoPolicyno.replace(/[ ]/g, '');
		},
		// 监听车架号，去掉空格
		serviceType(){
			this.serviceType = this.serviceType.replace(/[ ]/g, '');
		},
	},
	beforeMount(){
		this.$nextTick(function(){
			this.getData();
		});
	},
	created(){
		this.carNo = this.$route.query.carNo;
		this.policyNo = this.$route.query.policyNo;
	},
	mounted(){
		let _this = this;
		if(this.carNo !== undefined){
			this.showCar = true;
		}else if(this.policyNo !== undefined){
			this.showPol = true;
		}
	},
	methods:{
		getData:function(){
			let _this = this;
		},
		onSubmit:function(){
			let _this = this;
			if(this.carnoPolicyno !== '' || this.serviceType !== ''){
				// console.log(this.formstate.$valid);
				// vform表单验证
				if(this.formstate.$valid==true){
					// alert("提交成功");
					// 身份证正则
					const idNumberReg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
					const type = 'register';
					// 验证身份证
					if(!idNumberReg.test(this.idNumber)){
						this.$message({
							showClose: true,
							message: '请输入正确证件号码',
							type: 'warning',
							center: true
						});
						return;
					};
					if(this.carNo !== undefined){
						// 提交
						this.$http.post(Util.ajaxPath.devProductUrl2+'provingUser',{carNo: this.carNo,policyNo: this.carnoPolicyno,userName: this.userName,idNumber: this.idNumber,serviceType: this.serviceType},{emulateJSON : true}).then(function (res){
							_this.rreturn = res.body;
							if(_this.rreturn.succ == false){
								this.$message({
									showClose: true,
									message: '输入有误请重新检查！',
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
									_this.$router.push({name: 'index', query: {}});
								},1000)
							}
						});
					}else if(this.policyNo !== undefined){
						if(this.carnoPolicyno !== ''){
							// 总车牌正则
							const carnoPolicynoReg = /^([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$)))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$)/;
							const type = 'register';
							// 验证车牌
							if(!carnoPolicynoReg.test(this.carnoPolicyno)){
								this.$message({
									showClose: true,
									message: '请输入正确车牌号码',
									type: 'warning',
									center: true
								});
								return;
							};
						};
						// 提交
						this.$http.post(Util.ajaxPath.devProductUrl2+'provingUser',{carNo: this.carnoPolicyno,policyNo: this.policyNo,userName: this.userName,idNumber: this.idNumber,serviceType: this.serviceType},{emulateJSON : true}).then(function (res){
							_this.rreturn = res.body;
							if(_this.rreturn.succ == false){
								this.$message({
									showClose: true,
									message: '输入有误请重新检查！',
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
									_this.$router.push({name: 'index', query: {}});
								},1000)
							}
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
.carVerification_main{
	.top_title{
		width: 100%; height: 1rem; background: #006cb7; position: fixed; left: 0; top: 0; z-index: 99;
		.top_back{ width: 0.66rem; height: 0.66rem; position: absolute; left: 0.24rem; top: 0.17rem; }
		.top_word{ line-height: 1rem; text-align: center; font-size: 0.32rem; color: #fff; }
	}
	.carVerification_con{
		padding-top: 1rem; min-height: 10.26rem;
		.carVerification_c{ padding: 0.2rem 0; background: #fff; }
		.con_background{ display: block; width: 100%; height: 100%; padding-bottom: 0.2rem; }
		.con_bigRow{
			height: 0.6rem; border-left: 0.2rem solid #006cb7;
			.con_littitle{ width: 2.4rem; height: 0.6rem; line-height: 0.6rem; text-align: center; font-size: 0.28rem; color: #000; }
			.con_title{ height: 0.6rem; line-height: 0.6rem; font-size: 0.28rem; color: #000; }
		}
		.con_littleRow{
			padding: 0 0.2rem; position: relative; z-index: 0;
			.littlerow{ display: block; height: 0.8rem; position: relative; }
			.con_littitle{ width: 2.4rem; line-height: 0.8rem; text-align: center; font-size: 0.28rem; color: #000; }
			.text{ float: left; margin-top: 0.1rem; width: 4rem; height: 0.6rem; line-height: 0.6rem; text-indent: 0.1rem; font-size: 0.28rem; background: #fff; border: 1px solid #cbcbcb; border-radius: 0.1rem; outline: medium; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
			.namehint{ padding-left: 0.1rem; height: 0.8rem; line-height: 0.8rem; font-size: 0.2rem; color: red; }
		}
		.con_button{ display: block; margin: 0.4rem auto 0; width: 6.9rem; height: 0.8rem; line-height: 0.8rem; text-align: center; font-size: 0.34rem; color: #fff; background: #006cb7; border-radius: 0.1rem; position: relative; z-index: -1; }
	}
	.logo{
		width: 100%; height: 0.48rem; background: #f0f0f0;
		img{ display: block; margin: 0 auto; width: 1.704rem; height: 0.48rem; }
	}
	.bottom_button{
		width: 100%; height: 1rem; line-height: 1rem; background: #fff; position: fixed; left: 0; bottom: 0; z-index: 50;
		.button_home{ width: 2rem; text-align: center; font-size: 0.26rem; color: #000; }
		.button_indent{ width: 2rem; text-align: center; font-size: 0.26rem; color: #000; }
	}
}
</style>