define(function(require,exports,module){
	require("zepto");
	require("fastclick");
	require("swiper");
	var template=require("artTemplate");
	FastClick.attach(document.body);

	//总共需要接口：（暂时不用即时更新祝福语条目和祝福语字幕）

	//1.点击抽奖
	//2.祝福列表
	//3.获取可抽奖次数 中奖列表
	

	//跑马灯自定义插件主体
	var Slot=function(_config){
		var config={
			durTime:6000,//动画持续时间
			allComplateCallBack:function(){
				console.log("end");
			}
		};
		this.config=$.extend(config,_config);
		console.log(config);
		this.isAnimating=false;
	};

	Slot.prototype={
		init:function(){

		},
		getNextIndex:function(curIndex){//获取下一个元素索引
			var self=this;
			var itemL=self.config.slotItems.length;
			if(curIndex<itemL-1){
				return curIndex+1;
			}
			else if(curIndex==itemL-1){
				return 0;
			}
		},
		getCountNum:function(startInd,endInd){//获取从开始到结束的总共跳动的格子数量
			var self=this;
			var slotL=self.config.slotItems.length;
			var margin=slotL+5-(slotL-endInd);
			return self.config.slotItems.length*6 + 1 -(5-(endInd-startInd));//5：提前5个开始进行缓冲动画

		},
		startAnimate:function(startInd,endInd,allComplateCallBack){//设置初始联动动画
			var self=this;
			var countNum=self.getCountNum(startInd,endInd);
			self.config.slotItems[startInd].addClass("active");
			
			var secondDur=100;//第二个和第一个的跳动间隔
			var durTime=50;//第三个和第二个以及三个一起的跳动间隔

			var count=0;
			self.isAnimating=true;
			var timer=setInterval(function(){
				animateItem(startInd);
				startInd=self.getNextIndex(startInd);
				count+=1;
				
				if(count>=countNum){
					clearInterval(timer);
					
					var base=1.7;
					callTimeout(durTime*Math.pow(base,2.5));
					callTimeout(durTime*Math.pow(base,3.5));
					callTimeout(durTime*Math.pow(base,4.5));
					callTimeout(durTime*Math.pow(base,5.5));
					callTimeout(durTime*Math.pow(base,6.5),allComplateCallBack);//完成动画 执行环境slot 参数是点击开跑后返回的参数

					function callTimeout(time,callBack){
						setTimeout(function(){
							animateItem(startInd,callBack);
							startInd=self.getNextIndex(startInd);
						},time);
					}
				}

			},durTime);

			function animateItem(index,callBack){
				$(".cards_item.active").removeClass("active");
				self.config.slotItems[index].addClass("active");
				if(callBack){
					setTimeout(function(){
						callBack();
						self.isAnimating=false;
					},400);
				}
			}

		},
		setSlotAnimation:function(start,end,allComplateCallBack){//设置整体的动画
			var self=this;
			if(!self.isAnimating){
				self.startAnimate(start,end,allComplateCallBack);
			}
		},
		getAnimateState:function(){
			return this.isAnimating;
		}
	};


	$(function(){
		var App=function(){

			this.tpl={
				alertMsgTpl:template.compile($("#normalMsg").html()),//普通弹框信息的模板
				wishesTpl:template.compile($("#wishes_tpl").html()),//祝福语列表的模板
				awardsTpl:template.compile($("#awards_tpl").html()),//获奖信息列表斑斑
			};

			this.url={
				webUrl:$("#webUrl").val(),
				slotUrl:"/slot.html",//点击抽奖接口
				awardsUrl:"/awards.html",//获取中奖信息列表
				wishesUrl:"/wishes.html"//获取祝福列表
			};
			
			this.setCountNum=function(num){//设置中奖次数
				var $count_num=$("#count_num");
				var $count_btn=$("#start_item");
				if(num>0){
					$count_num.text(num+"次");
					$count_btn.removeClass("disabled");
				}
				else{
					$count_num.text("");
					$count_btn.addClass("disabled");
				}
			};


			this.setWishNumAndText=function(num){//设置祝福语条数和祝福语
				var num=Math.round(100*Math.random());
				$("#wishes_num").text(num);
				var html="aaa"+"祝福"+"bbb"+"<label>"+"哈哈哈哈哈哈哈的完全后期维护完"+"</label>"
				$("#mes_inner").html(html);
			};
			
			
			this.setMarqune=function(){//设置头部的滚动动画
				var speed=30;
				var inner=document.getElementById("mes_inner");
				var wraper=document.getElementById("mes_wraper");
				var direction="left";
				setInterval(Marquee,speed);
				function Marquee(){
					if(direction=="left"){
						if(wraper.scrollLeft>= (inner.offsetWidth-wraper.offsetWidth-2)){
							direction="right";
						}
						else{
						  	wraper.scrollLeft++
						}
					}
					else if(direction=="right"){
						if(wraper.scrollLeft<=0){
							direction="left";
						}
						else{
						  	wraper.scrollLeft--
						}
					}
				}
			};

			this.updateWishesLists=function(){//更新祝福语列表
				console.log("updatingWishes");
				var self=this;
				var $wishes_swiper_page=$("#wishes_swiper_page");
				if(self.wishesSwiper){
					console.log(self.wishesSwiper);
					self.wishesSwiper.destroy();
					$("#wishes_lists_container .swiper-wrapper").html("");
					$wishes_swiper_page.text("1");
				}

				var activeIndex=1;
				var hasGetAll=false;
				var page=1;
				self.wishesSwiper = new Swiper('#wishes_lists_container', {
					autoplay: false,
					loop:false,
					swipeHandler :".aaaa",//只能通过滑动某个元素进行切换
					onSlideChangeEnd:function(){
						activeIndex=self.wishesSwiper.activeIndex+1;//当前页码
						$wishes_swiper_page.text(activeIndex);
					}
				});

				var pagesData={
					data1:{
						lists:[
							{nickName:"习大大1",addTime:"2015-12-21 22:30:30",intro:"恭喜您获得一个驴打滚",imgSrc:"http://10.10.14.220:8080/zajk/statics/images/activity/2016/paomadeng/slot_1.png"},
							{nickName:"习大大1",addTime:"2015-12-21 22:30:30",intro:"恭喜您获得一个驴打滚",imgSrc:"http://10.10.14.220:8080/zajk/statics/images/activity/2016/paomadeng/slot_1.png"},
							{nickName:"习大大1",addTime:"2015-12-21 22:30:30",intro:"恭喜您获得一个驴打滚",imgSrc:"http://10.10.14.220:8080/zajk/statics/images/activity/2016/paomadeng/slot_1.png"},
							{nickName:"习大大1",addTime:"2015-12-21 22:30:30",intro:"恭喜您获得一个驴打滚",imgSrc:"http://10.10.14.220:8080/zajk/statics/images/activity/2016/paomadeng/slot_1.png"},
							{nickName:"习大大1",addTime:"2015-12-21 22:30:30",intro:"恭喜您获得一个驴打滚",imgSrc:"http://10.10.14.220:8080/zajk/statics/images/activity/2016/paomadeng/slot_1.png"},
							{nickName:"习大大1",addTime:"2015-12-21 22:30:30",intro:"恭喜您获得一个驴打滚",imgSrc:"http://10.10.14.220:8080/zajk/statics/images/activity/2016/paomadeng/slot_1.png"}
						]
					},
					data2:{
						lists:[
							{nickName:"习大大1",addTime:"2015-12-21 22:30:30",intro:"恭喜您获得一个驴打滚",imgSrc:"http://10.10.14.220:8080/zajk/statics/images/activity/2016/paomadeng/slot_1.png"},
							{nickName:"习大大1",addTime:"2015-12-21 22:30:30",intro:"恭喜您获得一个驴打滚",imgSrc:"http://10.10.14.220:8080/zajk/statics/images/activity/2016/paomadeng/slot_1.png"},
							{nickName:"习大大1",addTime:"2015-12-21 22:30:30",intro:"恭喜您获得一个驴打滚",imgSrc:"http://10.10.14.220:8080/zajk/statics/images/activity/2016/paomadeng/slot_1.png"},
							{nickName:"习大大1",addTime:"2015-12-21 22:30:30",intro:"恭喜您获得一个驴打滚",imgSrc:"http://10.10.14.220:8080/zajk/statics/images/activity/2016/paomadeng/slot_1.png"},
							{nickName:"习大大1",addTime:"2015-12-21 22:30:30",intro:"恭喜您获得一个驴打滚",imgSrc:"http://10.10.14.220:8080/zajk/statics/images/activity/2016/paomadeng/slot_1.png"},
							{nickName:"习大大1",addTime:"2015-12-21 22:30:30",intro:"恭喜您获得一个驴打滚",imgSrc:"http://10.10.14.220:8080/zajk/statics/images/activity/2016/paomadeng/slot_1.png"}
						]
					},
					data3:{
						lists:[
							{nickName:"习大大1",addTime:"2015-12-21 22:30:30"},
							{nickName:"习大大1",addTime:"2015-12-21 22:30:30"},
							{nickName:"习大大1",addTime:"2015-12-21 22:30:30"},
							{nickName:"习大大1",addTime:"2015-12-21 22:30:30"}
						]
					}
				};
				

				function getAndAppendWishesLists(page){
					console.log("getting:"+page);
					var url=self.url.webUrl+self.url.wishesUrl;
					var param={
						page:page,
						count:6
					};
					alert(JSON.stringify(param));

					$.ajax({
						type:"get",
						url:url,
						data:param,
						dataType:"jsonp",
						success:function(dt){
							var data={lists:dt}
							alert(JSON.stringify(data));
							callBack(data);
						},
						error:function(){
							var data=pagesData["data"+page];
							callBack(data);
						}
					});

					function callBack(data){
						var listsL=data.lists.length;
						if(page==1){
							if(listsL==0){//没有中奖
								$("#wishes_pagination").addClass("hide");
								$(".wishes_lists_wraper .no_data_lists").removeClass("hide");
							}
							else if(listsL>0){
								if(listsL<6){//总中奖结果小于6条
									$("#wishes_pagination").addClass("hide");
								}
								else{//等于6条
									$("#wishes_pagination").removeClass("hide");
								}
								var html=self.tpl.wishesTpl(data);
								self.wishesSwiper.appendSlide(html);
								self.wishesSwiper.slideTo(page);
							}
						}
						else if(page>1){
							if(listsL==0){
								hasGetAll=true;
								return false
							}
							else if(listsL<6){
								hasGetAll=true;
								var html=self.tpl.wishesTpl(data);
								self.wishesSwiper.appendSlide(html);
								self.wishesSwiper.slideNext();
							}
							else{
								var html=self.tpl.wishesTpl(data);
								self.wishesSwiper.appendSlide(html);
								self.wishesSwiper.slideNext();
							}
						}
						
					}
				}

				getAndAppendWishesLists(1);
				var $prev=$("#wishes_pagination .swiper_prev");
				var $next=$("#wishes_pagination .swiper_next");
				$prev.unbind("click");//解绑原有的事件，避免多次执行
				$next.unbind("click");//解绑原有的事件，避免多次执行


				$prev.on("click",function(){//上一页
					self.wishesSwiper.slidePrev();
				});

				$next.on("click",function(){//下一页

					if(self.wishesSwiper.animating){//正在过度
						return false;
					}
					
					var slidesAcount=self.wishesSwiper.slides.length;//总数量
					console.log(activeIndex,slidesAcount);
					if(activeIndex<slidesAcount){
						self.wishesSwiper.slideNext();
					}
					else if(activeIndex==slidesAcount){
						if(hasGetAll){
							return false;
						}
						else{
							getAndAppendWishesLists(activeIndex+1);
						}
					}
				});

			}

			this.updateCoutAndAwardsLists=function(){//更新获奖信息列表

				console.log("updatingAwards");
				var self=this;

				var $award_swiper_page=$("#award_swiper_page");
				if(self.awardsSwiper){
					console.log(self.awardsSwiper);
					self.awardsSwiper.destroy();
					$("#award_lists_container .swiper-wrapper").html("");
					$award_swiper_page.text("1");
				}

				var activeIndex=1;
				var hasGetAll=false;
				var page=1;
				self.awardsSwiper = new Swiper('#award_lists_container', {
					autoplay: false,
					loop:false,
					swipeHandler :".aaaa",//只能通过滑动某个元素进行切换
					onSlideChangeEnd:function(){
						activeIndex=self.awardsSwiper.activeIndex+1;//当前页码
						$award_swiper_page.text(activeIndex);
					}
				});

				var pagesData={
					data1:{
						lists:[
							{prize:"10元话费1",addTime:"2015-12-21 22:30:30"},
							{prize:"电影票一张1",addTime:"2015-12-21 22:30:30"},
							{prize:"豪华双人游1",addTime:"2015-12-21 22:30:30"},
							{prize:"10元话费1",addTime:"2015-12-21 22:30:30"},
							{prize:"10元红1",addTime:"2015-12-21 22:30:30"},
							{prize:"10元话费1",addTime:"2015-12-21 22:30:30"}
						]
					},
					data2:{
						lists:[
							{prize:"10元话费2",addTime:"2015-12-21 22:30:30"},
							{prize:"电影票一张2",addTime:"2015-12-21 22:30:30"},
							{prize:"豪华双人游2",addTime:"2015-12-21 22:30:30"},
							{prize:"10元话费2",addTime:"2015-12-21 22:30:30"},
							{prize:"10元红2",addTime:"2015-12-21 22:30:30"},
							{prize:"10元话费2",addTime:"2015-12-21 22:30:30"}
						]
					},
					data3:{
						lists:[
							{prize:"10元话费3",addTime:"2015-12-21 22:30:30"},
							{prize:"电影票一张3",addTime:"2015-12-21 22:30:30"},
							{prize:"豪华双人游3",addTime:"2015-12-21 22:30:30"},
							{prize:"10元话费3",addTime:"2015-12-21 22:30:30"}
						]
					}
				};
				

				function getAndAppendAwardLists(page){
					console.log("getting:"+page);
					var url=self.url.webUrl+self.url.awardsUrl;
					var param={
						page:page,
						count:6
					};
					alert(JSON.stringify(param));

					$.ajax({
						type:"get",
						url:url,
						data:param,
						dataType:"jsonp",
						success:function(dt){
							var data={lists:dt}
							alert(JSON.stringify(data));
							callBack(data);
						},
						error:function(){
							var data=pagesData["data"+page];
							callBack(data);
						}
					});

					function callBack(data){
						var listsL=data.lists.length;
						if(page==1){
							if(listsL==0){//没有中奖
								$("#award_pagination").addClass("hide");
								$(".award_lists_wraper .no_data_lists").removeClass("hide");
							}
							else if(listsL>0){
								if(listsL<6){//总中奖结果小于6条
									$("#award_pagination").addClass("hide");
								}
								else{//等于6条
									$("#award_pagination").removeClass("hide");
								}
								var html=self.tpl.awardsTpl(data);
								self.awardsSwiper.appendSlide(html);
								self.awardsSwiper.slideTo(page);
							}
						}
						else if(page>1){
							if(listsL==0){
								hasGetAll=true;
								return false
							}
							else if(listsL<6){
								hasGetAll=true;
								var html=self.tpl.awardsTpl(data);
								self.awardsSwiper.appendSlide(html);
								self.awardsSwiper.slideNext();
							}
							else{
								var html=self.tpl.awardsTpl(data);
								self.awardsSwiper.appendSlide(html);
								self.awardsSwiper.slideNext();
							}
						}

						var count=Math.round(100*Math.random());
						self.setCountNum(count);//设置可抽奖次数
					}
				}

				getAndAppendAwardLists(1);

				$("#award_pagination .swiper_prev").unbind("click");//解绑原有的事件，避免多次执行
				$("#award_pagination .swiper_next").unbind("click");//解绑原有的事件，避免多次执行


				$("#award_pagination .swiper_prev").on("click",function(){//上一页
					self.awardsSwiper.slidePrev();
				});

				$("#award_pagination .swiper_next").on("click",function(){//下一页

					if(self.awardsSwiper.animating){//正在过度
						return false;
					}
					
					var slidesAcount=self.awardsSwiper.slides.length;//总数量
					console.log(activeIndex,slidesAcount);
					if(activeIndex<slidesAcount){
						self.awardsSwiper.slideNext();
					}
					else if(activeIndex==slidesAcount){
						if(hasGetAll){
							return false;
						}
						else{
							getAndAppendAwardLists(activeIndex+1);
						}
					}
				});
			}

			this.init();//页面初始化
			this.setMarqune();//祝福语滚动字幕
			this.timeOut();//页面过期提示
			this.updateCoutAndAwardsLists();//初始化获奖列表和开跑次数
			this.updateWishesLists();//初始化祝福语列表
			this.clickGoHandler();//点击开始按钮  开始抽奖



		};
		App.prototype={
			init:function(){
				$("body").on("click",".layermchild .alert_btn",function(){

					var $btn=$(this);
					var href=$btn.attr("data-href");
					layer.closeAll();
					if(href!=""){//合作商页面跳转
						window.location.href=href;
					}
				});
				
			},
			timeOut:function(){
				var self=this;
				var endTime=1460539200;//活动过期时间 17:20:00
				var now=$("#serverTime").val()||1460539200-1;//服务器时间

				if(now>=endTime){
					var html=self.tpl.alertMsgTpl({
						normalMsg:[
							{text:"<p class='alert_mes'>活动已经结束，下次再来表白</p>"}
						],
						btnText:"下次再试试"
					});
					layer.open({
						content:html,
						shadeClose:false
					});
				}
				
			},
			clickGoHandler:function(){
				var self=this;

				var slotArr=[];//做动画的元素的集合
				var slotL=8;
				for(var i=0;i<slotL;i++){
					var id="slot"+i;
					slotArr.push($("#"+id));
				}
				

				var slot=new Slot({
					slotItems:slotArr//元素集合，从左上角顺时针开始
				});

				
				var isGetting=false;
				$("#start_item").on("click",function(){
					var $btn=$(this);
					var isAnimating=slot.getAnimateState();

					if($btn.hasClass("disabled")||isAnimating||isGetting){//按钮禁用状态 或者正在进行动画
						return false;
					}
					
					$btn.addClass("active");//设置点击按钮的点中状态
					setTimeout(function(){
						$btn.removeClass("active");
					},50);

					isGetting=true;
					var url=self.url.webUrl+self.url.slotUrl;
					var url="http://wap.qbm360.com/api/getBorrowList.html";
					var param={
						currentPage:1,
						pernum:10
					};
					var promise=$.ajax({
						url:url,
						type:"get",
						dataType:"jsonp",
						data:param,
						success:function(data){
							isGetting=false;
							console.log("success");
							if(true){//中奖
								successAnimate(data);//抽中奖项后的动画
							}
							else{//其他未知错误

							}
							
						},
						error:function(e){
							isGetting=false;
							console.log("error");
							successAnimate();//抽中奖项后的动画
						}
					});

					function successAnimate(data){//设置对应的中奖动画
						if($(".cards_item.active").length!=0){//是否已经有老虎机处于激活状态
							var startIndex=$(".cards_item.active").attr("id").replace("slot","")*1;
						}
						else{//没有老虎机处于激活状态
							var startIndex=Math.round(Math.random()*(slotL-1));
						}
						var endIndex=Math.round(Math.random()*(slotL-1));
						console.log(startIndex,endIndex);

						slot.setSlotAnimation(startIndex,endIndex,allComplateCallBack.bind(self,data));//设置中奖信息 第一个是起跳索引 第二个是中奖索引 最后一个是中奖的奖品名称
					}
					

					function allComplateCallBack(data){//所有动画完成后的回调
						console.log(this);
						var self=this;
						console.log(data);
						var prize=data.prize||"10元投资话费";
						
						var count_num=12;//可抽奖次数
						var tplData={
							normalMsg:[
								{
									text:"<p class='alert_mes'>恭喜您获得"+prize+"</p>"
								}
							],
							dirUrl:"https://www.baidu.com"
						};
						var html=self.tpl.alertMsgTpl(tplData);
						layer.open({
							content:html,
							//shadeClose:false
						});
						
						
						//self.setWishNumAndText();//设置祝福语条数和最新祝福语文本
						self.updateCoutAndAwardsLists();//更新中奖信息分页
						//self.updateWishesLists();//更新祝福语分页
					}

				});
			}
		};

		var app=new App();
	});
});

