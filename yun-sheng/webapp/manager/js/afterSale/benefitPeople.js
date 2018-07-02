
initDataGrid()
contactunitGrid()
var registerModel=1
function initDataGrid(){
	//配置
	var paras = {
	    gridId:'dataGrid', 
	    colNames:['id','业务流水号','手机串号','往来单位','客户姓名','联系电话','商品名称','故障说明',
	               '外观描述','预报价','商品分类','是否返修','备注','商品id','往来单位id',], 
	    colModel:
	    	[
				 		{name:'id',index:'id',width:70,align:'center',hidden:true},
	                   {name:'flowNo',index:'flowNo', width:200,align:'center',sorttype:'string',sortable:false},
	                   {name:'imei',index:'imei', width:150,align:'center',sorttype:'string',sortable:false},
	                   {name:'contactsunitName',index:'contactsunitName', width:150,align:'center',sorttype:'string',sortable:false},
	                   {name:'customId',index:'customId', width:100,align:'center',sorttype:'string',sortable:false},
	                   {name:'telephone',index:'telephone', width:150,align:'center',sorttype:'string',sortable:false},
	                   {name:'goodsName',index:'goodsName', width:150,align:'center',sorttype:'string',sortable:false,},
	                   {name:'falutDesc',index:'falutDesc', width:150,align:'center',sorttype:'string',sortable:false},
	                   {name:'looksDesc',index:'looksDesc', width:150,align:'center',sorttype:'string',sortable:false},
	                   {name:'quotePrice',index:'quotePrice', width:100,align:'center',sorttype:'string',sortable:false},
	                   {name:'goodsClassName',index:'goodsClassName', width:150,align:'center',sorttype:'string',sortable:false},
	                   {name:'returnFalg',index:'returnFalg', width:100,align:'center',sorttype:'string',sortable:false,formatter:'select',editoptions:{value:"1:是;0:否"}},
	                   {name:'remark',index:'remark', width:150,align:'center',sorttype:'string',sortable:false},
	                   {name:'goodsId',index:'goodsId', width:150,align:'center',sorttype:'string',hidden:true},
	                   {name:'contactsunitId',index:'contactsunitId', width:150,align:'center',sorttype:'string',hidden:true}
           ],
           height:$(window).height()*0.5,
           width: "100%" ,
           noShowOp:false
	};
	//回调函数
	var callBackList = {
			
	};
	dataGrid = new MyEiditGrid(paras,callBackList);
}

//首单
function firstBill(){
	queryCodeStr="F";
	searchAfterSaleCard();
}
//末单
function lastBill(){
	queryCodeStr="L";
	searchAfterSaleCard();
}
//上一单
function prevBill(){
	if(queryCodeStr=="F"){
		$.zxsaas_plus.showalert("提示" ,"当前已是第一单！");
	}else{
		queryCodeStr="P";
		searchAfterSaleCard();
	}
}
//下一单
function nextBill(){
	if(queryCodeStr=="L"){
		$.zxsaas_plus.showalert("提示" ,"当前已是最后一单！");
	}else{
		queryCodeStr="N";
		searchAfterSaleCard();
	}
}

$("#datetimepickerStart1").datetimepicker({
	  lang:"ch",           //语言选择中文
    format:"Y-m-d",      //格式化日期
    timepicker:false,    //关闭时间选项
    todayButton:false ,   //关闭选择今天按钮
    value:new Date(),
    maxDate:new Date()
	});

var queryCodeStr="L",refBillsId,deliveryDateStr,trackNo,repairSectionId,contactsunitId;
searchAfterSaleCard()
function searchAfterSaleCard(){
	var param={}
	param.queryCodeStr=queryCodeStr;
	if(queryCodeStr=="L" || queryCodeStr=="F"){
		param.refBillsId=null;
	}else{
		param.refBillsId=refBillsId;
	}
	
	param.deliveryDateStr=deliveryDateStr;
	param.trackNo=trackNo;
	param.repairSectionId=repairSectionId;
	param.contactsunitId=$('.unitSearchYF1').val();
	$.ajax( {
		type : 'post',
		url : '/manager/afterSalesService/wxfc/selectWxfcPage',
		contentType :'application/json', 
		dataType : "json", // 可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		data:JSON.stringify(param),
		success : function(data) {
			var billInfo=data.data.pageData
			if(billInfo!=null){
				$("#dataGrid").jqGrid('clearGridData');
				refBillsId=billInfo.id;
				$('.billsNo').val(billInfo.billsNo);
				$('.deliveryDate').val(billInfo.deliveryDateStr);
				$('.expressName').val(billInfo.expressName);
				$('.trackNo').val(billInfo.trackNo);
				$('.unitYF').val(billInfo.contactsunitName);
				$('.address').val(billInfo.address);
				$('.linkman').val(billInfo.linkman);
				$('.telephone').val(billInfo.telephone);
				$('.repairSectionName').val(billInfo.repairSectionName);
				tableInfo=billInfo.wxfcDetailList;
				$.each(tableInfo,function(i,v){
					$("#dataGrid").jqGrid('addRowData',[i],v);
				})
				
//				var info=data.data.aftersaleHandleMain.aftersaleHandleDtlList;
//				if(info.length>0){
//					$.each(info,function(i,value){
//						$("#dataGrid").jqGrid('addRowData',[i],value);
//					})
//				}else{
//					$("#dataGrid").jqGrid('clearGridData');
//					$.zxsaas_plus.showalert("提示","未查询到单据信息");
//				}
			}else{
				
//				$("#dataGrid").jqGrid('clearGridData');
				$.zxsaas_plus.showalert("提示","未查询到单据信息");
			}
		},
		error : function(msg) {
			$.zxsaas_plus.showalert(" 数据加载失败！" + msg);
		}
	});
}

$('.cxFangC').click(function(){
	refBillsId=null
	$("#dataGrid").jqGrid('clearGridData');
	deliveryDateStr=$('#datetimepickerStart1').val();
	trackNo=$('.kdDAN').val();
	searchAfterSaleCard()
})

function showSectionModal(data){
	
	//树设置参数
	var setting = {  
		    data: {//数据属性设置
		        simpleData: {enable: true,idKey: "code",pIdKey: "pCode",rootPId: null}
	        },
	        callback:{
			   onDblClick:function(event, treeId, treeNode){
	            	if($(event.target).is('span')){
	            		if(treeNode.check_Child_State==-1){
            				$('.repairName').val(treeNode.name);
            				repairSectionId=treeNode.obj.id;
	            			$("#sectionModal").modal('hide');
	                	}
	            	}
	            }
	        },
			view: {//样式设置
				showIcon: false
			}
	    }; 
	$.ajax( {
		type : 'Get',
		url:'/manager/jxc/storage/authorityAndTree/findTree',
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

//页面跳转
$(document).on('click','.newButton',function(){
	window.location.href="/manager/afterSalesService/wxfc/page";
});






















