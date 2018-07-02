## 工具使用的是 gulp ，这里需要  安装 gulp

##  安装步骤

    第一步： 安装 node
      ```
        npm install
     ```
    第二步： 安装 全局 gulp ； 安装sass（https://www.sass.hk/install/）
      ```
         npm install  gulp
      ```
     第三步： 初始化项目
      ```
         npm install
      ```
    第四步：(执行gulp默认的任务)
     ```
        gulp
    ```



##  文件说明
js:
    base-js  :
        基于 js 扩展 ， 主要是对 js 原生的方法进行扩展;
    base-jquery  :
        基于jquery 扩展 ， 主要是 jquery 方法的扩展;
    component  :
        基于jquery 的erp组件;


sass :
    utilities:
        工具类
    business:
         某一类的页面  （ex: erp历史单据页面）




##  特别说明

    加js 进来，需要在gulpfile.js 中配置一下新加的js文件。 并且需要重新其中 gulp 命令 ，才能把新写的js文件，编译进来！

    node_modules  文件夹，不要提交到svn 中去











                                                                                                                                                    ----@本项目为 云盛前端Team所有


