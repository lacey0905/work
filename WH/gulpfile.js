var gulp = require('gulp'),
	runSequence = require('run-sequence'),
	merge = require('merge-stream'),
	watch = require('gulp-watch'),
	sass = require('gulp-sass'),
	sassGlob = require('gulp-sass-glob'),
	spritesmith = require('gulp.spritesmith-multi'),
	del = require('del');
 
/* ---------------------------------------------------------------------------------- */
 
// Clean Sprite
gulp.task('clean-sprite', function() {
	return del('./dist/img/sprite');
});
 
// 자동 스프라이트
gulp.task('auto-sprite', function() {
	var opts = {
		spritesmith: function (options, sprite, icons){
			options.imgPath =  `../images/${options.imgName}`;
			options.cssName = `_${sprite}-sprite.scss`;
			options.cssTemplate = null;
			options.cssSpritesheetName = sprite;
			options.padding = 10;
			options.cssVarMap =  function(sp) {
				sp.name = `${sprite}-${sp.name}`;
			};
 
			return options;
		}
	};
	var spriteData = gulp.src('./src/img-sprites/**/*.png').pipe(spritesmith(opts)).on('error', function (err) {
		console.log(err)
    });
	
	var imgStream = spriteData.img.pipe(gulp.dest('./dist/images'));
	var cssStream = spriteData.css.pipe(gulp.dest('./src/scss/vendors'));
 
	return merge(imgStream, cssStream);
});
 
// 스프라이트 and SASS
gulp.task('sprite-and-sass', function() {
	runSequence('clean-sprite', 'auto-sprite', 'sass');
});
 
// sass
gulp.task('sass', function() {
	return gulp.src('./src/scss/**/*.scss')
 
		// use glob imports
        .pipe(sassGlob())
 
		// SASS
		.pipe(sass({
			errLogToConsole: true,
			outputStyle: 'expanded' // nested, expanded, compact, or compressed.
		}).on('error', sass.logError))
 
		// css 배포
		.pipe(gulp.dest('./dist/css'));
});
 
gulp.task('watch', function() {
	watch(['./src/scss/*.scss', './src/**/*.scss'], function() {
		gulp.start('sass');
	});
	watch(['./src/img-sprites/**/*'], function() {
		gulp.start('sprite-and-sass');
	});
});
 
const prefix = require('gulp-prefix');
const charset = require('gulp-charset');
const path = {
    prefix: "http://mm.pmang.kr/pmang/slugger/event/2018/0703_C2KMFLxFRj",
    app: "./app",
    dist: "./dist",
    temp: "./.tmp"
}

gulp.task('prefix', function() {
    gulp.src(path.dist + '/*.html')
        .pipe(prefix(path.prefix, null, '/gamepub'))
        .pipe(charset({
            to: 'euc-kr'
        }))
        .pipe(gulp.dest(path.dist));
});

gulp.task('d', [
	'sprite-and-sass',
	'watch'
]);