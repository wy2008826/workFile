$(function(){

	var App=function(){

		this.tpl={
			alertClassRowTpl:_.template($("#alertClassRowTpl").html())
		};
		this.init();//页面初始化
		this.labelClick();//下架 评价  管理等功能
		this.addHouse();//添加房源
		this.addClass();//添加分类
	};

	App.prototype={
		init:function(){

		},
		labelClick:function(){
			$("#message_ul").on("click",".down",function(){//下架
				var $down=$(this);
				layer.open({
					content:"是否对已选择的房源进行下架？",
					btn: ['确认', '取消'],
					shadeClose: false,
					yes: function(){
				        layer.open({content: '你点了确认', time: 1});
				        $down.closest("li").remove();
				    }, 
				    no: function(){
				        layer.open({content: '你选择了取消', time: 1});
				    }
				});
				return false;//避免跳转
			}).on("click",".manage",function(){//评价
				
				var href=window.location.href;
				window.location.href=href.substr(0,href.lastIndexOf("/"))+"/evalute.html";//为了演示

				
				return false;//避免跳转
			}).on("click",".del",function(){//删除
				$del=$(this);
				layer.open({
					content:"是否对已选择的房源进行删除？",
					btn: ['确认', '取消'],
					shadeClose: false,
					yes: function(){
				        layer.open({content: '你点了确认', time: 1});
				        $del.closest("li").remove();
				    }, 
				    no: function(){
				        layer.open({content: '你选择了取消', time: 1});
				    }
				});
				return false;//避免跳转
			}).on("click",".publish",function(){//发布房源
				layer.open({
					content:"是否对已选择的房源进行发布？",
					btn: ['确认', '取消'],
					shadeClose: false,
					yes: function(){
				        layer.open({content: '你点了确认', time: 1});
				    }, 
				    no: function(){
				        layer.open({content: '你选择了取消', time: 1});
				    }
				});
				return false;//避免跳转
			});
		},
		addHouse:function(){
			var self=this;
			$("body").on("click",".add_house",function(){
				var $addBtn=$(this);
				var data={
					lists:[
						{
							"text":"武汉大学旁 有家电",
							"id":"1"
						},
						{
							"text":"郑州大学中原路523号大学中原路523号旁 有家电",
							"id":2
						},
						{
							"text":"武汉大学旁 有家电",
							"id":3
						},
						{
							"text":"武汉大学旁 有家电",
							"id":4
						},
						{
							"text":"武汉大学旁 有家电",
							"id":5
						},
						{
							"text":"武汉大学旁 有家电",
							"id":6
						},
						{
							"text":"武汉大学旁 有家电",
							"id":7
						},
						{
							"text":"武汉大学旁 有家电",
							"id":8
						}
					]
				};

				var html=self.tpl.alertClassRowTpl(data);
				layer.open({
					content:html,
					btn: ['确认', '取消'],
					className:"scroll",
					shadeClose: false,
					yes: function(){
						var selectData={classifyName:null,houses:[]};
						$(".layermanim .layermcont").find("li input:checked").each(function(index,elem){
							var dataItem={};
							dataItem.id=$(elem).closest("li").attr("data-id");
							dataItem.text=$(elem).closest("li").attr("data-text");
							selectData.houses.push(dataItem);
						});
						if($addBtn.prev()[0].tagName=="UL"){
							selectData.classifyName=$addBtn.prev().attr("data-class");
						}
						else{
							selectData.classifyName=$addBtn.prev().text();
						}
						alert(JSON.stringify(selectData));
						alert("传递选中房源和分组名称到后台 成功后刷新页面");


				        layer.open({content: '你点了确认', time: 1});
				        
				    }, 
				    no: function(){
				        layer.open({content: '你选择了取消', time: 1});
				    }
				});
				console.log(html);
			});
		},
		addClass:function(){
			$("body").on("click",".add_class",function(){
				
				$(this).attr("contenteditable",true).focus().next().show();
				

			})
		}
	};

	var app=new App();
});