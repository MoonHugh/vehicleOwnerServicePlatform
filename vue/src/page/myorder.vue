<template>
	<div class="myorder_main">
		<!--顶部导航-->
		<div class="top_title">
			<router-link to="index">
				<img class="top_back" src="static/image/back.png">
			</router-link>
			<div class="top_word">我的服务</div>
		</div>
		<!--正文-->
		<div class="selectcarno">
			<div @click="selectCarNo()">
				<img class="selectcarnoimg fr" src="static/image/to_gray.png">
				<input type="text" class="carno fr" v-model="carNo" onfocus="this.blur()">
			</div>
		</div>
		<div class="myorder_content">
			<div v-show="hint" class="hint">没有订单</div>
			<div class="order1" v-show="order1">
				<div class="title fix">
					<img class="titleimg fl" src="static/image/title.png">
					<p class="titlep fl">进行中</p>
				</div>
				<div class="rows fix" v-for="item in plate1">
					<router-link :to='{path: "orderdetails", query: {serviceno: item.serviceno,provCode: item.provCode}}'>
						<div class="con_bigRow fix">
							<div class="con_littitle fl">服务项目：</div>
							<div class="con_title fl">{{item.rescueitem}}</div>
							<div class="ckdd">查看详情</div>
						</div>
						<div class="con_littleRow">
							<div class="con_littitle fl">申请时间：</div>
							<div class="con_title fl">{{item.createdtime}}</div>
						</div>
						<div class="con_littleRow">
							<div class="con_littitle fl">最新进度：</div>
							<div class="con_title fl blue">{{item.providerstate}}</div>
						</div>
					</router-link>
				</div>
			</div>
			<div v-show="hint1" class="hint">没有进行中订单</div>
			<div class="order2" v-show="order2">
				<div class="title fix">
					<img class="titleimg fl" src="static/image/title.png">
					<p class="titlep fl">历史订单</p>
				</div>
				<div class="rows fix" v-for="item in plate2">
					<router-link :to='{path: "orderdetails", query: {serviceno: item.serviceno,provCode: item.provCode}}'>
						<div class="con_bigRow fix">
							<div class="con_littitle fl">服务项目：</div>
							<div class="con_title fl">{{item.rescueitem}}</div>
							<div class="ckdd">查看详情</div>
						</div>
						<div class="con_littleRow">
							<div class="con_littitle fl">申请时间：</div>
							<div class="con_title fl">{{item.createdtime}}</div>
						</div>
						<div class="con_littleRow">
							<div class="con_littitle fl">最新进度：</div>
							<div class="con_title fl blue">{{item.providerstate}}</div>
						</div>
					</router-link>
				</div>
			</div>
			<div v-show="hint2" class="hint">没有历史订单</div>
			<div class="logo">
				<img src="static/image/logo.png">
			</div>
		</div>
		<!--底部按钮-->
		<div class="bottom_button fix">
			<router-link to="index"><div class="button_home fl">首页</div></router-link>
			<div class="button_indent fr">我的订单</div>
		</div>
	</div>
</template>
<script>
import Vue from 'vue'
export default{
	name: 'app',
	data(){
		return{
			plate: '',
			plate1: '',
			plate2: '',
			carNo: '',
			order1: true,
			order2: true,
			hint: false,
			hint1: false,
			hint2: false,
		}
	},
	beforeMount(){
		this.$nextTick(function(){
			this.getData();
		});
	},
	created(){
	},
	mounted(){
		let _this = this;
		// this.$router.push({name: 'orderdetails', query: {id: serviceno}});
	},
	methods:{
		getData:function(){
			let _this = this;
			// 初始接口，获取我的服务列表
			this.$http.post(Util.ajaxPath.devProductUrl+'myOrderSelect',{carNo: this.carNo},{emulateJSON : true}).then(function (res){
				_this.plate = res.body.data;
				if(_this.plate == null){
					this.hint = true;
					this.order1 = false;
					this.order2 = false;
				}else{
					if(_this.plate.car.wwcMap == null){
						this.order1 = false;
						this.hint1 = true;
						this.carNo = _this.plate.car.ywcMap[0].carNo;
					}else if(_this.plate.car.ywcMap == null){
						this.order2 = false;
						this.hint2 = true;
						this.carNo = _this.plate.car.wwcMap[0].carNo;
					}else if(_this.plate.car.wwcMap !== null && _this.plate.car.ywcMap !== null){
						this.carNo = _this.plate.car.wwcMap[0].carNo;
					};
					_this.plate1 = _this.plate.car.wwcMap;
					_this.plate2 = _this.plate.car.ywcMap;
				};
			});
		},
		selectCarNo:function(){
			let _this = this;
			this.$prompt('请输入车牌','提示',{
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				inputPattern: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,
				inputErrorMessage: '车牌格式不正确'
			}).then(({ value }) => {
				this.$message({
					type: 'success',
					message: '你的车牌是: ' + value
				});
				this.carNo = value;
				this.$http.post(Util.ajaxPath.devProductUrl+'searchCar',{carNo: this.carNo},{emulateJSON : true}).then(function (res){
					_this.plate = res.body.data;
					if(_this.plate == null){
						this.hint = true;
						this.order1 = false;
						this.order2 = false;
					}else{
						this.order1 = true;
						this.order2 = true;
						this.hint = false;
						this.hint1 = false;
						this.hint2 = false;
						if(_this.plate.car.wwcMap == null){
							this.order1 = false;
							this.hint1 = true;
						}else if(_this.plate.car.ywcMap == null){
							this.order2 = false;
							this.hint2 = true;
						};
						_this.plate1 = _this.plate.car.wwcMap;
						_this.plate2 = _this.plate.car.ywcMap;
					};
				});
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '取消输入'
				});
			});
		}
	}
}
</script>
<style lang="scss">
.myorder_main{
	.top_title{
		width: 100%; height: 1rem; background: #006cb7; position: fixed; left: 0; top: 0; z-index: 99;
		.top_back{ width: 0.66rem; height: 0.66rem; position: absolute; left: 0.24rem; top: 0.17rem; }
		.top_word{ line-height: 1rem; text-align: center; font-size: 0.32rem; color: #fff; }
	}
	.selectcarno{
		width: 100%; height: 0.88rem; background: #f0f0f0; position: fixed; left: 0; top: 1rem; z-index: 99;
		.selectcarnoimg{ display: block; padding: 0.24rem 0.2rem 0 0.1rem; width: 0.4rem; height: 0.4rem; }
		.carno{ display: block; width: 2.4rem; height: 0.88rem; line-height: 0.9rem; text-align: right; text-decoration: underline; font-size: 0.36rem; color: #000; background: #f0f0f0; }
	}
	.myorder_content{
		padding: 1.88rem 0 1rem;
		.order2{ padding-top: 0.4rem; }
		.title{ margin: 0 auto; width: 6.76rem; height: 0.8rem; background: #006cb7; border-radius: 0.16rem; }
		.titleimg{ display: block; padding: 0.2rem; width: 0.4rem; height: 0.4rem; }
		.titlep{ height: 0.8rem; line-height: 0.82rem; font-size: 0.28rem; color: #fff; }
		.rows{ padding-top: 0.28rem; }
		.con_bigRow{
			height: 0.6rem; border-left: 0.2rem solid #006cb7; position: relative;
			.con_littitle{ height: 0.6rem; line-height: 0.6rem; text-indent: 0.4rem; font-size: 0.28rem; color: #000; }
			.con_title{ height: 0.6rem; line-height: 0.6rem; font-size: 0.28rem; color: #000; }
			.ckdd{ display: block; width: 1.88rem; height: 0.48rem; line-height: 0.5rem; text-align: center; font-size: 0.3rem; color: #fff; background: #006cb7; border-radius: 0.1rem; position: absolute; left: 3.6rem; top: 0.04rem; }
		}
		.con_littleRow{
			 height: 0.6rem; margin: 0 0.2rem; position: relative;
			.con_littitle{ height: 0.6rem; line-height: 0.6rem; text-indent: 0.4rem; font-size: 0.28rem; color: #000; }
			.con_title{ height: 0.6rem; line-height: 0.6rem; font-size: 0.28rem; color: #000; }
			.blue{ color: #006cb7; }
		}
		.con_littleRow:last-child{ padding-bottom: 0.28rem; border-bottom: 1px dashed #adadad; }
		.logo{
			padding: 0.8rem 0 0.4rem; width: 100%; height: 0.48rem; background: #f0f0f0;
			img{ display: block; margin: 0 auto; width: 1.704rem; height: 0.48rem; }
		}
		.hint{ line-height: 1rem; text-align: center; font-size: 0.36rem; }
	}
	.bottom_button{
		width: 100%; height: 1rem; line-height: 1rem; background: #fff; position: fixed; left: 0; bottom: 0; z-index: 99;
		.button_home{ width: 2rem; text-align: center; font-size: 0.26rem; color: #000; }
		.button_indent{ width: 2rem; text-align: center; font-size: 0.26rem; color: #000; }
	}
}
</style>