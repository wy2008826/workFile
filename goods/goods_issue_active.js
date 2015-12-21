$(function(){

    var App=function(){

        this.init();//页面初始化
        this.imgUpload();//图片上传功能
        this.submitData();//提交数据
    };

    App.prototype={
        init:function(){
            window.PixelAdmin.start();
        },
        imgUpload:function(){
            var previewTemplate = '<div class="dz-preview dz-file-preview"><div class="dz-details"><div class="dz-filename"><span data-dz-name></span></div><div class="dz-thumbnail-wrapper"><div class="dz-thumbnail"><img data-dz-thumbnail><span class="dz-nopreview">没有预览</span><div class="dz-success-mark"><i class="fa fa-check"></i></div><div class="dz-error-mark"><i class="fa fa-times-circle-o"></i></div><div class="dz-error-message"><span data-dz-errormessage></span></div></div></div></div><div class="progress progress-striped active"><div class="progress-bar progress-bar-success" data-dz-uploadprogress></div></div></div>',
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
            var maxNum=9;
            var exitNum=function(){
                return  $("#dropzone-img .dz-preview").length-$("#dropzone-img #addClickable").length;
            };
            var hideClickAdd=function(){
                $("#dropzone-img #addClickable.dz-preview").hide();
            };
            var showClickAdd=function(){
                $("#dropzone-img #addClickable.dz-preview").show();
            };

            var dropImg=new Dropzone("#dropzone-img", {
                url: window.config.uploadProductPic,
                clickable: "#addClickable",
                paramName: "fileData",
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
                thumbnailHeight:160,
                thumbnailWidth:160,
                resize: resize,
                init:function(){
                    var that=this;

                    this.on("addedfile",function(file){//新增图片
                        $("#dropzone-img").append($("#addClickable"));
                        if(exitNum()>maxNum){
                            this.removeFile(file);
                        }
                        if(exitNum()==maxNum){
                            hideClickAdd();
                        }
                    });

                    this.on("removedfile",function(file){//删除文件
                        showClickAdd();
                    });

                    this.on("success",function(e,data){//上传成功的处理
                        var curWraper=$(e.previewElement);
                        var hiddenInput_mainPic=$("<input type='hidden' class='hiddenInput_mainPic' value='"+data.primitivePic+"'/>");
                        var hiddenInput_otherPic=$("<input type='hidden' class='hiddenInput_otherPic' value='"+data.contractPic+"'/>");
                        curWraper.append(hiddenInput_mainPic);
                        curWraper.append(hiddenInput_otherPic);
                    });

                    this.on("maxfilesexceeded",function(file){//达到最大上传个数时删除当下的文件
                        
                        bootbox.alert({
                            message: "商品图片最多为"+maxNum+"张！",
                            callback: function() {
                                
                            },
                            className: "bootbox-sm"
                        });
                        this.removeFile(file);//删除前台表现的同时实质性的删除图片 
                    });
                }
            });
        },
        submitData:function(){
            $("#goodsShareUp").click(function(){
            	var productId = $("#_product_id_active").val();
            	submitData(window.config.issueProductDescription + "?productId=" + productId,null);
            });

            $("#goodsShareNext").click(function(){
            	submitData(window.config.index,null);
            });

            $("#goodsPutaway").click(function(){
            	submitData(window.config.index,2);
            });

        }
    }

    var app=new App();
    
    function submitData(url,status){
    	var formData={};
    	
    	var productId = $("#_product_id_active").val();
    	formData['productId'] = productId;
    	var id = $("#_product_share_id").val();
    	formData['id'] = id;
    	
        var text=$("#goodsShareAreaText").val();//分享资料文本信息
        formData.content=text;

        var imagMainData=[];
        var imagOtherData=[];
        $("#dropzone-img .hiddenInput_mainPic").each(function(index,elem){
            var value=$(elem).val();
            imagMainData.push(value);
        });
        formData["imgsMain"] =imagMainData.join(",");//主图

        $("#dropzone-img .hiddenInput_otherPic").each(function(index,elem){
            var value=$(elem).val();
            imagOtherData.push(value);
        });
        formData["imgsOther"] =imagOtherData.join(",");//缩略图
        if(status && status != null){
        	formData.productStatus = status;
        }
        
        
        $.post(window.config.updateBussProductShareInfo,formData,function(data){
        	if(data.success){
        		window.location.href  = url;
        	}
        },"json");
    
    }
    
    
	
});