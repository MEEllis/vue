/*
颜色
*/

!function ($) {

    // 构造函数
    var comModalsColor = function (el, option) {
        // 默认参数
        var defaults = {
            girdUrl:'/manager/component/goods/getGoodsColorVoPageList',
            girdParam:{},
            name:'颜色',
            placeholder:'颜色编码，名称',
            multiselect:false, //是否多选  （  默认：不多选）
            isHasTree:false,//是否有树  （  默认：没有树）
            colNames:['dataId','颜色名称','颜色编码'],
            colModel:[
                {name : 'dataId',index : 'dataId',align:'center',width:50,hidden: true},
                {name : 'name',index : 'name',align:'left',width:400,sortable:true},
                {name : 'code',index : 'code',align:'left',width:200,sortable:true},
                ]
        };
        this.option = $.extend(true, defaults, option);
        return new comModalsbox($(el),this.option);

    };

    //在插件中使用  组件对象
    $.fn.comModalsColor = function(options) {
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
            return this.isObj= new comModalsColor(this, options);


        })
    }
}(jQuery);