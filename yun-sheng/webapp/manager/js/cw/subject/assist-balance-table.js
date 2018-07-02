
$(function(){
	assistBalanaceTableQuery = new AssistBalanaceTableQuery(basePath);
	voucherManage = new VoucherManage(basePath);
	subjectPage = new SubjectPage(basePath);
	partnerInit();
	findFAccInit();
	departmentInit();
	employeesInit();
	
});


/*******************************会计期间****************************/
function findFAccInit(){
	$("#yearAndMonBegin").html("");
	$("#yearAndMonEnd").html("");
	var myDate = new Date();
	var dateStr = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
	dateStr += '.'+(myDate.getMonth()+1); //获取当前月份(0-11,0代表1月)
	voucherManage.findFAcc(12, function(data){
		var dataList = data.data.rows;
		for(var i = 0;i < dataList.length;i++){	
			var obj = dataList[i];
			var dateStr2 = obj.currentAccountingYear+'.'+obj.currentAccountingMonth;
			var checkHtml='<option value='+obj.currentAccountingYear+'.'+obj.currentAccountingMonth+'>'+obj.currentAccountingYear+'.'+obj.currentAccountingMonth+'</option>';
			$("#yearAndMonBegin").append(checkHtml);
			$("#yearAndMonEnd").append(checkHtml);
			if(dateStr2 == dateStr){
				$("#yearAndMonBegin option").attr('selected',true);
			}
			if(dateStr2 == dateStr){
				$("#yearAndMonEnd option").attr('selected',true);
			}
		}
		loadmodal();
	});
}

/*******************************科目*******************************/
function getSubjectHeader(clearNum){
	if(clearNum == 1){
		var year = $("#yearAndMonBegin").val().split(".")[0];
		var entity = new Object();
		if(pickC.checked) entity.departmentAccounting = 1;
		if(pickD.checked) entity.employeeAccounting = 1;
		if(pickB.checked) entity.partnerAccounting = 1;
		if($("#subjectIdStr").val() != null && $("#subjectIdStr").val().trim() != "") entity.subjectIdStr = $("#subjectIdStr").val();
		$("#subjectHeader").html("");
		subjectPage.getSubjectHeader(initGroupId,initCompanyId, year, entity, function(data){
			var dataList = data.data.rows;
			for(var i = 0;i < dataList.length;i++){	
				var obj = dataList[i];
				var checkHtml='<option value='+obj.id+'>'+obj.subjectCode+'   '+obj.subjectName+'</option>';
				$("#subjectHeader").append(checkHtml);
			}
		});
	}
}
$("#subjectHeader").change(function (){
	$("#jqGrid_subjectBal").jqGrid("setGridParam", { postData: accountSelect(1),page:1}).trigger("reloadGrid");
	
});



/*******************************部门*******************************/
function departmentInit(){
	$("#departmentHeader").html("");
	assistBalanaceTableQuery.getdepartmentForAssist(function(data){
		var dataList = data.data.rows;
		for(var i = 0;i < dataList.length;i++){	
			var obj = dataList[i];
			var checkHtml='<option value='+obj.departmentId+'>'+obj.departmentCode+'.'+obj.departmentName+'</option>';
			$("#departmentHeader").append(checkHtml);
		}
	});
}
$("#departmentHeader").change(function (){
	$("#jqGrid_subjectBal").jqGrid("setGridParam", { postData: accountSelect(0),page:1}).trigger("reloadGrid");
	
});


/*******************************个人*******************************/
function employeesInit(){
$("#employeeHeader").html("");
assistBalanaceTableQuery.getEmployeesForAssist(function(data){
	var dataList = data.data.rows;
	for(var i = 0;i < dataList.length;i++){	
		var obj = dataList[i];
		var checkHtml='<option value='+obj.employeeId+'>'+obj.employeeCode+'.'+obj.employeeName+'</option>';
		$("#employeeHeader").append(checkHtml);
	}
});
}
$("#employeeHeader").change(function (){
	$("#jqGrid_subjectBal").jqGrid("setGridParam", { postData: accountSelect(0),page:1}).trigger("reloadGrid");

});

/*******************************往来单位****************************/
function partnerInit(){
	$("#partnerheader").html("");
	assistBalanaceTableQuery.getPartnerForAssist(function(data){
		var dataList = data.data.rows;
		for(var i = 0;i < dataList.length;i++){	
			var obj = dataList[i];
			var checkHtml='<option value='+obj.partnerId+'>'+obj.partnerCode+'.'+obj.partnerName+'</option>';
			$("#partnerheader").append(checkHtml);
		}
	});
}
$("#partnerheader").change(function (){
	$("#jqGrid_subjectBal").jqGrid("setGridParam", { postData: accountSelect(0),page:1}).trigger("reloadGrid");

});

/*******************************删除键*******************************/
function delWholeInput(obj) {
    evt = event || window.event;
    if (evt.keyCode.toString() == "8" || evt.keyCode.toString() == "46" ){
        $("#"+obj.id).val("");       
    }
}

/******************************分页查询*****************************/
function queryPage(num){
	$("#jqGrid_subjectBal").jqGrid("setGridParam", { postData: accountSelect(num),page:1}).trigger("reloadGrid");
}
/*****************************获取查询条件**************************/
function accountSelect(num){
	var postData = $("#jqGrid_subjectBal").jqGrid("getGridParam", "postData");
    $.each(postData, function (k, v) {
        delete postData[k];
    });
	// num null,
	// num  0,代表个人下拉框,往来单位下拉框,部门下拉框
	// num  1,代表科目下拉框
	// num  2,代表 确定按钮
	if(num == 2){
		var clearNum = 1;
	}
	var n = 2;
	var paras = new Object();
	$("#yearAndMon").html($("#yearAndMonBegin").val()+"-"+$("#yearAndMonEnd").val());
	paras.minYear = $("#yearAndMonBegin").val().split(".")[0];
	paras.maxYear = $("#yearAndMonEnd").val().split(".")[0];
	paras.minMonth = $("#yearAndMonBegin").val().split(".")[1];
	paras.maxMonth = $("#yearAndMonEnd").val().split(".")[1];
	if($("#subjectClssifyName").val() == null || $("#subjectClssifyName").val().trim() == ""){
		$("#subjectClssifyStr").val(null);
		paras.subjectClssifyStr = $("#subjectClssifyStr").val();
	}else{
		paras.subjectClssifyStr = $("#subjectClssifyStr").val();
	}
	//科目id
	if($("#subjectBoolean").is(":checked") && $("#subjectCode").val() == null || $("#subjectBoolean").is(":checked") && $("#subjectCode").val().trim() == ""){
		$("#subjectIdStr").val(null);
	}
	//科目表头
	if(num != 1){
		getSubjectHeader(clearNum);
	}
	if($("#subjectBoolean").is(":checked")){
		paras.subjectIdStr = $("#subjectIdStr").val();
	}else{
		paras.subjectIdStr = $("#subjectHeader").val();
	}
	paras.ofR = $("#ofR").is(":checked") ? true:false;
	paras.subjectBoolean = $("#subjectBoolean").is(":checked") ? true : false;
	paras.employeeBoolean = $("#employeeBoolean").is(":checked") ? true : false;
	paras.departmentBoolean = $("#departmentBoolean").is(":checked") ? true : false;
	paras.partnerBoolean = $("#partnerBoolean").is(":checked") ? true : false;
	//部门id
	if(pickC.checked && paras.departmentBoolean){
		paras.departmentIdStr = $("#departmentId").val();
	}
	if(pickC.checked && $(".app1B").is(':checked')){
		paras.departmentIdStr = $("#departmentHeader").val();
	}
	//个人id
	if(pickD.checked && paras.employeeBoolean){
		paras.employeeIdStr = $("#employeeId").val();
	}
	if(pickD.checked && $(".app2B").is(':checked')){
		paras.employeeIdStr = $("#employeeHeader").val(); 
	}
	//往来单位id
	if(pickB.checked && paras.partnerBoolean){
		paras.partnerIdStr = $("#partnerId").val();
	}
	if(pickB.checked && $(".app4B").is(':checked')){
		paras.partnerIdStr = $("#partnerheader").val();
	}
	
	
	if(paras.minYear != paras.maxYear){
		alert('不能跨年!');
	}else{
		return paras;
	}
}

/************************打开科目类别参照对话框*********************************/
var callBack ;
function selectSubjectClssify(name){
	$('#assistGetSubjectClssifyModal').modal('show');
	callBack = function(){
		var subject = arguments[0];
		$("#"+name).val($.map(subject,function(obj){return obj.subjectClssifyName;}).join(";"));
		$("#subjectClssifyStr").val($.map(subject,function(obj){return obj.id;}).join(","));
		$('#assistGetSubjectClssifyModal').modal('hide');
	}; 
}

/**
 * @author XiangRui
 * @note 打开科目参照对话框
 * @return
 */
function selectReferenceOpen(name){
	var obj = new Object();
	if($("#departmentBoolean").is(":checked")) obj.departmentAccounting = 1;
	if($("#employeeIdBoolean").is(":checked")) obj.employeeAccounting = 1;
	if($("#partnerIdBoolean").is(":checked")) obj.partnerAccounting = 1;
	obj.currentAccountingYear = $("#yearAndMonBegin").val().split(".")[0];
	subjectReferenceFrame.loadDataCompanySubjectTree(obj);
	$('#subjectReferenceModal').modal('show');
	callBack = function(){
		var subject = arguments[0];
		$("#"+name).val($.map(subject,function(obj){return obj.subjectName;}).join(";"));
		$("#subjectIdStr").val($.map(subject,function(obj){return obj.id;}).join(","));
		$('#subjectReferenceModal').modal('hide');
	}; 
}

/********************************web前端js**************************************/
function loadmodal(){

    twoGroupHeaders();//页面加载默认二级表头
    //二级表头
    function twoGroupHeaders(){
    	$.jgrid.gridUnload("jqGrid_subjectBal");
		$.jgrid.defaults.width = 1280;
  		$.jgrid.defaults.responsive = true;
  		$.jgrid.defaults.styleUI = 'Bootstrap';	
    	  		
    	jQuery("#jqGrid_subjectBal").jqGrid({
    		url: basePath + '/cw/assistQuery/assistList/'+initCompanyId+'/'+initGroupId,
            datatype : "json",
            height: $(window).height()*0.615,
    		  colNames:['序号', '科目编码', '科目名称','部门','个人','往来单位','借方','贷方','借方','贷方','借方','贷方'],
              colModel:[
               {name:'index',						index:'index',										align:'center', sorttype:"int",	  sortable: false},
               {name:'subjectCode',					index:'subjectCode',					width:150, 	align:"left",	sorttype:"String",sortable: false},
               {name:'subjectName',					index:'subjectName', 					width:150, 	align:"left",	sorttype:"string",sortable: false},
               {name:'departmentName',				index:'departmentName', 				width:150, 	align:"left",	sorttype:"string",sortable: false},
               {name:'employeeName',				index:'employeeName', 					width:150, 	align:"left",	sorttype:"string",sortable: false},
               {name:'contactsUnitName',			index:'contactsUnitName', 				width:150, 	align:"left",	sorttype:"string",sortable: false},
               {name:'periodBalanceBorrow',			index:'periodBalanceBorrow', 			width:150,	align:"right",	sorttype:"float", sortable: false},
               {name:'periodBalanceLoan',			index:'periodBalanceLoan', 				width:150,	align:"right",	sorttype:"float", sortable: false},    
               {name:'currentPeriodBorrowAmuontSum',index:'currentPeriodBorrowAmuontSum', 	width:150,	align:"right",	sorttype:"float", sortable: false}, 
               {name:'currentPeriodLoanAmuontSum',	index:'currentPeriodLoanAmuontSum', 	width:150,	align:"right",	sorttype:"float", sortable: false}, 
               {name:'periodEndAmuontBorrow',		index:'periodEndAmuontBorrow', 			width:150,	align:"right",	sorttype:"float", sortable: false, 	cellattr: function () { return "title='联查辅助明细帐' style='color:#0066CC;font-weight:bold;cursor: pointer;'"; }}, 
               {name:'periodEndAmuontLoan',			index:'periodEndAmuontLoan', 			width:150,	align:"right",	sorttype:"float", sortable: false, 	cellattr: function () { return "title='联查辅助明细帐' style='color:#0066CC;font-weight:bold;cursor: pointer;'"; }}
             ],
             shrinkToFit:true,
             pager: "#gridpager",
             jsonReader: {
                 root: "rows",
                 page: "page",
                 total: "total",
                 records: "records",
                 repeatitems: false
             },
             mtype: "POST",
             viewrecords: true,
             autowidth : true,
             multiselect : false,
             multiboxonly : true,
             forceFit:true,
             width:$(window).width()*0.9,
             postData:accountSelect(0),
             footerrow:true,  //设置表格显示表脚
    		 userDataOnFooter:true,//设置userData 显示在footer里
             onCellSelect:function(rowid,iCol,cellcontent){
             		var colNames=$("#jqGrid_subjectBal").jqGrid('getGridParam','colNames');
            	 if(iCol==(colNames.length-1) || iCol==(colNames.length-2)){
            		 var rowData = $('#jqGrid_subjectBal').jqGrid('getRowData',rowid);//获取该行数据  对象
            		 window.open('subjectBalDetail.html?subjectCode='+rowData.subjectCode);
            	 }
             },
             loadComplete:function(data){
    					footerData();
    					// 过滤条件中    判断 是否隐藏头部往来单位选项
    			    	if(($('.pickEmp').prop('checked')) || ($('.pickEmp1').prop('checked'))){
    			    		jQuery("#jqGrid_subjectBal").setGridParam().trigger("reloadGrid").showCol("contactsUnitName");
    			    		jQuery("#jqGrid_subjectBal").setGridParam().trigger("reloadGrid").showCol("subEmpJc");
    			    	}else{
    			    		jQuery("#jqGrid_subjectBal").setGridParam().trigger("reloadGrid").hideCol("contactsUnitName");
    			    		jQuery("#jqGrid_subjectBal").setGridParam().trigger("reloadGrid").hideCol("subEmpJc");	
    			    	}
    			    	// 过滤条件中  判断 是否隐藏头部个人选项
    			    	if(!$('.pickPer').prop('checked')){
    				    		jQuery("#jqGrid_subjectBal").setGridParam().trigger("reloadGrid").hideCol("employeeName");
    			    	}else{
    				    		jQuery("#jqGrid_subjectBal").setGridParam().trigger("reloadGrid").showCol("employeeName");
    			    	}
    			    	// 过滤条件中 判断 是否隐藏头部部门选项
    			    	if(!$('.pickDep').prop('checked')){
    				    		jQuery("#jqGrid_subjectBal").setGridParam().hideCol("departmentName").trigger("reloadGrid");
    			    	}else{
    				    		jQuery("#jqGrid_subjectBal").setGridParam().showCol("departmentName").trigger("reloadGrid");
    			    	}
    			    	
    			    	// 判断是否隐藏头部科目选项
						if($('.subSelect').prop('checked')){
				    		jQuery("#jqGrid_subjectBal").setGridParam().hideCol("subjectCode").trigger("reloadGrid");
				    		jQuery("#jqGrid_subjectBal").setGridParam().hideCol("subjectName").trigger("reloadGrid");
				    		$('.sub').removeClass('sub-none');
				    	}else{
					    		jQuery("#jqGrid_subjectBal").setGridParam().showCol("subjectCode").trigger("reloadGrid");
					    		jQuery("#jqGrid_subjectBal").setGridParam().showCol("subjectName").trigger("reloadGrid");
					    		$('.sub').addClass('sub-none');
				    	}
    						
    			    	// 判断 是否隐藏头部部门选项
    			    	if($('.depSelect').prop('checked')){
    			    		
    				    		jQuery("#jqGrid_subjectBal").setGridParam().hideCol("departmentName").trigger("reloadGrid");
    				    		$('.dep').removeClass('sub-none');
    			    	}else{
    			    		
    				    		//jQuery("#jqGrid_subjectBal").setGridParam().showCol("subDep").trigger("reloadGrid");
    				    		$('.dep').addClass('sub-none');
    			    	}
    			    	// 判断 是否隐藏头部个人选项
    			    	if($('.perSelect').prop('checked')){
    				    		jQuery("#jqGrid_subjectBal").setGridParam().hideCol("employeeName").trigger("reloadGrid");
    				    		$('.per').removeClass('sub-none');
    			    	}else{
    				    		//jQuery("#jqGrid_subjectBal").setGridParam().showCol("subPer").trigger("reloadGrid");
    				    		$('.per').addClass('sub-none');
    			    	}
    			    	// 判断 是否隐藏头部往来单位选项
    			    	if($('.empSelect').prop('checked')){
    				    		jQuery("#jqGrid_subjectBal").setGridParam().hideCol("contactsUnitName").trigger("reloadGrid");
    				    		$('.emp').removeClass('sub-none');
    			    	}else{
    				    		//jQuery("#jqGrid_subjectBal").setGridParam().showCol("subEmp").trigger("reloadGrid");
    				    		$('.emp').addClass('sub-none');
    			    	}
    			}
    	});
    	jQuery("#jqGrid_subjectBal").jqGrid('setGroupHeaders', {
			    useColSpanStyle: true, 
			    groupHeaders:[
			    	{startColumnName: 'periodBalanceBorrow', numberOfColumns: 2, titleText: '<em>初期余额</em>'},
			    	{startColumnName: 'currentPeriodBorrowAmuontSum', numberOfColumns: 2, titleText: '<em>本期发生</em>'},
			    	{startColumnName: 'periodEndAmuontBorrow', numberOfColumns: 2, titleText: '<em>末期余额</em>'}
			    ]  
			  });
    }
   
//	//改变表格样式
//	document.querySelector('.cla-one').onclick = function(){
//		accountSelect();
//	}
//	document.querySelector('.cla-two').onclick = function(){
//		accountSelect();
//	}
	
	$('.bloc1').html($('.wnum').val());
	
	$('select[class*="subShow"]').change( function() {
		$('#subject-top-na').html($('.subShow').val()+'明细账');
	});
	
	$('select[class*="danwei2"]').change( function() {
		$('#subject-bottom-other').html('单位名称:'+$('.danwei2').val().replace(/\d+/g,''));
	});
	
	
	/**
	 * 修改表格底部
	 */
	function footerData(){			
		var sum_jie1 = $('#jqGrid_subjectBal').getCol('periodBalanceBorrow',false,'sum');
		var sum_dai1 = $('#jqGrid_subjectBal').getCol('periodBalanceLoan',false,'sum');
		var sum_jie2 = $('#jqGrid_subjectBal').getCol('currentPeriodBorrowAmuontSum',false,'sum');
		var sum_dai2 = $('#jqGrid_subjectBal').getCol('currentPeriodLoanAmuontSum',false,'sum');
		var sum_jie3 = $('#jqGrid_subjectBal').getCol('periodEndAmuontBorrow',false,'sum');
		var sum_dai3 = $('#jqGrid_subjectBal').getCol('periodEndAmuontLoan',false,'sum');
		$('#jqGrid_subjectBal').jqGrid('footerData','set',{
			"subjectCode":"合计",
            "periodBalanceBorrow": sum_jie1,
            "periodBalanceLoan": sum_dai1,
            "currentPeriodBorrowAmuontSum": sum_jie2,
            "currentPeriodLoanAmuontSum": sum_dai2,
            "periodEndAmuontBorrow": sum_jie3,
            "periodEndAmuontLoan": sum_dai3,
	         }
		);
	}
}
