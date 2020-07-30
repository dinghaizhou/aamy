
const gulp = require("gulp");
const browserify = require("browserify");
const source = require('vinyl-source-stream');
const tsify = require("tsify");
const watchify = require("watchify");
const gutil = require("gulp-util");
const paths = {
  pages: ['src/*.html']
};

const watchedBrowserify = watchify(browserify({
  basedir: '.',
  debug: true,
  entries: ['src/main.ts'],
  cache: {},
  packageCache: {}
}).plugin(tsify));

gulp.task("copy-html", function () {
  return gulp.src(paths.pages)
    .pipe(gulp.dest("dist"));
})

function browserifyBundle() {
  return watchedBrowserify
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest("dist"));
}

gulp.task("browserify", function() {
  return browserifyBundle();
})

gulp.task("default", gulp.series('copy-html', 'browserify'));
watchedBrowserify.on("update", browserifyBundle);
watchedBrowserify.on("log", gutil.log);