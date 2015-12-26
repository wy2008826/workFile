(function(){

	$.getVideoImgSrc=function(video){
		var _canvas = document.createElement("canvas");  
		var _ctx = _canvas.getContext("2d");  
		_ctx.fillStyle = '#ffffff';


		var _videoWidth=$(video).width();
		var _videoHeight=$(video).height();

		_ctx.fillRect(0, 0, _videoWidth, _videoHeight);  
		_ctx.drawImage($(video)[0], 0, 0, _videoWidth, _videoHeight);  
		var dataUrl = _canvas.toDataURL("image/png"); 

		return dataUrl;
	}
	


})();