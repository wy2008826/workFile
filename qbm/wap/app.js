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

// 买标
app.get("/financing/detail.html",function(req,res,next){
	res.render("./financing/detail");
});
app.get("/financing/assetsList.html",function(req,res,next){
	res.render("./financing/assetsList");
});
app.get("/financing/buy.html",function(req,res,next){
	res.render("./financing/buy");
});
app.get("/financing/detailSub.html",function(req,res,next){
	res.render("./financing/detailSub");
});
app.get("/financing/purchaseRecords.html",function(req,res,next){
	res.render("./financing/purchaseRecords");
});
app.get("/financing/success.html",function(req,res,next){
	res.render("./financing/success");
});

// 密码管理
app.get("/passport/login.html",function(req,res,next){
	res.render("./passport/login");
});
app.get("/passport/reg.html",function(req,res,next){
	res.render("./passport/reg");
});
app.get("/passport/regAuthentication.html",function(req,res,next){
	res.render("./passport/regAuthentication");
});
app.get("/passport/enterPwd.html",function(req,res,next){
	res.render("./passport/enterPwd");
});
app.get("/passport/success.html",function(req,res,next){
	res.render("./passport/success");
});
app.get("/passport/forgetPayPwd.html",function(req,res,next){
	res.render("./passport/forgetPayPwd");
});
app.get("/passport/modifyLoginPwd.html",function(req,res,next){
	res.render("./passport/modifyLoginPwd");
});
app.get("/passport/modifyPayPwd.html",function(req,res,next){
	res.render("./passport/modifyPayPwd");
});


// 个人中心
app.get("/member/index.html",function(req,res,next){
	res.render("./member/index");
});
app.get("/member/setting.html",function(req,res,next){
	res.render("./member/setting");
});
app.get("/member/recharge.html",function(req,res,next){
	res.render("./member/rechargeBound");
});
app.get("/member/bankList.html",function(req,res,next){
	res.render("./member/bankList");
});

app.get("/member/cash.html",function(req,res,next){
	res.render("./member/cash");
});
app.get("/member/cashRule.html",function(req,res,next){
	res.render("./member/cashRule");
});
app.get("/member/cashRecord.html",function(req,res,next){
	res.render("./member/cashRecord");
});
app.get("/member/authentication.html",function(req,res,next){
	res.render("./member/authentication");
});

app.get("/member/dealDetail.html",function(req,res,next){
	res.render("./member/dealDetail");
});
app.get("/member/investmentRecordAll.html",function(req,res,next){
	res.render("./member/investmentRecordAll");
});
app.get("/member/redPacket.html",function(req,res,next){
	res.render("./member/redPacket");
});
app.get("/member/invite.html",function(req,res,next){
	res.render("./member/invite");
});
app.get("/member/redPacket.html",function(req,res,next){
	res.render("./member/redPacket");
});
app.get("/member/contact.html",function(req,res,next){
	res.render("./member/contact");
});


app.listen(3000);