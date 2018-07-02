var	lastrow = "";
var lastcell = "";
function loadmodal(options){
	//初始化参数
	var colName = [];
	//主表，售前机返回，不可增加
	var colName0 =['操作','id','送修部门','商品编码','商品名称','型号','原颜色','新颜色','原主串号',
	               '新主串号','原辅串号','新辅串号','业务流水号','售后处理单号','手机状态','售前返回操作员','售前返回操作时间','商品id','维修部门ID'];
	colName[0] = colName0;
	//主表下的选项卡表 ，维修项目，不可增加
	var colName1 =['id','业务部门','名称型号','原颜色','新颜色','原主串号',
	               '新主串号','原辅串号','新辅串号','业务流水号','服务类型'];
	colName[1] = colName1;
	
	var JqGridColModel = [];
	var JqGridColModel0 =[
                      {name:'fs',index:'fs', width:100,align:'center',sorttype:'string',sortable:false,formatter:addAndDelete},
	                   {name:'id',index:'id',width:70,align:'center',hidden:true},
	                   {name:'giveSectionId',index:'giveSectionId', width:100,align:'center',sorttype:'string',sortable:false},
	                   {name:'code',index:'code', width:150,align:'center',sorttype:'string',sortable:false},
	                   {name:'name',index:'name', width:100,align:'center',sorttype:'string',sortable:false},
	                   {name:'goodsModel',index:'goodsModel', width:100,align:'center',sorttype:'string',sortable:false},
	                   {name:'color',index:'color', width:100,align:'center',sorttype:'string',sortable:false},
	                   {name:'newColor',index:'newColor', width:100,align:'center',sorttype:'string',sortable:false},
	                   {name:'imei',index:'imei', width:150,align:'center',sorttype:'string',sortable:false},
	                   {name:'newImei',index:'newImei', width:150,align:'center',sorttype:'string',sortable:false},
	                   {name:'oldAuxiliaryImei',index:'oldAuxiliaryImei', width:150,align:'center',sorttype:'string',sortable:false},
	                   {name:'newAuxiliaryImei',index:'newAuxiliaryImei', width:150,align:'center',sorttype:'string',sortable:false},
	                   {name:'flowNo',index:'flowNo', width:180,align:'center',sorttype:'string',sortable:false},
	                   {name:'billsNo',index:'billsNo', width:150,align:'center',sorttype:'string',sortable:false},
	                   {name:'repairStatus',index:'repairStatus', width:100,align:'center',sorttype:'string',sortable:false,formatter:'select',editoptions:{value:"1:售前处理单;2:已接机;3:自修中;4:外修中;5:返厂中;6:已修复;7:已取机;8:已返还;9:已接收"}},
	                   {name:'operatorId',index:'operatorId', width:150,align:'center',sorttype:'string',sortable:false},
	                   {name:'operateDate',index:'operateDate', width:150,align:'center',sorttype:'string',sortable:false},
	                   {name:'goodsId',index:'goodsId',width:70,align:'center',hidden:true},
	                   {name:'repairSectionId',index:'repairSectionId',width:70,align:'center',hidden:true}
	                   ];
	JqGridColModel[0]=JqGridColModel0;
	
	var JqGridColModel1 =[
		                   {name:'id',index:'id',width:70,align:'center',hidden:true},
		                   {name:'serverNumber',index:'serverNumber', width:150,align:'center',sorttype:'string',sortable:false},
		                   {name:'serverName',index:'serverName', width:150,align:'center',sorttype:'string',sortable:false},
		                   {name:'fs',index:'fs', width:100,align:'center',sorttype:'string',sortable:false},
		                   {name:'fx',index:'fx', width:180,align:'center',sorttype:'string',sortable:false},
		                   {name:'peploe',index:'peploe', width:150,align:'center',sorttype:'string',sortable:false},
		                   {name:'peploe',index:'peploe', width:150,align:'center',sorttype:'string',sortable:false},
		                   {name:'fs',index:'fs', width:100,align:'center',sorttype:'string',sortable:false},
		                   {name:'fx',index:'fx', width:180,align:'center',sorttype:'string',sortable:false},
		                   {name:'peploe',index:'peploe', width:150,align:'center',sorttype:'string',sortable:false},
		                   {name:'peploe',index:'peploe', width:150,align:'center',sorttype:'string',sortable:false}
		                   ];
	JqGridColModel[1]=JqGridColModel1;
	
	var rowid='';
	var select_name='';
	var defaults = {
	LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
	GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
	DelRowUrl: "", // 删除信息接口地址
	isSub:"",//是否有子级表格
	subLoadTableUrl:"",//子级表格数据来源地址
	TableName: "#jqGrid_preSalesReturn", //显示表格名称。遵照css选择器书写
	iconJsonUrl:"../json/icon.json",
	btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
	pager:"#jqGridPager_preSalesReturn",
	TableInfo:"0",
	choose:true,
	height: $(window).height()*0.45,
	footerrow:false,
	userDataOnFooter:false
	
//	inputbox: ".inputbox" //搜索条件框存放容器。遵照css选择器书写
	};
	$("#datetimepickerStart1").datetimepicker({
		  lang:"ch",           //语言选择中文
	      format:"Y-m-d",      //格式化日期
	      timepicker:false,    //关闭时间选项
	      todayButton:false    //关闭选择今天按钮
		});
	$("#datetimepickerStart2").datetimepicker({
		  lang:"ch",           //语言选择中文
	      format:"Y-m-d",      //格式化日期
	      timepicker:false,    //关闭时间选项
	      todayButton:false    //关闭选择今天按钮
		});
	var options = $.extend(defaults,options);
		$.jgrid.defaults.width = 1280;
		$.jgrid.defaults.responsive = true;
		$.jgrid.defaults.styleUI = 'Bootstrap';	
		var lastsel='';//最后一次选中的行
		var rightClickColid="";//右键列id
		var rightClickColIndex=0;//右键index
		var c=options.TableInfo;//参数index
		var colNames = colName[c];
		var JqGridColModel = JqGridColModel[c];
		loadtable();
	//加载表格
	
		function loadtable(){
				$(options.TableName).jqGrid({
					url:options.LoadTableUrl,
					mtype:"GET",
					datatype: "json",
					jsonReader  : {	
							root: "data.pageList",
							repeatitems: false,
							id:"0"
							},
					colNames:colNames,          
		            colModel:JqGridColModel,
		            cellEdit:true,
		            cellsubmit:'clientArray',//单元格保存内容的位置
		            editurl: 'clientArray',
		            sortable:false,			            
		            rownumbers:true,
		            rowNum: 10,
		            rowList: [5,10, 20, 40],
		            pager:options.pager,
		            viewrecords: true,
		            width: "100%" ,
		            height:options.height,
					autowidth:true,
					rownumWidth: 35, // the width of the row numbers columns
					shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
					multiselect:options.choose,
					multiboxonly:true,
					footerrow:options.footerrow,
					userDataOnFooter:options.userDataOnFooter,
					ondblClickRow:function(id){
		   			
					},
					onCellSelect:function(id,index,cellcontent,e){
						var colName=$(options.TableName).jqGrid('getGridParam','colModel')[index].name 
				      	select_name=colName
				      	select_index=index;
				      	rowid=id;

				     
					},
					beforeEditCell:function(rowid,cellname,v,iRow,iCol){
												lastrow = iRow;
												lastcell = iCol;
					},
					afterEditCell: function(rowid, cellname, value, iRow, iCol){//编辑完cell
						
					},
					beforeSelectRow:function(rowid,e){
                        //单行选择
                          
					},
					afterInsertRow: function (rowid, aData) { //新增一行之后

					},
					gridComplete: function() {
					//	var ids=$(options.TableName).jqGrid("getDataIDs");
						
                   
					},
					loadComplete:function(data){
                        
					},
					loadError:function(xhr,status,error){
						//console.log(status)
					}
					})
	
		}
		
		function addAndDelete(cellvalue, options, rowObjec){
			var addAndDel = '<div class="operating" data-id="' + options.rowId + '"><span class="glyphicon glyphicon-trash delete" aria-hidden="true" id="add_row" title="删除行"></span></div>';
			return addAndDel;
		}
		
		
		// 列表复选框
		function checkBox(cellvalue, options, rowObjec){
			return '<input type="checkbox" class="checkBoxNum" data-id="' + rowObjec.deliveryId + '"  data-rId="' + options.rowId + '" />';
		}
		//单选按钮
		function radioYF(cellvalue,options,rowObject){
			return '<input type="radio" name="tableRad" />';
		}
		
		//select下拉框
		function selectYF(cellvalue, options, rowObject){
			return '<select class="offerYF' + options.rowId +'" style="border:0;text-align:center;width:150px;height:30px;"><option value="' + cellvalue +'">仓库啊</option><option  value="' + cellvalue +'">B仓库</option></select>';
		};
}
//新增一行
$(document).on('click', '.glyphicon-plus-sign',function(e){
	var thisTitle = $(this).attr("title");
	var rowId = $(this).parent().data('id');
	$(options.TableName).jqGrid('addRowData', rowId+1, {}, 'last' );
});

//删除一行
$(document).on('click', '.delete',function(e){
	var thisTitle = $(this).attr("title");
	var rowId = $(this).parent().data('id');
	if(thisTitle == "删除行"){
		console.log('条数:' + $('#jqGrid_preSalesReturn tbody tr').length);
		if($('#jqGrid_preSalesReturn tbody tr').length === 2) {
			$.zxsaas_plus.showalert("错误","至少保留一条数据!")
			return false;
		}
		$.zxsaas_plus.showconfirm("","是否确定删除本行?",function(){
			$("#jqGrid_preSalesReturn").jqGrid('delRowData', rowId);
		},function(){
			
		});

	}
});

$(document).on('click','.changeYF1',function(){
	loadmodal({"TableName":"#jqGrid_YFtab1","page":"","TableInfo":"1"});
});

$(document).ready(function(){
	getStorageWEI();
	giveSectionInit();
//	if ((screen.width == 1920)) {
//		$('.widthYF2').width(1729);
//    } else if ((screen.width == 1600) ) {
//    	$('.widthYF2').width(1400);
//    } else if ((screen.width == 1366)) {
//    	$('.widthYF2').width(1170);
//    } else if ((screen.width == 1280)) {
//    	$('.widthYF2').width(1090);
//    }else {
//    	$('.widthYF2').width(auto);
//    }
});

//维修部门下拉
function getStorageWEI(){
	//var countries = {};
	$.request({  
	 	url: '/manager/afterSalesCommon/getRepairSections',//请求路径  
	 	async: false,  
	 	success: function(data) {   
	 		for(var i = 0,len = data.data.sectionList.length;i < len;i ++){
	 		  var countries = data.data.sectionList[i];
	 			$('.serviceXIA').append("<option value='"+countries.id+"' selected>"+countries.name+"</option>");
	 		}
	 	},
	 	error:function(){
	 		$.zxsaas_plus.showalert("","error!")
	 	}
	 	});
	
};
//送修部门下拉
function giveSectionInit(){
	$.request({  
	 	url: '/manager/afterSalesCommon/getSections',//请求路径  
	 	async: false,  
	 	success: function(data) {   
	 		for(var i = 0,len = data.data.sectionList.length;i < len;i ++){
	 			var	countries = data.data.sectionList[i];
	 			$('#giveSection').append("<option value='"+countries.id+"' selected>"+countries.name+"</option>");
	 		}
	 	},
	 	error:function(){
	 		$.zxsaas_plus.showalert("","error!")
	 	}
	 	});
}

//回车查询
$(document).on('keydown','.fasttips',function(event){
	if(event.keyCode==13){
	    quick();
	}
});

var quick = function(){
	var imei = $('.fasttips').val();
	var repairSectionId = $('.serviceXIA option:selected').val();
	$.request({  
	 	url: '/manager/afterSalesService/returnMachine/query',//请求路径    
	 	dataType:'json',
	 	type:'get',
	 	data:{
		imei:imei,
		repairSectionId:repairSectionId,
		giveSectionId:$('#giveSection').val()
		},
	 	success: function(data) {   
			var dataList = data.data.pageList;
			$("#jqGrid_preSalesReturn").jqGrid('clearGridData');
				for(var i=0,len=dataList.length;i<len;i++){
				$("#jqGrid_preSalesReturn").jqGrid('addRowData',i,dataList[i]);
				}
			},
	 	error:function(){
	 		$.zxsaas_plus.showalert("","error!")
	 	}
 	});
}
//转至售后

$('.returnSave').click(function(){
	var selIdList=$('#jqGrid_preSalesReturn').getGridParam('selarrrow');
	if(!selIdList.length){
		$.zxsaas_plus.showalert('提示','请选中后再保存数据！！');
		return;
	}
	var arr=$.map(selIdList,function(item,index){
		var data=$('#jqGrid_preSalesReturn').getRowData(item);
		data.handleBillsNo=data.billsNo;
		delete data.fs;
		delete data.billsNo;
		delete data.code;
		delete data.color;
		delete data.goodsModel;
		delete data.id;
		delete data.name;
		delete data.operateDate;
		delete data.repairStatus;
		delete data.operatorId;
		return data
	})
	$.request({
		url:'/manager/afterSalesService/returnMachine/confirmReturn',
		dataType:'json',
	 	contentType:'application/json;charset=utf-8',
    	data:JSON.stringify(arr),
    	type:'POST',
	 	success: function(data) {  
			$.zxsaas_plus.showalert('提示',data.desc);
			for(var i=0,len=selIdList.length;i<len;i++){
				$('#jqGrid_preSalesReturn').delRowData(selIdList[0]);
			}
	 	},
	 	error:function(){
	 		$.zxsaas_plus.showalert("","error!")
	 	}
	})
})

//清空
$(document).on('click','.clearYF',function(){
	$('#jqGrid_preSalesReturn').clearGridData();
})




