$(function(){
	
		// 全选功能
		$("#list-check-all").click(function(){
			var status=$(this).find("input.px").prop("checked");
			
			$("#table-list .checkbox-inline input.px").each(function(index,elem){
				$(elem).prop("checked",status);
			});
		});
	
});