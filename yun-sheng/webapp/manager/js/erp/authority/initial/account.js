var companyName = '';
var groupName = '';
var accounTypeCode="";//账户类型
$(function(){
	initialObj = new InitialObj(basePath);
	loadmodal();
	initFindAccounType();
    loadDataTreeDom();
    loadmodal2();
	//initFindBankName();
	$("#accounTypeCode,#code,#name").focus(function(e){
		$(this).next().html('');
	});
    $("#queryText").bind('keyup',function (event) {
		if(event.keyCode==13){
            queryAccount();
		}
    })
    
  //导出
    $("#export").click(function(){
    	var selStatus;
    	queryText = $.trim($("#queryText").val()).toUpperCase();
    	if($("#selStatus").prop("checked") == true){
    		selStatus = 1
    	}else{
    		selStatus = 0
    	}
    	 window.location.href= "/manager/jxc/authority/terpAccount/export?queryText="
    		 +queryText+"&selStatus="+selStatus+"&accounTypeCode="+accounTypeCode;
    });
});
//加载 左边树
function loadDataTreeDom(){
    var obj={
    	data:{containsVipAccount:1},
        success:function(data){
            var nodes = data.data.dataList||[];
            for(var i=0;i<nodes.length;i++){
                nodes[i].pId=nodes[i].parentId
            }
            var treeObj = $.fn.zTree.init($("#TreeDom"),
                {data: {simpleData: {enable: true}},
                    view: {
                        showLine: true
                    },
                    callback:{
                        onClick: function(event, treeId, treeNode){
                            accounTypeCode=$.trim(treeNode.code);
                            queryAccount();
                        }
                    }
                },nodes);
            treeObj.expandAll(true);
		}
	}
    InterfaceInventory.account.getAccountClassTreeNodeVoList(obj);
}

/**
 *
 * @note 查询
 * @return
 */
function searchData(){
    var paras = getQueryModel();
    $("#companySubjectTable").jqGrid("setGridParam", { postData: paras,page:1}).trigger("reloadGrid");
}


/***init 账户类型***/
function initFindAccounType(){
	var selectHtml = '';
	initialObj.initFindAccounType(function(data){
		var list = data.data.rows;
		$(list).each(function(index,yu){
			selectHtml += '<option value="'+yu.code+'">'+yu.accounType+'</option>'
		});
	});
	$('#accounTypeCode').append(selectHtml);
}

/***init 银行名称***/
//function initFindBankName(){
//	var selectHtml = '';
//	initialObj.initFindBankName(function(data){
//		var list = data.data.rows;
//		$(list).each(function(index,yu){
//			selectHtml += '<option value="'+yu.code+'">'+yu.bankName+'</option>'
//		});
//	});
//	$('#bankNameCode').append(selectHtml);
//}

/************************新增、修改弹窗********************************/
function modalsaveOrUpdate(num){
	$("#jqGrid_section").resize()
	$('#accounTypeCode').next().html('');
	$('#code').next().html('');
	$('#name').next().html('');
	//num  1.新增     2.修改
	if(num == 1){
		//清空表单
		$('#saveOrUpdateForm').clearForm(true);
		$('#groupName').val(groupName);
		$('#companyName').val(companyName);
		$('#saveOrUpdateModal').modal('show');
		$('#myModalLabel').html('资金账户新增');
		$('.butHide').show();
	}else if(num == 2){
		//修改
		$('#myModalLabel').html('资金账户修改');
		$('.butHide').hide();
		//判断选中
		var ids = $("#jqGrid_blocMessage").jqGrid('getGridParam','selarrrow');//选中的行id
		var len = ids.length;
		if(len == 0){
			$.zxsaas_plus.showalert("错误","请勾选一行数据!");
			return false;
		}else if(len > 1){
			$.zxsaas_plus.showalert("错误","一次只能修改一条信息!");
			return false;
		}else if(len == 1){
			var gridData = $("#jqGrid_blocMessage").jqGrid("getRowData",ids);//获取被选中的一行数据
			//获取部门信息
			$("#jqGrid_section").jqGrid("setGridParam", {
				datatype:'json',
				postData:{id: ids[0]},
			    page:1 
				}).trigger("reloadGrid");
			
			//赋值表头
			var params = $('#saveOrUpdateForm').formToArray();
			$(params).each(function(index,element){
				var key = element.name; 
				var value = eval("gridData."+key);
				$('#'+key).val(value);
			});
			if($('#accounTypeCode').val() == '' || $('#accounTypeCode').val() == null){
				$('#accounTypeCode').val(gridData.accounTypeCode);
			}
			if($('#bankNameCode').val() == '' || $('#bankNameCode').val() == null){
				$('#bankNameCode').val(gridData.bankNameCode);
			}
            if($('#accessToken').val() == '' || $('#accessToken').val() == null){
                $('#accessToken').val(gridData.accessToken);
            }
			if(gridData.status == '√'){
				$('#status').prop('checked',true);
			    $('#status').val('1');
			}else{
				$('#status').prop('checked',false);
			    $('#status').val('0');
			}
			var params2 = $('#saveOrUpdateForm').formToArray();
			$('#saveOrUpdateModal').modal('show');
		}
	}
}

/*****************************保存并新增**********************************/
function saveAndAddAccount(){
    saveTable(0)
}

/*****************************保存并关闭**********************************/
function saveAndCloseAccount(){
    saveTable(1)
}

function saveTable(flag) {
    var cla = $('#accounTypeCode').val(),
        na = $('#name').val(),
        code = $('#code').val();
    if(cla == null || cla == ''){
        $('#accounTypeCode').next().html('必填!');
        return;
    }
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
    if($('#status').prop("checked") == true){param.status = 1}else{param.status = 0}

    if($('#swipeHighLines').val() == ''){
        param.swipeHighLines = 0;
    }
    if($('#swipeLowLines').val() == ''){
        param.swipeLowLines = 0;
    }
    if($('#swipeFees').val() == ''){
        param.swipeFees = 0;
    }
    if($('#swipeFeesHigh').val() == ''){
        param.swipeFeesHigh = 0;
    }
    if($('#swipeFeesLow').val() == ''){
        param.swipeFeesLow = 0;
    }
    //保存部门
    var ids = $("#jqGrid_section").jqGrid('getDataIDs');
    param.sectionIds = ids;
    var ac_jc = param.id == '' ? 'auth_add' : 'auth_update';
    initialObj.saveAndCloseAccount(param,ac_jc, function(data){
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
            queryAccount();
            if(flag==0){
				//清空表单
                $('#saveOrUpdateForm').clearForm(true);
                $('#groupName').val(groupName);
                $('#companyName').val(companyName);
			}else{
                $('#saveOrUpdateModal').modal('hide');
			}
        }

    });
}

/*******************************条件查询***********************************/
function queryAccount(){
	var param = new Object();
	param.queryText = $.trim($("#queryText").val()).toUpperCase();
	if($("#selStatus").prop("checked") == true){
		param.selStatus = 1
	}else{
		param.selStatus = 0
	}
    param.accounTypeCode=accounTypeCode;
	$("#jqGrid_blocMessage").jqGrid('setGridParam',{ 
        url:basePath + "/jxc/authority/terpAccount/findTaccount",
        postData:param, //发送数据 
        page:1 
    }).trigger("reloadGrid"); //重新载入 
}

/*******************************启用、禁用、删除**********************************/
function disOrEnAccount(num){
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
				initialObj.disOrEnAccount(ids,status,'auth_update', function(data){
					//if($.ac_jc(data)) return false;  //判断权限
					var str = data.desc;
					$.zxsaas_plus.showalert("",str);
					queryAccount();
				});
			},function(){
				
			});
		}else if(num == 1){
			$.zxsaas_plus.showconfirm("","是否确定禁用选中数据?",function(){
				var newIds = [];
				$.each(ids,function(){
					var rowData = $('#jqGrid_blocMessage').jqGrid('getRowData',arguments[1]);
					(rowData.accounType != '积分抵现' && rowData.accounType != '会员储值') && newIds.push(rowData.id)
				});
			   if(ids.length == newIds.length){
					initialObj.disOrEnAccount(ids,status,'auth_update', function(data){
						var str = data.desc;
						$.zxsaas_plus.showalert("",str);
						queryAccount();
					});
				}else{
					$.zxsaas_plus.showalert("",'积分抵现、会员储值类型账户不能禁用!');
				}
			},function(){
				
			});
		}else if(num == 2){
			$.zxsaas_plus.showconfirm("","是否确定删除选中数据?",function(){
				var newIds = [];
				$.each(ids,function(){
					var rowData = $('#jqGrid_blocMessage').jqGrid('getRowData',arguments[1]);
					(rowData.accounType != '积分抵现' && rowData.accounType != '会员储值') && newIds.push(rowData.id)
				});
				if(ids.length != newIds.length && newIds.length != 0){
					initialObj.disOrEnAccount(newIds,status,'auth_delete', function(data){
						var str = data.data.str;
							$.zxsaas_plus.showalert("",'删除成功!所选项中包含的积分抵现、会员储值类型账户不能删除!');
						queryAccount();
					});
				}else if(ids.length == newIds.length){
					initialObj.disOrEnAccount(newIds,status,'auth_delete', function(data){
						var str = data.desc;
						$.zxsaas_plus.showalert("",str);
						queryAccount();
					});
				}else{
					$.zxsaas_plus.showalert("",'积分抵现、会员储值类型账户不能删除!');
				}
			},function(){
				
			});
		}
	}
}


/***************************表格******************************/
function loadmodal(){
		var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl: basePath + "/jxc/authority/terpAccount/findTaccount",
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
			//var toggleflag=false;//冻结时候切换用
			var colNames = ['公司名称','账户编码','账户类型','账户名称','刷卡手续费','刷卡最高额','刷卡手续费顶额','刷卡最低额','最低手续费','开户行','银行户名','银行账号','是否禁用','备注','新增人','新增时间','修改人','修改时间','id','账户类型id','公司id','集团id','新增人id','银商商户号',' 银商终端号','accessToken'];
			var JqGridColModel=[  
				                { name: 'companyName', index: 'companyName' ,sortable:false},  
				                { name: 'code', index: 'code',sortable:false},  
				                { name: 'accounType', index: 'accounType' ,sortable:false},  
				                { name: 'name', index: 'name' ,sortable:false},  
				                { name: 'swipeFees', index: 'swipeFees' ,sortable:false},  
				                { name: 'swipeHighLines', index: 'swipeHighLines' ,sortable:false},  
				                { name: 'swipeFeesHigh', index: 'swipeFeesHigh' ,sortable:false},  
				                { name: 'swipeLowLines', index: 'swipeLowLines' ,sortable:false},  
				                { name: 'swipeFeesLow', index: 'swipeFeesLow' ,sortable:false},  
				                { name: 'bankNameCode' , index: 'bankNameCode',sortable:false},//开户行（银行名称）
				                { name: 'customer', index: 'customer' ,sortable:false},  
				                { name: 'bankCard', index: 'bankCard' ,sortable:false},  
				                { name: 'status', index: 'status',formatter:formatStatus ,sortable:false},  
				                { name: 'remark', index: 'remark' ,sortable:false},  
				                { name: 'createName', index: 'createName' ,sortable:false},  
				                { name: 'createTimeString', index: 'createTimeString' ,sortable:false},  
				                { name: 'updateName', index: 'updateName' ,sortable:false},  
				                { name: 'updateTimeString', index: 'updateTimeString' ,sortable:false},
				                { name: 'id' , index: 'id' ,hidden:true,sortable:false},
				                { name: 'accounTypeCode' , index: 'accounTypeCode' ,hidden:true,sortable:false},
				                { name: 'companyId' , index: 'companyId' ,hidden:true,sortable:false},
				                { name: 'groupId' , index: 'groupId' ,hidden:true,sortable:false},
				                { name: 'createUid' , index: 'createUid' ,hidden:true,sortable:false},
								{ name: 'merchantCode' , index: 'createUid' ,hidden:true,sortable:false},
								{ name: 'terminalCode' , index: 'createUid' ,hidden:true,sortable:false},
                { name: 'accessToken' , index: 'accessToken' ,hidden:true,sortable:false},
				            ];
			loadtable();
		//加载表格
		
			function loadtable(){
					$(options.TableName).jqGrid({
						url:options.LoadTableUrl,
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
			            rowList: [4,20, 25, 40],
			            pager:options.pager,
			            viewrecords: true,		           
			            multiselect:true,
			            width: "100%" ,
			            height: $(window).height()*0.65,
						autowidth:true,
						rownumWidth: 35, // the width of the row numbers columns
						shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
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
	//						var cur = $('#'+id+'>td');  获取元素
							if(curRowData.code == 'JFDX' || curRowData.code == 'HYCZ'){
								//禁止选择行
								$(options.TableName).jqGrid("setSelection", id,false);
							}
						},
						onSelectAll:function(rowid, status) { //点击全选时触发事件
					    	var rowIds = $(options.TableName).jqGrid('getDataIDs');
					    	$(rowIds).each(function(index,yu){
					    		var curRowData = $(options.TableName).jqGrid('getRowData',yu);
					    		if(curRowData.code == 'JFDX' || curRowData.code == 'HYCZ'){
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
							groupName = data.data.groupName;
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

/*
 * 验证 
 */
$(document).on('blur','#swipeHighLines,#swipeLowLines',function(e){
	var l = $('#swipeLowLines').val();
	var h = $('#swipeHighLines').val();
	if(l * 1 > h * 1){
		$.zxsaas_plus.showalert('提示','刷卡最低额应小于刷卡最高额');
		$(this).val('').focus();
	}
});	

$(document).on('blur','#swipeFeesHigh,#swipeFeesLow',function(e){
	var l = $('#swipeFeesLow').val();
	var h = $('#swipeFeesHigh').val();
	var f = $('#swipeFees').val();  
	if(l != '' && h != '' && f != ''){
		if(l * 1 > h * 1){
			$.zxsaas_plus.showalert('提示','最低手续费应小于最高手续费!');
			$(this).val('').focus();
		}
	}
	
});	
$('#SelFilterInName').click(function(){
	$("#hiddenFilterInName").next('.showModalBtn').trigger('click')
})



$("#hiddenFilterInName").comModalsSection({multiselect:true,clickback:function(infoList){
	//todo
	var ids = $("#jqGrid_section").jqGrid('getDataIDs');
	for(var i=0;i<infoList.length;i++){
		if(ids.length>0){
			var flag = 0;
			for(var j=0;j<ids.length;j++){
				if(ids[j]==infoList[i].dataId){
					flag = 1;
				}
			}
			if(flag == 0){
				$("#jqGrid_section").jqGrid("addRowData",infoList[i].dataId,{sectionId:infoList[i].dataId, 
					code:infoList[i].code,name:infoList[i].name});
			}
		}else{
			$("#jqGrid_section").jqGrid("addRowData",infoList[i].dataId,{sectionId:infoList[i].dataId, 
				code:infoList[i].code,name:infoList[i].name});
		}
		
	}
	$("#hiddenFilterInName").data('id','')
}})


/***************************部门表格******************************/
function loadmodal2(){
		var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl: basePath + "/jxc/authority/terpAccount/selectAccountSectionInfo",
		GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
		DelRowUrl: "", // 删除信息接口地址
		isSub:"",//是否有子级表格
		subLoadTableUrl:"",//子级表格数据来源地址
		TableName: "#jqGrid_section", //显示表格名称。遵照css选择器书写
		iconJsonUrl:"../json/icon.json",
		btnbox: ".btnbox "//功能按钮存放容器。遵照css选择器书写	
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
			var colNames = ['操作','部门id','部门编码','部门名称'];
			var JqGridColModel=[  
			                    { name: 'ids',width:80,formatter:formatterOp},
				                { name: 'sectionId',hidden: true,key:true},  
				                { name: 'code',width:180},  
				                { name: 'name',width:180},  
				            ];
			loadtable();
		//加载表格
		
			function loadtable(){
					$(options.TableName).jqGrid({
						url:options.LoadTableUrl,
						mtype:"POST",
						datatype: "json",
						jsonReader  : {	
						  root: "data.dataList"
						},
						 rownumbers:true,	//显示行号
						colNames:colNames,          
			            colModel:JqGridColModel,
			           
			            viewrecords: true,		           
			            width: "100%" ,
			            height: 272,
						autowidth:true,
						rownumWidth: 35, // the width of the row numbers columns
						shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
						ondblClickRow:function(id){
						//双击进入编辑
			   				var delid = id;
			   				
						},
						gridComplete: function() {
							var ids=$(options.TableName).jqGrid("getDataIDs");

						},
					})
			}

}

function formatterOp(cellvalue, options, rowObject){
	return '<a class="btn" onclick="delGoodsGrand('+(options.rowId)+')"><i class="glyphicon glyphicon-trash"></i></a>';
}


//删除部门
function delGoodsGrand(id){
	//删除
    $("#jqGrid_section").jqGrid('delRowData', id);
}










