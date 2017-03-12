/**
 * 钱保姆WAP
 * @name 已绑定银行卡
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
		
		//编辑银行卡
		$("#edit").on("click",function(){
			$("#formBtn").removeClass("hide");
			$("#editForm").removeClass("hide");
			$("#normal").addClass("hide");
	    })
		
		//取消编辑银行卡
		$("#cancel").on("click",function(){
			$("#formBtn").addClass("hide");
			$("#editForm").addClass("hide");
			$("#normal").removeClass("hide");
	    })
		
		//提交修改 
		$("#formBtn").on("click",function(){
			require.async('layerCss',function(){
	           require.async('layer',function(layer){
	           		var branch = $("#branch").val().trim();
					if( branch == "" ){
						layer.open({
		                    content: '请输入开户支行',
		                    className: 'layer-tip',
		                    shadeClose:false,
		                    time: 2,
		                    end:function(){
		                    	$("#subbranch").focus();
		                    }
		                });
					}else{
						$.ajax({
						    type: "get",
						    url: wapurl+"/api/member/modifyBankCardInfo.html",
						    data: {
						    	id:$("#bankId").val(),
						    	branch:$("#branch").val().trim()
							},
						    dataType:"jsonp",
			                contentType: "application/jsonp; charset=utf-8",
						    success: function(data){
						    	if(data.result){
						    		layer.open({
				                    	content: '已保存',
				                    	className: 'layer-tip',
				                    	shadeClose:false,
				                    	time: 2,
				                    	end:function(){
				                   			window.location.reload();
				                    	}
				                	});
						    	}else{
						    		console.log(data.msg)
						    	}
						    }
						})
					}
	            })
	        })
	   	});
	   	
	});
})
