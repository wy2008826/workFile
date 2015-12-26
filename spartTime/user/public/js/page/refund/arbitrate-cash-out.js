$(function(){
	var App=function(){

		this.init();//页面初始化
		this.imgUpload();//上传图片
		this.submitAndNext();//页面跳转
	};

	App.prototype={
		init:function(){

		},
		imgUpload:function(){
			var resize = function(file) {
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
            

            // 上传图片
            var maxNum=5;
            var removeLink=document.createElement("span");
            removeLink.setAttribute("class","icon-cancel-circle");
            var drop = new Dropzone("#image_form", {
                url: "https://www.baidu.com",
                clickable: "#clickable",
                paramName: "fileData", // The name that will be used to transfer the file
                maxFiles: maxNum,
                maxFilesize: 1, // MB
                acceptedFiles: acceptedFiles,
                addRemoveLinks : true,
                dictResponseError: "无法上传文件",
                dictInvalidFileType: "无法上传此类型的文件",
                dictMaxFilesExceeded: "最多包含"+maxNum+"张图片",
                dictCancelUpload: " ",
                autoProcessQueue: true,
               	dictRemoveFile: "",
                // previewTemplate: previewTemplate,
                thumbnailHeight:80,
                thumbnailWidth:80,
                resize: resize,
                init: function(){

                    $("#image_form .dz-default.dz-message").remove();
                   
                    var that=this;

                    this.on("addedfile",function(file){
                    	if(that.files.length>maxNum){
                            that.removeFile(file);
                        }
                        if(that.files.length==maxNum){
                             $("#clickable").hide();
                        }
                       	console.log(that);
                    });


                    this.on("removedfile",function(file){
	                    var imglength=$("#image_form .dz-preview").length;
	                    $("#clickable").show();
                    });


                    this.on("success",function(e,data){
                    	var curWraper=$(e.previewElement);
                    	var hiddenInput_mainPic=$("<input type='hidden' class='hiddenInput_mainPic' value='"+data.primitivePic+"'/>");
                    	var hiddenInput_otherPic=$("<input type='hidden' class='hiddenInput_otherPic' value='"+data.contractPic+"'/>");
                    	curWraper.append(hiddenInput_mainPic);
                    	curWraper.append(hiddenInput_otherPic);
                    });


                    this.on("maxfilesexceeded",function(file){//达到最大上传个数时删除当下的文件
                        
                        this.removeFile(file);//删除前台表现的同时实质性的删除图片 
                    });
                }
                
            });
		},
		submitAndNext:function(){
			
		}
	};

	var app=new App();
});