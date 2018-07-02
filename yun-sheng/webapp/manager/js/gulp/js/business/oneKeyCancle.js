//  一键核销    模板   :   这里是模板。
!function ($) {
    // 默认模板
    var _template =
        '<div class="hx-btn-group" style="margin-top:10px">' +
            ' &nbsp;&nbsp;<button class="btn btn-default hx-save" data-key="save">保存</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            ' <button class="btn btn-default hx-edit"  data-key="edit">编辑</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            '<button class="btn btn-default hx-key"  data-key="key">一键核销</button>'+
        '</div>'+
        '<div class="grid-wrap" style="margin-top:10px">'+
            '<table id="jqGrid_payment" class="hexiao-table"></table>'+
            '<div id="jqGridPayment" class=""></div>'+
        '</div>'+
        ''
    ;
    // 默认参数
    var defaults = {
        //保存 事件
        hxSave:function () {
        },
        //编辑 事件
        hxEdit:function () {

        },
        //一键核销
        hxKye:function () {
            
        }
    };

    // 构造函数
    var oneKeyCancel = function (el, option) {
        this.option = $.extend(true, defaults, option);
        this.element = $(el);
        this.dom = null;
        this._init();
    };
    oneKeyCancel.prototype = {
        _init: function () {
            this.clearDom();
            this.getDom();
            this.loadDom();
        },
        //获取dom
        getDom: function () {
            var _self=this;
            var $_template = $(_template);
            // 绑定事件
            $_template.find(".hx-save").on("click",function () {
                _self.option.hxSave();
            });
            $_template.find(".hx-edit").on("click",function () {
                _self.option.hxEdit();
            });
            $_template.find(".hx-key").on("click",function () {
                _self.option.hxKye();
            });
            _self.dom = $_template;
        },

        //加载dom
        loadDom: function () {
            this.element.append(this.dom);
        },
        //清空dom
        clearDom: function () {
            this.element.html("");
        },
        //设置 的按钮的 disabled
        setDisabledbtn: function (key) {
            var dom = this.dom.siblings(".hx-btn-group");
            //判断你是数组对象，还是字符串
            if ($.isArray(key)) {
                for (var i = 0; i < key.length; i++) {
                    disabled(key[i]);
                }
            } else {
                disabled(key);
            }
            //禁用
            function disabled(key) {
                dom.find("button[data-key=" + key + "]").attr("disabled", "disabled");
            }
        },
        //设置 的按钮的 disabled
        setUndisabledbtn: function (key) {
            var dom = this.dom.siblings(".hx-btn-group");
            //判断你是数组对象，还是字符串
            if ($.isArray(key)) {
                for (var i = 0; i < key.length; i++) {
                    undisabled(key[i]);
                }
            } else {
                undisabled(key);
            }
            //禁用
            function undisabled(key) {
                dom.find("button[data-key=" + key + "]").removeAttr("disabled");
            }
        }
    };
    window.oneKeyCancel = oneKeyCancel;


    //在插件中使用 组件对象
    $.fn.oneKeyCancel = function (options) {
        //创建的实体
        var obj = new oneKeyCancel(this, options);
        //调用其方法
        return obj;
    }
}(jQuery);