$(function(){
	
	//编辑 复制 删除功能
    var App=function(){

        this.init();
        this.delRow();//删除一行数据
    }

    App.prototype={
        init:function(){
            window.PixelAdmin.start();
        },
        delRow:function(){
            $("#table-list").on("click",".del",function(){//删除
                var that=this;
                bootbox.dialog({
                    message:"确定删除？",
                    buttons: {
                        success: {
                            label: "确定",
                            className: "btn-primary",
                            callback: function() {
                                $.post(window.config.deleteBussMould,{id:$(that).attr("mould_id_data")});
                                $(that).closest("tr").remove();
                            }
                        },
                        danger:{
                            label:"取消",
                            className:"btn"
                        }
                    },
                    className: "bootbox-sm"
                });
                
            });
        }
    }


    var app=new App();


});