//全局变量
var departName = '';


//打印列表
function printTable(){
	var rids=$("#mainGrid").getDataIDs();
	var ids = [];
    $.each(rids,function(i,value){
	  	var row = $("#mainGrid").jqGrid('getRowData', value );
	  	ids.push(row.id);
	});
	voucherPrint(ids.join(','));
}

//打印选中
function printSelected(){
	var selrow = $.selRow();
	if($.showAlert(selrow)) return false;
	
	var ids = '';
	$(selrow).each(function(index,yu){if(ids != '') ids += ',';ids += yu;});
	voucherPrint(ids);
}

//凭证打印函数
function voucherPrint(ids){
    if (ids == "")return;
    var tempKindDIV = $(
        '<fieldset class="fieLeft" id="form3">' +
        '<legend>打印模板类型</legend>' +
        '<div class="">' +
        '<label class="radio-inline"><input type="radio" name="printTempKind" value="A4X2" checked>默认</label>' +
        '</div>' +
        '</fieldset>'
    );
    BootstrapDialog.show({
        title: '凭证打印',
        message: tempKindDIV,
        buttons: [{
            label: '确定', cssClass: 'btn-primary', action: function (dialogItself) {
                dialogItself.close();
                todo();
            }
        },
            {
                label: '取消', action: function (dialogItself) {
                dialogItself.close();
            }
            }]
    });
    function todo() {
        $.printBills(basePath + '/cw/voucherManager/print',
            {
        	    vids: ids,
                tempKind: tempKindDIV.find("input[name='printTempKind']:checked").val()
            }
        );
    }
}


/***select 凭证主查询***/
function selectMainGrid(){
	var formParams = $("#formAjax").serializeObject();
	console.log(formParams);
	$("#mainGrid").jqGrid('setGridParam',{ 
        url: basePath + "/cw/pz/get/voucherData",
        postData:formParams, //发送数据 
        page:1 
    }).trigger("reloadGrid"); //重新载入 
}
/********清空***************/
$(document).on("click",".clearOut",function(){
	window.location.reload();
});

/**********表头菜单***********/
function intiTopOrder(){
	//制单日期
	var today = new Date().toLocaleDateString();
	if($("input[name='choose']:checked").val()=="1"){//制单日期
		$("#voucherDateBeginStr").val(format(today,"yyyy-MM-01"));
		$("#voucherDateBeginStr").attr("title",format(today,"yyyy-MM-01"));
		$("#voucherDateEndStr").val(format(today,"yyyy-MM-dd"));
		$("#voucherDateEndStr").attr("title",format(today,"yyyy-MM-dd"));
	}else{
		$("#yearMonthBeginStr").val(format(today,"yyyy-MM"));
		$("#yearMonthBeginStr").attr("title",format(today,"yyyy-MM"));
		$("#yearMonthEndStr").val(format(today,"yyyy-MM"));
		$("#yearMonthEndStr").attr("title",format(today,"yyyy-MM"));
	}
	
}
/***init tab页切换***/
function initTab(){
	$('#myTab a').click(function (e) {
		switch (e.currentTarget.hash) {
		case '#pzA':
			//全部凭证
			$('#auditorStu').val('');
			$('#cashierStu').val('');
			$('#supervisorStu').val('');
			$('#isPost').val('');
			$('#makeErrorState').val('');
			selectMainGrid();
			break;
		case '#pzB':
			//待审核
			$('#auditorStu').val(0);	
			selectMainGrid();
			break;
		case '#pzC':
			//待出纳签字
			$('#cashierStu').val(0);	
			selectMainGrid();
			break;
		case '#pzD':
			//待主管签字
			$('#supervisorStu').val(0);	
			selectMainGrid();
			break;
		case '#pzE':
			//待记账
			$('#isPost').val(0);
			selectMainGrid();
			break;
		case '#pzF':
			//有错凭证
			$('#makeErrorState').val(1);
			selectMainGrid();
			break;	
		default:
			break;
		}
		e.preventDefault();
		$(this).tab('show');
	});
}

/***init 凭证来源***/
function initDocSourceType(){
	$.ajax({
		url: basePath + '/cw/pz/get/searchDocSourceTypeList',
		type : "get",
		dataType : 'json',
		success:function(data){
			var selectHtml = '';
			$(data).each(function(index,yu){
				selectHtml += '<option value="'+yu.code+'">'+yu.name+'</option>';
			});
			$('#docSourceType').append(selectHtml);
		},
		error: function (msg) {
        }
	}); 	
}

/***init 制单人***/
function initCreateName(){
	$.ajax({
		url: basePath + '/aboutPeople/interfaceManagers',
		type : "get",
		dataType : 'json',
		success:function(data){
			var selectHtml = '';
			$(data.data.rows).each(function(index,yu){
				selectHtml += '<option value="'+yu.id+'">'+yu.name+'</option>';
			});
			$('#createId').append(selectHtml);
			$('#employeeId').append(selectHtml);
		},
		error: function (msg) {
        }
	}); 	
}

/***focus 业务部门***/
$("#depYeName").focus(function(){
	$('#myModalLabel').html('业务部门');
	departName = 'depYeName';
	noAuthority();
});

/***focus 辅助部门***/
$("#departmentName").focus(function(){
	$('#myModalLabel').html('辅助部门');
	departName = 'departmentName';
	noAuthority();
});

/***tree 业务部门、辅助部门***/
function noAuthority(){
	$("#inSectionModal").modal('show');
	var setting = {
		data : {
			simpleData : {
				enable : true,
				idKey : "code",
				pIdKey : "pCode",
				rootPId : null
			}
		},
		check : {
			enable : false
		},
		callback : { beforeDblClick:zTreeOnCheckIn
		},
		view : {
			showIcon : false
		}

	};

	$.ajax( {
		type : 'Get',
		url : basePath + '/jxc/storage/authorityAndTree/findAllTree',
		dataType : "json", // 可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		success : function(data) {
			$.fn.zTree.init($("#inSectionTree"), setting, data);
			var zTree = $.fn.zTree.getZTreeObj("inSectionTree");
			zTree.expandAll(true);// 展开全部节点
		},
		error : function(msg) {
		}
	});
}

/***dblclick 无权限部门双击***/
function zTreeOnCheckIn(event, treeId, treeNode){
	//只能选择最末级
	if(treeId.children.length != 0) return false;
	if(departName == 'depYeName'){
		$("#depYeId").val(treeId.obj.id);
		$("#" + departName).val(treeId.name);
	}else if(departName == 'departmentName'){
		$("#departmentId").val(treeId.obj.id);
		$("#" + departName).val(treeId.name);
	}
	$("#inSectionModal").modal('hide');
}

/***focus 往来单位***/
$("#contactsUnitName").focus(function(){
	$('#contactUnitReferenceModal').modal('show');
	callBack = function(){
		if(arguments[0].length == 0){
			$.zxsaas_plus.showalert("提示信息","未选中任何行!");
			$('#contactUnitReferenceModal').modal('hide');
			return ;
		}
		var contactUnit = arguments[0][0];
		
		//设置编辑器值
		$('#contactsUnitName').val(contactUnit.name);
		$('#contactsUnitId').val(contactUnit.id);
		$('#contactUnitReferenceModal').modal('hide');
		refreshValidatorField("contactName",'#ibillsHeadLend');//刷新验证信息
	}; 
});

/***button 整理断号弹窗模态框***/
function dhModalShow(){
	$('#trimDhModal').modal('show');
	$("#dhTime").val(format(new Date(),"yyyy-MM"));
	$("#dhTime").datetimepicker({
	  lang:"ch",           //语言选择中文
    format:"Y-m",      //格式化日期
    timepicker:false,    //关闭时间选项
    todayButton:false,    //关闭选择今天按钮
    validateOnBlur:false
	});
}

/***button 整理断号确定***/
function trimVoucher(){
	$.ajax({
		url:basePath + '/cw/pz/get/trimVoucher',
		type: 'get',
		dataType: 'json',
		data:{dhTimeStr:$('#dhTime').val()},
		success:function(data){
			var num = data.data.num;
			if(num == 0){
				$.zxsaas_plus.showalert("提示信息","整理完成!");
			}else{
				$.zxsaas_plus.showalert("提示信息","整理失败!");
			}
			selectMainGrid();
		},
		error:function(msg){
			$.zxsaas_plus.showalert("提示信息","数据加载失败！" + msg);
		}
	});
	$('#trimDhModal').modal('hide');
}

/***button 复制/冲销弹窗***/
function copyHc(tab){
	var labelHtml = tab == 1 ? '复制':'冲销';
	$('#hcModalLabel').html(labelHtml);
	$('#hcModal').modal('show');
	$("#hcTime").val(format(new Date(),"yyyy-MM-dd"));
	$("#hcTime").datetimepicker({
	  lang:"ch",           //语言选择中文
    format:"Y-m-d",      //格式化日期
    timepicker:false,    //关闭时间选项
    todayButton:false    //关闭选择今天按钮
	});
}

/***onclick 复制/冲销确定***/
function copyVoucher(){
	var selrow = $.selRow();
	if($.showAlert(selrow)) return false;
	
	//参数
	var ids = '';
	$(selrow).each(function(index,yu){if(ids != '') ids += ',';ids += yu;});
	var flag = $('#hcModalLabel').html() == '复制' ? 'copy' : '';
	//ajax
	$.ajax({
		url: basePath + '/cw/pz/get/copyVoucher',
		type : "get",
		dataType : 'json',
		data:{ids:ids,flag:flag,copyTimeStr:$("#hcTime").val()},
		success:function (data){
			var num = data.data.num;
			if(num == 0 && $('#hcModalLabel').html() == '复制'){
				$.zxsaas_plus.showalert("提示信息","复制成功!");
			}else if(num == 0 && $('#hcModalLabel').html() == '冲销'){
				$.zxsaas_plus.showalert("提示信息","冲销成功!");
			}else if($('#hcModalLabel').html() == '复制'){
				$.zxsaas_plus.showalert("提示信息","复制失败!");
			}else if($('#hcModalLabel').html() == '冲销'){
				$.zxsaas_plus.showalert("提示信息","冲销失败!");
			}
			selectMainGrid();
		},
		error: function (msg) {
			$.zxsaas_plus.showalert("提示信息","数据加载失败！" + msg);
        }
	}); 	
	$('#hcModal').modal('hide');
}

/***button 审核***/
function auditor(){
	var selrow = $.selRow();
	if($.showAlert(selrow)) return false;
	
	$.zxsaas_plus.showconfirm("提示信息",'确定审核吗？',function(){
		//获取凭证ids
		var ids = '';
		$(selrow).each(function(index,yu){if(ids != '') ids += ',';ids += yu;});
		//ajax
		voucherBut(basePath + '/cw/pz/get/auditor',ids,function(data){
			$.showResult(data);
			selectMainGrid();
		});
	},function(){
		
	});
}

/***button 弃审***/
function disAuditor(){
	var selrow = $.selRow();
	if($.showAlert(selrow)) return false;
	
	$.zxsaas_plus.showconfirm("提示信息",'确定弃审吗？',function(){
		//获取凭证ids
		var ids = '';
		$(selrow).each(function(index,yu){if(ids != '') ids += ',';ids += yu;});
		//ajax
		voucherBut(basePath + '/cw/pz/get/disAuditor',ids,function(data){
			$.showResult(data);
			selectMainGrid();
		});
	},function(){
		
	});
}

/***button 作废***/
function invalidate(){
	var selrow = $.selRow();
	if($.showAlert(selrow)) return false;
	
	$.zxsaas_plus.showconfirm("提示信息",'确定作废吗？',function(){
		//获取凭证ids
		var ids = '';
		$(selrow).each(function(index,yu){if(ids != '') ids += ',';ids += yu;});
		//ajax
		voucherBut(basePath + '/cw/pz/get/invalidate',ids,function(data){
			$.showResult(data);
			selectMainGrid();
		});
	},function(){
		
	});
}

/***button 取消作废***/
function disInvalidate(){
	var selrow = $.selRow();
	if($.showAlert(selrow)) return false;
	
	$.zxsaas_plus.showconfirm("提示信息",'确定取消作废吗？',function(){
		//获取凭证ids
		var ids = '';
		$(selrow).each(function(index,yu){if(ids != '') ids += ',';ids += yu;});
		//ajax
		voucherBut(basePath + '/cw/pz/get/disInvalidate',ids,function(data){
			$.showResult(data);
			selectMainGrid();
		});
	},function(){
		
	});
}

/***button 标错***/
function makeError(){
	var selrow = $.selRow();
	if($.showAlert(selrow)) return false;
	
	$.zxsaas_plus.showconfirm("提示信息",'确定标错吗？',function(){
		//获取凭证ids
		var ids = '';
		$(selrow).each(function(index,yu){if(ids != '') ids += ',';ids += yu;});
		//ajax
		voucherBut(basePath + '/cw/pz/get/makeError',ids,function(data){
			$.showResult(data);
			selectMainGrid();
		});
	},function(){
		
	});
}

/***button 取消标错***/
function disMakeError(){
	var selrow = $.selRow();
	if($.showAlert(selrow)) return false;
	
	$.zxsaas_plus.showconfirm("提示信息",'确定取消标错吗？',function(){
		//获取凭证ids
		var ids = '';
		$(selrow).each(function(index,yu){if(ids != '') ids += ',';ids += yu;});
		//ajax
		voucherBut(basePath + '/cw/pz/get/disMakeError',ids,function(data){
			$.showResult(data);
			selectMainGrid();
		});
	},function(){
		
	});
}

/***button 出纳签字***/
function cashier(){
	var selrow = $.selRow();
	if($.showAlert(selrow)) return false;
	
	$.zxsaas_plus.showconfirm("提示信息",'确定出纳签字吗？',function(){
		//获取凭证ids
		var ids = '';
		$(selrow).each(function(index,yu){if(ids != '') ids += ',';ids += yu;});
		//ajax
		voucherBut(basePath + '/cw/pz/get/cashier',ids,function(data){
			$.showResult(data);
			selectMainGrid();
		});
	},function(){
		
	});
}

/***button 取消出纳签字***/
function disCashier(){
	var selrow = $.selRow();
	if($.showAlert(selrow)) return false;
	
	$.zxsaas_plus.showconfirm("提示信息",'取消出纳签字吗？',function(){
		//获取凭证ids
		var ids = '';
		$(selrow).each(function(index,yu){if(ids != '') ids += ',';ids += yu;});
		//ajax
		voucherBut(basePath + '/cw/pz/get/disCashier',ids,function(data){
			$.showResult(data);
			selectMainGrid();
		});
	},function(){
		
	});
}

/***button 主管签字***/
function supervisor(){
	var selrow = $.selRow();
	if($.showAlert(selrow)) return false;
	$.zxsaas_plus.showconfirm("提示信息",'确定主管签字吗？',function(){
		//获取凭证ids
		var ids = '';
		$(selrow).each(function(index,yu){if(ids != '') ids += ',';ids += yu;});
		//ajax
		voucherBut(basePath + '/cw/pz/get/supervisor',ids,function(data){
			$.showResult(data);
			selectMainGrid();
		});
	},function(){
		
	});
}

/***button 取消主管签字***/
function disSupervisor(){
	var selrow = $.selRow();
	if($.showAlert(selrow)) return false;
	$.zxsaas_plus.showconfirm("提示信息",'取消主管签字吗？',function(){
		//获取凭证ids
		var ids = '';
		$(selrow).each(function(index,yu){if(ids != '') ids += ',';ids += yu;});
		//ajax
		voucherBut(basePath + '/cw/pz/get/disSupervisor',ids,function(data){
			$.showResult(data);
			selectMainGrid();
		});
	},function(){
		
	});
}

/***button 删除***/
function delVoucher(){
	var selrow = $.selRow();
	if($.showAlert(selrow)) return false;
	
	$.zxsaas_plus.showconfirm("提示信息",'删除吗？',function(){
		//获取凭证ids
		var ids = '';
		$(selrow).each(function(index,yu){if(ids != '') ids += ',';ids += yu;});
		//ajax
		voucherBut(basePath + '/cw/pz/get/delVoucher',ids,function(data){
			$.showResult(data);
			selectMainGrid();
		});
	},function(){
		
	});
}

var voucherBut = function(url,ids,callBack){
	$.ajax({
		url: url,
		type : "get",
		dataType : 'json',
		data:{ids:ids},
		success:callBack,
		error: function (msg) {
			$.zxsaas_plus.showalert("提示信息","数据加载失败！" + msg);
        }
	}); 	
};

jQuery.extend({ 
	//选择行
	selRow:function(){
		return $("#mainGrid").jqGrid('getGridParam','selarrrow');
	},
	//提示信息
	showAlert:function(selrow){
		if(selrow.length == 0){
			$.zxsaas_plus.showalert("提示信息", "请选择凭证!");
			return true;
		}
	},
	showResult:function(data){
		if(data.result == 1){
			$.zxsaas_plus.showalert("提示信息","操作完成!");
		}else{
			$.zxsaas_plus.showalert("提示信息",data.desc);
		}
	}
});


/*页面初始化*/
//制单日期&&会计日期
$(document).on("click","input[name=choose]",toggle_date);
function toggle_date(){
	var today = new Date().toLocaleDateString();
	if($("input[name='choose']:checked").val()=="1"){
			$(".zdDate").removeAttr("disabled");
		    $(".kjDate").prop("disabled",true);
		    $('#yearMonthBeginStr').val('');
		    $('#yearMonthEndStr').val('');
			$("#voucherDateBeginStr").val(format(today,"yyyy-MM-01"));
			$("#voucherDateBeginStr").attr("title",format(today,"yyyy-MM-01"));
			$("#voucherDateEndStr").val(format(today,"yyyy-MM-dd"));
			$("#voucherDateEndStr").attr("title",format(today,"yyyy-MM-dd"));
	}else{
			$(".kjDate").removeAttr("disabled");
			$(".zdDate").prop("disabled",true);
			$('#voucherDateBeginStr').val('');
			$('#voucherDateEndStr').val('');
			$("#yearMonthBeginStr").val(format(today,"yyyy-MM"));
			$("#yearMonthBeginStr").attr("title",format(today,"yyyy-MM"));
			$("#yearMonthEndStr").val(format(today,"yyyy-MM"));
			$("#yearMonthEndStr").attr("title",format(today,"yyyy-MM"));
		}
}

            var lastrow ='';
            var lastcell=''; 
            var lastsel='';//最后一次选中的行
        	$.jgrid.defaults.width = 1280;
			$.jgrid.defaults.responsive = true;
			$.jgrid.defaults.styleUI = 'Bootstrap';	
			$("#mainGrid").jqGrid({
				url:"",
				mtype:"GET",
				datatype: "json",				
				jsonReader  : {	
					root:"data.rows",
					page: "data.page",
			        total: "data.total",
			        records: "data.records",
					repeatitems: false
				},
				colNames:['制单日期','凭证字号','凭证总金额','审核人','制单人','摘要','科目编码','科目名称','往来单位','部门','职员名称','借方','贷方','id','业务部门'],          
			    colModel:[
			            	{name:"voucherDateString",width:"150px",align:"center",sortable:false,cellattr:function(rowId,tv,rawObject,cm,rdata){return 'id=\'voucherDateString'+rowId+"\'";}}, //制单日期 
			            	{name:"inNo",width:"150px",align:"center",sortable:false,formatter:newFormat,cellattr:function(rowId,tv,rawObject,cm,rdata){return 'id=\'inNo'+rowId+"\'";}},//凭证字号
			            	{name:"accuntAmuont",width:"150px",align:"center",sortable:false,cellattr:function(rowId,tv,rawObject,cm,rdata){return 'id=\'accuntAmuont'+rowId+"\'";}},//凭证总金额
			            	{name:"auditorName",width:"150px",align:"center",sortable:false,cellattr:function(rowId,tv,rawObject,cm,rdata){return 'id=\'auditorName'+rowId+"\'";}}, // 审核人
			            	
			            	{name:"createName",width:"150px",align:"center",sortable:false,cellattr:function(rowId,tv,rawObject,cm,rdata){return 'id=\'createName'+rowId+"\'";}},//制单人 
			            	{name:"summary",width:"150px",align:"center",sortable:false}, //摘要
			            	{name:"subjectCode",width:"150px",align:"center",sortable:false}, //科目编码
			            	{name:"subjectName",width:"150px",align:"center",sortable:false}, //科目名称
//			            	{name:"contactsUnitName",width:"150px",align:"center",sortable:false,cellattr:function(rowId,tv,rawObject,cm,rdata){return 'id=\'contactsUnitName'+rowId+"\'";}}, //辅助项
			            	{name:"contactsUnitName",width:"150px",align:"center",sortable:false}, //往来单位
			            	{name:"departmentName",width:"150px",align:"center",sortable:false}, //部门
			            	{name:"employeeName",width:"150px",align:"center",sortable:false}, //职员名称
			            	{name:"borrowCurrency",width:"150px",align:"center",sortable:false}, //借方
			            	{name:"loanCurrency",width:"150px",align:"center",sortable:false},//贷方
			            	{name:"id",width:"150px",align:"center",sortable:false,hidden:true},//id
			            	{name:"depYeName",width:"150px",align:"center",sortable:false}//业务部门
			            ],
			    sortable:false,	
			  
			    cellsubmit: 'clientArray',// 单元格保存内容的位置
			    editurl: 'clientArray',
			    rowNum: 15,
	            rowList: [1,2,10, 15, 20, 25, 40],
	            pager:"jqGridPager",
			    viewrecords: true,		           
			   	cellEdit:true,
			    width:"100%",
			    footerrow:true,
			    multiselect:true,
				multiboxonly:true,
				multiselectWidth:38,
			    height: $(window).height()*0.65,
				autowidth:true,
				rownumWidth: 35, // the width of the row numbers columns
				shrinkToFit:false,  // 此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
				userDataOnFooter:true,// 设置userData 显示在footer里
			
				ondblClickRow:function(id){
				
				},
				 
			    onCellSelect:function(){
			         	
			    },
				onSelectRow:function(id){
	              
				},
				beforeEditCell:function(rowid,cellname,v,iRow,iCol){
					lastrow = iRow;
					lastcell = iCol;
				},
				beforeSelectRow:function(rowid,e){

				},
				afterInsertRow: function (rowid, aData) { // 新增一行之后

				},
				onSelectRow:function(id,status){	
				
				},
				onPaging:function(pageBtn){  
				  $("#cb_mainGrid").prop("checked",true);
		    
		        },  
				gridComplete: function() {
		        	mergeCheckbox("#mainGrid");
				   Me("#mainGrid","accuntAmuont","auditorName","createName","voucherDateString","inNo");
				},
				loadComplete:function(data){
					   jQuery("#mainGrid").jqGrid('destroyGroupHeader');
					//借方
					  var borrowCurrency=$("#mainGrid").getCol('borrowCurrency', false,'sum');
					  $("#mainGrid").footerData("set", {"borrowCurrency":'sum：<font color="red" >'+borrowCurrency+'</font>'},false);
					//贷方
                      var loanCurrency=$("#mainGrid").getCol('loanCurrency', false,'sum');
                      $("#mainGrid").footerData("set", {"loanCurrency":'sum：<font color="red" >'+loanCurrency+'</font>'},false);
                      
                      jQuery("#mainGrid").jqGrid('setGroupHeaders', {
                          useColSpanStyle: true,
                          groupHeaders: [
                            { startColumnName: 'contactsUnitName', numberOfColumns: 3, titleText: '辅助项' }
                          ]
                    });
					 
				},
				loadError:function(xhr,status,error){
					
				}
				});
			
		
			
function newFormat(cellvalue,options,row){
	var n="";
	n=fix(cellvalue,7).replaceAll("记-");
	return '记-'+n;
}
			
function fix(num, length) {
    return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
}	


//合并单元格
function Me(gridName,CellName1,CellName2,CellName3,CellName4,CellName5){
	var ids=$(gridName).getDataIDs();
	var uq={};
	var nw=[];
	for(var i=0;i<ids.length;i++){
	   if(!uq[ids[i]]){
		    uq[ids[i]]=1;
		    nw.push(ids[i]);
	   }else{
		   ++uq[ids[i]];  
			$(gridName).setCell(ids[i],CellName1,'',{display:'none'});
			$(gridName).setCell(ids[i],CellName2,'',{display:'none'});
			$(gridName).setCell(ids[i],CellName3,'',{display:'none'});
			$(gridName).setCell(ids[i],CellName4,'',{display:'none'});
			$(gridName).setCell(ids[i],CellName5,'',{display:'none'});
		
	   }
	}
	
	for(var j=0;j<nw.length;j++){
		$("#"+CellName1+nw[j]).addClass("mustCell");
		$("#"+CellName1+nw[j]).attr("rowspan",uq[nw[j]]);
		$("#"+CellName2+nw[j]).addClass("mustCell");
		$("#"+CellName2+nw[j]).attr("rowspan",uq[nw[j]]);
		$("#"+CellName3+nw[j]).addClass("mustCell");
		$("#"+CellName3+nw[j]).attr("rowspan",uq[nw[j]]);
		$("#"+CellName4+nw[j]).addClass("mustCell");
		$("#"+CellName4+nw[j]).attr("rowspan",uq[nw[j]]);
		$("#"+CellName5+nw[j]).addClass("mustCell");
		$("#"+CellName5+nw[j]).attr("rowspan",uq[nw[j]]);//mainGrid_cb
	}
	$(gridName).find("td[aria-describedby=mainGrid_voucherDateString]:not(.mustCell)").css({display:'none'});
	$(gridName).find("td[aria-describedby=mainGrid_inNo]:not(.mustCell)").css({display:'none'});
	$(gridName).find("td[aria-describedby=mainGrid_createName]:not(.mustCell)").css({display:'none'});
	$(gridName).find("td[aria-describedby=mainGrid_auditorName]:not(.mustCell)").css({display:'none'});
	$(gridName).find("td[aria-describedby=mainGrid_accuntAmuont]:not(.mustCell)").css({display:'none'});
}

//合并多选框
function mergeCheckbox(gridName){
	var ids=$(gridName).getDataIDs();
	var uq={};
	var nw=[];
	for(var i=0;i<ids.length;i++){
	   if(!uq[ids[i]]){
		    uq[ids[i]]=1;
		    nw.push(ids[i]);
	   }else{
		   ++uq[ids[i]];   
		   $(gridName).setCell(ids[i],"cb",'',{display:'none'});
		   
	   }
	}
	for(var j=0;j<nw.length;j++){
		$("#jqg_mainGrid_"+nw[j]).parent("td").addClass("must");
		$("#jqg_mainGrid_"+nw[j]).parent("td").attr("rowspan",uq[nw[j]]);
	}
	
	$(gridName).find("td[aria-describedby=mainGrid_cb]:not(.must)").css({display:'none'});
}

//合并单元格
//function Merger(gridName,CellName1,CellName2,CellName3){
//	
//	var ids=$(gridName).getDataIDs();
//	var len=ids.length;
//
//	for(var i=0;i<len;i++){
//		var bf=$(gridName).jqGrid('getRowData',ids[i]);
//		var bf_value1=bf.CellName1;
//		var bf_value2=bf.CellName2;
//		var bf_value3=bf.CellName3;
//		var bf_value4=bf.CellName4;
//		var rowSpanTaxCount =1;
//		for(var j=i+1;j<len;j++){
//			var ed=$(gridName).jqGrid('getRowData',ids[j]);
//			if(ed["inNo"]==bf["inNo"]){
//				rowSpanTaxCount++;
//				$(gridName).setCell(ids[j],CellName1,bf_value1,{display:'none'});
//				$(gridName).setCell(ids[j],CellName2,bf_value2,{display:'none'});
//				$(gridName).setCell(ids[j],CellName3,bf_value3,{display:'none'});
//				//$(gridName).setCell(ids[j],CellName4,bf_value4,{display:'none'});
//			}else{
//				rowSpanTaxCount==1;
//				break;
//			}
//			$("#"+CellName1+ids[i]).attr("rowspan",rowSpanTaxCount);
//			$("#"+CellName2+ids[i]).attr("rowspan",rowSpanTaxCount);
//			$("#"+CellName3+ids[i]).attr("rowspan",rowSpanTaxCount);
//			//$("#"+CellName4+ids[i]).attr("rowspan",rowSpanTaxCount);
//		}
//	}
//	
//}

// 时间控件初始化
$('.dateInput').datetimepicker({
	lang:"ch",           // 语言选择中文
	format:"Y-m-d",      // 格式化日期
	timepicker:false,    // 关闭时间选项
	todayButton:false    // 关闭选择今天按钮
	});

//时间控件初始化
$('#yearMonthBeginStr').datetimepicker({
	lang:"ch",           // 语言选择中文
	format:"Y-m-d",      // 格式化日期
	timepicker:false,    // 关闭时间选项
	todayButton:false,    // 关闭选择今天按钮
	hideDay:true,
	validateOnBlur:false
	});
$('#yearMonthEndStr').datetimepicker({
	lang:"ch",           // 语言选择中文
	format:"Y-m-d",      // 格式化日期
	timepicker:false,    // 关闭时间选项
	todayButton:false,    // 关闭选择今天按钮
	hideDay:true,
	validateOnBlur:false
	});


 

/*点击确定按钮进行保存*/
$(document).on("click",".save",function(){
	$("#mainGrid").jqGrid("saveCell",lastrow,lastcell);
});


/*毫秒 转化成正确格式的时间*/
function format(time, format){
    var t = new Date(time);
    var tf = function(i){return (i < 10 ? '0' : '') + i};
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
    switch(a){
        case 'yyyy':
            return tf(t.getFullYear());
            break;
        case 'MM':
            return tf(t.getMonth() + 1);
            break;
        case 'mm':
            return tf(t.getMinutes());
            break;
        case 'dd':
            return tf(t.getDate());
            break;
        case 'HH':
            return tf(t.getHours());
            break;
        case 'ss':
            return tf(t.getSeconds());
            break;
    }
})
}
