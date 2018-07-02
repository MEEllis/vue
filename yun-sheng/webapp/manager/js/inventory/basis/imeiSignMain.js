var dataGrid;
var arrs = []; // 用于存储修改会员ids

$(function () {
	var lastrow, lastcell; //表格的 行 ，列

	$.jgrid.defaults.width = 1280;
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';

	loadmodalImei(); //串号标识档案管理
	loadmodalAmend(); //串号标识修改
	loadmodalImport(); //串号导入
	initImeiImport();
	imeiList();

	//串号下拉列表
	function imeiList() {
		$.ajaxPackage({
			type: 'get',
			contentType: 'application/json',
			url: '/manager/inventory/basis/imeiSign/getImeiSignList',
			data: {isDisabled:0},
			success: function (data) {
				if (data.result == 1) {
					var dataList = data.data.dataList;
					$(".imeiSign").find("option:selected").text("");
					$(".imeiSign").empty();
					$("#xg_imeiSign").append("<option value=''></option>");
					$("#all_imeiSign").append("<option value=''>全部</option>");
					$.each(dataList, function (i, v) {
						$(".imeiSign").append("<option value='"+v.id+"'>"+v.name+"</option>");
					})
				}
			}
		})
	}

	//商品名称
	// $('#goodsName').comModalsAllGoods({
	// 	multiselect: true
	// });

	// 会员类型表格加载
	$('#grid').jqGrid({
		url: "/manager/inventory/basis/imeiSign/getImeiSignPageList",
		mtype: "POST",
		datatype: "json",
		jsonReader: {
			root: "data.dataList",
			total: "data.total",
			records: "data.records"
		},
		colNames: ['imeiId','串号', '辅助串号', '串号标识','串号编码'],
		colModel: [
			{name: "imeiId", index: "id", width: "80px", align: "center", sortable: true, hidden: true},
			{name: "imei", index: "imei", width: "150px", align: "center", sortable: true},
			{name: "auxiliaryImei", index: "auxiliaryImei", width: "150px", align: "center", sortable: true},
			{name: "name",index: "name", width: "150px", align: "center", sortable: true},
			{name: "code",index: "code", width: "150px", align: "left", sortable: true, hidden: true}
		],
		sortable: true,
		rownumbers: true,
		cellsubmit: 'clientArray',// 单元格保存内容的位置
		editurl: 'clientArray',
		rowNum: 100,
		rowList: [100,200,500],
		pager: '#gridPager',
		viewrecords: true,
		cellEdit: true,
		page: 1,
		footerrow: false,
		multiselect: true,
		multiboxonly: true,
		multiselectWidth: 50,
		height: $(window).height() * 0.5,
		autowidth: true,
		rownumWidth: 35, // the width of the row numbers columns
		shrinkToFit: false,  // 此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
		userDataOnFooter: true,// 设置userData 显示在footer里
		gridComplete: function () {
			$("#grid").setLabel(0, '序');
		}
	});

	// 查询
	$('#search').click(function(){
		var obj = {
			queryKey: $('#imeiInfo').val().trim(),
			imeiSignId: $('.imeiSign').val()
		}
		$("#grid").jqGrid("setGridParam",{
			url: '/manager/inventory/basis/imeiSign/getImeiSignPageList',
			datatype:'json',
			postData: obj
		}).trigger("reloadGrid");
	});

	// 重置
	$('#reset').click(function(){
		location.reload();
	});

	//修改
	$('#amend').click(function(){
		var ids = $('#grid').jqGrid('getGridParam','selarrrow');
		if(ids.length > 0) {
			var imeiIds=[];
			for(var i=0;i<ids.length;i++){
				var rowData = $("#grid").jqGrid('getRowData', ids[i]);
				imeiIds.push(rowData.imeiId)
			}
			$('#amendModal').modal('show');
			$("#amendGrid").jqGrid('setGridParam', {
				postData:{
					imeiId: imeiIds.join(',')
				}
			}).trigger("reloadGrid");
		}else{
			$.zxsaas_plus.showalert('提示','请选择需要修改的数据');
		}
	});

	// 修改保存
	$('.amendSave_btn').click(function(){
		var objList = [];
		var ids= $("#amendGrid").getDataIDs();
		$.each(ids,function(i,value){
			var row = $("#amendGrid").jqGrid('getRowData', value );
			row.imeiSignId = $('#xg_imeiSign').val();
			delete row.imei;
			delete row.auxiliaryImei;
			if(row.imeiId){
				objList.push(row);
			}
		});

		if (objList.length < 1) {
			$.zxsaas_plus.showalert("提示", "没有要修改的串号标识！");
			return
		}

		$.ajaxPackage({
			contentType : 'application/json',
			url:'/manager/inventory/basis/imeiSign/updateImeiSign',
			data: JSON.stringify(objList),
			success:function(data){
				if (data.result == 1) {
					$.zxsaas_plus.showalert('success', "修改成功！");
					$("#grid").trigger("reloadGrid");
				}
			}
		})
	});

	//禁用启用
	function formatterGiftFlag(cellvalue, options, rowObjec){
		if(cellvalue==1 || cellvalue=="√"){
			return "√"
		}else{
			return "";
		}
	}

	function formatterDelFlag(cellvalue, options, rowObject) {
		return '<a class="btn" onclick="imeiDelRow(\''+ rowObject.imeiId +'\')"><i class="glyphicon glyphicon-trash"></i></a>'
	}

	/*串号标识档案管理*/
	$(document).on("shown.bs.modal","#imeiModal",function(){
		//$("#dataGrid").setGridWidth($(this).find(".modal-body").width());
		loadTable();
	});

	$(document).on("shown.bs.modal","#amendModal",function(){
		$("#amendGrid").setGridWidth($(this).find(".modal-body").width());
		imeiList();
	});

	//加载表格
	function loadTable(){
		$.ajaxPackage({
			type: 'get',
			contentType: 'application/json',
			url: '/manager/inventory/basis/imeiSign/getImeiSignManagerPageList',
			data: {page: 1,rows: 100},
			success: function (data) {
				if (data.result == 1) {
					var dataList = data.data.dataList;
					dataGrid.$grid.jqGrid('clearGridData');
					if (dataList.length > 0) {
						var reader = {
							root: function(obj) { return data.data.dataList },
							page: function(obj) { return data.data.page },
							total: function(obj) { return data.data.total },
							records: function(obj) { return data.data.records }
						}
						dataGrid.$grid.setGridParam({
							data: dataList,
							reader: reader
						}).trigger('reloadGrid');
						kongRow();
					}else{
						dataGrid.addKongRow();
					}
				}
			}
		})
	}

	//添加空行
	function kongRow() {
		var $grid = dataGrid.$grid;
		$grid.delRowData('dataGrid_addRowId');
		dataGrid.addKongRow();
		$grid.delRowData(MyEiditGrid.getMaxRowid($grid));
	}

	//串号导入
	$('#import').on('click',function () {
		imeiList();
		$('#importGrid').jqGrid('clearGridData');
		$(".imeiDr_vtwo").val('');
		$('.imeiDr_vone').val('');
		$('#imeiImportForm')[0].reset();
		$('#imeiImportModal').modal('show');
	})

	//串号标识修改
	function loadmodalAmend() {
		$('#amendGrid').jqGrid({
			url: '/manager/inventory/basis/imeiSign/getImeiList',
			mtype:"POST",
			datatype: "json",
			editurl: 'clientArray',
			cellsubmit: 'clientArray',//单元格保存内容的位置
			jsonReader  : {
				root:"data.dataList",
				repeatitems: false
			},
			colNames: ['imeiId','串号','辅助串号'],
			colModel: [
				{name: "imeiId", index: "imeiId", width: "80px", align: "left", sortable: true, hidden: true},
				{name: "imei", index: "imei", width: "150px", align: "left", sortable: true},
				{name: "auxiliaryImei", index: "auxiliaryImei", width: "150px", align: "left", sortable: true}
			],
			sortable:false,
			rowNum: 20,
			rowList: [2,20, 25, 40],
			viewrecords: true,
			cellEdit:false,
			height: $(window).height()*0.50,
			autowidth:true,
			width: "100%" ,
			rownumWidth: 35, // the width of the row numbers columns
			rownumbers:true,
			ondblClickRow:function(id){
			},
			onCellSelect:function(id,index,e){
			},
			onSelectRow:function(id){
			},
			beforeEditCell:function(rowid,cellname,v,iRow,iCol){
				lastrow = iRow;
				lastcell = iCol;
			},
			beforeSelectRow:function(rowid,e){

			},
			afterInsertRow: function (rowid, aData) { //新增一行之后

			},
			gridComplete: function() {

			},
			loadComplete:function(data){
			},
			loadError:function(xhr,status,error){
			}
		})
	}

	//串号标识档案管理
	function loadmodalImei(){
		var pager='#jqGridPager';
		//配置
		var paras = {
			datatype : "local",
			gridId: 'dataGrid',
			pager: pager,
			viewrecords: true,
			colNames: ['<i class="bitianX">*</i>标识编码', '<i class="bitianX">*</i>标识名称',
				'禁用', '备注', 'id','groupId','companyId'
			],
			colModel: [
				{ name: 'code', width: 150, align: 'left',  editable: true, sortable: false,editoptions:{
					dataEvents:[{
						type:"blur",
						fn:function(e){
							if($(this).val()){
								$(this).val($.trim($(this).val()));
							}
						}
					}]
				}},
				{ name: 'name', width: 150, align: 'left',  editable: true, sortable: false,editoptions:{
					dataEvents:[{
						type:"blur",
						fn:function(e){
							if($(this).val()){
								$(this).val($.trim($(this).val()));
							}
						}
					}]
				} },
				{ name: 'status', width: 100, sortable: false,align: 'center',editable: true,sortable: false,edittype:'checkbox',width:'100px', editoptions:{value:"√:"},formatter:formatterGiftFlag },
				{ name: 'remark', width: 200, align: 'left', editable: true },
				{ name: 'id', hidden: true },
				{ name: 'groupId', hidden: true },
				{ name: 'companyId', hidden: true }
			]
		};
		//回调函数
		var callBackList = {
			onCellSelect: function (rowid, iCol, cellcontent, e) {
				lastcell = iCol;
			},
			afterEditCell: function (rowid, name, val, iRow, iCol) { //开始编辑
				lastrow = iRow;
				lastcell = iCol;
			},
			afterSaveCell: function (rowid, name, val, iRow, iCol) { //保存编辑
				lastrow = iRow;
				lastcell = iCol;
			},
			summary: function (rowid, name, val, iRow, iCol) { //统计处理
			
			},
			getGridDataList: function (rows) {
				delete rows["op"];
				return rows;
			},
			gridComplete:function(){
				$(pager+"_left").remove()
				$(pager+"_center").attr('colspan',2)
			}
		};

		dataGrid = new MyEiditGrid(paras, callBackList);
		dataGrid.$grid.jqGrid("clearGridData");
		dataGrid.$grid.setGridParam(
			{
				autowidth: true,
				width: '100%',
			}
		).trigger('reloadGrid');

		dataGrid.$grid.setGridHeight(300);
		dataGrid.$grid.closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"}).next('.ui-jqgrid-sdiv').hide();
		//判断表格是否编辑状态
		MyEiditGrid.delClickRow = function(gridId,rowId){
			try {MyEiditGrid.currEditDataGrid.unAllEdit();} catch (e) {}
			var isE = $("#"+gridId).jqGrid('getGridParam', "cellEdit");
			if(isE){
				$.MsgBox("操作提示",MyEiditGrid.allGrid[gridId].config.deleteLable||"确定要删除此行？",function(){
					var info=$("#"+gridId).getRowData(rowId);
					if(info.id){
						$.ajaxPackage({
							url: '/manager/inventory/basis/imeiSign/delImeiSign',
							data: {id: info.id},
							success: function (data) {
								if (data.result == 1) {
									$("#"+gridId).jqGrid('delRowData', rowId);
									$.zxsaas_plus.showalert('success', "删除成功！");
								}
							}
						})
					}else{
						$("#"+gridId).jqGrid('delRowData', rowId);
					}
				},function(){});
			}else{
				return ;
			}
		}
		dataGrid.addKongRow()
	}

	function checkParam(data) {
		var temp1 = [],temp2 = [],arr1 = [],arr2 = [];
		for(var i=0;i<data.length;i++){
			if(temp1.indexOf(data[i].code)==-1){
				temp1.push(data[i].code)
			}else{
				arr1.push(data[i].code)
			}
			if(temp2.indexOf(data[i].name)==-1){
				temp2.push(data[i].name)
			}else{
				arr2.push(data[i].name)
			}

		}
		if (arr1.length > 0 ) {
			$.zxsaas_plus.showalert("提示", "串号编码 <b>"+arr1.join(',')+"</b> 重复,请检查后保存");
			return true
		}

		if (arr2.length > 0 ) {
			$.zxsaas_plus.showalert("提示", "串号名称 <b>"+arr2.join(',')+"</b> 重复,请检查后保存");
			return true
		}

		if (data.length < 1) {
			$.zxsaas_plus.showalert("提示", "没有要保存的串号标识！");
			return true
		}
		var flag = true;
		$.each(data,function (i,v) {
			if(!v.code){
				flag = false
			}
		})
		if(!flag){
			$.zxsaas_plus.showalert("提示", "请填写标识编码！");
			return true
		}

	}


	//串号标识保存
	$('.imeiSave_btn').on('click',function () {
		var $grid = dataGrid.$grid;
		$grid.jqGrid("saveCell", lastrow, lastcell);
		var data = [];
		var List = dataGrid.getGridDataList();
		for (var i = 0; i < List.length; i++) {
			var item = List[i];
			data.push({
				code: item.code,
				name: item.name,
				status: item.status=="√"?1:0,
				remark: item.remark,
				id: item.id,
				groupId: item.groupId,
				companyId: item.companyId
			})
		}

		if (checkParam(data) == true) {
			return
		}
		$('#imeiModal').modal('hide');
		$.ajaxPackage({
			contentType : 'application/json',
			url: '/manager/inventory/basis/imeiSign/saveImeiSign',
			data: JSON.stringify(data),
			success: function (data) {
				$.zxsaas_plus.showalert('success', "保存成功！");
				dataGrid.clearDataGrid();
				$('#dataGrid').trigger("reloadGrid");
				imeiList();
			}
		})
	})

	// 初始化串号导入
	function initImeiImport(){
		//粘贴导入
		$('.imeiDr_import').click(function(){
			$(".imeiDr_vtwo").val('');
			//拿到串号标识
			var imeiSignId = $('#imeiSign').val();
			var name = $('#imeiSign').find("option:selected").text();
			var objList = [];
			//开始添加串号
			var vone = $('.imeiDr_vone').val();
			var v1 = vone.split("\n");
			var str = '',vtr = '';
			$.each(v1,function(i,item){
				var toval = item.trim().toUpperCase();
				if(toval == ""){
					return
				}
				if(arrs.indexOf(toval) == -1){
					str+=toval+';'
					objList.push({imeiSignId: imeiSignId,imei: toval,name: name})
					arrs.push(toval);
				}else{
					vtr+=toval+';'
				}
			})
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
			$.ajaxPackage({
				contentType:'application/json',
				url: '/manager/inventory/basis/imeiSign/import',
				data: JSON.stringify(objList),
				success: function (data) {
					if(data.result==1){
						var failed = data.data.failedResultList;
						var list = data.data.successResultList;
						$.each(list,function(i,item){
							$("#importGrid").addRowData(item.imeiId,item);
						})
						var num = $('#importGrid').getDataIDs();
						$('.imeiDr_num').text(num.length);
						var txt = $(".imeiDr_vtwo").val();
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

		})

		//Excel导入
		$('.imeiImportOK').click(function () {
			var fileObj =  $('#file').get(0).files[0];
			if(typeof (fileObj) == "undefined" || fileObj.size <= 0){
				$.zxsaas_plus.showalert("提示", "请选择要上传的文件！");
				return;
			}
			var fileName =$("#file").val();
			var fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
			if(fileExtension == "xls") {
				$.ajaxFileUpload({
					url: '/manager/inventory/basis/imeiSign/excelImport',
					secureuri: false,
					fileElementId: "file",
					dataType: "json",
					success: function (data) {
						if (data.result == 1) {
							var failed = data.data.failedResultList;
							var list = data.data.successResultList;
							$.each(list, function (i, item) {
								$("#importGrid").addRowData(item.imeiId, item);
							})
							var num = $('#importGrid').getDataIDs();
							$('.imeiDr_num').text(num.length);
							var txt = $(".imeiDr_vtwo").val();
							$.each(failed, function (i, item) {
								txt += item + '\n';
							})
							$(".imeiDr_vtwo").val(txt);
						} else {
							$.zxsaas_plus.showalert("error", data.desc || '上传失败！');
						}
					},
					error: function (msg) {
						$.zxsaas_plus.showalert("error", "！" + msg);
					}
				});
			}else{
				$.zxsaas_plus.showalert("错误","请选择xls格式文件上传！");
			}
		})

		//串号导入
		$('.imeiDr_sure').click(function(){
			var objList = [];
			var ids= $("#importGrid").getDataIDs();
			$.each(ids,function(i,value){
				var row = $("#importGrid").jqGrid('getRowData', value );
				row.imeiSignId = row.imeiSignId?row.imeiSignId:$('#imeiSign').val();
				delete row.del;
				delete row.imei;
				delete row.name;
				if(row.imeiId){
					objList.push(row);
				}
			});

			if (objList.length < 1) {
				$.zxsaas_plus.showalert("提示", "没有要导入的串号！");
				return
			}

			$.ajaxPackage({
				contentType : 'application/json',
				url:'/manager/inventory/basis/imeiSign/updateImeiSign',
				data: JSON.stringify(objList),
				success:function(data){
					if (data.result == 1) {
						$.zxsaas_plus.showalert('success', "导入成功！");
						$('#imeiImportModal').modal('hide');
						$("#grid").trigger("reloadGrid");
					}
				}
			})
		})
	}
	
	//串号导入
	function loadmodalImport() {
		$('#importGrid').jqGrid({
			mtype: "post",
			styleUI : 'Bootstrap',
			datatype: "json",
			jsonReader: {
				root: "data.dataList",
				total: "data.total",
				records: "data.records",
				repeatitems: false
			},
			colNames: ['操作','串号ID','串号','串号标识ID','串号标识名称'],
			colModel: [
				{name: 'del', index: 'del', width:50,align: 'center', sortable: false,formatter: formatterDelFlag},
				{ name: 'imeiId', index: 'imeiId', hidden: true},
				{ name: 'imei', index: 'imei', width: 150, align: 'left', sortable: false },
				{ name: 'imeiSignId', index: 'imeiSignId', hidden: true },
				{ name: 'name', index: 'name', width: 150, align: 'left', sortable: false }
			],
			sortable: false,
			rownumbers: true,	//显示行号
			rowNum: 9999,
			viewrecords: true,
			width: '100%',
			autowidth: true,
			multiselect: false,
			rownumWidth: 50,
			shrinkToFit: false,
			gridComplete: function () {
				$("#importGrid").setLabel(0, '序');
				$('.imeiDr_num').text($('#importGrid').getDataIDs().length);
			}
		})
		$('.imeiDr_import,.imeiDr_clear').hover(function(){
			$(this).css('border','1px solid #0099FF');
		},function(){
			$(this).css('border','1px solid #ccc');
		})

		$('.imeiDr_clear').click(function(){
			$('.imeiDr_vone').val('');
			$('.imeiDr_vtwo').val('');
			$(".imeiDr_vone").trigger('keydown')
		})

	}

})

//删除按钮
var arrs = [];
var a1 = $("#importGrid").getCol('imei');
$.each(a1, function (i, item) {
	arrs.push(item);
})
function imeiDelRow(id){
	var row = $('#importGrid').getRowData(id);
	var index1 = arrs.indexOf(row.imei);
	if(index1 !== -1){
		arrs.splice(index1, 1);
	}
	$("#importGrid").delRowData(id);
	var num = $('#importGrid').getDataIDs();
	$('.imeiDr_num').text(num.length);
}

