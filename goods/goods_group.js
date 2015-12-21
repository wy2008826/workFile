$(function(){

    function App(){
        this.init();//后台拉取小组列表  (init负责页面的结构展现,一切需要在第一时间执行的功能都可以写在init里面  )
        this.searchAndClear();//小组搜索和输入框内容清空功能
        this.addGroup();//新增小组
    };

    App.prototype={
        init:function(){
            // 加载分组列表页
            tools.load({url:window.configs.selectProductGroup,id:'#group_context'});
            window.PixelAdmin.start();
        },
        searchAndClear:function(){
            //点击搜索小组
            $("#searhGroupBtn").click(function(){
                var groupName = $("#groupSearchValue").val();
                tools.load({url:window.configs.selectProductGroup,id:'#group_context',param:{name:groupName}});
            });

            //清空小组输入框内容
            $("#searchGroupReset").click(function(){
                $("#groupSearchValue").val("");
            });
        },
        addGroup:function(){
            $("#addNewGroup").on("click",function(){
                var html=hTpl.groupAdd({"label":"分组名称","id":"groupAddValue"});
                bootbox.dialog({
                    message:html,
                    title:"添加分组",
                    buttons: {
                        success: {
                            label: "确定",
                            className: "btn-primary",
                            callback: function() {
                                var groupName=$("#groupAddValue").val();
                               $.post(window.configs.addProductGroup,{name:groupName},function(data){
                                   if(data.success){
                                       tools.load({url:window.configs.selectProductGroup,id:'#group_context'});
                                   }
                               },"json");
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
            });
        }
    }

    var app=new App();
});