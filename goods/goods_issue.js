//jquery输入框查询新增插件  （实现品牌的新增和查询功能 ）
(function(window,$){
    $.fn.createSuggestion=function(config){
        var that=this;
        var keyUp=function(){
            createUl();
            config.wraper.show();
        }
        var config=$.extend({"keyup":keyUp},config);


        $(this).on("keyup",config.keyup);//键盘抬起
        $(this).on("focus",function(){//得到焦点
            createUl();
            config.wraper.show();
        });
        $(this).on("blur",function(){//失去焦点
            if($(config.ul).find("li.add").length>0){
                if($(this).val().trim()!=""){
                    addItem($(this).val().trim());
                }
            }        });
        $("body").on("click",function(e){
            var id=$(that).attr("id");
            if($(e.target).attr("id")!=id){
                config.wraper.hide();
            }
        });
        $(config.ul).on("click",function(e){
            var target=$(e.target);
            
            if(target[0].nodeName=="LI"&& !target.hasClass("add")){
                var id=target.eq(0).attr("data-id");
                var text=target.eq(0).text();
                that.attr("value",text).attr("data-id",id); 
                config.selectItem(target[0]);
                // config.wraper.hide();
            }
           // that.focus();
        });

        function createLi(data){
            var id=data["id"]||"" ;
            return $("<li data-id="+data.id+" >"+data.text +"</li>");
        }

        function createUl(){
            var value=$(that).val().trim();
            config.ul.html("");
            console.log(config.dataList);
            for(var i=0;i<config.dataList.length;i++){
                if(config.dataList[i]["text"].indexOf(value)!=-1){
                    var li=createLi(config.dataList[i]);
                    config.ul.append(li);
                }
            }
           
            
            if(config.ul.find("li").length<1){
                if(value==""){
                    var li=$("<li class='add' >"+"品牌列表为空，可输入内容新增品牌！"+"</li>")
                }
                else{
                    var li=$("<li class='add' >"+"<span class='fa fa-plus-circle'></span>"+value+"</li>");
                    
                }
                config.ul.append(li);
            }
        }


        function addItem(text){
            if(text==""){
                return;
            }
            $.ajax({
                type:"POST",
                url:config.addNew.url,
                data:{name:text},
                dataType:"json",
                success:function(data){
                    var id=data.result;
                    console.log(config.dataList);
                    config.dataList.push({"id":id,"text":text});
                    config.addNew.success(id);
                },
                error:function(){
                    console.log("errorID");
                    config.dataList.push({"id":"error"+Math.random(),"text":text});
                    config.addNew.success({"id":"error"+Math.random(),"text":text});
                }
            });
        }
    };


    
})(window,jQuery);


// 管理图片目录弹框功能   本期暂时不做  此处作为备注  html=hTpl.goods_manage_folder();



//页面功能开始
$(function(){
    //默认的可选则颜色数据  可以在此处进行配置
    var colorData={options:[
                    {"color":"#000","text":"黑色"},
                    {"color":"#f33","text":"红色"},
                    {"color":"#33f","text":"蓝色"},
                    {"color":"#3f3","text":"绿色"},
                    {"color":"#f93","text":"橙色"}
                    // {"text":"大红色"}
                ]};
    //默认的可选择尺寸数据  可以在此处进行配置
    var sizeData={options:[
                    {"text":"X"},
                    {"text":"XL"},
                    {"text":"XXL"}
                ]};

    var App=function(){
        this.reg={
            initReg:/^\d+$/,//整数 包括0
            plusDotReg:/^\d+\.\d+$///小数 包括0
        };
        this.bootbox=function(html,title,callback,className){//页面弹框公用
            bootbox.dialog({
                message:html,
                title:title,
                buttons: {
                    success: {
                        label: "确定",
                        className: "btn-primary",
                        callback: callback
                    },
                    danger:{
                        label:"取消",
                        className:"btn",
                        callback:function(){}
                    }
                },
                className: className
            });
        };
        this.matchModel=function(str,regArr){//匹配字符串数据是否符合某种规则
            for(var i=0;i<regArr.length;i++){
                if(regArr[i].test(str)){
                    return true;
                }
            }
            return false;
        };
        this.getLabelStatus=function(label){//获取复选框的选中状态和相应数据
            try{
                var status=$(label).find("input[type='checkbox'].px").prop("checked");
                var text=$(label).find(".lbl").attr("data-text");
                return {"status":status,"text":text};
            }
            catch(error){
                console.log(error);
            }
        };
        this.getSelectedOptionsData=function(suggestionsUl){//获取多选框下拉列表的数据
            var data=[];
            suggestionsUl.find("li").each(function(index,elem){
                var checbox=$(elem).find("input.px");
                var status=checbox.prop("checked")==true?"yes":"no";
                var id=checbox.attr("data-id");
                var text=checbox.attr("data-text");
                data.push({"id":id,"text":text,"status":status});
            });

            return data;
        };
        this.setSelectedValue=function(selectedData,selectInput){//根据多选框的下拉列表的数据填充value
            var value="";
            selectedData.forEach(function(item,index){
                var status=item.status;
                if(status=="yes"){
                    value+=item.text+"  ";
                }
            });
            selectInput.val(value);
        };
        this.priceBetween=function(args){//判定数据是否按照从小到大的顺序排列
            var arr=[];
            for(var i=0;i<args.length;i++){
                var value=$(args[i]).val()*1;
                arr.push(value);
            }
            
            for(var i=0;i<arr.length-1;i++){
                if(arr[i]){
                    for(var j=i+1;j<arr.length;j++){
                        if(arr[j]){
                            if(arr[i]>arr[j]){
                                return false;
                            }
                        }
                    }
                }
            }
            return true;
        }

        this.dataCenter={};

        this.init();//页面初始化后第一时间执行的代码 放于此处
        //this.selectBranch();//商品品牌选择和添加功能
        
        // this.goodsGroupMultiple();//商品多选功能

        this.colorAndSizeCompile();//颜色和尺寸的html结构填充
        this.colorAndSizeAdd();//新增颜色和尺寸
        this.delPropertyRow();//删除自定义属性行
        this.propertyAdd();//新增自定义属性
        this.colorAndSizeBatch();//根据颜色和尺寸批量生成库存数据
        this.stockDataBatch();//批量修改库存数据
        this.delStockRow();//删除库存行数据

        this.imgUpload();//商品图片上传功能
        this.costSetAndAdd();//运费状态设置  以及运费模板新增和刷新功能


        this.validateForm();//表单验证和数据提交
    };


    App.prototype={
        init:function(){ //页面初始化
            window.PixelAdmin.start();
           
            // 初始化类目
            initCategory();
            // 初始化品牌
            initBrand();
            // 初始化分组
            initGroup();
            // 初始化分组运费模板
            initCarriage();
        },
        selectBranch:function(){ //商标选择和新建
            var self=this;
            var branchData=$("#goodsBranch").attr("data-list").split(",");
            var dataList=[];

            for(var i=0;i<branchData.length;i++){
                var meta=branchData[i].split("=");
                if(meta[1]){
                    dataList.push({"id":meta[0],"text":meta[1]});
                }
            }

            $("#goodsBranch").createSuggestion({
                dataList:dataList,
                wraper:$(".suggestionsWraper").eq(0),
                ul:$(".groupSuggestions").eq(0),
                selectItem:function(li){
                    var id=$(li).attr("data-id");
                    $("#goodsBranchHidden").attr("value",id);
                    self.validateForm.element($("#goodsBranch"));
                },
                addNew:{//这里只需要给定一个url  后台返回一个json数据 如{id:50,text:"苹果"}即可  具体发送代码见本页22行
                    url:window.config.addShopBrand,
                    success:function(data){
                        $("#goodsBranchHidden").attr("value",data);
                        console.log("add");
                    }
                }
            });
        },
        goodsGroupMultiple:function(){
            var self=this;
            var selectInput=$("#groupSelect");

            var suggestionsUl=$("#goodsGroupSuggestions");
            
            var suggestionsWraper=suggestionsUl.closest(".suggestionsWraper");
            console.log(selectSearch);

            var options=selectInput.attr("data-options").split("|");
            var data=[];
            
            for(var i=0;i<options.length;i++){
                var option=options[i].split("=");
                data.push({"id":option[0],"text":option[1],"status":option[2],"detailId":option[3]});
            }
            self.setSelectedValue(data,selectInput);
            
            Handlebars.registerHelper("checked",function(status,options){
                if(status=="yes"){
                    return "checked";
                }
                else{
                    return "";
                }
            });
            var tmp=Handlebars.compile($("#multipleSelectLi").html());
            var html=tmp(data);
            $("#goodsGroupSuggestions").append(html);

            var selectSearch=suggestionsUl.find("#groupSearchLi input").eq(0);
            selectInput.focus(function(){
                suggestionsWraper.show();
            }).mouseout(function(){
                suggestionsWraper.hide();
                selectInput.blur();
            });

            suggestionsWraper.mouseover(function(event){
                suggestionsWraper.show();
            }).mouseout(function(){
                suggestionsWraper.hide();
                selectInput.blur();
            });

            selectSearch.on("keyup",function(){//搜索功能
                var value=this.value.trim();
                suggestionsUl.find("input[type='checkbox']").each(function(index,elem){
                    var text=$(elem).attr("data-text");
                    var match=text.indexOf(value)!=-1;
                    if(match){
                        $(elem).closest("li").show();
                    }
                    else{
                        $(elem).closest("li").hide();
                    }
                });
            });

            suggestionsUl.on("change",function(event){//选项表发生改变的时候
                
                var target=$(event.target);

                if($(target).attr("id")==selectSearch.eq(0).attr("id")){//如果是搜索项发生改变  终止运行

                    return false;
                }
                var status=target.prop("checked");
                var groupdetailid = target.attr("groupdetailid");
                // 执行删除分组
                if(!status){
                	if(groupdetailid && groupdetailid != ''){
                		$.post(window.config.romveProductFormGruop,{groupDetailId:groupdetailid},function(data){
                			if(data.success){
                				target.attr("groupdetailid","");
                			}
                		},"json");
                	}
                }
                var selectedData=self.getSelectedOptionsData(suggestionsUl);
                self.setSelectedValue(selectedData,selectInput);
            });

            $("#groupAdd").click(function(){
                var html=hTpl.goods_form_common([{"label":"分组名称","id":"addnewGroupValue"}]);
                var title="新建分组";
                var className="bootbox-lg";
                var callback=function(){
                    var groupValue=$("#addnewGroupValue").val().trim();
                    var groupId = null;
                    var status="yes";
                    if(groupValue!=""){
                    	$.post(window.config.addProductGroup,{name:groupValue},function(data){
                    		if(data.success){
                    			 groupId =  data.result;
                    			 var addData={"id":groupId,"text":groupValue,"status":status};
                                 var html=tmp([addData]);
                                 suggestionsUl.append(html);
                                 var selectedData=self.getSelectedOptionsData(suggestionsUl);
                                 self.setSelectedValue(selectedData,selectInput);
                    		}
                    	},"json");
                       
                    }
                    
                }

                self.bootbox(html,title,callback,className);
            });
        },
        colorAndSizeCompile:function(){//颜色和尺寸区域的默认数据填充
            
            var scriptHtml=Handlebars.compile($("#colorScriptTmp").html());
            Handlebars.registerHelper("checkText",function(text,options){
               if(text){
                 //满足添加继续执行
                 return options.fn(this);
               }else{
                 //不满足条件执行{{else}}部分
                 return options.inverse(this);
               }
            });

            var colorHtml=scriptHtml(colorData);
            var sizeHtml=scriptHtml(sizeData);
            $("#colorAddLabel").before(colorHtml);
            $("#sizeAddLabel").before(sizeHtml);
        },
        colorAndSizeAdd:function(){ //颜色和尺寸的添加
            var self=this;
            $("#colorAddLabel").on("click",function(){//新增颜色

                var html=hTpl.goods_form_common([{"label":"颜色名称","id":"addColorValue"}]);
                var that=this;
                var title="新增颜色";
                var callback=function(){
                    var colorValue=$("#addColorValue").val().trim();

                    if(colorValue!=""){
                        var colorTplData={options:[{"text":colorValue}]};
                        var html=Handlebars.compile($("#colorScriptTmp").html())(colorTplData);
                        $(that).before(html);
                    }
                };
                var className="bootbox-lg";
                self.bootbox(html,title,callback,className);
            });

            $("#sizeAddLabel").on("click",function(){//新增尺寸
                var html=hTpl.goods_form_common([{"label":"尺寸名称","id":"addSizeValue"}]);
                var that=this;
                var title="新增尺寸";
                var callback=function(){
                    var sizeValue=$("#addSizeValue").val().trim();
                    if(sizeValue!=""){
                        var sizeTplData={options:[{"text":sizeValue}]};
                        var html=Handlebars.compile($("#colorScriptTmp").html())(sizeTplData);
                        $(that).before(html);
                    }
                };
                var className="bootbox-lg";
                self.bootbox(html,title,callback,className);
            });
        },
        delPropertyRow:function(){//删除自定义属性行
            var self=this;
            $("#addPropertyWraper").on("click","table .delProperty",function(){
                var that=this;
                var title="";
                var callback=function(){
                    $(that).closest("tr").remove();
                };
                var className="bootbox-sm";
                self.bootbox("确定删除？",title,callback,className);
                
            });
        },
        propertyAdd:function(){//新增自定义属性
            var self=this;
            $("#addProperty").on("click",function(){
               
                var tmp=$("#propertyInputRow").html();
                $("#addPropertyWraper tbody").append(tmp);

            });
        },
        colorAndSizeBatch:function(){//当选择颜色或者尺寸的时候  批量生成库存列表
            var self=this;
            dataCenter=this.dataCenter;
            var colorWraper=$("#colorLabelWraper");
            var sizeWraper=$("#sizeLabelWraper");

            colorWraper.on("change",".checkbox-inline",function(){
                createDataCenter.colorChange(this);
                createStockRow();
            });
            sizeWraper.on("change",".checkbox-inline",function(){
                createDataCenter.sizeChange(this);
                createStockRow();
            });

            //生成数据中心数据
            var createDataCenter={
                colorChange:function(label){//当颜色块发生改变的时候
                    var colorStatusText=self.getLabelStatus(label);
                    var color=colorStatusText.text;
                    if(colorStatusText.status){//选中了一个颜色值 循环尺寸  进行数据更新

                        sizeWraper.find(".checkbox-inline").each(function(index,elem){
                            var sizeStatusText=self.getLabelStatus(elem);
                            var size=sizeStatusText.text;
                            if(sizeStatusText.status){//如果该尺寸选中
                                if(!dataCenter[color]){
                                    dataCenter[color]={};
                                    dataCenter[color][size]={};
                                }
                                else{
                                    dataCenter[color][size]={};
                                }
                            }
                            else{//该尺寸未选中

                            }
                        });
                        if(!dataCenter[color]){
                            dataCenter[color]={};
                        }
                    }
                    else{//取消了一个颜色值 直接删除该颜色值的所有尺寸数据
                        delete dataCenter[color];
                    };
                    console.log(dataCenter);
                },
                sizeChange:function(label){//当尺寸块发生改变的时候
                    var sizeStatusText=self.getLabelStatus(label);
                    var size=sizeStatusText.text;
                    if(sizeStatusText.status){//选中一个尺寸
                        for(key in dataCenter){
                            dataCenter[key][size]={};
                        }
                    }
                    else{//取消了一个尺寸
                        for(key in dataCenter){
                            delete dataCenter[key][size];
                        }
                    }

                    console.log(dataCenter);
                }
            };
            
            
            //新增库存列表行  根据数据中心的数据生成库存行tr
            function createStockRow(){
                // var rowData={options:[{"color":"黑色","size":"XX","weight":"87","stock":"50","highPrice":"100.09","lowPrice":"90.90","agentPrice":"100"},
                //                    {"color":"灰色","size":"XXL","weight":"54","stock":"50","highPrice":"160.09","lowPrice":"60.90","agentPrice":"200"}
                //                    ]
                //            };
                var $h=$("#batchGoodsHighPrice");
                var $l=$("#batchGoodsLowPrice");
                var $a=$("#batchGoodsPrice");
                var initReg=self.reg.initReg;
                var plusDotReg=self.reg.plusDotReg;
                var batchGoodsWeight=self.matchModel($("#batchGoodsWeight").val().trim(),[initReg,plusDotReg])?$("#batchGoodsWeight").val().trim():"";//批量重量
                var batchStock=self.matchModel($("#batchGoodsStock").val().trim(),[initReg,plusDotReg])?$("#batchGoodsStock").val().trim():"";//批量库存
                var batchPrice=self.matchModel($a.val().trim(),[initReg,plusDotReg])?$("#batchGoodsPrice").val().trim():"";//批量零售价
                var batchHighPrice=self.matchModel($h.val().trim(),[initReg,plusDotReg])?$("#batchGoodsHighPrice").val().trim():"";//批量最高价
                var batchLowPrice=self.matchModel($l.val().trim(),[initReg,plusDotReg])?$("#batchGoodsLowPrice").val().trim():"";//批量最低价
                
                var priceBetween=self.priceBetween([$a,$l,$h]);
                if(!priceBetween){
                    batchPrice=batchHighPrice=batchLowPrice="";
                }
                var rowData={options:[]};
                for(color in dataCenter){
                    var sizes=Object.keys(dataCenter[color]);

                    var rowMeta={
                        "color":color,
                        "size":"",
                        "weight":batchGoodsWeight,
                        "stock":batchStock,
                        "highPrice":batchHighPrice,
                        "lowPrice":batchLowPrice,
                        "agentPrice":batchPrice
                    };
                    if(sizes.length==0){
                        rowData.options.push(rowMeta);
                    }
                    else{
                        for(size in dataCenter[color]){
                            var rowMeta={
                                "color":color,
                                "size":size,
                                "weight":batchGoodsWeight,
                                "stock":batchStock,
                                "highPrice":batchHighPrice,
                                "lowPrice":batchLowPrice,
                                "agentPrice":batchPrice
                            };
                            rowData.options.push(rowMeta);
                        }
                    }
                    
                }
                
                var tableTbody=$("#kucunTable #tbodyAddWraper");
                
                var scriptHtml=$("#stockRow").html();
                var handlebarTmp=Handlebars.compile(scriptHtml);
               
                var trHtml=handlebarTmp(rowData);
                
                tableTbody.html(trHtml);
            }

        },
        delStockRow:function(){//删除某一行库存数据
            var self=this;
            $("#kucunTable").on("click",".pro-handle .del",function(){

                var html="确定删除？";
                var that=this;
                var title="";
                var className="bootbox-sm";
                var tr=$(that).closest("tr");
                var color=tr.attr("data-color-mark");
                var size=tr.attr("data-size-mark");
                var callback=function(){
                    if(tr.closest("tbody").attr("id")=="tbodyAddWraper"){
                        delete self.dataCenter[color][size];
                        tr.remove();
                    }else{
                    	$.post(window.config.deleteProductSKU,{skuId:$(that).attr('sku-id')},function(data){
                    		if(data.success){
                    			 tr.remove();
                    		}
                    	},"json");
                    }
                }
                self.bootbox(html,title,callback,className);
            });
        },
        stockDataBatch:function(){//批量修改库存数据
            var self=this;
            var batchError=$('#batchError');
            var $h=$("#batchGoodsHighPrice");
            var $l=$("#batchGoodsLowPrice");
            var $a=$("#batchGoodsPrice");

            $("#kucunTable thead").on("click",function(event){
                var targetId=$(event.target).attr("id");
                var initReg=self.reg.initReg;
                var plusDotReg=self.reg.plusDotReg;

                if(targetId=="batchGoodsWeightBtn"){//点击了重量按钮
                    var weight=$("#batchGoodsWeight").val();
                    var match=self.matchModel(weight.trim(),[initReg,plusDotReg]);
                    if(match){
                        $("#kucunTable tbody input[name^='goodsWeight']").val(weight.trim());
                    }
                    else{
                        batchErrorShow("重量请输入数字！");
                       
                    }
                }
                else if(targetId=="batchGoodsStockBtn"){//点击了库存按钮
                    var stock=$("#batchGoodsStock").val();
                    var match=self.matchModel(stock.trim(),[initReg]);
                    if(match){
                        $("#kucunTable tbody input[name^='goodsStock']").val(stock.trim());
                    }
                    else{
                        batchErrorShow("库存请输入整数！");
                       
                    }
                }
                else if(targetId=="batchGoodsPriceBtn"){//点击了代理价按钮
                    var price=$a.val();
                    var match=self.matchModel(price.trim(),[initReg,plusDotReg]);
                    var priceBetween=self.priceBetween([$a,$l,$h]);
                    if(match&&priceBetween){
                        $("#kucunTable tbody input[name^='goodsAgentPrice']").val(price.trim());
                    }
                    else if(!match){
                        batchErrorShow("价格请输入数字！");
                    }
                    else if(!priceBetween){
                        batchErrorShow("最高、最低、代理价区间不合理！");
                    }
                    console.log(priceBetween);
                }
                else if(targetId=="batchGoodsHighPriceBtn"){//点击了最高价按钮
                    var highPrice=$("#batchGoodsHighPrice").val();
                    var match=self.matchModel(highPrice.trim(),[initReg,plusDotReg]);
                    var priceBetween=self.priceBetween([$a,$l,$h]);
                    if(match&&priceBetween){
                        $("#kucunTable tbody input[name^='goodsHighPrice']").val(highPrice.trim());
                    }
                    else if(!match){
                        batchErrorShow("最高价请输入数字！");
                    }
                    else if(!priceBetween){
                        batchErrorShow("最高、最低、代理价区间不合理！");
                    }
                }
                else if(targetId=="batchGoodsLowPriceBtn"){//点击了最低价按钮
                    var lowPrice=$("#batchGoodsLowPrice").val();
                    var match=self.matchModel(lowPrice.trim(),[initReg,plusDotReg]);
                    var priceBetween=self.priceBetween([$a,$l,$h]);
                    if(match&&priceBetween){
                        $("#kucunTable tbody input[name^='goodsLowPrice']").val(lowPrice.trim());
                    }
                    else if(!match){
                        batchErrorShow("最低价请输入数字！");
                    }
                    else if(!priceBetween){
                        batchErrorShow("最高、最低、代理价区间不合理！");
                    }
                }
            });


            function batchErrorShow(text){
                batchError.html(text).show().delay(1000).fadeOut(300);
            }
        },
        imgUpload:function(){//商品图片上传
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
            var exitNum=function(){
                return  $("#dropzonejs-img .dz-preview").length-$("#dropzonejs-img #clickable").length;

            }
            var ownNum=function(){
                return  $("#dropzonejs-img .dz-preview.hasOwn").length;
            }

            var hideClickAdd=function(){
                $("#dropzonejs-img #clickable.dz-preview").hide();
            }
            var showClickAdd=function(){
                $("#dropzonejs-img #clickable.dz-preview").show();
            }
            // 上传商品图片
            var maxNum=5;
            var ableNum=maxNum-exitNum();
            var drop = new Dropzone("#dropzonejs-img", {
                url: window.config.uploadProductPic,
                clickable: "#clickable",
                paramName: "fileData", // The name that will be used to transfer the file
                maxFiles: ableNum,
                maxFilesize: 1, // MB
                acceptedFiles: acceptedFiles,
                addRemoveLinks : true,
                dictResponseError: "无法上传文件",
                dictInvalidFileType: "无法上传此类型的文件",
                dictMaxFilesExceeded: "商品主图最多包含"+maxNum+"张图片",
                autoProcessQueue: true,
                dictRemoveFile: "移除文件",
                previewTemplate: previewTemplate,
                thumbnailHeight:160,
                thumbnailWidth:160,
                resize: resize,
                init: function(){

                    if(exitNum()>=maxNum){
                        hideClickAdd();
                    }

                    var that=this;
                    $("#dropzonejs-img").on("click",".hasOwn .dz-remove",function(){
                        $(this).parent().remove();
                        that.options.maxFiles = maxNum-ownNum();
                        showClickAdd();
                    });

                    this.on("addedfile",function(file){
                        $("#dropzonejs-img").append($("#clickable"));
                        if(exitNum()>maxNum){
                            this.removeFile(file);
                        }
                        if(exitNum()==maxNum){
                            hideClickAdd();
                        }
                    });
                    this.on("removedfile",function(file){
                        showClickAdd();
                    });
                    this.on("success",function(e,data){
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
        costSetAndAdd:function(){//运费状态设置 运费新建和刷新
            var self=this;
            var costType1=$("#costTypeCheck1");
            var costType2=$("#costTypeCheck2");
            var costTypeVal1=$("#costTypeValue1");
            var costTypeVal2=$("#costTypeValue2");

            setStatus();
       
            //当复选框选中状态发生改变  改变输入框的禁用状态
            $("#costTypeCheck1,#costTypeCheck2").change(function(){
                setStatus();
            });


             //刷新运费
            $("#freshCostCarriage").click(function(){
                if(!getTypeStatus1()){
                    alert("刷新运费模板");
                }
            });

             //新建运费模板
            $("#addCostCarriage").click(function(){
                if(!getTypeStatus1()){
                    var html=hTpl.goods_form_common([{"label":"模板名称","id":"addCarriageModuleValue"}]);
                    var title="新建木模板";

                    var callback=function(){
                        var groupValue=$("#addCarriageModuleValue").val();
                    };
                    var className="bootbox-lg";
                    self.bootbox(html,title,callback,className);
                   
                }
            });


            //获取运费状态为统一运费还是运费模板
            function getTypeStatus1(){
               return costType1.prop("checked");
            }

             //设置运费输入框的禁用状态
            function setStatus(){
                costTypeVal1.prop("disabled",!getTypeStatus1());
                costTypeVal2.prop("disabled",getTypeStatus1());
            }
        },
        validateForm:function(){//表单数据验证和提交
            var self=this;
            $.validator.addMethod("priceBetween",function(value,element,param){
                var $tr=$(element).closest("tr").eq(0);
                var $h=$tr.find("input[name^='goodsHighPrice']").eq(0);
                var $l=$tr.find("input[name^='goodsLowPrice']").eq(0);
                var $a=$tr.find("input[name^='goodsAgentPrice']").eq(0);
                
                return self.priceBetween([$a,$l,$h]);
            });
            self.validateForm=$("#issueForm").validate({
                rules:{
                    goodsBranch:{
                        required:true
                    },
                    costTypeValue1:{
                        required:true,
                        number:true
                    }
                },
                messages:{
                     goodsBranch:{
                        required:"商品品牌为必填项！"
                    },
                    costTypeValue1:{
                        required:"运费为必填项！",
                        number:"运费请输入数字！"
                    }
                },
                errorPlacement:function(error,elem){
                    
                    if($(elem).attr("id")=="goodsTitle"){
                        $("#goodsTitleError").html(error)
                    }
                    else if($(elem).attr("id")=="goodsBranch"){
                        $("#goodsBranchError").html(error)
                    }
                    else if($(elem).attr("id")=="costTypeValue1"){
                        $("#costTypeValue1Error").html(error)
                    }
                    else{
                        $("#batchError").html(error);
                    }
                    
                },
                submitHandler:function(form){
                    var formData={};
                    // 产品ID
                    var productId = $('#update_product_id').val();
                    formData["id"] = productId;
                    // 类目
                    var categoryOption = $("#categoryRow").find("select[name='category-3']");
                    var categoryId = categoryOption.val();
                    var categoryName = categoryOption.find("option:selected").text();
                    formData["catId"]=categoryId;
                    formData['catName'] = categoryName;

                    //商品品牌数据
                    var goodsBranchId=$("#goodsBranchHidden").val();
                    formData["brandId"]=goodsBranchId;
                    //商品标题
                    var goodsTitle=$("#goodsTitle").val();
                    formData["name"]=goodsTitle;

                    //商品分组数据
                    var goosGroupData=self.getSelectedOptionsData($("#goodsGroupSuggestions"));
                    var length = goosGroupData.length;
                    var oneGroup = null;
                    var groupIds = new Array();
                    for(var i =0 ; i<length ; i++){
                    	oneGroup = goosGroupData[i];
                    	if(oneGroup.status=='yes'){
                    		groupIds.push(oneGroup.id);
                    	}
                    }
                    formData["groupIds"]=groupIds;

                    //商品类型
                    var productType=$("input[name='productType']:checked").val();
                    formData["isVirtual"] = productType;

                   //自定义属性
                    var propertyData= new Array();
                    $("#addPropertyWraper table tbody tr").each(function(index,elem){
                        var name=$(elem).find(".propertyName input").val().trim();
                        var value=$(elem).find(".propertyValue input").val().trim();
                        if(name !="" && value !=""){
                            propertyData.push('{"propName":"' + name +'","propValue":"' + value+'"}');
                        }
                    });
                 
                    formData["customProperties"]= "["+propertyData.join(",")+"]"
                  //商品sku
                    var skuData=[];
                    $("#kucunTable  tbody ").each(function(index,tbody){
                        $(tbody).find("tr").each(function(ind,tr){
                            var trData={};
                            var skuId = $(tr).find("input[name^='goodsSkuId']").val();
                            var color=$(tr).find("input[name^='goodsColor']").val();
                            var size=$(tr).find("input[name^='goodsSize']").val();
                            var weight=$(tr).find("input[name^='goodsWeight']").val();
                            var stock=$(tr).find("input[name^='goodsStock']").val();
                            var high=$(tr).find("input[name^='goodsHighPrice']").val();
                            var low=$(tr).find("input[name^='goodsLowPrice']").val();
                            var agent=$(tr).find("input[name^='goodsAgentPrice']").val();
                            trData["id"] = skuId;
                            trData["color"]=color;
                            trData["standard"]=size;
                            trData["weight"]=weight;
                            trData["count"]=stock;
                            trData["marketPrice"]=high;
                            trData["salePrice"]=low;
                            trData["distributionPrice"]=agent;
                            skuData.push(trData);
                        });
                    });
                    formData["skuList"]=$.toJSON(skuData);
                    
                    // 商品主图图片
                    var mainPic = new Array();
                    $(".hiddenInput_mainPic").each(function(index,elem){
                    	mainPic.push($(elem).val());
                    	
                    });
                    formData["mainPic"] = mainPic.join(",")
                    
                    // 商品缩略图
                    var otherPic = new Array();
                    $(".hiddenInput_otherPic").each(function(index,elem){
                    	otherPic.push($(elem).val());
                    });
                    formData["otherPic"] = otherPic.join(",")
                    
                    //运费模板
                    var input=$("input[name='costType']:checked").closest(".form-group").next(".form-group").find(".form-control");
                    var costType=input.val();
                    
                    var tagName=(input[0].nodeName);
                    if(tagName=="INPUT"){
                    	formData["unionPostage"]=costType;
                    } else if(tagName=="SELECT"){
                    	formData["bussMouldId"]=costType;
                    }

                  //发票
                    var billType=$("input[name='billType']:checked").val();
                    formData["receipt"]=billType;


                  //保修
                    var repaireType=$("input[name='repaireType']:checked").val();
                    formData["guarantee"]=repaireType;
                     
                    $.post(window.config.issueOrUpdate,formData,function(data){
                    	if(data.success){
                    		window.location.href = window.config.issueProductDescription + "?productId="+data.result;
                    	}
                    },'json');
                   
                }
            });
        }

    }


    var app=new App();
    
    // 自定义函数
    // 加载类目
    function loadCatalog(jobj,parentId,checkedValue){
    	jobj.empty();
    	$.post(window.config.queryCatalogByParentId,{parentId:parentId},function(data){
    		if(data.success){
    			var results = data.result;
    			var length = results.length;
    			var item = null;
    			var id = null;
    			jobj.append('<option value="">请选择类目</option>');
    			for(var i = 0 ;  i< length ;i++){
    				item =  results[i];
    				id = item.id;
    				if(checkedValue == id ){
    					jobj.append('<option selected ="true" value="'+id+'">'+item.name+'</option>');
    				}else{
    					jobj.append('<option value="'+id+'">'+item.name+'</option>');
    				}
    			}
    		}
    		
    	},"json");
    }
    
    // 定义三级类目联动事件
    
    $("select[name='category-1']").change(function(){
    	var pranId = $(this).val();
    	if(pranId){
    		loadCatalog($("select[name='category-2']"),$(this).val(),null);
    	}else{
    		$("select[name='category-2']").empty();
    	}
    });
    $("select[name='category-2']").change(function(){
    	var pranId = $(this).val();
    	if(pranId){
    		loadCatalog($("select[name='category-3']"),$(this).val(),null);
    	}else{
    		$("select[name='category-3']").empty();
    	}
    });
    
    function initBrand(){
    	$.post(window.config.queryShopBrand,function(data){
    		if(data.success){
    			var results = data.result;
    			var length = results.length;
    			var data_list = new Array();
    			var oneBrand = null;
    			for(var i = 0 ; i < length ; i++ ){
    				oneBrand = results[i];
    				data_list.push(oneBrand.id + "=" + oneBrand.brand);
    			}
    			 $("#goodsBranch").attr('data-list',"",data_list.join(","));
    			 app.selectBranch();
    		}
    	},"json");
    }
    
    function initGroup(){
    	var groupJson = {};
    	var selectedGroup = $("#update_product_group_ids").val();
    	if(selectedGroup && selectedGroup != ''){
    	  groupJson = eval("("+selectedGroup+")");
    	}
    	$.post(window.config.selectGroupInfo,function(data){
    		if(data.success){
    			var results = data.result;
    			var length = results.length;
    			var data_list = new Array();
    			var oneGroup = null;
    			// 1=服装=yes|2=纺织=no|3=日用品=yes
    			var groupID = null;
    			var isSelected = null;
    			var groupDetailId = null;
    			for(var i = 0 ; i < length ; i++ ){
    				isSelected = 'no';
    				groupDetailId = '';
    				oneGroup = results[i];
    				groupID = oneGroup.id;
    				if(groupJson[groupID] && groupJson[groupID] != ''){
    					isSelected = 'yes';
    					groupDetailId = groupJson[groupID];
    				}
    				data_list.push( groupID + "=" + oneGroup.groupName + "=" + isSelected + "=" + groupDetailId);
    			}
    			 $("#groupSelect").attr('data-options',data_list.join("|"));
    			 app.goodsGroupMultiple();
    		}
    	},"json");
    }
    // 运费模板
    function initCarriage(){
    	var mouldId = $("#update_bussMould_Id").val();
    	$.post(window.config.queryCarriage,function(data){
    		if(data.success){
    			var jobj = $("#costTypeValue2");
    			jobj.append('<option value="">请选择运费模板</option>');
    			var results = data.result;
    			var length = results.length;
    			var oneCarriage = null;
    			var id = null;
    			for(var i = 0 ; i < length ; i++ ){
    				oneCarriage = results[i];
    				id = oneCarriage.id;
    				if(mouldId == id){
    					jobj.append('<option selected ="true" value="'+id+'">'+oneCarriage.mouldName+'</option>');
    				}else{
    					jobj.append('<option value="'+id+'">'+oneCarriage.mouldName+'</option>');
    				}
    				
    			}
    		}
    	},"json");
    }
    
    function initCategory(){
   	   // 获取三级类目ID
       var category3 = $("#update_category_3_id").val();
       if(category3 && category3 != ''){
	       	var category2 = null;
	       	var category1 = null;
	       	// 查询三级类目
	       	$.post(window.config.queryCatalogById,{id:category3},function(data){
	       		if(data.success){
	       			category2 = data.result.parentId;
	       			$.post(window.config.queryCatalogById,{id:category2},function(resp){
	               		if(resp.success){
	               			category1 = resp.result.parentId;
	               		    //加载一级类目
	                        loadCatalog($("select[name='category-1']"),null,category1);
	                        //加载一级类目
	                        loadCatalog($("select[name='category-2']"),category1,category2);
	                        //加载一级类目
	                        loadCatalog($("select[name='category-3']"),category2,category3);
	               		}
	               	},"json");
	       		}
	       	},"json");
       }else{
       	  //加载一级类目
           loadCatalog($("select[name='category-1']"),null,null);
       }
   }
    
}); 