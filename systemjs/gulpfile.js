const gulp = require('gulp');
const ngc = require('gulp-ngc');
const SystemBuilder = require('systemjs-builder');

gulp.task('ngc', () => {
    return ngc('./tsconfig-aot.json');
});

gulp.task('aot-bundle', function () {
    const builder = new SystemBuilder();

    return builder.loadConfig('./aot/systemjs.config.js')
        .then(function () {
            return builder.buildStatic('aot/app/boot-aot.js', './aot/dist/bundle.js', {
                encodeNames: false,
                mangle: false,
                minify: true,
                rollup: true,
                sourceMaps: true
            });
        })
});

