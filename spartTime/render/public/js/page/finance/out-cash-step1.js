$(function(){

	var App=function(){

		this.init();//页面初始化
		this.nextStep();//下一步
	};

	App.prototype={
		init:function(){

		},
		nextStep:function(){
			$("#nextBtn").click(function(){
				var value=parseFloat($("#cash_input").val());
				var restCash=parseFloat($("#cash_rest").text());
			
				if(value>restCash){
					layer.open({content: '输入金额大于提现金额', time: 3});
					return false;
				}
				else if(value==""){
					layer.open({content: '输入正确的金额', time: 3});
				}
				
			});
		}
	};

	var app=new App();
});