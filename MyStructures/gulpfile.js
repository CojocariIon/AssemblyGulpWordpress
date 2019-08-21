const 
	{gulp, series, src, dest, parallel, watch}	    	= require('gulp'),
	sass 												= require('gulp-sass'),
	autoprefixer 										= require('gulp-autoprefixer'),
	sourcemaps											= require('gulp-sourcemaps'),
	remember 											= require('gulp-remember'),
	rigger												= require('gulp-rigger'),
	del 												= require('del');

// Smart-Grid

var smartgrid = require('smart-grid');
 
/* It's principal settings in smart grid project */
var settings = {
    outputStyle: 'sass', /* less || scss || sass || styl */
    columns: 12, /* number of grid columns */
    offset: '30px', /* gutter width px || % || rem */
    mobileFirst: false, /* mobileFirst ? 'min-width' : 'max-width' */
    container: {
        maxWidth: '1300px', /* max-width оn very large screen */
        fields: '30px' /* side fields */
    },
    breakPoints: {
        lg: {
            width: '1100px', /* -> @media (max-width: 1100px) */
        },
        md: {
            width: '960px'
        },
        sm: {
            width: '780px',
            fields: '15px' /* set fields only if you want to change container.fields */
        },
        xs: {
            width: '560px'
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
 
smartgrid('./src/assets/sass/', settings);

// Setting Poject
const nameFolderProject = 'dist';

function taskPHP(){
	return src('src/**/*.php') // minimatch
		// .on('data', function(file){
		// 	console.log({
		// 		contents: file.contents,
		// 		path: 	file.path,
		// 		cwd: 	file.cwd,
		// 		base: 	file.base,
		// 		// path component helpers
		// 		relative: 	file.relative,
		// 		dirname: 	file.dirname,
		// 		basename: 	file.basename,
		// 		stem: 		file.stem,
		// 		extname: 	file.extname
		// 	});
		// })
		.pipe(dest(`../${nameFolderProject}`));
}

function taskSass(){
	return src('src/assets/sass/**/style.sass')
		// .pipe(remember(taskSass))
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(sourcemaps.write())
		.pipe(dest(`../${nameFolderProject}/assets/css/`));
}

function taskJS(){
	return src('src/assets/js/**/*.js', {base: 'src'})
		.pipe(rigger())
		.pipe(dest(`../${nameFolderProject}`))
}

function taskImg(){
	return src('src/assets/img/**/*.*', {base: 'src'})
		.pipe(dest(`../${nameFolderProject}`))
}

function taskFonts(){
	return src('src/assets/fonts/**/*.*', {base: 'src'})
		.pipe(dest(`../${nameFolderProject}`))
}

function taskClean(){
	return del(`../${nameFolderProject}`, {force: true});
}

function taskWatch(){
	watch('src/**/*.php', series(taskPHP));
	watch('src/assets/sass/**/*.sass', series(taskSass));
	watch('src/assets/js/**/*.*', series(taskJS));
	watch('src/assets/img/**/*.*', series(taskImg));
	watch('src/assets/fonts/**/*.*', series(taskFonts));
}

exports.start = series(
	taskClean,
	parallel(taskPHP, taskSass, taskJS, taskImg, taskFonts),
	taskWatch
);
