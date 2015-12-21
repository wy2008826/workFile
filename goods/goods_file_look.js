$(function(){
	//文件搜索  清空功能块
	init.push(function(){
		var imgMName=$("#searchImgValue");
		var sortType=$("#searchImgSortValue");

		$("#searchImgBtn").click(function(){
			util.alert(imgMName.val());
		});

		$("#clearImgBtn").click(function(){
			imgMName.val("");
			sortType.val("");
		});
	});

	//上传图片功能
	var previewTemplate = '<div class="dz-preview dz-file-preview"><div class="dz-details"><div class="dz-filename"><span data-dz-name></span></div><div class="dz-thumbnail-wrapper"><div class="dz-thumbnail"><img data-dz-thumbnail><span class="dz-nopreview">没有预览</span><div class="dz-success-mark"><i class="fa fa-check-circle-o"></i></div><div class="dz-error-mark"><i class="fa fa-times-circle-o"></i></div><div class="dz-error-message"><span data-dz-errormessage></span></div></div></div></div><div class="progress progress-striped active"><div class="progress-bar progress-bar-success" data-dz-uploadprogress></div></div></div>',
        resize = function(file) {
        var info = { srcX: 0, srcY: 0, srcWidth: file.width, srcHeight: file.height },
            srcRatio = file.width / file.height;
        if (file.height > this.options.thumbnailHeight || file.width > this.options.thumbnailWidth) {
            info.trgHeight = this.options.thumbnailHeight;
            info.trgWidth = info.trgHeight * srcRatio;
            if (info.trgWidth > this.options.thumbnailWidth) {
                info.trgWidth = this.options.thumbnailWidth;
                info.trgHeight = info.trgWidth / srcRatio;
            }
        } else {
            info.trgHeight = file.height;
            info.trgWidth = file.width;
        }
        return info;
    },
    acceptedFiles = '.jpg,.jpeg,.bmp,.gif,.png';
    var exitNum=function(){
        return  $("#dropzonejs-img .dz-preview").length-$("#dropzonejs-img #clickable").length-$("#dropzonejs-img .hasOwn").length;
    };
    var maxNum=10;
	init.push(function () {
        var drop = new Dropzone("#dropzonejs-img", {
            url: "index.html",
            clickable: "#clickable",
            paramName: "file1", // The name that will be used to transfer the file
            maxFiles: maxNum,
            maxFilesize: 1, // MB
            acceptedFiles: acceptedFiles,
            addRemoveLinks : true,
            dictResponseError: "无法上传文件",
            dictInvalidFileType: "无法上传此类型的文件",
            dictMaxFilesExceeded: "一次最多上传"+maxNum+"张图片",
            autoProcessQueue: true,
            dictRemoveFile: "移除文件",
            previewTemplate: previewTemplate,
            resize: resize,
            init: function(){
               this.on("addedfile",function(file){
                    $("#dropzonejs-img").append($("#clickable"));
                    if(exitNum()>maxNum){
                        this.removeFile(file);
                        bootbox.alert({
                            message: "一次最多上传"+maxNum+"张图片！",
                            callback: function() {
                                
                            },
                            className: "bootbox-sm"
                        });
                    }
                });
                this.on("removedfile",function(file){
                   // showClickAdd();
                });

                this.on("maxfilesexceeded",function(file){//达到最大上传个数时删除当下的文件
                    this.removeFile(file);//删除前台表现的同时实质性的删除图片 
                    bootbox.alert({
                        message: "商品图片最多为"+maxNum+"张！",
                        callback: function() {
                            
                        },
                        className: "bootbox-sm"
                    });
                });
            }
            
        });
       
    });



	window.PixelAdmin.start(init);
});