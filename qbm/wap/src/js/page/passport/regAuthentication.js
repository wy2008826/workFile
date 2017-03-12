define(function(require,exports,module){
	require("zepto");
	require('fastclick');
	FastClick.attach(document.body);


	$(function(){

		var App=function(){

			this.url={
				wapUrl:$("#wapurl").val(),
				authenUrl:"/api/member/modifyRealName.html"//注册认证请求地址
			};

			this.getParam=function(key){
				var href=window.location.href;
				var index=href.indexOf("?");
				var hashArr=href.substr(index+1).split("?")[0].split("&");
				for(var i=0;i<hashArr.length;i++){
					var group=hashArr[i].split("=");
					if(group[0]==key){
						return group[1];
					}
				}
			};
			this.init();//页面初始化 点击跳转等预处理
			this.validateForm();//验证表单
		};

		App.prototype={
			init:function(){
				var self=this;

				$("body").on("click",".tap-link",function(e){//预处理默认的跳转
					e.preventDefault();
					e.stopPropagation();
					var href=$(this).attr("data-href");
					window.location.href=href;
				});

				$("body").on("click",".layermbtn span",function(){
					layer.closeAll();
				});

				
				$("input").focus(function(){
					$(this).closest(".list_item").addClass("active");
				});
				
				$("input").blur(function(elem){
					$(this).closest(".list_item").removeClass("active");
				});

			},
			validateForm:function(){
				require("layer");
				var self=this;
				
				var $realName=$("#realName");//真实姓名
				var $IDCard=$("#IDCard");//身份证号
			
				var $submit=$("#submit");//提交按钮

				$("input").on("input",function(){
					var $input=$(this);
					var validated=validateAll();
					if(validated){
						$submit.removeClass("disabled");
					}
					else{
						$submit.addClass("disabled");
					}

				});
				
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


				function validateAll(){
					var nameVal=$realName.val().trim();//真实姓名
					var idVal=$IDCard.val().trim();//身份证号
					if( (nameVal.length>=2)&&isIdCardNo(idVal)){//必填项不能为空 身份证号码格式正确
						return true;
					}
					else{
						return false;
					}
				}

				function submitSuccess(){
					layer.open({
						content:"恭喜您实名认证成功了，快去理财吧！",
						time:2,
						shadeClose:false,
						className:"layer-tip",
						end:function(){
							var href=self.url.wapUrl+"/index.html";
							setTimeout(function(){
								$(".login_form_ul .icon-gouxuan").removeClass("hide");
								window.location.href=href;
							},300);
						}
					});
				}
				
				$submit.click(function(){
					
					if(!( $submit.hasClass("disabled") ) ){//按钮可点  
							
							var params={
								realName:$realName.val(),//真是姓名
								cardId:$IDCard.val()//身份证号码
							};
							$.ajax({
								url:self.url.wapUrl+self.url.authenUrl,
								type:"get",
								data:params,
								dataType:"jsonp",
				                // jsonp:"callback",
				                // jsonpCallback:"jsonpCallback",
								success:function(data){
									//console.log(data);
									
									if(!(data.result)){//各种原因的认证失败
										if(data.code==-1){//登录超时
											var html="<p class='text-center lh-40'>"+"访问已超时，请重新登录！"+"</p>";
											self.alertMes(html);
											setTimeout(function(){
												var href=self.url.wapUrl+"/passport/login.html";
												window.location.href=href;
											},2000);
										}
										else{
											var msg=data.msg;
											var html="<p class='lh-50 text-center'>失败原因："+msg+"</p>"+
													"<p class='lh-50 text-center'>如有疑问，请联系客服：400-606-7066</p>";

											layer.open({
												content:html,
												type:1,
												className:"hasPadding",
												shadeClose:false,
												btn:["好的"]
											});
										}
										
										
									}
									else if(data.result){//认证成功
										submitSuccess();
									}
								},
								error:function(){

								}
							});
						};


				});

			}
		};

		var app=new App();

	});
});