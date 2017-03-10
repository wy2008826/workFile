/**
 * 钱保姆WAP
 * @name 我的保姆-邀请记录
 * @description 
 * @date 2016-04-12
 * @version $V1.0$
 */


define(function(require, exports, module) {
	
   require('zepto');
    
   require('fastclick');
	FastClick.attach(document.body);
	
	$(function(){
		var weburl = $("#weburl").val();//pc端根路径
		var wapurl = $("#wapurl").val();//wap端根路径
		var wapcdnpath = $("#wapcdnpath").val();
		var userId = GetQueryString("userId");

		function GetQueryString (name){
	     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	     var r = window.location.search.substr(1).match(reg);
	     if(r!=null)return  unescape(r[2]); return null;
		}

		require.async('artTemplate', function(template) {
			
    		var isGetting=false;
			var pageSize=15;//每页数量
			var pages;
			var tabOnePage=1;
			var tabTwoPage=1;
			var tabOneHasAllLoad=false;
			var tabTwoHasAllLoad=false;
			
			template.helper("secondDotNum",function(num){
				return num.toFixed(2);
			});

			//inviteTab
		   $('header a').click(function(){
			   $('.load_text').addClass("hide"); 
			  	tabOnePage=1;
				tabTwoPage=1;
				tabOneHasAllLoad=false;
				tabTwoHasAllLoad=false;
				$('#investment-friend').html('');
				
				$('header a').removeClass("change");
				$(this).addClass('change');
				var index=$(this).index();
				if(index==0){
					inviteRecordList(1,tabOnePage);
				}else{
					inviteRecordList(0,tabTwoPage);
				}
								   
			});
		    
		    //默认加载
			inviteRecordList(1,tabOnePage);
    		
			var investment = template('inve-friendlist');
			//inviteRecordList
		    function inviteRecordList(param,page){
		    	if(isGetting){
		    		return false;
		    	}
		    	if(tabOneHasAllLoad||tabTwoHasAllLoad){
					$(".load_text").text("加载完毕").removeClass("hide");
					return;
		    	}
	    		isGetting=true;
	    		$(".load_text").text("加载中").removeClass("hide");

		    	$.ajax({
				    type: "get",
				    url: weburl+"/api/getInviteHistory.html?investmentType="+param+"&pageSize="+pageSize+"&page="+page+"&user_id="+userId,
				    dataType:"jsonp",
				    success: function(data){
				    	isGetting=false;
	            	if(data.dataList.length<pageSize){//加载完毕
	            		if(param=1){
	            			tabOneHasAllLoad=true;
	            		}
	            		else{
	            			tabTwoHasAllLoad=true;
	            		}
	            		$(".load_text").text("加载完毕").removeClass("hide");
	            	}
	            	else{
	            		$(".load_text").text("加载更多").addClass("hide");
	            	}
	            	if(param==0){ 
	            		if(data.dataList.length>0){
		 						$('#investment-friend').append(investment(data));
		 						tabTwoPage++;
	            		}else{

	            		}
	            	}else if(param==1){ 
	            		if(data.dataList.length>0){
	            			$('#investment-friend').append(investment(data));
	            			tabOnePage++;
	            		}else{
	            			
	            		}
	            	}
				    	
				    }
				})
		    }
		    
		    
		    window.onscroll = function(){  
				var wH=$(window).height();
				var bodyH = $("body").height();
				var scrollTop = $("body").scrollTop();
				var index=$('header a.change').index();
				if(scrollTop + wH > bodyH-50){
					if(index==0){
						if(tabOnePage<=pages||!pages){					
							inviteRecordList(1,tabOnePage);
						}else{
							$('.load_text').removeClass("hide"); 
						}
					}else{
						if(tabTwoPage<=pages||!pages){					
							inviteRecordList(0,tabTwoPage);
						}else{
							$('.load_text').removeClass("hide");
						}
					}
				}          	
		    }
		});	
	    



   	 //	  提醒 
	   $("body").on("click","#investment-friend .goactive",function(){
	    	var $elem=$(this);
	    	var id=$(this).parents(".recordfriend-list").attr("data-id");
	    	var userId=$(this).parents(".recordfriend-list").attr("data-val");
	    	if($elem.hasClass("disabled")){
	    		return ;
	    	}
	    	
			$.ajax({
				type:"get",
				url:weburl+"/hongbao/inviteFriendRemind.html?user_id="+userId+"&id="+id,
				dataType:"jsonp",
				success:function(data){	
   				if(data.code==1 || data.code==2) {
   					layer.open({
   						content:"<p class='normal-tip-line'>已通过短息提醒好友，24小时后方可再次提醒</p>",
							className:"layer-tip",
							time:1,
							type:1,
							end:function(){
								$elem.addClass("disabled").html("已提醒");
							}
						});
					}else if(data.code==0){
						alert("系统异常，请稍后再试")
					}else{
						console.log('error');
					}			
				},
          	error:function(){	          		
          		console.log('error');
          	}
			});
		});
   })
})
