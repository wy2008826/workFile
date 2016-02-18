

$(function(){


	var App=function(){
		this.webURL=$("#webUrl").val();
		this.user_id=(function(){
			var href=window.location.href;
			var index=href.indexOf("?");
			var hashArr=href.substr(index+1).split("?")[0].split("&");
			//return "471662";
			for(var i=0;i<hashArr.length;i++){
				var group=hashArr[i].split("=");
				if(group[0]=="fromUser" ||group[0]=="loginId"){
					return group[1];
				}
				
			}
			return hashArr[0].split("=")[1];
			
		})();
		this.postURL={
			"awardsAndCount":"api/drawPage.html",//list number
			"slotResult":"api/lotteryMasterMethod.html",//
			"flowers":"api/giftOfFlowers.html",//大礼花落,
			"hand":"api/myHandCeremony.html",//伴手礼
			"addAddress":"api/addReceiptAddress.html"//添加地址的url
		};
		this.slotBtnAnimation=function(){//点击抽奖按钮后的动画交互
			var $sec3_tigger_handle=$("#sec3_tigger_handle");

			$("#sec3_tigger_btn").addClass("down");
			$sec3_tigger_handle.addClass("down");
			setTimeout(function(){
				$("#sec3_tigger_btn").removeClass("down");
				$sec3_tigger_handle.removeClass("down");
			},150);
		};
		this.setSlotTab=function(index){//点击老虎机下方的tab按钮 实现页面切换
			var self=this;
			var $nav=$(".tab_content nav");
			var $flowersTab=$nav.find(".flowers");
			var $tabWraper=$(".tab_content .tab_cont_wraper").eq(0);

			$nav.find(".tab-item").eq(index).siblings().removeClass("active").end().addClass("active");
			if(index==0){
				$flowersTab.removeClass("active3").addClass("active1");

			}
			else if(index==1){
				$flowersTab.removeClass("active3 active1");

				var wraper=document.getElementById("tab_flower_quee");
				var inner=document.getElementById("tab_flower_ul");
				var dt= {"list":[{"phone":"13588495366","prize":"iphone6s一台","level":1}
							,{"phone":"15988497755","prize":"手表","level":1}
							,{"phone":"15988497755","prize":"手表","level":1}
							,{"phone":"15988497755","prize":"手表","level":1}
							,{"phone":"15988497755","prize":"手表","level":1}
							,{"phone":"15988497755","prize":"手表","level":1}
							,{"phone":"15988497755","prize":"手表","level":1}
							,{"phone":"15988497755","prize":"手表","level":1}
							,{"phone":"15988497755","prize":"手表","level":1}
							]};
				$.ajax({
					type:"get",
					url:self.webURL+"/"+self.postURL.flowers,
					success:function(data){
						var dt=JSON.parse(data) || dt;
						//console.log(dt);
						showList(dt,wraper,inner,self.flowerTimer,index);
					}
				});
				//showList(dt,wraper,inner,self.flowerTimer,index);
			}
			else if(index==2){
				$flowersTab.removeClass("active1").addClass("active3");
				var wraper=document.getElementById("tab_hand_quee");
				var inner=document.getElementById("tab_hand_ul");
				var dt={
					list:[{"prize":"iphone6s一台","time":"2015-12-21"}
					,{"prize":"手表","time":"2015-5-16"}
					,{"prize":"iphone6s一台","time":"2015-12-21"}
					,{"prize":"iphone6s一台","time":"2015-12-21"}
					,{"prize":"iphone6s一台","time":"2015-12-21"}
					,{"prize":"iphone6s一台","time":"2015-12-21"}
					]
				};
				$.ajax({
					type:"POST",
					url:self.webURL+"/"+self.postURL.hand+"?user_id="+self.user_id,
					dataType:"json",
					success:function(data){
						var dt=data || dt;
						//console.log("伴手礼数据：",data);
						if(dt.list.length<=5){
							$("#hand_swiper_next").hide();
							$("#hand_swiper_prev").hide();

						}
						else{
							$("#hand_swiper_next").show();
							$("#hand_swiper_prev").show();
						}
						showHandList(dt);

						//showList(dt,wraper,inner,self.handTimer,index);
					}
				});
			}

			var itemClass=".item_"+index;
			$tabWraper.find(itemClass).siblings().hide().end().show();


			function showList(data,wraper,inner,interval,index){
				if(interval){
					clearInterval(interval);
				}
				//console.log(index,data);
				var speed=100;

				var direction="down";
				if(index==1){
					var flowerHtml=self.tpl.flower(data);

					inner.innerHTML=flowerHtml;
					self.flowerTimer=setInterval(Marquee,speed)
				}
				else if(index==2){
					var handHtml=self.tpl.hand(data);
					inner.innerHTML=handHtml;
					wraper.scrollTop=0;
					direction="down";
					self.handTimer=setInterval(Marquee,speed)
				}


				function Marquee(){
					if(direction=="down"){
						if(wraper.scrollTop>= (inner.offsetHeight-wraper.offsetHeight)){
							direction="up";
						}
						else{
						  	wraper.scrollTop++
						}
					}
					else if(direction=="up"){
						if(wraper.scrollTop<=0){
							direction="down";
						}
						else{
						  	wraper.scrollTop--
						}
					}
				}
			}

			function showHandList(data){
				$("#hand_swiper_wrapper").html("");
				if(self.mySwiper){
					self.mySwiper=null;
				}

				var listData={"list":[]};
				var num=5;
				var area=Math.ceil(data.list.length / 5);
				for(var i=0;i<area;i++){
					var group={list:[]};
					for(var j=0;j<num;j++){
						group.list.push(data.list[num*i+j]);
					}
					var lists=self.tpl.hand(group);
					var ul=$("<ul class='swiper-slide fn-fl'></ul>");
					ul.html(lists);
					$("#hand_swiper_wrapper").append(ul);
					//console.log(lists);
				}
 				self.mySwiper = new Swiper('#hand_swiper_container',{
				   	initialSlide:0,
				   	direction:"horizontal",
				    loop:false,
				    grabCursor: true
				  });
			}
		};

		this.slotTopSlide=function(data){//老虎机上方的滚动字幕
			var self=this;
			$.ajax({
				type:"post",
				url:self.webURL+"/"+self.postURL.awardsAndCount+"?user_id="+self.user_id,
				dataType:"json",
				success:function(data){
					showSlotSlide(data);
					//alert(JSON.stringify(data));
					//alert(self.webURL+"/"+self.postURL.awardsAndCount+"?user_id="+self.user_id);
				},
				error:function(){
					var data={list:[
							{phone:13588495566,prize:"15元红包"},
							{phone:13588495566,prize:"iphone6s一台"},
							{phone:13588495566,prize:"16元红包"},
							{phone:13588495566,prize:"iphone6s一台"},
							]
					};
					showSlotSlide(data);
				}
			});
			//showSlotSlide();
			function showSlotSlide(data){

				clearInterval(self.slotAwardTimer);
				var dt=data;
				console.log("获奖列表数据：",dt);
				$("#slot_count").html(dt.number);
				$("#slot_user_name").html(dt.username);

				$("#addressName").val(data.aceptname);
				$("#addressTel").val(data.aceptphone);
				$("#addressDetail").val(data.aceptaddress);

				if(data.address!=""){
					$(".tab_cont_wraper").eq(0).find(".add_address").find(" .tit").html("").end().find(".add_address_btn").html("修改收货地址");
				}

				var html=self.tpl.awardList(dt);
				$("#award_list_ul").html(html);
				if(dt.number!=0){
					$("#sec3_tigger_btn").html("点击开始抽奖").css("font-size","16px");
				}
				else{
					if(dt.status){
						$("#sec3_tigger_btn").html("发送请柬，每日再抽一次！").css("font-size","12px");
						console.log(123);
					}
					else{
						$("#sec3_tigger_btn").html("发送请柬，一起庆祝！").css("font-size","16px");
					}
				}
				var speed=100;
				var wraper=document.getElementById("award_list");
				var inner=document.getElementById("award_list_ul");

				var direction="left";
				function Marquee(){
					if(direction=="left"){
						if(wraper.scrollLeft>= (inner.offsetWidth-wraper.offsetWidth)-3){
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
				self.slotAwardTimer=setInterval(Marquee,speed)
			}
		};
		this.slotBtn=function(){
			var self=this;
			if(isComplete() && !isDisabled() ){//避免在跳动的间隙重复点击
					
				self.slotTopSlide();
				$.ajax({
					url:self.webURL+"/"+self.postURL.slotResult+"?user_id="+self.user_id,
					type:"POST",
					dataType:"json",
					success:function(data){
						console.log("抽奖结果数据：",data);
						if(data.result){//有抽奖结果 1-6
							self.slotBtnAnimation();
							$("#sec3_tigger_btn").html("点击开始抽奖").css("font-size","16px");
							setAwardsAnimation(data);
						}
						else{
							if(data.status){
								$("#sec3_tigger_btn").html("发送请柬，每日再抽一次！").css("font-size","12px");
								
							}
							else{
								$("#sec3_tigger_btn").html("发送请柬，一起庆祝！");

							}
							layer.open({
								content: '点击右上方“分享”按钮，分享页面到微信朋友圈！',
							    time: 1000,
							    end:function(){
							    	self.slotTopSlide();
							    }
							});
							self.slotTopSlide();
						}
					}
				});
				//setAwardsAnimation();

			}
			function onComplete($el,active){//单个老虎机的事件回调
				// console.log(this);
				switch($el[0].id){
					case 'slot_left':
						$("#slot_left_val").val("Index: "+active.index);

						break;
					case 'slot_center':
						$("#slot_center_val").val("Index: "+active.index);
						break;
					case 'slot_right':
						$("#slot_right_val").val("Index: "+active.index);
						break;
				}
			}

			function onAllComplete(awardIndex,prize){//所有老虎机完成跳动后的回调函数
				var style="border:2px solid #433c16;border-radius:10px;padding:10px 15px;width:80%;";
				//console.log(awardIndex);
				var failHtml=$("#award_fail").html();
				var successWraper=$("#award_success");
				if(awardIndex==6){
					layer.open({
						type:1,
						content:self.tpl.awardFail({"award":prize}),
						style:style
					});
				}
				else if(awardIndex<6){//
					layer.open({
						type:1,
						content:self.tpl.awardSuccess({"award":prize}),
						style:style
					});
				}
				self.slotTopSlide();

			}
			function isComplete(){//判定所有老虎机是否完成
				return $(".slotMachineGradient").length==0?true:false;
			}

			function isDisabled(){
				return $("#sec3_tigger_btn").attr("data-disabled")=="disabled"?true:false;
			}
			function setAwardsAnimation(data){//中奖跳动动画

				var val1=data.randomNumberOne||2;
				var val2=data.randomNumberTwo||3;
				var val3=data.randomNumberThree||3;
				self.machine1.setResult(val1-1);//设置中奖状态
				self.machine2.setResult(val2-1);
				self.machine3.setResult(val3-1);

				self.machine1.shuffle(3, onComplete);//跳动3s
				self.machine2.shuffle(3, onComplete);
				self.machine3.shuffle(3, onComplete);

				//var awardIndex = (val1==val2 && val2==val3)?val1-1:false;
				var awardIndex = data.level;
				var timer=setInterval(function(){
					if(isComplete()){
						onAllComplete(awardIndex,data.prize);
						clearInterval(timer);
					}
				},30);

			}
		}
		this.tpl={
			flower:Handlebars.compile( $("#tab_flower_tpl").html() ),
			hand:Handlebars.compile( $("#tab_hand_tpl").html() ),
			awardSuccess:Handlebars.compile( $("#award_success").html() ),
			awardFail:Handlebars.compile( $("#award_fail").html() ),
			awardList:Handlebars.compile( $("#award_list_tpl").html() )
		};

		this.awards={
			code0:{
				text:"iphone6s一台",
				imgSrc:window.awardsSrc.phone
			},
			code1:{
				text:"Apple watch一只",
				imgSrc:window.awardsSrc.iwatch
			},
			code2:{
				text:"500元加油卡一张",
				imgSrc:window.awardsSrc.oil
			},
			code3:{
				text:"小熊充电器一台",
				imgSrc:window.awardsSrc.bear
			},
			code4:{
				text:"自拍神器一根",
				imgSrc:window.awardsSrc.photo
			}
		};
		this.init();//页面初始化
		this.countDown();//倒计时效果
		this.helper();//注册helper
		this.fullPage();//滚屏功能
		this.clickGo();//点击首页对应地方实现页面滑动
		this.slot();//老虎机抽奖功能
		this.slotRules();//老虎机下方按钮 tab页面上方按钮 tab页面返回效果
		//this.slotDialogBtns();//老虎机抽奖结果弹框的按钮点击效果
		this.addAddress();//添加收货地址  包括点击提交地址按钮
	}

	App.prototype={
		init:function(){
			var self=this;
			// $("#hand_swiper_prev").click(function(){
			// 	self.mySwiper.swipePrev();
			// });
			// $("#hand_swiper_next").click(function(){
			// 	self.mySwiper.swipeNext();
			// });

		},
		countDown:function(){
			var self=this;
			var btn=$("#sec3_tigger_btn");
			var anniversaryTimeVal =1445824800,//10月26日 10:00开始
			systemTime = $("#slotTimer").val();
			var timeVal = (anniversaryTimeVal - systemTime);
			var timeCountDown = setInterval(function(){
		        if (timeVal > 1) {
		        	btn.attr("data-disabled","disabled");
		        	timeVal -= 1;
		          var day1 = Math.floor((timeVal / 3600) / 24);
		          var hour1 = Math.floor((timeVal / 3600) % 24);
		          var minute1 = Math.floor((timeVal / 60) % 60);
		          var second1 = Math.floor(timeVal % 60);
		          var showDay1 = day1;
		          var showHour1 = hour1<10?"0"+hour1:hour1;//计算小时数
		          var showMinute1 = minute1<10?"0"+minute1:minute1;//计算分钟数
		          var showSecond1 = second1<10?"0"+second1:second1;//计算秒数
		          if(showDay1 > 0){
		        	  btn.html(showDay1 + "<span>天</span>" + showHour1 + ":" + showMinute1 + ":" + showSecond1);
		          }else{
		        	  btn.html(showHour1 + "&nbsp;:&nbsp;" + showMinute1 + "&nbsp;:&nbsp;" + showSecond1);
		          }
		          
		        } else { 
		        	clearInterval(timeCountDown);
		        	btn.attr("data-disabled","abled");
		        	//self.slotTopSlide();
		           // window.location.reload();
		        }
		    }, 1000);

		},
		helper:function(){
			var self=this;

			Handlebars.registerHelper("telHide",function(phone,options){
				return phone.substr(0,3)+"****"+phone.substr(7,11);
			});
			Handlebars.registerHelper("imgSrc",function(code,options){

				return self.awards["code"+(code-1)].imgSrc;

			});
			Handlebars.registerHelper("awardText",function(code,options){
				if(code<6){
					return self.awards["code"+(code-1)].text;
				}
				else{
					return "123";
				}


			});

		},
		fullPage:function(){
			var self=this;
			$("#wraper").fullpage({
				scrollingSpeed:600,//滚动速度
				afterLoad:function(link,index){
					//console.log(index);
					if(index==2){
						$(".section.add").addClass("animation");
					}
				},
				onLeave:function(index,nextIndex,dir){
					//console.log(index,nextIndex,dir);
					if(nextIndex==2){
						$(".section.add").removeClass("animation");
					}
				}
			});
		},
		clickGo:function(){
			var self=this;
			$("#sec1_tigger_go").click(function(){

				$.fn.fullpage.moveTo(3);
			});
			$("#sec1_add_go").click(function(){
				$.fn.fullpage.moveTo(2);
			});
			$("#sec1_package_go").click(function(){
				$.fn.fullpage.moveTo(4);
			});
		},
		slot:function(){
			var self=this;
			self.slotTopSlide();//预加载抽奖次数和获奖列表
			var tiggerBtn=$("#sec3_tigger_btn")[0];
			self.machine1 = $("#slot_left").slotMachine({
				active	: 0,
				delay	: 500
			});
			self.machine2 = $("#slot_center").slotMachine({
				active	: 1,
				delay	: 1000
			});
			self.machine3 = $("#slot_right").slotMachine({
				active	: 2,
				delay	: 1500
			});

			function onComplete($el,active){//单个老虎机的事件回调
				// console.log(this);
				switch($el[0].id){
					case 'slot_left':
						$("#slot_left_val").val("Index: "+active.index);

						break;
					case 'slot_center':
						$("#slot_center_val").val("Index: "+active.index);
						break;
					case 'slot_right':
						$("#slot_right_val").val("Index: "+active.index);
						break;
				}
			}

			function onAllComplete(awardIndex,prize){//所有老虎机完成跳动后的回调函数
				var style="border:2px solid #433c16;border-radius:10px;padding:10px 15px;width:80%;";
				//console.log(awardIndex);
				var failHtml=$("#award_fail").html();
				var successWraper=$("#award_success");
				if(awardIndex==6){
					layer.open({
						type:1,
						content:self.tpl.awardFail({"award":prize}),
						style:style
					});
				}
				else if(awardIndex<6){//
					layer.open({
						type:1,
						content:self.tpl.awardSuccess({"award":prize}),
						style:style
					});
				}
				self.slotTopSlide();

			}
			function isComplete(){//判定所有老虎机是否完成
				return $(".slotMachineGradient").length==0?true:false;
			}

			function isDisabled(){
				return $("#sec3_tigger_btn").attr("data-disabled")=="disabled"?true:false;
			}
			function setAwardsAnimation(data){//中奖跳动动画

				var val1=data.randomNumberOne||2;
				var val2=data.randomNumberTwo||3;
				var val3=data.randomNumberThree||3;
				machine1.setResult(val1-1);//设置中奖状态
				machine2.setResult(val2-1);
				machine3.setResult(val3-1);

				machine1.shuffle(3, onComplete);//跳动3s
				machine2.shuffle(3, onComplete);
				machine3.shuffle(3, onComplete);

				//var awardIndex = (val1==val2 && val2==val3)?val1-1:false;
				var awardIndex = data.level;
				var timer=setInterval(function(){
					if(isComplete()){
						onAllComplete(awardIndex,data.prize);
						clearInterval(timer);
					}
				},30);

			}

		},
		slotRules:function(){
			var self=this;
			var $slotSection=$("section.slot").eq(0);
			$slotSection.find( ".sec3_rules").on("click",".rules_item",function(){//点击老虎机下方按钮
				var index=$(this).attr("data-val");
				self.setSlotTab(index);
				$slotSection.find(".slot_cont").hide().end().find(".tab_content").show();
			});


			var $nav=$(".tab_content nav");
			var $flowersTab=$nav.find(".flowers");
			$nav.on("click",".tab-item",function(){//点击tab页面头部的按钮
				var index=$(this).attr("data-val");
				self.setSlotTab(index);
			});

			$("#tab_cont_back").click(function(){//点击返回转赚乐按钮
				$slotSection.find(".slot_cont").show().end().find(".tab_content").hide();
			});
		},
		slotDialogBtns:function(){
			var self=this;
			$(document).on("click",".layermmain .look",function(){//查看我的礼物
				try{
					
					layer.closeAll();
					$(".layermbox").remove();

				}
				catch(e){
					console.log(e);
				}
				
				self.setSlotTab(2);
				var $slotSection=$("section.slot").eq(0);
				$slotSection.find(".slot_cont").hide().end().find(".tab_content").show();
			});
			$(document).on("click",".layermmain .continueBtn",function(){
				try{
					
					layer.closeAll();
					$(".layermbox").remove();
				}
				catch(e){
					console.log(e);
				}
				
			});
			
		},
		addAddress:function(){
			var self=this;
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

			var $slotSection=$("section.slot").eq(0);
			$("#add_address_btn").click(function(){//点击添加地址按钮
				$slotSection.find(".item_2").hide();
				$slotSection.find(".item_address").show();
			});

			$("#submit_address").click(function(){//点击地址提交保按钮
				var nameInp=$("#addressName");
				var telInp=$("#addressTel");
				var addressInp=$("#addressDetail");
				var telReg=/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;

				var tab3Wraper=$(".tab_cont_wraper").eq(0);
				var errorP=tab3Wraper.find(".item_address .text-danger").eq(0);
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

					var dataStr="?user_id="+self.user_id+"&name="+nameInp.val()+"&phone="+telInp.val()+"&address="+addressInp.val();
					$.ajax({
						type:"POST",
						url:self.webURL+"/"+self.postURL.addAddress+dataStr,
						dataType:"json",
						success:function(){
							submitSuccess();
						}
					});

					submitSuccess();
				};

				function showError(mes){
					errorP.html(mes).show();
					setTimeout(function(){
						errorP.fadeOut();
					},1000);
				}

				function submitSuccess(){
					tab3Wraper.find(".add_address").find(" .tit").html("").end().find(".add_address_btn").html("修改收货地址");
					layer.open({
						content: '保存成功！',
					    time: 1,
					    end:function(){
					    	tab3Wraper.find(".tab_cont_item.item_address").hide();
					    	tab3Wraper.find(".tab_cont_item.item_2").show();
					    }
					});
				}
			});
			
			if($("#addressDetail").val()!=""){//如果收货地址不为空，更改提示状态
				$(".tab_cont_wraper").eq(0).find(".add_address").find(" .tit").html("").end().find(".add_address_btn").html("修改收货地址");
			}
		}
	}
	app=new App();

	//alert(window.location.href);
	//alert(app.user_id);
});