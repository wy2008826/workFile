var gulp=require("gulp");
//需要安装gulp-load-plugins在本地项目中
var gulpLoadPlugins=require("gulp-load-plugins");

var plugins=gulpLoadPlugins();
var cssMin=require("gulp-minify-css");

// gulp.task("minify",function(){
// 	gulp.src("src/js/*.js")
// 	.pipe(plugins.uglify())
// 	.pipe(gulp.dest("dis/js"))
// });

/****src**
	1.支持多路径的数组集合
	2、支持模糊深度  ** / *   模糊深度会保持源文件的路径深度和和目标文件的路径深度一致 
		** 和***以及** /*的区别
//	3.支持！排除   如!src/css/sass/folder2/*.scss

	** / *     代表任何深度下的某种文件                任务scss
	***.scss   代表当前目录下的所有scss文件            任务scssA
	***        代表当前目录下的所有文件和文件夹        任务cleanAll
	*.scss     代表当前目录下的所有scss文件            任务scssB
	！         代表非，排除某种文件或者结构            任务scssNot

*/

	//sass模块
gulp.task("scss",function(){
	gulp.src(["src/sass/**/*.scss","!src/sass/ignore/*.scss"])
	.pipe(plugins.scss())
	// .pipe(cssMin())
	.pipe(gulp.dest("public/css/page"));
});




//watch 和run方法
gulp.task("watch",function(){
	gulp.watch("src/**/*.scss",function(){
		gulp.run("scss");
	});
});
