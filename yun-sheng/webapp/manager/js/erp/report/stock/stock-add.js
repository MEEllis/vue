$(function(){
	loadGoodsModal();
});
var selectTreeClassId="";
(function() {
	//ztree(商品名称树)
	var setting = {
		data: {
			simpleData: {
				enable: true,
				idKey: "id",
				pIdKey: "pid",
				rootPId: null
			}
		},
		callback: {
			onClick: function(event, treeId, treeNode, msg) {
				//通过id调用对应方法 重构表格
			    selectTreeClassId=Number(treeNode.id);
			    reLoadGrid();
			}
		},
		view: {
			showIcon: false
		}
	};

	$.ajax({
		type: 'Get',
		url: "../../report/stock/selectStockTree",
		dataType: "json",
		success: function(data) {
			$.fn.zTree.init($("#myTradeTree"), setting,data.data.stockTree);
			var str = $('#myTradeTree_1_switch').attr('class');
			var zTree = $.fn.zTree.getZTreeObj("myTradeTree");
		    zTree.expandAll(true);//展开全部节点
			var Class = str.replace('roots', 'center');
			$('#myTradeTree_1_switch').attr('class', Class);
		},
		error: function(msg) {
			alert(" 数据加载失败！" + msg);
		}
	});
})();

//商品名称模态框按钮单击事件
$(".myTradeSave").click(function(){
	var ids = $("#jqGrid_myTrade").jqGrid('getGridParam','selarrrow');
	var val = [];
	if(ids.length < 1){
		$.zxsaas_plus.showalert("提示", "请勾选一条记录");
	}else{
		for(var i=0;i<ids.length;i++){
			var rowData = $("#jqGrid_myTrade").jqGrid('getRowData',ids[i]);
			console.log(rowData.name);
			val[i] = rowData.goodsName;
		}
		$("#goodsName").val(val.join(','));
		$("#myTrade").modal('hide');
	}
});

//编码、名称模糊搜索 goodsNameKeyWord
$("#goodsNameKeyWord").bind('input propertychange', function() {  
		reLoadGrid();
});


//重新加载刷新数据
function reLoadGrid(){
    $("#jqGrid_myTrade").jqGrid('setGridParam',{  
        datatype:'json',  
        postData:getQueryModel(),
        page:1  
    }).trigger("reloadGrid"); //重新载入  
}

//获取分页查询参数
function getQueryModel(){
    var model = {};
    model.goodsName = $("#goodsNameKeyWord").val();
    model.goodsCategoryId = selectTreeClassId ;
	return model;
}


function loadGoodsModal() {
	var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl:"../../report/stock/selectGoodsDetail",
		TableName: "#jqGrid_myTrade", //显示表格名称。遵照css选择器书写
		iconJsonUrl: "../json/icon.json",
		btnbox: ".btnbox ", //功能按钮存放容器。遵照css选择器书写	
		pager: "#jqGridmyTrade"
	};
	$.jgrid.defaults.width = 1280;
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';
	var colNames = ['商品编码', '商品名称', '商品类别', '商品品牌','商品型号','商品颜色','网络制式','是否管理串号'];
	var JqGridColModel = [
						{name:'goodsCode',index:'goodsCode', width:180,align:'center',sorttype:"string"},
						{name:'goodsName',index:'goodsName', width:150,align:'center', sorttype:'string'},
						{name:'goodsClassName',index:'goodsClassName', width:100,align:'center', sorttype:'string'},
						{name:'goodsBrandName',index:'goodsBrandName', width:100,align:'center', sorttype:'string'},
						{name:'goodsModel',index:'goodsModel', width:100,align:'center', sorttype:'string'},
						{name:'goodsColorName',index:'goodsColorName', width:80,align:'center', sorttype:'string'},
						{name:'networkStandard',index:'networkStandard', width:80,align:'center', sorttype:'string'},
						{name:'ifManageIMei',index:'ifManageIMei', width:150,align:'center', sorttype:'string',formatter:'select', editoptions:{value:"1:√;0:"}}
	                ];
	loadtable();
	function loadtable() {
		$(options.TableName).jqGrid({
			url: options.LoadTableUrl,
			mtype: "GET",
			datatype: "json",
			jsonReader  : {	
				root:"data.rows",
				page: "data.page",
		        total: "data.total",
		        records: "data.records",
				repeatitems: false
					},
			colNames: colNames,
			colModel: JqGridColModel,
			sortable: false,
			multiselect : true,	//复选框属性
			rownumbers:true,	//显示行号
			rowNum: 20,
			rowList: [20, 25, 40],
			pager: options.pager,
			viewrecords: true,
			width: "100%",
			height: $(window).height() * 0.44,
			autowidth: true,
			rownumWidth:30, // the width of the row numbers columns
			shrinkToFit: false
		})
	}
}
