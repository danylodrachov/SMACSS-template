var gulp = require('gulp'),
    sass = require('gulp-sass'),
    bSync = require('browser-sync').create(),
    refresher = bSync.reload,
    rename = require('gulp-rename'),
    cleanCSS = require('gulp-clean-css'),
    wait = require('gulp-wait');

var src = {
    html: 'src/*.html',
    style: 'src/scss/index.scss'
},
    build = {
    html: 'build/',
    css:  'build/css/'  
},
    watch = {
        html:'src/*.html',
        allBase: 'src/scss/base/*.scss',
        allModules: 'src/scss/modules/*.scss',
        allStates:  'src/scss/states/*.scss',
        allMain: 'src/scss/*.scss'
};

gulp.task('html',  function(){
    gulp.src(src.html)
    .pipe(wait(500))
    .pipe(gulp.dest(build.html))
    .pipe(refresher({stream: true}));
});

gulp.task('styles', function(){
	gulp.src(src.style)
    .pipe(wait(500))
	.pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie8'})) 
    .pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest(build.css))
	.pipe(refresher({stream: true}));
});

gulp.task('server', function(){
    bSync.init({
		server: {
			baseDir: 'build/'
		}
	});
    gulp.watch(watch.html, ['html']);
    gulp.watch(watch.allBase, ['styles']);
    gulp.watch(watch.allModules, ['styles']);
    gulp.watch(watch.allStates, ['styles']);
    gulp.watch(watch.allMain, ['styles']);
});

gulp.task('build', ['html', 'styles'])

gulp.task('default', ['server', 'build']);