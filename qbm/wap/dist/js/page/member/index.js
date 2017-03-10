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
		
		//当前URL处理
		var urlProtocol  = window.location.protocol;
		
		//设置
		$("#goSetting").on("click",function(){
	        location.href = wapurl+ "/member/setting.html";
	    })
		
		//充值
	    $("#goRecharge").on("click",function(){
	    	location.href = wapurl+ "/member/recharge.html";
	    })
		
	    //提现
	    $("#goCcash").on("click",function(){
	    	location.href = wapurl+ "/member/cash.html";	
	    })
	    
	    //交易明细
	    $("#goDealDetail").on("click",function(){
	        location.href = wapurl+ "/member/dealDetail.html";
	    })
	
	    //我的投资
	    $("#goInvestment").on("click",function(){
	        location.href = wapurl+ "/member/investmentRecordAll.html";
	    })
	
	    //我的红包
	    $("#goRredPacket").on("click",function(){
	        location.href = wapurl+ "/member/redPacket.html";
	    })
	
	    //我要借款
	    $("#goLoan").on("click",function(){
	        location.href = weburl+ "/app/loan.html";
	    })
	    
	    //邀请好友
	    $("#goInvite").on("click",function(){
	        location.href = wapurl+ "/member/invite.html?protocol="+urlProtocol;
	    })
	    
	    //返回首页
	    $("#backHome").on("click",function(){
	        location.href = wapurl;
	    })
	    
	    //APP下载
	    $("#down").on("click",function(){
	        location.href = weburl+"/applink.html";
	    })
	    
	    //联系我们
	    $("#contact").on("click",function(){
	        location.href = wapurl+ "/member/contact.html";
	    })
	    
	    //小红点处理
	    $.ajax({
		    type: "get",
		    url: wapurl+"/api/member/getInvitationRedPointStatus.html",
		    dataType:"jsonp",
		    success: function(data){
		    	if(data.showPointAddr == 1){
		    		$(".redPoint em").removeClass("hide");
		    	}else{
		    		$(".redPoint em").addClass("hide")
		    	}
		    }
		})
    })
})
