$(function(){
	
	var webUrl = $("#webUrl").val(); //获取网站根路径 
	
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
			var data = { 'Javascript Responds':'Wee!' };
			responseCallback(data);
		})
		
		//页面返回按钮接口
		bridge.registerHandler('getBbsBackBtnHandler', function(data, responseCallback){
			var indexLink = webUrl+"/appmember/index.html";
			var responseData = {'title': '个人中心','href':indexLink,'backBtn':0};
            responseCallback(responseData);
			if(typeof data=="string")data = JSON.parse(data);
			if(data.result) window.location.href= indexLink;
		})
		
		//跳转论坛详情页面
		$("body").on("tap",".forumlistcon dl",function(){
			var arcLink = $(this).attr("data-url");//当前链接
			
			bridge.callHandler('getBbsPageHandler',{'title': '','icon':1,'backBtn':0}, function(responseData) {
				if(typeof responseData=="string")responseData = JSON.parse(responseData);
				if(responseData.result) window.location.href= arcLink;
			})
		})
		
	});
	

	 //列表   加载
 	var myTemplate = Handlebars.compile($("#table-template").html());
	var isGetting=false;
	var hasGetAll=false;
	var pageSize=20;//每页数量
	var n=1;
	var pages;
   function forumscroll(){
    	if(isGetting||hasGetAll){
    		return false;
    	}
    	
    	$("#loading").css({
    		visibility:"visible"
    	}).html("加载中...");

    	var url=webUrl+"/appmember/releaselist.html";
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
			success:function(data){
				//alert(JSON.stringify(data));
				pages=data.pageutil.pages;
				var curPage=data.pageutil.currentPage;
				var listNum=data.articleList.result.length;//当前页面的数据条数

				// alert(curPage);
				if(pages==0||pages==curPage){//加载完毕
					hasGetAll=true;
					if(curPage==1&&listNum==0){//没有数据
						$("#loading").css({
				    		visibility:"hidden"
				    	});
				    	$(".no_lists").removeClass("hide");
					}
					else{
						var html=myTemplate(data);
						$('#forumlistcon').append(html);
						$("#loading").css({
				    		visibility:"visible"
				    	}).html("加载完毕");
					}
				}
				else{
					var html=myTemplate(data);
					$('#forumlistcon').append(html);
					$("#loading").css({
			    		visibility:"hidden"
			    	});
				}
				
				isGetting=false;
				n++;
			},
			error:function(e){
				//alert("error");
			}
		});
   }
   forumscroll();
   
   window.onscroll = function(){  
		var wH=$(window).height();
		var bodyH=$("body").height();
		var scrollTop=$("body").scrollTop();
		if(scrollTop+wH>bodyH-50){
			if(n<=pages||!pages){
				forumscroll();					
			}
		}          	
   }
})