$(function(){
	var init=[];
	var previewTemplate = '<div class="dz-preview dz-file-preview"><div class="dz-details"><div class="dz-filename"><span data-dz-name></span></div><div class="dz-size">文件大小: <span data-dz-size></span></div><div class="dz-thumbnail-wrapper"><div class="dz-thumbnail"><img data-dz-thumbnail><span class="dz-nopreview">没有预览</span><div class="dz-success-mark"><i class="fa fa-check-circle-o"></i></div><div class="dz-error-mark"><i class="fa fa-times-circle-o"></i></div><div class="dz-error-message"><span data-dz-errormessage></span></div></div></div></div><div class="progress progress-striped active"><div class="progress-bar progress-bar-success" data-dz-uploadprogress></div></div></div>',
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

    // 上传商品图片
    var maxNum=30;
	init.push(function () {
        new Dropzone("#dropzonejs-img", {
            url: "goods_issue_step.html",
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
            resize: resize
        });
       
    });

    //网络图片功能
    init.push(function(){
        $("#netImg").click(function(){
           alert("此处加载弹框");
        });
    });
    // 管理图片弹框功能
    init.push(function(){
        $("#manageImg").click(function(){
            var html=$(".manageImg").html();
            bootbox.dialog({
                title:"选择文件",
                message:html,
                buttons: {
                    success: {
                        label: "确定",
                        className: "btn-primary",
                        callback: function() {
                            alert("great success");
                        }
                    }
                },
                className: "bootbox-lg"
            });
        });
    });
	window.PixelAdmin.start(init);
});