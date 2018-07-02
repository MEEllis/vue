/*
 组件 模板
会计期间

*/

!function ($) {
    // 默认模板
    var _template = '';
    // 构造函数
    var comDateAccounting = function (el, option) {
        //默认当前月
        var currentDate = (new Date($.ajax({async: false}).getResponseHeader("Date"))).format("yyyy-MM")
        // 默认参数
        var defaults = {
            defaultDate: currentDate,
            endDateId: null,   //默认当前月
            endDefaultDate: currentDate,   //默认当前月
            changeDateBack:null ,  //当前
			startDate: null, //最小日期
        };
        this.option = $.extend(true, defaults, option);
        this.element = $(el);
        this._init();
    };
    comDateAccounting.prototype = {
        _init: function () {
            this.clearDom();
            this.loadDom();
        },
        //加载时间
        loadDom: function () {
            var _self = this;
            //如果存在结束日期
            if (_self.option.endDateId) {
                var $endDate = $(_self.option.endDateId);
                //初始化:结束日期
                $endDate.prop('readonly', true).val(this.option.defaultDate).bootstrapPicker({
                    format: 'yyyy-mm',
                    weekStart: 1,
                    autoclose: true,
                    startView: 3,
                    minView: 3,
                    forceParse: false,
					startDate: this.option.startDate,
                    endDate: this.option.defaultDate
                });
                _self.element.on("changeDate",function (ev) {
                    createBlurEvent(_self, _self.element);
                    if(_self.option.changeDateBack){
                        _self.option.changeDateBack();
                    }
                })
                $endDate.on("changeDate",function (ev) {
                    createBlurEvent(_self, $endDate);
                    if(_self.option.changeDateBack){
                        _self.option.changeDateBack();
                    }
                }).on("show",function () {
                    _self.updateDate();
                });

            }

            //初始化:开始日期
            _self.element.prop('readonly', true).val(this.option.defaultDate).bootstrapPicker({
                format: 'yyyy-mm',
                weekStart: 1,
                autoclose: true,
                startView: 3,
                minView: 3,
                forceParse: false,
				startDate: this.option.startDate,
				endDate: this.option.defaultDate
            }).on("show",function () {
                _self.updateDate();
            });

        },
        //清空dom
        clearDom: function () {
            this.element.html("");
        },
        //更新日期 ：使用当前输入框中的值更新日期时间选择器。
        updateDate:function () {
            var _self = this;
            _self.element.bootstrapPicker("update")
            if (_self.option.endDateId) {
                $(_self.option.endDateId).bootstrapPicker("update");
            }
        }
    };

    //创建一个失去时间焦点的事件
    function createBlurEvent(_self, bindEventObj) {

        var start = _self.element.val();
        var end = $(_self.option.endDateId).val();
        if (start == "" || end == "") {
            return false;
        }
        var startDate = new Date(start);
        var endDate = new Date(end);

        //是否在同一年  ,不在同一年就需要把月份 改成同一个年份
        if (startDate.getFullYear() != endDate.getFullYear()) {
            //选中的年月
            var currentSelectDate = new Date(bindEventObj.val());
            _self.element.val(currentSelectDate.getFullYear() + "-" +
                (startDate.getMonth() < 9 ? ("0" + (startDate.getMonth() + 1)) : (startDate.getMonth() + 1)));
            $(_self.option.endDateId).val(currentSelectDate.getFullYear() + "-"
                + (endDate.getMonth() < 9 ? ("0" + (endDate.getMonth() + 1)) : (endDate.getMonth() + 1)));
            startDate = new Date(_self.element.val());
            endDate = new Date($(_self.option.endDateId).val());
        }

        //开始日期必须 小于等于  结束日期
        if (endDate.getMonth() < startDate.getMonth()) {
            $.zxsaas_plus.showalert("提示", "结束日期小于开始日期!");
            $(_self.option.endDateId).val("");
            return false;
        }

    }


    window.comDateAccounting = comDateAccounting;

    //在插件中使用  组件对象
    $.fn.comDateAccounting = function (options) {
        //创建的实体
        var obj = new comDateAccounting(this, options);
        //调用其方法
        return obj;
    }
}(jQuery);