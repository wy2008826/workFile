$(function(){

	var App=function(){

		
		this.init();//页面初始化
		this.selectPrice();//选择价格
		this.playVideo();//播放视频
	};

	App.prototype={
		init:function(){

		},
		selectPrice:function(){
			$("#select_price").on("change",function(){
				$(this).parent().siblings().removeClass("active").end().addClass("active");
				var $selected_text=$("#selected_text");
				var value=$(this).find("option:selected").text();
				$selected_text.text(value);
				if(value=="价格"){
					$selected_text.addClass("down");
				}
				else{
					$selected_text.removeClass("down");
				}

			});
		},
		playVideo:function(){
			$("body").on("click",".video_controls .play",function(){
				var $video=$(this).closest(".video_controls").prev("video");
				console.log($video);
				if($video[0].paused) {
			        $video[0].play();
			    }
			    else {
			        $video[0].pause();

			        var imgUrl=$.getVideoImgSrc($video[0]);
			        console.log(imgUrl);
			    }
			})
		}
	};

	var app=new App();
});