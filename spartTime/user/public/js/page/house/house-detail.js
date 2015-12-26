$(function(){

	var App=function(){


		this.init();//页面初始化
		this.imgSlide();//图片滑动
		this.selectTime();//选择时间
		this.orderNow();//立即订购
	};

	App.prototype={
		init:function(){

		},
		imgSlide:function(){
			var mySwiper = new Swiper('#swiper-container',{
			    loop: false,
				autoplay: false,
				pagination:".swiper_pager"
			});
		},
		selectTime:function(){
			var nowData=new Date();
	        var opt= { 
	        	theme:'ios', //设置显示主题 
                mode:'scroller', //设置日期选择方式，这里用滚动
                display:'bottom', //设置控件出现方式及样式
                preset : 'datetime', //日期:年 月 日 时 分
                stepMinute: 10, //设置分钟步长
                yearText:'年', 
                monthText:'月',
                dayText:'日',
                hourText:'时',
                minuteText:'分',
                lang:'zh' ,//设置控件语言};，
                minDate: new Date(nowData.getFullYear(), nowData.getMonth(), nowData.getDate(),nowData.getHours()),
                maxDate: new Date(nowData.getFullYear(), nowData.getMonth(), (nowData.getDate() + 7))
            };
            $('#in_time').mobiscroll(opt);
            $('#out_time').mobiscroll(opt);
		},
		orderNow:function(){
			var href=window.location.href;
			var baseIndex=href.lastIndexOf("/");
			var next=href.substr(0,baseIndex)+"/house-predete.html";


			var  $inTime=$('#in_time');
			var  $outTime=$('#out_time');


			 $inTime.change(function(){
			 	$(this).attr("selected",true);
			 });
			 $outTime.change(function(){
			 	$(this).attr("selected",true);
			 });


			
			$("#order_now_btn").click(function(){
				if( !($inTime.attr("selected"))|| !($outTime.attr("selected")) ){
					layer.open({
						content:"请选择入住离开日期",
						time:2
					});
					$("#house_detail_li")[0].scrollIntoView();
					return false;
				}
				else{
					window.location.href=next;
				}
			})
		}
	};



	var app=new App();
});