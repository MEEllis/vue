var companyName = '';
$(function(){
	$('#queryText').attr('placeholder','输入类别名称、编码和备注')
	initialObj = new InitialObj(basePath);
	loadmodal();
	$("#code,#name").focus(function(e){
		$(this).next().html('');
	});
});
		
/************************新增、修改弹窗********************************/
function modalsaveOrUpdate(num){
	$('#code').next().html('');
	$('#name').next().html('');
	//num  1.新增     2.修改
	if(num == 1){
		//清空表单
		$('#saveOrUpdateForm').clearForm(true);
		$('#companyName').val(companyName);
		$('#saveOrUpdateModal').modal('show');
	//	$('#saveOrUpdateModal').on('shown.bs.modal',function(){
			$('#flag0').prop('checked',"checked");
		//});
		$('#myModalLabel').html('出入库方式新增');
		$('.butHide').show();
	}else if(num == 2){
		//修改
		$('#myModalLabel').html('出入库方式修改');
		$('.butHide').hide();
		//判断选中
		var ids = $("#jqGrid_blocMessage").jqGrid('getGridParam','selarrrow');//选中的行id
		var len = ids.length;
		if(len == 0){
			$.zxsaas_plus.showalert("错误","请勾选一行数据!");
			return false;
		}else if(len != 1){
			$.zxsaas_plus.showalert("错误","一次只能修改一条信息!");
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
			if(gridData.status == '√'){
				$('#status').prop('checked',true);
			    $('#status').val('1');
			}else{
				$('#status').prop('checked',false);
			    $('#status').val('0');
			}
			if(gridData.flag == '1'){
				$('#flag1').prop('checked',"checked");
			}else{
				$('#flag0').prop('checked',"checked");
			}
			$('#saveOrUpdateModal').modal('show');
		}
	}
}

/*****************************保存并新增**********************************/
function saveAndAddInpayClass(){
	var	na = $('#name').val(),
		code = $('#code').val();
	if(na == ''){
		$('#name').next().html('必填!');
		return;
	}
	if(code == ''){
		$('#code').next().html('必填!');
		return;
	}
	//调用存储方法
	var param = $('form').toJsonObject();
	param.flag = $('input:radio[name="flag"]:checked').val();
	if($('#status').prop("checked") == true){param.status = 1}else{param.status = 0}
	initialObj.saveAndCloseTotherstorageClass(param,'auth_add',function(data){
		if($.ac_jc(data)) return false;  //判断权限
		
		var str = data.data.str;
		if(str == undefined){
			$.zxsaas_plus.showalert("","异常操作!");
		}else{
			if(str == 'noPass'){
				$.zxsaas_plus.showalert("提示信息","名称、编码不能重复!");
				return false;
			}
			$.zxsaas_plus.showalert("",str);
			queryInpayClass();
		}
		//清空表单
		$('#saveOrUpdateForm').clearForm(true);
		$('#companyName').val(companyName);
		$('#flag0').prop('checked',"checked");
	});
}

/*****************************保存并关闭**********************************/
function saveAndCloseTotherstorageClass(){
	var	na = $('#name').val(),
		code = $('#code').val();
	if(na == ''){
		$('#name').next().html('必填!');
		return;
	}
	if(code == ''){
		$('#code').next().html('必填!');
		return;
	}
	//调用存储方法
	var param = $('form').toJsonObject();
	param.flag = $('input:radio[name="flag"]:checked').val();
	if($('#status').prop("checked") == true){param.status = 1}else{param.status = 0}
	var ac_jc = param.id == '' ? 'auth_add' : 'auth_update';
	initialObj.saveAndCloseTotherstorageClass(param,ac_jc,function(data){
		if($.ac_jc(data)) return false;  //判断权限
		
		var str = data.data.str;
		if(str == undefined){
			$.zxsaas_plus.showalert("","异常操作!");
		}else{
			if(str == 'noPass'){
				$.zxsaas_plus.showalert("提示信息","名称、编码不能重复!");
				return false;
			}
			$.zxsaas_plus.showalert("",str);
			queryInpayClass();
		}
		$('#saveOrUpdateModal').modal('hide');
	});
}

/*******************************修改赋值********************************/
function assignment(gridData){
	$('#companyName').val('自动生成');
	if(gridData.flag == '入库'){$('#inlineRadio1').prop("checked",true);}else{$('#inlineRadio2').prop("checked",true);}
	$('#code').val(gridData.code);
	$('#inpayClassName').val(gridData.name);
	switch (gridData.inpayTar){ 
	case "无" : $('#inpayTar').val(-1); break; 
	case "员工" : $('#inpayTar').val(1); break; 
	case "部门" : $('#inpayTar').val(2); break; 
	case "外部单位" : $('#inpayTar').val(3); break; 
	default : $('#inpayTar').val(-1); break; 
	} 
	$("#remark").val(gridData.remark);
	if(gridData.status == "√" || gridData.status == true){$("#status").prop("checked",true);}else{$("#status").prop("checked",false);}
	$('#inpayClassId').val(gridData.id);
	$('#groupId').val(gridData.groupId);
	$('#companyId').val(gridData.companyId);
	$('#createUid').val(gridData.createUid);
	$("#createTimeStr").val(gridData.createTime);
}

/***************************清空表单初始化***********************************/
function initClearForm(){
	$('#companyName').val('自动生成');
	$("input[name='inlineRadioOptions']").prop('checked','false');
	$('#code').val('');
	$('#inpayClassName').val('');
	$('#remark').val('');
	$('#status').prop("checked",false);
	$('#inpayClassId').val(null);
	$('#groupId').val(null);
	$('#companyId').val(null);
	$('#createUid').val(null);
	$('#createTimeStr').val('');
}

/*******************************启用、禁用、删除**********************************/
function disOrEnTotherstorageClass(num){
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
			$.zxsaas_plus.showalert("错误","请勾选仓库后再删除!");
		}
		return false;
	}else{
		
		//弹窗提醒
		if(num == 0){
			$.zxsaas_plus.showconfirm("","是否确定启用选中数据?",function(){
				initialObj.disOrEnTotherstorageClass(ids,status,'auth_update', function(data){
					if($.ac_jc(data)) return false;  //判断权限
					
					var str = data.data.str;
					$.zxsaas_plus.showalert("",str);
				});
				queryInpayClass();
			},function(){
				
			});
		}else if(num == 1){
			$.zxsaas_plus.showconfirm("","是否确定禁用选中数据?",function(){
				initialObj.disOrEnTotherstorageClass(ids,status,'auth_update', function(data){
					if($.ac_jc(data)) return false;  //判断权限
					
					var str = data.data.str;
					$.zxsaas_plus.showalert("",str);
				});
				queryInpayClass();
			},function(){
				
			});
		}else if(num == 2){
			$.zxsaas_plus.showconfirm("","是否确定删除选中数据?",function(){
				initialObj.disOrEnTotherstorageClass(ids,status,'auth_delete', function(data){
					if($.ac_jc(data)) return false;  //判断权限
					
					var str = data.data.str;
					$.zxsaas_plus.showalert("",str);
				});
				queryInpayClass();
			},function(){
				
			});
		}
	}
}
/*出入库方式查询*/
$(document).on("click",".Zpercent input[name='selFlag']",function(){
	queryInpayClass();
});
		
/*******************************条件查询***********************************/
function queryInpayClass(){
    $("#jqGrid_blocMessage").jqGrid('setGridParam',{
        url:basePath + "/jxc/authority/tOtherstorageClass/findOtherstorageClass",
        postData:getParam(), //发送数据
        page:1 
    }).trigger("reloadGrid"); //重新载入 
}
function  getParam() {
    var param = new Object();
    param.queryText = $("#queryText").val();
    param.selFlag = $('input:radio[name="selFlag"]:checked').val();
    if($("#selStatus").prop("checked") == true){param.selStatus = 1}else{param.selStatus = 0}
    param.sortColumns='code';
    return param;
}


function loadmodal(){
		var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl: basePath + "/jxc/authority/tOtherstorageClass/findOtherstorageClass",
		GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
		DelRowUrl: "", // 删除信息接口地址
		isSub:"",//是否有子级表格
		subLoadTableUrl:"",//子级表格数据来源地址
		TableName: "#jqGrid_blocMessage", //显示表格名称。遵照css选择器书写
		iconJsonUrl:"../json/icon.json",
		btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
		pager:"#jqGridPager"
		};
		$("#datetimepickerStart").datetimepicker({
		  lang:"ch",           //语言选择中文
	      format:"Y-m-d",      //格式化日期
	      timepicker:false,    //关闭时间选项
	      todayButton:false    //关闭选择今天按钮
		});
		
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
			//var toggleflag=false;//冻结时候切换用
			var colNames = ['公司名称','出/入库类型','出/入库编码','出/入库名称','是否禁用','备注','新增人','新增时间','修改人','修改时间','id','集团id','公司id','编码','新增人'];
			var JqGridColModel=[
								{name:'companyName',index:'companyName',align:'center',sortable:false},
								{name:'flag',index:'flag',align:'center',formatter:'select', editoptions:{value:"0:入库;1:出库"},sortable:false},
								{name:'code',index:'code',align:'center',sortable:false},
								{name:'name',index:'name',align:'center',sortable:false},
								{name:'status',index:'status',align:'center',formatter:formatStatus,sortable:false},
								{name:'remark',index:'remark',align:'center',sortable:false},
								{name:'createName',index: 'createName' ,sortable:false},  
				                {name:'createTimeString',index: 'createTimeString' ,sortable:false},  
				                {name:'updateName',index: 'updateName' ,sortable:false},  
				                {name:'updateTimeString',index: 'updateTimeString' ,sortable:false},
				                {name:'id',index:'id', align:'center',hidden:true,sortable:false},
				                {name:'groupId',index:'groupId', align:'center',hidden:true,sortable:false},
				                {name:'companyId',index:'companyId', align:'center',hidden:true,sortable:false},
				                {name:'code',index:'code', align:'center',hidden:true,sortable:false},
				                {name:'createUid',index:'createUid', align:'center',hidden:true,sortable:false},
			                ];
			
			loadtable();
		//加载表格
		
			function loadtable(){
					$(options.TableName).jqGrid({
                        url:options.LoadTableUrl,
                        postData:getParam(),
                        sortorder:'desc',
						mtype:"POST",
						datatype: "json",
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
			            rowList: [20, 25, 40],
			            pager:options.pager,
			            viewrecords: true,		           
			            multiselect:true,
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
							var colName=$(options.TableName).jqGrid('getGridParam','colModel')[index].name 
					      	select_name=colName
					      	select_index=index;
							//后续可以通过点击的列名称来弹框等
						},
						onSelectRow:function(id){
							if(id!=lastsel&&lastsel!=''){
								$(options.TableName).jqGrid('saveRow',lastsel,{
									aftersavefunc:function(rowid,response ){
									}
									});
							}
							lastsel=id;
							
							var curRowData = $(options.TableName).jqGrid('getRowData', id);
//							var cur = $('#'+id+'>td');  获取元素
							if(curRowData.code == 'PYRK' || curRowData.code == 'PKCK'){
								//禁止选择行
								$(options.TableName).jqGrid("setSelection", id,false);
							}
						},
					    onSelectAll:function(rowid, status) { //点击全选时触发事件
					    	var rowIds = $(options.TableName).jqGrid('getDataIDs')
					    	$(rowIds).each(function(index,yu){
					    		var curRowData = $(options.TableName).jqGrid('getRowData',yu);
					    		if(curRowData.code == 'PYRK' || curRowData.code == 'PKCK'){
					    			//禁止选择行
					    			$(options.TableName).jqGrid("setSelection", yu,false);
					    		}
					    	});
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
                queryInpayClass()
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
			
			//收支类别隐藏显示
			//  0        收入
			//  1        支出
			
			
			
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
		

