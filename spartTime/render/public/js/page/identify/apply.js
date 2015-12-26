$(function(){

	var App=function(){
		
		this.init();//页面初始化
		this.imgUpload();//上传图片
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
            var maxNum=3;
            var removeLink=document.createElement("span");
            removeLink.setAttribute("class","icon-cancel-circle");
            var drop = new Dropzone("#uploadImg", {
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
                thumbnailHeight:100,
                thumbnailWidth:100,
                resize: resize,
                init: function(){

                    $("#uploadImg .dz-default.dz-message").remove();
                   
                    var that=this;

                	
                    this.on("addedfile",function(file){
                    	$("#clickable").removeClass("un_select").addClass("select");
                        $("#uploadImg").append($("#clickable"));
                       	console.log(that.files.length);
                        if(that.files.length>maxNum){
                            that.removeFile(file);
                            $("#clickable").hide();
                            layer.open({
                                content:"最多上传3张图片",
                                time: 2
                            });
                        }
                         if(that.files.length>=maxNum){
                            $("#clickable").hide();
                           
                        }
                       
                    });


                    this.on("removedfile",function(file){
	                    var imglength=$("#uploadImg .dz-preview").length;
                        $("#clickable").show();
	                    if(imglength==0){
	                       	$("#clickable").removeClass("select").addClass("un_select");
	                    }
                    });


                    this.on("success",function(e,data){
                    	var curWraper=$(e.previewElement);
                    	var hiddenInput_mainPic=$("<input type='hidden' class='hiddenInput_mainPic' value='"+data.primitivePic+"'/>");
                    	var hiddenInput_otherPic=$("<input type='hidden' class='hiddenInput_otherPic' value='"+data.contractPic+"'/>");
                    	curWraper.append(hiddenInput_mainPic);
                    	curWraper.append(hiddenInput_otherPic);
                    });


                    this.on("maxfilesexceeded",function(file){//达到最大上传个数时删除当下的文件
                        
                        that.removeFile(file);//删除前台表现的同时实质性的删除图片

                    });
                }
                
            });
		}
	};

	var app=new App();
});