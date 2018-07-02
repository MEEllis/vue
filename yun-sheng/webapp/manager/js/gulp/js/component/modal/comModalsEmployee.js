/*
获取本公司下所有员工信息(分页)
*/

!function ($) {

    // 构造函数
    var comModalsEmployee = function (el, option) {
        var _self=this;
        option=option||{}
        option.girdParam=option.girdParam||{}
        var name='经办人'
        if(option.girdParam.empIsOperator==1){
            name='制单人'
        }
        if(option.name){
			name = option.name
        }
        // 默认参数
        var defaults = {
            sectionIds:'',  //部门对象
            girdUrl:'/manager/component/employee/getCompanyEmployeeVoPageList',
            girdParam:{
                empIsOperator:0,  //是否只查操作员(0:非;1:是;2:全部)   0是经手人 1 制单人
            },
            name:name,
            placeholder:name+'编码,姓名',
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
                ]
        };
        var options = $.extend(true, defaults, option);
        return  new comModalsbox($(el),options);
    };

    //在插件中使用  组件对象
    $.fn.comModalsEmployee = function(options) {
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
            return  this.isObj=new comModalsEmployee(this, options);
        })
    }


}(jQuery);