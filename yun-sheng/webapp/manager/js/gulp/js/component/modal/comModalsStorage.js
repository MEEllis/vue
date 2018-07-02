/*
仓库

*/

!function ($) {

    // 构造函数
    var comModalsStorage = function (el, option) {
        // 默认参数
        var defaults = {
            girdUrl:'/manager/component/storage/getStorageVoPageList',
            girdParam:{
                queryKey:'',
                typeId:'',
            },
            treeUrl:'/manager/component/section/getAccessSectionTreeNodeVoList',
            treeParams:{
                sectionIsStore:1   //  1就只查门店
            },
            name:'仓库',
            placeholder:'编码，名称',
            multiselect:false, //是否多选  （  默认：不多选）
            isHasTree:true,//是否有树  （  默认：没有树）
            colNames:['dataId','仓库编码','仓库名称','部门编码','部门名称','仓库类型','是否为默认仓','备注'],
            colModel:[
                {name : 'dataId',index : 'dataId',align:'center',width:50,hidden: true},
                {name : 'code',index : 'code',align:'left',width:150,sortable:true},
                {name : 'name',index : 'name',align:'left',width:150,sortable:true},
                {name : 'sectionCode',index : 'sectionCode',align:'left',width:150,sortable:true},
                {name : 'sectionName',index : 'sectionName',align:'left',width:150,sortable:true},
                {name : 'type',index : 'type',align:'left',width:150,sortable:true},
                {name : 'defaultStorage',index : 'defaultStorage',align:'left',width:150,sortable:true,formatter: "select", editoptions:{value:"0:否;1:是;"}},
                {name : 'remark',index : 'remark',align:'left',width:150,sortable:true},
            ]
        };
        this.option = $.extend(true, defaults, option);
        return new comModalsbox($(el),this.option);
    };

    //在插件中使用  组件对象
    $.fn.comModalsStorage = function(options) {
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
            return  this.isObj=new comModalsStorage(this, options);
        })
    }
}(jQuery);