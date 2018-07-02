//单据日志 （组件）
!function ($) {
    // 默认模板
    var _log = '<div class="log_box">'+
        '<h4>日志详情</h4>'+
//			<h4 style="display: none;">打印次数：<i class="logprint"></i></h4>
        '</div>';

    // 构造函数
    var logMes = function (el, option) {
        // 默认参数
        var defaults = {

        };
        this.option = $.extend(true, defaults, option);
        this.element = $(el);
        this.dom = null;
        this._init();
    }
    logMes.prototype = {
        _init: function () {
            this.clearDom();
            this.getDom();
            this.loadDom();
        },
        //获取dom
        getDom: function () {
            var $_logWrap = $(_log);
            var list = this.option.list;
            for (var i = 0;i<list.length;i++) {
                var img = list[i].billsStatus==6?"statusPass.png":"statusRed.png";
                var $div = '<div class="log_div">'+
                    '<div class="log_img">'+
                    '<img src=/manager/images/status/'+ img +' />'+
                    '</div>'+
                    '<div class="log_dashed"></div>'+
                    '<i class="log_time">'+ list[i].createDateStr + '</i>'+
                    '<p><font>操作类型：</font>'+ list[i].operateType + '</p>'+
                    '<p><font>操作员：</font>'+ list[i].createByName + '</p>'+
                    '<p><font>操作原因：</font>' + list[i].operateResaon + '</p>'+
                    '</div>';
                $_logWrap.append($div);
            }
            this.dom =$_logWrap;
        },
        //加载dom
        loadDom: function () {
            this.element.append(this.dom);
            this.setHoverEvent();
        },
        //清空dom
        clearDom:function () {
            this.element.html("单据日志");
        },
        setHoverEvent:function(){
            var _telement=this.element;
            this.element.mouseover(function(e){

                _telement.find('.log_box').show();

            }).mouseout(function(e){

                _telement.find('.log_box').hide();

            });
        }

    };
    window.logMes = logMes;

    //在插件中使用  组件对象
    $.fn.logMes = function(options) {
        //创建的实体
        var obj = new logMes(this, options);
        //调用其方法
        return obj;
    }
}(jQuery);