const 
	{gulp, series, src, dest, parallel, watch}	    	= require('gulp'),
	sass 												= require('gulp-sass'),
	autoprefixer 										= require('gulp-autoprefixer'),
	sourcemaps											= require('gulp-sourcemaps'),
	remember 											= require('gulp-remember'),
	del 												= require('del');

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
		.pipe(remember(taskSass))
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(sourcemaps.write())
		.pipe(dest(`../${nameFolderProject}`));
}

function taskJS(){
	return src('src/assets/js/**/*.js', {base: 'src'})
		.pipe(dest(`../${nameFolderProject}`))
}

function taskImg(){
	return src('src/assets/img/**/*.*', {base: 'src'})
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
}

exports.start = series(
	taskClean,
	parallel(taskPHP, taskSass, taskJS, taskImg),
	taskWatch
);
