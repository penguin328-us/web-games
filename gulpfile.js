"use strict";

const gulp = require("gulp");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const watch = require("gulp-watch");
const gulpFn = require("gulp-fn");
const path = require("path");
const uglify = require("gulp-uglify");

const src = "views";
const dest = "client";

const scriptSrcOptions = {
    base: src,
    read: false
};

function scriptBrowserify() {
    return gulpFn(function(file) {
        const dir = path.dirname(file.path);
        const relative = path.relative(path.join(file.cwd, file.base), dir);
        return browserify(dir + "/main.jsx")
            .transform("babelify")
            .bundle()
            .pipe(source(relative + "/bundle.js"))
            .pipe(gulp.dest(dest));
    });
}

gulp.task("browserify", function() {
    return gulp.src("views/**/main.jsx", scriptSrcOptions)
        .pipe(scriptBrowserify());
});

gulp.task("html", function() {
    return gulp.src("views/**/*.html")
        .pipe(gulp.dest(dest));
});

gulp.task("css", function() {
    return gulp.src("views/**/*.css")
        .pipe(gulp.dest(dest));
});

gulp.task("watchhtml", function() {
    return watch("views/**/*.html", ["html"]);
});

gulp.task("watchcss", function() {
    return watch("views/**/*.css", ["css"]);
});

gulp.task("watchcommon", function() {
    return watch("views/common/*.jsx", scriptSrcOptions, ["browserify"]);
});

gulp.task("watchgamefiles", function() {
    return watch("views/!(common)/*.{jsx,js}", scriptSrcOptions)
        .pipe(scriptBrowserify());
});

gulp.task("uglify", ["build"], function() {
    return gulp.src("client/**/*.js")
        .pipe(uglify())
        .pipe(gulp.dest(dest));
});

gulp.task("watch", ["watchcommon", "watchgamefiles", "watchhtml", "watchcss"]);

gulp.task("build", ["browserify", "html", "css"]);

gulp.task("publish", ["uglify"]);

gulp.task("default", ["build", "watch"]);
