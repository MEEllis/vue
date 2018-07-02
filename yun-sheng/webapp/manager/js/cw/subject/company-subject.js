$(document).ready(function(){
	subjectPage = new SubjectPage(basePath);
	initModal();
//	getUnitInit();
	
	codeBlur();

});


/******************************获取填写的值****************************/
function createSubjectJsonObject(){
	var obj = new Object;
	if($("#id").val() != ''){obj.id = $("#id").val();}else{}
	if($("#groupId").val() != ''){obj.groupId = $("#groupId").val();}else{}
	if($("#companyId").val() != ''){obj.companyId = $("#companyId").val();}else{}
	if($("#currentAccountingYear").val() != ''){obj.currentAccountingYear = $("#currentAccountingYear").val();}else{}
	if($("#subjectLevel").val() != ''){obj.subjectLevel = $("#subjectLevel").val();}else{}
	if($("#useStatus").val() != ''){obj.useStatus = $("#useStatus").val();}else{}
	if($("#ifEndSubject").val() != ''){obj.ifEndSubject = $("#ifEndSubject").val();}else{}
	if($("#createUid").val() != ''){obj.createUid = $("#createUid").val();}else{}
	if($("#createTimeStr").val() != ''){obj.createTimeStr = $("#createTimeStr").val();}else{}
	if($("#updateUid").val() != ''){obj.updateUid = $("#updateUid").val();}else{}
	if($("#updateTimeStr").val() != ''){obj.updateTimeStr = $("#updateTimeStr").val();}else{}
	if($("#fatherId").val() != ''){obj.fatherId = $("#fatherId").val();}else{}
	if($("#commonId").val() != ''){obj.commonId = $("#commonId").val();}else{}
	if($("#subjectClssify").val() != ''){obj.subjectClssify = $("#subjectClssify").val();}else{}
	if($("#creditDirection").val() != ''){obj.creditDirection = $("#creditDirection").val();}else{}
	obj.remark = $("#remark").val();
	obj.source = $("#source").val();
	obj.subjectCode = $("#subjectCode").val();
	obj.subjectName = $("#subjectName").val();
	//助记码
	obj.mnemonicCode = $("#mnemonicCode").val();
	//停用
	if($("#enable").is(":checked")){obj.enable = 1;}else{obj.enable = 0;}
	//是否受控科目
	if($("#ifControl").is(":checked")){obj.ifControl = 1;}else{obj.ifControl = 0;}
	//数量核算
	if($("#ifNumAccounting").is(":checked")){obj.ifNumAccounting = 1;}else{obj.ifNumAccounting = 0;}
	//计量单位
	obj.unit = $("#unit").val();
	//是否现金流量科目
	if($("#cashFlow").is(":checked")){obj.cashFlow = 1;}else{obj.cashFlow = 0;}
	//往来单位
	if($("#partnerAccounting").is(":checked")){obj.partnerAccounting = 1;}else{obj.partnerAccounting = 0;}
	//部门
	if($("#departmentAccounting").is(":checked")){obj.departmentAccounting = 1;}else{obj.departmentAccounting = 0;}
	//职员
	if($("#employeeAccounting").is(":checked")){obj.employeeAccounting = 1;}else{obj.employeeAccounting = 0;}
	return obj;
	
}

/*************************添加.修改弹窗*********************************/      
function saveFcompanySubjectTemplate(num){
	//num  1.新增     2.保存     3.保存并新增	4.修改
	if(num == 1){
		$('#saveOrUpdateSubject').modal('show');
		initModal();
	}else if(num == 2){
		//获取内容
		var obj = createSubjectJsonObject();
		//新增方法
		saveOrUpdate(obj);
		$('#saveOrUpdateSubject').modal('hide');
		searchData();
	}else if(num == 3){
		//获取内容
		var obj = createSubjectJsonObject();
		//新增方法
		saveOrUpdate(obj);
		searchData();
		initModal();
	}else if(num == 4){
		$('#saveOrUpdateSubject').modal('show');
		//带入数据
		updateFcompanyInit(null);
	}
}

/*****************************添加，修改*******************************/
function saveOrUpdate(obj){
	//判断数据完整性
	if(obj.subjectCode == null || obj.subjectCode.trim() == '' || obj.subjectName == null || obj.subjectName.trim() == ''){
		$.MsgBox('',"请输入科目名称，科目编码");
//		$.MsgBox('',"请输入科目名称，科目编码",function(){alert('ok')} , function(){alert('cancle')} );          点击按钮 调用方法
	}else{
		subjectPage.saveFcompanySubjectTemplate(obj, function(data){
			var o = data.data.str;
			$.MsgBox('',o);
		});
	}
}

/***********计量单位**************/
//function getUnitInit(){
//	subjectPage.getUnit(function(data){
//		var unitList = data.data.rows;
//		for(var i = 0;i < unitList.length;i++){
//			var obj = unitList[i];
//			$("#unit").append('<option value='+obj.content_1+'>'+obj.content+'</option>');
//		}
//	});
//}

/*****************************************初始化弹窗*******************************************/
function initModal(){
	$("#id").val(null);
	$("#subjectCode").val("");
	$("#subjectName").val("");
	$("#mnemonicCode").val('');
	$("#groupId").val(null);
	$("#companyId").val(null);
	$("#subjectLevel").val(null);
	$("#useStatus").val(null);
	$("#ifEndSubject").val(null);
	$("#remark").val(null);
	$("#source").val(null);
	$("#createUid").val(null);
	$("#createTimeStr").val(null);
	$("#updateUid").val(null);
	$("#updateTimeStr").val(null);
	$("#fatherId").val(null);
	$("#commonId").val(null);
	$("#subjectCode").removeAttr("disabled");
	$("#subjectClssify").removeAttr("disabled");
	$("#creditDirection").removeAttr("disabled");
	$("#unit").removeAttr("disabled");
	$("#departmentAccounting").removeAttr("disabled");
	$("#employeeAccounting").removeAttr("disabled");
	$("#partnerAccounting").removeAttr("disabled");
	$("#subjectCode").val('');
	$("#departmentAccounting").removeAttr('checked');
	$("#employeeAccounting").removeAttr('checked');
	$("#partnerAccounting").removeAttr('checked');
	$("#cashFlow").removeAttr('checked');
	$("#enable").removeAttr('checked');
	$("#ifControl").removeAttr('checked');
	$("#ifNumAccounting").removeAttr('checked');
}


/*****************************************点击修改弹窗赋值*******************************************/
function updateFcompanyInit(obj){
	initModal();
	$("#subjectCode").prop("disabled","disabled");
	if(obj == null){
		//点击修改
		var id=$('#companySubjectTable').jqGrid('getGridParam','selrow');
		if(id != null){
			var entity = $('#companySubjectTable').jqGrid('getRowData',id);
			insertParas(entity);
		}else{
			$.MsgBox('',"请选择一行数据!");
		}
	}else{
		//点击上一张、下一张
		insertParas(obj);
	}
}

function insertParas(obj){
	$("#id").val(obj.id);
	$("#groupId").val(8888888);
	$("#companyId").val(gl_CurrCompanyId);
	$("#currentAccountingYear").val(gl_CurrYear);
	$("#subjectLevel").val(obj.subjectLevel);
	$("#useStatus").val(obj.useStatus);
	$("#ifEndSubject").val(obj.ifEndSubject);
	$("#remark").val(obj.remark);
	var source = obj.source == "借方"? 1:0;
	$("#source").val(source);
	$("#createUid").val(obj.createUid);
	var date = new Date();
	date.setTime(obj.createTime);
	$("#createTimeStr").val($.DateFormat(date,"yyyy-MM-dd hh:mm:ss"));
	$("#fatherId").val(obj.fatherId);
	$("#commonId").val(obj.commonId);
	$("#subjectCode").val(obj.subjectCode);
	$("#subjectName").val(obj.subjectName);
	$("#mnemonicCode").val(obj.mnemonicCode);
	$("#subjectClssify option[value='"+obj.subjectClssify+"']").prop('selected',true);
	var creditDirection = obj.creditDirection == "借方"? 1:0;
	$("#creditDirection option[value='"+creditDirection+"']").prop('selected',true);
	$("#unit option[value='"+obj.unit+"']").attr('selected','selected');
	if(obj.enable == "true" || obj.enable == true){ 			$("#enable").prop("checked",true);}else{				$("#enable").prop("checked",false);}
	if(obj.ifControl == "true" || obj.ifControl == true){			$("#ifControl").prop("checked",true);}else{			$("#ifControl").prop("checked",false);}
	if(obj.ifNumAccounting == "true" || obj.ifNumAccounting == true){	$("#ifNumAccounting").prop("checked",true);}else{		$("#ifNumAccounting").prop("checked",false);}
	if(obj.cashFlow == "true" || obj.cashFlow == true){			$("#cashFlow").prop("checked",true);}else{			$("#cashFlow").prop("checked",false);}
	if(obj.partnerAccounting == "true" || obj.partnerAccounting == true){	$("#partnerAccounting").prop("checked",true);}else{	$("#partnerAccounting").prop("checked",false);}
	if(obj.departmentAccounting == "true" || obj.departmentAccounting == true){$("#departmentAccounting").prop("checked",true);}else{$("#departmentAccounting").prop("checked",false);}
	if(obj.employeeAccounting == "true" || obj.employeeAccounting == true){	$("#employeeAccounting").prop("checked",true);}else{	$("#employeeAccounting").prop("checked",false);}
}

/*****************************删除科目**********************************/
function deleteFcompanyInit(){
	var selectedIds = $("#companySubjectTable").jqGrid("getGridParam", "selarrrow");
	var arr = new Array();
	if(selectedIds.length >= 1){
		for(var i = 0;i<selectedIds.length;i++){
			subjectPage.deleteFcompanyById(selectedIds[i], function(data){
				var i = data.data.str;
				if(i == 0 || i == "删除异常"){
					$.MsgBox('',"删除失败!");
				}else{
					$.MsgBox('',"删除成功!");
				}
			});
			
		}
	}else{
		$.MsgBox('','请选择至少一行数据！'); 
	}
}
/*************************科目编码失去焦点*************************/
function codeBlur(){
	$("#subjectCode").blur(function(){
		var code = $("#subjectCode").val();
		if(code != null && code.trim() != ''){
			subjectPage.findCompanyByCode(gl_CurrCompanyId,8888888,gl_CurrYear, code, function(data){
				var obj = data.data.row;
				if(obj == '科目编码格式不正确!'){
					initModal();
					$.MsgBox('',obj);
				}else if(obj == '没有父级!'){
					initModal();
					$.MsgBox('',obj);
				}else{
					//判断父级是否末级科目、是否被指用
					if(obj.ifEndSubject == 1 && obj.enable){
						//是末级科目
						extendsFatherCode(obj);
						//不能选中
						$("#subjectClssify").prop("disabled","disabled");
						$("#creditDirection").prop("disabled","disabled");
						$("#unit").prop("disabled","disabled");
						$("#partnerAccounting").prop('disabled',"disabled");
						$("#departmentAccounting").prop('disabled',"disabled");
						$("#employeeAccounting").prop('disabled',"disabled");
					}else{
//						//不是末级科目
						extendsFatherCode(obj);
						$("#subjectClssify").prop("disabled","disabled");
						$("#creditDirection").prop("disabled","disabled");
						$("#unit").prop("disabled","disabled");
						//如果选中了，不能更改
						if($("#partnerAccounting").is(":checked") == true){
							$("#partnerAccounting").prop('disabled','disabled');
						}else{
							$("#partnerAccounting").removeAttr('disabled');
						}
						if($("#departmentAccounting").is(":checked") == true){
							$("#departmentAccounting").prop('disabled','disabled');
						}else{
							$("#departmentAccounting").removeAttr('disabled');
						}
						if($("#employeeAccounting").is(":checked") == true){
							$("#employeeAccounting").prop('disabled','disabled');
						}else{
							$("#employeeAccounting").removeAttr('disabled');
						}	
					}
				}
			});
		}
	});
}

//      继承父科目
function extendsFatherCode(obj){
	//科目类别
	$("#subjectClssify option[value='"+obj.subjectClssify+"']").prop('selected',true);
	//方向
	$("#creditDirection option[value='"+obj.creditDirection+"']").prop('selected',true);
	//停用
	if(obj.enable){$("#enable").prop("checked",true);}else{$("#enable").prop("checked",false);}
	//是否受控科目
	if(obj.ifControl == true || obj.ifControl == "true"){$("#ifControl").prop("checked",true);}else{$("#ifControl").prop("checked",false);}
	if(obj.ifNumAccounting == "true" || obj.ifNumAccounting == true){$("#ifNumAccounting").prop("checked",true);}else{$("#ifNumAccounting").prop("checked",false);}
	//计量单位
	$("#unit option[value='"+obj.unit+"']").prop('selected',true);
	//是否现金流量
	if(obj.cashFlow == true || obj.cashFlow == "true"){$("#cashFlow").prop("checked",true);}else{$("#cashFlow").prop("checked",false);}
	//往来单位核算
	if(obj.partnerAccounting == true || obj.partnerAccounting == "true"){$("#partnerAccounting").prop("checked",true);}else{$("#partnerAccounting").prop("checked",false);}
	//部门核算
	if(obj.departmentAccounting == true || obj.departmentAccounting == "true"){$("#departmentAccounting").prop("checked",true);}else{$("#departmentAccounting").prop("checked",false);}
	//职员核算
	if(obj.employeeAccounting == true || obj.employeeAccounting == "true"){$("#employeeAccounting").prop("checked",true);}else{$("#employeeAccounting").prop("checked",false);}
	//集团
	$("#groupId").val(obj.groupId);
	//公司
	$("#companyId").val(obj.companyId);
	$("#remark").val(obj.remark);
	$("#useStatus").val(obj.useStatus);
	$("#source").val(obj.source);
	$("#currentAccountingYear").val(obj.currentAccountingYear);
	$("#createUid").val(obj.createUid);
	$("#createTimeStr").val(obj.createTimeStr);
}

/********************************上一张、下一张********************************/
function upOrDownPage(num){
	var paras = new Object();
	paras.id = $("#id").val();
	paras.groupId = $("#groupId").val();
	paras.companyId = $("#companyId").val();
	paras.currentAccountingYear = $("#currentAccountingYear").val();
	if(num == 1){
		//上一张
		getupOrdownPage(paras,num);
		
	}else if(num == 2){
		//下一张
		getupOrdownPage(paras,num);
	}
}

function getupOrdownPage(paras,num){
	if(paras.id == null || paras.id.trim() == ""){
		//后期制作
		
	}else{
		subjectPage.findPageSubject(paras, num, function(data){
			var obj = data.data.row;
			if(obj != null){
				updateFcompanyInit(obj);
			}else{
				if(num == 1){
					$.MsgBox('',"没有上一行!");
				}else if(num == 2){
					$.MsgBox('',"没有下一行!");
				}
				
			}
		});
	}
}


