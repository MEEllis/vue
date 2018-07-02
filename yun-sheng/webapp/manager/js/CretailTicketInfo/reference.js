
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
/***********************************商品名称* 开始****************************/


/***********************************商品名称* 结束****************************/

//窗口大小改变
function wResize(){
	$("#dataGrid").setGridHeight($(window).height()-240);
	$("#dataGrid").setGridWidth($(window).width()-30); 
	$("#dataGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
}

//初始化表格
function initGrid(){
	$("#dataGrid").jqGrid({
		url: basePath + '/CretailTicketInfo/page',
        datatype : "json",
        colNames : [ 'ID', '卷名','卷分类CODE','卷分类','是否第三方卷'],  
        colModel : [ 
                     {name : 'id',index : 'id',align:'center',width:70},
                     {name : 'ticketName',index : 'ticketName',align:'left'},
                     {name : 'ticketType',index : 'ticketType',align:'left',hidden:true},
                     {name : 'ticketTypeName',index : 'ticketTypeName',align:'left'},
                     {name : 'thirdpartyFlag',index : 'thirdpartyFlag',align:'left'}
                   ],
        styleUI: 'Bootstrap',
        pager : '#jqGridPager',
        jsonReader: { root: "data.rows", total: "data.total",records: "data.records",repeatitems: false},
        mtype: "POST",
        viewrecords : true,
        multiselect : true,
        multiboxonly : true,
        caption : "",
        rowNum : 10,
        autowidth:true,
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
				if(data.result == 1){
					wResize();
				}else{
					$.MsgBox('出错提示',data.desc);
				}
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
    model.companyId = gl_companyId;
    
    //***其它参数
    model.keyWord = $("#keyWord").val();
	return model;
}

//重新加载刷新数据
function reLoadGrid(){
    $("#dataGrid").jqGrid('setGridParam',{  
        datatype:'json',  
        postData:getQueryModel(),
        page:1  
    }).trigger("reloadGrid"); //重新载入  
}

//取消引用
function cancleSelect(){
	parent.callBack([]);
}