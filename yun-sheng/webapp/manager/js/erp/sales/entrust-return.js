$(function(){
	initDataGrid();
	//initPageData();
	initEvents();
	addBtnClick();
	if(billsCode != ""){
		var reportParam={};
		isDraft="0";
		reportParam.billsType=type;
		reportParam.billsCode=billsCode;
		pageAjax(reportParam);
	}
})

var type=23;//委托退货单
var pageIndex=0;
var total=1;//总记录数
var isDraft=0;// 0正式单据 ,1草稿单据
var addFlag=true;//页面是否是新增状态
var billsStatus=0;//单据状态 6.已过账，6已红冲
var options = {
	LoadBtnUrl: "../../json/button.json", // 按钮工具栏加载地址
	TableName: "#dataGrid", // 显示表格名称。遵照css选择器书写
};

//初始化事件
function initEvents(){
	$(window).resize(wResize);//注册窗口改变事件
	wResize();
}

//窗口大小改变
function wResize(){
	var winH = $(window).height();//浏览器高度
	var winW = $(window).width();//浏览器宽度
	var centerH = winH - 580;//中部高度
	if(centerH < 350){
		centerH = 350;
	}
	
	$(".gridBody").height(centerH);
	$("#dataGrid").setGridHeight(centerH);
	$("#dataGrid").setGridWidth($(window).width()-30); 
	$("#dataGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
}

//初始化页面数据
function initPageData(){
	var param=getSelectPageParam();
	param.queryCodeStr="L";
	pageAjax(param);
}

//首单
function firstPage(){
	$("#billsHeaderForm").data('bootstrapValidator').resetForm();
	var param=getSelectPageParam();
	param.queryCodeStr="F";
	pageAjax(param);
}

//上一单按钮单击事件
function backPage(){
	$("#billsHeaderForm").data('bootstrapValidator').resetForm();
	var param=getSelectPageParam();
	param.queryCodeStr="P";
	param.refBillsDate=$("#billsHeaderForm input[name='billsDate']").val();
	param.refBillsId=$("#billsHeaderForm input[name='id']").val();
	pageAjax(param);
}

//下一单按钮单击事件
function nextPage(){
	$("#billsHeaderForm").data('bootstrapValidator').resetForm();
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
	$("#billsHeaderForm").data('bootstrapValidator').resetForm();
	var param=getSelectPageParam();
	param.queryCodeStr="L";
	pageAjax(param);
}


//分页查询
function pageAjax(param){
	$.request({
		url:"../entrustRefund/selectList/"+pageIndex,
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
			  }else{
				  if(isDraft=="1"){
					  addOpenState();
				  }else{
					 forbiddenEdit();
				  }
				  $.zxsaas_plus.showalert("提示","没有查询到单据!");
			  }
			  setPagingParam(data,param);
			  initEvents();
			  summary();
		  }
		  $("input").data("changed",false);
		  if(isDraft=="0"){
			  $('#billsDate').attr('disabled',true)
		  }else if(isDraft=="1"){
			  $('#billsDate').attr('disabled',false)
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

//过滤查询按钮单击事件
function filterSearch(){
	$("#filterModel").modal("hide");
	pageIndex=0;
	var param=$("#filterSearchForm").toJsonObject();
	param.billsType=type;
	isDraft=param.isDraft;
	param.queryCodeStr="L";
	pageAjax(param);
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
		if(billsStatus=="6"){
			$('.rightMap img').attr('src','../images/guozhang.png');
			$(".btnHundred .invalid").removeAttr("disabled");
		}else if(billsStatus=="7"){
            $(".btnHundred .invalid").attr("disabled","disabled");
			$('.rightMap img').attr('src','../images/status/statusRed.png');
            //billsCode（包含R） 是否为红冲单 ，  为红冲单不能复制
            if(data.data.rows[0].billsCode.indexOf("_R")>-1){
                $(".btnHundred .copy").attr("disabled","disabled");
            }else{
                $(".btnHundred .copy").removeAttr("disabled");
            }
		}else{
			$('.rightMap img').removeAttr("src");
		}
	}else{
		$('.rightMap img').removeAttr("src");
	}
	if(isDraft=="1" && $("#slideThree").prop('checked')){//草稿
		$("#slideThree").click();
	}else if(isDraft=="0" && !$("#slideThree").prop('checked')){
		$("#slideThree").click();
	}
}

//填充页面数据
function fillPageData(row){
	row.billsDate = $.DateFormatFromTimestamp("yyyy-MM-dd",row.billsDate);
	row.billsDate == "1970-01-01" ? "":row.billsDate;
	$("#billsHeaderForm,#gridFooter").writeJson2Dom(row);
	getStorage(row.sectionId);
	//商品明细数据
	$(options.TableName).jqGrid("clearGridData");
	if(row.salesInstorExNumList.length>0){
		$.each(row.salesInstorExNumList,function(i,value){
			if(value.salesInstorExImDraftList!=null && value.salesInstorExImDraftList.length>0){
				 value.salesInstorExImDraftList=JSON.stringify(value.salesInstorExImDraftList);
			 }
			if(isDraft=="1"){
				dataGrid.addRowData(i+1,value);
			}else{
				$("#dataGrid").jqGrid('addRowData', i+1,value, 'last' );
			}
			 
		});
	}
	ifEditByStatus();
}


function ifEditByStatus(){
	 if(isDraft==1){
		 allowEdit();
	 }else{
		 forbiddenEdit();
	 }
}

//正式单据、草稿单据点击事件
$("#slideThree").click(function(){
	$(".slideThree").toggleClass("color7D5F50");
	if($("#slideThree").prop('checked')){//正式单据
		$('.rightMap img').attr('src','../images/guozhang.png');
	}else{
		$('.rightMap img').removeAttr("src");
		enableOrDisableNavBtn();
	}
	initEvents();
});

//单据状态改变事件
function changeStatus(){
	if($("#slideThree").prop('checked')){//正式单据
		isDraft=0
	}else{
		isDraft=1;
	}
	pageIndex=0;
	addFlag=false;
	initPageData();
	initEvents();
}

//禁止页面编辑,禁用选择按钮
function forbiddenEdit(){
	$("#dataGrid").setGridParam({cellEdit:false});
	$("#billsHeaderForm input[name='billsDate']").attr("readonly","readonly");
	$("#billsHeaderForm :button").attr("disabled","disabled");
	$("#dataGrid").setGridParam().hideCol("op");
	$("#dataGrid").setGridParam().showCol("reviewsNum");
	$("#dataGrid").setGridParam().showCol("reviewsAmount");
	$("#dataGrid3").setGridParam({cellEdit:false});
	enableOrDisableNavBtn();
}

//允许页面编辑，允许选择按钮
function allowEdit(){
	$("#dataGrid").setGridParam({cellEdit:true});
	$("#billsHeaderForm input[name='billsDate']").removeAttr("readonly");
	$("#billsHeaderForm :button").removeAttr("disabled");
	$("#dataGrid").setGridParam().showCol("op");
	$("#dataGrid").setGridParam().hideCol("reviewsNum");
	$("#dataGrid").setGridParam().hideCol("reviewsAmount");
	$("#dataGrid4").setGridParam({cellEdit:false});
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


var lastsel="";
var lastrow="";
//初始化表格(折扣率默认100%)
var dataGrid = null;
function initDataGrid(){
	//配置
	var paras = {
	    gridId:'dataGrid', 
	    addRow:{goodsId:'',goodsCode:'',goodsName:'',cxSectionId:'',stockNum:'',numControlFlag:'',imControlFlag:'',cxNum:'',cxDiscount:'',cxPrice:'',price:'',remark:''},
	    colNames:['仓库id','仓库名称','类别','商品编码','商品名称','品牌','型号','颜色','数量','单价','金额','商品备注','入库成本','商品ID','ID','是否串号管理','是否辅助串号管理','串号长度','辅助串号长度','串号列表'], 
	    colModel:
	    	[ 
             {name : 'storageId',index : 'storageId',align:'left',sortable: false,hidden: true}, 
             {name : 'storageName' ,sortable: false,index : 'storageName',width:'90px',fixed:true,align:'left',
            	 editable:true,
            	 edittype:'custom',
            	 editoptions:{custom_element:my_inputxx, custom_value:my_valuexx}
             }, 
             {name : 'categoryName',index : 'categoryName',editable:false,sortable: false},
             {name : 'code',index : 'code',editable:false,sortable: false},
             {name : 'goodsName',sortable: false,index : 'goodsName',align:'left',edittype:'custom_bt_input',custom_element_bt_click:"showGoodsModal",editable:true}, 
             
             {name : 'brandName',index : 'brandName',editable:false,sortable: false},
             {name : 'models',index : 'models',editable:false,sortable: false},
             {name : 'color',index : 'color',editable:false,sortable: false},
             {name : 'goodsNumber',index : 'goodsNumber',align:'left',editable:true,sortable: false,formatter:'integer',editoptions:{onblur:"checkInput.checkNumPure(this,12)"}},
             {name : 'price',index : 'price',align:'left',editable:true,editrules:{number:true},formatter:'number',sortable: false,editoptions:{onblur:"checkInput.checkNum(this,12)"}},
             {name : 'amount',index : 'amount',align:'left',editable:false,editrules:{number:true},formatter:'number',sortable: false},
             {name : 'remark',index : 'remark',hidden: false,editable:true,align:'left',sortable: false,editoptions:{readonly:false,onblur:"gridCellOnBlur()"}},
             {name : 'costPrice',index : 'costPrice',align:'left',editable:true,editrules:{number:true},formatter:'number',sortable: false,editoptions:{onblur:"checkInput.checkNum(this,12)"}},
             {name : 'goodsId',index : 'goodsId',editable:true,sortable: false,hidden:true},
             {name : 'id',index : 'id',editable:true,sortable: false,hidden:true},
             {name : 'ifManageIMei',index : 'ifManageIMei',editable:false,sortable: false,hidden:true},
             {name : 'ifEnableAuxliaryImei',index : 'ifEnableAuxliaryImei',sortable: false,hidden: true},
             {name : 'imeiLength',index : 'imeiLength',hidden:true},
             {name : 'auxliaryImeiLength',index : 'auxliaryImeiLength',hidden:true},
             {name : 'salesInstorExImDraftList',index : 'salesInstorExImDraftList',editable:true,sortable: false,hidden: true},
           ]
           
	};
	//回调函数
	var callBackList = {
		onCellSelect:function(rowid,iCol,cellcontent,e){
		  var currRow = $("#dataGrid").jqGrid('getRowData', rowid);
		    if(iCol==10){//数量点击
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
		    		  openImeiInputModal("dataGrid",rowid);//打开输入框	
		    	  }else{
		    		  $("#dataGrid").setColProp("goodsNumber",{editable:true});
		    	 }
		    }
		    
		    if(iCol==3){//仓库名称
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
		    
		    if(iCol==14){//入库成本
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
	    	if(iCol==3){//仓库名称
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
			url:'/manager/entrustRefund/delete/'+id,
			type:'GET',
			dataType:'json',
			contentType:'application/json;charset=utf-8',
			success:function(data){
				$.zxsaas_plus.showalert("提示","删除成功!");
				initPageData();
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
	if($("input[name='managerUname']").val()==""){
		$.MsgBox('提示','经手人不能为空');
		return;
	}
	$("#billsHeaderForm").data('bootstrapValidator').validate();
	if(!($("#billsHeaderForm").data('bootstrapValidator').isValid())){
		refreshValidator("#billsHeaderForm");
		return;
	}
	
	$('#dataGrid').jqGrid("saveCell",lastrow,lastcell);
    var tableid=$('#dataGrid').getCol('price');


    for(var i=0;i<tableid.length;i++){
        if(Number(tableid[i]<0)){
            $.MsgBox('提示','单价不可小于0');
            return;
        }
    }
	var param=getSaveParam();
	var url="",data="",ajaxType="";
	if(isDraft==0){
		url="../salesOrder/updateRemark/wtth_update";
		ajaxType="GET";
		data="type="+type+"&id=" +$("#billsHeaderForm input[name='id']").val()+"&remark="+$("#billsHeaderForm input[name='remark']").val();
	}else{
		
		//判断入库成本是否为0
		var $n=$('#dataGrid').getCol('costPrice');//入库成本
		var $var=[];
		for(var i=0;$n.length>i;i++){
			if(parseInt($n[i])==0){
				$var.push($n[i]);
			}
		}
		if($var.length>0){
			$.zxsaas_plus.showconfirm("提示","有商品存在入库成本为0，是否继续保存!",function(){
				var checkResult=checkSaveParam(param);
				if(checkResult){
					return;
				}
				$.request({
					url:"../entrustRefund/save",
					type :"POST",  
					dataType: "json",
					contentType :'application/json', 
					data:JSON.stringify(param),
					success:function(data){
					 if(data.result==1){
						  $.zxsaas_plus.showalert("提示",data.desc);
						  if(isDraft=="1"){
							  pageIndex=0;
						  }
					  }else{
						  $.zxsaas_plus.showalert("错误",data.desc);
					  }
				    }
				});
			},function(){
				
			});
		}else{
			var checkResult=checkSaveParam(param);
			if(checkResult){
				return;
			}
			ajaxType="POST";
			url="../entrustRefund/save";
			data=JSON.stringify(param);
		}
	}
	
	$.request({
		url:url,
		type :ajaxType,  
		dataType: "json",
		contentType :'application/json', 
		data:data,
		success:function(data){
		  if(data.result==1){
			  $.zxsaas_plus.showalert("提示",data.desc);
			  if(isDraft=="1"){
				  pageIndex=0;
			  }
			  var param={};
			  param.queryCodeStr="L";
			  param.isDraft=isDraft;
			  param.id=data.data.id;
			  pageAjax(param);
		  }else{
			  $.zxsaas_plus.showalert("错误",data.desc);
		  }
	    }
	});
}

//校验保存参数
function checkSaveParam(param){
	var flag=false;
	if(param.salesInstorExNumDraftList=="" || (param.salesInstorExNumDraftList!=undefined && param.salesInstorExNumDraftList.length==0)){
		$.zxsaas_plus.showalert("提示","明细数量不能为零!");
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
	param.billsType=type;//委托退货单
	param.billsAmount=parseFloat($(options.TableName).getCol('amount',false,'sum'));
	delete param.managerUname;
	delete param.contactUnitName;
	delete param.sectionName;
	delete param.billsCode;
	delete param.yingshouAmount;
	delete param.yushouAmount;
	//获取商品明细数据
	var ids=$("#dataGrid").getDataIDs();
	if(ids.length>0){
		var salesInstorExNumDraftList=new Array();
		$.each(ids,function(i,value){
			var rowData = $("#dataGrid").jqGrid('getRowData', value);
			if(rowData.goodsNumber!=0){
				delete rowData["op"];
				delete rowData["storageName"];
				delete rowData["ifManageIMei"];
				delete rowData["ifEnableAuxliaryImei"];
				delete rowData["imeiLength"];
				delete rowData["auxliaryImeiLength"];
				deleteRelateGoodsColumn(rowData);
				if(rowData.salesInstorExImDraftList=="" || rowData.salesInstorExImDraftList==null){
					delete rowData["salesInstorExImDraftList"];
				}else{
					if(! jQuery.isArray(rowData.salesInstorExImDraftList)){
						rowData.salesInstorExImDraftList=JSON.parse(rowData.salesInstorExImDraftList);
					}
				}
				salesInstorExNumDraftList.push(rowData);
			}
		});
		
		if(salesInstorExNumDraftList.length>0){
			param.salesInstorExNumDraftList=salesInstorExNumDraftList;
		}else{
			$.zxsaas_plus.showalert("提示","商品数量不能为零!");
		}
	}
	return param;
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
		$("#storageId").val("");
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
	tooglePageStatus();
	summary();
	
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


//汇总统计
function summary(){
	//汇总每一行
	var ids=$("#dataGrid").getDataIDs();
    $.each(ids,function(i,value){
    	var currRow = dataGrid.$grid.jqGrid('getRowData', value);
    	var goodsNumber = parseInt(currRow.goodsNumber);//数量
    	var amount = parseFloat(currRow.price)*goodsNumber; //金额
    	dataGrid.$grid.jqGrid('setCell', value ,"amount" ,amount);
    });
	//汇总
	var sumGoodsNumber = dataGrid.$grid.getCol('goodsNumber', false, 'sum');  
	var sumAmount = dataGrid.$grid.getCol('amount', false, 'sum');  
	dataGrid.$grid.footerData("set",{goodsNumber:sumGoodsNumber,amount:sumAmount});
}


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



