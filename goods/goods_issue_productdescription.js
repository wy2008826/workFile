$(function(){
	var umConfig={//富文本编辑框的相关配置
		toolbar:[
	            ' undo redo | bold italic underline strikethrough | superscript subscript | forecolor backcolor | removeformat |',
	            'insertorderedlist insertunorderedlist | selectall cleardoc paragraph | fontfamily fontsize' ,
	            '| justifyleft justifycenter justifyright justifyjustify |',
	            'link unlink |  image '
	        ],
	    'fontfamily':[{ name: 'songti', val: '宋体,SimSun'}],
	    "initialStyle":'.edui-editor-body .edui-body-container p{line-height:1em}',
	    imageUrl:window.config.uploadUeditorProductPic,  //图片上传提交地址
        imagePath:window.config.picPrefix,       //图片修正地址，引用了fixedImagePath,如有特殊需求，可自行配置
        imageFieldName:""//图片数据的key,若此处修改，需要在后台对应文件修改对应参数

	};

	var App=function(){
		
		this.init();//页面初始化
		this.textArea();//富文本编辑功能
		
	};
	App.prototype={
		init:function(){
			
			window.PixelAdmin.start();
		},
		textArea:function(){
			
			var um = UM.getEditor('goodsDescArea',umConfig);//实例化文本编辑器 
			um.ready(function(){
				$(".edui-container").css("width","auto");
				
			});
			//getContent() 获得内容 包括html结构   getContentTxt() 获得纯文本  hasContents()判断是否有内容
			
			$("#goodsDescNextBtn").click(function(){//提交按钮 事件
				updateProudct(window.config.productShare,um.getContentTxt());
			});

			$("#goodsDescUpBtn").click(function(){
				updateProudct(window.config.updateProduct,um.getContentTxt());
			});
			
			um.addListener('blur',function(){
				showError();
		    });
		    um.addListener('keyup',function(){
		    	showError();
		    });
			function showError(){
				var hasContents=um.hasContents();
				if(!hasContents){
					$('#goodsDescError').html('商品详情不能为空，限6000个字符以内')
				}
				else{
					$('#goodsDescError').html('')
				}
		        
			}
		}
	}

	var app=new App();

	function updateProudct(url,context){
		var productId = $('#_product_id').val();
		$.post(window.config.updateProductDescription,{productId:productId,des:context},function(data){
			if(data.success){
				window.location.href  = url + "?productId=" + productId;
			}
		},"json");
	}
	
})