var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var babel = require("gulp-babel");

gulp.task("build", function () {
  return gulp.src("src/bezier.js")
    .pipe(babel({presets: ["es2015"]}))
    .pipe(gulp.dest("dist"));
});

function compile(watch) {
  var bundler = watchify(browserify('./example/index.js', { debug: true }).transform(babelify, {presets: ["es2015"]}));

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('index.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dist/example'));
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }

  rebundle();
}

function watch() {
  return compile(true);
};

gulp.task('compile', function() { return compile(); });
gulp.task('watch', function() { return watch(); });

gulp.task('default', ['build'])