var syntax       = 'scss',
    gulp         = require('gulp'),
    browserSync  = require('browser-sync'),
    sass         = require('gulp-sass'),
    cleancss     = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    rename       = require('gulp-rename'),
    sourcemaps   = require('gulp-sourcemaps'),
    notify       = require('gulp-notify');

// Browser synchronization
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: '.'
    },
    notify: false
  });
});

// Watch changing .html
gulp.task('html-reload', function() {
  return gulp.src('*.html')
  .pipe(browserSync.reload({ stream: true }))
});

// Compile .scss to *.min.css
gulp.task('build', function() {
  return gulp.src('assets/'+syntax+'/**/*.'+syntax+'')
  .pipe(sourcemaps.init())
  .pipe(sass({ outputStyle: 'compressed' }).on("error", notify.onError()))
  .pipe(rename({ suffix: '.min', prefix : '' }))
  .pipe(autoprefixer(['last 15 versions']))
  .pipe(cleancss( {level: { 1: { specialComments: 0 } } }))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('assets/css'))
  .pipe(browserSync.stream())
});

// Watching for all files changes
// Auto build after changing
gulp.task('watch', function() {
  gulp.watch('assets/'+syntax+'/**/*.'+syntax+'', gulp.parallel('build'));
  gulp.watch('**/*.js', gulp.parallel('html-reload'));
  gulp.watch('**/*.html', gulp.parallel('html-reload'));
});

// start local server http://localhost:3000/
// start Live Reload after any changing
gulp.task('live', gulp.parallel('build', 'browser-sync', 'watch'));

// Compile .scss to *.min.css
gulp.task('default', gulp.parallel('build'));