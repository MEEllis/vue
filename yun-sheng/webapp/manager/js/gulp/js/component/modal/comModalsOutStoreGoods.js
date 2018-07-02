/*
获取在库商品信息集合(分页),供出库的单据使用,部门仓库选择后最后才能选择商品
*/

!function ($) {

    // 构造函数
    var comModalsOutStoreGoods = function (el, option) {
        var options = $.extend(true, {}, option);
        options.sign='out'
        var retObj=$(el).comModalsGoods(options);
        return retObj
    };
    //在插件中使用  组件对象
    $.fn.comModalsOutStoreGoods = function(options) {
        if (typeof options === 'string') {
            var fn =comModalsbox.prototype.getMethod(options);
            if (!fn) {
                throw ("comModalsbox - No such method: " + options);
            }
            var args = $.makeArray(arguments).slice(1);
            this.each(function(){
                return fn.apply(this.isObj,args);
            })
        }
        return this.each(function(){
            if(this.isObj){
                return;
            }
            return  new comModalsOutStoreGoods(this, options);
        })
    }


}(jQuery);