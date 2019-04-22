const gulp = require('gulp');
const umd = require('gulp-umd');
const util = require('gulp-util');
const babel = require('gulp-babel');
const sourceFilePathArray = require('./config/config-read-file');
const ts = require('gulp-typescript');
const tsc = require('gulp-tsc');
const rename = require('gulp-rename');
const concat = require('gulp-concat');

const entryDir = 'src';
const outputDir = 'lib';

const fileList = sourceFilePathArray(entryDir);

// base层级下 编译时保持目录结构不变
const excludeSpecifiedPaths = {'base': entryDir};

gulp.task('compressEs', function() {
    const _js_filePathArray = fileList.filter(item => {
        return item.indexOf('js') > -1
    });
    // gulp.src(_js_filePathArray, excludeSpecifiedPaths)
    gulp.src(_js_filePathArray)
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest(outputDir));
});

gulp.task('compressTs', function() {
    const _ts_filePathArray = fileList.filter(item => {
        return item.indexOf('ts') > -1
    });
    gulp.src(_ts_filePathArray)
    // .pipe(ts({
    //     noImplicitAny: true,
    //     module: 'umd'
    // }))
        .pipe(tsc({
            target: 'es6',//把typescript转换成es6标准的js文件
            module: 'commonjs',//模块使用nodejs的标准
        }))
        .pipe(gulp.dest('src/es'));

});

gulp.task('dist',function() {
    gulp.src('lib/*')
        .pipe(concat('util.js'))
        .pipe(umd())
        .pipe(gulp.dest('dist'));
});

gulp.task('compress', ['compressTs', 'compressEs', 'dist']);

gulp.task('test', function() {
    gulp.src(sourceFilePathArray('test'), {'base': 'test'})
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(umd())
        .pipe(gulp.dest('dist/test'));
});

gulp.task('watch', function(){
    const listenerDir = `${entryDir}/**`;
    gulp.watch(listenerDir, ['compress']).on('change', function(event) {
        const filePathSplitArray = event.path.split('/');
        const fileName = filePathSplitArray[filePathSplitArray.length-1];
        util.log('文件[' + util.colors.blue.bold(fileName) + ']' + event.type);
    });

});
