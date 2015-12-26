$(function(){

	var App=function(){

		this.init();//页面初始化
		this.navBar();//
	};

	App.prototype={
		init:function(){

		},
		navBar:function(){
			$(".top_nav").on("click",".nav_item",function(){
				if(!$(this).hasClass("active")){
					var timeType=$(this).attr("data-time");

					$(".top_nav .nav_item.active").removeClass("active");
					$(this).addClass("active");

					alert(timeType);

				}
			});
		}
	};

	var app=new App();
});