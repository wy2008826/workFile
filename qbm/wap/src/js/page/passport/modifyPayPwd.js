define(function(require,module,exports){
	require("zepto");
	require('fastclick');
	FastClick.attach(document.body);

	$(function(){
		var App=function(){

			this.url={
				wapUrl:$("#wapurl").val(),
				submitUrl:"/api/passport/security.html"//修改交易密码提交地址
			};
			
			this.alertMsg={
				originIsError:"<p class='text-center lh-40'>原交易密码输入不正确</p>",
				passNotRight:"<p class='text-center lh-40'>抱歉，您输入的新交易密码格式不正确，请输入6-15位数字加字母组合，区分大小写</p>",
				passIsNotEqual:"<p class='text-center lh-40'>两次输入的新交易密码不一致</p>"
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

			this.init();
			this.refeshImgAndCode();// 密码可见
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
				var $passportSea=$("#passportSea");//密码可见按钮
				var $pwdInput0=$("#pwdInput0");//登录密码0
				var $pwdInput1=$("#pwdInput1");//确认登录密码1

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
				
			},
			validateForm:function(){
				require("layer");
				var self=this;
				var regPass = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/;

				var $pwdInputOrigin=$("#pwdInputOrigin");//原登录密码
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
					
					var pswValoriginVal=$pwdInputOrigin.val().trim();//原始密码
					var pswVal0=$pwdInput0.val().trim();//首次密码
					var pswVal1=$pwdInput1.val().trim();//再次密码

					if( (pswValoriginVal!="")&&(pswVal0!="")&&(pswVal1!="")){//必填项不能为空
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
							password:$pwdInputOrigin.val(),//原始密码
							firstPwd:$pwdInput0.val(),//密码0
							secondPwd:$pwdInput1.val(),//密码1
							type:0//修改交易密码的标识符
						};

						// submitSuccess();
						$.ajax({
							url:self.url.wapUrl+self.url.submitUrl,
							type:"get",
							dataType:"jsonp",
							data:params,
							success:function(data){
								//console.log(data);
								if(typeof data=="string"){
									data=JSON.parse(data);
								}
								if(!(data.result)){//各种原因的修改失败
									
									if(data.status=="-2"){//原密码不正确
										var html=self.alertMsg.originIsError;
										self.alertMes(html);
									}
									else if(data.code==3){//两次新交易密码不一致
										var html=self.alertMsg.passIsNotEqual;
										self.alertMes(html);
									}
									else if(data.code==4){//新交易密码格式不正确
										var html=self.alertMsg.passNotRight;
										self.alertMes(html);
									}
									else if(data.code==-1){//登录超时
										var html="<p class='text-center lh-40'>"+"访问已超时，请重新登录！"+"</p>";
										self.alertMes(html);
										setTimeout(function(){
											var href=self.url.wapUrl+"/passport/login.html";
											window.location.href=href;
										},2000);
									}
									else{
										var html="<p class='text-center lh-40'>"+data.msg+"</p>";
										self.alertMes(html);
									}
								}
								else if(data.result){//登录密码修改成功
									if(data.status==1){
										submitSuccess();
									}
								}
							}
						});
					}
				});

				function submitSuccess(){
					var html="<p class='text-center'>交易密码修改成功</p>";
					layer.open({
						content:html,
						shadeClose:false,
						className:"layer-tip",
						time:2,
						end:function(){
							var href=self.url.wapUrl+"/member/setting.html";
							window.location.href=href;
						}
					});


				}
			}
		};

		var app=new App();
	});
});