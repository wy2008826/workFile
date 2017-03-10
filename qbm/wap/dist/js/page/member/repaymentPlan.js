define(function(require, exports, module){
	require('zepto');
   var template=require("artTemplate");
   require('fastclick');
	FastClick.attach(document.body);




	$(function(){
		var App=function(){

			this.url={
				weburl:$("#wapurl").val(),
				planListUrl:"/wap/getTenderRepayProgress.html"
			};

			this.getParam=function getParam(key){
				var location=window.location.href;
				var href=location.substr(location.indexOf("?")+1);
				var reg=new RegExp("(^|&)"+key+"=([^&]*)($|&)");
				var group=href.match(reg);
				var param=group?decodeURIComponent(href.match(reg)[2]):"";
				return param;
			};
			


			this.init();//页面初始化
			this.helpers();//注册helper   helper的注册必须位于tpl编译之前
			this.loadPlanList();//加载列表
			
			this.tpl={
				planTpl:template.compile($("#plan_list_tpl").html())
			};

		};
		App.prototype={
			init:function(){
				var self=this;
				
			},
			helpers:function(){
				var self=this;
				var flag=self.getParam("flag");
				template.helper("planStatusClass",function(status,statusInfo){
					if(flag==0){//flag为0  没有statusInfo字段
						return status==0?" dhk":"";
					}
					else{
						return statusInfo=="待回款"?" dhk":"";;
					}
				});

				template.helper("numberFixed2",function(number){//只有待回款是橘黄色
					return (number*1).toFixed(2);
				});

				template.helper("statusInfo",function(status,statusInfo){// 共四种字段 已回款 已赎回 待回款 已结清
					if(flag==0){//flag为0  没有statusInfo字段
						return status==0?"待回款":"已回款";
					}
					else{
						return statusInfo;
					}
				});

			},
			loadPlanList:function(){
				var self=this;
				var url=self.url.weburl+self.url.planListUrl;
				var param={
					tenderId:self.getParam("tenderId"),
					flag:self.getParam("flag")//赎回的状态码 0 1 2
				};

				$.ajax({
					type:"get",
					url:url,
					data:param,
					dataType:"jsonp",
					success:function(data){
						// console.log(data,data.result,data.repayPlan);
						if(data.result){
							getListCallBack(data);
						}
					},
					error:function(){
						console.log("error");
					}
				});

				function getListCallBack(data){
					var html=self.tpl.planTpl(data);
					$("#repaymentUl").append(html);
				}
			}
		};

		var app=new App();
	});
});