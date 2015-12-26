(function(){

	var App=function(){

		this.topMenu();//顶部菜单
	};

	App.prototype={
		topMenu:function(){
			$(".top-header").on("click",".right_menu",function(){
				var $menuIcon=$(this);
				var $nav=$menuIcon.find(".top_nav");
				// if($nav.css("display")=="none"){
				// 	$menuIcon.find(".top_nav").show();
				// }
				// else{
				// 	$menuIcon.find(".top_nav").hide();
				// }
				$nav.toggleClass("animate");
				
			});
			$("body").on("click",function(e){
				if($(e.target).closest(".right_menu").length<=0){
					$(".top-header .top_nav").removeClass("animate");
				}
			})
		}
	};


	var app=new App();
	
})();