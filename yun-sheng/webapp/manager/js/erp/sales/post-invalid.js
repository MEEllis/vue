/**过账时为草稿ID,红冲时为正式ID**/

//过账(审核)按钮单击事件
function postBtnClick(btnId){
	var param=getPostOrInvalidParam(btnId);
	var temp="";
	if(type=="18"){
		temp="审核";
	}else{
		temp="过账";
	}
	if(param==true){return;}
	if(btnId=="1"){
		//校验页面是否编辑
		if($("input").data("changed")){
			$.zxsaas_plus.showalert("提示","当前单据未保存，继续操作前请先保存");
			return;
		}
		$.MsgBox("提示","确定"+temp+"此单据？",function(){
			toPostOrInvalidAjax(param);
		},function(){
		});
	}
	if(btnId=="2"){
		toPostOrInvalidAjax(param);
	}
}

$(document).delegate("input", "input propertychange", function(e){
	$("input").data("changed",true);
});


//过账、红冲ajax
//过账XSCK_GZ("xsck_gz"),XSHH_GZ("xshh_gz"),XSTH_GZ("xsth_gz"),WTCK_GZ("wtck_gz"),WTTH_GZ("wtth_gz"),
//XSCK_RED("xsck_red"),XSHH_RED("xshh_red"),XSTH_RED("xsth_red"),WTCK_RED("wtck_red"),WTTH_RED("wtth_red"),
function toPostOrInvalidAjax(param){
	var actionCode="";
	if(type=="19"){
		if(param.pi_bus_opr=="1"){
			actionCode="xsck_gz";
            var getParam=getSaveParam();
            var flag=false;
            for (var int = 0; int <getParam.salesOutstrorageNumDraft.length; int++) {
                if (getParam.salesOutstrorageNumDraft[int].giftFlag==0&&$.parseFloat(getParam.salesOutstrorageNumDraft[int].price) == 0) {
                    flag = true
                }
            }
            if(flag==true){
                $.zxsaas_plus.showconfirm('提示','单据中存在不是赠品,价格为0的商品，是否确认过账',function () {
                    postDate()
                },function () {
                     return;
                })
            }else{
                postDate()
            }
		}else if(param.pi_bus_opr=="2"){
			actionCode="xsck_red";
            postDate()
		}
	}
	//批发换货
	if(type=="20"){
		if(param.pi_bus_opr=="1"){
			actionCode="xshh_gz";
            var getParam=getSaveParam();
            var flag=false;
            for (var int = 0; int <getParam.salesOutstrorageNumDraft.length; int++) {
                if ($.parseFloat(getParam.salesOutstrorageNumDraft[int].price) == 0) {
                    flag = true
                }
            }
            for (var int = 0; int <getParam.salesInstrorageNumDraftList.length; int++) {
                if ($.parseFloat(getParam.salesInstrorageNumDraftList[int].price) == 0) {
                    flag = true
                }
            }
            if(flag==true){
                $.zxsaas_plus.showconfirm('提示','单据中存在价格为0的商品，是否确认过账',function () {
                    validateIsSave(getSaveParam(),function () {
                        postDate()
                    })
                },function () {
                    return;
                })
            }else{
                validateIsSave(getSaveParam(),function () {
                    postDate()
                })
            }
		}else if(param.pi_bus_opr=="2"){
			actionCode="xshh_red";
            postDate()
		}

	}
	//批发退货
	if(type=="21"){
		if(param.pi_bus_opr=="1"){
			actionCode="xsth_gz";
            var getParam=getSaveParam();
            var flag=false;

            for (var int = 0; int <getParam.salesInstrorageNumDraftList.length; int++) {
                if ($.parseFloat(getParam.salesInstrorageNumDraftList[int].price) == 0) {
                    flag = true
                }
            }
            if(flag==true){
                $.zxsaas_plus.showconfirm('提示','单据中存在价格为0的商品，是否确认过账',function () {
                    validateIsSave(getSaveParam(),function () {
                        postDate()
                    })
                },function () {
                    return;
                })
            }else {
                validateIsSave(getSaveParam(), function () {
                    postDate()
                })
            }
		}else if(param.pi_bus_opr=="2"){
			actionCode="xsth_red";
            postDate()
		}

	}
	
	if(type=="22"){
		if(param.pi_bus_opr=="1"){
			actionCode="wtck_gz";
		}else if(param.pi_bus_opr=="2"){
			actionCode="wtck_red";
		}
        postDate()
	}
	
	if(type=="23"){
		if(param.pi_bus_opr=="1"){
			actionCode="wtth_gz";
		}else if(param.pi_bus_opr=="2"){
			actionCode="wtth_red";
		}
        postDate()
	}

	function postDate() {
        $.request({
            url:"../salesCommon/postOrInvalidBills/"+actionCode,
            type : 'POST',
            dataType: "json",
            contentType :'application/json',
            data:JSON.stringify(param),
            success:function(data){
                if(data.result >=1){
                	if ((actionCode == "xsck_gz" || actionCode == "xshh_gz") && data.data.message != "") {
                		$.zxsaas_plus.showalert("提示", '成功!<br>' + data.data.message);
                	}else{
                		$.zxsaas_plus.showalert("success","成功");
                	}
                    queryBillsById(data);
                }else{
                    $.zxsaas_plus.showalert("error",data.desc);
                }
            }
        });
    }

}

function validateIsSave(param,success){
    var addData=JSON.stringify(param);
    //验证是否可以提交数据
    $.ajaxPackage({
        url:'/manager/salesCommon/validateSalesRefundExchangeOrder',
        data:addData,
        contentType :'application/json',
        success(data){
            if (data.result == 1) {
                if(data.data.validateResult=='Confirm'){
                    $.zxsaas_plus.showconfirm("提示",data.data.message,function(){
                        success(addData);
                    },function(){
                    });
                }else if(data.data.validateResult=='Success'){
                    success(addData);
                }else if(data.data.validateResult=='Error'){
                    $.zxsaas_plus.showalert("提示",data.data.message)
                }
            }
        }
    })
}

function queryBillsById(data){
	pageIndex=0;
	isDraft=0;
	var param={};
	param.queryCodeStr="P";
	param.isDraft=0;
	param.id=data.result;
	pageAjax(param);
}
var _authList = {};
function getredTime () {
	
	_authList.menuCode=$('#AUTH').attr('data-code');
	if(_authList.menuCode){
		$.request({
			url:'/manager/inventory/common/getInventoryBillsDate',
			type:'post',
			dataType:'json',
			data:{
				'menuCode':_authList.menuCode
			},
			success:function(data){
				var data= data.data;
				_authList.maxDate=data.maxDate;
				_authList.hasPermissions=data.hasPermissions;
				_authList.minDate=data.minDate;
			}
		})
	}
}



//红冲（强制完成）按钮单击事件
function invalidBtnClick(btnId){
	getredTime()
	var dateStr="";
	if(type=="18"){
		dateStr="完成日期:";
	}else{
		dateStr="红冲日期:";
	}
	var dateInputDIV = $(
			'<div class="form-horizontal"><div class="form-group">' +
			    '<label for="firstname" class="col-sm-5 control-label" >'+dateStr+'</label>' +
			    '<div class="col-sm-7" style="padding-left: 0px;">' +
						'<div class="input-group">' +
					'<input type="text" class="form-control" name="hcDate" readonly>' +
			    '</div></div>' +
		    '</div></div>'		
	)

	var min = CompareDate(_authList.minDate,$('#billsDate').val())?_authList.minDate:$('#billsDate').val()

	var dateInput = dateInputDIV.find("input[name='hcDate']");
	dateInput.val(min);
	
	dateInput.datetimepicker({
		  lang:"ch",           //语言选择中文
	      format:"Y-m-d",      //格式化日期
	      timepicker:false,    //关闭时间选项
	      todayButton:false,    //关闭选择今天按钮
	      maxDate:_authList.maxDate,
		  minDate: min
	});
	if(type=="18"){
		BootstrapDialog.show({
	        title: '单据强制完成',
	        message: dateInputDIV,
	        size:BootstrapDialog.SIZE_MIDDLE,
	        buttons: [{label: '确定', cssClass: 'btn-primary',action: function(dialogItself) {forceFinishedAjax(dateInputDIV);dialogItself.close();}},
	                  {label: '取消',action: function(dialogItself){dialogItself.close();}
	        }]
	    });
	}else{
		BootstrapDialog.show({
	        title: '单据红冲',
	        message: dateInputDIV,
	        size:BootstrapDialog.SIZE_MIDDLE,
	        buttons: [{label: '确定', cssClass: 'btn-primary',action: function(dialogItself) {postBtnClick(btnId);dialogItself.close();}},
	                  {label: '取消',action: function(dialogItself){dialogItself.close();}
	        }]
	    });
	}
}

//获取过账或红冲参数
function getPostOrInvalidParam(btnId){
	var param={};
    param.pi_bills_id=$("#billsHeaderForm input[name='id']").val();
	param.pi_bus_opr=btnId;
	param.type=type;
	param.pi_invalid_date=$("input[name='hcDate']").val();
	var temp="";
	if(type=="18"){
		temp="审核";
	}else{
		temp="过账";
	}
	if(btnId=="1" && param.pi_bills_id==""){
		$.zxsaas_plus.showalert("提示",temp+"单据不存在");
		return true;
	}else if(btnId=="2" && param.pi_bills_id==""){
		$.zxsaas_plus.showalert("提示","红冲单据不存在");
		return true;
	}else{
		return param;
	}
}

//强制完成
function forceFinishedAjax(dateInputDIV){
		var id=$("#billsHeaderForm input[name='id']").val();
		if(id==""){
			$.zxsaas_plus.showalert("提示","强制完成单据不存在");
			return;
		}
		var param={};
		param.id=id;
		param.billsStatus=5;
		param.forceFinishDate=dateInputDIV.find("input[name='hcDate']").val();
		$.request({
			url:"../salesCommon/forceFinished",
			type : 'POST',  
			dataType: "json",
			contentType :'application/json', 
			data:JSON.stringify(param),
			success:function(data){
			  $.zxsaas_plus.showalert("success",data.desc);
			   if(data.result !=-1){
				   $("#gridFooter input[name='forceFinishName']").val(data.data.forceFinishName);
				   queryBillsById(data);
			   }
		    }
		});
}

//确定审核按钮单击事件
function saveCheckDetail(){
	var saleOrderMainId=$("#billsHeaderForm input[name='id']").val();
	var ids=$("#checkDetailGrid").getDataIDs();
	var salesOrderDetailDraft=new Array();
	$.each(ids,function(i,value){
		var rowData=$("#checkDetailGrid").jqGrid("getRowData",value);
		rowData.saleOrderMainId=saleOrderMainId;
		salesOrderDetailDraft.push(rowData);
	});
    var flag=false;
    for (var int = 0; int < salesOrderDetailDraft.length; int++) {
        if ($.parseFloat(salesOrderDetailDraft[int].price) == 0) {
            flag = true
        }
    }
    if(flag==true){
        $.zxsaas_plus.showconfirm('提示','单据中存在价格为0的商品，是否确认审核',function () {
            todo()
        },function () {
            return;
        })
    }else{
        todo()
    }
   function todo(){
	$.request({
		url:"../salesOrder/verifyOrderBills",
		type : 'POST',  
		dataType: "json",
		async:false,
		contentType :'application/json', 
		data:JSON.stringify(salesOrderDetailDraft),
		success:function(data){
		   $("#checkDetailModal").modal("hide");
		   $.zxsaas_plus.showalert("success","审核成功");
		   if(data.result > 0){
			   queryBillsById(data);
		   }else{
               $.zxsaas_plus.showalert("提示",data.desc||"提示");
		   }
	    }
	});
   }
}

//审核按钮单击事件
function verfiy(){
	var id=$("#billsHeaderForm input[name='id']").val();
	if(id==""){
	   $.zxsaas_plus.showalert("提示","审核单据不存在!");
	   return;
	}
	if($("input").data("changed")){
		$.zxsaas_plus.showalert("提示","当前单据未保存，继续操作前请先保存");
		return;
	}
	
	fillCheckDetailModal();
	$("#checkDetailModal").modal("show");
	var winH = $("#checkDetailModal").height();
	var winW = $("#checkDetailModal").width();
	$("#checkDetailGrid").setGridHeight(winH*0.5-40);
	$("#checkDetailGrid").setGridWidth(winW*0.58);
	$("#checkDetailGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });
	setTimeout(function(){
        $("#checkDetailGrid").resize()
	},150)
}

function fillCheckDetailModal(){
	$("#checkDetailGrid").jqGrid('clearGridData');
	var ids=$("#dataGrid").getDataIDs();
	$.each(ids,function(i,value){
		var rowData=$("#dataGrid").jqGrid("getRowData",value);
		rowData.reviewsNum=rowData.goodsNumber;
		rowData.reviewsAmount=rowData.amount;
		$("#checkDetailGrid").jqGrid('addRowData', i+1,rowData, 'last' );
	});
}

//初始化表格
function initCheckDetailModal(){
	var colNames =['商品名称', '数量','<i class="bitianX">*</i>审批量','单价','总金额','审批金额','商品备注','商品ID','ID'];
	var JqGridColModel=[
			 {name : 'goodsName',sortable: false,index : 'goodsName',align:'center',editable:false}, 
             {name : 'goodsNumber',index : 'goodsNumber',align:'left',editable:false,sortable: false,formatter:'integer'},
             {name : 'reviewsNum',index : 'reviewsNum',align:'left',editable:true,sortable: false,formatter:'integer',editoptions:{
             	readonly:false,onblur:"reviewsNumOnBlur()",onkeyup:"checkInput.checkNumPure(this,12)",
                 dataEvents: [{
                     type: "focus",
                     fn: function(){
                         this.select()
                     }
                 }]
             	}
             },
             {name : 'price',index : 'price',align:'left',editable:false,editrules:{number:true},formatter:'number',sortable: false},
             {name : 'amount',index : 'amount',align:'left',editable:false,editrules:{number:true},formatter:'number',sortable: false},
             {name : 'reviewsAmount',index : 'reviewsAmount',editable:false,editrules:{number:true},formatter:'number',sortable: false,  editoptions:{
                 dataEvents: [{
                     type: "focus",
                     fn: function(){
                         this.select()
                     }
                 }]
             }},
             {name : 'remark',index : 'remark',hidden: false,editable:false,sortable: false},
             {name : 'goodsId',index : 'goodsId',editable:true,sortable: false,hidden: true},
             {name : 'id',index : 'id',editable:true,sortable: false,hidden: true,key:true}
	     ];
	loadtable();
	function loadtable(){
			$("#checkDetailGrid").jqGrid({
				colNames:colNames,          
	            colModel:JqGridColModel,
	            sortable:false,	
	            cellsubmit: 'clientArray',//单元格保存内容的位置		
	            editurl: 'clientArray',
	            cellEdit:true,
	            rownumbers:true,
	            styleUI: 'Bootstrap',
				autowidth:true,
				rownumWidth:50,
				footerrow:true,  //设置表格显示表脚
				userDataOnFooter:true,//设置userData 显示在footer里
				shrinkToFit:true,
				afterEditCell:function(rowid,name,val,iRow,iCol){
				   lastrow = iRow;
			       lastcell = iCol;
		        },
				gridComplete:function(data){
				  $("#checkDetailModal tr:last").find("td").eq(0).text("合计");
				  summaryCheckDetail("#checkDetailGrid");
				}
			})
			jQuery("#checkDetailGrid").jqGrid('setLabel',0, '序号');
	}
}

function reviewsNumOnBlur(){
	$("#checkDetailGrid").jqGrid("saveCell",lastrow,lastcell);
	
	summaryCheckDetail("#checkDetailGrid");
}

//汇总统计
function summaryCheckDetail(gridId){
	//汇总每一行
	var ids=$(gridId).getDataIDs();
    $.each(ids,function(i,value){
    	var currRow = $(gridId).jqGrid('getRowData', value);
    	$(gridId).jqGrid('setCell', value ,"amount" ,currRow.price * currRow.goodsNumber);
    	$(gridId).jqGrid('setCell', value ,"reviewsAmount" ,currRow.price * currRow.reviewsNum);
    });
    checkDetailGridFootData(gridId);
}

//页脚统计
function checkDetailGridFootData(gridId){
	var goodsNumber = $(gridId).getCol('goodsNumber',false,'sum');
	var reviewsNum = $(gridId).getCol('reviewsNum',false,'sum');
	var amount = $(gridId).getCol('amount',false,'sum');
	var reviewsAmount = $(gridId).getCol('reviewsAmount',false,'sum');
	$(gridId).jqGrid('footerData','set',{
        "goodsNumber": goodsNumber,
        "reviewsNum": reviewsNum,
        "amount": amount,
        "reviewsAmount": reviewsAmount,
        }
	);
}


//禁用或启用导航菜单按钮
function enableOrDisableNavBtn(){
	if(isDraft=="0"){//正式单据（不允许删除，只能红冲）
		$(".btnHundred .delete").attr("disabled","disabled");
		$(".btnHundred .post").attr("disabled","disabled");
		$(".btnHundred .invalid").removeAttr("disabled");
		$(".btnHundred .copy").removeAttr("disabled");
	}else if(isDraft=="1"){//草稿单据（草稿单据，允许删除，只能过账）
		$(".btnHundred .delete").removeAttr("disabled");
		$(".btnHundred .post").removeAttr("disabled");
		$(".btnHundred .invalid").attr("disabled","disabled");
		$(".btnHundred .copy").attr("disabled","disabled");
	}
}