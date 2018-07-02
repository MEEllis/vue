//gulp 任务

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    pump = require('pump'),
    uglify= require('gulp-uglify'),
    babel = require("gulp-babel"),
sourcemaps = require('gulp-sourcemaps');
var compass = require('gulp-compass');
var plumber = require('gulp-plumber');

//配置项
var configure = {
    jsConcat: [
        "./js/base-js/jsExtent.js",
        "./js/base-js/functionObjExtent.js",
        "./js/base-js/LodopFuncs.js",
        "./js/base-js/LodopPrint.js",
        "./js/base-js/LodopXiaoPiao.js",

        "./js/base-jquery/ajaxPackage.js",

        "./js/third-jquery/auto-line-number.js",

        "./js/Interface/common.js",
        "./js/Interface/account.js",
        "./js/Interface/old.js",

        "./js/component/componentMenuBtn.js",
        "./js/component/funStoreSales.js",
        "./js/component/logMes.js",
        "./js/component/comDateAccounting.js",
        "./js/component/comSubjectCode.js",
        "./js/component/comImeiInputModal.js",
        "./js/component/comImeiOutModal.js",
        "./js/component/comXiaoPiao.js",

        "./js/component/modal/comModalsbox.js",
        "./js/component/modal/comModalsBrand.js",
        "./js/component/modal/comModalsColor.js",
        "./js/component/modal/comModalsStorage.js",
        "./js/component/modal/comModalsStoreGoodByStorageIds.js",
        "./js/component/modal/comModalsSection.js",
        "./js/component/modal/comModalsEmployee.js",
        "./js/component/modal/comModalsEmployeeBySection.js",
        "./js/component/modal/comModalsContactUnit.js",
        "./js/component/modal/comModalsGoods.js",
        "./js/component/modal/comModalsStoreGoods.js",
        "./js/component/modal/comModalsStoreFilterGoods.js",
        "./js/component/modal/comModalsAllGoods.js",
        "./js/component/modal/comModalsSoldGoods.js",
        "./js/component/modal/comModalsOutStoreGoods.js",
        "./js/component/modal/comModalsAccount.js",
        "./js/component/modal/comModalsBusinessArchives.js",
        "./js/component/modal/comModalsInpayClass.js",
        "./js/component/modal/comModalsStoreNeedGoods.js",
        "./js/component/modal/comModalsgroup.js",


        "./js/business/oneKeyCancle.js",
        "./js/business/pageListCommon.js",
        "./js/business/pageDetailCommon.js",
		"./js/business/comProofPrintModals.js",
		"./js/business/validateImeiExisting.js",
    ]
};
/*       创建普通任务       start */
// 默认的任务 :(初始化需要做的事情)
gulp.task('default', function () {

});
gulp.task('task-compass', function() {
    gulp.src('./sass/*.scss')
        .pipe(plumber())
        .pipe(compass({
            config_file: './config.rb',
            css:"../../css"
        }))
});
// 合并 js
gulp.task('task-concat', function (cb) {
    //先不需要压缩
    pump([
            gulp.src(configure.jsConcat),
            sourcemaps.init(),
            babel(),
             concat('component.js'),
         /*  uglify({
                mangle: true,//类型：Boolean 默认：true 是否修改变量名
                compress: true,//类型：Boolean 默认：true 是否完全压缩
            }),*/
            sourcemaps.write(),
            gulp.dest('../')
        ], cb
    )
});

/*       创建普通任务       end */


/*       创建监听任务       start */

// 创建一个 watch 任务 ,监听js变化
gulp.task('watch-js', function () {
    gulp.watch([
        'js/**/*.js',
    ], ['task-concat']);
});

// 创建一个 watch 任务 ,监听sass变化
gulp.task('watch-sass', function () {
    //监听sass
    gulp.watch([
        'sass/**/*.scss',
    ],['task-compass']);
});

/*       创建监听任务       end */


//执行任务
gulp.task('default', ['task-concat', 'watch-js', 'watch-sass']);