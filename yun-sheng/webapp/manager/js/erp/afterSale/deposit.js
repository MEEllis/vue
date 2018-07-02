function showDepositModal(){
	var sectionId=$("#verifYF input[name='repairSectionId']").val();
	if(sectionId==""){
		$.zxsaas_plus.showalert("提示","请先选择维修部门!");
		return;
	}
	if($("#depositTotal").val()=="0.00" || $("#depositTotal").val()==''){
		reloadDepositGrid(sectionId);
	}
	depositGridFootData();
	$("#depositModal").modal("show");
}

function reloadDepositGrid(sectionId){
	$("#depositModalGrid").jqGrid('setGridParam',{  
		url:"/manager/salesCommon/findAccountById",
        datatype:'json',  
        postData:{"sectionId":sectionId}
    }).trigger("reloadGrid"); //重新载入  
}

function cellOnBlurs2(){
	$("#depositModalGrid").jqGrid("saveCell",lastrow,lastcell);
	depositGridFootData();
}

function cellOnBlur2(){
	$("#depositModalGrid").jqGrid("saveCell",lastrow,lastcell);
	depositGridFootData();
}

//禁止输入非数字
function clearNoNum(evt,obj){
 var reg=/^(?:[1-9]+\d*|0)(\.\d+)?$/;
 if(!reg.test(obj.value)){
	   obj.value = obj.value.replace(/[^\d.]/g,"");
 }
}

//付款方式保存按钮单击事件
function saveDeposit(){
	var payreceiptAmout=$.formatFloat($("#depositModalGrid").getCol('payreceiptAmout',false,'sum'),2);
	$("#depositTotal").val(payreceiptAmout);
	qiankuan();
}

var qiankuan = function(){
	//应收
	var a= $('.shishou').val();	
	//预收
	var b=$('.yushou').val();
	//收款
	var c=$('.YFhideIn4').val().replaceAll(',','');
	//退押金
	var d=$('.haihui1').val();
	//押金
	var e=$('.yajin').val();
	if($('.haihui2').prop('checked')){
		var aa=(a*1-b*1-c*1+d*1-e*1).toFixed(2);
		$('.qiankuanYY').val(aa);
	}else{
		var bb=(a*1-b*1-c*1).toFixed(2);
		$('.qiankuanYY').val(bb);
	}
}

//付款方式grid
var lastrow="";
var lastcell="";
function initDepositGrid(){
	$.jgrid.defaults.width = 1280;
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';	
	var colNames = ['id','账户类别','账户名称','金额','备注',"资金账户id","资金账户类型code"];
	var JqGridColModel=[
	                    {name:'id',index:'id', width:1,align:'center',key:true,sortable:false,hidden:true},
						{name:'accountTypeName',index:'account_id', width:150,align:'center', sorttype:'string',sortable:false},
						{name:'accountName',index:'account_name', width:150,align:'center', sorttype:'integer',sortable:false},
						{name:'payreceiptAmout',index:'payreceiptAmout', width:100,align:'center', sorttype:'Long',formatter:"number",editable:true,editoptions:{readonly:false,onblur:"cellOnBlurs2(this)",onkeyup:"clearNoNum(event,this)"},sortable:false},
						{name:'remark',index:'remark', width:160,align:'center', sorttype:'string',editable:true,editoptions:{readonly:false,onblur:"cellOnBlur2()"},sortable:false},
						{name:'accountId',index:'accountId', width:1,align:'center',hidden:true,sortable:false},
						{name:'accountType',index:'accountType', width:1,align:'center',hidden:true,sortable:false}
	                ];
	loadtable();
	function loadtable(){
			$("#depositModalGrid").jqGrid({
				mtype:"GET",
				datatype: "json",
				jsonReader  : {	
					root: "data.rows",
					repeatitems: false
						},
				colNames:colNames,          
	            colModel:JqGridColModel,
	            cellsubmit: 'clientArray',//单元格保存内容的位置		
	            editurl: 'clientArray',
	            sortable:false,			            
	            rownumbers:true,
	           	cellEdit:true,
	            width: "80%" ,
				autowidth:true,
				rownumWidth:40,
				shrinkToFit:false,
				footerrow:true,  //设置表格显示表脚
				userDataOnFooter:true,//设置userData 显示在footer里
				beforeSelectRow:function(id){
					var rownumber=$('#' + id)[0].rowIndex;
					$('#'+rownumber+'_payreceiptAmout').bind("input propertychange",function(){
						var payreceiptAmout=Number($(this).val());
						payreceiptAmout += Number($("#depositModalGrid").getCol('payreceiptAmout',false,'sum')); 
						$("#depositModalGrid").jqGrid('footerData','set',{
					        "payreceiptAmout": payreceiptAmout,
					       }
						);
					});
					$(document).delegate('#'+rownumber+'_payreceiptAmout', "contextmenu", function(e){
						return false;
					});
				},
				beforeEditCell:function(rowid,cellname,v,iRow,iCol){
					lastrow = iRow;
					lastcell = iCol;		
				},
				gridComplete:function(data){
					$("#depositModal tr:last").find("td").eq(0).text("合计");
					depositGridFootData();
					
				}
			})
			jQuery("#depositModalGrid").jqGrid('setLabel',0, '序号');
	}
}

function depositGridFootData(){
	var payreceiptAmout=$("#depositModalGrid").getCol('payreceiptAmout',false,'sum');
	$("#depositModalGrid").jqGrid('footerData','set',{
        "payreceiptAmout": payreceiptAmout,
       }
	);
}