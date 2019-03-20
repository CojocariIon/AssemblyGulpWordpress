const { gulp, series, src, dest }					= require('gulp');

// Setting Poject
const nameFolderProject = 'dist';

function taskPHP(cb){
	return src('src/**/*.php') // minimatch
		.on('data', function(file){
			console.log({
				contents: file.contents,
				path: 	file.path,
				cwd: 	file.cwd,
				base: 	file.base,
				// path component helpers
				relative: 	file.relative,
				dirname: 	file.dirname,
				basename: 	file.basename,
				stem: 		file.stem,
				extname: 	file.extname
			});
		})
		.pipe(dest(`../${nameFolderProject}`));
	cb();
}


exports.build = series(taskPHP);
