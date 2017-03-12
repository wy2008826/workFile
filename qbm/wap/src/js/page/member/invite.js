/**
 * 钱保姆WAP
 * @name 我的保姆-邀请好友
 * @description 
 * @date 2016-04-12
 * @version $V1.0$
 */


define(function(require, exports, module) {
	
    require('zepto');
    
    require('fastclick');
    var wx = require('jweixin-1.0.0');
	FastClick.attach(document.body);
	
	$(function(){
		var weburl = $("#weburl").val();//pc端根路径
		var wapurl = $("#wapurl").val();//wap端根路径
		var wapcdnpath = $("#wapcdnpath").val();
		var userId = $("#userId").val();
		
		//微信分享配置
		var brokers = $("#brokers").val();
		var weblink = $("#weburl").val();
		var phone = $("#phone").val();
		var shareTitle = "帮助我成为超级经纪人，一起来享收益吧";
		var shareDesc = "成为超级经纪人，躺着赚佣金！";
		var shareLink = weburl + "/apiurl/app/invite-reg.html?phone="+ phone +"&brokers="+ brokers;
		var shareIcon = wapcdnpath + "/images/member/invite/shareIcon.png";
//		var appid = $("#appid").val();
//		var timestamp = $("#timestamp").val();
//		var nonceStr = $("#nonceStr").val();
//		var signature = $("#signature").val();

		wx.config({
			debug: false,
			appId: '$wxconfig.appid',
			timestamp: '$wxconfig.timestamp',
			nonceStr: '$wxconfig.nonceStr',
			signature: '$wxconfig.signature',
			jsApiList: [
				'onMenuShareTimeline',
				'onMenuShareAppMessage'
			]
		});

		regShare();
		
		
		function regShare() {
			wx.ready(function () {
				wx.onMenuShareAppMessage({
					title: shareTitle,//分享标题
					desc: shareDesc,//分享摘要
					link: shareLink,//分享链接
					imgUrl: shareIcon,//分享小图标
					trigger: function (res) {
						// 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
						//alert('用户点击发送给朋友');
					},
					success: function (res) {
						require.async('layerCss',function(){
				           require.async('layer',function(layer){
				           		layer.closeAll();
				            })
				        })
					},
					cancel: function (res) {
						require.async('layerCss',function(){
				           require.async('layer',function(layer){
				           		layer.closeAll();
				            })
				        })
					},
					fail: function (res) {
						require.async('layerCss',function(){
				           require.async('layer',function(layer){
				           		layer.closeAll();
				            })
				        })
					}
				});
				
				wx.onMenuShareTimeline({
					title: shareTitle,//分享标题
					link: shareLink,//分享链接
					imgUrl: shareIcon,//分享小图标
					trigger: function (res) {},
					success: function (res) {
						require.async('layerCss',function(){
				           require.async('layer',function(layer){
				           		layer.closeAll();
				            })
				        })
					},
					cancel: function (res) {
						require.async('layerCss',function(){
				           require.async('layer',function(layer){
				           		layer.closeAll();
				            })
				        })
					},
					fail: function (res) {
			            require.async('layerCss',function(){
				           require.async('layer',function(layer){
				           		layer.closeAll();
				            })
				        })
					}
				});
			});
		}
		
		function layerTip(msg,time){
			layer.open({
				content:"<p class='normal-tip-line'>"+msg+"</p>",
				className:"layer-tip",
				time:time
			});
		};

		
		//立即邀请
		require.async('layerCss',function(){
         require.async('layer',function(layer){
        		$("#inviteBtn").on("click",function(){
	       		layer.open({
	       			type: 1,
	                content: '<img src="'+wapcdnpath+'/images/member/share-tip.png" class="img share_img">',
	                style: 'position:fixed; bottom:0; left:0; width:100% !important; height: 100% !important;background-color: rgba(0,0,0,0.7)!important;',
	                className:"contentTransparent"
	            });
		    	});
        		
        		$("body").on("click",".layermbox",function(){
					layer.closeAll();
				})
         })
      })
		
		//升级攻略
		$("#goInviteRule").on("click",function(){
	      location.href = wapurl+ "/member/inviteRule.html?userId="+userId;
	   })
		
	    //邀请记录
	    $("#recordlink").on("click",function(){
	    	location.href = wapurl+ "/member/inviteRecord.html?userId="+userId;	
	    });
	    
	    //红包奖励
	    $("#redPacketlink").on("click",function(){
	    	location.href = wapurl+ "/member/inviteRedPacket.html?userId="+userId;	
	    });

	    //佣金返现
	   $("#commissionLink").on("click",function(){
	    	location.href = wapurl+ "/member/inviteCommission.html?userId="+userId;
	   });
		
	    //领取升级礼包
		var $lq_shengji_btn=$(".upgrade_row");
		if($lq_shengji_btn.length>0){
			$lq_shengji_btn.on("click",function(){
				$.ajax({
					type:"get",
					url:wapurl+"/wap/receiveUpgradeGift.html",
					dataType:"jsonp",
					success:function(data){
						//alert(JSON.stringify(data));
						if(data.code!=-1){
							$lq_shengji_btn.html("已领取").addClass("disabled");
						}
						else{
							layerTip(data.msg);
						}
					},
					error:function(){
						// layerTip("error");
					}
				});
			})
		}
		
	    //list
	    require.async('artTemplate', function(template) {
			require.async('artTemplateHelper', function() {
				
				var redlist = template('redlist');
				var moneyList=template('moneylist');
				$('.moneytoplist-tab p').click(function(){
					$('.moneytoplist-tab a').removeClass("change");
					$(this).find("a").addClass('change');
					var index=$(this).index();
					if(index==0){
						$("#select_tringle").removeClass("second");
						inviteList('0');
					}else{
						$("#select_tringle").addClass("second");
						inviteList('1');
					}
				})

	    		inviteList('0');
	    		
				function inviteList(param){
			      $.ajax({
			          type:"get",
			          url:weburl+"/app/inviteCountRank.html?inviteType="+param,
			          dataType:'jsonp',
			          success:function(data){
			          	console.log(data);
			         	if(param==0){      		
			         		if(data.dataList.length>0){
			         			$('#redlistul').removeClass("hide");
			         			$(".nodataprom").addClass("hide");
			            		data.dataList=data.dataList.slice(0,10);
			            		 $('#redlistul').html(redlist(data));
			         		}else{
			         			$('#redlistul').addClass("hide");
			         			$(".nodataprom").removeClass("hide");
			         		}
			         		 
			         	}else if(param==1){
			         		if(data.dataList.length>0){
			         			$('#redlistul').removeClass("hide");
			         			$(".nodataprom").addClass("hide");
			            		data.dataList=data.dataList.slice(0,10);

			            		data.dataList.forEach(function(item,index){
			            			data.dataList[index].userMoney=item.userMoney.toFixed(2);
			            		});
			            		
			            		$('#redlistul').html(moneyList(data));
			         		}else{
			         			$('#redlistul').addClass("hide");
			         			$(".nodataprom").removeClass("hide");
			         		}
			         		 
			         	}
			         },
			       	error:function(){	          		
			       		console.log('error');
			       	}
			      })
				}

			})
		});		            	
	    
    })
})
