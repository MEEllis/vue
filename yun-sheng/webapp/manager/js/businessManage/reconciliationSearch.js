/*点击确认收款按钮*/
$(document).on("click",".confirm_recieve",function(e){
	 window.location.href ="/manager/retail/checkPay/payMoneyAuditJSP";
	 e.preventDefault();
});

/*点击长短款记录*/
$(document).on("click",".record_LongShort",function(e){
	 window.location.href ="/manager/retail/checkPay/paragraphLenRecord";
	 e.preventDefault();
});


$(function(){
	
	$('#startDate').datePlu({
		dateEnd:'#endDate',
		endDate:true,
		minTime: "1970-01-01",
		ifPermissions:false
	})

	$('#storeInput').storePlu({
		search:false,
		checkMore:true,
		saleManId:'saleManInput',
		ifStore:true
	})

	$('#saleManInput').storeSales({
		checkMore:true,
		search:false,
		sectionId:'storeInput'
	})
	
	/*开始日期与结束日期初始化*/
	//var now =new Date();
//    $("input[name='startDate']").val(format(now.getTime(), 'yyyy-MM-01'));
//	$("input[name='endDate']").val(format(now.getTime(), 'yyyy-MM-dd'));
	getSystemTime();//获取系统时间
	/*交款门店*/
    $.ajax({
        url: '/manager/jxc/base/getAccessSectionVoList',
        type: 'POST',
        data: {
            sectionIsStore: 1,
			addDefault: 1
        },
        success: function(data){
            $(".jkmd_select").html("");
            if (data.data.sectionVoList) {
				for (var i = 0; i < data.data.sectionVoList.length; i++) {
					$(".jkmd_select").append("<option value='" + data.data.sectionVoList[i].id + "'>" + data.data.sectionVoList[i].name + "</option>");//门店信息加载
				}
			}
			jkr();//初始化交款人信息
        },
        error: function(msg){
			
        }
    });

});	

/*获取交款人信息*/
function jkr(){
    var slctVal = $(".jkmd_select>option:selected").val();//门店id
    $.ajax({
        url: '/manager/jxc/base/getEmployeeVoList',
        type: 'POST',
		data: {
            sectionId: slctVal,
			addDefault: 1
        },
        success: function(data){
            $(".jkr_slect").html("");
            if (data.data.employeeVoList) {
                for (var i = 0; i < data.data.employeeVoList.length; i++) {
                    $(".jkr_slect").append("<option value='" + data.data.employeeVoList[i].id + "'>" + data.data.employeeVoList[i].name + "</option>");//交款人信息加载
                }
            }
        },
        error: function(msg){
        
        }
    });
}

/*根据收款部门id查找相应的收款账户信息*/
$(document).on("change",".jkmd_select",jkr);

$.jgrid.defaults.styleUI = 'Bootstrap';
$("#orderGrid").jqGrid({
    mtype: "POST",
    datatype: "json",
    jsonReader: {
        root: "data.iretailPayList",
        repeatitems: false
    },
    postData: {
        "auditStatus": $('#ifSure').val()
    },
    colNames: ['操作', '收款状态','交款流水号', '交款门店', '交款人', '交款日期', '交款金额', '收款账户', '收款部门', '收款人', '收款时间'],
    colModel: [{
        name: 'check',
        width: 80,
        align: 'center',
        sortable: false,
        formatter:modifyAndDelete
    },
    {
        name: 'cofirmFlag',
        width: 80,
        align: 'center',
        sortable: false,
        formatter:'select',
        editoptions:{value:"1:已确认;0:未确认;2:已红冲"}
    },
    {
        name: 'flowNo',
        width: 150,
        align: 'center',
        sortable: false
    },//交款流水号
    {
        name: 'sectionName',
        width: 150,
        align: 'center',
        sortable: false
    },//交款门店？？
    {
        name: 'paymentName',
        width: 150,
        align: 'center',
        sortable: false
    },//交款人？？
    {
        name: 'paymentDateStr',
        width: 150,
        align: 'center',
        sortable: false
    },//交款日期
    {
        name: 'accountAmount',
        width: 150,
        align: 'center',
        sortable: false
    },//交款金额
    {
        name: 'accountName',
        width: 150,
        align: 'center',
        sortable: false
    },//收款账户
    {
        name: 'receiveSectionName',
        width: 150,
        align: 'center',
        sortable: false
    },//收款部门
    {
        name: 'receiveByName',
        width: 150,
        align: 'center',
        sortable: false
    },//收款人
    {
        name: 'receiveDateStr',
        width: 150,
        align: 'center',
        sortable: false
    }//收款时间
	],
    sortable: false,
    rownumbers: true,
    cellsubmit: 'clientArray',//单元格保存内容的位置		
    editurl: 'clientArray',
    rowNum: -1,
    viewrecords: true,
    cellEdit: false,
    width: '',
    footerrow: true,
    height: $(window).height() * 0.3,
    autowidth: true,
    rownumWidth: 55, // the width of the row numbers columns
    shrinkToFit: false, //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
    userDataOnFooter: true,//设置userData 显示在footer里
    ondblClickRow: function(id){
    	
    },
    prmNames: {
        page: null, // 表示请求页码的参数名称  
        rows: null, // 表示请求行数的参数名称  
        sort: null, // 表示用于排序的列名的参数名称  
        order: null, // 表示采用的排序方式的参数名称  
        search: null, // 表示是否是搜索请求的参数名称  
        nd: null, // 表示已经发送请求的次数的参数名称  
        id: null // 表示当在编辑数据模块中发送数据时，使用的id的名称   
    },
    onCellSelect: function(rowid, iCol, cellcontent, e){
    	modify(rowid);
    },
    onSelectRow: function(id){
    
    },
    beforeSelectRow: function(rowid, e){
    
    },
    afterInsertRow: function(rowid, aData){ //新增一行之后
    },
    gridComplete: function(){
    
    },
    loadComplete: function(data){
        var rowNum = parseInt($(this).getGridParam('records'), 10);
        if (rowNum > 0) {
        	$('.footrow td:first-child').html('合计');
            $(".ui-jqgrid-sdiv").show();
            var accountAmount = $(this).getCol('accountAmount', false, 'sum');
            $(this).footerData("set", {
                "accountAmount":  Number(accountAmount).toFixed(2) 
            }, false);
        }
        else {
            $(".ui-jqgrid-sdiv").hide();
        }

        var info = data.data.iretailPayList;
        $.each(info, function (i, detailItem) {
            // 期初
            if (detailItem.cofirmFlag == 2) {
                $("#orderGrid").jqGrid('setRowData', detailItem.id, {}, {"color": "red"});
            }

        })

    },
    loadError: function(xhr, status, error){
    
    }
});
	
function modifyAndDelete(cellvalue, options, rowObjec){
	var addAndDel ='<div class="operating" data-id="' + options.rowId + '"></span><span style="cursor:pointer;" class="icon-trash fontDel" id="icon-trash" title="删除"></span></div>';
	return addAndDel;
}
/*修改*/
$(document).on("click",".fontCtrl",function(){
		hideDown();
	    var id =$(this).closest("div").data("id");
	    modify(id);
});
function hideDown(){
 	$('.popsWrap').hide();
}
function showUp(){
    $('.popsWrap').show();
}
/*点击表格修改操作进行查询*/
function modify(id){
	if(id){
		var receiveStatus=$("#orderGrid").jqGrid("getCell",id,"cofirmFlag");
	}
    $.ajax({
        url: '/manager/retail/checkPay/updateCheckDemandData',
        type: "GET",
        datatype: "json",
        data: {
            retailPayId: id,
            auditStatus:$('#ifSure').val()
        }, 
        success: function(data){
			if (data.result == 1) {
				$('#infoSearch').show()
                $("#infoSearch").writeJson2Dom(data.data.payVo);
                if (data.data.payVo.accountAmount) {
                    $(".jkje").val(data.data.payVo.accountAmount);//交款金额
                }
                $("input[name=jkjy]").val($("input[name=yinAmount]").val() - $(".jkje").val());
                if(receiveStatus==0||receiveStatus=="0"){
                	$('.jkje').prop('disabled',false)
                }else{
                	$('.jkje').prop('disabled',true)
                }
                $('#remark').val(data.data.payVo.remark)
            } else {
				$.zxsaas_plus.showalert('error',data.desc);
			}
        },
        error: function(msg){
			
        }
    });
    showUp();
 
}
/*删除*/
$(document).on("click",".fontDel",function(){
	   var id =$(this).closest("div").data("id");
	   if(id){
			var receiveStatus=$("#orderGrid").jqGrid("getCell",id,"cofirmFlag");
		}
		if(receiveStatus==0||receiveStatus=="0"){
			$.zxsaas_plus.showconfirm('提示','是否确定删除？',function(){
				$.ajax({
			        url: '/manager/retail/checkPay/deleteCheckDemandData',
			        type: "POST",
			        datatype: "json",
			        data: {
			    	   retailPayId: id
			        },
			        success: function(data){
						if (data.result == 1) {
							$.zxsaas_plus.showalert('success',"删除成功！");
							 jQuery("#orderGrid").jqGrid('setGridParam', {
							        url: "/manager/retail/checkPay/findCheckDemandData",
							        datatype: "json",
							        postData: {
							        }, //发送数据
							    }).trigger("reloadGrid");
							 $('#infoSearch').hide()
			            } else {
							$.zxsaas_plus.showalert('error',data.desc);
						}
			        },
			        error: function(msg){
						
			        }
			    });
			},function(){})
		    
	    }else{
	    	$.zxsaas_plus.showalert('warning',"已经收款不可以删除！");
	    }
});
//修改的事件
$('.dateInput').datetimepicker({
    lang: "ch", //语言选择中文
    format: "Y-m-d", //格式化日期
    timepicker: false, //关闭时间选项
    todayButton: false //关闭选择今天按钮
});
			
//时间选择后触发事件
$(document).on("change","#dataSel",function(){
		writeDate1($(this),$(this).children('option:selected').data('flag'));
});

function disabledOrNot($this,flag){
	var bf =$this.closest(".row").find("#beginDate");
	var af =$this.closest(".row").find("#endDate");
	if(flag){
		if(!$(bf).attr("disabled")){
			$(bf).attr("disabled","disabled");
		}
		if(!$(af).attr("disabled")){
			$(af).attr("disabled","disabled");
		}
	}else{
		$(bf).removeAttr("disabled");
		$(af).removeAttr("disabled");
	}
}
/***
 * by GZX
 * **/
function getSystemTime(){ 
	var menuCode=$('#AUTH').attr('data-code');
    if(menuCode){
	 $.ajax({
		    url: '/manager/inventory/common/getInventoryBillsDate',
		    type: 'POST',
			dataType:'json',
			data:{
				'menuCode':menuCode
			},
		    success: function(data){
				if(data.result==1||data.result=='1'){
		            var cur_data =data.data;
		            current_date=cur_data.maxDate;
		        	$("#dataSel").trigger("change");
				}else{
					$.zxsaas_plus.showalert('error',data.desc);
				}
		    },
		    error: function(msg){
		    }
		});
    }
}

var current_date='';
function writeDate1($this,flag){
	var oDate=new Date(DateToSecond(current_date)),
	    oYear=oDate.getFullYear(),//当年
	    oMonth=oDate.getMonth()+1,//当月
	    oDay=oDate.getDate(),//当日
	    oWeek=oDate.getDay()==0?7:oDate.getDay(),//周几
	    beforeDate='',
	    afterDate='',
	    oTemp,
	    oTDate,
	    oTYear,
	    oTMonth,
	    oTDay,
	    oTWeek;	
	switch(flag){
	case 'self':
		  disabledOrNot($this,false);
		  break;
	case 'today':
		 disabledOrNot($this,true);
		beforeDate=format(oDate.getTime(),'yyyy-MM-dd');
		afterDate=beforeDate;
	    break;
	case 'yesterday':
		  disabledOrNot($this,true);
		beforeDate=format(new Date(oYear,oMonth-1,oDay-1).getTime(),'yyyy-MM-dd');
		afterDate=beforeDate;
		break;
	case 'week':
		  disabledOrNot($this,true);
		afterDate=format(oDate.getTime(),'yyyy-MM-dd');
		oDate.setDate(oDate.getDate()-oWeek+1);
		beforeDate=format(oDate.getTime(),'yyyy-MM-dd');
		break;
	case 'month':
		  disabledOrNot($this,true);
		beforeDate=format(new Date(oYear,oMonth-1,1).getTime(),'yyyy-MM-dd');
		afterDate=format(oDate.getTime(),'yyyy-MM-dd');
		break;
	case 'year':
		  disabledOrNot($this,true);
		beforeDate=format(new Date(oYear,0,1).getTime(),'yyyy-MM-dd');
		afterDate=format(oDate.getTime(),'yyyy-MM-dd');
		break;
		default:
	}
    $this.closest(".row").find("#beginDate").val(beforeDate);
	$this.closest(".row").find("#endDate").val(afterDate);
}


/*点击顶部新增按钮*/
$(document).on("click",".Search_add",function(){
	window.location.href="/manager/retail/checkPay/jiaokuan";
});

$('.reset').click(function(){
	hideDown()
	$('#inquire_option')[0].reset()
	$('#storeInput').data('sectionId','')
	$('#saleManInput').data('employeeId','')
})

/*填写查询条件点击查询按钮*/
$(document).on("click", "#search", function(){
	hideDown()
    var search_obj = {};
    search_obj = $("#inquire_option").toJsonObject();
    search_obj.startDate=$("#beginDate").val();
    search_obj.endDate=$("#endDate").val();
    if (!search_obj.auditStatus) {
        search_obj.auditStatus = 0;
    }
//    var time1 = search_obj.startDate;
//    var time2 = search_obj.endDate;
//    var  flag =judgeStartEndDate(time1, time2);
//    if(flag){
	    jQuery("#orderGrid").jqGrid('setGridParam', {
	        url: "/manager/retail/checkPay/findCheckDemandData",
	        datatype: "json",
	        postData: {
	            "sectionId": $('#storeInput').data('sectionId') ? $('#storeInput').data('sectionId') : null,
	            "paymentId": $('#saleManInput').data('employeeId') ? $('#saleManInput').data('employeeId') : null,
	            "startDate": $('#startDate').val(),
	            "endDate": $('#endDate').val(),
	            "auditStatus": $('#ifSure').val()
	        }, //发送数据  
	    }).trigger("reloadGrid");
//    }
});

$('#ifSure').change(function(){
	 jQuery("#orderGrid").jqGrid('setGridParam', {
	        url: "/manager/retail/checkPay/findCheckDemandData",
	        datatype: "json",
	        postData: {
	            "auditStatus": $('#ifSure').val()
	        }, //发送数据  
	    }).trigger("reloadGrid");
})

function judgeStartEndDate(time1, time2){
	if(time1!=""&&time2!=""){
		time1 = DateToSecond(time1);
		time2 = DateToSecond(time2);
		if(time1>time2){
	    	$.zxsaas_plus.showalert('warning',"开始日期不能大于结束日期！");
			return false;
		}else{
			return true;
		}
	}else{
	     if(time1==""&&time2!=""){
	    	 $.zxsaas_plus.showalert('warning',"开始日期为空！"); 
	    	 return false;
	     }else if(time2==""&&time1!=""){
	    	 $.zxsaas_plus.showalert('warning',"结束日期为空！");
	    	 return false;
	     }
	     return true;

	}
}

/*日期转化时间*/
function DateToSecond(date){
	if(date){
		 var Time = new Array();   
		 Time = date.split("-"); 
		 return (new Date(Time[0],Time[1]-1,Time[2])).valueOf();  
	}else{
		 return "";
	}
}


/*点击确定保存修改信息*/
$(document).on("click", ".Search_save", function(){
    var result = $("#infoSearch").toJsonObject();
    result.remark = $('#remark').val()
	if(result.accountAmount == 0){
		$.zxsaas_plus.showalert('warning','交款金额为0不允许保存!');
		return;
	}
    $.ajax({
        url: '/manager/retail/checkPay/updateDemandDataSave',
        type: "POST",
        datatype: "json",
        traditional: true,
        data: {
            "jsonData": JSON.stringify(result)
        },
        success: function(data){
            $.zxsaas_plus.showalert("提示", "保存成功！");
            $('.popsWrap').hide();
            $("#orderGrid").trigger("reloadGrid");
            $('#remark').val('')
        },
        error: function(msg){
        
        }
    });
});

/*点击确定取消接收*/
//获取权限日期
getAuthList(function(){});
$(document).on("click", ".Search_Cancel", function(){

    var result = $("#infoSearch").toJsonObject();
    var paymentDateStr =  $("#orderGrid").jqGrid("getCell",result.id,"paymentDateStr");
    $('#redDate').datePlu({
        endDate:false,
        minTime: paymentDateStr,
        defaultTime:paymentDateStr, //默认时间
        ifPermissions:false
    })
    $("#myModal_red").modal('show');
});
/*红冲*/
$(document).on("click", "#red_sure", function(){
    var result = $("#infoSearch").toJsonObject();
    $.ajax({
        url: '/manager/retail/checkPay/saveCancelConfirmed',
        type: "POST",
        datatype: "json",
        traditional: true,
        data: {
            retailPayId:result.id,
            cancelDateStr:$('#redDate').val()
        },
        success: function(data){
            if(data.result!=1){
                $.zxsaas_plus.showalert("提示", data.desc || '服务器繁忙');
            }else{
                $.zxsaas_plus.showalert("提示", "保存成功！");
                $('.popsWrap').hide();
                $("#orderGrid").trigger("reloadGrid");
                $('#remark').val('')
            }

        },
        error: function(msg){

        }
    });
});

$(".jkje").on("blur",function(){
	var flag = true;
	flag =judgeJkje($(this).val());
	if(!flag){
		$.zxsaas_plus.showalert('提示','请输入合法的整数或小数，小数点后最多两位');
		$("input[name='accountAmount']").val('0');
	}

	 var jkjy =$(".yjje").val()-$(this).val();
	 $(".jkjy").val(Number(jkjy).toFixed(2));
});
function judgeJkje(value){
	var rex =/^\d+(\.\d{1,2})?$/;
	if(!rex.test(value)){
		return false;
	}else{
	    return true;	
	}
	
}
var format = function(time, format){
    var t = new Date(time);
    var tf = function(i){
        return (i < 10 ? '0' : '') + i
    };
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
        switch (a) {
            case 'yyyy':
                return tf(t.getFullYear());
                break;
            case 'MM':
                return tf(t.getMonth() + 1);
                break;
            case 'mm':
                return tf(t.getMinutes());
                break;
            case 'dd':
                return tf(t.getDate());
                break;
            case 'HH':
                return tf(t.getHours());
                break;
            case 'ss':
                return tf(t.getSeconds());
                break;
        }
    })
}


	