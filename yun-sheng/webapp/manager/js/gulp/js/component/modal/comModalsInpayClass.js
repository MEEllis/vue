/*
    往来单位组件
*/

!function ($) {

    // 构造函数
    var comModalsInpayClass = function (el, option) {
        // 默认参数
        var defaults = {
            girdUrl:'/manager/component/inpayClass/getInpayClassVoPageList',
            girdParam:{
                queryKey:'',
                dataId:option.type||'',
            },
            treeUrl:'/manager/component/inpayClass/getInpayClassTreeNodeVoList',
            treeParams:{
                type:option.type||''
            },
            name:'类别名称',
            placeholder:'编码，名称',
            multiselect:false, //是否多选  （  默认：不多选）
            isHasTree:true,//是否有树  （  默认：没有树）
            colNames: ['dataId','classifyId','类别编码', '类别名称', '收支分类', '备注'],
            colModel: [
                {name: 'dataId', index: 'dataId', sortable: true, align: 'left',hidden:true},
                {name:'classifyId',index:'classifyId',align:'left',sortable:true,hidden:true},
                {name: 'code', index: 'code', sortable: true, align: 'left', width: 150},
                {name: 'name', index: 'name', sortable: true, align: 'left', width: 150},
                {name: 'classifyAddress', index: 'classifyAddress', sortable: true, align: 'left', width: 300},
                {name: 'remark', index: 'remark', sortable: true, align: 'left', width: 200},
            ],
        };
        this.option = $.extend(true, defaults, option);
        return new comModalsbox($(el),this.option);
    };

    //在插件中使用  组件对象
    $.fn.comModalsInpayClass = function(options) {
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
            return  this.isObj=new comModalsInpayClass(this, options);
        })
    }
}(jQuery);