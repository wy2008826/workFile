/**
 * 钱保姆WAP
 * @name 实名认证
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
		
		$("input").focus(function(){
			$(this).closest(".list_item").addClass("active");
		});
		
		$("input").blur(function(elem){
			$(this).closest(".list_item").removeClass("active");
		});
		
		var $submit=$("#submit");//提交按钮
		$("input").on("input",function(){
			var flag = validateAll();
			
			if(flag){
				$submit.removeClass("disabled");
			}
			else{
				$submit.addClass("disabled");
			}
		});
		
		function validateAll(){
			var realNameVal = $("#realName").val().trim();//姓名 
			var IDCard = $("#IDCard").val().trim();//身份证号 
			if((realNameVal.length >= 2 )&&(IDCard.length >= 15)){
				return true;
			}
		}
		
		//身份证校验
		function isIdCardNo(num) {
			var factorArr = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1);
			var parityBit = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");
			var varArray = new Array();
			var intValue;
			var lngProduct = 0;
			var intCheckDigit;
			var intStrLen = num.length;
			var idNumber = num;
			if ((intStrLen != 15) && (intStrLen != 18)) {
				return false;
			}
			// check and set value
			for (i = 0; i < intStrLen; i++) {
				varArray[i] = idNumber.charAt(i);
				if ((varArray[i] < '0' || varArray[i] > '9') && (i != 17)) {
					return false;
				} else if (i < 17) {
					varArray[i] = varArray[i] * factorArr[i];
				}
			}
			if (intStrLen == 18) {
				//check date
				var date8 = idNumber.substring(6, 14);
				if (isDate8(date8) == false) {
					return false;
				}
				// calculate the sum of the products
				for (i = 0; i < 17; i++) {
					lngProduct = lngProduct + varArray[i];
				}
				// calculate the check digit
				intCheckDigit = parityBit[lngProduct % 11];
				// check last digit
				if (varArray[17] != intCheckDigit) {
					return false;
				}
			}
			else {//length is 15
				var date6 = idNumber.substring(6, 12);
				if (isDate6(date6) == false) {
					return false;
				}
			}
			return true;
		}
		function isDate6(sDate) {
			if (!/^[0-9]{6}$/.test(sDate)) {
				return false;
			}
			var year, month, day;
			year = sDate.substring(0, 4);
			month = sDate.substring(4, 6);
			if (year < 1700 || year > 2500) return false
			if (month < 1 || month > 12) return false
			return true;
		}
	
		function isDate8(sDate) {
			if (!/^[0-9]{8}$/.test(sDate)) {
				return false;
			}
			var year, month, day;
			year = sDate.substring(0, 4);
			month = sDate.substring(4, 6);
			day = sDate.substring(6, 8);
			var iaMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
			if (year < 1700 || year > 2500) return false
			if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) iaMonthDays[1] = 29;
			if (month < 1 || month > 12) return false
			if (day < 1 || day > iaMonthDays[month - 1]) return false
			return true;
		}
		
		//认证表单提交
		$submit.on("click",function(){
			if(!( $submit.hasClass("disabled") ) ){
				require.async('layerCss',function(){
		           	require.async('layer',function(layer){
		           		var IDCard = $("#IDCard").val().trim();//身份证号 
		           		var idCardValidated = isIdCardNo(IDCard);
		           		
		           		if(idCardValidated){
		           			var getRealNameVal = $("#realName").val().trim();//姓名 
							var getIDCardVal = $("#IDCard").val().trim();//身份证号 
							
							$.ajax({
							    type: "get",
							    url: wapurl+"/api/member/modifyRealName.html",
							    data: {
							    	realName:getRealNameVal,
							    	cardId:getIDCardVal
							    },
							    dataType:"jsonp",
							    success: function(data){
							    	if(data.result){
							    		layer.open({
					                    	content: '恭喜您实名认证成功了，快去理财吧！',
					                    	className: 'layer-tip',
					                    	shadeClose:false,
					                    	time: 2,
					                    	end:function(){
					                   			window.location.reload();
					                    	}
					                	});
							    	}else{
							    		var html='<div class="fc-31 fs-24 text-center pop-layer"><p>认证失败，原因：'+data.msg+'</p><p>如有问题，请联系客服：400-606-7066</p></div>';
						           		layer.open({
											content:html,
											type:1,
											shadeClose:false,
											btn:["好的"],
											yes: function(){
												layer.closeAll();
										    }
										});
							    	}
							    }
							})
		           		}else{
		           			layer.open({
		                    	content: '请输入正确的身份证号码',
		                    	className: 'layer-tip',
		                    	shadeClose:false,
		                    	time: 2,
		                    	end:function(){
		                   			$("#IDCard").focus();
		                    	}
		                	});
		           		}
		            })
		        })
			}
		})
	});
})
