'use strict';

const gulp = require('gulp');
const packager = require('electron-packager');


// TODO task for running app in dev mode
// - should open browser window with node-inspector
// https://www.npmjs.com/package/gulp-node-inspector
// ./node_modules/.bin/electron main.js --debug

var copyPlists = function(callback){

	gulp.src([
			'./build/mac-extras/child.plist',
			'./build/mac-extras/parent.plist',
		])
		.pipe(gulp.dest('dist/GifGoat-darwin-x64/GifGoat.app/Contents/Frameworks/'))
		.on('end', ()=>{
			callback();
		});

};

// https://www.npmjs.com/package/electron-packager
gulp.task('build-mac', [], callback => {

	/*

		https://www.npmjs.com/package/electron-packager#packageropts-callback
		
	*/
	let opts = {
		// The source directory.
		dir: './',

		// The application name.
		name: 'GifGoat',
		'app-bundle-id': 'GIFGOAT-HELPER',
		icon: './assets/icons/gifgoat-icon.icns',

		// Allowed values: linux, win32, darwin, all
		// platform: 'darwin',
		platform: 'mas',

		// Allowed values: ia32, x64, all
		// Not required if all is used. The non-all values correspond to the architecture names used by Electron releases.
		arch: 'x64',

		// Electron version (without the 'v') - for example, 0.33.9. See Electron releases for valid versions.
		version: require('./node_modules/electron-prebuilt/package.json').version,

		'app-version': require('./package.json').version,
		'build-version': require('./package.json').version,
		
		'app-bundle-id': 'DLG2VT3336.com.positlabs.gifgoat',
		'app-category-type': 'public.app-category.utilities',

		asar: true,
		'asar-unpack-dir': 'bin/',

		prune: true,

		ignore: [
			'/bin/ffmpeg/linux($|/)',
			'/bin/ffmpeg/win32($|/)',
			'/dist($|/)',
			'/build($|/)',
			'/test($|/)',
		],

		out: './dist/',
		overwrite: true

	};

	packager(opts, (err, appPath) => {
		copyPlists(callback);
	});

});

gulp.task('default', [], function(){});