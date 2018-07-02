$(function(){
	assistBalanaceTableQuery = new AssistBalanaceTableQuery(basePath);
	
	selectSubjectClssify();
	subjectClssifyHeaders();
});

/*******************************科目类别****************************/
function selectSubjectClssify(){
	assistBalanaceTableQuery.getSubjectClssify(function(data){
		var dataList = data.data.rows;
		$("#jqGrid_subjectClssify").jqGrid('clearGridData');
        $.each(dataList,function(i,item){
        	$("#jqGrid_subjectClssify").jqGrid('addRowData',item.id,item);
        });
	});
}

/****************************初始化表格********************************/
function subjectClssifyHeaders(){
	var grid = $("#jqGrid_subjectClssify").jqGrid({
        datatype : "local",
        colNames : ['科目类别ID', '科目类别名称'],
        colModel : [ 
                     {name : 'id',index : 'id',align:'center',width:90},
                     {name : 'subjectClssifyName',index : 'subjectClssifyName',align:'left',width:150}, 
                   ],
        styleUI: 'Bootstrap',//设置jqgrid的全局样式为bootstrap样式  
        pager : '#pager',
        viewrecords : true,
        autowidth : false,
        multiselect : true,
        multiboxonly : true,
        caption : "",
        ondblClickRow:function(rowid,iRow,iCol,e){
			var subject = $("#jqGrid_subjectClssify").jqGrid('getRowData', rowid );
			try {
				parent.callBack([subject]);
			} catch (e) {
				console.log("parent:null");
			}
		}
      });
}

/*****************************弹窗点确定多选****************************/
function selectClssify(){
	var ids=$('#jqGrid_subjectClssify').jqGrid('getGridParam','selarrrow');
    var objs = [];
    $.each(ids,function(i,value){
    	objs.push($("#jqGrid_subjectClssify").jqGrid('getRowData', value ));
    });
	try {
		parent.callBack(objs);
	} catch (e) {
		console.log("parent:null");
	}
	
}
