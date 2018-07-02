/*
 组件 模板

*/

!function ($) {

    // 构造函数
    var componentTemplate = function (el, option) {
        // 默认参数
        var defaults = {

        };
        this.option = $.extend(true, defaults, option);
        this.element = $(el);
        this.dom = null;
        this._init();
    };
    componentTemplate.prototype = {
        _init: function () {
            this.clearDom();
            this.getDom();
            this.loadDom();
        },
        //获取dom
        getDom: function () {
            var $_template = $(this.getTemplate);
            this.dom =$_template;
        },
        //加载dom
        loadDom: function () {
            this.element.append(this.dom);
        },
        //清空dom
        clearDom:function () {
            if (this.dom !== null) {
                this.dom.remove();
                this.dom = null;
            }
        },
        //设置当前的参数
        setOption: function (data) {
            this.option = $.extend(false, this.option, data);
        },
        // 默认模板
        getTemplate:function(){
            // 默认模板
            var _template = '';
            return _template
        }
    };
    window.componentTemplate = componentTemplate;

    //在插件中使用  组件对象
    $.fn.componentTemplate = function(options) {
        //创建的实体
        var obj = new componentTemplate(this, options);
        //调用其方法
        return obj;
    }
}(jQuery);