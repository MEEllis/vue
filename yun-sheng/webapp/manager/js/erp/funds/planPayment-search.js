var isDraft=1;
var type=$("#payreceiptType").val();
var adjustType="";
var invalidFlag=0;
var caption="";
var total=1;//总记录数
var pageIndex=0;
var jqGrid_SubjectBalance
if(type==20 || type==27){
    caption="付款明细";
}else if(type==21 || type==28){
    caption="收款明细";
}

// 预付、预收款
$(function(){
    initMenuBtn()
	initTime();
	paymentGrid();
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
                        if (billsStatus != '1' && mainIds != "" && isAudit == '1') {
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
            //预收冲应收
            settlement:{
                isShow: false,
                click:function(){
					var url = '/manager/funds/settlement/initSettlement?urlParam=1'+creatParams();
					parent.openWorkBoxByMenutext('往来结算', url, true);
                }
            },
            //预付冲应付
            settlement1:{
                isShow: false,
                click:function(){
					var url = '/manager/funds/settlement/initSettlement?urlParam=51'+creatParams();
                    parent.openWorkBoxByMenutext('往来结算', url, true);
                }
            }
         },
        btnGroupRight: {
            history: {
                isShow: true,
                click: function () {
                    if(type==21){
                        window.parent.openWorkBoxByMenutext("预收款单单据列表",  '/manager/inventory/fund/historyMain?billsType='+type,false);
                    }else if(type==20){
                        window.parent.openWorkBoxByMenutext("预付款单单据列表", '/manager/inventory/fund/historyMain?billsType='+type,false);
                    }

                }
            }
        }
    }
    menuBtn = new componentMenuBtn("#MenuTool", option);
}

//徐顺坤 2018/4/8
//创建参数
function creatParams() {
	var params = $("#billsHeaderForm").toJsonObject();
	var billsCode = $.trim(params.billsCode); //单据号
	var unitId = $.trim(params.contactsunitId); //往来单位
	var unitName = $.trim(params.contactUnitName);

	var params =  '&Code='+billsCode+'&unitId='+unitId+'&unitName='+unitName;
	return params;
}

function reloadMenuBtn() {
    var updateKey=['print','red','copy','update','next','end','audit','auditCancle','settlement1','settlement'];
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


//部门下拉框值改变事件
function changeSection(){
	var sectionId=$("#sectionName").val();
	$("#jqGrid_SubjectBalance").jqGrid('setGridParam',{  
		url:"../../funds/payment/findAccountName/"+type,
        datatype:'json',  
        traditional: true,
        postData:{"sectionId":sectionId}
    }).trigger("reloadGrid");
}

//往来单位下拉框改变事件
function changeContactunit(){
	var contactsunitId=$("#contactUnitName").val();
	if(contactsunitId==""){
		$("#contactsunitAmount").val("");
		$("#brankName").val("");
		$("#customer").val("");
		$("#brankAmount").val("");
		return;
	}
	$.request({
		url:"../../funds/payment/getContactInfo",
		type : 'GET',  
		dataType: "json",
		contentType :'application/json', 
		data:{"contactsunitId":contactsunitId,"type":type},
		success:function(data){
		  if(data.result==1){
			  var contactInfo=data.data.contactInfo;
			  $("#contactsunitAmount").val(contactInfo.contactsunitAmount);
			  $("#brankName").val(contactInfo.brankName);
			  $("#customer").val(contactInfo.customer);
			  $("#brankAmount").val(contactInfo.brankAmount);
		  }else{
			  $.zxsaas_plus.showalert("错误",data.desc);
		  }
	    }
	});
}

var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl:"../../funds/payment/selectPaymentList/"+type,
		FilterPaymentUrl:"../../funds/payment/filterPayment/"+type,
		FindAccountNameURL:"../../funds/payment/findAccountName/"+type,
		SavePaymentUrl:"../../funds/payment/savePayment/"+type,//保存并过账url
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
	pageAjax(param);
}

//下一单按钮单击事件
function nextPage(){
	var param=getSelectPageParam();
	param.queryCodeStr="N";
	param.refBillsDate=$("#billsHeaderForm input[name='billsDate']").val();
	param.refBillsId=$("#billsHeaderForm input[name='id']").val();
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


//新增按钮单击事件
function add(){
	reset();
	$("#copy").attr("disabled",true);
	allowEdit();
	isDraft=1;
	getAuthList(initDealDate);
	$("#billsHeaderForm input").val("");
	$("#inpayClassId").val("");
	$("#bottomForm")[0].reset();
	$('.rightMap img').removeAttr("src");
	//enableOrDisableHxFunction(0);
	$(".invalid").attr("disabled",true);
	footerData();
	getDefaultSectionAccount();
	total=1;pageIndex=0;
}

//禁止页面编辑,禁用选择按钮
function forbiddenEdit(){
    $(options.TableName).setColProp('accountName', {editable: false});
    $("#jqGrid_SubjectBalance").setColProp("payreceiptAmout", {editable: false})
    $("#jqGrid_SubjectBalance").setGridParam().hideCol("op");
    $("#billsHeaderForm input[name='billsDate']").prop("disabled",true);
    $("#billsHeaderForm :button").hide();
	if(type==27 || type==28){//收付款类别
		$("#inpayClassId").attr("disabled","disabled");
	}
	$(".saveAndPost").attr("disabled","disabled");
}

//允许页面编辑，允许选择按钮
function allowEdit(){
    $("#jqGrid_SubjectBalance").setColProp("payreceiptAmout", {editable: true})
    $("#jqGrid_SubjectBalance").setGridParam().showCol("op");
    $("#billsHeaderForm input[name='billsDate']").prop("disabled",false);
    $("#billsHeaderForm :button").show()

	if(type==27 || type==28){//收付款类别
		$("#inpayClassId").removeAttr("disabled");
	}
	$(".saveAndPost").removeAttr("disabled");
    jqGrid_SubjectBalance.addKongRow();
    jqGrid_SubjectBalance.$grid.delRowData(MyEiditGrid.getMaxRowid(jqGrid_SubjectBalance.$grid));
}

//填充付款单表头（主信息数据）
function fillTopData(data){
	total=data.total;
	pageIndex=data.pageIndex;
	var billsHeader=data.rows;
	if(billsHeader.isPost=="1"){
		$('.rightMap img').attr('src','../../images/guozhang.png');
		$(".btnHundred .invalid").removeAttr("disabled");
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
   // enableOrDisableHxFunction(billsHeader.summary);
    reloadMenuBtn()
}

//过滤按钮单击事件
function filterModalBtnClick(){
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
	param.billsCode=billsCode;
	return param;
}

//上一单，下一单,首单，末单分页查询ajax请求
function pageAjax(param,callbackObj){
	var actionCode="";
	if(type==20){
		actionCode="yf_query";
	}else if(type==21){
		actionCode="ys_query";
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
			  $("#copy").removeAttr("disabled",true);
			  if(data.data.rows.id !=null){
				  jQuery("#jqGrid_SubjectBalance").jqGrid("clearGridData");
				  fillTopData(data.data);
				  var accountList=data.data.rows.payReceiptDetailList;
				  if(accountList.length>0){
					  for(var i=0;i<accountList.length;i++){
						  $("#jqGrid_SubjectBalance").jqGrid('addRowData', i+1,accountList[i], 'last' );
					  }
					  footerData();
				  }
                  if(isDraft){
                      allowEdit()
                  }else{
                      forbiddenEdit();
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

//重置
function reset(){
	$("#filterSearchForm")[0].reset();
	initTime();
}

//页脚合计
function footerData(){
	var payreceiptAmout = $(options.TableName).getCol('payreceiptAmout',false,'sum');
	$("#amount").val($.formatFloat(payreceiptAmout,2));
	$(options.TableName).jqGrid('footerData','set',{
        "payreceiptAmout": payreceiptAmout,
        }
	);
}

//保存
function save() {
    var params=getSaveParams()
    if(checkSaveParam(params)==true){
        return
    }

    var actionCode="";
    if(type==20){
        actionCode="yf_save";
    }else if(type==21){
        actionCode="ys_save";
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
    if(type==20){
        actionCode="yf_post";
    }else if(type==21){
        actionCode="ys_post";
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
function checkSaveParam(params){
	var flag=false;
	if($("#billsCode").val() != ""){
		$.zxsaas_plus.showalert("提示","该单据已保存!");
		flag=true;
		return flag;
	}

//	if(params.contactsunitId==""){
//		 $.zxsaas_plus.showalert("提示","请选择往来单位!");
//		 flag=true;
//		 return flag;
//	}
//	if(params.managersUid==""){
//		$.zxsaas_plus.showalert("提示","请选择经手人!");
//		flag=true;
//		return flag;
//	}
    //校验收付款类别
	if(type==27 && params.inpayClassId==""){
		$.zxsaas_plus.showalert("提示","请选择付款类别!");
		flag=true;
		return flag;
	}
	if(type==28 && params.inpayClassId==""){
		$.zxsaas_plus.showalert("提示","请选择收款类别!");
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
	//判断单据总金额不能为0
	var payreceiptAmoutTotal=$(options.TableName).getCol('payreceiptAmout',false,'sum');
	if(payreceiptAmoutTotal=="0.00"){
		$.zxsaas_plus.showalert("提示","单据总金额不能为0!");
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
	//主表
	params=$("#billsHeaderForm").toJsonObject();
	params.type=type;
	if(type=="27" || type=="28"){
		params.inpayClassId=$("#inpayClassId").val();
	}
	//资金系数（1收款，-1付款）
	if(type=="20" || type=="27"){//预付款,其他付款
		params.ratio=-1;
	}else if(type=="21" || type=="28"){//预收款,其他收款
		params.ratio=1;
	}
	params.refMainTable="I_PAYRECEIPT_MAIN_DRAFT";
	params.amount=$(options.TableName).getCol('payreceiptAmout',false,'sum');
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
		if(row.payreceiptAmout!="0.00" && row.payreceiptAmout!="" && row.payreceiptAmout!=null){
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


function cellOnBlur(){
	$(options.TableName).jqGrid("saveCell",lastrow,lastcell);
	footerData();
}

function cellOnBlurs(obj){
	if(isNaN(obj.value)){
		var cellId=obj.id;
		var rowid=cellId.split("_")[0];
		$(options.TableName).jqGrid('setCell',rowid,"payreceiptAmout","0.00");
		$.zxsaas_plus.showalert("提示","请输入数字或保留两位小数");
	}
	$(options.TableName).jqGrid("saveCell",lastrow,lastcell);
	footerData();
}

//禁止输入非数字
function clearNoNum(evt,obj){
	var evt = evt || window.event;
    var keyCode = evt.keyCode || evt.which;
	var arr = [8,37,39,48,49,50,51,52,53,54,55,56,57,96,97,98,99,100,101,102,103,104,105,110,190];
	if (arr.indexOf(keyCode) == -1){
		obj.value = obj.value.replace(/[^\d.]/g,"");
		var payreceiptAmout=Number(obj.value)+Number($(options.TableName).getCol('payreceiptAmout',false,'sum')); 
		$(options.TableName).jqGrid('footerData','set',{
	        "payreceiptAmout": payreceiptAmout,
	       }
		);
	}
}

//复制按钮单击事件(有单据编号才让复制，复制一模一样的数据，单据编号清空，无单据编号不让复制)
function copy(){
	$("#billsCode").val("");
    isDraft=1;
	$("#copy").attr("disabled",true);
	allowEdit();
	$('.rightMap img').removeAttr("src");
    reloadMenuBtn()
    $('#bottomForm')[0].reset()
	$("#billsHeaderForm input[name='id']").val('')
}
