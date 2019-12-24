<template>
	<div class="replace_main">
		<!--顶部导航-->
		<div class="top_title">
			<router-link to="salesman">
				<img class="top_back" src="static/image/back.png">
			</router-link>
			<div class="top_word">业务员代申领功能</div>
		</div>
		<!--正文-->
		<div class="replace_content">
			<div class="replace_c">
				<div class="con_bigRow fix">
					<div class="con_littitle fl">我的客户</div>
				</div>
				<input type="text" class="con_text fl" placeholder="单行输入" v-model="No" maxlength="8">
			</div>
			<!--logo-->
			<div class="logo">
				<img src="static/image/logo.png">
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
			No: '',
		}
	},
	beforeMount(){
		this.$nextTick(function(){
			this.getData();
		});
	},
	mounted(){
	},
	methods:{
		getData:function(){
			let _this = this;
		},
	}
}
</script>
<style lang="scss">
.replace_main{
	.top_title{
		width: 100%; height: 1rem; background: #006cb7; position: fixed; left: 0; top: 0; z-index: 99;
		.top_back{ width: 0.66rem; height: 0.66rem; position: absolute; left: 0.24rem; top: 0.17rem; }
		.top_word{ line-height: 1rem; text-align: center; font-size: 0.32rem; color: #fff; }
	}
	.replace_content{
		padding-top: 1rem;
		.replace_c{ padding: 0.2rem 0; min-height: 9.86rem; }
		.con_bigRow{
			height: 0.6rem; border-left: 0.2rem solid #006cb7;
			.con_littitle{ width: 2.4rem; height: 0.6rem; line-height: 0.6rem; text-align: center; font-size: 0.28rem; color: #000; }
		}
		.con_text{ margin: 0 0.3rem; width: 6.88rem; height: 0.6rem; line-height: 0.6rem; text-indent: 0.2rem; border: 1px solid #a8a3a8; }
		.logo{
			width: 100%; height: 0.48rem; background: #f0f0f0;
			img{ display: block; margin: 0 auto; width: 1.704rem; height: 0.48rem; }
		}
	}
	.bottom_button{
		width: 100%; height: 1rem; line-height: 1rem; background: #fff; position: fixed; left: 0; bottom: 0; z-index: 50;
		.button_home{ width: 2rem; text-align: center; font-size: 0.26rem; color: #000; }
		.button_indent{ width: 2rem; text-align: center; font-size: 0.26rem; color: #000; }
	}
}
</style>