/*
 小票

*/

!function ($) {


    // 构造函数
    var comXiaoPiao = function (el, option) {
        // 默认参数
        var defaults = {
            billsId:null, //单据id
            isJuHe:true, //是否聚合
        };
        this.option = $.extend(true, defaults, option);
        this.element = $(el);
        this.dom = null;
        this._init();
    };
    comXiaoPiao.prototype = {
        _init: function () {
            this.clearDom();
            this.getDom();
            this.loadDom();
        },
        //获取dom
        getDom: function () {
            var _self=this;
            var $_template =  $(this.getTemplate());
            this.element.unbind('click.show').bind('click.show',function(){
                $_template.modal('show')
            })
            //取消
            $_template.find('.close').bind('click',function () {
                $_template.modal('hide')
            })
            //打印
            $_template.find('.comXiaoPiao-item').bind('click',function () {
                var _this=$(this);
                var sign=_this.attr('data-sign');
                if(_self.option.billsId===null){
                    $.zxsaas_plus.showalert("提示", "没有单据编号！")
                    return;
                }
                switch (sign){
                    case 'a4':
                        $.printBills('/manager/inventory/retail/cashier/sytkaidan',{billsId:_self.option.billsId});
                        break;
                    case 'xp':
                        printXP(_self.option.billsId,sign,_self);
                        break;
                    case 'jh':
                        if(_self.option.isJuHe==true){
                            printXP(_self.option.billsId,sign,_self)
                        }
                        break;
                }
            })
            this.dom =$_template;
            //是否显示聚合
            _self.resetJuHe();

        },
        //加载dom
        loadDom: function () {

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
        resetJuHe:function(){
            var _self=this;
            var $_template=_self.dom;
            //是否显示聚合
            if(_self.option.isJuHe==true){
                $_template.find('.icon-tingyong').hide();
                $_template.find('.comXiaoPiao-item[data-sign="jh"]').addClass('active');
            }
            else{
                $_template.find('.icon-tingyong').show();
                $_template.find('.comXiaoPiao-item[data-sign="jh"]').removeClass('active');
            }
        },
        // 默认模板
        getTemplate:function(){
            // 默认模板
            var _template = '<!-- 打印Modal -->\n' +
                '<div class="modal fade"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel">\n' +
                '  <div class="modal-dialog" role="document">\n' +
                '    <div class="modal-content" style="width: 900px;">\n' +
                '      <div class="modal-header">\n' +
                '        <button type="button" class="close"  aria-label="Close"><span aria-hidden="true">&times;</span></button>\n' +
                '        <h4 class="modal-title" >打印模板</h4>\n' +
                '      </div>\n' +
                '      <div class="modal-body">\n' +
                '        <div class="comXiaoPiao-item active" data-sign="a4">\n' +
                '        \t<div class="pdbox">A4页</div><img src="/manager/images/lingshou/a4.png" />\n' +
                '        </div>\n' +
                '        <div class="comXiaoPiao-item active"  data-sign="xp">\n' +
                '        \t<div class="pdbox">小票</div><img src="/manager/images/lingshou/xiaopiao.png" />\n' +
                '        </div>\n' +
                '        <div class="comXiaoPiao-item"  data-sign="jh">\n' +
                '           <i class="iconfont icon-tingyong none" ></i>' +
                '        \t<div class="pdbox">聚合收款</div><img src="/manager/images/lingshou/xp.png" />\n' +
                '        </i>\n' +
                '      </div>\n' +
                '    </div>\n' +
                '  </div>\n' +
                '</div>';
            return _template
        }
    };
    function printXP(id,sign,_self) {
        $.loading();
        $.ajax({
            url: '/manager/inventory/retail/delivery/smallTicketPrint',
            type: "post",
            dataType: 'html',
            data: {id:id},
            success: function (data) {
                $.loading(true);
                $(".billsDIVWrap").remove();
                $('body').append($(data))
                if(sign=='xp'){
                    LodoXiaoPiaopPrint(_self.option.isJuHe);
                }else{
                    LodoUnionPayMerchantPrint();
                }
            },error: function (msg) {
                $.loading(true);
                $.zxsaas_plus.showalert("提示","服务器繁忙,请稍后重试!");
            }
        });
    }

    window.comXiaoPiao = comXiaoPiao;

    //在插件中使用  组件对象
    $.fn.comXiaoPiao = function(options) {
        //创建的实体
        var obj = new comXiaoPiao(this, options);
        //调用其方法
        return obj;
    }
}(jQuery);