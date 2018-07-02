var companyName = '';
// var defaultinpayClassId='';// 默认结算差额收支类别
$(function(){
	initialObj = new InitialObj(basePath);
	loadmodal();
	initCoUpOnName();
	findContactUnit();
    findInpayClass();
	$("#contactUnitIdC,#couponName,#couponCode").focus(function(e){
		$(this).next().html('');
	});

    // $.request({
     //    url: '/manager/jxc/authority/tinpayClass/getTreeForInPayClass',
     //    method:'post',
	// 	success:function (data) {
     //    	data.splice(0,1);
     //    	if(data.length>0){
     //    		if(data[0].children.length>0){
     //                defaultinpayClassId=data[0].children[0].id;
	// 			}
	// 		}
     //        $("#inpayClassId").combotree({
	// 			data:data,
     //            onBeforeSelect : function(node) {
     //                if (!$("#inpayClassId").combotree("tree").tree('isLeaf', node.target)) {
     //                    return false;
     //                }
     //            }
     //        })
     //    }
	// })
	
});

/***button 刷新***/
function onclickRefresh(){
	location.reload();
}

//清空结算差额收支类别
// function clearinpayClassId(){
// 	$("#inpayClassId").combotree('clear')
// }

/***init 券类型***/
function initCoUpOnName(){
	var coUpOnNameList = [];
	var coUpOnCodeList = [];
	$('.multi_select').html('');
	var selStatus = $("#selStatus").prop("checked") == true ? 1:0;
	initialObj.initCoUpOnName(selStatus,function(data){
		var list = data.data.rows;
		$(list).each(function(index,element){
			coUpOnNameList.push(element.couponName);
			coUpOnCodeList.push(element.couponCode);
		});
		//下拉框
		$('.multi_select').MSDL({
		    'width': '180',
		    'data': coUpOnNameList,	
		    'ids': coUpOnCodeList
		});
	});
}

/***init 往来单位***/
function findContactUnit(){
$('#contactUnitIdC').contactUnitPlu({
    search:false,
    getCouponName:function(){

	}
});

}

/***init 结算差额收支类别***/
function findInpayClass(){
    $('#inpayClassName').comModalsInpayClass({
        search:false,
		type:-1,
        clickback:function () {
            var obj= $("input[name='inpayClassName']");
            //设置编辑器值
            $("input[name='inpayClassName']").val(obj.val());
            $("input[name='inpayClassId']").val(obj.data('id'));
        }
    });

}
		
/************************新增、修改弹窗********************************/
function modalsaveOrUpdate(num){
	$('#contactUnitIdC').next().html('');
	$('#couponName').next().html('');
	$('#couponCode').next().html('');
	//num  1.新增     2.修改
	if(num == 1){
		//清空表单
        clearAddModal()
		$('#saveOrUpdateModal').modal('show');
		$('#myModalLabel').html('第三方抵扣项新增');
		$('.butHide').show();
	}else if(num == 2){
        // $('#inpayClassId').combotree('setValue', defaultinpayClassId);
		//修改
		$('#myModalLabel').html('第三方抵扣项修改');
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
			$('#contactUnitIdC').val(gridData.contactName).data('contactUnitId',gridData.contactUnitId);
            $('#inpayClassName').val(gridData.inpayClassName).data('contactUnitId',gridData.inpayClassId);
            // $('#inpayClassId').combotree('setValue', gridData.inpayClassId);
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
	var cla = $('#contactUnitIdC').data('contactUnitId'),
		na = $('#couponName').val(),
		code = $('#couponCode').val();
	if(cla == null || cla == ''){
		$('#contactUnitIdC').next().html('必填!');
		return;
	}
	if(na == ''){
		$('#couponName').next().html('必填!');
		return;
	}
	if(code == ''){
		$('#couponCode').next().html('必填!');
		return;
	}
	//调用存储方法
	var param = $('form').toJsonObject();
    param.contactUnitId=cla;
	if($('#status').prop("checked") == true){param.status = 1}else{param.status = 0}
	initialObj.saveAndCloseIcoUpOn(param,'auth_add',function(data){
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
			findData();
			initCoUpOnName();
			//清空表单
            clearAddModal()
		}
	});
}

function  clearAddModal() {
    //清空表单
    $('#couponName,#couponCode,#remCode,#remark').val('')
    $('#contactUnitIdC').val('').removeData();
    $('#inpayClassName').val('').removeData();
    // $('#inpayClassId').combotree('setValue', defaultinpayClassId);
    $('#companyName').val(companyName);
}

/*****************************保存并关闭**********************************/
function saveAndCloseIcoUpOn(){
	var cla = $('#contactUnitIdC').data('contactUnitId'),
		na = $('#couponName').val(),
		code = $('#couponCode').val();
	if(cla == null || cla == ''){
		$('#contactUnitIdC').next().html('必填!');
		return;
	}
	if(na == ''){
		$('#couponName').next().html('必填!');
		return;
	}
	if(code == ''){
		$('#couponCode').next().html('必填!');
		return;
	}
	//调用存储方法
	var param = $('form').toJsonObject();
    param.contactUnitId=cla;
	if($('#status').prop("checked") == true){param.status = 1}else{param.status = 0}
	var ac_jc = param.id == '' ? 'auth_add' : 'auth_update';
	initialObj.saveAndCloseIcoUpOn(param,ac_jc,function(data){
		if($.ac_jc(data)) return false;  //判断权限
		
		var str = data.data.str;
		if(str == undefined){
			$.zxsaas_plus.showalert("","异常操作!");
		}else{
			if(str == 'noPass'){
				$.zxsaas_plus.showalert("提示信息","名称、编码不能重复!");
				return false;
			}
			$.zxsaas_plus.showalert("提示信息",str);
			findData();
			initCoUpOnName();
		}
		$('#saveOrUpdateModal').modal('hide');
	});
}

/*******************************启用、禁用、删除**********************************/
function disOrEnIcoUpOn(num){
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
				initialObj.disOrEnIcoUpOn(ids,status,'auth_update', function(data){
					if($.ac_jc(data)) return false;  //判断权限
					
					var str = data.data.str;
					$.zxsaas_plus.showalert("",str);
					findData();
				});
			},function(){
				
			});
		}else if(num == 1){
			$.zxsaas_plus.showconfirm("","是否确定禁用选中数据?",function(){
				initialObj.disOrEnIcoUpOn(ids,status,'auth_update', function(data){
					if($.ac_jc(data)) return false;  //判断权限
					
					var str = data.data.str;
					$.zxsaas_plus.showalert("",str);
					findData();
				});
			},function(){
				
			});
		}else if(num == 2){
			$.zxsaas_plus.showconfirm("","是否确定删除选中数据?",function(){
				initialObj.disOrEnIcoUpOn(ids,status,'auth_delete', function(data){
					if($.ac_jc(data)) return false;  //判断权限
					
					var str = data.data.str;
					$.zxsaas_plus.showalert("",str);
					findData();
				});
			},function(){
				
			});
		}
	}
}
		
/*******************************条件查询***********************************/
function findData(){ 
	var param = new Object();
	if($('.hide_text').val() != null && $('.hide_text').val() != undefined && $('.hide_text').val() !=''){
		param.couponCodeStr = $('.hide_text').val();
	}else{
		param.couponCodeStr = null;
	}
	param.queryText =$.trim($("#queryText").val());
	if($("#selStatus").prop("checked") == true){param.selStatus = 1}else{param.selStatus = 0}
    $("#jqGrid_blocMessage").jqGrid('setGridParam',{ 
        url:basePath + "/jxc/authority/icoupon/findIcoupon",
        postData:param, //发送数据
        page:1 
    }).trigger("reloadGrid"); //重新载入 
    initCoUpOnName();
} 
		
function loadmodal(){
		var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl: basePath + "/jxc/authority/icoupon/findIcoupon",
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
			var colNames = ['公司名称','活动名称','活动编码','往来单位','结算差额收支类别','结算差额收支类别id','助记码','是否禁用','备注','新增人','新增时间','修改人','修改时间','id','公司id','集团id','新增人id','往来单位id'];
			var JqGridColModel=[
								{name:'companyName',index:'companyName',sortable:false},
								{name:'couponName',index:'icouponName',sortable:false},
								{name:'couponCode',index:'couponCode',sortable:false},
								{name:'contactName',index:'contactName',sortable:false},
                				{name:'inpayClassName',index:'inpayClassName',sortable:false},
								{name:'inpayClassId',index:'inpayClassId' ,hidden:true,sortable:false},

								{name:'remCode',index:'remCode',sortable:false},
								{name:'status',index:'status',formatter:formatStatus,sortable:false},
								{name:'remark',index:'remark',sortable:false},
								{name:'createName',index:'createName',sortable:false},
								{name:'createDateString',index:'createDateString',sortable:false},
								{name:'updateName',index:'updateName',sortable:false},
								{name:'lastupdateDateString',index:'lastupdateDateString',sortable:false},
								{ name:'id',index:'id', hidden:true,sortable:false},
								{ name:'companyId', index: 'companyId' ,hidden:true,sortable:false},
				                { name:'groupId', index: 'groupId' ,hidden:true,sortable:false},
								{ name:'createBy',index:'createBy', hidden:true,sortable:false},
								{ name:'contactUnitId' , index: 'contactUnitId' ,hidden:true,sortable:false}
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
			            rowList: [2,20, 25, 40],
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
							if($.ac_jc(data)) return false;  //判断权限
							
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
			
		$(document).on("click",".btnbox button[data-eventname='printbtn']",function(event){
			$.zxsaas_plus.showalert("表格打印操作", "表格打印操作咱未完成，敬请期待");
			
		});
		$(document).on("click",".btnbox button[data-eventname='exportTablename']",function(event){
			$.zxsaas_plus.showalert("表格导出操作", "表格导出操作咱未完成，敬请期待");
			
		});
}
		

