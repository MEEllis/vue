/*
 组件 :
 jsGrid 的2次封装，或者是 扩展
 
 */

!function ($) {
    // 默认模板
    var _template = '';
    // 构造函数
    var jqGridExtend = function (el, option) {
        // 默认参数
        var defaults = {

        };
        this.option = $.extend(true, defaults, option);
        this.element = $(el);
        this.dom = null;
        this._init();
    };
    jqGridExtend.prototype = {
        _init: function () {
            this.clearDom();
            this.getDom();
            this.loadDom();
        },
        //获取dom
        getDom: function () {
            var $_logWrap = $(_template);
            this.dom =$_logWrap;
        },
        //加载dom
        loadDom: function () {
            this.element.append(this.dom);
        },
        //清空dom
        clearDom:function () {
            this.element.html("");
        }
    };
    window.jqGridExtend = jqGridExtend;

    //在插件中使用  组件对象
    $.fn.jqGridExtend = function(options) {
        //创建的实体
        var obj = new jqGridExtend(this, options);
        //调用其方法
        return obj;
    }
}(jQuery);