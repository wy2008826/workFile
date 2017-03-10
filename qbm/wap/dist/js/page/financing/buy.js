define(function(require,exports,module){
	require("zepto");
	
	require('fastclick');
	FastClick.attach(document.body);
	template=require("artTemplate");


	template.helper("selectedClass",function(status){
		if(status==1){//id一致
			return "active";
		}
		else{
			return "";
		}
	});

	//注册过期时间的helper
	template.helper("timeLeft",function(time){
		var now=new Date();
		var expried=new Date(time);
		var seconds=expried*1-now*1;
		var days=Math.ceil(seconds / (24 * 60 *60 *1000));
		return days+1;
		//console.log(seconds,days);
	});

	$(function(){

		var App=function(){

			this.url={
				wapUrl:$("#wapurl").val(),
				buyBorrow:"/api/member/tender.html",//购买
				packetList:"/api/member/getRedPacketList.html"//获取当前标合适的红包列表
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
			};

			
			this.alertMes=function(html){
				layer.open({
					content:html,
					shadeClose:false,
					type:1,
					className:"hasPadding",
					btn:["好的"]
				});
			};

			this.tipAlert=function(html){
				layer.open({
					content:html,
					className:"layer-tip",
					time:2,
					shadeClose:false
				});
			}


			this.borrow_id=this.getParam("borrow_id");//标id
			this.borrowTimeLimit=$("#borrowTimeLimit").val().trim()*1;//项目天数

			this.calRate=function(redVal,buyAcount){//计算加息的百分比 redVal:红包金额 buyAcount：购买金额
				var raise=((redVal * 365 *100)/(buyAcount * this.borrowTimeLimit))+"";
				var dotIndex=(raise).indexOf(".");
				var hasDot=dotIndex>0?true:false;
				if(hasDot){
					return raise.substr(0,dotIndex+3) +"%";
				}
				else{
					return raise +"%";
				}
				
			}
			this.isIos=(function(){//判断是否是ios设备 对可输入性弹框做处理
				var userAgent=window.navigator.userAgent;
				if(userAgent.indexOf("iPhone")>=0){
					return true;
				}
				else{
					return false;
				}

			})();


			var $selectHongBao=$("#selectHongBao");
			var $hongbao_not=$("#hongbao_not");
			var $hongbao_yes=$("#hongbao_yes");
			var $pageHbMoney=$("#pageHbMoney");//使用红包的金额

			var $actural_money=$("#actural_money");
			var $add_raise=$("#add_raise");

			this.setMesAndPacket=function(){//获取红包信息和最佳红包

				var self=this;
				var url=this.url.wapUrl+this.url.packetList;
				var account=$("#cashNum").val();//购买金额
				var param={
					borrow_id:this.borrow_id,//标id
					account:account,//购买金额
					currentPage:1,//当前页码
					pernum:1//每页显示条目数量
				};

				$.ajax({
					url:url,
					type:"get",
					dataType:"jsonp",
					data:param,
					success:function(data){
						if(data.result){
							if(data.hongbaoList.length>0){
								var hongbao=data.hongbaoList[0];
								var name=hongbao["name"];
								var money=hongbao.money;
								var id=hongbao["id"];
								var rate=self.calRate(money,account*1);

								$selectHongBao.attr("data-id",id);
								$pageHbMoney.text(money);
								$hongbao_not.addClass("hide");
								$hongbao_yes.removeClass("hide");
								$actural_money.text(account*1+money*1);
								$add_raise.text(rate);
							}
							else{
								self.initPacket();//重置各种显示状态
							}
						}
						else{
							if(data.code==-1){//登录超时
								$("#buyNow").attr("data-timeout",1);
							}
							self.initPacket();//重置各种显示状态
						}
					}
				});
			};

			this.initPacket=function(){//重置在没有红包可选的各种显示状态
				var account=$("#cashNum").val().trim();//购买金额

				$selectHongBao.attr("data-id","");
				$pageHbMoney.text("0");
				if(account==""){
					$hongbao_not.text("输入购买金额后匹配红包");
				}
				else{
					$hongbao_not.text("暂无匹配红包");
				}
				$hongbao_not.removeClass("hide");
				$hongbao_yes.addClass("hide");
				$actural_money.text("0");
				$add_raise.text("0%");
			}
			
			this.init();
			this.lookAgreenment();//预览协议
			this.inputMoney();//输入购买金额
			this.buyNow();//立即购买
			this.selectRedPacket();//选择红包
		};

		App.prototype={
			init:function(){
				var self=this;

				//点击 tap-link标示的链接 进行页面跳转
				$("body").on("click",".tap-link",function(e){
					e.preventDefault();
					e.stopPropagation();
					var href=$(this).attr("data-href");
					window.location.href=href;
				});

				

				$("body").on("click",".layermbtn span[type='0']",function(){
					layer.closeAll();
				});


			},
			lookAgreenment:function(){
				var self=this;
				$("#agreenmentLink").on("click",function(){
					var isTransfer=false;//是否是转让标
					if(isTransfer){
						var href=self.url.wapUrl+"/financing/transfer-agreement.html?id="+transferId;
					}
					else{
						var href=self.url.wapUrl+"/financing/investment-agreement.html?id="+self.borrow_id;
					}
					window.location.href=href;
				});
			},
			inputMoney:function(){
				var self=this;
				var $inpMoney=$("#cashNum");
				var $buyNowBtn=$("#buyNow");
				var moneyReg=/^\d+\.\d+|\d+$/;

				$inpMoney.on("input",setBuyBtnStatus);
				
				setBuyBtnStatus();
				function setBuyBtnStatus(){
					var checked=checkAll();
					var moneyVal=$inpMoney.val();
					if(!checked){
						$buyNowBtn.addClass("disabled");
						self.initPacket();
					}
					else{
						$buyNowBtn.removeClass("disabled");
						self.setMesAndPacket(moneyVal);
					}
				}

				function checkAll(){
					var moneyVal=$inpMoney.val();
					if(moneyReg.test(moneyVal)){
						moneyVal*=1;
						if(moneyVal<100){
							return false;
						}
						else{
							return true;
						}
					}
					else{
						return false;
					}
				}
			},
			buyNow:function(){
				var self=this;

				template=require("artTemplate");
				require("layer");

				var $cashNumInp=$("#cashNum");
				var $buyNowBtn=$("#buyNow");
				var inputTpl=template.compile($("#inputPwdTpl").html());
				
				$buyNowBtn.on("click",function(){
					if($(this).hasClass("disabled")){//如果按钮不可点  立即返回
						return false;
					};
					var money=($cashNumInp.val().trim())*1;
					var account=($("#userMoney").text().trim())*1;
					if(money>account){//金额不足  提示
						var html="<p class='text-center lh-40'>"+"购买金额大于可用余额，无法购买"+"</p>";
						self.tipAlert(html);
						return false;
					}
					if($(this).attr("data-timeout")==1){//登录超时
						var html="<p class='text-center lh-40'>"+"访问已超时，请重新登录！"+"</p>";
						self.tipAlert(html);
						setTimeout(function(){
							var href=self.url.wapUrl+"/passport/login.html";
							window.location.href=href;
						},2000);
						return false;
					}

					var data={
						money:$("#cashNum").val(),
						itemName:$("#curBorrowName").val()
					};

					$(".layermcont .payPwdInput").focus();

					var html=inputTpl(data);
					layer.open({
						title:["请输入交易密码"],
						content:html,
						type:1,
						className:"paddingBottom white_header",
						shadeClose:false,
						btn:["确认支付","取消"],
						yes:function(a){

							var parms={
								borrow_id:self.borrow_id,//标id
								money:$cashNumInp.val(),//购买金额
								hongbao_id:$("#selectHongBao").attr("data-id"),//红包Id
								userPaypassword:$(".layermcont .payPwdInput").val()//支付密码
							};

							var url=self.url.wapUrl+self.url.buyBorrow;

							$.ajax({
								url:url,
								type:"get",
								dataType:"jsonp",
								data:parms,
								success:function(data){
									//console.log(data);
									if(data.result){//有返回结果
										if(data.code==1){
											var href=self.url.wapUrl+"/financing/success.html?addRaise="+$("#add_raise").text();
											window.location.href=href;
										}
										else{
											var html="<p class='text-center lh-40'>"+data.msg+"</p>";
											self.tipAlert(html);
										}
									}
									else{//
										if(data.code=="-1"){//请登录
											var html="<p class='text-center lh-40'>"+data.msg+"</p>";
											self.tipAlert(html);
											setTimeout(function(){
												var href=self.url.wapUrl+"/passport/login.html";
												window.location.href=href;
											},2000);
										}
										else if(data.code=="-2"){//交易密码错误
											var html="<p class='text-center lh-40'>"+data.msg+"</p>";
											self.tipAlert(html);
										}
										else{//其他错误
											var href=self.url.wapUrl+"/financing/fail.html?failReason="+data.msg+"&code="+data.code+"&borrow_id="+self.borrow_id;
											window.location.href=href;
										}

									}
								}
							});
						},
						success:function(){
							var $layermmain=$(".layermmain");
							var $laymshade=$(".laymshade");
							var $layermbox=$(".layermbox");
							var $docH=$(document).height();
							$(".layermbox input").focus(function(){
								if(self.isIos){//如果是ios 则对弹框的位置进行设置
									$("body").scrollTop(0);
									setCss();
								}
							}).blur(function(){
								resetCss();
							});
							function setCss(){
								$layermmain.css({
									position:"absolute",
									top:"10%",
									// marginTop:"-50%"
								});
								$laymshade.css({
									position:"absolute",
									width:"100%",
									height:$docH
								});
								$layermbox.css({
									position:"absolute",
									top:0,
									left:0,
									right:0,
									bottom:0,
									height:$(window).height(),
									width:$(window).width()
								});
							}
							function resetCss(){
								$layermmain.css({
									position:"fixed",
									top:"0",
									left:"0",
									width:"100%",
									height:"100%"
								});

								$laymshade.css({
									position:"fixed",
									width:"100%",
									height:"100%"
								});

								$layermbox.css({
									position:"relative",
									top:0,
									left:0
								});

							}
						}
					});
				});
			},
			selectRedPacket:function(){
				var self=this;
				var hongbaoTpl=template.compile($("#hongbaoListTpl").html());
				var $loadingImg=$("#loading_img");
				var $pageHbMoney=$("#pageHbMoney");

				var $acturalMoney=$("#actural_money");
				var $addRaise=$("#add_raise");

				var $selectHongBao=$("#selectHongBao");

				$selectHongBao.on("click",function(){//生成红包弹框列表，供用户选择
					var canBuy=!($("#buyNow").hasClass("disabled"));

					if(!canBuy){//没有输入购买金额  不可选择红包
						var html="<p class='text-center lh-40'>请输入购买金额</p>";
						self.tipAlert(html);
						return false;
					}

					var data={hongbaoList:[]};
					var html=hongbaoTpl(data);

					layer.open({
						style:"height:10rem;",
						content:html,
						className:"hongbaoScroll",
						type:1,
						shadeClose:false,
						success:function(){
							var $layerCont=$("body .layermmain .layermcont");
							var src=$loadingImg.attr("src");
							var div=$("<div class='text-center alert_hb_loading_wraper'>");
							var img=$("<img class='loading'>").attr("src",src);
							div.append(img);
							$layerCont.find(".hongbao_wraper").remove();
							$("body .layermmain .layermcont").append(div);
						}
					});

					var selectedHbId=$selectHongBao.attr("data-id");
					var url=self.url.wapUrl+self.url.packetList;
					var param={
						borrow_id:self.borrow_id,//标id
						account:$("#cashNum").val(),//购买金额
						currentPage:1,//当前页码
						pernum:990000//每页显示条目数量
					};

					$.ajax({
						url:url,
						type:"get",
						dataType:"jsonp",
						data:param,
						success:function(data){
							//console.log(data);
							var $layerContent=$("body .layermmain .layermcont");
							var $hbLoadingWraper=$layerContent.find(".alert_hb_loading_wraper");
							if(data.result){//有返回数据
								var length=data.hongbaoList.length;
								if(length>0){//有红包列表
									data.hongbaoList.forEach(function(item,index){
										if(item.id==selectedHbId){
											item["selected"]=1;
											return false;
										}
									});

									var html=hongbaoTpl(data);
									$layerContent.html(html);
								}
								else{
									var p="<p>"+data.msg+"</p>";
									$hbLoadingWraper.html(p)
								}
							}
							else{
								if(data.code==-1){
									var p="<p>"+"访问已超时，请重新登录！"+"</p>";
									$hbLoadingWraper.html(p);
									setTimeout(function(){
										var href=self.url.wapUrl+"/passport/login.html";
										window.location.href=href;
									},2000);
								}
								else{
									var p="<p>"+data.msg+"</p>";
									$hbLoadingWraper.html(p);
								}
								
							
							}
							
						}
					});
				});

				$("body").on("click",".layermmain #closeHongBaoBtn",function(){//关闭红包弹框 获取选中的红包信息
					layer.closeAll();//关闭layer弹框
				});


				//点击弹框里面的红包列表  选中红包
				$("body").on("click",".layermcont .hongbao_li",function(){
					if($(this).hasClass("active")){
						$(this).removeClass("active");
					}
					else{
						$(".layermcont .hongbao_li").removeClass("active");
						$(this).addClass("active");
					}

					var hbMes=getAlertHongBaoMes();
					
					$pageHbMoney.text(hbMes.money);//充值红包金额
					$selectHongBao.attr("data-id",hbMes["id"]);
					var acturalMoney=parseInt(hbMes.money)+$("#cashNum").val().trim()*1;
					var addRaise=self.calRate(hbMes.money,$("#cashNum").val().trim()*1);
					$acturalMoney.text(acturalMoney);
					$addRaise.text(addRaise);

					if($(this).hasClass("active")){
						setTimeout(function(){
							layer.closeAll();
						},50);
					}
					

					function getAlertHongBaoMes(){
						var hongbaoMes={};
						$(".layermcont .hongbao_wraper .hongbao_li").each(function(index,elem){
							var $hbItem=$(elem);
							if($hbItem.hasClass("active")){
								var hongbaoId=$hbItem.attr("data-id");
								var hongbaoMoney=$hbItem.attr("data-money");
								var rateHike=$hbItem.attr("data-rateHike");
								hongbaoMes.id=hongbaoId;
								hongbaoMes.money=hongbaoMoney;
								hongbaoMes.rateHike=rateHike;
								return false;
							}
						});
						if(hongbaoMes.id){
							return hongbaoMes;
						}
						else{
							return {
								id:"",
								money:"0",
								rateHike:"0%"
							};
						}
					}
				});
			}
		};

		var app=new App();

	});
});