define(function(require,exports,module){
	require("zepto");
	require('fastclick');
	template=require("artTemplate");
	FastClick.attach(document.body);

	template.helper("eclipseText",function(text){
		var length=24;
		var str=decodeURIComponent(text);
		return str.length>length?str.substr(0,length)+"...":str;
	});

	template.helper("hasReadClass",function(hasRead){//是否已经读过
		return hasRead?"":" not_read";
	});

	require("artTemplateHelper");
	
	$(function(){
		var App=function(){
			this.url={
				weburl:$("#webUrl").val(),
				messageListUrl:"/appmember/messagelist.html",
				readOneUrl:"/appmember/changMessageStatus.html"
			};

			this.tpl={
				messageTpl:template.compile($("#messageTpl").html())
			};

			this.setReadAllBtnStatus=function(status){//
				var $btn=$("#readAllBtn");
				if(status){//设置按钮为可点击
					$btn.removeClass("disabled").addClass("bg-primary");
				}
				else{
					$btn.removeClass("bg-primary").addClass("disabled");
				}
			}

			this.init();//页面初始化  和app交互
			this.loadLists();//加载消息列表
			this.readAll();//消息设为全部已读
		};
		App.prototype={
			init:function(){//页面初始化  和app交互
				var self=this;
					//APP交互相关
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
					
					bridge.callHandler('getBbsPageHandler',{'title': "消息",'icon':0,'backBtn':0}, function(responseData) {
						if(typeof responseData=="string")responseData = JSON.parse(responseData);
						if(responseData.result) window.location.href= listLink;
					});

					//页面返回按钮接口  返回到论坛首页
					bridge.registerHandler('getBbsBackBtnHandler', function(data, responseCallback){
						var listLink = self.url.weburl+"/appmember/index.html";
						responseData = {'title': "个人中心",'href':listLink,'backBtn':0};
			         responseCallback(responseData);
						if(typeof data=="string")data = JSON.parse(data);
						if(data.result) window.location.href= listLink;
					});

					// 点击页面跳转
					$("body").on("click",".tap-link",function(){
						var listTitle = $(this).attr("data-title");//当前版块标题
						var listLink = $(this).attr("data-url");//当前版块链接
						
						bridge.callHandler('getBbsPageHandler',{'title': listTitle,'icon':0,'backBtn':0}, function(responseData) {
							if(typeof responseData=="string")responseData = JSON.parse(responseData);
							if(responseData.result) window.location.href= listLink;
						})
					})

					//消息列表跳转到帖子详情页面
					$("body").on("click",".forum_item",function(){
						
						var listTitle ="";//当前版块标题
						var listLink = $(this).attr("data-url");//当前版块链接

						var $item=$(this);
						var messageId=$item.attr("data-message-id");//消息id
						var url=self.url.weburl+self.url.readOneUrl;
						var param={
							id:messageId,
							Mtype:0
						};
						$.ajax({
							url:url,
							type:"get",
							dataType:"json",
							data:param,
							success:function(data){
								if(data.result){
									$item.removeClass("not_read");
									bridge.callHandler('getBbsPageHandler',{'title': listTitle,'icon':0,'backBtn':0}, function(responseData) {
										if(typeof responseData=="string")responseData = JSON.parse(responseData);
										if(responseData.result) window.location.href= listLink;
									})
								}
							},
							error:function(){
								// alert("error");
							}
						});
					})
					
				});
			},
			loadLists:function(){
				var self=this;
				
				var $listsUl=$("#messageListsUl");
				var $loading_wraper=$(".loading");

				var isGetting=false;//正在请求
				var hasGetAll=false;//全部加载完毕
				var noList=false;//数据是否为空
				var pageSize=20;//每页数量
				var n=1;//当前页码
				
				function forumscroll(){
			    	if(isGetting||hasGetAll){//正在加载或者已经全部加载
			    		return false;
			    	}
			    	
			    	$("#loading").css({
			    		visibility:"visible"
			    	}).html("加载中...");


			    	var url=self.url.weburl+self.url.messageListUrl;
			    	var param={
			    		pageSize:pageSize,
			    		page:n
			    	};
			    	isGetting=true;
			    	$.ajax({
						type:"get",
						url:url,
						data:param,
						dataType:"json",
						success:function(data){// 1.没有数据 2.只有一页数据 3.多页数据
							//alert(JSON.stringify(data));
							ajaxSuccess(data);
						},
						error:function(e){
							//alert("error");
							// ajaxSuccess(data[n-1]);
						}
					});

					function ajaxSuccess(data){
						var dataLength=data.messageList.result.length;
						if(n==1){//设置通知的小红点状态  以及全部设置已读按钮的状态
							var noticeNum=data.newnotice;
							var hasNotReadAll=data.hasNotReadAll;
							if(noticeNum*1!=0){
								$("#notice_red_point").removeClass("hide");
							};
							if(hasNotReadAll!=1){
								self.setReadAllBtnStatus(false);
							}
						}
						if(dataLength>0){//存在数据
							var html=self.tpl.messageTpl(data);
							$listsUl.append(html);
						}
						else if(dataLength==0&&n==1){//数据为空
							$("#loading").html("");
							$(".formum_wraper").hide();
							$(".no_lists").removeClass("hide");
							self.setReadAllBtnStatus(false);
							hasGetAll=true;//已经全部加载
							noList=true;
						}
						if(dataLength<pageSize){//加载数据条数少于自定义每页的数据条数 表明全部加载完毕
							hasGetAll=true;//已经全部加载
							if(!noList){
								setGetAllStatus();
							}
						}
						if(!hasGetAll){
							$loading_wraper.css({
								visibility:"hidden"
							});
						}
						isGetting=false;
						n++;
					}
			   }
			   forumscroll();
			   
			   ScrollInifate({
					distance:50,
					endCallBack:function(){
						$loading_wraper.css({
							visibility:"visible"
						});
						
						forumscroll();
					}
				});

				function setGetAllStatus(){//设置全部加载的加载条状态
					$loading_wraper.css({
						visibility:"visible"
					});
					$loading_wraper.text("加载完毕");
				}
				function setGettingStatus(){//设置全部加载的加载条状态
					$loading_wraper.css({
						visibility:"visible"
					});
					$loading_wraper.text("加载中！");
				}

				function ScrollInifate(config){
					var body=document.getElementsByTagName("body")[0];
					var wH=window.innerHeight;
					var distance=parseFloat(config.distance)||0;
					var callBack=config.endCallBack;
					window.addEventListener("scroll",scrollHandler);

					function scrollHandler(e){
						var bodyH=body.offsetHeight;
						var scrollTop=body.scrollTop;
						if(scrollTop+wH>=bodyH-distance){
							callBack(e,scrollTop);
						}
					}
				}
			},
			readAll:function(){//消息设为全部已读
				var self=this;
				var $readAllBtn=$("#readAllBtn");
				$readAllBtn.on("click",function(){
					var $btn=$(this);
					if($btn.hasClass("disabled")){
						return ;
					}

					var url=self.url.weburl+self.url.readOneUrl;
					var param={
						id:"2",
						type:"all",
						Mtype:0
					};
					$.ajax({
						url:url,
						type:"get",
						dataType:"json",
						data:param,
						success:function(data){
							//alert(JSON.stringify(data));
							if(data.result){//调用接口成功
								self.setReadAllBtnStatus(false);
								$(".forum_item.not_read").removeClass("not_read");
							}
						},
						error:function(){
							//alert("error");
						}
					});
				});
			}
		};

		var app=new App();
	});
});