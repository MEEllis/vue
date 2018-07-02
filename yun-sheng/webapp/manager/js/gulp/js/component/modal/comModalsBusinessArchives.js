/*
    往来单位组件
*/

!function ($) {

    // 构造函数
    var comModalsBusinessArchives = function (el, option) {
        // 默认参数
        var defaults = {
            girdUrl:'/manager/component/business/archives/getBusinessArchivesVoPageList',
            girdParam:{
                contactUnitId:''
            },
            treeUrl:'/manager/component/business/archives/getBusinessClassTreeNodeVoList',
            treeParams:{},
            name:'运营商业务',
            placeholder:'业务名称或业务账户编码',
            multiselect:true, //是否多选  （  默认：多选）
            isHasTree:true,//是否有树  （  默认：没有树）
            colNames: ['dataId', '运营商业务名称', '业务编码', '类别全路径','往来单位', '预估佣金', '备注'],
            colModel: [
                {name: 'dataId', index: 'dataId', sortable: false, align: 'center', hidden: true},
                {name: 'name', index: 'name', sortable: false, align: 'left', width: 200},
                {name: 'code', index: 'code', sortable: false, align: 'left', width: 200},
                {name: 'fullPath', index: 'fullPath', sortable: false, align: 'left', width: 200},
                {name: 'contactUnitName', index: 'contactUnitName', sortable: false, align: 'left', width: 200},
                {name: 'commission', index: 'commission', sortable: false, align: 'right', width: 125,formatter: 'number',},
                {name: 'remark', index: 'remark', sortable: false, align: 'left', width: 200},

            ],
        };
        this.option = $.extend(true, defaults, option);
        return new comModalsbox($(el),this.option);
    };


    //在插件中使用  组件对象
    $.fn.comModalsBusinessArchives = function(options) {
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
            return  this.isObj=new comModalsBusinessArchives(this, options);
        })
    }
}(jQuery);