"use strict";

const gulp = require("gulp");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const watch = require("gulp-watch");
const gulpFn = require("gulp-fn");
const path = require("path");

const src = "view";
const dest = "client";

const scriptSrcOptions = {
    base: src,
    read: false
};

function scriptBrowserify() {
    return gulpFn(function(file) {
        const dir = path.dirname(file.path);
        console.log(`browserify file : ${dir}/main.jsx`);
        const relative = path.relative(path.join(file.cwd,file.base), dir);
        return browserify(dir + "/main.jsx")
            .transform("babelify")
            .bundle()
            .pipe(source( relative + "/bundle.js"))
            .pipe(gulp.dest(dest));
    });
}

gulp.task("browserify", function() {
    return gulp.src("client/**/main.jsx", scriptSrcOptions)
        .pipe(scriptBrowserify());
});

gulp.task("watchcommon", function() {
    return watch("client/common/*.jsx", scriptSrcOptions, ["browserify"]);
});

gulp.task("watchgamefiles", function() {
    return watch("client/!(common)/*.{jsx,js}", scriptSrcOptions)
        .pipe(scriptBrowserify());
});

gulp.task("html", function() {
    return gulp.src("client/**/*.html")
        .pipe(gulp.dest(dest));
});

gulp.task("css", function() {
     return gulp.src("client/**/*.css")
        .pipe(gulp.dest(dest));
});

gulp.task("watch", ["watchcommon", "watchgamefiles"]);

gulp.task("build", ["browserify", "html", "css"]);

gulp.task("default", ["build", "watch"]);
