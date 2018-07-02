function loadmodal(obj) {
	console.log(obj);
	$("#tableDiv").html('<table id="jqGrid_SubjectBalance" class="zxsaastable"></table>');
	if(obj==1){
		two();
	}
	else{
		one();
	}

	function one() {
		var options = {
			LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
			LoadTableUrl: "/manage/erp/fx/reprice/detail/"+$("#mid").val()+"/1",
			//LoadTableUrl: "../../cw/qc/getSubject", //表格数据加载接口地址
			GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
			//LoadTableFomatUrl:"../../json/T_roles.json",
			//LoadTableFomatUrl: "../../", //获取表格显示格式数据加载地址
			//SaveEditUrl: "", //新增或修改后保存数据接口地址
			//SaveAddUrl: "", //新增或修改后保存数据接口地址
			DelRowUrl: "", // 删除信息接口地址
			isSub: "", //是否有子级表格
			subLoadTableUrl: "", //子级表格数据来源地址
			TableName: "#jqGrid_SubjectBalance", //显示表格名称。遵照css选择器书写
			iconJsonUrl: "../json/icon.json",
			btnbox: ".btnbox ", //功能按钮存放容器。遵照css选择器书写	
		};
		$("#datetimepickerStart").datetimepicker({
			lang: "ch", //语言选择中文
			format: "Y-m-d", //格式化日期
			timepicker: false, //关闭时间选项
			todayButton: false //关闭选择今天按钮
		});
		$("#datetimepickerEnd").datetimepicker({
			lang: "ch", //语言选择中文
			format: "Y-m-d", //格式化日期
			timepicker: false, //关闭时间选项
			todayButton: false //关闭选择今天按钮
		});

		$.jgrid.defaults.width = 1280;
		$.jgrid.defaults.responsive = true;
		$.jgrid.defaults.styleUI = 'Bootstrap';
		var lastsel = ''; //最后一次选中的行
		var rightClickColid = ""; //右键列id
		var rightClickColIndex = 0; //右键index
		var mydata;
		var hid = false;
		var lock = false;
		var myobj = [];
		var colNames = ['操作', 'ID', '均摊门店', '商品名称', '调价数量', '单台调价额', '调价后均价', '备注'];
		var JqGridColModel=[
							{name:'',index:'', width:70,align:'center',formatter: addAndDelete},
							{name:'id',index:'id', width:200,align:'center', sorttype:'int',hidden:true},
							{name:'sectionName',index:'sectionName', width:200,align:'center', sorttype:'string',editable:true},
							{name:'goodsName',index:'goodsName', width:200,align:'center', sorttype:'string',editable:true},
							{name:'beforePrNum',index:'beforePrNum', width:100,align:'center', sorttype:'float',formatter:"integer",editable:true},
							{name:'beforePr',index:'beforePr', width:100,align:'center', sorttype:'float',formatter:"number",editable:true},
							{name:'repriceAmount',index:'repriceAmount', width:100,align:'center', sorttype:'float',formatter:"number"},
							{name:'remark',index:'remark', width:300,align:'center', sorttype:'string',editable:true}
		                ];
		loadtable();
		//加载表格

		/*$.getJSON(options.LoadTableUrl,function(t_datat){
			mydata=t_datat;
			//$(options.TableName).setGridParam({data: mydata}).trigger('reloadGrid');  
		});*/
		function loadtable() {
			//				$.post(options.LoadTableUrl,{},function(r){
			//					if(r.data.rows!=null){
			//						 mydata=r.data;
			//					//console.log(mydata);

			$(options.TableName).jqGrid({
				url: options.LoadTableUrl,
				mtype: "GET",
				//						datatype: "jsonstring",
				//				        datastr: mydata,
				datatype: "json",
				//data:mydata,
				//datatype:"local",						
				jsonReader: {
					root: "rows",
					repeatitems: false
				},
				colNames: colNames,
				colModel: JqGridColModel,
				sortable: false,
				rownumbers: true,
				cellsubmit: 'clientArray', //单元格保存内容的位置		
				editurl: 'clientArray',
				rowNum: 15,
				rowList: [10, 15, 20, 25, 40],
				pager: options.pager,
				viewrecords: true,
				//			            multiselect:true,
				cellEdit: true,
				width: "100%",
				height: $(window).height() * 0.55,
				autowidth: true,
				rownumWidth: 35, // the width of the row numbers columns
				shrinkToFit: false, //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
				ondblClickRow: function(id) {
					//双击进入编辑
					var delid = id;

				},
				onCellSelect: function(id, index, e) {
					var colName = $(options.TableName).jqGrid('getGridParam', 'colModel')[index].name
					select_name = colName
					select_index = index;
					//后续可以通过点击的列名称来弹框等
				},
				onSelectRow: function(id) {
					if(id != lastsel && lastsel != '') {
						$(options.TableName).jqGrid('saveRow', lastsel, {
							aftersavefunc: function(rowid, response) {
								console.log(id);

							}
						});
						footerData();
					}
					lastsel = id;
					var rec = $(options.TableName).jqGrid('getRowData', id);
				},

				beforeSelectRow: function(rowid, e) {

				},
				afterInsertRow: function(rowid, aData) { //新增一行之后

				},
				gridComplete: function() {
					var ids = $(options.TableName).jqGrid("getDataIDs");
				},
				loadComplete: function(data) {
					//console.log(data);

				},
				loadError: function(xhr, status, error) {
					//console.log(status)
				}
			})
		}

		$(window).bind('click', function saveEdit(e) {
			var rowId = $(e.target).parent("tr").attr("id");
			if(lastsel != "" && lastsel != rowId) { //用于点击其他地方保存正在编辑状态下的行
				if($(e.target).closest(options.TableName).length == 0) {
					$(options.TableName).jqGrid('saveRow', lastsel);
					lastsel = '';
				}
			}
		})

		function addAndDelete(cellvalue, options, rowObjec) {
			var addAndDel = '<div class="operating" data-id="' + options.rowId + '"><span style="margin-right:0.7rem" id="remove_row" title="添加商品" class="glyphicon glyphicon-plus"></span><span class="glyphicon glyphicon-trash" aria-hidden="true" id="add_row" title="删除行"></span></div>';
			return addAndDel;
		}

		function mySelect(cellvalue, options, rowObjec) {
			var mySelect = '<select style="width:90%" class="" onclick="" value="请选择"></select>';
			return mySelect;
		}

		function getData() {
			//动态生成select
			var opt = '';
		}

		//新增一行
		$(document).on('click', '.glyphicon-plus', function(e) {
			var thisTitle = $(this).attr("title");
			var rowId = $(this).parent().data('id');
			var ids = $(options.TableName).jqGrid('getDataIDs');
			//获得当前最大行号（数据编号）
			var maxid;
			if(ids.length == 0) {
				maxid = 0;
			} else {
				maxid = Math.max.apply(Math, ids);
			}
			$(options.TableName).jqGrid('addRowData', maxid + 1, {}, 'last');
			$(options.TableName).jqGrid("setCell", maxid + 1, "", maxid + 1);
		});

		//删除一行
		$(document).on('click', '.glyphicon-trash', function(e) {
			var thisTitle = $(this).attr("title");
			var rowId = $(this).parent().data('id');
			if(thisTitle == "删除行") {
				console.log('条数:' + $('#jqGrid_SubjectBalance tbody tr').length);
				if($('#jqGrid_SubjectBalance tbody tr').length === 2) {
					$.zxsaas_plus.showalert("错误", "至少保留一条数据!")
					return false;
				}
				$.zxsaas_plus.showconfirm("", "是否确定删除本行?", function() {
					$(options.TableName).jqGrid('delRowData', rowId);
				}, function() {

				});
			}
		});

	}
	//				第二种
	function two() {
		var options = {
			LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
			LoadTableUrl: "/manage/erp/fx/reprice/detail/"+$("#mid").val()+"/1",
			//LoadTableUrl: "../../cw/qc/getSubject", //表格数据加载接口地址
			GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
			//LoadTableFomatUrl:"../../json/T_roles.json",
			//LoadTableFomatUrl: "../../", //获取表格显示格式数据加载地址
			//SaveEditUrl: "", //新增或修改后保存数据接口地址
			//SaveAddUrl: "", //新增或修改后保存数据接口地址
			DelRowUrl: "", // 删除信息接口地址
			isSub: "", //是否有子级表格
			subLoadTableUrl: "", //子级表格数据来源地址
			TableName: "#jqGrid_SubjectBalance", //显示表格名称。遵照css选择器书写
			iconJsonUrl: "../json/icon.json",
			btnbox: ".btnbox ", //功能按钮存放容器。遵照css选择器书写	
		};
		$("#datetimepickerStart").datetimepicker({
			lang: "ch", //语言选择中文
			format: "Y-m-d", //格式化日期
			timepicker: false, //关闭时间选项
			todayButton: false //关闭选择今天按钮
		});
		$("#datetimepickerEnd").datetimepicker({
			lang: "ch", //语言选择中文
			format: "Y-m-d", //格式化日期
			timepicker: false, //关闭时间选项
			todayButton: false //关闭选择今天按钮
		});

		$.jgrid.defaults.width = 1280;
		$.jgrid.defaults.responsive = true;
		$.jgrid.defaults.styleUI = 'Bootstrap';
		var lastsel = ''; //最后一次选中的行
		var rightClickColid = ""; //右键列id
		var rightClickColIndex = 0; //右键index
		var mydata;
		var hid = false;
		var lock = false;
		var myobj = [];
		var colNames = ['操作','ID','均摊门店','商品名称','串号','辅助串号','入库价','成本价','调价差额','调后成本价','备注'];
		var JqGridColModel=[
							{name:'',index:'', width:70,align:'center',formatter: addAndDelete},
							{name:'id',index:'id', width:200,align:'center', sorttype:'int',hidden:true},
							{name:'sectionName',index:'sectionName', width:200,align:'center', sorttype:'string',editable:true},
							{name:'goodsName',index:'goodsName', width:200,align:'center', sorttype:'string',editable:true},
							{name:'imei',index:'imei', width:100,align:'center', sorttype:'float',formatter:"String",editable:true},
							{name:'auxiliaryImei',index:'auxiliaryImei', width:100,align:'center', sorttype:'float',formatter:"String",editable:true},
							{name:'storagepric',index:'storagepric', width:100,align:'center', sorttype:'float',formatter:"number"},
							{name:'beforeCost',index:'beforeCost', width:100,align:'center', sorttype:'float',formatter:"number"},
							{name:'repriceDiff',index:'repriceDiff', width:100,align:'center', sorttype:'float',formatter:"number"},
							{name:'afaterCost',index:'afaterCost', width:100,align:'center', sorttype:'float',formatter:"number"},
							{name:'remark',index:'remark', width:300,align:'center', sorttype:'string',editable:true}
		                ];

		loadtable();
		//加载表格

		/*$.getJSON(options.LoadTableUrl,function(t_datat){
			mydata=t_datat;
			//$(options.TableName).setGridParam({data: mydata}).trigger('reloadGrid');  
		});*/
		function loadtable() {
			//				$.post(options.LoadTableUrl,{},function(r){
			//					if(r.data.rows!=null){
			//						 mydata=r.data;
			//					//console.log(mydata);

			$(options.TableName).jqGrid({
				url: options.LoadTableUrl,
				mtype: "GET",
				//						datatype: "jsonstring",
				//				        datastr: mydata,
				datatype: "json",
				//data:mydata,
				//datatype:"local",						
				jsonReader: {
					root: "rows",
					repeatitems: false
				},
				colNames: colNames,
				colModel: JqGridColModel,
				sortable: false,
				rownumbers: true,
				cellsubmit: 'clientArray', //单元格保存内容的位置		
				editurl: 'clientArray',
				rowNum: 15,
				rowList: [10, 15, 20, 25, 40],
				pager: options.pager,
				viewrecords: true,
				//			            multiselect:true,
				cellEdit: true,
				width: "100%",
				height: $(window).height() * 0.55,
				autowidth: true,
				rownumWidth: 35, // the width of the row numbers columns
				shrinkToFit: false, //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
				ondblClickRow: function(id) {
					//双击进入编辑
					var delid = id;

				},
				onCellSelect: function(id, index, e) {
					var colName = $(options.TableName).jqGrid('getGridParam', 'colModel')[index].name
					select_name = colName
					select_index = index;
					//后续可以通过点击的列名称来弹框等
				},
				onSelectRow: function(id) {
					if(id != lastsel && lastsel != '') {
						$(options.TableName).jqGrid('saveRow', lastsel, {
							aftersavefunc: function(rowid, response) {
								console.log(id);

							}
						});
						footerData();
					}
					lastsel = id;
					var rec = $(options.TableName).jqGrid('getRowData', id);
				},

				beforeSelectRow: function(rowid, e) {

				},
				afterInsertRow: function(rowid, aData) { //新增一行之后

				},
				gridComplete: function() {
					var ids = $(options.TableName).jqGrid("getDataIDs");
				},
				loadComplete: function(data) {
					//console.log(data);

				},
				loadError: function(xhr, status, error) {
					//console.log(status)
				}
			})
		}

		$(window).bind('click', function saveEdit(e) {
			var rowId = $(e.target).parent("tr").attr("id");
			if(lastsel != "" && lastsel != rowId) { //用于点击其他地方保存正在编辑状态下的行
				if($(e.target).closest(options.TableName).length == 0) {
					$(options.TableName).jqGrid('saveRow', lastsel);
					lastsel = '';
				}
			}
		})

		function addAndDelete(cellvalue, options, rowObjec) {
			var addAndDel = '<div class="operating" data-id="' + options.rowId + '"><span style="margin-right:0.7rem" id="remove_row" title="添加商品" class="glyphicon glyphicon-plus"></span><span class="glyphicon glyphicon-trash" aria-hidden="true" id="add_row" title="删除行"></span></div>';
			return addAndDel;
		}

		function mySelect(cellvalue, options, rowObjec) {
			var mySelect = '<select style="width:90%" class="" onclick="" value="请选择"></select>';
			return mySelect;
		}

		function getData() {
			//动态生成select
			var opt = '';
		}

		//新增一行
		$(document).on('click', '.glyphicon-plus', function(e) {
			var thisTitle = $(this).attr("title");
			var rowId = $(this).parent().data('id');
			var ids = $(options.TableName).jqGrid('getDataIDs');
			//获得当前最大行号（数据编号）
			var maxid;
			if(ids.length == 0) {
				maxid = 0;
			} else {
				maxid = Math.max.apply(Math, ids);
			}
			$(options.TableName).jqGrid('addRowData', maxid + 1, {}, 'last');
			$(options.TableName).jqGrid("setCell", maxid + 1, "", maxid + 1);
		});

		//删除一行
		$(document).on('click', '.glyphicon-trash', function(e) {
			var thisTitle = $(this).attr("title");
			var rowId = $(this).parent().data('id');
			if(thisTitle == "删除行") {
				console.log('条数:' + $('#jqGrid_SubjectBalance tbody tr').length);
				if($('#jqGrid_SubjectBalance tbody tr').length === 2) {
					$.zxsaas_plus.showalert("错误", "至少保留一条数据!")
					return false;
				}
				$.zxsaas_plus.showconfirm("", "是否确定删除本行?", function() {
					$(options.TableName).jqGrid('delRowData', rowId);
				}, function() {

				});
			}
		});

	}

}