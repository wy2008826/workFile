define(function(require,exports,module){
	require("zepto");
	require("fastclick");
	var template=require("artTemplate");
	FastClick.attach(document.body);

	//总共需要接口：（暂时不用即时更新祝福语条目和祝福语字幕）

	//1.点击抽奖
	//2.点击祝福  （返回抽奖次数和状态）
	//3.获取可抽奖次数




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
				wishNoPhoneTpl:template.compile($("#wishNoPhoneTpl").html()),//祝福朋友的弹框模板
				wishHasPhoneTpl:template.compile($("#wishHasPhoneTpl").html()),//祝福朋友的弹框模板 已经有手机
				changePhoneTpl:template.compile($("#changePhoneTpl").html()),//修改手机的弹框模板
			};

			this.url={
				webUrl:$("#webUrl").val(),
				slotUrl:"/slot.html",//点击抽奖接口
				wishPeopleUrl:"/wishes.html",//祝福朋友接口
				changePhoneUrl:"/changePhone.html",//修改手机号码
				getCountNumUrl:"/getCountNum.html",//获取抽奖次数
			};
			
			this.formatPhone=function(phone){//隐藏手机的中间四位
				return phone.substr(0,3)+"****"+phone.substr(7,11);
			};

			this.layerTip=function(text){
				layer.open({
					content:"<p>"+text+"</p>",
					className:"layer-tip",
					time:2,
					shadeClose:false
				});
			};
			// this.layerTip("已注册用户请进入站内进行抽奖");

			this.setCountNum=function(num){//设置中奖次数
				// var num=Math.round(100*Math.random());
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

			this.getAndSetCountNum=function(){//获取中奖次数并设置中奖状态
				var self=this;

				var url=self.url.webUrl+self.url.getCountNumUrl;
				var param={
					userId:"123213",
					mark:"123"
				};
				$.ajax({
					type:"get",
					url:url,
					data:param,
					dataType:"jsonp",
					success:function(data){
						if(true){
							var num=Math.round(100*Math.random());
							self.setCountNum(num);
						}
					},
					error:function(){
						console.log("error");
						var num=Math.round(100*Math.random());
						self.setCountNum(num);
					}
				});

			};

			this.setWishNumAndText=function(num){//设置祝福语条数
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

			this.init();//页面初始化
			this.setMarqune();//祝福语滚动条
			this.timeOut();//页面过期提示

			if($(".fixed_reg").length<=0){//已经注册过 不能站外抽奖
				this.setCountNum(0);
			}
			else{
				this.getAndSetCountNum();//设置可抽奖次数以及按钮状态
				this.clickGoHandler();//点击开始按钮  开始抽奖
				this.wishPeople();//点击祝福某人
				this.changePhone();//点击修改手机
			}

		};
		App.prototype={
			init:function(){

				var self=this;

				$("body").on("click",".layermchild .alert_btn",function(){
					var $btn=$(this);
					var href=$btn.attr("data-href");
					if(href){//合作商页面跳转
						window.location.href=href;
					}
					if($btn.hasClass("clickClose")){//需要点击关闭
						layer.closeAll();
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
							alert(JSON.stringify(data));

							if(true){//中奖
								successAnimate(data);//抽中奖项后的动画
							}
							else{//其他未知错误

							}
							
						},
						error:function(e){
							isGetting=false;
							console.log("error");
							successAnimate(data);//抽中奖项后的动画
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
						
						var self=this;
						console.log(data);
						var prize=data.prize||"10元投资话费";
						
						
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
							// shadeClose:false
						});

						self.setCountNum(11);//设置可抽奖状态
					}


				});
			},
			wishPeople:function(){
				//当有手机号码和没有手机号码的时候 需要传递一个标示 方便后台进行判定是新增用户还是对已有用户进行操作
				//有可能该用户直接写上了已经认证过的手机号码
				var self=this;
				$("#wishPeople").on("click",function(){
					if($("#wish_text").text().trim().search(/\d/)=="-1"){//今日已祝福
						return false;
					}
					
					var $phone_mes=$("#phone_mes");
					var hasPhone=!$phone_mes.hasClass("hide")&&$phone_mes.length>0;
					if(hasPhone){
						var html=self.tpl.wishHasPhoneTpl({});
					}
					else{
						var html=self.tpl.wishNoPhoneTpl({});
					}
					
					layer.open({
						content:html,
					});
				});


				$("body").on("click","#alert_wish_btn",function(){
					var $phone_mes=$("#phone_mes");
					var $alert_phone=$(".layermcont .alert_phone");
					var $alert_wish=$(".layermcont .alert_wish");
					var $alert_error=$(".layermcont .alert_error");
					var phoneVal=$alert_phone.val();
					var wishVal=$alert_wish.val();
					var regu =/^1[3578]\d{9}$/; 

					var hasPhone=!($phone_mes.hasClass("hide"));
					if($alert_phone.length>0){//是否有手机
						
						if(phoneVal==""||phoneVal==null){
							$alert_error.removeClass("hide").text("手机号码不能为空");
							return false;
						}
						if(!regu.test(phoneVal) || phoneVal.length != 11){
							$alert_error.removeClass("hide").text("请输入正确的手机号码");
							return false;
						}
					}
					if(wishVal==""||wishVal==null){
						$alert_error.removeClass("hide").text("祝福语不能为空");
						return false;
					}
					if(wishVal.length>40){
						$alert_error.removeClass("hide").text("祝福语不能超过40个字符");
						return false;
					}

					$alert_error.addClass("hide").text("");


					var param={
						wishText:$alert_wish.val().trim(),//祝福语
						otherPhone:$("#refer_phone").val().trim()//别人的手机
					};

					if($alert_phone.length>0){
						param.myPhone=$alert_phone.eq(0).val().trim();
						param.mark=1;//有手机
					}
					else{
						param.myPhone=$("#pagePhone").attr("data-phone").trim();
						param.mark=0;//没有手机
					}
					

					var url=self.url.webUrl+self.url.wishPeopleUrl;
					console.log(param,url);

					$.ajax({
						type:"get",
						url:url,
						data:param,
						dataType:"jsonp",
						success:function(data){

							alert(JSON.stringify(data));
							wishSuccess(data);
						},
						error:function(){
							wishSuccess();
							console.log("error");
						}
					});


					function wishSuccess(data){
						
						if(true){//祝福成功 增加了抽奖机会
							self.setCountNum(123);//设置抽奖次数
							layer.closeAll();
							$("#phone_mes").removeClass("hide");
							$("#pagePhone").attr("data-phone",param.myPhone).text(self.formatPhone(param.myPhone));
							var alertData={
								normalMsg:[
									{text:"<p class='alert_mes'>恭喜您获得<span class='fc-red'>一次</span>开跑机会"+"</p>"+
											"<p class='alert_mes'>快去使用吧</p>"+
											"<p class='alert_mes'>注册后还有更多机会哦</p>"
									}
								]
							};
							var html=self.tpl.alertMsgTpl(alertData);
							layer.open({
								content:html,
								success:function(){
									var htmlH=$("html").height();
									$(".layermbox").css("height",htmlH);
								}
							});

						}
						else if(false){//祝福成功 没有增加抽奖机会
							layer.closeAll();
							$("#phone_mes").removeClass("hide");
							$("#pagePhone").attr("data-phone",param.myPhone).text(self.formatPhone(param.myPhone));
						}
						else{//祝福失败
							self.layerTip("祝福失败"||data.msg);
						}
						self.setWishNumAndText();
					}
					
				});
			},
			changePhone:function(){
				//有可能会修改成已经祝福过的手机号码  或者自己已经祝福过，然后修改成没有祝福过的手机 需要重置祝福状态
				//更或者修改成注册过的用户的手机  此时不能抽奖

				var self=this;

				$("#changePhone").on("click",function(){
					var curPhone=$("#pagePhone").attr("data-phone").trim();
					var html=self.tpl.changePhoneTpl({curPhone:curPhone});
					layer.open({
						content:html,
						success:function(){
							
							var htmlH=$("html").height();
							$(".layermbox").css("height",htmlH);
								
							var $submitBtn=$(".layermchild #alert_change_btn").eq(0);
							$(".layermchild .alert_change_phone").on("input",function(){
								var $inp=$(this);
								validateChangePhone();//验证手机输入框是否合乎标准
							});

							function validateChangePhone(){

								var regu =/^1[3578]\d{9}$/;
								var $phoneInp=$(".layermchild .alert_change_phone").eq(0);
								console.log("validate");
								if(regu.test($phoneInp.val().trim())){
									$submitBtn.removeClass("disabled");
								}
								else{
									$submitBtn.addClass("disabled");
								}
							}
						}
					});


				});

				$("body").on("click",".layermchild #alert_change_btn",function(){
					var $btn=$(this);
					if($btn.hasClass("disabled")){
						return false;
					}
					else{
						var url=self.url.webUrl+self.url.changePhoneUrl;
						var param={
							oldPhone:$("#pagePhone").attr("data-phone").trim(),//老手机
							newPhone:$(".layermchild .alert_change_phone").eq(0).val().trim(),//新手机
						};
						$.ajax({
							type:"get",
							url:url,
							dataType:"jsonp",
							data:param,
							success:function(data){
								alert(JSON.stringify(data));
								changeSuccess(data);
							},
							error:function(){
								changeSuccess();
							}
						});

						function changeSuccess(){
							if(false){
								layer.closeAll();
								$("#pagePhone").attr("data-phone",param.phone).text(self.formatPhone(param.phone));
							}
							else{
								self.layerTip("错误"||data.msg);
							}
						}
					}
				});

			}
		};

		var app=new App();
	});
});