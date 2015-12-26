$(function(){

	var App=function(){


		this.init();//页面初始化
		
		this.imgSlide();//图片滑动
		this.selectSchool();//选择学校
		this.selectDate();//选择日期
		this.searchSchool();//搜索学校
	};

	App.prototype={
		init:function(){
			
		},
		imgSlide:function(){
			var mySwiper = new Swiper('#swiper-container',{
			    loop: true,
				autoplay: false,
				pagination:".swiper_pager"
			});
		},
		selectSchool:function(){
			var self=this;
			var $select_school=$("#select_school");
			$select_school.MultiSlide({
				data:data,//数据
				colsScale:"1:1:2",
				Multiselect:false,
				touchEnd:function(areaData){

				},
				confirm:function($dataName){
					self.dataName=$dataName;
					var allData=$("#select_school").data($dataName);//传输的数据
					console.log(allData);
					var lastIndex=allData.indexArr[2].index;
					var $li=$(allData.indexArr[2].ul).find("li").eq(lastIndex);
					var text=$li.attr("data-text");
					$select_school.find("a").text(text);

				}
			});
		},
		selectDate:function(){
			var nowData=new Date();
	        var opt= { 
	        	theme:'ios', //设置显示主题 
                mode:'scroller', //设置日期选择方式，这里用滚动
                display:'bottom', //设置控件出现方式及样式
                preset : 'date', //日期:年 月 日 时 分
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
		searchSchool:function(){

		}
	};



	var app=new App();
});