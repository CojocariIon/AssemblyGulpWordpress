const 
	{ src, dest, watch, parallel, series } 		= require('gulp'),
	less 										= require('gulp-less'), // // модуль для компиляции Less (Less) в CSS
	// sass 									= require('gulp-sass'), // // модуль для компиляции sass (sass) в CSS
	babel 										= require('gulp-babel'),
	uglify 										= require('gulp-uglify'),
    	include 									= require('gulp-include'),
	notify 									 	= require('gulp-notify'),
	postcss										= require('gulp-postcss'),
	cleanCss									= require('gulp-clean-css'),
	imagemin									= require('gulp-imagemin'),
	smartgrid 									= require('smart-grid'),
	groupCssMQ 									= require('gulp-group-css-media-queries'),
	autoprefixer									= require('gulp-autoprefixer'), // модуль для автоматической установки автопрефиксов
	sourcemap									= require('gulp-sourcemaps'), // модуль для генерации карты исходных файлов
	browserSync								 	= require('browser-sync'),
	reload									 	= browserSync.reload;


 
/* It's principal settings in smart grid project */
let settings = {
    outputStyle: 'less', /* less || scss || sass || styl */
    columns: 12, /* number of grid columns */
    offset: '0px', /* gutter width px || % || rem */
    mobileFirst: false, /* mobileFirst ? 'min-width' : 'max-width' */
    container: {
        maxWidth: '1180px', /* max-width оn very large screen */
        fields: '30px' /* side fields */
    },
    breakPoints: {
        lg: {
            width: '1180px', /* -> @media (max-width: 1100px) */
        },
        md: {
            width: '992px'
        },
        sm: {
            width: '768px',
            fields: '15px' /* set fields only if you want to change container.fields */
        },
        xs: {
            width: '576px'
        }
        /* 
        We can create any quantity of break points.
 
        some_name: {
            width: 'Npx',
            fields: 'N(px|%|rem)',
            offset: 'N(px|%|rem)'
        }
        */
    }
};
 
smartgrid('project/assets/less/', settings);


function task_hello(cb){
	console.log('Hello Johan');
	cb();
}

function task_php(cb){
	src('project/**/*.php')
	.pipe(notify('php'))
	.pipe(dest('../project.dev'))
	.pipe(reload({stream:true}));
	cb();
}

function task_less(cb){
	src('project/assets/less/**/*.less')
	.pipe(sourcemap.init())
	.pipe(less())
	.pipe(notify('Less'))
	.pipe(autoprefixer({
            browsers: ['last 18 versions']
        }))
	.pipe(groupCssMQ())
	.pipe(cleanCss())
	.pipe(sourcemap.write())
	.pipe(dest('../project.dev/css'))
	.pipe(reload({stream:true}));
	cb();
}

function task_less2(cb){
	src('project/*.less')
	.pipe(sourcemap.init())
	.pipe(autoprefixer({
        browsers: ['last 18 versions']
    }))
    .pipe(groupCssMQ())
	.pipe(cleanCss())
	.pipe(less())
	.pipe(notify('Less'))
	.pipe(sourcemap.write())
	.pipe(dest('../project.dev/'))
	.pipe(reload({stream:true}));
	cb();
}

function task_js(cb){
	src('project/assets/js/**/*.js')
	.pipe(include())
	.pipe(sourcemap.init())
	.pipe(notify('js'))
	.pipe(babel({
		presets: ['@babel/env']
	}))
	.pipe(uglify())
	.pipe(sourcemap.write())
	.pipe(dest('../project.dev/js'))
	.pipe(reload({stream:true}));
	cb();
}

function task_img(cb){
	src('project/assets/img/**/*.*')
	.pipe(imagemin({
    interlaced: true,
    progressive: true,
    optimizationLevel: 5,
    svgoPlugins: [
        {
            removeViewBox: true
        }
    ]
	}))
	.pipe(dest('../project.dev/img'))
	.pipe(reload({stream:true}));
	cb();
}

function task_fonts(cb){
	src('project/assets/fonts/**/*.*')
	.pipe(dest('../project.dev/fonts/'))
	.pipe(reload({stream:true}));
	cb();
}

function task_server(done) {
		browserSync.init({
	    server: {
	    	baseDir: "../project.dev",
	    	proxy: '../project.dev'
	    }
	  });
  done();
}

function task_watch(done){
	watch('project/**/*.php',     					task_php);
    watch('project/assets/less/**/*.less',      	task_less);
    watch('project/**/*.less',   					task_less2);
    watch('project/assets/js/**/*.js',   			task_js);
    watch('project/assets/img/**/*.*',    			task_img);
    watch('project/assets/fonts/**/*.*',      		task_fonts);
 done();
}


exports.task_hello		= task_hello;
exports.task_php		= task_php;
exports.task_less		= task_less;
exports.task_less2		= task_less2;
exports.task_js			= task_js;
exports.task_img		= task_img;
exports.task_fonts		= task_fonts;
// exports.default			= parallel(task_hello, task_php, task_less, task_less2, task_js, task_img, task_fonts, server);
exports.default 		= series(task_server, parallel(task_hello, task_php, task_less, task_less2, task_js, task_img, task_fonts));
exports.watch			= series(task_server,  task_watch,  parallel(task_hello, task_php, task_less, task_less2, task_js, task_img, task_fonts));
