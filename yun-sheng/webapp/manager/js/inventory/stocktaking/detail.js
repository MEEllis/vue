//时间插件
    $(document).ready(function(){
//    	表格参数
    	var options = {
        		LoadTableUrl: basePath + '/inventory/stocktaking/queryDetail',
        		TableName: "#dataGrid", //显示表格名称。遵照css选择器书写
        		pager: "#jqGridPager",
        		colNames : ['序号','仓库名称','商品类别','商品编码','商品名称','品牌','型号','颜色','商品条码','系统库存串号','系统库存辅助串号',
        		            '盘点库存串号','系统库存数量','盘点库存数量','盘点结果数量','盘点结果','串号标识','商品备注'], 
        		colModel : [
        		            {name:'indexNo',index:'indexNo',width:50,align:'center',sortable:false},
        		            {name:'storageName',index:'storageName', width:150,align:'center',sortable:false},
    						{name:'goodsclassName',index:'goodsclassName', width:150,align:'center', sorttype:'string',sortable:false},
    						{name:'goodsCode',index:'goodsCode', width:150,align:'center',sortable:false},
    						{name:'goodsName',index:'goodsName', width:150,align:'center',sorttype:'string',sortable:false},
    						{name:'goodsbrandName',index:'goodsbrandName', width:150,align:'center', sorttype:'string',sortable:false},
    						{name:'goodsModel',index:'goodsModel', width:150,align:'center', sorttype:'string',sortable:false},
    						{name:'goodscolorName',index:'goodscolorName', width:150,align:'center', sorttype:'string'},
    						{name:'goodsNo',index:'goodsNo', width:150,align:'center', sorttype:'string',sortable:true},
    						{name:'imei',index:'imei', width:150,align:'center',sorttype:'string',sortable:false},
    						{name:'auxiliaryImei',index:'auxiliaryImei', width:150,align:'center', sorttype:'string',sortable:false},
    						{name:'pdImei',index:'pdImei', width:150,align:'center', sorttype:'string',sortable:false},
    						{name:'goodsBook',index:'goodsBook', width:150,align:'center', sorttype:'string',sortable:false},
    						{name:'goodsCount',index:'goodsCount', width:150,align:'center',sorttype:'string',sortable:false},
    						{name:'resultCount',index:'resultCount', width:150,align:'center', sorttype:'string',sortable:false},
    						{name:'resultStr',index:'resultStr', width:150,align:'center', sorttype:'string',sortable:false},
    						{name:'imRemark',index:'imRemark', width:150,align:'center', sorttype:'string',sortable:false},
    						{name:'remark',index:'remark', width:200,align:'center', sorttype:'string',sortable:false},
    	                ]       
        	};
    	loadmodal(options);
    	
//    	获取仓库
    	getStorageVoList();
    	$('#mainStorage').select2();
    	
//    	获取商品类别
    	goodsTypeZtreeInit();
    	
//		查询
		$('.search').click(function(){
			var obj = {
				inventoryId: $("#inventoryId").val(),
				storageIds: ($('#mainStorage').val() == null)?"":$('#mainStorage').val().join(","),
				goodsclassIds: ($('#goodsTypeInput').data('idlist') == undefined)?"":$('#goodsTypeInput').data('idlist').join(","),
				pdResult: $(".pdResult").val()*1,
				page: 1,
				keyWord: $(".keyWord").val()
			}
			$("#dataGrid").jqGrid("setGridParam",{
				datatype:'json',
				page: 1,
				postData: obj
			}).trigger("reloadGrid"); 
			
		});
		
		//	导出
		$('.derive').click(function(){
			var obj = {
					inventoryId: $("#inventoryId").val(),
					storageIds: ($('#mainStorage').val() == null)?"":$('#mainStorage').val().join(","),
					goodsclassIds: ($('#goodsTypeInput').data('idlist') == undefined)?"":$('#goodsTypeInput').data('idlist').join(","),
					pdResult: $(".pdResult").val()*1,
					keyWord: $(".keyWord").val()
				}
			window.open(basePath+'/inventory/stocktaking/exportDetail?inventoryId='+obj.inventoryId+'&storageIds='+obj.storageIds+'&goodsclassIds='+obj.goodsclassIds+'&pdResult='+obj.pdResult+'&keyWord='+obj.keyWord);
		});
		
		//商品类别保存
		$('#saveGoodsType').click(function() {
			var treeObj = $.fn.zTree.getZTreeObj("goodsTypeZtree"),
				nodes = treeObj.getCheckedNodes(true);
			var str1 = '';
			var arr2 = [];
			nodes.shift();
			$.each(nodes, function(index, item) {
				str1 += index == 0 ? item.name : (',' + item.name);
				arr2.push(item.id);
			});
			$('#goodsTypeInput').val(str1);
			$('#goodsTypeInput').data('idlist', arr2);
			$('#goodsType').modal('hide');
		})
		
	});
    
    /**
     * 商品类别的树加载
     */
    function goodsTypeZtreeInit() {
    	var setting = {
    		data: {
    			simpleData: {
    				enable: true,
    				idKey: "id",
    				pIdKey: "parentId",
    				rootPId: null,
    			}
    		},
    		check: {
    			enable: true,
    			chkboxType: {
    				"Y": "ps",
    				"N": "ps"
    			}
    		},
    		callback: {
    			
    		},
    		view: {
    			showIcon: false,
    		},
    	};
    	$.ajax({
    		url: basePath + '/inventory/common/getGoodsClassTreeNodeVoList',
    		type: 'post',
    		dataType: 'json',
    		async: false,
    		success: function(data) {
    			$.fn.zTree.init($('#goodsTypeZtree'), setting, data.data.goodsClassVoList);
    			$.fn.zTree.getZTreeObj("goodsTypeZtree").expandAll(true);
    		}
    	})
    };
    
    
  //汇总统计
    function Summary() {
        //汇总每一行
        var ids = $("#dataGrid").jqGrid("getDataIDs");
        var str = $("#dataGrid").jqGrid('getCol','resultStr');
        var resultCount = $("#dataGrid").getCol('resultCount', false, 'sum')
        //汇总
        var match = 0;
    	var more = 0;
    	var less = 0;
		for (var i = 0; i < ids.length; i++) {
			var rowData = $("#dataGrid").getRowData(ids[i]);
			switch(rowData.resultStr){
    		case "匹配":
    			match+=1;
    			$("#dataGrid").setCell(ids[i],"resultStr","匹配",{color:'green'});
    		  break;
    		case "盘盈":
    			more+=1;
    			$("#dataGrid").setCell(ids[i],"resultStr","盘盈",{color:'blue'});
    		  break;
    		case "盘亏":
    			less+=1;
    			$("#dataGrid").setCell(ids[i],"resultStr","盘亏",{color:'red'});
    		  break;
    		default:
    			break;
    		}
		}
        var resultStr = '匹配:' + match + '\n' + '盘盈:' + more + '\n' + '盘亏:' + less;
        $("#dataGrid").footerData("set", {
        	indexNo: "合计",
            resultCount: resultCount,
            resultStr: resultStr
        });
    }
    
    function getStorageVoList() {
    	$.ajax({
			url: basePath + '/inventory/common/getStorageVoList',
			type: "post",
			data: {
				sectionId: $(".sectionName").attr("ids")
			},
			dataType: "json",
			async: false,
			success: function(data) {
				$("#mainStorage").empty();
				var storageList = $.map(data.data.storageVoList, function(item, index) {
					delete item.remark;
					item.text = item.name;
					item.id = item.storageId;
					delete item.name;
					return item;
				})
				$('#mainStorage').select2({
					data: storageList,
					width: "180px"
				});
			},
			error: function() {
				$.zxsaas_plus.showalert("提示","error!")
			}
		})
	}
    
    
    function loadmodal(options) {
    	$.jgrid.defaults.width = 1280;
    	$.jgrid.defaults.responsive = true;
    	$.jgrid.defaults.styleUI = 'Bootstrap';

		$(options.TableName).jqGrid({
			url: options.LoadTableUrl,
			mtype: "GET",
			datatype: "json",
			jsonReader: {
				root: "data.rows",
				total: "data.total",
				records: "data.records",
				repeatitems: false
			},
			//cellsubmit: 'clientArray',//单元格保存内容的位置
			colNames: options.colNames,
			colModel: options.colModel,
			//loadonce: false,
			sortable: false,
			multiselect : false,	//复选框属性
			rownumbers: false,	//显示行号
			//loadonce: true,
			footerrow: true, //分页上添加一行，用于显示统计信息
			rowNum: 100,
			rowList: [100, 200, 300],
			pager: options.pager,
			viewrecords: true,
			//cellEdit:true,
			width: "100%",
			height: $(window).height() * 0.5,
			autowidth: true,
			rownumWidth: 35, // the width of the row numbers columns
			shrinkToFit: false, //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
			ondblClickRow: function(id) {

			},
			onCellSelect: function(id, index, e) {
			},
			onSelectRow: function(id) {

			},

			beforeSelectRow: function(rowid, e) {

			},
			afterInsertRow: function(rowid, aData) { //新增一行之后

			},
			gridComplete: function() {
				Summary();
			},
			loadComplete: function(data) {

			},
			loadError: function(xhr, status, error) {
				//console.log(status)
			}
		})
    }
