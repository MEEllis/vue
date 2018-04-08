var gulp = require('gulp');
var del = require('del');
var compass = require('gulp-compass');
var runSequence = require('run-sequence');
var plumber = require('gulp-plumber');
var fileinclude  = require('gulp-file-include');  


gulp.task('clean', function(){
    return del.sync(['dist/**/*' ]);
});

gulp.task('compass', function() {
    gulp.src('./sass/*.scss')
        .pipe(plumber())
        .pipe(compass({
            config_file: './config.rb',
            css:"dist/lib/css"
        }))
});

gulp.task('fileinclude', function() {  
    gulp.src(['./src/**.html'])  
        .pipe(fileinclude({  
          prefix: '@@',  
          basepath: '@file'  
        }))  
    .pipe(gulp.dest('./dist'));  
}); 

gulp.task('copy-static',  function() {
    return gulp.src('src/static/**')
      .pipe(gulp.dest('dist/static'))
  });

gulp.task('task-name', function() {
    runSequence(['clean'],['copy-static','fileinclude']);
});

// Watchers
gulp.task('watch', function() {
    gulp.watch([
        './src/*.html',
    ],['task-name']);
});


//gulp images
gulp.task('default', ['task-name','watch']);