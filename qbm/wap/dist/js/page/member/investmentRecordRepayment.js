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
		var weburl = $("#weburl").val();
		var wapurl = $("#wapurl").val();
		var page = 1;
		
		//Tabs
		$("#tabs .col-all-4").on("click",function(){
			var tabId = $(this).attr("data-id");
			$(this).addClass("selected").siblings().removeClass("selected");
			if(tabId==0){
				location.href = wapurl+"/member/investmentRecordAll.html";
			}else if(tabId==1){
				location.href = wapurl+"/member/investmentRecordReceived.html";
			}else if(tabId==2){
				location.href = wapurl+"/member/investmentRecordRepayment.html";
			}
		})
		
		
		
		//下拉刷新，上拉加载更多
		require.async('dropload', function(){
			$('#pageWrap').dropload({
		        scrollArea : window,
		        domUp : {
		            domClass   : 'dropload-up',
		            domRefresh : '<div class="dropload-refresh fc-6 fs-24">↓下拉刷新</div>',
		            domUpdate  : '<div class="dropload-update fc-6 fs-24">↑释放更新</div>',
		            domLoad    : '<div class="dropload-load fc-6 fs-24"><span class="loading"></span>加载中...</div>'
		        },
		        domDown : {
		            domClass   : 'dropload-down',
		            domRefresh : '<div class="dropload-refresh fc-6 fs-24">↑上拉可以加载</div>',
		            domLoad    : '<div class="dropload-load fc-6 fs-24"><span class="loading"></span>正在加载中</div>',
		            domNoData  : '<div class="dropload-noData fc-6 fs-24">已经没有了</div>'
		        },
		        //下拉刷新
		        loadUpFn : function(me){
		            $.ajax({
				        type:"get",
				        url:wapurl+"/api/member/getMyInvestmentForAllList.html?type=2&currentPage=1&pageSize=4&randomTime="+(new Date()).getTime(),
				        dataType:"jsonp",
				        success:function(data){
				        	$("#totalInterrest").text((data.totalMoney).toFixed(2));
				        	
				        	if(data.code == 1){//已登录
								var dataLength = data.myInvestList.length;
								if( dataLength == 0 && page == 1){
									$("#noData").removeClass("hide");
									$("#pageWrap").addClass("hide");
									$(".dropload-down").addClass("hide");
									return;
								}else{
									$("#pageWrap").removeClass("hide");
									$("#noData").addClass("hide");
									$(".dropload-down").removeClass("hide");
									
									//异步加载模板引擎
									require.async('artTemplate', function(template) {
							            require.async('artTemplateHelper', function() {
							            	var html = template('listTpl', data);
						                    setTimeout(function(){
									             $('#list').html(html) ;
						                        // 每次数据加载完，必须重置
						                        me.resetload();
						                    },300);
							            })
							        });	
							        
							        //第一页数据少于4条时，不显示
							        if(dataLength < 4){
										$(".dropload-down").addClass("hide");
									}
								}
				        	}else if(data.code== -2){//获取数据失败
				        		require.async('layerCss',function(){
						           require.async('layer',function(layer){
						           		layer.open({
						                    content: '获取数据失败',
						                    className: 'layer-tip',
						                    time: 2,
						                    end:function(){
						                   		location.href = wapurl;
						                    }
						                });
						            })
						        })
				        	}else if(data.code== -1){//未登录
				        		require.async('layerCss',function(){
						           require.async('layer',function(layer){
						           		layer.open({
						                    content: '访问已超时，请您重新登录',
						                    className: 'layer-tip',
						                    time: 2,
						                    end:function(){
						                   		location.href = wapurl+ "/passport/login.html";
						                    }
						                });
						            })
						        })
				        	}
				        },
		                error: function(xhr, type){
		                    require.async('layerCss',function(){
					           require.async('layer',function(layer){
					           		layer.open({
					                    content: '请求数据超时',
					                    className: 'layer-tip',
					                    time: 1,
					                    end:function(){
					                   		// 即使加载出错，也得重置
		                    				me.resetload();
					                    }
					                });
					            })
					        })
		                }
				    })
		        },
		        //上拉加载更多
		        loadDownFn : function(me){
		        	$.ajax({
				        type:"get",
				        url:wapurl+"/api/member/getMyInvestmentForAllList.html?type=2&currentPage="+page+"&pageSize=4&randomTime="+(new Date()).getTime(),
				        dataType:"jsonp",
				        success:function(data){
				        	$("#totalInterrest").text((data.totalMoney).toFixed(2));
				        	
				        	if(data.code == 1){//已登录
								var dataLength = data.myInvestList.length;
								if( dataLength == 0 && page == 1){
									$("#noData").removeClass("hide");
									$("#pageWrap").addClass("hide");
									$(".dropload-down").addClass("hide");
									return;
								}else{
									
									$("#pageWrap").removeClass("hide");
									$("#noData").addClass("hide");
									$(".dropload-down").removeClass("hide");
									
									//异步加载模板引擎
									require.async('artTemplate', function(template) {
							            require.async('artTemplateHelper', function() {
							            	var html = template('listTpl', data);
						                    setTimeout(function(){
									             $('#list').append(html) ;
						                        // 每次数据加载完，必须重置
						                        me.resetload();
						                    },300);
							            })
							        });	
							        
							        //第一页数据少于4条时，不显示
							        if(page == 1 && dataLength < 4){
										$(".dropload-down").addClass("hide");
									}
									page += 1;
							        
							        //
							        if(dataLength < 4){
							        	 // 锁定
			                            me.lock();
			                            // 无数据
			                            me.noData();
			                            return;
							        }
								}
				        	}else if(data.code== -2){//获取数据失败
				        		require.async('layerCss',function(){
						           require.async('layer',function(layer){
						           		layer.open({
						                    content: '获取数据失败',
						                    className: 'layer-tip',
						                    time: 2,
						                    end:function(){
						                   		location.href = wapurl;
						                    }
						                });
						            })
						        })
				        	}else if(data.code== -1){//未登录
				        		require.async('layerCss',function(){
						           require.async('layer',function(layer){
						           		layer.open({
						                    content: '访问已超时，请您重新登录',
						                    className: 'layer-tip',
						                    time: 2,
						                    end:function(){
						                   		location.href = wapurl+ "/passport/login.html";
						                    }
						                });
						            })
						        })
				        	}
				        },
		                error: function(xhr, type){
		                    require.async('layerCss',function(){
					           require.async('layer',function(layer){
					           		layer.open({
					                    content: '请求数据超时',
					                    className: 'layer-tip',
					                    time: 1,
					                    end:function(){
					                   		// 即使加载出错，也得重置
		                    				me.resetload();
					                    }
					                });
					            })
					        })
		                }
				    })
		        },
		        threshold : 50
		    });
	  	});
		
	    
		//项目跳转
		$("body").on("click",".record-item",function(){
			var tenderId = $(this).attr("data-id");
			var status = $(this).attr("data-status");
			location.href = wapurl+"/member/investmentRecordDetail.html?tenderId="+tenderId+"&status="+status;
		})
		
		//点此去理财
		$("#goFinancing").on("click",function(){
			location.href = wapurl;
		})
		
	})
})
