<template>
	<div class="evaluate_main">
		<!--顶部导航-->
		<div class="top_title">
			<router-link :to='{path: "orderdetails", query: {id: this.serviceNo}}'>
				<img class="top_back" src="static/image/back.png">
			</router-link>
			<div class="top_word">我的服务</div>
		</div>
		<!--正文-->
		<div class="evaluate_con">
			<div class="con_top">
				<img class="con_topimg" src="static/image/con_top.png">
				<ul class="con_topul fix">
					<li>案件受理</li>
					<li>师傅接单</li>
					<li>师傅到达</li>
					<li>服务完成</li>
				</ul>
			</div>
			<div class="con_middle">
				<img v-show="a1" @click="a11()" class="con_middleimg" src="static/image/praise01.png">
				<img v-show="a2" @click="a22()" class="con_middleimg" src="static/image/praise02.png">
				<p>服务完成，给师傅点个赞吧</p>
				<p>{{createTime}} 用时{{totalTime}}分钟</p>
				<div class="con_praise fix">
					<div class="demonstration fl">给服务员评价</div>
					<el-rate class="demonstrationstar fr" v-model="value" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate>
				</div>
			</div>
			<div class="con_bottom">
				<textarea placeholder="请写下对本次服务的感受吧，对他人帮助很大哦" v-model="evaluateContent" maxlength="200"></textarea>
			</div>
			<div class="con_buttonbig">
				<div class="con_button" @click="onSubmit()">发表评价</div>
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
			serviceNo: '',
			value: '',
			evaluateContent: '',
			orderDetails: '',
			createTime: '',
			totalTime: '',
			order: '',
			a1: true,
			a2: false,
		}
	},
	beforeMount(){
		this.$nextTick(function(){
			this.getData();
		});
	},
	created(){
		this.serviceNo = this.$route.query.id;
	},
	mounted(){
		let _this = this;
	},
	methods:{
		getData:function(){
			let _this = this;
			// 初始接口，获取服务详情
			this.$http.post(Util.ajaxPath.devProductUrl+'orderDetails',{serviceNo: this.serviceNo},{emulateJSON : true}).then(function (res){
				_this.orderDetails = res.body.data;
				_this.createTime = _this.orderDetails.myOrderDetails.createTime;
				_this.totalTime = _this.orderDetails.myOrderDetails.totalTime;
			});
		},
		a11:function(){
			this.a2 = true;
			this.a1 = false;
		},
		a22:function(){
			this.a1 = true;
			this.a2 = false;
		},
		onSubmit:function(){
			let _this = this;
			// 提交评价
			if(this.value == '0'){
				this.$message({
					showClose: true,
					message: '请填写完整评价！',
					type: 'warning',
					center: true
				});
			}else{
				this.$http.post(Util.ajaxPath.devProductUrl+'servEvaluate',{serviceNo: this.serviceNo,evaluate: this.value,evaluateContent: this.evaluateContent},{emulateJSON : true}).then(function (res){
					_this.order = res.body;
					if(_this.order.succ == true){
						this.$message({
							showClose: true,
							message: _this.order.data.myEvaluate,
							type: 'success',
							center: true
						});
						setTimeout(function(){
							_this.$router.push({name: 'index'});
						},1000)
					}else{
						this.$message({
							showClose: true,
							message: _this.order.errMsg,
							type: 'warning',
							center: true
						});
					};
				});
			};
		},
	}
}
</script>
<style lang="scss">
.evaluate_main{
	.top_title{
		width: 100%; height: 1rem; background: #006cb7; position: fixed; left: 0; top: 0; z-index: 99;
		.top_back{ width: 0.66rem; height: 0.66rem; position: absolute; left: 0.24rem; top: 0.17rem; }
		.top_word{ line-height: 1rem; text-align: center; font-size: 0.32rem; color: #fff; }
	}
	.evaluate_con{
		padding-top: 1rem;
		.con_top{ height: 1.52rem; border-bottom: 1px solid #d5d5d5; }
		.con_topimg{ display: block; margin: 0 auto; padding-top: 0.2rem; width: 6.4rem; height: 0.8rem; }
		.con_topul{
			margin: 0 auto; width: 7.44rem;
			li{ float: left; padding-top: 0.12rem; width: 1.86rem; line-height: 0.2rem; text-align: center; font-size: 0.2rem; color: #006cb7; }
		}
		.con_middle{
			height: 5.76rem; background: #fff; border-bottom: 1px solid #d5d5d5;
			p{ padding-bottom: 0.3rem; line-height: 0.26rem; text-align: center; font-size: 0.26rem; color: #000; }
		}
		.con_middleimg{ display: block; margin: 0 auto; padding: 0.5rem 0 0.3rem; width: 2.62rem; height: 2.62rem; }
		.con_praise{ padding: 0.3rem 0.24rem 0; }
		.demonstration{ line-height: 0.28rem; font-size: 0.28rem; color: #000; }
		.demonstrationstar{ margin-top: -0.2rem; }
		.con_bottom{
			margin-top: 0.26rem; height: 2rem; background: #fff;
			textarea{ width: 100%; height: 2rem; line-height: 0.52rem; text-indent: 0.24rem; font-size: 0.3rem; }
		}
		.con_buttonbig{ width: 100%; background: #fff; position: fixed; left: 0; bottom: 0; z-index: 10; }
		.con_button{ margin: 0.2rem auto; width: 6.9rem; height: 0.8rem; line-height: 0.8rem; text-align: center; font-size: 0.34rem; color: #fff; background: #0170c2; border-radius: 0.1rem; }
	}
}
</style>