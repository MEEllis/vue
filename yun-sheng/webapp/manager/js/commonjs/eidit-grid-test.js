
/**
 * 编辑表格
 * @param option
 * @author XiangRui
 */
function MyEiditGrid(config,callBacks){

    //表格
    this.gridId = config.gridId;
    this.$grid = $("#"+config.gridId);
    this.kongRow = config.addRow||{};


    //参数
    config.viewrecords = ("undefined"!=typeof config.viewrecords)?config.viewrecords:true;
    config.autowidth = ("undefined"!=typeof config.autowidth)?config.autowidth:true;
    config.multiselect = ("undefined"!=typeof config.multiselect)?config.multiselect:false;
    config.multiboxonly = ("undefined"!=typeof config.multiboxonly)?config.multiboxonly:true;
    config.rownumbers = ("undefined"!=typeof config.rownumbers)?config.rownumbers:true;
    config.cellEdit = ("undefined"!=typeof config.cellEdit)?config.cellEdit:true;
    config.caption = ("undefined"!=typeof config.caption)?config.caption:"";
    config.footerrow = ("undefined"!=typeof config.footerrow)?config.footerrow:true;
    config.noShowAdd = ("undefined"!=typeof config.noShowAdd)?config.viewrecords:false;
    config.shrinkToFit = ("undefined"!=typeof config.shrinkToFit)?config.shrinkToFit:true;
    config.pager = ("undefined"!=typeof config.pager)?config.pager:'';

    for ( var int = 0; int < config.colModel.length; int++) {
        var colmodel=config.colModel[int];
        colmodel.sortable = false;
        if(colmodel.edittype == "custom_bt_input"){
            colmodel.edittype = "custom";
            colmodel.editoptions = {
                custom_element:my_bt_input,
                custom_value:my_bt_value,
                custom_element_bt_click:colmodel.custom_element_bt_click,
				custom_element_bt_search:colmodel.custom_element_bt_search
            };
        }else if($.trim(colmodel.edittype)==""){
            //给输入框添加 默认 失去焦点 选中 事件
            if(colmodel.editable===true){
                colmodel.editoptions=colmodel.editoptions||{}
                colmodel.editoptions.dataEvents=colmodel.editoptions.dataEvents||[]
                var typeList=[]
                for(var m=0;m<colmodel.editoptions.dataEvents.length;m++){
                    var type=$.trim(colmodel.editoptions.dataEvents[m].type)
                    if(type.length>0){
                        typeList.push(type)
                    }
                }

                if($.inArray('blur',typeList)===-1){
                   // 失去焦点
                    colmodel.editoptions.dataEvents.push({
                        type: "blur",
                        fn: function(){
                            MyEiditGrid.currEditDataGrid.unAllEdit();
                        }
                    })
                }

                if($.inArray('focus',typeList)===-1){


                    // 选中
                    colmodel.editoptions.dataEvents.push({
                        type: "focus",
                        fn: function(){
                            this.select()
                        }
                    })
                }
            }


        }
    }
    this.config = config;

    //回调函数
    this.callBacks = callBacks;
    this.lastrow = null;
    this.lastcell = null;
    this.currEiditGrid = this;
    this.isOnLine = null;

    var obj = this;

    if(MyEiditGrid.allGrid == null)MyEiditGrid.allGrid = [];
    MyEiditGrid.currEditDataGrid = obj;
    MyEiditGrid.allGrid[this.gridId] = obj;

    //追加序号和操作
    this.config.colNames.unshift('操作');
    this.config.colModel.unshift({name : 'op',frozen:true,index : 'op',hidden:config.noShowOp==false?true:false ,width:'60px',align:'left',formatter:this.formatterOperation,sortable: false});

    this.addRowId =config.gridId + "_addRowId";
    this.addRowTdHtml = $.map(this.config.colNames,function(){return "<td></td>";}).join(" ");

    $.jgrid.defaults.width = 1280;
    $.jgrid.defaults.responsive = true;
    var rowList=''
    if($.trim(this.config.pager)!=''){
        rowList=[100,200,500]
    }
    this.$grid.jqGrid({
        datatype : "local",
        colNames : this.config.colNames,
        colModel : this.config.colModel,
        styleUI: 'Bootstrap',
        viewrecords : this.config.viewrecords ,
        autowidth : true,
        multiselect : this.config.multiselect,
        multiboxonly : true,
        rownumbers:true,
        height:this.config.height,
        cellEdit: true,
        cellsubmit: 'clientArray',
        caption : "",
        footerrow:true ,
        pager:this.config.pager,
        rowList : rowList,
        shrinkToFit:this.config.shrinkToFit ,
        onCellSelect:function(rowid,iCol,cellcontent,e)
        {
            try {
                //正式单据明细备注可以修改
                var colModelList = obj.$grid.jqGrid('getGridParam','colModel');
                if(obj.isOnLine == true){
                    obj.unAllEdit()
                    obj.$grid.setGridParam({cellEdit:false});
                    obj.isOnLine = null;
                }
                if(!obj.isCanEdit()&&colModelList[iCol].name == "remark"){
                    obj.$grid.setGridParam({cellEdit:true});
                    obj.isOnLine = true;
                }
                obj.callBacks.onCellSelect(rowid,iCol,cellcontent,e);//编辑之后
                try {MyEiditGrid.currEditDataGrid.unAllEdit();} catch (e) {}
            } catch (el) {
                //console.log(el);
            }
        },

        beforeEditCell:function(rowid,cellname,v,iRow,iCol)
        {
            obj.lastrow = iRow;
            obj.lastcell = iCol;
            MyEiditGrid.currEditDataGrid = obj;
        },
        afterEditCell : function(rowid,name,val,iRow,iCol) {
            try {
                obj.callBacks.afterEditCell(rowid,name,val,iRow,iCol);//编辑之后
            } catch (e) {
                console.log(e);
            }
            setTimeout('MyEiditGrid.getFocus('+'"#'+iRow+'_'+name+'")',200)

        },
        afterSaveCell : function(rowid,name,val,iRow,iCol) {
            try {
                obj.callBacks.afterSaveCell(rowid,name,val,iRow,iCol);//保存之后

            } catch (e) {
                console.log(e);
            }
            obj.callBacks.summary(rowid,name,val,iRow,iCol);//保存后相关统计
        },
        gridComplete:function(){
            if(obj.callBacks.gridComplete){
                obj.callBacks.gridComplete();
            }
        },
        loadComplete: function (data) {
        	if(obj.callBacks.loadComplete){
        		obj.callBacks.loadComplete(data);//保存后相关统计
        	}
        },
        afterInsertRow: function (rowid,rowdata) {
            if(obj.callBacks.afterInsertRow){
                obj.callBacks.afterInsertRow(rowid,rowdata);
            }
        },
    });

    this.clearDataGrid();
   
    function my_bt_input(value, options) {
        var html =  '<input type="text" readonly="readonly" class="form-control" value="'+value+' " onkeyup="'+options.custom_element_bt_search+'()'+'"/>'+
            '<span class="glyphicon glyphicon-plus" data-toggle="modal" style="float:right;cursor: pointer;margin-top: -25px;margin-right: 7px;"'+
            ' onclick="javascript:'+options.custom_element_bt_click+'({gridId:\''+obj.gridId+'\',rowId:\''+options.rowId+'\',cellInputId:\''+options.id+'\'});'
            +' "></span>';
        return $(html);
    }
    function my_bt_value(value) {
        return value.val();
    }
}

//格式化操作
MyEiditGrid.prototype.formatterOperation = function(cellvalue, options, rowObject){
    return '<a class="btn" style="\n' +
        '    padding: 0px;\n' +
        '   width: 100%;\n' +
        '" id="'+options.gid+','+options.rowId+
    '" onclick="javascript: MyEiditGrid.delClickRow(\''+options.gid+'\',\''+options.rowId+'\');"><i class="glyphicon glyphicon-trash"></i></a>';
}

MyEiditGrid.prototype.setColProp = function(name, options){
    if(options.edittype == "custom_bt_input"){
        options.edittype = "custom";
        options.editoptions = {custom_element:my_bt_input,custom_value:my_bt_value,
            custom_element_bt_click:options.custom_element_bt_click,
			custom_element_bt_search:options.custom_element_bt_search};

    }
    this.$grid.setColProp(name,options);
    var obj = this;
    function my_bt_input(value, options) {
        var html =  '<input type="text" readonly="readonly" class="form-control" value="'+value+'">'+
            '<span class="glyphicon glyphicon-plus" data-toggle="modal" style="float:right;cursor: pointer;margin-top: -25px;margin-right: 7px;"'+
            ' onclick="javascript:'+options.custom_element_bt_click+'({gridId:\''+obj.gridId+'\',rowId:\''+options.rowId+'\',cellInputId:\''+options.id+'\'});'
            +' "></span>';
        return $(html);
    }
    function my_bt_value(value) {
        return value.val();
    }
}

//是否可以编辑
MyEiditGrid.prototype.isCanEdit = function(){
    var isE = this.$grid.jqGrid('getGridParam', "cellEdit");
    if(isE){
        return true;
    }else{
        return false;
    }
}

//设置添加按钮显示
MyEiditGrid.prototype.AddButtonshow = function(){
    $("#gbox_"+this.gridId).siblings(".addProduct").show();
}

//设置添加按钮隐藏
MyEiditGrid.prototype.AddButtonhide = function(){
    $("#gbox_"+this.gridId).siblings(".addProduct").hide();
}


//取消编辑
MyEiditGrid.prototype.unAllEdit = function(){
    try {
        this.$grid.jqGrid("saveCell",this.lastrow,this.lastcell);
    } catch (e) {
        // TODO: handle exception
    }
}

//清理表格
MyEiditGrid.prototype.clearDataGrid = function(){
    var disp = this.config.noShowAdd?"display:none;":"";
    this.$grid.jqGrid('clearGridData');
    $("#"+this.gridId+" tbody").append('<tr id="'+this.addRowId+'" class="jqgrow" style="'+disp+'height:40px;outline-style:none;" onclick="javascript:MyEiditGrid.currEditDataGrid.unAllEdit();"><td><a class="btn" id="" onclick="javascript:'+this.gridId+'.addKongRow()" style="padding:0px;padding-left:3px;"><i class="glyphicon glyphicon-plus"></i></a></td>'+this.addRowTdHtml+'</tr>');
}

//检查表格数据是否存在
MyEiditGrid.prototype.isExistRow = function(para){
    var objList = [];
    var ids=this.$grid.getDataIDs();
    var grid = this.$grid;//临时存放
    var gridId = this.gridId;
    $.each(ids,function(i,value){
        var row = grid.jqGrid('getRowData', value );
        var row_return = {};
        $.each(para, function(name, value) {
            row_return[name] = row[name];
        });
        objList.push(row_return);
    });
    for ( var i = 0; i < objList.length; i++) {
        if(_.isEqual(para,objList[i])){
            return true;
        }
    }
    return false;
}

//根据条件清理数据
MyEiditGrid.prototype.clearRowByPara = function(para){
    var objList = [];
    var ids=this.$grid.getDataIDs();
    var grid = this.$grid;//临时存放
    var gridId = this.gridId;
    $.each(ids,function(i,value){
        var row = grid.jqGrid('getRowData', value );
        var row_return = {};
        $.each(para, function(name, value) {
            row_return[name] = row[name];
        });
        objList.push(row_return);
    });
    for ( var i = 0; i < objList.length; i++) {
        if(_.isEqual(para,objList[i])){
            //删除此数据
            $("#"+gridId).jqGrid('delRowData', ids[i]);
            MyEiditGrid.allGrid[gridId].callBacks.summary();
        }
    }
}
//查询行根据Model 如果查询多个 只选择其中一个
MyEiditGrid.prototype.getRowsByModel = function(para){
    var ids=this.$grid.getDataIDs();
    var grid = this.$grid;//临时存放
    var gridId = this.gridId;
    var list = [];
    for ( var int = 0; int < ids.length; int++) {
        var row = grid.jqGrid('getRowData', ids[int] );
        var row_return = {};
        $.each(para, function(name, value) {
            row_return[name] = row[name];
        });
        if(_.isEqual(para,row_return)){
            row.rowId = ids[int];
            row.gridId = gridId;
            delete row["op"];
            list.push(row);
        }
    }
    return list;
}

//根据指定字段查询更新数据表
MyEiditGrid.prototype.updateRows = function(keys,model){

    var query = {};
    for ( var int = 0; int < keys.length; int++) {
        query[keys[int]] = model[keys[int]]+"";
    }

    var ids=this.$grid.getDataIDs();
    var grid = this.$grid;//临时存放
    var gridId = this.gridId;
    for ( var int = 0; int < ids.length; int++) {
        var row = grid.jqGrid('getRowData', ids[int] );
        var row_return = {};
        for ( var int2 = 0; int2 < keys.length; int2++) {
            row_return[keys[int2]] = row[keys[int2]];
        }
        if(_.isEqual(query,row_return)){
            grid.jqGrid('setRowData', ids[int], model);
        }
    }
}

//查询行根据Model 如果查询多个 只选择其中一个
MyEiditGrid.prototype.getRowByModel = function(para){
    var ids=this.$grid.getDataIDs();
    var grid = this.$grid;//临时存放
    var gridId = this.gridId;
    for ( var int = 0; int < ids.length; int++) {
        var row = grid.jqGrid('getRowData', ids[int] );
        var row_return = {};
        $.each(para, function(name, value) {
            row_return[name] = row[name];
        });
        if(_.isEqual(para,row_return)){
            row.rowId = ids[int];
            row.gridId = gridId;
            delete row["op"];
            return row;
        }
    }
    return null;
}

//提取表格合格数据
MyEiditGrid.prototype.getGridDataList = function(){
    var objList = [];
    var ids=this.$grid.getDataIDs();
    var grid = this.$grid;//临时存放
    var gridId = this.gridId;
    $.each(ids,function(i,value){
        var row = grid.jqGrid('getRowData', value );
        row.rowId = value;
        row.gridId = gridId;
        delete row["op"];

        if(!isNaN(row.rowId)){
            objList.push(row);
        }
    });
    var arrs = this.callBacks.getGridDataList(objList);
    $.each(arrs,function(i,rrow){
        delete rrow["rowId"];
        delete rrow["gridId"];
    });
    return arrs;
}

MyEiditGrid.prototype.getGridDataList2 = function(){
    var objList = [];
    var ids=this.$grid.getDataIDs();
    var grid = this.$grid;//临时存放
    var gridId = this.gridId;
    $.each(ids,function(i,value){
        var row = grid.jqGrid('getRowData', value );
        row.rowId = value;
        row.gridId = gridId;
        delete row["op"];
        objList.push(row);
    });
    var arrs = this.callBacks.getGridDataList2(objList);
    $.each(arrs,function(i,rrow){
        //delete rrow["rowId"];
        delete rrow["gridId"];
    });
    return arrs;
}

MyEiditGrid.prototype.getGridDataList2 = function(){
    var objList = [];
    var ids=this.$grid.getDataIDs();
    var grid = this.$grid;//临时存放
    var gridId = this.gridId;
    $.each(ids,function(i,value){
        var row = grid.jqGrid('getRowData', value );
        row.rowId = value;
        row.gridId = gridId;
        delete row["op"];
        objList.push(row);
    });
    var arrs = this.callBacks.getGridDataList2(objList);
    $.each(arrs,function(i,rrow){
        delete rrow["rowId"];
        delete rrow["gridId"];
    });
    return arrs;
}

//添加空行
MyEiditGrid.prototype.addKongRow = function(){
    try {
        if(this.isOnLine == true){
            this.unAllEdit()
            this.$grid.setGridParam({cellEdit:false});
            this.isOnLine = null;
        }

        var isE = this.$grid.jqGrid('getGridParam', "cellEdit");
        if(isE){
            this.unAllEdit()
            this.addRowData((MyEiditGrid.getMaxRowid(this.$grid)+1),this.kongRow);
        }else{
            return ;
        }
    } catch (e) {
        // TODO: handle exception
    }
}

//设置空行
MyEiditGrid.prototype.setKongRow = function(krow){
    this.kongRow = krow;
}

//添加行数据
MyEiditGrid.prototype.addRowData = function(rowid,data,where,rowid2){
    var disp = this.config.noShowAdd?"display:none;":"";
    $("#"+this.addRowId).remove();
    if("undefined" != typeof where){
        if("undefined" != typeof rowid2){
            this.$grid.jqGrid('addRowData',rowid,data,where,rowid2);
        }else{
            this.$grid.jqGrid('addRowData',rowid,data,where);
        }
    }
    this.$grid.jqGrid('addRowData',rowid,data);
    $("#"+this.gridId+" tbody").append('<tr id="'+this.addRowId+'" class="addRow" style="'+disp+';"  onclick="javascript:'+this.gridId+'.addKongRow()"><td><a class="btn" id=""  style="padding:0px;padding-left:3px;"><i class="glyphicon glyphicon-plus"></i></a></td>'+this.addRowTdHtml+'</tr>');

}

//添加行数据列表
MyEiditGrid.prototype.addRowDatas = function(datas){
    try {
        this.$grid.jqGrid('clearGridData');
        for ( var i = 0; i < datas.length; i++) {
            this.addRowData(MyEiditGrid.getMaxRowid(this.$grid)+1, datas[i]);
        }
    } catch (e) {
        // console.log(e);
    }
    return this;
}



/****静态方法***/

MyEiditGrid.getFocus = function (id){
    $(id).focus();
}

//MyEiditGrid.callBackInputFocus = function (cellInfo){
//	setTimeout('MyEiditGrid.getFocus('+'"#'+cellInfo.gridId+' #'+cellInfo.cellInputId+'")',200);
//}

//获取表格最大rowId
MyEiditGrid.getMaxRowid = function(grid){
    var ids=grid.getDataIDs();
//	if(ids.length == 0)return 99999;
    var maxId = 0;
    for ( var i = 0; i < ids.length; i++) {
        if(parseInt(ids[i]) > maxId){
            maxId = parseInt(ids[i]);
        }
    }
    return maxId;
}

//判断表格是否编辑状态
MyEiditGrid.delClickRow = function(gridId,rowId){
    try {MyEiditGrid.currEditDataGrid.unAllEdit();} catch (e) {}
    var isE = $("#"+gridId).jqGrid('getGridParam', "cellEdit");
    if(isE){
        $.MsgBox("操作提示",MyEiditGrid.allGrid[gridId].config.deleteLable||"确定要删除此行？",function(){
            try {
                //切换一下删除和回调事件的顺序    2017.12.14
                var info=$("#"+gridId).getRowData(rowId)
                $("#"+gridId).jqGrid('delRowData', rowId);
                delArr = info.imei;
                try {
                    MyEiditGrid.allGrid[gridId].callBacks.deleteCallBack(info);

                } catch (e) {
                }
                MyEiditGrid.allGrid[gridId].callBacks.summary(info);
            } catch (e) {
            }
        },function(){});
    }else{
        return ;
    }
}

MyEiditGrid.$ = function(gridId){
    try {
        if(arguments.length == 1){
            //参数1个 查询表格
            return MyEiditGrid.allGrid[gridId];
        }
    } catch (e) {
        console.log(e);
    }
}
MyEiditGrid.currEditDataGrid = null;
MyEiditGrid.allGrid = null;


// $(document).click(function(e){
//     try {
//         e = window.event || e; // 兼容IE7
//         obj = $(e.srcElement || e.target);
//         if ($(obj[0]).is(".ui-jqgrid-bdiv")) {
//             MyEiditGrid.currEditDataGrid.unAllEdit();
//         }
//     } catch (e) {
//         // TODO: handle exception
//     }
// });


