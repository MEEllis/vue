//JUST DO IT
$(document).on("click",".search",function(){
	window.location.href ="/manager/retail/checkPay/findCheckDemand";
});
/*点击确认收款按钮*/
$(document).on("click",".affirm",function(){
	window.location.href ="/manager/retail/checkPay/payMoneyAuditJSP";
});

/*页面初始化*/
$(function(){
	/*获取交款日期(交款 启用/日结<=交款日期<=系统)—gzx*/
     initJkDate();//初始化交款日期为当前系统日期
     storeInfo();//获取 门店接口信息
     getSection();//获取部门接口信息
});
//输入框得到焦点时
$("#Cashinfo input").on('focus',function(){
    this.select()
})
function initJkDate(){
    $('#datetimepickerStart').datePlu({
        endDate: false,
        ajaxOpt:{
			async:false
		},
    });
}
function storeInfo(){
	  /*获取 门店接口信息*/
    $.ajax({
        url: '/manager/jxc/base/getAccessSectionVoList',
        type: 'POST',
        async: false,
        data: {
            sectionIsStore: 1
        },
        success: function(data){
            $(".md").html("");
            if (data.data.sectionVoList) {
                for (var i = 0; i < data.data.sectionVoList.length; i++) {
                    $(".md").append("<option value='" + data.data.sectionVoList[i].id + "'>" + data.data.sectionVoList[i].name + "</option>");//门店信息加载
                }
            }
            jkr();//初始化交款人信息
        
        },
        error: function(msg){
        
        }
    });
}
function getSection(){
	 /*获取部门接口信息*/
	  $.ajax({
	      url: '/manager/jxc/base/getLeafSectionVoList',
	      type: 'POST',
	      async: false,
	      success: function(data){
	          if (data.data.sectionVoList) {
	              for (var i = 0; i < data.data.sectionVoList.length; i++) {
	                  $(".skbm").append("<option value='" + data.data.sectionVoList[i].id + "'>" + data.data.sectionVoList[i].name + "</option>"); //部门信息待加载
	              }
	          }
			  getCashAccount();//初始化收款账户下拉  数据库表有问题
			  search_CashInfo();
	      }
	  });
}

/*根据收款部门id  获取收款账户信息*/
function getCashAccount(){
    var id = $(".skbm>option:selected").val();//门店id
    if(id){
	    $.ajax({
	        url: '/manager/retail/checkPay/findAccountList',
	        type: "GET",
	        async: false,
	        datatype: "json",
	        data: {
	            sectionId: id
	        },
	        success: function(data){
	        	if(data.result==1||data.result=="1"){
	        	     $(".skzh").html("");
	                 if (data.data.accountList) {
	                     for (var i = 0; i < data.data.accountList.length; i++) {
	                         $(".skzh").append("<option value='" + data.data.accountList[i].accountId + "'>" + data.data.accountList[i].accountName + "</option>");//收款账户信息
	                     }
	                 }
	        	}else{
	        		$.zxsaas_plus.showalert('warning',data.desc);
	        	}
	        },
	        error: function(msg){
	        
	        }
	    });
    }
}

function jkr(){
    /*获取交款人信息*/
    var slctVal = $(".md>option:selected").val();//门店id
    $.ajax({
        url: '/manager/inventory/common/getEmployeeVoList',///manager/jxc/base/getEmployeeVoList
        type: 'POST',
        async: false,
		data: {
            sectionId: slctVal
        },
		success: function(data){
            $(".jkr").html("");
            if (data.data.employeeVoList) {
                for (var i = 0; i < data.data.employeeVoList.length; i++) {
                    $(".jkr").append("<option value='" + data.data.employeeVoList[i].employeeId + "'>" + data.data.employeeVoList[i].name + "</option>");//交款人信息加载
                }
                
            }
        },
        error: function(msg){
        
        }
    });
}

/*时间切换事件*/
$("#datetimepickerStart").on("change",function(){
	search_CashInfo();//切换交款时间查找表格信息
});


/*门店切换事件*/
$(document).on("change",".md",function(){
	jkr();//切换门店查询交款人信息
	getCashAccount(); //切换门店查找收款账户信息（需要找到相应门店下的收款账户信息{从可转入资金账户中}）
	search_CashInfo();//切换门店查找表格信息
});

/*收款部门切换*/
$(document).on("change",".skbm",function(){
	getCashAccount(); //切换门店查找收款账户信息（需要找到相应门店下的收款账户信息{从可转入资金账户中}）
});

function search_CashInfo(){
	var slctVal = $(".md>option:selected").val()||''; //门店id
	var currentDate = $("#datetimepickerStart").val()||''; // 日期
	if(currentDate!=''){
	    $.ajax({
	        url: '/manager/retail/checkPay/dataInitStart',
			type: 'post',
			async: false,
			data:{
				sectionId : slctVal,
				currentDate : currentDate
			},
	        success: function(data){
	            if (data.result == 1) {
	            	 $(".jkje").attr("disabled")&&$(".jkje").removeAttr("disabled");//交款金额禁用
	                $("#Cashinfo").writeJson2Dom(data.data.payVo);
	                if (data.data.payVo.accountAmount) {
	                    $(".jkje").val("0");//交款金额
	                }
//	                var jkjy = $("input[name=yinAmount]").val() - $(".jkje").val();
	                var jkjy =Number($(".jkje").val()).subtr($("input[name=yinAmount]").val());
	                $("#retailCardNum").val(Number(jkjy).toFixed(2));
	            } else {
	            	 $(".jkje").attr("disabled")||$(".jkje").attr("disabled","disabled");//交款金额禁用
					$.zxsaas_plus.showalert('warning',data.desc)
				}
	        },
	        error: function(msg){
	        
	        }
	    });
	}
}

$(".jkje").on("blur",function(){
	var flag = true;
	flag =judgeJkje($(this).val());
	if(!flag){
		$.zxsaas_plus.showalert('提示','请输入合法的整数或小数，小数点后最多两位');
		$("input[name='accountAmount']").val('0');
	}
	 //var jkjy =$(".yjje").val()-$(this).val();
	var jkjy = ($(".yjje").val())*1 >= 0 ? accSubtr($(".dqye").val(),$(this).val()) : accAdd($(this).val(),$(".dqye").val());
	if(jkjy < 0) {
		$.zxsaas_plus.showalert('提示','交款金额不能大于当前余额');
		$('.jkje').val(0);
		return 
	}
	
	var jkjy = ($(".yjje").val())*1 > 0 ? accSubtr($(".yjje").val(),$(this).val()) : accAdd($(this).val(),$(".yjje").val());
	
	if(jkjy >= 0) {
		 $(".jkjy").val(Number(jkjy).toFixed(2));
	}else{
		$.zxsaas_plus.showalert('提示','交款金额不能大于应交金额。');
		$('.jkje').val(0);
	}
});
$(".jkje").on("keyup",function(e){
	if(e.keyCode == '13'){
		$(".jkje").blur();
	}
})

function judgeJkje(value){
	var rex =/^\d+(\.\d{1,2})?$/;
	if(!rex.test(value)){
		return false;
	}else{
	    return true;	
	}
}
/*点击确定按钮进行保存*/
$(document).on("click",".saveData",function(){
	//$("#mainGrid").jqGrid("saveCell",lastrow,lastcell);
	var topinfo =$("#inquire_option").toJsonObject();
	var tableInfo =$("#Cashinfo").toJsonObject();
	$("#datetimepickerStart").removeAttr("readonly");
	tableInfo.paymentDate=$("#datetimepickerStart").val();
	$("#datetimepickerStart").attr("readonly", "readonly");
	tableInfo.accountId=topinfo.accountId;
	tableInfo.flowNo=topinfo.flowNo;
	tableInfo.paymentId=topinfo.paymentId;
	tableInfo.remark=topinfo.remark;
	tableInfo.sectionId=topinfo.sectionId;
	tableInfo.accountSection=topinfo.accountSection;
	if(tableInfo.paymentDate==""){
		$.zxsaas_plus.showalert('warning','交款日期不能为空!');
		return;
	}
	if(tableInfo.accountAmount == 0){
		$.zxsaas_plus.showalert('warning','交款金额为0不允许保存!');
		return;
	}else{
		if(!judgeJkje(tableInfo.accountAmount)){
			return;
		}
	}
	if(tableInfo.accountSection==""){
		$.zxsaas_plus.showalert('warning','请选择收款部门！');
		return;
	}
	if(tableInfo.accountId==""){
		$.zxsaas_plus.showalert('warning','请选择收款账户！');
		return;
	}
	tableInfo.remark = $('#retailRemark').val().trim()

    $.ajax({
        url: '/manager/retail/checkPay/saveCheckPay',
        type: "POST",
        traditional: true,
        datatype: "json",
        data: {
            retailPay: JSON.stringify(tableInfo)
        },
        success: function(data){
        	if(data.result == 1){
				$.zxsaas_plus.showalert('success','保存成功!')
				search_CashInfo();//切换门店查找表格信息
				$(".jkje").val('0');
				$('#retailRemark').val('')
			} else {
				$.zxsaas_plus.showalert('error',data.desc);
			}
        },
        error: function(msg){
        
        }
    });
});

var format = function(time, format){
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