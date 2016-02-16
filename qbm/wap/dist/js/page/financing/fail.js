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

			this.borrow_id=this.getParam("borrow_id");
			this.failReason=decodeURI(this.getParam("failReason"));
			this.failCode=this.getParam("code");
			this.init();
		
		};

		App.prototype={
			init:function(){
				var self=this;
				$("#failReason").text(self.failReason);
				
				//点击 tap-link标示的链接 进行页面跳转
				$("body").on("click",".tap-link",function(e){
					e.preventDefault();
					e.stopPropagation();

					if(self.failCode==-9){//该标已经售罄
						var href=self.url.wapUrl+"/index.html";
					}
					else{
						var href=$(this).attr("data-href")+"?borrow_id="+self.borrow_id;
					}
					window.location.href=href;
				});

			}
		};

		var app=new App();

	});
});