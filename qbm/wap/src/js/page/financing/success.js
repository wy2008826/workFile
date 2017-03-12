define(function(require,exports,module){
	require("zepto");
	require('fastclick');
	FastClick.attach(document.body);

	$(function(){

		var App=function(){

			this.url={
				wapUrl:$("#wapurl").val()
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

			this.addRaise=this.getParam("addRaise");

			this.init();
		
		};

		App.prototype={
			init:function(){
				var self=this;

				//点击 tap-link标示的链接 进行页面跳转
				$("body").on("click",".tap-link",function(e){
					e.preventDefault();
					e.stopPropagation();
					var href=$(this).attr("data-href");
					window.location.href=href;
				});
				var $add_raise_wraper=$("#add_raise_wraper");
				var $addRaise=$("#addRaise");

				if(this.addRaise!="0%"){
					$add_raise_wraper.removeClass("hide");
					$addRaise.text(this.addRaise);
				}
				
			}
		};

		var app=new App();

	});
});