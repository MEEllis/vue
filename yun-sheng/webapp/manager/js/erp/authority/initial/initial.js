var lastrow;
var lastcell;

$(function(){
	$('#startTime').datePlu({
		dateEnd:'#endTime',
		endDate:true,
		minTime:"1970-01-01",
		ifPermissions:false,
		ajaxOpt: {
			async: false,
		}
	});

	$.ajax({
		url:'/manager/finance/common/getCompanyFinanceConfigVo',
		type:'post',
		dataType:'json',
		success:function(data){
			if(data.result == 1){
				var min = data.data.configVo.systemStartDateStr;
				$('#endDate').datePlu({
					minTime: min,
					ifPermissions: false,
					endDate: false,
					ajaxOpt:{
						async: false
					},
					changeDateBack: function () {
						hasOrder();
					}
				});
			}
		}
	})

	loadmodalCZ();
	loadmodalCG();
})


//获取日结日期前是否有草稿单和未确认的营业收款单
function hasOrder() {
	$.ajax({
		url: '/manager/jxc/authority/tdailyBalance/getDraftAndUnconfirmedReceipts',
		type : "post",
		data:{"dailyDateStr": $('#endDate').val()},
		success:function(data){
			if(data.result > 0){
				$('.del_btn').attr("disabled",function () {
					return data.data.noDraft == 1; //没有草稿单
				});
				$('.confirm_btn').attr("disabled",function () {
					return data.data.noUnconfirmedReceipts == 1; //没有收款未确认的营业交款单
				});

				if(data.data.noDraft == 0 || data.data.noUnconfirmedReceipts == 0){
					$('.rijie_btn').attr("disabled",true);
				}else {
					$('.rijie_btn').removeAttr("disabled");
				}
			}
		},
		error:function(){
		}
	});
}


/*******************************功能(加载日结条件)**********************************/
/*草稿表格样式调整*/
$(document).on("shown.bs.modal","#dayAccount",function(){
	hasOrder();
});


/*草稿表格样式调整*/
$(document).on("shown.bs.modal","#cgdModal",function(){
	$("#jqGrid_rijieDraftOrder").setGridWidth($(this).find(".modal-body").width());
});

/*******************************功能实现**********************************/ 

/*日结按钮*/
$(document).on("click",".rijie_btn",function(){
	$.ajax({
		url: '/manager/jxc/authority/tdailyBalance/dailyDate',
		type : "post",
		data:{"dailyDateStr": $('#endDate').val()},
		success:function(data){
			if(data.result > 0){
				$.zxsaas_plus.showalert("success",data.desc || "日结成功！");
				hasOrder();
				$("#jqGrid_searchOperate").trigger("reloadGrid");
			}
		},
		error:function(){
		}
	});
});


/*操作记录查询*/
$(document).on("click",".cz_search",function(){
	   $("#jqGrid_searchOperate").setGridParam({
		   datatype:'json',
		   postData:$(".data_sT").toJsonObject()
	   }) .trigger("reloadGrid");
	
});

/*一键删除草稿单*/
$(document).on("click",".del_btn",function(){
	$("#jqGrid_rijieDraftOrder").setGridParam({
		datatype: 'json',
		postData: {dailyDateStr: $('#endDate').val()}
	}).trigger("reloadGrid");
	$('#cgdModal').modal('show');

});


/*收款确认*/
$(document).on("click",".confirm_btn",function(){
	window.parent.openWorkBoxByMenutext('收款确认','/manager/retail/checkPay/payMoneyAuditJSP', true)
});


/*删除草稿单*/
$(document).on("click",".delAll_btn",function () {
	$.ajax({
		url: '/manager/jxc/authority/tdailyBalance/delDraftBills',
		type : "post",
		data:{"dailyDateStr": $('#endDate').val()},
		success:function(data){
			if(data.result > 0){
				$.zxsaas_plus.showalert("success","删除成功！");
				hasOrder();
			}
		},
		error:function(){
		}
	});
})


/*******************************操作记录查询表格**********************************/
function loadmodalCZ(){
		var options = {
		LoadTableUrl: basePath + '/jxc/authority/tdailyBalance/getDataRecords',
		GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
		DelRowUrl: "", // 删除信息接口地址
		isSub:"",//是否有子级表格
		subLoadTableUrl:"",//子级表格数据来源地址
		TableName: "#jqGrid_searchOperate", //显示表格名称。遵照css选择器书写
		iconJsonUrl:"../json/icon.json",
		btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
		pager:"#jqGridPager1"
		};
		
			$.jgrid.defaults.width = 1280;
			$.jgrid.defaults.responsive = true;
			$.jgrid.defaults.styleUI = 'Bootstrap';	
			var lastsel='';//最后一次选中的行
			var rightClickColid="";//右键列id
			var rightClickColIndex=0;//右键index
			var mydata;
			var hid=false;
			var lock=false;
			var myobj=[];
			var colNames = ['操作时间','操作人','操作内容'];
			var JqGridColModel=[
								{name:'operatorTime',index:'operatorTime', align:'left',sortable:false},
								{name:'operatorName',index:'operatorName', align:'left',sortable:false},
								{name:'remark',index:'remark',align:'left',sortable:false}
			                ];
			
			loadtable();
		//加载表格
		
			function loadtable(){
					$(options.TableName).jqGrid({
						url:options.LoadTableUrl,
						mtype:"POST",
						datatype: "json",
						postData:{"startTime":$('#startTime').val(),"endTime":$('#endTime').val()},
						editurl: 'clientArray',
						cellsubmit: 'clientArray',//单元格保存内容的位置
						jsonReader  : {	
							root:"data.rows",
							page: "data.page",
					        total: "data.total",
					        records: "data.records",
							repeatitems: false
								},
						colNames:colNames,          
			            colModel:JqGridColModel,
			            sortable:false,			            
			            rowNum: 20,
			            rowList: [2,20, 25, 40],
			            pager:options.pager,
			            viewrecords: true,	
			           	cellEdit:false,
			            width: "100%" ,
			            height: $(window).height()*0.65,
						autowidth:true,
						rownumWidth: 35, // the width of the row numbers columns
						shrinkToFit:true,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
						rownumbers:true,
						footerrow: false,
						userDataOnFooter: true,
						ondblClickRow:function(id){
						//双击进入编辑
			   				var delid = id;
			   				
						},
						onCellSelect:function(id,index,e){
						},
						onSelectRow:function(id){
							if(id!=lastsel&&lastsel!=''){
								$(options.TableName).jqGrid('saveRow',lastsel,{
									aftersavefunc:function(rowid,response ){
									}
									});
							}
							lastsel=id;
						var rec = $(options.TableName).jqGrid('getRowData', id);
						
						},
						
						beforeEditCell:function(rowid,cellname,v,iRow,iCol){
							lastrow = iRow;
							lastcell = iCol;
						},
						
						beforeSelectRow:function(rowid,e){

						},
						afterInsertRow: function (rowid, aData) { //新增一行之后

						},
						gridComplete: function() {
							var ids=$(options.TableName).jqGrid("getDataIDs");

						},
						loadComplete:function(data){
							if(data.data.currDailyDate && data.data.currDailyDate != null && typeof(data.data.currDailyDate)!="undefined"){
								$(".date_search").show()
								$(".latest").text(data.data.currDailyDate); //当前日结日期
							}else{
								$(".date_search").hide()
							}
						},
						loadError:function(xhr,status,error){}
						})
		
			}
			

}
		

/*******************************草稿单（日结弹出查询）表格**********************************/
function loadmodalCG(){
		var options = {
			LoadTableUrl: basePath + '/jxc/authority/tdailyBalance/getDraftBills',//草稿单的接口
			GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
			DelRowUrl: "", // 删除信息接口地址
			isSub:"",//是否有子级表格
			subLoadTableUrl:"",//子级表格数据来源地址
			TableName: "#jqGrid_rijieDraftOrder", //显示表格名称。遵照css选择器书写
			pager:""
		};
		
		$.jgrid.defaults.width = 1280;
		$.jgrid.defaults.responsive = true;
		$.jgrid.defaults.styleUI = 'Bootstrap';
		var lastsel='';//最后一次选中的行
		var rightClickColid="";//右键列id
		var rightClickColIndex=0;//右键index
		var mydata;
		var hid=false;
		var lock=false;
		var myobj=[];
		var colNames = ['单据类型','草稿张数'];
		var JqGridColModel=[
			{name:'billsType',index:'billsType', align:'center',sortable:false},
			{name:'billsCount',index:'billsCount', align:'center',sortable:false}
		];

		loadtable();
		//加载表格
		function loadtable(){
			$(options.TableName).jqGrid({
				url:options.LoadTableUrl,
				mtype:"POST",
				datatype: "json",
				editurl: 'clientArray',
				cellsubmit: 'clientArray',//单元格保存内容的位置
				jsonReader  : {
					root:"data.dataList",
					repeatitems: false
				},
				colNames:colNames,
				colModel:JqGridColModel,
				sortable:false,
				rowNum: -1,
				viewrecords: true,
				cellEdit:false,
				width: "100%" ,
				height: $(window).height()*0.50,
				autowidth:true,
				rownumWidth: 35, // the width of the row numbers columns
				shrinkToFit:true,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
				rownumbers:true,
				ondblClickRow:function(id){
				},
				onCellSelect:function(id,index,e){
				},
				onSelectRow:function(id){
				},
				beforeEditCell:function(rowid,cellname,v,iRow,iCol){
					lastrow = iRow;
					lastcell = iCol;
				},

				beforeSelectRow:function(rowid,e){

				},
				afterInsertRow: function (rowid, aData) { //新增一行之后

				},
				gridComplete: function() {

				},
				loadComplete:function(data){
				},
				loadError:function(xhr,status,error){
				}
			})

		}

}

