define(function(require,exports,module){
	require("zepto");
	require("fastclick");
	var template=require("artTemplate");
	FastClick.attach(document.body);


	$(function(){
		var App=function(){

			this.tpl={
				submitNickNameTpl:template.compile($("#submitNickNameTpl").html())
			};
			this.url={
				webUrl:$("#webUrl").val(),
				subNickUrl:"/submiturl.html"
			};
			this.init();
			this.submitPhone();
		};
		App.prototype={
			init:function(){
				
			},
			submitPhone:function(){
				var self=this;
				$("#clickStart").on("click",function(){
					var html=self.tpl.submitNickNameTpl({});
					layer.open({
						content:html,
						success:function(){
							var $submitBtn=$(".layermchild #alert_btn").eq(0);
							$(".layermchild #alert_nickname").on("input",function(){
								var $inp=$(this);
								validateNickName($inp);//验证手机输入框是否合乎标准
							});

							function validateNickName($inp){
								
								var $nickInp=$inp;
								console.log("validate");
								var val=$nickInp.val().trim();
								if(val.trim()==""||val.length>28){
									$submitBtn.addClass("disabled");
								}
								else{
									$submitBtn.removeClass("disabled");
								}
							}
						}
					});
				});

				$("body").on("click","#alert_btn",function(e){
					var $inp=$(".layermchild .alert_inp");
					var $btn=$(this);
					var val=$inp.val();
					var $error=$(".layermchild .alert_error");
					if($btn.hasClass("disabled")){
						return false;
					}
					
					if(val==""){
						e.preventDefault();
						$error.removeClass("hide").text("昵称不能为空");
						return false;
					}
					else if(val.length>28){
						e.preventDefault();
						$error.removeClass("hide").text("昵称不能大于28个字符");
						return false;
					}
					else{
						$error.removeClass("hide").text("");
						// var url=self.url.webUrl+self.url.subNickUrl;
						// var param={
						// 	val:val,
						// 	openId:"123123",
						// 	mark:"213123"
						// };

						// $.ajax({
						// 	type:"get",
						// 	url:url,
						// 	data:param,
						// 	dataType:"jsonp",
						// 	success:function(dt){
						// 		var data=dt;
						// 		alert(JSON.stringify(data));
								
						// 	},
						// 	error:function(){
								
						// 	}
						// });
					}
				});

			}
		};

		var app=new App();
	});
});