$(function(){
	initTime();
	// 初始化 顶部表单
	function initTopForm(){
		//部门
		$("#billsHeaderForm input[name='sectionName']").storePlu({
			isStoreShow:false,
			isLoadDefaultName:0,
			checkMore: false,
			search: false,
			ifStore: false, // 控制部门选项
			changeStore:function(){
				var id=$("#billsHeaderForm input[name='sectionName']").data('sectionId');
				//设置编辑器值
				$("#billsHeaderForm input[name='sectionId']").val(id);
				$("#billsHeaderForm input[name='managerUid']").val("");
				$("#billsHeaderForm input[name='managerUname']").val("");
                if(type==18 || type==19 || type==20 || type==21){
                    jqGrid_SubjectBalance.clearDataGrid()
                    jqGrid_SubjectBalance.addKongRow();
                }else{
                    getAccountBySectionId(id)
				}
			}
		});
		//经办人
		$("#billsHeaderForm input[name='managerUname']").comModalsEmployeeBySection({
			sectionIds:'input[name="sectionId"]',
			clickback:function () {
				var obj= $("#billsHeaderForm input[name='managerUname']");
				//设置编辑器值
				$("#billsHeaderForm input[name='managerUname']").val(obj.val());
				$("#billsHeaderForm input[name='managersUid']").val(obj.data('id'));
			}
		})
		//往来单位
		$("#billsHeaderForm input[name='contactUnitName']").comModalsContactUnit({
			clickback:function () {
				var obj= $("#billsHeaderForm input[name='contactUnitName']");
				//设置编辑器值
				$("#billsHeaderForm input[name='contactUnitName']").val(obj.val());
				$("#billsHeaderForm input[name='contactsunitId']").val(obj.data('id'));
				getBankByContactunitId(obj.data('id'))
			}
		})
	}
	initTopForm()
	// 初始化 过滤
	function initFilter() {
		//部门
		$("#sectionNameFilter").storePlu({
			isStoreShow:false,
			isLoadDefaultName:0,
			checkMore: true,
			search: false,
			ifStore: false, // 控制部门选项
			changeStore:function(){
				var id=$("#sectionNameFilter").data('sectionId');
                //设置编辑器值
                $("#sectionNameFilter").siblings("input[name='sectionIdFilter']").val(id)
			}
		}).removeAttr('name').after('<input type="hidden" name="sectionIdFilter"  value="">')
		//往来单位
		$("#contactUnitNameTo").comModalsContactUnit({
			multiselect:true,
			clickback:function () {
				var id=$("#contactUnitNameTo").data('id');
				//设置编辑器值
                $("#contactUnitNameTo").siblings("input[name='contactsunitIdFilter']").val(id)
			}
		}).removeAttr('name').after('<input type="hidden" name="contactsunitIdFilter"  value="">')
            .after('<input type="hidden" name="queryCodeStr"  value="L">');
		;

	}
	initFilter()
});
//获取过滤的参数
function comGetFilterParam(){
    var param=$("#filterSearchForm").toJsonObject();
    param.sectionId= param.sectionIdFilter
    param.contactsunitId= param.contactsunitIdFilter
    delete param.sectionIdFilter
    delete param.contactsunitIdFilter
	delete param.contactUnitName2
	return param
}

//验证相关操作
var formId = $('body').find('form').eq(0).attr('id');//表单Id
/*.on('blur', function (ev) {  
    refreshValidatorField("billsDate",'#' + formId);//刷新验证信息
})*/;

$("#beginTime").datetimepicker({
	  lang:"ch",           //语言选择中文
    format:"Y-m-d",      //格式化日期
    timepicker:false,    //关闭时间选项
    todayButton:false    //关闭选择今天按钮
});
//初始化受理时间
function initDealDate(){
	$("#billsDate").prop('readonly','readonly')
	formateDateInput("#billsDate");
	if($("#billsDate").val()==""||$("#billsDate").val()==null||$("#billsDate").val()==undefined)
	{
		$("#billsDate").val(_authList.maxDate);
	}
}
//格式化日期控件
function formateDateInput(modelId){
	if(_authList.hasPermissions==0){
		$(modelId).prop('disabled',true);
	}else{
		$(modelId).prop('disabled',false);
	}
	$("#billsDate").datetimepicker({
		  lang:"ch",           //语言选择中文
	    format:"Y-m-d",      //格式化日期
	    timepicker:false,    //关闭时间选项
	    todayButton:false,    //关闭选择今天按钮
	    maxDate:_authList.maxDate,
	    minDate:_authList.minDate,
	    value:_authList.maxDate
	})
}

$("#endTime").datetimepicker({
	  lang:"ch",           //语言选择中文
    format:"Y-m-d",      //格式化日期
    timepicker:false,    //关闭时间选项
    todayButton:false    //关闭选择今天按钮
});

$("#datetimepickerStart1").datetimepicker({
	lang:"ch",           //语言选择中文
    format:"Y-m-d",      //格式化日期
    timepicker:false,    //关闭时间选项
    todayButton:false    //关闭选择今天按钮
});
$("#datetimepickerEnd1").datetimepicker({
	lang:"ch",           //语言选择中文
    format:"Y-m-d",      //格式化日期
    timepicker:false,    //关闭时间选项
    todayButton:false    //关闭选择今天按钮
});

//禁止输入非数字
function clearNoNum(evt,obj){
	var evt = evt || window.event;
    var keyCode = evt.keyCode || evt.which;
	var arr = [8,37,39,48,49,50,51,52,53,54,55,56,57,96,97,98,99,100,101,102,103,104,105,110,190];
	if (arr.indexOf(keyCode) == -1){
		obj.value = obj.value.replace(/[^\d.]/g,"");
	};
//	if(obj.value.length > 12){
//		obj.value = obj.value.substring(0,12);
//	}
}

//备注
function clearNoText(t){
	if(t.value.length > 100){
		t.value = t.value.substring(0,100);
	}
}

//数字效验
function verifyNum(e){
	var re = /^\d+(?=\.{0,1}\d+$|$)/;
	if(e!=undefined){
		e.value = Number(e.value).toFixed(2);
	}
    if (e!=undefined && e.value != "") { 
        if (!re.test(e.value)) {
        	if(e.id=="adjustAmount"){
        		$("#adjustAmount").val("0.00");
        	}
        	if(e.id=="amountInput"){
        		$("#amountInput").val("0.00");
        	}
        	if(e.id=="feeAmountInput"){
        		$("#feeAmountInput").val("0.00");
        	}
        	if(e.id=="hxDiscount"){
        		$("#hxDiscount").val("0.00");
        		calHasnotAmount();
        	}
        	$.zxsaas_plus.showalert("错误提示","请输入数字或保留两位小数");
        } 
    }
}

//初始化过滤条件中开始日期，结束日期
function initTime(){
	var myDate = new Date();
  var year = myDate.getFullYear();
  var month = myDate.getMonth()+1;
  if (month<10){
      month = "0"+month;
  }
  var firstDay = year+"-"+month+"-01";

  myDate = new Date(year,month,0);
  var lastDay = year+"-"+month+"-"+myDate.getDate();
}

//打印单据
function print(type,Obj){
	var Obj = Obj || {
		 title:""   //标题
		};
	var actionCode="";
	if(type==18){
		actionCode="fk_print";
	}else if(type==19){
		actionCode="sh_print";
	}else if(type==20){
		actionCode="yf_print";
	}else if(type==21){
		actionCode="ys_print";
	}else if(type==27){
		actionCode="qtfk_print";
	}else if(type==28){
		actionCode="qtsk_print";
	}else if(type==29){
		actionCode="nbzz_print";
	}else if(type==56 || type==57 || type==58 || type==59){
		actionCode="yfystz_print";
	}else if(type==51 || type==52 || type==53 || type==54 || type==55){
		actionCode="wljs_print";
	}
	
	var id="";
	if(type==29){
		id = $("#headerForm input[name='id']").val();
	}else{
		id = $("#billsHeaderForm input[name='id']").val();
	}
	if(id==""){
		$.zxsaas_plus.showalert("提示","打印单据不存在!");
		return;
	}

	$.zxsaas_plus.showconfirm("提示",Obj.title || "确定打印此单据？",function(){
		 todo();
	},function(){
		
	});
	
	function todo(){
		$.printBills('../print/paymentDetail/'+actionCode, 
			{
		      id:id,//单据id
		      type:type//单据类型
		    }
		);
	}
}

//summary 摘要字段启用，“是否是系统自动生成 0  否  1  是”。用来表示该数据是附属单据自动生产，还是在资金往来界面手动填写的收付款
function enableOrDisableHxFunction(summary){
	if(summary=="0"){//0启用
		$(".boxmain button").removeAttr("disabled");
		$(".invalid").removeAttr("disabled");
	}else if(summary=="1"){//禁用
		$(".boxmain button").attr("disabled",true);
		$(".invalid").attr("disabled",true);
	}
}

//比较日期
function CompareDate(d1,d2){
	return ((new Date(d1.replace(/-/g,"\/"))) > (new Date(d2.replace(/-/g,"\/"))));
}

function getAuthList(callback) {

    _authList.menuCode = $('#AUTH').attr('data-code');
    if (_authList.menuCode) {
        $.ajax({
            url: '/manager/inventory/common/getInventoryBillsDate',
            type: 'post',
            dataType: 'json',
			async:false,
            data: {
                'menuCode': _authList.menuCode
            },
            success: function (data) {
                var data = data.data;
                _authList.maxDate = data.maxDate;
                _authList.hasPermissions = data.hasPermissions;
                _authList.minDate = data.minDate;
                if(callback){
                    callback();
                }
            }
        })
    }
}

