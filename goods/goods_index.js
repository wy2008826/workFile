$(function(){
	

	var App=function(){

		this.init();//页面初始化
		this.dataPicker();//日历插件
		this.searchAndClear();//搜索和清空功能

	}


	App.prototype={
		init:function(){

			// 加载产品列表页
			var goodsStatus=$("#searchGoodStatus option:selected").attr("value");
			tools.load({url:window.configs.selectProductList,id:'#product_context',param:{status:goodsStatus}});

			window.PixelAdmin.start();
		},
		dataPicker:function(){
			var options = {
		        orientation: $('body').hasClass('right-to-left') ? "auto right" : 'auto auto',
		        format: 'yyyy-mm-dd',
		        autoclose: true,
		        language:"zh-CN"
		    }
		    $('#bs-datepicker-range').datepicker(options);
		},
		searchAndClear:function(){
			var goodName=$("#searchGoodValue");//商品名称
			var startTime=$("#searchStartTime");//开始时间
			var endTime=$("#searchEndTime");//结束时间
			var groupObj =  $("#searchGroup_select");
			$("#searchGoodBtn").click(function(){
				var params ={};
				params.name=goodName.val();
				if(startTime.val() != ""){
					params.startTime = startTime.val() + " 00:00:00";
				}
				if(endTime.val() != ""){
					params.endTime = endTime.val()+" 23:59:59";
				}
				params.status = $("#searchGoodStatus").find("option:selected").val();
				params.groupId = groupObj.find("option:selected").val();
				
				tools.load({url:window.configs.selectProductList,id:'#product_context',param:params});
			});

			//清除
			$("#clearGoodBtn").click(function(){
				goodName.val("");
				startTime.val("");
				endTime.val("");
				groupObj.val("");
			});
		}
	}


	var app=new App();
});


function showSelectError(){
	$("#selectAllError").show().delay(1000).fadeOut(100);
}
//下架商品, 上架商品，售罄商品
function updateProduct(pids,title,status){
	var pCount = pids.length;
	bootbox.dialog({
		message:title,
		buttons:{
			success:{
				label:"确定",
				className:"btn-primary",
				callback:function(){
				  $.post(window.configs.batchUpdateProductStatus,{productIds:pids,status:status},function(data){
						if(data.success){
							doPage($("#currentPage").val());
							if(3 == status){ // 下架
								refreshOverview(-pCount,pCount,0);
							}else if (2 == status){ //上架
								var searchStatus = $("#searchGoodStatus").find("option:selected").val();
								if(1 == searchStatus){
									refreshOverview(pCount,0,0);
								}else{
									refreshOverview(pCount,-pCount,0);
								}
							}else if(4 == status){//售罄
								refreshOverview(-pCount,0,pCount);
							}
						}
					},"json");
				}
			},
			danger:{
				label:"取消",
				className:"btn-default",
				callback:function(){}
			}
		},
		className: "bootbox-sm"
	});
}

// 刷新商品概况
function refreshOverview(sell,down,soldOut){
	var sellObj = $("#sell_count");
	var downObj = $("#down_count");
	var soldOutCount = $("#soldOut_count")
	// 更改出售中的商品
	if(0 != sell){
		sellObj.html(sellObj.html() - 0 + sell);
	}
	// 更改下架的商品
	if(0 != down){
	   downObj.html(downObj.html() - 0 + down);
	}
	// 更改售罄的商品
	if(0 != soldOut){
	   soldOutCount.html(soldOutCount.html() - 0 + soldOut);
	}
}

// 获取页面多选框选中
function getPitchOnProduct(){
	var pids = new Array();
	$("input[name='productMultiple']:checked").each(function(){ 
		pids.push($(this).val());
	}); 
	return pids;
}




//pids:商品id   name:搜索名称  hasAlert：是否已经存再弹框
function groupAndWindow(pids,name,hasAlert){
	Handlebars.registerHelper("checked",function(status,options){
		if(status=="yes"){
            return "checked";
        }
        else{
            return "";
        }
	});
	if(hasAlert){//如果弹窗已经存在  把数据更新到弹框里
		var callback=function(data){
			var hpl=Handlebars.compile($("#promptGroupLines").html());
			var groupsHtml=hpl(data);
			$(".modal-content #group_window_ul").html(groupsHtml);
			setGroupStatus(pids);
			
		}
		getData(callback);
	}
	else{//如果弹框不存在  先生成弹框
		var html=$(".change_group_hidden").data("data-pids",pids).html();

	    bootbox.dialog({
	        message:html,
	        title:"修改分组",
	        buttons: {
	            success: {
	                label: "确定",
	                className: "btn-primary",
	                callback: function() {
	                	var groupIds=new Array();
	                    $(".check-list-wraper li").each(function(index,elem){
	                    	var status=$(elem).find(".checkbox-inline .px").prop("checked");
	                    	if(status==true){
	                    		groupIds.push($(elem).find(".checkbox-inline .px").val());
	                    	}
	                    });
	                    if(groupIds.length > 0){
	                    	 $.post(window.configs.addProductToGruop,{groupIds:groupIds,productIds:pids},function(data){
	                    		 if(data.success){
	                    			 doPage($("#currentPage").val());
	                    		 }
	                    	 },"json");
	                    }
	                }
	            },
	            danger:{
	            	label:"取消",
	            	className:"btn",
	            	callback:function(){}
	            }
	        },
	        className: "bootbox-lg"
	    });
		var callback=function(data){
			var hpl=Handlebars.compile($("#promptGroupLines").html());
			var groupsHtml=hpl(data);
			$(".modal-content #group_window_ul").html(groupsHtml);
			setGroupStatus(pids);
		}
		getData(callback);
	}



	function getData(callback){
		$.post(window.configs.selectGroupInfo,{name:name},function(data){
			if(data.success){
				callback(data);
			}
	 	},"json");
	}


	function setGroupStatus(pids){//设置input的状态
		var inputs=$(".modal-content #group_window_ul .px");
		if(pids.length==1){
			$.post(window.configs.productGroups,{productId:pids[0]},function(data){
				data=JSON.parse(data);
				if(data.success){
					var groupsArr=data.result;
					for(var i=0;i<groupsArr.length;i++){
						var groupId=groupsArr[i];
						inputs.each(function(index,elem){
							var value=$(elem).attr("value");
							if(groupId==value){
								$(elem).prop("checked",true)
							}
						});
					}
				}
				
			});
		}
	}
}
