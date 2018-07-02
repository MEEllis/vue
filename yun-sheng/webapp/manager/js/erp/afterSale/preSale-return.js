$(function(){
	initUI();
	initDataGrid();
	//reloadDataGrid();
});

//初始化事件
function initUI(){
	$(window).resize(wResize);//注册窗口改变事件
	wResize();
}

//窗口大小改变
function wResize(){
	var winH = $(window).height();//浏览器高度
	var winW = $(window).width();//浏览器宽度
	var centerH = winH - 350;//中部高度
	if(centerH < 350){
		centerH = 350;
	}
	$(".gridBody").height(centerH);
	$("#dataGrid").setGridHeight(centerH);
	$("#dataGrid").setGridWidth($(window).width()-30); 
	$("#dataGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
}

var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl:'/manager/afterSalesService/returnMachine/selectPreSaleMachineReturn',
		SaveTableUrl: '/manager/afterSalesService/returnMachine/preSaleMachineReturn',
		TableName: "#dataGrid", //显示表格名称。遵照css选择器书写
		TableName2:'#returnDataGrid'
 };

$.jgrid.defaults.width = 1280;
$.jgrid.defaults.responsive = true;
$.jgrid.defaults.styleUI = 'Bootstrap';	

function reloadDataGrid(){
	var outstorSectionId=$("#inquire_option input[name='outstorSectionId']").val();
	var repairSectionId=$("#inquire_option input[name='repairSectionId']").val();
	$(options.TableName).jqGrid('setGridParam',{  
        datatype:'json',  
        url:options.LoadTableUrl,
        traditional: true,
        postData:{"outstorSectionId":outstorSectionId,"repairSectionId":repairSectionId}, //发送数据  
        page:1  
    }).trigger("reloadGrid"); //重新载入
}

function initDataGrid(){
	var lastsel='';
	var colNames = ['id','送修部门','商品编码','商品名称','型号','颜色','原主串号','新主串号','原辅助串号','新辅助串号','业务流水号','售后处理单号','手机状态','售前返回操作员','售前返回操作时间'];
	var colNames1 = ['操作','id','送修部门','商品编码','商品名称','型号','颜色','原主串号','新主串号','原辅助串号','新辅助串号','业务流水号','售后处理单号','手机状态','售前返回操作员','售前返回操作时间'];
	var JqGridColModel=[
                        {name:'id',index:'id',align:'center' ,sorttype:'int',sortable:false,key:true,hidden:true},
						{name:'outstorSectionName',index:'outstorSectionName',align:'center' ,sorttype:'string',sortable:false},
						{name:'goodsCode',index:'goodsCode',align:'center' ,sorttype:'string',sortable:false},
						{name:'goodsName',index:'goodsName',align:'center' ,sorttype:'string',sortable:false},
						{name:'goodsModel',index:'goodsModel',align:'center' ,sorttype:'string',sortable:false},
						{name:'goodsColorName',index:'goodsColorName',align:'center' ,sorttype:'string',sortable:false},
						{name:'imei',index:'imei',align:'center' ,sorttype:'string',sortable:false},
						{name:'newImeiStr',index:'newImeiStr',align:'center' ,sorttype:'string',sortable:false},
						{name:'auxiliaryImei',index:'auxiliaryImei',align:'center' ,sorttype:'string',sortable:false},
						{name:'newAuxiliaryImei',index:'newAuxiliaryImei',align:'center' ,sorttype:'string',sortable:false},
						{name:'flowNo',index:'flowNo',align:'center' ,sorttype:'string',sortable:false},
						{name:'billsNo',index:'billsNo',align:'center' ,sorttype:'string',sortable:false},
						{name:'repairStatusContent',index:'repairStatusContent',align:'center' ,sorttype:'string',sortable:false},
						{name:'sqfhByName',index:'sqfhByName',align:'center' ,sorttype:'string',sortable:false},
						{name:'sqfhDateStr',index:'sqfhDateStr',align:'center' ,sorttype:'string',sortable:false},
	                ];
	var JqGridColModel1=[
	                    {name: 'deliveryDo', index: 'deliveryDo', width: 70, align: 'center', formatter: addAndDelete, sortable: false},
                        {name:'id',index:'id',align:'center' ,sorttype:'int',sortable:false,key:true,hidden:true},
						{name:'outstorSectionName',index:'outstorSectionName',align:'center' ,sorttype:'string',sortable:false},
						{name:'goodsCode',index:'goodsCode',align:'center' ,sorttype:'string',sortable:false},
						{name:'goodsName',index:'goodsName',align:'center' ,sorttype:'string',sortable:false},
						{name:'goodsModel',index:'goodsModel',align:'center' ,sorttype:'string',sortable:false},
						{name:'goodsColorName',index:'goodsColorName',align:'center' ,sorttype:'string',sortable:false},
						{name:'imei',index:'imei',align:'center' ,sorttype:'string',sortable:false},
						{name:'newImeiStr',index:'newImeiStr',align:'center' ,sorttype:'string',sortable:false},
						{name:'auxiliaryImei',index:'auxiliaryImei',align:'center' ,sorttype:'string',sortable:false},
						{name:'newAuxiliaryImei',index:'newAuxiliaryImei',align:'center' ,sorttype:'string',sortable:false},
						{name:'flowNo',index:'flowNo',align:'center' ,sorttype:'string',sortable:false},
						{name:'billsNo',index:'billsNo',align:'center' ,sorttype:'string',sortable:false},
						{name:'repairStatusContent',index:'repairStatusContent',align:'center' ,sorttype:'string',sortable:false},
						{name:'sqfhByName',index:'sqfhByName',align:'center' ,sorttype:'string',sortable:false},
						{name:'sqfhDateStr',index:'sqfhDateStr',align:'center' ,sorttype:'string',sortable:false},
	                ];
	
	loadtable();
	function loadtable(){
			$(options.TableName).jqGrid({
				url:options.LoadTableUrl,
				mtype:"GET",
				datatype: "json",
				jsonReader  : {	root: "data.rows",repeatitems: false},
				colNames:colNames,          
	            colModel:JqGridColModel,
	            sortable:false,			            
	            rownumbers:true,
	            rowNum:10000000,
	            cellsubmit: 'clientArray',//单元格保存内容的位置		
	            editurl: 'clientArray',
	           	cellEdit:false,
				autowidth:true,
				rownumWidth: 50, 
				shrinkToFit:true, 
				multiselect: true,
//				beforeEditCell:function(rowid,cellname,v,iRow,iCol){lastrow = iRow;lastcell = iCol;},
//				onCellSelect:function(rowid,iCol,cellContent,e){onCellSelect(rowid,iCol,cellContent,e);},
//				beforeSelectRow: function(rowid, e) { 
//					var check=$(e.target).is('input[type=checkbox]');
//					if(check){
//						$(options.TableName).jqGrid('setSelection',rowid);
//					}
//					return check;
//				},
				gridComplete:function(){
					
				},
//				beforeSelectRow:function(rowid,e){
//                    //单行选择
//					$('#returnDataGrid').jqGrid('resetSelection');  
//					return(true);  	
//				},
				onSelectRow:function(rowid,status){
					
				},
				loadComplete:function(data){
					$(options.TableName).jqGrid('setLabel',0, '序号');
					wResize();
					var rows=data.data.rows;
					$.each(rows,function(i,value){
						if(value.repairStatus==11){
							$("#jqg_dataGrid_"+value.id).attr("disabled","disabled");
						}
					});
				}
			})
	}
	loadtable2()
	function loadtable2(){
		$(options.TableName2).jqGrid({
			colNames:colNames1,          
            colModel:JqGridColModel1,
            cellEdit:true,
            sortable:false,			            
            rownumbers:true,
			autowidth:true,
			rownumWidth: 50, 
//			shrinkToFit:true, 
			multiselect: true,
			gridComplete:function(){
				
			},
			loadComplete:function(data){
				$(options.TableName).jqGrid('setLabel',0, '序号');
				wResize();
				var rows=data.data.rows;
				$.each(rows,function(i,value){
					if(value.repairStatus==11){
						$("#jqg_dataGrid_"+value.id).attr("disabled","disabled");
					}
				});
			}
		})
	}
}

function addAndDelete(cellvalue, options, rowObjec) {
    var addAndDel = '<div class="operating"></span><span class="del glyphicon glyphicon-trash"></span></div>';
    return addAndDel;
}
//删除
$(document).on('click', '.del', function(e) {
	var rowId= $("#returnDataGrid").jqGrid("getGridParam", "selrow");
	var rowData=$("#returnDataGrid").jqGrid("getRowData", rowId);
    $('#returnDataGrid').jqGrid('delRowData', rowId);
    
    $('#dataGrid').jqGrid("addRowData",1,rowData)
});

//清空按钮点击事件
$(".clearYF").click(function(){
	$("#inquire_option")[0].reset();
	 $(options.TableName).jqGrid('clearGridData');
});


$(".returnSave").click(function(){
	var checkedIdList = $(options.TableName2).jqGrid('getGridParam','selarrrow');
	
	if(checkedIdList.length==0){
		$.zxsaas_plus.showalert("提示","请至少选择一条记录!");
		return;
	}
	$.each(checkedIdList,function(i,v){
		$(options.TableName2).jqGrid('delRowData',i);
	})
	
	$.request({
	    url:'/manager/afterSalesService/returnMachine/returnMachineComfirm/'+1,
	    type: "POST",
	    data: {"checkedIdList": checkedIdList},
	    traditional: true,
	    success: function(data) {
	    	if(data.result==1){
	    		$.zxsaas_plus.showalert("提示",data.desc);
	    		$(options.TableName2).jqGrid('clearGridData');
	    		reloadDataGrid();
	    	}
	    }
	});
	
});

$(document).on('click','.addTable',function(options){
    var ids=$("#dataGrid").jqGrid("getGridParam","selarrrow");
    var len =ids.length;
    if(len!=0){
		for(var i=0;i<len;i++){
			var rowid = ids[0];
		    var data=$("#dataGrid").jqGrid('getRowData',rowid);
		    
			$("#returnDataGrid").jqGrid('addRowData', [ids[0]], data );
			$("#dataGrid").jqGrid('delRowData',rowid);
		}
	}else{
		$.zxsaas_plus.showalert("错误","至少选中一条数据!")
	}
});



//部门模态框
function showSectionModal(sectionFlag){
	//树设置参数
	var setting = {  
		    data: {//数据属性设置
		        simpleData: {enable: true,idKey: "code",pIdKey: "pCode",rootPId: null}
	        },
	        callback:{
	        	onClick: function (event, treeId, treeNode, msg) {
	        	 if(sectionFlag=="repairSectionName"){
	        		$("#inquire_option input[name='repairSectionName']").val(treeNode.name);
	        		$("#inquire_option input[name='repairSectionId']").val(treeNode.obj.id);	
	        	 }else if(sectionFlag=="outstorSectionName"){
		        		$("#inquire_option input[name='outstorSectionName']").val(treeNode.name);
		        		$("#inquire_option input[name='outstorSectionId']").val(treeNode.obj.id);	
		        	 }
	        	 $("#sectionModal").modal("hide");
	        	 reloadDataGrid();
			   },
	        },
			view: {//样式设置
				showIcon: false
			}
	    }; 
	$.request( {
		type : 'Get',
		url:'/manager/jxc/storage/authorityAndTree/findTree',
		dataType : "json", // 可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		success : function(data) {
			$.fn.zTree.init($("#sectionTreeData"), setting, data);
			var zTree = $.fn.zTree.getZTreeObj("sectionTreeData");
			zTree.expandAll(true);// 展开全部节点
			$("#sectionModal").modal("show");
		}
	});
}

//快速定位
$(document).on('keyup','#searchText',function(e){
	var searchText = $(this).val().trim();
	var tObj = document.getElementById('dataGrid');
	var rowLens = tObj.rows.length;//长度
	var flag = true;
	for(var i = 0;i<rowLens;i++){
		var rText1 = tObj.rows[i].cells[6].innerHTML;
		var rText2 = tObj.rows[i].cells[10].innerHTML;
		//var color = tObj.rows[i].style.backgroundColor;
		var top = (i-1) * 36 + 'px';
		if(flag){
			if(searchText != '' && (rText1.match(searchText) || rText2.match(searchText))){
				//tObj.rows[i].style.backgroundColor = 'lightgray';
				$(".ui-jqgrid-bdiv").animate({scrollTop:top},"slow"); //定位tr 
				flag = false;
			}
		}
	}
});