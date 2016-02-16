define(function(require,module,exports){
	require("zepto");
	require('fastclick');
	FastClick.attach(document.body);

	$(function(){
		var App=function(){

			this.url={
				wapUrl:$("#wapurl").val(),
				submitTelUrl:"/api/doLogin.html"//提交密码
			};
			this.layerComponent=function(options){
				var titleHtml="<h4 class='my-layer-title'>"+options.title+"</h4>";
				var contentHtml=options.content;

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

			this.init();
			this.submitForm();
		};
		App.prototype={
			init:function(){

				var self=this;
				if(self.pagePhone){//获取手机号码   动态赋值
					$("#phoneVal").text(self.pagePhone);
				}

				$("body").on("click",".layermbtn span",function(){
					layer.closeAll();
				});

				$("body").on("click","#forgetPwd",function(){
					var $elem=$(this);
					var href=$elem.attr("data-href");

					window.location.href=href+"?phoneNumber="+self.pagePhone;
				});


				$("input").focus(function(elem){
					var $inp=$(this);
					var parent=$inp.closest(".list_item").addClass("active");
					$inp.focus();
				});


				$("input").blur(function(elem){
					var $inp=$(this);
					var parent=$inp.closest(".list_item").removeClass("active");
				});
				

				var $next=$("#submit");

				$("#passportInput")[0].addEventListener("input",function(){
					checkPwd();
				});
				checkPwd();

				function checkPwd(){
					var value=$("#passportInput").val().trim();
					if(value!=""&&(value.length>=6)&&(value.length<=12)){
						$next.removeClass("disabled");
					}
					else{
						$next.addClass("disabled");
					}
				}
			},
			submitForm:function(){
				var self=this;
				var telReg=/^1[34578]\d{9}$/;
				require("layer");
				$("#submit").on("click",function(e){
					if($(this).hasClass("disabled")){
						return false;
					};

					var $passInp=$("#passportInput");
					var passVal=$passInp.val();
					e.preventDefault();

					var parm={"password":passVal,//密码
							"username":self.pagePhone//手机号
						};
					var url=self.url.wapUrl+self.url.submitTelUrl;//提交地址
					$.ajax({
						url:url,
						type:"get",
						dataType:"jsonp",
						data:parm,
						success:function(data){
							//console.log(data,typeof data);
							// alert(JSON.stringify(data));
							if(typeof data=="string"){
			    				data = $.parseJSON(data);
			    			}
							if(data.result){
								if(data.code=="-1"){
									if(data.status==2){//2 账号存在，登陆失败
										// if(data.times>0){//密码错误 但还有机会
											var num=data.times;
											var html="<p class='mg-b-20 lh-40'>"
												+"抱歉，您输入的登录密码不正确，请注意区分大小写，如果忘记密码，可以点击“忘记密码”进行找回"
												+"</p>";
										// }
									}
									else{
										var html="<p class='mg-b-20 lh-40'>"
												+data.msg
												+"</p>";
									}
									// else if(data.status==3){//达到5次
									// 	if(data.times==5){
									// 		var html="<p class='mg-b-20 lh-40'>"
									// 			+"抱歉，您输入的登录密码不正确，且超过5次账户将被锁定30分钟，建议您尽快找回密码"
									// 			+"</p>"
									// 			+"<p class=' lh-40'>"
									// 			+"如有疑问，可以咨询客服400-606-7066"
									// 			+"</p>";
									// 	}
									// 	else{//账户已经被锁定
									// 		var html="<p class='mg-b-20 lh-40'>"
									// 			+"抱歉，因为密码错误，您的账户已被锁定，"+data.dates+"分钟后自动解锁"
									// 			+"</p>"
									// 			+"<p class=' lh-40'>"
									// 			+"如有疑问，可以咨询客服400-606-7066"
									// 			+"</p>";
									// 	}
									// }
									layer.open({
									    content: html,
									    type:1,
									    shadeClose:false,
									    btn:["好的"]
									});
								}
								else if(data.code ==1){//登陆成功
									var url=self.url.wapUrl+"/index.html";
									window.location.href=url;
								}
							}
							else{//服务器异常 各种请求失败
								var html="<p class='mg-b-20 lh-40'>"
										+data.msg
										+"</p>" ;
								layer.open({
								    content:html,
								    type:1,
								    shadeClose:false,
								    btn:["好的"]
								});
							}
						}
					});
				});
			}
		};

		var app=new App();
	});
});