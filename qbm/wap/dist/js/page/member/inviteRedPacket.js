/**
 * 钱保姆WAP
 * @name 我的保姆-邀请记录
 * @description 
 * @date 2016-04-12
 * @version $V1.0$
 */


define(function(require, exports, module) {
	
   require('zepto');
   require('fastclick');
	template=require("artTemplate");
	FastClick.attach(document.body);
	
	template.helper("rightBoxType",function(index){
		if(index%3==0){
			return "one"
		}
		else if(index%3==1){
			return "two"
		}
		else{
			return "three"
		}
	});

	template.helper("beizhuHelper",function(accountLimit,timeLimit){
		var moneyText;
		var qixianText;
		if(accountLimit==0){
			moneyText="投资金额不限"
		}
		else{
			moneyText="投资满"+accountLimit+"元";
		};
		if(timeLimit==0){
			qixianText="投资期限不限"
		}
		else{
			qixianText="投资满"+timeLimit+"天";
		};

		return moneyText+","+qixianText;
	});



	$(function(){
		var weburl = $("#weburl").val();//pc端根路径
		var wapurl = $("#wapurl").val();//wap端根路径
		var wapcdnpath = $("#wapcdnpath").val();
		var userId = $("#userId").val();
		
		var App=function(){

			this.webUrl=$("#weburl").val();
			this.tpl={
				redPacketTpl:template("redPacket_lists_tpl")
			};

			this.url={
				wapurl:$("#wapurl").val(),
				webUrl:$("#weburl").val(),
				packetListUrl:"/wap/queryCanReceiveHblist.html",
				getPacketUrl:"/wap/receiveHongbao.html"
			};

			this.layerTip=function(msg,time){
				layer.open({
					content:"<p class='normal-tip-line'>"+msg+"</p>",
					className:"layer-tip",
					time:time
				});
			};

			this.GetQueryString=function(name){
		     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		     var r = window.location.search.substr(1).match(reg);
		     if(r!=null)return  unescape(r[2]); return null;
			}

			this.init();//页面初始化
			this.getPacket();//领取红包
		};

		App.prototype={
			init:function(){
				var self=this;
				//查看红包
				$("#lookPacket").on("click",function(){
					var href=self.url.wapurl+"/member/redPacket.html";
					location.href=href;
				});

			},
			getPacket:function(){
				var self=this;
				//点击查看红包
				$("#get_packet").on("click",function(){
					var $btn=$(this);
					if($btn.hasClass("disabled")||$btn.attr("isGetting")==1){//没有红包可领取
						return ;
					};
					var packetListUrl=self.url.wapurl+self.url.packetListUrl;
					$btn.attr("isGetting",1);
					$.ajax({
						type:"get",
						url:packetListUrl,
						dataType:"jsonp",
						success:function(data){
							
							//alert(JSON.stringify(data));
							
							$btn.attr("isGetting",0);
							if(data.code==-1){
								self.layerTip(data.msg,2);
							}
							else{
								getListSuccess(data);
							}
						},
						error:function(){

							
						}
					});
					
					function getListSuccess(data){
						layer.open({
							content:self.tpl.redPacketTpl(data),
							type:1
						});
					}

				});

				//点击领取弹框里面的红包
				$("body").on("click",".redPacket_lists .right_get_box",function(){
					var $em=$(this);
					if($em.hasClass("disabled")||$em.attr("isGetting")==1){//红包已经领取
						return ;
					}
					var url=self.url.wapurl+self.url.getPacketUrl;
					var postData={
						id:$em.attr("data-id")
					};
					$em.attr("isGetting",1);
					$.ajax({
						type:"get",
						url:url,
						data:postData,
						dataType:"jsonp",
						success:function(data){
							$em.attr("isGetting",0);
							//alert(JSON.stringify(data));
							getPacketSuccess(data);
						},
						error:function(){

						}
					});

					function getPacketSuccess(data){
						var account=data.receivedHb;//已领取红包总额
						var num=data.hongbaoNum;//未领取红包数
						
						if(data.code!=-1){//领取成功
							$em.addClass("disabled");
							$("#hasGetNum").html(account);
							$("#hongbao_num").html(num);
							if(num==0){
								$("#get_packet").html("您暂无红包可领取").addClass("disabled");
							}
						}
						else{
							self.layerTip(data.msg,2);
						}
					}

				});
			}
		};

		app=new App();

	    
    })
})
