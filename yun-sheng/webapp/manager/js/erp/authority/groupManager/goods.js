
//数据访问对象
var goodsClassDao = new GoodsClass(basePath);
var goodsBrandDao = new GoodsBrand(basePath);
var goodsColorDao = new GoodsColor(basePath);
var goodsNameDao = new GoodsName(basePath);
var alignArr = ['', 'left', 'center', 'right'];
var goodsClassKong = {
		code:"" ,
		groupId:gl_groupId ,
		id:"" ,
		ifChooseColor:true ,
		ifManageImei:true ,
		name:"" ,
		parentId:"" ,
		remark:""
}

var goodsNameKong = {
		auxliaryImeiLength:"" ,
		carrieroperator:"中国移动" ,
		code:"" ,
		goodsCategoryId:'',
		goodsBrandId:"" ,
		goodsColorId:"" ,
		goodsModelId:"" ,
		goodsModel:"",
		configure:'',
		id:"" ,
		ifEnableAuxliaryImei:false ,
		ifManageImei:false ,
		imeiLength:"" ,
		name:"" ,
		networkStandard:"GSM" ,
		barCode:"" ,
		taxRate:"" ,
		valuationMethods:"2",
		storageMode:"1"
}
var lastrow ,lastcell;
//初始化
$(function(){
	initTree();//初始化树
	initGrid();//初始化表格
	initGoodsBrandGrid();//初始化品牌表格
	initGoodsColorGrid();//初始化颜色表格
	initEvents();//初始化事件
	initGoodsColorSelect();
	initGoodsBrandSelect();
	initNetworkStandard();
	initCarrieroperator();
    treeFun();
	$('#goodsNameField').blur(function(e){
		$(this).val($.trim($(this).val()))
	})

	$('#priceGoods input').bind('input propertychange',function(){
		checkInput.checkNum(this,12)

	})

	$('.goodsColorgl').click(function(){
		$('#goodsColorModalDialog').modal('show')
		setTimeout(function () {
			$('#goodsColorDataGrid').resize()
		},500)
	})
	$('.goodsBrandgl').click(function(){
		$('#goodsBrandModalDialog').modal('show')
		setTimeout(function () {
			$('#goodsBrandDataGrid').resize()
		},500)
	})


	//列设置表格
	$("#lineSetGrid").jqGrid({
		mtype: "POST",
		datatype: "json",
		viewrecords: true,
		rowNum: 400,
		width: "100%",
		multiselect:false,
		height: $(window).height() * 0.55,
		colNames: ['id', '报表列字段', '是否显示', 'code'],
		colModel: [
			{name: "id", width: '150px', align: "center", sortable: false, hidden: true},
			{name: "name", width: '150px', align: "center", sortable: false},
			{
				name: "isShow",
				width: '150px',
				align: "center",
				sortable: false,
				formatter: "checkbox",
				formatoptions: {disabled: false},
				edittype: 'checkbox',
				editoptions: {value: '1:0'}
			},
			{name: "code", width: '150px', align: "center", sortable: false, hidden: true},
		],
		jsonReader: {
			repeatitems: false,
			root: 'data.columnVoList',
		},
		gridComplete: function () {
			$('table th').css('text-align', 'center')

			$('#lineSetGrid').resize()
		},
	});

    var startGapX, endGapX
    //拖动事件回调
    $('.menuTools').mouseup(function (event) {
        endGapX = event.clientX - $(this).offset().left
        if (startGapX - endGapX != 0) {
            setTimeout(function () {
                var colModel = $("#dataGrid").jqGrid('getGridParam', 'colModel')
                var colIds = []
                for (var i = 1; i < colModel.length; i++) {
                    colIds.push({'id': colModel[i].id})
                }
                $.ajax({
                    url:'/manager/erp/projectAndColumn/updateColumns',
                    dataType: 'json',
                    type: 'post',
                    data: {
                        flag : true,
                        valList: JSON.stringify(colIds)
                    },
                    success: function (data) {

                    }
                })

            }, 1000)
        }

    });
    $('.menuTools').mousedown(function (event) {
        startGapX = event.clientX - $(this).offset().left
    })

//列设置
	$('.lineSet').click(function () {
		$('#lineSet-modal').modal('show');
		$("#lineSetGrid").jqGrid('setGridParam', {
			url: '/manager/erp/projectAndColumn/getColumns',
			postData: {
				'rpMainId': $('#ProjectsInput').children().length > 0 ? $('#ProjectsInput').val() : projectId
			}
		}).trigger("reloadGrid");

	})


	$('.kaoheModel').click(function(){
		$('#bmkhcbModal').modal('show')
		$('#bmkhcbGrid').resize()
	})
	var bmkhcbData=[];
    $('#bmkhcbModal').on('show.bs.modal', function () {
        bmkhcbData=getbmkhcbGridList()
    })
    $('#bmkhcbModal').on('hide.bs.modal', function () {
		var updateData=getbmkhcbGridList()
		if(!(_.isEqual(bmkhcbData,updateData))){
            $.each(bmkhcbData,function(k,v){
                $('#bmkhcbGrid').setCell(k+1,'bmkhcb',v.bmkhcb)
            })
		}
    })
    $('#surebmcbSet').click(function(){
        bmkhcbData=getbmkhcbGridList()
        loadbmkhcbData()
    })

	function getbmkhcbGridList() {
    	var  bmkhcbData=[]
        $('#bmkhcbGrid').saveCell(lastrow,lastcell)
        var ids = $('#bmkhcbGrid').getDataIDs()

        $.each(ids,function(k,v){
            var info = $('#bmkhcbGrid').getRowData(v)
            bmkhcbData.push(info)
        })
		return bmkhcbData
    }
	$('#bmkhcbGrid').jqGrid({
		url: basePath + "/component/section/getAccessSectionVoPageList",
		mtype: "GET",
		datatype: "json",
		colNames: ['id','dataId', '部门编码', '部门名称', '部门考核成本<span class="pixia"  data-key="bmkhcb" title="批量修改以下所有行">(批下)</span>'],
		colModel: [
			{name: 'id', index: 'id', width: 1, align: 'center', sorttype: "string", hidden: true},
			{name: 'dataId', index: 'dataId', width: 1, align: 'center', sorttype: "string", hidden: true},
			{name: 'code', index: 'code', width: 150, align: 'center', sorttype: "string", sortable: false,editable:false},
			{name: 'name', index: 'name', width: 150, align: 'center', sorttype: 'string', sortable: false,editable:false},
			{name: 'bmkhcb', index: 'bmkhcb', width: 150, align: 'center', sorttype: 'string', sortable: false,editable:true,formatter: 'number',
				editoptions: {
					dataEvents: [{
						type: "focus",
						fn: function () {
                            $(this)[0].select()
							$(this).bind('input propertychange',function(){
								checkInput.checkNum(this,12)
							})
						}
					}]
				}},
		],
		jsonReader  : {
			root: "data.dataList",
			total:"data.total",
			records:"data.records",
			repeatitems: false
		},
        search: true,
		sortable: false,
		rownumbers: true,
		cellsubmit: 'clientArray',//单元格保存内容的位置
		editurl: 'clientArray',
		cellEdit: true,
		rownumWidth: 40, // the width of the row numbers columns
		shrinkToFit: false,
		width:"100%",
		height:$(window).height()*0.5,
		gridComplete: function() {
			$('#bmkhcbGrid').resize()
		},
		beforeEditCell:function(rowid,cellname,v,iRow,iCol){
			lastrow = iRow;
			lastcell = iCol;
		},


	})

    //批下
    $('.pixia').on('click', function () {
        var key = $(this).data('key');
        var $grid = $("#bmkhcbGrid");
        $grid.jqGrid('saveCell', lastrow, lastcell);
        var selRowId = $grid.jqGrid('getGridParam', 'selrow');
        var currRow = $grid.jqGrid('getRowData', selRowId);
        var ids = $grid.getDataIDs();
        for (var i = ids.indexOf(selRowId) + 1; i < ids.length; i++) {
            $grid.jqGrid('setCell', ids[i], key, Number(currRow[key]).toFixed(2));
        }

    })
    function  treeFun() {
        $.ajax({
            type: 'post',
            url: "/manager/component/section/getAccessSectionTreeNodeVoList",

            dataType: "json",
            success:function(data){
                var nodes = data.data.dataList||[];
                for(var i=0;i<nodes.length;i++){
                    nodes[i].pId=nodes[i].parentId
                }
                var treeObj = $.fn.zTree.init($("#TreeDom"),
                    {data: {simpleData: {enable: true}},
                        view: {
                            showLine: true
                        },
                        callback:{
                            onClick: function(event, treeId, treeNode){

                                loadbmkhcbGrid()
                            }
                        }
                    },nodes);
                treeObj.expandAll(true);
            }
        });
    }

    $("#searchStore").bind('input propertychange', function() {
        var _this=$(this)
        loadbmkhcbGrid()
        setTimeout(function(){
            _this.focus()
        })
    });

    function loadbmkhcbGrid() {
    	var queryKey=$.trim($("#searchStore").val()).toUpperCase()
        var typeId=[]
		 var treeObj = $.fn.zTree.getZTreeObj("TreeDom");
		var treeNodeList=treeObj.getSelectedNodes().length==0?treeObj.getNodes():treeObj.getSelectedNodes();
        addId(treeNodeList)
        function addId(treeNodeList) {
        	for(var j=0;j<treeNodeList.length;j++){
        		var treeNode=treeNodeList[j]
                if(treeNode.children){
                    for(var i=0;i<treeNode.children.length;i++){
                        var children=treeNode.children[i]
                        addId([children])
                    }
                }
                typeId.push($.trim(treeNode.id))
			}
        }

        var $grid= $('#bmkhcbGrid');
        $grid.jqGrid('saveCell',lastrow,lastcell);
        var ids = $grid.getDataIDs();
        $.each(ids, function (i, keyId) {
            var currRow = $grid.jqGrid('getRowData', keyId);
            if(((currRow.code.toUpperCase()).indexOf(queryKey)>-1 || (currRow.name.toUpperCase()).indexOf(queryKey)>-1) &&
                $.inArray(currRow.dataId,typeId)>-1
			){
                $("#bmkhcbGrid tr").removeClass('active')
                //设置单元格高亮
                var curTr= $("#bmkhcbGrid #"+keyId);
                curTr.addClass('active')
                var hegiht=curTr[0].offsetTop;
                $grid.parents(".ui-jqgrid-bdiv").scrollTop(hegiht);
                return false;
            }
        })

    }
	//商品分类
	$("#goodsNameSelectClassTree").combobox({
		id:'goodsClassTree',
		url: '/manager/component/goods/getGoodsClassTreeNodeVoList',
		param:{

		},
		placeholder:'商品分类',
		checkType:'radio',
		search:true,
		callback:function(){
			focusNextInput(this)
			//newGoodsName()
		}
	})
	//商品品牌
	$("#goodsBrandSelectC").combobox({
		id:'goodsBrandTree',
		url: '/manager/component/goods/getGoodsBranchVoTreeList',
		param:{

		},
		placeholder:'商品品牌',
		checkType:'radio',
		search:true,
		callback:function(){
			// focusNextInput(this)
			newGoodsName()
		}
	})
	//商品颜色
	$("#goodsColorSelectC").combobox({
		id:'goodsColorTree',
		url: '/manager/component/goods/getGoodsColorVoTreeList',
		param:{

		},
		placeholder:'商品颜色',
		checkType:'radio',
		search:true,
		callback:function(){
			focusNextInput(this)
			newGoodsName()
		}
	})

	//商品型号
	$("#goodsModelInput").combobox({
		id:'goodsModelTree',
		url: '/manager/component/goods/getGoodsModelVoTreeList',
		param:{

		},
		placeholder:'商品型号',
		checkType:'radio',
		search:true,
		callback:function(){
			focusNextInput(this)
			newGoodsName()
		}
	})

    $("#goodsModelInput,#goodsConfigureInput")	.on('input propertychange',function () {
        newGoodsName()
    })

	//商品配置
	$("#goodsConfigureInput").combobox({
		id:'goodsConfigureTree',
		url: '/manager/component/goods/getGoodsConfigureVoTreeList',
		param:{

		},
		placeholder:'商品配置',
		checkType:'radio',
		search:true,
		callback:function(){
			focusNextInput(this)
			newGoodsName()
		}
	})

	$('#addGoodsClassParentIdTree').combobox({
		id:'GoodsClassParentIdTree',
		url: '/manager/component/goods/getGoodsClassTreeNodeVoList',
		param:{

		},
		checkType:'radio',
		placeholder:'商品类别',
	})

	 //名称商品类别
 	 $('.nameCla').on('input propertychange',function () {
		 var $this=$(this)
         $this.val($this.val().replace(/\\/g,'/'))
     })
})
function loadbmkhcbData() {
    $('#bmkhcbGrid').saveCell(lastrow,lastcell)
    var ids = $('#bmkhcbGrid').getDataIDs()
    var priceLen = 0;
    $.each(ids,function(k,v){
        var info = $('#bmkhcbGrid').getRowData(v)
        if(info.bmkhcb != '' && info.bmkhcb != 0){
            priceLen++
        }
    })
    if(priceLen > 0){
        $('.priceLen').show().html(priceLen)
    }else{
        $('.priceLen').hide().html(priceLen)
    }
}
//初始化事件
function initEvents(){
	
	//注册窗口改变事件
	$(window).resize(wResize);
	wResize();

	//模糊查询
    $("#goodsNameKeyWord").bind('input propertychange', function() {  
    		reLoadGrid();
    });
    
    //监听商品名称输入
    $("#goodsNameField").bind('input propertychange', function() {  
		$("#goodsNameField_").val($(this).val());
    });
    
    //查询参数 ：是否包含禁用状态
	$("#goodsNameStatusCheckbox").change(function(){
		reLoadGrid();
	});
	
	$("#ifCreateGoodsClass").change(function(){
		if($("#ifCreateGoodsClass").is(":checked")){
			$(".extAttr").show();
		}else{
			$(".extAttr").hide();
		}
	});
    //是否串号管理
    $("#ifManageImeiCheckbox").change(function(){

		 if($("#ifManageImeiCheckbox").is(":checked")){
			$(".ifManageImei").show();
			$('.imeibox').show()
		 	//$("input[name='storageMode'][value='0']").prop("checked",true);
			//$("input[name='storageMode']").attr({"disabled":"disabled"});
		 	$("#gbValuationMethods").removeAttr("disabled");
		 }else{
			$(".ifManageImei").hide();
			 $('.imeibox').hide()
		 	$("#ifEnableAuxliaryImeiCheckbox").prop("checked",false);
	 	    $(".ifEnableAuxliaryImei").hide();

			//$("input[name='storageMode'][value='1']").prop("checked",true);
		 	//$("input[name='storageMode']").removeAttr("disabled");
		 	//$("#gbValuationMethods").attr({"disabled":"disabled"});
		 	$("input[name='valuationMethods'][value='2']").prop("checked",true);
		 }
     });
	//加权平均
	$('#gbValuationMethods2').click(function () {
		$('#ifManageImeiCheckbox').prop('checked',false)
        $('#ifManageImeiCheckbox').trigger('change')
    })
    //个别计价
    $('#gbValuationMethods').click(function () {
        $('#ifManageImeiCheckbox').prop('checked',true)
        $('#ifManageImeiCheckbox').trigger('change')
    })
	$("#ifEnableAuxliaryImeiCheckbox").change(function(){
		if($("#ifEnableAuxliaryImeiCheckbox").is(":checked")){
			$(".ifEnableAuxliaryImei").show();
		}else{
			$(".ifEnableAuxliaryImei").hide();
		}
	});
	$(".codeAdd").focus(function(e){
		$(this).next().html('');
	});
	$(".nameAdd").focus(function(e){
		$(this).next().html('');
	});
	$('#_easyui_textbox_input1').change(function(e){
		$(this).parent().next().html('');
	});
	
}

/***********************************商品类别* 开始****************************/
//商品类别添加按钮点击
function addGoodsClassBtnClick(){
	$("#classSaveAndAdd").show();

	//清空表单
	$(".codeCla").next().html('');
	$(".nameCla").next().html('');
	$("#addAndEiditGoodsClassModalDialog").writeJson2Dom(goodsClassKong);
	$('#addAndEiditGoodsClassModalDialog').modal('show');
	$('#addAndEiditGoodsClassModalDialog').find('.modal-title').html('新增商品类别窗口');
	if(curr_goodsclass_tree_selectId != "" && curr_goodsclass_node.canEidit == true){
	}
}

//商品类别编辑按钮点击
function eiditGoodsClassBtnClick(){
	
	//判断是否选择某个要编辑的商品类别
	$(".codeCla").next().html('');
	$(".nameCla").next().html('');
	if(curr_goodsclass_node != null && curr_goodsclass_node.canEidit == true){
		$("#classSaveAndAdd").hide();
		$('#addAndEiditGoodsClassModalDialog').modal('show');
		$('#addAndEiditGoodsClassModalDialog').find('.modal-title').html('修改商品类别窗口');
		
		$("#addAndEiditGoodsClassModalDialog").writeJson2Dom(curr_goodsclass);
        var treeObj = $.fn.zTree.getZTreeObj("dataTree");
        $('#addGoodsClassParentIdTree').val( treeObj.getNodeByParam("id", curr_goodsclass_node.pid, null).name).data('id',curr_goodsclass_node.pid)
	}else{
		$.MsgBox("操作提示","未选中类别或类别不允许操作");
		// $('#addGoodsClassParentIdTree').combotree('setValue',"");
	}
}

//保存商品类别
function addOrEiditGoodsClassSave(op){
	//新增验证非空
	var area = $('.codeCla').val().trim(),
		na = $('.nameCla').val().trim();
	if(area == ''){
		$(".codeCla").next().html('必填!');
		return;
	}
	if(na == ''){
		$('.nameCla').next().html('必填!');
		return;
	}
	
	var model = getAddAndEiditGoodsClassFormData();
	if(model.id == ""){
		//添加
		goodsClassDao.add(model,function(data){
			if(data.result == 1){
				 $.MsgBox('提示消息','保存成功'); 
				 //清空表单
				 $("#addAndEiditGoodsClassModalDialog").writeJson2Dom(goodsClassKong);
				 reLoadClassTree();
				 
				 if(op == 1){
						$(".codeCla").next().html('');
						$(".nameCla").next().html('');
						$("#addAndEiditGoodsClassModalDialog").writeJson2Dom(goodsClassKong);
						$('#addAndEiditGoodsClassModalDialog').find('.modal-title').html('新增商品类别窗口');
						// if(curr_goodsclass_tree_selectId != "" && curr_goodsclass_node.canEidit == true){
						// 	$('#addGoodsClassParentIdTree').combotree('setValue',curr_goodsclass_tree_selectId);
						// }
				 }else{
					 $('#addAndEiditGoodsClassModalDialog').modal('hide');
				 }
			}else{
				 $.MsgBox('提示消息',data.desc);
			}
		});
	}else{
		//编辑
		goodsClassDao.save(model,function(data){
			if(data.result == 1){
				 $('#addAndEiditGoodsClassModalDialog').modal('hide'); 
				 $.MsgBox('提示消息','保存成功'); 
				 //清空表单
				 $("#addAndEiditGoodsClassModalDialog").writeJson2Dom(goodsClassKong);
				 reLoadClassTree();
			}else{
				 $.MsgBox('提示消息',data.desc);
			}
		});
	}

}

//获取商品类别表单数据
function getAddAndEiditGoodsClassFormData(){
	
	var obj = $("#addAndEiditGoodsClassModalDialog").toJsonObject();
    obj.parentId=$('#addGoodsClassParentIdTree').data('id')
	obj.ifManageImei = (obj.ifManageImei == undefined?false:true);
	obj.ifChooseColor = (obj.ifChooseColor == undefined?false:true);
	return obj;
}

//删除商品类别
function delGoodsClass(){
	if(curr_goodsclass_tree_selectId != "" && curr_goodsclass_node.canEidit == true){
		$.MsgBox('提示消息',"请确认是否删除",function(){
			//删除
			goodsClassDao.del(curr_goodsclass_tree_selectId,function(data){
				if(data.result == 1){
					 $.MsgBox('提示消息','删除成功'); 
					 reLoadClassTree();
				}else{
					 $.MsgBox('提示消息',data.desc);
				}
			});
		},function(){});
	}else{
		$.MsgBox('提示消息',"未选中类别或类别不允许操作");
	}
}
/***********************************商品类别* 结束****************************/

/***********************************商品品牌* 开始****************************/
//新增品牌按钮点击事件
function addGoodsBrandBtnClick(){
	$("#eidtGoodsBrandModalDialog").writeJson2Dom({'name':'','code':''});
	$('#addGoodsBrandModalDialog').modal('show');
}

//商品品牌编辑按钮点击
function eiditGoodsBrandBtnClick(rowid){
	
	var obj = $("#goodsBrandDataGrid").jqGrid('getRowData', rowid );
	if(obj != undefined && obj != null){
		obj.rowId = rowid;
		$('#eidtGoodsBrandModalDialog').modal('show');
		$("#eidtGoodsBrandModalDialog").writeJson2Dom(obj);
	}
}

//保存添加商品品牌
function addGoodsGrandSave(){
	
	var obj = $("#addGoodsBrandModalDialog").toJsonObject();
	obj.ifManageImei = (obj.ifManageImei == undefined?false:true);
	obj.ifChooseColor = (obj.ifChooseColor == undefined?false:true);
	obj.ifCreateGoodsClass = (obj.ifCreateGoodsClass == undefined?false:true);
	obj.groupId = gl_groupId;
	
	//添加
	goodsBrandDao.add(obj,function(data){
		if(data.result == 1){
			 reLoadBrandGrid(1);
			 if(obj.ifCreateGoodsClass){
				 reLoadClassTree();
			 }
		}else{
			 $.MsgBox('提示消息',data.desc);
		}
	});
}

//保存编辑商品品牌
function eiditGoodsGrandSave(){
	
	var obj = $("#eidtGoodsBrandModalDialog").toJsonObject();
	var rowid = obj.rowId;
	delete obj["rowId"];
	//添加
	goodsBrandDao.save(obj,function(data){
		if(data.result == 1){
			$("#goodsBrandDataGrid").jqGrid('setCell', rowid ,"name" ,obj.name);
			$("#goodsBrandDataGrid").jqGrid('setCell', rowid ,"code" ,obj.code);
			$('#eidtGoodsBrandModalDialog').modal('hide');
		}else{
			 $.MsgBox('提示消息',data.desc);
		}
	});
}

//禁用
function disEnabledGrandBtnClick(){
	//获取选择的行 多选
	var objs = getGrandCurrRows();
	if(objs.length > 0){
		var ids = $.map(objs,function(obj){ return obj.id; })
		$.MsgBox('禁用确认','是否确定禁用',function(){
			goodsBrandDao.disEnabled(ids.join(","),function(data){
				if(data.result == 1){
					reLoadBrandGrid();
				}else{
					 $.MsgBox('提示消息',data.desc);
				}
			});
		},function(){});
	}else{
		$.MsgBox('提示消息','请选择要禁用的数据'); 
	}
}

//启用
function enabledGrandBtnClick(){
	//获取选择的行 多选
	var objs = getGrandCurrRows();
	if(objs.length > 0){
		var ids = $.map(objs,function(obj){ return obj.id; })
		$.MsgBox('启用确认','是否确定启用',function(){
			goodsBrandDao.enabled(ids.join(","),function(data){
				if(data.result == 1){
					reLoadBrandGrid();
				}else{
					 $.MsgBox('提示消息',data.desc);
				}
			});
		},function(){});
	}else{
		$.MsgBox('提示消息','请选择要启用的数据'); 
	}
}

//获取当前选择的行数据 多选
function getGrandCurrRows(){
	var ids=$('#goodsBrandDataGrid').jqGrid('getGridParam','selarrrow');
  var objs = [];
  $.each(ids,function(i,value){
	  objs.push($("#goodsBrandDataGrid").jqGrid('getRowData', value ));
  });
	return objs;
}
//删除商品品牌
function delGoodsGrand(id){
	
	//删除
	goodsBrandDao.del(id,function(data){
		if(data.result == 1){
			$("#goodsBrandDataGrid").jqGrid('delRowData', id);
		}else{
			 $.MsgBox('提示消息',data.desc);
		}
	});
}

//初始化商品品牌表格
function initGoodsBrandGrid(){
	//0为启用,1为禁用,2删除
	function formatterStatus(cellvalue, options, rowObject){
		if(cellvalue == 0){
			return "";
		}else if(cellvalue == 1){
			return '<span class="glyphicon glyphicon-ok"></span>';
		}else if(cellvalue == 2){
			return "";
		}
	}
	function formatterOp(cellvalue, options, rowObject){
		return '<a class="btn" onclick="delGoodsGrand('+(options.rowId)+')"><i class="glyphicon glyphicon-trash"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
               '<a class="btn" onclick="eiditGoodsBrandBtnClick('+(options.rowId)+')"><i class="glyphicon glyphicon-pencil"></i></a>';
	}
	$("#goodsBrandDataGrid").jqGrid({
		url: basePath + '/Tgoodsbrand/page?groupId='+gl_groupId,
        datatype : "json",
        colNames : [ 'ID',  '品牌名称','品牌编码','是否禁用', '操作'],  
        colModel : [ 
                     {name : 'id',index : 'id',align:'left',hidden: true}, 
                     {name : 'name',index : 'name',align:'left'}, 
                     {name : 'code',index : 'code',align:'left'}, 
                     {name : 'status',index : 'status',align:'left',formatter:formatterStatus}, 
                     {name : 'op',index : 'op',align:'center',formatter:formatterOp}
                   ],
        styleUI: 'Bootstrap',
        pager : '#goodsBrandGridPager',
        jsonReader: { root: "rows", total: "total",records: "records",repeatitems: false},
        mtype: "POST",
        viewrecords : true,
        multiselect : true,
        multiboxonly : true,
        rownumbers:true,
        caption : "",
        rowNum : 10,
        autowidth:true,
        onSortCol:function(index,iCol,sortorder){
		},
        loadComplete:function(data){
        	try {
        		wResize();
			} catch (e) {
				console.log(e);
			}
        }
      });	
}
/***********************************商品品牌* 结束****************************/

/***********************************商品颜色* 开始****************************/
//新增颜色按钮点击事件
function addGoodsColorBtnClick(){
	$("#addGoodsColorModalDialog").writeJson2Dom({'name':'','code':''});
	$('#addGoodsColorModalDialog').modal('show');
}

//商品颜色编辑按钮点击
function eiditGoodsColorBtnClick(rowid){
	
	var obj = $("#goodsColorDataGrid").jqGrid('getRowData', rowid );
	if(obj != undefined && obj != null){
		obj.rowId = rowid;
		$('#eidtGoodsColorModalDialog').modal('show');
		$("#eidtGoodsColorModalDialog").writeJson2Dom(obj);
	}
}

//保存添加商品颜色
function addGoodsColorSave(){
	
	var obj = $("#addGoodsColorModalDialog").toJsonObject();
	obj.groupId = gl_groupId;
	
	//添加
	goodsColorDao.add(obj,function(data){
		if(data.result == 1){
			 reLoadColorGrid(1);
		}else{
			 $.MsgBox('提示消息',data.desc);
		}
	});
}

//保存编辑商品颜色
function eiditGoodsColorSave(){
	
	var obj = $("#eidtGoodsColorModalDialog").toJsonObject();
	var rowid = obj.rowId;
	delete obj["rowId"];
	//添加
	goodsColorDao.save(obj,function(data){
		if(data.result == 1){
			$("#goodsColorDataGrid").jqGrid('setCell', rowid ,"name" ,obj.name);
			$("#goodsColorDataGrid").jqGrid('setCell', rowid ,"code" ,obj.code);
			$('#eidtGoodsColorModalDialog').modal('hide');
		}else{
			 $.MsgBox('提示消息',data.desc);
		}
	});
}

//删除商品颜色
function delGoodsColor(id){
	
	//删除
	goodsColorDao.del(id,function(data){
		if(data.result == 1){
			$("#goodsColorDataGrid").jqGrid('delRowData', id);
		}else{
			 $.MsgBox('提示消息',data.desc);
		}
	});
}

//禁用
function disEnabledColorBtnClick(){
	//获取选择的行 多选
	var objs = getColorCurrRows();
	if(objs.length > 0){
		var ids = $.map(objs,function(obj){ return obj.id; })
		$.MsgBox('禁用确认','是否确定禁用',function(){
			goodsColorDao.disEnabled(ids.join(","),function(data){
				if(data.result == 1){
					reLoadColorGrid();
				}else{
					 $.MsgBox('提示消息',data.desc);
				}
			});
		},function(){});
	}else{
		$.MsgBox('提示消息','请选择要禁用的数据'); 
	}
}

//启用
function enabledColorBtnClick(){
	//获取选择的行 多选
	var objs = getColorCurrRows();
	if(objs.length > 0){
		var ids = $.map(objs,function(obj){ return obj.id; })
		$.MsgBox('启用确认','是否确定启用',function(){
			goodsColorDao.enabled(ids.join(","),function(data){
				if(data.result == 1){
					reLoadColorGrid();
				}else{
					 $.MsgBox('提示消息',data.desc);
				}
			});
		},function(){});
	}else{
		$.MsgBox('提示消息','请选择要启用的数据'); 
	}
}

//获取当前选择的行数据 多选
function getColorCurrRows(){
	var ids=$('#goodsColorDataGrid').jqGrid('getGridParam','selarrrow');
    var objs = [];
    $.each(ids,function(i,value){
  	  objs.push($("#goodsColorDataGrid").jqGrid('getRowData', value ));
    });
	return objs;
}

//初始化商品颜色表格
function initGoodsColorGrid(){
	//0为启用,1为禁用,2删除
	function formatterStatus(cellvalue, options, rowObject){
		if(cellvalue == 0){
			return "";
		}else if(cellvalue == 1){
			return '<span class="glyphicon glyphicon-ok"></span>';
		}else if(cellvalue == 2){
			return "";
		}
	}
	function formatterOp2(cellvalue, options, rowObject){
		return '<a class="btn" onclick="delGoodsColor('+(options.rowId)+')"><i class="glyphicon glyphicon-trash"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
        	   '<a class="btn" onclick="eiditGoodsColorBtnClick('+(options.rowId)+')"><i class="glyphicon glyphicon-pencil"></i></a>';
	}
	$("#goodsColorDataGrid").jqGrid({
		url: basePath + '/Tgoodscolor/page?groupId='+gl_groupId,
        datatype : "json",
        colNames : [ 'ID',  '颜色名称','颜色编码','是否禁用', '操作'],  
        colModel : [ 
                     {name : 'id',index : 'id',align:'left',hidden: true}, 
                     {name : 'name',index : 'name',align:'left'}, 
                     {name : 'code',index : 'code',align:'left'},
                     {name : 'status',index : 'status',align:'left',formatter:formatterStatus},  
                     {name : 'op',index : 'op',align:'center',formatter:formatterOp2}
                   ],
        styleUI: 'Bootstrap',
        pager : '#goodsColorGridPager',
        jsonReader: { root: "rows", total: "total",records: "records",repeatitems: false},
        mtype: "POST",
        viewrecords : true,
        multiselect : true,
        multiboxonly : true,
        rownumbers:true,
        caption : "",
        rowNum : 10,
        autowidth:true,
        onSortCol:function(index,iCol,sortorder){
		},
        loadComplete:function(data){
        	try {
        		wResize();
			} catch (e) {
				console.log(e);
			}
        }
      });	
}
/***********************************商品颜色* 结束****************************/

/***********************************商品名称* 开始****************************/

//删除
function delBtnClick(){
	
	//获取选择的行 多选
	var objs = getCurrRows();

	if(objs.length > 0){
		var ids=$('#dataGrid').jqGrid('getGridParam','selarrrow');
		// var ids = $.map(objs,function(obj){ return obj.id; })
		$.MsgBox('删除确认','是否确定删除',function(){
			goodsNameDao.del(ids.join(","),function(data){
				if(data.result == 1){
					 reLoadGrid();
				}else{
					 $.MsgBox('提示消息',data.desc);
				}
			});
		},function(){});
	}else{
		$.MsgBox('提示消息','请选择要删除的数据'); 
	}
}

//禁用
function disEnabledBtnClick(){
	//获取选择的行 多选
	var ids=$('#dataGrid').jqGrid('getGridParam','selarrrow');
	var objs = getCurrRows();
	if(ids.length > 0){
		$.MsgBox('禁用确认','是否确定禁用',function(){
			goodsNameDao.disEnabled(ids.join(","),function(data){
				if(data.result == 1){
					reLoadGrid(currPage);
				}else{
					 $.MsgBox('提示消息',data.desc);
				}
			});
		},function(){});
	}else{
		$.MsgBox('提示消息','请选择要禁用的数据'); 
	}
}

//启用
function enabledBtnClick(){
	//获取选择的行 多选
	var ids=$('#dataGrid').jqGrid('getGridParam','selarrrow');
	var objs = getCurrRows();
	if(ids.length > 0){
		$.MsgBox('启用确认','是否确定启用',function(){
			goodsNameDao.enabled(ids.join(","),function(data){
				if(data.result == 1){
					reLoadGrid(currPage);
				}else{
					 $.MsgBox('提示消息',data.desc);
				}
			});
		},function(){});
	}else{
		$.MsgBox('提示消息','请选择要启用的数据'); 
	}
}

//商品添加按钮点击
function addGoodsNameBtnClick(){
	$("#saveAndAddBtn").show();
	$("#saveAndCloseBtn").show().html("保存并关闭");
	$(".codeAdd").next().html('');
	$(".nameAdd").next().html('');
	$('#_easyui_textbox_input1').parent().next().html('');
	//清空表单
	$("#addAndEiditModalDialog").writeJson2Dom(goodsNameKong);
	$('#priceGoods')[0].reset()
	$('#addAndEiditModalDialog .ztree').html('')
    $('#addAndEiditModalDialog input').removeData("id");
	$('#addAndEiditModalDialog').modal('show');
	$('#addAndEiditModalDialog').find('.modal-title').html('新增商品窗口');
	if(curr_goodsclass_tree_selectId != ""){
		// $('#goodsNameSelectClassTree').combotree('setValue',curr_goodsclass_tree_selectId);
		$('#goodsNameSelectClassTree').val(curr_goodsclass.name).data('id',curr_goodsclass_tree_selectId);
		//判断商品类别是否是手机，如果是则需要改变页面
	}
	
	$(".ifManageImei").hide();//辅助串号管理
	$(".ifEnableAuxliaryImei").hide();//辅助串号长度
	$("input[name='storageMode']").removeAttr("disabled");
	$("#ifManageImeiCheckbox,#gbValuationMethods2,#ifEnableAuxliaryImeiCheckbox").removeAttr("disabled");

    $('#gbValuationMethods').prop('checked',true)
	$('#ifManageImeiCheckbox').trigger('click')
    $('#bmkhcbGrid').jqGrid('clearGridData')
    loadbmkhcbData()
	setTimeout(function(){
		$('#bmkhcbGrid').jqGrid('setGridParam', {}).trigger("reloadGrid");
	},500)

}

//商品编辑按钮点击
function eiditGoodsNameBtnClick(){	
	$(".codeAdd").next().html('');
	$(".nameAdd").next().html('');
	$('#_easyui_textbox_input1').parent().next().html('');
	$("#saveAndAddBtn").hide();
	$("#saveAndCloseBtn").show().html("保存");
	var obj;
	var ids=$('#dataGrid').jqGrid('getGridParam','selarrrow');
	if(ids.length > 1){
		$.zxsaas_plus.showalert('warning','每次只能修改一条数据')
		return
	}else{
		if(ids.length != 1){
			$.zxsaas_plus.showalert('warning','请选择一条数据修改')
			return
		}
	}

	$.ajax({
		url:'/manager/Tgoodsname/loadInfo',
		type:'post',
		dataType:'json',
		data:{
			id:ids[0]
		},
		success:function(data){
			obj = data.data.data
			if(obj != null){
				obj.status = obj.status == ""?"false":"true";
				obj.ifManageImei = obj.ifManageImei == ""?"false":"true";
				obj.ifEnableAuxliaryImei = obj.ifEnableAuxliaryImei == ""?"false":"true";
				$('#addAndEiditModalDialog').modal('show');
				$("#addAndEiditModalDialog").writeJson2Dom(obj);
				$('#priceGoods').writeJson2Dom(obj.priceGoods)
				$('#addAndEiditModalDialog').find('.modal-title').html('修改商品窗口');

				$('#goodsNameSelectClassTree').val(obj.goodsCategoryName).data('id',obj.goodsCategoryId);
				$('#goodsBrandSelectC').val(obj.goodsBrandName).data('id',obj.goodsBrandId);
				$('#goodsColorSelectC').val(obj.goodsColorName).data('id',obj.goodsColorId);

				goodsPriceId = obj.goodsPriceId


                var ids=$('#bmkhcbGrid').getDataIDs();
                $.each(ids,function(index,rowid){
                    var idxRowData=$('#bmkhcbGrid').jqGrid("getRowData",rowid);
					for(var i=0;i<obj.priceSectionList.length;i++){
						if(idxRowData.dataId==obj.priceSectionList[i].sectionId){
                            $('#bmkhcbGrid').setCell(rowid,'bmkhcb',obj.priceSectionList[i].specialPrice)
                            $('#bmkhcbGrid').setCell(rowid,'id',obj.priceSectionList[i].id)
							break;
						}
					}
                })

                loadbmkhcbData()

				$(".ifManageImei").show();
				$(".ifEnableAuxliaryImei").show();

				//判断选中是否是手机类别

				if($("#ifManageImeiCheckbox").is(":checked")){
					$(".ifManageImei").show();
				}else{
					$(".ifManageImei").hide();
					$("#ifEnableAuxliaryImeiCheckbox").prop("checked",false);
					$(".ifEnableAuxliaryImei").hide();
				}

				if($("#ifEnableAuxliaryImeiCheckbox").is(":checked")){
					$(".ifEnableAuxliaryImei").show();
				}else{
					$(".ifEnableAuxliaryImei").hide();
				}

				$("input[name='storageMode'][value='"+obj.storageMode+"']").prop("checked",true);
				$("input[name='storageMode']").prop({"disabled":"disabled"});
				$("#gbValuationMethods,#gbValuationMethods2,#ifManageImeiCheckbox").prop({"disabled":"disabled"});


			}else{
				$.MsgBox('提示消息','请选择要编辑的行');
			}
		}
	})




}
function newGoodsName(){
    $("#goodsNameField").val(
        $("#goodsBrandSelectC").val()+" "+$("#goodsModelInput").val()+" "+$("#goodsConfigureInput").val()+" "+$("#goodsColorSelectC").val()
    );
}

var goodsPriceId;
//商品添加或编辑保存
function addOrEiditGoodsNameBtnClick(op){
	//新增验证非空
	var na = $('.nameAdd').val().trim(),
		cla = $('#_easyui_textbox_input1').val();
	if(cla == ''){
		$('#_easyui_textbox_input1').parent().next().html('必填!');
		return;
	}

	if(na == ''){
		$('.nameAdd').next().html('必填!');
		return;
	}
	
	var model = getAddAndEiditGoodsNameFormData();
	if(model.id == ""){
		goodsNameDao.add(model,function(data){
			if(data.result == 1){
				 sortColumns = "CREATE_TIME DESC";
				 reLoadGrid();

				 var ids = $('#bmkhcbGrid').getDataIDs()
				 var dataArr = []
				 $.each(ids,function(k,v){
				 	var info = $('#bmkhcbGrid').getRowData(v)
					 // if(info.bmkhcb != ''){
						 dataArr.push({
							 'sectionId':info.dataId,
							 'specialPrice':info.bmkhcb != 0 ? info.bmkhcb: ''
						 })
					 // }

				 })
				$.ajaxPackage({
					contentType: 'application/json',
					url: '/manager/Tgoodsname/saveSectionPrice/'+data.data.goodsPriceId,
					data:JSON.stringify(dataArr),
					success: function (data) {
						if(data.result != 1){
							$.zxsaas_plus.showalert('error',data.desc)
						}else{
							if(op == 0){
								$('#addAndEiditModalDialog').modal('hide');
							}else{
								$("input[name='storageMode']").removeAttr("disabled");
								$("#ifManageImeiCheckbox,#gbValuationMethods2,#ifEnableAuxliaryImeiCheckbox").removeAttr("disabled");
							}
                            $('#priceGoods')[0].reset()
                            $('#addAndEiditModalDialog .ztree').html('')
							$('#oldData input[name="barCode"]').val('')

							$('#goodsColorSelectC').data('id','').val('')
                            newGoodsName()
							var code =	$('#oldData input[name="code"]').val()
							if(code.length>0){
								var lastKey=code.substr(code.length-1,1)
								if($.isNumeric(lastKey)){
                                    $('#oldData input[name="code"]').val(code.substr(0,code.length-1)+(Number(lastKey)+1))
								}
							}
							$("#gbValuationMethods").trigger('click')
							$('#bmkhcbGrid').jqGrid('setGridParam', {}).trigger("reloadGrid");
                            $.zxsaas_plus.showalert('success',data.desc||'保存成功');
						}

					}
				})
			}else{
				 $.MsgBox('提示消息',data.desc);
			}
		});
	}else{
		 saveDo();
		function saveDo(){
			//保存
			goodsNameDao.save(model,function(data){
				if(data.result == 1){
					 $('#addAndEiditModalDialog').modal('hide');
					 //清空表单
					 // $("#addAndEiditModalDialog").writeJson2Dom(goodsNameKong);
					 reLoadGrid(currPage);
					var ids = $('#bmkhcbGrid').getDataIDs()
					var dataArr = []
					$.each(ids,function(k,v){
						var info = $('#bmkhcbGrid').getRowData(v)
						dataArr.push({
							'id':info.id,
							'sectionId':info.dataId,
							'specialPrice':info.bmkhcb
						})
					})
					$.ajaxPackage({
						contentType: 'application/json',
						url: '/manager/Tgoodsname/saveSectionPrice/'+data.data.goodsPriceId,
						data:JSON.stringify(dataArr),
						success: function (data) {
							if(data.result != 1){
								$.zxsaas_plus.showalert('error',data.desc)
							}else{
								$.MsgBox('提示消息',data.desc||'保存成功');
							}

						}
					})
				}else{
					 $.MsgBox('提示消息',data.desc);
				}
			});	
		}
	}
	
}

//获取商品类别表单数据
function getAddAndEiditGoodsNameFormData(){
	
	var obj = $("#addAndEiditModalDialog").toJsonObject();
	obj.ifManageImei = (obj.ifManageImei == undefined?false:true);
	obj.ifEnableAuxliaryImei = (obj.ifEnableAuxliaryImei == undefined?false:true);

	obj.groupId = gl_groupId;

    obj.goodsBrandId=$('#goodsBrandSelectC').data('id')
    obj.goodsColorId=$('#goodsColorSelectC').data('id')
	obj.goodsCategoryId = $('#goodsNameSelectClassTree').data('id')
	obj.isSpecial = 0
	var ids = $('#bmkhcbGrid').getDataIDs()
	$.each(ids,function(k,v){
		var info = $('#bmkhcbGrid').getRowData(v)
		if(info.bmkhcb != '' && info.bmkhcb != 0){
			obj.isSpecial = 1
		}
	})

	return obj;
}


//获取当前选择的行数据 单选
function getCurrRow(){
	var ids=$('#dataGrid').jqGrid('getGridParam','selarrrow');
    var objs = [];
    $.each(ids,function(i,value){
  	  objs.push($("#dataGrid").jqGrid('getRowData', value ));
    });
	if(objs.length>1 || objs.length<1){
	  return null;
	}else{
	  return objs[0];
	}
}

//获取当前选择的行数据 多选
function getCurrRows(){
	var ids=$('#dataGrid').jqGrid('getGridParam','selarrrow');
	var objs = [];
	$.each(ids,function(i,value){
		objs.push($("#dataGrid").jqGrid('getRowData', value ));
	});
	return objs;
}

/***********************************商品名称* 结束****************************/

//窗口大小改变
function wResize(){
	var wwww = $(window).width();
	// $("#dataTree").height($(window).height()-370);
	$("#dataTree").width(200);
	$("#dataGrid").setGridHeight($(window).height()-280);

	if(wwww >1200){
		$("#dataGrid").setGridWidth($(window).width()-320);
		$("#dataGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });
	}

	$("#goodsBrandDataGrid").setGridHeight($(window).height()-450);
	$("#goodsBrandDataGrid").setGridWidth(600);
	$("#goodsBrandDataGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });

	$("#goodsColorDataGrid").setGridHeight($(window).height()-450);
	$("#goodsColorDataGrid").setGridWidth(600);
	$("#goodsColorDataGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });
	
}

//初始化树
var curr_goodsclass_tree_selectId = "";
var curr_goodsclass = null;
var curr_goodsclass_node = null;
function initTree(){
	//树设置参数
	var setting = {
		data: {//数据属性设置
			simpleData: {enable: true,idKey: "id",pIdKey: "pid",rootPId: null}
		},
		callback: {//回调事件设置
			onClick: function(event, treeId, treeNode, msg) {
				curr_goodsclass_tree_selectId = Number(treeNode.id);
				curr_goodsclass = treeNode.obj;
				curr_goodsclass_node = treeNode;
        		if(curr_goodsclass_tree_selectId == -1){
        			curr_goodsclass_tree_selectId = "";
        		}				
				reLoadGrid();//刷新数据
			}
		},
		view: {//样式设置
			showIcon: true
		}
	};

    $.ajax({
        type: 'Get',
        url: basePath+'/Tgoodsclass/findTree2?groupId='+gl_groupId,
        dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
        success: function (data) {
            $.fn.zTree.init($("#dataTree"), setting,data);
            var zTree = $.fn.zTree.getZTreeObj("dataTree");
            zTree.expandAll(false);
            var nodes = zTree.getNodes();
            for (var i = 0; i < nodes.length; i++) { //设置节点展开
                zTree.expandNode(nodes[i], true, false, true);
            }
        },
        error: function (msg) {
            alert(" 数据加载失败！" + msg);
        }
    });

}


//初始化表格
var currPage = 1;
function initGrid(){
	//0为启用,1为禁用,2删除
	function formatterStatus(cellvalue, options, rowObject){
		if(cellvalue == 0){
			return "";
		}else if(cellvalue == 1){
			return '<span class="glyphicon glyphicon-ok"></span>';
		}else if(cellvalue == 2){
			return "";
		}
	}
	function formatterFlag(cellvalue, options, rowObject){
		if(cellvalue == "1"){
			return '<span class="glyphicon glyphicon-ok"></span>';
		}else{
			return '';
		}
	}
	//商品名称=类别+名称+品牌+型号+颜色
	function formatterName(cellvalue, options, rowObject){
			return rowObject.goodsCategoryName + "-" +
				   rowObject.name + "-" +
				   rowObject.goodsBrandName + "-" +
				   rowObject.goodsModel + "-" +
				   rowObject.goodsColorName;
	}
	function formatterDate(cellvalue, options, rowObject){
		var date = new Date();
		date.setTime(cellvalue);
		return $.DateFormat(date,"yyyy-MM-dd");// hh:mm:ss
	}

	getCustomProject('商品档案')

	var def = {
		multiselect: true, //是否多选
		//sortable: true,//是否排序
		merge: false,//是否合并
		gotoable: true,//是否跳转
		rows: '100'//默认数量

	}
	// def = $.extend({}, def, options)
	$.jgrid.defaults.width = 1280;
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';
	setTimeout(function(){
		$.ajax({
			url: '/manager/finance/common/getReportHead',
			dataType: 'json',
			type: 'post',
			data: {
				'projectId': projectId,
			},
			success: function (data) {
				if (data.result == '-999') {
					$('#rpContainer').hide()
					$('.notFounImgBox').hide()
					return
				}
				var colName = [];
				var colModel = [];
				var groupHeader = [];
				var mergeArr = [];
				var complexData = {
					colName: colName,
					colModel: colModel,
					groupHeader: groupHeader
				};
				var frozen = 2
				$.each(data.data.colModel, function (k, v) {

					colName.push(v.defualname);

					if(k <= frozen){
						colModel.push({
							name: v.code,
							index: v.code,
							width: v.columnSize,
							align: alignArr[v.align],
							hidden: !v.isShow,
							id: v.id,
							sortable: true,
							cellattr: function (rowId, tv, rawObject, cm, rdata) {
								return 'id=\'' + v.code + rowId + "\'";
							},
							frozen : true
						})
					}else{
						colModel.push({
							name: v.code,
							index: v.code,
							width: v.columnSize,
							align: alignArr[v.align],
							hidden: !v.isShow,
							id: v.id,
							sortable: true,
							cellattr: function (rowId, tv, rawObject, cm, rdata) {
								return 'id=\'' + v.code + rowId + "\'";
							}
						});
					}

				});
				for (var i = 0; i < data.data.colModel.length; i++) {
					if (data.data.colModel[i].dataType == 'String' && data.data.colModel[i].isShow) {
						mergeArr.push(data.data.colModel[i].code)
					}
					if (data.data.colModel[i].dataType == 'Number') {
						break;
					}
				}
				;
				$.jgrid.gridUnload("dataGrid");

				$("#dataGrid").jqGrid({
                    styleUI: 'Bootstrap',
					mtype: "POST",
					url: '/manager/Tgoodsname/selectList',
					postData: getQueryModel(),
					datatype: "json",
                    jsonReader: {
                        repeatitems: false,
                        root: 'data.rows',
                        total: 'data.total',
                        page: 'data.page',
                        records: 'data.records'
                    },
                    rowNum: def.rows,
                    rowList: [100, 200, 500],

                    viewrecords: true,
                    shrinkToFit:false,
                    autowidth: true,
                    rownumWidth: 50, // the width of the row numbers columns
                    rownumbers: true,	//显示行号
                    width: '100%',
                    height: $(window).height() * 0.55,
					pager: "#jqGridPager",
                    colNames: colName,
                    colModel: colModel,

                    userDataOnFooter: true,
                    footerrow: true, //显示底部菜单
                    multiselect: def.multiselect,
                    sortable:true,
                    multiboxonly : true,
                    cellEdit: true,
                    sortorder: "asc",

					gridComplete: function () {
						$('table th').css('text-align', 'center')
						$('#dataGrid').resize()
                        if (mergeArr.length > 0 && def.merge) {
							Merger("rpGrid", mergeArr);
						}
					},
					onCellSelect: function (rowid, index, contents, event) {
						if (def.gotoable) {
							var info = $("#dataGrid").getRowData(rowid)
							if (event.target.className == 'billsCodeStyle') {
								if(index == 5){
									window.top.openWorkBoxByMenutext('填制凭证',   '/manager/cw/test/voucher?voucherId='+rowid+'&billsCode='+info.billsCode, true)
								}
								if(index == 7){
									var gotoUrl = getGoInfo(info).gotoUrl;
									var gotoName = getGoInfo(info).gotoName;
									window.top.openWorkBoxByMenutext(gotoName,gotoUrl,true)
								}
							}

						}
						if (def.onCellSelect) {
							def.onCellSelect(rowid, index, contents, event);
						}
					},
					loadComplete: function (data) {
						$('#dataGrid').resize()
						if (Object.keys(data.data).length == 0 || data.result == -999) {
							// $('#rpContainer').hide()
							$('.loadingImgBox').hide()
							$('.notFounImgBox').hide()
							return
						} else {
							$('.loadingImgBox').hide()
							$('.notFounImgBox').hide()
							$('#rpContainer').show()
						}
						$('#dataGrid td').css('text-overflow','ellipsis')

						if (data.data.rows.length > 0) {
							var info = data.data.rows

							$.each(info, function (k, v) {
								if (v.redMan) {
									$('#dataGrid').find('tbody tr:eq(' + (k + 1) + ')').css('color', 'red')
								}
								if (def.gotoable) {
									$('#dataGrid tr td[aria-describedby="rpGrid_billsCode"]').addClass('billsCodeStyle');
									$('#dataGrid tr td[aria-describedby="rpGrid_vouchetInNo"]').addClass('billsCodeStyle');
								}

							})

							$('.footrow td:first-child').html('合计');
							var rowNum = parseInt($(this).getGridParam('records'), 10);
							if (rowNum > 0) {
								$(".ui-jqgrid-sdiv").show();
								var footerData = data.data.totalVo;
								$(this).footerData("set", footerData, false);
							}
							else {
								$(".ui-jqgrid-sdiv").hide();
							}

							//分页滚动条 置顶
							$("#dataGrid").parents(".ui-jqgrid-bdiv")[0].scrollTop = 0;

							//数据请求成功之后，若果有要操作数据的行为，在这里执行
							if (def.callback) {
								def.callback(data);
							}

							//垂直滚动条置顶
							/*$("#rpGrid").setSelection(1);
							$("#rpGrid").resetSelection();*/
						} else {
							// $('#rpContainer').hide()
							$('.loadingImgBox').hide()
							// $('.notFounImgBox').show()
						}
					},


					ondblClickRow: function (id) {
						if (def.ondblClickRow) {
							def.ondblClickRow(id)
						}
					},
                    resizeStop: function (newwidth, index) {
                        var columnId
                        var profitIndex
                        if(def.multiselect){
                            profitIndex=2
                        }else{
                            profitIndex=1
                        }
                        columnId = data.data.colModel[index-profitIndex].id;
                        $.ajaxPackage({
                            url: '/manager/erp/projectAndColumn/updateColumnSize',
                            data: {
                                'columnId': columnId,
                                'columnSize': newwidth,
                            },
                            success: function (data) {

                            },
                        })
                    }
				});
				$("#dataGrid").jqGrid('bindKeys', '');
			}
		})

	},1500)


}

//获取分页查询参数
var sortColumns ="CREATE_TIME DESC";
function getQueryModel(){

	var postData = $("#dataGrid").jqGrid("getGridParam", "postData");
    $.each(postData, function (k, v) {
        delete postData[k];
    });
    var model = {};
    model.groupId = gl_groupId;
    
    //***其它参数
    model.keyWord = $.trim($("#goodsNameKeyWord").val());
    model.goodsclassIds = getChildNodes() ;
    // model.goodsclassIds = curr_goodsclass_tree_selectId ;
    // model.sortColumns =sortColumns;
    model.haveDisEnableStatus = $('#goodsNameStatusCheckbox').is(':checked')==true?1:0;
	return model;
}

function getChildNodes() {
	var zTreeObj = $.fn.zTree.getZTreeObj("dataTree");
	var selectedNodes = zTreeObj.getSelectedNodes();
	if(selectedNodes){
	    var childNodes = zTreeObj.transformToArray(selectedNodes); 
	    var nodes = new Array(); 
	    for(i = 0; i < childNodes.length; i++) { 
	        nodes[i] = childNodes[i].id; 
	    } 
	
	    return nodes.join(",");
    }
	return "";
}

//重新加载刷新数据
function reLoadGrid(page){
	page = _.isUndefined(page)?1:page;
    $("#dataGrid").jqGrid('setGridParam',{  
        datatype:'json',  
        postData:getQueryModel(),
        page:page  
    }).trigger("reloadGrid"); //重新载入  
}

//重新加载刷新颜色表格数据
function reLoadColorGrid(page){
	if( _.isUndefined(page)){
	    $("#goodsColorDataGrid").jqGrid('setGridParam',{  
	        datatype:'json' 
	    }).trigger("reloadGrid"); //重新载入  	
	}else{
	    $("#goodsColorDataGrid").jqGrid('setGridParam',{  
	        datatype:'json',  
	        page:page   
	    }).trigger("reloadGrid"); //重新载入  	
	}
    initGoodsColorSelect();
}

//重新加载刷新品牌表格数据
function reLoadBrandGrid(page){
	if( _.isUndefined(page)){
	    $("#goodsBrandDataGrid").jqGrid('setGridParam',{  
	        datatype:'json' 
	    }).trigger("reloadGrid"); //重新载入  	
	}else{
	    $("#goodsBrandDataGrid").jqGrid('setGridParam',{  
	        datatype:'json',  
	        page:page   
	    }).trigger("reloadGrid"); //重新载入  	
	}
   initGoodsBrandSelect();
}

//重新加载商品类别树
function reLoadClassTree(){
	var objTree = $.fn.zTree.getZTreeObj("dataTree");
    objTree.reAsyncChildNodes(null, "refresh"); 
    //
    // $('#goodsNameSelectClassTree').combotree('reload', basePath+'/Tgoodsclass/findTreeForEasyUI2?groupId='+gl_groupId);
    // $('#addBrandForClassParentId').combotree('reload', basePath+'/Tgoodsclass/findTreeForEasyUI?groupId='+gl_groupId);
    // $('#addGoodsClassParentIdTree').combotree('reload', basePath+'/Tgoodsclass/findTreeForEasyUI?groupId='+gl_groupId);
    
}

//加载刷新商品颜色下拉框
function initGoodsColorSelect(){
	$.ajax({
		type: 'Get',
		url: basePath+'/Tgoodscolor/listByModel?groupId='+gl_groupId,
		dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		success: function(data) {
			 var list = data.data.dataList;
			 $("#goodsColorSelect").html("");
			 for ( var int = 0; int < list.length; int++) {
				 $("#goodsColorSelect").append('<option value="'+list[int].id+'">'+list[int].name+'</option>');
			 }
		},
		error: function(msg) {
			console.log(msg);
		}
	});
}

//加载刷新商品品牌下拉框
function initGoodsBrandSelect(){
	return;
	$.ajax({
		type: 'Get',
		url: basePath+'/Tgoodsbrand/listByModel?groupId='+gl_groupId,
		dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		success: function(data) {
			 var list = data.data.dataList;
			 $("#goodsBrandSelect").html("");
			 for ( var int = 0; int < list.length; int++) {
				 $("#goodsBrandSelect").append('<option value="'+list[int].id+'">'+list[int].name+'</option>');
			 }
		},
		error: function(msg) {
			console.log(msg);
		}
	});
}

//加载刷新网络制式
function initNetworkStandard(){
	$.ajax({
		type: 'Get',
		url: basePath+'/Tpublictabs/listByModel?typeCode=WLZS',
		dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		success: function(data) {
	    	if(data.result==1){
				 var list = data.data.dataList;
				 $("select[name='networkStandard']").html("");
				 for ( var int = 0; int < list.length; int++) {
					 $("select[name='networkStandard']").append('<option value="'+list[int].code+'">'+list[int].content+'</option>');
				 }
	    	}else{
	    		$.MsgBox("错误",data.desc);
	    	}
		},
		error: function(msg) {
			console.log(msg);
		}
	});
}

//加载刷新营运商
function initCarrieroperator(){
	$.ajax({
		type: 'Get',
		url: basePath+'/Tpublictabs/listByModel?typeCode=YYS',
		dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		success: function(data) {
	    	if(data.result==1){
				 var list = data.data.dataList;
				 $("select[name='carrieroperator']").html("");
				 for ( var int = 0; int < list.length; int++) {
					 $("select[name='carrieroperator']").append('<option value="'+list[int].code+'">'+list[int].content+'</option>');
				 }
	    	}else{
	    		$.MsgBox("错误",data.desc);
	    	}
		},
		error: function(msg) {
			console.log(msg);
		}
	});
}

//导出商品资料
function exportInfo(){
	var haveDisEnableStatus = $('#goodsNameStatusCheckbox').is(':checked')==true?1:0
	window.location.href="/manager/Tgoodsname/export?goodsCategoryId="+curr_goodsclass_tree_selectId+"&keyWord="+$('#goodsNameKeyWord').val().trim()+'&haveDisEnableStatus='+haveDisEnableStatus;
}


//在一个输入框完成后光标跳到下一个输入框
function focusNextInput(thisInput)
{
    var inputs = $(".b_input");
    for(var i = 0;i<inputs.length;i++){
        // 如果是最后一个，则焦点回到第一个
        if(i==(inputs.length-1)){
            inputs[0].focus(); break;
        }else if(thisInput == inputs[i]){
            inputs[i+1].focus(); break;
        }
    }
}


//todo：没办法，怼吧！

//列设置确认
function sureLineSet() {
	var valList = $('#lineSetGrid').getRowData()
	var ids = $("#lineSetGrid").jqGrid('getDataIDs');
	var rowData = $("#lineSetGrid").jqGrid('getRowData', ids[ids.length - 1]);
	valList.push(rowData)
	$.ajax({
		url: '/manager/erp/projectAndColumn/updateColumns',
		dataType: 'json',
		type: 'post',
		data: {
			'flag':false,
			'valList': JSON.stringify(valList)
		},
		success: function (data) {
			if (data.data.status == '1') {
				$.jgrid.gridUnload("dataGrid");

				initGrid()
			}
		}
	})
}

