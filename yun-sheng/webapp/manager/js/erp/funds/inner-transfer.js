$(function(){
	initTime();
	managerGrid();
	getPosition();
    initFilter()
    initTopForm()
	add();
	getAuthList(initDealDate);
	if(billsCode!="" && billsCode!=null && billsCode!=undefined){
		var param={};
		param.billsCode=billsCode;
		param.queryCodeStr="L";
		loadPageTable(param)
	}

    //输入框得到焦点时
    $("input").on('focus',function(){
        this.select()
    })

	// 初始化 顶部表单
	function initTopForm(){
		//转出部门
		$("#headerForm input[name='outSectionName']").comModalsSection({
			clickback:function(){
				var id=$("#headerForm input[name='outSectionName']").data('id');
				//设置编辑器值
				$("input[name='outSectionId']").val(id);
				$("input[name='managersUid']").val("");
				$("input[name='managerUname']").val("");
                outSectionAjax()
			}
		});
		//转入部门
		$("#headerForm input[name='inSectionName']").comModalsSection({
			clickback:function(){
				var id=$("#headerForm input[name='inSectionName']").data('id');
				//设置编辑器值
				$("input[name='inSectionId']").val(id);

                //获取转入账户
                $.request({
                    type : 'GET',
                    contentType :'application/json',
                    data:{"sectionId":id,"sectionType":"zr"},
                    url:options.FindCashAccountUrl,
                    success:function(data){
                        if(data.result==1){
                            var KZRAccount=data.data.KSYAccount;
                            //可使用资金账户（转入账户）
                            var ksySelectHtml="<select onchange='changeZrAccount();' name='inAccount'><option value=''>请选择</option>";
                            $.each(KZRAccount,function(i,value){
                                if(value.status!=1&&value.status!=2){
                                    ksySelectHtml+="<option value='"+value.valueCode+"'>"+value.accountName+"</option>";
                                }
                            });
                            ksySelectHtml+="</select>";
                            $("#inAccountName").html(ksySelectHtml);
                        }
                    }
                });

			}
		});
		//经办人
		$("#headerForm input[name='managerUname']").comModalsEmployeeBySection({
			sectionIds:'input[name="outSectionId"]',
			clickback:function () {
				var obj= $("#headerForm input[name='managerUname']");
				//设置编辑器值
				$("input[name='managerUname']").val(obj.val());
				$("input[name='managersUid']").val(obj.data('id'));
			}
		})
	}

	// 初始化 过滤
	function initFilter() {
		//部门
		$("#outsectionNameFilter").comModalsSection({
			clickback:function(){
				var id=$("#outsectionNameFilter").data('id');
				//设置编辑器值
				$("input[name='outSectionId']").val(id);
			}
		});

		$("#insectionNameFilter").comModalsSection({
			clickback:function(){
				var id=$("#insectionNameFilter").data('id');
				//设置编辑器值
				$("input[name='inSectionId']").val(id);
			}
		});
	}

});
//转出部门请求转出账户
function outSectionAjax() {
	var id=$("input[name='outSectionId']").val();
    $.request({
        type : 'GET',
        contentType :'application/json',
        data:{"sectionId":id,"sectionType":"zc"},
        url:options.FindCashAccountUrl,
        success:function(data){
            if(data.result==1){
                var KSYAccount=data.data.KSYAccount;
                //可使用资金账户（转入账户）
                var ksySelectHtml="<select onchange='changeZrAccount();' name='outAccount'><option value=''>请选择</option>";
                $.each(KSYAccount,function(i,value){
                    if(value.status!=1&&value.status!=2){
                        ksySelectHtml+="<option value='"+value.valueCode+"'>"+value.accountName+"</option>";
                    }
                });
                ksySelectHtml+="</select>";
                $("#outAccountName").html(ksySelectHtml);
            }
        }
    });
}

//转账金额校验
$(document).delegate("#amountInput,#feeAmountInput", "input propertychange", function(evt){
	clearNoNum(evt,this);
});
$(document).delegate("#amountInput,#feeAmountInput", "blur", function(evt){
	verifyNum(this);
});
var invalidFlag=0;
var type=$("#payreceiptType").val();
var total=1;//总记录数
var pageIndex=0;
var addFlag=true;//页面是否是新增状态
var options = {
	FindCashAccountUrl:"../../funds/innerTransfer/findCashAccount/",
	SaveInnerTransferUrl:"../../funds/innerTransfer/saveInnerTransfer/"
};
var adjustType="";
//首单
function firstPage(){
	var param=getSelectPageParam();
	param.queryCodeStr="F";
	loadPageTable(param);
}

//上一单按钮单击事件
function backPage(){
	var param=getSelectPageParam();
	param.queryCodeStr="P";
	param.refBillsDate=$("#headerForm input[name='billsDate']").val();
	param.refBillsId=$("#headerForm input[name='id']").val();
	loadPageTable(param);
}

//下一单按钮单击事件
function nextPage(){
	var param=getSelectPageParam();
	param.queryCodeStr="N";
	param.refBillsDate=$("#headerForm input[name='billsDate']").val();
	param.refBillsId=$("#headerForm input[name='id']").val();
	if(param.refBillsId==""){
		 $.zxsaas_plus.showalert("提示","没有下一单单据");
		 return;
	}
	loadPageTable(param);
}

//末单按钮单击事件
function lastPage(){
	var param=getSelectPageParam();
	param.queryCodeStr="L";
	loadPageTable(param);
}

//上一单，下一单,首单，末单分页查询ajax请求加载表格
function loadPageTable(param){
	$.request({
		type : 'POST',  
		contentType :'application/json', 
		url:"../../funds/innerTransfer/selectInnerTransferList/"+pageIndex,
		data:JSON.stringify(param),
		success:function(data){
		  if(data.result==1){
			  $("#copy").removeAttr("disabled");
			  pageIndex=data.data.pageIndex;
			  total=data.data.total;
			  addFlag=data.data.addFlag;
			  if(data.data.rows.length>0){
				  fillPageData(data.data.rows[0]);
				  forbiddenEdit();
			  }else{
				  if(param.queryCodeStr=='N'){
					  $.zxsaas_plus.showalert("提示",'已经是最后一单了');
				  }
				  if(param.queryCodeStr=='P'){
					  $.zxsaas_plus.showalert("提示",'已经是第一单了');
				  }
				  if(param.queryCodeStr=='L'){
					  $.zxsaas_plus.showalert("提示",'未查询到数据');
				  }
			  }
			  
		  }else{
			  $.zxsaas_plus.showalert("错误",data.desc);
		  }
	    }
	});
}

//获取加载表格分页查询参数
function getSelectPageParam(){
    var param=comGetFilterParam();
	param.id="";
	return param;
}

//填充页面数据
var currBillsData = null;
function fillPageData(data){
	currBillsData = data;
	if(data.billsDate!=null && data.billsDate!=undefined){
		data.billsDate = $.DateFormatFromTimestamp("yyyy-MM-dd",data.billsDate);
	}
	$("#managerUname").val(data.managersUname);
	$("#headerForm").writeJson2Dom(data);
	$("#bottomForm").writeJson2Dom(data);
     if(data.amount!=null){
       $("#amount").text("小写："+data.amount+"￥");
       $("#bigAmount").text("大写:人名币 "+data.bigAmount);
	}
	$("#outAccountName").text(data.outAccountName==null ? "" :data.outAccountName);
	$("#inAccountName").text(data.inAccountName==null ? "":data.inAccountName);
	$("#feeAccountName").text(data.feeAccountName==null ? "":data.feeAccountName);
	$("#feeAmount").text(data.feeAmount==null ? "":data.feeAmount);
	$("#caption").text(data.caption==null ? "":data.caption);
	$("#approverByName").text(data.approverByName==null ? "":data.approverByName);
	$("#attachBills").text(data.attachBills==null ? "":data.attachBills);
	
	if(data.billsStatus=="6"){
		$('.rightMap img').attr('src','../../images/guozhang.png');
		$(".btnHundred .invalid").removeAttr("disabled");
	}else if(data.billsStatus=="7"){
		$('.rightMap img').attr('src','../../images/status/statusRed.png');
		$(".btnHundred .invalid").attr("disabled","disabled");
	}else{
		$('.rightMap img').removeAttr("src");
	}
}



//新增
function add(){
	allowEdit();
	getAuthList(initDealDate);
	$("#feeAccountName").html("");
	$("#feeAccountName").append("<select name='feeAccount'></select>");
    $("#copy").attr("disabled",true);
    resetData();
    $('#billsDate').val(_authList.maxDate)
	$('.rightMap img').removeAttr("src");
	total=1;pageIndex=0;
	reset();
    getDefaultSectionAccount()
    appendSelectData()
    outSectionAjax()
	$("#outSectionName").val($('#sectionId').data('texts'))
}


//拼接下拉框
function appendSelectData(){
	//可使用资金账户（转入账户）
	var ksySelectHtml="<select onchange='changeZrAccount();' name='inAccount'><option value=''>请选择</option>";
	$("#inAccountName").html(ksySelectHtml);
	
	//可转入资金账户（转出账户）
	var kzrSelectHtml = "<select onchange='changeZcAccount();' name='outAccount'><option value=''>请选择</option>"
	$("#outAccountName").html(kzrSelectHtml);
}

//转入账户改变事件
function changeZrAccount(){
	setFeeAccount();
}

//转出账户改变事件
function changeZcAccount(){
	setFeeAccount();
}

//设置手续费账户（手续费账户只能为转入账户和转出账户的一个值）
function setFeeAccount(){
	$("#feeAccountName").find("select").html("");
	var outAccountId=$("#outAccountName").find("option:selected").val();
	var outAccountName=$("#outAccountName").find("option:selected").text();
	var inAccountId=$("#inAccountName").find("option:selected").val();
	var inAccountName=$("#inAccountName").find("option:selected").text();
	var feeAccountHtml="";
	if(outAccountId=="" && inAccountId ==""){
		feeAccountHtml+="<option value=''>请选择</option>";
	}
	if(outAccountId!=""){
		feeAccountHtml+="<option value='"+outAccountId+"'>"+outAccountName+"</option>";
	}
	if(inAccountId!=""){
		feeAccountHtml+="<option value='"+inAccountId+"'>"+inAccountName+"</option>";
	}
	$("#feeAccountName").find("select").html(feeAccountHtml);
}

//新增清空数据
function resetData(){
	addFlag=true;
	$("#headerForm input").val("");
	$("#bottomForm")[0].reset();
	$("#amount").html("小写：<input id='amountInput' name='amount' onkeyup='checkInput.checkNum(this,12);'/> ￥");
	$("#bigAmount").html("");
	$("#approverByName").html("");
	$("#caption").html("<input  name='caption' />");
	$("#attachBills").html("<input name='attachBills' onkeyup='checkInput.checkStrNum(this,32);'/>");
	$("#feeAmount").html("<input name='feeAmount' id='feeAmountInput' onkeyup='checkInput.checkNum(this,12);'/>");
}

//金额小写与大写的转换
$(document).delegate("#amount", "input propertychange", function(e){
    //如果输入的不是数字，则将其设置为空  
	var value=$("#amountInput").val();
    this.value =value.replace(/[^\d\.]/g,'').replace(/^0/,'');  
    var Num = this.value;  
    if(Num=="") {  
        //输入框删减为空时，将大写金额的内容值设为原始状态，当然也可以根据需求进行修改  
        $("#bigAmount").text("");  
        return false;  
    }  
    part = String(Num).split(".");  
    newchar = "";  
    for(i=part[0].length-1;i>=0;i--){  
        tmpnewchar = ""  
        perchar = part[0].charAt(i);  
        switch(perchar){  
            case "0": tmpnewchar="零" + tmpnewchar ;break;  
            case "1": tmpnewchar="壹" + tmpnewchar ;break;  
            case "2": tmpnewchar="贰" + tmpnewchar ;break;  
            case "3": tmpnewchar="叁" + tmpnewchar ;break;  
            case "4": tmpnewchar="肆" + tmpnewchar ;break;  
            case "5": tmpnewchar="伍" + tmpnewchar ;break;  
            case "6": tmpnewchar="陆" + tmpnewchar ;break;  
            case "7": tmpnewchar="柒" + tmpnewchar ;break;  
            case "8": tmpnewchar="捌" + tmpnewchar ;break;  
            case "9": tmpnewchar="玖" + tmpnewchar ;break;  
        }  
        switch(part[0].length-i-1){  
            case 0: tmpnewchar = tmpnewchar +"元" ;break;  
            case 1: if(perchar!=0)tmpnewchar= tmpnewchar +"拾" ;break;  
            case 2: if(perchar!=0)tmpnewchar= tmpnewchar +"佰" ;break;  
            case 3: if(perchar!=0)tmpnewchar= tmpnewchar +"仟" ;break;  
            case 4: tmpnewchar= tmpnewchar +"万" ;break;  
            case 5: if(perchar!=0)tmpnewchar= tmpnewchar +"拾" ;break;  
            case 6: if(perchar!=0)tmpnewchar= tmpnewchar +"佰" ;break;  
            case 7: if(perchar!=0)tmpnewchar= tmpnewchar +"仟" ;break;  
            case 8: tmpnewchar= tmpnewchar +"亿" ;break;  
            case 9: tmpnewchar= tmpnewchar +"拾" ;break;  
        }  
        newchar = tmpnewchar + newchar;  
    }  
    if(Num.indexOf(".")!=-1){  
        if(part[1].length > 2) {  
            part[1] = part[1].substr(0,2)  
        }  
        for(i=0;i<part[1].length;i++){  
            tmpnewchar = ""  
            perchar = part[1].charAt(i)  
            switch(perchar){  
                case "0": tmpnewchar="零" + tmpnewchar ;break;  
                case "1": tmpnewchar="壹" + tmpnewchar ;break;  
                case "2": tmpnewchar="贰" + tmpnewchar ;break;  
                case "3": tmpnewchar="叁" + tmpnewchar ;break;  
                case "4": tmpnewchar="肆" + tmpnewchar ;break;  
                case "5": tmpnewchar="伍" + tmpnewchar ;break;  
                case "6": tmpnewchar="陆" + tmpnewchar ;break;  
                case "7": tmpnewchar="柒" + tmpnewchar ;break;  
                case "8": tmpnewchar="捌" + tmpnewchar ;break;  
                case "9": tmpnewchar="玖" + tmpnewchar ;break;  
            }  
            if(i==0)tmpnewchar =tmpnewchar + "角";  
            if(i==1)tmpnewchar = tmpnewchar + "分";  
            newchar = newchar + tmpnewchar;  
        }  
    }  
    while(newchar.search("零元") != -1){  
        newchar = newchar.replace("零零", "零");  
        newchar = newchar.replace("零亿", "亿");  
        newchar = newchar.replace("亿万", "亿");  
        newchar = newchar.replace("零万", "万");  
        newchar = newchar.replace("零元", "元");  
        newchar = newchar.replace("零角", "");  
        newchar = newchar.replace("零分", "");  
    }  
    if(newchar.charAt(newchar.length-1) == "元" || newchar.charAt(newchar.length-1) == "角"){  
        newchar = newchar+"整";  
    }  
    $("#bigAmount").text("大写：人名币 "+newchar);
});


//保存并过账
function saveAndPost(){
	$("#headerForm").data('bootstrapValidator').validate();  
	if(!($('#headerForm').data('bootstrapValidator').isValid())){
		refreshValidator('#headerForm');
	    return ;
	}
	var params=getSaveParams();
	 params.billsDate=$('#billsDate').val();
	var checkResult=checkSaveParam(params);
	if(checkResult){
		return;
	}
	$.request({
		type : 'POST',  
		contentType :'application/json', 
		url:options.SaveInnerTransferUrl,
		data:JSON.stringify(params),
		success:function(data){
		  //refreshValidator('#headerForm');
		  $.zxsaas_plus.showalert("提示",data.desc); 
		  $("#headerForm").data('bootstrapValidator').resetForm();
		  if(data.result !=-1){
			  var param={};
			  param.id=data.result;
			  loadPageTable(param);
		  }
	    }
	});
}

//获取保存参数
function getSaveParams(){
	var param=$("#headerForm").toJsonObject();
	param.billsStatus=1;//草稿
	if($("#bigAmount").text()!=null){
		param.bigAmount=$("#bigAmount").text().substring(7);
	}
	param.type=type;
	delete param.inSectionName;
	delete param.outSectionName;
	delete param.managerUname;
	return param;
}

//校验保存参数
function checkSaveParam(params){
	var flag=false;
	if($("#billsCode").val() != ""){
		$.zxsaas_plus.showalert("提示","该单据已保存过账!");
		flag=true;
		return flag;
	}
	if($('#amountInput').val()=='0'||$('#amountInput').val()=='0.00'||$('#amountInput').val()==''){
		$.zxsaas_plus.showalert("提示","转账金额不能为0!");
		flag=true;
		return flag;
	}
	if(params.outAccount==""){
		$.zxsaas_plus.showalert("提示","请选择转出账户!"); 
		flag=true;
		return flag;
	}
	if(params.inAccount==""){
		$.zxsaas_plus.showalert("提示","请选择转入账户!"); 
		flag=true;
		return flag;
	}
	
	if(params.outAccount!="" && params.outAccount==params.inAccount && params.inSectionId==params.outSectionId){
		$.zxsaas_plus.showalert("提示","转出账户与转入账户不能相同!");
		flag=true;
		return flag;
	}
}

//复制按钮单击事件(有单据编号才让复制，复制一模一样的数据，单据编号清空，无单据编号不让复制)
function copy(){
	allowEdit();
	addFlag=true;
	$("#copy").attr("disabled",true);
	$('.rightMap img').removeAttr("src");
	
	$(".btnHundred .invalid").removeAttr("disabled");
	/**
	 * 1，删除单据ID
	 * 2，改变表单成可编辑状态
	 * 3，复制数据填充表单
	 * 
	 */
	
	
	//currBillsData.billsDate = _authList.maxDate
	currBillsData.billsCode = "";
	currBillsData.id = "";
	
	$("#managerUname").val(currBillsData.managersUname);
	$("#headerForm").writeJson2Dom(currBillsData);
    $('#bottomForm')[0].reset()
     if(currBillsData.amount!=null){
		$("#amount").html("小写：<input id='amountInput' value='" + currBillsData.amount + "' name='amount' onkeyup='checkInput.checkNum(this,12);'/> ￥");
		$("#bigAmount").html("大写:人名币 " + currBillsData.bigAmount);
	}
    $("#approverByName").text(currBillsData.approverByName==null ? "":currBillsData.approverByName);
    $("#caption").html("<input  name='caption' value='" + (currBillsData.caption==null ? "":currBillsData.caption) + "'/>");
    $("#attachBills").html("<input name='attachBills' vlaue='" + (currBillsData.attachBills==null ? "":currBillsData.attachBills) + "' onkeyup='checkInput.checkStrNum(this,32);'/>");
    $("#feeAmount").html("<input name='feeAmount' id='feeAmountInput'  readonly='readonly' value='" + (currBillsData.feeAmount==null ? "":currBillsData.feeAmount) +"' onkeyup='checkInput.checkNum(this,12);'/>");
 
    $("#feeAccountName").html("<select name='feeAccount'></select>");
    
	//转出部门
	$.request({
		type : 'GET',  
		contentType :'application/json', 
		data:{"sectionId":currBillsData.outSectionId,"sectionType":"zc"},
		url:options.FindCashAccountUrl,
		success:function(data){
		  if(data.result==1){
			 var KSYAccount=data.data.KSYAccount;
			//可使用资金账户（转入账户）
			var ksySelectHtml="<select onchange='changeZrAccount();' name='outAccount'><option value=''>请选择</option>";
			$.each(KSYAccount,function(i,value){
				if(value.status!=1&&value.status!=2){
					ksySelectHtml+="<option value='"+value.valueCode+"'>"+value.accountName+"</option>";
				}
			});
			ksySelectHtml+="</select>";
			$("#outAccountName").html(ksySelectHtml);
			$("#outAccountName").find("select").val(currBillsData.outAccount);
			setFeeAccount();
		  }
	    }
	});


	//获取转入账户
	$.request({
		type : 'GET',  
		contentType :'application/json', 
		data:{"sectionId":currBillsData.inSectionId,"sectionType":"zr"},
		url:options.FindCashAccountUrl,
		success:function(data){
		  if(data.result==1){
			 var KZRAccount=data.data.KSYAccount;
			//可使用资金账户（转入账户）
			var ksySelectHtml="<select onchange='changeZrAccount();' name='inAccount'><option value=''>请选择</option>";
			$.each(KZRAccount,function(i,value){
			    ksySelectHtml+="<option value='"+value.valueCode+"'>"+value.accountName+"</option>";
			});
			ksySelectHtml+="</select>";
			$("#inAccountName").html(ksySelectHtml);
			$("#inAccountName").find("select").val(currBillsData.inAccount);
			setFeeAccount();
		  }
	    }
	});

	
}

//转出、转入部门模态框
function showSectionDialog(btnId){
	var url="";
	if(btnId==1){
		url='../../jxc/storage/authorityAndTree/findTree';
	}else{
		url="../../funds/innerTransfer/selectZrSection";
	}
	//树设置参数
	var setting = {  
		    data: {//数据属性设置
		        simpleData: {enable: true,idKey: "code",pIdKey: "pCode",rootPId: null}
	        },
	        callback:{
	        	onClick: function (event, treeId, treeNode, msg) {
	        	   zTreeSectionClick(btnId,treeId,treeNode);
			   },
	        },
			view: {//样式设置
				showIcon: false
			}
	    }; 
	$.request( {
		type : 'Get',
		url:url,
		dataType : "json", // 可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		success : function(data) {
			$.fn.zTree.init($("#sectionTreeData"), setting, data);
			var zTree = $.fn.zTree.getZTreeObj("sectionTreeData");
			zTree.expandAll(true);// 展开全部节点
			$("#sectionModal").modal("show");
		},
		error : function(msg) {
			alert(" 数据加载失败！" + msg);
		}
	});
}



//树点击事件
function zTreeSectionClick(btnId,treeId,treeNode){
	//只能选择最末级
	if(treeNode.children.length != 0) return false;
	//转出部门
	if(treeId=="sectionTreeData" && !ifFilterClick && btnId=="outSectionModal"){
		if(treeNode.id!="-1"){
			$("#outSectionName").val(treeNode.name);
			$("#sectionId").val(treeNode.obj.id);
			$("#managerUname").val("");
			$("#managersUid").val("");
		}
		$("#sectionModal").modal("hide");
		$.request({
			type : 'GET',  
			contentType :'application/json', 
			data:{"sectionId":treeNode.obj.id,"sectionType":"zc"},
			url:options.FindCashAccountUrl,
			success:function(data){
			  if(data.result==1){
				 var KSYAccount=data.data.KSYAccount;
				//可使用资金账户（转入账户）
				var ksySelectHtml="<select onchange='changeZrAccount();' name='outAccount'><option value=''>请选择</option>";
				$.each(KSYAccount,function(i,value){
					if(value.status!=1&&value.status!=2){
						ksySelectHtml+="<option value='"+value.valueCode+"'>"+value.accountName+"</option>";
					}
				});
				ksySelectHtml+="</select>";
				$("#outAccountName").html(ksySelectHtml);
			  }
		    }
		});
	}
	
	//转入部门
	if(treeId=="sectionTreeData" && !ifFilterClick && btnId=="inSectionModal"){
		$("#inSectionName").val(treeNode.name);
		$("#inSectionId").val(treeNode.obj.id);
		refreshValidatorField("inSectionName",'#headerForm');//刷新验证信息
		//获取转入账户
		$.request({
			type : 'GET',  
			contentType :'application/json', 
			data:{"sectionId":treeNode.obj.id,"sectionType":"zr"},
			url:options.FindCashAccountUrl,
			success:function(data){
			  if(data.result==1){
				 var KZRAccount=data.data.KSYAccount;
				//可使用资金账户（转入账户）
				var ksySelectHtml="<select onchange='changeZrAccount();' name='inAccount'><option value=''>请选择</option>";
				$.each(KZRAccount,function(i,value){
					if(value.status!=1&&value.status!=2){
						 ksySelectHtml+="<option value='"+value.valueCode+"'>"+value.accountName+"</option>";
					}
				   });
				ksySelectHtml+="</select>";
				$("#inAccountName").html(ksySelectHtml);
			  }
		    }
		});
		
		$("#sectionModal").modal("hide");
	}
	
	//过滤条件转出部门
	if(treeId=="sectionTreeData" && ifFilterClick  && btnId=="outSectionModal"){
		$("#filterSearchForm input[name='outSectionName']").val(treeNode.name);
		$("#filterSearchForm input[name='outSectionId']").val(treeNode.id);
		ifFilterClick=false;
		$("#sectionModal").modal("hide");
	}
	
	//过滤条件转入部门
	if(treeId=="sectionTreeData" && ifFilterClick  && btnId=="inSectionModal"){
		$("#filterSearchForm input[name='inSectionName']").val(treeNode.name);
		$("#filterSearchForm input[name='inSectionId']").val(treeNode.id);
		ifFilterClick=false;
		$("#sectionModal").modal("hide");
	}
}

//过滤条件部门文本框聚焦事件
$(document).delegate("#filterSearchForm input[name='outSectionName'],#filterSearchForm  input[name='inSectionName']", "focus", function(e){
	ifFilterClick=true;
	if(this.name=="outSectionName"){
		showSectionDialog("outSectionModal");
	}else if(this.name=="inSectionName"){
		showSectionDialog("inSectionModal");
	}
});

//过滤按钮单击事件
function filterModalBtnClick(){
	//reset();
	$("#filterSearchForm input[name='remark']").removeAttr("readonly");
	$("#filterModel").modal("show");
}

//过滤弹出框重置按钮单击事件
function reset(){
	$("#filterSearchForm")[0].reset();
	initTime();
}

//过滤查询
function searchPayment(){
	$("#filterModel").modal("hide");
	pageIndex=0;
    var param=comGetFilterParam();
	loadPageTable(param);
}

//禁止页面编辑,禁用选择按钮
function forbiddenEdit(){
	$("#headerForm input[name='billsDate'],input[name='remark']").attr("readonly","readonly");
	$("#headerForm :button").attr("disabled","disabled");
	$(".saveAndPost").attr("disabled","disabled");
}

//允许页面编辑，允许选择按钮
function allowEdit(){
	$("#headerForm input[name='billsDate'],input[name='remark']").removeAttr("readonly");
	$("#headerForm :button").removeAttr("disabled");
	$(".saveAndPost").removeAttr("disabled");
}

$(document).on('dblclick','#managerModalGrid>tbody>tr.active',function(){
	refreshValidatorField("managerUname",'#headerForm');//刷新验证信息
})