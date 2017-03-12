define(function(require,module,exports){
	require("zepto");
	require('fastclick');
	FastClick.attach(document.body);

	$(function(){
		var App=function(){

			this.url={
				wapUrl:$("#wapurl").val(),
				getCodeUrl:"/api/getPhoneRegCode.html",//获取短信验证码
				submitUrl:"/api/passport/retrievePassword.html"//忘记交易密码
			};

			
			this.alertMsg={
				imgIsEmpty:"<p class='text-center lh-40'>验证码不能为空</p>",
				imgIsError:"<p class='text-center lh-40'>抱歉，您输入的图形验证码不正确</p>",
				mesIsError:"<p class='text-center lh-40'>抱歉，您输入的验证码不正确，可以点击“重发”再次获取短信</p>",
				passNotRight:"<p class='text-center lh-40'>抱歉，您输入的交易密码格式不正确，请输入6-15位数字加字母组合，区分大小写</p>",
				passIsNotEqual:"<p class='text-center lh-40'>两次输入的交易密码不一致</p>"
			};

			this.alertMes=function(html){
				layer.open({
					content:html,
					shadeClose:false,
					type:1,
					className:"hasPadding",
					btn:["好的"]
				});
			};

			this.tipAlert=function(html){
				layer.open({
					content:html,
					className:"layer-tip",
					time:2,
					shadeClose:false
				});
			}

			this.pagePhone=$("#pagePhone").text().trim();
			this.init();
			this.refeshImgAndCode();//刷新图形验证码和获取短信验证码 密码可见
			this.validateForm();//验证表单
			
		};
		App.prototype={
			init:function(){

				var self=this;
				
				$("body").on("click",".layermbtn span",function(){
					layer.closeAll();
				});


				$("input").focus(function(){
					var $inp=$(this);
					var parent=$inp.closest(".list_item").addClass("active");
				});
				$("input").blur(function(elem){
					var $inp=$(this);
					var parent=$inp.closest(".list_item").removeClass("active");
				});
			},
			refeshImgAndCode:function(){
				var self=this;
				var isFirstGetCode=true;//首次获取验证码

				var $imgRandomWraper=$("#img_random_wraper");//验证码图片盒子
				var $imgRandom=$("#img_random");//验证码图片
				var $refeshImg=$("#refresh_img");//刷新图片验证码按钮
				var $getCode=$("#getCode");//获取短信验证码
				var $passportSea=$("#passportSea");//密码可见按钮

				var $pwdInput0=$("#pwdInput0");//登录密码0
				var $pwdInput1=$("#pwdInput1");//确认登录密码1
				var $kefuMes=$("#kefuMes");//客服电话提示消息

				$imgRandomWraper.on("click",function(){//刷新图形验证码
					if(!($refeshImg.hasClass("animate")) ){
						$imgRandom.unbind("load");
						var oldSrc=$imgRandom.attr("src").split("?")[0];
						var now=new Date()*1;
						$imgRandom.attr("src",oldSrc+"?"+now);

						$refeshImg.addClass("animate");
						$imgRandom.on("load",imgLoaded.bind($imgRandom[0]));
						function imgLoaded(){
							$refeshImg.removeClass("animate");
						}
					}

				});
				$getCode.on("click",function(){//获取短信码

					var imgReg=/^\d{4,4}$/;
					var url=self.url.wapUrl+self.url.getCodeUrl;
					var verifyCode=$("#imgInput").val().trim();

					var params={
						Phone:self.pagePhone,//手机号码
		            	verify:verifyCode,//图形验证码
		            	type:2//找回交易密码的标识
					};

					if(!$(this).hasClass("disabled")){
						if(!verifyCode){//图形码为空
							var html="<p class='text-center lh-40'>图形验证码不能为空</p>";
							self.tipAlert(html);
							return false;
						}
						else if(!(imgReg.test(verifyCode))){
							var html="<p class='text-center lh-40'>图形验证码格式不正确</p>";
							self.tipAlert(html);
							return false;
						}

						$.ajax({
							url:url,
							type:"get",
							dataType:"jsonp",
							data:params,
							success:function(data){
								if(typeof data=="string"){
				    				data = $.parseJSON(data);
				    			}
				    			//console.log(data);
				    			if(data.result){//获取验证过码成功
					    			// if(data.times>=5){
					    			// 	$getCode.addClass("disabled");
					    			// }
					    			setTimer();
				                	
				                }else{//获取验证码失败
				        //         	if(data.times>=5){//大于5次
				        //         		$getCode.addClass("disabled");
					    			// 	var html="<p class='lh-40'>"+data.msg+"</p>";
					    			// 	self.alertMes(html);
					    			// 	return false;
					    			// }
					    			if(data.status==2){//图形验证码错误
					    				var html="<p class='lh-40'>"+data.msg+"</p>";
					    				self.alertMes(html);
					    				return false;
					    			}
					    			var html="<p class='lh-40'>"+data.msg+"</p>";
				    				self.alertMes(html);
				                }
							},
							error:function(){
							}
						});
					}
				});

				$passportSea.on("click",function(){//密码可见
					var type=$pwdInput0.attr("type");
					if(type=="text"){
						$pwdInput0.attr("type","password");
						$pwdInput1.attr("type","password");
						$passportSea.removeClass("icon-kejian").addClass("icon-bukejian");
					}
					else{
						$pwdInput0.attr("type","text");
						$pwdInput1.attr("type","text");
						$passportSea.removeClass("icon-bukejian").addClass("icon-kejian");
					}
				});
				var timeout=60;//倒计时60s
				function setTimer(){
					var timeInner=timeout;
					$getCode.addClass("disabled").text(timeInner+"s");;
					
					var timer=setInterval(function(){
						timeInner-=1;
						$getCode.text(timeInner+"s");
						if(timeInner==0){
							$kefuMes.removeClass("hide");
							$getCode.removeClass("disabled").text("重发");
							clearInterval(timer);
						}
					},1000);
				}

			},
			validateForm:function(){
				require("layer");
				var self=this;
				var regPass = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/;
				var imgReg=/^\d{4,4}$/;


				var $imgRow=$("#imgRow");//图形行
				var $imgInput=$("#imgInput");//图形验证码输入框
				var $telMesInput=$("#telMesInput");//短信验证码输入框
				var $pwdInput0=$("#pwdInput0");//登录密码0
				var $pwdInput1=$("#pwdInput1");//确认登录密码1
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

				function validateAll(){
					var imgVal=$imgInput.val().trim();//图形验证码
					var telMesVal=$telMesInput.val().trim();//短信验证码
					var pswVal0=$pwdInput0.val().trim();//首次密码
					var pswVal1=$pwdInput1.val().trim();//再次密码

					if( (imgVal!="")&&(telMesVal!="")&&(pswVal0!="")&&(pswVal1!="")){//必填项不能为空
						if(!(imgReg.test(imgVal))){//图形码不正确
							return false;
						}
						return true;
					}
					else{
						return false;
					}
				}

				$submit.click(function(){
					var pswVal0=$pwdInput0.val().trim();//首次密码
					var pswVal1=$pwdInput1.val().trim();//再次密码
					if(!( $submit.hasClass("disabled") ) ){//按钮可点  
						
						if($pwdInput0.val()!=$pwdInput1.val()){//两次密码不一致
							var html=self.alertMsg.passIsNotEqual;
							self.alertMes(html);
							return false;
						}
						if(!regPass.test($pwdInput0.val())|| !regPass.test($pwdInput1.val()) || pswVal0.length<6 || pswVal0.length>15 || pswVal1.length<6 || pswVal1.length>15){//密码格式不正确
							var html=self.alertMsg.passNotRight;
							self.alertMes(html);
							return false;
						}
						

						var params={
							userName:self.pagePhone,//当前用户手机
							vertify:$imgInput.val(),//图形码
							code:$telMesInput.val(),//短信码
							firstPwd:$pwdInput0.val(),//密码0
							secondPwd:$pwdInput1.val(),//密码1
						};

						$.ajax({
							url:self.url.wapUrl+self.url.submitUrl,
							type:"get",
							dataType:"jsonp",
							data:params,
							success:function(data){
								//console.log(data);
								
								if(!(data.result)){//各种验证错误导致的注册失败

									if(data.status==2){//图像验证码不正确
										var html=self.alertMsg.imgIsError;
									}
									else if(data.status==1){//验证码不正确
										var text=$("#getCode").text();
										if(text.search("s")>=0){
											text="重发";
										}
										
										var html="<p class='lh-40'>抱歉，您输入的验证码不正确，可以点击“"+text+"”再次获取短信</p>";
										// var html=self.alertMsg.mesIsError;
									}
									else if(data.code==-1){//登录超时
										var html="<p class='text-center lh-40'>"+"访问已超时，请重新登录！"+"</p>";
										self.alertMes(html);
										setTimeout(function(){
											var href=self.url.wapUrl+"/passport/login.html";
											window.location.href=href;
										},2000);
									}
									else{//密码不一致
										var html=self.alertMsg.passIsNotEqual;
									}
									self.alertMes(html);
								}
								else if(data.result){//注册成功
									submitSuccess();
								}
							}
						});
					}

				});

				function submitSuccess(){
					var html="<p class='text-center'>交易密码修改成功</p>";
					var url=self.url.wapUrl+"/member/setting.html";
					layer.open({
						content:html,
						shadeClose:false,
						className:"layer-tip",
						time:2,
						end:function(){
							window.location.href=url;
						}
					});
				}
			},
			submitForm:function(){
				var self=this;
				
			}
		};

		var app=new App();
	});
});