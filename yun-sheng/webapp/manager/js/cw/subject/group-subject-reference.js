var model = {};
//初始化
$(function(){
	
	//注册窗口改变事件
	$(window).resize(wResize);

	//初始化数据访问对象
	groupSubjectDAO = new GroupSubject(basePath);
	
	model.groupId = gl_CurrGroupId;
	model.currentAccountingYear = gl_CurrYear;
	model.companyId = gl_CurrCompanyId;

	initUI();
	
	loadDataGroupSubjectTree();
	searchData();
	wResize();
	
	//模糊查询
    $("#keyWord").bind('input propertychange', function() {  
    	if($("#keyWord").val() != "" ){
    		model.keyWord = $("#keyWord").val();
    	}else{
    		model.keyWord = "";
    	}
    	model.subjectClssify = null;
		loadDataGroupSubjectTree();
		searchData();
    });
});
/**
 * @author XiangRui
 * @note 窗口大小改变事件
 * @return
 */
function wResize(){
	
	//表格高度自适应
	$("#groupSubjectTable").setGridHeight($(window).height()-166);
	$(".left_tree").height($(window).height()-90);
	$("#groupSubjectTable").setGridWidth($(window).width()-210); 
	$("#groupSubjectTable").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });  
}
/**
 * @author XiangRui
 * @note 初始化UI界面
 * @return
 */
function initUI(){
	
	//公司科目表格
	initUIGroupSubjectGrid();
}
/**
 * @author XiangRui
 * @note 加载公司科目树数据
 * @return
 */
var currSelectSubjectID = null;
function loadDataGroupSubjectTree(){
	
	groupSubjectDAO.listTreeByModel(model,function(data){
		$.fn.zTree.init($("#groupSubjectTree"),
            {data: {simpleData: {enable: true}},
			 view: {showLine: true},
             callback:{
             onClick: function(event, treeId, treeNode){
				 delete model["id"];
				 delete model["subjectClssify"];
    		 	//判断点击的是类型还是科目
    		 	if(treeNode.id < 0){
    		 		model.subjectClssify = treeNode.id;
    		 	}else{
    		 		model.id = treeNode.id;
    		 	}
    		 	searchData();
              }
             }
            },data.data.rows);
	})
}
function getModel(){
	return model;
}
/**
 * @author XiangRui
 * @note 初始化公司科目表格UI
 * @return
 */
function initUIGroupSubjectGrid(){
	/*
	 * 字段格式化
	 */
	//借贷方向
	function formatterCreditDirection(cellvalue, options, rowObject){
		return cellvalue == 1 ? "借方":"贷方";
	}
	//辅助余额项
	function formatterAssistItem(cellvalue, options, rowObject){
		return rowObject.partnerAccounting == true ? "往来单位":"" + " " + rowObject.departmentAccounting == true ? "往来单位":"" + " " + rowObject.employeeAccounting == true ? "往来单位":"";
	}
	//数量核算
	function formatterIfNumAccounting(cellvalue, options, rowObject){
		return rowObject.ifNumAccounting == true ? "是":"否";
	}
	//是否启用
	function formatterEnable(cellvalue, options, rowObject){
		return rowObject.enable == true ? "否":"是";
	}
	//是否引用
	function formatterIsRefed(cellvalue, options, rowObject){
		return cellvalue == 1 ? "是":"否";
	}
	var grid = $("#groupSubjectTable").jqGrid({
		url: basePath + '/cw/fsubject/pageChildrens',
        datatype : "json",
        colNames : [ 'ID',  '科目编码', '科目名称', '科目类型','余额方向','是否被引用' ],
        colModel : [ 
                     {name : 'id',index : 'id',align:'center',width:90},
                     {name : 'subjectCode',index : 'subjectCode',align:'left',width:150}, 
                     {name : 'subjectName',index : 'subjectName',align:'left',width:150}, 
                     {name : 'subjectClssifyName',index : 'subjectClssifyName',align:'left',width:150},
                     {name : 'creditDirection',index : 'creditDirection',align:'left',formatter:formatterCreditDirection,width:150},
                     {name : 'isRefed',index : 'isRefed',align:'left',formatter:formatterIsRefed,width:150}
                   ],
        styleUI: 'Bootstrap',//设置jqgrid的全局样式为bootstrap样式  
        pager : '#pager',
        jsonReader: {
            root: "rows",
            page: "page",
            total: "total",
            records: "records",
            repeatitems: false
        },
        mtype: "POST",
        viewrecords : true,
        autowidth : false,
        multiselect : true,
        multiboxonly : true,
        caption : "",
        ondblClickRow:function(rowid,iRow,iCol,e){
			var subject = $("#groupSubjectTable").jqGrid('getRowData', rowid );
			try {
				parent.callBack([subject]);
			} catch (e) {
				console.log("parent:null");
			}
		},
        postData:getQueryModel(),
        loadComplete:function(data){
        	try {
        		console.log(data);
			} catch (e) {

			}
        }
      });
}
function getQueryModel(){
	var postData = $("#groupSubjectTable").jqGrid("getGridParam", "postData");
    $.each(postData, function (k, v) {
        delete postData[k];
    });
	return model;
}
//返回科目
function retrunSelectSubjects(){
	var ids=$('#groupSubjectTable').jqGrid('getGridParam','selarrrow');
    var objs = [];
    $.each(ids,function(i,value){
    	objs.push($("#groupSubjectTable").jqGrid('getRowData', value ));
    });
	try {
		parent.callBack(objs);
	} catch (e) {
		console.log("parent:null");
	}
}
//返回科目
function getSelectSubjects(){
	var ids=$('#groupSubjectTable').jqGrid('getGridParam','selarrrow');
    var objs = [];
    $.each(ids,function(i,value){
    	objs.push($("#groupSubjectTable").jqGrid('getRowData', value ));
    });
	return objs;
}
/**
 * @author XiangRui
 * @note 查询科目
 * @return
 */
function searchData(){
	var paras = getQueryModel();
	//console.log(paras);
	$("#groupSubjectTable").jqGrid("setGridParam", { postData: paras,page:1}).trigger("reloadGrid");
}