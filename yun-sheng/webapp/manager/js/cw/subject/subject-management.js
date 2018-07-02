
//全局变量
var groupSubjectDAO = null;
var companySubjectDAO = null;
var subjectCompareDAO = null;
var companySubjectQueryModel = {};

//初始化
$(function(){
	
	//注册窗口改变事件
	$(window).resize(wResize);

	//初始化数据访问对象
	groupSubjectDAO = new GroupSubject(basePath);
	companySubjectDAO = new CompanySubject(basePath);
	subjectCompareDAO = new SubjectCompare(basePath);
	
	companySubjectQueryModel.currentAccountingYear = gl_CurrYear;
	companySubjectQueryModel.companyId = gl_CurrCompanyId;
	
	initUI();
	
	loadDataCompanySubjectTree();
	searchData();
	
	wResize();
});
/**
 * @author XiangRui
 * @note 保存科目参照
 * @return
 */
function saveSubjectCompare(){
	var json = $.grep($("#subjectCompareGrid").jqGrid('getRowData'),function(value){return value.changeState;});
	subjectCompareDAO.mulUpdate(json,function(data){
		if(data.result == 1){
			//重新加载对照表格
			 $.MsgBox('提示消息','保存成功');
			 loadDataSubjectCompareGrid();
		}else{
			 $.MsgBox('提示消息',data.desc);
		}
	});
}
/**
 * @author XiangRui
 * @note 批量科目复制
 * @return
 */
function saveSubjectMulCopy(){
	var surSubjectId = $("#surSubjectId").val();
	var desSubjectId = $("#desSubjectId").val();
	companySubjectDAO.mulCopy(surSubjectId,desSubjectId,{},function(data){
		if(data.result == 1){
			$.MsgBox('提示消息','复制成功');
		}else{
			$.MsgBox('提示消息',data.desc);
		}
	});
}
/**
 * @author XiangRui
 * @note 窗口大小改变事件
 * @return
 */
function wResize(){
	
	//表格高度自适应
	$("#companySubjectTable").setGridHeight($(window).height()-156);
	$("#companySubjectTable").setGridWidth($(window).width()-360); 
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
	
	//科目对照表格
	initUISubjectCompareGrid();
	
	//科目差异表格
	initUISubjectDifferenceGrid();
}
/**
 * @author XiangRui
 * @note 加载公司科目树数据
 * @return
 */
function loadDataCompanySubjectTree(){
	companySubjectDAO.listTreeByModel(companySubjectQueryModel, function(data){
		var nodes = data.data.rows;
		$.fn.zTree.init($("#companySubjectTree"),
            {data: {simpleData: {enable: true}},
			 view: {
        		showLine: true
        	 },
             callback:{
             onClick: function(event, treeId, treeNode){
				 delete companySubjectQueryModel["id"];
				 delete companySubjectQueryModel["subjectClssify"];
    		 	//判断点击的是类型还是科目
    		 	if(treeNode.id < 0){
    		 		companySubjectQueryModel.subjectClssify = treeNode.id;
    		 	}else{
    		 		companySubjectQueryModel.id = treeNode.id;
    		 	}
    		 	searchData();
              }
             }
            },nodes);
	})
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
	var grid = $("#companySubjectTable").jqGrid({
		url: basePath + '/cw/company/pageChildrens',
        datatype : "json",
        colNames : [ 'ID',  '科目编码', '科目名称', '科目类型','余额方向','来源',
                     '科目级次','科目类别ID','使用状态','是否末级科目','备注','新增人ID','新增时间','父节点ID','基础表ID',
                     '助记码','是否受控','是否数量核算','计量单位','现金流量','往来单位核算','部门核算','职员核算','启用标志' ],
        colModel : [ 
                     {name : 'id',index : 'id',align:'center',width:90},
                     {name : 'subjectCode',index : 'subjectCode',align:'left',width:150}, 
                     {name : 'subjectName',index : 'subjectName',align:'left',width:150}, 
                     {name : 'subjectClssifyName',index : 'subjectClssifyName',align:'left',width:150},
                     {name : 'creditDirection',index : 'creditDirection',align:'left',formatter:formatterCreditDirection,width:150},
                     {name : 'source',index : 'source',align:'left',formatter:formatterCreditDirection,width:150},
                     
                     //隐藏字段
                     {name : 'subjectLevel',index : 'subjectLevel',hidden: true},
                     {name : 'subjectClssify',index : 'subjectClssify',hidden: true},
                     {name : 'useStatus',index : 'useStatus',hidden: true},
                     {name : 'ifEndSubject',index : 'ifEndSubject',hidden: true},
                     {name : 'remark',index : 'remark',hidden: true},
                     {name : 'createUid',index : 'createUid',hidden: true},
                     {name : 'createTime',index : 'createTime',hidden: true},
                     {name : 'fatherId',index : 'fatherId',hidden: true},
                     {name : 'commonId',index : 'commonId',hidden: true},
                     {name : 'mnemonicCode',index : 'mnemonicCode',hidden: true},
                     {name : 'ifControl',index : 'ifControl',hidden: true},
                     {name : 'ifNumAccounting',index : 'ifNumAccounting',hidden: true},
                     {name : 'unit',index : 'unit',hidden: true},
                     {name : 'cashFlow',index : 'cashFlow',hidden: true},
                     {name : 'partnerAccounting',index : 'partnerAccounting',hidden: true},
                     {name : 'departmentAccounting',index : 'departmentAccounting',hidden: true},
                     {name : 'employeeAccounting',index : 'employeeAccounting',hidden: true},
                     {name : 'enable',index : 'enable',hidden: true}
                     
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
/**
 * @author XiangRui
 * @note 初始化公司科目表格UI
 * @return
 */
var gl_subjectCompare_selectid = -1;
var gl_subjectCompare_selectTD = null;
function initUISubjectCompareGrid(){
	//根据关键字查询科目
	function findSubjectByKeyWord(keyword){
		companySubjectDAO.findByModel({'companyId':gl_CurrCompanyId,'currentAccountingYear':gl_CurrYear,'ifEndSubject':1,'keyWord':keyword}, function(data){
			console.log( data.data.rows);

		});
	}
	function formatterCreditDirection(cellvalue, options, rowObject){
		return cellvalue == 1 ? "借方":"贷方";
	}
	/*
	 * 字段格式化
	 */
	var grid = $("#subjectCompareGrid").jqGrid({
        datatype : "local",
        colNames : [ '序号', '科目编号', '科目名称', '科目编号', '科目名称','本年科目ID','前年科目ID','修改状态','科目等级'],
        colModel : [ 
                     {name : 'id',index : 'id',align:'center',sorttype:"int",width:50}, 
                     {name : 'preAccountDto',index : 'preAccountDto',align:'center',width:150}, 
                     {name : 'namepreAccountDto',index : 'namepreAccountDto',align:'center',width:150}, 
                     {name : 'currentAccountDto',index : 'currentAccountDto',align:'center',width:150}, 
                     {name : 'namecurrentAccountDto',index : 'namecurrentAccountDto',align:'center',width:150,editable : true},
                     {name : 'idcurrentAccountDto',index : 'idcurrentAccountDto',align:'center',sorttype:"int",width:50,hidden : true}, 
                     {name : 'idpreAccountDto',index : 'idpreAccountDto',align:'center',sorttype:"int",width:50,hidden : true},
                     {name : 'changeState',index : 'changeState',align:'center',width:50,hidden : true},
                     {name : 'creditDirection',index : 'creditDirection',align:'center',width:50,hidden : true,formatter:formatterCreditDirection}
                   ],
        styleUI: 'Bootstrap',//设置jqgrid的全局样式为bootstrap样式  
        viewrecords : true,
        autowidth : false,
        multiselect : false,
        multiboxonly : true,
        height:300,
        caption : "",
        onCellSelect:function(rowid,iCol,cellcontent,e){
	          if (rowid && rowid !== gl_subjectCompare_selectid) {
	        	  
	        	  if(iCol==4){
		        	  //切换编辑模式
		              jQuery('#subjectCompareGrid').jqGrid('restoreRow', gl_subjectCompare_selectid);
		              jQuery('#subjectCompareGrid').jqGrid('editRow', rowid, true);
		              gl_subjectCompare_selectid = rowid;
		              gl_subjectCompare_selectTD = e.target;
		              
		              $(e.target).css({'position':'relative'});
		              //科目参考按钮
		              
		              $(e.target).append('<div style="position: absolute;;top:6px;right:9px;width:38px;height:31px;">'+
	 		                 '<button class="btn btn-default glyphicon glyphicon-search" type="button" onclick="selectReferenceOpen('+rowid+')">'+
				             '</button></div>');

			          $(e.target).children('input').bind('input propertychange',function(){
			        	  if($.trim($(this).val())!=""){
			        		  //findSubjectByKeyWord($(this).val());
			        		  //打开科目选择
			        		  //$("#subjectSelectDIV").css({'top':e.pageY+30,'left':e.pageX+180});
			        	  }
			          }); 
	        	  }else{
	        		  jQuery('#subjectCompareGrid').jqGrid('restoreRow', gl_subjectCompare_selectid);
	        		  jQuery('#subjectCompareGrid').jqGrid('restoreRow', rowid);
	        		  gl_subjectCompare_selectid = null;
	        	  }
  
	          }else{
	        	  if(iCol!=4){
	        		  jQuery('#subjectCompareGrid').jqGrid('restoreRow', gl_subjectCompare_selectid);
	        		  jQuery('#subjectCompareGrid').jqGrid('restoreRow', rowid);
	        		  gl_subjectCompare_selectid = null;
	        	  }
	          }
		}
      });
	
	$("#subjectCompareGrid").jqGrid('setGroupHeaders', 
		{ 
			useColSpanStyle: true, 
			groupHeaders:[ 
			{
				startColumnName: 'kmbh1', 
				numberOfColumns: 2, 
				titleText: '2015'
			}, 
			{
				startColumnName: 'kmbh2', 
				numberOfColumns: 2, 
				titleText: '2016'
			} ] 
	});
	$("#subjectCompareGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });  
}
//初始化科目对照表格
function loadDataSubjectCompareGrid(){
	subjectCompareDAO.compare(gl_CurrCompanyId,gl_CurrYear,function(data){
		var list = data.data.rows;
		if(list.length == 0){
			$('#kmdzModal').modal('hide');
			$.MsgBox('提示消息',data.data.currentAccountingYear+"年无"+data.data.preAccountingYear+"年对照信息");
			return;
		}
		$('#kmdzModal').modal('show');
		var currentAccountingYear = data.data.currentAccountingYear;
		var preAccountingYear = data.data.preAccountingYear;
		$("#subjectCompareGrid").jqGrid('clearGridData');
        $.each(list,function(i,item){
        	$("#subjectCompareGrid").jqGrid('addRowData',item.id,item);
        });
	});
}
/**
 * @author XiangRui
 * @note 打开科目参照对话框
 * @return
 */
var callBack ;
function selectReferenceOpen(rowid){
	$('#subjectReferenceModal').modal('show');
	callBack = function(){
		if(arguments[0].length == 0){
			$.MsgBox('提示消息',"未选中任何行");return ;
		}
		var subject = arguments[0][0];
		if(subject.ifEndSubject!="是"){
			$.MsgBox('提示消息',"必须选择末级科目");return ;
		}
		var currCompare = $("#subjectCompareGrid").jqGrid('getRowData', rowid);
		if(subject.creditDirection != currCompare.creditDirection){
			$.MsgBox('提示消息',"余额方向不一致");return ;
		}
		currCompare.idcurrentAccountDto = subject.id;
		currCompare.currentAccountDto = subject.subjectCode;
		currCompare.namecurrentAccountDto = subject.subjectName;
		currCompare.changeState = true;
		$("#subjectCompareGrid").jqGrid('setRowData', rowid ,currCompare );
		$('#subjectReferenceModal').modal('hide');
		$("#subjectCompareGrid").jqGrid('saveRow',rowid);
	}; 
}
/**
 * @author XiangRui
 * @note 保存集团科目引用
 * @return
 */
function openGroupSubjectReference(){
	$('#groupSubjectReferenceModal').modal('show');
	var model = groupSubjectReferenceFrame.getModel();
	model.currentAccountingYear = gl_CurrYear;
	model.groupId = gl_CurrGroupId;
	model.companyId = gl_CurrCompanyId;
	//alert(gl_CurrGroupId + "  " +gl_CurrCompanyId + "  " + gl_CurrYear);
	groupSubjectReferenceFrame.searchData();
	callBack = function(){
		var subjects = arguments[0];
		if(arguments[0].length == 0){
			$.MsgBox('提示消息',"未选中任何行");return ;
		}
		subjects = $.map(subjects,function(obj){
			if( obj.isRefed == "否" )return {'id':obj.id,'companyId':gl_CurrCompanyId};
		})
		if(subjects.length == 0){
			$.MsgBox('提示消息',"选中行已经被引用过");return ;
		}
			
		companySubjectDAO.saveCompanyReferenceGroupSubjects(subjects,function(data){
			if(data.result == 1){
				$.MsgBox('提示消息',"保存成功");
				searchData();
			}else{
				$.MsgBox('提示消息',data.desc);
			}
		});
		$('#groupSubjectReferenceModal').modal('hide');
	}; 

}
/**
 * 取消科目引用
 */
function canelGroupSubjectReference(){
	var ids=$('#companySubjectTable').jqGrid('getGridParam','selarrrow');
    var objs = [];
    $.each(ids,function(i,value){
    	objs.push($("#companySubjectTable").jqGrid('getRowData', value ));
    });
	var subjects = $.map(objs,function(obj){
		return {'id':obj.id};
	})
	if(subjects.length == 0){
		$.MsgBox('提示消息',"未选中任何行");return;
	}
	companySubjectDAO.removeCompanyReferenceGroupSubject(subjects, function(data){
		if(data.result == 1){
			$.MsgBox('提示消息',"操作成功");
			searchData();
		}else{
			$.MsgBox('提示消息',data.desc);
		}
	});
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
/**
 * @author XiangRui
 * @note 选择参照科目
 * @return
 */
function subjectCopySelect(did){
	$('#subjectReferenceModal').modal('show');
	callBack = function(){
		var subject = arguments[0][0];
		$("#"+did+"Name").val(subject.subjectName);
		$("#"+did+"Id").val(subject.id);
		$('#subjectReferenceModal').modal('hide');
	}; 
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
	return companySubjectQueryModel;
}
/**
 * @author XiangRui
 * @note 初始化科目差异
 * @return
 */
function initUISubjectDifferenceGrid(){

	var grid = $("#subjectDifferenceGrid").jqGrid({
        datatype : "local",
        colNames : [ '序号', '科目编号', '科目名称', '科目编号', '科目名称'],
        colModel : [ 
                     {name : 'id',index : 'id',align:'center',sorttype:"int",width:50}, 
                     {name : 'preAccountDto',index : 'preAccountDto',align:'center',width:150}, 
                     {name : 'namepreAccountDto',index : 'namepreAccountDto',align:'center',width:150}, 
                     {name : 'currentAccountDto',index : 'currentAccountDto',align:'center',width:150}, 
                     {name : 'namecurrentAccountDto',index : 'namecurrentAccountDto',align:'center',width:150,editable : true}
                   ],
        styleUI: 'Bootstrap',//设置jqgrid的全局样式为bootstrap样式  
        viewrecords : true,
        autowidth : false,
        multiselect : false,
        multiboxonly : false,
        caption : "",
        onCellSelect:function(rowid,iCol,cellcontent,e){

		}
      });
	
	$("#subjectDifferenceGrid").jqGrid('setGroupHeaders', 
				{ 
			useColSpanStyle: true, 
			groupHeaders:[ 
			{
				startColumnName: 'kmbh1', 
				numberOfColumns: 2, 
				titleText: '2015'
			}, 
			{
				startColumnName: 'kmbh2', 
				numberOfColumns: 2, 
				titleText: '2016'
			} ] 
	});


	
}
//初始化科目差异表格
function loadDataSubjecDifferenceGrid(){
	subjectCompareDAO.difference(gl_CurrCompanyId,gl_CurrYear,function(data){
		var list = data.data.rows;
		if(list.length == 0){
			$('#kmcyModal').modal('hide');
			$.MsgBox('提示消息',data.data.currentAccountingYear+"年无"+data.data.preAccountingYear+"年对照信息");
			return;
		}
		var currentAccountingYear = data.data.currentAccountingYear;
		var preAccountingYear = data.data.preAccountingYear;
		$("#subjectDifferenceGrid").jqGrid('clearGridData');
        $.each(list,function(i,item){
        	$("#subjectDifferenceGrid").jqGrid('addRowData',item.id,item);
        });
	});
}
