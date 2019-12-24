<template>
	<div class="salesman_main">
		<!--顶部导航-->
		<div class="top_title">
			<router-link to="index">
				<img class="top_back" src="static/image/back.png">
			</router-link>
			<div class="top_word">业务员专属功能</div>
		</div>
		<!--正文-->
		<div class="salesman_content">
			<ul class="con_bigRow fix">
				<li>
					<ul class="con_littleRow fix">
						<li class="fix">
							<div class="con_moudel fl">
								<router-link :to='{path: "services1", query: {id: "SI001_01"}}'>
									<img class="moudel_img" src="static/image/srow1_1.png">
									<p class="moudel_word">代报案</p>
									<!-- <p class="moudel_num">{{num1}}</p> -->
								</router-link>
							</div>
							<div class="con_moudel fl">
								<router-link :to='{path: "services2", query: {id: "SI049"}}'>
									<img class="moudel_img" src="static/image/srow1_2.png">
									<p class="moudel_word">代申领服务</p>
									<!-- <p class="moudel_num">{{num2}}</p> -->
								</router-link>
							</div>
						</li>
					</ul>
				</li>
			</ul>
			<!--logo-->
			<div class="logo">
				<img src="static/image/logo.png">
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
			num1: '',
			num2: '',
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
.salesman_main{
	background: #fff;
	.top_title{
		width: 100%; height: 1rem; background: #006cb7; position: fixed; left: 0; top: 0; z-index: 99;
		.top_back{ width: 0.66rem; height: 0.66rem; position: absolute; left: 0.24rem; top: 0.17rem; }
		.top_word{ line-height: 1rem; text-align: center; font-size: 0.32rem; color: #fff; }
	}
	.salesman_content{
		padding-top: 1rem;
		.con_bigRow{
			li{ padding-top: 0.2rem; position: relative; }
		}
		.con_littleRow{
			padding: 0 0.3rem;
			li{ padding-bottom: 0.2rem; border-bottom: 2px solid #eaeaea; }
			li+li{ padding-top: 0.2rem; }
			.con_moudel{
				width: 1.2rem; position: relative;
				+.con_moudel{ padding-left: 0.6rem; }
			}
			.moudel_img{ width: 1.2rem; height: 1.2rem;  }
			.moudel_word{ line-height: 0.4rem; text-align: center; font-size: 0.24rem; color: #006cb7; }
			.moudel_num{ width: 0.4rem; height: 0.4rem; line-height: 0.4rem; text-align: center; font-size: 0.24rem; color: #fff; background: #d86445; border-radius: 50%; position: absolute; right: 0; top: 0; }
		}
		.logo{
			width: 100%; height: 0.48rem; background: #f0f0f0; position: fixed; left: 0; bottom: 1.6rem; z-index: 50;
			img{ display: block; margin: 0 auto; width: 1.704rem; height: 0.48rem; }
		}
	}
}
</style>