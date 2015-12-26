$(function(){

	var App=function(){


		this.init();//页面初始化
		this.clickLabel();//点击标签
	};

	App.prototype={
		init:function(){
			
		},
		clickLabel:function(){
			$("body").on("click",".cancel_order",function(){//取消订单
				
				layer.open({
					content:"是否取消当前订单？",
					style:"width:70%",
					btn: ['确认', '取消'],
					yes: function(){
						alert("点击了确认");
						layer.closeAll();
				    }
				});

			}).on("click",".accusation",function(){//举报
				
				layer.open({
					content:"是否举报当前房间实物与图片不符？",
					style:"width:70%",
					btn: ['确认', '取消'],
					yes: function(){
						alert("点击了确认");
						layer.closeAll();
				    }
				});

			}).on("click",".cash_out",function(){//申请退款
				
			})
		}
	};



	var app=new App();
});