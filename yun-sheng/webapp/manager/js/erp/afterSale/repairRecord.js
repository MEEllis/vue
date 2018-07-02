$(function(){//初始化时间
$("#startTimeStr").datetimepicker({
	  lang:"ch",           //语言选择中文
    format:"Y-m-d",      //格式化日期
    timepicker:false,    //关闭时间选项
    todayButton:false,    //关闭选择今天按钮
//    value:new Date(parseInt(new Date().setDate(1))).toLocaleString()
})
$("#endTimeStr").datetimepicker({
	lang:"ch",           //语言选择中文
	format:"Y-m-d",      //格式化日期
	timepicker:false,    //关闭时间选项
	todayButton:false,    //关闭选择今天按钮
//	value:new Date()
})

//初始化结束

//判断结束日期不能小于开始日期
$(document).on('blur','#startTimeStr,#endTimeStr',function(e){
	var startTime = new Date($('#startTimeStr').val().replace(/\-/g,'/'));
	var endTime = new Date($('#endTimeStr').val().replace(/\-/g,'/'));
	var flag = (endTime < startTime) ? false : true;
	if(!flag){  
	    $.zxsaas_plus.showalert("提示","结束日期必须晚于开始日期！");
		$(this).val('');
	    return;  
	}  
});

//过滤查询
$('#filter').click(function(){
	$('#jqGrid_repair_record').jqGrid('setGridParam',{
		datatype:'json',
		postData:{
		createDateBegin:$('#startTimeStr').val()||"",
		createDateEnd:$('#endTimeStr').val()||"",
		custom:$('#customerName').val(),
		telephone:$('#telephone').val()||"",
		contactunitId:$('#repairUnitInput').data('id')||"",
		cardNo:$('#casNo').val()||"",
		flowNo:$('#flowNo').val()||"",
		sectionId:$('#repairDepartmentInput').data('id')||"",
		oldImeiStr:$('#telephoneNo').val()||""
		},
		page:1,
		rowNum:10,
		jsonReader: {
	        root: 'data.rows', 
	        total: 'data.total',
	        page: "data.page",
	        records: 'data.records',
	        repeatitems: false
	    },
	}).trigger("reloadGrid")
})
//第一次查询
firstRender()
$('#jqGrid_repair_record').jqGrid('setGridParam',{
		datatype:'json',
		jsonReader: {
	        root: 'data.rows', 
	        total: 'data.total',
	        page: "data.page",
	        records: 'data.records',
	        repeatitems: false
	    },
	}).trigger("reloadGrid")
function firstRender(){
$.jgrid.defaults.width = 1280;
    $.jgrid.defaults.responsive = true;
    $.jgrid.defaults.styleUI = 'Bootstrap';
    var lastrow = null,lastcell = null;
    var options = $.extend(options);
    var ids = []; 
	$('#jqGrid_repair_record').jqGrid({
		mtype:'post',
		url: basePath+"/afterSalesService/repairRecord/repairRecordDataGrid",
		datatype:'local', 
		colNames:['业务流水号','客户姓名','联系方式','送修单位','失效日期','商品名称','型号','原颜色','新颜色','新主串号',
		          '原主串号','原辅串号','新辅串号','外观描述','借出备用机','备用机还回','返修机',
		          '购买金额','增值服务抵减','实收金额','未收款','押金','退押金','服务类型','处理方式','维修状态',
		          '维修部门Id','维修部门','维修人','处理单位','外修返厂日期','取机或返售前日期','服务费用','服务名称'],          
	    colModel:[
	              	/*{name:'id',index:'id',width:70,align:'center',hidden:true},*/
	              	{name:'flowNo',index:'flowNo',sortable:false},
	              	{name:'custom',index:'custom',sortable:false},
	              	{name:'telephone',index:'telephone',sortable:false},
	              	{name:'contactunitName',index:'contactunitName',sortable:false},
	              	{name:'invalidDate',index:'invalidDate',sortable:false},
	              	{name:'goodsName',index:'goodsName',sortable:false},
	              	{name:'goodsModel',index:'goodsModel',sortable:false},
	              	{name:'oldColor',index:'oldColor',sortable:false},
	              	{name:'newColor',index:'newColor',sortable:false},
	              	{name:'newImeiStr',index:'oldImeiStr',sortable:false},
	              	{name:'oldImeiStr',index:'oldImei',sortable:false},
	              	{name:'oldAuxiliaryImei',index:'oldAuxiliaryImei',sortable:false},
	              	{name:'newAuxiliaryImei',index:'newAuxiliaryImei',sortable:false},
	              	{name:'oldLooksDesc',index:'oldLooksDesc',sortable:false},
	              	{name:'borrowSpareFlag',index:'borrowSpareFlag',width:60,formatter:'checkbox'},
	              	{name:'returnSpareFlag',index:'returnSpareFlag',formatter:'checkbox',sortable:false},
	              	{name:'returnFlag',index:'returnFlag',formatter:'checkbox',sortable:false},
	              	{name:'actualAmount',index:'actualAmount',sortable:false},
	              	{name:'serviceDeductAmount',index:'serviceDeductAmount',sortable:false},
	              	{name:'actualAmount',index:'actualAmount',sortable:false},
	              	{name:'notPayment',index:'notPayment',sortable:false},
	              	{name:'deposit',index:'deposit',sortable:false},
	              	{name:'returnDeposit',index:'returnDeposit',sortable:false},
	              	{name:'serviceType',index:'serviceType',sortable:false,formatter:'select',editoptions:{value:"1:售后;2:售前"}},
	            	{name:'handleModel',index:'handleModel',sortable:false,formatter:'select',editoptions:{value:"1:自修;2:返厂;3:外修;4:换机;5:退货"}},
	              	{name:'repairStatusContent',index:'repairStatusContent',sortable:false},
	              	{name:'repairSectionId',index:'repairSectionId',align:'center', sorttype:'string',sortable:false,hidden:true},
	              	{name:'repairSectionName',index:'repairSectionName',align:'center', sorttype:'string',sortable:false},
	              	{name:'technicianName',index:'technicianName',align:'center', sorttype:'string',sortable:false},
	              	{name:'contactunitName',index:'contactunitName',align:'center', sorttype:'integer',sortable:false},
	              	{name:'wxfcDate',index:'wxfcDate',align:'center', sorttype:'integer',sortable:false},
	              	{name:'takeMachineDate',index:'takeMachineDate',sortable:false},
	              	{name:'fwFee',index:'fwFee',sortable:false,hidden:true},
	              	{name:'serviceName',index:'serviceName',sortable:false,hidden:true},
	              	
	              ],
	              
	    sortable:false,
	    rowNum:10,
	    page:1,
	    rownumbers:true,
	    cellsubmit:'clientArray', //单元格保存内容的位置		
	    editurl:'clientArray',
	    viewrecords:true,
	    multiselect:true,
		multiboxonly:true,
	    cellEdit:true,
	    width:"100%",
	    height:$(window).height() * 0.45,
	    autowidth:true,
	    rownumWidth:35,
	    pager:'#proPager',
	    shrinkToFit:false,
	    footerrow:true,
	    userDataOnFooter:true,
	    onCellSelect: function(rowid, index, e){
	    	},
	    onSelectRow:function (id) {
	    var tableData=$('#jqGrid_repair_record').jqGrid('getRowData', id)
	     $('#servicePay').val(tableData.fwFee)
	     $('#addServicePay').val(tableData.serviceName)
	     $('#discountServicePay').val(tableData.serviceDeductAmount)
        },
	    beforeSelectRow: function(rowid,e){
        	$('#jqGrid_repair_record').jqGrid('resetSelection') 
			return(true); 
	    },
	    afterInsertRow: function(rowid, aData){ //新增一行之后
	    },
	    onSelectAll:function(aRowids,status){
	    	$('#jqGrid_repair_record').jqGrid('resetSelection') 
			$.zxsaas_plus.showalert("提示","只能单选，请重新选择");
			return(true);  
		},
	    gridComplete:function(){
	    	
	    },
	    loadComplete: function(data){
	    }
	})
}
function checkBorrow(cellvalue, options, rowObjec){
	var checkSelected = '<input type="checkbox" name="'+options.colModel.name+'" id="'+options.colModel.name+'" class="sddsd" value="'+options.rowId+'" checked='+false+'/>';
	/*var check
	if(cellvalue==1){
		$('[name="'+options.colModel.name+'"]:checkbox').attr("checked", true)
	}*/
	
	return checkSelected;
}

//送修单位
$('#repairUnit').click(function(){
		$('#myModal').modal('show');
		contactUnitsTree();
	/*	contactUnitsPage();*/
		contactunitGrid();
		$("#dataGrid").jqGrid('setGridParam', {
			datatype:'json',
			postData:{layerrCode:"",remCode:$.trim($("#proSearch").val()),page:"1",rows:"20"},
		}).trigger("reloadGrid");
		})
//送修单位树
	function contactUnitsTree(){
		$.request({
			async:false,
    		type:'post',
        	url:basePath+'/tree/findContactunitTree',
        	data:{},
        	dataType:'json',
        	success:function(data){
				if(data!=undefined){
					var res=data;
					var html;
					var zNodes = res;  
					var setting = {  
							data: {
							simpleData: {enable: true,idKey: "id",pIdKey: "pid",layerrCode:"layerrCode",rootPId: null}
		                    },
		                    view: {
		                        showLine: true,
		                        showIcon: false
		                    },
		                    callback: {
		                    	onClick: function (event, treeId, treeNode) {
		                    	contactunitGrid()
		                    	var treeNodeId=treeNode.obj?treeNode.obj.layerrCode:"";
		                    	$("#dataGrid").jqGrid('setGridParam', {
                        			datatype:'json',
                        			postData:{layerrCode:treeNodeId?treeNodeId:"",remCode:$.trim($("#proSearch").val()),page:"1",rows:"20"},
                        		}).trigger("reloadGrid");
		                    	},
		                    }
					    }; 
					$.fn.zTree.init($("#treeDemo_mydoc"), setting, zNodes)
				}else{
					$.zxsaas_plus.showalert('error',data.desc);
				}
    		},
    		error:function(){
    			alert('请求失败！')
    		}
    	})
	}
//初始化送修单位表格
function contactunitGrid(){
	var options = {
			LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
			iconJsonUrl:"../json/icon.json",
			TableName: "#dataGrid", //显示表格名称。遵照css选择器书写
			LoadTableUrl:'/manager/tree/getContactList',
			btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
			pager:"#contactunitGridpager",
	};
	$.jgrid.defaults.width = 1280;
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';	
	var colNames = ['id','往来单位编码','往来单位名称','助记码','所属地区','往来单位类别'];
	var JqGridColModel=[
						{name:'id',index:'id', width:1,align:'center', sorttype:'id',hidden:true},
						{name:'code',index:'code', width:100,align:'center', sorttype:'string',sortable:false},
						{name:'name',index:'name', width:100,align:'center', sorttype:'string',sortable:false},
						{name:'remCode',index:'remCode', width:100,align:'center', sorttype:'string',sortable:false},
						{name:'districtName',index:'districtName', width:100,align:'center', sorttype:'string',sortable:false},
						{name:'contactCategoryName',index:'contactCategoryName', width:100,align:'center', sorttype:'string',sortable:false}
	                ];
	loadtable();
	function loadtable(){
			$(options.TableName).jqGrid({
				url:options.LoadTableUrl,
				mtype:"GET",
				datatype: "json",
				jsonReader  : {	
					root: "data.rows",
					page: "data.page",
			        total: "data.total",
			        records: "data.records",
					repeatitems: false
						},
				colNames:colNames,          
	            colModel:JqGridColModel,
	            sortable:false,			            
	            rownumbers:true,
	            viewrecords: true,
	            pager:options.pager,
	            width: "90%" ,
				autowidth:true,
				rownumWidth:40,
				shrinkToFit:false,
				ondblClickRow: function(id){},
					    afterSaveCell: function(rowid, cellname, value, iRow, iCol){},
					    beforeEditCell: function(rowid, cellname, v, iRow, iCol){
					        lastrow = iRow;
					        lastcell = iCol;
					    },
					    onCellSelect: function(rowid, index,iCol,e){
					    	if(iCol!=undefined||null){
							    var rowData=$('#grid').jqGrid("getRowData",rowid);
							    $('#repairUnitInput').val(iCol).data('id',rowid)
							    $('#myModal').modal('hide');
					    	}else{
					    		$.zxsaas_plus.showalert('error')
					    	}
					    	}
					    	
			})
			jQuery(options.TableName).jqGrid('setLabel',0, '序号');
	}
}
//搜索送修单位
	$('#proSearch').keyup(function(e){
    	if(e.keyCode==13){
    		$("#dataGrid").jqGrid('setGridParam', {
    			datatype:'json',
    			postData:{layerrCode:"",remCode:$.trim($("#proSearch").val()),page:"1",rows:"10"},
    		}).trigger("reloadGrid");
    	}
    })
    
//送修部门
    $('#repairDepartment').click(function(){
    	$('#repairDepartmentModal').modal('show')
    	$.request({
			async:false,
    		type:'post',
        	url:basePath+'/jxc/storage/authorityAndTree/findTree',
        	data:{},
        	dataType:'json',
        	success:function(data){
        		if(data!=undefined){
					var res=data;
					var html;
					var zNodes = res;  
					var setting = {  
							data: {
						simpleData: {
        				enable: true,
        				idKey: "code",
        				pIdKey: "pCode",
        				rootPId: ''
        			}
		                    },
		                    view: {
		                        showLine: true,
		                        showIcon: false
		                    },
		                    callback: {
		                    	onDblClick: function (event, treeId, treeNode) {
		                    	if(treeNode.check_Child_State==-1){
		                    		$('#repairDepartmentModal').modal('hide')
			                    	$('#repairDepartmentInput').val(treeNode.name).data('id',treeNode.obj.id)
		                    	}
		                    	
		                   },
		                    }
					    }; 
					$.fn.zTree.init($("#baseTree"), setting, zNodes).expandAll(true)
				}else{
					$.zxsaas_plus.showalert('error',data.desc);
				}
    		},
    		error:function(){
    			alert('请求失败！')
    		}
    	})
    })  
})
 
