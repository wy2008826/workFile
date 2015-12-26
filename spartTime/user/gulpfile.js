var gulp=require("gulp");
//需要安装gulp-load-plugins在本地项目中
var gulpLoadPlugins=require("gulp-load-plugins");

var plugins=gulpLoadPlugins();
var cssMin=require("gulp-minify-css");


/****src**
	1.支持多路径的数组集合
	2、支持模糊深度  ** / *   模糊深度会保持源文件的路径深度和和目标文件的路径深度一致 
		** 和***以及** /*的区别
//	3.支持！排除   如!src/css/sass/folder2/*.scss
*/

	//sass模块
gulp.task("scss",function(){
	gulp.src(["src/sass/**/*.scss","!src/sass/ignore/*.scss"])
	.pipe(plugins.scss())
	.pipe(gulp.dest("public/css"));
});

	//clean模块  删除文件和文件夹 ***删除文件和文件夹(文件夹有内容也会删除) **删除文件和空文件夹
gulp.task("cleanAll",function(){
	// gulp.src(["dis/css/***","dis/js/*.js"])
	// .pipe(plugins.clean());
});

gulp.task("mobilescrollJs",function(){
	gulp.src(["public/js/plugins/mobilescroll/utils/mobiscroll.core.js"
		,"public/js/plugins/mobilescroll/utils/mobiscroll.widget.js"
		,"public/js/plugins/mobilescroll/utils/mobiscroll.scroller.js"
		,"public/js/plugins/mobilescroll/utils/mobiscroll.util.datetime.js"
		,"public/js/plugins/mobilescroll/utils/mobiscroll.datetimebase.js"
		,"public/js/plugins/mobilescroll/utils/mobiscroll.widget.ios.js"
		,"public/js/plugins/mobilescroll/utils/mobiscroll.i18n.zh.js"
		])
	.pipe(plugins.concat("mobilescroll.min.js"))
	.pipe(plugins.uglify())
	.pipe(gulp.dest("public/js/plugins/mobilescroll/"));
});

gulp.task("mobilescrollCss",function(){
	gulp.src(["public/css/plugins/mobilescroll/utils/mobiscroll.animation.css"
		,"public/css/plugins/mobilescroll/utils/mobiscroll.widget.css"
		,"public/css/plugins/mobilescroll/utils/mobiscroll.widget.ios.css"
		,"public/css/plugins/mobilescroll/utils/mobiscroll.scroller.css"
		,"public/css/plugins/mobilescroll/utils/mobiscroll.scroller.ios.css"
		])
	.pipe(plugins.concat("mobilescroll.min.css"))
	.pipe(cssMin())
	.pipe(gulp.dest("public/css/plugins/mobilescroll/"));
});

gulp.task("dropzoneMin",function(){
	gulp.src(["public/js/plugins/dropzone/dropzone.js"])
	.pipe(plugins.concat("dropzone.min.js"))
	.pipe(plugins.uglify())
	.pipe(gulp.dest("public/js/plugins/dropzone/"));

	gulp.src(["public/css/plugins/dropzone/dropzone.css"])
	.pipe(plugins.concat("dropzone.min.css"))
	.pipe(cssMin())
	.pipe(gulp.dest("public/css/plugins/dropzone/"));

});

//watch 和run方法
gulp.task("watch",function(){
	gulp.watch("src/sass/**/*.scss",function(){
		gulp.run("scss");
	});
});