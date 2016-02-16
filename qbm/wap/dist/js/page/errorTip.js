/**
 * 钱保姆WAP
 * @name 错误提示
 * @description 
 * @date 2016-01-13
 * @version $V1.0$
 */


define(function(require, exports, module) {
   	require('zepto');
    
    require('fastclick');
	FastClick.attach(document.body);
    
	$(function(){
		var wapurl = $("#wapurl").val();
		
		//返回首页
		$("#backBtn").on("click",function(){
			location.href = wapurl;
	    })

	})
})
