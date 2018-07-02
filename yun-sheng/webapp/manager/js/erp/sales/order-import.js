$(function(){
	initOrderImportDataGrid();
	initOrderImportDataGrid2();
	initModalEvents();
	initStorageModalGrid();
	imeiDr(); //串号导入
	//串号导入
	$('.imeiImport').click(function(){
		$('.imeiDr_import').attr('flag','a');
		var sectionId = $('#sectionId').val();
		if(sectionId == ""){
			$.zxsaas_plus.showalert('提示','请选择部门');
		}else{
			$('#imeiDr-modal').modal('show');
			$('.imeiDr_vone,.imeiDr_vtwo').val('');
			$('.imeiDr_num').text(0);
			var ids = $('#imeiDrGrid').getDataIDs();
			arrs = [];
			$.each(ids,function(i,item){
				var row = $('#imeiDrGrid').getRowData(item);
				var index1 = arrs.indexOf(row.imei);
				arrs.splice(index1, 1);
	        })
			$("#imeiDrGrid").clearGridData().trigger('reloadGrid').resize();
		}
	})
	//导入
	$('.imeiDr_import').click(function(){
		var flag = $('.imeiDr_import').attr('flag');
		$(".imeiDr_vtwo").val('');
		if(flag == 'a'){		//	直接点击串号导入处理
			//拿到外层表格串号
			var sectionId = $('#sectionId').val();
			var ids = $('#dataGrid').getDataIDs();
			$.each(ids,function(i,item){
				var row = $('#dataGrid').getRowData(item);
				if(row.stockNum > 0 && row.salesOutstrorageImDraftList !== ""){
					var vo = JSON.parse(row.salesOutstrorageImDraftList);
					$.each(vo,function(i,item){
						if(item.imei !=="" && arrs.indexOf(item.imei) == -1){
							arrs.push(item.imei);
						}
						if(item.auxiliaryImei !=="" && arrs.indexOf(item.auxiliaryImei) == -1){
							arrs.push(item.auxiliaryImei);
						}
					});
				}
			})
			//开始添加串号
	        var vone = $('.imeiDr_vone').val();
	        var vtwo = $('.imeiDr_vtwo').val();
	        var v1 = vone.split("\n");
	        var str = '',vtr = '';
	        $.each(v1,function(i,item){
	        	var toval = item.trim().toUpperCase();
	        	if(toval == ""){
		    		return
		    	}
	        	if(arrs.indexOf(toval) == -1){
	        		str+=toval+';'
	        		arrs.push(toval);
	        	}else{
	        		vtr+=toval+';'
	        	}
	        })
	        str = str.substring(0,str.length-1);
	        if(str == ''){
	        	if(vtr !== "" ){
	        		$('.imeiDr_vtwo').val(vtr+'已导入\n')
	        	}
	        	return
	        }else{
	        	if(vtr !== "" ){
	        		$('.imeiDr_vtwo').val(vtr+'已导入\n')
	        	}
	        }
	        $.request({
	        	type: "POST",
				url: '/manager/component/imei/validateOutStockImei',
				datatype : "json",
				data: {
		    		sectionId: sectionId,
		    		imeiInputData: str
	        	},
				success: function (data) {
					if(data.result==1){
						var failed = data.data.failedResultList;
						var list = data.data.successResultList;
                        var  exsitJqImeiData = $("#imeiDrGrid").getGridParam().data;
                        var ImeiData=exsitJqImeiData.concat(list)
                        $("#imeiDrGrid").setGridParam({data:ImeiData}).trigger('reloadGrid');
						var num = $('#imeiDrGrid').getDataIDs();
						$('.imeiDr_num').text(num.length);
						var txt = $(".imeiDr_vtwo").val();
						$.each(failed,function(i,item){
							txt += item+'\n';
						})
						$(".imeiDr_vtwo").val(txt);
						var a1 = $("#imeiDrGrid").getCol('imei');
						var a2 = $("#imeiDrGrid").getCol('auxiliaryImei');
						arrs = [];
						$.each(a1,function(i,item){
							arrs.push(item);
							arrImei.push(item);
						})
						$.each(a2,function(i,item){
							arrs.push(item);
						})
					}else{
						$.zxsaas_plus.showalert("error",data.desc);
					}
			    },
			    error: function (msg) {
			    	$.zxsaas_plus.showalert("error","！" + msg);
			    }
			});
		}else{		//	订单引入处理
			//开始添加串号
			var sectionId = $('#detailSectionId').val();
	        var vone = $('.imeiDr_vone').val();
	        var vtwo = $('.imeiDr_vtwo').val();
	        var v1 = vone.split("\n");
	        var str = '',vtr = '';
	        var a1 = $("#imeiDrGrid").getCol('imei');
			var a2 = $("#imeiDrGrid").getCol('auxiliaryImei');
			var arr = a1.concat(a2);
	        $.each(v1,function(i,item){
	        	var toval = item.trim().toUpperCase();
	        	if(toval == ""){
		    		return
		    	}
	        	if(arr.indexOf(toval) == -1){
	        		str+=toval+';'
	        		arr.push(toval);
	        	}else{
	        		vtr+=toval+';'
	        	}
	        })
	        str = str.substring(0,str.length-1);
	        if(str == ''){
	        	if(vtr !== "" ){
	        		$('.imeiDr_vtwo').val(vtr+'已导入\n')
	        	}
	        	return
	        }else{
	        	if(vtr !== "" ){
	        		$('.imeiDr_vtwo').val(vtr+'已导入\n')
	        	}
	        }
	        $.request({
	        	type: "POST",
				url: '/manager/component/imei/validateOutStockImei',
				datatype : "json",
				data: {
		    		sectionId: sectionId,
//		    		goodsId: $('#detailGoodsId').val(),
		    		imeiInputData: str
	        	},
				success: function (data) {
					if(data.result==1){
						var failed = data.data.failedResultList;
						var list = data.data.successResultList;
						var gid = $('#detailGoodsId').val();
						var txt = $(".imeiDr_vtwo").val();
						var addArr=[]
						$.each(list,function(i,item){
							if(item.goodsId == gid){
                                addArr.push(item)
							}else{
								txt += '串号:['+item.imei+']所属商品为"'+ item.name +'"\n';
							}
						})
                        var  exsitJqImeiData = $("#imeiDrGrid").getGridParam().data;
                        var ImeiData=exsitJqImeiData.concat(addArr)
                        $("#imeiDrGrid").setGridParam({data:ImeiData}).trigger('reloadGrid');

						var num = $('#imeiDrGrid').getDataIDs();
						$('.imeiDr_num').text(num.length);
						$.each(failed,function(i,item){
							txt += item+'\n';
						})
						$(".imeiDr_vtwo").val(txt);
					}else{
						$.zxsaas_plus.showalert("error",data.desc);
					}
			    },
			    error: function (msg) {
			    	$.zxsaas_plus.showalert("error","！" + msg);
			    }
			});
	        
	        
		}
		
    })
    //导入 确定
    $('.imeiDr_sure').click(function(){
    	var flag = $('.imeiDr_import').attr('flag');
		if(flag == 'a'){	//		直接点击串号导入处理
			$('#imeiDr-modal').modal('hide');
	    	var dataIds = $("#dataGrid").getDataIDs();
	    	var num = dataIds.length;
//	    	临时存储串号作对比
	    	var t1 = [],t2 = [],t3 = [];
	    	$.each(dataIds,function(i,index){
	    		var dataRow = $('#dataGrid').getRowData(index);
	    		if(dataRow.storageId !== "" && dataRow.goodsId !== ""){
	    			$.request({
	        			url:"/manager/inventory/common/getStockGoodsImeiVoList",
	        			type : "post",
	        			dataType : 'json',
	        			async: false,
	        			data:{
	        				storageId: dataRow.storageId,
							goodsId: dataRow.goodsId,
                            sectionId: $('#sectionId').val()
						},
	        			success:function(data){
	        				if(data.result == 1){
	        					var vo = data.data.goodsImeiVoList;
	        					$.each(vo,function(i,item){
	        						t1.push(item.imei);
	        						t2.push(item.auxiliaryImei);
	        						t3.push(index);
	        					});
	        				}
	        			}
	        		});
	    		}
	    	});
//	    	循环表格数据添加
	    	var ids = $("#imeiDrGrid").getDataIDs();
			$.each(ids,function(i,item){
				var row = $('#imeiDrGrid').getRowData(item);
				var oneId = $('#dataGrid tbody tr').eq(num).attr('id');
				var oneRow = $('#dataGrid').getRowData(oneId);
//				判断第一行是否为空
				if(num == 1 && oneRow.storageName == "" && oneRow.goodsName == ""){
					var id = $('#dataGrid tbody tr').eq(num).attr('id');
					var daraRow = $('#dataGrid').getRowData(id);
					var saleArr = [];
					var saleList = {
							imei: row.imei,
							auxiliaryImei: row.auxiliaryImei,
                        	imeiId: row.imeiId,
							remark: row.remark
						}
					var exist = t1.indexOf(row.imei);
					if(exist == -1){
						saleArr.push(saleList);
						$("#dataGrid").setRowData(id,{
							storageId: row.storageId,
							storageName: row.storageName,
							categoryName: row.categoryName,
							code: row.code,
							goodsName: row.name,
							brandName: row.brandName,
							models: row.models,
							color: row.color,
							stockNum: row.stockCount,
							goodsId: row.goodsId,
							remark: row.remark,
							ifManageIMei: row.ifManageImei,
							taxRate: row.taxRate,
							goodsNumber: 1,
							salesOutstrorageImDraftList: JSON.stringify(saleArr)
						});
						//添加一行成功后增加此商品所有串号
						$.request({
		        			url:"/manager/inventory/common/getStockGoodsImeiVoList",
		        			type : "post",
		        			dataType : 'json',
		        			async: false,
                            data:{
                                storageId: row.storageId,
                                goodsId: row.goodsId,
                                sectionId: $('#sectionId').val()
                            },
		        			success:function(data){
		        				if(data.result == 1){
		        					var vo = data.data.goodsImeiVoList;
		        					$.each(vo,function(i,item){
		        						t1.push(item.imei);
		        						t2.push(item.auxiliaryImei);
		        						t3.push(id);
		        					});
		        				}
		        			}
		        		});
					}else{
						var existId = t3[exist];
						var existRow = $('#dataGrid').getRowData(existId);
						var opt = JSON.parse(existRow.salesOutstrorageImDraftList);
						opt.push(saleList);
						$("#dataGrid").setRowData(existId,{
							goodsNumber: opt.length,
							salesOutstrorageImDraftList: JSON.stringify(opt)
						});
					}
					
				}else{
					var saleArr = [];
					var saleList = {
							imei: row.imei,
							auxiliaryImei: row.auxiliaryImei,
                        	imeiId: row.imeiId,
							remark: row.remark
						}
					var exist = t1.indexOf(row.imei);
					if(exist == -1){
						dataGrid.addKongRow();
						num++;
						var id = $('#dataGrid tbody tr').eq(num).attr('id');
						var daraRow = $('#dataGrid').getRowData(id);
						saleArr.push(saleList);
						$("#dataGrid").setRowData(id,{
							storageId: row.storageId,
							storageName: row.storageName,
							categoryName: row.categoryName,
							code: row.code,
							goodsName: row.name,
							brandName: row.brandName,
							models: row.models,
							color: row.color,
							stockNum: row.stockCount,
							goodsId: row.goodsId,
							remark: row.remark,
							ifManageIMei: row.ifManageImei,
							taxRate: row.taxRate,
							goodsNumber: 1,
							salesOutstrorageImDraftList: JSON.stringify(saleArr)
						});
						//添加一行成功后增加此商品所有串号
						$.request({
		        			url:"/manager/inventory/common/getStockGoodsImeiVoList",
		        			type : "post",
		        			dataType : 'json',
		        			async: false,
                            data:{
                                storageId: row.storageId,
                                goodsId: row.goodsId,
                                sectionId: $('#sectionId').val()
                            },
		        			success:function(data){
		        				if(data.result == 1){
		        					var vo = data.data.goodsImeiVoList;
		        					$.each(vo,function(i,item){
		        						t1.push(item.imei);
		        						t2.push(item.auxiliaryImei);
		        						t3.push(id);
		        					});
		        				}
		        			}
		        		});
					}else{
						var existId = t3[exist];
						var existRow = $('#dataGrid').getRowData(existId);
						if(existRow.salesOutstrorageImDraftList == ""){
							var opt = [];
						}else{
							var opt = JSON.parse(existRow.salesOutstrorageImDraftList);
						}
						opt.push(saleList);
						$("#dataGrid").setRowData(existId,{
							goodsNumber: opt.length,
							salesOutstrorageImDraftList: JSON.stringify(opt)
						});
					}
					
				}
			})
			summary();
            dataGrid.clearRowByPara({goodsId:''});
		}else{
	//		订单引入处理
			var ids = $("#imeiDrGrid").getDataIDs();
			var rowId = $(".imeiDr_sure").data('id');
			var rowData = $('#orderImportDataGrid2').getRowData(rowId);
			var data = [],v1 = [],v2 = [],v3 = [];
			if(ids.length < 1){
				return
			}
			$.each(ids,function(i,item){
				var row = $('#imeiDrGrid').getRowData(item);
				var opt = {
						imei: row.imei,
						auxiliaryImei: row.auxiliaryImei,
						stockNum: row.stockCount,
					    imeiId: row.imeiId,
						remark: '',
				}
				var obj = {
						id: row.storageId,
						name: row.storageName,
						goodsNumber: 1,
						goodsId: row.goodsId,
						goodsName: row.name,
						stockNum: 0,
						remark: row.remark,
						salesOutstrorageImDraftList: []
				}
				if(v1.indexOf(row.storageId) == -1){
					v1.push(row.storageId);
					v2.push(row.goodsId);
					v3.push(row.storageName);
					obj.salesOutstrorageImDraftList.push(opt);
					data.push(obj);
				}else{
					if(v2.indexOf(row.goodsId) == -1){
						v1.push(row.storageId);
						v2.push(row.goodsId);
						v3.push(row.storageName);
						obj.salesOutstrorageImDraftList.push(opt);
						data.push(obj);
					}else{
						for(var x = 0; x<v1.length;x++){
							if(v1[x] == row.storageId && v2[x] == row.goodsId){
								data[x].salesOutstrorageImDraftList.push(opt);
								data[x].goodsNumber = data[x].goodsNumber++;
							}
						}
					}
				}
			});	
			var num = 0;
			$.each(data,function(i,item){
				num += item.salesOutstrorageImDraftList.length;
				data[i].goodsNumber = item.salesOutstrorageImDraftList.length;
				data[i].salesOutstrorageImDraftList = JSON.stringify(item.salesOutstrorageImDraftList);
			})
			if(rowData.notIntroduceNum < num){
				$.zxsaas_plus.showalert("提示",'本次出库量不能大于未出库量');
			}
			else{
				$("#orderImportDataGrid2").setRowData(rowId,{
					nowOutStorageNum: num,
					storageNameList: JSON.stringify(v3),
					storageIdList: JSON.stringify(data)
				});
				$('#imeiDr-modal').modal('hide');
			}
			
		}
		
    })
	
})

var arrs = [],arrImei = [];
function imeiDelRow(id){
	var row = $('#imeiDrGrid').getRowData(id);
	var index1 = arrs.indexOf(row.imei);
	if(index1 !== -1){
		arrs.splice(index1, 1);
	}
	var index2 = arrs.indexOf(row.auxiliaryImei);
	if(index2 !== -1){
		arrs.splice(index2, 1);
	}                 
    $("#imeiDrGrid").delRowData(id);
    var num = $('#imeiDrGrid').getDataIDs();
	$('.imeiDr_num').text(num.length);
}

var options = {
	gridId: "#orderImportDataGrid",
	gridId2: "#orderImportDataGrid2",
	pager: "#orderImportDataGridPager"
};

//初始化事件
function initModalEvents(){
	$("#orderImportDataGrid").resize(wResizeModal);//注册窗口改变事件
	wResizeModal();
}

//窗口大小改变
function wResizeModal(){
	var winH = $("#orderImportDataGrid").height();
	var winW = $("#orderImportDataGrid").width();
	var centerH = winH - 555;//中部高度
	if(centerH < 300){
		centerH = 300;
	}
	$("#orderImportDataGrid").setGridHeight(centerH/2 - 20);
	$("#orderImportDataGrid").setGridWidth(winW-200); 
	$("#orderImportDataGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
	
	$(".gridType").width(50);
	$("#orderImportDataGrid2").setGridHeight(centerH/2 - 20);
	$("#orderImportDataGrid2").setGridWidth(winW-200); 
	$("#orderImportDataGrid2").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });  
}

//定单引入按钮单击事件
function orderImportBtClick(){
	var contactsunitId = $("#billsHeaderForm input[name='contactsunitId']").val();
	var contactUnitName = $("#billsHeaderForm input[name='contactUnitName']").val();
	/*if(contactsunitId==""){
		$.zxsaas_plus.showalert("提示","请先选择往来单位!");
		return;
	}*/
	$("#orderImportModal input[name='contactUnitName']").val(contactUnitName);
	reloadOrderMainData(contactsunitId);
	 $(options.gridId2).jqGrid('clearGridData');
	$("#orderImportModal").modal("show");
	$('#orderImportDataGrid,#orderImportDataGrid2').resize();
}

//加载引入定单主表数据
function reloadOrderMainData(contactsunitId){
    $(options.gridId).jqGrid('clearGridData');
	$(options.gridId).jqGrid('setGridParam', {
	    url:'../salesCommon/selectOrderImport',
		datatype : 'json',
		postData :{"contactsunitId":contactsunitId},
		page : 1
	}).trigger("reloadGrid");
}

function initOrderImportDataGrid(){
	var colNames = ['ID','单据编号','单据日期','往来单位','contactsunitId','部门名称','销售总金额','订货量','已出库量','未出库量','备注',"sectionName","sectionId"];
	var JqGridColModel=[
						{name:'id',index:'id',align:'center', width:1,sorttype:'string',hidden:true},
						{name:'billsCode',index:'billsCode',align:'center', width:200,sorttype:'string',sortable:false},
						{name:'billsDate',billsDate:'name',align:'center', sorttype:'string',sortable:false,formatter:formatterDate},
						{name:'contactUnitName',index:'contactUnitName',align:'center', sorttype:'string',sortable:false},
						{name:'contactsunitId',index:'contactsunitId',align:'center', width:1,sorttype:'string',hidden:true},
						{name:'sectionName',index:'sectionName',align:'center', sorttype:'string',sortable:false},
						{name:'billsAmount',index:'billsAmount',align:'center', sorttype:'string',sortable:false,formatter:'number'},
						{name:'reviewsNum',index:'reviewsNum',align:'center',width:100, sorttype:'string',sortable:false,formatter:'integer'},
						{name:'introduceNum',index:'introduceNum',align:'center',width:100, sorttype:'string',sortable:false,formatter:'integer'},
						{name:'notIntroduceNum',index:'notIntroduceNum',align:'center',width:100, sorttype:'string',sortable:false,formatter:'integer'},
						{name:'remark',index:'remark',align:'center', sorttype:"string",sortable:false},
						{name:'sectionName',index:'sectionName',align:'center', width:1,sorttype:'string',hidden:true},
						{name:'sectionId',index:'sectionId',align:'center', width:1,sorttype:'string',hidden:true}
	                ];
	loadtable();
	function loadtable(){
			$(options.gridId).jqGrid({
				mtype:"GET",
				datatype: "json",
				jsonReader  : {	root: "data.rows",page: "data.page",total: "data.total",records: "data.records",repeatitems: false},
				colNames:colNames,          
	            colModel:JqGridColModel,
	            sortable:false,			            
	            rownumbers:true,
	            viewrecords: true,
	            cellEdit:false,
	            pager:options.pager,
				autowidth:true,
				rownumWidth:40,
				multiselect:true,//定义是否可以多选
	            multiselectWidth:40,
	            multiboxonly:true,
				shrinkToFit:true,
				beforeSelectRow:function(){
					$(options.gridId).jqGrid('resetSelection');  
					return(true);  		
				},
				onSelectRow:function(rowid){
					var row = $('#orderImportDataGrid').getRowData(rowid);
					$('#detailSectionId').val(row.sectionId);
					orderGridRowClick(rowid);
				},
				gridComplete:function(data){
					$("#jqgh_orderImportDataGrid_cb").html("操作");
				}
			})
			jQuery(options.gridId).jqGrid('setLabel',0, '序号');
	}
}

var lastsel='';
function initOrderImportDataGrid2(){
	var colNames = ['明细ID','单据编号','仓库id','仓库名称','商品ID','商品名称','订货量','已出库量','未出库量','本次出库量','销售单价','本次出库价','备注','是否串号管理','商品税率','型号','编码','分类','品牌','颜色'];
	var JqGridColModel=[
						{name:'id',index:'id',align:'center', width:1,hidden:true},
						{name:'billsCode',index:'billsCode',align:'center',width:140, sorttype:'string',sortable:false},
						{name :'storageIdList',index : 'storageIdList',align:'left',sortable: false,editable:true,hidden:true}, 
			            {name :'storageNameList',sortable: false,index :'storageNameList',width:'90px',fixed:true,align:'left',hidden:true}, 
			            {name :'goodsId',index : 'goodsId',editable:true,sortable: false,hidden:true},	
			            {name :'goodsName',sortable: false,index : 'goodsName',align:'center',width: 140},  
			            {name :'reviewsNum',index : 'goodsNumber',align:'center',editable:false,sortable: false,formatter:'integer'},
			            {name:'introduceNum',index:'reviewsNum',align:'center', sorttype:'string',sortable:false,formatter:'integer'},
						{name:'notIntroduceNum',index:'notIntroduceNum',align:'center', sorttype:'string',sortable:false,formatter:'integer'},
						{name:'nowOutStorageNum',index:'nowOutStorageNum',editable:false,align:'center', sorttype:'string',sortable:false,formatter:'integer'},
						{name :'price',index : 'price',align:'center',editable:false,editrules:{number:true},formatter:'number',sortable: false},
						{name:'nowOutStoragePrice',index:'nowOutStoragePrice',editable:true,align:'center',sortable:false,formatter:'number'},
						{name:'remark',index:'remark',align:'center', sorttype:"string",sortable:false},
						{name:'ifManageImei',index:'ifManageImei',align:'center', sorttype:"string",sortable:false,hidden: true},
						{name:'taxRate',index:'taxRate',align:'center', sorttype:"string",sortable:false,hidden: true},
						{name : 'models' ,width:200,sortable: false,index : 'models',align:'left'}, 
			            {name : 'code' ,width:200,sortable: false,index : 'code',align:'left'}, 
			            {name : 'categoryName' ,width:200,sortable: false,index : 'categoryName',align:'left',hidden:true}, 
			            {name : 'brandName' ,width:200,sortable: false,index : 'name',align:'left',hidden:true}, 
			            {name : 'color' ,width:200,sortable: false,index : 'color',align:'left',hidden:true}
	                ];
	loadtable();
	function loadtable(){
			$(options.gridId2).jqGrid({
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
				autowidth:true,
				cellEdit:true,
				rownumWidth:40,
				viewrecords:false,
				shrinkToFit:true,
				beforeEditCell:function(rowid,cellname,v,iRow,iCol){lastrow = iRow;lastcell = iCol;},
				onCellSelect:function(rowid,iCol,cellcontent,e){
					if(iCol==10){
						var obj=$(options.gridId2).jqGrid('getRowData', rowid);
						$("#orderImportDataGridDetailRowid").val(rowid);
						//打开仓库选中模态框
						$("#dataGrid33").jqGrid('clearGridData');
						$("#storageReferenceModal2_goodsInfo").val(obj.ifManageImei+"_"+obj.goodsId+"_"+obj.goodsName+"_"+obj.storageIdList+"_"+obj.nowOutStorageNum);
						if(obj.ifManageImei == 1){
							$('#detailGoodsId').val(obj.goodsId);
							$('#imeiDr-modal').modal('show');
							$('.imeiDr_import').attr('flag','b');
							$('.imeiDr_sure').data('id',rowid);
							$('.imeiDr_vone,.imeiDr_vtwo').val('');
							$('.imeiDr_num').text(0);
							$("#imeiDrGrid").clearGridData().trigger('reloadGrid').resize();
						}else{
							reLoadGrid33(obj.goodsId);
							$("#storageChoseModal").modal("show");
							$("#dataGrid33").resize();
						}
//						openStorageChoseModal(obj);
					}		
				}
			})
			jQuery(options.gridId2).jqGrid('setLabel',0, '序号');
			jQuery(options.gridId2).jqGrid('setLabel',10, '<font class="red">*</font>本次出库量');
	}
	//编辑框退出编辑状态
	$(window).bind('click', function saveEdit(e) {
		var rowId = $(e.target).parents("tr").attr("id");
		if (lastsel != "" && lastsel != rowId) { //用于点击其他地方保存正在编辑状态下的行
			if ($(e.target).closest(options.gridId2).length == 0) { 
				$(options.gridId2).jqGrid('saveRow', lastsel);						
				lastsel='';
			}
		}
	})
}

//销售定单grid行单击事件
function orderGridRowClick(id){
	$(options.gridId2).jqGrid('setGridParam', {
	    url:'../salesCommon/selectOrderDetailImport',
		datatype : 'json',
		postData :{"id":id}
	}).trigger("reloadGrid");
}

//格式化日期
function formatterDate(cellvalue, options, rowObjec){
	if(cellvalue!="" && cellvalue!=null){
		return $.DateFormatFromTimestamp("yyyy-MM-dd",cellvalue);
	}else{
		return "";
	}
}

//打开仓库选中模态框
//function openStorageChoseModal(obj){
//	$("#dataGrid33").jqGrid('clearGridData');
//	$("#storageReferenceModal2_goodsInfo").val(obj.ifManageImei+"_"+obj.goodsId+"_"+obj.goodsName+"_"+obj.storageIdList+"_"+obj.nowOutStorageNum);
//	if(obj.ifManageImei == 1){
//		$('#imeiDr-modal').modal('show');
//		$('#imeiDrGrid').resize();
//	}else{
//		reLoadGrid33(obj.goodsId);
//		$("#storageChoseModal").modal("show");
//		$("#dataGrid33").resize();
//	}
//}


//初始化表格
var dataGrid33 = null;
function initStorageModalGrid(){
	//配置
	var paras = {
	    gridId:'dataGrid33', 
	    height: 280,
	    noShowOp:false,
	    addRow:{goodsId:'',goodsCode:'',goodsName:''},
	    colNames:['仓库id','仓库名称','商品id','商品名称','现存量','数量','备注','串号'],
	    colModel:
	    	[ 
	             {name : 'storageId',width:100,index : 'storageId',align:'left',sortable: false,formatter:'String',hidden:true}, 
	             {name : 'storageName' ,width:160,sortable: false,index : 'storageName',align:'left',editable:false}, 
	             {name : 'goodsId',width:100,index : 'goodsId',align:'left',sortable: false,formatter:'String',hidden:true}, 
	             {name : 'name',width:140,index : 'goodsName',align:'left',sortable: false,formatter:'String'},
	             {name : 'stockCount',index : 'stockCount',width:100,align:'left',sortable: false},
	             {name : 'goodsNumber',index : 'goodsNumber',width:100,align:'left',editable:true,sortable: false,formatter:'integer'},
	             {name : 'remark',index : 'remark',hidden: false,width:200,editable:true,sortable: false},
	             {name : 'salesOutstrorageImDraftList',index : 'salesOutstrorageImDraftList',width:200,editable:false,sortable: false,hidden:true}
           ],
	};
	//回调函数
	var callBackList = {
		afterEditCell:function(rowid,name,val,iRow,iCol){
		   lastrow = iRow;
	       lastcell = iCol;
	    },
        afterSaveCell:function(rowid,name,val,iRow,iCol){
	    	lastrow = iRow;
			lastcell = iCol;
	    },
		onCellSelect:function(rowid,iCol,cellcontent,e){
//			if(iCol == 7){
//				  var currRow = $("#dataGrid33").jqGrid('getRowData', rowid);
			      //判断是否数量录入 并判断是否串号管理
//				  var ifManageImei=$("#storageReferenceModal2_goodsInfo").val().split("_")[0];
//			      if("1" ==ifManageImei){
//			    	  $("#dataGrid33").setColProp("goodsNumber",{editable:false});
//			    	  var currRow=$("#dataGrid33").jqGrid('getRowData', rowid);
//			    	  currRow.goodsId=$("#storageReferenceModal2_goodsInfo").val().split("_")[1];
//			    	  currRow.storageId=currRow.id;
//			          openInputImeiModal("dataGrid33",rowid);
//			      }else{
//			    	  $("#dataGrid33").setColProp("goodsNumber",{editable:true});
//			      } 
//			}
		},
		summary:function(rowid,name,val,iRow,iCol){},
        getGridDataList:function(rows){
        	return $.map(rows,function(row){
				if(row.name != "" && row.goodsNumber != "0"){
		        	return row;
				}
        	});
        }
	};
	dataGrid33 = new MyEiditGrid(paras,callBackList);
}

function reloadStorageModalGrid(currRow,rowid){
	reloadDataGrid4(currRow);
	$("#dataGridRowId2").val("dataGrid33"+"|"+rowid);
	$("#dataGrid5").jqGrid('clearGridData');
	$("#goodsnameTitle2").html($("#storageReferenceModal2_goodsInfo").val().split("_")[2]);
	$("#storagenameTitle2").html(currRow.name);
	$('#havedInputNum').html(0);
	$('#inputStorageImeiModal').modal('show');
}


//重新加载刷新数据
function reLoadGrid33(gid){
	var model = {
			sectionId: $('#detailSectionId').val(),
			goodsId: gid
	};
//	if(arguments.length == 1){
//		//混合对象
//		$.extend(model,arguments[0]);
//	}
//	model.companyId=gl_companyId;
	//后台查询数据
	$.request({
//		url:'../Istorage/listByModel',
		url:'/manager/inventory/common/getStockGoodsVoList',
		type : "post",
		dataType : 'json',
		data: model,
		success:function(data){
			if(data.result != 1){$.MsgBox('错误提示',data.desc);return;};
			var data = data.data.stockGoodsVoList;
			//处理表格、
			$("#dataGrid33").jqGrid('clearGridData');
			for ( var int = 0; int < data.length; int++) {
				var row = data[int];
				var storageIdList=$("#storageReferenceModal2_goodsInfo").val().split("_")[3];
				if(storageIdList!="" || storageIdList.length==2){
					var array=JSON.parse(storageIdList);
					if(array.length>0){
						$.each(array,function(i,value){
							if(value.storageId == row.storageId){
								row.salesOutstrorageImDraftList=value.salesOutstrorageImDraftList;
								if(row.salesOutstrorageImDraftList!=""){
									row.goodsNumber=JSON.parse(row.salesOutstrorageImDraftList).length;
								}else{
									row.goodsNumber=value.goodsNumber;
								}
							}
						});
					}
				}
				//插入空数据的1行
				row.goodsId=$("#storageReferenceModal2_goodsInfo").val().split("_")[1];
				row.goodsName=$("#storageReferenceModal2_goodsInfo").val().split("_")[2];
				$("#dataGrid33").jqGrid('addRowData',int,row);
			}
		}
	}); 
	
}


function saveDataGrid33(){
	try {MyEiditGrid.currEditDataGrid.unAllEdit();} catch (e) {}
	var model = {};
	model.storageList = dataGrid33.getGridDataList();
	var xxxNubmer = 0,flag = false;
	for ( var int = 0; int < model.storageList.length; int++) {
		if(model.storageList[int].goodsNumber*1 > model.storageList[int].stockCount*1){
			flag = true;
		}
		xxxNubmer =xxxNubmer + parseInt(model.storageList[int].goodsNumber);
	}
	if(flag == true){
		$.zxsaas_plus.showalert("提示","数量大于现存量，请填写正确数量");
		return
	}
	//回显定单引入页面单据明细值
	var storageIdListInfo = JSON.stringify(model.storageList);
	var storageIdListInfoNameList = $.map(model.storageList,function(item){
		return item.name;
	});
	var rowid=$("#orderImportDataGridDetailRowid").val();
	var row = $(options.gridId2).getRowData(rowid);
	if(xxxNubmer > row.notIntroduceNum){
		$.zxsaas_plus.showalert("提示","商品总数量不能大于未出库量");
		return
	}
	$(options.gridId2).jqGrid('setCell', rowid ,"nowOutStorageNum" ,xxxNubmer);
	$(options.gridId2).jqGrid('setCell', rowid ,"storageIdList" ,storageIdListInfo);
	if(xxxNubmer==0){
		$(options.gridId2).jqGrid('setCell', rowid ,"storageNameList" ,null);
	}else{
		$(options.gridId2).jqGrid('setCell', rowid ,"storageNameList" ,storageIdListInfoNameList.join(","));
	}
	
	$('#storageChoseModal').modal('hide');
}
var lastrow="",lastcell="";


//获取往来单位余额等信息   
function getContactAmountByID(contactsunitId){
	$.request({
		url:"/manager/TcontactUnit/findContactUnitAmount",
		type : 'GET',  
		dataType: "json",
		data:{"id":contactsunitId},
	
		success:function(data){
		  if(data.result==1){
			  $("#billsHeaderForm input[name='yingshouAmount']").val(data.data.amount.yingShou);
			  $("#billsHeaderForm input[name='yushouAmount']").val(data.data.amount.yuShou);
		  }
	    }
	});
}


//保存按钮单击事件
function saveOrderImportData(){
	try {MyEiditGrid.currEditDataGrid.unAllEdit();} catch (e) {}
	var FirstRow;
	var FirstIds=$('#orderImportDataGrid').jqGrid('getGridParam','selarrrow');
	if(FirstIds.length>1 || FirstIds.length<1){
	  $.MsgBox('操作提示','请选中一行数据');
	  return;
	}else{
		FirstRow = $("#orderImportDataGrid").jqGrid('getRowData', FirstIds[0]);
	}
	
	
	var ids=$('#orderImportDataGrid2').jqGrid('getDataIDs');
	var rows=new Array();
	$.each(ids,function(i,value){
		var rowData = $("#orderImportDataGrid2").jqGrid('getRowData', value);
		if(rowData.nowOutStorageNum!=0){
			rows.push(rowData);
		}
	});
	
	if(rows.length==0){
		$.zxsaas_plus.showalert("提示","请在单据明细中选择仓库名称!");
	}else{
		//绑定往来单位余额
		$("#billsHeaderForm input[name='contactUnitName']").val(FirstRow.contactUnitName);
		$("#billsHeaderForm input[name='contactsunitId']").val(FirstRow.contactsunitId);
		//获取往来单位余额等信息
		getContactAmountByID(FirstRow.contactsunitId);
		//绑定部门名称
		$("#billsHeaderForm input[name='sectionName']").val(FirstRow.sectionName);
		$("#billsHeaderForm input[name='sectionId']").val(FirstRow.sectionId);
		
		
		$("#dataGrid").jqGrid('clearGridData');
		var AddDataIndex=1; //添加数据索引
		$.each(rows,function(i,rowData){
			var data={};
			data.ifManageIMei=rowData.ifManageImei
			rowData.storageIdList = JSON.parse(rowData.storageIdList);
			$.each(rowData.storageIdList,function(j,value){
				var orderDetail = $(options.gridId2).jqGrid('getRowData', rowData.id);
				data.orderDetailId=orderDetail.id;
				data.goodsId=orderDetail.goodsId;
				data.goodsName=orderDetail.goodsName;
				
				data.models=orderDetail.models;
				data.code=orderDetail.code;
				data.categoryName=orderDetail.categoryName;
				data.brandName=orderDetail.brandName;
				data.color=orderDetail.color;
				
				data.price=orderDetail.nowOutStoragePrice;
				data.discountRate="100";
				data.taxRate=orderDetail.taxRate;
				if(value.id == undefined){
					data.storageId=value.storageId;
					data.storageName=value.storageName;
				}else{
					data.storageId=value.id;
					data.storageName=value.name;
				}
				data.goodsNumber=value.goodsNumber;
				var stockNum=getStorckNum(data.storageId,data.goodsId);
				data.stockNum=stockNum;
				
				
				data.amount=Number(data.goodsNumber)*Number(data.price);
				//data.orderDetailId=$(options.gridId2).getCell(rowData.id,"id");
				if(value.salesOutstrorageImDraftList!=""){
					var array=new Array();
					var salesOutstrorageImDraftList=JSON.parse(value.salesOutstrorageImDraftList);
					data.stockNum=salesOutstrorageImDraftList[0].stockNum;
					$.each(salesOutstrorageImDraftList,function(i,salesOutstrorageImDraft){
						delete salesOutstrorageImDraft.stockNum;
						array.push(salesOutstrorageImDraft);
					});
					data.salesOutstrorageImDraftList=JSON.stringify(array);
				}
				dataGrid.addRowData(AddDataIndex,data);
                AddDataIndex++;
				summary();
			});
			
		});
		$("#orderImportModal").modal("hide"); 
	}
	
}

function imeiDr(opt){
    var def = {
        gridConfig: {
            colNames: ['id','商品id','仓库id','仓库名称','商品类别', '操作', '串号', '辅助串号', '商品编码', '商品名称','商品品牌','型号','颜色', '备注','库存量','是否串号管理','税率','串号列表','引入订单表id'],
            colModel: [
                {name: 'imeiId', index: 'imeiId', width: 1, hidden: true},
                {name: 'goodsId', index: 'goodsId', width: 1, align: 'center', sorttype: "string", hidden: true},
                {name: 'storageId', index: 'storageId', width: 1, hidden: true},
                {name: 'storageName', index: 'storageName', width: 1, hidden: true},
                {name: 'categoryName', index: 'categoryName', width: 1, hidden: true},
                {name: 'del', index: 'del', width:50,align: 'center', sortable: false,
                    formatter:function(cellvalue, options, rowObject){
                        return '<a class="btn" onclick="imeiDelRow('+ rowObject.imeiId +')"><i class="glyphicon glyphicon-trash"></i></a>'
                    },
                },
                {name: 'imei', index: 'imei', width: 140, align: 'left', sorttype: "string", sortable: false},
                {name: 'auxiliaryImei', index: 'auxiliaryImei', width: 140, align: 'left', sorttype: 'string', sortable: false},
                {name: 'code',index: 'code',width: 100, align: 'left', sorttype: 'string', sortable: false},
                {name: 'name',index: 'name',width: 200, align: 'left', sorttype: 'string', sortable: false},
                {name: 'brandName', index: 'brandName', width: 1, hidden: true},
                {name: 'models', index: 'models', width: 1, hidden: true},
                {name: 'color', index: 'color', width: 1, hidden: true},
                {name: 'remark', index: 'remark', width: 200, align: 'left', sortable: false},
                {name: 'stockCount', index: 'stockCount', width: 1, hidden: true},
                {name: 'ifManageImei', index: 'ifManageImei', width: 1, hidden: true},
                {name: 'taxRate', index: 'taxRate', width: 1, hidden: true},
                {name: 'salesOutstrorageImDraftList',index : 'salesOutstrorageImDraftList',sortable: false,hidden:true},
                {name : 'orderDetailId',index : 'orderDetailId',sortable: false,hidden:true}
            ],
        }
    };
    opt = $.extend({}, def, opt);
    $(document.body).append(
        '<div id="imeiDr-modal" class="modal" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static" >'+
        '<div class="modal-dialog modal-lg" role="document">'+
        '<div class="modal-content">'+
        '<div class="modal-header">'+
        '<button type="button" data-dismiss="modal" class="close"><span aria-hidden="true">&times;</span></button>'+
        '<h4 class="modal-title imeiDr_title">串号导入</h4>'+
        '</div>'+
        '<div class="modal-body">'+
        '<div class="col-md-12">'+
        '<div class="row">'+
        '<div class="col-md-8" style="padding-left:0">EXCEL粘贴</div>'+
        '<div class="col-md-4" style="padding-left:0;padding-right: 0;">错误提示</div>'+
        '</div>'+
        '<div class="row">'+
        '<div class="col-md-8" style="padding-left:0">'+
        '<textarea class="form-control imeiDr_vone" style="height: 80px;resize:none" placeholder="一行一串号，若双串号则主辅串任一即可出库。例：\n A88888888888888 \n 869999999999999"></textarea>'+
        '<div style="height: 40px;line-height: 40px;">'+
        '<button type="button" class="btn imeiDr_import" style="padding: 6px 25px;background: #fff;border: 1px solid #ccc;margin-right: 20px;">导入</button>' +
        '<button type="button" class="btn imeiDr_clear" style="padding: 6px 25px;background: #fff;border: 1px solid #ccc;">清空</button>' +
        '</div>'+
        '</div>'+
        '<div class="col-md-4" style="padding-left:0;padding-right: 0;">'+
        '<textarea class="form-control imeiDr_vtwo" style="height: 120px;resize:none" ></textarea>'+
        '</div>'+
        '</div>'+
        '<div class="row" style="height: 40px;line-height: 55px;">已录入串号<font class="imeiDr_num">0</font>个</div>'+
        '<div class="row" style="margin-top:8px;">'+
        '<table id="imeiDrGrid" class="zxsaastable"></table>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '<div class="modal-footer">'+
        '<button type="button" class="btn btn-primary imeiDr_sure">确认</button>'+
        '<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'
    );
    $("#imeiDrGrid").jqGrid({
        styleUI : 'Bootstrap',
        datatype: "local",
        jsonReader: {
            root: "data.dataList",
            total: "data.total",
            records: "data.records",
            repeatitems: false
        },
        colNames: opt.gridConfig.colNames,
        colModel: opt.gridConfig.colModel,
        sortable: false,
        rownumbers: true,	//显示行号
        rowNum: 9999,
        viewrecords: true,
        width: '100%',
        height: 300,
        autowidth: true,
        multiselect: false,
        rownumWidth: 50,
        shrinkToFit: false,
        gridComplete: function () {
            $("#imeiDrGrid").setLabel(0, '序号')
        }
    });
    $('.imeiDr_import,.imeiDr_clear').hover(function(){
        $(this).css('border','1px solid #0099FF');
    },function(){
        $(this).css('border','1px solid #ccc');
    })

    $('.imeiDr_clear').click(function(){
        $('.imeiDr_vone').val('');
        $('.imeiDr_vtwo').val('');
        $(".imeiDr_vone").trigger('keydown');
    })

    $(".imeiDr_vone").setTextareaCount({
        width: "30px",
        bgColor: "#f2f2f2",
        color: "red",
        display: "block"
    }).parent().css('width','100%');
}
