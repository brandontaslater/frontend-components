//gulp init
const gulp = require("gulp"),
  browserSync = require("browser-sync").create(),
  sass = require("gulp-sass")(require("sass")),
  cssnano = require("cssnano"),
  concat = require("gulp-concat"),
  rename = require("gulp-rename"),
  postcss = require("gulp-postcss"),
  uglify = require("gulp-uglify"),
  sourcemaps = require("gulp-sourcemaps"),
  autoprefixer = require("gulp-autoprefixer"),
  streamqueue = require("streamqueue"),
  nunjucksRender = require("gulp-nunjucks-render"),
  clean = require("gulp-clean"),
  inject = require("gulp-inject");

//clean up build folder
gulp.task("clean", function () {
  return gulp
    .src("build/", {
      read: false,
      allowEmpty: true,
    })
    .pipe(clean());
});

//generate index.html
gulp.task("index", function (done) {
  gulp
    .src("src/index.njk")
    .pipe(
      inject(
        gulp.src(["build/*.html", "!build/index.html"], {
          read: false,
        }),
        {
          transform: function (filepath) {
            if (filepath.slice(-5) === ".html" && filepath.indexOf("__") < 0) {
              const cleanName = filepath
                .slice(7, -5)
                .replace(/-/g, " ")
                .replace(/__/g, "");
              return (
                '<li class="link"><a href="' +
                filepath.slice(6) +
                '">' +
                cleanName +
                "</a></li>"
              );
            }
            // Use the default transform as fallback:
            // return inject.transform.apply(inject.transform, arguments);
          },
        }
      )
    )
    .pipe(gulp.dest("src/"));
  done();
});

//exports fontawesome icons to build
gulp.task("fontawesome-icons", function () {
  return gulp
    .src([
      "node_modules/@fortawesome/fontawesome-free/svgs/**",
      "src/assets/svg/*",
    ])
    .pipe(gulp.dest("build/assets/images/fontawesome/"));
});

//compile sass into css & auto-inject into browsers
gulp.task("sass", function () {
  const plugins = [autoprefixer, cssnano];
  return gulp
    .src("src/assets/scss/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(postcss(plugins))
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("/"))
    .pipe(gulp.dest("build/assets/css"))
    .pipe(browserSync.stream());
});

//compile sass into css for build
gulp.task("sass-build", function () {
  const plugins = [autoprefixer, cssnano];
  return gulp
    .src("src/assets/scss/*.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(postcss(plugins))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("build/assets/css"));
});

//concatinate js into dev
gulp.task("js", function () {
  return streamqueue({ objectMode: true }, gulp.src("src/assets/js/app.js"))
    .pipe(sourcemaps.init())
    .pipe(concat("application.min.js"))
    .pipe(sourcemaps.write("/"))
    .pipe(gulp.dest("build/assets/js"))
    .pipe(browserSync.stream());
});

//concatinate js into dev
gulp.task("js-tiny-slider", function () {
  return streamqueue(
    { objectMode: true },
    gulp.src("src/assets/js/tiny-slider-min.js")
  )
    .pipe(sourcemaps.init())
    .pipe(concat("tiny-slider-min.js"))
    .pipe(sourcemaps.write("/"))
    .pipe(gulp.dest("build/assets/js"))
    .pipe(browserSync.stream());
});

//concatinate js into dev
gulp.task("js-slider-within-slider", function () {
  return streamqueue(
    { objectMode: true },
    gulp.src("src/assets/js/slider-within-slider.js")
  )
    .pipe(sourcemaps.init())
    .pipe(concat("slider-within-slider.min.js"))
    .pipe(sourcemaps.write("/"))
    .pipe(gulp.dest("build/assets/js"))
    .pipe(browserSync.stream());
});

//concatinate js into dev
gulp.task("js-theme-toggler", function () {
  return streamqueue(
    { objectMode: true },
    gulp.src("src/assets/js/theme-toggler.js")
  )
    .pipe(sourcemaps.init())
    .pipe(concat("theme-toggler.min.js"))
    .pipe(sourcemaps.write("/"))
    .pipe(gulp.dest("build/assets/js"))
    .pipe(browserSync.stream());
});

//concatinate and compress js into prod
gulp.task("js-build", function () {
  return streamqueue({ objectMode: true }, gulp.src("src/assets/js/app.js"))
    .pipe(concat("application.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("build/assets/js"))
    .pipe(browserSync.stream());
});

//compile html
gulp.task("html", function () {
  return gulp
    .src("src/**/*.njk")
    .pipe(
      nunjucksRender({
        path: ["src/"],
      })
    )
    .pipe(gulp.dest("build"))
    .pipe(browserSync.stream());
});

//copy images
gulp.task("images", function () {
  return gulp
    .src("src/assets/images/**/*.{gif,jpg,jpeg,png,svg}")
    .pipe(gulp.dest("build/assets/images"))
    .pipe(browserSync.stream());
});

//live reload + watching files
gulp.task(
  "serve",
  gulp.series("html", function () {
    // live reloading
    browserSync.init({
      notify: false,
      server: "./build",
    });
    // watch scss
    gulp.watch("src/assets/scss/*", gulp.series("sass"));
    gulp.watch("src/assets/scss/**/*", gulp.series("sass"));
    // watch js
    gulp.watch(
      "src/assets/js/*",
      gulp.series("js", "js-tiny-slider", "js-slider-within-slider", "js-theme-toggler")
    );
    // watch html
    gulp.watch("src/*.njk", gulp.series("html"));
    gulp.watch("src/**/*.njk", gulp.series("html"));
    // watch images
    gulp.watch("src/assets/images/**/*", gulp.series("images"));
  })
);

//default
gulp.task(
  "default",
  gulp.series(
    "clean",
    "html",
    "images",
    "sass",
    "js",
    "js-slider-within-slider",
    "js-theme-toggler",
    "index",
    "serve",
    function (done) {
      done();
    }
  )
);

//debug
gulp.task(
  "debug",
  gulp.series(
    "clean",
    "html",
    "images",
    "fontawesome-icons",
    "sass",
    "js",
    "js-tiny-slider",
    "js-slider-within-slider",
    "js-theme-toggler",
    "index",
    function (done) {
      done();
    }
  )
);

//build
gulp.task(
  "build",
  gulp.series(
    "clean",
    "html",
    "images",
    "fontawesome-icons",
    "sass-build",
    "js-build",
    "js-tiny-slider",
    "js-slider-within-slider",
    "js-theme-toggler",
    "index",
    function (done) {
      done();
    }
  )
);
