/**
 * 钱保姆WAP
 * @name 个人中心
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
		
		//编辑银行卡
		$("#editCard").on("click",function(){
	        location.href = wapurl+ "/member/editBankCard.html";
	    })
		
	});
})
