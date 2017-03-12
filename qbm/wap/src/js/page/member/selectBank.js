/**
 * 钱保姆WAP
 * @name 我的红包
 * @description 
 * @date 2016-01-14
 * @version $V1.0$
 */


define(function(require, exports, module) {
   	require('zepto');
    
    require('fastclick');
	FastClick.attach(document.body);
    
	$(function(){
		var wapurl = $("#wapurl").val();
		
		//银行卡选择
		var $cardItem = $(".card-item");
		$cardItem.on("click",function(){
			if( !($(this).hasClass("card-item-disabled"))){
				var bankId= $(this).attr("data-id");
				$("#bankId").val(bankId);
				
				//延迟提交表单
				setTimeout(function(){
					$("#selectBankForm").submit();
                },300);
			}
		})
		
		//使用其他银行卡
		$("#addCard").on("click",function(){
			location.href = wapurl+ "/member/recharge.html?type=new";
		})
		
		//支持的银行卡列表
		$("#bankList").on("click",function(){
			location.href = wapurl+ "/member/bankList.html";
		})
		
	})
})