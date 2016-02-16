define(function(require,exports,module){
    var template = require('artTemplate');

    //时间格式化
    template.helper('dateFormat', function (time, style) {
        function formatDate(now) {
            var year=now.getFullYear();
            var month=now.getMonth()+1;
            var date=now.getDate();
            var hour=now.getHours();
            var minute=now.getMinutes();
            var second=now.getSeconds();
            if(second < 10)
            {
                second = '0' + second;
            }
            if(minute < 10)
            {
                minute = '0' + minute;
            }
            if(style == 1 ){//格式:2014-08-15 00:00:00
                return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
            }else if(style == 2){//格式:2014-08-15 00:00
                return year+"-"+month+"-"+date+" "+hour+":"+minute;
            }else if(style == 3){//格式:2014/08/15
                return year+"/"+month+"/"+date;
            }else if(style == 4){//格式:2014-08-15
                return year+"-"+month+"-"+date;
            }
        }
        if(time==null ||time==''){
            return '';
        }
        var d = new Date(parseInt(time)*1000);
        return formatDate(d);
    });
    
    //红包状态
    template.helper('redPacketStatsFun', function (useStatus,nowTime,expiredtime) {
        if(useStatus == 0){//红包可用
        	var timeVal = expiredtime - nowTime;
        	if( timeVal > 1 ){
        		day = Math.floor((timeVal / 3600) / 24);
        		return '还有'+day+'天过期';
        	}
        }else if(useStatus == 1){
        	return "已使用";
        }else if(useStatus == 2){
        	return "已过期";
        }else if(useStatus == 3){
        	return "已转赠";
        }
    });
    
    //投资状态
    template.helper('inverstStatsFun', function (borrowStatus) {
        if(borrowStatus == 8){
        	return '<span class="text-center fs-18 state yihuankuan">已还款</span>';
        }else if(borrowStatus == 9){
        	return '<span class="text-center fs-18 state yihuankuan">已结清</span>';
        }else if(borrowStatus == 3 ||borrowStatus == 6 || borrowStatus == 7){
        	return '<span class="text-center fs-18 state daishou">待收中</span>';
        }else if(borrowStatus == 10){
        	return '<span class="text-center fs-18 state daishou">处理中</span>';
        }else if(borrowStatus == 11){
        	return '<span class="text-center fs-18 state yishixiao">已失败</span>';
        }else if(borrowStatus == 1){
        	return '<span class="text-center fs-18 state dongjie">冻结中</span>';
        }
    });
    
    template.helper('listStatsFun', function (borrowStatus) {
        if(borrowStatus == 8){
        	return '已经到期';
        }else if(borrowStatus == 9){
        	return '已经转让';
        }else if(borrowStatus == 3 ||borrowStatus == 6 || borrowStatus == 7){
        	return '预计到期';
        }else{
        	return '';
        }
    });
    
    //金额转换
	template.helper('moneyFormat', function (value) {	
        if(value >= 10000){
        	return value/10000+'万';
        }else{
        	return value;
        }
    });
    
    //金额格式化
    template.helper('moneyFixedFun', function (value) {
	    var f = parseFloat(value); 
	    if (isNaN(f)) { 
	    	return false; 
	    } 
	    var f = Math.round(value*100)/100; 
	    var s = f.toString(); 
	    var rs = s.indexOf('.'); 
	    if (rs < 0) { 
	    	rs = s.length; 
	        s += '.'; 
	    } 
	    while (s.length <= rs + 2) { 
	        s += '0'; 
	    } 
	    return s; 
    });
})