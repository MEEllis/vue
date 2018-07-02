
//初始化
$(function(){
	
	initUI();
	initVoucherClass();
	initQjDate();
	initDataGrid();
	initEvents();
	//initProfitLossSubjectList();
	
	//结转期间改变后重新加载列表数据
	 $("#jzDate").on('focus', function () {
	        previous = this.value.split("-")[0];
	    }).change(function() {
	        //alert(previous);
	    	if(previous!=this.value.split("-")[0]){//当前年份与上一次选中的年份不相等时 在重新加载列表数据
	    		initProfitLossSubjectList(this.value);
	    	}
	        previous = this.value.split("-")[0];
	    });
});

//生成凭证
function generateVoucher(){
	
	var models = CwGrid.$("dataGrid").getGridDataList();
	
	//检查数据完整性，利润科目必须填写
	for ( var i = 0; i < models.length; i++) {
		if(models[i].lrKmCode == ""){
			$.MsgBox("操作提示","利润科目不能有空");
			return;
		}
	}
	
	var para = {};
	para.accountAnnual = $("#jzDate").val();
	para.isHaveNoPost = $("#haveNoPostVoucher").is(":checked")==true?1:0;
	para.paraList = models;
	para.voucherClassify = $("#voucherClassSelect").val();
	
	//保存
	if(models.length == 0)return;
	$.request({
		type: 'post',
		url: basePath+'/cw/syjz/generateVoucher',
		contentType : 'application/json',//传输类型
		dataType: "json",
		data:JSON.stringify(para),
		success: function(data) {
			 if(data.result != 1){$.MsgBox('错误提示',data.desc);return;};
			 
			 CwGrid.$("dataGrid").queryGridData()
			 $.MsgBox('操作提示','生成成功');
		},
		error:ajaxError
	});
}


//初始化凭证类别
function initVoucherClass(){
	$.ajax({
		type: 'post',
		url: basePath+'/cw/pz/findClassify',
		dataType: "json",
		data:{},
		success: function(data) {
			 if(data.result != 1){$.MsgBox('错误提示',data.desc);return;};
			 var list = data.data.dataList;
			 $("#voucherClassSelect").html("");
			 for ( var i = 0; i < list.length; i++) {
				 $("#voucherClassSelect").append('<option value="'+list[i].id+'">'+list[i].name+'</option>');
			 }
		},error: ajaxError
	});
}

//初始化期间
function initQjDate(){
	$.ajax({
		type: 'post',
		url: basePath+'/cw/accountAnnual/findAnnual',
		dataType: "json",
		data:{
			'salaryAccountsFlag' : '0'
		},
		success: function(data) {
			 if(data.result != 1){$.MsgBox('错误提示',data.desc);return;};
			 var list = data.data.dataList;
			 $("#jzDate").html("");
			 for ( var i = 0; i < list.length; i++) {
				 if(list[i].financeAccountsFlag == 0)
					 $("#jzDate").append('<option value="'+list[i].currentAccountingYear+'-'+list[i].currentAccountingMonth+'">'+list[i].currentAccountingYear+'-'+list[i].currentAccountingMonth+'</option>');
			 }
			 
			 initProfitLossSubjectList( $("#jzDate").val());
			 
		},error: ajaxError
	});
}

//初始化损益科目列表
function initProfitLossSubjectList(value){
	var currentAccountingYear=value.split("-")[0];
	$.request({
		type: 'post',
		url: basePath+'/cw/company/findSykm',
		dataType: "json",
		data:{ifEndSubject:1,currentAccountingYear:currentAccountingYear},
		success: function(data) {
			  if(data.result != 1){$.MsgBox('错误提示',data.desc);return;};
			  var rows = $.map(data.data.rows,function(model){
 					return {syKmCode:model.subjectCode,syKmName:model.subjectName};
 			  }); 
			  
			  CwGrid.$("dataGrid").clear().addRowDatas(rows);
			  
			  CwGrid.$("dataGrid").queryGridData();
			 
		},error: ajaxError
	});
}

//统一错误处理
function ajaxError(msg){
//	console.log(msg);
}

//初始化界面、控件
function initUI(){

}

//初始化表格
//未记账凭证
function initDataGrid(){

	CwGrid.$(
	  {
	    gridId:'dataGrid', 
	    cellEdit:true,
	    addRow:{accountingDate:'',voucherKind:'',voucherNum:''},
	    colNames:['ID','损益科目编码','损益科目名称','利润科目编码', '利润科目名称'], 
	    colModel:
	    	[{name : 'id',index : 'id',align:'left',editable:false,sortable: false,width:200,fixed:true,hidden: true},
             {name : 'syKmCode',index : 'syKmCode',align:'left',editable:false,sortable: false,width:200,fixed:true,hidden: false},
             {name : 'syKmName',index : 'syKmName',align:'left',editable:false,sortable: false,width:200,fixed:true,hidden: false},
             {name : 'lrKmCode',sortable: false,index : 'lrKmCode',align:'left',edittype:'custom_bt_input',custom_element_bt_click:"selectSubjectReferenceOpen",editable:true,width:200,fixed:true} ,
             {name : 'lrKmName',index : 'lrKmName',align:'left',editable:false,sortable: false,width:200,fixed:true}
             
           ]
	  },
	  {
		afterEditCell:function(rowid,name,val,iRow,iCol){},
        afterSaveCell:function(rowid,name,val,iRow,iCol){},
        summary:function(rowid,name,val,iRow,iCol){},
        getGridDataList:function(rows){//筛出不合格行
        	return $.map(rows,function(row){
        		return row;
        	});
        },
        queryGridData:function(grid){
        	$.request({
        		type: 'post',
        		url: basePath+'/cw/syjz/find',
        		dataType: "json",
        		data:{},
        		success: function(data) {
        			  if(data.result != 1){$.MsgBox('错误提示',data.desc);return;};
        			  var rows = data.data.dataList; 
        			  for ( var int = 0; int < rows.length; int++) {
        				  CwGrid.$("dataGrid").updateRows(['syKmCode'],rows[int]);
					  }
        		},error: ajaxError
        	});
        }
	  }
	);
	
}

//初始化事件
function initEvents(){
	$(window).resize(wResize);//注册窗口改变事件
	wResize();

	$("#srzcfbjz").change(function(){
		if($("#srzcfbjz").is(":checked")){
			$("#hbsclrfl").prop("checked",false); 
			$("#hbsclrfl").attr({"disabled":"disabled"});
		}else{
			$("#hbsclrfl").removeAttr("disabled");
		}
	});
}

//窗口大小改变
function wResize(){
	CwGrid.$("dataGrid").setSize($(".gridBody").width()-15,$("html").height()-300,true);
	
}


var callBack ;
//科目参照
function selectSubjectReferenceOpen(cellInfo){
	var gridId = cellInfo.gridId;var rowid = cellInfo.rowId;var inptid = cellInfo.cellInputId;
	
	$('#subjectReferenceModal').modal('show');
	subjectReferenceFrame.reLoad();//可以参数查询
	callBack = function(){
		if(arguments[0].length == 0){
			$('#subjectReferenceModal').modal('hide');
			return ;
		}
		var model = arguments[0][0];
		if(model.ifEndSubject == '否'){
			$.MsgBox('操作提示','只能选末级科目');
			return;
		}
		//设置编辑器值
		$("#"+gridId+" #"+inptid).val(model.subjectCode);

		CwGrid.$(gridId).$grid.jqGrid('setCell', rowid ,"lrKmName" ,model.subjectName);	

		$('#subjectReferenceModal').modal('hide');
	}; 
}

//科目参照
function selectSubjectReferenceOpen2(){
	$('#subjectReferenceModal').modal('show');
	subjectReferenceFrame.reLoad();//可以参数查询
	callBack = function(){
		if(arguments[0].length == 0){
			$('#subjectReferenceModal').modal('hide');
			return ;
		}
		var model = arguments[0][0];
		if(model.ifEndSubject == '否'){
			$.MsgBox('操作提示','只能选末级科目');
			return;
		}
		
		//设置编辑器值
		$("input[name = 'bnlrSubjectCode']").val(model.subjectCode);
		$("input[name = 'bnlrSubjectName']").val(model.subjectName);
		
		CwGrid.$("dataGrid").setRowsValue({lrKmCode:model.subjectCode,lrKmName:model.subjectName});
		
		$('#subjectReferenceModal').modal('hide');
	}; 
}