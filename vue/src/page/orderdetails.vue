<template>
	<div class="orderdetails_main">
		<!--顶部导航-->
		<div class="top_title">
			<router-link to="myorder">
				<img class="top_back" src="static/image/back.png">
			</router-link>
			<div class="top_word">我的服务</div>
		</div>
		<!--正文-->
		<div class="orderdetails_con">
			<img class="con_background" :src="bannerImg">
			<div class="con_bigRow fix">
				<div class="con_littitle">您已成功申请以下服务，请耐心等待救援</div>
			</div>
			<div class="con_littleRow">
				<div class="rows fix">
					<div class="con_littitle fl">服务项目</div>
					<div class="con_title fl">{{name}}</div>
				</div>
				<div class="rows fix">
					<div class="con_littitle fl">申请时间</div>
					<div class="con_title fl">{{time}}</div>
				</div>
				<div class="rows fix">
					<div class="con_littitle fl">服务状态</div>
				</div>
				<div v-show="carServ1" class="rows fix" id="carServ1">
					<div class="con_img fl"><img src="static/image/yes.png"></div>
					<div class="con_title fl">派单</div>
				</div>
				<div v-show="carServ11" class="rows fix" id="carServ1">
					<div class="con_img fl"><img src="static/image/yes.png"></div>
					<div @click="toServ()" class="con_title1 fl">派单</div>
				</div>
				<div v-show="carServ2" id="carServ2">
					<div class="rows fix">
						<div class="con_img fl"><img src="static/image/yes.png"></div>
						<div class="con_title fl">接单</div>
					</div>
					<div class="rows fix">
						<div class="con_img fl"></div>
						<div class="con_title fl">服务人员：{{servman}}</div>
					</div>
					<div class="rows fix">
						<div class="con_img fl"></div>
						<div class="con_title fl">服务电话：{{servtel}}</div>
					</div>
				</div>
				<div v-show="carServ22" id="carServ2">
					<div class="rows fix">
						<div class="con_img fl"><img src="static/image/yes.png"></div>
						<div @click="toServ()" class="con_title1 fl">接单</div>
					</div>
					<div class="rows fix">
						<div class="con_img fl"></div>
						<div class="con_title fl">服务人员：{{servman}}</div>
					</div>
					<div class="rows fix">
						<div class="con_img fl"></div>
						<div class="con_title fl">服务电话：{{servtel}}</div>
					</div>
				</div>
				<div v-show="carServ3" class="rows fix" id="carServ3">
					<div class="con_img fl"><img src="static/image/yes.png"></div>
					<div class="con_title fl">到现场</div>
				</div>
				<div v-show="carServ33" class="rows fix" id="carServ3">
					<div class="con_img fl"><img src="static/image/yes.png"></div>
					<div @click="toServ()" class="con_title1 fl">到现场</div>
				</div>
				<div v-show="carServ4" class="rows fix" id="carServ4">
					<div class="con_img fl"><img src="static/image/yes.png"></div>
					<div class="con_title fl">完成</div>
					<router-link v-show="evaluateView" :to='{path: "evaluate", query: {id: this.serviceNo}}'>
						<div class="evaluate fl fix"><p class="evaluatep fl">评价</p><img class="evaluateimg fl" src="static/image/evaluate.png"></div>
					</router-link>
				</div>
				<div v-show="carServ5" class="rows fix">
					<div class="con_img fl"><img src="static/image/no.png"></div>
					<div class="con_title fl">已取消</div>
				</div>
			</div>
		</div>
		<!--底部按钮-->
		<div class="bottom_button fix">
			<router-link to="index"><div class="button_home fl">首页</div></router-link>
			<router-link to="myorder"><div class="button_indent fr">我的订单</div></router-link>
		</div>
	</div>
</template>
<script>
import Vue from 'vue'
export default{
	name: 'app',
	data(){
		return{
			serviceNo: '',
			provCode: '',
			returnURL: '',
			orderDetails: '',
			order: '',
			id: '',
			bannerImg: '',
			name: '',
			time: '',
			isEvaluate: '',
			evaluateView: '',
			carServ: '',
			carServ1: true,
			carServ2: true,
			carServ3: true,
			carServ4: true,
			carServ5: '',
			carServ11: false,
			carServ22: false,
			carServ33: false,
			servman: '',
			servtel: '',
		}
	},
	beforeMount(){
		this.$nextTick(function(){
			this.getData();
		});
	},
	created:function(){
		this.serviceNo = this.$route.query.serviceno;
		this.provCode = this.$route.query.provCode;
	},
	mounted(){
		let _this = this;
	},
	methods:{
		getData:function(){
			let _this = this;
			// 初始接口，获取服务商链接
			this.$http.post(Util.ajaxPath.devProductUrl+'jumpURL',{serviceNo: this.serviceNo,provCode: this.provCode},{emulateJSON : true}).then(function (res){
				_this.returnURL = res.body.data.codeUrl;
			});
			// 初始接口，获取服务详情
			this.$http.post(Util.ajaxPath.devProductUrl+'orderDetails',{serviceNo: this.serviceNo},{emulateJSON : true}).then(function (res){
				_this.orderDetails = res.body.data;
				_this.order = _this.orderDetails.myOrderDetails;
				_this.id = _this.order.servItemCode;
				_this.time = _this.order.createTime;
				_this.isEvaluate = _this.order.isEvaluate;
				_this.carServ = _this.order.carServ;
				if(this.id == 'SI001_01'){
					this.name = '故障拖车';
					this.bannerImg = 'static/image/SI001_01.jpg';
				}else if(this.id == 'SI001_02'){
					this.name = '简易维修';
					this.bannerImg = 'static/image/SI001_02.jpg';
				}else if(this.id == 'SI001_03'){
					this.name = '换胎';
					this.bannerImg = 'static/image/SI001_03.jpg';
				}else if(this.id == 'SI001_04'){
					this.name = '援油';
					this.bannerImg = 'static/image/SI001_04.jpg';
				}else if(this.id == 'SI001_05'){
					this.name = '搭电';
					this.bannerImg = 'static/image/SI001_05.jpg';
				}else if(this.id == 'SI001_06'){
					this.name = '其他(困境)';
					this.bannerImg = 'static/image/SI001_01.jpg';
				}else{
					this.name = '事故拖车';
					this.bannerImg = 'static/image/SI001_01.jpg';
				};

				if(this.isEvaluate == '1'){
					this.evaluateView = false;
				}else{
					this.evaluateView = true;
				};
				if(this.carServ.length == '0'){
					$('#carServ1,#carServ2,#carServ3,#carServ4').css('color','#9c9c9c');
					$('#carServ1 img,#carServ2 img,#carServ3 img,#carServ4 img').attr('src','static/image/no.png');
					this.evaluateView = false;
				}else if(this.carServ.length == '1'){
					$('#carServ2,#carServ3,#carServ4').css('color','#9c9c9c');
					$('#carServ2 img,#carServ3 img,#carServ4 img').attr('src','static/image/no.png');
					this.carServ1 = false;
					this.carServ11 = true;
					this.evaluateView = false;
				}else if(this.carServ.length == '2'){
					if(_this.carServ[1].nodetype == '01'){
						this.servman = _this.carServ[1].servman;
						this.servtel = _this.carServ[1].servtel;
						$('#carServ3,#carServ4').css('color','#9c9c9c');
						$('#carServ3 img,#carServ4 img').attr('src','static/image/no.png');
						this.carServ2 = false;
						this.carServ22 = true;
						this.evaluateView = false;
					}else{
						this.carServ2 = false;
						this.carServ3 = false;
						this.carServ4 = false;
						this.carServ5 = true;
					};
				}else if(this.carServ.length == '3'){
					this.servman = _this.carServ[1].servman;
					this.servtel = _this.carServ[1].servtel;
					if(_this.carServ[2].nodetype == '02'){
						$('#carServ4').css('color','#9c9c9c');
						$('#carServ4 img').attr('src','static/image/no.png');
						this.carServ3 = false;
						this.carServ33 = true;
						this.evaluateView = false;
					}else{
						this.carServ3 = false;
						this.carServ4 = false;
						this.carServ5 = true;
					};
				}else if(this.carServ.length == '4'){
					this.servman = _this.carServ[1].servman;
					this.servtel = _this.carServ[1].servtel;
					if(_this.carServ[3].nodetype !== '03'){
						this.carServ4 = false;
						this.carServ5 = true;
					};
				}else if(this.carServ.length == '5'){
					this.servman = _this.carServ[1].servman;
					this.servtel = _this.carServ[1].servtel;
					if(_this.carServ[4].nodetype !== '03'){
						this.carServ4 = false;
						this.carServ5 = true;
					};
				};
			});
		},
		toServ:function(){
			window.location.href = this.returnURL;
		},
	}
}
</script>
<style lang="scss">
.orderdetails_main{
	.top_title{
		width: 100%; height: 1rem; background: #006cb7; position: fixed; left: 0; top: 0; z-index: 99;
		.top_back{ width: 0.66rem; height: 0.66rem; position: absolute; left: 0.24rem; top: 0.17rem; }
		.top_word{ line-height: 1rem; text-align: center; font-size: 0.32rem; color: #fff; }
	}
	.orderdetails_con{
		padding: 1rem 0;
		.con_background{ display: block; width: 100%; height: 100%; padding-bottom: 0.2rem; }
		.con_bigRow{
			height: 0.6rem; border-left: 0.2rem solid #006cb7;
			.con_littitle{ height: 0.6rem; line-height: 0.6rem; text-indent: 0.6rem; font-size: 0.28rem; font-weight: bold; color: #000; }
		}
		.con_littleRow{
			padding: 0 0.2rem;
			.rows{ height: 0.6rem; position: relative; }
			.con_littitle{ width: 2.4rem; height: 0.6rem; line-height: 0.6rem; text-indent: 0.6rem; font-size: 0.28rem; color: #000; }
			.con_title{ height: 0.6rem; line-height: 0.6rem; font-size: 0.28rem; }
			.con_title1{ height: 0.6rem; line-height: 0.6rem; font-size: 0.28rem; color: #006cb7; text-decoration: underline; }
			.con_img{ padding: 0.16rem 0 0 0.6rem; width: 0.8rem; height: 0.32rem; }
			img{ display: block; width: 0.28rem; height: 0.28rem; }
			.evaluatep{ padding-left: 0.6rem; height: 0.6rem; line-height: 0.6rem; font-size: 0.28rem; color: #006cb7; }
			.evaluateimg{ padding: 0.16rem 0 0 0.2rem; }
		}
	}
	.bottom_button{
		width: 100%; height: 1rem; line-height: 1rem; background: #fff; position: fixed; left: 0; bottom: 0; z-index: 99;
		.button_home{ width: 2rem; text-align: center; font-size: 0.26rem; color: #000; }
		.button_indent{ width: 2rem; text-align: center; font-size: 0.26rem; color: #000; }
	}
}
</style>