$(function(){
	//搜索弹框中的分组
	$("body").on("keyup","#alertBoxGroupVal",function(e){

		if(e.keyCode==13){
			var value=$(".modal-content #alertBoxGroupVal").val();
			//selctGroup(value);
			var pids=$(".change_group_hidden").eq(0).data("data-pids");
			
			groupAndWindow(pids,value,true);
		}
	});

	$("body").on("click",".modal-content #search_group",function(){
		var value=$(".modal-content #alertBoxGroupVal").val();

		//selctGroup(value);
		var pids=$(".change_group_hidden").eq(0).data("data-pids");
		groupAndWindow(pids,value,true);
	});
	// 全选功能
	$("#list-check-all").click(function(){
		var status=$(this).find("input.px").prop("checked");
		$("#table-list .checkbox-inline input.px").prop("checked",status);
	});
    //  修改单分组改分组事件
	$('#table-list').on("click",".change-group",function(){
		 var productId = $(this).attr('productId');
		 var pids =  new Array();
         pids.push(productId);
        // groupWindow(pids);
        groupAndWindow(pids,null,false);
	});
	
	// 批量修改分组
	$("#updateGroupAll").click(function(){
		var pids = getPitchOnProduct();
		var pidCount = pids.length;
		if(pidCount <= 0 ){
			showSelectError();
			return ;
		}
		//groupWindow(pids);
		groupAndWindow(pids,null,false);
	});
	// 下架单个产品
	$('#table-list').on('click', '.down', function() {
		var productId = $(this).attr('productId');
		var pids =  new Array();
        pids.push(productId);
        updateProduct(pids,"确定下架该产品?",3);
	});
	//批量下架
	$("#allDown").click(function(){
		var pids = getPitchOnProduct();
		var pidCount = pids.length;
		if(pidCount <= 0 ){
			showSelectError();
			return ;
		}
		updateProduct(pids,"确定下架产品?",3);
	});
	
	// 上架单个产品
	$('#table-list').on('click', '.upProduct', function() {
		var productId = $(this).attr('productId');
		var pids =  new Array();
        pids.push(productId);
        updateProduct(pids,"确定上架该产品?",2);
	});
	//批量上架
	$("#upAllProduct").click(function(){
		var pids = getPitchOnProduct();
		var pidCount = pids.length;
		if(pidCount <= 0 ){
			showSelectError();
			return ;
		}
		updateProduct(pids,"确定上架产品?",2);
	});
	// 售罄单个产品
	$('#table-list').on('click', '.sellOutProduct', function() {
		var productId = $(this).attr('productId');
		var pids =  new Array();
        pids.push(productId);
        updateProduct(pids,"该产品售罄?",4);
	});
	//批量售罄
	$("#sellOutAllProduct").click(function(){
		var pids = getPitchOnProduct();
		var pidCount = pids.length;
		if(pidCount <= 0 ){
			showSelectError();
			return ;
		}
		updateProduct(pids,"产品售罄?",4);
	});
	
});

// 异步请求分组数据
//selctGroup(null);

