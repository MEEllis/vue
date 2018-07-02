//仓库存储 盘点
$(function() {
	$('#mainSave').attr('disabled', true);
	$('#delete').attr('disabled', true);
	$('#createOrder').attr('disabled', true);
    //经办人
    $("#Employee").comModalsEmployeeBySection({
        sectionIds:'#sectionName'
    })
    getDefaultValues()
    //获取默认值
    function getDefaultValues(){
        var obj={
            success:function(data){
                var deSe=data.data.defaultSection;
                var deEm=data.data.defaultEmployee;
                $('#sectionName').val(deSe.name).data('id',deSe.sectionId)
                $('#Employee').val(deEm.name).data('id',deEm.employeeId)
                mainSectionInit()
            }
        }
        InterfaceInventory.common.getDefaultValues(obj);
    }

    //部门名称
    $("#sectionName").storePlu({
        isStoreShow:false,
        isLoadDefaultName:0,
        checkMore: false,
        search: false,
        ifStore: false, // 控制部门选项
        changeStore:function(){
            var $obj=$("#sectionName");
            $obj.data('id',$obj.data('sectionId'))
            $('#Employee').val('').removeData()
            mainSectionInit();
        }
    });


	function mainSectionInit() {
		$.ajax({
			url: basePath + '/jxc/base/getAccessStorageVoList',
			type: "post",
			data: {
				sectionId: $('#sectionName').data('id')
			},
			dataType: "json",
			success: function(data) {
				$("#mainStorage").empty();
				var storageList = $.map(data.data.storageVoList, function(item, index) {
					delete item.remark;
					item.text = item.name;
					delete item.name;
					return item;
				})
				$('#mainStorage').select2({
					data: storageList,
					width: "200px"
				});
			},
			error: function() {
				alert('请求失败')
			}
		})
	}
	//初始化过滤弹窗部门、经手人、仓库；绑定change事件
	$('#filter').click(function() {
		$('#main_filter').modal('show');
		$('#filterStorage').attr("disabled",true);
		$.ajax({
			url: basePath + '/jxc/base/getAccessSectionVoList',
			type: 'post',
			dataType: 'json',
			success: function(data) {
				if (data.result == 1) {
					var sectionVoList = data.data.sectionVoList;
					var html = "<option value='0'>请选择</option>";
					for(var x =0;x<sectionVoList.length;x++){
						html+='<option value=' + sectionVoList[x].id + '>' + sectionVoList[x].name + '</option>'
					}
					$('#filterSection').html(html);
					filterSectionInit();
				} else {
					$.zxsaas_plus.showalert('提示', data.desc);
				}
			},
			error: function() {
				alert('请求失败')
			}
		})
	})
	$('#filterSection').change(function() {
		filterSectionInit();
		if($(this).val() == 0 || $(this).val() == null){
			$('#filterStorage').attr("disabled",true);
		}else{
			$('#filterStorage').attr("disabled",false);
			$('#filterStorage').val("");
		}
	})

	function filterSectionInit() {
		$.ajax({
			url: basePath + '/jxc/base/getEmployeeVoList',
			type: 'post',
			dataType: 'json',
			success: function(data) {
				if (data.result == 1) {
					var employeeVoList = data.data.employeeVoList;

					var html = "<option value='0'>请选择</option>";
					for(var x =0;x<employeeVoList.length;x++){
						html+='<option value=' + employeeVoList[x].id + '>' + employeeVoList[x].name + '</option>'
					}
					$('#filterEmployee').html(html);
					$('#filterMadePerson').html(html);
				} else {
					$.zxsaas_plus.showalert('提示', data.desc);
				}
			},
			error: function() {
				alert('请求失败')
			}
		})
		$.ajax({
			url: basePath + '/jxc/base/getAccessStorageVoList',
			type: "post",
			data: {
				sectionId: $('#filterSection').val()
			},
			dataType: "json",
			success: function(data) {
				if (data.result == 1) {
					$("#filterStorage").empty();
					var storageList = $.map(data.data.storageVoList, function(item, index) {
						delete item.remark;
						item.text = item.name;
						delete item.name;
						return item;
					})
					$('#filterStorage').select2({
						data: storageList,
						width: "180px"
					});
				} else {
					$.zxsaas_plus.showalert('提示', data.desc);
				}
			},
			error: function() {
				alert('请求失败')
			}
		})
	}
	goodsTypeZtreeInit(); //商品类别树加载
	//过滤的时间控件初始化
	$('.filterTime').datetimepicker({
		lang: "ch", //语言选择中文
		format: "Y-m-d", //格式化日期
		timepicker: false, //关闭时间选项
		todayButton: false //关闭选择今天按钮
	}).addClass('date-time-icon');
	$(window).resize(function() {
		$("#mainGrid").setGridWidth($(window).width() * 0.99);
		$("#mainGrid").setGridWidth(document.body.clientWidth * 0.99);
	});

});
var countArr = {};
//主表初始化函数

function mainGridInit() {
	var config = {
		gridId: 'mainGrid',
		colNames: ['仓库名称', '商品类别', '商品编码', '商品名称', '品牌', '型号', '颜色', '系统库存', '盘点库存', '盘点结果','商品备注','库存串号', '仓库Id', '商品Id', '串号匹配', '盘点状态', '是否串号管理', '盘点对照', '串号匹配集', '要匹配的值', '临时存储值'],
		colModel: [{
			name: 'storageName',
			index: 'storageName',
			align: 'center',
			width: '120px',
			sortable: false
		}, {
			name: 'goodsCategory',
			index: 'goodsCategory',
			align: 'center',
			width: '120px',
			sortable: false
		}, {
			name: 'goodsCode',
			index: 'goodsCode',
			align: 'center',
			width: '120px',
			sortable: false
		}, {
			name: 'goodsName',
			index: 'goodsName',
			align: 'center',
			width: '120px',
			sortable: false
		}, {
			name: 'goodsBrand',
			index: 'goodsBrand',
			align: 'center',
			width: '120px',
			sortable: false
		}, {
			name: 'goodsModel',
			index: 'storageName',
			align: 'center',
			width: '120px',
			sortable: false
		}, {
			name: 'goodsColor',
			index: 'storageName',
			align: 'center',
			width: '120px',
			sortable: false
		}, {
			name: 'goodsBook',
			index: 'goodsBook',
			align: 'center',
			width: '120px',
			sortable: false
		}, {
			name: 'count',
			index: 'count',
			align: 'center',
			width: '120px',
			sortable: false,
			formatter: 'integer',
			formatoptions: {
				thousandsSeparator: '',
				defaulValue: 0
			},
			editable: true,
			editoptions: {
				dataEvents: [{
					type: 'blur',
					fn: function(e) {
						var rid = $(e.target).parents('tr').attr('id');
						var goodsBook = $('#mainGrid').getRowData(rid).goodsBook;
						var val = $(e.target).val();
						if (val * 1 < goodsBook * 1) {
							$('#mainGrid').setCell(rid, 'countStatus', 3);
						}
						if (val * 1 > goodsBook * 1) {
							$('#mainGrid').setCell(rid, 'countStatus', 2);
						}
						if (val == goodsBook) {
							$('#mainGrid').setCell(rid, 'countStatus', 1);
						}
						$('#mainGrid').setCell(rid, 'countResult', val - goodsBook);
						var data = $('#mainGrid').getRowData(rid);
						if ($('#countStatusModal').data('maingriddata') != undefined) {
							var targetData = $('#countStatusModal').data('maingriddata');
							for (var i = 0, len = targetData.length; i < len; i++) {
								if (data.goodsId == targetData[i].goodsId) {
									if (val != targetData[i].count) {
										data.count = val;
										targetData.splice(i, 1, data);
										break;
									}
								}
							}
							$('#countStatusModal').data('maingriddata', targetData);
						}
					}
				}]
			}
		}, {
			name: 'countResult',
			index: 'countResult',
			align: 'center',
			width: '120px',
			sortable: true
		}, {
			name: 'remark',
			index: 'remark',
			align: 'center',
			width: '150px',
			editable:true,
			sortable: false,
			editoptions: {
                dataEvents: [{
                    type: "blur",
                    fn: function(){
	                	$("#mainGrid").jqGrid("saveCell", lastrow, lastcell)
	                }
                }]
            }
		}, {
			name: 'imeiVoList',
			index: 'imeiVoList',
			align: 'center',
			width: '120px',
			sortable: false,
			hidden: true
		}, {
			name: 'storageId',
			index: 'storageId',
			align: 'center',
			width: '120px',
			sortable: false,
			hidden: true
		}, {
			name: 'goodsId',
			index: 'goodsId',
			align: 'center',
			width: '120px',
			sortable: false,
			hidden: true
		}, {
			name: 'matchImei',
			index: 'matchImei',
			align: 'center',
			width: '120px',
			sortable: false,
			hidden: true
		}, {
			name: 'countStatus',
			index: 'countStatus',
			align: 'center',
			width: '120px',
			sortable: false,
			hidden: true
		}, {
			name: 'ifManageImei',
			index: 'ifManageImei',
			align: 'center',
			width: '120px',
			sortable: false,
			hidden: true
		}, {
			name: 'countString',
			index: 'countString',
			align: 'center',
			width: '120px',
			sortable: false,
			hidden: true
		}, {
			name: 'imeis',
			index: 'imeis',
			align: 'center',
			width: '120px',
			sortable: false,
			hidden: true
		}, {
			name: 'inputImeiVoList',
			index: 'inputImeiVoList',
			align: 'center',
			width: '120px',
			sortable: false,
			hidden: true
		}, {
			name: 'countArr',
			index: 'countArr',
			align: 'center',
			width: '120px',
			sortable: false,
			hidden: true
		}],
		datatype: "json",
		url: "",
		jsonReader: {
			root: "data.orderVo.goodsList",
			repeatitems: false,
			id: "0"
		},
		viewrecords: true,
		multiselect: false,
		height: $(window).height() * 0.6
	}
	var callback = {
		showChooseStatus: function() {
			$('.ui-jqgrid-htable').find('.s-ico').css('display', 'none');
			if ($('#statusComplete').css('display') == 'inline-block') {
				return;
			}
			$('#countStatusModal').modal('show');
			$('#countStatusModal').data('flag', 'main');
			if ($('#countStatusModal').data('maingriddata') === undefined) {
				var data = $('#mainGrid').getMainGridData();
				$('#countStatusModal').data('maingriddata', data);
			}
		},
		gridComplete: function() {
			var ids = $('#mainGrid').getDataIDs();
			for(var x = 0;x<ids.length;x++){
				var row = $('#mainGrid').getRowData(ids[x]);
				var inputImeiVoList = row.inputImeiVoList;
				var obj = {
					arr : [],
					arrInp : []
				}
				for(var k = 0;k>inputImeiVoList.length;k++){
					obj.arr.push(inputImeiVoList[k].imei);
					obj.arrInp.push(inputImeiVoList[k].remark);
				}
				$('#mainGrid').setCell(ids[x], 'countArr',JSON.stringify(obj));
			}
		},
		onCellSelect: function(rowid, iCol, cellcontent, e) {
			var data = $(e.currentTarget).getRowData(rowid);
			if (iCol == 11) {
				if (data.ifManageImei == 0) {
					return
				}
				$('#countDetails>thead>tr>th:eq(2)').html('盘点状态')
				$('#countMessage').modal('show');
				$(".countMessagename").text(data.goodsName);
				$('#countDetails tbody').html("");
				$('#countMessage').data('rid', rowid);
				var countDetailsList = JSON.parse(data.countString);
				var inputImeiVoList = JSON.parse(data.inputImeiVoList);
				var countDetailsStr = $.map(countDetailsList, function(item, index) {
					if(item.remark == null){
						item.remark ="";
					}
					return '<tr><td>' + (index + 1) + '</td><td class="countImei">' + item.imei + '</td><td>'+ item.flag +'</td><td class="countRemark">'+ item.remark +'</td></tr>';
				});
				$('#countDetails tbody').html(countDetailsStr);
				if(data.countArr == ""){
					$(".countImei").each(function(i ,item){
						var val = $(this).text();
						for(var j=0;j<inputImeiVoList.length;j++){
							if(val == inputImeiVoList[j].imei){
								$(".countRemark").eq(i).text(inputImeiVoList[j].remark);
							}
						}
						for(var x in countArr.arr){
							if(val == countArr.arr[x]){
								$(".countRemark").eq(i).text(countArr.arrInp[x]);
							}
						}
					})
					$(".countRemark").each(function(i ,item){
						var val = $(this).text();
						if(val == data.remark){
							$(this).text("");
						}
					})
					$("#mainGrid").jqgrid("setCell",rowid,'countString',countDetailsList);
					countArr = JSON.parse(data.countArr);
				}else{
					countArr = JSON.parse(data.countArr);
					var str = "";
					for(var x =0;x<countArr.length;x++){
						str+= '<tr><td class="td_index">' + (x + 1)
						+ '</td><td><i class="glyphicon glyphicon-trash td_del"></i>'
						+ '</td><td><input type="text" placeholder="扫描或录入串号" class="form-control td_imei" value='+ countArr[x].imei + '>'
						+ '</td><td><input type="text" placeholder="可在此填写串号标识（非必填）" class="form-control td_input" value='+ countArr[x].remark +' ></td></tr>';
					}

					$('#imeiTable tbody').html(str);
					var td = '<tr><td></td><td><i class="glyphicon glyphicon-plus td_add"></i></td><td></td><td></td></tr>';
					$('#imeiTable tbody').append(td);
					$('#imeiTextarea').val("");
					$(".td_index").each(function(i){
						$(this).siblings().find('.td_imei').attr("id","td_imei"+i)
						$(this).siblings().find('.td_input').attr("id","td_input"+i)
					});
					$(".countImei").each(function(i ,item){
						var val = $(this).text();
						for(var x in countArr.arr){
							if(val == countArr.arr[x]){
								$(".countRemark").eq(i).text(countArr.arrInp[x]);
								countDetailsList[i].remark = countArr.arrInp[x];
							}
						}
					})
					$(".countRemark").each(function(i ,item){
						var val = $(this).text();
						if(val == data.remark){
							$(this).text("");
						}
					})
					$("#mainGrid").jqgrid("setCell",rowid,'countString',countDetailsList);
				}
			}
			if (iCol == 10) {
				if ($('#statusComplete').css('display') == 'inline') {
					$(e.currentTarget).setColProp('count', {
						editable: false
					});
					return;
				}
				if (data.ifManageImei == 0) {
					$(e.currentTarget).setColProp('count', {
						editable: true
					});
					return
				} else {
					$(e.currentTarget).setColProp('count', {
						editable: false
					});
				}
				$('#countStock').modal('show');
				$('#countStock').data('rid', rowid);
				$(".countStockname").text(data.goodsName);
				$('#imeiTextarea').val('');
				var imeiVoList = JSON.parse(data.imeiVoList);
				var str = $.map(imeiVoList, function(item, index) {
					return '<tr><td>' + (index + 1) + '</td><td class="td_imeis">' + item.imei + '</td><td class="td_auxiliaryImeis">' + (item.auxiliaryImei == null ? '' : item.auxiliaryImei) + '</td></tr>';
				}).join(' ');
				$('#countStockDetails tbody').html(str);
				console.log(data);
				if(data.countArr == ""){
					if(data.inputImeiVoList == ""){
						var td = '<tr><td></td><td><i class="glyphicon glyphicon-plus td_add"></i></td><td></td><td></td></tr>';
						$('#imeiTable tbody').html(td);
					}else{
						countArr = JSON.parse(data.inputImeiVoList);
						var str = "";
						for(var x =0;x<countArr.length;x++){
							str+= '<tr><td class="td_index">' + (x + 1)
							+ '</td><td><i class="glyphicon glyphicon-trash td_del"></i>'
							+ '</td><td><input type="text" placeholder="扫描或录入串号" class="form-control td_imei" value='+ countArr[x].imei + '>'
							+ '</td><td><input type="text" placeholder="可在此填写串号标识（非必填）" class="form-control td_input" value='+ countArr[x].remark +' ></td></tr>';
						}

						$('#imeiTable tbody').html(str);
						var td = '<tr><td></td><td><i class="glyphicon glyphicon-plus td_add"></i></td><td></td><td></td></tr>';
						$('#imeiTable tbody').append(td);
						$('#imeiTextarea').val("");
						$(".td_index").each(function(i){
							$(this).siblings().find('.td_imei').attr("id","td_imei"+i)
							$(this).siblings().find('.td_input').attr("id","td_input"+i)
						});
					}
				}else{
					countArr = JSON.parse(data.countArr);
					var str = "";
					for(var x =0;x<countArr.arr.length;x++){
						str+= '<tr><td class="td_index">' + (x + 1)
						+ '</td><td><i class="glyphicon glyphicon-trash td_del"></i>'
						+ '</td><td><input type="text" placeholder="扫描或录入串号" class="form-control td_imei" value='+ countArr.arr[x] + '>'
						+ '</td><td><input type="text" placeholder="可在此填写串号标识（非必填）" class="form-control td_input" value='+ countArr.arrInp[x] +' ></td></tr>';
					}

					$('#imeiTable tbody').html(str);
					var td = '<tr><td></td><td><i class="glyphicon glyphicon-plus td_add"></i></td><td></td><td></td></tr>';
					$('#imeiTable tbody').append(td);
					$('#imeiTextarea').val("");
					$(".td_index").each(function(i){
						$(this).siblings().find('.td_imei').attr("id","td_imei"+i)
						$(this).siblings().find('.td_input').attr("id","td_input"+i)
					});
				}

			}
			if(iCol == 9){
				if ($('#statusComplete').css('display') == 'inline') {
					$(e.currentTarget).setColProp('count', {
						editable: false
					});
					return;
				}
				if (data.ifManageImei == 1) {
					$('#goodsBook').modal('show');
					$('#goodsBookDetails tbody').html("");
					$(".goodsBookname").text(data.goodsName);
					var imeiVoList = JSON.parse(data.imeiVoList);
					var str = $.map(imeiVoList, function(item, index) {
						return '<tr><td>' + (index + 1) + '</td><td class="td_imeis">' + item.imei + '</td><td class="td_auxiliaryImeis">' + (item.auxiliaryImei == null ? '' : item.auxiliaryImei) + '</td></tr>';
					}).join(' ');
					$('#goodsBookDetails tbody').html(str);
				}
			}
		}
	};
	var mainGrid = new gridFactory(config, callback);

}

var lastrow,lastcell;
var setFlag = false;

$(document).on('click', '.list-group-item', function() {
	$(this).addClass('changeBackground').siblings().removeClass('changeBackground');
});
//点击添加
$('#add').click(function() {
	setFlag = true;
	setTimeout(function(){
		if($("#mainGrid").text()=="" && setFlag == true){
			$('#goodsTip').modal('show');
		}
	},5000)
	if ($(this).data('flag')) {
		$('.mainTabs:eq(0)').css('display', 'block');
		$('.mainTabs:eq(1)').css('display', 'none');
		$('#refresCount').show();
		mainGridInit(); //主表初始化
		$(this).data('flag', false);
	} else {
		$('.mainTabs:eq(0)').css('display', 'block');
		$('.mainTabs:eq(1)').css('display', 'none');
		$(this).data('flag', false);
	}
	addRefFun('/inventory/queryInventoryStockGoods', function() {
		$('#mainSave').attr('disabled', false);
		$('#delete').attr('disabled', false);
	});
	if($('#billsCode').val() == ""){
		$('#refresCount').attr('disabled', true);
	}else{
		$('#refresCount').attr('disabled', false);
	}
	$('#showDisable').attr('disabled', true);
	$('#add').attr('disabled', true);
	$('#sectionName').attr('disabled', true);
	$('#mainStorage').attr('disabled', true);
	$('#goodsTypeInput').attr('disabled', true);
	$('span[data-target="#goodsType"]').hide();
	$('.queryKey').attr('disabled', true);
});
//添加的方法
function addRefFun(reqPath, callback) {
	var para = mainGridShow();
	console.log(para);
	$('#jqgh_mainGrid_countResult').html('盘点结果');
	$.ajax({
		url: basePath + reqPath,
		dataType: 'json',
		type: 'post',
		data: {
			jsonData: para
		},
		success: function(data) {
			setFlag = false;
			$('#goodsTip').modal('hide');
			if (data.data.orderVo === null) {
				$.zxsaas_plus.showalert('提示', '无数据请重新选择！！！');
				return;
			}
			if (data.result != 1) {
				$.zxsaas_plus.showalert('提示', data.desc);
				return;
			}
			//获取到数据后的操作
			getGoodsListUpdate(data)
			if (data.result == 1 && callback) {
				callback();
			}
		},
		error: function(){
			setFlag = false;
			$('#goodsTip').modal('hide');
		}
	})
}

//新版刷新库存
function addRefFuns(reqPath, callback) {
	$('#jqgh_mainGrid_countResult').html('盘点结果');
	$.ajax({
		url: basePath + reqPath,
		dataType: 'json',
		type: 'post',
		data: {
			billsMainId: $('#billsId').val()
		},
		success: function(data) {
			if (data.data.orderVo === null) {
				$.zxsaas_plus.showalert('提示', '无数据请重新选择！！！');
				return;
			}
			if (data.result != 1) {
				$.zxsaas_plus.showalert('提示', data.desc);
				return;
			}
			//获取到数据后的操作
			getGoodsListUpdate(data)
			if (data.result == 1 && callback) {
				callback();
			}
		}
	})
}

function getGoodsListUpdate(data) {
	$('#mainGrid').clearGridData();
	var goodsList = data.data.orderVo.goodsList;
	$('#mainTimeShow').html(data.data.orderVo.systemStockTime);
	$('#billsCode').val(data.data.orderVo.billsCode);
	$('#billsId').val(data.data.orderVo.billsId);
	$('#mainCreateBy').val(data.data.orderVo.createByName);
	$('#mainFinishBy').val(data.data.orderVo.finishByName);
	$('#updateByName').val(data.data.orderVo.updateByName);
	if(data.data.orderVo.storageQueryIdsStr == null){
		var idsStr = "";
	}else{
		var idsStr = data.data.orderVo.storageQueryIdsStr.split(",");
	}
	$('#goodsTypeInput').val(data.data.orderVo.goodsclassQueryIdsStrName);
	$('.queryKey').val(data.data.orderVo.goodsNameStr);

	$.ajax({
		url: basePath + '/jxc/base/getAccessStorageVoList',
		type: "post",
		data: {
			sectionId: $('#sectionName').data('id')
		},
		dataType: "json",
		success: function(data) {
			$("#mainStorage").empty();
			var storageList = $.map(data.data.storageVoList, function(item, index) {
				delete item.remark;
				item.text = item.name;
				delete item.name;
				return item;
			})
			$('#mainStorage').select2({
				data: storageList,
				width: "200px"
			});
			$('#mainStorage').val(idsStr).trigger("change");
		},
		error: function() {
			alert('请求失败')
		}
	})

	if(data.data.orderVo.showDisEnabledGoods == 1){
		$('#showDisable').prop('checked', true);
	}else{
		$('#showDisable').prop('checked', false);
	}
	if(data.data.orderVo.remark == null){
		$("#mainRemark").val("");
	}else{
		$("#mainRemark").val(data.data.orderVo.remark);
	}

	for (var i = 0, len = goodsList.length; i < len; i++) {
		if (goodsList[i].inputImeiVoList == null) {
			goodsList[i].inputImeiVoList = [];
		}
		$('#mainGrid').addRowData(i, goodsList[i], 'last');
		if (goodsList[i].ifManageImei == 0) {
			$('#mainGrid').setCell(i, 'count', goodsList[i].inputGoodsCount);
			$('#mainGrid').setCell(i, 'countResult', goodsList[i].inputGoodsCount - goodsList[i].goodsBook);
		}
		$('#mainGrid').setCell(i, "imeiVoList", JSON.stringify(goodsList[i].imeiVoList));
		if (goodsList[i].inputImeiVoList != undefined) {
			$('#mainGrid').setCell(i, "inputImeiVoList", JSON.stringify(goodsList[i].inputImeiVoList));
			var inputImeiList = $.map(goodsList[i].inputImeiVoList, function(item, index) {
				return item.imeiInput;
			})
			var text = inputImeiList.join('\n');
			$('#mainGrid').setCell(i, 'matchImei', text);
			var inputImeiStr = inputImeiList.join(',');
			$('#mainGrid').setCell(i, 'imeis', inputImeiStr);
			countCheck(i, inputImeiList);
			$('#countStatusModal').removeData('maingriddata')
		}
	}

	if($('#billsCode').val()== "" || $('#mainGrid').text() == ""){
		$('#createOrder').attr('disabled', true);
	}else{
		$('#createOrder').attr('disabled', false);
	}
}

/**
 * 商品类别的树加载
 */
function goodsTypeZtreeInit() {
	var setting = {
		data: {
			simpleData: {
				enable: true,
				idKey: "id",
				pIdKey: "pid",
				rootPId: null
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
		}
	};
	$.ajax({
		url: basePath + '/jxc/base/findGoodsclassTree',
		type: 'post',
		dataType: 'json',
		success: function(data) {
			var data = $.map(data, function(item, index) {
				delete item.nocheck;
				return item;
			})
			$.fn.zTree.init($('#goodsTypeZtree'), setting, data);
		}
	})
};
//商品类别保存
$('#saveGoodsType').click(function() {
	var treeObj = $.fn.zTree.getZTreeObj("goodsTypeZtree"),
		nodes = treeObj.getCheckedNodes(true);
	var str1 = '';
	var arr2 = [];
	var goodsObjList = nodes.filter_(function(item, index) {
		return item.isParent == false;
	})
	$.each(goodsObjList, function(index, item) {
		str1 += index == 0 ? item.name : (',' + item.name);
		arr2.push(item.id);
	});
	$('#goodsTypeInput').val(str1);
	$('#goodsTypeInput').data('idlist', arr2);
	$('#goodsType').modal('hide');
})


$('.pdbtn').click(function() {
	var obj = {
		id : $("#billsId").val()
	}
	window.parent.openWorkBoxByMenutext('盘点结果明细',basePath + '/inventory/stocktaking/detail?id='+obj.id );
})

function mainGridShow() {
	var obj = {};
	$('.mainGirdArg').each(function() {
		var tempFlag = $(this).attr('argflag');
		if (tempFlag == "billsId" || tempFlag == "remark" || tempFlag == "queryKey" ) {
			obj[tempFlag] = $(this).val()
		}else if (tempFlag == "sectionId" || tempFlag == "managersUid") {
            obj[tempFlag] = $(this).data('id')
        }
		else if (tempFlag == "categoryIds") {
			var idlist = $(this).data('idlist');
			if ($.isArray(idlist)) obj[tempFlag] = idlist.join(',');
		} else if (tempFlag == "storageIds") {
			if ($.isArray($(this).val())) obj[tempFlag] = $(this).val().join(',');
		} else {
			obj[tempFlag] = $(this).prop('checked') ? 1 : 0;
		}
	})
	obj.inputList = [];
	var tempData = [];
	if ($('#countStatusModal').data('maingriddata') == undefined) {
		var idList = $('#mainGrid').getDataIDs();
		if (idList.length == 0) {

		} else {
			tempData = $('#mainGrid').getMainGridData();
		}
	} else {
		tempData = $('#countStatusModal').data('maingriddata');
	}
	if (tempData.length != 0) {
		console.log(tempData);
		$.each(tempData, function(index, item) {
			var imeiObj = {};
			imeiObj.storageId = item.storageId;
			imeiObj.goodsId = item.goodsId;
			imeiObj.remark = item.remark;
			if (item.ifManageImei == 1) {
				imeiObj.imeis = "";
				if(item.countArr == ""){
					if(item.inputImeiVoList == "[]"){
						imeiObj.imeis = "";
					}else{
						var arr = JSON.parse(item.inputImeiVoList);
						for(var x = 0;x<arr.length;x++){
							imeiObj.imeis += arr[x].imei + "_" + arr[x].remark + ((x+1) == arr.length ? "" : ",");
						}
					}
				}else{
					var arr = JSON.parse(item.countArr);
					for(var x = 0;x<arr.arr.length;x++){
						imeiObj.imeis += arr.arr[x] + "_" + arr.arrInp[x] + ((x+1) == arr.arr.length ? "" : ",");
					}
				}
			} else {
				imeiObj.goodsCount = item.count;
			}
			obj.inputList.push(imeiObj);
		})
	}
	return JSON.stringify(obj);
}
//点击添加的时候验证
function checkStorageGoodsType() {
	var checkList = $('#goodsTypeInput,#mainStorage');
	for (var i = 0, len = checkList.length; i < len; i++) {
		if (!$(checkList[i]).val()) {
			return false;
		}
	}
	return true;
}

//导出
$('#derive').click(function(){
	var text = $("#mainGrid").text().trim();
	console.log(text);
	if(text == ""){
		$.zxsaas_plus.showalert('提示', '没有可导出数据');
	}else{
		var obj = {
			inventoryId: $("#billsId").val()
		}
		window.open(basePath+'/inventory/stocktaking/exportDetail?inventoryId='+obj.inventoryId);
	}
});

$('.closeAD').click(function(){
	$('.newAD').hide();
})

$(document).on('click', '.td_del', function() {
	$(this).parent().parent().remove();
	$(".td_index").each(function(i){
		$(this).text(i+1);
		$(this).siblings().find('.td_imei').attr("id","td_imei"+i)
		$(this).siblings().find('.td_input').attr("id","td_input"+i)
	});
});

$(document).on('click', '.td_add', function() {
	$(this).parent().parent().remove();
	var str = '<tr><td class="td_index">'
	+ '</td><td><i class="glyphicon glyphicon-trash td_del"></i>'
	+ '</td><td><input type="text" placeholder="扫描或录入串号" class="form-control td_imei" value="" >'
	+ '</td><td><input type="text" placeholder="可在此填写串号标识（非必填）" class="form-control td_input" /></td></tr>';
	$('#imeiTable tbody').append(str);
	var td = '<tr><td></td><td><i class="glyphicon glyphicon-plus td_add"></i></td><td></td><td></td></tr>';
	$('#imeiTable tbody').append(td);
	$(".td_index").each(function(i){
		$(this).text(i+1);
		$(this).siblings().find('.td_imei').attr("id","td_imei"+i)
		$(this).siblings().find('.td_input').attr("id","td_input"+i)
	});
});
var imeiFlag = true;
$(document).on('focus', '.td_imei', function(e) {
	var imeiIndex = $(this).parent().parent().find(".td_index").text()*1-1;
	if(imeiFlag == false){
		return
	}

	document.onkeydown = function (e){
		var imeiLength = $(".td_index").length;
        var theEvent = e || window.event;
        var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
        if(theEvent.target.id.slice(0,8)=="td_input"){
        	var arr=theEvent.target.id.split("");
        	var objNumber
        	var arr1=[]
        	          for(var i=0;i<arr.length;i++){
        	          if(i>7){
        	          arr1.push(arr[i])
        	          	}
        	          }
        	if(arr1.length>0){
        		objNumber=parseInt(arr1.join(""))
        	}
        	if(objNumber!=undefined){
        		if (code == 13) {
        		if(objNumber == imeiLength-1){
        		$(".td_add").click();
    			$(".td_imei")[objNumber+1].focus();
    			imeiIndex=objNumber+1;
    			imeiLength=$(".td_index").length;
    			imeiFlag = true;
    			return
        		}else if(objNumber < imeiLength-1){
        			imeiFlag = false;
        			$(".td_imei")[objNumber+1].focus();
        			imeiIndex=objNumber+1;
        			return
        		}
        		return
        	}
         }
        }else if(theEvent.target.id.slice(0,7)=="td_imei"){
        	var imeiarr=theEvent.target.id.split("");
        	var imeiObjNumber
        	var imeiarr1=[]
        	          for(var i=0;i<imeiarr.length;i++){
        	          if(i>6){
        	        	  imeiarr1.push(imeiarr[i])
        	          	}
        	          }
        	if(imeiarr1.length>0){
        		imeiObjNumber=parseInt(imeiarr1.join(""))
        	}
        	if(imeiObjNumber!=undefined){
        		if (code == 13) {
        		if(imeiObjNumber == imeiLength-1){
        		$(".td_add").click();
    			$(".td_imei")[imeiObjNumber+1].focus();
    			imeiIndex=imeiObjNumber+1;
    			imeiLength=$(".td_index").length;
    			imeiFlag = true;
    			return
        		}else if(imeiObjNumber < imeiLength-1){
        			imeiFlag = false;
        			$(".td_imei")[imeiObjNumber+1].focus();
        			imeiIndex=imeiObjNumber+1;
        			return
        		}
        		return
        	}
         }
        }
    }
});
function replaceText(obj){
	obj = obj.replace(/'/g, "");
	obj = obj.replace(/"/g, "");
	obj = obj.replace(/,/g, " ");
	obj = obj.replace(/;/g, " ");
	return obj;
}

//导入
$('.countStockSave').click(function(){
	if($(".td_index").length >0){
		$.zxsaas_plus.showconfirm("提示","导入将替换现有数据",function(){
			var text = $('#imeiTextarea').val();
			text = replaceText(text);
			var rid = $('#countStock').data('rid');
			var arrTemp = text.split(/\s+/);
			var arr = arrTemp.filter_(function(item, index) {
				return item != '';
			});
			// 过滤辅助串号和串号重复
			arr = unique(arr);
			var str = "";
			for(var x =0;x<arr.length;x++){
				str+= '<tr><td class="td_index">' + (x + 1)
				+ '</td><td><i class="glyphicon glyphicon-trash td_del"></i>'
				+ '</td><td><input type="text" placeholder="扫描或录入串号" class="form-control td_imei" value='+ arr[x] + '>'
				+ '</td><td><input type="text" placeholder="可在此填写串号标识（非必填）" class="form-control td_input" /></td></tr>';
			}

			$('#imeiTable tbody').html(str);
			var td = '<tr><td></td><td><i class="glyphicon glyphicon-plus td_add"></i></td><td></td><td></td></tr>';
			$('#imeiTable tbody').append(td);
			$('#imeiTextarea').val("");
			$(".td_index").each(function(i){
				$(this).siblings().find('.td_imei').attr("id","td_imei"+i)
				$(this).siblings().find('.td_input').attr("id","td_input"+i)
			});
		},function(){

		});
	}else{
		var text = $('#imeiTextarea').val();
		text = replaceText(text);
		var rid = $('#countStock').data('rid');
		var arrTemp = text.split(/\s+/);
		var arr = arrTemp.filter_(function(item, index) {
			return item != '';
		});
		// 过滤辅助串号和串号重复
		arr = unique(arr);
		var str = "";
		for(var x =0;x<arr.length;x++){
			str+= '<tr><td class="td_index">' + (x + 1)
			+ '</td><td><i class="glyphicon glyphicon-trash td_del"></i>'
			+ '</td><td><input type="text" placeholder="扫描或录入串号" class="form-control td_imei" value='+ arr[x] + '>'
			+ '</td><td><input type="text" placeholder="可在此填写串号标识（非必填）" class="form-control td_input" /></td></tr>';
		}
		$('#imeiTable tbody').html(str);
		var td = '<tr><td></td><td><i class="glyphicon glyphicon-plus td_add"></i></td><td></td><td></td></tr>';
		$('#imeiTable tbody').append(td);
		$('#imeiTextarea').val("");
		$(".td_index").each(function(i){
			$(this).siblings().find('.td_imei').attr("id","td_imei"+i)
			$(this).siblings().find('.td_input').attr("id","td_input"+i)
		});

	}
})


//串号匹配
$('#countImeiSure').click(function() {
	countArr = {};
	var arrTemp = [];

	var ids = $('#mainGrid').getDataIDs();
	$('.td_imei').each(function() {
		var val = $(this).val().trim();
		arrTemp.push(val.toUpperCase())
	});
	var rid = $('#countStock').data('rid');
	var arr = arrTemp.filter_(function(item, index) {
		return item != '';
	});
	var arrInp = [];
	$('.td_input').each(function() {
		arrInp.push($(this).val())
	});
	countArr.arrInp = arrInp;
	// 过滤辅助串号和串号重复
	arr = getFilterArr(arr);
	countArr.arr = arr;

//	效验录入串号是否为此表单唯一
	var vFlag = false;
	$('.td_imei').each(function() {
		var val = $(this).val().trim();
		for(var x=0;x<ids.length;x++){
			var row = $('#mainGrid').getRowData(ids[x]);
			if(row.countArr !== ""){
				var rowArr = JSON.parse(row.countArr);
				for(var k =0;k<rowArr.arr.length;k++){
					if(val == rowArr.arr[k] && rid != ids[x]){
						var text = "串号【"+ val +"】已在【"+ row.storageName+"】【"+row.goodsName+"】中存在";
						vFlag = true;
						$.zxsaas_plus.showalert('提示', text);
						return;
					}
				}
			}
		}
	});
	if(vFlag == true){
		return;
	}

	$('#mainGrid').setCell(rid, 'countArr',JSON.stringify(countArr));
	$('#mainGrid').setCell(rid, 'matchImei', arr.join('\n'));
	var inputImeiStr = arr.join(',');
	$('#mainGrid').setCell(rid, 'imeis', inputImeiStr);
//	//赋值盘点结果
	countCheck(rid, arr);
	$('#countStock').modal('hide');
});
//接受盘点库存串号text,去除系统辅助串号与串号重复
function getFilterArr(arr) {
	// 去重
	arr = unique(arr);
	var obj = {};
	$('#countStockDetails tr').each(function() {
		var $this = $(this);
		var td_imei = $this.find('.td_imeis').text();
		var td_auxiliaryImei = $this.find('.td_auxiliaryImeis').text();
		if ($.trim(td_auxiliaryImei) != '' && td_auxiliaryImei){
			obj[td_imei] = td_auxiliaryImei;
		}
	});

	$.each(arr, function(i, v) {
		if (obj.hasOwnProperty(arr[i]) && arr.indexOf(obj[arr[i]]) > -1) {
			arr.splice(i, 1);
			countArr.arrInp.splice(i, 1);
		}
	});
	return arr;
}
// 数组去重
function unique(arr) {
	var hash = {},
		result = [];

	for (var i = 0; i < arr.length; i++) {
		if (!hash[arr[i]]) {
			hash[arr[i]] = true;
			result.push(arr[i]);
		}
	}
	return result;
}

function countCheck(rid, arr) {
	var objArr = JSON.parse($('#mainGrid').getRowData(rid).imeiVoList);
	var myLength = arr.length;
	if (objArr == null) {
		return;
	}

	for (var i = 0, len = objArr.length; i < len; i++) {
		for (var k in objArr[i]) {
			if (k != 'status') {
				var arrIndex = arr.indexOf(objArr[i][k]);
				if (arrIndex != -1) {
					objArr[i]['status'] = 0;
					objArr[i]['flag'] = "√"
					arr.splice(arrIndex, 1);
					if(countArr.arrInp !== undefined){
						var inp = arrIndex;
						objArr[i]['remark'] = countArr.arrInp[inp];
						countArr.arrInp.splice(arrIndex, 1);
					}
					break;
				} else {
					objArr[i]['status'] = -1;
					objArr[i]['flag'] = "-"
				}
			}
		}
	}
	if (arr.length != 0) {
		$.each(arr, function(index, item) {
			var obj = {};
			obj.imei = item;
			obj.auxiliaryImei = '';
			obj.status = 1;
			obj.flag = "+";
			obj.remark = (countArr.arrInp == undefined)?"":countArr.arrInp[index];
			objArr.push(obj);
		})
	}
	var matchTimes = 0;
	var moreTimes = 0;
	var lessTimes = 0;
	$.each(objArr, function(index, item) {
		for (var k in item) {
			if (k == 'status') {
				if (item[k] == 0) {
					matchTimes += 1
				} else if (item[k] == 1) {
					moreTimes += 1;
				} else {
					lessTimes += 1;
				}
			}
		}
	})
	var str = '匹配串号:' + matchTimes + '\n' + '盘盈串号:' + moreTimes + '\n' + '盘亏串号:' + lessTimes;
	$('#mainGrid').setCell(rid, 'countResult', str);
	if (matchTimes != 0 && lessTimes == 0 && moreTimes == 0) {
		$('#mainGrid').setCell(rid, 'countStatus', 1); //匹配为1
	}
	if (moreTimes != 0 && lessTimes == 0) {
		$('#mainGrid').setCell(rid, 'countStatus', 2); //盘盈为2
	}
	if (moreTimes == 0 && lessTimes != 0) {
		$('#mainGrid').setCell(rid, 'countStatus', 3); //盘亏为3
	}
	if (moreTimes != 0 && lessTimes != 0) {
		$('#mainGrid').setCell(rid, 'countStatus', 4); //盘盈盘亏为4
	}
	$('#mainGrid').setCell(rid, 'countString', JSON.stringify(objArr));
	$('#mainGrid').setCell(rid, 'count', myLength);
	if ($('#countStatusModal').data('maingriddata') != undefined) {
		var mainGridBeforeData = $('#countStatusModal').data('maingriddata');
		var targetData = $('#mainGrid').getRowData(rid);
		for (var j = 0, dataLen = mainGridBeforeData.length; j < dataLen; j++) {
			if (targetData.goodsId == mainGridBeforeData[j].goodsId) {
				//商品id
				if (targetData.imeis != mainGridBeforeData[j].imeis) {
					mainGridBeforeData.splice(j, 1, targetData);
					break;
				}
			}
		}
		$('#countStatusModal').data('maingriddata', mainGridBeforeData);
	}
}

//状态改变后的操作
$('#countStatusSure').click(function() {
	$.each($("#statusChoose li"), function(index, item) {
		if ($(this).hasClass('changeBackground')) {
			$('#countStatusModal').data('flag') == 'main' && mainGridFilter($(this));
			$('#countStatusModal').data('flag') == 'modal' && modalTableFilter($(this));
		}
	})
	$('#countStatusModal').modal('hide');
})

function modalTableFilter($this) {
	$('#countDetails>thead>tr>th:eq(2)').html($this.html());
	var rid = $('#countStatusModal').data('rid');
	var flag = $this.data('mainflag');
	var mainData = JSON.parse($('#mainGrid').getRowData(rid).countString);
	var matchList = [];
	var moreList = [];
	var lessList = [];
	$.each(mainData, function(index, item) {
		if (item.status == -1) {
			lessList.push(item);
		}
		if (item.status == 0) {
			matchList.push(item);
		}
		if (item.status == 1) {
			moreList.push(item);
		}
	})
	var tempList = [];
	if (flag == 0) {
		tempList = mainData;
	}
	if (flag == 1) {
		tempList = lessList.concat(moreList);
	}
	if (flag == 2) {
		tempList = moreList;
	}
	if (flag == 3) {
		tempList = lessList;
	}
	var countDetailsStr = $.map(tempList, function(item, index) {
		return "<tr><td>" + (index + 1) + "</td><td>" + item.flag + "</td><td>" + item.imei + "</td><td>" + item.imei + "</td></tr>";
	})
	$('#countDetails tbody').html(countDetailsStr);
}

function mainGridFilter($this) {
	$('#jqgh_mainGrid_countResult').html($this.html());
	var filterFlag = $this.data('mainflag');
	$('#mainGrid').clearGridData();
	var mainData = $('#countStatusModal').data('maingriddata');
	var moreList = [];
	var lessList = [];
	var matchList = [];
	var allList = [];
	$.each(mainData, function(index, item) {
		var countStatus = item.countStatus;
		if (countStatus == 3 || countStatus == '') {
			lessList.push(item)
		}
		if (countStatus == 1) {
			matchList.push(item)
		}
		if (countStatus == 2) {
			moreList.push(item)
		}
		if (countStatus == 4) {
			allList.push(item)
		}
	});
	//全部
	var tempList = [];
	if (filterFlag == 0) {
		tempList = mainData;
	}
	if (filterFlag == 1) {
		tempList = allList;
	}
	if (filterFlag == 2) {
		tempList = moreList;
	}
	if (filterFlag == 3) {
		tempList = lessList;
	}
	$.each(tempList, function(index, item) {
		$('#mainGrid').addRowData(index, item);
	})
}
//盘点详情表头点击后的事件
$('#countDetails>thead>tr>th:eq(2)').click(function() {
	$('#countStatusModal').data('flag', 'modal');
	$('#countStatusModal').data('rid', $('#countMessage').data('rid'));
	$('#countStatusModal').modal('show');
});
//刷新系统库存
$('#refresCount').click(function() {
	$.zxsaas_plus.showconfirm('提示', '你确定刷新盘点商品的系统库存吗？', function() {
		addRefFuns('/inventory/stocktaking/refreshSysStock');
	})
})

//保存操作
$('#mainSave').on('click', function(event) {
	$("#mainGrid").jqGrid("saveCell", lastrow, lastcell);
	event.preventDefault();
	if ($('#mainGrid').getDataIDs().length == 0) {
		$.zxsaas_plus.showalert('提示', '无数据无法保存！！！');
		return false;
	}
	$.zxsaas_plus.showconfirm('提示', '你确定保存单据吗？？', function() {
		addRefFun('/inventory/saveOrder', function() {
			$.ajax({
				url: basePath + '/inventory/queryInventoryOrder',
				type: 'get',
				dataType: 'json',
				data: {
					billsId: $('#billsId').val()
				},
				success: function(data) {
					// 刷新页面
					refreshView(data);
				}
			})
			$.zxsaas_plus.showalert('success', '保存成功');
		});
	})
	return false;
});
//删除操作
$('#delete').on('click', function(event) {
	event.preventDefault();
	$.zxsaas_plus.showconfirm('提示', '你确定删除单据吗？', function() {
		var billsId = $('#billsId').val();
		$.ajax({
			url: basePath + '/inventory/deleteDraftOrder',
			type: 'get',
			dataType: 'json',
			data: {
				billsId: billsId
			},
			success: function(data) {
				if (data.result != 1) {
					$.zxsaas_plus.showalert('提示', data.desc);
				} else {
					setTimeout(function() {
						$.zxsaas_plus.showconfirmsure('', '删除成功!', function() {
							window.location.href = basePath + '/inventory/inventoryMain';
						});
					}, 600);
				}
			}
		})
	})
	return false;
});

$('.searchOrder').click(function() {
	var flag = $(this).data('flag');
	var postData = {};
	if ((flag == "P" || flag == "N") && $('#billsId').val() == '') {
		$.zxsaas_plus.showalert('提示', '请生成单据后才查看上一单下一单！！！');
		return;
	}
	if ((flag == "P" || flag == "N") && $('#billsId').val() != '') {
		postData = {
			queryCodeStr: flag,
			refBillsId: $('#billsId').val()
		}
	}
	if (flag == "L" || flag == "F") {
		postData = {
			queryCodeStr: flag
		}
	}
	$.ajax({
		url: basePath + '/inventory/queryInventoryOrder',
		type: 'get',
		dataType: 'json',
		data: postData,
		success: function(data) {
			// 刷新页面
			refreshView(data);
		}
	})
});
// 根据data刷新页面
function refreshView(data) {
	var orderVo = data.data.orderVo;
	if (orderVo == undefined) {
		$.zxsaas_plus.showalert('提示', data.desc);
		return;
	}

	$('#sectionName').val(orderVo.sectionName).data('id',orderVo.sectionId)
	$('#Employee').val(orderVo.managersName).data('id',orderVo.managersUid)

	if ($('#refresCount').css('display') == 'none') {
		$('.mainTabs:eq(0)').show();
		$('.mainTabs:eq(1)').hide();
		mainGridInit();
	}
	getGoodsListUpdate(data);
	$('#statusWrap').show();
	if (orderVo.isFinish) {
		$('#statusComplete').show();
		$('#statusNoComplete').hide();
		$('#mainSave').attr('disabled', true);
		$('#delete').attr('disabled', true);
		$('#refresCount').attr('disabled', true);
	} else {
		$('#statusComplete').hide();
		$('#statusNoComplete').show();
		$('#mainSave').attr('disabled', false);
		$('#delete').attr('disabled', false);
		$('#refresCount').attr('disabled', false);
	}
	$('#refresCount').show();
	$('#showDisable').attr('disabled', true);
	$('#add').attr('disabled', true);
	$('#sectionName').attr('disabled', true);
	$('#mainStorage').attr('disabled', true);
	$('#goodsTypeInput').attr('disabled', true);
	$('span[data-target="#goodsType"]').hide();
	$('.queryKey').attr('disabled', true);
}

//过滤收集数据
$('#filterSureBtn').click(function() {
	var obj = {};
	$('.filterQuery').each(function(index, item) {
		var searchName = $(item).attr('filterkey');
		var value = $(item).val() || '';
		if (searchName == 'storageIds' && value != '') {
			obj[searchName] = value.join(',');
		}else {
			if (searchName == 'sectionId'|| searchName == 'managersUid'|| searchName == 'createBy'){
				if(value == "0"){
					obj[searchName] = "";
				}else{
					obj[searchName] = value;
				}
			}else{
				obj[searchName] = value;
			}
		};
	})
	$.ajax({
		url: basePath + '/inventory/queryInventoryOrder',
		type: 'get',
		dataType: 'json',
		data: obj,
		success: function(data) {
			if (data.result == 1) {
				refreshView(data);
			} else {
				$.zxsaas_plus.showalert('提示', data.desc);
			}
		}
	})
});
//盘点盲扫
$('#searchImei').keyup(function(e) {
	if (e.keyCode == 13) {
		var obj = {
			billsId: $('#billsId').val(),
			inputImei: $(this).val()
		};
		$.ajax({
			url: basePath + '/inventory/blindSearch',
			type: 'get',
			data: obj,
			dataType: 'json',
			success: function(data) {
				var goodVo = data.data.goodVo;
				if (goodVo == null) {
					$.zxsaas_plus.showalert('提示', '未找到该串号');
					return;
				}
				var goodsIdList = $('#mainGrid').getCol('goodsId');
				var idIndex = goodsIdList.indexOf(goodVo.goodsId.toString());
				if (idIndex == -1) {
					$.zxsaas_plus.showalert('提示', '该商品还未盘点');
				} else {
					var goodsData = $('#mainGrid').getRowData(idIndex);
					goodsData.matchImei += '\n' + $('#searchImei').val();
					$('#mainGrid').setCell(idIndex, 'matchImei', goodsData.matchImei);

					var arrTemp = goodsData.matchImei.split(/\s+/);
					var arr = arrTemp.filter_(function(item, index) {
						return item != '';
					})
					var inputImeiStr = arr.join(',');
					var lastVal = arr.join('\n');
					$('#mainGrid').setCell(idIndex, 'matchImei', lastVal);
					$('#mainGrid').setCell(idIndex, 'imeis', inputImeiStr);
					//赋值盘点结果
					countCheck(idIndex, arr)

				}

			}
		})
	}
});

$('#createOrder').click(function() {
	var dataArr = $('#mainGrid').getMainGridData();
	var moreTotal = 0;
	var lessTotal = 0;
	$.each(dataArr, function(index, item) {
		if (item.ifManageImei == 1) {
			var tempArr = item.countResult.split(/\n/);
			moreTotal += (tempArr[1].split(':')[1] * 1);
			lessTotal += (tempArr[2].split(':')[1] * 1);
		}
		if (item.ifManageImei == 0) {
			var numTotal = item.countResult * 1;
			if (numTotal > 0) {
				moreTotal += numTotal;
			}
			if (numTotal < 0) {
				lessTotal += (numTotal * -1);
			}
		}
	})
	if (moreTotal == 0 && lessTotal == 0) {
		$.zxsaas_plus.showconfirm("生成报损报溢","此单据已完全匹配，点击确定将结束此次盘点",function(){
			var billsId = $('#billsId').val();
			$.ajax({
				url: basePath + '/inventory/stocktaking/finish',
				type: 'get',
				data: {
					billsMainId: billsId
				},
				dataType: 'json',
				success: function(data) {
					$('#statusComplete').show();
					$('#statusNoComplete').hide();
				}
			})
		},function(){

		});
	}else{
		$('#reportModal').modal('show');
	}
});

$('#sureTotal').click(function() {
	$('#reportModal').modal('hide');
	$('#totalModal').modal('show');
	var billsId = $('#billsId').val();
	$.ajax({
		url: basePath + '/inventory/stocktaking/finish',
		type: 'get',
		data: {
			billsMainId: billsId
		},
		dataType: 'json',
		success: function(data) {
			$('#statusComplete').show();
			$('#statusNoComplete').hide();
		}
	})
	var dataArr = $('#mainGrid').getMainGridData();
	var moreTotal = 0;
	var lessTotal = 0;
	$.each(dataArr, function(index, item) {
		if (item.ifManageImei == 1) {
			var tempArr = item.countResult.split(/\n/);
			moreTotal += (tempArr[1].split(':')[1] * 1);
			lessTotal += (tempArr[2].split(':')[1] * 1);
		}
		if (item.ifManageImei == 0) {
			var numTotal = item.countResult * 1;
			if (numTotal > 0) {
				moreTotal += numTotal;
			}
			if (numTotal < 0) {
				lessTotal += (numTotal * -1);
			}
		}

	})
	if (moreTotal > 0 && lessTotal == 0) {
		$('#moreOrder').attr('disabled', false);
		$('#lessOrder').attr('disabled', true);
	}
	if (moreTotal == 0 && lessTotal > 0) {
		$('#moreOrder').attr('disabled', true);
		$('#lessOrder').attr('disabled', false);
	}
	if (moreTotal > 0 && lessTotal > 0) {
		$('#moreOrder').attr('disable', true);
		$('#lessOrder').attr('disable', true);
	}
	if (moreTotal == 0 && lessTotal == 0) {
		$('#moreOrder').attr('disabled', false);
		$('#lessOrder').attr('disabled', false);
	}
});
//删除操作
$(document).on('click', '.delGoodsData', function() {
	var ids = $('#mainGrid').getDataIDs();
	if(ids.length <=1){
		$.zxsaas_plus.showconfirm('提示', '删除此条数据将删除此盘点单，确定删除？', function() {
			var billsId = $('#billsId').val();
			$.ajax({
				url: basePath + '/inventory/deleteDraftOrder',
				type: 'get',
				dataType: 'json',
				data: {
					billsId: billsId
				},
				success: function(data) {
					if (data.result != 1) {
						$.zxsaas_plus.showalert('提示', data.desc);
					} else {
						setTimeout(function() {
							$.zxsaas_plus.showconfirmsure('', '删除成功!', function() {
								window.location.href = basePath + '/inventory/inventoryMain';
							});
						}, 600);
					}
				}
			})
		})
	}else{
		var rid = $(this).data('rid');
		var row = $('#mainGrid').getRowData(rid)
		var goodId = row.goodsId;
		if ($('#statusWrap').css('display') == 'none' || ($('#statusWrap').css('display') == 'block' && $('#statusNoComplete').css('display') == 'inline')) {
			$.zxsaas_plus.showconfirm('提示', '你确定删除此行吗？？？', function() {
				$.ajax({
					url: basePath + '/inventory/deleteDetail',
					type: 'get',
					dataType: 'json',
					data: {
						billsId: $('#billsId').val(),
						storageId: row.storageId,
						goodsId: row.goodsId
					},
					success: function(data) {
						if (data.result == 1) {
							$('#mainGrid').delRowData(rid);
							var modalData = $('#countStatusModal').data('maingriddata');
							if (modalData != undefined) {
								var goodsIdList = $.map(modalData, function(item, index) {
									return item.goodsId;
								})
								var index = goodsIdList.indexOf(goodId);
								modalData.splice(index, 1);
								$('#countStatusModal').data('maingriddata', modalData);
							}
							if($('#billsCode').val()== "" || $('#mainGrid').text() == ""){
								$('#createOrder').attr('disabled', true);
							}else{
								$('#createOrder').attr('disabled', false);
							}
						} else {
							$.zxsaas_plus.showalert('提示', data.desc);
						}
					}
				})
			})
		}
		if ($('#statusWrap').css('display') == 'block' && $('#statusComplete').css('display') == 'inline') {
			$.zxsaas_plus.showalert('提示', '已完成单据无法删除！！！')
		}
	}
});
//报损
$('#moreOrder,#lessOrder').click(function() {
	var postData = mainGridShow();
	var reqPath = '';
	if ($(this).attr('id') == 'moreOrder') {
		reqPath = basePath + '/inventory/createOverflowOrder';
	} else {
		reqPath = basePath + '/inventory/createBreakageOrder'
	}
	$.ajax({
		url: reqPath,
		type: 'post',
		dataType: 'json',
		data: {
			jsonData: postData
		},
		success: function(data) {
			if (data.result == 1) {
				$.zxsaas_plus.showalert('提示', '报损报溢生成成功');
				$.ajax({
					url: basePath + '/inventory/queryInventoryOrder',
					type: 'post',
					dataType: 'json',
					data: {
						billsId: $('#billsId').val()
					},
					success: function(data) {
						// 刷新页面
						refreshView(data);
					}
				})
			} else {
				$.zxsaas_plus.showalert('提示', data.desc);
			}
		}
	})
});
//新增
$('#topAdd').click(function() {
	location.reload();
});
//数组过滤重写
Array.prototype.filter_ = function(callback) {
	var temp = [];
	for (var i = 0, len = this.length; i < len; i++) {
		callback(this[i], i, this) && temp.push(this[i]);
	}
	return temp;
}