var	lastrow = "";
var lastcell = "";
var lastSel="";
function loadmodal(options){
	
	
	
	//初始化参数
	var colName = [];
	//主表，自修处理 ，不可增加
	var colName0 =['id','业务流水号','手机串号','往来单位','客户姓名','联系电话','商品名称','故障说明',
	               '外观描述','预报价','商品分类','是否返修','备注','维修部门','维修状态','服务类型','服务类型ID','往来单位id','维修部门id'];
	colName[0] = colName0;
	//主表下的选项卡表 ，维修项目，可增加
	var colName1 =['操作','id','项目编号','项目名称','预设价格','实际收费','备注','项目id'];
	colName[1] = colName1;
	//选项卡表，更换备件 ，可增加
	var colName2 =['操作','id','仓库id','仓库','配件编码','配件名称','增/换','数量','单价','金额','型号','品牌','颜色','主串号','辅串号','备注',
	               '配件名称id'];
	colName[2] = colName2;
	
	//弹出框，主表 ，不可增加
	var colName3 =  ['id','售后类型','业务流水号','接机时间','取机时间','手机串号','往来单位','客户姓名',
		               '联系电话','商品名称','故障说明','外观描述','预报价','商品分类','是否返修','备注','是否取机结算','是否已返回送修部门',
		               '往来单位id','售后类型id','是否返修id'];
	colName[3] = colName3; 
	//弹出框，选项卡主表 ，不可增加
	var colName4 =  ['id','项目编号','项目名称','预设价格','实际收费','备注'];
	colName[4] = colName4;
	//弹出框，选项卡表 ，不可增加
	var colName5 = ['id','仓库','配件编码','配件名称','增/换','数量','单价','金额','型号','品牌','颜色','主串号','辅串号','备注','增换id'];
	colName[5] = colName5;
	
	//串号备用机，不可增加
	var colName6 =  ['ID','串号','辅助串号','备注','主串号','辅串号','单价'];
	colName[6] = colName6; 
	
	//商品名称，不可增加
	var colName7 = ['ID','商品编码','商品名称','商品类别','商品品牌','商品型号','商品颜色','网络制式','是否管理串号',
	                '颜色ID','商品类别id','商品品牌id','网络制式id','单价'];
	colName[7] = colName7;
	
	var JqGridColModel = [];
	var JqGridColModel0 =[
	                  // {name:'deliveryDo',index:'deliveryDo', width:70,align:'center',sortable:false},
	                   {name:'id',index:'id',width:70,align:'center',hidden:true},
	                   {name:'flowNo',index:'flowNo', width:150,align:'center',sorttype:'string',sortable:false},
	                   {name:'imei',index:'imei', width:100,align:'center',sorttype:'string',sortable:false},
	                   {name:'contactunitName',index:'contactunitName', width:100,align:'center',sorttype:'string',sortable:false},
	                   {name:'contactBy',index:'contactBy', width:100,align:'center',sorttype:'string',sortable:false},
	                   {name:'telephone',index:'telephone', width:100,align:'center',sorttype:'string',sortable:false},
	                   {name:'goodsName',index:'goodsName', width:100,align:'center',sorttype:'string',sortable:false},
	                   {name:'falutDesc',index:'falutDesc', width:100,align:'center',sorttype:'string',sortable:false},
	                   {name:'looksDesc',index:'looksDesc', width:100,align:'center',sorttype:'string',sortable:false},
	                   {name:'quotePrice',index:'quotePrice', width:100,align:'center',sorttype:'string',sortable:false},
	                   {name:'category',index:'category', width:100,align:'center',sorttype:'string',sortable:false},
	                   {name:'repairFlag',index:'repairFlag', width:100,align:'center',sorttype:'string',sortable:false,formatter:'select',editoptions:{value:"1:是;0:否"}},
	                   {name:'remark',index:'remark', width:100,align:'center',sorttype:'string',sortable:false},
	                   {name:'sectionName',index:'sectionName', width:100,align:'center',sorttype:'string',sortable:false},
	                   {name:'repairStatus',index:'repairStatus', width:100,align:'center',sorttype:'string',sortable:false},
	                   {name:'serviceTypeID',index:'serviceTypeID', width:100,align:'center',sorttype:'string',sortable:false},
	                   
	                   {name:'serviceType',index:'serviceType', width:100,align:'center',sorttype:'string',sortable:false,hidden:true},
	                   {name:'contactsunitId',index:'contactsunitId', width:100,align:'center',sorttype:'string',sortable:false,hidden:true},
	                   {name:'repairSectionId',index:'repairSectionId', width:100,align:'center',sorttype:'string',sortable:false,hidden:true}
	                  
	                   ];
	JqGridColModel[0]=JqGridColModel0;
	
	var JqGridColModel1 =[
	                      {name:'deliveryDo',index:'deliveryDo', width:70,align:'center',sortable:false,formatter: addAndDelete},
		                   {name:'id',index:'id',width:70,align:'center',hidden:true},
		                   {name:'code',index:'code', width:150,align:'center',sorttype:'string',sortable:false},
		                   {name:'projectId',index:'projectId', width:200,align:'center',sorttype:'string',sortable:false,editable:true,edittype:'select',editoptions: {
		                	   value: getStorage(),
		                	   dataEvents:[{
								type:"blur",
								fn:function(e){
		                	   		var da=JSON.parse($(this).val());
			                	   	  var aid=$(this).parents('tr').attr('id');
		                		      $(this).parents('table').setCell(aid,'projectVal',da.id);
		                		      $(this).parents('table').setCell(aid,'code',da.code);
									 $(this).parents('table').setCell(aid,'predictPrice',da.predictPrice);
		                   		}
							},{
								type:'change',
								fn:function(e){
								 var rid=$(this).parents('tr').attr('id');
								 var data=JSON.parse($(this).val());
								 $(this).parents('table').setCell(rid,'code',data.code);
								 $(this).parents('table').setCell(rid,'predictPrice',data.predictPrice);
							}
							}]}},
		                   {name:'predictPrice',index:'predictPrice', width:100,align:'center',sorttype:'string'},
		                   {name:'actualAmount',index:'actualAmount', width:100,align:'center',formatter:'number',sortable:false,editable:true,editoptions:{
								dataEvents:[{
									type:"blur",
									fn:function(e){
										$("#jqGrid_YFtab1").jqGrid("saveCell",lastrow ,lastcell );
										var parseTotal=  $("#jqGrid_YFtab1").jqGrid('getCol', 'actualAmount', false, 'sum');
				                        $("#jqGrid_YFtab1").jqGrid('footerData', 'set', {actualAmount: parseTotal});
				                        $(".wxf").val(parseTotal);
				                        calcMoney();
									}
								}],onkeyup:"tableInput.checkNum(this,12)"}},
						{name:'remark',index:'remark', width:150,align:'center',sorttype:'string',sortable:false,editable:true,editoptions:{
							onblur:"(function(){$('#jqGrid_YFtab1').jqGrid('saveCell',lastrow,lastcell)})()",onkeyup:"tableInput.checkStr(this,100)"}},
		                   {name:'projectVal',index:'projectVal', width:100,align:'center',sorttype:'string',sortable:false,hidden:true}
		                   ];
	JqGridColModel[1]=JqGridColModel1;

	var JqGridColModel2 =[
	                      {name:'deliveryDo',index:'deliveryDo', width:70,align:'center',sortable:false,formatter: addAndDelete},
		                   {name:'id',index:'id',width:70,align:'center',hidden:true},
		                   {name:'storageNa',index:'storageNa', width:180,align:'center',sortable:false,hidden:true},
		                   {name:'storageId',index:'storageId', width:180,align:'center',sortable:false,editable:true,edittype:'select',editoptions: {
		                	//   value: getStorageCK(),
		                	   dataEvents:[{type:"blur",fn:function(){
		                		   $('#jqGrid_YFtab2').find('td[aria-describedby=jqGrid_YFtab2_storageNa]').html($(this).val());
		                		   $("#jqGrid_YFtab2").jqGrid("saveCell",lastrow ,lastcell );
// 	                		       var aid=$(this).parents('tr').attr('id');
// 	                		      $(this).parents('table').setCell(aid,'storageValue',$(this).val());
		                	   }
		                	   }]}},
		                   {name:'code',index:'code', width:150,align:'center',sorttype:'string',sortable:false},
		                   {name:'partsId',index:'partsId', width:180,align:'center',sorttype:'string',sortable:false,formatter:beijian},
		                   {name:'addFlag',index:'addFlag', width:100,align:'center',sorttype:'string',sortable:false,formatter:zengYF},
		                   {name:'partNumber',index:'partNumber', width:100,align:'center',sorttype:'string',sortable:false,editable:true,editoptions:{
		                	   onblur:"(function(){$('#jqGrid_YFtab2').jqGrid('saveCell',lastrow,lastcell)})()",onkeyup:"tableInput.inputNum(this,10)"}},
		                   {name:'amount',index:'amount', width:100,align:'center',sorttype:'string',sortable:false,editable:true,editoptions:{onblur:"(function(){$('#jqGrid_YFtab2').jqGrid('saveCell',lastrow,lastcell)})()",onkeyup:"tableInput.checkNum(this,12)"}},
		                   {name:'price',index:'price', width:100,align:'center',sorttype:'string',sortable:false,editable:true,formatter:'number',editoptions:{
								dataEvents:[{
									type:"blur",
									fn:function(e){
										$("#jqGrid_YFtab2").jqGrid("saveCell",lastrow ,lastcell );
										var parseTotal=  $("#jqGrid_YFtab2").jqGrid('getCol', 'price', false, 'sum');
				                        $("#jqGrid_YFtab2").jqGrid('footerData', 'set', {price: parseTotal});
				                        $(".clf").val(parseTotal);
				                        calcMoney();
									}
								}],onkeyup:"tableInput.checkNum(this,12)"}},
		                   {name:'goodsModel',index:'goodsModel', width:100,align:'center',sorttype:'string',sortable:false},
		                   {name:'goodsBrandName',index:'goodsBrandName', width:100,align:'center',sorttype:'string',sortable:false},
		                   {name:'newColor',index:'newColor', width:100,align:'center',sorttype:'string',sortable:false},
		                   {name:'newImei',index:'newImei', width:150,align:'center',sorttype:'string',sortable:false},
		                   {name:'newAuxiliaryImei',index:'newAuxiliaryImei', width:150,align:'center',sorttype:'string',sortable:false},
		                   {name:'remark',index:'remark', width:150,align:'center',sorttype:'string',sortable:false,editable:true,editoptions:{onblur:"(function(){$('#jqGrid_YFtab2').jqGrid('saveCell',lastrow,lastcell)})()",onkeyup:"tableInput.checkStr(this,100)"}},
		                   
		                   {name:'partsValue',index:'partsValue', width:30,align:'center',sorttype:'string',hidden:true}
		                   ];
	JqGridColModel[2]=JqGridColModel2;
	
	var JqGridColModel3 =[
							//{name:'deliveryDo',index:'deliveryDo', width:70,align:'center',sortable:false},
		                   {name:'id',index:'id',width:70,align:'center',hidden:true},
		                   {name:'serviceTypeID',index:'serviceTypeID', width:100,align:'center',sorttype:'string',sortable:false},
		                   {name:'flowNo',index:'flowNo', width:180,align:'center',sorttype:'string',sortable:false},
		                   {name:'receiveTime',index:'receiveTime', width:100,align:'center',sorttype:'string',sortable:false},
		                   {name:'takeTime',index:'takeTime', width:100,align:'center',sorttype:'string',sortable:false},
		                   {name:'imei',index:'imei', width:120,align:'center',sorttype:'string',sortable:false},
		                   {name:'contactsunitName',index:'contactsunitName', width:100,align:'center',sorttype:'string',sortable:false},
		                   {name:'customId',index:'customId', width:100,align:'center',sorttype:'string',sortable:false},
		                   {name:'telephone',index:'telephone', width:100,align:'center',sorttype:'string',sortable:false},
		                   {name:'goodsName',index:'goodsName', width:100,align:'center',sorttype:'string',sortable:false},
		                   {name:'falutDesc',index:'falutDesc', width:100,align:'center',sorttype:'string',sortable:false},
		                   {name:'looksDesc',index:'looksDesc', width:100,align:'center',sorttype:'string',sortable:false},
		                   {name:'quotePrice',index:'quotePrice', width:100,align:'center',sorttype:'string',sortable:false},
		                   {name:'goodsCategoryName',index:'goodsCategoryName', width:100,align:'center',sorttype:'string',sortable:false},
		                   {name:'returnFlagName',index:'returnFlagName', width:100,align:'center',sorttype:'string',sortable:false},
		                   {name:'remark',index:'remark', width:100,align:'center',sorttype:'string',sortable:false},
		                   {name:'isSettle',index:'isSettle', width:100,align:'center',sorttype:'string',sortable:false},
		                   {name:'isReturn',index:'isReturn', width:150,align:'center',sorttype:'string',sortable:false},
		                   
		                   {name:'contactsunitId',index:'contactsunitId', width:150,align:'center',sorttype:'string',sortable:false,hidden:true},
		                   {name:'serviceType',index:'serviceType', width:150,align:'center',sorttype:'string',sortable:false,hidden:true},
		                   {name:'returnFlag',index:'returnFlag', width:100,align:'center',sorttype:'string',sortable:false,hidden:true}
		   					 ];
		JqGridColModel[3]=JqGridColModel3;

		var JqGridColModel4 = [
							{name:'id',index:'id',width:70,align:'center',hidden:true},
							{name:'code',index:'code', width:150,align:'center',sorttype:'string',sortable:false},
							{name:'name',index:'name', width:180,align:'center',sorttype:'string',sortable:false},
							{name:'predictPrice',index:'predictPrice', width:100,align:'center',sorttype:'string',sortable:false},
							{name:'actualAmount',index:'actualAmount', width:100,align:'center',sorttype:'string',sortable:false},
							{name:'remark',index:'remark', width:100,align:'center',sorttype:'string',sortable:false}
			                   ];
		JqGridColModel[4]=JqGridColModel4;

		var JqGridColModel5=[
							{name:'id',index:'id',width:70,align:'center',hidden:true},
		                   {name:'storageName',index:'storageName', width:180,align:'center',sortable:false},
		                   {name:'code',index:'code', width:150,align:'center',sorttype:'string',sortable:false},
		                   {name:'name',index:'name', width:200,align:'center',sorttype:'string',sortable:false},
		                   {name:'addFlagName',index:'addFlagName', width:100,align:'center',sorttype:'string',sortable:false},
		                   {name:'partNumber',index:'partNumber', width:100,align:'center',sorttype:'string',sortable:false},
		                   {name:'price',index:'price', width:100,align:'center',sorttype:'string',sortable:false},
		                   {name:'amount',index:'amount', width:100,align:'center',sorttype:'string',sortable:false},
		                   {name:'goodsModel',index:'goodsModel', width:100,align:'center',sorttype:'string',sortable:false},
		                   {name:'goodsBrandName',index:'goodsBrandName', width:100,align:'center',sorttype:'string',sortable:false},
		                   {name:'goodsColorName',index:'goodsColorName', width:100,align:'center',sorttype:'string',sortable:false},
		                   {name:'newImei',index:'newImei', width:150,align:'center',sorttype:'string',sortable:false},
		                   {name:'newAuxiliaryImei',index:'newAuxiliaryImei', width:150,align:'center',sorttype:'string',sortable:false},
		                   {name:'remark',index:'remark', width:150,align:'center',sorttype:'string',sortable:false},
		                   {name:'addFlag',index:'addFlag', width:150,align:'center',sorttype:'string',sortable:false,hidden:true}
			                ];
	    JqGridColModel[5]=JqGridColModel5;
	    
	    var JqGridColModel6 =[
	  						{name:'id',index:'id', width:55,align:'center', sorttype:'string',hidden:true},
	  						{name:'imei',index:'imei', width:160,align:'center', sorttype:'string',sortable:false,formatter:numberCheck},
	  						{name:'auxiliaryImei',index:'auxiliaryImei', width:160,align:'center', sorttype:'string',sortable:false},
	  						{name:'remark',index:'remark', width:150,align:'center', sorttype:'string',sortable:false},
	  						{name:'imei',index:'imei', width:150,align:'center', sorttype:'string',sortable:false,hidden:true},
	  						{name:'auxiliaryImei',index:'auxiliaryImei', width:150,align:'center', sorttype:'string',sortable:false,hidden:true},
	  						{name:'inStoragePrices',index:'inStoragePrices', width:150,align:'center', sorttype:'string',sortable:false,hidden:true}
	  	   					 ];
	  	JqGridColModel[6]=JqGridColModel6;
	  	
	  	 var JqGridColModel7 =[
	  	    					{name:'id',index:'id', width:55,align:'center', sorttype:'string',sortable:false,hidden:true},
	  							{name:'code',index:'code', width:100,align:'center', sorttype:'string',sortable:false},
	  							{name:'name',index:'name', width:100,align:'center', sorttype:'string',sortable:false,formatter:spmcCheck},
	  							{name:'goodsCategoryName',index:'goodsCategoryName', width:100,align:'center', sorttype:'string',sortable:false},
	  							{name:'goodsBrandName',index:'goodsBrandName', width:100,align:'center', sorttype:'string',sortable:false},
	  							{name:'goodsModel',index:'goodsModel', width:100,align:'center', sorttype:'string',sortable:false},
	  							{name:'goodsColorName',index:'goodsColorName', width:100,align:'center', sorttype:'string',sortable:false},
	  							{name:'networkStandardName',index:'networkStandardName', width:100,align:'center', sorttype:'string',sortable:false},
	  							{name:'ifManageImei',index:'ifManageImei', width:120,align:'center', sorttype:'string',sortable:false,formatter:'select',editoptions:{value:"true:是;false:否"}},
	  							{name:'goodsColorId',index:'goodsColorId', width:20,align:'center', sorttype:'string',formatter:'select',sortable:false,hidden:true},
	  							{name:'goodsCategoryId',index:'goodsCategoryId', width:20,align:'center', sorttype:'string',formatter:'select',sortable:false,hidden:true},
	  							{name:'goodsBrandId',index:'goodsBrandId', width:20,align:'center', sorttype:'string',formatter:'select',sortable:false,hidden:true},
	  							{name:'networkStandard',index:'networkStandard', width:20,align:'center', sorttype:'string',formatter:'select',sortable:false,hidden:true},
	  							{name:'unitPrice',index:'unitPrice', width:20,align:'center', sorttype:'string',formatter:'select',sortable:false,hidden:true}
	  	    					];
	  		JqGridColModel[7]=JqGridColModel7;
	
	//全局当前选择的rowid colid
    var lastId1=""
	var rowid1='';
	//var colid='';
	var select_name='';
	var defaults = {
	LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
	LoadTableUrl: "/manager/afterSalesService/selfRepair/query",
	//LoadTableUrl: "../../json/admin/metaData12.json",
	GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
	DelRowUrl: "", // 删除信息接口地址
	isSub:"",//是否有子级表格
	subLoadTableUrl:"",//子级表格数据来源地址
	TableName: "#jqGrid_toGetTreatment", //显示表格名称。遵照css选择器书写
	iconJsonUrl:"../json/icon.json",
	btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
	pager:"#jqGridPager_toGetTreatment",
	TableInfo:"0",
	choose:true,
	height: $(window).height()*0.16,
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
		//var toggleflag=false;//冻结时候切换用
		var c=options.TableInfo;//参数index
		//console.log("&&&&"+c);
		var colNames = colName[c];
		var JqGridColModel = JqGridColModel[c];
		loadtable(options,colNames,JqGridColModel);
	//加载表格
	//console.log('kangkang')
		
		function saveCell(){
			$("#jqGrid_YFtab1").jqGrid("saveCell",lastrow ,lastcell );
			$("#jqGrid_YFtab2").jqGrid("saveCell",lastrow ,lastcell );
		}
		
		function addAndDelete(cellvalue, options, rowObjec){
			var addAndDel = '<div class="operating" data-id="' + options.rowId + '"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true" id="add_row" title="新增"></span><span class="glyphicon glyphicon-trash" aria-hidden="true" id="add_row" title="删除行"></span></div>';
			return addAndDel;
		}
		
		// 列表复选框
		function checkBox(cellvalue, options, rowObjec){
			return '<input type="checkbox" class="checkBoxNum" data-id="' + rowObjec.deliveryId + '"  data-rId="' + options.rowId + '" />';
		}
		
		//配件名称修改
		function beijian(cellvalue, options, rowObject){
			return '<input type="text" class="goodsRid' + options.rowId +'" data-tId="' + rowObject.partsId + '" style="border:0;text-align:center;width:150px;height:30px;" disabled/><span class="goodsFilter glyphicon glyphicon-plus" data-toggle="modal" data-target="#goodsFilter" data-rId="' + options.rowId +'"></span>';
			
		};
		//select下拉框
		function zengYF(cellvalue, options, rowObject){
			return '<select class="addFlag'+ options.rowId +'" data-tId="'+ rowObject.addFlag + '" style="border:0;text-align:center;width:60px;height:30px;"><option  value="1">增</option><option  value="2">换</option></select>';
		};
		
}
//新增一行
$(document).on('click', '.glyphicon-plus-sign',function(e){
	var thisTitle = $(this).attr("title");
	var rowId = $(this).parent().data('id');
	var dataIdList=$(this).parents('table').getDataIDs();
	var maxId=Math.max.apply(null,dataIdList);

	var tab1=$('#YFtab1').is(":hidden");
	var tab2=$('#YFtab2').is(':hidden');
	if(!tab1){
		$("#jqGrid_YFtab1").jqGrid('addRowData', maxId+1, {}, 'last' );
	}else if(!tab2){
		$("#jqGrid_YFtab2").jqGrid('addRowData', maxId+1, {}, 'last' );
	}else{
		alert('错误！');
	}
	
});
//删除一行
$(document).on('click', '.glyphicon-trash',function(e){
	var thisTitle = $(this).attr("title");
	var rowId = $(this).parent().data('id');
	
	var tab1=$('#YFtab1').is(":hidden");
	var tab2=$('#YFtab2').is(':hidden');
	if(!tab1){
		if(thisTitle == "删除行"){
			console.log('条数:' + $('#jqGrid_YFtab1 tbody tr').length);
			if($('#jqGrid_YFtab1 tbody tr').length === 2) {
				$.zxsaas_plus.showalert("错误","至少保留一条数据!")
				return false;
			}
			$.zxsaas_plus.showconfirm("","是否确定删除本行?",function(){
				$("#jqGrid_YFtab1").jqGrid('delRowData', rowId);
			},function(){
				
			});
		}
	}else if(!tab2){
		if(thisTitle == "删除行"){
			console.log('条数:' + $('#jqGrid_YFtab1 tbody tr').length);
			if($('#jqGrid_YFtab2 tbody tr').length === 2) {
				$.zxsaas_plus.showalert("错误","至少保留一条数据!")
				return false;
			}
			$.zxsaas_plus.showconfirm("","是否确定删除本行?",function(){
				$("#jqGrid_YFtab2").jqGrid('delRowData', rowId);
			},function(){
				
			});
		}
	}else{
		$.zxsaas_plus.showalert("错误","删除失败!")
	}
	
});
//选项卡主表
$(document).ready(function(){
	detectionYF();//技术员下拉
	getStorageWEI();//维修部门下拉
	colorYF()//颜色下拉
	
	var ad=$(document.body).width();
	
	$('.widthyf1').attr("width",ad);
	$('.widthYF2').attr("width",ad);
	$('.widthYF3').attr("width",ad);

	loadmodal({"TableName":"#jqGrid_YFtab1","pager":"#jqGridPager_YFtabModel1","LoadTableUrl":"/manager/afterSalesService/receiveRecord/queryHistory?imei=null","choose":false,"TableInfo":"1","footerrow":true,"userDataOnFooter":true});
	loadmodal({"TableName":"#jqGrid_YFtab2","pager":"#jqGridPager_YFtabModel2","LoadTableUrl":"","choose":false,"TableInfo":"2","footerrow":true,"userDataOnFooter":true});
	
	
	toGet1("#toGet1");
	toGet2("#toGet2");
});
$(document).on('click','.changeYF1',function(){
	
	loadmodal({"TableName":"#jqGrid_YFtab1","pager":"#jqGridPager_YFtabModel1","height":"$(window).height()*0.14","LoadTableUrl":"/manager/afterSalesService/receiveRecord/queryHistory?imei=null","choose":false,"TableInfo":"1","footerrow":true,"userDataOnFooter":true});
	var data=$("#jqGrid_YFtab1").jqGrid('getRowData',0);
	if(!data.deliveryDo){
	$("#jqGrid_YFtab1").jqGrid('addRowData',0, {"deliveryDo":"","id":"","code":"","projectId":"","predictPrice":"","actualAmount":"","remark":"","projectVal":""}, 'last' );
	}
});
//选项卡表2
$(document).on('click','.changeYF2',function(){
	loadmodal({"TableName":"#jqGrid_YFtab2","pager":"#jqGridPager_YFtabModel2","height":"$(window).height()*0.14","LoadTableUrl":"","choose":false,"TableInfo":"2","footerrow":true,"userDataOnFooter":true});
	var data=$("#jqGrid_YFtab2").jqGrid('getRowData',0);
	if(!data.deliveryDo){
		$("#jqGrid_YFtab2").jqGrid('addRowData',0, {"deliveryDo":"","id":"","storageId":"","code":"","partsId":"","addFlag":"","partNumber":"","amount":"","price":"","goodsModel":""
			,"goodsBrandName":"","newColor":"","oldColor":"","newImei":"","oldImei":"","newAuxiliaryImei":"","oldAuxiliaryImei":"","remark":"","storageValue":"","partsValue":""}, 'last' );
	}
});

//弹出框历史维修记录
$(document).on('click','.changeChoose',function(){
	loadmodal({"TableName":"#jqGrid_changeYF","pager":"#gridpager_changeYF","LoadTableUrl":"","TableInfo":"3"});
	loadmodal({"TableName":"#jqGrid_YFtabModel1","pager":"#jqGridPager_YF1","LoadTableUrl":"","choose":false,"TableInfo":"4"});
});
//弹出框  
$(document).on('click', '.changeModel2',function(){
	loadmodal({"TableName":"#jqGrid_YFtabModel2","pager":"#jqGridPager_YF2","LoadTableUrl":"","choose":false,"TableInfo":"5"});
});


//查询历史维修记录的过滤按钮
$(document).on('click','.guolv',function(){
	var imei =$('.imei').val();
	var phone =$('.phone').val();
	var dateBegin =$('#datetimepickerStart1').val();
	var dateEnd =$('#datetimepickerStart2').val();
	$.request({
	   	url:'/manager/afterSalesService/selfRepair/querySelfHistory?imei='+imei+'&phone='+phone+'&dateBegin='+dateBegin+'&dateEnd='+dateEnd,
	   	dataType:'json',
	   	contentType:'application/json;charset=utf-8',
	   	type:'GET',
	   	success:function(data){
			if(data.result==1){
				var dataList = data.data.list;
				$("#jqGrid_changeYF").jqGrid('clearGridData');
				for(var i = 0,len = dataList.length;i<len;i ++){
					var dat = dataList[i].attrs;
					var arr ={
						'id':dataList[i].id,
						'serviceType':dataList[i].serviceType,
						'flowNo':dataList[i].flowNo,
						'receiveTime':dat.receiveTime,
						'takeTime':dat.takeTime,
						'imei':dataList[i].imei,
						'contactsunitName':dat.contactsunitName,
						
						'customId':dataList[i].customId,
						'telephone':dataList[i].telephone,
						'goodsName':dataList[i].goodsName,
						'falutDesc':dataList[i].falutDesc,
						'looksDesc':dataList[i].looksDesc,
						'quotePrice':dataList[i].quotePrice,
						'goodsCategoryName':dataList[i].goodsCategoryName,
						'returnFlag':dataList[i].returnFlag,
						'remark':dataList[i].remark,
						'isSettle':dat.isSettle,
						'isReturn':dat.isReturn,
						'contactsunitId':dataList[i].contactsunitId,
					}
					$("#jqGrid_changeYF").jqGrid('addRowData',i+1,arr,'last');
					
					var serviceType=dataList[i].serviceType;
					var returnFlag=dataList[i].returnFlag;
    				if(serviceType==1){
    					$('#jqGrid_changeYF').jqGrid('setCell',i+1,'serviceTypeID','售后');
    				}
    				if(serviceType==2){
    					$('#jqGrid_changeYF').jqGrid('setCell',i+1,'serviceTypeID','售前');
    				}
    				if(returnFlag==0){
    					$('#jqGrid_changeYF').jqGrid('setCell',i+1,'returnFlagName','否');
    				}
    				if(returnFlag==1){
    					$('#jqGrid_changeYF').jqGrid('setCell',i+1,'returnFlagName','是');
    				}
				}
			}
	   	},
	   	error:function(){
	   		$.zxsaas_plus.showalert("","error!")
	   	}
	   	
	   })
})
//取消已修复标志
$(document).on('click','.quxiaoFlag',function(){
	var cc=$('#jqGrid_changeYF').jqGrid('getGridParam','selarrrow');
	var flowNo=$('#jqGrid_changeYF').getCell(cc,'flowNo');
	$.request({
	   	url:'/manager/afterSalesService/selfRepair/notRepaired?flowNo='+flowNo,
	   	dataType:'json',
	   	contentType:'application/json;charset=utf-8',
	   	type:'GET',
	   	success:function(data){
			$("#jqGrid_changeYF").jqGrid('delRowData',cc);
	   	},
	   	error:function(){
	   		$.zxsaas_plus.showalert("","error!")
	   	}
	   	
	   });
})

//回车查询
$(document).on('keydown','.fasttips',function(event){
	if(event.keyCode==13){
	    quick();
	}
});

var quick = function(){
	var reUrl =function(sUrl){
		$.request({
	    	url:sUrl,
	    	dataType:'json',
	    	contentType:'application/json;charset=utf-8',
//	    	data:JSON.stringify(data),
	    	type:'GET',
	    	success:function(data){
				var dataList=data.data.pageList;
				$("#jqGrid_toGetTreatment").jqGrid('clearGridData');
				for(var i=0;i< dataList.length;i++){
					$("#jqGrid_toGetTreatment").jqGrid('addRowData',i,dataList[i],'last');
				}
	    	},
	    	error:function(){
	    		$.zxsaas_plus.showalert("","error!")
	    	}
		});
	}
		var zonghe =$('.fasttips').val();
		
		var a =$('.radquery:checked').val();
		switch(a){
			case '1':
				var url = '/manager/afterSalesService/selfRepair/query?flowNo='+zonghe;
				reUrl(url);
				break;
			case '2':
				var url = '/manager/afterSalesService/selfRepair/query?imei='+zonghe;
				reUrl(url);
				break;
			case '3':
				var url = '/manager/afterSalesService/selfRepair/query?contactBy='+zonghe;
				reUrl(url);
				break;
			case '4':
				var url = '/manager/afterSalesService/selfRepair/query?telephone='+zonghe;
				reUrl(url);
				break;
			case '5':
				var url = '/manager/afterSalesService/selfRepair/query?contactsunitName='+zonghe;
				reUrl(url);
				break;
		}
	
}
//费用合计
$(document).on('blur','.qitaY1',function(){
	var var1=$(this).val();
	$('.qitaY2').val(var1);
	calcMoney();
});


var calcMoney = function(){
	var clf = $('.clf').val();
	var wxf = $('.wxf').val();
	var qitaY2 = $('.qitaY2').val();
	var total = clf * 1 + wxf * 1 + qitaY2 * 1;
	$('.fyhj').val(total);
};

//保存数据
$(document).on('click','.saveData',function(){
	$("#toGet1").data('bootstrapValidator').validate();
	$("#toGet2").data('bootstrapValidator').validate();
	if(!($("#toGet1").data('bootstrapValidator').isValid())&&!($("#toGet2").data('bootstrapValidator').isValid())){
		refreshValidator("#toGet1");
		refreshValidator("#toGet2");
		return;
	}
	var data = saveData();
	$.request({
    	url:"/manager/afterSalesService/selfRepair/save",
    	dataType:'json',
    	contentType:'application/json;charset=utf-8',
    	data:JSON.stringify(data),
    	type:'POST',
    	success:function(data){
    		console.log(data);
    		//(data.result == 1) && ($.zxsaas_plus.showalert("","保存成功!"))
    		if(data.result == 1){
    			$.zxsaas_plus.showalert("提示","保存成功!")
    			$("#jqGrid_toGetTreatment").trigger("reloadGrid");
    		}
    		if(data.result == -999){
    			$.zxsaas_plus.showalert("错误","保存失败!")
    		}
    	},
    	error:function(){
    		$.zxsaas_plus.showalert("","error!")
    	}
    })
});

//获取数据
var saveData = function(){
	var repairFlag=0;
	if($(".repairFlag").prop('checked')==true){
		repairFlag=1;
	}
	var rowIds =$('#jqGrid_toGetTreatment').jqGrid('getGridParam','selrow');
	var rows = $("#jqGrid_toGetTreatment").jqGrid("getRowData", rowIds);
	var tableD = function(){	
		var data={
				"flowNo":rows.flowNo,
				"repairSectionId":$('.sectionYF option:selected').val(),
				"imei":rows.imei,
				"contactsunitId":rows.contactsunitId,
				"customId":rows.customId,
				"telephone":rows.telephone,
				"goodsId":rows.goodsId,
				"falutDesc":rows.falutDesc,
				"looksDesc":rows.looksDesc,
				"returnFlag":rows.returnFlag,
				"remark":rows.remark,
				"stuffAmount":$('.clf').val(),
				"repairAmount":$('.wxf').val(),
				"otherAmount":$('.qitaY2').val(),
				"totalAmount":$('.fyhj').val(),
				"quotePrice":$('.quotePrice').val(),
				"technicianId":$('.technicianId option:selected').val(),
				"repairFlag":repairFlag,
				"serviceType":rows.serviceType,
				"goodsCategoryName":rows.category,
				"goodsName":rows.goodsName
		}
		return data;
	};
	
	var weixiuD=function(){
		var arr2=[];
		var rowIds = $('#jqGrid_YFtab1').jqGrid('getDataIDs');
	 	for(var i = 0 ;i < rowIds.length;i++){
	 		var rows = $("#jqGrid_YFtab1").jqGrid("getRowData", rowIds[i]);
	 		var selectXIANG=$('.storRid' + rows.id+ ' option:selected').val();
	 		arr2.push({"projectId":rows.projectVal,"actualAmount":rows.actualAmount,"remark":rows.remark});
	 	}
	 	return arr2;
	};
	
	var changeParts=function(){
		var arrtable=[];
		var rowIds = $('#jqGrid_YFtab2').jqGrid('getDataIDs');
	 	for(var i = 0 ;i < rowIds.length;i++){
	 		var rows = $("#jqGrid_YFtab2").jqGrid("getRowData", rowIds[i]);
	 		var selectCANG=$('.storRid' + rows.id+ ' option:selected').val();
	 		addFlag=$('input[class=addFlag'+rows.id+']').prop('checked')?1:0
	 		arrtable.push({"storageId":rows.storageNa,"partsId":rows.partsValue,"addFlag":addFlag,"partNumber":rows.partNumber,"amount":rows.amount,"price":rows.price,"oldImei":rows.oldImei,"newImei":rows.newImei,"newAuxiliaryImei":rows.newAuxiliaryImei,"oldAuxiliaryImei":rows.oldAuxiliaryImei,"remark":rows.remark});
	 	}
	 	return arrtable;
	};
	
	var bianwiD ={
		"newImei":$('.newImei').val(),
		"newAuxiliaryImei":$('.newAuxiliaryImei').val(),
		"newColor":$('.newColor option:selected').val(),
		"remark":''
	};
	
	var checkResult ={
		"falutDesc":$('.falutDesc').val(),
		"testResult":$('.testResult').val(),
		"repairProject":$('.repairProject').val(),
		"otherAmount":$('.qitaY1').val(),
		"otherCost":$('.otherCost').val(),
		"remark":$('.remark').val()
	};
	
	var getData ={
			'main':tableD(),
			'repairProject':weixiuD(),
			'changeParts':changeParts(),
			'changeAppearance':bianwiD,
			'checkResult':checkResult
	}
	return getData;
}


//项目名称下拉框
var poject0={};
var poject1={};
var poject2={};
function getStorage(){
	var countries = {};
	$.request({  
	 	url: '/manager/afterSalesService/selfRepair/getAddedService',//请求路径  
	 	async: false,  
	 	success: function(data) {   
			if(data.data.list){
		 		for(var i = 0,len = data.data.list.length;i < len;i ++){
		 			poject0 = data.data.list;
		 			var jsonString=JSON.stringify(data.data.list[i]);
		 			poject1 = data.data.list[i].code;
		 			poject2 = data.data.list[i].predictPrice;
		 			countries[jsonString] = data.data.list[i].name;
		 			
		 		}
			}
	 	},
	 	
	 	error:function(){
	 		
	 	}
	 	});
	return countries;
};

function pojectXIA(pojectID, index,rows) {
	for(var i = 0; i < poject0.length; i++) {
		var goods = poject0[i];
		if(pojectID == goods.id) {
			var rowIds = $('#jqGrid_YFtab1').jqGrid('getDataIDs');
			$('#jqGrid_YFtab1').jqGrid("setCell", rows,"code",poject1);
			$('#jqGrid_YFtab1').jqGrid("setCell", rows,"predictPrice",poject2);
		}
		
	}
}

//技术员下拉
function detectionYF(){
	$.request({  
	 	url: '/manager/afterSalesCommon/getManagers',//请求路径  
	 	async: false,  
	 	success: function(data) {   
	 		for(var i = 0,len = data.data.managerList.length;i < len;i ++){
	 			countries = data.data.managerList[i];
	 			$('.technicianId').append("<option value='"+countries.id+"' selected>"+countries.name+"</option>");
	 		}
	 	},
	 	error:function(){
	 		$.zxsaas_plus.showalert("","error!")
	 	}
	 	});
	
};


//商品名称//配件
var quanjuA='';
$(document).on('click','.goodsFilter',function(){
	 quanjuA=$(this).parents('tr').attr('id');
		var setting = {  
		        data: {
					simpleData: {
						enable: true,
						idKey: "id",
						pIdKey: "pid",
						rootPId: null
					}
				},
				callback: {
					onClick: zTreeOnCheck
				},
				view: {
					showIcon: false
				},
		    }; 
	     	var ids = [];//选中节点id的集合
		    var names = [];//选中节点名字的集合
			function zTreeOnCheck(event, treeId, treeNode) {
				var id = treeNode.id;//获取数据的Id
				var tName = treeNode.name;
				curr_goodsclass_tree_selectId = (id==-1?"":id);
				quickGoods();
				if(treeNode.checked){
					ids.push(id);
					names.push(tName);
				}else{
					for(var i = 0;i<ids.length;i++){
						(ids[i] == id) && (ids.splice(i,1));
					}
					for(var i = 0;i<names.length;i++){
						(names[i] == tName) && (names.splice(i,1));
					}
				}
			}; 
		$.request({
	        type: 'Get',
	        url: '/manager/Tgoodsclass/findTree2?groupId='+groupId,
	         //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
	        success: function (data) {
	        	//debugger;
	            $.fn.zTree.init($("#spmcDataTree"), setting, data);
	            var str = $("#spmcDataTree"+'_1_switch').attr('class');
	            var zTree = $.fn.zTree.getZTreeObj("#spmcDataTree".replace("#",""));
	        	zTree.expandAll(true);//展开全部节点
	         
	        },
	        error: function (msg) {
	            alert(" 数据加载失败！" + msg);
	        }
	    });
   rowsId = $(this).data('rid');
   loadmodal({"TableName":"#jqGrid_tranSpmc","pager":"#gridpager_tranSpmc","height":"$(window).height()*0.45","TableInfo":"7","LoadTableUrl":"/manager/afterSalesCommon/getGoods"});
   $.request({
   	url:'/manager/Tgoodsname/page',
   	dataType:'json',
   	contentType:'application/json;charset=utf-8',
   	
   	type:'GET',
   	data:{
		page:1,
		rows:10
	},
   	success:function(data){
			var dataList = data.data.rows;
			$("#jqGrid_tranSpmc").jqGrid('clearGridData');
			for(var i = 0,len = dataList.length;i<len;i ++){
				$("#jqGrid_tranSpmc").jqGrid('addRowData',i,dataList[i],'last');
			}
   	},
   	error:function(){
   		$.zxsaas_plus.showalert("","error!")
   	}
   	
   })
});

//当点击的商品是数量时，带出单价
var QjuDanYF='';
var priceYF = function(goods,stror){
	console.log(quanjuA)
	var goodsId=$('#jqGrid_YFtab2').getCell(quanjuA,'partsValue');
	var storageId=$('#jqGrid_YFtab2').getCell(quanjuA,'storageNa');
	$.request({
    	url:'/manager/afterSalesCommon/getGoodsNumStock?goodsId='+goodsId+'&storageId='+storageId,
    	dataType:'json',
    	contentType:'application/json;charset=utf-8',
    	async:true,
    	type:'GET',
    	success:function(data){
		console.log(goodsId+'---'+storageId)
			if(data.data.stockNum!=''){
				QjuDanYF=data.data.stockNum.unitPrice;
			}
		},
	   	error:function(){
	   		$.zxsaas_plus.showalert("","error!")
	   	}
	});
};

$(document).on('click','.spmcCheck',function(cellvalue, options,rowObject){
	var val=$(this).html();
	
	var ids=$(this).parents('tr').attr('id');
	var id=$('#jqGrid_tranSpmc').getCell(ids,'id');
	var code=$('#jqGrid_tranSpmc').getCell(ids,'code');//商品编码
	var name=$('#jqGrid_tranSpmc').getCell(ids,'name');
	var goodsCategoryName=$('#jqGrid_tranSpmc').getCell(ids,'goodsCategoryName');//商品类别
	var goodsCategoryId=$('#jqGrid_tranSpmc').getCell(ids,'goodsCategoryId');
	var goodsModel=$('#jqGrid_tranSpmc').getCell(ids,'goodsModel');//商品型号
	var goodsBrandId=$('#jqGrid_tranSpmc').getCell(ids,'goodsBrandId');
	var goodsBrandName=$('#jqGrid_tranSpmc').getCell(ids,'goodsBrandName');//商品品牌
	var goodsColorName=$('#jqGrid_tranSpmc').getCell(ids,'goodsColorName');//商品颜色
	
	var idss=$(this).parents('tr').attr('id');
	var ifManageImei=$('#jqGrid_tranSpmc').getCell(idss,'ifManageImei');
	var unitPrice=$('#jqGrid_tranSpmc').getCell(idss,'unitPrice');
	$('.goodsRid'+rowsId).val(val);
	$('#jqGrid_YFtab2').find('td[aria-describedby=jqGrid_YFtab2_partsValue]').html(ids);//备件的id
	$('#jqGrid_YFtab2').find('td[aria-describedby=jqGrid_YFtab2_code]').html(code);
	$('#jqGrid_YFtab2').find('td[aria-describedby=jqGrid_YFtab2_goodsModel]').html(goodsModel);
	$('#jqGrid_YFtab2').find('td[aria-describedby=jqGrid_YFtab2_goodsBrandName]').html(goodsBrandName);
	$('#jqGrid_YFtab2').find('td[aria-describedby=jqGrid_YFtab2_newColor]').html(goodsColorName);
	$('.goodsIDYF').val(ids);
	
	if(ifManageImei=='true'){
		$("#jqGrid_YFtab2").setColProp('partNumber',{editable:false});
		$("#jqGrid_YFtab2").setColProp('amount',{editable:true});
		$("#jqGrid_YFtab2").setColProp('price',{editable:true});
		$("#jqGrid_YFtab2").find('td[aria-describedby=jqGrid_YFtab2_partNumber]').attr({"data-toggle":"modal","data-target":"#numberChoose","data-rId":rowid});
		$("#jqGrid_YFtab2").find('td[aria-describedby=jqGrid_YFtab2_partNumber]').addClass("numberPlus");
	}else{
		$("#jqGrid_YFtab2").find('td[aria-describedby=jqGrid_YFtab2_partNumber]').removeAttr("data-toggle");
	 	$("#jqGrid_YFtab2").find('td[aria-describedby=jqGrid_YFtab2_partNumber]').removeAttr("data-target");
	 	$("#jqGrid_YFtab2").find('td[aria-describedby=jqGrid_YFtab2_partNumber]').removeAttr("data-rId");
	 	$("#jqGrid_YFtab2").find('td[aria-describedby=jqGrid_YFtab2_partNumber]').removeClass("numberPlus");
	 	$("#jqGrid_YFtab2").find('td[aria-describedby=jqGrid_YFtab2_partNumber]').html("");
		$("#jqGrid_YFtab2").setColProp('partNumber',{editable:true});
		$("#jqGrid_YFtab2").setColProp('amount',{editable:true});
		$("#jqGrid_YFtab2").setColProp('price',{editable:true});
		priceYF();
		$("#jqGrid_YFtab2").find('td[aria-describedby=jqGrid_YFtab2_amount]').html(unitPrice);
	}	
});
function spmcCheck(cellvalue, options, rowObject){
	return '<span class="spmcCheck" data-dismiss="modal">' + cellvalue + '</span>';
};
$(document).on('keydown','.quickGoods',function(event){
	if(event.keyCode==13){
		quickGoods();
	}
});
function quickGoods(){
	var fasttips = $('.quickGoods').val();
	$.request({
    	url:'/manager/Tgoodsname/page',
    	dataType:'json',
    	contentType:'application/json;charset=utf-8',
    	
    	type:'GET',
    	data:{
		keyWord:fasttips,
		selectTreeClassId:curr_goodsclass_tree_selectId,
		page:1,
		rows:10
	},
    	success:function(data){
			var dataList = data.data.rows;
			$("#jqGrid_tranSpmc").jqGrid('clearGridData');
			for(var i = 0,len = dataList.length;i<len;i ++){
				$("#jqGrid_tranSpmc").jqGrid('addRowData',i,dataList[i],'last');
			}
    	},
    	error:function(){
    		$.zxsaas_plus.showalert("","error!")
    	}
    	
    })
}

//维修部门下拉
function getStorageWEI(){
	$.request({  
	 	url: '/manager/afterSalesCommon/getRepairSections',//请求路径  
	 	async: false,  
	 	success: function(data) {   
	 		for(var i = 0,len = data.data.sectionList.length;i < len;i ++){
	 			countries = data.data.sectionList[i];
	 			$('.sectionYF').append("<option value='"+countries.id+"' selected>"+countries.name+"</option>");
	 		}
	 	},
	 	error:function(){
	 		$.zxsaas_plus.showalert("","error!")
	 	}
	 	});
	
};

$(document).on('click','.handleModeXIA',function(){
//	var handleMode=$('.handleMode option:selected').val();
//	var rowIds = $('#jqGrid_toGetTreatment').jqGrid('getDataIDs');
//	var rows = $("#jqGrid_toGetTreatment").jqGrid("getRowData", rowIds);
//	var flowNo=rows.flowNo;
	var data=hand();
	$.request({  
	 	url: '/manager/afterSalesService/selfRepair/changeHandleMode',//请求路径  
	 	dataType:'json',
    	contentType:'application/json;charset=utf-8',
    	data:JSON.stringify(data),
    	type:'POST',
	 	success: function(data) {  
			(data.result == 1) && ($.zxsaas_plus.showalert("","保存成功!"))
			if(data.result == -999){
				$.zxsaas_plus.showalert("","保存失败!")
			}
	 	},
	 	error:function(){
	 		
	 	}
	 	});
})
var hand = function(){
	var aa=$('#jqGrid_toGetTreatment').jqGrid('getGridParam','selarrrow');
	var rows = $("#jqGrid_toGetTreatment").jqGrid("getRowData",aa);
	var flowNo=[];
	flowNo.push(rows.flowNo);
	var b={
			'handleMode':$('.handleMode option:selected').val(),
			'flowNos':flowNo
	}
	return b;
}















function loadtable(options,colNames,JqGridColModel){
		
				$(options.TableName).jqGrid({
					url:options.LoadTableUrl,
					mtype:"GET",
					datatype: "json",
					jsonReader  : {	
							root: "data.pageList",
							repeatitems: false
							},
					colNames:colNames,          
		            colModel:JqGridColModel,
		            cellEdit:true,
		            cellsubmit:'clientArray',//单元格保存内容的位置
		            editurl: 'clientArray',
		            sortable:false,			            
		            rownumbers:true,
		            rowNum: 10,
		            rowList: [10, 20, 50,100],
		            pager:options.pager,
		            viewrecords: true,
		            sortable:false,
		           //  cellEdit:true,
		            width: "100%" ,
		           // height: $(window).height()*0.45,
		            height:options.height,
					autowidth:true,
					rownumWidth: 35, // the width of the row numbers columns
					shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
					multiselect:options.choose,
					multiboxonly:true,
					//footerrow:true,  //设置表格显示表脚
					//userDataOnFooter:true,//设置userData 显示在footer里
					footerrow:options.footerrow,
					userDataOnFooter:options.userDataOnFooter,
					ondblClickRow:function(id){
					//双击进入编辑
		   				var delid = id;
					},
					formatCell:function(rowid, cellname, value, iRow, iCol){
						$('#jqGrid_YFtab2').setColProp('storageId',{editoptions:{
							dataUrl:'/manager/afterSalesCommon/getStorages?sectionId='+$('.sectionYF').val(),
							buildSelect:function(data){
								
								var data=JSON.parse(data);
								var str='';
								var list=data.data.storageList;
								 str+='<select class="form-control shouhXIA">'
									  $.each(list,function(index,item){
										  str+='<option  value='+item.id+' >'+item.name+'</option>'
									  })
									  str+='</select>'
								return str;
							}
						}})	
						},
					onCellSelect:function(id,index,cellcontent,e){
						var colName=$(options.TableName).jqGrid('getGridParam','colModel')[index].name 
				      	select_name=colName
				      	select_index=index;
				      	rowid=id;
//				      	if(options.TableInfo == 1 || options.TableInfo == 2){
//					      	var ids = $(options.TableName).jqGrid('getDataIDs');
//							//获得当前最大行号（数据编号）
//							var maxid;
//							maxid = (ids.length ==0 ) ? 0 : Math.max.apply(Math,ids);
//							//当用户点击表格最后一行时,自动增加一行
//							
//							(id == maxid && index != 1) && $(options.TableName).jqGrid('addRowData', maxid+1, {}, 'last' );
//						}
				    	
					},
					beforeEditCell:function(rowid,cellname,v,iRow,iCol){
							lastrow = iRow;
							lastcell = iCol;
							
							//$("#jqGrid_YFtab2").jqGrid("saveCell",rowid ,lastcell);
							
							 $(document).on("change","#"+(rowid*1+1)+"_"+"partsId",function(){
								 var a=  $(this).find("option:selected").val();
								   changeGoods(a, $(this).index,rowid);
							 });	
							 	
							 $(document).on("change","#"+(rowid*1+1)+"_"+"projectId",function(){
								 var a=  $(this).find("option:selected").val();
								 pojectXIA(a, $(this).index,rowid);
							 });
					 
					},
					afterEditCell: function(rowid, cellname, value, iRow, iCol){//编辑完cell
						
					},
					beforeSelectRow:function(rowid,e){
                        //单行选择
					    
//						$(options.TableName).jqGrid('resetSelection');//设置单选  只能选中一行
//					     return(true); 
					},
					afterInsertRow: function (rowid, aData) { //新增一行之后

					},
					gridComplete: function() {
					//	var ids=$(options.TableName).jqGrid("getDataIDs");
						
                   
					},
					onSelectRow:function(id,rowId, status, e){//当选择行时触发此事件
						//单选
						if (rowId == lastSel) {
				            $(this).jqGrid("resetSelection");
				            lastSel = undefined;
				            status = false;
				        } else {
				            lastSel = rowId;
				        }
						
						var rows=$('#jqGrid_toGetTreatment').jqGrid('getGridParam','selarrrow');
						var idss=$('#jqGrid_toGetTreatment').jqGrid('getRowData',rows);
						var a=idss.serviceType;
						//2为售前，1为售后
						if(a==2){
							$('.clf').val("0.00");
							$('.wxf').val("0.00");
							$('.qitaY1').attr({"disabled":"disabled"});
							$('.qitaY1').val("0.00");
							$('.qitaY2').val("0.00");
							$('.fyhj').val("0.00");
							$("#jqGrid_YFtab1").setColProp('actualAmount',{editable:false});
							$("#jqGrid_YFtab2").setColProp('amount',{editable:false});
							$("#jqGrid_YFtab2").setColProp('price',{editable:false});
						}else{
							$("#jqGrid_YFtab1").setColProp('actualAmount',{editable:true});
							$("#jqGrid_YFtab2").setColProp('amount',{editable:true});
							$("#jqGrid_YFtab2").setColProp('price',{editable:true});
							$('.qitaY1').removeAttr("disabled");
							$('.qitaY1').val("");
							$('.fyhj').val("");
							var parseTotal=  $("#jqGrid_YFtab1").jqGrid('getCol', 'actualAmount', false, 'sum');
	                        $("#jqGrid_YFtab1").jqGrid('footerData', 'set', {actualAmount: parseTotal});
	                        $(".wxf").val(parseTotal);
	                        var parseTotal2=  $("#jqGrid_YFtab2").jqGrid('getCol', 'price', false, 'sum');
	                        $("#jqGrid_YFtab2").jqGrid('footerData', 'set', {price: parseTotal2});
	                        $(".clf").val(parseTotal2);
							calcMoney();
							
						}
						
						var cc=$('#jqGrid_changeYF').jqGrid('getGridParam','selarrrow');
						var c=$('#jqGrid_changeYF').getCell(cc,'flowNo');
						$.request({
					    	url:'/manager/afterSalesService/takeMachine/getRepairData?flowNo='+c,
					    	dataType:'json',
					    	contentType:'application/json;charset=utf-8',
					    //	data:JSON.stringify(data),
					    	type:'GET',
					    	success:function(data){
					    		//维修项目
					    		if(data.result==1){
					    			var wx=data.data.projectList;
						    		for(i=0;i<wx.length;i++){
						    			var hh=wx[i].attrs.projectName;
						    			var arr={
						    					'id':wx[i].id,
						    					'code':hh.code,
						    					'name':hh.name,
						    					'predictPrice':hh.predictPrice,
						    					'actualAmount':wx[i].actualAmount,
						    					'remark':wx[i].remark,
						    			}
						    			$("#jqGrid_YFtabModel1").jqGrid('addRowData',i+1,arr,'last');
						    		}
						    		
						    		//更换备件
						    		var bj=data.data.partsList;
						    		for(i=0;i<bj.length;i++){
						    			var hh=bj[i].attrs.goods;
						    			var arrt={
						    					'id':bj[i].id,
						    					'storageName':bj[i].attrs.storageName,
						    					'code':hh.code,
						    					'name':hh.name,
						    					'addFlag':bj[i].addFlag,
						    					'partNumber':bj[i].partNumber,
						    					'price':bj[i].price,
						    					'amount':bj[i].amount,
						    					'goodsModel':hh.goodsModel,
						    					'goodsBrandName':hh.goodsBrandName,
						    					'goodsColorName':hh.goodsColorName,
						    					'newImei':bj[i].newImei,
						    					'newAuxiliaryImei':bj[i].newAuxiliaryImei,
						    					'remark':bj[i].remark
						    			}
						    			$("#jqGrid_YFtabModel2").jqGrid('addRowData',i+1,arrt,'last');
						    			
						    			var addFlag=bj[i].addFlag;
						    			if(addFlag==1){
					    					$('#jqGrid_YFtabModel2').jqGrid('setCell',i+1,'addFlagName','增');
					    				}
					    				if(addFlag==2){
					    					$('#jqGrid_YFtabModel2').jqGrid('setCell',i+1,'addFlagName','换');
					    				}
						    		}
						    		//外观，串号变更
						    		var wg=data.data.imeicolorChange;
						    		$('.newimei1').val(wg.newImei);
						    		$('.newimeiFU').val(wg.newAuxiliaryImei);
						    		$('.newColorYF').val(wg.newColor);
						    		
						    		//检修结果
						    		var da=data.data.testresult;
						    		$('.guzhang').val(da.falutDesc);
						    		$('.jiance').val(da.testResult);
						    		$('.weixiufang').val(da.repairProject);
						    		$('.qitafeiYF').val(da.otherAmount);
						    		$('.qitachenYF').val(da.otherCost);
						    		$('.beizhuYF').val(da.remark);
					    		}
					    	},
					    	error:function(){
					    		$.zxsaas_plus.showalert("","error!")
					    	}
					    })
					},
					loadComplete:function(data){
						
                        
                        
                        var serviceType="";//服务类型
                        var repairStatus="";//维修状态
                        $.request({
                    		url:'/manager/afterSalesService/selfRepair/query',
                    		datatype:'json',
                    		type:'GET',
                    		success:function(data){
                    		//	console.log(data);
                    			var dataList = data.data.pageList;
                    			
                    			for(var i = 0,len = dataList.length;i<len;i ++){
                    				serviceType = dataList[i].serviceType;
                    				repairStatus=dataList[i].repairStatus;
                    				var d = dataList[i].handleMode;
                    				$('.handleMode  option[value="' + d + '"] ').attr("selected",true);
                    				if(serviceType==1){
                    					$('#jqGrid_toGetTreatment').jqGrid('setCell',i+1,'serviceTypeID','售后');
                    				}
                    				if(serviceType==2){
                    					$('#jqGrid_toGetTreatment').jqGrid('setCell',i+1,'serviceTypeID','售前');
                    				}
                    				//维修状态
                    				if(repairStatus==1){
                    					$('#jqGrid_toGetTreatment').jqGrid('setCell',i+1,'repairStatus','售前处理单');
                    				}
                    				if(repairStatus==2){
                    					$('#jqGrid_toGetTreatment').jqGrid('setCell',i+1,'repairStatus','已接机');
                    				}
                    				if(repairStatus==3){
                    					$('#jqGrid_toGetTreatment').jqGrid('setCell',i+1,'repairStatus','自修中');
                    				}
                    				if(repairStatus==4){
                    					$('#jqGrid_toGetTreatment').jqGrid('setCell',i+1,'repairStatus','外修中');
                    				}
                    				if(repairStatus==5){
                    					$('#jqGrid_toGetTreatment').jqGrid('setCell',i+1,'repairStatus','返厂中');
                    				}
                    				if(repairStatus==6){
                    					$('#jqGrid_toGetTreatment').jqGrid('setCell',i+1,'repairStatus','已修复');
                    				}
                    				if(repairStatus==7){
                    					$('#jqGrid_toGetTreatment').jqGrid('setCell',i+1,'repairStatus','已取机');
                    				}
                    				if(repairStatus==8){
                    					$('#jqGrid_toGetTreatment').jqGrid('setCell',i+1,'repairStatus','已返回');
                    				}
                    				if(repairStatus==9){
                    					$('#jqGrid_toGetTreatment').jqGrid('setCell',i+1,'repairStatus','已接收');
                    				}
                    			}
                    			
                    		}
                    	});
                        var data1=$("#jqGrid_YFtab1").jqGrid('getRowData',0);
                        if(!data1.deliveryDo){
                        	$("#jqGrid_YFtab1").jqGrid('addRowData',0, {"deliveryDo":"","id":"","code":"","projectId":"","predictPrice":"","actualAmount":"","remark":"","projectVal":""}, 'last' );
                        	}
                      //  $("#jqGrid_YFtab1").jqGrid('addRowData',0, {"deliveryDo":"","id":"","code":"","projectId":"","predictPrice":"","actualAmount":"","remark":"","projectVal":""}, 'last' );
					},
					loadError:function(xhr,status,error){
						//console.log(status)
					}
					})
		}


//颜色下拉
function colorYF(){
	$.request({  
	 	url: '/manager/afterSalesCommon/getColor',//请求路径  
	 	async: false,  
	 	success: function(data) {   
	 		for(var i = 0,len = data.data.list.length;i < len;i ++){
	 			countries = data.data.list[i];
	 			$('.newColor').append("<option value='"+countries.id+"' selected>"+countries.name+"</option>");
	 		}
	 	},
	 	error:function(){
	 		$.zxsaas_plus.showalert("","error!")
	 	}
	 	});
	
};

//串号弹出框
$(document).on('click','.numberPlus',function(){
	loadmodal({"TableName":"#jqGrid_tranNumber","pager":"#gridpager_tranNumber","LoadTableUrl":"","choose":false,"TableInfo":"6","footerrow":false,"userDataOnFooter":false});
	var ids=$(this).parents('tr').attr('id');
	var goodsId=$('#jqGrid_YFtab2').getCell(ids,'partsValue');
	var storageId=$('#jqGrid_YFtab2').getCell(ids,'storageNa');
	$.request({  
	 	url: '/manager/afterSalesCommon/getImeis?goodsId='+goodsId+'&storageId='+storageId,//请求路径  
	 	async: false,  
	 	success: function(data) {  
			if(data.result==1){
				var dataList=data.data.imeiList;
		 		for(var i = 0,len =dataList.length;i < len;i ++){
		 			$("#jqGrid_tranNumber").jqGrid('addRowData',i,dataList[i],'last');
		 		}
			}
	 	},
	 	error:function(){
	 		$.zxsaas_plus.showalert("","error!")
	 	}
	 	});
});
$(document).on('click','.numberCheck',function(cellvalue, options,rowObject){
	var a=$(this).html();
	$('.numberPlus').text('1');
	var ids=$(this).parents('tr').attr('id');
	var a1=$('#jqGrid_tranNumber').getCell(ids,'imei');
	var a2=$('#jqGrid_tranNumber').getCell(ids,'auxiliaryImei');
	var a3=$('#jqGrid_tranNumber').getCell(ids,'inStoragePrices');
	
	$('#jqGrid_YFtab2').find('td[aria-describedby=jqGrid_YFtab2_newImei]').html(a1);
	$('#jqGrid_YFtab2').find('td[aria-describedby=jqGrid_YFtab2_newAuxiliaryImei]').html(a2);
	$('#jqGrid_YFtab2').find('td[aria-describedby=jqGrid_YFtab2_amount]').html(a3);
});
function numberCheck(cellvalue, options, rowObject){
	return '<span class="numberCheck" data-dismiss="modal">' + cellvalue + '</span>';
};


//放弃修改
$(document).on('click','.giveUp',function(){
	$('#jqGrid_YFtab1').clearGridData();
	$("#jqGrid_YFtab1").jqGrid('addRowData',0, {"deliveryDo":"","id":"","code":"","projectId":"","predictPrice":"","actualAmount":"","remark":"","projectVal":""}, 'last' );
	$('#jqGrid_YFtab2').clearGridData();
	$("#jqGrid_YFtab2").jqGrid('addRowData',0, {"deliveryDo":"","id":"","code":"","projectId":"","predictPrice":"","actualAmount":"","remark":"","projectVal":""}, 'last' );
	$('.newImei').val('');
	$('.newAuxiliaryImei').val('');
	$('.newColor').val('');
	$('.falutDesc').val('');
	$('.testResult').val('');
	$('.repairProject').val('');
	$('.qitaY1').val('0.00');
	$('.otherCost').val('0.00');
	$('.remark').val('');
	refreshValidatorField("newImei",'#toGet1');//刷新验证信息
	refreshValidatorField("newAuxiliaryImei",'#toGet1');//刷新验证信息
	refreshValidatorField("testResult",'#toGet2');//刷新验证信息
	refreshValidatorField("repairProject",'#toGet2');//刷新验证信息
	refreshValidatorField("qitaY1",'#toGet2');//刷新验证信息
	refreshValidatorField("otherCost",'#toGet2');//刷新验证信息
	refreshValidatorField("remark",'#toGet2');//刷新验证信息
	
});


//设置表格
$(document).on("click","#myTab>li>a",function(){
	var t=$(this).attr("href");
	$(t).find("table").setGridWidth($(t).width());
	
});