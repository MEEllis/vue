
/**
 * 财务表格
 * @param option
 * @author XiangRui
 */
function CwGrid(config,callBacks){
	
	//生成参数
	config.viewrecords   = ("undefined"!=typeof config.viewrecords)?config.viewrecords:true;
	config.autowidth     = ("undefined"!=typeof config.autowidth)?config.autowidth:true;
	config.multiselect   = ("undefined"!=typeof config.multiselect)?config.multiselect:false;
	config.multiboxonly  = ("undefined"!=typeof config.multiboxonly)?config.multiboxonly:true;
	config.rownumbers    = ("undefined"!=typeof config.rownumbers)?config.rownumbers:true;
	config.cellEdit      = ("undefined"!=typeof config.cellEdit)?config.cellEdit:true;
	config.caption       = ("undefined"!=typeof config.caption)?config.caption:"";
	config.footerrow     = ("undefined"!=typeof config.footerrow)?config.footerrow:false;
	config.showAddBt     = ("undefined"!=typeof config.showAddBt)?config.showAddBt:false;
	config.showDelBt     = ("undefined"!=typeof config.showDelBt)?config.showDelBt:false;
	config.cellEdit     = ("undefined"!=typeof config.cellEdit)?config.cellEdit:false;
	config.rownumbers    = ("undefined"!=typeof config.rownumbers)?config.rownumbers:true;
	
	
	//扫描列模型，配置自定义编辑器
	for ( var int = 0; int < config.colModel.length; int++) {
		config.colModel[int].sortable = false;
		if(config.colModel[int].edittype == "custom_bt_input"){
			config.colModel[int].edittype = "custom";
			config.colModel[int].editoptions = {
					custom_element:my_bt_input,
					custom_value:my_bt_value,
					custom_element_bt_click:config.colModel[int].custom_element_bt_click};
		}
	}
	
	//设置属性
	this.gridId = config.gridId;//表格ID
	this.$grid = $("#"+config.gridId);//表格对象
	this.kongRow = config.addRow;//空行默认值
	this.config = config;

	//回调函数
	this.callBacks = callBacks;
	this.lastrow = null; 
	this.lastcell = null;
	this.currEiditGrid = this;
	this.isOnLine = null;
	
	var obj = this;//包内方法是用
	
	//记录创建的表格对象，方便日后调用
	if(CwGrid.allGrid == null)CwGrid.allGrid = [];
	CwGrid.allGrid[this.gridId] = obj;
	CwGrid.currEditDataGrid = obj;
	
	//追加序号和操作
	this.config.colNames.unshift('操作');
	this.config.colModel.unshift({name : 'op',index : 'op',hidden:config.showDelBt==false?true:false ,width:'60px',fixed:true,align:'left',formatter:this.formatterOperation,sortable: false});
	
	this.addRowId =config.gridId + "_addRowId";
	this.addRowTdHtml = $.map(this.config.colNames,function(){return "<td></td>";}).join(" ");

	this.$grid.jqGrid({
        datatype : "local",
        colNames : this.config.colNames,  
        colModel : this.config.colModel,
        styleUI: 'Bootstrap',
        viewrecords : this.config.viewrecords ,
        autowidth : true,
        multiselect : this.config.multiselect,
        multiboxonly : true,
        height:20,
        rownumbers:this.config.rownumbers,
        cellEdit: config.cellEdit,
        cellsubmit: 'clientArray',
        caption : "",
        footerrow:this.config.footerrow ,
        onCellSelect:function(rowid,iCol,cellcontent,e)
        {//选择单元格
		      try {
		    	  obj.callBacks.onCellSelect(rowid,iCol,cellcontent,e);
		    	  try {CwGrid.currEditDataGrid.unAllEdit();} catch (e) {alert('dsf')}
			  } catch (el) {
//				  console.log(el);
			  }
        },
        beforeEditCell:function(rowid,cellname,v,iRow,iCol)
        {//编辑之前
			  obj.lastrow = iRow; 
			  obj.lastcell = iCol;
			  CwGrid.currEditDataGrid = obj;
        },
        afterEditCell:function(rowid,name,val,iRow,iCol) 
        {//编辑
		      try {
		    	  obj.callBacks.afterEditCell(rowid,name,val,iRow,iCol);
			  } catch (e) {
//				  console.log(e);
			  }
		},
	    afterSaveCell:function(rowid,name,val,iRow,iCol) 
	    {//保存之后
		      try {
		    	  obj.callBacks.afterSaveCell(rowid,name,val,iRow,iCol);//保存之后
			  } catch (e) {
//			  	  console.log(e);
			  }
			  obj.callBacks.summary(rowid,name,val,iRow,iCol);//保存后相关统计
	    }
	 });
	
	this.clear();
	
	function my_bt_input(value, options) {
        var html =  '<input type="text" readonly="readonly" class="form-control" value="'+value+'">'+
			        '<span class="glyphicon glyphicon-plus" data-toggle="modal" style="float:right;cursor: pointer;margin-top: -25px;margin-right: 17px;"'+
			        ' onclick="javascript:'+options.custom_element_bt_click+'({gridId:\''+obj.gridId+'\',rowId:\''+options.rowId+'\',cellInputId:\''+options.id+'\'});'
			        +' "></span>';
	   return $(html);             
	}
	function my_bt_value(value) {    
		return value.val();
	}
}

//格式化操作
CwGrid.prototype.formatterOperation = function(cellvalue, options, rowObject){ 
		return '<a class="btn" id="'+options.gid+','+options.rowId+
		       '" onclick="javascript: CwGrid.delClickRow(\''+options.gid+'\',\''+options.rowId+'\');options.gid"><i class="glyphicon glyphicon-trash"></i></a>';
}

//重载设置列属性方法-目的是确保自定义字段类型起作用
CwGrid.prototype.setColProp = function(name, options){ 
	if(options.edittype == "custom_bt_input"){
		options.edittype = "custom";
		options.editoptions = {custom_element:my_bt_input,custom_value:my_bt_value,
				custom_element_bt_click:options.custom_element_bt_click};
		
	}
	this.$grid.setColProp(name,options);
	var obj = this;
	function my_bt_input(value, options) {
        var html =  '<input type="text" class="form-control" value="'+value+'">'+
			        '<span class="glyphicon glyphicon-plus" data-toggle="modal" style="float:right;cursor: pointer;margin-top: -25px;margin-right: 7px;"'+
			        ' onclick="javascript:'+options.custom_element_bt_click+'({gridId:\''+obj.gridId+'\',rowId:\''+options.rowId+'\',cellInputId:\''+options.id+'\'});'
			        +' "></span>';
	   return $(html);             
	}
	function my_bt_value(value) {    
		return value.val();
	}
	return obj;
}

//获取是否可以编辑值
CwGrid.prototype.isCanEdit = function(){
	var isE = this.$grid.jqGrid('getGridParam', "cellEdit");
	if(isE){
		return true;
	}else{
		return false;
	}
}

//取消当前编辑
CwGrid.prototype.unAllEdit = function(){
	try {
		this.$grid.jqGrid("saveCell",this.lastrow,this.lastcell);
	} catch (e) {
		console.log(e);
	}
	return this;
}

//保存当前编辑
CwGrid.prototype.save = function(){
	try {
		this.$grid.jqGrid("saveCell",this.lastrow,this.lastcell);
	} catch (e) {
		console.log(e);
	}
	return this;
}

//清理表格 并 根据是否现实添加按钮 来控制是否显示添加空行
CwGrid.prototype.clear = function(){
	this.$grid.jqGrid('clearGridData');
	if(this.config.showAddBt){
		$("#"+this.gridId+" tbody").append('<tr id="'+this.addRowId+'" class="jqgrow" style="height:40px;outline-style:none;" onclick="javascript:CwGrid.$(\''+this.gridId+'\').unAllEdit();"><td><a class="btn" id="" onclick="javascript:CwGrid.$(\''+this.gridId+'\').addKongRow()" style="padding:0px;padding-left:3px;"><i class="glyphicon glyphicon-plus"></i></a></td>'+this.addRowTdHtml+'</tr>');	
	}
	return this;
}

//检查表格数据是否存在
CwGrid.prototype.isExistRow = function(para){
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

//根据指定字段查询更新数据表
CwGrid.prototype.updateRows = function(keys,model){
	
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

//查询行 根据Model 如果查询多个 只选择其中一个
CwGrid.prototype.getRowByModel = function(para){
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

//批量设置属性
CwGrid.prototype.setRowsValue = function(model){
	var ids=this.$grid.getDataIDs();
	var grid = this.$grid;//临时存放
	var gridId = this.gridId;
	for ( var int = 0; int < ids.length; int++) {
	  	var row = grid.jqGrid('getRowData', ids[int] );
	  	
	  	$.each(model, function(name, value) {
	  		grid.jqGrid('setCell', ids[int] ,name ,value);
	  	});
	}
}

//提取表格合格数据
CwGrid.prototype.getGridDataList = function(){
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
    var arrs = this.callBacks.getGridDataList(objList);
    $.each(arrs,function(i,rrow){
    	delete rrow["rowId"];
    	delete rrow["gridId"];
    });
    return arrs;
}

CwGrid.prototype.getGridDataList2 = function(){
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

//ajax查询表格合格数据
CwGrid.prototype.queryGridData = function(){
	var obj = this;
    this.callBacks.queryGridData(obj);
}

//批量隐藏表格字段
CwGrid.prototype.hideCols = function(fields){
	try {
		for ( var i = 0; i < fields.length; i++) {
			if($.notEmpty(fields[i])){
				this.$grid.hideCol(fields[i]);
			}
		}
	} catch (e) {
		console.log(e);
	}
}

//批量显示表格字段
CwGrid.prototype.showCols = function(fields){
	try {
		for ( var i = 0; i < fields.length; i++) {
			if($.notEmpty(fields[i])){
				this.$grid.showCol(fields[i]);
			}
		}
	} catch (e) {
		console.log(e);
	}
}

//批量设置字段是否可编辑
CwGrid.prototype.setColsCanEdit = function(fields){
	try {
		for ( var i = 0; i < fields.length; i++) {
			this.$grid.setColProp(fields[i].name,{editable:fields[i].isEdit});
		}
	} catch (e) {
		console.log(e);
	}
}

//批量修改列标题
CwGrid.prototype.changeColTitles = function(field){
	try {
		var name = field.name;
		var title = field.title;
		for ( var i = 0; i < name.length; i++) {
			this.$grid.setLabel(name[i],title[i]);
		}
	} catch (e) {
		console.log(e);
	}
}

//根据条件清理数据
CwGrid.prototype.delRowByPara = function(para){
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
			grid.jqGrid('delRowData', ids[i]);
		}
	}
}

//添加空行
CwGrid.prototype.addKongRow = function(){
	var isE = this.$grid.jqGrid('getGridParam', "cellEdit");
	if(isE){
		this.addRowData(CwGrid.nextId(this.gridId),this.kongRow);
	}
	return this;
}

//添加行数据
CwGrid.prototype.addRowData = function(rowid,data,where,rowid2){
	$("#"+this.addRowId).remove();
	if("undefined" != typeof where){
		if("undefined" != typeof rowid2){
			this.$grid.jqGrid('addRowData',rowid,data,where,rowid2);
		}else{
			this.$grid.jqGrid('addRowData',rowid,data,where);
		}
	}
	this.$grid.jqGrid('addRowData',rowid,data);
	if(this.config.showAddBt){
		$("#"+this.gridId+" tbody").append('<tr id="'+this.addRowId+'" style="height:40px;outline-style:none;" onclick="javascript:CwGrid.$(\''+this.gridId+'\').unAllEdit();"><td><a class="btn" id=""  style="padding:0px;padding-left:3px;" onclick="javascript:CwGrid.$(\''+this.gridId+'\').addKongRow()"><i class="glyphicon glyphicon-plus"></i></a></td>'+this.addRowTdHtml+'</tr>');
	}
	return this;
}

//添加行数据列表
CwGrid.prototype.addRowDatas = function(datas){
	try {
		for ( var i = 0; i < datas.length; i++) {
			this.addRowData(CwGrid.nextId(this.gridId), datas[i]);
		}
	} catch (e) {
		// console.log(e);
	}
	return this;
}

//设置表格大小
CwGrid.prototype.setSize = function(width,height,hideScrool){
	try {
		this.$grid.setGridHeight(height);
		this.$grid.setGridWidth(width); 
		if(hideScrool)this.$grid.closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
	} catch (e) {
		// console.log(e);
	}
	return this;
}
//设置表格
CwGrid.prototype.setWidth = function(width,hideScrool){
	try {
		this.$grid.setGridWidth(width); 
		if(hideScrool)this.$grid.closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
	} catch (e) {
		// console.log(e);
	}
	return this;
}
//设置表格
CwGrid.prototype.setHeight = function(height,hideScrool){
	try {
		this.$grid.setGridHeight(height);; 
		if(hideScrool)this.$grid.closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
	} catch (e) {
		// console.log(e);
	}
	return this;
}

/****静态方法***/

//获取表格可用rowId
CwGrid.nextId = function(gridId){
	var ids=$("#"+gridId).getDataIDs();
	if(ids.length == 0)return 99999;
	var maxId = 0;
	for ( var i = 0; i < ids.length; i++) {
		if(parseInt(ids[i]) > maxId){
			maxId = parseInt(ids[i]);
		}
	}
	return maxId+1;
}

//表格行删除按钮点击事件
CwGrid.delClickRow = function(gridId,rowId){
	try {CwGrid.currEditDataGrid.unAllEdit();} catch (e) {}
	var isE = $("#"+gridId).jqGrid('getGridParam', "cellEdit");
	if(isE){
		$.MsgBox("操作提示","确定要删除此行？",function(){
			$("#"+gridId).jqGrid('delRowData', rowId);
			CwGrid.allGrid[gridId].callBacks.summary();
		},function(){});
	}else{
		return ;
	}
}

//表格对象查询、创建
CwGrid.$ = function(gridId){
	try {
		if(arguments.length == 2){
			//参数2个 创建表格
			return new CwGrid(arguments[0],arguments[1]);
		}else if(arguments.length == 1){
			//参数1个 查询表格
			return CwGrid.allGrid[gridId];
		}
	} catch (e) {
		//出错预置些默认数据
		return {
			setColProp:function(){},
			isCanEdit:function(){},
			unAllEdit:function(){},
			clear:function(){},
			isExistRow:function(){},
			getRowByModel:function(){},
			getGridDataList:function(){},
			addRowData:function(){}	,
			setSize:function(){}	
		};
	}
}

CwGrid.currEditDataGrid = null;
CwGrid.allGrid = null;

$(document).click(function(e){ 
	try {
		e = window.event || e; // 兼容IE7
		obj = $(e.srcElement || e.target);
	    if ($(obj[0]).is(".ui-jqgrid-bdiv")) {
	    	CwGrid.currEditDataGrid.unAllEdit();
	    } 
	} catch (e) {
		//console.log(e);
	}
});


