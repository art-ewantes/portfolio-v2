var gulp           = require('gulp'),
		gutil          = require('gulp-util' ),
		sass           = require('gulp-sass'),
		browserSync    = require('browser-sync'),
		concat         = require('gulp-concat'),
		uglify         = require('gulp-uglify'),
		cleanCSS       = require('gulp-clean-css'),
		rename         = require('gulp-rename'),
		del            = require('del'),
		imagemin       = require('gulp-imagemin'),
		pngquant       = require('imagemin-pngquant'),
		cache          = require('gulp-cache'),
		autoprefixer   = require('gulp-autoprefixer'),
		fileinclude    = require('gulp-file-include'),
		gulpRemoveHtml = require('gulp-remove-html'),
		bourbon        = require('node-bourbon'),
		ftp            = require('vinyl-ftp'),
		notify         = require("gulp-notify");

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('sass', ['headersass'], function() {
	return gulp.src('app/assets/sass/**/*.sass')
		.pipe(sass({
			includePaths: bourbon.includePaths
		}).on("error", notify.onError()))
		.pipe(rename({suffix: '.min', prefix : ''}))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleanCSS())
		.pipe(gulp.dest('app/assets/css'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('headersass', function() {
	return gulp.src('app/header.sass')
		.pipe(sass({
			includePaths: bourbon.includePaths
		}).on("error", notify.onError()))
		.pipe(rename({suffix: '.min', prefix : ''}))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleanCSS())
		.pipe(gulp.dest('app'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('libs', function() {
	return gulp.src([
		'app/assets/libs/jquery/dist/jquery.min.js',
		"app/assets/libs/html5shiv/dist/html5shiv.min.js",
		"app/assets/libs/respond/dest/respond.min.js",
		"app/assets/libs/scroll2id/PageScroll2id.min.js",
		"app/assets/libs/owl.carousel/dist/owl.carousel.min.js",
		"app/assets/libs/validator/jqBootstrapValidation.js",
		"app/assets/libs/particles.js/particles.min.js",
		"app/assets/libs/animated/animated.js",
		"app/assets/libs/particles.js/part_add.js",
		])
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/assets/js'));
});

gulp.task('watch', ['sass', 'libs', 'browser-sync'], function() {
	gulp.watch('app/header.sass', ['headersass']);
	gulp.watch('app/assets/sass/**/*.sass', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/assets/js/**/*.js', browserSync.reload);
});

gulp.task('imagemin', function() {
	return gulp.src('app/assets/img/**/*')
		.pipe(cache(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('dist/assets/img')); 
});

gulp.task('buildhtml', function() {
  gulp.src(['app/*.html'])
    .pipe(fileinclude({
      prefix: '@@'
    }))
    .pipe(gulpRemoveHtml())
    .pipe(gulp.dest('dist/'));
});

gulp.task('removedist', function() { return del.sync('dist'); });

gulp.task('build', ['removedist', 'buildhtml', 'imagemin', 'sass', 'libs'], function() {

	var buildCss = gulp.src([
		'app/assets/css/fonts.min.css',
		'app/assets/css/main.min.css'
		]).pipe(gulp.dest('dist/assets/css'));

	var buildFiles = gulp.src([
		'app/.htaccess'
	]).pipe(gulp.dest('dist'));

	var buildFonts = gulp.src('app/assets/fonts/**/*').pipe(gulp.dest('dist/assets/fonts'));

	var buildJs = gulp.src('app/assets/js/**/*').pipe(gulp.dest('dist/assets/js'));

});

// gulp.task('deploy', function() {

// 	var conn = ftp.create({
// 		host:      'ftp.web-rawwwr.com',
// 		user:      'testFTP@web-rawwwr.com',
// 		password:  'getthere1995',
// 		parallel:  10,
// 		log: gutil.log
// 	});

// 	var globs = [
// 	'dist/**',
// 	'dist/.htaccess',
// 	];
// 	return gulp.src(globs, {buffer: false})
// 	.pipe(conn.dest('/home/wjfrgctj/public_html/wp-content/themes/web-rawwwr'));

// });
/** Configuration **/
var user = 'testFTP@web-rawwwr.com';  
var password = 'getthere1995';  
var host = 'ftp.web-rawwwr.com';  
var port = 21;  
var localFilesGlob = [
	'dist/assets/**',
	'dist/*.html',
];  
var remoteFolder = '/wp-content/themes/web-rawwwr'


// helper function to build an FTP connection based on our configuration
function getFtpConnection() {  
    return ftp.create({
        host: host,
        port: port,
        user: user,
        password: password,
        parallel: 5,
        log: gutil.log
    });
}

/**
 * Deploy task.
 * Copies the new files to the server
 *
 * Usage: `FTP_USER=someuser FTP_PWD=somepwd gulp ftp-deploy`
 */
gulp.task('deploy', function() {

    var conn = getFtpConnection();

    return gulp.src(localFilesGlob, { base: './dist/', buffer: false })
        .pipe( conn.newer( remoteFolder ) ) // only upload newer files 
        .pipe( conn.dest( remoteFolder ) )
    ;
});

/**
 * Watch deploy task.
 * Watches the local copy for changes and copies the new files to the server whenever an update is detected
 *
 * Usage: `FTP_USER=someuser FTP_PWD=somepwd gulp ftp-deploy-watch`
 */
gulp.task('ftp-deploy-watch', function() {

    var conn = getFtpConnection();

    gulp.watch(localFilesGlob)
    .on('change', function(event) {
      console.log('Changes detected! Uploading file "' + event.path + '", ' + event.type);

      return gulp.src( [event.path], { base: '.', buffer: false } )
        .pipe( conn.newer( remoteFolder ) ) // only upload newer files 
        .pipe( conn.dest( remoteFolder ) )
      ;
    });
});

gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('default', ['watch']);
