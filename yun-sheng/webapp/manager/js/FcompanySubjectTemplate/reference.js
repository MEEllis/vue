
//全局变量
var companySubjectDAO = null;
var model = {};

//初始化
$(function(){

	//初始化数据访问对象
	companySubjectDAO = new CompanySubject(basePath);

	initGridData();
	
	initTree();
	searchData();

	//注册窗口改变事件
	$(window).resize(wResize);
	
	//模糊查询
    $("#keyWord").bind('input propertychange', function() {  
    	if($("#keyWord").val() != "" ){
    		model.keyWord = $("#keyWord").val();
    	}else{
    		model.keyWord = "";
    	}
    	model.subjectClssify = null;
    	initTree();
		searchData();
    });

	wResize();
	
});
/**
 * @author XiangRui
 * @note 窗口大小改变事件
 * @return
 */
function wResize(){
	$(".left_tree").height($(window).height()-90);
	//表格高度自适应
	$("#dataGrid").setGridHeight($(window).height()-166);
	$("#dataGrid").setGridWidth($(window).width()-210); 
	$("#dataGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
}
/**
 * @author XiangRui
 * @note 初始化UI界面
 * @return
 */
function initUI(){
	
	//公司科目表格
	initGridData();
}
/**
 * @author XiangRui
 * @note 加载公司科目树数据
 * @return
 */

function initTree(){
	companySubjectDAO.listTreeByModel(model, function(data){
		var nodes = data.data.rows;
		$.fn.zTree.init($("#companySubjectTree"),
            {data: {simpleData: {enable: true}},
			 view: {
        		showLine: true
        	 },
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
            },nodes);
	})
}

/**
 * 查询参数
 * @return
 */
function getQueryModel(){
	var postData = $("#dataGrid").jqGrid("getGridParam", "postData");
    $.each(postData, function (k, v) {
        delete postData[k];
    });
	return model;
}
/**
 * @author XiangRui
 * @note 初始化公司科目表格UI
 * @return
 */
function initGridData(){
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

	$("#dataGrid").jqGrid({
		url: basePath + '/cw/company/pageChildrens',
        datatype : "json",
        colNames : [ 'ID',  '科目编码', '科目名称', '科目类型','余额方向','是否被引用','是否末级科目','测试' ],
        colModel : [ 
                     {name : 'id',index : 'id',align:'center',width:90,hidden: true},
                     {name : 'subjectCode',index : 'subjectCode',align:'left',width:150}, 
                     {name : 'subjectName',index : 'subjectName',align:'left',width:150}, 
                     {name : 'subjectClssifyName',index : 'subjectClssifyName',align:'left',width:150},
                     {name : 'creditDirection',index : 'creditDirection',align:'left',formatter:formatterCreditDirection,width:150},
                     {name : 'isRefed',index : 'isRefed',align:'left',formatter:formatterIsRefed,width:150},
                     {name : 'ifEndSubject',index : 'ifEndSubject',align:'left',formatter:formatterIsRefed,width:150},
                     {
                         name:'subjectName',
                         index:'subjectName',
                         width:100,
                         editable:true,
                         edittype:'custom'
                       }
                   ],
        styleUI: 'Bootstrap',//设置jqgrid的全局样式为bootstrap样式  
        pager : '#pager',
        jsonReader: { root: "data.rows", total: "data.total",records: "data.records",repeatitems: false},
        mtype: "POST",
        viewrecords : true,
        autowidth : false,
        multiselect : true,
        multiboxonly : true,
        caption : "",
        ondblClickRow:function(rowid,iRow,iCol,e){
			var subject = $("#dataGrid").jqGrid('getRowData', rowid );
			try {
				//if(subject.ifEndSubject == '是' || subject.ifEndSubject == 1){
				parent.callBack([subject]);
				//}
			} catch (e) {
				console.log("parent:null");
			}
		},
        postData:getQueryModel(),
        loadComplete:function(data){
        	try {
				if(data.result == 1){
					currPage = data.data.page;
					wResize();
				}else{
					$.MsgBox('出错提示',data.desc);
				}
			} catch (e) {

			}
        }
      });
}
//返回科目
function retrunSelectSubjects(){
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
/**
 * @author XiangRui
 * @note 查询科目
 * @return
 */
function searchData(){
	
	var paras = getQueryModel();
	var query = {};
	if(arguments.length == 1){
		query = arguments[0];
		$.extend(paras,query);
	}
	$("#dataGrid").jqGrid("setGridParam", { postData: paras,page:1}).trigger("reloadGrid");
}
function reLoad(){
	
	var paras = getQueryModel();
	var query = {};
	if(arguments.length == 1){
		query = arguments[0];
		$.extend(paras,query);
	}
	$("#dataGrid").jqGrid("setGridParam", { postData: paras,page:1}).trigger("reloadGrid");
}

//多选设置
function mulSelect(tag){
	if(arguments.length == 2){
		var query = arguments[1];
		reLoad(query);
	}
	
	//显示隐藏按钮
	if(tag == true){
		$("#saveBt").show();
	}else if(tag == false){
		$("#saveBt").hide();
	}
}
