
//初始化
$(function(){
	initGrid();//初始化表格
	initEvents();//初始化事件
})

//初始化事件
function initEvents(){
	
	//注册窗口改变事件
	$(window).resize(wResize);
	wResize();

	//模糊查询
    $("#keyWord").bind('input propertychange', function() {  
    		reLoadGrid();
    });
}

//窗口大小改变
function wResize(){
	$("#dataGrid").setGridHeight($(window).height()-240);
	$("#dataGrid").setGridWidth($(window).width()-30); 
	$("#dataGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
}

//初始化表格
function initGrid(){
	function formatterDate(cellvalue, options, rowObject){
		var date = new Date();
		date.setTime(cellvalue);
		return $.DateFormat(date,"yyyy-MM-dd hh:mm:ss");
	}

	$("#dataGrid").jqGrid({
		url: basePath + '/Temployee/pageMulCompany',
        datatype : "json",
        colNames : [ 'ID',  '名称','编码','所属公司','所属部门','所属部门','职位','职位'],  
        colModel : [ 
                     {name : 'id',index : 'id',align:'center',width:70,hidden: true},
                     {name : 'name',index : 'name',align:'left'},
                     {name : 'code',index : 'code',align:'left'},
                     {name : 'companyName',index : 'companyName',align:'left'},
                     {name : 'sectionId',index : 'sectionId',align:'left',hidden: true},
                     {name : 'sectionName',index : 'sectionName',align:'left'},
                     {name : 'positionId',index : 'positionId',align:'left',hidden: true},
                     {name : 'jobName',index : 'jobName',align:'left'}
                   ],
        styleUI: 'Bootstrap',
        pager : '#jqGridPager',
        jsonReader: { root: "rows", total: "total",records: "records",repeatitems: false},
        mtype: "POST",
        viewrecords : true,
        multiselect : true,
        multiboxonly : true,
        caption : "",
        rowNum : 10,
        autowidth:true,
        rownumbers:true,
        onSortCol:function(index,iCol,sortorder){
		},
		ondblClickRow:function(rowid,iRow,iCol,e){
			var subject = $("#dataGrid").jqGrid('getRowData', rowid );
			try {
				parent.callBack([subject]);
			} catch (e) {
				console.log("缺少父页面：parent.callBack([subject]);");
			}
		},
        postData:getQueryModel(),
        loadComplete:function(data){
        	try {
        		wResize();
			} catch (e) {
				console.log(e);
			}
        }
      });	

}

//获取分页查询参数
function getQueryModel(){

	var postData = $("#dataGrid").jqGrid("getGridParam", "postData");
    $.each(postData, function (k, v) {
        delete postData[k];
    });
    var model = {};
    model.status = 0;
    
    //***其它参数
    model.keyWord = $.trim($("#keyWord").val());

	return model;
}

//多选设置
function mulSelect(tag){
	if(arguments.length == 2){
		var query = arguments[1];
		reLoadGrid(query);
	} 
  //显示隐藏按钮
  if(tag){
  	$("#saveBt").show();
  }else{
  	$("#saveBt").hide();
  }
  
}

//重新加载刷新数据
function reLoadGrid(){
	
	var model = getQueryModel();
	if(arguments.length == 1){
		var query = arguments[0];
		$.extend(model,query);
	}
    $("#dataGrid").jqGrid('setGridParam',{  
        datatype:'json',  
        postData:model,
        page:1  
    }).trigger("reloadGrid"); //重新载入  
}

//设置当前部门、
function setSectionId(id){
	gl_sectionId = id;
	reLoadGrid();
}

//取消引用
function cancleSelect(){
	parent.callBack([]);
}

//保存
function saveBtClick(){
	var ids=$('#dataGrid').jqGrid('getGridParam','selarrrow');
  var objs = [];
  $.each(ids,function(i,value){
  	objs.push($("#dataGrid").jqGrid('getRowData', value ));
  });
	try {
		parent.callBack(objs);
	} catch (e) {
		console.log(e);
	}
}
