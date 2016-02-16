define(function(require,module,exports){
	require("zepto");
	require('fastclick');
	FastClick.attach(document.body);

	$(function(){
		var App=function(){

			this.url={
				wapUrl:$("#wapurl").val(),
				webUrl:$("#weburl").val(),//pc端路径前缀
				refeshImgUrl:"",//刷新图形码
				getCodeUrl:"/api/getPhoneRegCode.html",//获取短信验证码
				submitUrl:"/api/doReg.html"//表单提交地址
			};

			this.match={
				rule:function(val,reg,required){
					if(val.search(reg)<0){
						return false;
					}
					else{
						return true;
					}
				}
			};
			this.getParam=function(key){//获取href后面的查询字段
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
			this.pagePhone=this.getParam("phoneNumber");

			this.alertMsg={
				imgIsEmpty:"<p class='lh-40 text-center'>抱歉，您输入的图形验证码不正确</p>",
				imgIsError:"<p class='lh-40 text-center'>抱歉，您输入的图形验证码不正确</p>",
				mesIsError:"<p class='lh-40 text-center'>抱歉，您输入的验证码不正确，可以点击“重发”再次获取短信</p>",
				passNotRight:"<p class='lh-40 text-center'>登录密码格式不正确（正确格式：6-12位数字加字母组合）</p>",
				passIsNotEqual:"<p class='lh-40 text-center'>两次输入的登录密码不一致</p>",
				tuijianWrong:"<p class='lh-40 text-center'>推荐人手机号码格式不正确</p>",
				tuijianIsNotExist:"<p class='lh-40 text-center'>推荐人不存在</p>"
			};

			this.tipAlert=function(html){
				layer.open({
					content:html,
					className:"layer-tip",
					time:2,
					shadeClose:false
				});
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


			this.init();//表单得到、失去焦点  填充手机号码
			this.refeshImgAndCode();//刷新图形验证码和获取短信验证码 密码可见
			this.validateForm();//验证表单
			
		};
		App.prototype={
			init:function(){

				var self=this;
				if(self.pagePhone){
					$("#pagePhone").text(self.pagePhone);
				}

				$("body").on("click",".layermbtn span",function(){
					layer.closeAll();
				});

				$("body").on("click",".tap-link",function(e){//预处理默认的跳转
					e.preventDefault();
					e.stopPropagation();
					var href=$(this).attr("data-href");
					window.location.href=href;
				});

				
				$("input").focus(function(){
					var $inp=$(this);
					var parent=$inp.closest(".list_item").addClass("active");
				});
				$("input").blur(function(elem){
					var $inp=$(this);
					var parent=$inp.closest(".list_item").removeClass("active");
				});

				var times=$("#times").val().trim();
				if(times>3){
					$("#imgRow").removeClass("hide");
				}
			},
			refeshImgAndCode:function(){
				var self=this;
				var imgReg=/^\d{4,4}$/;
				var $imgRow=$("#imgRow");
				var isFirstGetCode=true;//首次获取验证码
				var $imgRandomWraper=$("#img_random_wraper").eq(0);//验证码图片盒子
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
							//console.log(this);
							$refeshImg.removeClass("animate");
						}
					}
					
				});


				$getCode.on("click",function(){//获取短信码
					var url=self.url.wapUrl+self.url.getCodeUrl;
					var verifyCode=$("#imgInput").val().trim();

					$(this).text("重发");

					if(!($imgRow.hasClass("hide"))){
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

					}
					var params={
						Phone:self.pagePhone,//手机号码
		            	verify:verifyCode //图形验证码
					};

					if(!$(this).hasClass("disabled")){
						$.ajax({
							url:url,
							type:"get",
							dataType:"jsonp",
							data:params,
							success:function(data){
								//console.log(data);
								if(typeof data=="string"){
				    				data = $.parseJSON(data);
				    			}
				                if(data.result){//获取验证过码成功
				                	if(data.times>=3){//大于三次  显示图形码 第四次输入必须要验证图形码
					    				$("#imgRow").removeClass("hide");
					    			}
					    			// if(data.times>=5){
					    			// 	$getCode.addClass("disabled");
					    			// }
				                	setTimer();
				                }else{//获取验证码失败
				        //         	if(data.times>=5){//大于5次
				        //         		$getCode.addClass("disabled");
					    			// 	var html="<p class='lh-40 text-center'>"+data.msg+"</p>";
					    			// 	self.alertMes(html);
					    			// }
					    			if(data.status==2){//图形验证码错误
					    				var html="<p class='lh-40 text-center'>"+data.msg+"</p>";
					    				self.alertMes(html);
					    				return false;
					    			}
					    			var html="<p class='lh-40 text-center'>"+data.msg+"</p>";
					    			self.alertMes(html);
				                }
							},
							error:function(){
								// setTimer();
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
						if(timeInner<=0){
							$kefuMes.removeClass("hide");
							$getCode.removeClass("disabled").text("重发");
							if(!$("#telMesInput").val().trim()){
								$kefuMes.show();
							}
							clearInterval(timer);
						}
					},1000);
				}

			},
			validateForm:function(){
				require("layer");

				var self=this;
				var telReg=/^1[34578]\d{9}$/;
				var regPass = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
				var alertMes=self.alertMes;
				var $imgRow=$("#imgRow");//图形行
				var $imgInput=$("#imgInput");//图形验证码输入框
				var $telMesInput=$("#telMesInput");//短信验证码输入框
				var $pwdInput0=$("#pwdInput0");//登录密码0
				var $pwdInput1=$("#pwdInput1");//确认登录密码1
				var $tuijianInput=$("#tuijianInput");//推荐人手机号码
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
					var tuijianInput=$tuijianInput.val().trim();//推荐人手机号码
					

					if( (telMesVal!="")&&(pswVal0!="")&&(pswVal1!="")){//必填项不能为空
						if(!$imgRow.hasClass("hide")){//图形验证码显示的情况
							if(imgVal!=""){
								return true;
							}
							else{
								return false;
							}
						}
						else{
							return true;
						}
					}
					else{
						return false;
					}
				}

				$submit.click(function(){
					require.async("layer",function(){
						if(!( $submit.hasClass("disabled") ) ){//按钮可点  
							
							if($pwdInput0.val()!=$pwdInput1.val()){//两次密码不一致
								var html=self.alertMsg.passIsNotEqual;
								alertMes(html);
								return false;
							}
							if(!regPass.test($pwdInput0.val())|| !regPass.test($pwdInput1.val())){//密码格式不正确
								var html=self.alertMsg.passNotRight;
								alertMes(html);
								return false;
							}
							if($tuijianInput.val().trim()!=""){
								if(!self.match.rule($tuijianInput.val().trim(),telReg)){//推荐人手机不为空 但是格式不正确
									var html=self.alertMsg.tuijianWrong;
									alertMes(html);
									return false;
								}
							}

							var href="../index.html";
							window.location.href=href;
							return false;

							var params={
								verify:$imgInput.val()||"",//图形码
								code:$telMesInput.val(),//短信码
								firstPwd:$pwdInput0.val(),//密码0
								secondPwd:$pwdInput1.val(),//密码1
								referee:$tuijianInput.val(),//推荐人手机号
								username:self.pagePhone//注册手机号
							};	
							//console.log(params);
							var url=self.url.wapUrl+self.url.submitUrl;
							$.ajax({
								url:url,
								type:"get",
								dataType:"jsonp",
								data:params,
								success:function(data){
									//console.log(data);
									if(!data.result){
										if(data.code=="-1"){//各种原因的注册失败
											if(data.status=="1"){//短信码错误
												var text=$("#getCode").text();
												if(text.search("s")>=0){
													text="重发";
												}
												var html="<p class='lh-40 text-center'>抱歉，您输入的验证码不正确，可以点击“"+text+"”再次获取短信</p>";
												
												alertMes(html);
											}
											else if(data.status=="2"){//图形验证码错误
												var html=self.alertMsg.imgIsError;
												alertMes(html);
											}
											else if(data.status=="3"){//登录密码格式错误
												var html=self.alertMsg.passNotRight;
												alertMes(html);
											}
											else if(data.status=="4"){//登录密码不一致
												var html=self.alertMsg.passIsNotEqual;
												alertMes(html);
											}
											else if(data.status=="5"){//推荐人不存在
												var html=self.alertMsg.tuijianIsNotExist;
												alertMes(html);
											}
											else if(data.status=="13"){
												var html="<p class='lh-40 text-center'>"+data.msg+"</p>";
												alertMes(html);
											}
											else{
												var html="<p class='lh-40 text-center'>"+data.msg+"</p>";
												alertMes(html);
											}
										}
									}
									else if(data.result==true){//成功
										var href=self.url.wapUrl+"/passport/regAuthentication.html?phoneNumber="+self.pagePhone;
										// setTimeout(function(){
											window.location.href=href;
										// },5000);
									}
								}
							});
						}

					});
				});
			}
		};

		var app=new App();
	});
});