var type=20;//销售换货单
var billsType=20;//销售换货单
var pageIndex=0;
var total=1;//总记录数
var isDraft=0;// 0正式单据 ,1草稿单据
var billsStatus=0;//单据状态 6.已过账，6已红冲
var addFlag=true;//页面是否是新增状态
var options = {
    LoadBtnUrl: "../../json/button.json", // 按钮工具栏加载地址
    TableName: "#dataGrid", // 显示表格名称。遵照css选择器书写
};
$('.print').attr('disabled',true);
$(function(){
    initOutImei()
    initMenuBtn()
	initDataGrid();
	initDataGrid2();
	initEvents();
	addBtnClick();
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
	imeiDr() //串号导入
	
	$('.imeiImport').click(function(){
		var sectionId = $('#sectionId').val();
		if(sectionId == ""){
			$.zxsaas_plus.showalert('提示','请选择部门');
		}else{
			$('#imeiDr-modal').modal('show');
			$('.imeiDr_vone,.imeiDr_vtwo').val('');
			$('.imeiDr_num').text(0);
			var ids = $('#imeiDrGrid').getDataIDs();
			arrs = [];
			$.each(ids,function(i,item){
				var row = $('#imeiDrGrid').getRowData(item);
				var index1 = arrs.indexOf(row.imei);
				arrs.splice(index1, 1);
	        })
			$("#imeiDrGrid").clearGridData().trigger('reloadGrid').resize();
		}
	})
	
	$('.imeiDr_import').click(function(){
		$(".imeiDr_vtwo").val('');
		//拿到外层表格串号
		var sectionId = $('#sectionId').val();
		var ids = $('#dataGrid2').getDataIDs();
		$.each(ids,function(i,item){
			var row = $('#dataGrid2').getRowData(item);
			if(row.stockNum > 0 && row.salesOutstrorageImDraftList !== ""){
				var vo = JSON.parse(row.salesOutstrorageImDraftList);
				$.each(vo,function(i,item){
					if(item.imei !=="" && arrs.indexOf(item.imei) == -1){
						arrs.push(item.imei);
					}
					if(item.auxiliaryImei !=="" && arrs.indexOf(item.auxiliaryImei) == -1){
						arrs.push(item.auxiliaryImei);
					}
				});
			}
		})
		//开始添加串号
        var vone = $('.imeiDr_vone').val();
        var vtwo = $('.imeiDr_vtwo').val();
        var v1 = vone.split("\n");
        var str = '',vtr = '';
        $.each(v1,function(i,item){
        	var toval = item.trim().toUpperCase();
        	if(toval == ""){
	    		return
	    	}
        	if(arrs.indexOf(toval) == -1){
        		str+=toval+';'
        		arrs.push(toval);
        	}else{
        		vtr+=toval+';'
        	}
        })
        str = str.substring(0,str.length-1);
        if(str == ''){
        	if(vtr !== "" ){
        		$('.imeiDr_vtwo').val(vtr+'已导入\n')
        	}
        	return
        }else{
        	if(vtr !== "" ){
        		$('.imeiDr_vtwo').val(vtr+'已导入\n')
        	}
        }
        $.request({
        	type: "POST",
			url: '/manager/component/imei/validateOutStockImei',
			datatype : "json",
			data: {
	    		sectionId: sectionId,
	    		imeiInputData: str
        	},
			success: function (data) {
				if(data.result==1){
					var failed = data.data.failedResultList;
					var list = data.data.successResultList;
					$.each(list,function(i,item){
						$("#imeiDrGrid").addRowData(item.imeiId,item);
					})
					var num = $('#imeiDrGrid').getDataIDs();
					$('.imeiDr_num').text(num.length);
					var txt = $(".imeiDr_vtwo").val();
					$.each(failed,function(i,item){
						txt += item+'\n';
					})
					$(".imeiDr_vtwo").val(txt);
					var a1 = $("#imeiDrGrid").getCol('imei');
					var a2 = $("#imeiDrGrid").getCol('auxiliaryImei');
					arrs = [];
					$.each(a1,function(i,item){
						arrs.push(item);
						arrImei.push(item);
					})
					$.each(a2,function(i,item){
						arrs.push(item);
					})
				}else{
					$.zxsaas_plus.showalert("error",data.desc);
				}
		    },
		    error: function (msg) {
		    	$.zxsaas_plus.showalert("error","！" + msg);
		    }
		});
		
    })
    
    $('.imeiDr_sure').click(function(){
		$('#imeiDr-modal').modal('hide');
    	var dataIds = $("#dataGrid2").getDataIDs();
    	var num = dataIds.length;
//	    	临时存储串号作对比
    	var t1 = [],t2 = [],t3 = [];
    	$.each(dataIds,function(i,index){
    		var dataRow = $('#dataGrid2').getRowData(index);
    		if(dataRow.storageId !== "" && dataRow.goodsId !== ""){
    			$.ajax({
        			url:"/manager/inventory/common/getStockGoodsImeiVoList",
        			type : "post",
        			dataType : 'json',
        			async: false,
        			data:{
        				storageId: dataRow.storageId,
						goodsId: dataRow.goodsId,
                        sectionId: $('#sectionId').val()
					},
        			success:function(data){
        				if(data.result == 1){
        					var vo = data.data.goodsImeiVoList;
        					$.each(vo,function(i,item){
        						t1.push(item.imei);
        						t2.push(item.auxiliaryImei);
        						t3.push(index);
        					});
        				}
        			}
        		});
    		}
    	});
//	    	循环表格数据添加
    	var ids = $("#imeiDrGrid").getDataIDs();
		$.each(ids,function(i,item){
			var row = $('#imeiDrGrid').getRowData(item);
			var oneId = $('#dataGrid2 tbody tr').eq(num).attr('id');
			var oneRow = $('#dataGrid2').getRowData(oneId);
//				判断第一行是否为空
			if(num == 1 && oneRow.storageName == "" && oneRow.goodsName == ""){
				var id = $('#dataGrid2 tbody tr').eq(num).attr('id');
				var daraRow = $('#dataGrid2').getRowData(id);
				var saleArr = [];
				var saleList = {
						imei: row.imei,
						auxiliaryImei: row.auxiliaryImei,
                   		 imeiId: row.imeiId,
						remark: row.remark
					}
				var exist = t1.indexOf(row.imei);
				if(exist == -1){
					saleArr.push(saleList);
					$("#dataGrid2").setRowData(id,{
						storageId: row.storageId,
						storageName: row.storageName,
						categoryName: row.categoryName,
						code: row.code,
						goodsName: row.name,
						brandName: row.brandName,
						models: row.models,
						color: row.color,
						stockNum: row.stockCount,
						goodsId: row.goodsId,
						remark: row.remark,
                        ifManageImei: row.ifManageImei,
						taxRate: row.taxRate,
						goodsNumber: 1,
						salesOutstrorageImDraftList: JSON.stringify(saleArr)
					});
					//添加一行成功后增加此商品所有串号
					$.ajax({
	        			url:"/manager/inventory/common/getStockGoodsImeiVoList",
	        			type : "post",
	        			dataType : 'json',
	        			async: false,
                        data:{
                            storageId: row.storageId,
                            goodsId: row.goodsId,
                            sectionId: $('#sectionId').val()
                        },
	        			success:function(data){
	        				if(data.result == 1){
	        					var vo = data.data.goodsImeiVoList;
	        					$.each(vo,function(i,item){
	        						t1.push(item.imei);
	        						t2.push(item.auxiliaryImei);
	        						t3.push(id);
	        					});
	        				}
	        			}
	        		});
				}else{
					var existId = t3[exist];
					var existRow = $('#dataGrid').getRowData(existId);
					var opt = JSON.parse(existRow.salesOutstrorageImDraftList);
					opt.push(saleList);
					$("#dataGrid").setRowData(existId,{
						goodsNumber: opt.length,
						salesOutstrorageImDraftList: JSON.stringify(opt)
					});
				}
				
			}else{
				var saleArr = [];
				var saleList = {
						imei: row.imei,
						auxiliaryImei: row.auxiliaryImei,
                    imeiId: row.imeiId,
						remark: row.remark
					}
				var exist = t1.indexOf(row.imei);
				if(exist == -1){
					dataGrid2.addKongRow();
					num++;
					var id = $('#dataGrid2 tbody tr').eq(num).attr('id');
					var daraRow = $('#dataGrid2').getRowData(id);
					saleArr.push(saleList);
					$("#dataGrid2").setRowData(id,{
						storageId: row.storageId,
						storageName: row.storageName,
						categoryName: row.categoryName,
						code: row.code,
						goodsName: row.name,
						brandName: row.brandName,
						models: row.models,
						color: row.color,
						stockNum: row.stockCount,
						goodsId: row.goodsId,
						remark: row.remark,
						ifManageIMei: row.ifManageImei,
						taxRate: row.taxRate,
						goodsNumber: 1,
						salesOutstrorageImDraftList: JSON.stringify(saleArr)
					});
					//添加一行成功后增加此商品所有串号
					$.ajax({
	        			url:"/manager/inventory/common/getStockGoodsImeiVoList",
	        			type : "post",
	        			dataType : 'json',
	        			async: false,
                        data:{
                            storageId: row.storageId,
                            goodsId: row.goodsId,
                            sectionId: $('#sectionId').val()
                        },
	        			success:function(data){
	        				if(data.result == 1){
	        					var vo = data.data.goodsImeiVoList;
	        					$.each(vo,function(i,item){
	        						t1.push(item.imei);
	        						t2.push(item.auxiliaryImei);
	        						t3.push(id);
	        					});
	        				}
	        			}
	        		});
				}else{
					var existId = t3[exist];
					var existRow = $('#dataGrid2').getRowData(existId);
					if(existRow.salesOutstrorageImDraftList == ""){
						var opt = [];
					}else{
						var opt = JSON.parse(existRow.salesOutstrorageImDraftList);
					}
					opt.push(saleList);
					$("#dataGrid2").setRowData(existId,{
						goodsNumber: opt.length,
						salesOutstrorageImDraftList: JSON.stringify(opt)
					});
				}
				
			}
		})
		summary2();
        dataGrid2.clearRowByPara({goodsId:''});
    })
	
})

var arrs = [],arrImei = [];
function imeiDelRow(id){
	var row = $('#imeiDrGrid').getRowData(id);
	var index1 = arrs.indexOf(row.imei);
	if(index1 !== -1){
		arrs.splice(index1, 1);
	}
	var index2 = arrs.indexOf(row.auxiliaryImei);
	if(index2 !== -1){
		arrs.splice(index2, 1);
	}                 
    $("#imeiDrGrid").delRowData(id);
    var num = $('#imeiDrGrid').getDataIDs();
	$('.imeiDr_num').text(num.length);
}


//初始化事件
function initEvents(){
	$(window).resize(wResize);//注册窗口改变事件
	wResize();
}

//窗口大小改变
function wResize(){
	var winH = $(window).height();//浏览器高度
	var winW = $(window).width();//浏览器宽度
	var centerH = winH - 555;//中部高度
	if(centerH < 300){
		centerH = 300;
	}
	$("#dataGrid").setGridHeight(centerH/2 - 20);
	$(".gridType").width(50);
	$("#dataGrid2").setGridHeight(centerH/2 - 20);
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
                    window.parent.openWorkBoxByMenutext("批发换货单单据列表",  '/manager/inventory/sales/historyMain?billsType='+billsType, true);
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
		url:"../salesExchange/selectList/"+pageIndex,
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
			  summary();
			  summary2();
			  if(data.data.rows!=null && data.data.rows.length>0){
				  fillPageData(data.data.rows[0]);
				  //报表---勿删
//				  $("#slideThree").prop('checked',isDraft=="1"?false:true);
				  enableOrDisableNavBtn();
				  setPagingParam(data,param);
                  reloadMenuBtn()
				  initEvents();
				  summary();
				  summary2();
				  savePaymentWay();
			  }else{
				  if(isDraft=="1"){
					  addOpenState();
				  }else{
					 forbiddenEdit();
				  }
				  $('.rightMap img').removeAttr("src");
				  $.zxsaas_plus.showalert("提示","没有查询到单据!");
			  }

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
			$('.rightMap img:eq(0)').attr('src','../images/status/statusRed.png');
            $(".btnHundred .invalid").attr("disabled","disabled");
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


//正式单据、草稿单据点击事件
$("#slideThree").on("click",function(){
	if($('.slideThree').hasClass('color7D5F50')){
		$('.imeiImport').attr('disabled','true');
	}else{
		$('.imeiImport').removeAttr('disabled');
	}
	$(".slideThree").toggleClass("color7D5F50");
	if($("#slideThree").prop('checked')){//正式单据
		$('.rightMap img').attr('src','../images/guozhang.png');
        $('.print').attr('disabled',false);
	}else{
		$('.rightMap img').removeAttr("src");
        $('.print').attr('disabled',true);
	}
	initEvents();
	enableOrDisableNavBtn();
});

//单据状态改变事件
/*$("#slideThree").on("change",function(){
	changeStatus();
});*/
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
	enableOrDisableNavBtn();
})

//禁止页面编辑,禁用选择按钮
function forbiddenEdit(){
	$("#dataGrid").setGridParam({cellEdit:false});
	$("#billsHeaderForm input[name='billsDate']").attr("readonly","readonly");
	$("#billsHeaderForm :button").attr("disabled","disabled");
	$("#dataGrid").setGridParam().hideCol("op");
	$("#dataGrid2").setGridParam().hideCol("op");
	$("#dataGrid").setGridParam().showCol("reviewsNum");
	$("#dataGrid").setGridParam().showCol("reviewsAmount");
	$(".btnHundred .delete").attr("disabled","disabled");
	$("#moveImeiButtonLeft").attr("disabled","disabled");
	$("#moveImeiButtonRight").attr("disabled","disabled");
	$("#dataGrid3").setGridParam({cellEdit:false});
	$("#imeiInput1").attr("disabled","disabled");
	$("#imeiInput2").attr("disabled","disabled");
}

//允许页面编辑，允许选择按钮
function allowEdit(){
	$("#dataGrid").setGridParam({cellEdit:true});
	$("#billsHeaderForm input[name='billsDate']").removeAttr("readonly");
	$("#billsHeaderForm :button").removeAttr("disabled");
	$(".btnHundred .delete").removeAttr("disabled");
	$("#dataGrid").setGridParam().showCol("op");
	$("#dataGrid2").setGridParam().showCol("op");
	$("#dataGrid").setGridParam().hideCol("reviewsNum");
	$("#dataGrid").setGridParam().hideCol("reviewsAmount");
	$("#moveImeiButtonLeft").removeAttr("disabled");
	$("#moveImeiButtonRight").removeAttr("disabled");
	$("#dataGrid3").setGridParam({cellEdit:true});
	$("#imeiInput1").removeAttr("disabled");
	$("#imeiInput2").removeAttr("disabled");
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
	dataGrid2.clearDataGrid();
	dataGrid.addKongRow();
	dataGrid2.addKongRow();
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
	    colNames:['仓库id','仓库名称','商品名称','数量','单价','金额','商品备注','入库总成本','类别','商品编码','品牌','型号','颜色','折扣率',
			'折后金额','含税单价','含税金额','税率','税额','商品ID','ID','是否串号管理','是否辅助串号管理','串号长度','辅助串号长度','串号列表','引入订单表id'],
	    colModel:
	    	[ 
             {name : 'storageId',index : 'storageId',align:'left',sortable: false,hidden: true}, 
             {name : 'storageName' ,sortable: false,index : 'storageName',width:'200px',fixed:true,align:'left',
            	 editable:true,
            	 edittype:'custom',
            	 editoptions:{custom_element:my_inputxx, custom_value:my_valuexx}
             },
                {name : 'goodsName',sortable: false,index : 'goodsName',align:'left',edittype:'custom_bt_input'
                    ,custom_element_bt_click:"showGoodsModal",editable:true,width:'200px'},
                {name : 'goodsNumber',index : 'goodsNumber',align:'right',editable:true,sortable: false,formatter:'integer',width:'100px',
                    editoptions:{
                        onkeyup: "checkInput.clearNoNum(this,10)",
                        dataEvents: [{
                            type: "focus",
                            fn: function(){
                                this.select()
                            }
                        }]
                    }
                },
                {name : 'price',index : 'price',align:'right',editable:true,editrules:{number:true},formatter:'number',width:'100px',sortable: false,
                    editoptions:{
                        onblur:"checkInput.checkNum(this,12)",
                        dataEvents: [{
                            type: "focus",
                            fn: function(){
                                this.select()
                            }
                        }]
                    }
                },
                {name : 'amount',index : 'amount',align:'right',editable:false,editrules:{number:true},formatter:'number',sortable: false,width:'100px'},

                {name : 'remark',index : 'remark',align:'left',hidden: false,editable:true,sortable: false,
					width:'200px'},
                {name : 'costPrice',index : 'costPrice',align:'right',editable:true,editrules:{number:true},
                    formatter:'number',sortable: false,editoptions:{
                    onblur:"checkInput.checkNum(this,12)",
                    dataEvents: [{
                        type: "focus",
                        fn: function(){
                            this.select()
                        }
                    }]
                },width:'100px'},
                {name : 'categoryName',index : 'categoryName',align:'left',editable:false,sortable: false,width:'100px'},
             {name : 'code',index : 'code',align:'left',editable:false,sortable: false,width:'100px'},

             {name : 'brandName',index : 'brandName',align:'left',editable:false,sortable: false,width:'100px'},
             {name : 'models',index : 'models',align:'left',editable:false,sortable: false,width:'100px'},
             {name : 'color',index : 'color',align:'left',editable:false,sortable: false,width:'100px'},

             {name : 'discountRate',index : 'discountRate',hidden: true,editable:false,editrules:{number:true},formatoptions: {suffix:"%"},formatter:'currency',sortable: false,editoptions:{onblur:"checkInput.checkNum(this,12)"}},
             {name : 'discountedAmount',index : 'discountedAmount',hidden: true,formatter:'number',sortable: false,editable:false},
             {name : 'taxPrice',index : 'taxPrice',formatter:'number',hidden: true,sortable: false,editable:false},
             {name : 'taxAmount',index : 'taxAmount',formatter:'number',hidden: true,sortable: false,editable:false},
             {name : 'taxRate',index : 'taxRate',formatter:'number',hidden: true,sortable: false,editable:false,editoptions:{onblur:"checkInput.checkNum(this,12)"},formatoptions: {suffix:"%"},formatter:'currency'},
             {name : 'taxLimit',index : 'taxLimit',hidden: true,formatter:'number',sortable: false,editable:false},
             {name : 'goodsId',index : 'goodsId',editable:false,sortable: false,hidden: true},
             {name : 'id',index : 'id',editable:false,sortable: false,hidden: true},
             {name : 'ifManageIMei',index : 'ifManageIMei',editable:false,sortable: false,hidden: true},
             {name : 'ifEnableAuxliaryImei',index : 'ifEnableAuxliaryImei',sortable: false,hidden: true},
             {name : 'imeiLength',index : 'imeiLength',hidden: true},
             {name : 'auxliaryImeiLength',index : 'auxliaryImeiLength',hidden: true},
             {name : 'salesInstrorageImDraftList',index : 'salesInstrorageImDraftList',editable:false,sortable: false,hidden: true},
             {name : 'orderDetailId',index : 'orderDetailId',editable:false,sortable: false,hidden: true}
           ]
		,shrinkToFit: false,
	};
	
	//回调函数
	var callBackList = {
		onCellSelect:function(rowid,iCol,cellcontent,e){
		  var currRow = $("#dataGrid").jqGrid('getRowData', rowid);
            var curColName=$(e.target).attr('aria-describedby').replace(paras.gridId+'_','');
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
		  else if(curColName=='goodsNumber'){//数量点击
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
		  else if(curColName=='costPrice'){//入库成本
		    	//判断是否数量录入 并判断是否串号管理
		    	if(currRow.ifManageIMei == "1" && currRow.goodsId != ""){
		    		  $("#dataGrid").setColProp("costPrice",{editable:false});
		    		  openImeiInputModal("dataGrid",rowid);//打开输入框	
		    	  }else{
		    		  $("#dataGrid").setColProp("costPrice",{editable:true});
		    	 }
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
				$("#dataGrid #"+iRow+"_"+name+" option[value='"+val+"']").attr("selected",true);
				$("#"+paras.gridId).jqGrid('setCell', rowid ,"storageId" ,$("#dataGrid #"+iRow+"_"+name).children('option:selected').attr("sid"));
		    }
        },
       
        afterSaveCell:function(rowid,name,val,iRow,iCol){//保存编辑
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
        	
        }
	};
	dataGrid = new MyEiditGrid(paras,callBackList);
	
	 function my_inputxx(value, options) {
	        var html =  '<select class="form-control" ></select>';
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

//数据格式化
function fomatFloat(src,pos){      
    return Math.round(src*Math.pow(10, pos))/Math.pow(10, pos);             

}        
var dataGrid2 = null;
function initDataGrid2(){
	//配置
	var paras = {
	    gridId:'dataGrid2', 
	    addRow:{goodsId:'',goodsCode:'',goodsName:'',cxSectionId:'',stockNum:'',discountRate:100,numControlFlag:'',imControlFlag:'',cxNum:'',cxDiscount:'',cxPrice:'',price:'',remark:''},
	    colNames:['仓库id','仓库名称','商品名称', '现存量','数量','单价','金额','商品备注','类别','商品编码','品牌','型号','颜色','折扣率','折后金额','含税单价'
			,'含税金额','税率','税额','商品ID','ID','是否串号管理','串号列表','引入订单表id'],
	    colModel:
	    	[ 
             {name : 'storageId',index : 'storageId',align:'left',sortable: false,hidden: true}, 
             {name : 'storageName' ,sortable: false,index : 'storageName',width:'90px',fixed:true,align:'left',
            	 editable:true,
            	 edittype:'custom',
            	 editoptions:{custom_element:my_inputxx, custom_value:my_valuexx},width:'200px'
             },
                {name : 'goodsName',sortable: false,index : 'goodsName',align:'left',edittype:'custom_bt_input',custom_element_bt_click:"showGoodsModal",editable:true,width:'200px'},
                {name : 'stockNum',index : 'stockNum',align:'right',editable:false,sortable: false,formatter:'integer',width:'100px'},
                {name : 'goodsNumber',index : 'goodsNumber',align:'right',editable:true,sortable: false,formatter:'integer',editoptions:{
                    onkeyup: "checkInput.clearNoNum(this,10)",
                    dataEvents: [{
                        type: "blur",
                        fn: function(){

                            var idxData=$("#grid").jqGrid("getRowData",$("#grid").getGridParam("selrow"));
                            if(Number($(this).val())>Number(idxData.stockNum)||Number($(this).val())<0){
                                $.zxsaas_plus.showalert('warning','不允许大于现存量或小于0！');
                                $(this).val(0)
                                return false
                            }else{
                                $('#grid').jqGrid("saveCell",lastrow,lastcell)
                                var totalPrice=Number($(this).val())*Number(fomatFloat(idxData.price, 2))*Number(fomatFloat(idxData.discountRate, 2))
                                $('#grid').jqGrid('setCell',$('#grid').getGridParam('selrow'),'discountedAmount',totalPrice)
                                $('#grid').jqGrid('setCell',$('#grid').getGridParam('selrow'),'taxAmount',totalPrice)
                            }
                            MyEiditGrid.currEditDataGrid.unAllEdit();
                        }
                    },{
                        type: "focus",
                        fn: function(){
                            this.select()
                        }
                    }
                    ]
                },width:'100px'},
                {name : 'price',index : 'price',align:'right',editable:true,editrules:{number:true},formatter:'number',sortable: false,editoptions:{
                    onblur:"checkInput.checkNum(this,12)",
                    dataEvents: [{
                        type: "focus",
                        fn: function(){
                            this.select()
                        }
                    }]
                },width:'100px'},
                {name : 'amount',index : 'amount',align:'right',editable:false,editrules:{number:true},formatter:'number',sortable: false,width:'100px'},
                {name : 'remark',index : 'remark',align:'left',hidden: false,editable:true,sortable: false,width:'200px'},

				{name : 'categoryName',align:'left',index : 'categoryName',editable:false,sortable: false,width:'100px'},
             {name : 'code',index : 'code',align:'left',editable:false,sortable: false,width:'100px'},
             {name : 'brandName',index : 'brandName',align:'left',editable:false,sortable: false,width:'100px'},
             {name : 'models',index : 'models',align:'left',editable:false,sortable: false,width:'100px'},
             {name : 'color',index : 'color',align:'left',editable:false,sortable: false,width:'100px'},
             {name : 'discountRate',index : 'discountRate',hidden: true,editable:true,editrules:{number:true},formatoptions: {suffix:"%"},formatter:'currency',sortable: false,editoptions:{onblur:"checkInput.checkNum(this,12)"}},
             {name : 'discountedAmount',index : 'discountedAmount',hidden: true,formatter:'number',sortable: false,editable:false},
             {name : 'taxPrice',index : 'taxPrice',hidden: true,formatter:'number',sortable: false,editable:false},
             {name : 'taxAmount',index : 'taxAmount',hidden: true,formatter:'number',sortable: false,editable:false},
             {name : 'taxRate',index : 'taxRate',hidden: true,formatter:'number',sortable: false,editable:true,editoptions:{onblur:"checkInput.checkNum(this,12)"},formatoptions: {suffix:"%"},formatter:'currency'},
             {name : 'taxLimit',index : 'taxLimit',hidden: true,formatter:'number',sortable: false,editable:false},
             {name : 'goodsId',index : 'goodsId',editable:true,sortable: false,hidden: true},
             {name : 'id',index : 'id',editable:true,sortable: false,hidden: true,key:true},
             {name : 'ifManageIMei',index : 'ifManageIMei',editable:false,sortable: false,hidden: true},
             {name : 'salesOutstrorageImDraftList',index : 'salesOutstrorageImDraftList',editable:true,sortable: false,hidden: true},
             {name : 'orderDetailId',index : 'orderDetailId',editable:true,sortable: false,hidden: true}
           ]
        ,shrinkToFit: false,
	};
	//回调函数
	var callBackList = {
		onCellSelect:function(rowid,iCol,cellcontent,e){
            var curColName=$(e.target).attr('aria-describedby').replace(paras.gridId+'_','');
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
		  else  if(curColName=='goodsNumber'){//数量点击
		    	var currRow = $("#dataGrid2").jqGrid('getRowData', rowid);
		    	if(currRow.storageName == "" || currRow.goodsName == "" ){
		    		if(isDraft==1){
		    			 $.zxsaas_plus.showalert("提示","请先选择仓库和商品!");
			    		  $("#dataGrid2").setColProp("goodsNumber",{editable:false});
			    		  return false;
		    		}
				}
		    	if(currRow.ifManageIMei == "1" && currRow.goodsId != ""){
		    		  $("#dataGrid2").setColProp("goodsNumber",{editable:false});
		    		  try {MyEiditGrid.currEditDataGrid.unAllEdit();} catch (e) {}
		    		  openInputImeiModal("dataGrid2",rowid);
		    	  }else{
		    		  if(isDraft=="1"){
		    			  $("#dataGrid2").setColProp("goodsNumber",{editable:true});
		    		  }else{
		    			  $("#dataGrid2").setColProp("goodsNumber",{editable:false});
		    		  }
		    	 }
		    }
	    },
		afterEditCell:function(rowid,name,val,iRow,iCol){//开始编辑
	    	lastrow = iRow;
		    lastcell = iCol;
		    forbitPaste(rowid);
	    	if(name=='storageName'){//仓库名称
				$("#dataGrid2 #"+iRow+"_"+name).html("");
				for ( var int = 0; int < storageList.length; int++) {
					$("#dataGrid2 #"+iRow+"_"+name).append("<option sid='"+storageList[int].id+"' value='"+storageList[int].name+"'>"+storageList[int].name+"</option>");
				}
                var storageId=$("#dataGrid2").jqGrid('getRowData',rowid).storageId;
				$("#dataGrid2 #"+iRow+"_"+name+" option[sid='"+storageId+"']").attr("selected",true);
				$("#"+paras.gridId).jqGrid('setCell', rowid ,"storageId" ,$("#dataGrid2 #"+iRow+"_"+name).children('option:selected').attr("sid"));
		    }
        },
        afterSaveCell:function(rowid,name,val,iRow,iCol){//保存编辑
        	var currRow = $("#dataGrid2").jqGrid('getRowData', rowid);
        	if(name == 'goodsNumber' && currRow.ifManageIMei =="0" && currRow.storageName!= "" && currRow.goodsName!= ""){
        		if($.parseInt(val) > $.parseInt(currRow.stockNum)){
        			//输入数量小于现库存
        			$.zxsaas_plus.showalert('提示','数量不能大于现库存');
        			$("#"+paras.gridId).jqGrid('setCell', rowid ,"goodsNumber" ,currRow.stockNum);
        		}
        	}
        },
        afterInsertRow: function (rowid, rowdata) {
            //这里需要推迟执行，需要先执行表格的进入不可编辑状态
            setTimeout(function () {
                //添加一行之后，需要把上一个行的仓库也带到本行中 , 这里可能是订单引入，订单引入，这里不需要（把上一个行的仓库也带到本行中）；
                if (rowid > 0) {
                    var prevRowData = dataGrid2.$grid.jqGrid('getRowData', rowid - 1);
                    var curRowData = dataGrid2.$grid.jqGrid('getRowData', rowid);
                    if (prevRowData.storageId != "" && curRowData.storageId == "") {
                        dataGrid2.$grid.jqGrid('setCell', rowid, 'storageId', prevRowData.storageId);
                        dataGrid2.$grid.jqGrid('setCell', rowid, 'storageName', prevRowData.storageName);
                    }
                }
            }, 0)
        },
        summary:function(rowid,name,val,iRow,iCol){//统计处理
        	summary2();
        },
        getGridDataList:function(rows){
        }
	};
	dataGrid2 = new MyEiditGrid(paras,callBackList);
	
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
			url:'/manager/salesExchange/delete/'+id,
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
    $("#billsHeaderForm").data('bootstrapValidator').resetForm();
	$("#billsHeaderForm").data('bootstrapValidator').validate();
	if(!($("#billsHeaderForm").data('bootstrapValidator').isValid())){
		refreshValidator("#billsHeaderForm");
		return;
	}
	
	$('#dataGrid').jqGrid("saveCell",lastrow,lastcell);
	$('#dataGrid2').jqGrid("saveCell",lastrow,lastcell);
	if($("input[name='managerUname']").val()==""){
		$.MsgBox('提示','经手人不能为空');
		return;
	}


    var param=getSaveParam();
    if (isDraft==0) {
        var inDetailList=[];
        for(var i=0;i<param.salesInstrorageNumDraftList.length;i++){
            var detailItem=param.salesInstrorageNumDraftList[i];
            inDetailList.push({
                "id": detailItem.id,
                "remark":detailItem.remark,
            })
        }
        var outDetailList=[];
        for(var i=0;i<param.salesOutstrorageNumDraft.length;i++){
            var detailItem=param.salesOutstrorageNumDraft[i];
            outDetailList.push({
                "id": detailItem.id,
                "remark":detailItem.remark,
            })
        }
        var dataParam={
            "billsId": param.id,
            "billsType":billsType,
            "remark": param.remark,
            "inDetailList": inDetailList,
            "outDetailList": outDetailList
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
        //判断数量是否为0
        var $m=$('#dataGrid').getCol('goodsNumber');
        var $a=$('#dataGrid2').getCol('goodsNumber');
        var $p=$('#dataGrid').getCol('price');
        var $c=$('#dataGrid2').getCol('price');
        for(var i=0;i<$m.length;i++){
            if(parseInt($m[i])<0 || parseInt($m[i])==0){
                $.MsgBox('提示','换入数量不可小于或等于0');
                return;
            }
        }
        for(var i=0;i<$a.length;i++){
            if(parseInt($a[i])<0 || parseInt($a[i])==0){
                $.MsgBox('提示','换出数量不可小于或等于0');
                return;
            }
        }
        //判断价格是否为0
        var flag=false;
        for (var int = 0; int < $p.length; int++) {
            if ($.parseFloat($p[int]) == 0) {
                flag = true
            }
        }
        for (var int = 0; int < $c.length; int++) {
            if ($.parseFloat($c[int]) == 0) {
                flag = true
            }
        }
        var name=$("#weishouAmountSpan").html().substr(0,4);
        var weishouAmount=$("#weishouAmount").val().replace(/\,/g, "");
        if(weishouAmount<0){
            $.zxsaas_plus.showalert("提示",name+"不能小于0!");
            return;
        }
        //判断入库成本是否为0
        var $n=$('#dataGrid').getCol('costPrice');//入库成本
        var $var=[];
        for(var i=0;$n.length>i;i++){
            if(parseFloat($n[i])==0){
                $var.push($n[i]);
            }
        }
        var checkResult=checkSaveParam(param);
        if(checkResult){
            return;
        }
        if($var.length>0){
            $.MsgBox("提示","有商品存在入库成本为0，是否继续保存!",function(){
                saveExchange()
            },function(){

            });
        } else{
            saveExchange()
        }
        function saveExchange(){
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
        function addDraftBill(addData){
            $.ajaxPackage({
                url: '/manager/salesExchange/save',
                data:addData,
                contentType :'application/json',
                success: function (data) {
                    if (data.result == 1) {
                    	if (data.data.message != "") {
                    		$.zxsaas_plus.showalert("提示", '保存成功!<br>' + data.data.message);
                    	}else{
                    		$.zxsaas_plus.showalert("success", '保存成功');
                    	}
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
	dataGrid2.addKongRow();
	tooglePageStatus();
	summary();
	summary2();
	enableOrDisableNavBtn();
	
}

//清空页面表格数据
function clearPageData(){
	$("#billsHeaderForm input").val("");
	$("#gridFooter")[0].reset();
	$("#prepaymentAmount").val("0.00");
	$(options.TableName).jqGrid('clearGridData');
	$("#dataGrid2").jqGrid('clearGridData');
}

function gridCellOnBlur(){
	$(options.TableName).jqGrid("saveCell",lastrow,lastcell);
	summary();
	summary2();
}

//刷新按钮单击事件
function refreshBtClick(){
	var id = $("#billsHeaderForm input[name='id']").val();
	$.zxsaas_plus.showconfirm("提示","确定刷新此页面?",function(){
		if(id==""){
			if(isDraft=="1"){
				addOpenState();
			}
		}else{
			var param=getSelectPageParam();
			param.id=id;
			pageAjax(param);
		}
	},function(){
		
	});
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
	var storageId=$("#dataGrid2").jqGrid('getRowData',rowid).storageId;

	$("#dataGrid2").jqGrid('setCell', rowid ,"storageId" ,storageId);
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
    $("#dataGrid2").jqGrid('setRowData', rowid, dataRow, {});
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

//串号导入
function imeiDr(opt){
    var def = {
        gridConfig: {
            colNames: ['id','商品id','仓库id','仓库名称','商品类别', '操作', '串号', '辅助串号', '商品编码', '商品名称','商品品牌','型号','颜色', '备注','库存量','是否串号管理','税率','串号列表','引入订单表id'],
            colModel: [
                {name: 'imeiId', index: 'imeiId', width: 1, hidden: true},
                {name: 'goodsId', index: 'goodsId', width: 1, align: 'center', sorttype: "string", hidden: true},
                {name: 'storageId', index: 'storageId', width: 1, hidden: true},
                {name: 'storageName', index: 'storageName', width: 1, hidden: true},
                {name: 'categoryName', index: 'categoryName', width: 1, hidden: true},
                {name: 'del', index: 'del', width:50,align: 'center', sortable: false,
                    formatter:function(cellvalue, options, rowObject){
                        return '<a class="btn" onclick="imeiDelRow('+ rowObject.imeiId +')"><i class="glyphicon glyphicon-trash"></i></a>'
                    },
                },
                {name: 'imei', index: 'imei', width: 140, align: 'left', sorttype: "string", sortable: false},
                {name: 'auxiliaryImei', index: 'auxiliaryImei', width: 140, align: 'left', sorttype: 'string', sortable: false},
                {name: 'code',index: 'code',width: 100, align: 'left', sorttype: 'string', sortable: false},
                {name: 'name',index: 'name',width: 200, align: 'left', sorttype: 'string', sortable: false},
                {name: 'brandName', index: 'brandName', width: 1, hidden: true},
                {name: 'models', index: 'models', width: 1, hidden: true},
                {name: 'color', index: 'color', width: 1, hidden: true},
                {name: 'remark', index: 'remark', width: 200, align: 'left', sortable: false},
                {name: 'stockCount', index: 'stockCount', width: 1, hidden: true},
                {name: 'ifManageImei', index: 'ifManageImei', width: 1, hidden: true},
                {name: 'taxRate', index: 'taxRate', width: 1, hidden: true},
                {name: 'salesOutstrorageImDraftList',index : 'salesOutstrorageImDraftList',sortable: false,hidden:true},
                {name : 'orderDetailId',index : 'orderDetailId',sortable: false,hidden:true}
            ],
        }
    };
    opt = $.extend({}, def, opt);
    $(document.body).append(
        '<div id="imeiDr-modal" class="modal" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static" >'+
        '<div class="modal-dialog modal-lg" role="document">'+
        '<div class="modal-content">'+
        '<div class="modal-header">'+
        '<button type="button" data-dismiss="modal" class="close"><span aria-hidden="true">&times;</span></button>'+
        '<h4 class="modal-title imeiDr_title">串号导入</h4>'+
        '</div>'+
        '<div class="modal-body">'+
        '<div class="col-md-12">'+
        '<div class="row">'+
        '<div class="col-md-8" style="padding-left:0">EXCEL粘贴</div>'+
        '<div class="col-md-4" style="padding-left:0;padding-right: 0;">错误提示</div>'+
        '</div>'+
        '<div class="row">'+
        '<div class="col-md-8" style="padding-left:0">'+
        '<textarea class="form-control imeiDr_vone" style="height: 80px;resize:none" placeholder="一行一串号，若双串号则主辅串任一即可出库。例：\n A88888888888888 \n 869999999999999"></textarea>'+
        '<div style="height: 40px;line-height: 40px;">'+
        '<button type="button" class="btn imeiDr_import" style="padding: 6px 25px;background: #fff;border: 1px solid #ccc;margin-right: 20px;">导入</button>' +
        '<button type="button" class="btn imeiDr_clear" style="padding: 6px 25px;background: #fff;border: 1px solid #ccc;">清空</button>' +
        '</div>'+
        '</div>'+
        '<div class="col-md-4" style="padding-left:0;padding-right: 0;">'+
        '<textarea class="form-control imeiDr_vtwo" style="height: 120px;resize:none" ></textarea>'+
        '</div>'+
        '</div>'+
        '<div class="row" style="height: 40px;line-height: 55px;">已录入串号<font class="imeiDr_num">0</font>个</div>'+
        '<div class="row" style="margin-top:8px;">'+
        '<table id="imeiDrGrid" class="zxsaastable"></table>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '<div class="modal-footer">'+
        '<button type="button" class="btn btn-primary imeiDr_sure">确认</button>'+
        '<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'
    );
    $("#imeiDrGrid").jqGrid({
//        url: "/manager/component/imei/validateOutStockImei",
        mtype: "post",
        styleUI : 'Bootstrap',
        datatype: "json",
        jsonReader: {
            root: "data.dataList",
            total: "data.total",
            records: "data.records",
            repeatitems: false
        },
        colNames: opt.gridConfig.colNames,
        colModel: opt.gridConfig.colModel,
        sortable: false,
        rownumbers: true,	//显示行号
        rowNum: 9999,
        viewrecords: true,
        width: '100%',
        height: 300,
        autowidth: true,
        multiselect: false,
        rownumWidth: 50,
        shrinkToFit: false,
        gridComplete: function () {
            $("#imeiDrGrid").setLabel(0, '序号')
        }
    });
    $('.imeiDr_import,.imeiDr_clear').hover(function(){
        $(this).css('border','1px solid #0099FF');
    },function(){
        $(this).css('border','1px solid #ccc');
    })

    $('.imeiDr_clear').click(function(){
        $('.imeiDr_vone').val('');
        $('.imeiDr_vtwo').val('');
        $(".imeiDr_vone").trigger('keydown');
    })

    $(".imeiDr_vone").setTextareaCount({
        width: "30px",
        bgColor: "#f2f2f2",
        color: "red",
        display: "block"
    }).parent().css('width','100%');
        
}


