$(function(){

	var App=function(){

		this.init();//页面初始化
		this.labelClick();//下架 评价  管理等功能
	};

	App.prototype={
		init:function(){

		},
		labelClick:function(){
			$("#message_ul").on("click",".down",function(){//下架
				var $down=$(this);
				layer.open({
					content:"是否对已选择的房源进行下架？",
					btn: ['确认', '取消'],
					shadeClose: false,
					yes: function(){
				        layer.open({content: '你点了确认', time: 1});
				        $down.closest("li").remove();
				    }, 
				    no: function(){
				        layer.open({content: '你选择了取消', time: 1});
				    }
				});
				return false;//避免跳转
			}).on("click",".manage",function(){//评价
				
				var href=window.location.href;
				window.location.href=href.substr(0,href.lastIndexOf("/"))+"/evalute.html";//为了演示
				

				return false;//避免跳转
			}).on("click",".del",function(){//删除
				$del=$(this);
				layer.open({
					content:"是否对已选择的房源进行删除？",
					btn: ['确认', '取消'],
					shadeClose: false,
					yes: function(){
				        layer.open({content: '你点了确认', time: 1});
				        $del.closest("li").remove();
				    }, 
				    no: function(){
				        layer.open({content: '你选择了取消', time: 1});
				    }
				});
				return false;//避免跳转
			});
		}
	};

	var app=new App();
});