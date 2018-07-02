$(function(){
    initGood()
	paymentWayGrid();
	initTime();
    initTopForm()
    initFilter()
    //草稿单据 bid 是 报表 传过来的 ， billid 是 单据页面传递过来的
    var bId = $.trim(functionObjExtent.getQueryString('bId'))||functionObjExtent.getQueryString('billsId')
    if(bId == ""){
        getDefaultValues()
	}
	// 初始化 顶部表单
	function initTopForm(){
		//部门
		$("#sectionName").storePlu({
			isStoreShow:false,
			isLoadDefaultName:0,
			checkMore: false,
			search: false,
			ifStore: false, // 控制部门选项
			changeStore:function(){
				var id=$("#sectionName").data('sectionId');
				//设置编辑器值
				$("#sectionId").val(id);
				$("#managerUid").val("");
				$("#managerUname").val("").data('id','');
				// 19:批发单 20: 换货 ;21 :退货
				if(type==20 || type==21){
                    InterfaceInventory.common.getDefaultStorgeList({
                        data:{sectionId:id},
                        success:function(data){
                            var storageList=data.data.storageList||[]
                            var storageItem=storageList[0]||{}
                            var ids=$('#dataGrid').getDataIDs();
                            $.each(ids,function(i,rowid) {
                                $('#dataGrid').jqGrid('setCell', rowid, "storageName", storageItem.name);
                                $('#dataGrid').jqGrid('setCell', rowid, "storageId", storageItem.storageId);
                            })
                        }
                    })
				}

				if(type==19){
                    dataGrid.clearDataGrid();
                    dataGrid.addKongRow();
				}else if(type==20){
                    dataGrid2.clearDataGrid();
                    dataGrid2.addKongRow();
				}
			}
		});
		//经办人
		$("#managerUname").comModalsEmployeeBySection({
			sectionIds:'#sectionId',
			clickback:function () {
				var obj= $("#managerUname");
				//设置编辑器值
				$("#managerUid").val(obj.data('id'));
			}
		})
		//往来单位
		$("#contactUnitName").comModalsContactUnit({
			clickback:function () {
				var obj= $("#contactUnitName");
				//设置编辑器值
				$("#contactsunitId").val(obj.data('id'));
				getContactAmount(obj.data('id'))
			}
		})
	}
	// 初始化 过滤
	function initFilter() {
		//部门
		$("#sectionNameFilter").storePlu({
			isStoreShow:false,
			isLoadDefaultName:0,
			checkMore: true,
			search: false,
			ifStore: false, // 控制部门选项
			changeStore:function(){
				var id=$("#sectionNameFilter").data('sectionId');
				//设置编辑器值
                $("#sectionNameFilter").siblings("input[name='sectionIdFilter']").val(id);
			}
		}).removeAttr('name').after('<input type="hidden" name="sectionIdFilter"  value="">')
		//往来单位
		$("#contactUnitNameFilter").comModalsContactUnit({
			multiselect:true,
			clickback:function () {
				var id=$("#contactUnitNameFilter").data('id');
				//设置编辑器值
                $("#contactUnitNameFilter").siblings("input[name='contactsunitIdFilter']").val(id);
			}
		}).removeAttr('name').after('<input type="hidden" name="contactsunitIdFilter"  value="">');

	}
	$("#billsDate").datetimepicker( {
		lang : "ch", // 语言选择中文
		format : "Y-m-d", // 格式化日期
		timepicker : false, // 关闭时间选项
		todayButton : false,// 关闭选择今天按钮
		maxDate:_authList.maxDate,
	    minDate:_authList.minDate,
	    value:_authList.maxDate
	});
	$("#datetimepickerStart1").datetimepicker({
		lang:"ch",           //语言选择中文
	    format:"Y-m-d",      //格式化日期
	    timepicker:false,    //关闭时间选项
	    todayButton:false    //关闭选择今天按钮
	});
	$("#datetimepickerEnd1").datetimepicker({
		lang:"ch",           //语言选择中文
	    format:"Y-m-d",      //格式化日期
	    timepicker:false,    //关闭时间选项
	    todayButton:false    //关闭选择今天按钮
	});
});

//获取默认值
function getDefaultValues(){
    var obj={
        success:function(data){
            $('#sectionName').val(data.data.defaultSection.name)
            $('#sectionId').val(data.data.defaultSection.sectionId)
            $('#managerUname').val(data.data.defaultEmployee.name).data('id',data.data.defaultEmployee.employeeId)
            $('#managerUid').val(data.data.defaultEmployee.employeeId)

           var defaultStorage=data.data.defaultStorage||{}

            // 20: 换货 ;21 :退货
            if(type==19 ||type==20 || type==21){
                var ids=$('#dataGrid').getDataIDs();
                $.each(ids,function(index,rowid){
                    $('#dataGrid').jqGrid("setCell",rowid,"storageName",defaultStorage.name);
                    $('#dataGrid').jqGrid("setCell",rowid,"storageId",defaultStorage.storageId);
                })
				if(type==20){
                    var ids2=$('#dataGrid2').getDataIDs();
                    $.each(ids2,function(index,rowid){
                        $('#dataGrid2').jqGrid("setCell",rowid,"storageName",defaultStorage.name);
                        $('#dataGrid2').jqGrid("setCell",rowid,"storageId",defaultStorage.storageId);
                    })
				}
            }

        }
    }
    InterfaceInventory.common.getDefaultValues(obj);
}

//获取过滤的参数
function comGetFilterParam(){
    var param=$("#filterSearchForm").toJsonObject();
    param.sectionId= param.sectionIdFilter
    param.contactsunitId= param.contactsunitIdFilter
    delete param.sectionIdFilter
    delete param.contactsunitIdFilter
    return param
}

var positionId="";//职位id
var ifFilterClick=false;//是否是过滤弹出框
//初始化受理时间
function initDealDate(){
	$("#billsDate").prop('readonly','readonly')
	formateDateInput("#billsDate");
	if($("#billsDate").val()==""||$("#billsDate").val()==null||$("#billsDate").val()==undefined)
	{
		$("#billsDate").val(_authList.maxDate);
	}
}

//格式化日期控件
function formateDateInput(modelId){
	if(_authList.hasPermissions==0){
		$(modelId).prop('disabled',true);
	}else{
		$(modelId).prop('disabled',false);
		$("#billsDate").datetimepicker({
	        lang: "ch",           //语言选择中文
	        format: "Y-m-d",      //格式化日期
	        timepicker: false,    //关闭时间选项
	        todayButton: false,    //关闭选择今天按钮
	        maxDate:_authList.maxDate,
		    minDate:_authList.minDate,
	    })
	}
}

//初始化过滤条件中开始日期，结束日期
function initTime(){
  var myDate = new Date();
  var year = myDate.getFullYear();
  var month = myDate.getMonth()+1;
  if (month<10){
      month = "0"+month;
  }
  var firstDay = year+"-"+month+"-01";
  $("#datetimepickerStart1").val();

  myDate = new Date(year,month,0);
  var lastDay = year+"-"+month+"-"+myDate.getDate();
	$("#datetimepickerEnd1").val();
}

//数字效验
function verifyNum(e){
	var re = /^\d+(?=\.{0,1}\d+$|$)/;
	if(e!=undefined){
		e.value = Number(e.value).toFixed(2);
	}
    if (e!=undefined && e.value != "") { 
        if (!re.test(e.value)) {
        	if(e.id=="billsDiscount"){
        		$("#billsDiscount").val("0.00");
        	}
        	$.zxsaas_plus.showalert("错误提示","请输入数字或保留两位小数");
        } 
    }
}

//禁止输入非数字
function clearNoNum(evt,obj){
 var reg=/^(?:[1-9]+\d*|0)(\.\d+)?$/;
 if(!reg.test(obj.value)){
	   obj.value = obj.value.replace(/[^\d.]/g,"");
 }
}

//禁止输入非数字,小数点
function clearNoNumNoPoint(evt,obj){
	var reg=/^[1-9]*[1-9][0-9]*$/;
	if(!reg.test(obj.value)){
		obj.value = obj.value.replace(/[^\d]/g,"");
	}
}

//商品模态框
var gridId = "";
var grid ="";
function showGoodsModal(cellInfo){
	gridId = cellInfo.gridId;
	grid = $("#"+gridId);
	//18销售订单，全部商品；19批发单，在看商品；20批发换货单，换人全部商品，换出，在库商品；21批发退货单，全部商品；
    //18销售订单,19批发单,20批发换货单,21批发退货单,22委托出库单,23委托退货单
    var domId='';
    var flag=true;
    if(type==18||type==21 || type==22 ||type==23){
        domId='dataGridAllGood';
    }else if(type==19){
        domId='dataGridStoreGood';
        flag= setStoreGoodStorageId(domId,grid)
    }else  if(type==20){
        if(gridId=='dataGrid'){
            domId='dataGridAllGood';
        }else if(gridId=="dataGrid2"){
            domId='dataGridStoreGood';
            flag= setStoreGoodStorageId(domId,grid)
        }
	}
	if(flag===false){
        return false
	}
   $('#'+domId).next(".showModalBtn").trigger('click')
	grid.saveCell(lastrow, lastcell)
}

function setStoreGoodStorageId(domId,grid) {
    var sectionId= $.trim($('#billsHeaderForm  input[name="sectionId"]').val())
    if(sectionId===''){
        $.zxsaas_plus.showalert("提示", "请选择部门名称!");
        return
    }

    var storageId=grid.jqGrid('getRowData', lastrow).storageId
    if(storageId===''){
        $.zxsaas_plus.showalert("提示", "请选择仓库!");
        return false
    }


    $('#'+domId).comModalsOutStoreGoods('setOption',{
        'girdParam':{
            'queryKey':"",
            'typeId':"",
            'sectionId':sectionId,
            'storageIds':storageId,
            'menuCode':$('#AUTH').data('code'),
        }
    })
    return true
}
function initGood() {
    //18销售订单，全部商品；19批发单，在看商品；20批发换货单，换人全部商品，换出，在库商品；21批发退货单，全部商品；
    //18销售订单,19批发单,20批发换货单,21批发退货单,22委托出库单,23委托退货单
    if(type==18||type==21 || type==22 ||type==23){
        loadModalAllGood()
    }else if(type==19){
        loadModalStoreGood()
    }else  if(type==20){
        loadModalAllGood()
        loadModalStoreGood()
    }
}
//加载所有商品
function loadModalAllGood() {
    $("#dataGridAllGood").comModalsAllGoods({
        multiselect:true,
        clickback:function(goodsList){
            addGood(goodsList)
            $("#dataGridAllGood").removeData();
        }
    })
}
//加载在库商品
function loadModalStoreGood() {
    $("#dataGridStoreGood").comModalsOutStoreGoods({
        clickback:function(goodsList){
            addGood(goodsList)
            $("#dataGridStoreGood").removeData();
        }
    })
}
//添加商品
function addGood(goodsList) {
    if(goodsList.length>0){
        var $grid= $("#"+gridId);
        $grid.jqGrid('saveCell',lastrow,lastcell);
        var selRowId = $grid.jqGrid('getGridParam','selrow');
        var selRowData= $grid.jqGrid("getRowData",selRowId);

        var cIndex
        for(var i=0;i<goodsList.length;i++){
			var goods = goodsList[i];
			var dataRow = {
				"code":goods.code,
				"categoryName":goods.categoryName,
				"brandName":goods.brandName,
				"models":goods.models,
				"color":goods.color,
				"goodsId":goods.dataId,
				"goodsName":goods.name,
				"ifManageIMei":goods.ifManageImei,
				"ifEnableAuxliaryImei":goods.ifEnableAuxiliaryImei,
				"imeiLength":goods.imeiLength==""?"&nbsp":goods.imeiLength,
				"auxliaryImeiLength":goods.auxiliaryImeiLength==""?"&nbsp":goods.auxiliaryImeiLength,
				"taxRate":goods.taxRate,
                'discountRate': 100,
				"storageName":selRowData.storageName,
				"storageId":selRowData.storageId,
			}
            if(i==0){
                $grid.jqGrid('setRowData', selRowId, dataRow, {});
                cIndex=selRowId;
            }else{
                cIndex=MyEiditGrid.getMaxRowid($grid) + 1;
                $grid.jqGrid('addRowData', cIndex, dataRow);
            }
            //销售单,委托退货单,委托出库单,销售退货单,销售换货单
            if(type==19 || type==23 || type==22 || type==21 || type==20){
                var obj = $grid.jqGrid('getRowData',cIndex);
				$grid.jqGrid('setCell', cIndex ,"stockNum" ,goods.stockCount);
				$grid.jqGrid('setCell', cIndex ,"goodsNumber" ,0);
				if(type==19){
					$grid.jqGrid('setCell', cIndex ,"salesOutstrorageImDraftList" ,null);
				}else if(type==23){
					$grid.jqGrid('setCell', cIndex ,"salesInstorExImDraftList" ,null);
				}else if(type==22){
					$grid.jqGrid('setCell', cIndex ,"salesOutstorExImDraftList" ,null);
				}else if(type==21){
					$grid.jqGrid('setCell', cIndex ,"salesInstrorageImDraftList" ,null);
				}else if(type==20){
					if(gridId=="dataGrid"){
						$grid.jqGrid('setCell', cIndex ,"salesInstrorageImDraftList" ,null);
					}else if(gridId=="dataGrid2"){
						$grid.jqGrid('setCell', cIndex ,"salesOutstrorageImDraftList" ,null);
					}
				}

                //添加串号图标
                if(obj.ifManageIMei==1){
                    //添加串号这个图标
                    $grid.jqGrid('setCell', cIndex, "goodsNumber", '', 'ifManageImeiIcon');
                }else{
                    $("#"+gridId+"  #" +  cIndex+ "  td[aria-describedby='"+gridId+"_goodsNumber']").removeClass('ifManageImeiIcon')
                }
            }
        }
        if(gridId=='dataGrid'){
            dataGrid.$grid.delRowData('dataGrid_addRowId');
            dataGrid.addKongRow();
            dataGrid.$grid.delRowData(MyEiditGrid.getMaxRowid(dataGrid.$grid));
		}else if(gridId=='dataGrid2'){
            dataGrid2.$grid.delRowData('dataGrid2_addRowId');
            dataGrid2.addKongRow();
            dataGrid2.$grid.delRowData(MyEiditGrid.getMaxRowid(dataGrid2.$grid));
        }


    }
}


//付款方式grid
function paymentWayGrid(){
	$.jgrid.defaults.width = 1280;
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';	
	var colNames = ['id','账户类别','账户名称','金额','备注',"资金账户id","资金账户类型code",'状态'];
	var JqGridColModel=[
	                    {name:'id',index:'id', width:1,align:'center',key:true,sortable:false,hidden:true},
						{name:'accountTypeName',index:'account_id', width:150,align:'center', sorttype:'string',sortable:false},
						{name:'accountName',index:'account_name', width:150,align:'center', sorttype:'integer',sortable:false},
						{name:'payreceiptAmout',index:'payreceiptAmout', width:100,align:'center', sorttype:'Long',formatter:"number",editable:true,editoptions:{
							readonly:false,
							onblur:"cellOnBlurs(this)",
							onkeyup:"clearNoNum(event,this)",
                            dataEvents: [{
                                type: "focus",
                                fn: function(){
                                    this.select()
                                }
                            }]
						},sortable:false},
						{name:'remark',index:'remark', width:200,align:'center', sorttype:'string',editable:true,editoptions:{
							readonly:false,
							onblur:"cellOnBlur()",
                            dataEvents: [{
                                type: "focus",
                                fn: function(){
                                    this.select()
                                }
                            }]
						},sortable:false},
						{name:'accountId',index:'accountId', width:1,align:'center',hidden:true,sortable:false},
						{name:'accountType',index:'accountType', width:1,align:'center',hidden:true,sortable:false},
						{name:'status',index:'status', width:1,align:'center',hidden:true,sortable:false}
	                ];
	loadtable();
	function loadtable(){
			$("#paymentWayModalGrid").jqGrid({
				mtype:"GET",
				datatype: "json",
				jsonReader  : {	
					root: "data.rows",
					repeatitems: false
						},
				colNames:colNames,          
	            colModel:JqGridColModel,
	            cellsubmit: 'clientArray',//单元格保存内容的位置		
	            editurl: 'clientArray',
	            sortable:false,			            
	            rownumbers:true,
	           	cellEdit:true,
	            width: "90%" ,
				autowidth:true,
				rownumWidth:50,
				shrinkToFit:false,
				footerrow:true,  //设置表格显示表脚
				userDataOnFooter:true,//设置userData 显示在footer里
				beforeSelectRow:function(id){
					var rownumber=$('#' + id)[0].rowIndex;
					$('#'+rownumber+'_payreceiptAmout').bind("input propertychange",function(){
						var payreceiptAmout=Number($(this).val());
						payreceiptAmout += Number($("#paymentWayModalGrid").getCol('payreceiptAmout',false,'sum')); 
						$("#paymentWayModalGrid").jqGrid('footerData','set',{
					        "payreceiptAmout": payreceiptAmout,
					       }
						);
					});
					$(document).delegate('#'+rownumber+'_payreceiptAmout', "contextmenu", function(e){
						return false;
					});
				},
				beforeEditCell:function(rowid,cellname,v,iRow,iCol){
					lastrow = iRow;
					lastcell = iCol;		
				},
				gridComplete:function(data){
					var rowData=[]
					var ids=$('#paymentWayModalGrid').getDataIDs()
					for(var i=0;i<ids.length;i++){
						var getRowData=$('#paymentWayModalGrid').jqGrid('getRowData',ids[i])
						if(getRowData.status==1||getRowData.status==2){
							$('#paymentWayModalGrid').jqGrid('delRowData',ids[i])
						}
					}

					$("#paymentWay tr:last").find("td").eq(0).text("合计");
					paymentWayGridFootData();
					
				}
			})
			jQuery("#paymentWayModalGrid").jqGrid('setLabel',0, '序号');
	}
}

//付款方式grid页脚合计
function paymentWayGridFootData(){
	var payreceiptAmout=$("#paymentWayModalGrid").getCol('payreceiptAmout',false,'sum');
	$("#paymentWayModalGrid").jqGrid('footerData','set',{
        "payreceiptAmout": payreceiptAmout,
       }
	);
}

function cellOnBlur(){
	$("#paymentWayModalGrid").jqGrid("saveCell",lastrow,lastcell);
	paymentWayGridFootData();
}

function cellOnBlurs(){
	$("#paymentWayModalGrid").jqGrid("saveCell",lastrow,lastcell);
	paymentWayGridFootData();
}


//过滤按钮单击事件
function filterBtnClick(){
	ifFilterClick=true;
	$("#filterModel").modal("show");
}

//过滤重置按钮单击事件
function reset(){
	$("#filterSearchForm")[0].reset();
	$("#filterSearchForm input[name='remark']").removeAttr("readonly");
	initTime();
}

//预付款金额文本框点击事件
$("#prepaymentAmount").click(function(){
	if(isDraft=="1"){//草稿
		var sectionId=$("#billsHeaderForm input[name='sectionId']").val();
		if(sectionId==""){
			$.zxsaas_plus.showalert("提示","请先选择部门!");
			return;
		}
		if($("#prepaymentAmount").val() =="0.00"){
			reloadPaymentWayGrid(sectionId);
		}
		$("#paymentWayModalGrid").setGridParam({cellEdit:true});
	}else{
		$("#paymentWayModalGrid").setGridParam({cellEdit:false});
	}
	$("#paymentWay").modal("show");
});

//重新加载收款方式表格
function reloadPaymentWayGrid(sectionId){
	$("#paymentWayModalGrid").jqGrid('setGridParam',{  
		url:"../salesCommon/findAccountById",
        datatype:'json',  
        postData:{"sectionId":sectionId}
    }).trigger("reloadGrid"); //重新载入  
}

//查询单据回显收付款金额
function echoPaymentWayGrid(salesBillsAccount){
	$("#paymentWayModalGrid").jqGrid("clearGridData");
	if(salesBillsAccount.length>0){
		$.each(salesBillsAccount,function(i,value){
			$("#paymentWayModalGrid").jqGrid('addRowData', i+1,value, 'last' );
		});
	}
}

//获取往来单位余额等信息
function getContactAmount(id){
    var obj={
        data:{
            contactUnitId:id,
        },
        success:function (data) {
            var amount = data.data.contactUnitAmountVo;
            $("#billsHeaderForm input[name='yingshouAmount']").val(amount.shouldReceiptBalance);
            $("#billsHeaderForm input[name='yushouAmount']").val(amount.preReceiptBalance);
        }
    }
    InterfaceInventory.common.getContactUnitAmountVo(obj)
}

//获取仓库名称下拉框
var storageList =new Array();
function getStorage(sectionId){
	$.ajax({
		url:"../salesCommon/getStorages",
		type : 'GET',  
		dataType: "json",
		async:false,
		data:{"sectionId":sectionId},
		contentType :'application/json', 
		success:function(data){
		  if(data.result==1){
			  storageList=data.data.storageList;
			  $("#storageId").find("option:not(:first)").remove();
			  if(storageList.length>0){
				  $.each(storageList,function(i,value){
					  $("#storageId").append("<option value='"+value.id+"'>"+value.name+"</option>");
				  });
			  }
		  }
	    }
	});
}

//获取现存量
function getStorckNum(storageId,goodsId){
	var stockNum=0;
	$.ajax({
		url:"../salesCommon/getStorckNum",
		type : 'GET',  
		dataType: "json",
		async:false,
		data:{"storageId":storageId,"goodsId":goodsId},
		contentType :'application/json', 
		success:function(data){
		  if(data.result==1){
			  stockNum=data.data.stockNum;
		  }
	    }
	});
	return stockNum;
}

//复制按钮单击事件
function copyBtnClick(){
	   $("#billsCode").val("");
	   $("#id").val("");
		var billsHeader = $("#billsHeaderForm").toJsonObject();
		delete billsHeader.billsCode;
		delete billsHeader.id;
		
		var objList = [];
		var ids=$("#dataGrid").getDataIDs();
	    $.each(ids,function(i,value){
	    	var row = $("#dataGrid").jqGrid('getRowData', value );
	    	if(type==19){//销售单
	    		if(row.ifManageIMei==1){
	    		var salesOutstrorageImDraftList=$.parseJSON(row.salesOutstrorageImDraftList);
	    		var array=[];
	    		$.each(salesOutstrorageImDraftList,function(i,value){
	    			var param={};
                    param.imeiId=value.imeiId;
	    			param.imei=value.imei;
	    			param.auxiliaryImei=value.auxiliaryImei;
	    			param.remark=value.remark;
	    			array.push(param);
	    		});
	    		row.salesOutstrorageImDraftList=JSON.stringify(array);
	    		
	    		}
//	    		$("#dataGrid").setRowData(ids[i],{goodsNumber:"0"});
	    		var rowData=$("#dataGrid").jqGrid('getRowData', value );
	    		objList.push(rowData);
	    		
	    		setTimeout(function(){
	    			summaryBiaoJiao();
	    		},0);
	    		
	    	}else{
	    		objList.push(row);	
	    	}
	    });
	    
	    var gridList2=[];
		if(type==20){//销售换货单（datagrid2换出信息）
		    var ids=$("#dataGrid2").getDataIDs();
		    if(ids.length>0){
		    	$.each(ids,function(i,value){
		    		var row=$("#dataGrid2").jqGrid('getRowData',value);
		    		if(row.ifManageIMei==1){//销售单
			    		var salesOutstrorageImDraftList=$.parseJSON(row.salesOutstrorageImDraftList);
			    		var array=[];
			    		$.each(salesOutstrorageImDraftList,function(i,value){
			    			var param={};
			    			param.imeiId=value.imeiId;
			    			param.imei=value.imei;
			    			param.auxiliaryImei=value.auxiliaryImei;
			    			param.remark=value.remark;

			    			array.push(param);
			    		});
			    		row.salesOutstrorageImDraftList=JSON.stringify(array);
			    	}
		    		gridList2.push(row);
		    	});
		    }
		}
		
		//收付款明细
		var obj = $("#paymentWayModalGrid").jqGrid("getRowData");
		var prepaymentAmount=$("#prepaymentAmount").val();
		var billsDiscount=$("#billsDiscount").val();
		
		 $("#gridFooter")[0].reset();
	    addBtnClick();
	    
		
	    $("#billsHeaderForm").writeJson2Dom(billsHeader);
	    if(objList.length>0){
	    	$("#dataGrid").jqGrid('clearGridData');
			$.each(objList,function(i,value){
				dataGrid.addRowData(i+1,value);
			});
			if(type==18){//销售定单
				detailGridFootData();
			}else if(type==19 || type==22 || type==23 || type==21 || type==20){//销售单,委托出库单,委托退货单，销售退货单，销售换货单
				summary();
				$('.rightMap img').removeAttr("src");
			}
		}
	    
	    if(type==20){
	    	if(gridList2.length>0){
	    		$("#dataGrid2").jqGrid('clearGridData');
	    		 $.each(gridList2,function(i,value){
	  				dataGrid2.addRowData(i+1,value);
	  			});
	    		 summary2();
	    	}
	    }
	    
	    $("#prepaymentAmount").val(prepaymentAmount);
	    $("#billsDiscount").val(billsDiscount);
	    if(type==19){//销售单
	    	summaryBiaoJiao();
	    }
	    if(type==19 || type==22 || type==23 || type==21 || type==20){//销售单,委托出库单,委托退货单，销售退货单，销售换货单
	    	$("#prepaymentAmount").val('0.00');
	    	$('#billsDiscount').val('0.00')
	    }
	   $.zxsaas_plus.showalert("success","单据复制成功!");
	   //收付款明细
	   // echoPaymentWayGrid(obj);
}

function deleteRelateGoodsColumn(param){
	delete param.code;
	delete param.categoryName;
	delete param.brandName;
	delete param.models;
	delete param.color;
}


function initOutImei() {
    $("#outImeiWrap").comImeiOutModal({
        getImeiUrl:'/manager/component/imei/validateSalesRefundsImei',
        menuCode:$('#MenuTool').data('code'),
        requestBeforeBack:function () {
            $("#outImeiWrap").comImeiOutModal('setOption',{
                sectionId:$('#sectionId').val(),
                imeiList:$('#dataGrid').getCol('salesInstrorageImDraftList')
            })
        },
        inputEnterBack:function (info) {
            addRowTable(info)
        },
        importEnterBack:function(infoList){
            for(var i=0;i<infoList.length;i++){
                addRowTable(infoList[i],1)
            }
        }
    })

    function addRowTable(info,flag){
        //对于批发换货单目前没有赠品列，且对于串号带入的最后一个批发出库是赠品的串号：在批发换货单的换入表体里面以“仓库”、“单价”为维度新加一行“单价”为0的数据行（非只读、用户可后续编辑），
        // 若已存在有此仓库、此商品、此单价（为0的数据行），
        // 则加入此行；如果仓库、商品、单价不一致，则需要加载入至新一行数据，注意此行含数据单价为0、金额为0，而成本列与正常商品取值一致。
        info.goodsName=info.name;
        info.ifManageIMei=info.ifManageImei;
        info.auxliaryImeiLength=info.auxiliaryImeiLength;
        info.goodsNumber=1;


        var queryModel = {
            goodsId:$.trim(info.goodsId),
            storageId:$.trim(info.storageId),
            price:$.parseFloat(info.price).toFixed(2),
        };
        var imeiModel = {
            cost:info.costPrice,
            imei:info.imei,
            remark:info.imeiRemark,
            auxiliaryImei:info.auxiliaryImei
        };
        var dataGridCallBack="";
        if(type==21){//批发退货单
            dataGridCallBack=dataGrid;
            queryModel.giftFlag=info.giftFlag==0?'':'√'
        }else if(type==20){//销售换货单
            dataGridCallBack=dataGrid;
        }
        if(!dataGridCallBack.isExistRow(queryModel)){
            info.salesInstrorageImDraftList = JSON.stringify([imeiModel])
            mergeTableData(info,dataGridCallBack);
        }else{
            var row = dataGridCallBack.getRowByModel(queryModel);
            var imeiList = JSON.parse(row.salesInstrorageImDraftList);
            for ( var int = 0; int < imeiList.length; int++) {
                if(imeiList[int].imei == imeiModel.imei ||
                    ($.trim(imeiList[int].auxiliaryImei)!="" && $.trim(imeiList[int].auxiliaryImei)== $.trim(imeiModel.imei)) ){
                    if(flag===1){
                        return
                    }else{
                        $.MsgBox("消息提示","串号已经引入");
                    }
                    return ;
                }
            }
            imeiList.push(imeiModel);
            $("#"+row.gridId).jqGrid('setCell', row.rowId ,"salesInstrorageImDraftList" ,JSON.stringify(imeiList));
            $("#"+row.gridId).jqGrid('setCell', row.rowId ,"goodsNumber" ,(parseInt(row.goodsNumber) + Number(info.goodsNumber)));
            $("#"+row.gridId).jqGrid('setCell', row.rowId ,"costPrice" ,(parseInt(row.costPrice) + Number(info.costPrice)));
        }
        dataGridCallBack.clearRowByPara({goodsId:''});
        summary();
    }
    //合并表格数据
    function mergeTableData(obj,jqGrid) {
        var appendSwitch=false;
        //汇总每一行
        var idsFist=jqGrid.$grid.getDataIDs();
        $.each(idsFist,function(i,i_value){
            var i_currRow = jqGrid.$grid.jqGrid('getRowData', i_value);
            var i_goodsId = i_currRow.goodsId; //商品id
            var i_storageId = i_currRow.storageId; //仓库id
            var i_goodsNumber = i_currRow.goodsNumber; //
            var i_costPrice = i_currRow.costPrice; //
            var i_price = i_currRow.price; //
            var i_salesInstrorageImDraftList = JSON.parse(i_currRow.salesInstrorageImDraftList||'[]'); //仓库id
            if(obj.storageId==i_storageId && obj.goodsId == i_goodsId &&  obj.i_price == i_price){
                appendSwitch=true;
                var flag=false;
                var salesInstrorageImDraftList = JSON.parse(obj.salesInstrorageImDraftList)[0];
                //检查有没有重复的录入
                for(var j=0;j<i_salesInstrorageImDraftList.length;j++){
                    var i_salesInstrorageImDraftListItem=i_salesInstrorageImDraftList[j];
                    i_salesInstrorageImDraftListItem.auxiliaryImei = i_salesInstrorageImDraftListItem.auxiliaryImei==null?"":i_salesInstrorageImDraftListItem.auxiliaryImei;
                    if(i_salesInstrorageImDraftListItem.imei==salesInstrorageImDraftList.imei && i_salesInstrorageImDraftListItem.auxiliaryImei==salesInstrorageImDraftList.auxiliaryImei ){
                        flag=true;
                        break;
                    }
                }
                if(flag==false){
                    i_salesInstrorageImDraftList.push(salesInstrorageImDraftList)
                    jqGrid.$grid.jqGrid("setCell",i_value,"salesInstrorageImDraftList",JSON.stringify(i_salesInstrorageImDraftList));
                    jqGrid.$grid.jqGrid("setCell",i_value,"goodsNumber",Number(i_goodsNumber)+Number(obj.goodsNumber));
                    jqGrid.$grid.jqGrid("setCell",i_value,"costPrice",Number(i_costPrice)+Number(obj.costPrice));
                    return false;
                }
            }
        });
        if(appendSwitch==false){
            jqGrid.addRowData(MyEiditGrid.getMaxRowid($("#"+jqGrid.gridId))+1,obj);
        }
    }
}


