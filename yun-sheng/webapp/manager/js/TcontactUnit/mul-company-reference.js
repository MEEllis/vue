
//初始化
$(function(){
	initTree();//初始化树
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
	$("#dataTree").height($(window).height()-350);
	$("#dataTree").width(180);
	$("#dataGrid").setGridHeight($(window).height()-240);
	$("#dataGrid").setGridWidth($(window).width()-290); 
	$("#dataGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
}

//初始化树
var curr_goodsclass_tree_selectId = "";
var curr_goodsclass = null;
function initTree(){
	//树设置参数
	var setting = {
		data: {//数据属性设置
			simpleData: {enable: true,idKey: "id",pIdKey: "pid",rootPId: null}
		},
        async: {//从后台获取数据
            enable: true,
            url: basePath+'/TunitClass/findTreeForMulCompany?status=0',
            autoParam:[],
            dataFilter: null
        },
		callback: {//回调事件设置
			onClick: function(event, treeId, treeNode, msg) {
				curr_goodsclass_tree_selectId = Number(treeNode.id);
				curr_goodsclass = treeNode.obj;
        		if(curr_goodsclass_tree_selectId == 0 || curr_goodsclass_tree_selectId == -1){
        			curr_goodsclass_tree_selectId = "";
        		}				
				reLoadGrid();
			}
		},
		view: {//样式设置
			showIcon: true,
			dblClickExpand: false
		}
	};
	$.fn.zTree.init($("#dataTree"), setting);
	var zTree = $.fn.zTree.getZTreeObj("dataTree");
    zTree.expandAll(true);  
}

//初始化表格
function initGrid(){
	function formatterDate(cellvalue, options, rowObject){
		var date = new Date();
		date.setTime(cellvalue);
		return $.DateFormat(date,"yyyy-MM-dd hh:mm:ss");
	}

	$("#dataGrid").jqGrid({
		url: basePath + '/TcontactUnit/page',
        datatype : "json",
        colNames : [ 'ID',  '名称','编码','类别','类别'],  
        colModel : [ 
                     {name : 'id',index : 'id',align:'center',width:70,hidden: true},
                     {name : 'name',index : 'name',align:'left'},
                     {name : 'code',index : 'code',align:'left'},
                     {name : 'typeId',index : 'typeId',align:'left',hidden: true},
                     {name : 'typeName',index : 'typeName',align:'left'}
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
        rownumbers:true,
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
    
    //***其它参数
    model.keyWord = $.trim($("#keyWord").val());
    model.selectTreeClassId = curr_goodsclass_tree_selectId ;
    model.status = 0;
    
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

//取消引用
function cancleSelect(){
	parent.callBack([]);
}