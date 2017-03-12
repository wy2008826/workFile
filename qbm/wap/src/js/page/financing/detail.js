define(function(require,exports,module){
	require("zepto");
	
	require('fastclick');
	FastClick.attach(document.body);


	$(function(){

		var App=function(){

			this.url={
				wapUrl:$("#wapurl").val(),
				borrowInfo:"/wap/getBorrowInfo.html",//标信息
				checkDxbMM:"/member/checkDirectionalMarkPwd.html"//校验定向标密码
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

			this.isIos=(function(){//判断是否是ios设备 对可输入性弹框做处理
				var userAgent=window.navigator.userAgent;
				if(userAgent.indexOf("iPhone")>=0){
					return true;
				}
				else{
					return false;
				}

			})();

			this.tipAlert=function(html){
				layer.open({
					content:html,
					className:"layer-tip",
					time:2,
					shadeClose:false
				});
			}

			this.borrow_id=this.getParam("borrow_id");//标的id
			this.redemptionType=$("#redemptionType").val();//标的可赎回状态码

			this.init();//
			this.borrowTime();//标时间，标是否已经可以购买
			this.xmmmBuy();//输入项目密码进行购买
		};

		App.prototype={
			init:function(){
				var self=this;

				var moneyAllInp=$("#money_all");//全部金额
				var moneyLeftInp=$("#money_left");//剩余可购买金额

				var moneyAllVal=moneyAllInp.val().trim();
				var moneyLeftVal=moneyLeftInp.val().trim();
				var scale=((moneyAllVal - moneyLeftVal) / moneyAllVal)*100;

				$("#bar_inner").animate({//进度条动画
					width:scale+"%"
				},300);

				$("body").on("click",".tap-link",function(e){//预处理默认的跳转
					e.preventDefault();
					e.stopPropagation();
					var $row=$(this);
					if($(this).hasClass("bg-default")){
						return false;
					}
					var href=$(this).attr("data-href")+"?borrow_id="+self.borrow_id;


					var referBack=$(this).attr("data-refer-back");//指定登陆成功后的返回页面
					if(referBack){
						href+=("&referBack="+referBack);
					}
					if($row.hasClass("redeemTypeRow")){//对于赎回状态的跳转页面  传递赎回状态码
						href+=("&redemptionType="+self.redemptionType);
					}
					window.location.href=href;
				});


				var $buyBtn=$("#buy_now");
				if($buyBtn.length>0){

					$buyBtn.on("click",function(){
						var realStatus=$("#realStatus").val();//是否实名认证通过
						if(realStatus==1){//认证通过
							var borrow_id=self.borrow_id;
							var href=$(this).attr("data-href")+"?borrow_id="+borrow_id;
						}
						else{//没有认证通过
							var href=self.url.wapUrl+"/member/authentication.html";
						}
						window.location.href=href;
					});
				}

			},
			borrowTime:function(){
				var self=this;
				var $borrowEndTime=$("#borrowEndTime");
				var $borrowStartTime=$("#borrowStartTime");

				var systemTime=$("#sysTime").val();//系统时间
				var canBuyEnd=$borrowEndTime.attr("data-time-end");//标结束时间
				var notStartTime=$borrowStartTime.attr("data-time-end");//标开始时间

				if(canBuyEnd){//标已经可以购买
					setDHMSFormate(canBuyEnd,$borrowEndTime,"text");//天 小时 分钟 秒
				}
				else if(notStartTime){
					setDHMSFormate(notStartTime,$borrowStartTime,":");//小时:分钟:秒
				}

				function setDHMSFormate(endTime,dom,type){//设置  天数  小时  分钟 秒字符串
					var sys_second1 = (endTime - systemTime);
				    var countDown = setInterval(function(){
				        if (sys_second1 > 1) {
				        	sys_second1 -= 1;
				          	var day1 = Math.floor((sys_second1 / 3600) / 24);
				          	var hour1 = Math.floor((sys_second1 / 3600) % 24);
				          	var minute1 = Math.floor((sys_second1 / 60) % 60);
				          	var second1 = Math.floor(sys_second1 % 60);
				          	var showDay1 = day1;
				          	var showHour1 = hour1<10?"0"+hour1:hour1;//计算小时数
				          	var showMinute1 = minute1<10?"0"+minute1:minute1;//计算分钟数
				          	var showSecond1 = second1<10?"0"+second1:second1;//计算秒数
				          	if(type=="text"){
				          		var htmlStr=showDay1+"天"+showHour1+"小时"+showMinute1+"分"+showSecond1+"秒";
				          	}
				          	else if(type==":"){
				          		var showDay1=showDay1?showDay1+"天":"";
				          		var htmlStr=showDay1+showHour1+":"+showMinute1+":"+showSecond1+"秒后开售，敬请期待";
				          		
				          	}
				         	$(dom).html(htmlStr);
				        } else { 
				        	clearInterval(countDown);
				        	if(type==":"){
				        		window.location.reload();
				        		
				        	}
				            // window.location.reload();
				        }
				    }, 1000);
				}
			},
			xmmmBuy:function(){
				var self=this;
				var $fix_xmmm=$("#fix_xmmm");//需要输入项目密码的标处理
				
				if($fix_xmmm.length>0){
					var $xmmmInp=$("#xmmm_inp");
					var $xmmmBuy=$("#xmmm_buy");

					$xmmmInp.on("input",function(){
						var val=$(this).val();
						console.log(val);
						if(val!=""){
							$xmmmBuy.removeClass("disabled");
						}
						else{
							$xmmmBuy.addClass("disabled");
						}
					});

					if(self.isIos){//focus Style
						$xmmmInp.on("focus",function(){
							document.body.scrollTop=1000;
							$fix_xmmm.removeClass("fix_xmmm");
							$(".content").removeClass("pd_bottom");
						}).on("blur",function(){
							$fix_xmmm.addClass("fix_xmmm");
							$(".content").addClass("pd_bottom");
						});
					}

					require("layer");
					$xmmmBuy.on("click",function(){
						var isDisabled=$(this).hasClass("disabled");
						if(isDisabled){
							return ;
						}

						var url=self.url.wapUrl+self.url.checkDxbMM;
						var param={
							id:self.borrow_id,
							dmPwd:$xmmmInp.val()
						};
						$.ajax({
							type:"get",
							dataType:"jsonp",
							url:url,
							data:param,
							success:function(data){
								if(data.result){//请求成功
									var realStatus=$("#realStatus").val();//是否实名认证通过
									
									if(realStatus==1){//认证通过
										var href=$xmmmBuy.attr("data-href")+"?borrow_id="+self.borrow_id;
									}
									else{//没有认证通过
										var href=self.url.wapUrl+"/member/authentication.html";
									}
									window.location.href=href;
								}
								else if(data.result==false){//其他未知错误
									var html="<p class='text-center lh-40'>"+data.msg+"</p>";
									self.tipAlert(html);
								}
							}
						});
					});
				}

			}
		};

		var app=new App();

	});
});