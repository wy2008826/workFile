$(function(){


    var App=function(){
        this.init();//有关页面加载后需要第一时间执行的功能 放在init里面
        this.editGroup();//编辑小组
        this.delGroup();//删除小组
    }

    App.prototype={
        init:function(){

        },
        editGroup:function(){
            $("#table-list").on("click",".edit",function(){
                var value=$(this).closest("tr").find("td:first-child").html();
                var html=hTpl.groupAdd({"label":"分组名称","id":"groupEditValue","value":value});
                var curObj = $(this);
                bootbox.dialog({
                    message:html,
                    title:"编辑",
                    buttons: {
                        success: {
                            label: "确定",
                            className: "btn-primary",
                            callback: function() {
                                var groupName=$("#groupEditValue").val();
                                var groupid = curObj.attr("groupid");
                                $.post(window.configs.updateProductGroup,{name:groupName,groupId:groupid});
                                $("#groupName_"+groupid).html(groupName);
                                console.log(window.configs.updateProductGroup);
                            }
                        },
                        danger:{
                            label:"取消",
                            className:"btn",
                            callback:function(){
                                
                            }
                        }
                    },
                    className: "bootbox-lg"
                });
            })
        },
        delGroup:function(){
            $("#table-list").on("click",".del",function(){
                var that=this;
                bootbox.dialog({
                    message:"确定删除该分组？",
                    buttons: {
                        success: {
                            label: "确定",
                            className: "btn-primary",
                            callback: function() {
                               var groupid = $(that).attr("groupid");
                               $.post(window.configs.deleteProductGroup,{groupId:groupid});
                               $(that).parent().parent().remove();
                            }
                        },
                        danger:{
                            label:"取消",
                            className:"btn",
                            callback:function(){
                                
                            }
                        }
                    },
                    className: "bootbox-sm"
                });

            });
        }
    }
    

    var app=new App();
});
