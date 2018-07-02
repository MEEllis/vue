/*
 在库的商品
*/

!function ($) {

    // 构造函数
    var comModalsStoreGoods = function (el, option) {
        var options = $.extend(true, {}, option);
        options.sign='store'
        var retObj=$(el).comModalsGoods(options);
        return retObj
    };
    //在插件中使用  组件对象
    $.fn.comModalsStoreGoods = function(options) {
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
            return  new comModalsStoreGoods(this, options);
        })
    }


}(jQuery);