$(function(){

	var App=function(){
		
		this.init();//页面初始化
		this.selectTime();//选择时间
	};

	App.prototype={
		init:function(){

		},
		selectTime:function(){
			var nowData=new Date();
	        var opt= { 
	        	theme:'ios', //设置显示主题 
                mode:'scroller', //设置日期选择方式，这里用滚动
                display:'bottom', //设置控件出现方式及样式
                preset : 'time', //日期:年 月 日 时 分
                stepMinute: 10, //设置分钟步长
                yearText:'年', 
                monthText:'月',
                dayText:'日',
                hourText:'时',
                minuteText:'分',
                lang:'zh' //设置控件语言};
            };
            $('#inTime').mobiscroll(opt);
            $('#outTime').mobiscroll(opt);
		}
	};

	var app=new App();
});