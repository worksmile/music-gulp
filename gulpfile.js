var gulp = require('gulp'); //gulp主组件
var htmlclean = require('gulp-htmlclean'); //html压缩组件
var imagemin = require('gulp-imagemin'); //image压缩组件
var jsuglify = require('gulp-uglify'); //js压缩组件
var jsStripDebug = require('gulp-strip-debug'); //去除js中的调试语句(console/debugger)
var jsConcat = require('gulp-concat'); //连接多个js
var less = require('gulp-less'); //less转css
var autoprefixer= require('autoprefixer'); //css3自动添加前缀
var postcss= require('gulp-postcss'); //PostCSS把扩展的语法和特性转换成现代的浏览器友好的CSS
var cssnano = require('cssnano');//css压缩
var connect = require('gulp-connect');//开一个模拟的服务器

//判断是开发环境还是生产环境
var devMode = process.env.NODE_ENV =="development";

var folder = {
	src: 'src/', //开发目录文件夹
	dist: 'dist/' //压缩打包后文件夹
};
//压缩html
gulp.task('html', function() {
    // var page = gulp.src(folder.src + 'html/*');
    // page.pipe(connect.reload());  //改变自动刷新
    // if(devMode){
    //     page.pipe(htmlclean()) //变成文件流操作
    // }
    // page.pipe(gulp.dest(folder.dist + 'html/'));

    var page = gulp.src(folder.src + 'html/*')
    .pipe(connect.reload())  //改变自动刷新
    .pipe(htmlclean()) //变成文件流操作
    .pipe(gulp.dest(folder.dist + 'html/'));
});
//压缩图片
gulp.task('images', function() {
    gulp.src(folder.src + 'images/*')
    .pipe(imagemin())
    .pipe(gulp.dest(folder.dist + 'images/'));
});
//压缩js
gulp.task('js', function() {
    var page = gulp.src(folder.src + 'js/*');
    page.pipe(connect.reload());
    if(devMode){
        page.pipe(jsStripDebug())
		//.pipe(jsConcat('main.js')) //最终把所有的js拼接到main.js中
		.pipe(jsuglify())
    }
    page.pipe(gulp.dest(folder.dist + 'js/'));

    //  gulp.src(folder.src + 'js/*')
    //     .pipe(connect.reload())
    //     .pipe(jsStripDebug())
	// 	.pipe(jsConcat('main.js')) //最终把所有的js拼接到main.js中
	// 	.pipe(jsuglify())
    //     .pipe(gulp.dest(folder.dist + 'js/'));
});
//压缩css
gulp.task('less', function() {
    var options = [autoprefixer(),cssnano()];
    var page = gulp.src(folder.src + 'css/*')
                .pipe(connect.reload())
                .pipe(less())
                .pipe(postcss([require('autoprefixer'),require('cssnano')]))
                .pipe(postcss(options))
    // if(devMode){
    //     page
        
    // }   
                .pipe(gulp.dest(folder.dist + 'css/'));

});
//监听文件自动构建
gulp.task('watch',function(){
    gulp.watch(folder.src + "html/*",['html']);
    gulp.watch(folder.src + "js/*",['js']);
    gulp.watch(folder.src + "css/*",['less']);
    gulp.watch(folder.src + "images/*",['images']);
})

gulp.task('server',function(){
    connect.server({
        port: 8090,
        //文件更改后自动刷新页面
        livereload: true,
    });
})
//执行
gulp.task('default', [ 'html', 'images', 'js', 'less' ,'watch','server']);
