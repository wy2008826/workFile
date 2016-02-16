define(function(require,module,exports){
	require("zepto");
	
	require('fastclick');
	FastClick.attach(document.body);


	$(function(){
		var App=function(){

			this.url={
				wapUrl:$("#wapurl").val(),
				loginByTelUrl:"/api/loginByPhone.html"//使用手机号码进行登录
			};


			this.match={
				phone:function(val,required){
					var telReg=/^1[34578]\d{9}$/;
					if(val.search(telReg)<0){
						return false;
					}
					else{
						return true;
					}
				}
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

			this.init();//初始化 输入框聚焦  失焦事件 手机号码验证等
			this.submitForm();//提交表单
		};
		App.prototype={
			init:function(){

				var self=this;

				var $next=$("#next");
				var $tel=$("#tel");
				var $clearInput=$("#clearInput");

				$("body").on("click",".layermbtn span",function(){
					layer.closeAll();
				});

				$tel.focus(function(elem){
					var $inp=$(this);
					var parent=$inp.closest(".list_item").addClass("active");
					$clearInput.removeClass("hide");
				});

				$tel.blur(function(elem){
					var $inp=$(this);
					var parent=$inp.closest(".list_item").removeClass("active");
					$clearInput.addClass("hide");
				});
				
				$("#tel")[0].addEventListener("input",function(){
					matchTel();
				});

				matchTel();//后退只该页面的时候  如果手机号码正确，溢出disable属性
				
				$("#clearInput").on("click",function(){
					$("#tel").val("").focus();
				});
				
				function matchTel(){
					var value=$tel.val();
					var matched=self.match.phone(value.trim());
					if(matched){
						$next.removeClass("disabled");
					}
					else{
						$next.addClass("disabled");
					}
				}
			},
			submitForm:function(){

				require("layer");
				var self=this;
				var telReg=/^1[34578]\d{9}$/;

				$("#next").on("click",function(e){
					var form=$("#loginForm");
					if($(this).hasClass("disabled")){
						return false;
					}
					var $phoneInp=$("#tel");
					var phoneVal=$phoneInp.val();
					e.preventDefault();
					
					//status -1手机已注册  0 手机未注册
					$.ajax({
						url:self.url.wapUrl+self.url.loginByTelUrl+"?phoneNumber="+phoneVal,
						type:"get",
						dataType:"jsonp",
						success:function(data){
							//console.log(data);
							if(data.result){//有结果
								if(data.status=="0"){//未注册 跳转到注册页面
									var href=self.url.wapUrl+"/passport/reg.html?phoneNumber="+data.phoneNumber;
									window.location.href=href;								 
								}
								else if(data.status=="-1"){//已经注册 跳转到输入密码界面
									var href=self.url.wapUrl+"/passport/enterPwd.html?phoneNumber="+data.phoneNumber;
									window.location.href=href;	
								}
								// else if(data.status=="7"){//当天短信验证码已经达到上限
								// 	// var href=self.url.wapUrl+"/passport/reg.html?phoneNumber="+data.phoneNumber;
								// 	var html="<p class='lh-40'>"+data.msg+"</p>";
								// 	self.alertMes(html);
								// }
								else{
									var html="<p class='lh-40'>"+data.msg+"</p>";
									self.alertMes(html);
								}
							}
							else{
								var html="<p class='lh-40'>"+data.msg+"</p>";
								self.alertMes(html);
							}
						}
					});
				});
			}
		};

		var app=new App();
	});
});