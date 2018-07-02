
$(function(){
	//注册事件
	$(window).resize(wResize);
	wResize();
	
	accountsQueryDAO = new AccountsQuery(basePath);
	
	initTree();
	initDataGrid();
	initEvent();

	onAssistChangeInitGroupPara();
	$("#queryDialog").modal('show');
});
/**
 * 事件注册
 * @return
 */
var callBack = null;
var selectSubjects = [];
function initEvent(){
	var selectS = [];
	//科目选择
	$("button[name='subjectSelectButton']").click(function(){
		var paras = $("#queryDialog").toJsonObject();
		$.each(paras, function(key, val) {  
	      if(/^if/.test(key)) paras[key] = $.parseCheckValue(val);
		}); 
		if(paras["ifGroupDepartment"]!=undefined)paras.departmentAccounting=1;
		if(paras["ifGroupEmployee"]!=undefined)paras.employeeAccounting=1;
		if(paras["ifGroupPartner"]!=undefined)paras.partnerAccounting=1;
		paras.currentAccountingYear = paras.maxAccountAnnual.split(".")[0];;
		paras.groupAndShortFieldStr = regListenShortFieldChange();
		//重新查询科目
		subjectSelectFrame.loadDataCompanySubjectTree(paras);
		paras.companyId = gl_CurrCompanyId;
		subjectSelectFrame.searchDataCompanySubjectGrid(paras);
		$('#subjectReferenceModal').modal('show');
		callBack = function(){	
			selectS =arguments[0];
			selectS = $.grep(selectS,function(sub){
				for ( var int = 0; int < selectSubjects.length; int++) {
					if(selectSubjects[int].id == sub.id){
						return false;
					}
				}
				return true;
			});
			selectSubjects = $.merge(selectSubjects,selectS);
			$("input[name='subjectIdList']").val($.map(selectSubjects,function(obj){return obj.subjectName;}).join(";"));
			$('#subjectReferenceModal').modal('hide');
			callBack = null;
		}; 
	});
	//科目选择
	$("button[name='subjectIdList']").click(function(){
		if($(this).val()==""){
			selectSubjects = [];
		}
	});
	//辅助项参数check事件
	$(".assitsItem").on("ifChanged",function(e) { 
		if($(this).is(':checked')){
			assistCheckBoxSelectListener(this);
		}else{
			assistCheckBoxUnSelectListener(this);
		}
		onAssistChangeInitGroupPara();
	});
	//复选框：科目级次选择
	$(".enabledIfEndSubject").on("ifChanged",function(e) { 
		if($(this).is(':checked')){
			$("input[name='ifEndSubject']").iCheck('uncheck');
			$("select[name='minSubjectLevel']").removeAttr("disabled");
			$("select[name='maxSubjectLevel']").removeAttr("disabled");
		}else{
			$("input[name='ifEndSubject']").iCheck('check');
			$("select[name='minSubjectLevel']").attr("disabled","disabled");
			$("select[name='maxSubjectLevel']").attr("disabled","disabled");
		}
	});
	//复选框：科目末级选择
	$("input[name='ifEndSubject']").on("ifChanged",function(e) { 
		if($(this).is(':checked')){
			$(".enabledIfEndSubject").iCheck('uncheck');
			$("select[name='minSubjectLevel']").attr("disabled","disabled");
			$("select[name='maxSubjectLevel']").attr("disabled","disabled");
		}else{
			$(".enabledIfEndSubject").iCheck('check');
			$("select[name='minSubjectLevel']").removeAttr("disabled");
			$("select[name='maxSubjectLevel']").removeAttr("disabled");
		}
	});
	
	$("#subjectFilterSelect").change(function(){
		var paras = getQueryModel();
		paras.subjectId = $(this).val();
		$("#dataGrid").jqGrid("setGridParam", { postData: paras,page:1}).trigger("reloadGrid");
	});
	regListenSubjectFilterAndGroupChange();
}
/**
 * 初始化表格
 * @return
 */
function initDataGrid()
{
	//借贷方向
	function formatterCreditDirection(cellvalue, options, rowObject){
		if(rowObject.blanceAmuont>0){
			return cellvalue == 1?'借':'贷';
		}else if(rowObject.blanceAmuont==0){
			return '平';
		}else{
			rowObject.blanceAmuont = rowObject.blanceAmuont * (-1);
			return cellvalue == 1?'借':'贷';
		}
	}
	//凭证号
	function formatterInNo(cellvalue, options, rowObject){
		if(cellvalue == 0 || cellvalue == null || cellvalue == ""){
			return "";
		}else{
			return rowObject.docWordId+""+ ( "0000000000000000" + cellvalue ).substr( -6 );
		}
	}	
	//金额
	function formatterAmuont(cellvalue, options, rowObject){
		if(cellvalue == 0){
			return "";
		}else{
			return $.formatFloat(cellvalue,2);
		}
	}
	var grid = $("#dataGrid").jqGrid({
		url: basePath + '/cw/accountsQuery//pageAssistSubjectDetail/'+gl_CurrCompanyId,
        datatype : "json",
        colNames : [ '序号', '科目编码', '科目名称','部门代码','部门名称','职员代码', '职员名称','往来单位ID' , '日期', '号', '摘要', '借方', '贷方','借贷方向', '余额',
                     '职员ID', '集团ID', '公司ID','年', '月', '科目ID', '科目等级', '是否末级', '字', '记账标志', '部门ID'],
        colModel : [ 
                     {name : 'index',index : 'index',align:'center',sorttype:"int",width:40,sortable: false},
                     {name : 'subjectCode',index : 'subjectCode',align:'left',width:60,sortable: false}, 
                     {name : 'subjectName',index : 'subjectName',align:'left',width:80,sortable: false}, 
                     {name : 'departmentCode',index : 'departmentCode',align:'left',width:60,sortable: false}, 
                     {name : 'departmentName',index : 'departmentName',align:'left',width:80,sortable: false}, 
                     {name : 'employeeCode',index : 'employeeCode',align:'left',width:60,sortable: false}, 
                     {name : 'employeeName',index : 'employeeName',align:'left',width:80,sortable: false}, 
                     {name : 'partnerId',index : 'partnerId',align:'left',width:60,sortable: false}, 
                     {name : 'voucherDate',index : 'voucherDate',align:'left',width:80,sortable: false}, 
                     {name : 'inNo',index : 'inNo',align:'left',width:60,sortable: false,formatter:formatterInNo}, 
                     {name : 'summary',index : 'summary',align:'left',width:100,sortable: false},  
                     {name : 'borrowCurrency',index : 'borrowCurrency',width:60,align:'right',sortable: false,formatter:formatterAmuont}, 
                     {name : 'loanCurrency',index : 'loanCurrency',width:60,align:'right',sortable: false,formatter:formatterAmuont}, 
                     {name : 'creditDirection',index : 'creditDirection',width:40,align:'left',formatter:formatterCreditDirection,sortable: false}, 
                     {name : 'balanceAmuont',index : 'balanceAmuont',width:60,align:'right',sortable: false,formatter:'number'},
                     //下面是隐藏字段
                     {name : 'employeeId',index : 'employeeId',hidden: true},
                     {name : 'groupId',index : 'groupId',hidden: true},
                     {name : 'companyId',index : 'companyId',hidden: true},
                     {name : 'year',index : 'year',hidden: true},
                     {name : 'month',index : 'month',hidden: true},
                     {name : 'subjectId',index : 'subjectId',hidden: true},
                     {name : 'subjectLevel',index : 'subjectLevel',hidden: true},
                     {name : 'ifEndSubject',index : 'ifEndSubject',hidden: true},
                     {name : 'docWordId',index : 'docWordId',hidden: true},
                     {name : 'isPost',index : 'isPost',hidden: true},
                     {name : 'departmentId',index : 'departmentId',hidden: true}
                   ],
        styleUI: 'Bootstrap',//设置jqgrid的全局样式为bootstrap样式  
        pager: "#gridpager",
        jsonReader: {
            root: "rows",
            page: "page",
            total: "total",
            records: "records",
            repeatitems: false
        },
        mtype: "POST",
        viewrecords : true,
        autowidth : true,
        multiselect : false,
        multiboxonly : true,
        forceFit:true,
        height : $("#mainDIV").height()-246,
        caption : "",
        postData:getQueryModel(),
        loadComplete:function(data){
        	try {
                initDataGridBG();
                var query = data.query;
                initFitlerPararUI(query);
                initSubjectSelect(data);
                initDepartmentSelect(data);
                initEmployeeSelect(data);
                initPartnerSelect(data);
			} catch (e) {

			}
        }
      });
}
/**
 * 获取查询参数
 */
var isFirst = true;
function getQueryModel(){
	if(isFirst){
		isFirst = false;
		return {};
	}else{
		var postData = $("#dataGrid").jqGrid("getGridParam", "postData");
        $.each(postData, function (k, v) {
            delete postData[k];
        });
		//创建模拟参数数据
		var paras = $("#queryDialog").toJsonObject();
		paras.currentAccountingYear = paras.maxAccountAnnual.split(".")[0];
		paras.minYear = paras.minAccountAnnual.split(".")[0];
		paras.maxYear = paras.maxAccountAnnual.split(".")[0];
		paras.minMonth = paras.minAccountAnnual.split(".")[1];
		paras.maxMonth = paras.maxAccountAnnual.split(".")[1];
		paras.groupAndShortFieldStr = regListenShortFieldChange();
		paras.subjectIdList = $.map(selectSubjects,function(obj){return obj.id;}).join(",");
		//转换check值为数字或者NULL
		$.each(paras, function(key, val) {  
	      if(/^if/.test(key)) paras[key] = $.parseCheckValue(val);
		});
		//判断排序字段是否存在
		$('#groupPararTable').find("input").each(function(){
			var name = $(this).attr("name");
			if(/^ifGroup/.test(name)) paras[name] = 1;
		});
		//验证参数
		if(validationParas(paras)){
			return paras;
		}else{
		    return;	
		}
	}
}
function validationParas(paras){
	//验证跨年查询
	if(paras.minYear != paras.maxYear){
		$("input[name='ifEndSubject']").iCheck('check');
		$("select[name='minSubjectLevel']").attr("disabled","disabled");
		$("select[name='maxSubjectLevel']").attr("disabled","disabled");
		paras.ifEndSubject = 1;
	}
	return true;
}
/**
 * 辅助科目明细账查询
 * @return
 */
function searchSubjectDetail(){
	$('#queryDialog').modal('hide');
	$("#dataGrid").jqGrid("setGridParam", { postData: getQueryModel(),page:1}).trigger("reloadGrid");
}
/**
 * 窗口大小改变事件
 * @return
 */
function wResize(){
	//表格高度自适应
	$("#dataGrid").setGridHeight($("#mainDIV").height()-249);
	
}
/**
 * 初始化树
 * @return
 */
function initTree(){
	//初始化查询方案树1
	$.fn.zTree.init($("#querySchemeTree"), 
       {
         data: {simpleData: {enable: true}},
	     callback: {onClick: function(event, treeId, treeNode){
		    //树点击
		 }}
       }, 
	  [{ id:1, pId:0, name:"公共方案",open:true},
	  { id:2, pId:1, name:"方案1"},
	  { id:3, pId:1, name:"方案2"},
	  { id:3, pId:1, name:"方案3"}]);
}
/**
 * 格式化数据表格背景色
 * @return
 */
function initDataGridBG(){
	var ids = $("#dataGrid").getDataIDs();
	for(var i=0;i<ids.length;i++){
	    var rowData = $("#dataGrid").getRowData(ids[i]);
	    if(rowData.summary=='本月合计'){//如果天数等于0，则背景色置灰显示
	        $('#'+ids[i]).find("td").addClass("heJiRow");
	    }else if(rowData.summary=='本年累计'){
	    	$('#'+ids[i]).find("td").addClass("leiJiRow");
	    }
	}
}
/**
 * 辅助项选择事件处理
 * @return
 */
function assistCheckBoxSelectListener(obj){
	if($(obj).attr("name")=="departmentCheckBox"){
		$("input[name='departmentIdList']").removeAttr("disabled");
		$("input[name='departmentIdList']").next().find("button").removeAttr("disabled");
		$("input[name='ifDepartmentFilter']").removeAttr("disabled");
	}else if($(obj).attr("name")=="employeeCheckBox"){
		$("input[name='employeeIdList']").removeAttr("disabled");
		$("input[name='employeeIdList']").next().find("button").removeAttr("disabled");
		$("input[name='ifEmployeeFilter']").removeAttr("disabled");
	}else if($(obj).attr("name")=="partnerCheckBox"){
		$("input[name='partnerIdList']").removeAttr("disabled");
		$("input[name='partnerIdList']").next().find("button").removeAttr("disabled");
		$("input[name='ifPartnerFilter']").removeAttr("disabled");
	}	
}
/**
 * 辅助项取消选择事件处理
 * @return
 */
function assistCheckBoxUnSelectListener(obj){
	if($(obj).attr("name")=="departmentCheckBox"){
		$("input[name='departmentIdList']").attr("disabled","disabled");
		$("input[name='departmentIdList']").next().find("button").attr("disabled","disabled");
		$("input[name='ifDepartmentFilter']").attr("disabled","disabled");
	}else if($(obj).attr("name")=="employeeCheckBox"){
		$("input[name='employeeIdList']").attr("disabled","disabled");
		$("input[name='employeeIdList']").next().find("button").attr("disabled","disabled");
		$("input[name='ifEmployeeFilter']").attr("disabled","disabled");
	}else if($(obj).attr("name")=="partnerCheckBox"){
		$("input[name='partnerIdList']").attr("disabled","disabled");
		$("input[name='partnerIdList']").next().find("button").attr("disabled","disabled");
		$("input[name='ifPartnerFilter']").attr("disabled","disabled");
	}
}
/**
 * 辅助项改变联动改变分组表格处理
 * @return
 */
function onAssistChangeInitGroupPara(){
	$("#groupPararTable").html("");
	$("#groupPararTable").append(createTr("科目","ifGroupSubject",true,true))
	$(".assitsItem").each(function(i,item){
		if($(this).attr("name")=="departmentCheckBox" && $(this).is(':checked')){
			$("#groupPararTable").append(createTr("部门","ifGroupDepartment",true,true));
		}else if($(this).attr("name")=="employeeCheckBox" && $(this).is(':checked')){
			$("#groupPararTable").append(createTr("职员","ifGroupEmployee",true,true));
		}else if($(this).attr("name")=="partnerCheckBox" && $(this).is(':checked')){
			$("#groupPararTable").append(createTr("往来单位","ifGroupPartner",true,true));
		}
	});
	$("#groupPararTable").append(createTr("期间","ifGroupDate",true,false))
	$('#groupPararTable').find("input").each(function(){
		$(this).iCheck({
			   checkboxClass: 'icheckbox_square-blue',  // 注意square和blue的对应关系
			   radioClass: 'iradio_square-blue',
			   increaseArea: '20%' // optional
			 });
	});
	//更改分组列表
	regListenSubjectFilterAndGroupChange();
	//更改排序字段
	regListenShortFieldChange();
}
//创建行
function createTr(text,name,checked,enabled){
	 var index = $('#groupPararTable').find("tr").length + 1;
	 var ischeck = checked == undefined ? false:checked;
	 var isenabled = ((enabled == undefined || enabled)?' ':' disabled="disabled"');
	 var tr = '<tr>'+
		          '<td>'+index+'</td>'+
		          '<td>'+text+'</td>'+
		          '<td><input type="checkbox" class="checkbox"  name="'+name+'" '+(ischeck?'checked="checked"':'')+
		          ' '+isenabled+'  /></td>'+
		          '<td>'+
		          '<button type="button" class="btn btn-default btn-sm" '+isenabled+' onclick="changeShortValue(this,1)"><span class="glyphicon glyphicon-arrow-down"></span></button>&nbsp;'+
		          '<button type="button" class="btn btn-default btn-sm" '+isenabled+' onclick="changeShortValue(this,-1)"><span class="glyphicon glyphicon-arrow-up"></span></button>'+
		          '</td>'+
	          '</tr>';
	 return tr;
}
//排序切换
function changeShortValue(obj,value){
	var count = $('#groupPararTable').find("tr").length;
	var tr = $(obj).parent().parent();
	var currIndex = $($(tr).find("td")[0]).html();
	var descIndex = parseInt(currIndex) + value;
	if(descIndex <= count && descIndex > 0){
		var tempName = groupAndShortFieldArray[currIndex - 1].name;
		groupAndShortFieldArray[currIndex - 1].name = groupAndShortFieldArray[descIndex - 1].name;
		groupAndShortFieldArray[descIndex - 1].name = tempName;
		console.log(groupAndShortFieldArray);
		$("#groupPararTable").html("");	
		for ( var int = 0; int < groupAndShortFieldArray.length; int++) {
			var sObj = groupAndShortFieldArray[int];
			
			if(sObj.name == "ifGroupSubject"){
				$("#groupPararTable").append(createTr("科目","ifGroupSubject",true,true));
			}else if(sObj.name == "ifGroupDepartment"){
				$("#groupPararTable").append(createTr("部门","ifGroupDepartment",true,true));
			}else if(sObj.name == "ifGroupEmployee"){
				$("#groupPararTable").append(createTr("职员","ifGroupEmployee",true,true));
			}else if(sObj.name == "ifGroupPartner"){
				$("#groupPararTable").append(createTr("往来单位","ifGroupPartner",true,true));
			}
		}
		$("#groupPararTable").append(createTr("期间","ifGroupDate",true,false));
		
		//更改分组列表
		regListenSubjectFilterAndGroupChange();
		//更改排序字段
		regListenShortFieldChange();
	}else{
		console.log("已是最低或者最高");
	}
	$('#groupPararTable').find("input").each(function(){
		$(this).iCheck({
			   checkboxClass: 'icheckbox_square-blue',  // 注意square和blue的对应关系
			   radioClass: 'iradio_square-blue',
			   increaseArea: '20%' // optional
			 });
	});
}
/**
 * 监听分组排序处理函数
 */
var groupAndShortFieldStr = null;
var groupAndShortFieldArray = null;
function regListenShortFieldChange(){
	var arry = [];
	for ( var int = 0; int < $('#groupPararTable').find("tr").length; int++) {
		var index = parseInt($($('#groupPararTable').find("tr")[int]).find("td")[0].innerHTML);
		arry[index-1] ={ name:$($('#groupPararTable').find("tr")[int]).find("input")[0].name };
	}
	groupAndShortFieldArray = arry;
	var str = $.map(arry,function(obj){
		if(obj.name=="ifGroupSubject"){
			return "SUBJECT_ID,SUBJECT_CODE,SUBJECT_NAME";
		}else if(obj.name=="ifGroupDepartment"){
			return "DEPARTMENT_ID,DEPARTMENT_CODE,DEPARTMENT_NAME";
		}else if(obj.name=="ifGroupEmployee"){
			return "EMPLOYEE_ID,EMPLOYEE_CODE,EMPLOYEE_NAME";
		}else if(obj.name=="ifGroupPartner"){
			return "PARTNER_ID";
		}else{
		}
	}).join(",");
	groupAndShortFieldStr = str;
	return groupAndShortFieldStr;
}
/**
 * 注册科目分组和科目过滤互斥关系处理函数
 */
function regListenSubjectFilterAndGroupChange(){
	$("input[name='ifGroupSubject']").on("ifChanged",function(e) { 
		if(!$(this).is(':checked')){
			//如果科目分组不选，那么必须科目过滤
			$("input[name='ifSubjectIdFilter']").iCheck('check');
		}else{
			$("input[name='ifSubjectIdFilter']").iCheck('uncheck');
		}
	});
	$("input[name='ifSubjectIdFilter']").on("ifChanged",function(e) { 
		if(!$(this).is(':checked')){
			//如果科目分组不选，那么必须科目过滤
			$("input[name='ifGroupSubject']").iCheck('check');
		}else{
			$("input[name='ifGroupSubject']").iCheck('uncheck');
		}
	});
}
/**
 * 初始化过滤条件UI
 */
function initFitlerPararUI(query){
	
	if(query!=null){
		query.minAccountAnnual = query.minYear + "." + query.minMonth;
		query.maxAccountAnnual = query.maxYear + "." + query.maxMonth;
		$("#selectAccountAnnual").html(query.minAccountAnnual+"-"+query.maxAccountAnnual);
		//转换check值为数字或者NULL
		$.each(query, function(key, val) {  
	      if(/^if/.test(key)){
	    	 if(val == 1){
	    		 //$("input[name='"+key+"']").iCheck('check'); 
	    	 }else{
	    		 //$("input[name='"+key+"']").iCheck('uncheck'); 
	    	 }
	    	 //delete query[key];
	      }
		}); 
		//$("#queryDialog").writeJson2Dom(query);
	}
	$("#dataGrid").setGridParam().hideCol("departmentCode");
	$("#dataGrid").setGridParam().hideCol("departmentName");
	$("#dataGrid").setGridParam().hideCol("employeeCode");
	$("#dataGrid").setGridParam().hideCol("employeeName");
	$("#dataGrid").setGridParam().hideCol("partnerId");
	$(".assitsItem").each(function(i,item){
		if($(this).attr("name")=="departmentCheckBox" && $(this).is(':checked')){
			$("#dataGrid").setGridParam().showCol("departmentCode");
			$("#dataGrid").setGridParam().showCol("departmentName");
		}else if($(this).attr("name")=="employeeCheckBox" && $(this).is(':checked')){
			$("#dataGrid").setGridParam().showCol("employeeCode");
			$("#dataGrid").setGridParam().showCol("employeeName");
		}else if($(this).attr("name")=="partnerCheckBox" && $(this).is(':checked')){
			$("#dataGrid").setGridParam().showCol("partnerId");
		}
	});

	if($("input[name='ifDepartmentFilter']").is(':checked')){
		$("#departmentFilterSelect").show();
		$("#departmentFilterSelect").prev().show();
		$("#dataGrid").setGridParam().hideCol("departmentCode");
		$("#dataGrid").setGridParam().hideCol("departmentName");
	}else{
		$("#departmentFilterSelect").hide();
		$("#departmentFilterSelect").prev().hide();
	}

	if($("input[name='ifEmployeeFilter']").is(':checked')){
		$("#employeeFilterSelect").show();
		$("#employeeFilterSelect").prev().show();
		$("#dataGrid").setGridParam().hideCol("employeeCode");
		$("#dataGrid").setGridParam().hideCol("employeeName");
	}else{
		$("#employeeFilterSelect").hide();
		$("#employeeFilterSelect").prev().hide();
	}

	if($("input[name='ifPartnerFilter']").is(':checked')){
		$("#partnerFilterSelect").show();
		$("#partnerFilterSelect").prev().show();
		$("#dataGrid").setGridParam().hideCol("partnerId");
	}else{
		$("#partnerFilterSelect").hide();
		$("#partnerFilterSelect").prev().hide();
	}

	if(query.ifSubjectIdFilter){
		$("#subjectFilterSelect").show();
		$("#subjectFilterSelect").prev().show();
		$("#dataGrid").setGridParam().hideCol("subjectCode");
		$("#dataGrid").setGridParam().hideCol("subjectName");
	}else{
		$("#subjectFilterSelect").hide();
		$("#subjectFilterSelect").prev().hide();
		$("#dataGrid").setGridParam().showCol("subjectCode");
		$("#dataGrid").setGridParam().showCol("subjectName");
	}
	$("#dataGrid").setGridWidth($(window).width()-40); 
	$("#dataGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });  

}
/**
 * 初始化科目选择列表
 */
function initSubjectSelect(datas){
	if(datas.subjectList != undefined){
		$("#subjectFilterSelect").html("");
		var html = "";
		for ( var int = 0; int < datas.subjectList.length; int++) {
			if(datas.query.subjectId == datas.subjectList[int].id){
				html = html + "<option selected='selected' value='"+datas.subjectList[int].id+"' subjectCode='"+datas.subjectList[int].subjectCode+"'>"+datas.subjectList[int].subjectCode+"  "+datas.subjectList[int].subjectName+"</option>";
			}else{
				html = html + "<option value='"+datas.subjectList[int].id+"' subjectCode='"+datas.subjectList[int].subjectCode+"'>"+datas.subjectList[int].subjectCode+"  "+datas.subjectList[int].subjectName+"</option>";
			}
		}
		$("#subjectFilterSelect").html(html);	
	}
}
/**
 * 初始化部门选择列表
 */
function initDepartmentSelect(datas){
	if(datas.departmentList != undefined){
		$("#departmentFilterSelect").html("");
		var html = "";
		for ( var int = 0; int < datas.departmentList.length; int++) {
			if(datas.query.departmentId == datas.departmentList[int].departmentId){
				html = html + "<option selected='selected' value='"+datas.departmentList[int].departmentId+"' departmentCode='"+datas.departmentList[int].departmentCode+"'>"+datas.departmentList[int].departmentCode+"  "+datas.departmentList[int].departmentName+"</option>";
			}else{
				html = html + "<option value='"+datas.departmentList[int].departmentId+"' departmentCode='"+datas.departmentList[int].departmentCode+"'>"+datas.departmentList[int].departmentCode+"  "+datas.departmentList[int].departmentName+"</option>";
			}
		}
		$("#departmentFilterSelect").html(html);	
	}
}
/**
 * 初始化职员选择列表
 */
function initEmployeeSelect(datas){
	if(datas.employeeList != undefined){
		$("#employeeFilterSelect").html("");
		var html = "";
		for ( var int = 0; int < datas.employeeList.length; int++) {
			if(datas.query.employeeId == datas.employeeList[int].employeeId){
				html = html + "<option selected='selected' value='"+datas.employeeList[int].employeeId+"' employeeCode='"+datas.employeeList[int].employeeCode+"'>"+datas.employeeList[int].employeeCode+"  "+datas.employeeList[int].employeeName+"</option>";
			}else{
				html = html + "<option value='"+datas.employeeList[int].employeeId+"' employeeCode='"+datas.employeeList[int].employeeCode+"'>"+datas.employeeList[int].employeeCode+"  "+datas.employeeList[int].employeeName+"</option>";
			}
		}
		$("#employeeFilterSelect").html(html);	
	}
}
/**
 * 初始化往来单位选择列表
 */
function initPartnerSelect(datas){
	if(datas.partnerList != undefined){
		$("#partnerFilterSelect").html("");
		var html = "";
		for ( var int = 0; int < datas.partnerList.length; int++) {
			if(datas.query.partnerId == datas.partnerList[int].partnerId){
				html = html + "<option selected='selected' value='"+datas.partnerList[int].partnerId+"' partnerCode='"+datas.partnerList[int].partnerCode+"'>"+datas.partnerList[int].partnerCode+"  "+datas.partnerList[int].partnerName+"</option>";
			}else{
				html = html + "<option value='"+datas.partnerList[int].partnerId+"' partnerCode='"+datas.partnerList[int].partnerCode+"'>"+datas.partnerList[int].partnerCode+"  "+datas.partnerList[int].partnerName+"</option>";
			}
		}
		$("#partnerFilterSelect").html(html);	
	}
	
}

