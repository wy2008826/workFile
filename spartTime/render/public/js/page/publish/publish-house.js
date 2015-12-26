$(function(){

	var App=function(){
		this.tpl={
			alertWeektTpl:_.template($("#alert_price_tpl").html()),
			pageWeektTpl:_.template($("#page_price_tpl").html()),
			schoolUlTpl:_.template($("#school_ul_tpl").html())
		};
		this.init();//页面初始化
		this.addSchool();//添加学校
		this.delSchool();//删除学校
		this.setPrice();//高级价格和普通价格设置切换
	};

	App.prototype={
		init:function(){

		},
		addSchool:function(){
			var self=this;
			$("#add_school").MultiSlide({
				data:data,//数据
				colsScale:"1:1:2",
				Multiselect:true,
				touchEnd:function(areaData){

				},
				confirm:function($dataName){
					self.dataName=$dataName;
					var allData=$("#add_school").data($dataName);
					var listsData=allData.lastUlSelected;
					var labelsData={data:listsData};
					var labelsHtml=self.tpl.schoolUlTpl(labelsData);
					$("#school_ul").html(labelsHtml);
					console.log(allData);
				}
			});
		},
		delSchool:function(){
			var self=this;
			$("#school_ul").on("click",".del_img",function(){
				var $li=$(this).closest("li");
				var schoolId=$li.attr("data-id");
				var schoolName=$li.attr("data-text");
				layer.open({
					content:"确定删除该学校？",
					style:"width:70%",
					btn: ['确认', '取消'],
					yes: function(){
						var $dataCache=$("#add_school").data(self.dataName).lastUlSelected;
						for(var i=0;i<$dataCache.length;i++){
							if(schoolName==$dataCache[i].text){
								$dataCache.splice(i,1);
							}
						}
						$li.remove();
				        layer.open({content: '已删除schoolId:'+schoolId, time: 1});

				    }
				});
			});
		},
		setPrice:function(){
			var self=this;
			var weekBtn=$("#week_price_set");
			var averBtn=$("#aver_price_set");
			
			weekBtn.on("click",function(){
				var lists=weekBtn.data("cashedData")||{data:[{"value":""}
						,{"value":""}
						,{"value":""}
						,{"value":""}
						,{"value":""}
						,{"value":""}
						,{"value":""}
					]};
				var html=self.tpl.alertWeektTpl(lists);
				layer.open({
					content:html,
					style:"width:80%",
					btn: ['确认'],
					yes: function(){
						var prices={data:[]};
						for(var i=0;i<7;i++){
							var id="#alert_week"+i;
							var price=$(".layermanim").find(id).val();
							prices.data.push({value:price});
						}
						$("#page_price_ul").html(self.tpl.pageWeektTpl(prices));
						$(".aver_price_line").hide();
						$("#week_price_page").show();
						layer.closeAll();
						weekBtn.data("cashedData",prices);
				    }
				});
				setTimeout(function(){
					$(".layermanim .price_ul input").eq(0).focus();
				},1);
				
			});

			averBtn.on("click",function(){
				var lists={data:[]};
				$("#page_price_ul input").each(function(index,elem){
					lists.data.push({"value":$(elem).val()});
				});
				weekBtn.data("cashedData",lists)
				$(".aver_price_line").show();
				$("#week_price_page").hide();
			});
		}
	};

	var app=new App();
});