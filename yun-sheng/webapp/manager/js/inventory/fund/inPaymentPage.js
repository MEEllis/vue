var menuBtn = null;//菜单栏对象
var dataGrid = null;//表格对象
var page = 1;  //当前页数
var rows = 2;  //每页显示条数
var lastrow;
var lastcell;
var billsType=27; // 付款

$(function () {
    //局部全局对象
	if($("#billsType").val()==27){
		billsType=27;
	}else if($("#billsType").val()==28){
		billsType=28;
	}
    init();
    //初始化页面
    function init() {
        initMenuBtn();
        loadSearchData();
        initDataGrid();
    }
    
  //保存红冲按钮
    $(".redSave").on("click",function(){
    	var type=$("#printType").val();
    	var actionCode="";
    	var param={};
    	if(type){
    		actionCode="qtfk_red";
    	}else{
    		actionCode="qtsk_red";
    	}
    	param={
    			pi_bills_id:$(".redSave").data('id'),
    			pi_bus_opr:"2",
    			pi_invalid_date:$(".redTime").val(),
    			type:type
    	}
    	
    	$.request({
    		url:"/manager/funds/invalidBills/"+actionCode,
    		type : 'POST',  
    		dataType: "json",
    		contentType :'application/json', 
    		data:JSON.stringify(param),
    		success:function(data){

    		   if(data.result !=-1){
                   $.zxsaas_plus.showalert("提示",data.desc);
    			   searchPayment();
                   $('#redModal').modal('hide');

    		   }else {
                   $.zxsaas_plus.showalert("提示",data.desc);
                   $('#redModal').modal('show');
			   }
    	    }
    	});
    });
});
//载入菜单组件
function initMenuBtn() {
    var option = {
        btnGroupLeft: {
            add:{
                isShow:true,
                click:function(){
    				if(billsType==27){
    					//付款
    					window.parent.openWorkBoxByMenutext('内部付款单',basePath + '/funds/payment/otherPayment',false);
    				}
    				else if(billsType==28){
    					window.parent.openWorkBoxByMenutext('内部收款单',basePath + '/funds/payment/otherPayee',false);
    				}
                }
                },
            export:{
               	 isShow: true,
               	 click:function(){
                	exports();
                }
            },
            print:{
                isShow:true,
                click:function(){
            	var ids = $("#accountGrid").jqGrid('getGridParam','selarrrow');
            	if(ids.length != 1){
        			$.zxsaas_plus.showalert("提示","请选择一条需要打印的数据");
        			return
        		}
        		var obj = $("#accountGrid").getRowData(ids);
        		fundCommonInterface.print(billsType,{
        			id:obj.id,
        		});
        		
                 }
            },
            red:{
                isShow:true,
                click:function(){
            	redChong();
                 }
            },
            copy:{
                isShow:true,
                click:function(){
            	var ids = $("#accountGrid").jqGrid('getGridParam','selarrrow');
        		var obj = $("#accountGrid").getRowData(ids);
        		if(ids.length != 1){
        			$.zxsaas_plus.showalert("提示","请选择一条需要复制的数据");
        			return
        		}
        		if(billsType==27){
					//付款
        			window.parent.openWorkBoxByMenutext('内部付款单',basePath + '/funds/payment/otherPayment?isCopy=true&bId='+ obj.id,true);
				}
				else if(billsType==28){
					window.parent.openWorkBoxByMenutext('内部收款单',basePath + '/funds/payment/otherPayee?isCopy=true&bId='+ obj.id,true);
				}
        		
                
            	}
            },
        },
        isAuth:false,
        btnGroupRight:{}
    };
    menuBtn = new componentMenuBtn("#AUTH",option);
}

//载入Serach 表单的 组件
function loadSearchData(){
	loadSearchDate();
	
	//载入 部门组件
	$('#sectionName').storePlu({
/*	saleManId:'sectionName',*/
	checkMore: true,
	search: false,
	isLoadDefaultName:false,
	ifStore:false // 控制部门选项
	});
	//载入 往来部门组件
	$("#contactUnitName").storePlu({
	/*	saleManId:'contactUnitName',*/
		checkMore: true,
		search: false,
        isLoadDefaultName:false,
		ifStore:false // 控制部门选项
    });

    //载入往来职员
    $("#managerUname").funStoreSales({
        checkMore: true
    });


    //载入往来类型
	appendInPayClass();
	
	//载入 模态框 红冲日期
	$('.redTime').datePlu({
		endDate:false
	})
	
}
//载入时间
function loadSearchDate(){
	//载入日期组件
	$('#startDate').datePlu({
		dateEnd:'#endDate',
		endDate:true,
		minTime:"1970-01-01",
	    ifPermissions:false,
	});
}

//拼接往来类型 类别
function appendInPayClass() {
	var $selectId = $("#inpayClassId");
	$selectId.html("");
	var obj={
		success:function(data){
		var payReceiveClassList=data.data.payReceiveClassList;
		var pushArr=[];
		pushArr.push($("<option value=''>请选择</option>"));
	     if (payReceiveClassList.length > 0) {
	            for (var i = 0; i < payReceiveClassList.length; i++) {
	            	var pagItem=payReceiveClassList[i];
	            	if(pagItem.status==0){
	            		pushArr.push($("<option value='" + pagItem.id + "' >" + pagItem.name + "</option>"));
	            	}
	            }
	        }
	     $selectId.append(pushArr);
		}
	};
	fundCommonInterface.findInpayClassAjax(obj);
}


//获取查询参数
function getSearchParam(){

/*    sectionIds false string 部门IDs
    inpayClassId false number 往来类型ID
    wlSectionIds false string 往来部门IDs
    wlUserIds false string 往来职员IDs*/
	var postData = $("#searchQuery").toJsonObject();
	var isContainsRedbills =$("#searchQuery input[name='isContainsRedbills']").is(":checked")?"1":"0";
	var isDisabled =$("#searchQuery input[name='isDisabled']").is(":checked")?"1":"0";
    var sectionIds =$("#searchQuery input[name='sectionName']").data("sectionId")|| "";
    var wlSectionIds =$("#searchQuery input[name='contactUnitName']").data("sectionId")|| "";
    var wlUserIds =$("#searchQuery input[name='managerUname']").data("employeeId")|| "";

	return {
		page:page,
		rows:rows,
		billsType:billsType,
        billsBeginDateStr:postData.billsBeginDateStr,
        billsEndDateStr:postData.billsEndDateStr,
        sectionIds:sectionIds,
        inpayClassId:$("#inpayClassId").val(),
        wlSectionIds:wlSectionIds,
        wlUserIds:wlUserIds,
		remark:postData.remark,
		isDisabled:isDisabled,
		isContainsRedbills:isContainsRedbills
	};
}




//重置
function resetForm() {
    $("#searchQuery")[0].reset();
   $("#searchQuery input[name='isContainsRedbills']").removeAttr("checked");
    $("#searchQuery input[name='isDisabled']").removeAttr("checked");
   $("#searchQuery input[name='sectionName']").data("sectionId","");
    $("#searchQuery input[name='contactUnitName']").data("sectionId","");;
   $("#searchQuery input[name='managerUname']").data("employeeId","");
    $("#inpayClassId").prop('selectedIndex', 0);

    loadSearchDate();
}
//查询
function searchPayment() {
	$('#accountGrid').jqGrid('setGridParam', {
        url:"/manager/inventory/fund/inPayment/getInPaymentPageList",
		postData:getSearchParam()
		
	}).trigger("reloadGrid");
}
//红冲
function redChong(){
	var ids = $("#accountGrid").jqGrid('getGridParam','selarrrow');
	var obj = $("#accountGrid").getRowData(ids);
	if(ids.length != 1){
		$.zxsaas_plus.showalert("提示","请选择一条需要红冲的数据");
		return
	}

	$(".redSave").data('id',obj.id);
	
	codeDate(obj.billsCode,false);
	$('#redModal').modal('show');
}
//导出
function exports(){
	var allParam = getSearchParam();
	var param={
        billsType:allParam.billsType,
        billsBeginDateStr:allParam.billsBeginDateStr,
        billsEndDateStr:allParam.billsEndDateStr,
        sectionIds:allParam.sectionIds,
        inpayClassId:allParam.inpayClassId,
        wlSectionIds:allParam.wlSectionIds,
        wlUserIds:allParam.wlUserIds,
        remark:allParam.remark,
        isContainsRedbills:allParam.isContainsRedbills,
        isDisabled:allParam.isDisabled,
	}
	var actionUrl="/manager/inventory/fund/inPayment/exportInPayment";
	construtForm(actionUrl,param);
}


function construtForm(actionUrl,parms){  
	 var form = document.createElement("form");  
	 form.style.display='none'; 
	 form.setAttribute('class', 'exportForm')
	 form.action = actionUrl;  
	 form.method="post";  
	 document.body.appendChild(form);  
	   
	   
	 for(var key in parms){  
	  var input = document.createElement("input");  
	  input.type = "hidden";  
	  input.name = key;  
	  input.value = parms[key];  
	  form.appendChild(input);  
	 }  
	 form.submit();  
	 $('.exportForm').remove()
}  


function codeDate(obj,flag){
	var t = obj.split('-')[0];
	var reg = /[A-Z]/g;
	t = t.replace(reg,"");
	t = t.replace(t.substr(0,4),t.substr(0,4)+'-');
	t = t.replace(t.substr(0,7),t.substr(0,7)+'-');
	if(flag == true){
		$('.exitTime').datePlu({
			endDate:false,
			minTime: t,
			defaultTime: t
		})
	}else{
		$('.redTime').datePlu({
			endDate:false,
			minTime: t,
			defaultTime: t
		})
	}
}


//初始化表格
function initDataGrid() {
	var receivedAmountTxt = "";
	if(billsType==27){
        receivedAmountTxt = "付款金额";
	}else if(billsType==28){
        receivedAmountTxt = "收款金额";
	}


	$('#accountGrid').jqGrid({
    	mtype:"POST",
    	datatype: "json",				
    	jsonReader  : {	
    			root: "data.inPaymentList",
    			total:"data.total",
    			records:"data.records",
    			repeatitems: false
    	},
    	postData:getSearchParam(),
        viewrecords: true,
        shrinkToFit: false,
    	width:"100%",
    	autowidth:true,
    	multiselect : true,	//复选框属性
		rownumbers:true,	//显示行号
    	height: $(window).height()*0.4,
    	pager:'#accountGridPager',
        colNames: ['id','单据编号', '单据日期', '部门', '经手人', '往来类型', '红冲状态', receivedAmountTxt, '备注','制单人','制单时间','修改人','修改时间','过账人','过账时间','红冲人','红冲时间'],
        colModel: [
            {name: 'id', index: 'id', width: 150, align: 'center', sortable: false,hidden: true},
            {name: 'billsCode', index: 'billsCode', width: 200, align: 'center', sortable: false,
				classes:"billsCodecss",
                editable:true,
                formatter: cLink},
            {name: 'billsDateStr', index: 'billsDateStr', width: 150, align: 'center', sortable: false},
            {name: 'sectionName', index: 'sectionName', width: 150, align: 'center', sortable: false},
            {name: 'managerName', index: 'managerName', width: 150, align: 'center', sortable: false},
            {name: 'inpayClassName', index: 'inpayClassName', width: 150, align: 'center', sortable: false},
            {name: 'redStatus', index: 'redStatus', width: 150, align: 'center', sortable: false,formatter:
            	function(cellvalue, options, rowObject){
    	   		if(cellvalue=="1"){
    	   			return "已红冲";
    	   		}else{
    	   			return "";
    	   		}
    	   }
        },
            {name: 'receivedAmount', index: 'receivedAmount', width: 150, align: 'center', sortable: false},
            {name: 'remark', index: 'remark', width: 150, align: 'center', sortable: false},
            {name: 'createByName', index: 'createByName', width: 150, align: 'center', sortable: false},
            {name: 'createDateStr', index: 'createDateStr', width: 200, align: 'center', sortable: false},
            {name: 'updateByName', index: 'updateByName', width: 150, align: 'center', sortable: false},
            {name: 'updateDateStr', index: 'updateDateStr', width: 200, align: 'center', sortable: false},
            {name: 'postByName', index: 'postByName', width: 150, align: 'center', sortable: false},
            {name: 'postDateStr', index: 'postDateStr', width: 200, align: 'center', sortable: false},
            {name: 'redByName', index: 'redByName', width: 150, align: 'center', sortable: false},
            {name: 'redDateStr', index: 'redDateStr', width: 200, align: 'center', sortable: false}
        ],
    	footerrow:true, //显示底部菜单
    	beforeSelectRow: function(rowid,e){
    		$('#accountGrid').jqGrid('resetSelection');
	    	return(true);
	    },
	    onSelectAll:function(aRowids,status){
	    	$('#accountGrid').jqGrid('resetSelection');
			$.zxsaas_plus.showalert("提示","只能单选，请重新选择");
			return(true);  
		},
        onSelectRow:function (rowid) {
            var currRow = $("#accountGrid").jqGrid('getRowData', rowid);
            if(currRow.redStatus=="已红冲"){
                menuBtn.setDisabledbtn("red");
			}else{
                menuBtn.setUndisabledbtn("red");
			}

            if(currRow.billsCode.indexOf("R")>-1){
                menuBtn.setDisabledbtn("copy");
            }else{
                menuBtn.setUndisabledbtn("copy");
            }

        },
    	gridComplete: function() {
    		$('table th').css('text-align','center');
    	},
        loadComplete:function(data){
    		
    		$('.footrow td:eq(1)').html('合计');
    		var rowNum = parseInt($(this).getGridParam('records'), 10);
            if (rowNum > 0) {
            	$(".ui-jqgrid-sdiv").show();
                var receivedAmount = $(this).getCol('receivedAmount', false, 'sum');
                $(this).footerData("set", {
                    "receivedAmount": '<font color="red" >' + Number(receivedAmount).toFixed(2) + '</font>'
                }, false);
            }
            else {
            	$(".ui-jqgrid-sdiv").hide();
            }

            var rows = data.data.inPaymentList;
            $.each(rows,function(i,item){
                if(item.redStatus == 1){
                    $("#accountGrid tr:eq("+ (i+1) + ") td").css("color","red");
                }
            })
    	}
    });
   
}


function cLink(cellvalue, options, rowObject){
    return  "<lable data-billsId='"+rowObject.id+"'data-billCode='"+rowObject.billsCode+"' onclick='showHistoryDetail(this)'>"+cellvalue+"</lable>";
}

//展示详情
function showHistoryDetail(obj){
    var billsId = $(obj).attr("data-billsId");
    var billCode = $(obj).attr("data-billCode");

    $("#billModalLabel").text("单据详情");
    if(billsType==27){
    	$("#billIframe")[0].src ="/manager/funds/payment/otherPayment?returnId="+billsId;
    }else if(billsType==28){
    	$("#billIframe")[0].src ="/manager/funds/payment/otherPayee?returnId="+billsId;
    }
    
    $("#sumModal").modal('show');
}