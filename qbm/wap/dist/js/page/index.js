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
		// if(index==0){
		// 	return num+unit;
		// }
		// else{
			return "<span class='fc-3'>"+num+"</span>"+unit;
		// }

	});

	template.helper("labelTag",function(index,tag,bgColor){//index是索引
		var tagArr=["按月付息","定制","定时","定向","可赎回"];
		// var tag=1;
		if(!tag){
			return "";
		}
		else{
			if(index==0){//第一条默认为推荐标
				return "<span class='label_tag tuijian_tag' data-tag=tag"+tag+ ">"+tagArr[tag-1]+"</span>";
			}
			else{
				return "<span class='label_tag' data-tag=tag"+tag+ ">"+tagArr[tag-1]+"</span>";
			}
		}
	});

	template.helper("hasTag",function(tag){
		if(!tag){
			return "hide";
		}
	});



	template.helper("fixToSecond",function(value){
		return (value*1).toFixed(2);;
	});


	template.helper("rateMes",function(basic,reward){
		var basic=(basic*1).toFixed(2)+"";
		var reward=(reward*1).toFixed(2)+"";
		// console.log(basic,reward,typeof basic);

		var basic_first=basic.split(".")[0];
		var basic_second=basic.split(".")[1];

		var rewardHtml="";
		if(reward){
			rewardHtml="<span class='rate_small'>+"+reward+"%</span>"
		}
		return "<span class='rate_large'>"+basic_first+".</span>"+basic_second+"%"+rewardHtml;
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
			return "可投资";
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

	template.helper("LabelCircleState",function(status){
		if(status==0){
			return "not_start";
		}
		else if(status==1){
			return "is_start";
		}
		else if(status==4){
			return "not_start";
		}
		
	});


	$(function(){
		
		//域名跳转
		var weburl = $("#weburl").val();
		function browserRedirect() {
	        var sUserAgent = navigator.userAgent.toLowerCase();
	        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
	        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
	        var bIsMidp = sUserAgent.match(/midp/i) == "midp";
	        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
	        var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
	        var bIsAndroid = sUserAgent.match(/android/i) == "android";
	        var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
	        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
	        if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
	        	
	        }else{
	        	location.href = weburl;
	        }
	    }
		
	    browserRedirect();
	    
	    
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
						    			autoplayDisableOnInteraction:false,
						    			pagination:'.swiper-pagination',
						    			paginationClickable :true,
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
				var pageBrokers = $("#pageBrokers").val();
				var brokers = $("#brokers").val();
				if(pageBrokers !=""){
					brokers = pageBrokers;
				}
				var self=this;
				var url=self.url.wapUrl+self.url.labelList;
				var param={
					currentPage:1,
					pernum:10000,//全部加载
					requestType:"new",//new--可投标  his--历史，已售罄
					brokers:brokers
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
								self.drawLabelCircle();//绘制标的圆形进度条
							}
							else if(data.code==0){//没有数据
								var html="<p class='text-center ' style='padding:50px'>暂无列表数据"+"<p>";
								$("#loading_lists").hide();
								$("#index_label_ul").html(html);
							}
						}
						else{//服务器非正常返回
							var html="<p class='text-center ' style='padding:50px'>"+data.msg+"<p>"
							$("#index_label_ul").html(html);
						}
						
					}
				});

			},
			drawLabelCircle:function(){
				var dpr=window.dpr==1?2:window.dpr;

				var grayCircleOpt;
				var yellowCircleOpt;
				$(".label_canvas").each(function(index,item){
					var $canvas=$(item);
					var progress=$canvas.attr("data-progress");
					var size=$canvas.width()*dpr;
					$canvas.attr("width",size).attr("height",size);//这一条不可少   涉及到分辨率的问题
					var ctx=$canvas[0].getContext("2d");

					var lineWidth=3*dpr;
					
					grayCircleOpt={
							ctx:ctx,
							size:size,
							r:(size-lineWidth*2)/2,
							lineWidth:lineWidth,
							color:"#fdeadd" 
					}
					yellowCircleOpt={
							ctx:ctx,
							progress:progress,
							size:size,
							r:(size-lineWidth*2)/2,
							lineWidth:lineWidth,
							color:"#fd9438" //fd9438
					};
					drawCircle(grayCircleOpt);//绘制灰色完整圆弧
					animateCircle(yellowCircleOpt);//绘制圆弧动画

				});

				function drawCircle(opt){
					var ctx=opt.ctx;
					ctx.save();
					ctx.beginPath();

					ctx.arc(opt.size/2,opt.size/2,opt.r,0,Math.PI*2);
					ctx.lineWidth=opt.lineWidth;
					ctx.strokeStyle=opt.color;
					ctx.stroke();
					ctx.restore();
				}
				function animateCircle(opt){
					var ctx=opt.ctx;
					ctx.save();

					var progress=opt.progress;
					var animateTime=400;//动画执行时间
					var stepTime=20;//绘制动画间隔时间

					var count=animateTime / stepTime;//每一个动画的绘制次数
					var totalArc=(opt.progress/100)* Math.PI*2 
					var i=1;
					
					var startArc= - Math.PI*0.5;
					// var stepArc=totalArc / count;
					// var finalArc=startArc + totalArc;

					var timer=setInterval(function(){//圆圈动画功能

						var endArc=totalArc*i/count+startArc;

						ctx.beginPath();

						ctx.arc(opt.size/2,opt.size/2,opt.r,startArc,endArc);
						ctx.lineWidth=opt.lineWidth;
						ctx.strokeStyle=opt.color;
						ctx.stroke();
						i+=1;
						if(i==count){
							clearInterval(timer);
						}
					},stepTime);

					ctx.restore();
				}
			}
		};

		app=new App();

	});

});

