/**
 * 钱保姆WAP
 * @name 我的投资
 * @description 
 * @date 2016-01-14
 * @version $V1.0$
 */


define(function(require, exports, module) {
   	require('zepto');
    
    require('fastclick');
	FastClick.attach(document.body);
    
	$(function(){
		var wapurl = $("#wapurl").val();
		
		function getParam(key){//两个关键点 1. [^&]：代表除了&以外的字符 2. ^和$可以是子组匹配项
			var location=window.location.href;
			var href=location.substr(location.indexOf("?")+1);
			var reg=new RegExp("(^|&)"+key+"=([^&]*)($|&)");//^ $ 为什么不能放在[$&]里面 只能放在(&|$)里面？ 为何不能如此： "(^|&)"+key+"=([^&]*)[$&]"
			var group=href.match(reg);
			var param=group?decodeURIComponent(href.match(reg)[2]):"";
			return param;
		};

		//跳转至标详情
		$("#goItemDetail").on("click",function(){
			var borrowId = $(this).attr("data-id");
			location.href = wapurl+ "/wap/getBorrowInfo.html?borrow_id="+borrowId;
		})
		
		//还款计划 等 
		$("body").on("click",".tap-link",function(){
			var tenderId=getParam("tenderId");
			var flag=$("#flag").val();
			var $elem=$(this);
			var href=$elem.attr("data-href");
			
			if(href.search(/\?/)>=0){
				href+="&tenderId="+tenderId+"&flag="+flag;
			}
			else{
				href+="?tenderId="+tenderId+"&flag="+flag;
			}
			if(href!=""){
				window.location.href=href;
			}
		});

		//保全码
		$("#baoQuanCode").on("click",function(){
			var html='<div class="fc-31 fs-24 pop-layer"><p>为了保障用户投资安全，平台用户所有交易记录都在第三方进行电子存储，生成凭证。</p><p>根据保全码登陆安存无忧存证网站<span class="fc-primary">（https://www.51cunzheng.com)</span> 查询保全证书，可对接全国公证处咨询并维权。</p></div>';
			require.async('layerCss',function(){
	           require.async('layer',function(layer){
	           		layer.open({
						title:['温馨提示','background-color:#fff;color:#313131;'],
						content:html,
						type:1,
						shadeClose:false,
						btn:["知道了"],
						yes: function(){
							layer.closeAll();
					    }
					});
	            })
	        })
		})
		
		
	})
})
