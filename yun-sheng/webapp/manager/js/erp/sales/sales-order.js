var pageIndex=0;
var total=1;//总记录数
var isDraft=1;// 0正式单据 ,1草稿单据
var addFlag=true;//页面是否是新增状态
var type=18;
var billsType=18;
var billsStatus=0;//单据状态 5,已完成，6已审核
var options = {
    LoadBtnUrl: "../../json/button.json", // 按钮工具栏加载地址
    TableName: "#dataGrid", // 显示表格名称。遵照css选择器书写
};
$(function(){
    initMenuBtn()
    initEvents()
	initDataGrid();
	initCheckDetailModal();
	addBtnClick();
	paymentWayGrid()
	//正式单据
	var billsCode = $.trim(functionObjExtent.getQueryString('billsCode'))
    var checkFlag = functionObjExtent.getQueryString('checkFlag')

	if(billsCode != ""){
        var copyFlag = functionObjExtent.getQueryString('copyFlag')

		var reportParam={};
		isDraft="0";
		reportParam.billsType=type;
		reportParam.billsCode=billsCode;
		pageAjax(reportParam,function () {
            //复制一单
            if(copyFlag==1){
               copyBtnClick();
               reloadMenuBtn()
            }

        });
	}else{
		//草稿单据 bid 是 报表 传过来的 ， billid 是 单据页面传递过来的
		var bId = $.trim(functionObjExtent.getQueryString('bId'))||functionObjExtent.getQueryString('billsId')
		if(bId!=""){
			isDraft="1";
			var reportParam={
				billsType:type,
				id:bId,
				isDraft:1
			};
			pageAjax(reportParam,function(){
                //审核一单
				if(checkFlag==1){
                     verfiy()
				}
			});
		}
	}
})

//初始化页面数据
function initPageData(){
	var param=getSelectPageParam();
	param.queryCodeStr="L";
	pageAjax(param);
}

//初始化事件
function initEvents(){
	$(window).resize(wResize);//注册窗口改变事件
	wResize();
}

//窗口大小改变
function wResize(){
	var winH = $(window).height();//浏览器高度
	var centerH = winH - 580;//中部高度
	if(centerH < 350){
		centerH = 350;
	}
	$(".gridBody").height(centerH);
	$("#dataGrid").setGridHeight(centerH);
}

//载入菜单组件
function initMenuBtn(){
    var isDraftOp=!$("#slideThree").is(':checked')
    var option = {
        btnGroupLeft: {
            add: {
                isShow: true,
                click: function () {
                    location.href =location.href.substring(0,location.href.indexOf('?'));
                }
            },
            draftSave: {
                isShow: isDraftOp,
                click: function () {
                    saveBtnClick()
                }
            },
            draftDel: {
                isShow: isDraftOp,
                click: function () {
                    delBtClick()
                }
            },
            check:{
                isShow: !isDraftOp,
                click: function () {
                    verfiy()
                }
            },
            mandatory:{
                isShow: !isDraftOp,
                click: function () {
                    var topFormObj = $(".gridTop").toJsonObject();
                    if (!((topFormObj.billsStatus == 2 && topFormObj.auditStatus == '0') ||(topFormObj.billsStatus == 12 && topFormObj.auditStatus == '0'))) {
                        $.zxsaas_plus.showalert('提示', "只能对已审核、出库中且未稽核的单据进行强制完成!");
                        return false;
                    }
                    invalidBtnClick(2)
                }
            },
			// printDropdown:{
			// 	isShow: true,
			// 	list:[{
			// 		name:'未审核',
			// 		click:function(){
			// 			print('nocheck')
			// 		}
			// 	},{
			// 		name:'已审核及强制完成',
			// 		click:function(){
			// 			print('check')
			// 		}
			// 	}]
			// },
            print:{
                isShow: true,
                click: function () {
                    print()
                }
            },
            copy:{
                isShow: !isDraftOp,
                click: function () {
                    copyBtnClick()
                    reloadMenuBtn()
                }
            },
            audit:{
                isShow: !isDraftOp,
                click: function () {
                    var topFormObj = $(".gridTop").toJsonObject();
                    $.ajaxPackage({
                        url: '/manager/inventory/sales/updateAuditStatus',
                        data: {
                            'billsType':billsType,
                            'billsId':topFormObj.id,
                            'auditStatus':1,
                        },
                        success: function (data) {
                            $.zxsaas_plus.showalert('success', "稽核成功");
                            var param={};
                            param.isDraft=isDraft;
                            param.id=topFormObj.id;
                            pageAjax(param);
                        }
                    })
                }
            },
            auditCancle:{
                isShow: !isDraftOp,
                click: function () {
                    var topFormObj = $(".gridTop").toJsonObject();
                    $.ajaxPackage({
                        url: '/manager/inventory/sales/updateAuditStatus',
                        data: {
                            'billsType':billsType,
                            'billsId':topFormObj.id,
                            'auditStatus':0,
                        },
                        success: function (data) {
                            $.zxsaas_plus.showalert('success', "取消稽核成功");
                            var param={};
                            param.isDraft=isDraft;
                            param.id=topFormObj.id;
                            pageAjax(param);
                        }
                    })
                }
            },
            update:{
                isShow: !isDraftOp,
                click: function () {
                    saveBtnClick()
                }
            },
        },
        btnGroupRight: {
            history: {
                isShow: true,
                click: function () {
                    window.parent.openWorkBoxByMenutext("批发订单单据列表",  '/manager/inventory/sales/historyMain?billsType='+billsType, true);
                }
            }
        }
    };
    menuBtn = new componentMenuBtn("#MenuTool", option);
}
//重载菜单组件
function reloadMenuBtn() {
    var isDraftOp=!$("#slideThree").is(':checked')
    var updateKey=['mandatory','copy','update','audit','auditCancle'];
    var addkey=['draftPost','draftDel','draftSave','check'];
    var params = $("#billsHeaderForm").toJsonObject();
    var billsStatus=  $.trim(params.billsStatus)
    var isAudit=  $.trim(params.auditStatus)
    $.pageDetailCommon.reloadMenuTool({
        isDraftOp:isDraftOp,
        isAudit:isAudit,
        billsStatus:billsStatus,
        menuBtn:menuBtn,
        billsCode:params.billsCode,
        updateKey:updateKey,
        addkey:addkey,
    })

    //判断是否禁用
    if(isDraftOp == false){
        if(billsStatus=="2"){
            menuBtn.setUndisabledbtn("mandatory");
        }else if(billsStatus=="4" ||billsStatus=="5"){
            menuBtn.setDisabledbtn("mandatory");
        }
    }
}

//分页查询
function pageAjax(param,callbackObj){
	$.request({
		url:"../salesOrder/selectList/"+pageIndex,
		type : 'GET',  
		dataType: "json",
		data:param,
		contentType :'application/json', 
		success:function(data){
		  if(data.result==1){
			  var codeFlag=data.data.queryCodeStr;
			  var refBillsId=$("#billsHeaderForm input[name='id']").val();
			  if((codeFlag=="P" || codeFlag=="N") && (data.data.rows==null || data.data.rows.length==0) && refBillsId!=""){
				  $.zxsaas_plus.showalert("提示",codeFlag=="P"?"已经是第一单了":"已经是最后一单了");
				  return;
			  }
			  // $("#billsHeaderForm").data('bootstrapValidator').resetForm();
			  getAuthList(initDealDate);
			  clearPageData();
			  if(data.data.rows!=null && data.data.rows.length>0){
				  fillPageData(data.data.rows[0]);
			  }else{
				  $.zxsaas_plus.showalert("提示","未查询到单据");
				  if(isDraft=="1"){
					  addBtnClick();
				  }
			  }
			  setPagingParam(data,param);
              reloadMenuBtn()
		  }
		  $("input").data("changed",false);
		  if(isDraft=="0"){
			  $('#billsDate').attr('disabled',true)
		  }else if(isDraft=="1"){
			  $('#billsDate').attr('disabled',false)
		  }
		  if(callbackObj){
              callbackObj(data.data)
		  }
	    }
	});
}

//获取查询参数
function getSelectPageParam(){
	var param={};
	param.isDraft=isDraft;
	return param;
}


//设置分页参数
function setPagingParam(data,param){
	if(param.id==undefined || param.id==""){
		total=data.data.total;
	}
    pageIndex=data.data.pageIndex;
	addFlag=data.data.addFlag;
	billsStatus=data.data.billsStatus;
	if(isDraft=="0"){
		if(billsStatus=="2"){
			$('.rightMap img:eq(0)').attr('src','../images/status/statusAudit.png');
			$(".btnHundred .invalid").removeAttr("disabled");
			
		}else if(billsStatus=="4"){
			$('.rightMap img:eq(0)').attr('src','../images/status/statusComplete.png');
			$(".btnHundred .invalid").attr("disabled","disabled");
		}else if(billsStatus=="5"){
			$('.rightMap img:eq(0)').attr('src','../images/status/statusForce.png');
			$(".btnHundred .invalid").attr("disabled","disabled");
		}else if(billsStatus=="12"){
			$('.rightMap img:eq(0)').attr('src','../images/status/outOfStorage.png');
			$(".btnHundred").attr("disabled","disabled");
		}else{
			$('.rightMap img').removeAttr("src");
		}
        if (data.data.rows[0].auditStatus == 1) {
            $('.rightMap img:eq(1)').attr('src', '/manager/images/audit.png');
        } else {
            $('.rightMap img:eq(1)').attr('src', '/manager/images/auditNo.png');
        }
	}else{
		if(billsStatus=="1"){
			$('.rightMap img:eq(0)').attr('src','../images/status/statusNotAudit.png');
		}else{
			$('.rightMap img').removeAttr("src");
		}
	}
	if(isDraft=="1" && $("#slideThree").prop('checked')){//草稿
		$('.slideThree').css('background','#D09E85');
		$('#slideThree').prop('checked',false);
	}else if(isDraft=="0" && !$("#slideThree").prop('checked')){
		$('.slideThree').css('background','#8BAEC7');
		$('#slideThree').prop('checked',true);
	}
}

//填充页面数据
function fillPageData(row){
	row.billsDate = $.DateFormatFromTimestamp("yyyy-MM-dd",row.billsDate);
	row.billsDate == "1970-01-01"?"":row.billsDate;
	$("#billsHeaderForm,#gridFooter").writeJson2Dom(row);
    getContactAmount(row.contactsunitId);
	$("#prepaymentAmount").val($.formatFloat(row.prepaymentAmount,2));
	//商品明细数据
	$(options.TableName).jqGrid("clearGridData");
	if(row.detailList.length>0){
		$.each(row.detailList,function(i,value){
			 if(isDraft==1){
				 dataGrid.addRowData(i+1,value);
				 allowEdit();
			 }else{
				 $(options.TableName).jqGrid('addRowData', i+1,value, 'last' );
				 forbiddenEdit();
			 }
		});
	}
	//回显单据收付款金额
	echoPaymentWayGrid(row.salesBillsAccount);
	
	//合计
	detailGridFootData();
	if(isDraft=="1"){
		forbitUpdate();
	}
}



//正式单据、草稿单据点击事件
$("#slideThree").click(function(){
	$(".slideThree").toggleClass("color7D5F50");
	if($("#slideThree").prop('checked')){//正式单据
		$('.rightMap img').attr('src','../images/status/statusAudit.png');
	}else{
		$('.rightMap img').attr('src','../images/status/statusNotAudit.png');
	}
});

//单据状态改变事件
$('#slideThree').click(function (){
	if($("#slideThree").prop('checked')){//正式单据
		isDraft=0;
		$('.slideThree').css('background','#8BAEC7');
	}else{
		isDraft=1;
		$('.slideThree').css('background','#D09E85');
	}
	pageIndex=0;
	addFlag=false;
	initPageData();
})


//禁止页面编辑,禁用选择按钮
function forbiddenEdit(){
	$("#dataGrid").setGridParam({cellEdit:false});
	$("#billsHeaderForm input[name='billsDate']").attr("readonly","readonly");
	$("#billsHeaderForm :button").hide()
	$("#dataGrid").setGridParam().hideCol("op");
	$("#dataGrid").setGridParam().showCol("reviewsNum");
	$("#dataGrid").setGridParam().showCol("reviewsAmount");
	enableOrDisableNavBtn();
}

//允许页面编辑，允许选择按钮
function allowEdit(){
	$("#dataGrid").setGridParam({cellEdit:true});
	$("#billsHeaderForm input[name='billsDate']").removeAttr("readonly");
	$("#billsHeaderForm :button").show()
	$("#dataGrid").setGridParam().showCol("op");
	$("#dataGrid").setGridParam().hideCol("reviewsNum");
	$("#dataGrid").setGridParam().hideCol("reviewsAmount");
	enableOrDisableNavBtn();
}

//切换页面
function tooglePageStatus(){
	 if(isDraft==1){//草稿
		  $('.rightMap img').attr('src','../images/status/statusNotAudit.png');
		  allowEdit();
		  dataGrid.addKongRow();
	  }else{
		  $('.rightMap img').attr('src','../images/status/statusAudit.png');
		  forbiddenEdit();
	  }
}


//打开添加状态
function openAddState(){
	dataGrid.clearDataGrid();
	dataGrid.addKongRow();
}

//订单详情grid页脚合计
function detailGridFootData(){
	var goodsNumber = $(options.TableName).getCol('goodsNumber',false,'sum');
	var reviewsNum = $(options.TableName).getCol('reviewsNum',false,'sum');
	var amount = $(options.TableName).getCol('amount',false,'sum');
	var reviewsAmount = $(options.TableName).getCol('reviewsAmount',false,'sum').toFixed(2);
	$(options.TableName).jqGrid('footerData','set',{
        "goodsNumber": goodsNumber,
        "reviewsNum": reviewsNum,
        "amount": amount,
        "reviewsAmount": reviewsAmount,
        }
	);
}

var lastcell="";
var lastrow="";
//初始化表格
var dataGrid = null;
function initDataGrid(){
	//配置
	var paras = {
	    gridId:'dataGrid', 
	    addRow:{goodsId:'',goodsCode:'',goodsName:'',cxSectionId:'',stockNum:'',numControlFlag:'',imControlFlag:'',cxNum:'',cxDiscount:'',cxPrice:'',price:'',remark:''},
	    colNames:['商品名称', '数量','审批量','单价','总金额','审批金额','商品备注','类别','商品编码','品牌','型号','颜色','商品ID','ID'],
	    colModel:
	    	[
			{name : 'goodsName',sortable: false,index : 'goodsName',align:'left',edittype:'custom_bt_input',
				custom_element_bt_click:"showGoodsModal",editable:true,width:'200px'},
                {name : 'goodsNumber',index : 'goodsNumber',align:'right',editable:true,sortable: false,formatter:'integer',width:'100px',
                    editoptions:{
                        readonly:false,
                        onkeyup:"clearNoNumNoPoint(event,this)",
                      //  onblur:"gridCellOnBlur()",
                        dataEvents: [{
                            type: "blur",
                            fn: function(){
                                $("#dataGrid").jqGrid("saveCell", lastrow, lastcell);

                            }
                        },{
                            type: "focus",
                            fn: function(){
                                this.select()
                            }
                        }
                        ]
                    }
                },
                {name : 'reviewsNum',index : 'reviewsNum',align:'right',editable:false,sortable: false,formatter:'integer',width:'100px'},
                {name : 'price',index : 'price',align:'right',editable:true,editrules:{number:true},formatter:'number',sortable: false,width:'100px',
                    editoptions:{
                        readonly:false
                        ,onkeyup:"clearNoNum(event,this)",
                     // onblur:"gridCellOnBlur()",
                        dataEvents: [{
                            type: "blur",
                            fn: function(){
                                $("#dataGrid").jqGrid("saveCell", lastrow, lastcell);
                                summary();
                            }
                        },{
                            type: "focus",
                            fn: function(){
                                this.select()
                            }
                        }
                        ]
                    }
                },
                {name : 'amount',index : 'amount',align:'right',editable:false,editrules:{number:true},formatter:'number',sortable: false,width:'100px'},
                {name : 'reviewsAmount',index : 'reviewsAmount',align:'right',hidden: false,editable:false,formatter:'number',sortable: false,width:'100px'},
                {name : 'remark',index : 'remark',align:'left',width:'200px',hidden: false,editable:true,sortable: false,editoptions:{
                	readonly:false,
                    dataEvents: [{
                        type: "blur",
                        fn: function(){
                            $("#dataGrid").jqGrid("saveCell", lastrow, lastcell);
                        }
                    },{
                        type: "focus",
                        fn: function(){
                            summary();
                            this.select()
                        }
                    }
                    ]
				},},
                {name : 'categoryName',index : 'categoryName',editable:false,sortable: false,width:'100px'},
             {name : 'code',index : 'code',editable:false,sortable: false,width:'100px'},
             {name : 'brandName',index : 'brandName',editable:false,sortable: false,width:'100px'},
             {name : 'models',index : 'models',editable:false,sortable: false,width:'100px'},
             {name : 'color',index : 'color',editable:false,sortable: false,width:'100px'},
             {name : 'goodsId',index : 'goodsId',hidden: true,editable:false,sortable: false},
             {name : 'id',index : 'id',editable:false,sortable: false,key:true,hidden: true}
           ]
        ,shrinkToFit: false,
	};
	//回调函数
	var callBackList = {
		afterEditCell:function(rowid,name,val,iRow,iCol){//开始编辑
		   lastrow = iRow;
	       lastcell = iCol;
	       forbitPaste(rowid);
        },
        afterSaveCell:function(rowid,name,val,iRow,iCol){//保存编辑
        	lastrow = iRow;
		    lastcell = iCol;
        },
        summary:function(rowid,name,val,iRow,iCol){//统计处理
        },
        getGridDataList:function(rows){
        }
	};
	dataGrid = new MyEiditGrid(paras,callBackList);
}

//禁止粘贴
function forbitPaste(rowid){
	$(document).delegate('#'+rowid+'_goodsNumber', "contextmenu", function(e){
		return false;
	});
	$(document).delegate('#'+rowid+'_price', "contextmenu", function(e){
		return false;
	});
}

//删除按钮点击事件
function delBtClick(){
	var id = $("#billsHeaderForm input[name='id']").val();
	$.zxsaas_plus.showconfirm("提示","是否确定删除此单据?",function(){
		if(id==""){
			$.zxsaas_plus.showalert("提示","删除单据不存在!");
			return;
		}
		$.request({
			url:'/manager/salesOrder/delete/'+id,
			type:'GET',
			dataType:'json',
			contentType:'application/json;charset=utf-8',
			success:function(data){
				$.zxsaas_plus.showalert("success","删除成功!");
                setTimeout(function(){
                    location.href =location.href.substring(0,location.href.indexOf('?'));
                },1500)
			},
			error:function(data){
				$.zxsaas_plus.showalert("提示","删除失败!");
			}
		});
	},function(){
		
	});
}

//保存按钮单击事件// 0正式单据 ,1草稿单据
function saveBtnClick(){
	$("#dataGrid").jqGrid('saveCell',lastrow,lastcell);
    $("#billsHeaderForm").data('bootstrapValidator').resetForm();
	$("#billsHeaderForm").data('bootstrapValidator').validate();
	if(!($("#billsHeaderForm").data('bootstrapValidator').isValid())){
		refreshValidator("#billsHeaderForm");
		return;
	}
	if($("input[name='managerUname']").val()==""){
		$.MsgBox('提示','经手人不能为空');
		return;
	}
	//判断数量是否为0
	var tableid=$('#dataGrid').getCol('goodsNumber');
	for(var i=0;i<tableid.length;i++){
		if(tableid[i] <= 0 ||tableid[i] == "" ){
			$.MsgBox('提示','数量不可小于或等于0');
			return;
		}
	}
	

    var param=getSaveParam();
    if (isDraft==0) {
        var detailList=[];
        for(var i=0;i<param.orderDetailDraftList.length;i++){
            var detailItem=param.orderDetailDraftList[i];
            detailList.push({
                "id": detailItem.id,
                "remark":detailItem.remark,
            })
        }
        var dataParam={
            "billsId": param.id,
            "billsType":billsType,
            "remark": param.remark,
            "detailList": detailList
        };
        $.ajaxPackage({
            dataType: "json",
            contentType :'application/json',
            url:'/manager/inventory/sales/updateRemark',
            data:JSON.stringify(dataParam),
            success:function(data){
                if(data.result==1){
                    $.zxsaas_plus.showalert("success",'单据备注保存成功');
                    var param={};
                    param.queryCodeStr="L";
                    param.isDraft=isDraft;
                    param.id=dataParam.billsId;
                    pageAjax(param);
                }else{
                    $.zxsaas_plus.showalert("错误",data.desc);
                }
            }
        });
        return;
    }else {
        var checkResult = checkSaveParam(param);
        if (checkResult) {
            return;
        }
        var flag=false;
        for (var int = 0; int < param.orderDetailDraftList.length; int++) {
            if ($.parseFloat(param.orderDetailDraftList[int].price) == 0) {
                flag = true
            }
        }
        if(flag==true){
            $.zxsaas_plus.showconfirm('提示','单据中存在价格为0的商品，是否确认保存',function () {
                saveSales()
            },function () {
                return;
            })
        }else{
            saveSales()
        }
        function saveSales() {
            $.ajaxPackage({
                dataType: "json",
                contentType: 'application/json',
                url: '/manager/salesOrder/save',
                data: JSON.stringify(param),
                success: function (data) {
                    if (data.result == 1) {
                        $.zxsaas_plus.showalert("success", '保存成功');
                        if (isDraft == "1") {
                            pageIndex = 0;
                        }
                        var param = {};
                        param.queryCodeStr = "L";
                        param.isDraft = isDraft;
                        param.id = data.data.id;
                        pageAjax(param);
                    } else {
                        $.zxsaas_plus.showalert("错误", data.desc);
                    }
                }
            });
        }
    }
}

//校验保存参数
function checkSaveParam(param){
	var flag=false;
	var price = param.orderDetailDraftList;
	if(price == ""){
		$.zxsaas_plus.showalert("提示","明细不能为空!");
		flag=true;
		return flag;
	}
	/*else{
		for(var i=0;i<price.length;i++){
			if(price[i].price == "0.00"){
				$.zxsaas_plus.showalert("提示","单价不能为空!");
				flag=true;
				return flag;
			}
		}
	}*/
}

//获取保存参数
function getSaveParam(){
	var param={};
	//单据表头
	param=$("#billsHeaderForm").toJsonObject();
	param.billsDate=$("#billsDate").val()
	param.billsStatus=1;
	param.billsType="18";//销售订单
	param.billsPrefixCode="XSD";
	param.billsAmount=$(options.TableName).getCol('amount',false,'sum');
	param.orderNum=$(options.TableName).getCol('goodsNumber',false,'sum');
	param.prepaymentAmount=$("#prepaymentAmount").val().replace(",","");
	delete param.billsCode;
	delete param.contactUnitName;
	delete param.yingshouAmount;
	delete param.yushouAmount;
	delete param.auditStatus;

	if(param.prepaymentAmount!="0.00"){
		//收付款主表草稿表数据
		var paymentParam={};
		paymentParam.managersUid=param.managerUid;
		paymentParam.sectionId=param.sectionId;
		paymentParam.contactsunitId=param.contactsunitId;
		paymentParam.billsDate=param.billsDate;
		paymentParam.type="18";//销售订单
		paymentParam.refMainTable="I_SALES_ORDER_MAIN_DRAFT";
		paymentParam.amount=param.prepaymentAmount;
		param.payreceiptMainDraftData=paymentParam;
		//收付款明细表草稿表数据
		var payreceiptDetailDraftData =new Array();
		var detailDraftIds=$("#paymentWayModalGrid").getDataIDs();
		$.each(detailDraftIds, function (i,value) {
			var row = $("#paymentWayModalGrid").jqGrid('getRowData', value );
			if(row.payreceiptAmout!="0.00"){
				delete row["id"];
				delete row["accountTypeName"];
				delete row["accountName"];
				delete row["status"];
				payreceiptDetailDraftData.push(row);
			 }
		 });
		param.payreceiptDetailDraftData=payreceiptDetailDraftData;
	}
	
	//明细数据
	var orderDeatilIds = $(options.TableName).jqGrid('getDataIDs');
	var array=new Array();
	$.each(orderDeatilIds,function(i,value){
		var rowData = $(options.TableName).jqGrid('getRowData',value);
//		if(rowData.goodsId!="" && rowData.price!="0.00"){
		if(rowData.goodsId!=""){
			delete rowData.op;
			deleteRelateGoodsColumn(rowData);
			array.push(rowData);
		}
	});
	param.orderDetailDraftList=array;
	console.log(param);
	return param;
}

//付款方式保存按钮单击事件
function savePaymentWay(){
	var payreceiptAmout=$.formatFloat($("#paymentWayModalGrid").getCol('payreceiptAmout',false,'sum'),2);
	$("#prepaymentAmount").val(payreceiptAmout);
}

function addBills(){
	if($("#sectionName").val() || $("#contactUnitName").val() || $("#billsDate").val() || $("#managerUname").val()){
		$.zxsaas_plus.showconfirm("提示","当前数据未保存，是否新增?",function(){
            location.href =location.href.substring(0,location.href.indexOf('?'));
		},function(){
			
		});
	}else{
        location.href =location.href.substring(0,location.href.indexOf('?'));
	}
}

function addBills(){
	if($("#sectionName").val() || $("#contactUnitName").val() || $("#billsDate").val() || $("#managerUname").val()){
		$.zxsaas_plus.showconfirm("提示","当前数据未保存，是否新增?",function(){
			addBtnClick()
		},function(){
			
		});
	}else{
		addBtnClick()
	}
}

//新增按钮点击事件
function addBtnClick(){
	addFlag=true;
	clearPageData();
	getAuthList(initDealDate);
	addOpenState();
	if($(".slideThree").attr("class") != "slideThree color7D5F50"){
		$(".slideThree").toggleClass("color7D5F50");
	}
	$('.rightMap img').removeAttr("src");
	if($("#billsHeaderForm").data('bootstrapValidator')!=undefined){
		$("#billsHeaderForm").data('bootstrapValidator').resetForm();
	}
	total=1;pageIndex=0;
}

//打开新增状态
function addOpenState(){
	isDraft=1;
	clearPageData();
	dataGrid.clearDataGrid();
	$("#slideThree").prop("checked",false);
	if(isDraft=="1"){//草稿
		$('.slideThree').css('background','#D09E85');
		}else if(isDraft=="0"){
		$('.slideThree').css('background','#8BAEC7');
	}
	tooglePageStatus();
	detailGridFootData();
	$(".btnHundred .post").attr("disabled","disabled");
}

//情况页面数据
function clearPageData(){
	$("#billsHeaderForm input").val("");
	$("#gridFooter")[0].reset();
	$("#prepaymentAmount").val("0.00");
	$(options.TableName).jqGrid('clearGridData');
}

function gridCellOnBlur(){
	$(options.TableName).jqGrid("saveCell",lastrow,lastcell);
	summary();
}

//汇总统计
function summary(){
	//汇总每一行
	var ids=$("#dataGrid").getDataIDs();
    $.each(ids,function(i,value){
    	var currRow = $("#dataGrid").jqGrid('getRowData', value);
    	$("#dataGrid").jqGrid('setCell', value ,"amount" ,currRow.price * currRow.goodsNumber);
    	$("#dataGrid").jqGrid('setCell', value ,"reviewsAmount" ,currRow.price * currRow.reviewsNum);
    });
    detailGridFootData();
}

//草稿单禁用修改部门，往来单位，经手人等信息
function forbitUpdate(){
	
	$("#dataGrid").setGridParam().hideCol("reviewsNum");
	$("#dataGrid").setGridParam().hideCol("reviewsAmount");
	
	enableOrDisableNavBtn();
}

//验证bootstrap规范
var billsHeaderForm=function(fromid){
	$('#billsHeaderForm').bootstrapValidator({
		feedbackIcons:{
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
		fields:{
			sectionName:{
				validators:{
					notEmpty:{
						message:'字段必填'
					}
				},
			},
			contactUnitName:{
				validators:{
					notEmpty:{
						message:'字段必填'
					}
				},
			},
			billsDate:{
				validators:{
					notEmpty:{
						message:'字段必填'
					}
				},
			},
			managerUname:{
				validators:{
					notEmpty:{
						message:'字段必填'
					}
				},
			},
		}
	})
}

$(document).on('dblclick','#contactunitModalGrid>tbody>tr.active',function(){
	refreshValidatorField("contactUnitName",'#billsHeaderForm');//刷新验证信息
})
$(document).on('dblclick','#managerModalGrid>tbody>tr.active',function(){
	refreshValidatorField("managerUname",'#billsHeaderForm');//刷新验证信息
})


/*往来单位选择表格调整*/
$(document).on("shown.bs.modal","#contactunitModal",function(){
	$("#contactunitModalGrid").setGridWidth($(this).find(".jqGrid_wrap").width());
	$(this).find(".ui-jqgrid-bdiv").height($(this).find(".left").height()*0.8);
});

/*经手人选择表格调整*/
$(document).on("shown.bs.modal","#managerModal",function(){
	$("#managerModalGrid").setGridWidth($(this).find(".modal-body").width()*0.97);
})

/*商品名称选择表格调整*/
$(document).on("shown.bs.modal","#goodsModal",function(){
	$("#goodsModalGrid").setGridWidth($(this).find(".jqGrid_wrap").width());
	$(this).find(".ui-jqgrid-bdiv").height($(this).find(".left").height()*0.8);
})

/*收款方式表格调整*/
$(document).on("shown.bs.modal","#paymentWay",function(){
	$("#paymentWayModalGrid").setGridWidth($(this).find(".details").width());
})
