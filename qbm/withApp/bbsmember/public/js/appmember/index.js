define(function(require,exports,module){
	require("zepto");
	require('fastclick');
	FastClick.attach(document.body);

	$(function(){
		var App=function(){
			this.url={
				weburl:$("#webUrl").val()
			};

			this.init();//页面初始化  和app交互
		};
		App.prototype={
			init:function(){
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
					})
					

					//页面返回按钮接口  返回到论坛首页
					bridge.registerHandler('getBbsBackBtnHandler', function(data, responseCallback){
						
						var listLink = self.url.weburl+"/app/indexBack.html";
						responseData = {'title': "讨论区",'href':listLink,'icon':2,'backBtn':2};
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
				});
			},
		};

		var app=new App();
	});
});