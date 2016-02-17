/**
 * 钱保姆WAP
 * @name 个人中心
 * @description 
 * @date 2016-01-13
 * @version $V1.0$
 */


define(function(require, exports, module) {
   	require('zepto');
    
    require('fastclick');
	FastClick.attach(document.body);
    
	$(function(){
		var wapurl = $("#wapurl").val();
		

		$("body").on("click",".tap-link",function(e){//预处理默认的跳转
			e.preventDefault();
			e.stopPropagation();
			var href=$(this).attr("data-href")+"?borrow_id="+self.borrow_id;
			window.location.href=href;
		});

		
		//身份认证
		$("#authentication").on("click",function(){
	        location.href = wapurl+ "/member/authentication.html";
	    })
		
		//银行卡认证-已开启同卡进出
		$("#bindCard").on("click",function(){
			location.href = wapurl+ "/member/bankCardManage.html";
	    })
		
		//银行卡认证-没有银行卡或未开启同卡进出
		$("#unBindCard").on("click",function(){
	       location.href = wapurl+ "/member/recharge.html";
	    })
		
		//修改登录密码
		$("#modifyLoginPwd").on("click",function(){
	        location.href = wapurl+ "/passport/modifyLoginPwd.html";
	    })
		
		//修改交易密码
		$("#modifyPayPwd").on("click",function(){
	        location.href = wapurl+ "/passport/modifyPayPwd.html";
	    })
		
		//找回交易密码
		$("#forgetPayPwd").on("click",function(){
	        location.href = wapurl+ "/passport/forgetPayPwd.html";
	    })
	    
	    //退出登录
		$("#loginOut").on("click",function(){
			require.async('layerCss',function(){
	           require.async('layer',function(layer){
	           		$.ajax({
					    type: "get",
					    url: wapurl+"/api/exit.html",
					    dataType:"jsonp",
					    success: function(data){
					    	if(data.result){
					    		layer.open({
				                    content: '您已退出登录，页面将跳转至首页',
				                    className: 'layer-tip',
				                    time: 2,
				                    end:function(){
				                   		location.href = wapurl;
				                    }
				                });
					    	}
					    }
					})
	            })
	        })
	    });
	})
})
