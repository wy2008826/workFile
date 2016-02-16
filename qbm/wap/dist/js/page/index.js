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
					success:function(data){
						//console.log(data);
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

