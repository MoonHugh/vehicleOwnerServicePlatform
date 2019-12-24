<template>
	<div class="map_main">
		<!--顶部导航-->
		<div class="top_title">
			<img class="top_back" src="static/image/back.png" @click="goback()">
			<div class="top_word">附近修理厂</div>
			<div v-show="togo" class="togo" @click="togoto()">跳过</div>
		</div>
		<!--地图-->
		<div id="container">
			<!--定位-->
			<div class="returnCenter" id="returnCenter"><img src="static/image/navbg.png"></div>
			<!--搜索-->
			<!--故障拖车搜索-->
			<div v-show="search1" class="searchKeyword fix">
				<input id="keyword" type="textbox" value="" placeholder="查找修理厂">
				<div id="searchKeyword">搜索</div>
			</div>
			<!--事故拖车搜索-->
			<div v-show="search2" class="searchKeyword2 fix">
				<input id="keyword2" type="textbox" value="" v-model="repairname" placeholder="查找修理厂">
				<div id="searchKeyword2" @click="searchKeyword2()">搜索</div>
			</div>
		</div>
		<div class="return">
			<div class="updown" @click="updown(1)" v-show="v1"><img src="static/image/down.png"></div>
			<div class="updown" @click="updown(2)" v-show="v2"><img src="static/image/up.png"></div>
			<div class="returnli">
				<!--初始修理厂列表-->
				<ol v-show="l1">
					<li v-for="(item,index) in returnViewLi" @click="reLi(item.latitude,item.longitude,item.repairAddr,index)">
						<div>{{index+1}}.{{item.repairName}}</div>
						<div>{{item.repairAddr}}</div>
					</li>
				</ol>
				<!--故障拖车查询修理厂列表-->
				<ol v-show="l2">
					<li v-for="(item,index) in selectMap" @click="reLi(item.latLng.lat,item.latLng.lng,item.address,index)">
						<div>{{index+1}}.{{item.name}}</div>
						<div>{{item.address}}</div>
					</li>
				</ol>
				<!--事故拖车查询修理厂列表-->
				<ol v-show="l3">
					<li v-for="(item,index) in returnViewLi2" @click="reLi(item.latitude,item.longitude,item.repairAddr,index)">
						<div>{{index+1}}.{{item.repairName}}</div>
						<div>{{item.repairAddr}}</div>
					</li>
				</ol>
				<div v-show="l4" class="l4hint">{{l4hint}}</div>
			</div>
		</div>
		<div v-show="isView" class="isView">
			<div v-show="isrow1" class="isrow">
				<div class="isword">
					<p>故障拖车申请</p>
					<p>是否确认选择该修理厂作为此次故障拖车申请的目的地？</p>
				</div>
				<div class="fixed">
					<div @click="isyes2()" class="isyes isyes2">确定</div>
					<div @click="isView = false" class="isno">取消</div>
				</div>
			</div>
			<div v-show="isrow2" class="isrow">
				<div class="isword">
					<p>事故拖车申请</p>
					<p>是否确认选择该修理厂作为此次事故拖车申请的目的地？</p>
				</div>
				<div class="fixed">
					<div @click="isyes()" class="isyes">确定</div>
					<div @click="isView = false" class="isno">取消</div>
				</div>
			</div>
		</div>
		<div v-show="isView2" class="isView">
			<div class="isrow">
				<div class="isword">
					<p>事故拖车申请</p>
					<p>您已选择事故拖车目的地，确认现在下单吗？</p>
				</div>
				<div class="fixed">
					<div @click="isyes2()" class="isyes isyes2">确定</div>
					<div @click="isView2 = false" class="isno">取消</div>
				</div>
			</div>
		</div>
		<div id="centerDiv"></div>
		<input id="aaa" type="text" v-model="locCity">
	</div>
</template>
<script charset="utf-8" src="http://map.qq.com/api/js?v=2.exp"></script>
<script src="http://open.map.qq.com/apifiles/2/4/84/main.js" type="text/javascript"></script>
<script>
import Vue from 'vue'
export default{
	name: 'app',
	data(){
		return{
			serviceType: '',
			repairname: '',
			carNo: '',
			lat: '',
			lng: '',
			locCity:'',
			uuid: '',
			url: '',
			v1: true,
			v2: false,
			index: '',
			search1: '',
			search2: '',
			togo: '',
			isView: false,
			isView2: false,
			isrow1: '',
			isrow2: '',
			returnView: '',
			returnViewLi: '',
			// returnViewLi: [{repairName: "11111修理厂",repairAddr: "阳光大道阳光大道阳光大道阳光大道阳光大道阳光大道阳光大道",latitude: "22.544205",longitude: "114.040701"}],
			returnView2: '',
			returnViewLi2: '',
			selectLat: '',
			selectLng: '',
			selectAdd: '',
			selecProvince: '',
			selecCity: '',
			selecCun: '',
			returnList1: '',
			returnList2: '',
			registNo: '',
			serviceNo1: '',
			serviceNo2: '',
			url2: '',
			province: '',
			city: '',
			policyNo: '',

			l1: true,
			l2: false,
			l3: false,
			l4: false,
			l4hint: '',
			selectMap: ''
		}
	},
	created(){
		this.lat = this.$route.query.lat;
		this.lng = this.$route.query.lng;
		this.carNo = this.$route.query.carNo;
		this.serviceType = this.$route.query.id;
		this.serviceNo1 = this.$route.query.serviceNo;
		this.uuid = this.$route.query.uuid;
		this.url = this.$route.query.url;
		this.province = this.$route.query.province;
		this.city = this.$route.query.city;
		this.policyNo = this.$route.query.policyNo;
	},
	beforeMount(){
		this.$nextTick(function(){
			this.getData();
		});
	},
	mounted(){
		let _this = this;
		if(this.serviceType == 'SI049'){
			this.togo = false;
			this.search1 = false;
			this.search2 = true;
			this.isrow1 = false;
			this.isrow2 = true;
		}else{
			this.togo = true;
			this.search1 = true;
			this.search2 = false;
			this.isrow1 = true;
			this.isrow2 = false;
		};
	},
	methods:{
		getData:function(){
			let _this = this;
			// 初始接口，获取推荐修理厂
			this.$http.post(Util.ajaxPath.devProductUrl+'repairDepotSearch',{repairname: this.repairname,carNo: this.carNo,lat: this.lat,lng: this.lng,province: this.province,city: this.city},{emulateJSON : true}).then(function (res){
				_this.returnView = res.body;
				if(_this.returnView.succ == false){
					_this.l1 = false;
					_this.l4 = true;
					_this.l4hint = _this.returnView.errMsg;
					// 初始化地图函数  自定义函数名init
					function init(){
						// 定义center 地图中心
						var center = new qq.maps.LatLng(_this.lat,_this.lng);
						// 定义map变量 调用 qq.maps.Map() 构造函数   获取地图显示容器
						var map = new qq.maps.Map(document.getElementById("container"), {
							center: center,
							zoom: 13,
							zoomControl: false,
						});

						setTimeout(function(){
							var anchor = new qq.maps.Point(12, 39),
							size = new qq.maps.Size(26, 36),
							origin = new qq.maps.Point(0, 0),
							scaleSize  = new qq.maps.Size(26, 36),
							icon = new qq.maps.MarkerImage("static/image/marker_red.png",size,origin,anchor,scaleSize);
							// 创建marker
							var marker = new qq.maps.Marker({
								position: center,
								animation:qq.maps.MarkerAnimation.DROP,
								map: map
							});
							marker.setIcon(icon);
						},2000);
						
						// 返回地图当前中心点地理坐标
						centerDiv.innerHTML = "latlng:" + map.getCenter();
						// 当地图中心属性更改时触发事件
						qq.maps.event.addListener(map, 'center_changed', function(){
							centerDiv.innerHTML = "latlng:" + map.getCenter();
						});

						// 返回地图中心
						var returnCenter = document.getElementById("returnCenter");
						// 获取标记的点击事件
						qq.maps.event.addListener(returnCenter, 'click', function(){
							map.setCenter(new qq.maps.LatLng(_this.lat,_this.lng));
						});
						// 故障拖车搜索地址
						var searchKeyword = document.getElementById("searchKeyword");
						qq.maps.event.addListener(searchKeyword, 'click', function(){
							var keyword = document.getElementById("keyword").value;

							// 清除地图上的marker2
							function clearOverlays(overlays){
								var overlay;
								while (overlay = overlays.pop()){
									overlay.setMap(null);
								}
							};
							clearOverlays(markers2);

							// 根据输入的城市设置搜索范围
							// searchService.setLocation("北京");
							// 根据输入的关键字在搜索范围内检索
							searchService.search(keyword);
						});

						var searchService, markers2 = [];
						var latlngBounds = new qq.maps.LatLngBounds();
						// 设置Poi检索服务，用于本地检索、周边检索
						searchService = new qq.maps.SearchService({
							// 设置搜索范围为北京
							location: _this.city,
							// 设置搜索页码为1
							pageIndex: 0,
							// 设置每页的结果数为5
							pageCapacity: 10,
							// 设置展现查询结构到infoDIV上
							// panel: document.getElementById('infoDiv'),
							// 设置动扩大检索区域。默认值true，会自动检索指定城市以外区域。
							autoExtend: true,
							// 检索成功的回调函数
							complete:function(results){
								// 设置回调函数参数
								var pois = results.detail.pois;
								_this.selectMap = pois;
								if(_this.selectMap !== ''){
									_this.l1 = false;
									_this.l2 = true;
									_this.l4 = false;
								};
								for(var i = 0, l = pois.length; i < l; i++){
									var poi = pois[i];
									// 扩展边界范围，用来包含搜索到的Poi点
									latlngBounds.extend(poi.latLng);
									var marker = new qq.maps.Marker({
										map: map,
										position: poi.latLng
									});
									marker.setTitle(i + 1);
									markers2.push(marker);
								}
								// 调整地图视野
								map.fitBounds(latlngBounds);
							},
							// 若服务请求失败，则运行以下函数
							error:function(){
								alert("出错了。");
							}
						});
					}
					init();
				}else{
					_this.l1 = true;
					_this.l4 = false;
					_this.returnViewLi = res.body.data.depotList;
					// 初始化地图函数  自定义函数名init
					function init(){
						// 定义center 地图中心
						var center = new qq.maps.LatLng(_this.lat,_this.lng);
						// 定义map变量 调用 qq.maps.Map() 构造函数   获取地图显示容器
						var map = new qq.maps.Map(document.getElementById("container"), {
							center: center,
							zoom: 13,
							zoomControl: false,
						});

						// 创建marker
						setTimeout(function(){
							var anchor = new qq.maps.Point(12, 39),
							size = new qq.maps.Size(26, 36),
							origin = new qq.maps.Point(0, 0),
							scaleSize  = new qq.maps.Size(26, 36),
							icon = new qq.maps.MarkerImage("static/image/marker_red.png",size,origin,anchor,scaleSize);
							
							var marker = new qq.maps.Marker({
								position: center,
								animation:qq.maps.MarkerAnimation.DROP,
								map: map
							});
							marker.setIcon(icon);
						},2000);

						// 返回地图当前中心点地理坐标
						centerDiv.innerHTML = "latlng:" + map.getCenter();
						// 当地图中心属性更改时触发事件
						qq.maps.event.addListener(map, 'center_changed', function(){
							centerDiv.innerHTML = "latlng:" + map.getCenter();
						});

						// 返回地图中心
						var returnCenter = document.getElementById("returnCenter");
						qq.maps.event.addListener(returnCenter, 'click', function(){
							map.setCenter(new qq.maps.LatLng(_this.lat,_this.lng));
						});

						// 创建多个marker
						var data = [];
						for(var i = 0 ; i < _this.returnViewLi.length; i++){
							var aaa = [_this.returnViewLi[i].latitude,_this.returnViewLi[i].longitude];
							data.push(aaa);
						};
						// console.log(data)

						// 创建多个marker
						// var data = [
						// 	[_this.returnViewLi[0].latitude, _this.returnViewLi[0].longitude],
						// 	[_this.returnViewLi[1].latitude, _this.returnViewLi[1].longitude],
						// ];

						var LatLng = qq.maps.LatLng;
						var MarkerDecoration = qq.maps.MarkerDecoration;
						var Point = qq.maps.Point;
						var Marker = qq.maps.Marker;
						var MVCArray = qq.maps.MVCArray;
						var markers1 = new MVCArray();

						function createCluster(){
							for (var i = 0; i < data.length; i++){
								var latLng = new LatLng(data[i][0], data[i][1]);
								var decoration = new MarkerDecoration(i, new Point(0, -5));
								var marker = new Marker({
									'position':latLng,
									map:map
								});
								markers1.push(marker);
							}
						};
						createCluster();
						
						// 故障拖车搜索地址
						var searchKeyword = document.getElementById("searchKeyword");
						qq.maps.event.addListener(searchKeyword, 'click', function(){
							var keyword = document.getElementById("keyword").value;

							// 清除地图上的marker2
							function clearOverlays(overlays){
								var overlay;
								while (overlay = overlays.pop()){
									overlay.setMap(null);
								}
							};
							clearOverlays(markers1);
							clearOverlays(markers2);

							// 根据输入的城市设置搜索范围
							// searchService.setLocation("北京");
							// 根据输入的关键字在搜索范围内检索
							searchService.search(keyword);
						});

						var searchService, markers2 = [];
						var latlngBounds = new qq.maps.LatLngBounds();
						// 设置Poi检索服务，用于本地检索、周边检索
						searchService = new qq.maps.SearchService({
							// 设置搜索范围为北京
							location: _this.city,
							// 设置搜索页码为1
							pageIndex: 0,
							// 设置每页的结果数为5
							pageCapacity: 10,
							// 设置展现查询结构到infoDIV上
							// panel: document.getElementById('infoDiv'),
							// 设置动扩大检索区域。默认值true，会自动检索指定城市以外区域。
							autoExtend: true,
							// 检索成功的回调函数
							complete:function(results){
								// 设置回调函数参数
								var pois = results.detail.pois;
								_this.selectMap = pois;
								if(_this.selectMap !== ''){
									_this.l1 = false;
									_this.l2 = true;
								};
								for(var i = 0, l = pois.length; i < l; i++){
									var poi = pois[i];
									// 扩展边界范围，用来包含搜索到的Poi点
									latlngBounds.extend(poi.latLng);
									var marker = new qq.maps.Marker({
										map: map,
										position: poi.latLng
									});
									marker.setTitle(i + 1);
									markers2.push(marker);
								}
								// 调整地图视野
								map.fitBounds(latlngBounds);
							},
							// 若服务请求失败，则运行以下函数
							error:function(){
								alert("出错了。");
							}
						});
					}
					init();
				};
			});
		},
		goback:function(){
			window.history.back();
		},
		togoto:function(){
			let _this = this;
			window.location.href = _this.url;
		},
		updown:function(index){
			this.index = index;
			if(index == 1){
				this.v1 = false;
				this.v2 = true;
				$(".return").css("height","0.4rem");
			}else{
				this.v1 = true;
				this.v2 = false;
				$(".return").css("height","40%");
			}
		},
		searchKeyword2:function(){
			let _this = this;
			// 事故拖车查询修理厂
			this.$http.post(Util.ajaxPath.devProductUrl+'repairDepotSearch',{repairname: this.repairname,carNo: this.carNo,lat: this.lat,lng: this.lng,province: this.province,city: this.city},{emulateJSON : true}).then(function (res){
				_this.returnView2 = res.body;
				if(_this.returnView2.succ == false){
					_this.l1 = false;
					_this.l3 = false;
					_this.l4 = true;
					_this.l4hint = _this.returnView2.errMsg;
					$('.searchKeyword2').next().remove();
					// 初始化地图函数  自定义函数名init
					function init(){
						// 定义center 地图中心
						var center = new qq.maps.LatLng(_this.lat,_this.lng);
						// 定义map变量 调用 qq.maps.Map() 构造函数   获取地图显示容器
						var map = new qq.maps.Map(document.getElementById("container"), {
							center: center,
							zoom: 13,
							zoomControl: false,
						});

						setTimeout(function(){
							var anchor = new qq.maps.Point(12, 39),
							size = new qq.maps.Size(26, 36),
							origin = new qq.maps.Point(0, 0),
							scaleSize  = new qq.maps.Size(26, 36),
							icon = new qq.maps.MarkerImage("static/image/marker_red.png",size,origin,anchor,scaleSize);
							// 创建marker
							var marker = new qq.maps.Marker({
								position: center,
								animation:qq.maps.MarkerAnimation.DROP,
								map: map
							});
							marker.setIcon(icon);
						},2000);
						
						// 返回地图当前中心点地理坐标
						centerDiv.innerHTML = "latlng:" + map.getCenter();
						// 当地图中心属性更改时触发事件
						qq.maps.event.addListener(map, 'center_changed', function(){
							centerDiv.innerHTML = "latlng:" + map.getCenter();
						});

						// 返回地图中心
						var returnCenter = document.getElementById("returnCenter");
						// 获取标记的点击事件
						qq.maps.event.addListener(returnCenter, 'click', function(){
							map.setCenter(new qq.maps.LatLng(_this.lat,_this.lng));
						});
					}
					init();
				}else{
					_this.l1 = false;
					_this.l3 = true;
					_this.l4 = false;
					_this.returnViewLi2 = res.body.data.depotList;
					$('.searchKeyword2').next().remove();
					// 初始化地图函数  自定义函数名init
					function init(){
						// 定义center 地图中心
						var center = new qq.maps.LatLng(_this.lat,_this.lng);
						// 定义map变量 调用 qq.maps.Map() 构造函数   获取地图显示容器
						var map = new qq.maps.Map(document.getElementById("container"), {
							center: center,
							zoom: 13,
							zoomControl: false,
						});

						// 创建marker
						setTimeout(function(){
							var anchor = new qq.maps.Point(12, 39),
							size = new qq.maps.Size(26, 36),
							origin = new qq.maps.Point(0, 0),
							scaleSize  = new qq.maps.Size(26, 36),
							icon = new qq.maps.MarkerImage("static/image/marker_red.png",size,origin,anchor,scaleSize);
							
							var marker = new qq.maps.Marker({
								position: center,
								animation:qq.maps.MarkerAnimation.DROP,
								map: map
							});
							marker.setIcon(icon);
						},2000);

						// 返回地图当前中心点地理坐标
						centerDiv.innerHTML = "latlng:" + map.getCenter();
						// 当地图中心属性更改时触发事件
						qq.maps.event.addListener(map, 'center_changed', function(){
							centerDiv.innerHTML = "latlng:" + map.getCenter();
						});

						// 返回地图中心
						var returnCenter = document.getElementById("returnCenter");
						qq.maps.event.addListener(returnCenter, 'click', function(){
							map.setCenter(new qq.maps.LatLng(_this.lat,_this.lng));
						});

						// 创建多个marker
						var data = [];
						for(var i = 0 ; i < _this.returnViewLi.length; i++){
							var aaa = [_this.returnViewLi[i].latitude,_this.returnViewLi[i].longitude];
							data.push(aaa);
						};
						// console.log(data)

						var LatLng = qq.maps.LatLng;
						var MarkerDecoration = qq.maps.MarkerDecoration;
						var Point = qq.maps.Point;
						var Marker = qq.maps.Marker;
						var MVCArray = qq.maps.MVCArray;
						var markers1 = new MVCArray();

						function createCluster(){
							for (var i = 0; i < data.length; i++){
								var latLng = new LatLng(data[i][0], data[i][1]);
								var decoration = new MarkerDecoration(i, new Point(0, -5));
								var marker = new Marker({
									'position':latLng,
									map:map
								});
								markers1.push(marker);
							}
						};
						createCluster();
					}
					init();
				};
			});
		},
		reLi:function(getlat,getlng,getadd,index){
			let _this = this;
			let selectLat = getlat;
			let selectLng = getlng;
			let selectAdd = getadd;
			_this.selectLat = selectLat;
			_this.selectLng = selectLng;
			_this.selectAdd = selectAdd;
			this.isView = true;
		},
		isyes:function(){
			let _this = this;
			this.isView = false;
			this.isView2 = true;
		},
		isyes2:function(){
			$(".isyes2").attr("disabled","true").css("background","#b1b1b1");
			this.$message({
				showClose: true,
				message: '正在处理！',
				type: 'success',
				center: true
			});
			let _this = this;
			if(this.serviceType == 'SI049'){
				var url = Util.ajaxPath.devRuturnUrl+this.selectLat+","+this.selectLng+Util.ajaxPath.QQkey+"&output=jsonp";
				$.ajax({
					type: "get",
					url: url,
					dataType: "jsonp",
					success:function(data){
						// console.log(data)
						let selecProvince = data.result.ad_info.province;
						let selecCity = data.result.ad_info.city;
						let selecCun = data.result.ad_info.district;
						_this.selecProvince = selecProvince;
						_this.selecCity = selecCity;
						_this.selecCun = selecCun;
						// 事故拖车确定修理厂
						_this.$http.post(Util.ajaxPath.devProductUrl+'repairDepot',{serviceType: _this.serviceType,distAddr: _this.selectAdd,distLatitude: _this.selectLat,distLongitude: _this.selectLng,distProvince: _this.selecProvince,distCity: _this.selecCity,distArea: _this.selecCun,uuid: _this.uuid,policyNo: _this.policyNo},{emulateJSON : true}).then(function (res){
							_this.returnList1 = res.body;
							if(_this.returnList1.succ == true){
								_this.registNo = _this.returnList1.data.registNo;
								_this.serviceNo2 = _this.returnList1.data.serviceNo;
								_this.url2 = _this.returnList1.data.url;
								this.$message({
									showClose: true,
									message: '确定修理厂成功！',
									type: 'success',
									center: true
								});
								setTimeout(function(){
									_this.$router.push({name: 'report', query: {registNo: _this.registNo,serviceNo: _this.serviceNo2,url: _this.url2}});
								},1000)
							}else{
								this.$message({
									showClose: true,
									message: _this.returnList1.errMsg,
									type: 'warning',
									center: true
								});
								$(".isyes2").removeAttr("disabled").css("background","#006cb7");
							}
						});
					}
				});
			}else{
				var url = Util.ajaxPath.devRuturnUrl+this.selectLat+","+this.selectLng+Util.ajaxPath.QQkey+"&output=jsonp";
				$.ajax({
					type: "get",
					url: url,
					dataType: "jsonp",
					success:function(data){
						// console.log(data)
						let selecProvince = data.result.ad_info.province;
						let selecCity = data.result.ad_info.city;
						let selecCun = data.result.ad_info.district;
						_this.selecProvince = selecProvince;
						_this.selecCity = selecCity;
						_this.selecCun = selecCun;
						// 故障拖车确定修理厂
						_this.$http.post(Util.ajaxPath.devProductUrl+'repairDepot',{serviceNo: _this.serviceNo1,serviceType: _this.serviceType,distAddr: _this.selectAdd,distLatitude: _this.selectLat,distLongitude: _this.selectLng,distProvince: _this.selecProvince,distCity: _this.selecCity,distArea: _this.selecCun},{emulateJSON : true}).then(function (res){
							_this.returnList2 = res.body;
							if(_this.returnList2.succ == true){
								this.$message({
									showClose: true,
									message: '确定修理厂成功！',
									type: 'success',
									center: true
								});
								setTimeout(function(){
									window.location.href = _this.url;
								},1000)					
							}else{
								this.$message({
									showClose: true,
									message: _this.returnList2.errMsg,
									type: 'warning',
									center: true
								});
								$(".isyes2").removeAttr("disabled").css("background","#006cb7");
							}
						});
					}
				});
			}
		}
	}
}
</script>
<style lang="scss">
.map_main{
	.top_title{
		width: 100%; height: 1rem; background: #006cb7; position: fixed; left: 0; top: 0; z-index: 99;
		.top_back{ width: 0.66rem; height: 0.66rem; position: absolute; left: 0.24rem; top: 0.17rem; }
		.top_word{ line-height: 1rem; text-align: center; font-size: 0.32rem; color: #fff; }
		.togo{ height: 0.32rem; line-height: 0.32rem; font-size: 0.32rem; color: #fff; position: absolute; right: 0.24rem; top: 0.34rem; }
	}
	#container{ display: block; width: 100%; height: 100%; position: absolute; left: 0; top: 0; z-index: 1; }
	.returnCenter{
		width: 0.88rem; height: 0.88rem; position: fixed; left: 0.2rem; top: 50%; z-index: 10;
		img{ display: block; width: 0.88rem; height: 0.88rem; }
	}
	.searchKeyword{
		width: 100%; height: 0.8rem; background: #fff; position: fixed; left: 0; top: 1rem; z-index: 10;
		#keyword{ display: block; float: left; margin: 0.1rem 0.2rem; width: 6rem; height: 0.6rem; line-height: 0.6rem; font-size: 0.32rem; text-indent: 0.2rem; background: #ebebeb; border-radius: 0.1rem; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
		#searchKeyword{ display: block; float: left; margin: 0.1rem 0; width: 1rem; height: 0.6rem; line-height: 0.6rem; text-align: center; font-size: 0.32rem; background: #fff; color: #0079ff; }
	}
	.searchKeyword2{
		width: 100%; height: 0.8rem; background: #fff; position: fixed; left: 0; top: 1rem; z-index: 10;
		#keyword2{ display: block; float: left; margin: 0.1rem 0.2rem; width: 6rem; height: 0.6rem; line-height: 0.6rem; font-size: 0.32rem; text-indent: 0.2rem; background: #ebebeb; border-radius: 0.1rem; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
		#searchKeyword2{ display: block; float: left; margin: 0.1rem 0; width: 1rem; height: 0.6rem; line-height: 0.6rem; text-align: center; font-size: 0.32rem; background: #fff; color: #0079ff; }
	}
	.return{ width: 100%; height: 40%; background: #fff; position: absolute; left: 0; bottom: 0; z-index:10; }
	.updown{
		width: 100%; height: 0.4rem; background: #eee;
		img{ display: block; margin: 0 auto; width: 0.4rem; height: 0.4rem; }
	}
	.returnli{
		height: calc(100% - 0.4rem); overflow-y: scroll;
		ol{ padding: 0 0.2rem 0.4rem; }
		li{
			padding: 0.2rem 0 0; font-size: 0.28rem;
			div{ line-height: 0.6rem; font-size: 0.28rem; }
			div:nth-child(2n){ padding-bottom: 0.2rem; font-size: 0.24rem; color: #808080; border-bottom: 1px solid #cbcbcb }
		}
		.l4hint{ padding-top: 2rem; line-height: 0.28rem; text-align: center; font-size: 0.28rem; }
	}
	.isView{
		width: 100%; height: 100%; position: fixed; left: 0; top: 0; z-index: 99;
		.isrow{ margin: -1.5rem 0 0 -3rem; width: 6rem; height: 3rem; background: #fff; border: 1px solid #cbcbcb; border-radius: 0.4rem; position: fixed; left: 50%; top: 50%; z-index: 99; }
		.isword{
			padding: 0.26rem 0.3rem; height: 1.4rem; line-height: 0.5rem; font-size: 0.32rem;
			p:nth-child(odd){ text-align: center; font-weight: bold; color: #eb6100; }
		}
		.isyes{ margin-left: 0.6rem; float: left; width: 1.6rem; height: 0.8rem; line-height: 0.8rem; text-align: center; font-size: 0.36rem; color: #fff; background: #006cb7; border-radius: 0.2rem; }
		.isno{ margin-right: 0.6rem; float: right; width: 1.6rem; height: 0.8rem; line-height: 0.8rem; text-align: center; font-size: 0.36rem; color: #fff; background: #006cb7; border-radius: 0.2rem; }
	}
	#centerDiv{}
}
</style>