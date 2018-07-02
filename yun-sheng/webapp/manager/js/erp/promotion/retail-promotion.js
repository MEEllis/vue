/***
 * @author XiangRui
 * 零售促销单js
 */
var billsDao = new CbillsMain(basePath);

//加载完初始化
$(function(){
	
	initUI();
	initEvent();
	
	addBtClick();
	reshSectionRange();
});

//初始化界面
function initUI(){
	
	//多选框
	$(".js-example-basic-multiple").select2({
		//data:data,
		'width': '400px',
		placeholder: "多选", //默认提示语
		//maximumSelectionLength: 3, //最多能够选择的个数
		language: "zh-CN"
	});
	
	initDataGrid1_2();
	initDataGrid2_3();
	initDataGrid2_2();
	initDataGrid2_4();
	initDataGrid3_1();
	initDataGrid3_3();
	initDataGrid3_4();
	initDataGrid4_1();
	initDataGrid4_3();
	initDataGrid4_4();
	initDataGrid5_1();
	initDataGrid5_2();
	initDataGrid4();
	initDataGrid5();
	
	//初始化日期控件
	$("#billsDateBegin").val($.DateFormat($.getCurrentMonthFirst(),"yyyy-MM-dd"));
	$("#billsDateEnd").val($.DateFormat($.getCurrentMonthLast(),"yyyy-MM-dd"));
	
	$("#billsDateBegin").datetimepicker({
		  lang:"ch",           //语言选择中文
	      format:"Y-m-d",      //格式化日期
	      timepicker:false,    //关闭时间选项
	      todayButton:false    //关闭选择今天按钮
	});
	$("#billsDateEnd").datetimepicker({
		  lang:"ch",           //语言选择中文
	      format:"Y-m-d",      //格式化日期                 
	      timepicker:false,    //关闭时间选项
	      todayButton:false    //关闭选择今天按钮
	});
	
	wResize();
	firstPage();
}

//事件
function initEvent(){	

	//日期选择
	$("#datetimepickerStart").datetimepicker({
		  lang:"ch",           //语言选择中文
	      format:"Y-m-d",      //格式化日期
	      timepicker:false,    //关闭时间选项
	      todayButton:false    //关闭选择今天按钮
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

	//促销类型选择事件 联动促销对象和明细
	$(".radio_Clazz").change(
		function(){
			changeUI1(null);
		}
	);
	//促销对象选择事件 联动明细
	$(".radio_Obj").change(
		function(){
			changeUI2();
		}
	);
	
	//促销日期类型事件  联动具体值
	$(".radio_sales").change(
			function(){
				changeUI3();
			}
	);
	
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        // 获取已激活的标签页的名称
        var activeTab = $(e.target).text();
        //根据选择初始化相应的表格
       
    });
	
	$(window).resize(wResize);//注册窗口改变事件
}

//修改控件状态
function changeUI1(salesObject){
	salesObject = salesObject == null?1:salesObject;
	var $selectedvalue = $("input[name='cxType']:checked").val();
	$('.flag').prop({'disabled':false});
	$('#salesAreaSelects').prop({'disabled':false});
	if($selectedvalue == 1){
		salesObject = 2;
		$('.radio_Obj').prop('disabled',true);
		$('#salesObj2').prop({'checked':true,'disabled':false});
	}else if($selectedvalue == 5){
		salesObject = "";
		$('.radio_Obj').prop({'checked':false,'disabled':true});
		$('#salesAreaSelects').prop({'disabled':true});
	}else if($selectedvalue == 2){
		$('.radio_Obj').prop({'checked':false,'disabled':false});
		$('#flag'+$selectedvalue).prop({'disabled':true});
		$('#salesObj'+salesObject).prop({'checked':true});
	}else{ 
		$('.radio_Obj').prop({'checked':false,'disabled':false});
		$('#salesObj2').prop({'disabled':true});
		$('#salesObj'+salesObject).prop({'checked':true});
		$('#flag'+$selectedvalue).prop({'disabled':true,'checked':false});
	}
	$('#gridTabs a[href="#tab'+$selectedvalue+'-'+salesObject+'"]').tab('show');
	try {MyEiditGrid.currEditDataGrid.unAllEdit();} catch (e) {}
	
}
function changeUI2(){
	var salesObject = 1;
	var salesClazz = $("input[name='cxType']:checked").val();
	var salesObj = $("input[name='cxObject']:checked").val();
	$('#gridTabs a[href="#tab'+salesClazz+'-'+salesObj+'"]').tab('show');
	
	try {MyEiditGrid.currEditDataGrid.unAllEdit();} catch (e) {}
	
}
function changeUI3(){
	var value = $("input[name='cxDateType']:checked").val();			
	$("#salesTimeSelects").prop({'disabled':true});
	$(".salesBox").prop({'disabled':true});	
	if(value == "2"){
		$("#salesTimeSelects").prop({'disabled':false});
	}else if(value == "3"){
		$(".salesBox").prop({'disabled':false});
	}
	try {MyEiditGrid.currEditDataGrid.unAllEdit();} catch (e) {}
}


//单据状态监听
function billsStautsListerning(bills){

	if(bills == null){
		$("#billsStautsImg1,#billsStautsImg2,#billsStautsImg3,#billsStautsImg4,#billsStautsImg5").hide();return;
	}
	/*
	 * judgeStatus exeuteStatus cancleStatus disableStatus
	 */
	if(bills.cancleStatus == 1){
		//作废
		$("#billsStautsImg1").attr("src",basePath+"/images/status/statusCancellation.png").show();;
	}else{
		$("#billsStautsImg1").hide();
	}
	if(bills.disableStatus == 1){
		//禁用
		$("#billsStautsImg2").attr("src",basePath+"/images/status/stop.png").show();;
	}else{
		$("#billsStautsImg2").hide();
	}
	if(bills.judgeStatus == 1){
		//审核
		$("#billsStautsImg3").attr("src",basePath+"/images/status/statusAudit.png").show();;
	}else{
		$("#billsStautsImg3").attr("src",basePath+"/images/status/statusNotAudit.png").show();;
	}
	
	//过期状态
	var currDate = new Date().getTime();
	if(currDate < bills.beginDate){
		$("#billsStautsImg4").attr("src",basePath+"/images/status/weishengxiao.png").show();;
	}else if(currDate >= bills.beginDate && currDate <= bills.endDate){
		$("#billsStautsImg4").attr("src",basePath+"/images/status/yishengxiao.png").show();;
	}else{
		$("#billsStautsImg4").attr("src",basePath+"/images/status/yishixiao.png").show();;
	}
	
	if(bills.exeuteStatus == 1){
		//执行
		$("#billsStautsImg5").attr("src",basePath+"/images/status/statusExecute.png").show();;
	}else{
		$("#billsStautsImg5").attr("src",basePath+"/images/status/statusNotExecute.png").show();;
	}
}

//窗口大小改变
function wResize(){
	var winH = $(window).height();//浏览器高度
	var winW = $(window).width();//浏览器宽度
	var centerH = winH - 500;//中部高度
	try {
		$(".referenceFrame").height(winH - 300);
		
		dataGrid1_2.$grid.setGridWidth($(window).width()-85); 
		dataGrid2_2.$grid.setGridWidth($(window).width()-85); 
		dataGrid2_3.$grid.setGridWidth($(window).width()-85); 
		dataGrid2_4.$grid.setGridWidth($(window).width()-85); 
		dataGrid3_1.$grid.setGridWidth($(window).width()-85); 
		dataGrid3_3.$grid.setGridWidth($(window).width()-85); 
		dataGrid3_4.$grid.setGridWidth($(window).width()-85);  
		dataGrid4_1.$grid.setGridWidth($(window).width()-85); 
		dataGrid4_3.$grid.setGridWidth($(window).width()-85); 
		dataGrid4_4.$grid.setGridWidth($(window).width()-85); 
		dataGrid5_1.$grid.setGridWidth($(window).width()-85); 
		dataGrid5_2.$grid.setGridWidth($(window).width()-85); 
		dataGrid1_2.$grid.setGridHeight(500);
		dataGrid2_2.$grid.setGridHeight(500);
		dataGrid2_3.$grid.setGridHeight(500);
		dataGrid2_4.$grid.setGridHeight(500);
		dataGrid3_1.$grid.setGridHeight(500);
		dataGrid3_3.$grid.setGridHeight(500);
		dataGrid3_4.$grid.setGridHeight(500);
		dataGrid4_1.$grid.setGridHeight(500);
		dataGrid4_3.$grid.setGridHeight(500);
		dataGrid4_4.$grid.setGridHeight(500);
		dataGrid5_1.$grid.setGridHeight(300);
		dataGrid5_2.$grid.setGridHeight(400);
		
		dataGrid1_2.$grid.closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
		dataGrid2_2.$grid.closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
		dataGrid2_3.$grid.closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
		dataGrid2_4.$grid.closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });
		dataGrid3_1.$grid.closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });
		dataGrid3_3.$grid.closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });
		dataGrid3_4.$grid.closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });
		dataGrid4_1.$grid.closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });
		dataGrid4_3.$grid.closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });
		dataGrid4_4.$grid.closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });
		dataGrid5_1.$grid.closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });
		dataGrid5_2.$grid.closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });
		
		$(body).css({paddingRight:'20px'});
	} catch (e) {
		// TODO: handle exception
	}

}

//查询按钮点击事件
function filterBtClick(){
	$('#filterParamModalDialog').modal('show');
	
}

//审核
function judgeBills(){
	var model = {'id':$("#form1").toJsonObject().id,'judgeStatus':'1'};
	if(model.id == "")return;
	
	billsDao.saveJudgeStatus(model, function(data){
		if(data.result == 1){
			$.MsgBox('提示','操作成功');
			queryPage();
		}else{
			$.MsgBox('出错提示',data.desc);
		}
	}, "lscx_audit");
}

//取消审核
function disJudgeBills(){
	var model = {'id':$("#form1").toJsonObject().id,'judgeStatus':'0'};
	if(model.id == "")return;
	
	billsDao.saveJudgeStatus(model, function(data){
		if(data.result == 1){
			$.MsgBox('提示','操作成功');
			queryPage();
		}else{
			$.MsgBox('出错提示',data.desc);
		}
	}, "lscx_audit");
}

//作废
function cancleBills(){
	var model = {'id':$("#form1").toJsonObject().id,'cancleStatus':'1'};
	if(model.id == "")return;
	
	billsDao.saveCancleStatus(model, function(data){
		if(data.result == 1){
			$.MsgBox('提示','操作成功');
			queryPage();
		}else{
			$.MsgBox('出错提示',data.desc);
		}
	}, "lscx_zf");
}

//恢复作废
function disCancleBills(){
	var model = {'id':$("#form1").toJsonObject().id,'cancleStatus':'0'};
	if(model.id == "")return;
	
	billsDao.saveCancleStatus(model, function(data){
		if(data.result == 1){
			$.MsgBox('提示','操作成功');
			queryPage();
		}else{
			$.MsgBox('出错提示',data.desc);
		}
	}, 'lscx_zf');
}

//停用
function disableBills(){
	var model = {'id':$("#form1").toJsonObject().id,'disableStatus':'1'};
	if(model.id == "")return;

	billsDao.saveDisableStatus(model, function(data){
		if(data.result == 1){
			$.MsgBox('提示','操作成功');
			queryPage();
		}else{
			$.MsgBox('出错提示',data.desc);
		}
	}, "lscx_disabled");
}

//恢复停用（启用）
function enableBills(){
	var model = {'id':$("#form1").toJsonObject().id,'disableStatus':'0'};
	if(model.id == "")return;

	billsDao.saveDisableStatus(model, function(data){
		if(data.result == 1){
			$.MsgBox('提示','操作成功');
			queryPage();
		}else{
			$.MsgBox('出错提示',data.desc);
		}
	}, "lscx_disabled");
}

//保存按钮点击事件
function saveBtClick(){
	try {MyEiditGrid.currEditDataGrid.unAllEdit();} catch (e) {}
	
	var formData = {};
	
	var formObj1 = $("#form1").toJsonObject();
	var formObj2 = $("#form2").toJsonObject();
	if(formObj2.cxDateType == "2"){
		formObj2.cxDateValue = $("#salesTimeSelects").select2().val()==null?"":$("#salesTimeSelects").select2().val().join(",");
	}
	if(formObj2.cxDateType == "3"){
		formObj2.cxDateValue = $("input[name='cxDateValueForWeek']:checked").map(function(){return $(this).val();}).get().join(","); 
	}
	delete formObj2["cxDateValueForMonth"];
	delete formObj2["cxDateValueForWeek"];

	var formObj3 = $("#form3").toJsonObject(); 
	var formObj4 = $("#form4").toJsonObject();
	formObj4.sectionRangeId = $("#salesAreaSelects").select2().val()==null?"":$("#salesAreaSelects").select2().val().join(",");
	
	var formObj5 = $("#form5").toJsonObject();
	
	$.extend(formData,formObj1,formObj2,formObj3,formObj4,formObj5);
	
	formData.discountFlag = $("input[name='discountFlag']").is(':checked')?1:0;
	formData.couponFlag = $("input[name='couponFlag']").is(':checked')?1:0;
	formData.giftFlag = $("input[name='giftFlag']").is(':checked')?1:0;
	
	//明细
	if(formData.cxType == "1" &&　formData.cxObject　==　"2"){
		//特价商品
		formData.retailGoodsNumList = dataGrid1_2.getGridDataList();
	}else if(formData.cxType == "2" &&　formData.cxObject　==　"1"){
		//打折-全场
		formData.retailDiscountDetailList = [{allDiscountRate:$("input[name='allDiscountRate']").val()}];
	}else if(formData.cxType == "2" &&　formData.cxObject　==　"2"){
		//打折-商品
		formData.retailDiscountDetailList = dataGrid2_2.getGridDataList();
	}else if(formData.cxType == "2" &&　formData.cxObject　==　"3"){
		//打折-商品分类
		formData.retailDiscountDetailList = dataGrid2_3.getGridDataList();
	}else if(formData.cxType == "2" &&　formData.cxObject　==　"4"){
		//打折-商品品牌
		formData.retailDiscountDetailList = dataGrid2_4.getGridDataList();
	}else if(formData.cxType == "3" &&　formData.cxObject　==　"1"){
		//返卷-全场
		formData.retailTicketDetailList = dataGrid3_1.getGridDataList();
	}else if(formData.cxType == "3" &&　formData.cxObject　==　"3"){
		//返卷-商品类别
		formData.retailTicketDetailList = dataGrid3_3.getGridDataList();
	}else if(formData.cxType == "3" &&　formData.cxObject　==　"4"){
		//返卷-商品品牌
		formData.retailTicketDetailList = dataGrid3_4.getGridDataList();
	}else if(formData.cxType == "4" &&　formData.cxObject　==　"1"){
		//赠品-全场
		formData.retailGiftDetailList = dataGrid4_1.getGridDataList();
	}else if(formData.cxType == "4" &&　formData.cxObject　==　"3"){
		//赠品-商品类别
		formData.retailGiftDetailList = dataGrid4_3.getGridDataList();
	}else if(formData.cxType == "4" &&　formData.cxObject　==　"4"){
		//赠品-商品品牌
		formData.retailGiftDetailList = dataGrid4_4.getGridDataList();
	}else if(formData.cxType == "5"){
		//组合
		formData.retailMixMainList = dataGrid5_1.getGridDataList();
	}
	
	//formData.billsCode = $.DateFormat();//假数据

	billsDao.saveRetailPromotionBills(formData, function(data){
		if(data.result == 1){
			$.MsgBox('提示','操作成功');
			queryPage();
		}else{
			$.MsgBox('出错提示',data.desc);
		}
	});
}

//新增按钮点击事件
function addBtClick(){
	$("#form1").writeJson2Dom({id: "", billsCode: "", planName: "", billsDate: "", beginDate: "", endDate: ""});
	$("#salesTime1").prop({'checked':true});
	$("#salesTimeSelects").prop({'disabled':true});
	$(".salesBox").prop({'disabled':true});	
	$("#salesClazz1").prop({'checked':true});
	$('.radio_Obj').prop('disabled',true);
	$('#salesObj2').prop({'checked':true,'disabled':false});
	$(".flag").prop({'checked':false});
	$("#salesTimeSelects").select2().val(null).trigger("change");
	$("#salesAreaSelects").select2().val(null).trigger("change");
	$("#salesAreaSelects").prop('disabled',false);

	dataGrid1_2.clearDataGrid();dataGrid1_2.addKongRow();
	$("input[name='allDiscountRate']").val(0);
	dataGrid2_2.clearDataGrid();dataGrid2_2.addKongRow();
	dataGrid2_3.clearDataGrid();dataGrid2_3.addKongRow();
	dataGrid2_4.clearDataGrid();dataGrid2_4.addKongRow();
	dataGrid3_1.clearDataGrid();dataGrid3_1.addKongRow();
	dataGrid3_3.clearDataGrid();dataGrid3_3.addKongRow();
	dataGrid3_4.clearDataGrid();dataGrid3_4.addKongRow();
	dataGrid4_1.clearDataGrid();dataGrid4_1.addKongRow();
	dataGrid4_3.clearDataGrid();dataGrid4_3.addKongRow();
	dataGrid4_4.clearDataGrid();dataGrid4_4.addKongRow();
	dataGrid5_1.clearDataGrid();dataGrid5_1.addKongRow();
	dataGrid5_2.clearDataGrid();dataGrid5_2.addKongRow();
	$('#gridTabs a[href="#tab'+1+'-'+2+'"]').tab('show');
	
	$('input[name="billsDate"]').val($.DateFormat(new Date(),"yyyy-MM-dd"));
	//resetQueryForm();
	
	billsStautsListerning(null);
}

//重置查询表单
function resetQueryForm(){
	$(".filterParamForm").writeJson2Dom({
		billsDateBegin:$.DateFormat($.getCurrentMonthFirst(),"yyyy-MM-dd"), 
		billsDateEnd:$.DateFormat($.getCurrentMonthLast(),"yyyy-MM-dd"), 
		cancleStatus:"", 
		disableStatus:"", 
		judgeStatus:"", 
		nameKeyWord:""
	});
}

//表格是否数量控制改变事件
function changeNumControlFlag(obj){
	try {MyEiditGrid.currEditDataGrid.unAllEdit();} catch (e) {}
	var isSelect = $("#"+obj).is(':checked');
	var gridId = $("#"+obj).attr('gid');
	var rowId = $("#"+obj).attr('rowid');
	if($("#"+obj).is(':checked')){
		$("#"+gridId).jqGrid('setCell', rowId ,"cxNum" ,0);
		$("#"+gridId).setColProp("cxNum",{editable:true});
		$("#checkIm_"+gridId+"_"+rowId).prop({'disabled':false});
	}else{
		$("#"+gridId).jqGrid('setCell', rowId ,"cxNum" ,-1);
		$("#"+gridId).setColProp("cxNum",{editable:false});
		$("#checkIm_"+gridId+"_"+rowId).prop({'checked':false,'disabled':true});
	}
}

function changeImControlFlag(obj){
	try {MyEiditGrid.currEditDataGrid.unAllEdit();} catch (e) {}
	var isSelect = $("#"+obj).is(':checked');
	var gridId = $("#"+obj).attr('gid');
	var rowId = $("#"+obj).attr('rowid');
	if($("#"+obj).is(':checked')){
		$("#"+gridId).setColProp("cxNum",{editable:false});
	}else{
		$("#"+gridId).setColProp("cxNum",{editable:true});
	}
	$("#"+gridId).jqGrid('setCell', rowId ,"imeiList" ,"");
	$("#"+gridId).jqGrid('setCell', rowId ,"cxNum" ,0);
}

/*****************************表格1-2 开始*******************************/
/*****************************/

//初始化表格
var dataGrid1_2 = null;
function initDataGrid1_2(){
	//配置
	var paras = {
	    gridId:'dataGrid1_2', 
	    addRow:{goodsId:'',goodsCode:'',goodsName:'',cxSectionId:'',stockNum:'',numControlFlag:'',imControlFlag:'',cxNum:'',cxDiscount:'100',cxPrice:'',price:'',remark:''},
	    colNames:['商品ID','商品类别','商品编码','商品名称','促销门店ID','促销门店','现存量','数量控制','串号控制','促销数量','促销价','促销折扣','零售价','备注','串号管理','串号列表'], 
	    colModel:
    	[
          {name:'goodsId',index:'goodsId', width:10,align:'center',hidden:true},
          {name:'goodsCategoryName',index:'goodsCategoryName', width:100,align:'center'},
 		  {name:'goodsCode',index:'goodsCode', width:200,align:'center'},
 		  {name:'goodsName',index:'goodsName', width:200,align:'center',edittype:'custom_bt_input',custom_element_bt_click:"selectReferenceOpenForGrid1_2",editable:true}, 
 		  {name:'cxSectionId',index:'cxSectionId', width:10,align:'center',hidden:true},
 		  {name:'cxSectionName',index:'cxSectionName', width:100,align:'center'},
 		  {name:'stockNumber',index:'stockNumber', sorttype:'integer',formatter:'integer', width:100,align:'center'},
 		  {name:'numControlFlag',index:'numControlFlag', width:100,align:'center',edittype:'checkbox',formatter:formatterNumControlFlag},
 		  {name:'imControlFlag',index:'imControlFlag',  width:100,align:'center',formatter:formatterImControlFlag},
 		  {name:'cxNum',index:'cxNum', width:100,align:'center',sorttype:'integer',formatter:'integer',editable:true},
 		  {name:'cxPrice',index:'cxPrice', width:100,align:'center',  sorttype:'float',formatter:"currency",editable:true},
 		  {name:'cxDiscount',index:'cxDiscount', width:100,align:'center',formatter:'currency',editable:true,formatoptions: {decimalSeparator:".",defaulValue:"0",decimalPlaces:"3",suffix:"%"}},
 		  {name:'price',index:'price', width:100,align:'center',  sorttype:'float',formatter:'currency'},
 		  {name:'remark',index:'remark', width:200,align:'center', sorttype:'string',editable:true},
          {name:'ifManageImei',index:'ifManageImei',hidden: true,editable:true,sortable: false},
          {name:'imeiList',index:'imeiList',hidden: true,editable:true,sortable: false}
        ]
	};
	//回调函数
	var callBackList = {
		onCellSelect:function(rowid,iCol,cellcontent,e){
			if(iCol == 11){
	    	  var currRow = $("#"+paras.gridId).jqGrid('getRowData', rowid);
	    	  if(currRow.goodsName == "" || currRow.cxSectionName == ""){
	    		  $.MsgBox("操作提示","请先选择门店和商品");
	    		  $("#"+paras.gridId).setColProp("cxNum",{editable:false});
	    		  return ;
	    	  }
			  var numControlFlag = $("#check_"+paras.gridId+'_'+rowid).is(':checked');
			  var imControlFlag = $("#checkIm_"+paras.gridId+'_'+rowid).is(':checked');
	    	  if(numControlFlag && imControlFlag){
	    		  $("#"+paras.gridId).setColProp("cxNum",{editable:false});
	    		  openInputImeiModal(paras.gridId,rowid);
	    	  }else if(numControlFlag && !imControlFlag){
	    		  $("#"+paras.gridId).setColProp("cxNum",{editable:true});
	    	  }else{
	    		  $("#"+paras.gridId).setColProp("cxNum",{editable:false});
	    	  }
			}
		},
		afterEditCell:function(rowid,name,val,iRow,iCol){//开始编辑
	 	
        },
        afterSaveCell:function(rowid,name,val,iRow,iCol){//保存编辑
        	if(name == "goodsName"){
        		var sections = $("#salesAreaSelects").select2().val();
        		var sectionNames=$.map($("#salesAreaSelects").find('option:selected'),function(obj,i){
        			return obj.innerHTML
        		}); 
    			var currRowId = rowid;
    			var tempRow = dataGrid1_2.$grid.jqGrid('getRowData', currRowId);
    			for ( var i = 1; i < sections.length; i++) {
    				var saveRowid = MyEiditGrid.getMaxRowid(dataGrid1_2.$grid) + 1;
    				tempRow.cxSectionId = sections[i];
    				tempRow.cxSectionName = sectionNames[i];
    				dataGrid1_2.$grid.addRowData(saveRowid, tempRow, "before", currRowId);
    				
    				//查询库存
    				queryStorageNum(paras.gridId,saveRowid,"stockNumber",tempRow=="true"?true:false,{sectionId:tempRow.cxSectionId,goodsId:tempRow.goodsId});
    				
    				tempRow = dataGrid1_2.$grid.jqGrid('getRowData', saveRowid);
    				currRowId = saveRowid;
    			}
        	}
        },
        summary:function(rowid,name,val,iRow,iCol){//统计处理
        	var ids=$("#dataGrid").getDataIDs();
            $.each(ids,function(i,value){
            	var currRow = dataGrid.$grid.jqGrid('getRowData', value);
            	
            	var amount = parseFloat(currRow.price)*goodsNumber; //金额
            	var discountRate = parseFloat(currRow.discountRate)/100; //折扣率
            	var discountPrice = parseFloat(currRow.price)*(1-parseFloat(currRow.discountRate)/100); //折扣单价

            	
            	dataGrid.$grid.jqGrid('setCell', value ,"amount" ,amount);
            	dataGrid.$grid.jqGrid('setCell', value ,"discountAmount" ,discountAmount);
            	dataGrid.$grid.jqGrid('setCell', value ,"discountedAmount" ,discountedAmount);
            	dataGrid.$grid.jqGrid('setCell', value ,"taxPrice" ,taxPrice);
            	dataGrid.$grid.jqGrid('setCell', value ,"taxAmount" ,taxAmount);
            	dataGrid.$grid.jqGrid('setCell', value ,"taxLimit" ,taxLimit);
            });
        },
        getGridDataList:function(rows){
        	//筛出不合格行
        	return $.map(rows,function(row){
				if(row.goodsId != "" && row.cxPrice != "" ){
					row.numControlFlag = $("#check_"+row.gridId+'_'+row.rowId).is(':checked');
					row.imControlFlag = $("#checkIm_"+row.gridId+'_'+row.rowId).is(':checked');
					row.numControlFlag = (row.numControlFlag==true?1:0);
					row.imControlFlag = (row.imControlFlag==true?1:0);
					delete row["stockNumber"];
					delete row["price"];
					delete row["ifManageImei"];
					if(row.imControlFlag && row.imeiList != ""){
						row.retailGoodsImList = JSON.parse(row.imeiList);
						delete row["imeiList"];
						return row;
					}else{
						delete row["imeiList"];
						return row;	
					}
				}
        	});
        }
	};
	dataGrid1_2 = new MyEiditGrid(paras,callBackList);

	//串号管理格式化
	function formatterImControlFlag(cellvalue, options, rowObject){
		if(cellvalue=="true" || rowObject.ifManageImei == "true" || rowObject.ifManageImei == true){
			return '<input type="checkbox" id="checkIm_'+options.gid+'_'+options.rowId+'" gid="'+options.gid+'" rowid="'+options.rowId+'" onchange="changeImControlFlag(this.id)">';;
		}else{
			return '<input type="checkbox" disabled="disabled">'; 
		}
	}
	//数量管理格式化
	function formatterNumControlFlag(cellvalue, options, rowObject){
		return '<input type="checkbox" id="check_'+options.gid+'_'+options.rowId+'" gid="'+options.gid+'" rowid="'+options.rowId+'" onchange="changeNumControlFlag(this.id)"  checked="checked">';
	}
}

/*****************************/
/*****************************表格1-2 结束*******************************/

function queryStorageNum(gridId,rowId,fieldName,isImei,paras){
	var url = this.basePath + '/IstockNum/listByModel';
	if(isImei == true){
		url = this.basePath + '/IstockIm/listByModel';	
	}
	$.ajax({
		url: url,
		type : "post",
		dataType : 'json',
		data:paras,
		success:function(data){
			if(data.result == 1){
				$("#"+gridId).jqGrid('setCell', rowId ,fieldName ,data.data.stockNum);
			}else{
				console.log(data);
			}
		}
	}); 
}

/*****************************表格2-2 开始*******************************/
/*****************************/

//初始化表格
var dataGrid2_2 = null;
function initDataGrid2_2(){
	//配置
	var paras = {
	    gridId:'dataGrid2_2', 
	    addRow:{goodsId:'',goodsCode:'',goodsName:'',stockNum:'',numControlFlag:'',cxNum:'0',cxDiscount:'0',cxPrice:'0',price:'0',remark:''},
	    colNames:['商品ID','商品编码','商品名称','现存量','数量控制','促销数量','促销折扣率','折后价','零售价','备注'], 
	    colModel:
    	[
          {name:'goodsId',index:'goodsId', width:10,align:'center',hidden:true},
 		  {name:'goodsCode',index:'goodsCode', width:200,align:'center'},
 		  {name:'goodsName',index:'goodsName', width:200,align:'center',edittype:'custom_bt_input',custom_element_bt_click:"selectReferenceOpen",editable:true}, 
 		  {name:'stockNumber',index:'stockNumber', sorttype:'integer',formatter:'integer', width:100,align:'center'},
 		  {name:'numControlFlag',index:'numControlFlag', width:100,align:'center',formatter:formatterNumControlFlag},
 		  {name:'cxNum',index:'cxNum', width:100,align:'center',sorttype:'integer',formatter:'integer',editable:true},
 		  {name:'cxDiscountRate',index:'cxDiscountRate', width:100,align:'center',formatter:'currency',editable:true,formatoptions: {decimalSeparator:".",defaulValue:"0",decimalPlaces:"3",suffix:"%"}},
 		  {name:'cxDiscountAmout',index:'cxDiscountAmout', width:100,align:'center',  sorttype:'float',formatter:"currency",editable:true},
 		  {name:'price',index:'price', width:100,align:'center',  sorttype:'float',formatter:'currency'},
 		  {name:'remark',index:'remark', width:200,align:'center', sorttype:'string',editable:true}
        ]
	};
	//回调函数
	var callBackList = {
		afterEditCell:function(rowid,name,val,iRow,iCol){//开始编辑
	 	
        },
        afterSaveCell:function(rowid,name,val,iRow,iCol){//保存编辑
        	if(name == "goodsName"){
        		var sections = $("#salesAreaSelects").select2().val();
    			var tempRow = dataGrid2_2.$grid.jqGrid('getRowData', rowid);
    			
   				//查询库存
				queryStorageNum(paras.gridId,rowid,"stockNumber",false,{sectionIdListStr:sections.join(","),goodsId:tempRow.goodsId});
				
        	}
        },
        summary:function(rowid,name,val,iRow,iCol){//统计处理
        	//汇总每一行
        	var ids=dataGrid2_2.$grid.getDataIDs();
        	$.each(ids,function(i,value){
        	  	var currRow = dataGrid2_2.$grid.jqGrid('getRowData', value);
        	  	dataGrid2_2.$grid.jqGrid('setCell', value ,"cxDiscountAmout" ,currRow.price * currRow.cxDiscountRate);
        	});
        },
        getGridDataList:function(rows){
        	//筛出不合格行
        	return $.map(rows,function(row){
				if(row.goodsId != ""){
					row.numControlFlag = $("#check_"+row.gridId+'_'+row.rowId).is(':checked');
					row.numControlFlag = (row.numControlFlag==true?1:0);
					delete row["stockNumber"];
					delete row["price"];
					return row;
				}
        	});
        }
	};
	dataGrid2_2 = new MyEiditGrid(paras,callBackList);

	//数量管理格式化
	function formatterNumControlFlag(cellvalue, options, rowObject){
		return '<input type="checkbox" id="check_'+options.gid+'_'+options.rowId+'" gid="'+options.gid+'" rowid="'+options.rowId+'" onchange="changeNumControlFlag(this.id)"  checked="checked">';
	}
}

/*****************************/
/*****************************表格2-2 结束*******************************/

/*****************************表格2-3 开始*******************************/
/*****************************/

//初始化表格
var dataGrid2_3 = null;
function initDataGrid2_3(){
	//配置
	var paras = {
	    gridId:'dataGrid2_3', 
	    addRow:{categoryId:'',categoryCode:'',categoryName:'',cxDiscountRate:'100',remark:''},
	    colNames:['类别ID','类别编码','类别名称','促销折扣率','备注'], 
	    colModel:
    	[
          {name:'categoryId',index:'categoryId', width:10,align:'center',hidden:true},
 		  {name:'categoryCode',index:'categoryCode', width:200,align:'center'},
 		  {name:'categoryName',index:'categoryName', width:200,align:'center',edittype:'custom_bt_input',custom_element_bt_click:"selectGoodsClassReferenceOpen",editable:true},   
 		  {name:'cxDiscountRate',index:'cxDiscountRate', width:100,align:'center',formatter:'currency',editable:true,formatoptions: {decimalSeparator:".",defaulValue:"0",decimalPlaces:"3",suffix:"%"}},
 		  {name:'remark',index:'remark', width:200,align:'center', sorttype:'string',editable:true}
        ]
	};
	//回调函数
	var callBackList = {
		afterEditCell:function(rowid,name,val,iRow,iCol){//开始编辑
	 	
        },
        afterSaveCell:function(rowid,name,val,iRow,iCol){//保存编辑
  	 
        },
        summary:function(rowid,name,val,iRow,iCol){//统计处理

        },
        getGridDataList:function(rows){
        	//筛出不合格行
        	return $.map(rows,function(row){
				if(row.categoryId != ""){
					return row;
				}
        	});
        }
        
	};
	dataGrid2_3 = new MyEiditGrid(paras,callBackList);
}

/*****************************/
/*****************************表格2-3 结束*******************************/


/*****************************表格2-4 开始*******************************/
/*****************************/

//初始化表格
var dataGrid2_4 = null;
function initDataGrid2_4(){
	//配置
	var paras = {
	    gridId:'dataGrid2_4', 
	    addRow:{brandId:'',brandCode:'',brandName:'',cxDiscountRate:'100',remark:''},
	    colNames:['品牌ID','品牌编码','品牌名称','促销折扣率','备注'], 
	    colModel:
    	[
          {name:'brandId',index:'brandId', width:10,align:'center',hidden:true},
 		  {name:'brandCode',index:'brandCode', width:200,align:'center'},
 		  {name:'brandName',index:'brandName', width:200,align:'center',edittype:'custom_bt_input',custom_element_bt_click:"selectGoodsBrandReferenceOpen",editable:true}, 
 		  {name:'cxDiscountRate',index:'cxDiscountRate', width:100,align:'center',formatter:'currency',editable:true,formatoptions: {decimalSeparator:".",defaulValue:"0",decimalPlaces:"3",suffix:"%"}},
 		  {name:'remark',index:'remark', width:200,align:'center', sorttype:'string',editable:true}
        ]
	};
	//回调函数
	var callBackList = {
		afterEditCell:function(rowid,name,val,iRow,iCol){//开始编辑
	 	
        },
        afterSaveCell:function(rowid,name,val,iRow,iCol){//保存编辑
  	 
        },
        summary:function(rowid,name,val,iRow,iCol){//统计处理

        },
        getGridDataList:function(rows){
        	//筛出不合格行
        	return $.map(rows,function(row){
				if(row.brandId != ""){
					return row;
				}
        	});
        }
	};
	dataGrid2_4 = new MyEiditGrid(paras,callBackList);

	//数量管理格式化
	function formatterNumControlFlag(cellvalue, options, rowObject){
		return '<input type="checkbox" id="check_'+options.gid+'_'+options.rowId+'" gid="'+options.gid+'" rowid="'+options.rowId+'" onchange="changeNumControlFlag(this.id)"  checked="checked">';
	}
}

/*****************************/
/*****************************表格2-4 结束*******************************/


/*****************************表格3_1 开始*******************************/
/*****************************/

//初始化表格
var dataGrid3_1 = null;
function initDataGrid3_1(){
	//配置
	var paras = {
	    gridId:'dataGrid3_1', 
	    addRow:{billAmount:'',ticketId:'',ticketName:'',ticketNum:'',categoryId:'',brandId:'',remark:''},
	    colNames:['整单金额满','赠卷ID','赠卷名','赠卷张数','卷分类','卷分类','是否第三方卷','备注'], 
	    colModel:
    	[
    	  {name:'billAmount',index:'billAmount', width:100,align:'center',editable:true},	
          {name:'ticketId',index:'ticketId', align:'center',hidden:true},
          {name:'ticketName',index:'ticketName', width:200,align:'center',edittype:'custom_bt_input',custom_element_bt_click:"selectRetailTicketReferenceOpen",editable:true}, 
 		  {name:'ticketNum',index:'ticketNum', width:200,align:'center',editable:true},
 		  {name:'ticketType',index:'ticketType', width:200,align:'center'},
 		  {name:'ticketTypeName',index:'ticketTypeName', width:200,align:'center',hidden:true},
 		  {name:'thirdpartyFlag',index:'thirdpartyFlag', width:200,align:'center',formatter:formatterThirdpartyFlag},
 		  {name:'remark',index:'remark', width:200,align:'center', sorttype:'string',editable:true}
        ]
	};
	//回调函数
	var callBackList = {
		afterEditCell:function(rowid,name,val,iRow,iCol){//开始编辑
	 	
        },
        afterSaveCell:function(rowid,name,val,iRow,iCol){//保存编辑
  	 
        },
        summary:function(rowid,name,val,iRow,iCol){//统计处理

        },
        getGridDataList:function(rows){
        	//筛出不合格行
        	return $.map(rows,function(row){
				if(row.ticketId != ""){
					delete row["thirdpartyFlag"];
					delete row["ticketType"];	
					delete row["ticketTypeName"];
					return row;
				}
        	});
        }
	};
	dataGrid3_1 = new MyEiditGrid(paras,callBackList);
}

function formatterThirdpartyFlag(cellvalue, options, rowObject){
	if(cellvalue == "1"){
		return '<span class="glyphicon glyphicon-ok"></span>';
	}else{
		return '';
	}
}
/*****************************/
/*****************************表格3-1 结束*******************************/


/*****************************表格3_3 开始*******************************/
/*****************************/

//初始化表格
var dataGrid3_3 = null;
function initDataGrid3_3(){
	//配置
	var paras = {
	    gridId:'dataGrid3_3', 
	    addRow:{categoryCode:'',categoryId:'',categoryName:'',billAmount:0,ticketId:'',ticketName:'',ticketNum:0,ticketType:'',thirdpartyFlag:'',remark:''},
	    colNames:['分类编码','分类ID','商品分类名称','消费金额满','赠卷ID','赠卷名','赠卷张数','卷分类','卷分类','是否第三方卷','备注'], 
	    colModel:
    	[
          {name:'categoryCode',index:'categoryCode', align:'center'},
          {name:'categoryId',index:'categoryId', align:'center',hidden:true},
          {name:'categoryName',index:'categoryName', width:200,align:'center',edittype:'custom_bt_input',custom_element_bt_click:"selectGoodsClassReferenceOpen",editable:true}, 
    	  {name:'billAmount',index:'billAmount', width:100,align:'center',editable:true},	
          {name:'ticketId',index:'ticketId', align:'center',hidden:true},
          {name:'ticketName',index:'ticketName', width:200,align:'center',edittype:'custom_bt_input',custom_element_bt_click:"selectRetailTicketReferenceOpen",editable:true},   
 		  {name:'ticketNum',index:'ticketNum', width:200,align:'center',editable:true},
 		  {name:'ticketType',index:'ticketType', width:200,align:'center'},
 		  {name:'ticketTypeName',index:'ticketTypeName', width:200,align:'center',hidden:true},
 		  {name:'thirdpartyFlag',index:'thirdpartyFlag', width:200,align:'center',formatter:formatterThirdpartyFlag},
 		  {name:'remark',index:'remark', width:200,align:'center', sorttype:'string',editable:true}
        ]
	};
	//回调函数
	var callBackList = {
		afterEditCell:function(rowid,name,val,iRow,iCol){//开始编辑
	 	
        },
        afterSaveCell:function(rowid,name,val,iRow,iCol){//保存编辑
  	 
        },
        summary:function(rowid,name,val,iRow,iCol){//统计处理

        },
        getGridDataList:function(rows){
        	//筛出不合格行
        	return $.map(rows,function(row){
				if(row.ticketId != "" && row.categoryId != ""){
					delete row["thirdpartyFlag"];
					delete row["ticketType"];
					delete row["ticketTypeName"];
					return row;
				}
        	});
        }
	};
	dataGrid3_3 = new MyEiditGrid(paras,callBackList);
}

/*****************************/
/*****************************表格3-3 结束*******************************/



/*****************************表格3_4 开始*******************************/
/*****************************/

//初始化表格
var dataGrid3_4 = null;
function initDataGrid3_4(){
	//配置
	var paras = {
	    gridId:'dataGrid3_4', 
	    addRow:{brandCode:'',brandId:'',brandName:'',billAmount:0,ticketId:'',ticketName:'',ticketNum:0,ticketType:'',thirdpartyFlag:'',remark:''},
	    colNames:['品牌编码','品牌ID','品牌名称','消费金额满','赠卷ID','赠卷名','赠卷张数','卷分类','卷分类','是否第三方卷','备注'], 
	    colModel:
    	[
          {name:'brandCode',index:'brandCode', align:'center'},
          {name:'brandId',index:'brandId', align:'center',hidden:true},
          {name:'brandName',index:'brandName', width:200,align:'center',edittype:'custom_bt_input',custom_element_bt_click:"selectGoodsBrandReferenceOpen",editable:true},  
    	  {name:'billAmount',index:'billAmount', width:100,align:'center',editable:true},	
          {name:'ticketId',index:'ticketId', align:'center',hidden:true},
          {name:'ticketName',index:'ticketName', width:200,align:'center',edittype:'custom_bt_input',custom_element_bt_click:"selectRetailTicketReferenceOpen",editable:true},  
 		  {name:'ticketNum',index:'ticketNum', width:200,align:'center',editable:true},
 		  {name:'ticketType',index:'ticketType', width:200,align:'center'},
 		  {name:'ticketTypeName',index:'ticketTypeName', width:200,align:'center',hidden:true},
 		  {name:'thirdpartyFlag',index:'thirdpartyFlag', width:200,align:'center',formatter:formatterThirdpartyFlag},
 		  {name:'remark',index:'remark', width:200,align:'center', sorttype:'string',editable:true}
        ]
	};
	//回调函数
	var callBackList = {
		afterEditCell:function(rowid,name,val,iRow,iCol){//开始编辑
	 	
        },
        afterSaveCell:function(rowid,name,val,iRow,iCol){//保存编辑
  	 
        },
        summary:function(rowid,name,val,iRow,iCol){//统计处理

        },
        getGridDataList:function(rows){
        	//筛出不合格行
        	return $.map(rows,function(row){
				if(row.ticketId != "" && row.brandId != ""){
					delete row["thirdpartyFlag"];
					delete row["ticketType"];
					delete row["ticketTypeName"];
					return row;
				}
        	});
        }
	};
	dataGrid3_4 = new MyEiditGrid(paras,callBackList);
}

/*****************************/
/*****************************表格3-4 结束*******************************/


/*****************************表格4_1 开始*******************************/
/*****************************/
function changeAddPriceFlag(obj){
	var isSelect = $("#"+obj).is(':checked');
	var gridId = $("#"+obj).attr('gid');
	var rowId = $("#"+obj).attr('rowid');
	$("#"+gridId).jqGrid('setCell', rowId ,"addAmount" ,0);
}

//初始化表格
var dataGrid4_1 = null;
function initDataGrid4_1(){
	//配置
	var paras = {
	    gridId:'dataGrid4_1', 
	    addRow:{billsAmount:0,goodsId:'',goodsCode:'',goodsName:'',addAmount:0,giveNum:0,goodsCategoryName:'',addPriceFlag:'',goodsPrice:0,remark:''},
	    colNames:['整单金额满','赠品ID','赠品编码','赠品名称','是否加价','加价金额','赠送数量','赠品分类名称','赠品成本','备注'], 
	    colModel:
    	[
          {name:'billsAmount',index:'billsAmount', width:100,align:'center',editable:true},
          {name:'goodsId',index:'goodsId', align:'center',hidden:true},
          {name:'goodsCode',index:'goodsCode', align:'center'},
          {name:'goodsName',index:'goodsName', width:200,align:'center',edittype:'custom_bt_input',custom_element_bt_click:"selectReferenceOpen",editable:true}, 
    	  {name:'addPriceFlag',index:'addPriceFlag', width:100,align:'center',editable:false,edittype:'checkbox',formatter:formatterAddPriceFlag},	
          {name:'addAmount',index:'addAmount', align:'center',hidden:false,editable:true},
          {name:'giveNum',index:'ticketName', width:200,align:'center',editable:true},   
 		  {name:'goodsCategoryName',index:'goodsCategoryName', width:200,align:'center'},
 		  {name:'goodsPrice',index:'goodsPrice', width:200,align:'center'},
 		  {name:'remark',index:'remark', width:200,align:'center', sorttype:'string',editable:true}
        ]
	};
	//回调函数
	var callBackList = {
		afterEditCell:function(rowid,name,val,iRow,iCol){//开始编辑
			//根据是否勾选加价控制来控制加价金额是否可以编辑
			if(name == "addAmount" && !$("#check_dataGrid4_1"+'_'+rowid).is(':checked')){
				dataGrid4_1.$grid.find("#" + iRow + "_addAmount").attr('disabled','disabled');
			}else{
				dataGrid4_1.$grid.find("#" + iRow + "_addAmount").removeAttr('disabled');
			}
        },
        afterSaveCell:function(rowid,name,val,iRow,iCol){//保存编辑
  	 
        },
        summary:function(rowid,name,val,iRow,iCol){//统计处理

        },
        getGridDataList:function(rows){
        	//筛出不合格行
        	return $.map(rows,function(row){
				if(row.goodsId != ""){
					row.addPriceFlag = $("#check_"+row.gridId+'_'+row.rowId).is(':checked');
					row.addPriceFlag = (row.addPriceFlag==true?1:0);
					return row;
				}
        	});
        }
	};
	dataGrid4_1 = new MyEiditGrid(paras,callBackList);
	
	//加价管理格式化
	function formatterAddPriceFlag(cellvalue, options, rowObject){
		return '<input type="checkbox" id="check_'+options.gid+'_'+options.rowId+'" gid="'+options.gid+'" rowid="'+options.rowId+'" onchange="changeAddPriceFlag(this.id)"  checked="checked">';
	}
}

/*****************************/
/*****************************表格4-1 结束*******************************/


/*****************************表格4_3 开始*******************************/
/*****************************/

//初始化表格
var dataGrid4_3 = null;
function initDataGrid4_3(){
	//配置
	var paras = {
	    gridId:'dataGrid4_3', 
	    addRow:{billsAmount:0,goodsId:'',goodsCode:'',goodsName:'',addAmount:0,giveNum:0,goodsCategoryName:'',addPriceFlag:'',goodsPrice:0,remark:''},
	    colNames:['商品分类id','商品分类名称','整单金额满','赠品ID','赠品编码','赠品名称','是否加价','加价金额','赠送数量','赠品分类名称','赠品成本','备注'], 
	    colModel:
    	[
    	  {name:'categoryId',index:'categoryId', width:200,align:'center',hidden:true},
    	  {name:'categoryName',index:'categoryName', width:200,align:'center',edittype:'custom_bt_input',custom_element_bt_click:"selectGoodsClassReferenceOpen",editable:true},     
          {name:'billsAmount',index:'billsAmount', width:100,align:'center',editable:true},
          {name:'goodsId',index:'goodsId', align:'center',hidden:true},
          {name:'goodsCode',index:'goodsCode', align:'center'},
          {name:'goodsName',index:'goodsName', width:200,align:'center',edittype:'custom_bt_input',custom_element_bt_click:"selectReferenceOpen",editable:true},   
    	  {name:'addPriceFlag',index:'addPriceFlag', width:100,align:'center',editable:true,edittype:'checkbox',formatter:formatterAddPriceFlag},	
          {name:'addAmount',index:'addAmount', align:'center',hidden:false,editable:true},
          {name:'giveNum',index:'ticketName', width:200,align:'center',editable:true},   
 		  {name:'goodsCategoryName',index:'goodsCategoryName', width:200,align:'center'},
 		  {name:'goodsPrice',index:'goodsPrice', width:200,align:'center'},
 		  {name:'remark',index:'remark', width:200,align:'center', sorttype:'string',editable:true}
        ]
	};
	//回调函数
	var callBackList = {
		afterEditCell:function(rowid,name,val,iRow,iCol){//开始编辑
			//根据是否勾选加价控制来控制加价金额是否可以编辑
			if(name == "addAmount" && !$("#check_dataGrid4_3"+'_'+rowid).is(':checked')){
				dataGrid4_3.$grid.find("#" + iRow + "_addAmount").attr('disabled','disabled');
			}else{
				dataGrid4_3.$grid.find("#" + iRow + "_addAmount").removeAttr('disabled');
			}
        },
        afterSaveCell:function(rowid,name,val,iRow,iCol){//保存编辑
  	 
        },
        summary:function(rowid,name,val,iRow,iCol){//统计处理

        },
        getGridDataList:function(rows){
        	//筛出不合格行
        	return $.map(rows,function(row){
				if(row.goodsId != "" && row.categoryId != ""){
					row.addPriceFlag = $("#check_"+row.gridId+'_'+row.rowId).is(':checked');
					row.addPriceFlag = (row.addPriceFlag==true?1:0);
					return row;
				}
        	});
        }
	};
	dataGrid4_3 = new MyEiditGrid(paras,callBackList);
	
	//加价管理格式化
	function formatterAddPriceFlag(cellvalue, options, rowObject){
		return '<input type="checkbox" id="check_'+options.gid+'_'+options.rowId+'" gid="'+options.gid+'" rowid="'+options.rowId+'" onchange="changeAddPriceFlag(this.id)"  checked="checked">';
	}
}

/*****************************/
/*****************************表格4-3 结束*******************************/


/*****************************表格4_4 开始*******************************/
/*****************************/

//初始化表格
var dataGrid4_4 = null;
function initDataGrid4_4(){
	//配置
	var paras = {
	    gridId:'dataGrid4_4', 
	    addRow:{billsAmount:0,goodsId:'',goodsCode:'',goodsName:'',addAmount:0,giveNum:0,goodsCategoryName:'',addPriceFlag:'',goodsPrice:0,remark:''},
	    colNames:['商品品牌ID','商品品牌名称','整单金额满','赠品ID','赠品编码','赠品名称','是否加价','加价金额','赠送数量','赠品分类名称','赠品成本','备注'], 
	    colModel:
    	[
    	  {name:'brandId',index:'brandId', width:200,align:'center',hidden:true},
    	  {name:'brandName',index:'brandName', width:200,align:'center',edittype:'custom_bt_input',custom_element_bt_click:"selectGoodsBrandReferenceOpen",editable:true},    
          {name:'billsAmount',index:'billsAmount', width:100,align:'center',editable:true},
          {name:'goodsId',index:'goodsId', align:'center',hidden:true},
          {name:'goodsCode',index:'goodsCode', align:'center'},
          {name:'goodsName',index:'goodsName', width:200,align:'center',edittype:'custom_bt_input',custom_element_bt_click:"selectReferenceOpen",editable:true}, 
    	  {name:'addPriceFlag',index:'addPriceFlag', width:100,align:'center',editable:true,edittype:'checkbox',formatter:formatterAddPriceFlag},	
          {name:'addAmount',index:'addAmount', align:'center',hidden:false,editable:true},
          {name:'giveNum',index:'ticketName', width:200,align:'center',editable:true},   
 		  {name:'goodsCategoryName',index:'goodsCategoryName', width:200,align:'center'},
 		  {name:'goodsPrice',index:'goodsPrice', width:200,align:'center'},
 		  {name:'remark',index:'remark', width:200,align:'center', sorttype:'string',editable:true}
        ]
	};
	//回调函数
	var callBackList = {
		afterEditCell:function(rowid,name,val,iRow,iCol){//开始编辑
			//根据是否勾选加价控制来控制加价金额是否可以编辑
			if(name == "addAmount" && !$("#check_dataGrid4_4"+'_'+rowid).is(':checked')){
				dataGrid4_4.$grid.find("#" + iRow + "_addAmount").attr('disabled','disabled');
			}else{
				dataGrid4_4.$grid.find("#" + iRow + "_addAmount").removeAttr('disabled');
			}
        },
        afterSaveCell:function(rowid,name,val,iRow,iCol){//保存编辑
  	 
        },
        summary:function(rowid,name,val,iRow,iCol){//统计处理

        },
        getGridDataList:function(rows){
        	//筛出不合格行
        	return $.map(rows,function(row){
				if(row.goodsId != "" && row.brandId != ""){
					row.addPriceFlag = $("#check_"+row.gridId+'_'+row.rowId).is(':checked');
					row.addPriceFlag = (row.addPriceFlag==true?1:0);
					return row;
				}
        	});
        }
	};
	dataGrid4_4 = new MyEiditGrid(paras,callBackList);

	//加价管理格式化
	function formatterAddPriceFlag(cellvalue, options, rowObject){
		return '<input type="checkbox" id="check_'+options.gid+'_'+options.rowId+'" gid="'+options.gid+'" rowid="'+options.rowId+'" onchange="changeAddPriceFlag(this.id)"  checked="checked">';
	}
}

/*****************************/
/*****************************表格4-4 结束*******************************/


/*****************************表格5_1 开始*******************************/
/*****************************/

function changeNumControlFlag2(obj){
	var isSelect = $("#"+obj).is(':checked');
	var gridId = $("#"+obj).attr('gid');
	var rowId = $("#"+obj).attr('rowid');
	if($("#"+obj).is(':checked')){
		$("#"+gridId).jqGrid('setCell', rowId ,"mixNum" ,0);
	}else{
		$("#"+gridId).jqGrid('setCell', rowId ,"mixNum" ,-1);
	}
}


//初始化表格
var dataGrid5_1 = null;

function initDataGrid5_1(){
	
	//配置
	var paras = {
	    gridId:'dataGrid5_1', 
	    addRow:{mixGoodsCode:'',mixGoodsName:'',numLimitFlag:'',mixNum:'0',brandId:'',brandName:'',oldAmount:'',mixDiscountPrice:'',mixDiscountAmount:0,categoryId:'',categoryName:'组合商品类',remark:''},
	    colNames:['组合商品编码','组合商品名称','是否数量限制','组合数量','品牌Id','品牌','原合计金额','组合优惠价','组合优惠','所属商品id','所属商品分类','备注','明细列表'], 
	    colModel:
    	[
    	  {name:'mixGoodsCode',index:'mixGoodsCode', width:200,align:'center',editable:true},
    	  {name:'mixGoodsName',index:'mixGoodsName', width:200,align:'center',editable:true},
          {name:'numLimitFlag',index:'numControlFlag', width:100,align:'center',edittype:'checkbox',formatter:formatterNumControlFlag},
          {name:'mixNum',index:'mixNum', width:100, align:'center',editable:true},
          {name:'brandId',index:'brandId', align:'center',hidden:true},
          {name:'brandName',index:'brandName', width:200,align:'center',edittype:'custom_bt_input',custom_element_bt_click:"selectGoodsBrandReferenceOpen",editable:true}, 
    	  {name:'oldAmount',index:'oldAmount', width:100,align:'center'},	
          {name:'mixDiscountPrice',index:'mixDiscountPrice', width:100, align:'center'},
          {name:'mixDiscountAmount',index:'mixDiscountAmount', width:100,align:'center'},   
          {name:'categoryId',index:'categoryId', width:200,align:'center',hidden:true},
 		  {name:'categoryName',index:'categoryId', width:100,align:'center'},
 		  {name:'remark',index:'remark', width:200,align:'center', sorttype:'string',editable:true},
 		  {name:'detailList',index:'detailList', width:200,align:'center',hidden:true}
        ]
	};
	//回调函数
	var callBackList = {
		onCellSelect:function(rowid,iCol,cellcontent,e){
			dataGrid5_1.$grid.jqGrid('setCell', rowid ,"categoryName" ,"组合商品类");
			
			//明细
			if(dataGrid5_1.currSelectRowId != rowid){
				
				//保存先前明细
				if(dataGrid5_1.currSelectRowId != null){
					dataGrid5_1.$grid.jqGrid('setCell', dataGrid5_1.currSelectRowId ,"detailList" ,JSON.stringify(dataGrid5_2.getGridDataList()));
					
				}
				dataGrid5_1.currSelectRowId = rowid;
				
				//显示选择行明细
				var detailList = dataGrid5_1.$grid.jqGrid('getCell', rowid ,"detailList");

				if(detailList != "" && detailList != "[]"){
					dataGrid5_2.$grid.jqGrid('clearGridData');
					detailList = JSON.parse(detailList);
					for ( var int = 0; int < detailList.length; int++) {
						detailList[int].index = int + 1;
						detailList[int].op = "OP";
						dataGrid5_2.$grid.jqGrid('addRowData',int,detailList[int]);
					}
					dataGrid5_2.addKongRow();
				}else{
					dataGrid5_2.clearDataGrid();
				}
			}
			
		},
		afterEditCell:function(rowid,name,val,iRow,iCol){//开始编辑
			//根据是否勾选数量控制来控制组合数量是否可以编辑
			if(name == "mixNum" && !$("#check_dataGrid5_1"+'_'+rowid).is(':checked')){
				dataGrid5_1.$grid.find("#" + iRow + "_mixNum").attr('disabled','disabled');
			}else{
				dataGrid5_1.$grid.find("#" + iRow + "_mixNum").removeAttr('disabled');
			}
        },
        afterSaveCell:function(rowid,name,val,iRow,iCol){//保存编辑

        },
        summary:function(rowid,name,val,iRow,iCol){//统计处理

        },
        getGridDataList:function(rows){
        	//筛出不合格行
        	return $.map(rows,function(row){
				if(row.mixGoodsCode != "" && row.mixGoodsName !="" && row.detailList != "" && row.detailList != "[]"){
					row.numLimitFlag = $("#check_"+row.gridId+'_'+row.rowId).is(':checked');
					row.numLimitFlag = (row.numLimitFlag==true?1:0);
					row.retailMixDetailList = JSON.parse(row.detailList);
					delete row["detailList"];
					return row;
				}
        	});
        }
	};
	dataGrid5_1 = new MyEiditGrid(paras,callBackList);
	dataGrid5_1.currSelectRowId = null;

	//数量管理格式化
	function formatterNumControlFlag(cellvalue, options, rowObject){
		return '<input type="checkbox" id="check_'+options.gid+'_'+options.rowId+'" gid="'+options.gid+'" rowid="'+options.rowId+'" onchange="changeNumControlFlag2(this.id)"  checked="checked">';
	}
}

/*****************************/
/*****************************表格5-1 结束*******************************/


/*****************************表格5_2 开始*******************************/
/*****************************/
function changeMagorGoodsFlag(oid){
	if(dataGrid5_1.currSelectRowId != null){
		dataGrid5_1.$grid.jqGrid('setCell', dataGrid5_1.currSelectRowId ,"detailList" ,JSON.stringify(dataGrid5_2.getGridDataList()));
	}
}

//初始化表格
var dataGrid5_2 = null;
function initDataGrid5_2(){
	//配置
	var paras = {
	    gridId:'dataGrid5_2', 
	    addRow:{goodsCode:'',goodsId:'',goodsName:'',magorGoodsFlag:'',goodsCategoryName:'',price:'',mixDiscountPrice:'',mixAmount:'',goodsNumber:0,remark:''},
	    colNames:['商品编码','商品ID','商品名称','是否主商品','商品分类','零售价','组合优惠价','优惠金额','数量','备注'], 
	    colModel:
    	[
    	  {name:'goodsCode',index:'goodsCode', align:'center'},
          {name:'goodsId',index:'goodsId', align:'center',hidden:true}, 
          {name:'goodsName',index:'goodsName', width:200,align:'center',edittype:'custom_bt_input',custom_element_bt_click:"selectReferenceOpen3",editable:true}, 
    	  {name:'majorGoodsFlag',index:'majorGoodsFlag', width:100,align:'center',editable:false,formatter:formattermagorGoodsFlag},	
          {name:'goodsCategoryName',index:'goodsCategoryName', align:'center',hidden:false,editable:false},
          {name:'goodsPrice',index:'goodsPrice', width:200,align:'center',editable:false},   
 		  {name:'mixDiscountPrice',index:'mixDiscountPrice', width:200,align:'center',editable:true},
 		  {name:'mixAmount',index:'mixAmount', width:200,align:'center'},
 		  {name:'goodsNumber',index:'goodsNumber', width:200,align:'center',editable:true},
 		  {name:'remark',index:'remark', width:200,align:'center', sorttype:'string',editable:true}
        ]
	};
	//回调函数
	var callBackList = {
		afterEditCell:function(rowid,name,val,iRow,iCol){//开始编辑
	 	
        },
        afterSaveCell:function(rowid,name,val,iRow,iCol){//保存编辑
			if(dataGrid5_1.currSelectRowId != null){
				dataGrid5_1.$grid.jqGrid('setCell', dataGrid5_1.currSelectRowId ,"detailList" ,JSON.stringify(dataGrid5_2.getGridDataList()));
			}		
        },
        summary:function(rowid,name,val,iRow,iCol){//统计处理

        },
        getGridDataList:function(rows){
        	//筛出不合格行
        	return $.map(rows,function(row){
				if(row.goodsId != ""){
					row.majorGoodsFlag = $("#check_"+row.gridId+'_'+row.rowId).is(':checked');
					row.majorGoodsFlag = (row.majorGoodsFlag==true?1:0);
					return row;
				}
        	});
        }
	};
	dataGrid5_2 = new MyEiditGrid(paras,callBackList);

	//数量管理格式化
	function formattermagorGoodsFlag(cellvalue, options, rowObject){
		return '<input type="checkbox" id="check_'+options.gid+'_'+options.rowId+'" gid="'+options.gid+'" rowid="'+options.rowId+'" onchange="changeNumControlFlag(this.id)"  checked="checked">';
	}
}

/*****************************/
/*****************************表格5-2 结束*******************************/

/*****************************引用 开始*******************************/
/*****************************/
var callBack ;

function selectReferenceOpenForGrid1_2(cellInfo){
	var gridId = cellInfo.gridId;
	var grid = $("#"+gridId);
	var rowid = cellInfo.rowId;
	var inptid = cellInfo.cellInputId;
	
	$('#goodsnameReferenceModal').modal('show');
	goodsnameReferenceFrame.reLoadGrid();//可以参数查询
	callBack = function(){
		if(arguments[0].length == 0){$('#goodsnameReferenceModal').modal('hide');return ;}
		var goods = arguments[0][0];
		try {
			/***这里要考虑 门店个数 暂时先不管***/
			var sections = $("#salesAreaSelects").select2().val();
       		var sectionNames=$.map($("#salesAreaSelects").find('option:selected'),function(obj,i){
    			return obj.innerHTML
    		});
			if(sections == null || sections.length == 0){$('#goodsnameReferenceModal').modal('hide');$.MsgBox('提示','请先设置促销范围');return;}	
			
			//设置编辑器值
			$("#"+gridId+" #"+inptid).val(goods.name);
			grid.jqGrid('setCell', rowid ,"goodsId" ,goods.id);
			grid.jqGrid('setCell', rowid ,"goodsCode" ,goods.code);
			grid.jqGrid('setCell', rowid ,"ifManageImei" ,goods.ifManageImei);
			grid.jqGrid('setCell', rowid ,"imControlFlag" ,goods.ifManageImei);
			grid.jqGrid('setCell', rowid ,"cxSectionId" ,sections[0]);
			grid.jqGrid('setCell', rowid ,"cxSectionName" ,sectionNames[0]);
			grid.jqGrid('setCell', rowid ,"goodsCategoryName" ,goods.goodsCategoryName);
			
			if(goods.ifManageImei == "true"){
				$("#checkIm_"+gridId+"_"+rowid).prop({'disabled':false});
				//查询库存
				queryStorageNum(gridId,rowid,"stockNumber",true,{sectionId:sections[0],goodsId:goods.id});
			}else{
				$("#checkIm_"+gridId+"_"+rowid).prop({'checked':false,'disabled':true});
				//查询库存
				queryStorageNum(gridId,rowid,"stockNumber",false,{sectionId:sections[0],goodsId:goods.id});
			}
			
		} catch (e) {
			console.log(e);
		}
		$('#goodsnameReferenceModal').modal('hide');
	}; 
}

function selectReferenceOpen(cellInfo){
	var gridId = cellInfo.gridId;
	var grid = $("#"+gridId);
	var rowid = cellInfo.rowId;
	var inptid = cellInfo.cellInputId;
	
	$('#goodsnameReferenceModal').modal('show');
	goodsnameReferenceFrame.reLoadGrid();//可以参数查询
	callBack = function(){
		if(arguments[0].length == 0){$('#goodsnameReferenceModal').modal('hide');return ;}
		var goods = arguments[0][0];
		try {
			//设置编辑器值
			var sections = $("#salesAreaSelects").select2().val();
       		var sectionNames=$.map($("#salesAreaSelects").find('option:selected'),function(obj,i){
    			return obj.innerHTML
    		});
			if(sections == null || sections.length == 0){$('#goodsnameReferenceModal').modal('hide');$.MsgBox('提示','请先设置促销范围');return;}	
			
			$("#"+gridId+" #"+inptid).val(goods.name);
			grid.jqGrid('setCell', rowid ,"goodsId" ,goods.id);
			grid.jqGrid('setCell', rowid ,"goodsCode" ,goods.code);
			grid.jqGrid('setCell', rowid ,"ifManageImei" ,goods.ifManageImei);
			grid.jqGrid('setCell', rowid ,"imControlFlag" ,goods.ifManageImei);
			grid.jqGrid('setCell', rowid ,"cxSectionName" ,sectionNames[0]);
			grid.jqGrid('setCell', rowid ,"goodsCategoryName" ,goods.goodsCategoryName);
		} catch (e) {
			console.log(e);
		}
		$('#goodsnameReferenceModal').modal('hide');
		setTimeout('MyEiditGrid.getFocus('+'"#'+inptid+'")',200);
	}; 
}

function selectReferenceOpen3(cellInfo){
	var gridId = cellInfo.gridId;
	var grid = $("#"+gridId);
	var rowid = cellInfo.rowId;
	var inptid = cellInfo.cellInputId;
	
	$('#goodsnameReferenceModal').modal('show');
	goodsnameReferenceFrame.reLoadGrid();//可以参数查询
	callBack = function(){
		if(arguments[0].length == 0){$('#goodsnameReferenceModal').modal('hide');return ;}
		var goods = arguments[0][0];
		try {
			//设置编辑器值
			$("#"+gridId+" #"+inptid).val(goods.name);
			grid.jqGrid('setCell', rowid ,"goodsId" ,goods.id);
			grid.jqGrid('setCell', rowid ,"goodsCode" ,goods.code);
			grid.jqGrid('setCell', rowid ,"ifManageImei" ,goods.ifManageImei);
			grid.jqGrid('setCell', rowid ,"imControlFlag" ,goods.ifManageImei);
			grid.jqGrid('setCell', rowid ,"goodsCategoryName" ,goods.goodsCategoryName);
			
		} catch (e) {
			console.log(e);
		}
		$('#goodsnameReferenceModal').modal('hide');
		setTimeout('MyEiditGrid.getFocus('+'"#'+inptid+'")',200);
	}; 
}

function selectGoodsClassReferenceOpen(cellInfo){
	var gridId = cellInfo.gridId;
	var grid = $("#"+gridId);
	var rowid = cellInfo.rowId;
	var inptid = cellInfo.cellInputId;
	
	$('#goodsClassReferenceModal').modal('show');
	//goodsClassReferenceFrame.reLoad();//可以参数查询
	callBack = function(){
		if(arguments[0].length == 0){$('#goodsClassReferenceModal').modal('hide');return ;}
		var entity = arguments[0][0];
		try {
			//设置编辑器值
			$("#"+inptid).val(entity.name);
			grid.jqGrid('setCell', rowid ,"categoryId" ,entity.id);
			grid.jqGrid('setCell', rowid ,"categoryCode" ,entity.code);
		} catch (e) {
			console.log(e);
		}
		$('#goodsClassReferenceModal').modal('hide');
		setTimeout('MyEiditGrid.getFocus('+'"#'+inptid+'")',200);
	}; 
}

function selectGoodsBrandReferenceOpen(cellInfo){
	var gridId = cellInfo.gridId;
	var grid = $("#"+gridId);
	var rowid = cellInfo.rowId;
	var inptid = cellInfo.cellInputId;
	
	$('#goodsBrandReferenceModal').modal('show');
	//goodsBrandReferenceFrame();//可以参数查询
	callBack = function(){
		if(arguments[0].length == 0){$('#goodsBrandReferenceModal').modal('hide');return ;}
		var entity = arguments[0][0];
		try {
			//设置编辑器值
			$("#"+inptid).val(entity.name);
			grid.jqGrid('setCell', rowid ,"brandId" ,entity.id);
			grid.jqGrid('setCell', rowid ,"brandCode" ,entity.code);
		} catch (e) {
			console.log(e);
		}
		$('#goodsBrandReferenceModal').modal('hide');
		setTimeout('MyEiditGrid.getFocus('+'"#'+inptid+'")',200);
	}; 
}

function selectRetailTicketReferenceOpen(cellInfo){
	var gridId = cellInfo.gridId;
	var grid = $("#"+gridId);
	var rowid = cellInfo.rowId;
	var inptid = cellInfo.cellInputId;
	
	$('#retailTicketReferenceModal').modal('show');
	//retailTicketReferenceFrame();//可以参数查询
	callBack = function(){
		if(arguments[0].length == 0){$('#retailTicketReferenceModal').modal('hide');return ;}
		var entity = arguments[0][0];
		try {
			//设置编辑器值
			$("#"+inptid).val(entity.ticketName);
			grid.jqGrid('setCell', rowid ,"ticketId" ,entity.id);
			grid.jqGrid('setCell', rowid ,"ticketType" ,entity.ticketType);
			grid.jqGrid('setCell', rowid ,"ticketTypeName" ,entity.ticketTypeName);
			grid.jqGrid('setCell', rowid ,"thirdpartyFlag" ,entity.thirdpartyFlag);
		} catch (e) {
			console.log(e);
		}
		$('#retailTicketReferenceModal').modal('hide');
		setTimeout('MyEiditGrid.getFocus('+'"#'+inptid+'")',200);
	}; 
}
/*****************************/
/*****************************引用 结束*******************************/

/**********************串号引入表格 开始******************************************/
//打开串号引入对话框
function openInputImeiModal(gridId,rowid){
	if($("#slideThree").is(':checked'))return;
	try {MyEiditGrid.currEditDataGrid.unAllEdit();} catch (e) {}
	$('#inputStorageImeiModal').modal('show');
	$("#dataGridRowId2").val(gridId+"|"+rowid);
	
	var currRow = $("#"+gridId).jqGrid('getRowData', rowid);
	$("#goodsnameTitle2").html(currRow.goodsName);
	$("#storagenameTitle2").html(currRow.storageName);
	
	
	setDataGrid4();
	setDataGrid5(); 

	var width = $(window).width()*0.8;
		
	$("#inputStorageImeiModal_grid4").width((width-300)/2);
	$("#inputStorageImeiModal_grid5").width((width-300)/2);
	
	$("#dataGrid5").setGridWidth((width-300)/2);  
	$("#dataGrid5").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
	$("#dataGrid4").setGridWidth((width-300)/2);  
	$("#dataGrid4").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
	
	$("#dataGrid5").setGridHeight(300);
	$("#dataGrid4").setGridHeight(300);
	$("#inputStorageImeiModal_info_text").height(300);
	
	longInfo = 0;
	$("#inputStorageImeiModal_info_text").val("");
}

//点击保存引入串号事件
function saveInputImei(){
	if($('#havedInputNum').html() == "0"){
		return;
	}
	try {MyEiditGrid.currEditDataGrid.unAllEdit();} catch (e) {}
	var gridId = $("#dataGridRowId2").val().split("|")[0] ;
	var rowid = parseInt($("#dataGridRowId2").val().split("|")[1]) ;
	var objs = getObjListFromGrid5();
	
	$("#"+gridId).jqGrid('setCell', rowid ,"cxNum" ,objs.length);
	$("#"+gridId).jqGrid('setCell', rowid ,"imeiList" ,JSON.stringify(objs));

	$('#inputStorageImeiModal').modal('hide');
//	Summary();

}

//获取串号引入对象数组
function getObjListFromGrid5(){
    return dataGrid5.getGridDataList();
}

var longInfo = 0;
//移入所有按钮点击事件
function inAllBtClick(){
	var ids=$.map( $("#dataGrid4").jqGrid('getDataIDs'), function(obj){return parseInt(obj);});
	for ( var int = 0; int < ids.length; int++) {
		var row =  $("#dataGrid4").jqGrid('getRowData', ids[int] );
		if(! _.isEqual(row,{})){
			longInfo = longInfo + 1;
			$("#dataGrid5").jqGrid('addRowData',MyEiditGrid.getMaxRowid($("#dataGrid5"))+1,row);
			$("#dataGrid4").jqGrid("delRowData", ids[int] ); 
			$("#inputStorageImeiModal_info_text").val($("#inputStorageImeiModal_info_text").val()+(longInfo)+"、串号"+row.imei+"录入\r\n");
		}
	}
	$("#havedInputNum").html($("#dataGrid5").jqGrid('getDataIDs').length);
}

//移出所有按钮点击事件
function outAllBtClick(){
	var ids=$.map( $("#dataGrid5").jqGrid('getDataIDs'), function(obj){return parseInt(obj);});
	for ( var int = 0; int < ids.length; int++) {
		var row =  $("#dataGrid5").jqGrid('getRowData',  ids[int] );
		if(! _.isEqual(row,{})){
			longInfo = longInfo + 1;
			$("#dataGrid4").jqGrid('addRowData',MyEiditGrid.getMaxRowid($("#dataGrid4"))+1,row);
			$("#dataGrid5").jqGrid("delRowData", ids[int] ); 
			$("#inputStorageImeiModal_info_text").val($("#inputStorageImeiModal_info_text").val()+(longInfo)+"、串号"+row.imei+"移除\r\n");
		}
	}	
	$("#havedInputNum").html($("#dataGrid5").jqGrid('getDataIDs').length);
}

//移入按钮点击事件
function inBtClick(){
	var ids=$.map( $("#dataGrid4").jqGrid('getGridParam','selarrrow'), function(obj){return parseInt(obj);});
	for ( var int = 0; int < ids.length; int++) {
		var row =  $("#dataGrid4").jqGrid('getRowData', ids[int] );
		if(! _.isEqual(row,{})){
			$("#dataGrid5").jqGrid('addRowData',MyEiditGrid.getMaxRowid($("#dataGrid5"))+1,row);
			$("#dataGrid4").jqGrid("delRowData", ids[int] ); 
		}
	}
	$("#havedInputNum").html($("#dataGrid5").jqGrid('getDataIDs').length);
}

//移出按钮点击事件
function outBtClick(){
	var ids=$.map( $("#dataGrid5").jqGrid('getGridParam','selarrrow'), function(obj){return parseInt(obj);});
	for ( var int = 0; int < ids.length; int++) {
		var row =  $("#dataGrid5").jqGrid('getRowData',  ids[int] );
		if(! _.isEqual(row,{})){
			$("#dataGrid4").jqGrid('addRowData',MyEiditGrid.getMaxRowid($("#dataGrid4"))+1,row);
			$("#dataGrid5").jqGrid("delRowData", ids[int] ); 
		}
	}	
	$("#havedInputNum").html($("#dataGrid5").jqGrid('getDataIDs').length);
}

//初始化表格
var dataGrid4 = null;
function initDataGrid4(){
	 var paras = {
		    gridId:'dataGrid4', 
		    addRow:{imei:'',auxiliaryImei:'',remark:''},
		    multiselect : true,
		    noShowOp:false,
		    colNames:['串号',  '成本', '辅助串号'], 
		    colModel:
		    	[ 
                 {name : 'imei',index : 'imei',align:'left',sortable: true,hidden: false,editable:false}, 
                 {name : 'costPrice',index : 'costPrice',align:'left',editable:false,sortable: false},
                 {name : 'auxiliaryImei',index : 'auxiliaryImei',align:'left',sortable: false}
	           ]
	 };
	 var callBackList = {
		afterEditCell:function(rowid,name,val,iRow,iCol){},
        afterSaveCell:function(rowid,name,val,iRow,iCol){},
        summary:function(rowid,name,val,iRow,iCol){},
        getGridDataList:function(rows){
        	//筛出不合格行
        	return $.map(rows,function(row){
				if(row.imei != ""){
		        	return row;
				}
        	});
        }
	 };
	 dataGrid4 = new MyEiditGrid(paras,callBackList);
}

//去库存表查询串号
function setDataGrid4(){
	//清空
	$("#dataGrid4").jqGrid('clearGridData');
	var gridId = $("#dataGridRowId2").val().split("|")[0] ;
	var rowid = parseInt($("#dataGridRowId2").val().split("|")[1]) ;
	var currRow = $("#"+gridId).jqGrid('getRowData', rowid);
	
	//查询串号库存
	$.ajax({
			url: this.basePath + '/IstockIm/listByModel',
			type : "post",
			dataType : 'json',
			data:{sectionId:currRow.cxSectionId,goodsId:currRow.goodsId},
			success:function(data){
				if(data.result == 1){
					$.each(data.data.dataList,function(i,item){
						if(!isHaveInput(item.imei)){
							$("#dataGrid4").jqGrid('addRowData',i,item);
						}
					});
					$("#"+gridId).jqGrid('setCell', rowid ,"stockNumber" ,data.data.dataList.length);
				}else{
					$.MsgBox('出错提示',data.desc);
				}
			}
	}); 
	function isHaveInput(imei){
		if("" != currRow.imeiList){
			  var imList = JSON.parse(currRow.imeiList);
			  for ( var int = 0; int < imList.length; int++) {
				  if(imList[int].imei == imei){
					  return true;
				  }
			  }
		}
		return false;
	}
	
}
//初始化表格
var dataGrid5 = null;
function initDataGrid5(){
	
	 var paras = {
		    gridId:'dataGrid5', 
		    addRow:{imei:'',auxiliaryImei:'',remark:''},
		    multiselect : true,
		    noShowOp:false,
		    colNames:['串号',  '辅助串号', '备注' ,'成本'],
		    colModel:
		    	[ 
                 {name : 'imei',index : 'imei',align:'left',sortable: true,hidden: false,editable:false}, 
                 {name : 'auxiliaryImei',index : 'auxiliaryImei',align:'left',sortable: false},
                 {name : 'remark',index : 'remark',align:'left',editable:true,sortable: false},
                 {name : 'costPrice',index : 'costPrice',align:'left',editable:false,sortable: false,hidden: true}
	           ]
	 };
	 var callBackList = {
		afterEditCell:function(rowid,name,val,iRow,iCol){},
        afterSaveCell:function(rowid,name,val,iRow,iCol){},
        summary:function(rowid,name,val,iRow,iCol){},
        getGridDataList:function(rows){
        	//筛出不合格行
        	return $.map(rows,function(row){
	        	delete row["costPrice"];
	        	delete row["index"];
	        	return row;
        	});
        }
	 };
	 dataGrid5 = new MyEiditGrid(paras,callBackList);
	 
}

function setDataGrid5(){
	//清空
	$("#dataGrid5").jqGrid('clearGridData');
	var gridId = $("#dataGridRowId2").val().split("|")[0] ;
	var rowid = parseInt($("#dataGridRowId2").val().split("|")[1]) ;
	var currRow = $("#"+gridId).jqGrid('getRowData', rowid);
	if("" != currRow.imeiList){
		  var imList = JSON.parse(currRow.imeiList);  
		  $("#havedInputNum").html(imList.length);
		  $.each(imList,function(i,obj){
			  $("#dataGrid5").jqGrid('addRowData',i,obj);
		  });
	}else{
		$("#havedInputNum").html(0);
	}

}

/**********************串号引入表格 结束******************************************/


/*************************分页 S******************************/

var pageIndex = 1;//页码
var pageSize =  1;//页大小
var pageCount = 1;//页码大小
var currPage = null;//当前页数据

//首页
function firstPage(){
	pageIndex = 1;
	queryPage();
}
//下一页
function nextPage(){
	if((pageIndex + 1) > pageCount){
		$.MsgBox('消息提示','已是最后一条单据');
		return;
	}
	pageIndex = pageIndex + 1;
	queryPage();
}
//上一页
function backPage(){
	if((pageIndex - 1) == 0){
		$.MsgBox('消息提示','已是第一条单据');
		return;
	}
	pageIndex = pageIndex - 1;
	queryPage();
}
//末页
function lastPage(){
	pageIndex = pageCount;
}

//分页查询
function queryPage(){
	
	//获取查询参数
	//基本查询参数
	var model = {};
	model.page = pageIndex;
	model.rows = pageSize;
	model.billsType = "42";//零售促销单
	model.sortColumns = "BILLS_DATE DESC";
	
	//查询窗口参数
	var queryParas = $(".filterParamForm").toJsonObject();
	$.extend(model,queryParas);
	model.billsDateBegin = model.billsDateBegin + " 00:00:00";
	model.billsDateEnd = model.billsDateEnd + " 23:59:59";
	
	//后台查询
	$.ajax({
		url: this.basePath + '/CbillsMain/page/lscx_query',
		type : "post",
		dataType : 'json',
		data:model,
		success:function(result){
			if(result.result == 1){
				pageCount = result.data.total;
				if(result.data.rows.length>0){
					initPageData(result.data.rows[0]);
				}else{
					$.MsgBox("操作提示","没有查到数据");
					addBtClick();
					pageIndex = 1;
				}
			}else{
				$.MsgBox("错误提示",result.desc);
			}
		}
	});  
}

//填充页面页面数据
function initPageData(bills){
	var formData = bills;

	$(".salesBox").removeAttr('checked');
	$("#salesTimeSelects").select2().val(null).trigger("change");
	$("#salesAreaSelects").select2().val(null).trigger("change");

	//格式化数据
	formData.billsDate = $.DateFormatFromTimestamp("yyyy-MM-dd",formData.billsDate);
	formData.beginDate = $.DateFormatFromTimestamp("yyyy-MM-dd",formData.beginDate);
	formData.endDate = $.DateFormatFromTimestamp("yyyy-MM-dd",formData.endDate);
	$.showBillsStatus("billsStautsImg",bills.billsStatus);
	
	//设置表单数据
	$("#form1").writeJson2Dom(formData);
	$("#form2").writeJson2Dom(formData);
	$("#form3").writeJson2Dom(formData);
	$("#form4").writeJson2Dom(formData);
	
	//促销时段
	if($("#salesAreaSelects").html()==""){
		reshSectionRange(bills.sectionRangeId.split(","));
	}else{
		$("#salesAreaSelects").select2().val(bills.sectionRangeId.split(",")).trigger("change");
	}
	
	//同时参与
	bills.discountFlag==1?$("input:checkbox[name='discountFlag']").attr('checked','true'):$("input:checkbox[name='discountFlag']").removeAttr("checked");
	bills.couponFlag==1?$("input:checkbox[name='couponFlag']").attr('checked','true'):$("input:checkbox[name='couponFlag']").removeAttr("checked");
	bills.giftFlag==1?$("input:checkbox[name='giftFlag']").attr('checked','true'):$("input:checkbox[name='giftFlag']").removeAttr("checked");
	
	//促销时段CX_DATE_TYPE 1每月具体日期2有效期间每天3星期
	if(bills.cxDateType == "1"){
		//...
	}else if(bills.cxDateType == "2"){
		$("#salesTimeSelects").select2().val(bills.cxDateValue.split(",")).trigger("change");
	}else if(bills.cxDateType == "3"){		
		var lsss = bills.cxDateValue.split(",");
		for ( var int = 0; int < lsss.length; int++) {
			$(".salesBox[value='"+lsss[int]+"']").attr('checked','true');
		}
	}
	
	//明细
	if(formData.cxType == "1" &&　formData.cxObject　==　"2"){
		//特价商品
		dataGrid1_2.$grid.jqGrid('clearGridData');
		var mingxiList = bills.retailGoodsNumList;
		for ( var int = 0; int < mingxiList.length; int++) {
			var row = mingxiList[int];
			row.index = int + 1;
			row.op = "";
			//插入空数据的1行
			dataGrid1_2.addRowData(int,row);
		}
	}else if(formData.cxType == "2" &&　formData.cxObject　==　"1"){
		//打折-全场
		$("input[name='allDiscountRate']").val(bills.retailDiscountDetailList[0].allDiscountRate);
	}else if(formData.cxType == "2" &&　formData.cxObject　==　"2"){
		//打折-商品
		dataGrid2_2.$grid.jqGrid('clearGridData');
		var mingxiList = formData.retailDiscountDetailList;
		for ( var int = 0; int < mingxiList.length; int++) {
			var row = mingxiList[int];
			row.index = int + 1;
			row.op = "";
			//插入空数据的1行
			dataGrid2_2.addRowData(int,row);
		}
	}else if(formData.cxType == "2" &&　formData.cxObject　==　"3"){
		//打折-商品分类
		dataGrid2_3.$grid.jqGrid('clearGridData');
		var mingxiList = formData.retailDiscountDetailList;
		for ( var int = 0; int < mingxiList.length; int++) {
			var row = mingxiList[int];
			row.index = int + 1;
			row.op = "";
			//插入空数据的1行
			dataGrid2_3.addRowData(int,row);
		}
	}else if(formData.cxType == "2" &&　formData.cxObject　==　"4"){
		//打折-商品品牌
		dataGrid2_4.$grid.jqGrid('clearGridData');
		var mingxiList = formData.retailDiscountDetailList;
		for ( var int = 0; int < mingxiList.length; int++) {
			var row = mingxiList[int];
			row.index = int + 1;
			row.op = "";
			//插入空数据的1行
			dataGrid2_4.addRowData(int,row);
		}
	}else if(formData.cxType == "3" &&　formData.cxObject　==　"1"){
		//返卷-全场
		dataGrid3_1.$grid.jqGrid('clearGridData');
		var mingxiList = formData.retailTicketDetailList;
		for ( var int = 0; int < mingxiList.length; int++) {
			var row = mingxiList[int];
			row.index = int + 1;
			row.op = "";
			//插入空数据的1行
			dataGrid3_1.addRowData(int,row);
		}
	}else if(formData.cxType == "3" &&　formData.cxObject　==　"3"){
		//返卷-商品类别
		dataGrid3_3.$grid.jqGrid('clearGridData');
		var mingxiList = formData.retailTicketDetailList;
		for ( var int = 0; int < mingxiList.length; int++) {
			var row = mingxiList[int];
			row.index = int + 1;
			row.op = "";
			//插入空数据的1行
			dataGrid3_3.addRowData(int,row);
		}
	}else if(formData.cxType == "3" &&　formData.cxObject　==　"4"){
		//返卷-商品品牌
		dataGrid3_4.$grid.jqGrid('clearGridData');
		var mingxiList = formData.retailTicketDetailList;
		for ( var int = 0; int < mingxiList.length; int++) {
			var row = mingxiList[int];
			row.index = int + 1;
			row.op = "";
			//插入空数据的1行
			dataGrid3_4.addRowData(int,row);
		}
	}else if(formData.cxType == "4" &&　formData.cxObject　==　"1"){
		//赠品-全场
		dataGrid4_1.$grid.jqGrid('clearGridData');
		var mingxiList = formData.retailGiftDetailList;
		for ( var int = 0; int < mingxiList.length; int++) {
			var row = mingxiList[int];
			row.index = int + 1;
			row.op = "";
			//插入空数据的1行
			dataGrid4_1.addRowData(int,row);
		}
	}else if(formData.cxType == "4" &&　formData.cxObject　==　"3"){
		//赠品-商品类别
		dataGrid4_3.$grid.jqGrid('clearGridData');
		var mingxiList = formData.retailGiftDetailList;
		for ( var int = 0; int < mingxiList.length; int++) {
			var row = mingxiList[int];
			row.index = int + 1;
			row.op = "";
			//插入空数据的1行
			dataGrid4_3.addRowData(int,row);
		}
	}else if(formData.cxType == "4" &&　formData.cxObject　==　"4"){
		//赠品-商品品牌
		dataGrid4_4.$grid.jqGrid('clearGridData');
		var mingxiList = formData.retailGiftDetailList;
		for ( var int = 0; int < mingxiList.length; int++) {
			var row = mingxiList[int];
			row.index = int + 1;
			row.op = "";
			//插入空数据的1行
			dataGrid4_4.addRowData(int,row);
		}
	}else if(formData.cxType == "5"){
		//组合
		dataGrid5_1.$grid.jqGrid('clearGridData');
		var mingxiList = formData.retailMixMainList;
		for ( var int = 0; int < mingxiList.length; int++) {
			var row = mingxiList[int];
			row.index = int + 1;
			row.op = "";
			row.detailList = JSON.stringify(row.retailMixDetailList);
			//插入空数据的1行
			dataGrid5_1.addRowData(int,row);
			
		}
		if(mingxiList.length > 0){
			dataGrid5_1.$grid.jqGrid('setSelection',0,true);
			dataGrid5_2.$grid.jqGrid('clearGridData');
			var detailList = mingxiList[0].retailMixDetailList;
			for ( var int = 0; int < detailList.length; int++) {
				detailList[int].index = int + 1;
				detailList[int].op = "";
				dataGrid5_2.addRowData(int,detailList[int]);
			}
		}
	}
	//cancleBills disCancleBills disableBills enableBills
	
	$(".cancleBills").addClass("disabled");
//	$(".disCancleBills").prop({'disabled':(formData.cancleStatus == 1?false:true)});
//	
//	$(".disableStatus").prop({'disabled':(formData.disableStatus == 1?true:false)});
//	$(".enableBills").prop({'disabled':(formData.disableStatus == 1?false:true)});

	changeUI1(formData.cxObject);
	changeUI3();
	billsStautsListerning(bills);
};
/*************************分页 E******************************/

//更新门店范围:当前用户可使用门店
function reshSectionRange(sarry){
	$.ajax({
		type: 'post',
		url: basePath+'/Temployee/findKSYBM',
		dataType: "json", 
		success: function(data) {
			 var list = data.data.dataList;
			 if(data.result != 1){$.MsgBox('错误提示',data.data.desc);return;};

			 $("#salesAreaSelects").html("");
			 for ( var int = 0; int < list.length; int++) {
				 $("#salesAreaSelects").append('<option value="'+list[int].valueCode+'">'+list[int].sectionName+'</option>');
			 }
			 $("#salesAreaSelects").select2().trigger("change");;
			 $("#salesAreaSelects").select2().val(sarry).trigger("change");;
		},
		error: function(msg) {
			console.log(msg);
		}
	});
}


