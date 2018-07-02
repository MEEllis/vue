var type=21;//销售退货单
var billsType=21;//销售退货单
var pageIndex=0;
var total=1;//总记录数
var isDraft=0;// 0正式单据 ,1草稿单据
var addFlag=true;//页面是否是新增状态
var billsStatus=0;//单据状态 6.已过账，6已红冲
var options = {
    LoadBtnUrl: "../../json/button.json", // 按钮工具栏加载地址
    TableName: "#dataGrid", // 显示表格名称。遵照css选择器书写
};
var menuBtn=null;
$('.print').attr('disabled',true);
$(function(){
    initOutImei()
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
                    window.parent.openWorkBoxByMenutext("批发退货单单据列表",  '/manager/inventory/sales/historyMain?billsType='+billsType, true);
                }
            }
        }
    };
    menuBtn = new componentMenuBtn("#MenuTool", option);
}
//重载菜单组件
function reloadMenuBtn() {
    var isDraftOp=!$("#slideThree").is(':checked')
    var updateKey=['print','printDropdown','red','copy','update','audit','auditCancle'];
    var addkey=['draftPost','draftDel','draftSave'];
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
    $("#outImeiWrap").comImeiOutModal('isDisable',!isDraftOp)
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
		url:"../salesRefund/selectList/"+pageIndex,
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
				  getStorage(data.data.rows[0].sectionId);
				  fillPageData(data.data.rows[0]);
				  //报表---勿删
//				  $("#slideThree").prop('checked',isDraft=="1"?false:true);
				  
				  $("#billsHeaderForm").data('bootstrapValidator').resetForm();
			  }else{
				  if(isDraft=="1"){
					  addOpenState();
				  }else{
					 forbiddenEdit();
				  }
				  $.zxsaas_plus.showalert("提示","没有查询到单据!");
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
	$(options.TableName).jqGrid("clearGridData");
	if(row.salesInstrorageNumList.length>0){
		$.each(row.salesInstrorageNumList,function(i,value){
			var addIndex=i+1;
			if(value.salesInstrorageImDraftList!=null && value.salesInstrorageImDraftList.length>0){
				 value.salesInstrorageImDraftList=JSON.stringify(value.salesInstrorageImDraftList);
			 }

			 if(isDraft==1){
				 dataGrid.addRowData(addIndex,value);
				 allowEdit();
			 }else{
				 $(options.TableName).jqGrid('addRowData',addIndex,value, 'last' );
				 forbiddenEdit();
			 }
            //添加串号图标
			 if(value.ifManageIMei==1){
                 $(options.TableName).jqGrid('setCell', addIndex, "goodsNumber", '', 'ifManageImeiIcon');
			 }
		});
	}
	//回显单据收付款金额
	echoPaymentWayGrid(row.salesBillsAccount);
}

//正式单据、草稿单据点击事件
$("#slideThree").click(function(){
	$(".slideThree").toggleClass("color7D5F50");
	if($("#slideThree").prop('checked')){//正式单据
		$('.rightMap img').attr('src','../images/guozhang.png');
        $('.print').attr('disabled',false);
	}else{
		$('.rightMap img').removeAttr("src");
        $('.print').attr('disabled',true);
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
	$("#dataGrid3").setGridParam({cellEdit:false});
	$("#billsHeaderForm input[name='billsDate']").attr("readonly","readonly");
	$("#billsHeaderForm :button").hide;
	$("#billsDiscount").attr("disabled","disabled");
	$("#dataGrid").setGridParam().hideCol("op");
	$("#dataGrid").setGridParam().showCol("reviewsNum");
	$("#dataGrid").setGridParam().showCol("reviewsAmount");
	$(".btnHundred .delete").attr("disabled","disabled");
	$(".btnHundred .billsImport").attr("disabled","disabled");
}

//允许页面编辑，允许选择按钮
function allowEdit(){
	$("#dataGrid").setGridParam({cellEdit:true});
	$("#dataGrid3").setGridParam({cellEdit:true});
	$("#billsHeaderForm input[name='billsDate']").removeAttr("readonly");
	$("#billsHeaderForm :button").show();
	$(".btnHundred .delete").removeAttr("disabled");
	$("#dataGrid").setGridParam().showCol("op");
	$("#dataGrid").setGridParam().hideCol("reviewsNum");
	$("#dataGrid").setGridParam().hideCol("reviewsAmount");
	$(".btnHundred .billsImport").removeAttr("disabled");
	$("#billsDiscount").removeAttr("disabled");
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


var lastsel="";
var lastrow="";
var lastcell="";
//初始化表格(折扣率默认100%)
var dataGrid = null;
function initDataGrid(){
	//配置
	var paras = {
	    gridId:'dataGrid', 
	    addRow:{goodsId:'',goodsCode:'',goodsName:'',cxSectionId:'',stockNum:'',discountRate:100,numControlFlag:'',imControlFlag:'',cxNum:'',cxDiscount:'',cxPrice:'',price:'',remark:''},
	    colNames:['是否赠品','仓库id','仓库名称','商品名称','数量','单价','金额','商品备注','入库总成本','类别','商品编码','品牌','型号','颜色','折扣率','折后金额','含税单价',
			'含税金额','税率','税额','商品ID','ID','是否串号管理','是否辅助串号管理','串号长度','辅助串号长度','串号列表','引入订单表id'],
	    colModel:
	    	[ 
             {name : 'giftFlag',index : 'giftFlag',align:'center',editable:true,sortable: false,edittype:'checkbox',width:'100px', editoptions:{value:"√:"},formatter:formatterGiftFlag,
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
                 }},
             {name : 'storageId',index : 'storageId',align:'left',sortable: false,hidden: true}, 
             {name : 'storageName' ,sortable: false,index : 'storageName',width:'90px',fixed:true,align:'left',
            	 editable:true,
            	 edittype:'custom',
            	 editoptions:{custom_element:my_inputxx, custom_value:my_valuexx},width:'200px'
             },
                {name : 'goodsName',sortable: false,index : 'goodsName',align:'left',edittype:'custom_bt_input',
                    custom_element_bt_click:"showGoodsModal",editable:true,width:'200px'},

                {name : 'goodsNumber',index : 'goodsNumber',align:'right',editable:true,sortable: false,formatter:'integer',
                    editoptions:{
                        dataEvents: [{
                            type: "focus",
                            fn: function(){
                                this.select()
                            }
                        }]
                    },width:'100px'
                },
                {name : 'price',index : 'price',align:'right',editable:true,editrules:{number:true},formatter:'number',sortable: false,
                    editoptions:{
                        dataEvents: [{
                            type: "focus",
                            fn: function(){
                                this.select()
                            }
                        }]
                    },width:'100px'
                },
                {name : 'amount',index : 'amount',align:'right',editable:false,editrules:{number:true},formatter:'number',sortable: false,width:'100px'},
                {name : 'remark',index : 'remark',align:'left',hidden: false,align:'left',editable:true,sortable: false, width:'200px'},
                {name : 'costPrice',index : 'costPrice',align:'right',editable:true,editrules:{number:true},formatter:'number',sortable: false,
                    editoptions:{
                        dataEvents: [{
                            type: "focus",
                            fn: function(){
                                this.select()
                            }
                        }]
                    },width:'100px'
                },
                {name : 'categoryName',align:'left',index : 'categoryName',editable:false,sortable: false,width:'100px'},
             {name : 'code',index : 'code',align:'left',editable:false,sortable: false,width:'100px'},

             {name : 'brandName',index : 'brandName',align:'left',editable:false,sortable: false,width:'100px'},
             {name : 'models',index : 'models',align:'left',editable:false,sortable: false,width:'100px'},
             {name : 'color',index : 'color',align:'left',editable:false,sortable: false,width:'100px'},


             {name : 'discountRate',index : 'discountRate',hidden: true,editable:true,editrules:{number:true},formatoptions: {suffix:"%"},formatter:'currency',sortable: false},
             {name : 'discountedAmount',index : 'discountedAmount',hidden: true,formatter:'number',sortable: false,editable:false},
             {name : 'taxPrice',index : 'taxPrice',hidden: true,formatter:'number',sortable: false,editable:false},
             {name : 'taxAmount',index : 'taxAmount',hidden: true,formatter:'number',sortable: false,editable:false},
             {name : 'taxRate',index : 'taxRate',hidden: true,editable:true,editrules:{number:true},formatoptions: {suffix:"%"},formatter:'currency',sortable: false},
             {name : 'taxLimit',index : 'taxLimit',hidden: true,formatter:'number',sortable: false,editable:false},


             {name : 'goodsId',index : 'goodsId',editable:true,sortable: false,hidden:true},
             {name : 'id',index : 'id',editable:true,sortable: false,hidden: true},
             {name : 'ifManageIMei',index : 'ifManageIMei',editable:false,sortable: false,hidden: true},
             {name : 'ifEnableAuxliaryImei',index : 'ifEnableAuxliaryImei',sortable: false,hidden: true},
             {name : 'imeiLength',index : 'imeiLength',hidden: true},
             {name : 'auxliaryImeiLength',index : 'auxliaryImeiLength',hidden: true},
             {name : 'salesInstrorageImDraftList',index : 'salesInstrorageImDraftList',editable:true,sortable: false,hidden: true},
             {name : 'orderDetailId',index : 'orderDetailId',editable:true,sortable: false,hidden: true}
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
		  if(curColName=="storageName"){
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
		    if(curColName=='storageName'){
		    	var sectionId=$("#billsHeaderForm input[name='sectionId']").val();
				getStorage(sectionId);
		    }
		    if(curColName=='goodsNumber'){//数量点击
		    	if(currRow.storageName == "" || currRow.goodsName == "" ){
		    		if(isDraft==1){
		    			 $.zxsaas_plus.showalert("提示","请先选择仓库和商品!");
			    		  $("#dataGrid").setColProp("goodsNumber",{editable:false});
			    		  return false;
		    		}
		    	  }
		    	//判断是否数量录入 并判断是否串号管理
		    	if(currRow.ifManageIMei == "1" && currRow.goodsId != ""){
		    		  $("#dataGrid").setColProp("goodsNumber",{editable:false});
                    $("#dataGrid").setColProp("costPrice",{editable:false});
                    openImeiInputModalEllis("dataGrid",rowid);//打开输入框
		    	  }else{
		    		  $("#dataGrid").setColProp("goodsNumber",{editable:true});
                    $("#dataGrid").setColProp("costPrice",{editable:true});
		    	 }
		    }
		    if(curColName=='costPrice'){//入库成本
		    	//判断是否数量录入 并判断是否串号管理
		    	if(currRow.ifManageIMei == "1" && currRow.goodsId != ""){
		    		  $("#dataGrid").setColProp("costPrice",{editable:false});
		    		  openImeiInputModal("dataGrid",rowid);//打开输入框	
		    	  }else{
		    		  $("#dataGrid").setColProp("costPrice",{editable:true});
		    	 }
		    }
		    
		    if(iCol==4){
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
//		    if(iCol==7){
//	      		if(currRow.giftFlag=="√"){
//	          		$("#"+paras.gridId).jqGrid('setColProp','price',{'editable':false});
//	      		}else{
//	      			$("#"+paras.gridId).jqGrid('setColProp','price',{'editable':true});
//	      		}
//	      		
//	      	}
		    
	    },
		afterEditCell:function(rowid,name,val,iRow,iCol){//开始编辑
	    	lastrow = iRow;
		    lastcell = iCol;
		    forbitPaste(rowid);
	    	if(iCol==4){//仓库名称
				$("#dataGrid #"+iRow+"_"+name).html("");
				for ( var int = 0; int < storageList.length; int++) {
					$("#dataGrid #"+iRow+"_"+name).append("<option sid='"+storageList[int].id+"' value='"+storageList[int].name+"'>"+storageList[int].name+"</option>");
				}
				$("#dataGrid #"+iRow+"_"+name+" option[value='"+val+"']").attr("selected",true);
				$("#"+paras.gridId).jqGrid('setCell', rowid ,"storageId" ,$("#dataGrid #"+iRow+"_"+name).children('option:selected').attr("sid"));
		    }
        },
        afterSaveCell:function(rowid,name,val,iRow,iCol){//保存编辑
        	var currRow = $("#dataGrid").jqGrid('getRowData', rowid);
        	if(iCol=="2"){
        		if(val=="√"){
        			$("#"+paras.gridId).jqGrid('setCell', rowid, "price", 0.00);
            		$("#"+paras.gridId).jqGrid('setColProp','price',{'editable':false});
        		}else{
        			$("#"+paras.gridId).jqGrid('setColProp','price',{'editable':true});
        		}
        	}
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
        	
        }
	};
	dataGrid = new MyEiditGrid(paras,callBackList);
	
	 function my_inputxx(value, options) {
	        var html =  '<select class="form-control" onchange="changeStorckNum(this.id)"></select>';
	        var em = $(html);
	        em.change(function(){
	        	$("#"+paras.gridId).jqGrid('setCell', options.rowId ,"storageId",em.children('option:selected').attr("sid"));
	        });
	        changeStorckNum(options.id);
	  	    return em;             
	      }
	  	function my_valuexx(value) {
	  		changeStorckNum(lastrow+"_"+"11");
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
			url:'/manager/salesRefund/delete/'+id,
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

    var param=getSaveParam();
    if (isDraft==0) {
        var detailList=[];
        for(var i=0;i<param.salesInstrorageNumDraftList.length;i++){
            var detailItem=param.salesInstrorageNumDraftList[i];
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
                    param.isDraft=isDraft;
                    param.id=dataParam.billsId;
                    pageAjax(param);
                }else{
                    $.zxsaas_plus.showalert("错误",data.desc);
                }
            }
        });
        return;
    }
    else {
        var $m=$('#weishouAmount').val();
        if($m<0){
            $.zxsaas_plus.showalert("提示","未付金额不能为负数!");
            return;
        }
        if($("input[name='managerUname']").val()==""){
            $.MsgBox('提示','经手人不能为空');
            return;
        }
        //判断数量是否为0
        var $a=$('#dataGrid').getCol('goodsNumber');
        for(var i=0;i<$a.length;i++){
            if(parseInt($a[i])<0 || parseInt($a[i])==0){
                $.MsgBox('提示','数量不可小于或等于0');
                return;
            }
        }
        //判断入库成本是否为0
        var $n=$('#dataGrid').getCol('costPrice');//入库成本
        var $var=[];
        for(var i=0;$n.length>i;i++){
            if(parseFloat($n[i])==0){
                $var.push($n[i]);
            }
        }
        //判断价格是否为0
        var $p=$('#dataGrid').getCol('price');
        var flag=false;
        for (var int = 0; int < $p.length; int++) {
            if ($.parseFloat($p[int]) == 0) {
                flag = true
            }
        }
        var checkResult=checkSaveParam(param);
        if(checkResult){
            return;
        }

        if($var.length>0){
            $.MsgBox("提示","有商品存在入库成本为0，是否继续保存!",function(){
                saveReturn()
            },function(){

            });
        }
        else{
            saveReturn()
        }
        function saveReturn(){
            if(flag==true){
                $.zxsaas_plus.showconfirm('提示','单据中存在价格为0的商品，是否确认保存',function () {
                    validateExist()
                },function () {
                    return;
                })
            }else{
                validateExist()
            }
        }
        function validateExist() {
            var queryKey = '';
            for (var i = 0; i < param.salesInstrorageNumDraftList.length; i++) {
                var detailItem =param.salesInstrorageNumDraftList[i];
                if ($.isArray(detailItem.salesInstrorageImDraftList)) {
                    for (var j = 0; j < detailItem.salesInstrorageImDraftList.length; j++) {
                        var itemItem = detailItem.salesInstrorageImDraftList[j];
                        var itemStr = itemItem.imei;
                        if ($.trim(itemItem.auxiliaryImei) != '') {
                            itemStr += ',' + itemItem.auxiliaryImei;
                        }
                        queryKey += itemStr + ';'
                    }
                }
            }
            if (queryKey != '') {
                queryKey = queryKey.substr(0, queryKey.length - 1);
                $.validateImeiExisting({
                    queryKey: queryKey,
                    menuCode: $('#AUTH').data('code'),
                    sectionId: param.sectionId,
                    save: function () {
                        validateIsSave(param,function (addData) {
                            addDraftBill(addData)
                        });
                    }
                })
            } else {
                validateIsSave(param,function (addData) {
                    addDraftBill(addData)
                });
            }
        }
        function addDraftBill(addData) {
            $.ajaxPackage({
                url: '/manager/salesRefund/save',
                data:addData,
                contentType :'application/json',
                success: function (data) {
                    if (data.result == 1) {
                        $.zxsaas_plus.showalert("success", '保存成功');
                        var param = {};
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
	if(param.salesInstrorageNumDraftList=="" || param.salesInstrorageNumDraftList.length==0){
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
	param.billsDate=$("#billsDate").val()
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
				row.payreceiptAmout=row.payreceiptAmout.replace(/\,/g, "");
				payreceiptDetailDraftData.push(row);
			 }
		 });
		param.payreceiptDetailDraftData=payreceiptDetailDraftData;
	
	//获取商品明细数据
	var ids=$("#dataGrid").getDataIDs();
	if(ids.length>0){
		var salesInstrorageNumDraftList=new Array();
		$.each(ids,function(i,value){
			var rowData = $("#dataGrid").jqGrid('getRowData', value);
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
				delete rowData["ifEnableAuxliaryImei"];
				delete rowData["imeiLength"];
				delete rowData["auxliaryImeiLength"];
				if(rowData.salesInstrorageImDraftList=="" || rowData.salesInstrorageImDraftList==null || rowData.salesInstrorageImDraftList==undefined){
					delete rowData["salesInstrorageImDraftList"];
				}else{
					if(! jQuery.isArray(rowData.salesInstrorageImDraftList)){
						rowData.salesInstrorageImDraftList=JSON.parse(rowData.salesInstrorageImDraftList);
					}
				}
				deleteRelateGoodsColumn(rowData);
				salesInstrorageNumDraftList.push(rowData);
			}
		});
		
		if(salesInstrorageNumDraftList.length>0){
			param.salesInstrorageNumDraftList=salesInstrorageNumDraftList;
		}else{
			$.zxsaas_plus.showalert("提示","商品数量不能为零!");
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
	if(!$('#slideThree').is(':checked')){
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
	clearPageData();
	getAuthList(initDealDate);
	addOpenState();
	if($(".slideThree").attr("class") != "slideThree color7D5F50"){
		$(".slideThree").toggleClass("color7D5F50");
	}
	$("#storageId").val("");
	enableOrDisableNavBtn();
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
	enableOrDisableNavBtn();
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
    var amount = dataGrid.$grid.getCol('amount', false, 'sum').toFixed(2);
    var costPrice = dataGrid.$grid.getCol('costPrice', false, 'sum').toFixed(2);
	dataGrid.$grid.footerData("set",{index:"合计",goodsNumber:sumGoodsNumber,taxAmount:sumAmount,amount:amount,costPrice:costPrice});
	
	summaryBiaoJiao();
}

//表角金额统计  应收金额==含税金额合计     未收金额=应收金额-收款金额-整单折扣
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
	var rowid=obj.split("_")[0];
	var storageId=$("#dataGrid").jqGrid('getRowData',rowid).storageId;
	var currRow = $(options.TableName).jqGrid('getRowData',rowid);
	$("#dataGrid").jqGrid('setCell', rowid ,"storageId" ,storageId);
	if(currRow.goodsId!="" && storageId!=""){
		var stockNum=getStorckNum(storageId,currRow.goodsId);
		$("#dataGrid").jqGrid('setCell', rowid ,"stockNum" ,stockNum);
	}
}

//格式化是否赠品
function formatterGiftFlag(cellvalue, options, rowObjec){
	if(cellvalue==1 || cellvalue=="√"){
		return "√"
	}else{
		return "";
	}
}


//验证不可为负数
$(document).on('blur','#billsDiscount',function(){
	var $m=$('#weishouAmount').val();
	if($m<0){
		$.zxsaas_plus.showalert("提示","未付金额不能为负数!");
	}
})


//验证bootstrap规范
function refreshValidator(formId){
	$(formId).data('bootstrapValidator').resetForm();
	$(formId).data('bootstrapValidator').validate();  
}
/*billsHeaderForm   */
function refreshValidatorField(fieldName,formId){
	$(formId).data('bootstrapValidator')  
    .updateStatus(fieldName, 'NOT_VALIDATED',null)  
     .validateField(fieldName); 
}

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





