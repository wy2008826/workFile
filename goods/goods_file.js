$(function(){
	//搜索 清空功能
	init.push(function(){
		//搜索
		$("#searchFileBtn").click(function(){
			var fileName=$("#searchFileValue").val();
			util.alert(fileName);
		});
		//清空
		$("#clearFileBtn").click(function(){
			$("#searchFileValue").val("");
		});
	});


	//添加新的文件夹  删除文件夹功能
	init.push(function(){
		//添加文件夹
		$("#addNewGroup").click(function(){
			var html=hTpl.goods_form_common([{"label":"文件夹名称","id":"fileFolderdValue"}]);
			bootbox.dialog({
                message:html,
                title:"添加文件夹",
                buttons: {
                    success: {
                        label: "确定",
                        className: "btn-primary",
                        callback: function() {
                        	var folderName=$("#fileFolderdValue").val();
                           	util.alert(folderName);
                        }
                    },
                    danger:{
                    	label:"取消",
                    	className:"btn",
                    	callback:function(){
                    		
                    	}
                    }
                },
                className: "bootbox-lg"
            });
		});

		//删除文件夹
		$("#table-list").on("click",".del",function(){

			$(this).closest("tr").remove();
			util.alert("ajax异步删除该文件夹");
			
		});
	});

	window.PixelAdmin.start(init);
});