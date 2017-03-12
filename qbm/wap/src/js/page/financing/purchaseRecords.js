define(function(require,exports,module){
	require("zepto");
	require('fastclick');
	template=require("artTemplate");
	FastClick.attach(document.body);

	

	template.helper("fixedNumber",function(money){
		return (new Number(money)).toFixed(2);
	});

	template.helper("clipCenter",function(value){
		if(value.length>=2){
			var length=value.length;//字符串长度
			return value.substr(0,1)+"***"+value.substr(length-1,1);
		}
		else{
			return value;
		}
	});


	$(function(){

		var App=function(){

			this.url={
				wapUrl:$("#wapurl").val(),
				purchaseLists:"/api/getTenderList.html"//获取购买记录列表接口 wap/getTenderList
			};

			this.getParam=function(key){
				var href=window.location.href;
				var index=href.indexOf("?");
				var hashArr=href.substr(index+1).split("?")[0].split("&");
				for(var i=0;i<hashArr.length;i++){
					var group=hashArr[i].split("=");
					if(group[0]==key){
						return group[1];
					}
				}
			};

			this.tpl={
				listTpl:template.compile($("#listTpl").html())
			};

			this.borrow_id=this.getParam("borrow_id");
			this.curPage=1;//当前页码
			this.perNum=15;//每页请求的数据条数

			this.init();//
			this.loadPurchaseLists();//加载购买记录列表
		};

		App.prototype={
			init:function(){
				var self=this;

				$("body").on("click",".tap-link",function(e){
					e.preventDefault();
					e.stopPropagation();
					var href=$(this).attr("data-href");
					window.location.href=href;
				});

			},
			loadPurchaseLists:function(){
				var self=this;
				var $tableBody=$("#listTable");
				var $loading_wraper=$(".loading_wraper");

				var isGetting=false;//是否正在加载中
				var hasGetAll=false;//是否已经全部加载
				function getListData(){
					var url=self.url.wapUrl+self.url.purchaseLists;
					var param={
						borrow_id:self.borrow_id,
						currentPage:self.curPage,
						pernum:self.perNum
					};
					if(isGetting||hasGetAll){
						return false;
					};
					isGetting=true;
					// $.ajax({
					// 	url:url,
					// 	type:"get",
					// 	dataType:"jsonp",
					// 	data:param,
					// 	success:function(data){
							//console.log(data);
							var data={
								result:true,
								dataList:[
									{tUserName:"李云龙",tMoney:1000,tCreateTime:"2016-12-21"},
									{tUserName:"王大海",tMoney:3000,tCreateTime:"2016-02-01"},
									{tUserName:"张鹏",tMoney:1000,tCreateTime:"2016-05-09"},
									{tUserName:"王雪梅",tMoney:1000,tCreateTime:"2016-06-09"},
								]
							};
							if(data.result){//正确返回数据
								if(data.dataList.length>0){//存在数据
									var html=self.tpl.listTpl(data);
									$tableBody.append(html);
								}
								else if(data.dataList.length==0){//数据为空

									if(self.curPage==1){//当前页码为第一页
										var html="<p class='lh-70 text-center' style='margin:1rem auto;'>暂无购买记录哦！</p>";
										$tableBody.append(html);
										$loading_wraper.hide();
										hasGetAll=true;//已经全部加载
									}
								}
								if(data.dataList.length<self.perNum){//加载数据条数少于自定义每页的数据条数 表明全部加载完毕
									hasGetAll=true;//已经全部加载
									setGetAllStatus();
								}

								if(!hasGetAll){
									$loading_wraper.css({
										visibility:"hidden"
									});
								}
							}
							else{//该标不存在
								var html="<p class='lh-70 text-center'>"+data.msg+"</p>";
								$tableBody.append(html);
							}
							self.curPage+=1;
							isGetting=false;
					// 	}
					// });
				};
				getListData();//页面加载首次获取列表数据

				ScrollInifate({
					distance:10,
					endCallBack:function(){
						
						$loading_wraper.css({
							visibility:"visible"
						});
						if(hasGetAll){
							setGetAllStatus();
						}
						getListData();
					}
				});
				
				function setGetAllStatus(){//设置全部加载的加载条状态
					$loading_wraper.css({
						visibility:"visible"
					});
					$loading_wraper.find(".loading_img").hide();
					$loading_wraper.find(".loading_text").text("已经没有了");
				}

				function ScrollInifate(config){
					var body=document.getElementsByTagName("body")[0];
					var wH=window.innerHeight;
					var distance=parseFloat(config.distance)||0;
					var callBack=config.endCallBack;
					window.addEventListener("scroll",scrollHandler);

					function scrollHandler(e){
						var bodyH=body.offsetHeight;
						var scrollTop=body.scrollTop;
						if(scrollTop+wH>=bodyH-distance){
							callBack(e,scrollTop);

						}
					}
				}
			}
		};

		var app=new App();

	});
});