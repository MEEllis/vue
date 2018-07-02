//初始化时间
$("#startTimeStr").datetimepicker({
	  lang:"ch",           //语言选择中文
    format:"Y-m-d",      //格式化日期
    timepicker:false,    //关闭时间选项
    todayButton:false,    //关闭选择今天按钮
//    value:new Date(parseInt(new Date().setDate(1))).toLocaleString(),
    maxData:new Date()
})
$("#endTimeStr").datetimepicker({
	lang:"ch",           //语言选择中文
	format:"Y-m-d",      //格式化日期
	timepicker:false,    //关闭时间选项
	todayButton:false,    //关闭选择今天按钮
//	value:new Date(),
	maxData:new Date()
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

//初始化表单
$.jgrid.defaults.width = 1280;
$.jgrid.defaults.responsive = true;
$.jgrid.defaults.styleUI = 'Bootstrap';
$('#jqGrid_value_added').jqGrid({
	url: "/manager/afterSalesService/valueAddedServiceRecord/selectDataGrid",
	mtype:"POST",
	
	datatype: "json",
	jsonReader  : {	
		root:"data.rows",
		page: "data.page",
        total: "data.total",
        records: "data.records",
		repeatitems: false
	},
	colNames:['id','测试','服务流水号','会员卡号','客户姓名','联系方式','手机串号','商品名称','型号','颜色','服务项目','失效日期','已使用次数','剩余次数','购买时间','原单据号','销售部门','购买金额','营业员','操作员','afterSaleDetailList'],          
    colModel:[
                {name:'id',index:'id',sortable:false,hidden:true},
                {name:'ceshi',index:'ceshi',width:'400px',sortable:false,formatter:function(){
                		var qwe = [
									'<div class="form-group">',
//										'<div class="input-group col-sm-10">',
										  '<input type="text" class="form-control wuy" id="exampleInputAmount" placeholder="Amount">',
//										  	'<span class="input-group-btn showBox">',
//										  	'<button class="btn btn-default" type="button">',
//										  		'<span class="glyphicon glyphicon-option-horizontal"></span>',
//										  	'</button>',
//										  '</span>',
//										'</div>',
										'<div class="what">bbb</div>',
									'</div>'
    				         	].join('\n')
                	return  qwe;
                }},
              	{name:'serviceInstanceNo',index:'serviceInstanceNo',sortable:false},
              	{name:'cardNo',index:'cardNo',sortable:false},
              	{name:'memberName',index:'memberName',sortable:false},
              	{name:'telephone',index:'telephone',sortable:false},
              	{name:'imeiStr',index:'imeiStr',sortable:false},
              	{name:'goodsName',index:'goodsName',sortable:false},
              	{name:'model',index:'model',sortable:false},
              	{name:'color',index:'color',sortable:false},
              	{name:'serviceName',index:'serviceName',sortable:false},
              	{name:'invalidDateString',index:'invalidDateString',sortable:false},
              	{name:'usedTimes',index:'usedTimes',sortable:false},
              	{name:'restTimes',index:'restTimes',sortable:false},
              	{name:'buyDateString',index:'buyDateString',sortable:false},
              	{name:'billsCode',index:'billsCode',sortable:false},
              	{name:'sectionName',index:'sectionName',align:'center', sorttype:'string',sortable:false},
              	{name:'actualAmount',index:'actualAmount',align:'center', sorttype:'string',sortable:false},
              	{name:'salesManName',index:'salesManName',align:'center', sorttype:'integer',sortable:false},
              	{name:'createByName',index:'createByName',sortable:false},
              	
              	{name:'afterSaleDetailList',index:'afterSaleDetailList',sortable:false,hidden:true,
              		formatter: function (cellvalue, options, rowObject) {
	          			return JSON.stringify(cellvalue)
	      			}
              	},
              ],
    sortable:false,			            
    rownumbers:true,
    pager:"#jqGrid_value_footer",
    rowNum: 15,
    page:1,
    viewrecords: true,		           
//    multiselect:true,
   	cellEdit:false,		//点击行勾选复选框
    width: "100%" ,
    height: $(window).height()*0.35,
	autowidth:true,	
	autoScroll:false,
	rownumWidth: 35, // the width of the row numbers columns
	shrinkToFit:true,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
	userDataOnFooter:true,//设置userData 显示在footer里
	onSelectRow:function(rowid,status){
		var len= $('#jqGrid_value_added').getDataIDs();
		
		var tableData=$('#jqGrid_value_added').jqGrid('getRowData', rowid);
		$('#jqGrid_use_list').jqGrid('clearGridData');
		var info=JSON.parse(tableData.afterSaleDetailList)
		$.each(info,function(i,v){
			$('#jqGrid_use_list').jqGrid('addRowData',[i],v)
		})
	},
	beforeSelectRow:function(rowid,e){
        //单行选择
		$('#jqGrid_value_added').jqGrid('resetSelection');  
		return(true);  	
	},
	onSelectAll:function(aRowids,status){
//		if(status){
//			listArr=dataList;
//		}else{
//			listArr=[];
//		}
		$('#jqGrid_value_added').jqGrid('resetSelection') 
		$.zxsaas_plus.showalert("提示","只能单选，请重新选择");
		return(true);  
	},

	gridComplete: function() {
//		footerData();
		$('.wuy').goodsPlu()
	},
	loadComplete:function(data){
		dataList=data.data.dataList;
	},
	loadError:function(xhr,status,error){
		
	}
})

$('#jqGrid_use_list').jqGrid({
	
	colNames:['服务流水号','业务流水号','业务时间','抵扣金额','售后部门','手机串号','商品名称','型号','颜色','维修人','处理方式'],          
    colModel:[
              	{name:'serviceInstanceNo',index:'serviceInstanceNo',sortable:false},
              	{name:'flowNo',index:'flowNo',sortable:false},
              	{name:'createDateString',index:'createDateString',sortable:false},
              	{name:'serviceDeductAmount',index:'serviceDeductAmount',sortable:false},
              	{name:'repairSectionName',index:'repairSectionName',sortable:false},
              	{name:'oldImeiStr',index:'oldImeiStr',sortable:false},
              	{name:'goodsName',index:'goodsName',sortable:false},
              	{name:'goodsModel',index:'goodsModel',sortable:false},
              	{name:'goodsColorName',index:'goodsColorName',sortable:false},
              	{name:'technicianName',index:'technicianName',sortable:false},
              	{name:'handleModel',index:'handleModel',sortable:false,formatter:'select',editoptions:{value:"2:返厂;3:外修;4:换机;5:退货"}},
              	
              ],
    sortable:false,			            
    rownumbers:true,
   
    viewrecords: true,		           
   	cellEdit:false,		//点击行勾选复选框
    width: "100%" ,
    height: $(window).height()*0.25,
	autoScroll:false,
	rownumWidth: 35, // the width of the row numbers columns
	shrinkToFit:true,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
	
})

function searchData(){
	var param={}
	param.startTime=$('#startTimeStr').val();
	param.endTime=$('#endTimeStr').val();
	param.cardNo=$('.cardNo').val();
	param.serviceInstanceNo=$('.serviceInstanceNo').val()
	param.imei=$('.imei').val();
	$('#jqGrid_value_added').jqGrid('setGridParam', {
		ajaxGridOptions:{async:false},
		contentType :'application/json', 
		url:'/manager/afterSalesService/valueAddedServiceRecord/selectDataGrid',
		postData:param,
		datatype:'json',
		page:1,
		rowNum: 15,
		jsonReader  : {	
			root:"data.rows",
			page: "data.page",
	        total: "data.total",
	        records: "data.records",
			repeatitems: false
		},
	}).trigger("reloadGrid");
	
	
//	$.ajax( {
//		type : 'post',
//		contentType :'application/json', 
//		url : '/manager/afterSalesService/valueAddedServiceRecord/selectDataGrid',
//		dataType : "json", // 可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
//		data:JSON.stringify(param),
//		success : function(data) {
////			$('#startTimeStr').val('')
////			$('#endTimeStr').val('')
////			$('.cardNo').val('')
////			$('.serviceInstanceNo').val('')
////			$('.imei').val('')
//			var billInfo=data.data.rows;
//			$('#jqGrid_value_added').jqGrid('clearGridData');
//			$('#jqGrid_use_list').jqGrid('clearGridData')
//			$.each(billInfo,function(i,v){
//				$('#jqGrid_value_added').jqGrid('addRowData',[i],v);
//			})
//		},
//		error : function(msg) {
//			$.zxsaas_plus.showalert(" 数据加载失败！" + msg);
//		}
//	});
}

$('.store').storePlu()

