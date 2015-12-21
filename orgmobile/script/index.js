$(function(){

	$("#superWraper").fullpage({
		navigation:true,//是否生成导航按钮
		navigationPosition:"right",//导航按钮位置
		//continuousVertical:true,//是否循环滚动
		afterRender:afterRender,
		afterLoad:afterLoad,
		onLeave:onLeave

	});


	function afterRender(){
		$(".section1").addClass("animate");
	}

	var topLogo=$(".top-logo").eq(0);
	var topDownload=$(".top-download").eq(0);
	var footItem=$(".footer .btn-item");
	function afterLoad(anchorLink, index){
		var section=".section"+index;
		$(section).addClass("animate");
		if(index==1){
			$(".header").removeClass("animate")
			footItem.fadeOut(300);
		}
		else{
			if($(".header").hasClass("animate")){
				return false;
			}
			else{
				$(".header").addClass("animate");
				footItem.fadeIn(400);
			}
		}
	}


	function onLeave(index, direction){
		var section=".section"+index;
		$(section).removeClass("animate");
	}
});