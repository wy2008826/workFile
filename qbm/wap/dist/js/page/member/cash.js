/**
 * 钱保姆WAP
 * @name 提现
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
		
		function moneyFix(value){
			var f = parseFloat(value); 
		    if (isNaN(f)) { 
		    	return false; 
		    } 
		    var f = Math.round(value*100)/100; 
		    var s = f.toString(); 
		    var rs = s.indexOf('.'); 
		    if (rs < 0) { 
		    	rs = s.length; 
		        s += '.'; 
		    } 
		    while (s.length <= rs + 2) { 
		        s += '0'; 
		    } 
		    return s; 
		}
		
		// 除法
	    function accDiv(arg1,arg2) {
	        var t1=0,t2=0,r1,r2;
	        try{t1=arg1.toString().split(".")[1].length}catch(e){}
	        try{t2=arg2.toString().split(".")[1].length}catch(e){}
	        with(Math){
	            r1=Number(arg1.toString().replace(".",""))
	            r2=Number(arg2.toString().replace(".",""))
	            return accMul((r1/r2),pow(10,t2-t1));
	        }
	    }
	
	    //乘法
	    function accMul(arg1,arg2) {
	        var m=0,s1=arg1.toString(),s2=arg2.toString();
	        try{m+=s1.split(".")[1].length}catch(e){}
	        try{m+=s2.split(".")[1].length}catch(e){}
	        return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
	    }
	
	    // 加法
	    function accAdd(arg1,arg2) {
	        var r1,r2,m;
	        try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
	        try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
	        m=Math.pow(10,Math.max(r1,r2))
	        return (arg1*m+arg2*m)/m
	    }
	
	    //减法
	    function Subtr(arg1,arg2) {
	        var r1,r2,m,n;
	        try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
	        try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
	        m=Math.pow(10,Math.max(r1,r2));
	        n=(r1>=r2)?r1:r2;
	        return ((arg1*m-arg2*m)/m).toFixed(n);
	    }
		
		//提现规则
		$("#cashRule").on("click",function(){
			location.href = wapurl+ "/member/cashRule.html";
		})
		//忘记交易密码
		$("#forgetPayPwd").on("click",function(){
	        location.href = wapurl+ "/passport/forgetPayPwd.html";
	    })
		
		//多卡时，默认选择第一张银行卡
		var moreEle = $(".cash-side li");
		var moreCard = moreEle.length;
		if(moreCard >= 2){
			$("#accountBankId").val(moreEle.eq(0).attr("data-id"));
			$("#bankIcon").attr("src",moreEle.eq(0).find("img").attr("src"));
			$("#bankInfo").text(moreEle.eq(0).find("span").text());
			$("#branch").val(moreEle.eq(0).attr("data-branch"));
		}
		
		//选择银行卡
		$("#moreBank").on("click",function(){
			$("#cashShade").removeClass("hide");
			$(".cash-side").removeClass("hide");
		})
		
		$("#cashShade").on("click",function(){
			$(this).addClass("hide");
			$(".cash-side").addClass("hide");
		})
		
		$(".cash-side li").on("click",function(){
			if( !($(this).hasClass("select-other"))){
				var bankId = $(this).attr("data-id");//绑定的银行卡ID
				var bankIcon = $(this).find("img").attr("src");//银行卡图标
				var bankBranch = $(this).attr("data-branch");//支行信息
				var bankText = $(this).find("span").text();//银行卡信息
				
				$("#cashShade").addClass("hide");
				$(".cash-side").addClass("hide");
				$("#bankIcon").attr("src",bankIcon);
				$("#bankInfo").text(bankText);
				$("#accountBankId").val(bankId);
				$("#branch").val(bankBranch);
				$("#branch").attr("data-branch",bankBranch);
			}
		})	
		
		
		//表单验证
		
		var $submit = $("#form-btn");//提交按钮
		$("input").on("input",function(){
			var flag = validateAll();
			if(flag){
				$submit.removeClass("form-btn-dis");
			}
			else{
				$submit.addClass("form-btn-dis");
			}
		});
		
		function validateAll(){
			var money = Number($("#money").val().trim());//提现金额
			var payPassword = $("#payPassword").val();//交易密码
			var bankId = $("#accountBankId").val().trim();//银行卡ID
			var bankBranch = $("#branch").val().trim();//支行信息
			var isza = $("#isza").val().trim();//中安用户标识
			var freeCashFees = Number($("#freeCashFees").text());//免费提现额度
			var useMoney = Number($("#useMoney").text());//可用余额
			
			var fee = 0.00;//默认提现额度为0
			var credited = 0;
			
			if( money > useMoney){
	        	require.async('layerCss',function(){
		            require.async('layer',function(layer){
		           		layer.open({
		                    content: '提现金额超限',
		                    className: 'layer-tip',
		                    time: 2,
		                    end:function(){
		                   		layer.closeAll();
		                   		return false;
		                    }
		                });
		            })
		        });
	        }
			
			if (money == null || money == "") {
	            $("#fees").text("0.00");
	            return false;
	        }
			
			if (isza == 0) {
	            if (freeCashFees < money) {
	                if (Subtr(money, freeCashFees) < 1) {
	                    credited = freeCashFees;
	                    fee = Subtr(money, credited);
	                } else {
	                    fee = accMul(Subtr(money, freeCashFees), 0.005);
	                    if (fee < 1) {
	                        fee = 1;
	                    }
	                    var array = fee.toString().split(".");
	                    if (array.length > 1 && array[1].length > 2) {
	                        fee = array[0] + "." + array[1].substr(0,2);
	                    }
	                    credited = Subtr(money, fee);
	                }
	            } else {
	                credited = money;
	            }
	        } else {
	            credited = money;
	            fee = 0;
	        }
	        var newFee = moneyFix(fee);
	        $("#fees").text(newFee);
	        
			if((money != "") && (money <= useMoney)  && (money <= 1000000 ) && (money >= 1 ) && payPassword !="" && bankId !="" && bankBranch !=""){
				return true;
			}
		}
		
		//表单提交
		$submit.on("click",function(){
			if( !$submit.hasClass("form-btn-dis")){
				require.async('layerCss',function(){
		            require.async('layer',function(layer){
		            	var money = moneyFix($("#money").val().trim()*1);//提现金额
		            	var fees = $("#fees").text()//提现手续费
		            	var realMoney = moneyFix(money - fees);
		            	
		            	var confirm='<div class="fc-31 fs-24 pop-layer"><div class="row"><span class="col-all-6 text-right">本次提现金额为</span><span class="col-all-6">￥'+money+'元</span></div><div class="row"><span class="col-all-6 text-right">手续费收取</span><span class="col-all-6">￥'+fees+'元</span></div><div class="row"><span class="col-all-6 text-right">实际到账金额为</span><span class="col-all-6">￥'+realMoney+'元</span></div></div>';
		            	var tipLayer = layer.open({
							title:['请确认','background-color:#fff;color:#313131;'],
							content:confirm,
							type:1,
							shadeClose:false,
							btn:["确认提现","取消"],
							yes: function(){
								layer.closeAll();
								$.ajax({
								    type: "get",
								    url: wapurl+"/api/member/cash.html",
								    dataType:"jsonp",
								    contentType: "application/jsonp; charset=utf-8",
								    data:{
								    	accountBankId:$("#accountBankId").val().trim(),
								    	money:$("#money").val().trim(),
								    	branch:$("#branch").val().trim(),
								    	password:$("#payPassword").val().trim()
								    },
								    success: function(data){
								    	if(data.result){
								    		location.href = wapurl + "/member/cashSuccess.html";
								    	}else{
								    		var html='<div class="fc-31 fs-24 text-center pop-layer"><p>'+data.msg+'</p></div>';
											require.async('layerCss',function(){
									           require.async('layer',function(layer){
									           		layer.open({
														content:html,
														type:1,
														shadeClose:false,
														btn:["好的"],
														yes: function(){
															layer.closeAll();
													    }
													});
									            })
									        })
								    	}
								    }
								});
						   	}
						});
		            })
		        })
			}
		})
		
		//绑定银行卡
		$("#bindCard,#otherCard").on("click",function(){
			$("#cashShade").addClass("hide");
			$(".cash-side").addClass("hide");
			popLayer();
		})
		
		//弹框处理
		function popLayer(){
			var html='<div class="fc-31 fs-24 pop-layer"><p>为了保障用户资金安全，本平台现已施行<span class="fc-primary">同卡进出</span>制度。</p><p>绑定其他银行卡需要通过充值来完成，且该银行卡将作为移动端唯一充值提现卡（若您绑定过其他银行卡，则将失效）。</p><p>修改流程较复杂，建议谨慎绑卡。</p><p>若您仍想使用多张银行卡进行充值提现，请登录网页端操作，对您造成的不便请您谅解。</p></div>';
			require.async('layerCss',function(){
	           require.async('layer',function(layer){
	           		layer.open({
						title:['重要提示','background-color:#fff;color:#313131;'],
						content:html,
						type:1,
						shadeClose:false,
						btn:["继续充值","下次再说"],
						yes: function(){
							location.href = wapurl+ "/member/recharge.html?type=new";
					    }, no: function(){
					    	layer.closeAll();
					    }
					});
	            })
	        })
		}
		
		//提现记录
		$("#cashRecord").on("click",function(){
	        location.href = wapurl+ "/member/cashRecord.html";
	    })
		
	})
})