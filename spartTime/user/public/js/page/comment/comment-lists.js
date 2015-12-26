$(function(){

	var App=function(){
		
		this.init();//页面初始化
        this.selectLabel();//选择标签
		
	};

	App.prototype={
		init:function(){

		},
        selectLabel:function(){
            $("#top_label").on("click",".item_link",function(){
                var $curLink=$(this);

                $curLink.addClass("active").siblings().removeClass("active");

            })

        }
	};

	var app=new App();
});