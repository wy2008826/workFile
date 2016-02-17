/**
 * 钱保姆WAP
 * @name 我的保姆
 * @description 
 * @date 2016-01-07
 * @version $V1.0$
 */


define(function(require, exports, module) {
	
    require('zepto');
    
    require('fastclick');
	FastClick.attach(document.body);
	
	$(function(){
		var weburl = $("#weburl").val();//pc端根路径
		var wapurl = $("#wapurl").val();//wap端根路径
		var realStatus = $("#realStatus").val();//获取实名状态
		
		

		$("body").on("click",".tap-link",function(e){//预处理默认的跳转
			e.preventDefault();
			e.stopPropagation();
			var href=$(this).attr("data-href")+"?borrow_id="+self.borrow_id;
			window.location.href=href;
		});
		
    })
})
