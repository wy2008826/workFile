

$(function(){
	var App=function(){

		this.url={
			webUrl:$("#weburl").val(),
			nowTime:"/activity/2015/doublegetservertime.html",//  nowtime
			getCount:"/api/drawPage.html",//获取可抽奖次数
			getClickAward:"/api/lotteryMasterMethod.html",//点击抽奖 user_id  phone_type
			getOtherAwardsLists:"/api/giftOfFlowers.html",//其他人的获奖列表  
			getMeAwardsLists:"/api/myHandCeremony.html",//user_id 自己的获奖列表,
			addAddress:"/api/addReceiptAddress.html"//收货地址 页面传过来参数：name phone address
		};

		this.getParam=function(key){
			var href=window.location.href;
			var index=href.indexOf("?");
			var hashArr=href.substr(index+1).split("?")[0].split("&");
			for(var i=0;i<hashArr.length;i++){
				var group=hashArr[i].split("=");
				if(group[0]==key){
					return group[1];
				}
			}
			// return hashArr[0].split("=")[1];
		}
		
		var user_id=this.getParam("userId")||this.getParam("fromUser")||this.getParam("loginId");
		this.user_id=user_id;
		this.phone_type=this.getParam("phoneType")||"undefined";
		this.isTest=this.getParam("isTest");

		this.addressMes={
			editAddress:"修改收货地址",
			submitAddress:"修改编辑"
		};
		this.tpl={
			awardsMarquneTpl:_.template($("#awards_marqune_tpl").html()),//
			bigGiftAlertTpl:_.template($("#bigGiftTpl").html()),
			smallGiftAlertTpl:_.template($("#smallGiftTpl").html()),
			noGiftAlertTpl:_.template($("#noGiftTpl").html()),
			otherAwardsTableTpl:_.template($("#other_awards_table_tpl").html()),
			myGiftTpl:_.template($("#my_awards_table_tpl").html())

		};
		this.setCountNum=function(num){//设置可抽奖次数
			if(typeof (num*1=="number")){
				$("#count").text(num);
			}
		};

		this.getCountNum=function(){
			var self=this;
			$.ajax({
				url:self.url.webUrl+self.url.getCount+"?user_id="+self.user_id,
				type:"POST",
				dataType:"json",
				success:function(data){
					console.log(data);
					self.setCountNum(data.number);
					// alert(JSON.stringify(data));
					if($("#userName").text().length<11){
						$("#userName").text(data.username).css("color","#fff");
					}
					// $("#userName").text(data.username).css("color","#fff");
					// alert($("#userName").css("color"));
					if(data.aceptname&&data.aceptphone&&data.aceptaddress){
						$("#addressName").val(data.aceptname);
						$("#addressTel").val(data.aceptphone);
						$("#addressDetail").val(data.aceptaddress);

						$("#add_address_btn").find("span").eq(0).html(self.addressMes.editAddress);
						$("#submit_address").html(self.addressMes.submitAddress);
					}
					

				}
			});
		};


		this.setMarqune=function(html){
			var self=this;
			var html=html||"";
			$("#awards_marqune_ul").html(html);
			var speed=100;
			var wraper=document.getElementById("award_lists");
			var inner=document.getElementById("awards_marqune_ul");

			var direction="top";
			function Marquee(){
				if(direction=="top"){
					if(wraper.scrollTop>= (inner.offsetHeight-wraper.offsetHeight)){
						direction="bottom";
					}
					else{
					  	wraper.scrollTop++
					}
				}
				else if(direction=="bottom"){
					if(wraper.scrollTop<=0){
						direction="top";
					}
					else{
					  	wraper.scrollTop--
					}
				}
			}
			clearInterval(self.timer);
			self.timer=setInterval(Marquee,speed);

		};
		this.setTableIndex=function(index){
			var self=this;
			var $tabNav=$("#tab_nav");
			var $tableWraper=$("#table_sections_wraper");

			var className=".section"+index;
			$tabNav.find(".active").removeClass("active").end().find("li[data-index="+index+"]").addClass("active");

			if(index==1){
				$tableWraper.find("section").hide().end().find(className).show();
			}
			else if(index==2){
				var data={
					lists:[
						{phone:"158****9999",prize:"15元红包"},
						{phone:"158****9999",prize:"加湿器"},
					]
				};
				$.ajax({
					url:self.url.webUrl+self.url.getOtherAwardsLists,
					type:"GET",
					dataType:"json",
					success:function(data){
						//alert(JSON.stringify(data));
						if(data.list.length<=0){//没有列表就显示没有列表时候的提示信息
							$tableWraper.find(".no_list").show();
							$tableWraper.find(".list_wraper").hdie();
						}
						else{
							$tableWraper.find(".no_list").hide();
							$tableWraper.find(".list_wraper").show();
						}

						if(data.list.length>10){
							data.list.length=10;
						}
						var html=self.tpl.otherAwardsTableTpl(data);
						$("#other_awards_table_ul").html(html);
					},
					error:function(){
						// var html=self.tpl.otherAwardsTableTpl(data);
						// $("#other_awards_table_ul").html(html);
					}
				});
				$tableWraper.find("section").hide().end().find(className).show();
			}
			else if(index==3){
				$("#address_items").hide();
				$tableWraper.find("section").hide().end().find(className).show();
				var dt={
					list:[{"prize":"iphone6s一台","time":"2015-12-21"}
					,{"prize":"手表","time":"2015-5-16"}
					]
				};
				$.ajax({
					url:self.url.webUrl+self.url.getMeAwardsLists+"?user_id="+self.user_id,
					type:"POST",
					dataType:"json",
					success:function(data){
						//alert("我的获奖列表："+JSON.stringify(data));
						if(data.list.length<=5){
							$("#hand_swiper_next").hide();
							$("#hand_swiper_prev").hide();
						}
						else{
							$("#hand_swiper_next").show();
							$("#hand_swiper_prev").show();
						}
						showHandList(data);
					},
					error:function(){
						showHandList(data||dt);
					}
				});



				function showHandList(data){
					$("#hand_swiper_wraper").html("");
					if(self.mySwiper){
						self.mySwiper.destroy();
						self.mySwiper=null;
					}

					var num=5;
					var area=Math.ceil(data.list.length / 5);
					
					for(var i=0;i<area;i++){
						var group={lists:[]};
						for(var j=0;j<num;j++){
							if(data.list[num*i+j]){
								group.lists.push(data.list[num*i+j]);
							}
						}

						var lists=self.tpl.myGiftTpl(group);
						var ul=$("<ul class='swiper-slide fn-fl my_awards_ul'></ul>");
						ul.html(lists);
						$("#hand_swiper_wraper").append(ul);
					};
	 				self.mySwiper = new Swiper('#hand_swiper_container',{
					   	initialSlide:0,
					   	direction:"horizontal",
					    loop:false,
					    grabCursor: true,
					    pagination: '.pager'
					});
					$("#hand_swiper_wraper")[0].style.webkitTransform="translate3d(0px,0px,0px)";

				}

			}
			
		};

		this.lookGift=function(){
			var self=this;
			layer.closeAll();
			self.setTableIndex(3);
			var offsetTop=$("#tab_nav")[0].offsetTop;
			$("html,body").animate({
				scrollTop:offsetTop-100
			},600);
		};


		this.durTime=1000;
		this.init();//页面初始化
		if(this.isTest==1){
		}
		else{
			this.notStart();//活动尚未开始
		}
		
		this.getAwardLists();//设置marqune
		this.clickCard();//点击牌子
		this.tabChange();//选项卡切换
		this.clickAlertBtn();//点击弹框里面的按钮
		this.sendAddress();//发送收货地址
	};

	App.prototype={
		init:function(){
			var self=this;
			//alert("location:"+window.location.href+"    user_id:"+this.user_id+"  phone_type:"+this.phone_type);
			// alert("user_id:"+this.user_id+"  phone_type:"+this.phone_type);
			// if(self.user_id==undefined||self.user_id=="undefined"){
			// 	$(".top_section  .user_mes").hide();
			// }
			// else{
			// 	$(".top_section  .user_mes").show();
			// }

		},
		notStart:function(){
			var self=this;
			$.ajax({
				url:self.url.webUrl+self.url.nowTime,
				type:"GET",
				dataType:"json",
				success:function(data){
					// var now=data.nowtime;
					// alert(data.nowtime);
					//alert(JSON.stringify(data));
					var anniversaryTimeVal =1450922400 ;//12月24日 10:00开始 1450922400  
					var systemTime =data.nowtime;
					var timeVal = (anniversaryTimeVal - systemTime);

					var day1 = Math.floor((timeVal / 3600) / 24);
			        var hour1 = Math.floor((timeVal / 3600) % 24);
			        var minute1 = Math.floor((timeVal / 60) % 60);

			        // alert(day1+":"+hour1+":"+minute1);
			        if(day1<0||hour1<0||minute1<0){
			        	return false;
			        }
					var timeCountDown = setInterval(function(){
				        if (timeVal > 1) {
				        	timeVal -= 1;
				        	$(".alert_shade").show();
				        	$(".not_start").show();
				        } else { 
				        	clearInterval(timeCountDown);
				        	$(".alert_shade").hide();
				        	$(".not_start").hide();
				        	//self.slotTopSlide();
				           window.location.reload();
				        }
				    }, 1000);
				}
			});
			
			
		},
		getAwardLists:function(){
			var self=this;
			var data={
				list:[
					{phone:"158****9999",prize:"5元话费"},
					{phone:"158****9999",prize:"10元话费"},
				]
			};
			$.ajax({
				url:self.url.webUrl+self.url.getCount+"?user_id="+self.user_id,
				type:"POST",
				dataType:"json",
				success:function(data){
					// alert("其他获奖人列表:"+JSON.stringify(data));
					// console.log("其他获奖人列表:"+JSON.stringify(data));
					var html=self.tpl.awardsMarquneTpl(data);
					self.getCountNum();
					self.setMarqune(html);
				},
				error:function(){
					// var html=self.tpl.awardsMarquneTpl(data);
					// self.setMarqune(html);
				}
			});
		},
		clickCard:function(){
			var self=this;
			var isAnimating=false;//是否正在转动动画
			$(".cards_wraper").on("click",".cards_item",function(){
				var $card=$(this);
				
				if(!isAnimating){
					isAnimating=true;
					$.ajax({
						url:self.url.webUrl+self.url.getClickAward+"?user_id="+self.user_id+"&phoneType="+self.phone_type,
						type:"POST",
						dataType:'json',
						success:function(data){
							// var data=JSON.parse(JSON.stringify(data));
							//alert(JSON.stringify(data));
							if(data.result){//有抽奖结果 1-6
								isAnimating=true;
								if( (data.level<=5) && (data.level>0) ){//实物奖品
									getBigSuccss($card,data.prize);
								}
								else if(data.level==6){//话费
									getSmallSuccss($card,data.prize);
								}
								else if(data.level==7){
									getNoneGift($card);
								}
							}
							else{
								isAnimating=true;
								if(data.status){//true  当日已经分享过
									layer.open({
										content: '抽奖机会已经用完咯！',
									    time: 2,
									    end:function(){
									    	isAnimating=false;
									    }
									});
								}
								else if(data.status==false){//false   当日还没有分享
									layer.open({
										content: '抽奖机会已经用完咯，每日分享还可获得一次抽奖机会',
									    time: 2,
									    end:function(){
									    	isAnimating=false;
									    }
									});
								}
							}

						},
						error:function(){
							isAnimating=true;
							//alert("error");
							// getBigSuccss($card,"name")
							// getNoneGift($card);
							// getSmallSuccss($card,"5元话费");
						}
					});
				};

			});

			function getBigSuccss(card,name){//抽中大奖
				card.addClass("animate");
				setTimeout(function(){
					isAnimating=false;
					var html=self.tpl.bigGiftAlertTpl({"name":name});
					layer.open({
						content:html
					});
					self.getAwardLists();
					card.removeClass("animate");
				},self.durTime);

			}

			function getSmallSuccss(card,telFare){//抽到话费等极小奖品
				card.addClass("animate");
				setTimeout(function(){
					isAnimating=false;
					var html=self.tpl.smallGiftAlertTpl({"telFare":telFare});
					layer.open({
						content:html
					});
					self.getAwardLists();
					card.removeClass("animate");
				},self.durTime);
			}
			function getNoneGift(card){//没有抽到任何奖品
				card.addClass("animate");
				setTimeout(function(){
					isAnimating=false;
					var html=self.tpl.noGiftAlertTpl({});
					layer.open({
						content:html
					});
					self.getAwardLists();
					card.removeClass("animate");
				},self.durTime);
			}
			function hasGetAll(){//已经用完抽奖机会
				isAnimating=false;
				layer.open({
					content:"抽奖机会已经用完",
					time:"2",
					end:function(){
						console.log(0234);
					}
				});
				self.getAwardLists();
			}
		},
		tabChange:function(){
			var self=this;
			$("#tab_nav").on("click","li",function(){
				var $li=$(this);
				if( !($li.hasClass("active")) ){
					var index=$li.attr("data-index");
					self.setTableIndex(index);
				}
				
				
			});
		},
		clickAlertBtn:function(){
			var self=this;
			// $("body,html").on("click",".look",function(){//点击查看我的礼物
			// 	layer.closeAll();
			// 	self.setTableIndex(3);
			// 	var offsetTop=$("#tab_nav")[0].offsetTop;
			// 	$("html,body").animate({
			// 		scrollTop:offsetTop-100
			// 	},600);

			// }).on("click",".continue",function(){//点击继续抽奖
			// 	layer.closeAll();
			// }).on("click",".no",function(){//点击不抽了
			// 	layer.closeAll();
			// });


		},
		sendAddress:function(){
			var self=this;
			$("#add_address_btn").click(function(){//为按钮添加点击事件
				var $address_items=$("#address_items");
				var display=$address_items.css("display");
				if(display=="none"){
					$address_items.show();
				}
				else{
					$address_items.hide();
				}
			});

			var mes={
				Name:{
					Required:"姓名为必填项！",
					Length:"姓名最多为10个字符！"
				},
				Tel:{
					Required:"手机为必填项！",
					Type:"请输入正确的手机号码！"
				},
				Address:{
					Required:"地址为必填项！",
					Length:"地址最多为40个字符！"
				}
			};

			// var $slotSection=$("section.slot").eq(0);
			// $("#add_address_btn").click(function(){//点击添加地址按钮
			// 	$slotSection.find(".item_2").hide();
			// 	$slotSection.find(".item_address").show();
			// });


			$("#submit_address").on("click",function(){
				console.log("submit");
				var nameInp=$("#addressName");
				var telInp=$("#addressTel");
				var addressInp=$("#addressDetail");
				var telReg=/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;

				var $tab3Wraper=$("#table_sections_wraper");
				var errorP=$tab3Wraper.find(".address_items .text-danger").eq(0);
				var agreeVal=$("#agree_send").prop("checked");
				if(agreeVal){//是否同意提交信息
					if(nameInp.val()==""){
						showError(mes.Name.Required);
						return false;
					}
					else if(nameInp.val().length>10){
						showError(mes.Name.Length);
						return false;
					}
					if(telInp.val()==""){
						showError(mes.Tel.Required);
						return false;
					}
					else if(telInp.val().search(telReg) <0){
						showError(mes.Tel.Type);
						return false;
					}
					if(addressInp.val()==""){
						showError(mes.Address.Required);
						return false;
					}
					else if(addressInp.val().length>40){
						showError(mes.Address.Length);
						return false;
					}

					var dataStr="?user_id="+self.user_id+"&aceptname="+nameInp.val()+"&aceptphone="+telInp.val()+"&aceptaddress="+addressInp.val();
					$.ajax({
						type:"POST",
						url:self.url.webUrl+self.url.addAddress+dataStr,
						dataType:"json",
						success:function(data){
							//alert("添加收货地址成功："+JSON.stringify(data));
							submitSuccess();
						},
						error:function(){
							// submitSuccess();
						}
					});

					// submitSuccess();
				};

				function showError(mes){
					errorP.html(mes).show();
					setTimeout(function(){
						errorP.fadeOut();
					},1000);
				}

				function submitSuccess(){
					$tab3Wraper.find(".add_address_btn span").html(self.addressMes.editAddress);
					$("#submit_address").html(self.addressMes.submitAddress);
					layer.open({
						content: '保存成功！',
					    time: 1,
					    end:function(){
					    	$tab3Wraper.find(".tab_cont_item.item_address").hide();
					    	$tab3Wraper.find(".tab_cont_item.item_2").show();
					    	$("#address_items").hide();
					    }
					});
				}
			});
			
			if( $("#addressName").val()!="" && $("#addressTel").val()!="" && $("#addressDetail").html()!="" ){//如果收货地址不为空，更改提示状态
				$("#add_address_btn").find("span").eq(0).html(self.addressMes.editAddress);
				$("#submit_address").html(self.addressMes.submitAddress);
			}

		}
	};
	
	app=new App();

	var colorInterval=setInterval(function(){
		var color=$("#userName").css("color");
		if(color!="rgb(255,255,255)"){
			$("#userName").css("color","#fff");
		}
		else{
			clearInterval(colorInterval);
		}
		// $("#userName").css("color","#fff");

	},20);


	function connectWebViewJavascriptBridge(callback) {//判断APP是否支持WebViewJavascriptBridge
		if (window.WebViewJavascriptBridge) {
			callback(WebViewJavascriptBridge)
		} else {
			
			document.addEventListener('WebViewJavascriptBridgeReady', function() {
				callback(WebViewJavascriptBridge)
			}, false)
		}
	}

	connectWebViewJavascriptBridge(function(bridge) {
		
		bridge.init(function(message, responseCallback) {
			var data = { 'Javascript Responds':'Wee!' }
			responseCallback(data)
		});

		//分享成功后处理
		bridge.registerHandler('shareStatusHandler', function(data, responseCallback) {
			//alert("分享成功："+JSON.stringify(data));
			if(typeof data=="string") data = JSON.parse(data);
			if(data.greetingFromObjC == 1){
				//alert("greetingFromObjC==1");
				app.getCountNum();
			}//分享成功后，刷新抽奖次数
			else{
				//alert("greetingFromObjC！=1");
			}
		});
		
		//进入页面后获取手机型号等相关信息
		bridge.callHandler('getVersionHandler',{'ver': '1202'}, function(response) {

			if(typeof response=="string"){
				//alert("分享成功返回格式："+response);
			}
			else{
				//alert("分享成功返回格式："+JSON.stringify(response));
			}
			//alert("获取手机型号信息："+JSON.stringify(response));

			if(typeof response=="string")response = JSON.parse(response);
			
			appVer = response.ver;
			//alert(appVer);
			phoneType = response.phoneType;
			clientOS = response.os;

			// 判断安卓APP客户端版本号
			if(appVer!="1.6.0.2"){//版本提示信息
				// openTips();
			}

		}) 
	});


});




