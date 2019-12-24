<template>
	<div class="index_main">
		<!--顶部导航-->
		<div class="top_title">
			<div class="top_word">车主服务平台</div>
		</div>
		<!--正文-->
		<div class="home_content">
			<ul class="con_bigRow fix">
				<li v-show="carInformation">
					<div class="con_title">我的服务</div>
					<div class="con_bword">暂无服务</div>
					<div class="con_mask">
						<div @click="maskWord()" class="con_maskword">绑定投保车辆</div>
					</div>
				</li>
				<li v-show="services" class="li_services">
					<div class="con_title con_title2">我的服务（{{carNo}}{{frameNo}}）</div>
					<ul class="li_servicesul fix">
						<li>
							<img src="static/image/row1_1.png">
							<p>{{servitem1}}</p>
							<p>剩余{{servtime1}}</p>
						</li>
						<li>
							<img src="static/image/row1_12.png">
							<p>{{servitem2}}</p>
							<p>剩余{{servtime2}}</p>
						</li>
						<li>
							<img src="static/image/row1_13.png">
							<p>{{servitem3}}</p>
							<p>剩余{{servtime3}}</p>
						</li>
					</ul>
				</li>
				<li class="fix">
					<div class="con_title">道路救援</div>
					<ul class="con_littleRow fix">
						<li class="fix">
							<div class="con_moudel fl">
								<router-link :to='{path: "services1", query: {id: "SI001_01"}}'>
									<img class="moudel_img" src="static/image/row1_1.png">
									<p class="moudel_word">故障拖车</p>
								</router-link>
							</div>
							<div class="con_moudel fl">
								<router-link :to='{path: "services2", query: {id: "SI049"}}'>
									<img class="moudel_img" src="static/image/row1_2.png">
									<p class="moudel_word">事故拖车</p>
								</router-link>
							</div>
						</li>
						<li class="fix">
							<div class="con_moudel fl">
								<router-link :to='{path: "services1", query: {id: "SI001_03"}}'>
									<img class="moudel_img" src="static/image/row2_1.png">
									<p class="moudel_word">换胎</p>
								</router-link>
							</div>
							<div class="con_moudel fl">
								<router-link :to='{path: "services1", query: {id: "SI001_04"}}'>
									<img class="moudel_img" src="static/image/row2_2.png">
									<p class="moudel_word">援油</p>
								</router-link>
							</div>
							<div class="con_moudel fl">
								<router-link :to='{path: "services1", query: {id: "SI001_05"}}'>
									<img class="moudel_img" src="static/image/row2_3.png">
									<p class="moudel_word">搭电</p>
								</router-link>
							</div>
						</li>
					</ul>
				</li>
				<!-- <li>
					<div class="con_title">用车生活</div>
					<ul class="con_littleRow fix">
						<li class="fix">
							<div class="con_moudel fl">
								<a href="/wxweb/car/serv/repairs">
									<img class="moudel_img" src="static/image/row3_1.png">
									<p class="moudel_word">保养</p>
								</a>
							</div>
							<div class="con_moudel fl">
								<a href="/wxweb/car/serv/repairs">
									<img class="moudel_img" src="static/image/row3_2.png">
									<p class="moudel_word">洗车</p>
								</a>
							</div>
							<div class="con_moudel fl">
								<a href="/wxweb/car/serv/repairs">
									<img class="moudel_img" src="static/image/row3_3.png">
									<p class="moudel_word">钣金喷漆</p>
								</a>
							</div>
						</li>
					</ul>
				</li> -->
			</ul>
		</div>
		<!--logo-->
		<div class="logo">
			<img src="static/image/logo.png">
		</div>
		<!--底部按钮-->
		<div class="bottom_button fix">
			<router-link to="/"><div class="button_home fl">首页</div></router-link>
			<router-link to="myorder"><div class="button_indent fr">我的订单</div></router-link>
		</div>
		<!--业务员按钮-->
		<!-- <div class="green_button">
			<router-link to="Salesman">
				<img class="green_img" src="static/image/green_button.png">
				<p>业务员功能</p>
			</router-link>
		</div> -->
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
			carInformation: '',
			services: '',
			rreturn1: '',
			rreturn2: '',
			rreturn3: '',
			carNo: '',
			frameNo: '',
			servitem1: '',
			servitem2: '',
			servitem3: '',
			servtime1: '',
			servtime2: '',
			servtime3: '',
		}
	},
	beforeMount(){
		this.$nextTick(function(){
			this.getData();
		});
	},
	created(){
		this.lat = window.localStorage.getItem('lat');
		this.lng = window.localStorage.getItem('lng');
	},
	mounted(){
	},
	methods:{
		getData:function(){
			let _this = this;
			// 初始接口，是否绑定车牌
			this.$http.post(Util.ajaxPath.devProductUrl2+'searchCarNo',{emulateJSON : true}).then(function (res){
				_this.rreturn1 = res.body;
				if(_this.rreturn1.succ == false){
					this.carInformation = true;
					this.services = false;
				}else{
					this.carInformation = false;
					this.services = true;
					_this.rreturn2 = _this.rreturn1.data.checkServ;
					_this.carNo = _this.rreturn1.data.carNo;
					_this.frameNo = _this.rreturn1.data.frameNo;
					this.servitem1 = _this.rreturn2[0].servitem;
					this.servitem2 = _this.rreturn2[1].servitem;
					this.servitem3 = _this.rreturn2[2].servitem;
					if (this.rreturn2[0].servtime > 9){
						this.servtime1 = '9次+';
					}else{
						this.servtime1 = this.rreturn2[0].servtime+'次';
					};
					if (this.rreturn2[1].servtime > 9){
						this.servtime2 = '9次+';
					}else{
						this.servtime2 = this.rreturn2[1].servtime+'次';
					};
					if (this.rreturn2[2].servtime > 9){
						this.servtime3 = '9次+';
					}else{
						this.servtime3 = this.rreturn2[2].servtime+'次';
					};
				};
			});
		},
		maskWord:function(){
			let _this = this;
			// 初始接口，是否绑定有效车险保单
			this.$http.post(Util.ajaxPath.devProductUrl2+'userInfo',{emulateJSON : true}).then(function (res){
				_this.rreturn3 = res.body;
				if(_this.rreturn3.succ == false){
					_this.$router.push({name: 'information', query: {id: "C001"}});
				}else{
					if(_this.rreturn3.data.carList == ''){
						_this.$router.push({name: 'carInformation', query: {id: 0}});
					}else{
						_this.$router.push({name: 'carInformation', query: {id: 1}});
					}
				};
			});
		}
	}
}
</script>
<style lang="scss">
.index_main{
	.top_title{
		width: 100%; height: 1rem; background: #006cb7; position: fixed; left: 0; top: 0; z-index: 99;
		.top_back{ width: 0.66rem; height: 0.66rem; position: absolute; left: 0.24rem; top: 0.17rem; }
		.top_word{ line-height: 1rem; text-align: center; font-size: 0.32rem; color: #fff; }
	}
	.home_content{
		margin-bottom: 1rem; padding-top: 1rem;
		.con_bigRow{
			background: #fff;
			li{ padding-top: 0.2rem; position: relative; }
		}
		.con_title{ height: 0.6rem; line-height: 0.6rem; text-indent: 0.2rem; font-size: 0.26rem; font-weight: bold; color: #000; border-left: 0.2rem solid #006cb7; }
		.con_title2{ color: #fff; }
		.con_bword{ padding: 0 0.3rem; height: 1rem; line-height: 1rem; font-size: 0.36rem; }
		.con_mask{
			width: 100%; height: 1.8rem; background: rgba(0,0,0,0.4); position: absolute; left: 0; top: 0; z-index: 52;
			.con_maskword{ margin: 0.6rem auto 0; width: 2.2rem; height: 0.6rem; line-height: 0.6rem; text-align: center; font-size: 0.24rem; color: #fff; background: #006cb7; border-radius: 0.08rem; }
		}
		.li_services{ background: #949494; }
		.li_servicesul{
			padding: 0 0.2rem 0.3rem;
			li{ float: left; }
			li+li{ padding-left: 0.5rem; }
			img{ width: 1.4rem; height: 1.4rem; }
			p{ width: 1.4rem; line-height: 0.4rem; text-align: center; font-size: 0.28rem; font-weight: bold; color: #fff; }
			p:nth-child(3n){ font-size: 0.24rem; font-weight: normal; }
		}
		.con_littleRow{
			padding: 0 0.3rem;
			li{ padding-bottom: 0.2rem; border-bottom: 2px solid #eaeaea; }
			li+li{ padding-top: 0.2rem; }
			.con_moudel{
				width: 1.2rem; position: relative;
				+.con_moudel{ padding-left: 0.6rem; }
			}
			.moudel_img{ width: 1.2rem; height: 1.2rem; }
			.moudel_word{ line-height: 0.4rem; text-align: center; font-size: 0.24rem; color: #006cb7; }
		}
	}
	.logo{
		margin: 3rem 0 0; padding-bottom: 1.6rem; width: 100%; height: 0.48rem; background: #f0f0f0;
		img{ display: block; margin: 0 auto; width: 1.704rem; height: 0.48rem; }
	}
	.bottom_button{
		width: 100%; height: 1rem; line-height: 1rem; background: #fff; position: fixed; left: 0; bottom: 0; z-index: 50;
		.button_home{ width: 2rem; text-align: center; font-size: 0.26rem; color: #000; }
		.button_indent{ width: 2rem; text-align: center; font-size: 0.26rem; color: #000; }
	}
	.green_button{
		width: 1.6rem; height: 1.6rem; position: fixed; right: 0.2rem; bottom: 1.2rem; z-index: 52;
		.green_img{ display: block; margin: 0 auto; width: 1.2rem; height: 1.2rem; }
		p{ line-height: 0.4rem; text-align: center; font-size: 0.24rem; color: #89c34a; }
	}
}
</style>