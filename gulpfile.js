/*
 * @Author: iceStone
 * @Date:   2016-01-25 18:54:36
 * @Last Modified by:   iceStone
 * @Last Modified time: 2016-01-26 14:16:10
 */

'use strict';




/*
npm install gulp-uglify --save -dev          //jsѹ�����

npm install gulp-concat --save -dev          //js�ϲ����

npm install gulp-cssnano --save -dev         //cssѹ�����

npm install gulp-less --save -dev            //less�ļ�����

npm install gulp-imagemin --save -dev        //ͼƬѹ�����

npm install gulp-htmlmin --save -dev         //htmlѹ�����

npm install del --save -dev                  //�ļ�ɾ��ģ��*/

/*
/!*����ʹ��*!/
var gulp = require('gulp'),
    imagemin = require('gulp-imagemin');

gulp.task('test', function () {
    gulp.src('src/img/!*.{png,jpg,gif,ico}')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});
*/



/*gulp-imagemin��������*/
/*var gulp = require('gulp'),
    imagemin = require('gulp-imagemin');

gulp.task('testImagemin', function () {
    gulp.src('src/img/!*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            optimizationLevel: 5, //���ͣ�Number  Ĭ�ϣ�3  ȡֵ��Χ��0-7���Ż��ȼ���
            progressive: true, //���ͣ�Boolean Ĭ�ϣ�false ����ѹ��jpgͼƬ
            interlaced: true, //���ͣ�Boolean Ĭ�ϣ�false ����ɨ��gif������Ⱦ
            multipass: true //���ͣ�Boolean Ĭ�ϣ�false ����Ż�svgֱ����ȫ�Ż�
        }))
        .pipe(gulp.dest('dist/img'));
});*/



/*���ѹ��ͼƬ*/
var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
//ȷ�������Ѱ�װimagemin-pngquant [cnpm install imagemin-pngquant --save-dev]
    pngquant = require('imagemin-pngquant');

gulp.task('test', function () {
    gulp.src('src/images/*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],//��Ҫ�Ƴ�svg��viewbox����
            use: [pngquant()] //ʹ��pngquant���ѹ��pngͼƬ��imagemin���
        }))
        .pipe(gulp.dest('dist/img'));
});


/*ʹ��gulp-htmlminѹ��html������ѹ��ҳ��javascript��css��ȥ��ҳ��ո�ע�ͣ�ɾ���������ԵȲ�����*/
var htmlmin = require('gulp-htmlmin');
/*����ʹ��*/
gulp.task('testHtmlmin', function () {
    var options = {
        removeComments: true,//���HTMLע��
        collapseWhitespace: true,//ѹ��HTML
        collapseBooleanAttributes: true,//ʡ�Բ������Ե�ֵ <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//ɾ�����пո�������ֵ <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//ɾ��<script>��type="text/javascript"
        removeStyleLinkTypeAttributes: true,//ɾ��<style>��<link>��type="text/css"
        minifyJS: true,//ѹ��ҳ��JS
        minifyCSS: true//ѹ��ҳ��CSS
    };
    gulp.src('src/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/html'));
});







/*ʹ��gulp-less�����less�ļ������css������less�ļ������ı��Զ�����less������֤less�﷨���������쳣ʱ��������������ʾ������Ϣ��*/

var less = require("gulp-less");
/*����ʹ��*/
gulp.task('testless',function(){
   /* gulp.src('src/less/!*.less')
        .pipe(less())
        .pipe(gulp.dest('dist/css'));*/

  /*  gulp.src(['src/less/index.less','src/less/detail.less']) //����ļ���������ʽ����
        .pipe(less())
        .pipe(gulp.dest('src/css')); //������src/css������index.css�Լ�detail.css
*/
    //����srcĿ¼�µ�����less�ļ�
    //����reset.less��test.less��**ƥ��src/less��0���������ļ��У�
    gulp.src(['src/less/*.less', '!src/less/**/{reset,test}.less'])
        .pipe(less())
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream());//�ļ��и����Զ�ִ��
});



/*ʹ��gulp-concat�ϲ�javascript css html�ļ���������������*/
var concat = require('gulp-concat');

gulp.task('testconcat',function(){
    gulp.src('src/js/*.js')
        .pipe(concat('all.js'))//�ϲ�����ļ���
        .pipe(gulp.dest('dist/js'));
});


/*ʹ��gulp-uglifyѹ��javascript�ļ�����С�ļ���С��*/
var uglify = require('gulp-uglify');
gulp.task('jsmin',function(){
    /*����ʹ��*/
    gulp.src('src/js/index.js')
        .pipe(uglify())//ѹ��js�ļ�
        .pipe(gulp.dest('dist/js'));
/*
    /!*ѹ�����js�ļ�*!/
    gulp.src(['src/js/index.js','src/js/detail.js']) //����ļ���������ʽ����
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));*/

    /*//ѹ��src/jsĿ¼�µ�����js�ļ�
    //����test1.js��test2.js��**ƥ��src/js��0���������ļ��У�
    gulp.src(['src/js/!*.js', '!src/js/!**!/{test1,test2}.js'])
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));*/

   /* gulp.src(['src/js/!*.js', '!src/js/!**!/{test1,test2}.js'])
        .pipe(uglify({
            mangle: true,//���ͣ�Boolean Ĭ�ϣ�true �Ƿ��޸ı�����
            compress: true,//���ͣ�Boolean Ĭ�ϣ�true �Ƿ���ȫѹ��
            preserveComments: 'all' //��������ע��
        }))
        .pipe(gulp.dest('dist/js'));*/

});


/*ʹ��gulp-minify-cssѹ��css�ļ�����С�ļ���С����������url��Ӱ汾�ű��⻺�档��Ҫ��gulp-minify-css�Ѿ�����������ʹ��gulp-clean-css���÷�һ�¡�*/
var cssmin = require('gulp-minify-css');
gulp.task('testCssmin', function () {

    /*����ʹ��*/
    gulp.src('src/css/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'));
    /*�Ӳ����ĸ߼��÷�*/
   /* gulp.src('src/css/!*.css')
        .pipe(cssmin({
            advanced: false,//���ͣ�Boolean Ĭ�ϣ�true [�Ƿ����߼��Ż����ϲ�ѡ�����ȣ�]
            compatibility: 'ie7',//����ie7�����¼���д�� ���ͣ�String Ĭ�ϣ�''or'*' [���ü���ģʽ�� 'ie7'��IE7����ģʽ��'ie8'��IE8����ģʽ��'*'��IE9+����ģʽ]
            keepBreaks: true,//���ͣ�Boolean Ĭ�ϣ�false [�Ƿ�������]
            keepSpecialComments: '*'
            //������������ǰ׺ ������autoprefixer���ɵ������ǰ׺�������������������п��ܽ���ɾ����Ĳ���ǰ׺
        }))
        .pipe(gulp.dest('dist/css'));*/


});

/*ʹ��gulp-clean-cssѹ��css�ļ�,��gulp-minify-css(�ѷ���)�÷�һ��*/
var cleancss = require('gulp-clean-css');

gulp.task('minifycss', function() {
    return gulp.src('styles/*.css')
        .pipe(cleancss({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'));
});

/*ʹ��gulp-cssnanoѹ��css�ļ�*/
var cssnano = require('gulp-cssnano');

gulp.task('default', function() {
    return gulp.src('src/main.css')
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css'));
});




/*��Ҳ������ LiveReload ��һ�������ļ��仯�Ĺ��߲����Զ�ˢ�·��������������ʽ�ĸı䶼����Ҫ���¼��ء�һ���иı�ҳ������ˢ�¡�

 Ȼ�� BrowserSync ����һ��������ʵ��LiveReload���й��ܣ����ǲ���Ҫ��װ���������������������������ӵ��������ͬ��������������������ˢ�»�������
 �ƶ��豸��Ҳͬ����Ч��BrowserSync����֧�ֿ�������������������ڿ�����������ֻ��BrowserSync��ʵ��ʵʱˢ�µ�ԭ��*/
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

// ��̬������
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./src",
            index:'index.html'
        }
    });
    /*����html�ļ��ı仯*/
    gulp.watch("src/*.html").on("change",reload);
    /*����css sass less�ı仯*/
   /* gulp.watch("src/css/!*.css",['testCssmin']);*/
    gulp.watch("src/css/*.css").on("change",reload);
    /*����js�ı仯*/
    /*gulp.watch("src/js/!*.js",['testconcat']);*/
    gulp.watch("src/js/*.js").on("change",reload);
   /* gulp.watch('js/!*.js', ['scripts']);         //����ļ��仯���Զ�����
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

// ����
/*gulp.task('browser-sync1', function() {
    browserSync.init({
        proxy: "192.168.20.185"//��������IP��ַ
    });
});*/
/*gulp.task('default',['browser-sync1']); //����Ĭ������*/




/*
/!*ֻѹ���޸ĵ�ͼƬ��ѹ��ͼƬʱ�ȽϺ�ʱ���ںܶ����������ֻ�޸���ĳЩͼƬ��û�б�Ҫѹ������ͼƬ��ʹ�á�gulp-cache��ֻѹ���޸ĵ�ͼƬ��û���޸ĵ�ͼƬֱ�Ӵӻ����ļ���ȡ��C:\Users\Administrator\AppData\Local\Temp\gulp-cache����*!/
var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
//ȷ�������Ѱ�װgulp-cache [cnpm install gulp-cache --save-dev]
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
