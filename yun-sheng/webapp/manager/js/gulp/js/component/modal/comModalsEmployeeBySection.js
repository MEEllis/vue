/*
依赖部门的经办人
*/

!function ($) {

    // 构造函数
    var comModalsEmployeeBySection = function (el, option) {
        var _self=this;
        // 默认参数
        var defaults = {
            sectionIds:'',  //部门对象
            girdUrl:'/manager/component/employee/getEmployeeVoPageList',
            girdParam:{
                sectionIds:null,
            },
            name:'经办人',
            placeholder:'经办人编码,姓名',
            multiselect:false, //是否多选  （  默认：不多选）
            isHasTree:false,//是否有树  （  默认：没有树）
            colNames:['dataId','编码', '姓名', '所属部门', '职位', '联系方式', '员工属性名称', 'sectionId',  '备注'],
            colModel:[
                {name: 'dataId', index: 'dataId', width: 10, hidden: true},
                {name: 'code', index: 'code', width: 100, align: 'left', sorttype: "string", sortable: true},
                {name: 'name', index: 'name', width: 150, align: 'left', sorttype: 'string', sortable: true},
                {
                    name: 'sectionName',
                    index: 'sectionName',
                    width: 150,
                    align: 'left',
                    sorttype: 'string',
                    sortable: true
                },
                {
                    name: 'positionName',
                    index: 'positionName',
                    width: 150,
                    align: 'left',
                    sorttype: 'string',
                    sortable: true
                },
                {
                    name: 'telephone',
                    index: 'telephone',
                    width: 150,
                    align: 'center',
                    sorttype: 'string',
                    sortable: true
                },
                {name: 'attrName', index: 'attrName', width: 100, align: 'left', sortable: true},
                {name: 'sectionId', index: 'sectionId', width: 10, hidden: true},
                {name: 'remark', index: 'remark', width: 100, align: 'left', sortable: true},
                ],
            clickBefore:function () {
                var sectionIds=$.trim($(_self.option.sectionIds).data('id'))|| $.trim($(_self.option.sectionIds).val());
                //检查部门是否选择
                if(sectionIds== ""){
                    $.zxsaas_plus.showalert("提示", '请先选部门！');
                    return false;
                }
                _self.parentE.option.girdParam.sectionIds=sectionIds;
            }
        };
        _self.option = $.extend(true, defaults, option);
        _self.parentE =new comModalsbox($(el),_self.option);
        return _self.parentE
    };

    //在插件中使用  组件对象
    $.fn.comModalsEmployeeBySection = function(options) {
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
            return  this.isObj=new comModalsEmployeeBySection(this, options);
        })
    }


}(jQuery);