/*
    往来单位组件
*/

!function ($) {

    // 构造函数
    var comModalsAccount = function (el, option) {
        // 默认参数
        var defaults = {
            girdUrl:'/manager/component/account/getAccountVoList',
            girdParam:{
                sectionId:''
            },
            treeUrl:'/manager/component/account/getAccountClassTreeNodeVoList',
            treeParams:{},
            name:'资金账户选择',
            placeholder:'账户名称或账户编码',
            multiselect:true, //是否多选  （  默认：多选）
            isHasTree:true,//是否有树  （  默认：没有树）
            colNames: ['dataId', '账户编码', '账户名称', '账户类型','账户类型Code', '开户行', '账号'],
            colModel: [
                {name: 'dataId', index: 'dataId', sortable: false, align: 'center', hidden: true},
                {name: 'code', index: 'code', sortable: false, align: 'center', width: 125},
                {name: 'name', index: 'name', sortable: false, align: 'center', width: 125},
                {name: 'accountTypeName', index: 'accountTypeName', sortable: false, align: 'center', width: 125},
                {name: 'accountTypeCode', index: 'accountTypeCode', sortable: false, align: 'center', width: 125, hidden: true},
                {name: 'bankCode', index: 'bankCode', sortable: false, align: 'center', width: 125},
                {name: 'bankCard', index: 'bankCard', sortable: false, align: 'center', width: 125},

            ],
            treeSelCod:true,
        };
        this.option = $.extend(true, defaults, option);
        return new comModalsbox($(el),this.option);
    };


    //在插件中使用  组件对象
    $.fn.comModalsAccount = function(options) {
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
            return  this.isObj=new comModalsAccount(this, options);
        })
    }
}(jQuery);