var isDraft=1;
var adjustType="";
var invalidFlag=0;
var type=$("#payreceiptType").val();
var caption="";
var total=1;//总记录数
var pageIndex=0;
var jqGrid_SubjectBalance
if(type==18){
    caption="付款明细";
}else if(type==19){
    caption="收款明细";
}
//付款单、收款单
$(function(){
    initMenuBtn()
	paymentGrid();
	cancleGrid();
	initTime();
	contactunitGrid();
	managerGrid();
	getPosition();
    getAuthList(initDealDate);
    /*是否是：跳转单据*/
    var billsId = $.trim(functionObjExtent.getQueryString('billsId'))
    if(billsId!=''){
        var billsCode = $.trim(functionObjExtent.getQueryString('billsCode'))
        var copyFlag = $.trim(functionObjExtent.getQueryString('copyFlag'))
        //单据编号
        if(billsCode!=""&& billsCode!=null && billsCode!=undefined){
            isDraft=0;
            var param={};
            param.billsCode=billsCode;
            param.id=billsId;
            param.type=type;
            param.ifReportCheck="true";
            pageAjax(param,function () {
                //复制一单
                if(copyFlag==1){
                    copy();
                }
            })
        }else{
            isDraft=1;
            pageAjax({'id':billsId,'type':type})
        }
    }else{
        //新增
        $(".invalid").attr("disabled","disabled");
        getDefaultSectionAccount();
    }
    $('.retailDetailTable div').css('width','auto');
});
//载入菜单组件
function initMenuBtn() {
    var option = {
        btnGroupLeft: {
            add: {
                isShow: true,
                click: function () {
                    location.href =location.href.substring(0,location.href.indexOf('?'));
                }
            },
            draftSave: {
                isShow: true,
                click: function () {
                    save()
                }
            },
            draftDel: {
                isShow: true,
                click: function () {
                    delDraftBill()
                }
            },
            draftPost: {
                isShow: true,
                click: function () {
                    post()
                }
			},
                print: {
                    click: function () {
                        print(type)
                    }
                },
                red: {
                    click: function () {
                        invalid();
                    }
                },
                copy: {
                    click: function () {
                        copy();
                    }
                },
                audit: {
                    isShow: false,
                    click: function () {
                        var params = $("#billsHeaderForm").toJsonObject();
                        var mainIds = $.trim(params.id)
                        var billsStatus = $.trim(params.billsStatus)
                        var isAudit = $.trim(params.isAudit)
                        if (billsStatus != '1' && mainIds != "" && isAudit == 0) {
                            $.ajaxPackage({
                                url: '/manager/inventory/fund/updateAuditStatus',
                                data: {billsType: type, billsId: mainIds, 'auditStatus': 1},
                                success: function (data) {
                                    isDraft = 0;
                                    pageAjax({'id': mainIds});
                                    $.zxsaas_plus.showalert('success', data.desc || "稽核成功");
                                }
                            })
                        } else {
                            $.zxsaas_plus.showalert('提示', '只能对正式且未稽核单据稽核!');
                        }
                    }
                },
                auditCancle: {
                    isShow: false,
                    click: function () {
                        var params = $("#billsHeaderForm").toJsonObject();
                        var mainIds = $.trim(params.id)
                        var billsStatus = $.trim(params.billsStatus)
                        var isAudit = $.trim(params.auditStatus)
                        if (billsStatus != '1' && mainIds != "" && isAudit == 1) {
                            $.ajaxPackage({
                                url: '/manager/inventory/fund/updateAuditStatus',
                                data: {billsType: type, billsId: mainIds, 'auditStatus': 0},
                                success: function (data) {
                                    isDraft = 0;
                                    pageAjax({'id': mainIds});
                                    $.zxsaas_plus.showalert('success', data.desc || "取消稽核成功");
                                }
                            })
                        } else {
                            $.zxsaas_plus.showalert('提示', '只能对已稽核单据取消稽核!');
                        }
                    }
                },
                update: {
                    click: function () {
                        $(options.TableName).jqGrid("saveCell", lastrow, lastcell);
                        var $searchFormID = $("#billsHeaderForm");
                        var detailList = [];
                        var ids = $(options.TableName).getDataIDs();
                        $.each(ids, function (i, value) {
                            var row = $(options.TableName).jqGrid('getRowData', value);
                            detailList.push({
                                id: row["id"],
                                remark: row["remark"]
                            });
                        });
                        var id= $searchFormID.find("input[name='id']").val();
                        var obj = {
                        	url:'/manager/inventory/fund/updateRemark',
                            data:JSON.stringify({
                                billsId:id,
                                billsType:type,
                                remark: $searchFormID.find("input[name='remark']").val(),
                                detailList: detailList
                            }),
                            contentType:"application/json",
                            success: function (data) {
                                isDraft = 0;
                                pageAjax({
                                    id:id
                                });
                                $.zxsaas_plus.showalert('success', data.desc || "修改备注成功");
                            }
                        };
                        $.ajaxPackage(obj)
                    }
                },
       },
        btnGroupRight: {
            history: {
                isShow: true,
                click: function () {
                    if(type==18){
                        window.parent.openWorkBoxByMenutext("付款单单据列表",  '/manager/inventory/fund/historyMain?billsType='+type,false);
                    }else if(type==19){
                        window.parent.openWorkBoxByMenutext("收款单单据列表", '/manager/inventory/fund/historyMain?billsType='+type,false);
                    }

                }
            }
        }
    }
    menuBtn = new componentMenuBtn("#MenuTool", option);
}
function reloadMenuBtn() {
    var updateKey=['print','red','copy','update','next','end','audit','auditCancle'];
    var addkey=['draftPost','draftDel','draftSave'];
    var params = $("#billsHeaderForm").toJsonObject();
    var billsStatus=  $.trim(params.billsStatus)
    var isAudit=  $.trim(params.auditStatus)
    $.pageDetailCommon.reloadMenuTool({
        isDraftOp:isDraft,
        isAudit:isAudit,
        billsStatus:billsStatus,
        menuBtn:menuBtn,
        billsCode:params.billsCode,
        updateKey:updateKey,
        addkey:addkey,
    })
    //判断是否禁用
    if(isDraft == false){
        //单据：稽核状态
        if(isAudit==1){
            $('#auditImg').attr('src', '/manager/images/audit.png');
        }else{
            $('#auditImg').attr('src', '/manager/images/auditNo.png');
        }
    }else{
        $('#auditImg').attr('src','')
    }
}

//核销折扣值校验
$("#hxDiscount").bind("input propertychange",function(){
	calHasnotAmount();
});

$("#hxDiscount").keyup(function(){
	clearNoNum(event,this);
	calHasnotAmount();
});
//输入框得到焦点时
$("#hxDiscount").on('focus',function(){
    this.select()
})
$("#hxDiscount").blur(function(){
	verifyNum(this);
	calHasnotAmount();
});


var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl:"../../funds/payment/selectPaymentList/"+type,
		FilterPaymentUrl:"../../funds/payment/filterPayment/"+type,
		FindAccountNameURL:"../../funds/payment/findAccountName/"+type,
		SavePaymentUrl:"../../funds/payment/savePayment/"+type,//保存并过账url
		HxEditSearchUrl:"../../funds/payment/hxEditSearch/"+type,
		KeyHxUrl:"../../funds/payment/keyHx/"+type,
		TableName: "#jqGrid_SubjectBalance", //显示表格名称。遵照css选择器书写
		iconJsonUrl:"../json/icon.json",
		btnbox: ".btnbox "
 };


//首单
function firstPage(){
	var param=getSelectPageParam();
	param.queryCodeStr="F";
	pageAjax(param);
}

//上一单按钮单击事件
function backPage(){
	var param=getSelectPageParam();
	param.queryCodeStr="P";
	param.refBillsDate=$("#billsHeaderForm input[name='billsDate']").val();
	param.refBillsId=$("#billsHeaderForm input[name='id']").val();
	param.billsCode = ''
	pageAjax(param);
}

//下一单按钮单击事件
function nextPage(){
	var param=getSelectPageParam();
	param.queryCodeStr="N";
	param.refBillsDate=$("#billsHeaderForm input[name='billsDate']").val();
	param.refBillsId=$("#billsHeaderForm input[name='id']").val();
	param.billsCode = ''
	if(param.refBillsId==""){
		 $.zxsaas_plus.showalert("提示","没有下一单单据");
		 return;
	}
	pageAjax(param);
}

//末单按钮单击事件
function lastPage(){
	var param=getSelectPageParam();
	param.queryCodeStr="L";
	pageAjax(param);
}


//填充付款单表头（主信息数据）
function fillTopData(data){
	total=data.total;
	pageIndex=data.pageIndex;
	var billsHeader=data.rows;
	enableOrDisableHxFunction(billsHeader.summary);
	if(billsHeader.isPost=="1"){
		$('.rightMap img').attr('src','../../images/guozhang.png');
		if(billsHeader.summary !=1){
			$(".btnHundred .invalid").removeAttr("disabled");
		}
	}else if(billsHeader.isPost=="2"){
		$('.rightMap img').attr('src','../../images/status/statusRed.png');
		$(".btnHundred .invalid").attr("disabled","disabled");
	}else{
		$('.rightMap img').removeAttr("src");
	}
	billsHeader.billsDate = $.DateFormatFromTimestamp("yyyy-MM-dd",billsHeader.billsDate);
	if(billsHeader.billsDate=="1970-01-01"){
		billsHeader.billsDate="";
	}
    $("#billsHeaderForm").writeJson2Dom(billsHeader);

    getBankByContactunitId(billsHeader.contactsunitId)

    $("#bottomForm").writeJson2Dom(billsHeader);

    //核销折扣
	if(billsHeader!=undefined){
		$("#hxDiscount").val($.formatFloat(billsHeader.saleDiscount,2));
	}
	 footerData();
	//单据总金额
	$("#amount").val($.formatFloat(Number($(options.TableName).getCol('amount',false,'sum')),2));
	//核销金额
	$("#nowAmount").val($.formatFloat(Number($("#jqGrid_payment").getCol('amount',false,'sum')),2));
	calHasnotAmount()
    reloadMenuBtn()
}


//过滤按钮单击事件
var filter=false;
function filterModalBtnClick(){
	filter=true;
	//reset();
	$("#filterSearchForm input[name='remark']").removeAttr("readonly");
	$("#filterModel").modal("show");
}

//过滤查询
function searchPayment(){
	$("#filterModel").modal("hide");
	pageIndex=0;
    var param=comGetFilterParam();
	pageAjax(param);
}



//分页查询付款明细参数
function getSelectPageParam(){
    var param=comGetFilterParam();
	param.id="";
	param.billsCode='';
	return param;
}

//上一单，下一单,首单，末单分页查询ajax请求
function pageAjax(param,callbackObj){
	var actionCode="";
	if(type==18){
		actionCode="fk_query";
	}else if(type==19){
		actionCode="sh_query";
	}
    var locaParam={
        isDraft:isDraft
    }
    var exParam=$.extend(false,locaParam,param);
	$.request({
		url:"../../funds/payment/selectPaymentPage/"+type+"/"+pageIndex+"/"+actionCode,
		type : 'POST',
		dataType: "json",
		contentType :'application/json',
		data:JSON.stringify(exParam),
		success:function(data){
		  if(data.result==1){
			  if(data.data.rows.id !=null){
				  $("#copy").removeAttr("disabled");
				  jQuery("#jqGrid_SubjectBalance").jqGrid("clearGridData");
				  $("#hxDiscount").attr("disabled",true);
				  fillHxDetail(data.data.orderVoList);
				  var accountList=data.data.rows.payReceiptDetailList;
				  if(accountList.length>0){
					  for(var i=0;i<accountList.length;i++){
						  $("#jqGrid_SubjectBalance").jqGrid('addRowData', i+1,accountList[i], 'last' );
					  }
					  footerData();
				  }
				//填充表格数据
				fillTopData(data.data);
                  if(isDraft){
                      allowEdit()
                  }else{
                      forbiddenEdit();
                  }
				if(data.data.rows.isPost==2&&(data.data.rows.billsPrefixCode=="SKD"||data.data.rows.billsPrefixCode=="FKD")){
					  $("#fkdSave").attr("disabled",true)
					  $("#hxEditBtn").attr("disabled",true)
					  $("#fkdCancel").attr("disabled",true)
				  }
                  if (callbackObj) {
                      callbackObj(data.data);
                  }
			  }else{
				  $.zxsaas_plus.showalert("提示","没有查询到单据!");
			  }
		  }else{
			  $.zxsaas_plus.showalert("错误",data.desc);
		  }
	    }
	});
}

//填充核销明细数据
function fillHxDetail(hxList){
	jQuery("#jqGrid_payment").jqGrid("clearGridData");
	if(hxList!=undefined && hxList.length>0){
		 for(var i=0;i<hxList.length;i++){
			  $("#jqGrid_payment").jqGrid('addRowData', i+1,hxList[i], 'last' );
		  }
	}
}

//重置
function reset(){
	$("#filterSearchForm")[0].reset();
	initTime();
}

//页脚合计
function footerData(){
	var payreceiptAmout = $(options.TableName).getCol('payreceiptAmout',false,'sum');
	$(options.TableName).jqGrid('footerData','set',{
        "payreceiptAmout": payreceiptAmout,
        }
	);
	$("#amount").val($.formatFloat(payreceiptAmout,2));
	calHasnotAmount();
}

//保存
function save() {
    var params=getSaveParams()
    if(checkSaveParams(params)==true){
        return
    }

    var actionCode="";
    if(type==18){
        actionCode="fk_save";
    }else if(type==19){
        actionCode="sk_save";
    }
    $.ajaxPackage({
        contentType:'application/json',
        url:"/manager/funds/payment/savePayment/"+actionCode,
        data:JSON.stringify(params),
        success:function(data){
            $.zxsaas_plus.showalert('success',data.desc || "保存成功！");
            var id=data.data.billsId;
            isDraft=1;
            pageAjax({'id':id})
        }
    })
}
//过账
function post() {

    var actionCode="";
    if(type==18){
        actionCode="fk_post";
    }else if(type==19){
        actionCode="sh_post";
    }
    var params = $("#billsHeaderForm").toJsonObject();
    var billsId= $.trim(params.id)
    if(params.billsCode!=""){
        $.zxsaas_plus.showalert('提示','只能过账草稿单!');
    }else{
        $.ajaxPackage({
            url:'/manager/funds/payment/excutePost/'+actionCode,
            data:{billsId:billsId,type:type},
            success:function(data){
                $.zxsaas_plus.showalert('success',data.desc || "过账成功");
                isDraft=0;
                pageAjax({'id':data.data.billsId})
            }
        })
    }
}

//校验保存参数
function checkSaveParams(params){
	var flag=false;
	if($("#billsCode").val() != ""){
		$.zxsaas_plus.showalert("提示","该单据已保存!");
		flag=true;
		return flag;
	}

    var accountName = $(options.TableName).getCol('accountName');
    for(var i=0;i<accountName.length;i++){
        if($.trim(accountName[i]) == "" ){
            $.zxsaas_plus.showalert("提示","请选择资金账户!");
            flag=true;
            return flag;
        }
    }

	if(params.amount==0 && params.saleDiscount=="0.00"){
		$.zxsaas_plus.showalert("提示","单据总金额和核销折扣不能同时为0!");
		flag=true;
		return flag;
	}
}

var lastrow="";
var lastcell="";
//获取保存参数
function getSaveParams(){
	$(options.TableName).jqGrid("saveCell",lastrow,lastcell);
	$(options.TableName).jqGrid("restoreCell",lastrow,lastcell);
	var params={};
	params=$("#billsHeaderForm").toJsonObject();
	//主表
	params.type=type;
	params.refMainTable="I_PAYRECEIPT_MAIN_DRAFT";
	if(type=="10" || type=="11"){
		params.inpayClassId=$("#inpayClassId").val();
	}

	//资金系数（1收款，-1付款）
	if(type=="18"){//付款
		params.ratio=-1;
	}else if(type=="19"){//收款
		params.ratio=1;
	}
	params.amount=$(options.TableName).getCol('payreceiptAmout',false,'sum');
	params.saleDiscount=$("#hxDiscount").val();
	delete params.brankAmount;
	delete params.brankName;
	delete params.customer;
	delete params.contactUnitName;
	delete params.sectionName;
	delete params.managerUname;
	delete params.receivableAmount;
	delete params.planReceAmount;
	delete params.auditStatus;
	delete params.billsStatus;
	//明细数据
	var detailDraftList =new Array();
	var ids=$(options.TableName).getDataIDs();
	$.each(ids, function (i, value) {
		var row = $(options.TableName).jqGrid('getRowData', value );
		if(row.payreceiptAmout!="0.00"){
			delete row["id"];
			delete row["accountTypeName"];
			delete row["accountName"];
			delete row["op"];
	        detailDraftList.push(row);
		}
	  });
	params.detailDraftList=detailDraftList;
	return params;
}



//核销grid
var lastSel="";
function cancleGrid(){
   var options = {
          LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
          TableName: "#jqGrid_payment", //显示表格名称。遵照css选择器书写
          iconJsonUrl:"../json/icon.json",
          btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写
     };

  $.jgrid.defaults.width = 1280;
  $.jgrid.defaults.responsive = true;
  $.jgrid.defaults.styleUI = 'Bootstrap';
  var lastsel='';//最后一次选中的行
  var mydata;
  var hid=false;
  var lock=false;
  var colNames = ['账务主表id(被核销)','账务主表id(用于核销)','往来单位id','单据日期','单据类型','单据编号','单据部门','单据金额','已核销金额','本单核销金额','未核销金额','备注'];
  var JqGridColModel=[

                    {name:'refAccountMainId',index:'refAccountMainId', width:100,align:'center', sorttype:'string',sortable:false,hidden:true},
                    {name:'accountMainId',index:'accountMainId', width:200,align:'center', sorttype:'string',sortable:false,hidden:true},
                    {name:'contactsUnitId',index:'contactsUnitId', width:200,align:'center', sorttype:'string',hidden:true,},
					{name:'billsDateStr',index:'billsDateStr', width:200,align:'center', sorttype:'string',},
					{name:'billsTypeName',index:'billsTypeName', width:200,align:'center', sorttype:'string',},
					{name:'billsCode',index:'billsCode', width:250,align:'center', sorttype:'string',},
					{name:'sectionName',index:'sectionName', width:200,align:'center', sorttype:'string',},
					{name:'billsAmount',index:'billsAmount', width:100,align:'center',  sorttype:'string',formatter:"number",},
					{name:'hasHxAmount',index:'hasHxAmount', width:200,align:'center', sorttype:'string',formatter:"number",},
					{name:'curHxAmount',index:'curHxAmount', width:100,align:'center', sorttype:'Long',formatter:"number",editable:true,
                        editoptions:{
					        readonly:false,
                            onkeyup:"hxAmountChange(this)",
                            onblur:"cellOnBlurs(this)",
                            dataEvents: [{
                                type: "focus",
                                fn: function(){
                                    this.select()
                                }
                            }
                            ]},},
					{name:'remainingHxAmount',index:'remainingHxAmount', width:100,align:'center', sorttype:'string',formatter:"number",sortable:false},
					{name:'remark',index:'remark',align:'center', width:300, sorttype:'string',editable:true,editoptions:{readonly:false,onblur:"cellOnBlur()",onkeyup:"checkInput.clearNoText(this,100)"},},
                ];
loadtable();
function loadtable(){
		$(options.TableName).jqGrid({
			mtype:"GET",
			datatype: "local",
			jsonReader  : {	root: "data.hxDeatilList",repeatitems: false},
			colNames:colNames,
            colModel:JqGridColModel,
            sortable:true,
            rownumbers:true,
            cellsubmit: 'clientArray',//单元格保存内容的位置
            editurl: 'clientArray',
            caption:'核销明细',
           	cellEdit:true,
            width: "90%" ,
			autowidth:true,
			rownumWidth: 40, // the width of the row numbers columns
			shrinkToFit:false,
			footerrow:true,  //设置表格显示表脚
			userDataOnFooter:true,//设置userData 显示在footer里
			beforeEditCell:function(rowid,cellname,v,iRow,iCol){
				hxFooterData();
				lastrow = iRow;
				lastcell = iCol;
				hxFooterData();
			},
			afterSaveCell:function(rowid,name,val,iRow,iCol){//保存编辑
				lastrow = iRow;
				lastcell = iCol;
	        },
			beforeSelectRow:function(id){
				hxFooterData();
				$(document).delegate('#' + id + '_curHxAmount', "contextmenu", function(e){
					return false;
				});
	        },
			loadComplete:function(data){
				hxFooterData();
			},
			gridComplete:function(data){
				$("#gbox_jqGrid_payment tr:last").find("td").eq(0).text("合计");
				hxFooterData();
			}
		})
	 jQuery(options.TableName).jqGrid('setLabel',0, '序号');
}
}

//核销保存
function hxSave(){
	if($("#billsCode").val()==""){
		$.zxsaas_plus.showalert("提示","该单据未过账,没有核销明细!");
		return;
	}
	//校验未核销金额不能小于0
	var remainingHxAmount=$("#hasnotAmount").val().replace(",","");
	if(remainingHxAmount<0){
		$.zxsaas_plus.showalert("提示","未核销金额不能小于0,请重新输入本单核销金额!");
		return;
	}

	var ids = $("#jqGrid_payment").jqGrid('getDataIDs');
	var array=new Array();
	if(ids.length>0){
		$.each(ids,function(i,value){
			var param={};
			var rowData = $('#jqGrid_payment').jqGrid('getRowData',value);
			if(rowData.curHxAmount !="0.00"){
				param.batchId=-1;
				// param.detailId=rowData.detailId;
				param.mainId=rowData.accountMainId;
				param.zwMainId=rowData.refAccountMainId;
				param.hxAmount=Number(rowData.curHxAmount);
				param.hasnotAmount=rowData.remainingHxAmount.replace(/\,/g, "");
				param.remark=rowData.remark;
				param.resBillsCode=rowData.billsCode;
				param.contactsunitId=rowData.contactsUnitId;
				array.push(param);
			}else{
				//清空本单核销金额为0的数据
			   $("#jqGrid_payment").jqGrid("delRowData", value);
			}
		});
	}else{
		$.zxsaas_plus.showalert("提示","没有核销明细!");
		return;
	}

	//清空核销明细表数据条件
	var billsCode=$("#billsCode").val();
	var contactsunitId=$("#contactsunitId").val();

	var actionCode="";
	if(type==18){
		actionCode="fk_hx";
	}else if(type==19){
		actionCode="sh_hx";
	}

	$.request({
		url:"../../funds/payment/saveHxDeatil/"+type+"/"+billsCode+"/"+contactsunitId+"/"+actionCode,
		type : 'POST',
		dataType: "json",
		contentType :'application/json',
		data:JSON.stringify(array),
		success:function(data){
		  if(data.result==1){
			  $.zxsaas_plus.showalert("提示",data.desc);
			  $("#jqGrid_payment").setGridParam({cellEdit:false});
		  }else{
			  $.zxsaas_plus.showalert("错误",data.desc);
		  }
	    }
	});
}

//核销编辑
function hxEdit(){
	$("#jqGrid_payment").setGridParam({cellEdit:true});
	var param=getHxEditParam();
	if(param==true){
		return;
	}
	var billsCode=$("#billsHeaderForm input[name='billsCode']").val();
	var contactsunitId=$("#billsHeaderForm input[name='contactsunitId']").val();
	var actionCode="";
	if(type==18){
		actionCode="FKD";
	}else if(type==19){
		actionCode="SKD";
	}
	var hxEditUrl="/manager/inventory/fund/common/verification/getVerificationOrderVoList";
	$.request({
		url:hxEditUrl,
		type : 'Get',
		dataType: "json",
		contentType :'application/json',
		data:{"billsCode":billsCode,"contactUnitId":contactsunitId,adjustTypeCode:actionCode},
		success:function(data){
		  if(data.result==1){
			  fillHxDetail(data.data.orderVoList)
			  $("#nowAmount").val($.formatFloat($("#jqGrid_payment").getCol('curHxAmount',false,'sum'),2));
			  calHasnotAmount();
		  }else{
			  $.zxsaas_plus.showalert("错误",data.desc);
		  }
	    }
	});
}

//获取核销编辑查询参数
function getHxEditParam(){
	//校验编辑参数
	if($("#billsCode").val()==""){
		$.zxsaas_plus.showalert("提示","该单据未过账,没有核销明细!");
		return true;
	}
	//校验未核销金额不能小于0
	var remainingHxAmount=$("#hasnotAmount").val();
	if(remainingHxAmount<0){
		$.zxsaas_plus.showalert("提示","未核销金额不能小于0,请重新输入本单核销金额!");
		return true;
	}
}


//核销折扣改变事件
$("#hxDiscount").bind('input propertychange', function() {
	calHasnotAmount();
});

//一键核销
function keyCancle(){
	if($("#billsCode").val()==""){
		$.zxsaas_plus.showalert("提示","该单据未过账,没有核销明细!");
		return;
	}

	//校验未核销金额不能小于0
	var remainingHxAmount=$("#hasnotAmount").val().replace(/\,/g, "");
	if(remainingHxAmount<=0){
		$.zxsaas_plus.showalert("提示","未核销金额必须大于0才能一键核销!");
		return;
	}

	var ids = $("#jqGrid_payment").jqGrid('getDataIDs');
	if(ids.length==0){
		 $.zxsaas_plus.showalert("提示","没有核销明细");
		 return;
	}
	//可以核销的总金额（控制未核销金额不能小于0）
	var totalAmount=Number($("#amount").val().replace(/\,/g, ""))+Number($("#hxDiscount").val().replace(/\,/g, ""))-Number($("#nowAmount").val().replace(/\,/g, ""));

	$.each(ids,function(i,value){
		var rowData = $('#jqGrid_payment').jqGrid('getRowData',value);
		var curHxAmount=Number(rowData.curHxAmount);
		var remainingHxAmount=Number(rowData.remainingHxAmount);
		if(totalAmount>0 && totalAmount>=rowData.remainingHxAmount){
			$("#jqGrid_payment").jqGrid('setCell',value,"remainingHxAmount",0);
			$("#jqGrid_payment").jqGrid('setCell',value,"curHxAmount",curHxAmount+remainingHxAmount);
			totalAmount=totalAmount-rowData.remainingHxAmount;
		}else if(totalAmount>0 && totalAmount<rowData.remainingHxAmount){
			$("#jqGrid_payment").jqGrid('setCell',value,"remainingHxAmount",Number(rowData.remainingHxAmount)-totalAmount);
			$("#jqGrid_payment").jqGrid('setCell',value,"curHxAmount",curHxAmount+totalAmount);
			totalAmount=0;
		}
		hxCal();
	});

	//清空本单核销金额为0的数据
	if(ids.length>0){
		$.each(ids,function(i,value){
			var rowData = $('#jqGrid_payment').jqGrid('getRowData',value);
			if(rowData.curHxAmount=="0.00"){
			   $("#jqGrid_payment").jqGrid("delRowData", value);
			}
		});
	}

	calHasnotAmount();
}


//一键核销页脚计算
function hxCal(){
	var billsAmount = $("#jqGrid_payment").getCol('billsAmount',false,'sum');
	var hasHxAmount = $("#jqGrid_payment").getCol('hasHxAmount',false,'sum');
	var curHxAmount = $("#jqGrid_payment").getCol('curHxAmount',false,'sum');
	//核销金额
	$("#nowAmount").val($.formatFloat(curHxAmount,2));
	var remainingHxAmount = $("#jqGrid_payment").getCol('remainingHxAmount',false,'sum');
	$("#jqGrid_payment").jqGrid('footerData','set',{
        "billsAmount": billsAmount,
        "hasHxAmount": hasHxAmount,
        "curHxAmount": curHxAmount,
        "remainingHxAmount": remainingHxAmount,
       }
	);
}

//收付款明细表格金额、核销明细表格本单核销金额文本框退出编辑或失去焦点事件
function cellOnBlurs(obj){
	var cellName=obj.id.split("_")[1];

	if(cellName=="payreceiptAmout"){
		if(isNaN(obj.value)){
			var id = $(options.TableName).jqGrid('getGridParam','selrow');
			$(options.TableName).jqGrid('setCell',id,cellName,"0.00");
			footerData();
			calHasnotAmount();
			$.zxsaas_plus.showalert("提示","请输入数字或保留两位小数!");
		}
		$(options.TableName).jqGrid("saveCell",lastrow,lastcell);
		footerData();
		calHasnotAmount();
	}

	if(cellName=="curHxAmount"){
		if(isNaN(obj.value)){
			var id=obj.id.split("_")[0];
			$("#jqGrid_payment").jqGrid('setCell',id,cellName,"0.00");
		}
		$("#jqGrid_payment").jqGrid("saveCell",lastrow,lastcell);
		hxFooterData();
		calHasnotAmount();
	}
}


//改变未核销金额
function changeHasnotAmount(id,tableId){
		var billsAmount=$(tableId).getCell(id,"billsAmount");//金额
		var hasHxAmount=$(tableId).getCell(id,"hasHxAmount");//已核销金额
		var curHxAmount=$("#"+id+"_curHxAmount").val();//本单核销金额
    remainingHxAmount=Number(billsAmount)-Number(hasHxAmount)-Number(curHxAmount);
		if(Number(remainingHxAmount)<0){
			$.zxsaas_plus.showalert("提示","未核销金额不能小于0!");
			$(tableId).jqGrid('setCell',id,"remainingHxAmount","0.00");
			//本单核销金额==金额-已核销金额
			$(tableId).jqGrid('setCell',id,"curHxAmount",Number($(tableId).getCell(id,"billsAmount"))-Number($(tableId).getCell(id,"hasHxAmount")));
			hxFooterData();
		}else{
			$(tableId).jqGrid('setCell',id,"remainingHxAmount",remainingHxAmount);

			var sumHxAmount=$("#jqGrid_payment").getCol('curHxAmount',false,'sum');
			if(curHxAmount!="" && curHxAmount!=undefined){
				sumHxAmount=parseFloat(sumHxAmount)+parseFloat(curHxAmount.replace(/\,/g, ""));
				$(tableId).jqGrid('footerData','set',{
			        "curHxAmount":sumHxAmount,
			        "remainingHxAmount":$("#jqGrid_payment").getCol('remainingHxAmount',false,'sum'),
			       }
				);
			}
		}

		calHasnotAmount();
}

//计算未核销金额
function calHasnotAmount(){
	$("#amount").val($.formatFloat(Number($(options.TableName).getCol('payreceiptAmout',false,'sum')),2));
	$("#nowAmount").val($.formatFloat(Number($("#jqGrid_payment").getCol('curHxAmount',false,'sum')),2));
	var remainingHxAmount=Number($("#amount").val().replace(",",""))+Number($("#hxDiscount").val().replace(",",""))-Number($("#nowAmount").val().replace(",",""));
	$("#hasnotAmount").val($.formatFloat(remainingHxAmount,2));
}

//核销底部合计
function hxFooterData(){
	var billsAmount = $("#jqGrid_payment").getCol('billsAmount',false,'sum');
	var hasHxAmount = $("#jqGrid_payment").getCol('hasHxAmount',false,'sum');
	var curHxAmount = $("#jqGrid_payment").getCol('curHxAmount',false,'sum');
	var remainingHxAmount = $("#jqGrid_payment").getCol('remainingHxAmount',false,'sum');
	$("#jqGrid_payment").jqGrid('footerData','set',{
        "billsAmount": billsAmount,
        "hasHxAmount": hasHxAmount,
        "curHxAmount": curHxAmount,
        "remainingHxAmount": remainingHxAmount,
       }
	);
	//核销金额
	$("#nowAmount").val($.formatFloat(curHxAmount,2));
	calHasnotAmount();
}



//复制按钮单击事件(有单据编号才让复制，复制一模一样的数据，单据编号清空，无单据编号不让复制)
function copy(){
	$("#billsCode").val("");
	isDraft=1;
	$("#copy").attr("disabled",true);
	$("#jqGrid_payment").jqGrid('clearGridData');
	allowEdit();
	$('.rightMap img').removeAttr("src");
    reloadMenuBtn()
    $('#bottomForm')[0].reset()
    $("#billsHeaderForm input[name='id']").val('')
}

function cellOnBlur(){
	$(options.TableName).jqGrid("saveCell",lastrow,lastcell);
	$("#jqGrid_payment").jqGrid("saveCell",lastrow,lastcell);
}

//禁止页面编辑,禁用选择按钮
function forbiddenEdit(){
    $(options.TableName).setColProp('accountName', {editable: false});
   $("#jqGrid_SubjectBalance").setColProp("payreceiptAmout", {editable: false})
    $("#jqGrid_SubjectBalance").setGridParam().hideCol("op");
    $("#jqGrid_payment").setGridParam({cellEdit:false});
	$("#billsHeaderForm input[name='billsDate']").prop("disabled",true);
	$("#billsHeaderForm :button").hide();
}

//允许页面编辑，允许选择按钮
function allowEdit(){
    $("#jqGrid_SubjectBalance").setColProp("payreceiptAmout", {editable: true})
    $("#jqGrid_SubjectBalance").setGridParam().showCol("op");
    $("#jqGrid_payment").setGridParam({cellEdit:true});
	$("#billsHeaderForm input[name='billsDate']").prop("disabled",false);
	$("#billsHeaderForm :button").show()
	$("#hxDiscount").removeAttr("disabled");

    jqGrid_SubjectBalance.addKongRow();
    jqGrid_SubjectBalance.$grid.delRowData(MyEiditGrid.getMaxRowid(jqGrid_SubjectBalance.$grid));
}

function hxAmountChange(obj){
	changeHasnotAmount(obj.id.split("_")[0],"#jqGrid_payment");
}