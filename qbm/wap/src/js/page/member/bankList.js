/**
 * 钱保姆WAP
 * @name 交易明细
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
		
		//加载列表
		getBankList();
		
		function getBankList(){
			// $.ajax({
		 //        type:"get",
		 //        url:wapurl+"/wap/getBankList.html?randomTime="+(new Date()).getTime(),
		 //        dataType:'json',
		 //        success:function(data){
					var data={
						dataLists:[

						]
					};
		            //异步加载模板引擎
		            require.async('artTemplate', function(template) {
		                require.async('artTemplateHelper', function() {
		                    // var html = template('listTpl', data);
		                    $("#bankList").html("<p class='text-center fs-24' style='margin:2rem 0'>暂无数据</p>") ;
		                })
		            });
		        // }
		    // })
		}
		
		
	})
})
