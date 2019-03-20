const 
	{ series, src, dest, parallel }	    		= require('gulp'),
	sass 										= require('gulp-sass'),
	sourcemaps									= require('gulp-sourcemaps'),
	clean										= require('gulp-clean'),
	del 										= require('del');

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
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(sourcemaps.write())
		.pipe(dest(`../${nameFolderProject}`));
}

function taskClean(){
	return del(`../${nameFolderProject}`, {force: true});
}

exports.watch = series(
	taskClean,
	parallel(taskPHP, taskSass)
);
