$(function(){


	// 获取所有城市
	var allProvince = new Array();
	var length = province_enum.length;
	for(var i = 0 ; i< length; i++){
		var province = province_enum[i];
		allProvince.push(province.name);
	}
	
	var App=function(){


		this.init();//页面初始化
		this.typeChange();//计价方式发生改变 变革头部信息相应改变
		this.editDelSet();// 设置区域和运费  编辑 删除功能
		this.provienceAlert();//配送区域弹框内容 交互效果  左右城市的移动效果
		this.batchSet();  //批量设置 首件 首价  续件 续价
		this.submitForm();//检验表单和提交数据

	}

	App.prototype={
		init:function(){
			window.PixelAdmin.start();
		},
		typeChange:function(){
			var type=$("input[name='carriagePrice']:checked").attr("value");
			setBatchUnit(type);
			
			$("input[name='carriagePrice']").on("change",function(e){
				var $target=$(e.target);
				var type=$target.attr("value");
				setBatchUnit(type);
			});


			function setBatchUnit(value){
				var unit,theadData;
				if(value==0 ){
					unit="件";
					theadData={
						firstCount:"首件（个）",
						riseCount:"续件（个）"
					}
				}
				else if(value==1){
					unit="Kg";
					theadData={
						firstCount:"首重（"+unit+"）",
						riseCount:"续重（"+unit+"）"
					}
				}
				else if(value==2){
					unit="Kg";
					theadData={
						firstCount:"首重（"+unit+"）",
						riseCount:"续重（"+unit+"）"
					}
				}
				else if(!value){
					unit="件";
					theadData={
						firstCount:"首件（个）",
						riseCount:"续件（个）"
					}
				}
				$(".unitType").html(unit);
				var tmp=Handlebars.compile($("#tableHeadTmp").html())
				var html=tmp(theadData);
				$("#tableHeadTitle").html(html);
			}
		},
		editDelSet:function(){
			//点击编辑按钮
			$('#table-list').on("click",".edit",function(){
	            // 获取所有被选中的城市 
				var excludeProvinceStr = null;
				var excludeProvinceArray = new Array();
				var provinceNames = null;
				$('#table-list .edit').each(function(index,elem){
					provinceNames =  $(elem).attr("selected_province");
					if(index == 0){
						excludeProvinceStr = provinceNames;
					}else{
						excludeProvinceStr +=  "、" + provinceNames;
					}
				});
				if(excludeProvinceStr && excludeProvinceStr != ""){
					excludeProvinceArray =excludeProvinceStr.split("、");
				}
	            var selecteds = $(this).attr("selected_province");
				//data为该行的配送区域对应的城市列表 需要通过ajax从后台读取
				var data={
					chooseAble:filterSelectableProvince(allProvince,excludeProvinceArray),
					selected:selected(selecteds)
				};

				var cityWraper=$(this).parent().prev(".city-wraper").eq(0);
				createCityListBox($(this),data,cityWraper);//生成城市列表
			});

			function createCityListBox(editObj,data,cityWraper){
				var trTmp=Handlebars.compile($(".LR_move_wraper").html()); //此处从局部视图中获取局部视图
				var trHtml=trTmp(data);

				bootbox.dialog({
	                message:trHtml,
	                title:"选择可配送区域",
	                buttons: {
	                    success: {
	                        label: "确定",
	                        className: "btn-primary",
	                        callback: function(){
	                        	cityWraper.html("");
	                        	var cityNnames = null;
	                        	var splitCityNname = null;
	                        	$(".modal-content .right_ul li").each(function(index,elem){
				            		//var cityId=$(elem).attr("city-id");
	                        		var cityNname=$(elem).text().trim();
	                        		if(index == 0){
	                        			cityWraper.append(cityNname);
	                        			cityNnames = cityNname;
	                        		}else{
	                        			splitCityNname = "、" + cityNname;
	                        			cityWraper.append(splitCityNname);
	                        			cityNnames += splitCityNname;
	                        		}
				            	});
	                        	editObj.attr("selected_province",cityNnames);
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


			}

			$('#table-list').on("click",".del",function(){
				var id = $(this).attr("priceMeter_id");
				if(id && id != ""){
					$.post(window.config.deleteBussPriceMeter,{id:id});
				}
				$(this).closest("tr").remove();

			});


			//指定可配送区域和运费
			$('#table-list').on("click","#setAreaCarriage",function(){
				addRow();
			});

			function addRow(){
				var tr=Handlebars.compile($("#row-inputs").html());
				var html=tr({"row":$("#table-list tbody tr").length});
				$("#setAreaCarriage").closest("tr").before(html);
			};
		},
		provienceAlert:function(){
			//单击列表项以及列表项中的图标
			$(document).on("click",".group_window_ul li",function(e){
				e.preventDefault();
				var left_ul=$(".modal-content .left_ul").eq(0);
				var right_ul=$(".modal-content .right_ul").eq(0);
				$(this).toggleClass("active");
				var target=$(e.target).eq(0);

				if(target.hasClass("fa")){//点中小图标 进行列表移动
					$(this).toggleClass("active");

					var wraper=$(this).closest(".group_window_ul").eq(0);
					var mes=[];
					if(wraper.hasClass("left_ul")){//加入到已选
						
						mes.push(getProvienceData($(this)));
						moveProvience(mes,"add");
					}
					else if(wraper.hasClass("right_ul")){//移除已选
						mes.push(getProvienceData($(this)));
						moveProvience(mes,"decrea");
					}

				}
			});

			//单击中间箭头
			$(document).on("click",".left_right_move",function(e){
				e.preventDefault();
				var left_ul=$(".modal-content .left_ul").eq(0);
				var right_ul=$(".modal-content .right_ul").eq(0);
				var target=$(e.target).eq(0);

				var left_selected_ms=[];
				var right_selected_ms=[];

				if(target.hasClass("to-right")){
					left_ul.find("li.active").each(function(index,elem){//
						left_selected_ms.push(getProvienceData(elem));
					});
					moveProvience(left_selected_ms,"add");
				}
				else if(target.hasClass("to-left")){
					right_ul.find("li.active").each(function(index,elem){
						right_selected_ms.push(getProvienceData(elem));
					});
					moveProvience(right_selected_ms,"decrea");
				}

			});

			//双击列表项
			$(document).on("dblclick",".group_window_ul li",function(e){
				if($(this).closest(".group_window_ul").hasClass("left_ul")){
					var mes=[]
					mes.push(getProvienceData(this));
					moveProvience(mes,"add");
				}
				else if($(this).closest(".group_window_ul").hasClass("right_ul")){
					var mes=[]
					mes.push(getProvienceData(this));
					moveProvience(mes,"decrea");
				}
				
			});


			function getProvienceData(elem){
				var provience_id=$(elem).attr("city-id");
				var provience_name=$(elem).text().trim();
				
				return {"elem":$(elem),"city-id":provience_id,"city-name":provience_name};
			}

			function moveProvience(arr,dir){
				var left_ul=$(".modal-content .left_ul").eq(0);
				var right_ul=$(".modal-content .right_ul").eq(0);
				console.log(left_ul);
				if(dir=="add"){
					for(var i=0;i<arr.length;i++){
						$(arr[i].elem).find("span.fa").removeClass("fa-plus-circle").addClass("fa-minus-circle");
						right_ul.append(arr[i].elem);
					}
				}
				else if(dir=="decrea"){
					for(var i=0;i<arr.length;i++){
						$(arr[i].elem).find("span.fa").removeClass("fa-minus-circle").addClass("fa-plus-circle");
						left_ul.append(arr[i].elem);
					}
				}
			}
		},
		batchSet:function(){
			var initReg=/^\d+$/;//整数 包括0
			var plusDotReg=/^\d+\.\d+$/;//小数 包括0

			function matchModel(str,regArr){
				for(var i=0;i<regArr.length;i++){
					if(regArr[i].test(str)){
						return true;
					}
				}

				return false;
			};

			$("#batch_set").on("click",".batch_fir",function(){//首件
				alertAndChangeVal("首件批量设置",[{"label":"首件","id":"batchFir"}],[initReg,plusDotReg],$(this));

			}).on("click",".batch_fir_pri",function(){//首价
				alertAndChangeVal("首价批量设置",[{"label":"首价","id":"batchFirPric"}],[initReg,plusDotReg],$(this));

			}).on("click",".batch_fow",function(){//续件
				alertAndChangeVal("续件批量设置",[{"label":"续件","id":"batchFow"}],[initReg,plusDotReg],$(this));

			}).on("click",".batch_fow_pri",function(){//续价
				alertAndChangeVal("续价批量设置",[{"label":"续价","id":"batchFowPric"}],[initReg,plusDotReg],$(this));

			});
		

			function alertAndChangeVal(title,htmlData,regArr,elem){
				var html=hTpl.goods_form_common(htmlData);
				bootbox.dialog({
	                message:html,
	                title:title,
	                buttons: {
	                    success: {
	                        label: "确定",
	                        className: "btn-primary",
	                        callback: function(){
	                        	var id="#"+htmlData[0]["id"];
	                        	var value=$(id).val().trim();
	                        	var match=matchModel(value,regArr);
	                        	if(match){
	                        		if($(elem).hasClass("batch_fir")){//首件
	                        			$("#table-list input[name^='count']").val(value);
	                        		}
	                        		else if($(elem).hasClass("batch_fir_pri")){//首价
	                        			$("#table-list input[name^='price']").val(value);
	                        		}
	                        		else if($(elem).hasClass("batch_fow")){//续件
	                        			$("#table-list input[name^='riseCount']").val(value);
	                        		}
	                        		else if($(elem).hasClass("batch_fow_pri")){//续价
	                        			$("#table-list input[name^='risePrice']").val(value);
	                        		}
	                        	}
	                        	
	                        }
	                    },
	                    danger:{
	                        label:"取消",
	                        className:"btn",
	                        callback:function(){}
	                    }
	                },
	                className: "bootbox-md"
	            });
			}
		},
		submitForm:function(){
			var validator=$("#form-table").validate({
				rules:{
					carDefaultFirstCount:{
						required:true,
						number:true
					},
					carDefaultFirstPrice:{
						required:true,
						number:true
					},
					carDefaultAddCount:{
						required:true,
						number:true
					},
					carDefaultAddPrice:{
						required:true,
						number:true
					}
				},
				messages:{
					carDefaultFirstCount:{
						required:"默认首件为必填项！",
						number:"默认首件请输入数字！"
					},
					carDefaultFirstPrice:{
						required:"默认首件运费为必填项！",
						number:"默认首件运费请输入数字！"
					},
					carDefaultAddCount:{
						required:"默认续件为必填项！",
						number:"默认续件请输入数字！"
					},
					carDefaultAddPrice:{
						required:"默认续费为必填项！",
						number:"默认续费请输入数字！"
					}
				},
				errorPlacement:function(error,elem){
					$("#error-mes").html(error);
				},
				submitHandler:function(form){
					var form=$(form);
					var carriageName=form.find("input[name='carriageName']").val();//模板名称
					var carriageType=form.find("input[name='carriageType']:checked").val();//是否包邮
					var carriagePrice=form.find("input[name='carriagePrice']:checked").val();//计价方式

					var carDefaultFirstCount=form.find("input[name='carDefaultFirstCount']").val();//默认首件
					var carDefaultFirstPrice=form.find("input[name='carDefaultFirstPrice']").val();//默认首件运费
					var carDefaultAddCount=form.find("input[name='carDefaultAddCount']").val();//默认续件
					var carDefaultAddPrice=form.find("input[name='carDefaultAddPrice']").val();//默认续件运费
					var id =form.find("input[name='mould_id_hidden']").val();//模板id
					var formData={};
					formData["mouldName"]=carriageName;//模板名称
					formData["ifFreeShipment"]=carriageType;//是否包邮
					formData["type"]=carriagePrice;//计价方式
					formData["count"]=carDefaultFirstCount;//默认首件
					formData["price"]=carDefaultFirstPrice;//默认首件运费
					formData["riseCount"]=carDefaultAddCount;//默认续件
					formData["risePrice"]=carDefaultAddPrice;//默认续件运费
					formData.id = id;
					
					//循环表格  提取表格中的表单数据
					var trLength=$("#table-list tbody tr").length-1;
					var tbodyData= new Array();
					$("#table-list tbody tr").each(function(index,elem){
						if(index==$("#table-list tbody tr").length-1){
							return false;//最后一行不用循环
						}
						var priceMeterId = $(elem).find("input[name^='_hidden_priceMeter_id']").val();
						var areaCodes = $(elem).find(".city-wraper").html();
						var firstCount=$(elem).find("td input[name^='count']").val();
						var firstPrice=$(elem).find("td input[name^='price']").val();
						var riseCount=$(elem).find("td input[name^='riseCount']").val();
						var risePrice=$(elem).find("td input[name^='risePrice']").val();
						tbodyData.push({"id":priceMeterId,"count":firstCount,"price":firstPrice,"riseCount":riseCount,"risePrice":risePrice,"areaCodes":areaCodes});
					});
					formData.priceMeter = $.toJSON(tbodyData)
					$.post(window.config.editOrInsert,formData,function(data){
						if(data.success){
							location.href=window.config.carriageSet;
						}
					},"json");

				}
			});
		}
	}

	var app=new App();
});



// 过滤不可选的城市
function filterSelectableProvince(allProvince,excludeProvince){
	var selectableProvince = new Array();
	var allProvinceLength = allProvince.length;
	var name = null;
	for(var i = 0 ;i< allProvinceLength ;i++){
		name = allProvince[i];
		if(excludeProvince.indexOf(name) == -1){
			selectableProvince.push(
				{"city-id":name,"city-name":name}
			);
		}
	}
	return selectableProvince;
}
// 组装已选择的城市
function selected(selectedStr){
	var selecteds = new Array();
	if(selectedStr && selectedStr != ''){
		var selected = selectedStr.split("、");
		var name = null;
		for(var i = 0 ; i < selected.length ; i++){
			name = selected[i];
			selecteds.push({"city-id":name,"city-name":name});
		}
	}
	
	return selecteds;
}

