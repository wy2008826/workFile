/**
 * 钱保姆WAP
 * @name 充值
 * @description 
 * @date 2016-01-14
 * @version $V1.0$
 */


define(function(require, exports, module) {
   	require('zepto');
    
    require('fastclick');
    
    if ('ontouchstart' in window) {
	    FastClick.attach(document.body);
	}
	
	$(function(){
		var wapurl = $("#wapurl").val();
		
		//支持的银行卡列表
		$("#bankList").on("click",function(){
			location.href = wapurl+ "/member/bankList.html";
		})
		
		var $submit=$("#formBtn");//提交按钮
		$("input").on("input",function(){
			var flag = validateAll();
			
			if(flag){
				$submit.removeClass("form-btn-dis");
			}
			else{
				$submit.addClass("form-btn-dis");
			}
		});
		
		//表单验证
		function validateAll(){
			var reg = /\d+/;
			var cardNoStats = false;
			var cardNo = $("#cardNo").val().trim();//银行卡
			var amount = $("#amount").val().trim();//充值金额
			if(reg.test(cardNo)){
				cardNoStats = true;
			}
			
			
			if(cardNoStats && (cardNo.length >= 15 ) && (amount !="") && ( Number(amount) >= 0.01 ) && (Number(amount) <=1000000)){
				return true;
			}
		}
		
		//表单提交
		$submit.on("click",function(){
			if( ! $submit.hasClass("form-btn-dis")){
				$("#rechargeForm").submit();
			}
		})
		
		//弹框处理
		var fromSelectBank = Number($("#fromSelectBank").val());
		if( fromSelectBank === 1){
			openTips();
		}
		
		function openTips(){
			var html='<div class="fc-31 fs-24 pop-layer"><p>为了保障您的资金安全，本平台现已实行<span>同卡进出</span>制度。</p><p>绑定其他银行卡需要通过充值来完成，且该银行卡将作为移动端唯一充值提现卡（若您绑定过其他银行卡，则将失效）。</p><p>修改流程较繁琐，建议谨慎绑卡。</p><p>若您仍想使用多张银行卡进行充值提现，请使用钱保姆PC端（www.qbm360.com），对您造成的麻烦请您谅解。</p></div>';
			require.async('layerCss',function(){
	           require.async('layer',function(layer){
	           		layer.open({
						title:['重要提示','background-color:#fff;color:#313131;'],
						content:html,
						type:1,
						shadeClose:false,
						btn:["继续充值","返回修改"],
						yes: function(){
							layer.closeAll();
					    }, no: function(){
					       location.href = wapurl+ "/member/recharge.html";
					    }
					});
	            })
	        })
		}
		
	})
})