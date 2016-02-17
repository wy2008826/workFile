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
		
		//充值页面跳转
	    $('#rechargeBtn').on("click",function(){
	    	location.href = wapurl+ "/member/recharge.html";
	    })
		
	    //提现页面跳转
	    $('#cashBtn').on("click",function(){
	    	location.href = wapurl+ "/member/cash.html";	
	    })
	    
	    //交易明细页面跳转
	    $('#dealDetailBtn').on("click",function(){
	        location.href = wapurl+ "/member/dealDetail.html";
	    })
	
	    //我的投资页面跳转
	    $('#investmentBtn').on("click",function(){
	        location.href = wapurl+ "/member/investmentRecordAll.html";
	    })
	
	    //我的红包页面跳转
	    $('#redPacketBtn').on("click",function(){
	        location.href = wapurl+ "/member/redPacket.html";
	    })
	
	    //我要借款页面跳转
	    $('#loanBtn').on("click",function(){
	        location.href = weburl+ "/app/loan.html";
	    })
	    
	    //返回首页
	    $('#backHome').on("click",function(){
	        location.href = wapurl;
	    })
	    
	    //APP下载
	    $('#down').on("click",function(){
	        location.href = weburl+"/applink.html";
	    })
	    
	    //联系我们
	    $('#contact').on("click",function(){
	        location.href = wapurl+ "/member/contact.html";
	    })
    })
})
