/*
 全部部门组件
*/

!function ($) {

    // 构造函数
    var comModalsSection = function (el, option) {
        // 默认参数
        var defaults = {
            girdUrl:'/manager/component/section/getAllSectionVoPageList',
            girdParam:{
                queryKey:'',
                typeId:'',
            },
            treeUrl:'/manager/component/section/getAllSectionTreeNodeVoList',
            treeParams:{
                sectionIsStore:0
            },
            name:'部门',
            placeholder:'编码，名称',
            multiselect:false, //是否多选  （  默认：不多选）
            isHasTree:true,//是否有树  （  默认：没有树）
            colNames: [ 'dataId', '编码', '名称', '部门属性', '所属上级', '所属地区', '启用日期', '备注'],
            colModel: [
                    {name: 'dataId', index: 'dataId', width: 10, hidden: true},
                    {name: 'code', index: 'code', width: 150, align: 'center', sorttype: "string", sortable: true},
                    {name: 'name', index: 'name', width: 150, align: 'center', sorttype: 'string', sortable: true},
                    {
                        name: 'attrName',
                        index: 'attrName',
                        width: 150,
                        align: 'left',
                        sorttype: 'string',
                        sortable: true
                    },
                    {
                        name: 'parentName',
                        index: 'parentName',
                        width: 150,
                        align: 'left',
                        sorttype: 'string',
                        sortable: true
                    },
                    {
                        name: 'regionName',
                        index: 'regionName',
                        width: 150,
                        align: 'left',
                        sorttype: 'string',
                        sortable: true
                    },
                    {name: 'usedDateStr', index: 'usedDateStr', width: 100, sortable: true},
                    {name: 'remark', index: 'remark', width: 100, sortable: true},
                ],
        };
        this.option = $.extend(true, defaults, option);
        return new comModalsbox($(el),this.option);
    };

    //在插件中使用  组件对象
    $.fn.comModalsSection = function(options) {
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
            return  this.isObj=new comModalsSection(this, options);
        })
    }
}(jQuery);