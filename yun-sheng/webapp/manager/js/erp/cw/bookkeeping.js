
//初始化
$(function(){
	
	initUI();
	initDataGrid();
	initEvents();
});

//反记账
function cancelRecord(){
	
	var paras = $("#searchForm").toJsonObject();
	if($.trim(paras.dateBegin)=='' || $.trim(paras.dateEnd)=='')return;
	$.request({
		type: 'post',
		url: basePath+'/cw/recordAccounts/cancelRecord',
		dataType: "json",
		data:paras,
		success: function(data) {
			 if(data.result != 1){$.MsgBox('错误提示',data.desc);return;};
			 
			 CwGrid.$("dataGrid").queryGridData()
			 $.MsgBox('操作提示','反记账成功');
		},
		error: function(msg) {
			 //console.log(msg);
		}
	});
}

//预记账
function assistRecord(){
	
	var paras = $("#searchForm").toJsonObject();
	if($.trim(paras.dateBegin)=='' || $.trim(paras.dateEnd)=='')return;
	$.request({
		type: 'post',
		url: basePath+'/cw/recordAccounts/assistRecord',
		dataType: "json",
		data:paras,
		success: function(data) {
			 if(data.result != 1){$.MsgBox('错误提示',data.desc);return;};
			 
			 CwGrid.$("dataGrid").queryGridData()
			 $.MsgBox('操作提示','预记账成功');
		},
		error: function(msg) {
			 //console.log(msg);
		}
	});
}

//记账
function record(){
	
	var models = CwGrid.$("dataGrid").getGridDataList();
	if(models.length == 0)return;
	$.request({
		type: 'post',
		url: basePath+'/cw/recordAccounts/record',
		contentType : 'application/json',//传输类型
		dataType: "json",
		data:JSON.stringify(models),
		success: function(data) {
			 if(data.result != 1){$.MsgBox('错误提示',data.desc);return;};
			 
			 CwGrid.$("dataGrid").queryGridData()
			 $.MsgBox('操作提示','记账成功');
		},
		error:ajaxError
	});
}

//统一错误处理
function ajaxError(msg){
//	console.log(msg);
}

//初始化界面、控件
function initUI(){
	
	//初始化日期
	$("#dateBegin").datetimepicker({
        format: 'yyyy-mm',
        autoclose:true,
        language:'zh-CN',
        startView:3,
        minView:3,
        maxView:4
    }).on('changeDate', function(ev){
    	if(!validatorDate()){
    		$("#dateEnd").val("");
    		$('#dateEnd').datetimepicker('update');
    	}else{
			if($("#dateBegin").val() != '' && $("#dateEnd").val() != ''){
				checkAccountDate({
					'dateBegin':$("#dateBegin").val(),
					'dateEnd':$("#dateEnd").val()
				})
			}
		}

    });
	$("#dateEnd").datetimepicker({
        format: 'yyyy-mm',
        autoclose:true,
        language:'zh-CN',
        startView:3,
        minView:3,
        maxView:4
    }).on('changeDate', function(ev){
    	if(!validatorDate()){
    		$("#dateBegin").val("");
    		$('#dateBegin').datetimepicker('update');
    	}else {
    		if($("#dateBegin").val() != '' && $("#dateEnd").val() != ''){
				checkAccountDate({
					'dateBegin':$("#dateBegin").val(),
					'dateEnd':$("#dateEnd").val()
				})
			}

		}

    });
	
	function validatorDate(){
		var dateS = $("#dateBegin").val();
		var dateE = $("#dateEnd").val();
		if(dateS != "" && dateE != ""){
			if(dateS.split("-")[0] != dateE.split("-")[0]){
				//$.MsgBox('操作提示','会计期间不能跨年');
				return false;}
			if(parseInt(dateS.split("-")[1]) > parseInt(dateE.split("-")[1])){
				$.MsgBox('操作提示','开始期间不能小于结束期间');
				return false;}
		}
		return true;
	}

	function checkAccountDate(params){
		$.ajax({
			url:'/manager/cw/recordAccounts/checkAccountDate',
			type:'post',
			dataType:'json',
			data:params,
			success:function(data){
				if(data.result != 1){
					$.zxsaas_plus.showalert('提示',data.desc)
					$("#dateBegin").val('')
					$("#dateEnd").val('')
				}

			}
		})

	}
}

//初始化表格
//未记账凭证
function initDataGrid(){
	
	function formatterYearMonth(cellvalue, options, rowObject){
		return rowObject.year+"-"+rowObject.month;
	}
	
	CwGrid.$(
	  {
	    gridId:'dataGrid', 
	    cellEdit:false,
	    addRow:{accountingDate:'',voucherKind:'',voucherNum:''},
	    colNames:['年','月','会计期间', '凭证类别', '待记账凭证'], 
	    colModel:
	    	[ 
             {name : 'year',index : 'year',align:'left',editable:true,sortable: false,width:200,fixed:true,hidden: true},
             {name : 'month',index : 'month',align:'left',editable:true,sortable: false,width:200,fixed:true,hidden: true},
             {name : 'year_month',index : 'year_month',align:'left',editable:true,sortable: false,width:200,fixed:true,formatter:formatterYearMonth},
             {name : 'voucherKind',index : 'VOUCHER',align:'left',editable:true,sortable: false,width:200,fixed:true},
             {name : 'voucherNum',index : 'VOUCHER_NUM',align:'left',editable:false,sortable: false,width:200,fixed:true}
           ]
	  },
	  {
		afterEditCell:function(rowid,name,val,iRow,iCol){},
        afterSaveCell:function(rowid,name,val,iRow,iCol){},
        summary:function(rowid,name,val,iRow,iCol){},
        getGridDataList:function(rows){//筛出不合格行
        	return $.map(rows,function(row){
        		delete row["year_month"];
        		return row;
        	});
        },
        queryGridData:function(grid){
        	var paras = $("#searchForm").toJsonObject();
        	if($.trim(paras.dateBegin)=='' || $.trim(paras.dateEnd)=='')return;
        	$.request({
        		type: 'post',
        		url: basePath+'/cw/recordAccounts/findVoucherByNoPost',
        		dataType: "json",
        		data:paras,
        		success: function(data) {
        			 if(data.result != 1){$.MsgBox('错误提示',data.desc);return;};
        			 
        			 //加入数据
        			 CwGrid.$("dataGrid").clear().addRowDatas(data.data.dataList);
        		},
        		error: function(msg) {
        			 //console.log(msg);
        		}
        	});
        }
	  }
	);
	
}

//初始化事件
function initEvents(){
	$(window).resize(wResize);//注册窗口改变事件
	wResize();
	
	//反记账
	$(document).keydown(function(event){ 
		if(event.keyCode == 67 && event.ctrlKey && event.altKey){
			$.MsgBox('操作提示','是否进行反记账',function(){			
				cancelRecord();
			},function(){});
		}
	}); 
}

//窗口大小改变
function wResize(){
	console.log($("html").height());
	CwGrid.$("dataGrid").setSize($(".gridBody").width()-30,$("html").height()-300,true);
	
//	$(".referenceFrame").height(winH - 300);
}



