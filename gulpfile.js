const gulp = require('gulp');
const umd = require('gulp-umd');
const util = require('gulp-util');
const babel = require('gulp-babel');
const sourceFilePathArray = require('./config/config-read-file');
const ts = require('gulp-typescript');

const entryDir = 'src';
const outputDir = 'dist';

const fileList = sourceFilePathArray(entryDir);

// base层级下 编译时保持目录结构不变
const excludeSpecifiedPaths = {'base': entryDir};

gulp.task('compress', function() {

    const _js_filePathArray = fileList.filter(item => {
        return item.indexOf('js') > -1
    });

    const _ts_filePathArray = fileList.filter(item => {
        return item.indexOf('ts') > -1
    });

    gulp.src(_js_filePathArray, excludeSpecifiedPaths)
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(umd())
        .pipe(gulp.dest(outputDir));

    gulp.src(_ts_filePathArray, excludeSpecifiedPaths)
        .pipe(ts({
            noImplicitAny: true,
            module: 'umd'
        }))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest(outputDir));

});

gulp.task('watch', function(){
    gulp.watch(entryDir + '/*', ['compress']).on('change', function(event) {
        const filePathSplitArray = event.path.split('/');
        const fileName = filePathSplitArray[filePathSplitArray.length-1];
        util.log('文件[' + util.colors.blue.bold(fileName) + ']' + event.type);
    });

});
