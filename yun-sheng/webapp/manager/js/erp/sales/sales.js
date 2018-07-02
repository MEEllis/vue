var type=19;//销售单
var billsType=19;//销售单
var pageIndex=0;
var total=1;//总记录数
var isDraft=0;// 0正式单据 ,1草稿单据
var addFlag=true;//页面是否是新增状态
var billsStatus=0;//单据状态 6.已过账，6已红冲
var options = {
    LoadBtnUrl: "../../json/button.json", // 按钮工具栏加载地址
    TableName: "#dataGrid", // 显示表格名称。遵照css选择器书写
};
var lastsel="";
var lastrow="";
//初始化表格(折扣率默认100%)
var dataGrid = null;
$('.print').attr('disabled',true);
$(function(){
    initMenuBtn()
	initDataGrid();
	initEvents();
	addBtnClick();

    //输入框得到焦点时
    $("#billsDiscount").on('focus',function(){
        this.select()
    })
    //正式单据
    var billsCode = $.trim(functionObjExtent.getQueryString('billsCode'))
    if(billsCode != ""){
        var copyFlag = functionObjExtent.getQueryString('copyFlag')

        var reportParam={};
        isDraft="0";
        reportParam.billsType=type;
        reportParam.billsCode=billsCode;
        pageAjax(reportParam,function () {
            //复制一单
            if(copyFlag==1){
                copyBtnClick()
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
            pageAjax(reportParam);
        }
    }
})

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
            draftPost:{
                isShow: isDraftOp,
                click: function () {
                    postBtnClick(1)
                }
            },
            red:{
                isShow: !isDraftOp,
                click: function () {
                    var params = $("#billsHeaderForm").toJsonObject();
                    var isAudit=  $.trim(params.auditStatus);
                    if(isAudit=='1'){
                        $.zxsaas_plus.showalert('提示', "只能对已过账且未稽核单据红冲!");
                        return false;
                    }
                    invalidBtnClick(2)
                }
            },
            orderImport:{
                isShow: isDraftOp,
                click: function () {
                    orderImportBtClick()
                }
            },
			printDropdown:{
				isShow: !isDraftOp,
				list:[{
					name:'商品汇总',
					click:function(){
						print('noimei')
					}
				},{
					name:'商品明细',
					click:function(){
						print('showimei')
					}
				}]
			},
            // print:{
            //     isShow: !isDraftOp,
            //     click: function () {
            //         print()
            //     }
            // },
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
                    window.parent.openWorkBoxByMenutext("批发单单据列表",  '/manager/inventory/sales/historyMain?billsType='+billsType, true);
                }
            }
        }
    };
    menuBtn = new componentMenuBtn("#MenuTool", option);
}
//重载菜单组件
function reloadMenuBtn() {
    var isDraftOp=!$("#slideThree").is(':checked')
    var updateKey=['printDropdown','print','red','copy','update','audit','auditCancle'];
    var addkey=['draftPost','draftDel','draftSave','orderImport'];
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
}

//初始化页面数据
function initPageData(){
	var param=getSelectPageParam();
	param.queryCodeStr="L";
	pageAjax(param);
}

//分页查询
function pageAjax(param,callbackObj){
	$.request({
		url:"../salesOut/selectList/"+pageIndex,
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

			  $("#billsHeaderForm").data('bootstrapValidator').resetForm();
			  getAuthList(initDealDate);
			  clearPageData();
			  if(data.data.rows!=null && data.data.rows.length>0){
				  fillPageData(data.data.rows[0]);
				  //报表---勿删
//				  $("#slideThree").prop('checked',isDraft=="1"?false:true);
			  }else{
				  $.zxsaas_plus.showalert("提示","没有查询到单据");
				  if(isDraft=="1"){
					  addOpenState();
				  }else{
					 forbiddenEdit();
				  }
			  }
			  enableOrDisableNavBtn();
			  setPagingParam(data,param);
              reloadMenuBtn()
			  initEvents();
			  summary();
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
	param.billsType=type;
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
		$('.print').attr('disabled',false);
		if(billsStatus=="6"){
			$('.rightMap img:eq(0)').attr('src','../images/guozhang.png');
			$(".btnHundred .invalid").removeAttr("disabled");
		}else if(billsStatus=="7"){
            $(".btnHundred .invalid").attr("disabled","disabled");
			$('.rightMap img:eq(0)').attr('src','../images/status/statusRed.png');
            //billsCode（包含R） 是否为红冲单 ，  为红冲单不能复制
			if(data.data.rows[0].billsCode.indexOf("_R")>-1){
                $(".btnHundred .copy").attr("disabled","disabled");
			}else{
                $(".btnHundred .copy").removeAttr("disabled");
			}
		}else{
			$('.rightMap img:eq(0)').removeAttr("src");
		}

        if (data.data.rows[0].auditStatus == 1) {
            $('.rightMap img:eq(1)').attr('src', '/manager/images/audit.png');
        } else {
            $('.rightMap img:eq(1)').attr('src', '/manager/images/auditNo.png');
        }
	}else{
		$('.print').attr('disabled',true);
		$('.rightMap img').removeAttr("src");
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
	row.billsDate == "1970-01-01" ? "":row.billsDate;
	$("#billsHeaderForm,#gridFooter").writeJson2Dom(row);
	getStorage(row.sectionId);
    getContactAmount(row.contactsunitId);
	$("#prepaymentAmount").val($.formatFloat(row.prepaymentAmount,2));
	//商品明细数据
	$("#dataGrid").jqGrid("clearGridData");
	if(row.outStorageNumList.length>0){
		$.each(row.outStorageNumList,function(i,value){
			if(value.salesOutstrorageImDraftList!=null && value.salesOutstrorageImDraftList.length>0){
				 value.salesOutstrorageImDraftList=JSON.stringify(value.salesOutstrorageImDraftList);
			 }
			 if(isDraft==1){
				 dataGrid.addRowData(i+1,value);
				 allowEdit();
			 }else{
				 $("#dataGrid").jqGrid('addRowData', i+1,value, 'last' );
				 forbiddenEdit();
			 }

		});
	}
	//回显单据收付款金额
	echoPaymentWayGrid(row.salesBillsAccount);
}

//正式单据、草稿单据点击事件
$("#slideThree").click(function(){
	$(".slideThree").toggleClass("color7D5F50");
	if($('.slideThree').hasClass('color7D5F50')){
		$('.searchImei,.imeiImport').attr('disabled',false);
		$('.print').attr('disabled',true);
	}else{
		$('.searchImei,.imeiImport').attr('disabled',true);
        $('.print').attr('disabled',false);
	}
	if($("#slideThree").prop('checked')){//正式单据
		$('.rightMap img').attr('src','../images/guozhang.png');
	}else{
		$('.rightMap img').removeAttr("src");
	}
	initEvents();
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
	initEvents();
})

//禁止页面编辑,禁用选择按钮
function forbiddenEdit(){
	$("#dataGrid").setGridParam({cellEdit:false});
	$("#billsHeaderForm input[name='billsDate']").attr("readonly","readonly");
    $("#billsHeaderForm :button").hide()
	$(".btnHundred .orderImport").attr("disabled","disabled");
	$(".btnHundred .billImport").attr("disabled","disabled");
	$("#billsDiscount").attr("disabled","disabled");
	$("#dataGrid").setGridParam().hideCol("op");
	$("#dataGrid").setGridParam().showCol("reviewsNum");
	$("#dataGrid").setGridParam().showCol("reviewsAmount");
	$("#moveImeiButtonLeft").attr("disabled","disabled");
	$("#moveImeiButtonRight").attr("disabled","disabled");
	enableOrDisableNavBtn();
}

//允许页面编辑，允许选择按钮
function allowEdit(){
	$("#dataGrid").setGridParam({cellEdit:true});
	$("#billsHeaderForm input[name='billsDate']").removeAttr("readonly");
    $("#billsHeaderForm :button").show()
	$(".btnHundred .orderImport").removeAttr("disabled");
	$(".btnHundred .billImport").removeAttr("disabled");
	$("#billsDiscount").removeAttr("disabled");
	$("#dataGrid").setGridParam().showCol("op");
	$("#dataGrid").setGridParam().hideCol("reviewsNum");
	$("#dataGrid").setGridParam().hideCol("reviewsAmount");
	$("#moveImeiButtonLeft").removeAttr("disabled");
	$("#moveImeiButtonRight").removeAttr("disabled");
	enableOrDisableNavBtn();
}

//切换页面
function tooglePageStatus(){
	 if(isDraft==1){//草稿
		  $('.rightMap img').removeAttr("src");
		  allowEdit();
		  dataGrid.addKongRow();
	  }else{
		  $('.rightMap img').attr('src','../images/guozhang.png');
		  forbiddenEdit();
	  }
	 initEvents();
}


//打开添加状态
function openAddState(){
	dataGrid.clearDataGrid();
	dataGrid.addKongRow();
}
function initDataGrid(){
	var nullFormatter = function(cellvalue, options, rowObject) {
	    if(cellvalue === undefined || cellvalue === null ||cellvalue === 'null') {
	        cellvalue = '';
	    }
	    return cellvalue;
	}
	//配置
	var paras = {
	    gridId:'dataGrid',
	    addRow:{goodsId:'',goodsCode:'',goodsName:'',cxSectionId:'',stockNum:'',discountRate:100,imControlFlag:'',cxNum:'',cxDiscount:'',cxPrice:'',price:'',remark:''},
	    colNames:['是否赠品','仓库id','仓库名称','商品名称', '现存量','数量','单价','金额','商品备注',
			'类别','商品编码','品牌','型号','颜色','折扣率','折后金额','含税单价','含税金额','税率','税额','商品ID','ID'
			,'是否串号管理','串号列表','引入订单表id'],
	    colModel:
	    	[
             {name : 'giftFlag',index : 'giftFlag',align:'center',editable:true,sortable: false,edittype:'checkbox',width:'100px',formatter:formatterGiftFlag,
                 editoptions:{value:"√:",
            	 dataEvents: [{
	                    type: "change",
	                    fn: function(){
            		 	var idxData=$("#dataGrid").jqGrid("getRowData",$("#dataGrid").getGridParam("selrow"));
            		 	var ids=$("#dataGrid").jqGrid('getDataIDs');
            		 	if(ids.length>0){
            		 		for(var i=0;i<ids.length;i++){
            		 			if($("#"+(i+1)+"_giftFlag").attr('checked')=="checked"){
            		 				$("#"+paras.gridId).jqGrid('setCell',ids[i], "price", 0.00);
                                    $("#"+paras.gridId).jqGrid('setCell',ids[i], "amount", 0.00);
                            		$("#"+paras.gridId).jqGrid('setColProp','price',{'editable':false});
            		 			}else{
            		 				$("#"+paras.gridId).jqGrid('setColProp','price',{'editable':true});
            		 			}
            		 		}
            		 	}
                    		if(idxData.val=="√"){
                    			$("#"+paras.gridId).jqGrid('setCell', rowid, "price", 0.00);
                                $("#"+paras.gridId).jqGrid('setCell', rowid, "amount", 0.00);
                        		$("#"+paras.gridId).jqGrid('setColProp','price',{'editable':false});
                    		}else{
                    			$("#"+paras.gridId).jqGrid('setColProp','price',{'editable':true});
                    		}
                            MyEiditGrid.currEditDataGrid.unAllEdit();
		                }
	                }]
            	 }
				},
             {name : 'storageId',index : 'storageId',align:'left',sortable: false,hidden:true},
             {name : 'storageName' ,sortable: false,index : 'storageName',width:'200px',fixed:true,align:'left',
            	 editable:true,
            	 edittype:'custom',
            	 editoptions:{custom_element:my_inputxx, custom_value:my_valuexx}
             },
			{name : 'goodsName',sortable: false,index : 'goodsName',align:'left',edittype:'custom_bt_input'
				,custom_element_bt_click:"showGoodsModal",editable:true,width:'200px'},
                {name : 'stockNum',index : 'stockNum',align:'right',editable:false,sortable: false,formatter:'integer',width:'100px'},
                {name : 'goodsNumber',index : 'goodsNumber',align:'right',editable:true,sortable: false,formatter:'integer' ,width:'100px',
                    editoptions:{
                        dataEvents: [{
                            type: "focus",
                            fn: function(){
                                this.select()
                            }
                        }]
                    }
                },
                {name : 'price',index : 'price',align:'right',editable:true,editrules:{number:true},formatter:'number',sortable: false,width:'100px',
                    editoptions:{
                        dataEvents: [{
                            type: "focus",
                            fn: function(){
                                this.select()
                            }
                        }]
                    }
                },
                {name : 'amount',index : 'amount',align:'right',editable:false,editrules:{number:true},formatter:'number',sortable: false,width:'100px'},
                {name : 'remark',index : 'remark',align: 'left',hidden: false,editable:true,sortable: false,width:'200px',editoptions:{readonly:false,onblur:"gridCellOnBlur()"}},
             {name : 'categoryName',index : 'categoryName',align: 'left',editable:false,sortable: false,width:'100px'},
             {name : 'code',index : 'code',align: 'left',editable:false,sortable: false,width:'100px'},

             {name : 'brandName',index : 'brandName',align: 'left',formatter: nullFormatter,sortable: false,width:'100px'},
             {name : 'models',index : 'models',align: 'left',formatter: nullFormatter,sortable: false,width:'100px'},
             {name : 'color',index : 'color',align: 'left',formatter: nullFormatter,sortable: false,width:'100px'},

             {name : 'discountRate',index : 'discountRate',hidden: true,editable:false,editrules:{number:true},formatoptions: {suffix:"%"},formatter:'currency',sortable: false},
             {name : 'discountedAmount',index : 'discountedAmount',hidden: true,formatter:'number',sortable: false,editable:false},
             {name : 'taxPrice',index : 'taxPrice',formatter:'number',hidden: true,sortable: false,editable:false},
             {name : 'taxAmount',index : 'taxAmount',formatter:'number',hidden: true,sortable: false,editable:false},
             {name : 'taxRate',index : 'taxRate',hidden: true,editable:true,editrules:{number:true},formatoptions: {suffix:"%"},formatter:'currency',sortable: false},
             {name : 'taxLimit',index : 'taxLimit',hidden: true,formatter:'number',sortable: false,editable:false},

             {name : 'goodsId',index : 'goodsId',editable:true,sortable: false,hidden:true},
             {name : 'id',index : 'id',editable:true,sortable: false,hidden:true},
             {name : 'ifManageIMei',index : 'ifManageIMei',editable:false,sortable: false,hidden:true},
             {name : 'salesOutstrorageImDraftList',index : 'salesOutstrorageImDraftList',editable:true,sortable: false,hidden:true},
             {name : 'orderDetailId',index : 'orderDetailId',editable:true,sortable: false,hidden:true}
           ]
        ,shrinkToFit: false,

	};
	//回调函数
	var callBackList = {
		onCellSelect:function(rowid,iCol,cellcontent,e){
		var currRow = $("#dataGrid").jqGrid('getRowData', rowid);
        var curColName=$(e.target).attr('aria-describedby').replace(paras.gridId+'_','');
		  if(curColName=="price"){
			  var ids=$("#dataGrid").jqGrid('getDataIDs');
		 		if(ids.length>0){
		 			for(var i=0;i<ids.length;i++){
		 			if($("#"+(i+1)+"_giftFlag").attr('checked')=="checked"){
		 				$("#"+paras.gridId).jqGrid('setCell',ids[i], "price", 0.00);
                		$("#"+paras.gridId).jqGrid('setColProp','price',{'editable':false});
		 			}else if(currRow.giftFlag=="√"){
		 				$("#"+paras.gridId).jqGrid('setColProp','price',{'editable':false});
		 			}else{
		 				$("#"+paras.gridId).jqGrid('setColProp','price',{'editable':true});
		 			}
		 		}
		 	}

      	}
		  if(curColName=="giftFlag"){
			  var ids=$("#dataGrid").jqGrid('getDataIDs');
  		 		if(ids.length>0){
  		 			for(var i=0;i<ids.length;i++){
  		 			if($("#"+(i+1)+"_giftFlag").attr('checked')=="checked"){
  		 				$("#"+paras.gridId).jqGrid('setCell',ids[i], "price", 0.00);
                  		$("#"+paras.gridId).jqGrid('setColProp','price',{'editable':false});
  		 			}else{
  		 				$("#"+paras.gridId).jqGrid('setColProp','price',{'editable':true});
  		 			}
  		 		}
  		 	}

      	}
		    if(curColName=='goodsNumber'){//数量点击
		    	if(currRow.storageName == "" || currRow.goodsName == "" ){
		    		if(isDraft==1){
		    			 $.zxsaas_plus.showalert("提示","请先选择仓库和商品!");
			    		  $("#dataGrid").setColProp("goodsNumber",{editable:false});
			    		  return false;
		    		}
		    	  }

		    	if(currRow.ifManageIMei == "1" && currRow.goodsId != ""){
		    		  $("#dataGrid").setColProp("goodsNumber",{editable:false});
		    		  try {MyEiditGrid.currEditDataGrid.unAllEdit();} catch (e) {}
		    		  openInputImeiModal("dataGrid",rowid);
		    	  }else{
		    		  if(isDraft=="1"){
		    			  $("#dataGrid").setColProp("goodsNumber",{editable:true});
		    		  }else{
		    			  $("#dataGrid").setColProp("goodsNumber",{editable:false});
		    		  }
		    	 }
		    }

		    if(curColName=='storageName'){
		    	var sectionId=$("#billsHeaderForm input[name='sectionId']").val();
	    		if(sectionId==""){
	    			$("#"+paras.gridId).jqGrid('setColProp','storageName',{'editable':false});
	    			$.zxsaas_plus.showalert('提示','请先选择部门!');
	    			return false;
	    		}else{
	    			$("#"+paras.gridId).jqGrid('setColProp','storageName',{'editable':true});
	    		}
	    		getStorage(sectionId);
		    }
	    },
		afterEditCell:function(rowid,name,val,iRow,iCol){//开始编辑
	    	lastrow = iRow;
		    lastcell = iCol;
		    forbitPaste(rowid);
	    	if(name=='storageName'){//仓库名称
				$("#dataGrid #"+iRow+"_"+name).html("");
				for ( var int = 0; int < storageList.length; int++) {
					$("#dataGrid #"+iRow+"_"+name).append("<option sid='"+storageList[int].id+"' value='"+storageList[int].name+"'>"+storageList[int].name+"</option>");
				}
                var storageId=$("#dataGrid").jqGrid('getRowData',rowid).storageId;
				$("#dataGrid #"+iRow+"_"+name+" option[sid='"+storageId+"']").attr("selected",true);
				$("#"+paras.gridId).jqGrid('setCell', rowid ,"storageId" ,$("#dataGrid #"+iRow+"_"+name).children('option:selected').attr("sid"));
		    }
        },
        afterSaveCell:function(rowid,name,val,iRow,iCol){//保存编辑
        	var currRow = $("#dataGrid").jqGrid('getRowData', rowid);
        	if(name=='storageName' && currRow.goodsId!="" && currRow.storageId!=""){
        		var stockNum=getStorckNum(currRow.storageId,currRow.goodsId);
        		$("#"+paras.gridId).jqGrid('setCell', rowid ,"stockNum" ,stockNum);
        	}


        	if(name=="giftFlag"){
        		if(val=="√"){
        			$("#"+paras.gridId).jqGrid('setCell', rowid, "price", 0.00);
            		$("#"+paras.gridId).jqGrid('setColProp','price',{'editable':false});
        		}else{
        			$("#"+paras.gridId).jqGrid('setColProp','price',{'editable':true});
        		}

        	}
        	if(name == 'goodsNumber' && currRow.ifManageIMei =="0" && currRow.storageName!= "" && currRow.goodsName!= ""){
        		if($.parseInt(val) > $.parseInt(currRow.stockNum)){
        			//输入数量小于现库存
        			$.zxsaas_plus.showalert('提示','数量不能大于现库存');
        			$("#"+paras.gridId).jqGrid('setCell', rowid ,"goodsNumber" ,currRow.stockNum);
        		}
        	}
        },
		beforeEditCell:function(rowid,cellname,v,iRow,iCol){
			lastrow = iRow;
			lastcell = iCol;
		},
        summary:function(rowid,name,val,iRow,iCol){//统计处理
        	summary();
        },
        afterInsertRow: function (rowid, rowdata) {
            //这里需要推迟执行，需要先执行表格的进入不可编辑状态
            setTimeout(function () {
                //添加一行之后，需要把上一个行的仓库也带到本行中 , 这里可能是订单引入，订单引入，这里不需要（把上一个行的仓库也带到本行中）；
                if (rowid > 0) {
                    var prevRowData = dataGrid.$grid.jqGrid('getRowData', rowid - 1);
                    var curRowData = dataGrid.$grid.jqGrid('getRowData', rowid);
                    if (prevRowData.storageId != "" && curRowData.storageId == "") {
                        dataGrid.$grid.jqGrid('setCell', rowid, 'storageId', prevRowData.storageId);
                        dataGrid.$grid.jqGrid('setCell', rowid, 'storageName', prevRowData.storageName);
                    }
                }
            }, 0)
        },
        getGridDataList:function(rows){
        	 //筛出不合格行
        	return $.map(rows,function(rowData){
        		if(rowData.goodsNumber!=0){
    				if(rowData.giftFlag=="√"){
    					rowData.giftFlag=1;
    				}else{
    					rowData.giftFlag=0;
    				}
    				delete rowData["op"];
    				delete rowData["storageName"];
    				delete rowData["stockNum"];
    				delete rowData["ifManageIMei"];
    				deleteRelateGoodsColumn(rowData);
    				if(rowData.salesOutstrorageImDraftList=="" || rowData.salesOutstrorageImDraftList==null){
    					delete rowData["salesOutstrorageImDraftList"];
    				}else{
    					if(! jQuery.isArray(rowData.salesOutstrorageImDraftList)){
    						rowData.salesOutstrorageImDraftList=JSON.parse(rowData.salesOutstrorageImDraftList);
    					}
    				}
    				return rowData;
    			}
        	});
        }
	};
	dataGrid = new MyEiditGrid(paras,callBackList);

	 function my_inputxx(value, options) {
	        var html =  '<select class="form-control" onchange="changeStorckNum(this.id)"></select>';
	        var em = $(html);
	        em.change(function(){
	         	$("#"+paras.gridId).jqGrid('setCell', options.rowId ,"storageId",em.children('option:selected').attr("sid"));
	        });
	  	    return em;
	 }
	function my_valuexx(value) {
		return value.val();
	}
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
			url:'/manager/salesOut/delete/'+id,
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
    try {
        MyEiditGrid.currEditDataGrid.unAllEdit();
    } catch (e) {
    }
    $("#billsHeaderForm").data('bootstrapValidator').resetForm();
	$("#billsHeaderForm").data('bootstrapValidator').validate();
	if(!($("#billsHeaderForm").data('bootstrapValidator').isValid())){
		refreshValidator("#billsHeaderForm");
		return;
	}
	// $('#dataGrid').jqGrid("saveCell",lastrow,lastcell);
	if($("input[name='managerUname']").val()==""){
		$.MsgBox('提示','经手人不能为空');
		return;
	}
	//判断数量是否为0
	var tableid=$('#dataGrid').getCol('goodsNumber');
	var tableid2=$('#dataGrid').getCol('stockNum');
	var tableid3=$('#dataGrid').getCol('price');

    for(var i=0;i<tableid.length;i++){
        if((tableid[i]<0 || tableid[i]==0) && isDraft==1){
            $.MsgBox('提示','数量不可小于或等于0');
            return;
        }
    }
    for(var i=0;i<tableid2.length;i++){
        if((tableid2[i]<0 || tableid2[i]==0) && isDraft==1){
            $.MsgBox('提示','现存量不可小于或等于0');
            return;
        }
    }
	var isHasZero=false
    for(var i=0;i<tableid3.length;i++){
        if(Number(tableid3[i])<0){
            $.MsgBox('提示','单价不能小于0！');
            return;
        }else if(Number(tableid3[i])==0 ){
            isHasZero=true
		}
    }
    if(tableid3<0 ){
        $.MsgBox('提示','单价不能小于0！');
        return;
    }

		var param=getSaveParam();
    if (isDraft==0) {
        var detailList=[];
        for(var i=0;i<param.salesOutstrorageNumDraft.length;i++){
            var detailItem=param.salesOutstrorageNumDraft[i];
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
        for (var int = 0; int < param.salesOutstrorageNumDraft.length; int++) {
            if (param.salesOutstrorageNumDraft[int].giftFlag==0&&$.parseFloat(param.salesOutstrorageNumDraft[int].price) == 0) {
                flag = true
            }
        }
        if(flag==true){
            $.zxsaas_plus.showconfirm('提示','单据中存在不是赠品,价格为0的商品，是否确认保存',function () {
                saveSales()
            },function () {
                return;
            })
        }else{
            saveSales()
        }
        function saveSales(){
        $.ajaxPackage({
            dataType: "json",
            contentType :'application/json',
            url: '/manager/salesOut/save',
            data: JSON.stringify(param),
			success: function (data) {
                if (data.result == 1) {
                	if (data.data.message != "") {
                		$.zxsaas_plus.showalert("提示", '保存成功!<br>' + data.data.message);
                	}else{
                		$.zxsaas_plus.showalert("success", '保存成功');
                	}
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
	if(param.salesOutstrorageNumDraft==undefined  || param.salesOutstrorageNumDraft=="" || param.salesOutstrorageNumDraft.length==0){
		$.zxsaas_plus.showalert("提示","明细数量不能为零!");
		flag=true;
		return flag;
	}
	var weishouAmount=$("#weishouAmount").val().replace(/\,/g, "");
	if(Number(weishouAmount)<0){
		var amountName=$("#weishouAmounSpan").html().substring(0, 4);
		$.zxsaas_plus.showalert("提示",amountName+"不能为小于零!");
		flag=true;
		return flag;
	}
}

//获取保存参数
function getSaveParam(){
	var param={};
	//单据表头
	param=$("#billsHeaderForm").toJsonObject();
	param.billsDate=$("#billsDate").val();
	param.billsStatus=1;
	param.billsType=type;//销售单
	param.billsAmount=parseFloat($("#dataGrid").getCol('taxAmount',false,'sum'));
	param.discountedAmount=parseFloat($("#dataGrid").getCol('discountedAmount',false,'sum'));
	param.billsDiscount=parseFloat($("#billsDiscount").val());
	param.prepaymentAmount=$("#prepaymentAmount").val().replace(/\,/g, "");
	delete param.managerUname;
	delete param.contactUnitName;
	delete param.yingshouAmount;
	delete param.yushouAmount;
	delete param.sectionName;
	delete param.billsCode;
    delete param.auditStatus;

		//收付款主表草稿表数据
		var paymentParam={};
		paymentParam.managersUid=param.managerUid;
		paymentParam.sectionId=param.sectionId;
		paymentParam.contactsunitId=param.contactsunitId;
		paymentParam.billsDate=param.billsDate;
		paymentParam.type=type;//销售单
		paymentParam.refMainTable="I_SALES_MAIN_DRAFT";
		paymentParam.amount=$("#prepaymentAmount").val().replace(/\,/g, "");
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

	//获取商品明细数据
	var goodsDetailList=dataGrid.getGridDataList();
	if(goodsDetailList.length>0){
		param.salesOutstrorageNumDraft=$.extend(true,[],goodsDetailList);
		//删除多余的字段
		for(var i =0;i<param.salesOutstrorageNumDraft.length;i++){
			var list=param.salesOutstrorageNumDraft[i].salesOutstrorageImDraftList;
			if(list !== undefined){
				for(var j =0;j<list.length;j++){
					var item=list[j];
					delete item.groupId
					delete item.companyId
				}
			}
		}

	}
	return param;
}

//付款方式保存按钮单击事件
function savePaymentWay(){
	var payreceiptAmout=$.formatFloat($("#paymentWayModalGrid").getCol('payreceiptAmout',false,'sum'),2);
	$("#prepaymentAmount").val(payreceiptAmout);
    summaryBiaoJiao();
}

function addBills(){
	if( !$('#slideThree').is(':checked')){
		$.zxsaas_plus.showconfirm("提示","当前数据未保存，是否新增?",function(){
            location.href =location.href.substring(0,location.href.indexOf('?'));
		},function(){

		});
	}else{
        location.href =location.href.substring(0,location.href.indexOf('?'));
	}
}

//新增按钮点击事件
function addBtnClick(){
		addFlag=true;
		getAuthList(initDealDate);
		addOpenState();
		if($(".slideThree").attr("class") != "slideThree color7D5F50"){
			$(".slideThree").toggleClass("color7D5F50");
			$('.searchImei,.imeiImport').attr('disabled',false);
		}
		$("#storageId").val("");
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
		/*$("#slideThree").click();*/
	}
	tooglePageStatus();
	summary();

}

//情况页面数据
function clearPageData(){

	$("#billsHeaderForm input").val("");
	$("#gridFooter")[0].reset();
	$("#prepaymentAmount").val("0.00");
	$("#dataGrid").jqGrid('clearGridData');
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
    	var currRow = dataGrid.$grid.jqGrid('getRowData', value);

    	var goodsNumber = $.parseInt(currRow.goodsNumber);//数量
    	var amount = $.parseFloat(currRow.price)*goodsNumber; //金额
    	var discountRate = $.parseFloat(currRow.discountRate)/100; //折扣率
    	var discountPrice = $.parseFloat(currRow.price)*($.parseFloat(currRow.discountRate)/100); //折扣单价
    	//var discountAmount = discountRate * amount;//折扣金额
    	var discountedAmount = discountPrice * goodsNumber; //折后金额

    	//税率录入
    	var taxRate =  $.parseFloat(currRow.taxRate)/100;//税率
    	var taxPrice = discountPrice * taxRate + discountPrice;//含税单价
    	var taxAmount = taxPrice * goodsNumber;
    	var taxLimit = (taxPrice - discountPrice)*goodsNumber;

    	dataGrid.$grid.jqGrid('setCell', value ,"amount" ,amount);
    	dataGrid.$grid.jqGrid('setCell', value ,"discountedAmount" ,discountedAmount);
    	dataGrid.$grid.jqGrid('setCell', value ,"taxPrice" ,taxPrice);
    	dataGrid.$grid.jqGrid('setCell', value ,"taxAmount" ,taxAmount);
    	dataGrid.$grid.jqGrid('setCell', value ,"taxLimit" ,taxLimit);

        //添加串号图标
        if(currRow.ifManageIMei==1){
            //添加串号这个图标
            dataGrid.$grid.jqGrid('setCell', value, "goodsNumber", '', 'ifManageImeiIcon');
        }else{
            $("#dataGrid#" +  value + "  td[aria-describedby='dataGrid_goodsNumber']").removeClass('ifManageImeiIcon')
        }

    });

	//汇总
	var sumGoodsNumber = dataGrid.$grid.getCol('goodsNumber', false, 'sum');
	var sumAmount = dataGrid.$grid.getCol('taxAmount', false, 'sum');
	var sumDiscountedAmount = dataGrid.$grid.getCol('discountedAmount', false, 'sum');
    var amount = dataGrid.$grid.getCol('amount', false, 'sum').toFixed(2);
	dataGrid.$grid.footerData("set",{index:"合计",goodsNumber:sumGoodsNumber,taxAmount:sumAmount,discountedAmount:sumDiscountedAmount,amount:amount});

	summaryBiaoJiao();
}


//表角金额统计  应收金额==含税金额合计-整单折扣     未收金额=应收金额-收款金额
function summaryBiaoJiao(){
	var footerRow = $("#dataGrid").footerData("get");
	var taxAmount = parseFloat(footerRow.taxAmount.replace(/\,/g, ""));
	var prepaymentAmount = parseFloat($("#prepaymentAmount").val().replace(/\,/g, ""));
	var billsDiscount =  parseFloat($("input[name='billsDiscount']").val().replace(/\,/g, ""));
	if(isNaN(billsDiscount)){
		billsDiscount = 0;
		//$("input[name='billsDiscount']").val(0);
	}
	var yingshouAmount=parseFloat(taxAmount).toFixed(2);
	$("#gridFooter input[name='yingshouAmount']").val(yingshouAmount);
	var weishouAmount=parseFloat(yingshouAmount-prepaymentAmount-billsDiscount).toFixed(2);
	$("#gridFooter input[name='weishouAmount']").val(weishouAmount);
}
//整单折扣输入校验
$("#billsDiscount").bind("input propertychange",function(){
	clearNoNum(event,this);
	summaryBiaoJiao();
});

$("#billsDiscount").blur(function(){
	verifyNum(this);
	summaryBiaoJiao();
});

//明细仓库名称下拉框改变事件
function changeStorckNum(obj){
	var rowid=$('#'+obj).closest('tr').attr('id');
	var storageId=$("#dataGrid").jqGrid('getRowData',rowid).storageId;
	$("#dataGrid").jqGrid('setCell', rowid ,"storageId" ,storageId);
	$("#dataGrid").jqGrid('setCell', rowid ,"salesOutstrorageImDraftList" ,[]);
    var dataRow = {
        "code":'',
        "categoryName":'',
        "brandName":'',
        "models":'',
        "color":'',
        "goodsId":'',
        "goodsName":'',
        "ifManageIMei":'',
        "ifEnableAuxliaryImei":'',
        "imeiLength":'',
        "auxliaryImeiLength":'',
        "taxRate":'',
        "stockNum":'',
        "goodsNumber":'',
    }
    $("#dataGrid").jqGrid('setRowData', rowid, dataRow, {});
}

//格式化是否赠品
function formatterGiftFlag(cellvalue, options, rowObjec){
	if(cellvalue==1 || cellvalue=="√"){
		return "√";
	}else{
		return "";
	}
}

//验证不能为负数金额
$(document).on('blur','#billsDiscount',function(){
	var $m=$('#weishouAmount').val();
	if($m<0){
		$.MsgBox("提示","未付款金额不能小于0")
	}
})

//bootstrap验证规范
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

/*收款方式表格调整*/
$(document).on("shown.bs.modal","#paymentWay",function(){
	$("#paymentWayModalGrid").setGridWidth($(this).find(".details").width());
})
