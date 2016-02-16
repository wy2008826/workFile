define(function(require,module,exports){
	require("zepto");
	template=require("artTemplate");
	require('fastclick');
	FastClick.attach(document.body);
	

	template.helper("labelPeriod",function(isDay,num,index){
		if(isDay=="Y"){
			var unit="天";
		}
		else{
			var unit="个月";
		}
		if(index==0){
			return num+unit;
		}
		else{
			return "<span class='fc-3'>"+num+"</span>"+unit;
		}

	});

	template.helper("fixToSecond",function(value){
		return (value*1).toFixed(2);;
	});

	template.helper("BarProgress",function(hasSend,total){
		//console.log(hasSend,total);
		return (hasSend / total)*100;
	});

	template.helper("LabelStatus",function(status){
		if(status==0){//已售罄
			return "已售罄";
		}
		else if(status==1){
			return "可购买";
		}
		else if(status==4){//倒计时标
			return "待开售";
		}
	});
	template.helper("LabelClass",function(status){
		if(status==0){
			return "not_start";
		}
		else if(status==1){
			return "";
		}
		else if(status==4){
			return "not_start";
		}
		
	});


	$(function(){
		var App=function(){

			this.url={
				wapUrl:$("#wapurl").val(),
				bannerList:"/api/getWapBanner.html",//首页banner图片
				labelList:"/api/getBorrowList.html"//首页标列表
			};

			this.tpl={
				bannerTpl:template.compile($("#topBannerTpl").html()),
				labelListTpl:template.compile($("#borrow-list-template").html())
			};

			this.isLogin=(function(){//当前页面是否处于登陆状态
				if($(".has_login_box").length>0){
					return true;
				}
				else{
					return false;
				}
				
			})();
			this.init();
			this.slider();//banner图滑动
			this.loadList();//加载标列表

			$(window).bind( 'orientationchange', function(e){
		        orient();
		    });

		    function orient() {
		        
		        if (window.orientation == 0 || window.orientation == 180) {
		            $("body").attr("class", "portrait");
		            orientation = 'portrait';
		            return false;
		        }
		        else if (window.orientation == 90 || window.orientation == -90) {
		            $("body").attr("class", "landscape");
		            orientation = 'landscape';
		   
		            return false;
		        }
		    }

		};
		App.prototype={
			init:function(){
				//初始化banner区域的尺寸比例
				var scale=382/640;
				var winW=$(window).width();
				var winw1=window.innerWidth;

				var documentW=document.body.innerWidth;
				
				// alert(winW);
				var sliderH=winW * scale;

				// $("#indexSlider").height(sliderH);
				
				$("body").on("click",".tap-link",function(){
					
					var $elem=$(this);
					var href=$elem.attr("data-href");
					if(href!=""){
						window.location.href=href;
					}
				});


				function ScrollInifate(config){
					var body=document.getElementsByTagName("body")[0];
					var wH=window.innerHeight;
					var distance=parseFloat(config.distance)||0;
					var callBack=config.endCallBack;
					window.addEventListener("scroll",scrollHandler);

					function scrollHandler(e){
						var bodyH=body.offsetHeight;
						var scrollTop=body.scrollTop;
						// console.log("wH:"+wH+" bodyH:"+bodyH+" scrollTop:"+scrollTop);
						if(scrollTop+wH>=bodyH-distance){
							callBack(e,scrollTop);

						}
					}
				}

			},
			slider:function(){
				var self=this;
				require("swiper");
				// require.async("swiper",function(){
					var url=self.url.wapUrl+self.url.bannerList;
					$.ajax({
						url:url,
						dataType:"get",
						dataType:"jsonp",
						success:function(data){
							//console.log(data);
							if(data.result){//正确返回
								if(data.code==1){

									//console.log(self.isLogin);
									if(!self.isLogin){//是否没有登录   
										data.imageResourcesList.forEach(function(item,index){
											if(item.isLoginSee==1){//该banner图登录可见   删除该banner
												data.imageResourcesList.splice(index,1);
											}
										});
									}
									//console.log(data);
									var bannerhtml=self.tpl.bannerTpl(data);
									$("#indexSlider .swiper-wrapper").html(bannerhtml);
									var swiperCfg={
										loop:true,
						    			autoHeight:true,
						    			noSwiping:true,
						    			autoplay:3000,
						    			speed:400,
						    			autoplayDisableOnInteraction:false
									};
									if(data.imageResourcesList.length==1){//只有一张的时候  禁止滑动
										swiperCfg.loop=false;
										// swiperCfg.allowSwipeToNext=false;
										// swiperCfg.allowSwipeToPrev=false;
									}
									var swiper = new Swiper('#indexSlider',swiperCfg);
						    		// console.log(swiper.params);
								}
								else if(data.code==0){

								}	
							}
							else{//服务器出错  请求异常

							}
						}
					});

				// });
	    		
			},
			loadList:function(){
				var self=this;
				var url=self.url.wapUrl+self.url.labelList;
				var param={
					currentPage:1,
					pernum:10000
				};
				$.ajax({
					url:url,
					type:"get",
					dataType:"jsonp",
					data:param,
					error:function(data){
						
						data={"dataList":[{"borrowId":8358,"baseTitle":"新手专享0950","invTypeId":"115","baseSuccessAmount":18935.0,"totalAmount":190000.0,"baseApr":14.0,"basicApr":7.5,"rewardApr":6.5,"baseIsDayMarked":"Y","basePeriodCount":7,"isCanBid":1,"lowestAccount":"100","hasInsurance":0,"hasBaodan":0,"startTime":"1455588362","nowtime":0},{"borrowId":8247,"baseTitle":"新手专享0938","invTypeId":"115","baseSuccessAmount":164468.0,"totalAmount":166000.0,"baseApr":14.0,"basicApr":7.5,"rewardApr":6.5,"baseIsDayMarked":"Y","basePeriodCount":7,"isCanBid":1,"lowestAccount":"100","hasInsurance":0,"hasBaodan":0,"startTime":"1455520652","nowtime":0},{"borrowId":8421,"baseTitle":"车贷宝00298","invTypeId":"190","baseSuccessAmount":115308.28,"totalAmount":160000.0,"baseApr":12.0,"basicApr":10.4,"rewardApr":1.6,"baseIsDayMarked":"N","basePeriodCount":12,"isCanBid":1,"lowestAccount":"100","hasInsurance":0,"hasBaodan":0,"startTime":"1455591298","nowtime":0},{"borrowId":8420,"baseTitle":"车贷宝00297","invTypeId":"190","baseSuccessAmount":65076.0,"totalAmount":250000.0,"baseApr":12.0,"basicApr":10.4,"rewardApr":1.6,"baseIsDayMarked":"N","basePeriodCount":12,"isCanBid":1,"lowestAccount":"100","hasInsurance":0,"hasBaodan":0,"startTime":"1455587906","nowtime":0},{"borrowId":8392,"baseTitle":"车聚宝A00618","invTypeId":"1","baseSuccessAmount":67070.48,"totalAmount":888000.0,"baseApr":10.0,"basicApr":8.4,"rewardApr":1.6,"baseIsDayMarked":"N","basePeriodCount":1,"isCanBid":1,"lowestAccount":"100","hasInsurance":0,"hasBaodan":0,"startTime":"1455592828","nowtime":0},{"borrowId":8413,"baseTitle":"【理财送健康实际年化15%】车聚宝B00852","invTypeId":"2","baseSuccessAmount":100113.0,"totalAmount":150005.0,"baseApr":7.0,"basicApr":7.0,"rewardApr":0.0,"baseIsDayMarked":"N","basePeriodCount":3,"isCanBid":1,"lowestAccount":"50000","hasInsurance":0,"hasBaodan":0,"startTime":"1455500967","nowtime":0},{"borrowId":8188,"baseTitle":"车聚宝B00852","invTypeId":"2","baseSuccessAmount":350961.37,"totalAmount":1000000.0,"baseApr":11.0,"basicApr":9.0,"rewardApr":2.0,"baseIsDayMarked":"N","basePeriodCount":6,"isCanBid":1,"lowestAccount":"100","hasInsurance":0,"hasBaodan":0,"startTime":"1455453488","nowtime":0},{"borrowId":8177,"baseTitle":"车聚宝B00843","invTypeId":"2","baseSuccessAmount":1246129.19,"totalAmount":2000000.0,"baseApr":10.5,"basicApr":8.5,"rewardApr":2.0,"baseIsDayMarked":"N","basePeriodCount":3,"isCanBid":1,"lowestAccount":"100","hasInsurance":0,"hasBaodan":0,"startTime":"1455424240","nowtime":0},{"borrowId":8171,"baseTitle":"网宝强01208","invTypeId":"999","baseSuccessAmount":0.0,"totalAmount":2000000.0,"baseApr":12.0,"basicApr":8.1,"rewardApr":3.9,"baseIsDayMarked":"Y","basePeriodCount":8,"isCanBid":4,"lowestAccount":"1000","hasInsurance":0,"hasBaodan":0,"startTime":"1455607800","nowtime":5027},{"borrowId":7871,"baseTitle":"网宝强01186","invTypeId":"999","baseSuccessAmount":0.0,"totalAmount":2000000.0,"baseApr":12.0,"basicApr":8.1,"rewardApr":3.9,"baseIsDayMarked":"Y","basePeriodCount":7,"isCanBid":4,"lowestAccount":"1000","hasInsurance":0,"hasBaodan":0,"startTime":"1455607800","nowtime":5027}],"code":1,"msg":"获取数据列表成功！","result":true};
						if(data.result){//服务器正确返回
							if(data.code==1){//有列表数据
								var html=self.tpl.labelListTpl(data);
								$("#index_label_ul").html(html);
								$("#loading_lists").hide();
								$(".label_li").each(function(index,item){//执行条目动画
									var $item=$(item);
									var $bar=$item.find(".bar_inner");
									var width=$bar.attr("data-width");
									$bar.animate({
										width:width
									},300);
								});
							}
							else if(data.code==0){//没有数据
								var html="<p class='text-center ' style='padding:50px'>暂无列表数据"+"<p>"
								$("#index_label_ul").html(html);
							}
						}
						else{//服务器非正常返回
							var html="<p class='text-center ' style='padding:50px'>"+data.msg+"<p>"
							$("#index_label_ul").html(html);
						}
					}
				});

			}
		};

		var app=new App();

	});

});

