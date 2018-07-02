
var	lastrow = "";
var lastcell = "";
var isCheck=false;
var ifEnableAuxliayImei;
var checkRowId;
obtainAcctount2();
function loadmodal(options){
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';	
$('#jqGrid_RAS').jqGrid({
	
	colNames:['id','选择','售后处理单号','发货单号','运单号','业务流水号','手机串号','串号id',
              '往来单位','往来单位ID','客户姓名','联系电话','商品名称','故障说明','外观描述','预报价','商品分类','处理方式','是否返修','备注','服务类型','商品id','仓库Id'
              ,'sourceTabId','sourceTabName','ifManageImei','ifEnableAuxliayImei','imeiLength','auxliayImeiLength'],          
    colModel:[
				{name:'id',index:'id',width:70,align:'center',hidden:true},
				{name:'myCheck',index:'myCheck', width:100,align:'center',sorttype:'string',formatoptions:{disabled:false},editoptions:{value:'1:0'},
					formatter:function(cellvalue, options, rowObject){
						return '<input type="checkbox" onchange="changeData('+options.rowId+')"/>'
					},
				},
				{name:'shclBillsCode',index:'shclBillsCode', width:150,align:'center',sorttype:'string'},
				{name:'billsNo',index:'billsNo', width:150,align:'center',sorttype:'string'},
				{name:'trackNo',index:'trackNo', width:150,align:'center',sorttype:'string'},
				{name:'flowNo',index:'flowNo', width:200,align:'center',sorttype:'string'},
				{name:'imei',index:'imei', width:150,align:'center',sorttype:'string'},
				{name:'imeiId',index:'imeiId', width:150,align:'center',sorttype:'string',hidden:true},
				{name:'contactsunitName',index:'contactsunitName', width:100,align:'center',sorttype:'string'},
				{name:'contactsunitId',index:'contactsunitId', width:100,align:'center',sorttype:'string',hidden:true},
				{name:'customId',index:'customId', width:100,align:'center',sorttype:'string'},
				{name:'telephone',index:'telephone', width:150,align:'center',sorttype:'string'},
				{name:'goodsName',index:'goodsName', width:100,align:'center',sorttype:'string'},
				{name:'falutDesc',index:'falutDesc', width:150,align:'center',sorttype:'string'},
				{name:'looksDesc',index:'looksDesc', width:150,align:'center',sorttype:'string'},
				{name:'quotePrice',index:'quotePrice', width:100,align:'center',sorttype:'string'},
				{name:'goodsClassName',index:'goodsCategoryName', width:100,align:'center',sorttype:'string'},
				{name:'handleMode',index:'handleMode', width:100,align:'center',sorttype:'string',formatter: "select", editoptions:{value:"1:自修;2:返厂;3:外修;4:换机;5:退货"}},
				{name:'returnFalg',index:'returnFalg', width:100,align:'center',sorttype:'string',formatter:'select',editoptions:{value:'0:否;1:是'}},
				{name:'remark',index:'remark', width:100,align:'center',sorttype:'string'},
				{name:'serviceType',index:'serviceType', width:100,align:'center',sorttype:'string',sortable:false,formatter: "select", editoptions:{value:"1:售后;2:售前"}},
				
				{name:'goodsId',index:'goodsId', width:100,align:'center',sorttype:'string',hidden:true},
				{name:'storageId',index:'storageId', width:100,align:'center',sorttype:'string',hidden:true},
				{name:'sourceTabId',index:'sourceTabId', width:100,align:'center',sorttype:'string',hidden:true},
				{name:'sourceTabName',index:'sourceTabName', width:100,align:'center',sorttype:'string',hidden:true},
				{name:'ifManageImei',index:'ifManageImei', width:100,align:'center',sorttype:'string',hidden:true},
				{name:'ifEnableAuxliayImei',index:'ifEnableAuxliayImei', width:100,align:'center',sorttype:'string',hidden:true},
				{name:'imeiLength',index:'imeiLength', width:100,align:'center',sorttype:'string',hidden:true},
				{name:'auxliayImeiLength',index:'auxliayImeiLength', width:100,align:'center',sorttype:'string',hidden:true},
				],
    sortable:false,			            
    shrinkToFit:false,
    cellsubmit: 'clientArray',//单元格保存内容的位置		
    editurl: 'clientArray',
    viewrecords: true,		           
   	cellEdit:true,
   	rownumbers:20,
   	width: "100%" ,
    height: $(window).height()*0.40,
	autowidth:true,
	shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
	footerrow:false,  //设置表格显示表脚
	userDataOnFooter:false,//设置userData 显示在footer里
	onCellSelect:function(rowid,iCol,cellcontent,e){
		
	},
	onSelectRow:function(rowid,status){
		
		
	},
	
	beforeEditCell:function(rowid,cellname,v,iRow,iCol){
			
	},
	gridComplete: function() {
	
//		
	},
	loadComplete:function(){

		
	}
})
}

function changeData(data){
	console.log(data);
	if(data===checkRowId){
		checkRowId='';
		isCheck=false;
	}else{
		isCheck=true;
		checkRowId=data;
		var info=$('#jqGrid_RAS').jqGrid('getRowData', data);
		console.log(info);
		if(!info.ifManageImei){
			$('#newImei').attr('disabled',true);
			$('#newAuxiliaryImei').attr('disabled',true);
			auxliayImeiLength=null;
			imeiLength=null
		}else{
			$('#newImei').attr('disabled',false);
			imeiLength=info.imeiLength;
			ifEnableAuxliayImei=info.ifEnableAuxliayImei;
			if(!info.ifEnableAuxliayImei){
				$('#newAuxiliaryImei').attr('disabled',true);
				auxliayImeiLength=null
			}else{
//				if(!info.auxliayImeiLength){
//					$('#newAuxiliaryImei').attr('disabled',true);
//				}else{
					$('#newAuxiliaryImei').attr('disabled',false);
					auxliayImeiLength=info.auxliayImeiLength;
//				}
			}
		}
	}
}


var billsNo,deliveryDateStr,expressName,repairContactsunitId,contactsunitId,trackNo,repairSectionId,imeiLength,auxliayImeiLength
getData()
function getData(){
	var param={}
	param.billsNo=$('.billsNo').val();
	param.deliveryDateStr=$('.deliveryDateBegin').val();
	param.expressName=$('.express').val();
	param.repairContactsunitId=repairContactsunitId;
	param.contactsunitId=contactsunitId;
	param.trackNo=$('.trackNo').val();
	param.repairSectionId=repairSectionId;
	$.ajax( {
		type : 'post',
		contentType :'application/json', 
		url : '/manager/afterSalesService/receiptSettle/selectReceiptPage',
		dataType : "json", // 可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		data:JSON.stringify(param),
		success : function(data) {
			$('#jqGrid_RAS').jqGrid('clearGridData')
			var billInfo=data.data.pageData
			$.each(billInfo,function(i,v){
				 $('#jqGrid_RAS').jqGrid('addRowData',[i],v);
			})
//			imeiArr=[]
//			         $('#jqGrid_RAS').jqGrid('clearGridData');
//			$.zxsaas_plus.showalert("提示",data.desc);
		},
		error : function(msg) {
			$.zxsaas_plus.showalert(" 数据加载失败！" + msg);
		}
	});
}

$("#datetimepickerStart1").datetimepicker({
	  lang:"ch",           //语言选择中文
    format:"Y-m-d",      //格式化日期
    timepicker:false,    //关闭时间选项
    todayButton:false ,   //关闭选择今天按钮
    maxDate:new Date()
	}).on('blur',function(ev){
		tableInput.thisTime('#datetimepickerStart1','#datetimepickerStart1');
	});

$(document).ready(function(){
	getStorageWEI();//维修部门下拉
	businessUntilZtreeInit();
	businessUntilGridInit();//往来单位右侧
//	getColorInit();//颜色下拉
	
	var ad=$(document.body).width();
	
	$('.widthYF2').attr("width",ad);
	obtainAcctount1("#obtainAcctount1");
	obtainAcctount2("#obtainAcctount2");
	//obtainAcctount3('#kuanVida');
});

$(document).on('click','.bgIMG',function(options){
    $('.topYF').slideToggle();
});

//过滤清空
$(document).on('click','.cleryf',function(){
	$('.billsNo').val('');
	$('.deliveryDateBegin').val('');
	$('.express').val('');
	$('.repairSectionId').val('');
	$('.contactsunitId').val('');
	$('.trackNo').val('');
	$('#maintain').val('');
	$('#customer').val('');
	repairContactsunitId='';
	contactsunitId='';
});

//过滤查询
$(document).on('click','.goulv',function(){
	getData()
});


$(document).on('keyup','.fasttips',function(e){
	var searchText = $(this).val().trim();
	var tObj = document.getElementById('jqGrid_RAS');
	var rowLens = tObj.rows.length;
	var flag = true;
	for(var i = 0;i<rowLens;i++){
		var rText1 = tObj.rows[i].cells[6].innerHTML;//业务流水号
		var rText2 = tObj.rows[i].cells[7].innerHTML;//手机串号
		var rText3 = tObj.rows[i].cells[12].innerHTML;//手机号
		var rText4 = tObj.rows[i].cells[11].innerHTML;//姓名
		//var color = tObj.rows[i].style.backgroundColor;
		var top = (i-1) * 36 + 'px';
		if(flag){
			if(searchText != '' && (rText1.match(searchText) || rText2.match(searchText) || rText3.match(searchText) || rText4.match(searchText))){
				//tObj.rows[i].style.backgroundColor = 'lightgray';
				$(".ui-jqgrid-bdiv").animate({scrollTop:top},"slow"); //定位tr 
				flag = false;
			}
		}
	}
});



//维修部门下拉
function getStorageWEI(){
	$.request({  
	 	url: '/manager/afterSalesCommon/getRepairSections',//请求路径  
	 	async: false,  
	 	success: function(data) {   
	 		for(var i = 0,len = data.data.sectionList.length;i < len;i ++){
	 			countries = data.data.sectionList[i];
	 			$('.kuanSelect').append("<option value='"+countries.id+"' selected>"+countries.name+"</option>");
	 		}
	 	},
	 	error:function(){
	 		$.zxsaas_plus.showalert("","error!")
	 	}
	 	});
	
};

//回车查询
$(document).on('keydown','.fasttips',function(event){
	if(event.keyCode==13){
		var searchText = $(this).val().trim();
		var tObj = document.getElementById('jqGrid_RAS');
		var rowLens = tObj.rows.length;
		var flag = true;
		for(var i = 0;i<rowLens;i++){
			var rText1 = tObj.rows[i].cells[6].innerHTML;//业务流水号
			var rText2 = tObj.rows[i].cells[7].innerHTML;//手机串号
			var rText3 = tObj.rows[i].cells[12].innerHTML;//手机号
			var rText4 = tObj.rows[i].cells[11].innerHTML;//姓名
			//var color = tObj.rows[i].style.backgroundColor;
			var top = (i-1) * 36 + 'px';
			if(flag){
				if(searchText != '' && (rText1.match(searchText) || rText2.match(searchText) || rText3.match(searchText) || rText4.match(searchText))){
					//tObj.rows[i].style.backgroundColor = 'lightgray';
					$(".ui-jqgrid-bdiv").animate({scrollTop:top},"slow"); //定位tr 
					flag = false;
				}
			}
		}
	}
});


var quick = function(){

	
	var reUrl =function(arg){
		$('#jqGrid_RAS').setGridParam({postData:arg,url:'/manager/afterSalesService/receiptSettle/query'}).trigger('reloadGrid');
	}
		var zonghe =$('.fasttips').val();
		
		var a =$('.radquery:checked').val();
		switch(a){
			case '1':
				var arg = {flowNo:zonghe,repairSectionId:$(".kuanSelect").val()};
				reUrl(arg);
				break;
			case '2':
				var arg = {imei:zonghe,repairSectionId:$(".kuanSelect").val()};
				reUrl(arg);
				break;
			case '3':
				var arg = {telephone:zonghe,repairSectionId:$(".kuanSelect").val()};
				reUrl(arg);
				break;
			case '4':
				var arg ={customId:zonghe,repairSectionId:$(".kuanSelect").val()};
				reUrl(arg);
				break;
		}
	
}

$(document).on('click','.saveData',function(){
	var newImei = $("#newImei").val().trim();
	var newAuxiliaryImei =$("#newAuxiliaryImei").val().trim();
	var col=$("#jqGrid_RAS").jqGrid('getCol','imei',false);
	var reg = new RegExp("^[0-9]*$");
	if(newImei != ""){
		if(!reg.test(newImei) ){
			$.zxsaas_plus.showalert('提示',"新主串号应为数字!");
		    return
		}
		if(newImei == newAuxiliaryImei){
			$.zxsaas_plus.showalert('提示','新主串号与新辅串号不能相同！！！');
			return
		}
		if(col.indexOf(newImei) != -1){
			$.zxsaas_plus.showalert('提示','该新串号已存在！！！');
			return
		}
	}
	
	if(newAuxiliaryImei != ""){
		if(!reg.test(newAuxiliaryImei) ){
			 $.zxsaas_plus.showalert('提示',"新辅串号应为数字!");
			 return
		}
		if(newImei == newAuxiliaryImei){
			$.zxsaas_plus.showalert('提示','新主串号与新辅串号不能相同！！！');
			return
		}
		if(col.indexOf(newAuxiliaryImei) != -1){
			$.zxsaas_plus.showalert('提示','该新辅号已存在！！！');
			return
		}
	}
	
	var data = saveData();
	console.log(data);
	$("#jqGrid_selectedYF").jqGrid('getGridParam', 'selarrrow');
	if(!data || !isCheck){
		$.zxsaas_plus.showalert('提示','请勾选后再确认！！！');
		return
	}
	
	if(!$("#obtainAcctount2").data('bootstrapValidator').isValid()){
		refreshValidator("#obtainAcctount2");
		return;
	}
	
	if(ifEnableAuxliayImei == 1){
		if(imeiLength && $('#newImei').val().trim().length != parseInt(imeiLength)){
			$.zxsaas_plus.showalert('提示','新主串号长度应为'+imeiLength+'位');
			return
		}
		if(!auxliayImeiLength){
			
		}else{
			if(auxliayImeiLength && $('#newAuxiliaryImei').val().trim().length != parseInt(auxliayImeiLength)){
				$.zxsaas_plus.showalert('提示','新辅串号长度应为'+auxliayImeiLength+'位');
				return
			}
		}
	}
	
	$.request({
    	url:"/manager/afterSalesService/receiptSettle/saveReceipt",
    	dataType:'json',
    	contentType:'application/json;charset=utf-8',
    	data:JSON.stringify(data),
    	type:'POST',
    	success:function(data){
    		if(data.result == 1){
    			getData()
    			isCheck=false;
    			checkRowId='';
    			$('#newImei').val('');
    			$('#newAuxiliaryImei').val('');
    			$('#repairCost').val('');
    			$('#serviceAmount').val('');
    			$.zxsaas_plus.showalert("提示","保存成功!")
		        $("#obtainAcctount2").data('bootstrapValidator').destroy();
		        $('#obtainAcctount2').data('bootstrapValidator', null);
		        obtainAcctount2();
    		} 
    		//tableArr = [];
    		if(data.result == -999){
    			$.zxsaas_plus.showalert("错误",data.desc)
    		}
    	},
    	error:function(){
    		$.zxsaas_plus.showalert("","error!")
    	}
    })
});

var saveData = function(){
	
	var rowIds = $('#jqGrid_RAS').jqGrid('getDataIDs');
	if(rowIds.length!=0 && !isCheck && checkRowId==''){
		return false;
	}
	var temp;
	var data=$('#jqGrid_RAS').getRowData(checkRowId);
	var params={}
	params.wxfcId=data.id;
	params.imei=data.imei;
	params.imeiId=data.imeiId;
	params.wxCost=$('#repairCost').val();
	params.fwFee=$('#serviceAmount').val();
	params.newImei=$('#newImei').val();
	params.newAuxiliaryImei=$('#newAuxiliaryImei').val();
	params.sourceTabId=data.sourceTabId;
	params.sourceTabName=data.sourceTabName;
	
 	return params;
	
}

//往来单位初始化
function businessUntilZtreeInit(){
	var setting = {  
	        data: {
				simpleData: {
					enable: true,
					idKey: "id",
					pIdKey: "pid",
					rootPId: null
				}
			},
			callback: {
				onClick:function(e,mainId,obj){
				$('#jqGrid_roleMsgAdd').setGridParam({postData:{typeId:obj.id}}).trigger('reloadGrid');
				}
			},
			view: {
				showIcon: false
			}
	    }; 	
		 $.request({
	            type: 'Get',
	            url: '/manager/TunitClass/findTree',
	            dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
	            success: function (data) {
	                $.fn.zTree.init($('#unitDataTree'), setting, data);
	            },
	            error: function (msg) {
	                alert(" 数据加载失败！" + msg);
	            }
	        });

}
//往来单位右边的表格
function businessUntilGridInit(){
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';	
	$('#jqGrid_roleMsgAdd').jqGrid({
		url:'/manager/afterSalesCommon/getContactsunits',
		mtype:"GET",
		datatype: "json",
		jsonReader  : {	
				root: "data.contactsunitList",
				repeatitems: false,
				id:"0"
					},
		colNames:['ID','往来单位编码','往来单位名称','助记码','所属地区','往来单位类型','往来单位类别','所属地区id'],     
	    colModel:[
	      		{name:'id',index:'id', width:55,align:'center', sorttype:'string',hidden:true},
				{name:'code',index:'code', width:100,align:'center', sorttype:'string',sortable:false},
				{name:'name',index:'name', width:100,align:'center', sorttype:'string',sortable:false},
				{name:'remCode',index:'remCode', width:100,align:'center', sorttype:'string',sortable:false},
				{name:'districtName',index:'districtName', width:100,align:'center', sorttype:'string',sortable:false},
				{name:'contactunitTypeCode',index:'contactunitTypeCode', width:100,align:'center', sorttype:'string',sortable:false,hidden:true},
				{name:'typeId',index:'typeId', width:100,align:'center', sorttype:'string',sortable:false,hidden:true},
				{name:'districtId',index:'districtId', width:100,align:'center', sorttype:'string',sortable:false,hidden:true}
	            ],
	    sortable:false,			            
	    rownumbers:true,
	    shrinkToFit:false,
	    cellsubmit: 'clientArray',//单元格保存内容的位置		
	    editurl: 'clientArray',
	    viewrecords: true,		           
	   	cellEdit:true,
	   width: "100%" ,
	    height: $(window).height()*0.40,
		autowidth:true,
		rownumWidth: 35, // the width of the row numbers columns
		shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
		footerrow:false,  //设置表格显示表脚
		userDataOnFooter:false,//设置userData 显示在footer里
		ondblClickRow:function(rowid,iRow,iCol,e){
			var data=$('#jqGrid_roleMsgAdd').getRowData(rowid);
			var flag=$('#unitChoose').data('flag');
			if(flag=='customer'){
				contactsunitId=data.id;
			}else{
				repairContactsunitId=data.id
			}
			$('#'+flag).val(data.name);
			$('#'+flag).data('id',data.id);
			$('#unitChoose').modal('hide');
		},
		onCellSelect:function(id,index,e){
			
		},
		beforeEditCell:function(rowid,cellname,v,iRow,iCol){
				
		},
		gridComplete: function() {
		
//			
		},
		loadComplete:function(){

			
		}
	})
}
//维修单位和客户单位点击事件
$(document).on('click','.showUnit',function(){
	$('#unitChoose').modal('show');
	var flag=$(this).prev().attr('id');
	$('#unitChoose').data('flag',flag);
})
//颜色下拉
//function getColorInit(){
//	$.request({
//		url:'/manager/afterSalesCommon/getColor',
//		type:'get',
//		dataType:'json',
//		success:function(data){
//			var list=data.data.list;
//			var str=""
//			$.each(list,function(index,item){
//				str+='<option value='+item.name+' >'+item.name+'</option>'
//			})
//			$('#newColor').append(str);
//		}
//	})
//}
/**
 * 显示相应div
 */
$(document).on('click',function(e){
	$('.kd').hide();
	e.stopPropagation();
});
$(document).on('click','.input-none',function(e){
	var prevText = $(this).parent().prev().html();
	$('.kd').show();
	e.stopPropagation();
});

/**
 * 给input赋值
 */
$(document).on('click','.yfVAR',function(e){
	var vale = $(this).html();
	var dataid=$(this).data('id');
	 var pText = $(this).parents(".Zpercent").find(".box_text");
	pText.next().find('input').val(vale)
	$('.none-cx').hide();
});

$(document).on('click','.express',function(){
	$('.kd').empty();
	//var a=$(this).data('type');
	var a=['顺丰','中通','圆通','申通','韵达','天天','全峰','宅急送','EMS','百世汇通']
	for(var i=0,len=a.length;i<len;i++){
		$('.kd').append('<p><span class="yfVAR">'+a[i]+'</span></p>');
	}
	
});

$(document).on('click','td[aria-describedby=jqGrid_RAS_myCheck] input',function(){
	if($(this).prop('checked')){
		$('td[aria-describedby=jqGrid_RAS_myCheck] input').prop('checked',false);
		$(this).prop('checked',true);
	}
}
)
//数组的过滤兼容
Array.prototype.filter_=function(callback){
	var temp=[];
	for(var i=0,len=this.length;i<len;i++){
		callback(this[i],i)&&temp.push(this[i]);
	}
	return temp;
}


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
            				checkRowId='';
            				$('#jqGrid_RAS').jqGrid('clearGridData')
            				getData()
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




