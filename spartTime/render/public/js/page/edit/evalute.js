$(function(){

	var App=function(){

		this.init();//页面初始化
		this.outLook();//外显等功能
	};

	App.prototype={
		init:function(){

		},
		outLook:function(){
			$("#evalute_wraper").on("click",".outlook",function(){
				layer.open({
					content:"是否对已选择的评价进行外显？",
					btn: ['确认', '取消'],
					shadeClose: false,
					yes: function(){
				        layer.open({content: '你点了确认', time: 1});
				    }, 
				    no: function(){
				        layer.open({content: '你选择了取消', time: 1});
				    }
				});
			});
		}
	};

	var app=new App();
});