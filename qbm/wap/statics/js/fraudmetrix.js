(function() {
	if(TONGDUN_ENV == 1){
		   _fmOpt = {
			        partner: 'qbm360',
			        appName: 'qbm_web',
			        token: SESSION_ID,
			        };
			    var cimg = new Image(1,1);
			    cimg.onload = function() {
			        _fmOpt.imgLoaded = true;
			    };
			    cimg.src = "https://fp.fraudmetrix.cn/fp/clear.png?partnerCode=qbm360&appName=qbm_web&tokenId=" + _fmOpt.token;
			    var fm = document.createElement('script'); fm.type = 'text/javascript'; fm.async = true;
			    fm.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'static.fraudmetrix.cn/fm.js?ver=0.1&t=' + (new Date().getTime()/3600000).toFixed(0);
			    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(fm, s);
	}else if(TONGDUN_ENV == 0){
		_fmOpt = {
				partner: 'qbm360',
				appName: 'qbm_web',
				token: SESSION_ID,
				fpHost: 'https://fptest.fraudmetrix.cn',
				staticHost: 'statictest.fraudmetrix.cn',
				tcpHost: 'fptest.fraudmetrix.cn',
				wsHost: 'fptest.fraudmetrix.cn:9090'
		};
		var cimg = new Image(1,1);
		cimg.onload = function() {
			_fmOpt.imgLoaded = true;
		};
		cimg.src = "https://fptest.fraudmetrix.cn/fp/clear.png?partnerCode=qbm360&appName=qbm_web&tokenId=" + _fmOpt.token;
		var fm = document.createElement('script'); fm.type = 'text/javascript'; fm.async = true;
		fm.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'statictest.fraudmetrix.cn/fm.js?ver=0.1&t=' + (new Date().getTime()/3600000).toFixed(0);
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(fm, s);
	}

})();
