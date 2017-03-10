//express的核心是http模块

var http=require("http");
var path=require("path");
var express=require("express");
var app=express();
var html=require("ejs");


app.use(express.static(path.resolve(__dirname+"/statics")));//设置静态资源路径
app.set("view engine","ejs");//设置模板引擎
app.set("views",path.resolve(__dirname+"/view"));//设置视图路径

// var routes=require("./routes/route")(app);//定义路由文件
app.get("/",function(req,res,next){
	res.render("index");
});
app.get("/index.html",function(req,res,next){
	res.render("index");
});
app.get("/financing/detail.html",function(req,res,next){
	res.render("./financing/detail");
});


app.listen(3000);