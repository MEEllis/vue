/*
依赖部门的经办人
*/

!function ($) {

    // 构造函数
    var comModalsgroup = function (el, option) {
        var _self=this;
        // 默认参数
        var defaults = {
            girdUrl:'/manager/inventory/common/getGroupList',
            girdParam:{
            },
            name:'集团选择',
            placeholder:'请输入集团编码,名称',
            multiselect:false, //是否多选  （  默认：不多选）
            isHasTree:false,//是否有树  （  默认：没有树）
            colNames:['dataId','集团编码', '集团名称'],
            colModel:[
                {name: 'dataId', index: 'dataId', width: 10, hidden: true},
                {name: 'code', index: 'code', width:  150, align: 'left', sorttype: "string", sortable: true},
                {name: 'name', index: 'name', width: 250, align: 'left', sorttype: 'string', sortable: true},
                ],
        };
        this.option = $.extend(true, defaults, option);
        return new comModalsbox($(el),this.option);
    };

    //在插件中使用  组件对象
    $.fn.comModalsgroup = function(options) {
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
            return  this.isObj=new comModalsgroup(this, options);
        })
    }


}(jQuery);