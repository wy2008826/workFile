$(function(){

	var App=function(){

		
		this.init();//页面初始化
		this.labelClick();//退款申请 取消订单   确认入住  确认退房
		
	};

	App.prototype={
		init:function(){

		},
		labelClick:function(){
			$("#order_operate_labels").on("click",".cancel_order",function(){//取消订单
				layer.open({
					content:"是否取消订单？",
					style:"width:70%",
					btn: ['确认', '取消'],
					yes: function(){
						alert("点击了确认");
						layer.closeAll();
				    }
				});
			}).on("click",".confirm_in",function(){//确认入住
				layer.open({
					content:"是否确认入住？",
					style:"width:70%",
					btn: ['确认', '取消'],
					yes: function(){
						alert("点击了确认");
						layer.closeAll();
				    }
				});
			}).on("click",".confirm_out",function(){//确认退房
				layer.open({
					content:"是否确认退房？",
					style:"width:70%",
					btn: ['确认', '取消'],
					yes: function(){
						alert("点击了确认");
						layer.closeAll();
				    }
				});
			}).on("click",".confirm_cash_out",function(){//确认退款
				// layer.open({
				// 	content:"是否确认退款？",
				// 	style:"width:70%",
				// 	btn: ['确认', '取消'],
				// 	yes: function(){
				// 		alert("点击了确认");
				// 		layer.closeAll();
				//     }
				// });
			})

		}
	};

	var app=new App();
});