/*收付款类别表.js*/

var companyName = '';
$(function(){
    $('#queryText').attr('placeholder','输入类型名称、编码和备注')
	initialObj = new InitialObj(basePath);
	loadmodal();
	$("#code,#name").focus(function(e){
		$(this).next().html('');
	});
})
		
		;$(function (){
		  $('.multi_select').MSDL({
		    'width': '180',
		    'data': ['老司机1号','老司机2号','老司机3号','老司机4号','老司机5号','老司机6号','老司机7号','老司机8号','老司机9号'],
		    'ids': ['001','002','003','004','005','006','007','008','009']
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
		$('#flag0').prop('checked',"checked");
		$('#myModalLabel').html('内部往来类型新增');
		$('.butHide').show();
		$('#saveOrUpdateModal').modal('show');
		$('#intrabranchObj').val(1);
		
	}else if(num == 2){
		//修改
		$('#myModalLabel').html('内部往来类型修改');
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
			console.log(gridData.flag);
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
			
			if(gridData.intrabranchObj == '职员'){
				$('#intrabranchObj').val(1);
			}else if(gridData.intrabranchObj == '部门'){
				$('#intrabranchObj').val(2);
			}
			
			$('#saveOrUpdateModal').modal('show');
		}
	}
}

/*****************************保存并新增**********************************/
function saveAndAddPayReceiveClass(){
	var na = $('#name').val(),
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
	if($('#status').prop("checked") == true){
		param.status = 1
	}
	else{
		param.status = 0
	}
	initialObj.saveAndClosePayReceiveClass(param,function(data){
		var str = data.data.str;
		if(str == undefined){
			$.zxsaas_plus.showalert("","异常操作!");
		}else{
			if(str == 'noPass'){
				$.zxsaas_plus.showalert("提示信息","名称、编码不能重复!");
				return false;
			}
			$.zxsaas_plus.showalert("",str);
			queryPayReceiveClass();
		}
		//清空表单
		$('#saveOrUpdateForm').clearForm(true);
		$('#flag0').prop('checked',"checked");
		$('#companyName').val(companyName);
	});
}

/*****************************保存并关闭**********************************/
function saveAndClosePayReceiveClass(){
	var na = $('#name').val(),
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
	initialObj.saveAndClosePayReceiveClass(param,function(data){
		var str = data.data.str;
		if(str == undefined){
			$.zxsaas_plus.showalert("","异常操作!");
		}else{
			if(str == 'noPass'){
				$.zxsaas_plus.showalert("提示信息","名称、编码不能重复!");
				return false;
			}
			$.zxsaas_plus.showalert("",str);
			queryPayReceiveClass();
		}
		$('#saveOrUpdateModal').modal('hide');
	});
	
}

/*******************************修改赋值********************************/
function assignment(gridData){
	$('#companyName').val('自动生成');
	if(gridData.flag == '收入'){$('#inlineRadio1').prop("checked",true);}else{$('#inlineRadio2').prop("checked",true);}
	$('#code').val(gridData.code);
	$('#payReceiveClassName').val(gridData.name);
	$("#remark").val(gridData.remark);
	if(gridData.status == "√" || gridData.status == true){$("#status").prop("checked",true);}else{$("#status").prop("checked",false);}
	$('#payReceiveClassId').val(gridData.id);
	$('#groupId').val(gridData.groupId);
	$('#companyId').val(gridData.companyId);
	$('#createBy').val(gridData.createBy);
	$("#createDateStr").val(gridData.createTime);
}

/***************************清空表单初始化***********************************/
function initClearForm(){
	$('#companyName').val('自动生成');
	$("input[name='inlineRadioOptions']").prop('checked','false');
	$('#code').val('');
	$('#payReceiveClassName').val('');
	$('#remark').val('');
	$('#status').prop("checked",false);
	$('#payReceiveClassId').val(null);
	$('#groupId').val(null);
	$('#companyId').val(null);
	$('#createBy').val(null);
	$('#createDateStr').val('');
}

/*******************************启用、禁用、删除**********************************/
function disOrEnPayReceiveClass(num){
	//批量启用0、禁用1、删除2
	//修改对应标志
	var status;
	if(num == 0){ status = 0; }else if(num == 1){ status = 1; }else if(num == 2){ status = 2;}
	var ids = $("#jqGrid_blocMessage").jqGrid('getGridParam','selarrrow');//选中的行ids
	var len = ids.length;
	//至少选中一行
	if(len == 0){
		if(num == 0){
			$.zxsaas_plus.showalert("错误","请勾选数据，再点击启用！");
		}else if(num == 1){
			$.zxsaas_plus.showalert("错误","请勾选数据，再点击禁用！");
		}else if(num == 2){
			$.zxsaas_plus.showalert("错误","请勾选数据，再点击删除！");
		}
		return false;
	}else{
		
		//弹窗提醒
		if(num == 0){
			$.zxsaas_plus.showconfirm("","是否确定启用选中数据?",function(){
				initialObj.disOrEnPayReceiveClass(ids,status, function(data){
					var str = data.data.str;
					$.zxsaas_plus.showalert("",str);
					queryPayReceiveClass();
				});
			},function(){
				
			});
		}else if(num == 1){
			$.zxsaas_plus.showconfirm("","是否确定禁用选中数据?",function(){
				initialObj.disOrEnPayReceiveClass(ids,status, function(data){
					var str = data.data.str;
					$.zxsaas_plus.showalert("",str);
					queryPayReceiveClass();
				});
			},function(){
				
			});
		}else if(num == 2){
			$.zxsaas_plus.showconfirm("","是否确定删除选中数据?",function(){
				initialObj.disOrEnPayReceiveClass(ids,status, function(data){
					var str = data.data.str;
					$.zxsaas_plus.showalert("",str);
					queryPayReceiveClass();
				});
			},function(){
				
			});
		}
	}
}
/*	切换收入支出收付款类别*/
$(document).on("click","input[name='selFlag']",function(){
	queryPayReceiveClass();
	
});
		
/*******************************条件查询***********************************/
function queryPayReceiveClass(){
	$("#jqGrid_blocMessage").jqGrid('setGridParam',{
        url:basePath + "/jxc/funds/tpayReceiveClass/findPayReceiveClass",
        postData:getParam(), //发送数据
        page:1 
    }).trigger("reloadGrid"); //重新载入 
}
function getParam() {
    var param = new Object();
    param.queryText = $("#queryText").val();
    param.selFlag = $('input:radio[name="selFlag"]:checked').val();
    if($("#selStatus").prop("checked") == true){param.selStatus = 1}else{param.selStatus = 0}
    param.sortColumns='code';
    return param
}

function loadmodal()
			{
		var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl: basePath + "/jxc/funds/tpayReceiveClass/findPayReceiveClass",
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
			var colNames = ['公司名称','类型编码','收支类型','类型名称','是否禁用','备注','新增人','新增时间','修改人','修改时间','往来对象','id','集团id','公司id','编码','新增人'];
			var JqGridColModel=[
								{name:'companyName',index:'companyName',align:'center',sortable:false},
								{name:'code',index:'code',align:'center',sortable:false},
								{name:'flag',index:'flag',align:'center',formatter:'select', editoptions:{value:"0:收入;1:支出"},sortable:false,hidden:true},
								{name:'name',index:'name',align:'center',sortable:false},
								{name:'status',index:'status',align:'center',formatter:formatStatus,sortable:false},
								{name:'remark',index:'remark',align:'center',sortable:false},
								{name:'createName',index: 'createName' ,sortable:false},  
				                {name:'createDateString',index: 'createDateString' ,sortable:false},  
				                {name:'updateName',index: 'updateName' ,sortable:false},  
				                {name:'updateDateString',index: 'updateDateString' ,sortable:false},
				                {name:'intrabranchObj',index: 'intrabranchObj' ,sortable:false,formatter:'select',editoptions:{value:"1:职员;2:部门"}},
				                {name:'id',index:'id', align:'center',hidden:true,sortable:false},
				                {name:'groupId',index:'groupId', align:'center',hidden:true,sortable:false},
				                {name:'companyId',index:'companyId', align:'center',hidden:true,sortable:false},
				                {name:'code',index:'code', align:'center',hidden:true,sortable:false},
				                {name:'createBy',index:'createBy', align:'center',hidden:true,sortable:false},
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
						var rec = $(options.TableName).jqGrid('getRowData', id);
						
						},
						
						beforeSelectRow:function(rowid,e){

						},
						afterInsertRow: function (rowid, aData) { //新增一行之后

						},
						gridComplete: function() {
							var ids=$(options.TableName).jqGrid("getDataIDs");

						},
						loadComplete:function(data){
							companyName = data.data.companyName;
						},
						loadError:function(xhr,status,error){
						}
						})
		
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
		

