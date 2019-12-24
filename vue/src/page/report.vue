<template>
	<div class="report_main">
		<!--顶部导航-->
		<div class="top_title">
			<router-link to="index">
				<img class="top_back" src="static/image/back.png">
			</router-link>
			<div class="top_word">车主服务平台</div>
		</div>
		<!--正文-->
		<div class="report_con">
			<div>尊敬的客户，您的报案已受理！</div>
			<button @click="toRegistNo()" class="toRegistNo1"><span>报案号：</span><span class="colorbule">{{registNo}}</span></button>
			<div>服务已派单！</div>
			<button @click="toServiceNo()"><span>服务编号：</span><span class="colorbule">{{serviceNo}}</span></button>
			<p>如有疑问请拨打<a href="tel:95589">95589</a></p>
		</div>
		<!--弹窗-->
		<div v-show="registView" class="registView">
			<div class="registrow">
				<div class="registword">正在处理数据，请稍等！</div>
				<div class="registword">请{{times}}秒后重新点击！</div>
				<div @click="registView = false" class="registclose">关闭</div>
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
			registNo: '',
			serviceNo: '',
			url: '',

			registView: false,

			index: '',
			times: '',
		}
	},
	created(){
		this.registNo = this.$route.query.registNo;
		this.serviceNo = this.$route.query.serviceNo;
		this.url = this.$route.query.url;
	},
	mounted(){
		let _this = this;
		// 单纯分钟和秒倒计时
		function resetTime(time){
			var timer = null;
			var t = time;
			var m = 0;
			var s = 0;
			m = Math.floor(t / 60 % 60);
			m < 10 && (m = '0' + m);
			s = Math.floor(t % 60);
			function countDown(){
				s --;
				s < 10 && (s = '0' + s);
				if(s.length >= 3){
					s = 59;
					m = "0" + (Number(m) - 1);
				}
				if(m.length >= 3){
					m = '00';
					s = '00';
					clearInterval(timer);
				}
				// console.log(m + "分钟" + s + "秒");
				if(s == 0){
					_this.index = 1;

				}
				// 倒计时显示
				_this.times = s;
			}
			timer = setInterval(countDown,1000);
		}
		resetTime(10);
	},
	methods:{
		toRegistNo:function(elem){
			if(this.index == 1){
				window.location.href="/wxweb/claim/case/caseInfoPage?reportNo="+this.registNo;
			}else{
				this.registView = true;
			}
		},
		toServiceNo:function(){
			window.location.href=this.url;
		}
	}
}
</script>
<meta name="format-detection" content="telephone=yes"/>
<style lang="scss">
.report_main{
	.top_title{
		width: 100%; height: 1rem; background: #006cb7; position: fixed; left: 0; top: 0; z-index: 99;
		.top_back{ width: 0.66rem; height: 0.66rem; position: absolute; left: 0.24rem; top: 0.17rem; }
		.top_word{ line-height: 1rem; text-align: center; font-size: 0.32rem; color: #fff; }
	}
	.report_con{
		padding: 1.6rem 0.24rem 0;
		div,button{ line-height: 0.6rem; font-size: 0.28rem; color: #000; }
		.colorbule{ color: #00f; }
		p{ width: 100%; height: 0.6rem; line-height: 0.6rem; text-align: center; font-size: 0.28rem; color: #000; position: fixed; left: 0; top: 50%; z-index: 10; }
	}
	.registView{
		width: 100%; height: 100%; position: fixed; left: 0; top: 0; z-index: 99;
		.registrow{ margin: -1.5rem 0 0 -3rem; padding-top: 0.5rem; width: 6rem; height: 2.5rem; background: #fff; border: 1px solid #cbcbcb; border-radius: 0.4rem; position: fixed; left: 50%; top: 50%; z-index: 99; }
		.registword{ line-height: 0.6rem; text-align: center; font-size: 0.36rem; }
		.registclose{ margin: 0 auto; width: 1.6rem; height: 0.8rem; line-height: 0.8rem; text-align: center; font-size: 0.36rem; color: #fff; background: #006cb7; border-radius: 0.2rem; }
	}
}
</style>