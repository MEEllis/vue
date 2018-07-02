
$(function(){

	//注册事件
	$(window).resize(wResize);

	accountsQueryDAO = new AccountsQuery(basePath);
	
	initTree();
	initDataGrid();
	initEvent();

	$("#subjectFilterSelect").hide();
	$("#queryDialog").modal('show');
	
	wResize();
});
//注册事件
function initEvent(){
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
		//创建模拟参数数据
		var paras = getQueryModel();
		paras.subjectId=$(this).val();
		paras.subjectCode=$(this).find("option:selected").attr("subjectCode");
		$("#dataGrid").jqGrid("setGridParam", { postData: paras,page:1}).trigger("reloadGrid");
	});
	$(".cla-one").click(function(){
		switchGridHead(false);
	});
	$(".cla-two").click(function(){
		switchGridHead(true);
	});
}
//科目选择按钮点击事件
var callBack = null;
function subjectSelectButtonClick(inputID){
	var paras = $("#queryDialog").toJsonObject();
	$.each(paras, function(key, val) {  
      if(/^if/.test(key)) paras[key] = $.parseCheckValue(val);
	}); 
	paras.currentAccountingYear = paras.maxAccountAnnual.split(".")[0];
	paras.companyId = gl_CurrCompanyId;
	
	//重新查询科目
	subjectSelectFrame.loadDataCompanySubjectTree(paras);
	subjectSelectFrame.searchDataCompanySubjectGrid(paras);
	$('#subjectReferenceModal').modal('show');
	callBack = function(){	
		$('#subjectReferenceModal').modal('hide');
		if(arguments[0].length != 1){
			$.MsgBox('提示消息',"请选择一个科目");
			return ;
		}
		$("#"+inputID).val(arguments[0][0].subjectCode);
	}; 
}
//初始化数据表
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
	//期间
	function formatterDate(cellvalue, options, rowObject){
		if(rowObject.summary == "期初余额"){
			return "";
		}else{
			return rowObject.year+"-"+rowObject.month;
		}
	}	
	//数量
	function formatterNum(cellvalue, options, rowObject){
		if(cellvalue == 0){
			return "";
		}else{
			return cellvalue;
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
	$("#dataGrid").jqGrid({
		url: basePath + '/cw/accountsQuery/pageGL/'+gl_CurrCompanyId,
        datatype : "json",
        colNames : [ '序号',  '科目编码',  '科目名称',  '期间', '月',  '摘要',  '数量',  '金额', '数量', '金额', '方向','数量', '余额'],
        colModel : [ 
                    {name : 'index',index : 'index',align:'center',sorttype:"int",width:60,sortable: false},
                    {name : 'subjectCode',index : 'subjectCode',align:'left',width:100,sortable: false}, 
                    {name : 'subjectName',index : 'subjectName',align:'left',width:100,sortable: false}, 
                    {name : 'year',index : 'year',align:'left',width:100,sortable: false,formatter:formatterDate}, 
                    {name : 'month',index : 'month',align:'left',width:100,sortable: false,hidden: true}, 
                    {name : 'summary',index : 'summary',align:'left',width:100,sortable: false}, 
                    {name : 'borrowNum',index : 'borrowNum',align:'right',sortable: false,formatter:formatterNum},
                    {name : 'borrowCurrency',index : 'borrowCurrency',align:'right',sortable: false,formatter:formatterAmuont}, 
                    {name : 'loanNum',index : 'loanNum',align:'right',sortable: false,formatter:formatterNum},
                    {name : 'loanCurrency',index : 'loanCurrency',align:'right',sortable: false,formatter:formatterAmuont}, 
                    {name : 'direction',index : 'direction',align:'left',formatter:formatterCreditDirection,sortable: false}, 
                    {name : 'blanceNum',index : 'blanceNum',align:'right',sortable: false,formatter:formatterNum},
                    {name : 'blanceAmuont',index : 'blanceAmuont',align:'right',sortable: false,formatter:'number'}
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
        		$("#dataGrid").setGridWidth($(window).width()-40); 
	    		$("#dataGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });  
	    		initSubjectSelect(data);
	    		initFitlerPararUI(data.query);
			} catch (e) {

			}
        }
      });
	  $("#dataGrid").jqGrid('setGroupHeaders', {
	    useColSpanStyle: true, 
	    groupHeaders:[
	    	{startColumnName: 'borrowNum', numberOfColumns: 2, titleText: '<em>借方</em>'},
	    	{startColumnName: 'loanNum', numberOfColumns: 2, titleText: '<em>贷方</em>'},
	    	{startColumnName: 'blanceNum', numberOfColumns: 3, titleText: '<em>余额</em>'}
	    ]  
	  });
}
/**
 * 切换表头显示方式
 */
function switchGridHead(isShowNum){
	if(isShowNum){
		$("#dataGrid").jqGrid('destroyGroupHeader', true);//清除原有表头合并 
		$("#dataGrid").setGridParam().showCol("borrowNum");
		$("#dataGrid").setGridParam().showCol("loanNum");
		$("#dataGrid").setGridParam().showCol("blanceNum");
		$("#dataGrid").setGridWidth($(window).width()-40); 
		$("#dataGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
	    $("#dataGrid").jqGrid('setGroupHeaders', {
		    useColSpanStyle: true, 
		    groupHeaders:[
		    	{startColumnName: 'borrowNum', numberOfColumns: 2, titleText: '<em>借方</em>'},
		    	{startColumnName: 'loanNum', numberOfColumns: 2, titleText: '<em>贷方</em>'},
		    	{startColumnName: 'blanceNum', numberOfColumns: 3, titleText: '<em>余额</em>'}
		    ]  
		  });
	}else{
		$("#dataGrid").jqGrid('destroyGroupHeader', true);//清除原有表头合并 
		$("#dataGrid").setGridParam().hideCol("borrowNum");
		$("#dataGrid").setGridParam().hideCol("loanNum");
		$("#dataGrid").setGridParam().hideCol("blanceNum");  
		$("#dataGrid").setGridWidth($(window).width()-40); 
		$("#dataGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
	}
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
		$("#selectAccountAnnual").html(paras.minAccountAnnual+"-"+paras.maxAccountAnnual);
		//转换check值为数字或者NULL
		$.each(paras, function(key, val) {  
	      if(/^if/.test(key)) paras[key] = $.parseCheckValue(val);
		}); 
		return paras;
	}
}
/**
 * 科目明细账查询
 * @return
 */
function searchSubjectGL(){

	//创建模拟参数数据
	var paras = getQueryModel();
	console.log(paras);
	$("#queryDialog").modal('hide');
	$("#dataGrid").jqGrid("setGridParam", { postData: paras,page:1}).trigger("reloadGrid");
}
//窗口大小改变事件
function wResize(){
	//表格高度自适应
	$("#dataGrid").setGridHeight($("#mainDIV").height()-285);
}
//初始化树
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
	      }
		}); 
		//$("#queryDialog").writeJson2Dom(query);
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
//初始化表单
function initForm(){
	$('#starttime').datepicker({
		  format: 'yyyy.mm.dd',
		        weekStart: 1,
		        autoclose: true,
		        todayBtn: 'linked',
		        language: 'zh-CN'
		 }).on('changeDate',function(ev){
		  //alert($("#starttime").val());  
	});
	$('#endtime').datepicker({
		  format: 'yyyy.mm.dd',
		        weekStart: 1,
		        autoclose: true,
		        todayBtn: 'linked',
		        language: 'zh-CN'
		 }).on('changeDate',function(ev){
			 //alert($("#endtime").val());  
	});	
}
//对Date的扩展，将 Date 转化为指定格式的String 
//月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
//年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
//例子： 
//(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
//(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
DateFormat = function(date,fmt) 
{ //author: meizz 
	var o = { 
	 "M+" : date.getMonth()+1,                 //月份 
	 "d+" : date.getDate(),                    //日 
	 "h+" : date.getHours(),                   //小时 
	 "m+" : date.getMinutes(),                 //分 
	 "s+" : date.getSeconds(),                 //秒 
	 "q+" : Math.floor((date.getMonth()+3)/3), //季度 
	 "S"  : date.getMilliseconds()             //毫秒 
	}; 
	if(/(y+)/.test(fmt)) 
	 fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length)); 
	for(var k in o) 
	 if(new RegExp("("+ k +")").test(fmt)) 
	fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
	return fmt; 
}