
//全局变量
var groupSubjectDAO = null;
var companySubjectDAO = null;
var model = {};

//初始化
$(function(){
	
	//注册窗口改变事件
	$(window).resize(wResize);

	//初始化数据访问对象
	groupSubjectDAO = new GroupSubject(basePath);
	companySubjectDAO = new CompanySubject(basePath);

	initUI();
	
	loadDataCompanySubjectTree();
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
    	loadDataCompanySubjectTree();
		searchData();
    });
});
/**
 * @author XiangRui
 * @note 窗口大小改变事件
 * @return
 */
function wResize(){
	$(".left_tree").height($(window).height()-90);
	//表格高度自适应
	$("#companySubjectTable").setGridHeight($(window).height()-166);
	$("#companySubjectTable").setGridWidth($(window).width()-300); 
	$("#companySubjectTable").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
}
/**
 * @author XiangRui
 * @note 初始化UI界面
 * @return
 */
function initUI(){
	
	//公司科目表格
	initUICompanySubjectGrid();
}
/**
 * @author XiangRui
 * @note 加载公司科目树数据
 * @return
 */

function loadDataCompanySubjectTree(){
	model.currentAccountingYear = $('#currentAccountingYear').val();
	groupSubjectDAO.listTreeByModel(model, function(data){
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
	var postData = $("#companySubjectTable").jqGrid("getGridParam", "postData");
    $.each(postData, function (k, v) {
        delete postData[k];
    });
    model.currentAccountingYear = $('#currentAccountingYear').val();
	return model;
}
/**
 * @author XiangRui
 * @note 初始化公司科目表格UI
 * @return
 */
function initUICompanySubjectGrid(){
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
    function my_input(value, options) {
	    return $("<input type='text' size='10' style='background-color: red;' value='"+value+"'/>");
    }
    function my_value(value) {
        return "My value: "+value.val();
   }
	var grid = $("#companySubjectTable").jqGrid({
		url: basePath + '/cw/fsubject/pageChildrens',
        datatype : "json",
        colNames : [ 'ID',  '科目编码', '科目名称','级次','科目类型','余额方向','使用状态','是否末级科目','是否停用' ],
        colModel : [ 
                     {name : 'id',index : 'id',align:'center',width:90,hidden:true,sortable: false},
                     {name : 'subjectCode',index : 'subjectCode',align:'center',width:150,sortable: false}, 
                     {name : 'subjectName',index : 'subjectName',align:'center',width:150,sortable: false}, 
                     {name : 'subjectLevel',index : 'subjectLevel',align:'center',width:150,sortable: false}, 
                     {name : 'subjectClssifyName',index : 'subjectClssifyName',align:'center',width:150,sortable: false},
                     {name : 'creditDirection',index : 'creditDirection',align:'center',formatter:formatterCreditDirection,width:150,sortable: false},
                     {name : 'useStatus',index : 'useStatus',align:'center',formatter:formatterIsRefed,width:150,sortable: false},
                     {name : 'ifEndSubject',index : 'ifEndSubject',align:'center',formatter:formatterIsRefed,width:150,sortable: false},
                     {name : 'enable',index : 'enable',align:'center',formatter:formatterIsRefed,width:150,sortable: false}
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
			var subject = $("#companySubjectTable").jqGrid('getRowData', rowid );
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
//返回科目
function retrunSelectSubjects(){
	var ids=$('#companySubjectTable').jqGrid('getGridParam','selarrrow');
    var objs = [];
    $.each(ids,function(i,value){
    	objs.push($("#companySubjectTable").jqGrid('getRowData', value ));
    });
	try {
		parent.callBack(objs);
	} catch (e) {
		console.log("parent:null");
	}
}
/**
 * @author XiangRui
 * @note 查询科目
 * @return
 */
function searchData(){
	var paras = getQueryModel();
	$("#companySubjectTable").jqGrid("setGridParam", { postData: paras,page:1}).trigger("reloadGrid");
}
