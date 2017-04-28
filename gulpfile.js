/*
 * @Author: iceStone
 * @Date:   2016-01-25 18:54:36
 * @Last Modified by:   iceStone
 * @Last Modified time: 2016-01-26 14:16:10
 */

'use strict';




/*
npm install gulp-uglify --save -dev          //js压缩插件

npm install gulp-concat --save -dev          //js合并插件

npm install gulp-cssnano --save -dev         //css压缩插件

npm install gulp-less --save -dev            //less文件编译

npm install gulp-imagemin --save -dev        //图片压缩插件

npm install gulp-htmlmin --save -dev         //html压缩插件

npm install del --save -dev                  //文件删除模块*/

/*
/!*基本使用*!/
var gulp = require('gulp'),
    imagemin = require('gulp-imagemin');

gulp.task('test', function () {
    gulp.src('src/img/!*.{png,jpg,gif,ico}')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});
*/



/*gulp-imagemin其他参数*/
/*var gulp = require('gulp'),
    imagemin = require('gulp-imagemin');

gulp.task('testImagemin', function () {
    gulp.src('src/img/!*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('dist/img'));
});*/



/*深度压缩图片*/
var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
//确保本地已安装imagemin-pngquant [cnpm install imagemin-pngquant --save-dev]
    pngquant = require('imagemin-pngquant');

gulp.task('test', function () {
    gulp.src('src/images/*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
            use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
        }))
        .pipe(gulp.dest('dist/img'));
});


/*使用gulp-htmlmin压缩html，可以压缩页面javascript、css，去除页面空格、注释，删除多余属性等操作。*/
var htmlmin = require('gulp-htmlmin');
/*基本使用*/
gulp.task('testHtmlmin', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('src/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/html'));
});







/*使用gulp-less插件将less文件编译成css，当有less文件发生改变自动编译less，并保证less语法错误或出现异常时能正常工作并提示错误信息。*/

var less = require("gulp-less");
/*基本使用*/
gulp.task('testless',function(){
   /* gulp.src('src/less/!*.less')
        .pipe(less())
        .pipe(gulp.dest('dist/css'));*/

  /*  gulp.src(['src/less/index.less','src/less/detail.less']) //多个文件以数组形式传入
        .pipe(less())
        .pipe(gulp.dest('src/css')); //将会在src/css下生成index.css以及detail.css
*/
    //编译src目录下的所有less文件
    //除了reset.less和test.less（**匹配src/less的0个或多个子文件夹）
    gulp.src(['src/less/*.less', '!src/less/**/{reset,test}.less'])
        .pipe(less())
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream());//文件有更新自动执行
});



/*使用gulp-concat合并javascript css html文件，减少网络请求。*/
var concat = require('gulp-concat');

gulp.task('testconcat',function(){
    gulp.src('src/js/*.js')
        .pipe(concat('all.js'))//合并后的文件名
        .pipe(gulp.dest('dist/js'));
});


/*使用gulp-uglify压缩javascript文件，减小文件大小。*/
var uglify = require('gulp-uglify');
gulp.task('jsmin',function(){
    /*基本使用*/
    gulp.src('src/js/index.js')
        .pipe(uglify())//压缩js文件
        .pipe(gulp.dest('dist/js'));
/*
    /!*压缩多个js文件*!/
    gulp.src(['src/js/index.js','src/js/detail.js']) //多个文件以数组形式传入
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));*/

    /*//压缩src/js目录下的所有js文件
    //除了test1.js和test2.js（**匹配src/js的0个或多个子文件夹）
    gulp.src(['src/js/!*.js', '!src/js/!**!/{test1,test2}.js'])
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));*/

   /* gulp.src(['src/js/!*.js', '!src/js/!**!/{test1,test2}.js'])
        .pipe(uglify({
            mangle: true,//类型：Boolean 默认：true 是否修改变量名
            compress: true,//类型：Boolean 默认：true 是否完全压缩
            preserveComments: 'all' //保留所有注释
        }))
        .pipe(gulp.dest('dist/js'));*/

});


/*使用gulp-minify-css压缩css文件，减小文件大小，并给引用url添加版本号避免缓存。重要：gulp-minify-css已经被废弃，请使用gulp-clean-css，用法一致。*/
var cssmin = require('gulp-minify-css');
gulp.task('testCssmin', function () {

    /*基本使用*/
    gulp.src('src/css/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'));
    /*加参数的高级用法*/
   /* gulp.src('src/css/!*.css')
        .pipe(cssmin({
            advanced: false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie7',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: true,//类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'
            //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(gulp.dest('dist/css'));*/


});

/*使用gulp-clean-css压缩css文件,和gulp-minify-css(已废弃)用法一致*/
var cleancss = require('gulp-clean-css');

gulp.task('minifycss', function() {
    return gulp.src('styles/*.css')
        .pipe(cleancss({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'));
});

/*使用gulp-cssnano压缩css文件*/
var cssnano = require('gulp-cssnano');

gulp.task('default', function() {
    return gulp.src('src/main.css')
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css'));
});




/*你也许听过 LiveReload ，一个监听文件变化的工具并能自动刷新服务。如果仅仅是样式的改变都不需要重新加载。一旦有改变页面立即刷新。

 然而 BrowserSync 更进一步：它能实现LiveReload所有功能，但是不需要安装浏览器插件并且它可以在所有连接的浏览器上同步操作例如滚动，点击，刷新或填充表单。
 移动设备上也同样有效。BrowserSync甚至支持开发服务器。这就是我在开发服务器上只用BrowserSync来实现实时刷新的原因。*/
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

// 静态服务器
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./src",
            index:'index.html'
        }
    });
    /*监听html文件的变化*/
    gulp.watch("src/*.html").on("change",reload);
    /*监听css sass less的变化*/
   /* gulp.watch("src/css/!*.css",['testCssmin']);*/
    gulp.watch("src/css/*.css").on("change",reload);
    /*监听js的变化*/
    /*gulp.watch("src/js/!*.js",['testconcat']);*/
    gulp.watch("src/js/*.js").on("change",reload);
   /* gulp.watch('js/!*.js', ['scripts']);         //监控文件变化，自动更新
    gulp.watch('style/!*.css', ['style']);
    gulp.watch('images/!*.*', ['image']);
    gulp.watch('*.html', ['html']);*/
});


gulp.task('browser-sync2', function() {
    var files = [
        'src/*.html',
        'src/*.css',
        'src/*.js'
    ];
    browserSync.init(files,{
        server: {
            baseDir: "./src",
            index:'index.html'
        }
    });
});

// 代理
/*gulp.task('browser-sync1', function() {
    browserSync.init({
        proxy: "192.168.20.185"//域名或者IP地址
    });
});*/
/*gulp.task('default',['browser-sync1']); //定义默认任务*/




/*
/!*只压缩修改的图片。压缩图片时比较耗时，在很多情况下我们只修改了某些图片，没有必要压缩所有图片，使用”gulp-cache”只压缩修改的图片，没有修改的图片直接从缓存文件读取（C:\Users\Administrator\AppData\Local\Temp\gulp-cache）。*!/
var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
//确保本地已安装gulp-cache [cnpm install gulp-cache --save-dev]
    cache = require('gulp-cache');

gulp.task('testImagemin', function () {
    gulp.src('src/img/!*.{png,jpg,gif,ico}')
        .pipe(cache(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'));
});*/
