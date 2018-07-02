
//初始化
$(function(){
	//$('#settleAccountsModal').modal('show');
	initYearSelect();//初始化年度选择
	initDataGrid();//初始化表格
	initDataGrid2();
	initEvents();

	$('#creatNextBtn').click(function () {
		$.request({
			url:'/manager/finance/monthly/accounting/createNextYearData',
			type:'post',
			dataType:'json',
			data:{
				'year':$('#yearSelect').val()
			},
			success:function (data) {
				if(data.result == 1){
					$.zxsaas_plus.showalert('success','生成下一年度基础资料成功')
				}else{
					$.zxsaas_plus.showalert('warning',data.desc);
				}
			}

		})
	})

	$('#toNextBtn').click(function () {
		$.request({
			url:'/manager/finance/monthly/accounting/validateNextYearData',
			type:'post',
			dataType:'json',
			data:{
				'year':$('#yearSelect').val()
			},
			success:function (data) {
				if(data.result == 1){
					if(data.data.beginningCount > 0){
						$.zxsaas_plus.showconfirm('提示','是否继续请选择',function () {
							$.request({
								url:"/manager/finance/monthly/accounting/createNextYearBalanceForward",
								type:'post',
								dataType:'json',
								data:{
									'year':$('#yearSelect').val()
								},
								success:function (data) {
									$.zxsaas_plus.showalert('success','操作成功!');
								}
							})
						},function () {
							return;
						})
				 	}
				 	else{
						// $.request({
						// 	url:"/manager/finance/monthly/accounting/createNextYearBalanceForward",
						// 	type:'post',
						// 	dataType:'json',
						// 	data:{
						// 		'year':$('#yearSelect').val()
						// 	},
						// 	success:function (data) {
						// 		$.zxsaas_plus.showalert('success','操作成功!');
						// 	}
						// })
                        $.zxsaas_plus.showalert('提示','没有结转余额记录');
					}

				}
				else{
					$.zxsaas_plus.showalert('warning',data.desc);
				}
			}

		})
	})

});

//结账
function closingAccounts(){
	var date = $("#settleDate").html();
	$.request({
		url: this.basePath + '/cw/settleAccounts/closingAccounts',
		type : "post",
		dataType : 'json',
		data: {year:date.split('-')[0],month:date.split('-')[1],checked:$('.autoCreat').is(':checked') ? '1' : '0'},
		success: function(data) {
			$('#cwjzModal').modal('hide')
			if(data.result == 1){
				//显示信息
                getYearTerm()
				$("#cwjzModal").find(".doInfo").html("结账成功");
			}else{
				$.zxsaas_plus.showalert('error',data.desc)
				// $("#cwjzModal").find(".doInfo").html(data.desc);
			}
			CwGrid.$("dataGrid").queryGridData();
		},
		error: ajaxError
	});
}

//取消结账     
function cancle(){
	var date = $("#unSettleDate").html();
	if($.trim(date)=='')return;
	$.request({
		type: 'post',
		url: basePath+'/cw/settleAccounts/cancle',
		dataType: "json",
		data:{year:date.split('-')[0],month:date.split('-')[1]},
		success: function(data) {
			 if(data.result != 1){$.MsgBox('错误提示',data.desc);return;};
            getYearTerm()
			 CwGrid.$("dataGrid").queryGridData();
		},
		error: ajaxError
	});
}

//初始化年度选择列表     
function initYearSelect(){
	
	$.ajax({
		type: 'post',
		url: basePath+'/cw/accountAnnual/findAnnualYears',
		dataType: "json",
		success: function(data) {
			 if(data.result != 1){$.MsgBox('错误提示',data.desc);return;};
			 var list = data.data.dataList;
			 $("#yearSelect").html("");
			 for ( var int = 0; int < list.length; int++) {
				 var sel = int == 0?'selected="selected"':'';
				 $("#yearSelect").append('<option '+sel+' value="'+list[int]+'">'+list[int]+'</option>');
			 }
			 CwGrid.$("dataGrid").queryGridData();
		},
		error: ajaxError
	});
}

//打开对账界面
var currCompareResult = null;
function openComparemModel(){
	//判断是否有结账月份
	if($("#settleDate").html()==""){
		$.MsgBox('操作提示','不存在可以结账月份');
		return;
	}
	currCompareResult = null;
	
	//获取日期
	$(".currYear").html($("#settleDate").html().split("-")[0]);
	$(".currMonth").html($("#settleDate").html().split("-")[1]);
	$("#dzResult1").html('');
	$("#dzResult2").html('');
	$("#dzResult3").html('');
	$("#settleAccountsStep1Modal").find(".doInfo").html("对账")
	$('#gzbgModal').modal('hide');
	$('#cwjzModal').modal('hide');
	$('#cwdzModal').modal('show');
}

//财务对账错误信息
function openComparemErrorInfoModel(){
	if(currCompareResult != null){
		//dzfs,dzqj,subjectCode,subjectName,fzx,zzsz,mxzsz,mark
		//"总账与明细账|2017.3|1131|应收股利|.|(40000.0,40000.0)|(20000,20000)|金额不等"
		var error1 = $.map(currCompareResult.error1,function(item){
			try {
				var obj = {};
				var pars = item.desc.split("|");
				obj.dzfs = pars[0];
				obj.dzqj = pars[1];
				obj.subjectCode = pars[2];
				obj.subjectName = pars[3];
				obj.fzx = pars[4];
				obj.zzsz = pars[5];
				obj.mxzsz = pars[6];
				obj.mark = pars[7];
				return obj;
			} catch (e) {
				console.log(e);
			}
		});
		var error2 = $.map(currCompareResult.error2,function(item){
			try {
				var obj = {};
				var pars = item.desc.split("|");
				obj.dzfs = pars[0];
				obj.dzqj = pars[1];
				obj.subjectCode = pars[2];
				obj.subjectName = pars[3];
				obj.fzx = pars[4];
				obj.zzsz = pars[5];
				obj.mxzsz = pars[6];
				obj.mark = pars[7];
				return obj;
			} catch (e) {
				console.log(e);
			}
		});
		var error3 = $.map(currCompareResult.error3,function(item){
			try {
				var obj = {};
				var pars = item.desc.split("|");
				obj.dzfs = pars[0];
				obj.dzqj = pars[1];
				obj.subjectCode = pars[2];
				obj.subjectName = pars[3];
				obj.fzx = pars[4];
				obj.zzsz = pars[5];
				obj.mxzsz = pars[6];
				obj.mark = pars[7];
				return obj;
			} catch (e) {
				console.log(e);
			}
		});
		
		CwGrid.$("dataGrid2").clear().addRowDatas(error1); 
		CwGrid.$("dataGrid2").addRowDatas(error2); 
		CwGrid.$("dataGrid2").addRowDatas(error3); 
		
		$('#cwdzErroInfoModal').modal('show');
	}
}

//打开工作报告界面
function openWorkInfoModel(){

	if($("#dzResult1").html()=="√" && $("#dzResult2").html()=="√" && $("#dzResult3").html()=="√"){
		getReportSuccess = false
		$('#gzbgModal').modal('show');
		$('#cwdzModal').modal('hide');
		$('#cwjzModal').modal('hide');
		openSettleModel()
		$("#settleAccountsStep2Modal").find(".doInfo").html("");
		return;
	}
	
	//判断对账是否成功
	$(".currYear").html($("#settleDate").html().split("-")[0]);
	$(".currMonth").html($("#settleDate").html().split("-")[1]);


	//对账
	$.request({
			url: this.basePath + '/cw/settleAccounts/compare',
			type : "post",
			dataType : 'json',
			data:{year:$("#settleDate").html().split("-")[0],month:$("#settleDate").html().split("-")[1]},
			success:ccallBack
	}); 	
	function ccallBack(data){
		if(data.result != 1){
			$("#settleAccountsStep1Modal").find(".doInfo").html("对账失败");
			
			//显示对账结果
			if(data.data.obj != undefined){
				$("#dzResult1").html(data.data.obj.error1.length > 0?'×':'√');
				$("#dzResult2").html(data.data.obj.error2.length > 0?'×':'√');
				$("#dzResult3").html(data.data.obj.error3.length > 0?'×':'√');
				currCompareResult = data.data.obj;
			}else{
				$('#gzbgModal').modal('hide');
				$('#cwdzModal').modal('hide');
				$('#cwjzModal').modal('hide');	
				$.MsgBox('错误提示',data.desc);
			}
			return;
		}else{
			$("#dzResult1").html(data.data.obj.error1.length > 0?'×':'√');
			$("#dzResult2").html(data.data.obj.error2.length > 0?'×':'√');
			$("#dzResult3").html(data.data.obj.error3.length > 0?'×':'√');
		}

	}

}
//打开结账界面
var getReportSuccess = false;
function openSettleModel(){
	//判断工作报告是否成功
	if(getReportSuccess){
		$('#cwjzModal').modal('show');
		$('#gzbgModal').modal('hide');
		$('#cwdzModal').modal('hide');
		if($("#settleDate").html().split("-")[1] == '12'){
			$('.autoCreat').prop('disabled',false).prop('checked',true)
			$('.autoCreatBox').css('color','#000');
		}
		return;

	}



	//查询月度工作报告
	$.request({
		url: this.basePath + '/cw/settleAccounts/report',
		type : "post",
		dataType : 'json',
		data:{year:$("#settleDate").html().split("-")[0],month:$("#settleDate").html().split("-")[1]},
		success:function(data){
			if(data.result == 1){
				$("#weijiezhuan").html("");
				if(data.data.obj.listSubject.length > 0){
					for (var int = 0; int < data.data.obj.listSubject.length; int++) {
						if(int == 0){
							$("#weijiezhuan").html(data.data.obj.listSubject[int]);	
						}else{
							$("#weijiezhuan").html($("#weijiezhuan").html() + "<br>" + data.data.obj.listSubject[int]);
						}
					}
				}
				getReportSuccess = true
				
				var ph = data.data.obj.listPH2;
				$("#groupSubjectTabledddd").html("");
				$("#groupSubjectTabledddd").html($("#groupSubjectTabledddd").html() + '<tr><td>'+ph[0].subjectClssifyName+'</td><td>借</td><td style="text-align: right;">'+formatCurrency(ph[0].periodEndAmuont)+'</td>'+
						                             '<td>'+ph[1].subjectClssifyName+'</td><td>贷</td><td style="text-align: right;">'+formatCurrency(ph[1].periodEndAmuont)+'</td></tr>');
				$("#groupSubjectTabledddd").html($("#groupSubjectTabledddd").html() + '<tr><td>'+ph[3].subjectClssifyName+'</td><td>借</td><td style="text-align: right;">'+formatCurrency(ph[3].periodEndAmuont)+'</td>'+
                                                     '<td>'+ph[2].subjectClssifyName+'</td><td>贷</td><td style="text-align: right;">'+formatCurrency(ph[2].periodEndAmuont)+'</td></tr>');
				$("#groupSubjectTabledddd").html($("#groupSubjectTabledddd").html() + '<tr><td>'+ph[4].subjectClssifyName+'</td><td>借</td><td style="text-align: right;">'+formatCurrency(ph[4].periodEndAmuont)+'</td>'+
                                                 '<td>'+ph[5].subjectClssifyName+'</td><td>贷</td><td style="text-align: right;">'+formatCurrency(ph[5].periodEndAmuont)+'</td></tr>');
				
				$("#groupSubjectTabledddd").html($("#groupSubjectTabledddd").html() + '<tr><td>合计</td><td>借</td><td style="text-align: right;">'+formatCurrency(ph[0].periodEndAmuont+ph[3].periodEndAmuont+ph[4].periodEndAmuont)+'</td>'+
                        '<td>合计</td><td>贷</td><td style="text-align: right;">'+formatCurrency(ph[1].periodEndAmuont+ph[2].periodEndAmuont+ph[5].periodEndAmuont)+'</td></tr>');

				if(((ph[0].periodEndAmuont+ph[3].periodEndAmuont+ph[4].periodEndAmuont) - (ph[1].periodEndAmuont+ph[2].periodEndAmuont+ph[5].periodEndAmuont)) < 1){
					$("#phResult").html("试算结果平衡");
				}else{
					$("#phResult").html("试算结果不平衡");
				}
				
				$("#workcuont").html("本期共" + data.data.obj.workload.total + "张凭证");
				
				$("#dhhhhh").html(data.data.obj.isBroken?'有断号':'无断号');
				$("#settleAccountsStep2Modal").find(".doInfo").html("月度工作报告");
			}else{


			}
		}
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
	
	function formatterStart(cellvalue, options, rowObject){
		var date = new Date();
		date.setFullYear(rowObject.currentAccountingYear,parseInt(rowObject.currentAccountingMonth)-1, 2);
		return $.DateFormat($.getCurrentMonthFirst(date),"yyyy-MM-dd");
	}
	function formatterEnd(cellvalue, options, rowObject){
		var date = new Date();
		date.setFullYear(rowObject.currentAccountingYear, parseInt(rowObject.currentAccountingMonth)-1, 2);
		return $.DateFormat($.getCurrentMonthLast(date),"yyyy-MM-dd");
	}
	function formatterFinanceAccountsFlag(cellvalue, options, rowObject){
		return cellvalue==1?'Y':'';
	}
	CwGrid.$(
	  {
	    gridId:'dataGrid', 
	    cellEdit:false,
	    rownumbers:false,
	    addRow:{accountingDate:'',voucherKind:'',voucherNum:''},
	    colNames:['年度','期间','开始日期','结束日期', '期末结账'], 
	    colModel:
	    	[ 
	    	 {name : 'currentAccountingYear',index : 'currentAccountingYear',align:'right',editable:true,sortable: false,width:70,fixed:true,hidden: true},
             {name : 'currentAccountingMonth',index : 'currentAccountingMonth',align:'center',editable:true,sortable: false,width:70,fixed:true},
             {name : 'startDate',index : 'startDate',align:'center',editable:true,sortable: false,formatter:formatterStart},
             {name : 'endDate',index : 'endDate',align:'center',editable:true,sortable: false,formatter:formatterEnd},
             {name : 'financeAccountsFlag',index : 'financeAccountsFlag',align:'center',editable:true,sortable: false,formatter:formatterFinanceAccountsFlag}
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
        	var year = $('#yearSelect option:selected').val();;
        	if(year == "")return;
        	$.ajax({
        		type: 'post',
        		url: basePath+'/cw/accountAnnual/findAnnual',
        		dataType: "json",
        		data:{year:year},
        		success: function(data) {
        			 if(data.result != 1){$.MsgBox('错误提示',data.desc);$('#settleAccountsModal').modal('hide');return;};
        			 $('#settleAccountsModal').modal('show');
        			 //加入数据
        			 CwGrid.$("dataGrid").clear().addRowDatas(data.data.dataList);
        			 wResize();
        		},
        		error: function(msg) {
        			 //console.log(msg);
        		}
        	});
        }
	  }
	);
}

//对账错误信息
function initDataGrid2(){

	CwGrid.$(
	  {
	    gridId:'dataGrid2', 
	    cellEdit:false,
	    rownumbers:false,
	    addRow:{accountingDate:'',voucherKind:'',voucherNum:''},
	    colNames:['对账方式','期间','科目编码','科目名称', '辅助项', '总账数值', '明细账数值', '说明'], 
	    colModel:
	    	[ 
	    	 {name : 'dzfs',index : 'dzfs',align:'left',editable:true,sortable: false,fixed:true,width:180},
             {name : 'dzqj',index : 'dzqj',align:'center',editable:true,sortable: false,fixed:true,width:100},
             {name : 'subjectCode',index : 'subjectCode',align:'left',editable:true,sortable: false,width:120},
             {name : 'subjectName',index : 'subjectName',align:'left',editable:true,sortable: false,width:120},
             {name : 'fzx',index : 'fzx',align:'center',editable:true,sortable: false,width:120},
             {name : 'zzsz',index : 'zzsz',align:'right',editable:true,sortable: false,width:160},
             {name : 'mxzsz',index : 'mxzsz',align:'right',editable:true,sortable: false,width:160},
             {name : 'mark',index : 'mark',align:'left',editable:true,sortable: false,width:120}
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
        queryGridData:function(grid){}
	  }
	);
}

//初始化事件
function initEvents(){
	$(window).resize(wResize);//注册窗口改变事件
	wResize();

    getYearTerm()
	
	$('#yearSelect').change(function(){ 
		CwGrid.$("dataGrid").queryGridData();
	}) 
}


function getYearTerm() {
    $.ajax({
        type: 'post',
        url: basePath+'/cw/accountAnnual/findAnnual',
        dataType: "json",
        data:{},
        success: function(data) {
            if(data.result != 1){$.MsgBox('错误提示',data.desc);$('#settleAccountsModal').modal('hide');return;};

            //获取结账月份
            var dataList = data.data.dataList;
            var tag = 0;
            var newYear;
            for ( var int = 0; int < dataList.length; int++) {
                if(dataList[int].financeAccountsFlag == 1){
                    tag = parseInt(dataList[int].currentAccountingMonth);
                    newYear = parseInt(dataList[int].currentAccountingYear);
                }
            }
            var date = new Date();
            if(newYear!==undefined){
                date.setFullYear(newYear,tag, 2);
                $("#settleDate").html($.DateFormat($.getCurrentMonthFirst(date),"yyyy-MM"));

                date.setFullYear(newYear,tag-1, 2);
                $("#unSettleDate").html($.DateFormat($.getCurrentMonthFirst(date),"yyyy-MM"));
            }else{
                if(dataList[0]){
                    tag = parseInt(dataList[0].currentAccountingMonth);
                    newYear = parseInt(dataList[0].currentAccountingYear);
                    date.setFullYear(newYear,tag-1, 2);
                    $("#settleDate").html($.DateFormat($.getCurrentMonthFirst(date),"yyyy-MM"));
                }
            }


        },
        error: function(msg) {
            //console.log(msg);
        }
    });
}

//窗口大小改变
function wResize(){
	CwGrid.$("dataGrid").setHeight(450,true);
	CwGrid.$("dataGrid").setWidth($(".gridBody").width(),true);
	CwGrid.$("dataGrid2").setWidth(870,true);
	CwGrid.$("dataGrid2").setHeight(450,true);
}



