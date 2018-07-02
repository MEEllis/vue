/*
    往来单位组件
*/

!function ($) {

    // 构造函数
    var comModalsContactUnit = function (el, option) {
        // 默认参数
        var defaults = {
            girdUrl:'/manager/component/contactUnit/getContactUnitVoPageList',
            girdParam:{
                queryKey:'',
                typeId:'',
            },
            treeUrl:'/manager/component/contactUnit/getContactUnitClassTreeNodeVoList',
            treeParams:{},
            name:'往来单位',
            placeholder:'编码，名称',
            multiselect:false, //是否多选  （  默认：不多选）
            isHasTree:true,//是否有树  （  默认：没有树）
            colNames: ['dataId', '往来单位编码', '往来单位名称', '往来单位类型'],
            colModel: [
                {name: 'dataId', index: 'dataId', sortable: true, align: 'center', hidden: true},
                {name: 'code', index: 'code', sortable: true, align: 'center', width: 150},
                {name: 'name', index: 'name', sortable: true, align: 'center', width: 186},
                {
                    name: 'contactUnitClassName',
                    index: 'contactUnitClassName',
                    sortable: true,
                    align: 'center',
                    width: 180
                },
            ],
        };
        this.option = $.extend(true, defaults, option);
        return new comModalsbox($(el),this.option);
    };


    //在插件中使用  组件对象
    $.fn.comModalsContactUnit = function(options) {
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
            return  this.isObj=new comModalsContactUnit(this, options);
        })
    }
}(jQuery);