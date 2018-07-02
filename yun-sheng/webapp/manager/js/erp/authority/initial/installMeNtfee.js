var lastrow;
var lastcell;
var companyName = '';

$(function(){
	initialObj = new InitialObj(basePath);
//	findContactUnit();
//	initInstallment();
	loadmodal();
	
	//下拉框选择
	$('#contactsunitId,#installmentCode').change(function(){
		$(this).next().html('');
	});
	//文本框
	$("#remunerationRatio").focus(function(e){
		$(this).next().html('');
		$(this).val($(this).val().replace('%','').trim());
	});
})

/***init 往来单位***/
var callBack;
//打开往来单位引用对话框
function selectContactUnitReferenceOpen(str) {
	$('#contactUnitReferenceModal').modal('show');
	callBack = function() {
		if (arguments[0].length == 0) {
			$.zxsaas_plus.showalert("", "未选中任何行!");
			$('#contactUnitReferenceModal').modal('hide');
			return;
		}
		var contactUnit = arguments[0][0];

		//设置编辑器值
		$('#contactName').val(contactUnit.name);
		$('#contactsunitId').val(contactUnit.id);
		
		$('#contactUnitReferenceModal').modal('hide');
	};
}

//function findContactUnit(){
//	var htmlConTactUnit = '';
//	initialObj.findContactUnit(function(data){
//		var list = data.data.rows;
//		$(list).each(function(index,element){
//			htmlConTactUnit += '<option value="'+element.id+'">'+element.conTactUnitName+'</option>';
//		});
//	});
//	$('#contactsunitId').append(htmlConTactUnit);
//}

/***init 分期商***/
//function initInstallment(){
//	var html = '';
//	initialObj.initInstallment(function(data){
//		var list = data.data.rows;
//		$(list).each(function(index,element){
//			html += '<option value="'+element.code+'">'+element.name+'</option>';
//		});
//		$('#installmentCode').append(html);
//	});
//}

/***blur 佣金比例***/
$('#remunerationRatio').blur(function(){
	var rex=/^[0-9]{0,12}\.{0,1}[0-9]{0,2}$/;
	if(rex.test($(this).val())){
		if($(this).val().indexOf('%')<0 && $(this).val().trim() != ''){
			$(this).val($(this).val()+'%');
		}
	}else{
		$.zxsaas_plus.showalert("提示","请输入合法数字！");
		$(this).val('');
	}
});

/************************新增、修改弹窗********************************/
function modalsaveOrUpdate(num){
	$('#contactsunitId').next().html('');
	$('#installmentCode').next().html('');
	//num  1.新增     2.修改
	if(num == 1){
		//清空表单
		$('#saveOrUpdateForm').clearForm(true);
		$('#companyName').val(companyName);
//		initClearForm();
		$('#saveOrUpdateModal').modal('show');
		$('#myModalLabel').html('分期商新增');
		$('.butHide').show();
	}else if(num == 2){
		//修改
		$('#myModalLabel').html('分期商修改');
		$('.butHide').hide();
		//判断选中
		var ids = $("#jqGrid_blocMessage").jqGrid('getGridParam','selarrrow');//选中的行id
		var len = ids.length;
		if(len == 0){
			$.zxsaas_plus.showalert("错误","请勾选一行数据!");
			return false;
		}else if(len > 1){
			$.zxsaas_plus.showalert("错误","一次只能修改一行数据!");
			return false;
		}else if(len == 1){
			var gridData = $("#jqGrid_blocMessage").jqGrid("getRowData",ids);//获取被选中的一行数据
			//赋值表头
			var params = $('#saveOrUpdateForm').formToArray();
			$(params).each(function(index,element){
				var key = element.name; 
				var value = eval("gridData."+key);
				$('#'+key).val(value);
			});
			$('#contactName').val(gridData.contactsunitName)
//			$('#remunerationRatio').val(gridData.remunerationRatio+'%');
			if($('#contactsunitId').val() == '' || $('#contactsunitId').val() == null){
				$('#contactsunitId').val(gridData.contactsunitId);
			}
			if($('#installmentCode').val() == '' || $('#installmentCode').val() == null){
				$('#installmentCode').val(gridData.installmentCode);
			}
			if(gridData.status == '√'){
				$('#status').prop('checked',true);
			    $('#status').val('1');
			}else{
				$('#status').prop('checked',false);
			    $('#status').val('0');
			}
			$('#saveOrUpdateModal').modal('show');
		}
	}
}

/*****************************保存并新增**********************************/
function saveAndAddIcoUpOn(){
	var cla = $('#contactsunitId').val(),
		na = $('#installmentCode').val();
	if(cla == null || cla == ''){
		$('#contactsunitId').next().html('必填!');
		return;
	}
	if(na == null || na == ''){
		$('#installmentCode').next().html('必填!');
		return;
	}
	//调用存储方法
	var param = $('form').toJsonObject();
	param.remunerationRatio = param.remunerationRatio.replace('%','').trim();
	if($('#status').prop("checked") == true){param.status = 1;}else{param.status = 0;}
	initialObj.saveAndCloseRatio(param,'auth_add',function(data){
		if($.ac_jc(data)) return false;  //判断权限
		
		var str = data.data.str;
		if(str == undefined){
			$.zxsaas_plus.showalert("错误","异常操作!");
		}else{
			if(str == 'noPass'){
				$.zxsaas_plus.showalert("提示信息","分期商不能重复!");
				return false;
			}
			$.zxsaas_plus.showalert("提示信息",str);
			queryInstallMeNtfee();
			//清空表单
			$('#saveOrUpdateForm').clearForm(true);
			$('#companyName').val(companyName);
		}
	});
}

/*****************************保存并关闭**********************************/
function saveAndCloseIcoUpOn(){
	var cla = $('#contactsunitId').val(),
		na = $('#installmentCode').val();
	if(cla == null || cla == ''){
		$('#contactsunitId').next().html('必填!');
		return;
	}
	if(na == null || na == ''){
		$('#installmentCode').next().html('必填!');
		return;
	}
	//调用存储方法
	var param = $('form').toJsonObject();
	param.remunerationRatio = param.remunerationRatio.replace('%','').trim();
	if($('#status').prop("checked") == true){param.status = 1;}else{param.status = 0;}
	var ac_jc = param.id == '' ? 'auth_add' : 'auth_update';
	initialObj.saveAndCloseRatio(param,ac_jc,function(data){
		if($.ac_jc(data)) return false;  //判断权限
		
		var str = data.data.str;
		if(str == undefined){
			$.zxsaas_plus.showalert("错误","异常操作!");
		}else{
			if(str == 'noPass'){
				$.zxsaas_plus.showalert("提示信息","分期商不能重复!");
				return false;
			}
			$.zxsaas_plus.showalert("提示信息",str);
			queryInstallMeNtfee();
		}
		$('#saveOrUpdateModal').modal('hide');
	});
}

/****************************修改信息*******************************/
$('.updateBloc').click(function(){
	var ids = $('#jqGrid_blocMessage').jqGrid('getGridParam','selarrrow');//选中的行id
	var len = ids.length;
	if(len == 0){
		$.zxsaas_plus.showalert("错误","请勾选一行数据!");
		return false;
	}else if(len > 1){
		$.zxsaas_plus.showalert("错误","一次只能修改一条信息!");
		return false;
	}else if(len == 1){
		lastrow!=undefined&&$("#jqGrid_blocMessage").jqGrid("saveCell",lastrow,lastcell);
		var gridData = $("#jqGrid_blocMessage").jqGrid("getRowData",ids);//获取被选中的一行数据
		//保存修改字段
		initialObj.updateRatio(gridData.remunerationRatio,gridData.id,function(data){
			if($.ac_jc(data)) return false;  //判断权限
			
			var str = data.data.str;
			$.zxsaas_plus.showalert("",str);
		});
		queryInstallMeNtfee();
	}
});

/*******************************条件查询***********************************/
function queryInstallMeNtfee(){
	var param = new Object();
	param.queryText = $("#queryText").val();
	if($("#selStatus").prop("checked") == true){param.selStatus = 1}else{param.selStatus = 0}
	$("#jqGrid_blocMessage").jqGrid('setGridParam',{ 
        url:basePath + '/jxc/authority/tInstallMeNtfee/findTinstallmentfee',
        postData:param, //发送数据 
        page:1 
    }).trigger("reloadGrid"); //重新载入 
}


/*******************************启用、禁用、删除**********************************/
function disOrEnInstallMeNtfee(num){
	//批量启用0、禁用1、删除2
	
	//修改对应标志
	var status;
	if(num == 0){ status = 0; }else if(num == 1){ status = 1; }else if(num == 2){ status = 2;}
	var ids = $("#jqGrid_blocMessage").jqGrid('getGridParam','selarrrow');//选中的行ids
	var len = ids.length;
	//至少选中一行
	if(len == 0){
		if(num == 0){
			$.zxsaas_plus.showalert("错误","请勾选公司后再启用!");
		}else if(num == 1){
			$.zxsaas_plus.showalert("错误","请勾选公司后再禁用!");
		}else if(num == 2){
			$.zxsaas_plus.showalert("错误","请勾选公司后再删除!");
		}
		return false;
	}else{
		//弹窗提醒
		if(num == 0){
			$.zxsaas_plus.showconfirm("","是否确定启用选中数据?",function(){
				initialObj.disOrEnInstallMeNtfee(ids,status,'auth_update', function(data){
					if($.ac_jc(data)) return false;  //判断权限
					
					var str = data.data.str;
					$.zxsaas_plus.showalert("",str);
				});
				queryInstallMeNtfee();
			},function(){
				
			});
		}else if(num == 1){
			$.zxsaas_plus.showconfirm("","是否确定禁用选中数据?",function(){
				initialObj.disOrEnInstallMeNtfee(ids,status,'auth_update', function(data){
					if($.ac_jc(data)) return false;  //判断权限
					
					var str = data.data.str;
					$.zxsaas_plus.showalert("",str);
				});
				queryInstallMeNtfee();
			},function(){
				
			});
		}else if(num == 2){
			$.zxsaas_plus.showconfirm("","是否确定删除选中数据?",function(){
				initialObj.disOrEnInstallMeNtfee(ids,status,'auth_delete', function(data){
					if($.ac_jc(data)) return false;  //判断权限
					
					var str = data.data.str;
					$.zxsaas_plus.showalert("",str);
				});
				queryInstallMeNtfee();
			},function(){
				
			});
		}
	}
}

//禁止输入非数字
function clearNoNum(obj){
	var xck = $(obj).parent().prev().html();
	obj.value = obj.value.replace(/[^\d]/g,"");
	if(obj.value.length > 10){
		obj.value = obj.value.substring(0,10);
	}
}

function loadmodal(){
		var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl: basePath + '/jxc/authority/tInstallMeNtfee/findTinstallmentfee',
		GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
		DelRowUrl: "", // 删除信息接口地址
		isSub:"",//是否有子级表格
		subLoadTableUrl:"",//子级表格数据来源地址
		TableName: "#jqGrid_blocMessage", //显示表格名称。遵照css选择器书写
		iconJsonUrl:"../json/icon.json",
		btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
		pager:"#jqGridPager"
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
			var colNames = ['公司名称','业务名称','佣金比例','往来单位','是否禁用','备注','新增人','新增时间','修改人','修改时间','id','公司id','集团id','新增人id','往来单位id'];
			var JqGridColModel=[
								{name:'companyName',index:'companyName', align:'center',sortable:false},
								{name:'installmentCode',index:'installmentCode', align:'center',sortable:false},
								{name:'remunerationRatio',index:'remunerationRatio',align:'center',formatter:ratio,sortable:false},
								{name:'contactsunitName',index:'contactsunitName',align:'center',sortable:false},
								{name:'status',index:'status',align:'center',formatter:formatStatus ,sortable:false},
								{name:'remark',index:'remark',align:'center',sortable:false},
								{name:'createName',index: 'createName',align:'center',sortable:false},  
				                {name:'createTimeString',index: 'createTimeString' ,align:'center',sortable:false},  
				                {name:'updateName',index: 'updateName' ,align:'center',sortable:false},  
				                {name:'updateTimeString',index: 'updateTimeString' ,align:'center',sortable:false},
				                {name:'id',index:'id',hidden:true,sortable:false},
								{name:'companyId', index: 'companyId' ,hidden:true,sortable:false},
				                {name:'groupId', index: 'groupId' ,hidden:true,sortable:false},
								{name:'createUid',index:'createUid', hidden:true,sortable:false},
								{name:'contactsunitId' , index: 'contactsunitId' ,hidden:true,sortable:false}
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
			            multiselect:true,
			           	cellEdit:false,
			            width: "100%" ,
			            height: $(window).height()*0.65,
						autowidth:true,
						rownumWidth: 35, // the width of the row numbers columns
						shrinkToFit:true,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
						ondblClickRow:function(id){
						//双击进入编辑
			   				var delid = id;
			   				
						},
						onCellSelect:function(id,index,e){
//							var colName=$(options.TableName).jqGrid('getGridParam','colModel')[index].name 
//					      	select_name=colName
//					      	select_index=index;
//							//后续可以通过点击的列名称来弹框等
//							var rowData = $(options.TableName).jqGrid('getRowData',id);
//							if(index == '3'){
//								$(options.TableName).jqGrid('setGridParam',{'cellEdit':true});
//							}else{
//								$(options.TableName).jqGrid('setGridParam',{'cellEdit':false});
//							}
//							$(options.TableName).jqGrid('saveCell',lastrow,lastcell);
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
							if($.ac_jc(data)) return false;  //判断权限
							
							companyName = data.data.companyName;
						},
						loadError:function(xhr,status,error){
						}
						})
		
			}
			
			//分期商比例
			function ratio(cellvalue, options, rowObjec){
				return cellvalue+'%';
			}

			//格式禁用、启用
			function formatStatus(cellvalue, options, rowObjec){
				return cellvalue == 1?"√":"";
			}
			
			$(window).bind('click', function saveEdit(e) {
				var rowId = $(e.target).parent("tr").attr("id");
				if (lastsel != "" && lastsel != rowId) { //用于点击其他地方保存正在编辑状态下的行
					if ($(e.target).closest(options.TableName).length == 0) { 
						$(options.TableName).jqGrid('saveRow', lastsel);						
						lastsel='';
					}
				}
			})
			
			/***save ***/
			function saveCell(){
				$("#jqGrid_blocMessage").jqGrid("saveCell",lastrow,lastcell);
			}
			
			//显示隐藏禁用
			//  0 : 禁用       
			//  1 : 不禁用
			$(document).on('click','.double',function(e){
				var selectedRowIds = $(options.TableName).jqGrid("getRowData");  
				var len = selectedRowIds.length;  
				if($('input.double').prop('checked')){
					for(var i = 1;i <= len ;i ++) {  
						var gridData = $(options.TableName).jqGrid("getRowData",i);
						if(gridData.depDouble == '0'){
							$(options.TableName).setRowData(i,null,{display: 'table-row'});//显示禁用
						}
					}  
				}else{
					for(var i = 1;i <= len ;i ++) {  
						var gridData = $(options.TableName).jqGrid("getRowData",i);
						if(gridData.depDouble == '0'){
							$(options.TableName).setRowData(i,null,{display: 'none'});//隐藏禁用
						}
					}  
				}
			});
			
			
			
			//列表    重置密码
			function rePwd(cellvalue, options, rowObjec)
			{
				return '<span class="rePwd" data-blocId="' + rowObjec.blocId + '" data-id="' + options.rowId + '" style="color:#00CCFF;cursor:pointer">重置密码</span>';
			}
			
			//列表复选框
			function checkBox(cellvalue, options, rowObjec)
			{
				return '<input type="checkbox" class="del" data-blocId="' + rowObjec.blocId + '"  data-id="' + options.rowId + '" />';
			}
			
		//查询
		$(document).on("click",".btn-group button[data-eventname='inquire']",function(event){			
			if(flag==true){
			$.jgrid.GridDestroy(options.TableName);
			loadtable();
			}else{
				flag=true;
			}
			
		});
		

		$(document).on("click",".btnbox button[data-eventname='printbtn']",function(event){
			$.zxsaas_plus.showalert("表格打印操作", "表格打印操作咱未完成，敬请期待");
			
		});
		$(document).on("click",".btnbox button[data-eventname='exportTablename']",function(event){
			$.zxsaas_plus.showalert("表格导出操作", "表格导出操作咱未完成，敬请期待");
			
		});
}
		

