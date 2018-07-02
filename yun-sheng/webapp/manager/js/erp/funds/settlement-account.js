$(function(){
	initUpGrid();
	initDownGrid();
	initTime();
	loadBillsDetailModal();
	contactunitGrid();
	managerGrid();
	addSettlement();
	getAuthList(initDealDate);
    var urlParam=$.trim(functionObjExtent.getQueryString('urlParam'));
    //使用code 来 触发tab
    if(urlParam==51){
        //预付冲应付
        $(".tab_1 a").click();
		addSettle(2);
    }else if(urlParam==52){
        //应付冲应付
        $(".tab_2 a").click();
    }else if(urlParam==53||urlParam==1){
        //预收冲应收 	//预收款跳转到预收冲应收
        $(".tab_3 a").click();
		addSettle();
    }else if(urlParam==54){
        //应收冲应收
        $(".tab_4 a").click();
    }else if(urlParam==55){
        //应收冲应付
        $(".tab_5 a").click();
    }

	if(billsCode!="" && billsCode!=null && billsCode!=undefined && billsId != ''){
		var param={};
		param.billsCode=billsCode;
		param.id = billsId
		pageAjax(param);
	} else {
		getDefaultValues();
	}

    //输入框得到焦点时
    $("input").on('focus',function(){
        this.select()
    })
});	


//添加表头默认值及明细表数据
function addSettle(type){
	//获取部门
	var unitName=$.trim(functionObjExtent.getQueryString('unitName'));
	var unitId=$.trim(functionObjExtent.getQueryString('unitId'));

	var Code=$.trim(functionObjExtent.getQueryString('Code'));

	//单位
	$("#outUnitName").val(unitName);
	$("#outUnit").val(unitId);

	//添加预收支明细
	var param={
        contactUnitId: unitId,
		billsCode: Code,
        flag:3,
		payType: type || 1
	};

     $.request({
     	url:"/manager/inventory/fund/common/verification/getOrderVoList",
     	type : 'post',
     	async: false,
     	//data: JSON.stringify(param),
         data: param,
    	success:function(res){
    		if(res && res.data){
     			appendGridData(param.flag,res.data.orderVoList);
     		}
    	}
     });

};

//获取默认值
function getDefaultValues(){
	var obj={
		success:function(data){
			$('#billsHeaderForm input[name="sectionName"]').val(data.data.defaultSection.name)
			$('#billsHeaderForm input[name="sectionId"]').val(data.data.defaultSection.sectionId)
			$('#billsHeaderForm input[name="managerUname"]').val(data.data.defaultEmployee.name).data('id',data.data.defaultEmployee.employeeId)
			$('#billsHeaderForm input[name="managersUid"]').val(data.data.defaultEmployee.employeeId)
		}
	}
	InterfaceInventory.common.getDefaultValues(obj);
}

//冲销金额值校验
$("#adjustAmount").bind("input propertychange",function(){
	clearNoNum(event,this);
});

$("#adjustAmount").blur(function(){
	verifyNum(this);
});

var colNames = ['id','账务主表id','往来单位id','单据日期','单据类型','单据编号','单据部门','金额','已核销金额','本次核销金额','未核销金额','备注'];
var JqGridColModel=[
                    {name:0,index:0, width:100,align:'center',sortable:false,key:true,hidden:true},
                    {name:'accountMainId',index:'accountMainId', width:100,align:'center',sortable:false,hidden:true},
                    //{name:'detailId',index:'detailId', width:100,align:'center',sortable:false,hidden:true},
                    {name:'contactUnitId',index:'contactUnitId', width:1,align:'center',hidden:true,sortable:false},
					{name:'billsDateStr',index:'billsDateStr', width:100,align:'center', sorttype:'string',sortable:false},
					{name:'billsTypeName',index:'billsTypeName', width:150,align:'center', sorttype:'string',sortable:false},
					{name:'billsCode',index:'billsCode', width:220,align:'center', sorttype:'string',sortable:false},
					{name:'sectionName',index:'sectionName', width:200,align:'center', sorttype:'string',sortable:false},
					{name:'billsAmount',index:'billsAmount', width:100,align:'center',  sorttype:'string',formatter:"number",sortable:false},
					{name:'hasHxAmount',index:'hasHxAmount', width:100,align:'center', sorttype:'string',formatter:"number",sortable:false},
					{name:'curHxAmount',index:'curHxAmount', width:100,align:'center', sorttype:'string',editable:true,formatter:"number",editoptions:{
						readonly:false,
						onblur:"cellOnBlurs(this)",
						onkeyup:"hxAmountChange(this);",
                        dataEvents: [{
                            type: "focus",
                            fn: function(){
                                this.select()
                            }
                        }
                        ]},
						sortable:false},
					{name:'remainingHxAmount',index:'remainingHxAmount', width:100,align:'center', sorttype:'string',formatter:"number",sortable:false},
					{name:'remark',index:'remark', width:150,align:'center', sorttype:'string',editable:true,editoptions:{readonly:false,onblur:"cellOnBlur()",onkeyup:"checkInput.clearNoText(this,100)"},sortable:false},
					
              ];	

var invalidFlag=2;
var index=0;//选项卡下标
var payType="";//往来账务主表收付款类型（1预收款2预付款3应付4应收）
var flag=0;//为1有商品明细，3无商品明细
var addFlag=true;//页面是新增状态标志
var total=1;//总记录数
var pageIndex=0;
var adjustType="";
var type="";
function getSettlementType(){
	if(index==0){
		type=51;
	}else if(index==1){
		type=52;
	}else if(index==2){
		type=53;
	}else if(index==3){
		type=54;
	}else if(index==4){
		type=55;
	}
	return type;
}

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

//取消单元格编辑
function cancleEditGrid(){
	 $(options.TableNameUp).setGridParam({cellEdit:false});
	 $(options.TableNameDown).setGridParam({cellEdit:false});
}

//获取分页查询单据表头参数
function getSelectPageParam(){
    var param=comGetFilterParam();
	param.reserve1=index+1;
	return param;
}

//过滤按钮单击事件
var filter=false;
function filterModalBtnClick(){
	filter=true;
	$("#filterModel").modal("show");
}

//过滤查询
function filterSearch(){
	$("#filterModel").modal("hide");
	pageIndex=0;
    var param=comGetFilterParam();
	param.reserve1=index+1;
	pageAjax(param);
}

//上一单，下一单,首单，末单分页查询ajax请求
function pageAjax(param){
	cancleEditGrid();
	$.request({
		url:"../../funds/settlement/selectSettlementList/"+pageIndex,
		type : 'POST',  
		dataType: "json",
		contentType :'application/json', 
		async:false,
		data:JSON.stringify(param),
		success:function(data){
		  if(data.result==1){
			  if(data.data.rows.length>0){
				  clearGridData();  
			  }
			  forbiddenEdit();
			  fillTopData(data.data);
			  fillGridData(data.data);
		  }else{
			  $.zxsaas_plus.showalert("错误",data.desc);
		  }
	    }
	});
}

//填充核销明细数据
function fillGridData(data){
		if(data.gridList1!=undefined && data.gridList1.length>0){
			for(var i=0;i<data.gridList1.length;i++){
				  $(options.TableNameUp).jqGrid('addRowData', i+1,data.gridList1[i], 'last' );
			 }
		}
		if(data.gridList2!=undefined && data.gridList2.length>0){
			for(var i=0;i<data.gridList2.length;i++){
				  $(options.TableNameDown).jqGrid('addRowData', i+1,data.gridList2[i], 'last' );
			 }
		}
}

//填充单据表头信息
function fillTopData(data){
	total=data.total;
	if(total==0){
		$.zxsaas_plus.showalert("提示","没有查询到单据!");
	}
	pageIndex=data.pageIndex;
	addFlag=data.addFlag;
	var billsHeader=data.rows[0];
	if(billsHeader!=undefined){
		if(billsHeader.billsDate!=""){
			billsHeader.billsDate=billsHeader.billsDate.substring(0,10);
		}
		$("#managerUname").val(billsHeader.managersUname);
		$("#adjustAmount").val(billsHeader.adjustAmount==null?"0.00":billsHeader.adjustAmount);
		//enableOrDisableHxFunction(billsHeader.reserve2);
		if(billsHeader.billsStatus=="6"){
			$('.rightMap img').attr('src','../../images/guozhang.png');
			
			if(billsHeader.reserve2 !=1){
				$(".btnHundred .invalid").removeAttr("disabled");
			}else{
				$(".btnHundred .invalid").attr("disabled","disabled");
			}
		}else if(billsHeader.billsStatus=="7"){
			$('.rightMap img').attr('src','../../images/status/statusRed.png');
			$(".btnHundred .invalid").attr("disabled","disabled");
		}
		
	}else{
		$("#adjustAmount").val("0.00");
		$('.rightMap img').removeAttr("src");
	}
	
    $("#billsHeaderForm").writeJson2Dom(billsHeader);
    $("#bottomForm").writeJson2Dom(billsHeader);
    getSettlementType()
}

//新增按钮点击事件
function addSettlement(){
	addFlag=true;
	clearGridData();
	filter=false;
	getAuthList(initDealDate);
	initTime();
	allowEdit();
	$("#adjustAmount").val("0.00");
	$("#checkedHasnotAmount").html("0.00");
	$('.rightMap img').removeAttr("src");
	//enableOrDisableHxFunction(0);
	total=1;pageIndex=0;
	$("#filterSearchForm")[0].reset();
	getDefaultValues();

}

//重置
function reset(){
	$("#filterSearchForm")[0].reset();
	initTime();
}

//选项卡点击事件
$(".tab_div li").bind("click",function(){
	clearGridData();
	if($("#billsHeaderForm").data('bootstrapValidator')!=undefined){
		$("#billsHeaderForm").data('bootstrapValidator').resetForm();// 重置验证规则
	}
	index=$(this).index();
	if(index==0){//预付冲应付
		$("#3").attr("payType",2);
		$("#1").attr("payType",3);
		$("#3").text("引入预付明细");
		$("#1").text("引入应付明细");
		$("#upGridDiv1").show();
		$("#upGridDiv2").show();
		$("#unitSpan1").html("预付单位：");
		$("#unitSpan2").html("应付单位：");
	}
	if(index==1){//应付冲应付
		$("#1").attr("payType",3);
		$("#upGridDiv1").hide();
		$("#upGridDiv2").hide();
		$("#1").text("引入应付明细");
		$("#unitSpan1").html("转出单位：");
		$("#unitSpan2").html("转入单位：");
	}
	if(index==2){//预收冲应付
		$("#3").attr("payType",1);
		$("#1").attr("payType",4);
		$("#3").text("引入预收明细");
		$("#1").text("引入应收明细");
		$("#upGridDiv1").show();
		$("#upGridDiv2").show();
		$("#unitSpan1").html("预收单位：");
		$("#unitSpan2").html("应收单位：");
	}
	if(index==3){//应收冲应收
		$("#1").attr("payType",4);
		$("#upGridDiv1").hide();
		$("#upGridDiv2").hide();
		$("#1").text("引入应收明细");
		$("#unitSpan1").html("转出单位：");
		$("#unitSpan2").html("转入单位：");
	}
	if(index==4){//应收冲应付
		$("#3").attr("payType",4);
		$("#1").attr("payType",3);
		$("#3").text("引入应收明细");
		$("#1").text("引入应付明细");
		$("#upGridDiv1").show();
		$("#upGridDiv2").show();
		$("#unitSpan1").html("应收单位：");
		$("#unitSpan2").html("应付单位：");
	}
	$("#adjustAmount").val("0.00");
	//查询状态切换选项卡，默认查询id最大的最后一张单据
	if(!addFlag){
		lastPage();
	}
	getDefaultValues();
});


//清空表格数据
function clearGridData(){
	jQuery(options.TableNameUp).jqGrid("clearGridData");
	jQuery(options.TableNameDown).jqGrid("clearGridData");
	$("#billsHeaderForm input").not('#billsDate').val("");
	$("#sectionName").val(sectionName);
	$("#sectionId").val(sectionId);
}

//********************************************
$.jgrid.defaults.width = 1280;
$.jgrid.defaults.responsive = true;
$.jgrid.defaults.styleUI = 'Bootstrap';	

var options = {
        LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
        TableNameUp: "#jqGrid_tab_up", 
        TableNameDown: "#jqGrid_tab_down", 
        TableNameBillsModal:"#jqGrid_tab_Bills_modal",
        BillsModalId:"#bills_modal_id",//引入明细模态框的id
        iconJsonUrl:"../json/icon.json",
        btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
   };

//单据明细点击事件（无商品明细）
function yingruUpBtnClick(btnId){
	flag=btnId;
	payType=$("#"+btnId+"").attr("payType");
	var outUnit=$("#outUnit").val();
		if(outUnit==""){
			if(index==0){
				$.zxsaas_plus.showalert("提示","请先选择预付单位!");
				return;
			}
			if(index==2){
				$.zxsaas_plus.showalert("提示","请先选择预收单位!");
				return;
			}
			if(index==4){
				$.zxsaas_plus.showalert("提示","请先选择应收单位!");
				return;
			}
		}
	var param=getLoadImportModalParam();
	loadImportModal(param)
	$("#unitNameSpan").html($("#outUnitName").val());
	$("#adjustAmountSpan").html($("#adjustAmount").val().trim());
	$("#checkedHasnotAmount").html("0.00");
	$("#bills_modal_id input").val("");
	$(options.BillsModalId).modal("show");
}

//单据明细点击事件（有商品明细）
function yingruDownBtnClick(btnId){
	flag=btnId;
	$("#checkedHasnotAmount").html("0.00");
	payType=$(".tab_6s").attr("payType");
	var inUnit=$("#inUnit").val();
	var outUnit=$("#outUnit").val();
		if(index==0){
			if(inUnit==""){
				$.zxsaas_plus.showalert("提示","请先选择应付单位!");
				return;
			}
		}
		if(index==1){
			if(outUnit==""){
				$.zxsaas_plus.showalert("提示","请先选择转出单位!");
				return;
			}
		}
		if(index==2){
			if(inUnit==""){
				$.zxsaas_plus.showalert("提示","请先选择应收单位!");
				return;
			}
		}
		if(index==3){
			if(outUnit==""){
				$.zxsaas_plus.showalert("提示","请先选择转出单位!");
				return;
			}
		}
		if(index==4){
			if(inUnit==""){
				$.zxsaas_plus.showalert("提示","请先选择应付单位!");
				return;
			}
		}
	var param=getLoadImportModalParam();
	loadImportModal(param);
	if(index==1 || index==3){
		$("#unitNameSpan").html($("#outUnitName").val());
	}else{
		$("#unitNameSpan").html($("#inUnitName").val());
	}
	$("#adjustAmountSpan").html($("#adjustAmount").val().trim());
	$("#bills_modal_id input").val("");
	$(options.BillsModalId).modal("show");
}

//加载引入模态框
function loadImportModal(param){
	param.startTime=null;
	param.endTime=null;
	$(options.TableNameBillsModal).jqGrid('setGridParam',{
	    url:"/manager/inventory/fund/common/verification/getOrderVoList",
        datatype:'json',  
        traditional: true,
        postData:param
    }).trigger("reloadGrid").resize();
}

//获取加载引入模态框参数
function getLoadImportModalParam(){
	var param={};
	if(index==0 && flag==3){
		param.contactUnitId=$("#outUnit").val();
		param.flag=3;
	}else if(index==0 && flag==1){
		param.contactUnitId=$("#inUnit").val();
		param.flag=1;
	}else if(index==1){
		param.contactUnitId=$("#outUnit").val();
		param.flag=1;
	}else if(index==2 && flag==3){
		param.contactUnitId=$("#outUnit").val();
		param.flag=3;
	}else if(index==2 && flag==1){
		param.contactUnitId=$("#inUnit").val();
		param.flag=1;
	}else if(index==3){
		param.contactUnitId=$("#outUnit").val();
		param.flag=1;
	}else if(index==4 && flag==3){
		param.contactUnitId=$("#outUnit").val();
		param.flag=1;
	}else if(index==4 && flag==1){
		param.contactUnitId=$("#inUnit").val();
		param.flag=1;
	}
	param.resBillsType=type;
	param.payType=payType;
	return param;
}

//模态框保存按钮单击事件
function saveModalData(){
	var checkedIds=$(options.TableNameBillsModal).jqGrid("getGridParam","selarrrow");
	var array=new Array();
	if(checkedIds.length>0){
		$.each(checkedIds,function(i,value){
			var rowData = $(options.TableNameBillsModal).jqGrid("getRowData",value);
			array.push(rowData);
		})
	}
	$(options.BillsModalId).modal("hide");
	//往页面表格加入数据
	appendGridData(flag,array);
}

//往明细表格里面添加数据
function appendGridData(flag,array){
	if(flag==3){
		jQuery(options.TableNameUp).jqGrid("clearGridData");
		$.each(array,function(i,value){
			$(options.TableNameUp).jqGrid('addRowData', i+1,value, 'last' );
		});
	}else if(flag==1){
		jQuery(options.TableNameDown).jqGrid("clearGridData");
		$.each(array,function(i,value){
			$(options.TableNameDown).jqGrid('addRowData', i+1,value, 'last' );
		});
	}
}


var lastrow="";
var lastcell="";

var iRow="";
var iCol="";
//初始化预付明细
function initUpGrid(){
	  var lastsel='';//最后一次选中的行
	  var rightClickColid="";//右键列id
	  var rightClickColIndex=0;//右键index
	  var mydata;
	  var hid=false;
	  var lock=false;
	  var myobj=[];
	loadtable();
	function loadtable(){
			$(options.TableNameUp).jqGrid({
				mtype:"GET",
				datatype: "local",
				jsonReader  : {	
				        root: "data.hxDeatilList",
						repeatitems: false
							},
				colNames:colNames,          
	            colModel:JqGridColModel,
	            rownumbers:true,
	            cellsubmit: 'clientArray',//单元格保存内容的位置		
	            editurl: 'clientArray',
	           	cellEdit:true,
	            width: "90%" ,
				autowidth:true,
				rowNum:10000000,
				rownumWidth: 40, // the width of the row numbers columns
				shrinkToFit:false,  
				footerrow:true,  //设置表格显示表脚
				userDataOnFooter:true,
				beforeEditCell:function(rowid,cellname,v,iRow,iCol){
					lastrow = iRow;
					lastcell = iCol;		
				},
				afterSaveCell:function(rowid,name,val,iRow,iCol){//保存编辑
					lastrow = iRow;
					lastcell = iCol;	
		        },
				gridComplete:function(data){
					footerData(options.TableNameUp);
					$(".footrow-ltr").find("td").eq(0).text("合计");
					if(index==4){
						$(options.TableNameUp).setGridParam().showCol("goodsName");
					}else{
						$(options.TableNameUp).setGridParam().hideCol("goodsName");
					}
				}
			})
		 jQuery(options.TableNameUp).jqGrid('setLabel',0, '序号');
	}
}

//初始化应付明细
function initDownGrid(){
	  var lastsel='';//最后一次选中的行
	  var rightClickColid="";//右键列id
	  var rightClickColIndex=0;//右键index
	  var mydata;
	  var hid=false;
	  var lock=false;
	  var myobj=[];
	loadtable();
	function loadtable(){
			$(options.TableNameDown).jqGrid({
				mtype:"GET",
				datatype: "local",
				jsonReader  : {	
				        root: "data.hxDeatilList",
						repeatitems: false
							},
				colNames:colNames,          
	            colModel:JqGridColModel,
	            rownumbers:true,
	            cellsubmit: 'clientArray',//单元格保存内容的位置		
	            editurl: 'clientArray',
	           	cellEdit:true,
	            width:'90%' ,
				autowidth:true,
				rowNum:10000000,
				rownumWidth: 40, // the width of the row numbers columns
				shrinkToFit:false,  
				footerrow:true,  //设置表格显示表脚
				userDataOnFooter:true,
				beforeEditCell:function(rowid,cellname,v,iRow,iCol){
					lastrow = iRow;
					lastcell = iCol;		
				},
				afterSaveCell:function(rowid,name,val,iRow,iCol){//保存编辑
					lastrow = iRow;
					lastcell = iCol;	
		        },
				gridComplete:function(data){
					footerData(options.TableNameDown);
					$(".ui-jqgrid-hbox tr:last").find("td").eq(0).text("合计");
				}
			})
		 jQuery(options.TableNameDown).jqGrid('setLabel',0, '序号');
	}
}

//加载单据明细模态框
function loadBillsDetailModal(){
			$(options.TableNameBillsModal).jqGrid({
				mtype:"POST",
				datatype: "local",
				jsonReader  : {	
				        root: "data.orderVoList",
						repeatitems: false
							},
				colNames:colNames,          
	            colModel:JqGridColModel,
	            rownumbers:true,
	           	cellEdit:false,
	            width:'96%' ,
				autowidth:true,
				rownumWidth:40, // the width of the row numbers columns
				multiselect:true,// 定义是否可以多选
	            multiselectWidth:30,
	            rowNum:10000000,
				forceFit:true,
				gridComplete:function(data){
					if(flag==3){
						$(options.TableNameBillsModal).setGridParam().hideCol("goodsName");	
						$(".goodNameSpan").css("display","none");
					}else if(flag==1){
						$(options.TableNameBillsModal).setGridParam().showCol("goodsName");	
						$(".goodNameSpan").show();
					}	
					if(index==4){
						$(options.TableNameBillsModal).setGridParam().showCol("goodsName");	
						$(".goodNameSpan").show();
					}
					$(options.TableNameBillsModal).setGridParam().hideCol("curHxAmount");
					$(options.TableNameBillsModal).closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });
				}
			})
		 jQuery(options.TableNameBillsModal).jqGrid('setLabel',0, '序号');
}

//页脚合计
function footerData(tableId){
	var billsAmount = $(tableId).getCol('billsAmount',false,'sum').toFixed(2);
	var hasHxAmount = $(tableId).getCol('hasHxAmount',false,'sum').toFixed(2);
	var curHxAmount = $(tableId).getCol('curHxAmount',false,'sum').toFixed(2);
	var remainingHxAmount = $(tableId).getCol('remainingHxAmount',false,'sum').toFixed(2);
	$(tableId).jqGrid('footerData','set',{
        "billsAmount": billsAmount,
        "hasHxAmount": hasHxAmount,
        "curHxAmount": curHxAmount,
        "remainingHxAmount": remainingHxAmount,
       }
	);
}


//计算已选未核销金额
$('body').delegate("#cb_jqGrid_tab_Bills_modal,.ui-row-ltr","click",function(e){
	var ids=$(options.TableNameBillsModal).jqGrid("getGridParam","selarrrow");
	var remainingHxAmount=Number(0.00);
	if(ids.length>0){
		$.each(ids,function(i,value){
            remainingHxAmount +=Number($(options.TableNameBillsModal).getCell(value,"remainingHxAmount"));
		});
	}
	$("#checkedHasnotAmount").html($.formatFloat(remainingHxAmount,2));
});

//引入明细查询按钮点击事件
function searchDetail(){
	$("#checkedHasnotAmount").html("0.00");
	 var param=$("#bills_modal_id").toJsonObject();
    param.startTime=$("#beginTime").val()
	 delete param.beginTime
	 param.payType=payType;
	 if(index==4){
		 param.flag=1;
	 }
	 jQuery(options.TableNameBillsModal).jqGrid("clearGridData");
	 $(options.TableNameBillsModal).jqGrid('setGridParam',{  
	       datatype:'json',  
	       traditional: true,
	       postData:param
	   }).trigger("reloadGrid").resize();
}

//改变未核销金额
function changeHasnotAmount(id,tableId){
		var billsAmount=$(tableId).getCell(id,"billsAmount");//金额
		var hasHxAmount=$(tableId).getCell(id,"hasHxAmount");//已核销金额
		var curHxAmount=$("#"+id+"_curHxAmount").val();//本单核销金额
		var sdf=accSubtr(Number(billsAmount),Number(hasHxAmount))
		var remainingHxAmount=accSubtr(sdf,Number(curHxAmount));//未核销金额
		if(Number(curHxAmount)<0){
			$.zxsaas_plus.showalert("提示","本次核销金额不能小于0!");
			$(tableId).jqGrid('setCell',id,"curHxAmount","0.00");
		}
		
		if(remainingHxAmount<0){
			$.zxsaas_plus.showalert("提示","未核销金额不能小于0!");
            remainingHxAmount=0.00;
			$(tableId).jqGrid('setCell',id,"remainingHxAmount","0.00");
			//本单核销金额==金额-已核销金额
			$(tableId).jqGrid('setCell',id,"curHxAmount",Number($(tableId).getCell(id,"billsAmount"))-Number($(tableId).getCell(id,"hasHxAmount")));
			footerData(tableId);
		}else{
			$(tableId).jqGrid('setCell',id,"remainingHxAmount",remainingHxAmount);
			var sumHxAmount=$(tableId).getCol('curHxAmount',false,'sum').toFixed(2);
			if(curHxAmount!="" && curHxAmount!=undefined){
				sumHxAmount=parseFloat(sumHxAmount)+parseFloat(curHxAmount.replace(/\,/g, ""));
				$(tableId).jqGrid('footerData','set',{
			        "curHxAmount":sumHxAmount,
			        "remainingHxAmount":$(tableId).getCol('remainingHxAmount',false,'sum').toFixed(2),
			       }
				);
			}
			
		}
		
		
	$('#' + id + '_curHxAmount').blur('input propertychange', function(){
		saveAndCountData();
    });
	
	$(document).delegate('#' + id + '_curHxAmount', "contextmenu", function(e){
		return false;
	});
}

//编辑时及时统计页面
function footDataTimelyWhenEdit(tableId,hxAmountTemp){
	var billsAmount = $(tableId).getCol('billsAmount',false,'sum').toFixed(2);
	var hasHxAmount = $(tableId).getCol('hasHxAmount',false,'sum').toFixed(2);
	var curHxAmount=$.formatFloat(Number($(tableId).getCol('curHxAmount',false,'sum').toFixed(2)+Number(hxAmountTemp)),2);
	var remainingHxAmount = $(tableId).getCol('remainingHxAmount',false,'sum').toFixed(2);
	$(tableId).jqGrid('footerData','set',{
        "billsAmount": billsAmount,
        "hasHxAmount": hasHxAmount,
        "curHxAmount": curHxAmount,
        "remainingHxAmount": remainingHxAmount,
       }
	);
}


//保存最后编辑的单元格并统计
function saveAndCountData(){
	$(options.TableNameUp).jqGrid("saveCell",lastrow,lastcell);
	$(options.TableNameDown).jqGrid("saveCell",lastrow,lastcell);
	footerData(options.TableNameUp);
	footerData(options.TableNameDown);
}

//jqgrid退出编辑状态
function cellOnBlur(){
	saveAndCountData();
}

function cellOnBlurs(obj){
	saveAndCountData();
}


//保存并过账
function saveAndPost(){
	//cancleEditGrid();
	$(options.TableNameUp).jqGrid("saveCell",lastrow,lastcell);
	
	var checkNullResult=checkNullColumn();
	if(checkNullResult){
		return;
	}
	$("#billsHeaderForm").data('bootstrapValidator').validate();  
	if(!($('#billsHeaderForm').data('bootstrapValidator').isValid())){
		refreshValidator('#billsHeaderForm');
	    return ;
	}
	var checkAmountResult=judgeAmountEqual();
	if(checkAmountResult){
	//	$.zxsaas_plus.showalert("提示","核销金额与冲销金额不相等!");
		return;
	}
	var param=getSaveAndPostParam();
	param.billsDate=$('#billsDate').val();
	$.request({
		url:"../../funds/settlement/saveAndPost",
		type : 'POST',  
		dataType: "json",
		contentType :'application/json', 
		data:JSON.stringify(param),
		success:function(data){
	      $("#billsHeaderForm").data('bootstrapValidator').resetForm();
		  $.zxsaas_plus.showalert("提示",data.desc);
		  if(data.result !=-1){
			  var param=getSelectPageParam();
			  param.id=data.result;
			  param.billsType=type;
			  pageAjax(param);
		  }
	    }
	});
}

//判断冲销金额与本次核销金额是否相等
function judgeAmountEqual(){
	var flag=false;
	var adjustAmount=Number($("#adjustAmount").val());
	if(index==0 || index==2 || index==4){
		var hxAmountSum1=Number($(options.TableNameUp).getCol('curHxAmount',false,'sum').toFixed(2));
		var hxAmountSum2=Number($(options.TableNameDown).getCol('curHxAmount',false,'sum').toFixed(2));
		if(adjustAmount == "0.00" || adjustAmount == ""){
			$.zxsaas_plus.showalert("提示","冲销金额不能为0!");
			flag=true;
		}else if(hxAmountSum1=="0"||hxAmountSum2=="0"){
			$.zxsaas_plus.showalert("提示","核销金额不能为0!");
			flag=true;
		}else if(adjustAmount!=hxAmountSum1||adjustAmount!=hxAmountSum2||hxAmountSum1!=hxAmountSum2){
			$.zxsaas_plus.showalert("提示","核销金额与冲销金额不相等!");
			flag=true;
		}
	}else if(index==1 || index==3){
		var hxAmountSum2=Number($(options.TableNameDown).getCol('curHxAmount',false,'sum'));
		if(adjustAmount == "0.00" || adjustAmount == ""){
			$.zxsaas_plus.showalert("提示","冲销金额不能为0!");
			flag=true;
		}else if(hxAmountSum2=="0"||hxAmountSum2==null){
			$.zxsaas_plus.showalert("提示","核销金额不能为0!");
			flag=true;
		}else if(adjustAmount!=hxAmountSum2){
			$.zxsaas_plus.showalert("提示","核销金额与冲销金额不相等!");
			flag=true;
		}
	}
	return flag;
}

//获取保存并过账参数
function getSaveAndPostParam(){
	var param =$("#billsHeaderForm").toJsonObject();
	type=getSettlementType();
	param.billsType=type;
	param.reserve1=index+1;
	param.billsStatus=1;
	delete param.sectionName;
	delete param.managerUname;
	delete param.outUnitName;
	delete param.inUnitName;
	//核销数据
	param.hxDetailDraft=getHxData();
	return param;
}

//保存并过账时获取核销数据，且本单核销金额不为0
function getHxData(){
	var array=new Array();
	//无商品明细的核销数据
	if(index==0 || index==2 || index==4 ){
		var idsUp = $(options.TableNameUp).jqGrid('getDataIDs');
		if(idsUp.length>0){
			$.each(idsUp,function(i,value){
				var hxParam={};
				var rowData = $(options.TableNameUp).jqGrid('getRowData',value);
				if(rowData.curHxAmount !="0.00"){
					//console.log(rowData.detailId)
					//hxParam.detailId=rowData.detailId;
					hxParam.mainId=rowData.accountMainId;
					hxParam.hxAmount=Number(rowData.curHxAmount);
					hxParam.remark=rowData.remark;
					//1预收款2预付款3应付4应收(保存核销草稿表没有单据编号,往来单位为表单对应的单位)
					if(index==0){//预付冲应付（预付）
						hxParam.payType=2;
					}else if(index==2){//预收冲应收（预收）
						hxParam.payType=1;
					}else if(index==4){//应收冲应付(应收)
						hxParam.payType=4;
					}
					hxParam.contactsunitId=$("#outUnit").val();
					delete hxParam.id;
					array.push(hxParam);
				}else{
					//清空本单核销金额为0的数据
				   $(options.TableNameUp).jqGrid("delRowData", value);   
				}
			});
		}
	}
	
	//有商品明细核销数据
	var idsDown=$(options.TableNameDown).jqGrid('getDataIDs');
	if(idsDown.length>0){
		$.each(idsDown,function(i,value){
			var hxParam={};
			var rowData = $(options.TableNameDown).jqGrid('getRowData',value);
			if(rowData.curHxAmount !="0.00"){
				//console.log(rowData.detailId)
				//hxParam.detailId=rowData.detailId;
				hxParam.mainId=rowData.accountMainId;
				hxParam.hxAmount=Number(rowData.curHxAmount);
				hxParam.remark=rowData.remark;
				//1预收款2预付款3应付4应收
				if(index==0 || index==1 || index==4){//预付冲应付（应付）
					hxParam.payType=3;
				}else if(index==2 || index==3){//预收冲应收（应收）
					hxParam.payType=4;
				}
				if(index==0 || index==2 || index==4){
					hxParam.contactsunitId=$("#inUnit").val();
				}else{
					hxParam.contactsunitId=$("#outUnit").val();
				}
				delete hxParam.id;
				array.push(hxParam);
			}else{
				//清空本单核销金额为0的数据
			   $(options.TableNameDown).jqGrid("delRowData", value);   
			}
		});
	}
	return array;
}

//校验保存参数非空字段
function checkNullColumn(){
	var param=$("#billsHeaderForm").toJsonObject();
	var flag=false;
	if(index==1 || index==3){
		if(param.inUnit==param.outUnit){
			$.zxsaas_plus.showalert("提示","转出单位和转入单位不能相同!");
			flag=true;
			return flag;
		}
	}

}

//禁止页面编辑,禁用选择按钮
function forbiddenEdit(){
	$("#billsHeaderForm input[name='billsDate'],input[name='remark'],input[name='adjustAmount']").attr("readonly","readonly");
	$("#billsHeaderForm :button").attr("disabled","disabled");
	$('#downGridDiv1 button').attr('disabled',true);
	$('#3').attr("disabled",true);
	$(options.TableNameUp).setGridParam({cellEdit:false});
	$(options.TableNameDown).setGridParam({cellEdit:false});
	$(".saveAndPost").attr("disabled","disabled");
	$(".btnHundred .invalid").removeAttr("disabled");
}

//允许页面编辑，允许选择按钮
function allowEdit(){
	$(options.TableNameUp).setGridParam({cellEdit:true});
	$(options.TableNameDown).setGridParam({cellEdit:true});
	$("#1").removeAttr("disabled");
	$("#3").removeAttr("disabled");
	$("#billsHeaderForm input[name='billsDate'],input[name='remark'],input[name='adjustAmount']").removeAttr("readonly");
	$("#billsHeaderForm :button").removeAttr("disabled");
	$(".saveAndPost").removeAttr("disabled");
	$(".btnHundred .invalid").attr("disabled","disabled");
}

function hxAmountChange(obj){
	var n=12;
    var str = obj.value;
    var rex = new RegExp('^[0-9]{1,' + (n-2) + '}\.{0,1}[0-9]{0,2}$');
    if(!rex.test(str)){
        $(obj).val('');
        $.zxsaas_plus.showalert('提示','只能包含数字,且至多' + (n+2) + '位,2位小数');
        return;
    }

	var id=obj.id.split("_")[0];
	var tableId=$("#"+id+"_curHxAmount").closest("table").attr("id")
	if(tableId=="jqGrid_tab_up"){
		changeHasnotAmount(id,options.TableNameUp);
	}else{
		changeHasnotAmount(id,options.TableNameDown);
	}
}