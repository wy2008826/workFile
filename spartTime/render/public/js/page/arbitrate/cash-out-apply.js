$(function(){

	var App=function(){

		
		this.init();//页面初始化
		this.delImg();//删除图片
		this.labelClick();//拒绝退款   确认退款
		
	};

	App.prototype={
		init:function(){

		},
		delImg:function(){
			$(".dropzone").on("click",".dz-remove",function(){
				var $remove=$(this);
				layer.open({
					content:"是否删除图片？",
					style:"width:70%",
					btn: ['确认', '取消'],
					yes: function(){
						$remove.closest(".dz-preview ").remove();
						layer.closeAll();
				    }
				});
			})
		},
		labelClick:function(){
			$("#operate_labels").on("click",".reject_cash",function(){//拒绝退款
				layer.open({
					content:"是否拒绝退款？",
					style:"width:70%",
					btn: ['确认', '取消'],
					yes: function(){
						alert("点击了确认");
						layer.closeAll();
				    }
				});
			}).on("click",".confirm_cash",function(){//确认退款
				layer.open({
					content:"是否确认退款？",
					style:"width:70%",
					btn: ['确认', '取消'],
					yes: function(){
						alert("点击了确认");
						layer.closeAll();
				    }
				});
			});

		}
	};

	var app=new App();
});