//弹出树点击事件
var ifManageIMei="",imeiLength,ifEnableAuxliaryImei,auxliaryImeiLength;//是否串号管理

//商品模态框
var gridId = "",grid ="",rowidRig ="",inptid ="",chooseGoods=false;

function showGoodsModal(cellInfo){
	if(cellInfo==0){
		chooseGoods=true
		ifManageIMei=1;
	}else{
		chooseGoods=false
		ifManageIMei=1;
		if(cellInfo!=1){
			gridId = cellInfo.gridId;
			grid = $("#"+gridId);
			rowidRig = cellInfo.rowId;
			inptid = cellInfo.cellInputId;
		}
		
		
	}
	reloadGoodsGrid();
	$('#goodsModal').modal('show');
}

//商品树
var selectTreeClassId="";//商品类别id
function initGoodsTree(){
	var setting = {
			data: {simpleData: {enable: true,idKey: "id",pIdKey: "pid",rootPId: null}
			},
			callback: {
				onClick: function(event, treeId, treeNode, msg) {
					//通过id调用对应方法 重构表格
				    selectTreeClassId=Number(treeNode.id);
				    
				    reloadGoodsGrid();
				}
			},
			view: {showIcon: false}
		};
		$.ajax({
			type: 'Get',
			url: "/manager/report/stock/selectStockTree",
			dataType: "json",
			success: function(data) {
				$.fn.zTree.init($("#goodsTreeData"), setting,data.data.stockTree);
				var str = $('#goodsTreeData_1_switch').attr('class');
				var zTree = $.fn.zTree.getZTreeObj("goodsTreeData");
			    zTree.expandAll(true);//展开全部节点
				var Class = str.replace('roots', 'center');
				$('#goodsTreeData_1_switch').attr('class', Class);
			}
		});
}

//商品表格
function initGoodsGrid(){
	var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl:"/manager/inventory/common/getGoodsVoPageList",
		TableName: "#goodsModalGrid", //显示表格名称。遵照css选择器书写
		iconJsonUrl: "../json/icon.json",
		btnbox: ".btnbox ", //功能按钮存放容器。遵照css选择器书写	
		pager: "#gridpager_goods"
	};
	$.jgrid.defaults.width = 1280;
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';
//	'网络制式',
	var colNames = ['id','商品编码', '商品名称', '商品类别', '商品品牌','商品型号','商品颜色','是否管理串号','是否启用辅助串号','串号长度','辅助串号长度','税率','goodsId'];
	var JqGridColModel = [
                        {name:'id',index:'id', width:1,align:'center',sorttype:"string",hidden:true},
						{name:'code',index:'code', width:80,align:'center',sorttype:"string",sortable: false},
						{name:'name',index:'name', width:150,align:'center', sorttype:'string',sortable: false},
						{name:'categoryName',index:'goodsCategoryName', width:100,align:'center', sorttype:'string',sortable: false},
						{name:'brandName',index:'goodsBrandName', width:100,align:'center', sorttype:'string',sortable: false},
						{name:'models',index:'goodsModel', width:100,align:'center', sorttype:'string',sortable: false},
						{name:'color',index:'goodsColorName', width:80,align:'center', sorttype:'string',sortable: false},
//						{name:'networkStandard',index:'networkStandard', width:80,align:'center', sorttype:'string',sortable: false},
						{name:'ifManageImei',index:'ifManageIMei', width:100,align:'center', sorttype:'string',sortable: false,hidden:true},
						{name:'ifEnableAuxliaryImei',index:'ifEnableAuxliaryImei', width:1,align:'center', sorttype:'string',sortable: false,hidden:true},
						{name:'imeiLength',index:'imeiLength', width:1,hidden:true},
						{name:'auxliaryImeiLength',index:'auxliaryImeiLength', width:1,hidden:true},
						{name:'taxRate',index:'taxRate', width:10,hidden:true},
						{name:'goodsId',index:'goodsId', width:10,hidden:true}
						
	                ];
	loadtable();
	function loadtable() {
		$(options.TableName).jqGrid({
			url: options.LoadTableUrl,
			mtype: "GET",
			datatype: "json",
			data:{containsDisable:1},//包含禁用商品
			jsonReader  : {	
				root:"data.goodsVoList",
		        total: "data.total",
		        records: "data.records",
				repeatitems: false
					},
			colNames: colNames,
			colModel: JqGridColModel,
			sortable: false,
			rownumbers:true,	//显示行号
			rowNum: 10,
			rowList: [20, 25, 40],
			pager: options.pager,
			viewrecords: true,
			width: $(window).width() * 0.5,
			height: $(window).height() * 0.4,
			autowidth: true,
			rownumWidth:30,
			shrinkToFit: false,
			ondblClickRow:function(rowid,iRow,iCol,e){
						if(chooseGoods){
							
							var currRow = $(options.TableName).jqGrid('getRowData', rowid);	
							console.log(currRow)
							$('.goodsName').val(currRow.name);
							$('.nameModle').val(currRow.goodsId);
							$('.categoryId').val(currRow.categoryName);
							$('.brandId').val(currRow.brandName);
							$('.color').val(currRow.color);
//							$('.imei').val('');
//							$('.AuxliaryImei').val('');
							$('.salesNo').val('');
							if(currRow.ifManageImei){
								$('.imei').attr('disabled',false);
								ifManageIMei=1;
								imeiLength=currRow.imeiLength;
								if(currRow.ifEnableAuxliaryImei){
									ifEnableAuxliaryImei=1;
									auxliaryImeiLength=currRow.auxliaryImeiLength
									$('.AuxliaryImei').attr('disabled',false);
								}else{
									ifEnableAuxliaryImei=0
//									$('.AuxliaryImei').attr('disabled',true);
								}
							}else{
								$('.imei').attr('disabled',true);
								$('.AuxliaryImei').attr('disabled',true);
								ifManageIMei=0;
								ifEnableAuxliaryImei=0
							}
							enableChooseRelyImei(false);
						}else{
							var currRow = $(options.TableName).jqGrid('getRowData', rowid);	
							if(ifManageIMei=="1" && registerModel==0){
								$(".threeTier input[name='goodsCode']").val(currRow.code);
								$(".threeTier input[name='spareGoodsId']").val(currRow.goodsId);
								$(".threeTier input[name='goodsName']").val(currRow.name);
								$(".threeTier input[name='goodsBrandName']").val(currRow.brandName);
								$(".threeTier input[name='goodsColorName']").val(currRow.color);
							}else{
								$("#"+gridId+" #"+inptid).val(currRow.name);
								$("#"+gridId).jqGrid('setCell', rowidRig ,"goodsId" ,currRow.goodsId);
								$("#"+gridId).jqGrid('setCell', rowidRig ,"goodsCode" ,currRow.code);
								$("#"+gridId).jqGrid('setCell', rowidRig ,"goodsClassName" ,currRow.categoryName);
								$("#"+gridId).jqGrid('setCell', rowidRig ,"goodsModel" ,currRow.models);
								$("#"+gridId).jqGrid('setCell', rowidRig ,"goodsBrandName" ,currRow.brandName);
								$("#"+gridId).jqGrid('setCell', rowidRig ,"goodsColorName" ,currRow.color);
								
							}
							reloadImeiGrid($('#storageId').val(),currRow.id);
							$(".threeTier input[name='spareImeiStr']").val('');
							$(".threeTier input[name='depositTotal']").val('0.00');
							refreshValidatorField("goodsName",'#beiYF');
							refreshValidatorField("spareImeiStr",'#beiYF');
						}
				$('#goodsModal').modal('hide');
			}
		})
	}
}

//编码、名称模糊搜索 goodsNameKeyWord
$(document).delegate("#goodsNameKeyWord", "input propertychange", function(e){
	reloadGoodsGrid();
});

//重新加载商品表格数据
function reloadGoodsGrid(){
    $("#goodsModalGrid").jqGrid('setGridParam',{  
        datatype:'json',  
        postData:getQueryGoodsModel(),
        page:1  
    }).trigger("reloadGrid"); //重新载入  
}

//获取商品分页查询参数
function getQueryGoodsModel(){
    var model = {};
    model.queryKey = $("#goodsNameKeyWord").val();
    model.goodsCategoryIds = selectTreeClassId ;
    model.containsDisable=1;//包含禁用商品
	return model;
}

//商品品牌下拉
function getGoodsBrandSelect(){
	$.request({  
	 	url: '/manager/afterSalesCommon/getBrands',
	 	success: function(data) {appendSelect('.brandId',data);}
	 });
}

//所属分类下拉
function getCategorySelect(){
	$.request({  
	 	url: '/manager/afterSalesCommon/getCategory',
	 	success: function(data) {appendSelect('.categoryId',data);}
	});
}

//商品颜色下拉
function getGoodsColorSelect(){
	$.request({  
	 	url: '/manager/afterSalesCommon/getColor',
	 	success: function(data) {appendSelect('.color',data);} 
	});
}

//拼接下拉
function appendSelect(selectClassId,data){
	var list=data.data.list;
    $(selectClassId).html("");
    if(list!=null && list.length>0){
    	$.each(list,function(i,value){
    		$(selectClassId).append("<option value='"+value.id+"' selected>"+value.name+"</option>");
		});
    }
}