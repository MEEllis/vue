
//数据访问对象
var goodsNameDao = new GoodsName(basePath);

var goodsNameKong = {
		auxliaryImeiLength:"" ,
		carrieroperator:"中国移动" ,
		code:"" ,
		goodsBrandId:"" ,
		goodsCategoryId:"" ,
		goodsColorId:"" ,
		goodsModelId:"" ,
		id:"" ,
		ifEnableAuxliaryImei:false ,
		ifManageImei:false ,
		imeiLength:"" ,
		name:"" ,
		networkStandard:"GSM" ,
		opSystem:"" ,
		taxRate:"" ,
		valuationMethods:"1"
}

//初始化
$(function(){
	initTree();//初始化树
	initGrid();//初始化表格
	initEvents();//初始化事件
	initGoodsColorSelect();
	initGoodsBrandSelect();
})

//初始化事件
function initEvents(){
	
	//注册窗口改变事件
	$(window).resize(wResize);
	wResize();

	//模糊查询
    $("#goodsNameKeyWord").bind('input propertychange', function() {  
    		reLoadGrid();
    });
}
/***********************************商品名称* 开始****************************/
//商品添加按钮点击
function addGoodsNameBtnClick(){
	
	//清空表单
	$("#addAndEiditModalDialog").writeJson2Dom(goodsNameKong);
	$('#addAndEiditModalDialog').modal('show');
	$('#addAndEiditModalDialog').find('.modal-title').html('新增商品窗口');
	if(curr_goodsclass_tree_selectId != ""){
		$('#goodsNameSelectClassTree').combotree('setValue',curr_goodsclass_tree_selectId); 
	}
	
	$(".ifManageImei").hide();
	$(".ifEnableAuxliaryImei").hide();
}

//商品添加或编辑保存
function addOrEiditGoodsNameBtnClick(op){
	
	var model = getAddAndEiditGoodsNameFormData();
	//console.log(model);
	if(model.id == ""){
		//添加
		goodsNameDao.add(model,function(data){
			if(data.result == 1){
				 reLoadGrid();
				 $('#addAndEiditModalDialog').modal('hide');
				 //清空表单
				 $("#addAndEiditModalDialog").writeJson2Dom(goodsNameKong);
				 
			}else{
				 $.MsgBox('提示消息',data.desc);
			}
		});
	}else{
		//保存
		goodsNameDao.save(model,function(data){
			if(data.result == 1){
				 $('#addAndEiditModalDialog').modal('hide');
				 //清空表单
				 $("#addAndEiditModalDialog").writeJson2Dom(goodsNameKong);
				 reLoadGrid();
			}else{
				 $.MsgBox('提示消息',data.desc);
			}
		});
	}
	
}

//获取商品类别表单数据
function getAddAndEiditGoodsNameFormData(){
	
	var obj = $("#addAndEiditModalDialog").toJsonObject();
	obj.ifManageImei = (obj.ifManageImei == undefined?false:true);
	obj.ifEnableAuxliaryImei = (obj.ifEnableAuxliaryImei == undefined?false:true);
	obj.groupId = gl_groupId;
	
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
	$("#dataTree").height($(window).height()-350);
	$("#dataTree").width(180);
	$("#dataGrid").setGridHeight($(window).height()-240);
	$("#dataGrid").setGridWidth($(window).width()-290); 
	$("#dataGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "scroll" }); 
}

//初始化树
var curr_goodsclass_tree_selectId = "";
var curr_goodsclass = null;
function initTree(){
	//树设置参数
	var setting = {
		data: {//数据属性设置
			simpleData: {enable: true,idKey: "id",pIdKey: "pid",rootPId:null}
		},
        async: {//从后台获取数据
            enable: true,
            url: basePath+'/Tgoodsclass/findTree2?groupId='+gl_groupId,
            autoParam:[],
            dataFilter: ajaxDataFilter
        },
		callback: {//回调事件设置
			onClick: function(event, treeId, treeNode, msg) {
				curr_goodsclass_tree_selectId = Number(treeNode.id);
				curr_goodsclass = treeNode.obj;
        		if(curr_goodsclass_tree_selectId == -1){
        			curr_goodsclass_tree_selectId = "";
        		}				
				reLoadGrid();
			}
		},
		view: {//样式设置
			showIcon: true
		}
	};

	$.fn.zTree.init($("#dataTree"), setting);
	var zTree = $.fn.zTree.getZTreeObj("dataTree");
    zTree.expandAll(true);  
    
    
    function ajaxDataFilter(treeId, parentNode, responseData) {
        if (responseData) {
          for(var i =0; i < responseData.length; i++) {
               if(responseData[i].pid==-1){
            	   responseData[i].open=false;
               }
          }
        }
        return responseData;
    };
}

//初始化表格
function initGrid(){
	function formatterDate(cellvalue, options, rowObject){
		var date = new Date();
		date.setTime(cellvalue);
		return $.DateFormat(date,"yyyy-MM-dd hh:mm:ss");
	}
	function formatterIfManageImeiLabel(cellvalue, options, rowObject){
		if(rowObject.ifManageImei){
			return '<span class="glyphicon glyphicon-ok"></span>';
		}else{
			return '';
		}
	}
	function formatterifEnableAuxliaryImei(cellvalue, options, rowObject){
		if(rowObject.ifEnableAuxliaryImei){
			return '<span class="glyphicon glyphicon-ok"></span>';
		}else{
			return '';
		}
	}
	function formatterValuationMethodsLabel(cellvalue, options, rowObject){
		if(rowObject.valuationMethods == 1){
			return '个别计价';
		}else if(rowObject.valuationMethods == 2){
			return '加权平均';
		}else{
			return '';
		}
	}
	$("#dataGrid").jqGrid({
		url: basePath + '/Tgoodsname/page',
        datatype : "json",
        colNames : [ 'ID', '商品编码','商品名称','商品类别','商品类别', '商品品牌', '商品品牌', '商品型号','商品颜色','商品颜色',
                     '操作系统', '是否串号','辅助串号','串号长度','是否辅助串号',
                     '辅助串号长度',  '计价方式', '税率', '是否禁用','备注',
                     '新增人','新增时间','修改人','修改时间','型号','型号','网络制式','网络制式','网络制式', '是否管理串号',  '计价方式'],  
        colModel : [
                     {name : 'id',index : 'id',align:'center',width:70,hidden: true},
                     {name : 'code',index : 'code',align:'left',width:200},
                     {name : 'name',index : 'name',align:'left',width:200},
                     {name : 'goodsCategoryId',index : 'goodsCategoryId',align:'left',width:100,hidden: true},
                     {name : 'goodsCategoryName',index : 'GOODS_CATEGORY_NAME',align:'left',width:100},
                     {name : 'goodsBrandId',index : 'goodsBrandId',align:'left',width:50,hidden: true}, 
                     {name : 'goodsBrandName',index : 'GOODS_BRAND_NAME',align:'left',width:100},
                     {name : 'goodsModel',index : 'GOODS_MODEL',align:'left',width:200},
                     {name : 'goodsColorId',index : 'goodsColorId',align:'left',width:100,hidden: true}, 
                     {name : 'goodsColorName',index : 'GOODS_COLOR_NAME',align:'left',width:100},
                     {name : 'opSystem',index : 'opSystem',align:'left',width:100,hidden: true},//数据库没有
                     {name : 'ifManageImeiLabel',index : 'IF_MANAGE_IMEI',align:'left',width:80,formatter:formatterIfManageImeiLabel},
                     {name : 'ifEnableAuxliaryImeiLabel',index : 'IF_ENABLE_AUXLIARY_IMEI',align:'left',width:80,hidden: false,formatter:formatterifEnableAuxliaryImei},
                     {name : 'imeiLength',index : 'ifManageImei',align:'left',width:150,hidden: true},
                     {name : 'ifEnableAuxliaryImei',index : 'ifEnableAuxliaryImei',align:'left',width:100,hidden: true},
                     {name : 'auxliaryImeiLength',index : 'auxliaryImeiLength',align:'left',width:100,hidden: true},
                     {name : 'valuationMethodsLabel',index : 'VALUATION_METHODS',align:'left',width:100,hidden: false,formatter:formatterValuationMethodsLabel},
                     {name : 'taxRate',index : 'valuationMethods',align:'left',width:150,hidden: true},
                     {name : 'status',index : 'status',align:'left',width:100,hidden: true},
                     {name : 'remark',index : 'remark',align:'left',width:100,hidden: true},
                     {name : 'createUid',index : 'createUid',width:100,hidden: true},
                     {name : 'createTime',index : 'createTime',width:100,hidden: true,formatter:formatterDate},
                     {name : 'updateUid',index : 'updateUid',width:100,hidden: true},
                     {name : 'updateTime',index : 'updateTime',width:100,hidden: true,formatter:formatterDate},
                     {name : 'carrieroperator',index : 'carrieroperator',align:'left',hidden: false,hidden: true,width:100},
                     {name : 'carrieroperatorName',index : 'carrieroperatorName',align:'left',hidden: true,width:100},
                     {name : 'networkStandard',index : 'networkStandard',align:'left',hidden: false,hidden: true,width:100},
                     {name : 'networkStandardName',index : 'networkStandardName',align:'left',hidden: true,width:100},
                     {name : 'storageMode',index : 'storageMode',align:'left',width:100,hidden: true},
                     {name : 'ifManageImei',index : 'ifManageImei',align:'left',width:100,hidden: true},
                     {name : 'valuationMethods',index : 'valuationMethods',align:'left',width:100,hidden: true}
                   ],
        styleUI: 'Bootstrap',
        pager : '#jqGridPager',
        jsonReader: { root: "data.rows", total: "data.total",records: "data.records",repeatitems: false},
        mtype: "POST",
        viewrecords : true,

        multiselect : true,
        multiboxonly : true,
        caption : "",
        autowidth: false,
        rowNum: 100,
        rowList: [100, 200, 500],
        rownumbers:true,
        shrinkToFit:false,
        autoScroll: false,
        onSortCol:function(index,iCol,sortorder){
		},
		ondblClickRow:function(rowid,iRow,iCol,e){
           var subject = $("#dataGrid").jqGrid('getRowData', rowid );
			try {
			 	parent.callBack([subject]);
			 } catch (e) {
			 	console.log(e);
			 }
		},
        postData:getQueryModel(),
        loadComplete:function(data){
        	try {
				if(data.result == 1){
					currPage = data.data.page;
					wResize();
					
					$("#jqg_dataGrid_" + haveSelectId).prop("checked", true);
					
				}else{
					$.MsgBox('出错提示',data.desc);
				}
			} catch (e) {
				console.log(e);
			}
        }
      });	

}

//获取分页查询参数
function getQueryModel(){

	//清理之前的参数
	var postData = $("#dataGrid").jqGrid("getGridParam", "postData");
    $.each(postData, function (k, v) {
    	if(k == 'storageMode')
    		delete postData[k];
    	if(k == 'storageId')
    		delete postData[k];	
    });
    
    var model = {};
    model.groupId = gl_groupId;
    
    //***其它参数
    model.keyWord = $.trim($("#goodsNameKeyWord").val());
    model.selectTreeClassId = curr_goodsclass_tree_selectId ;
    model.status = 0;
    
	return model;
}

//重新加载刷新数据
function reLoadGrid(){
	var model = $("#dataGrid").jqGrid("getGridParam", "postData");
	var query = {};
	if(arguments.length == 1){
		query = arguments[0];
		$.extend(model,query);
	}
    
    //***其它参数
    model.keyWord = $.trim($("#goodsNameKeyWord").val());
    model.selectTreeClassId = curr_goodsclass_tree_selectId ;
    model.status = 0;
    
    $("#dataGrid").jqGrid('setGridParam',{  
        datatype:'json',  
        postData:model,
        page:1  
    }).trigger("reloadGrid"); //重新载入  
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

//多选设置
var haveSelectId = null;
function mulSelect(tag){
	if(arguments.length == 2){
		var query = arguments[1];
		haveSelectId = query.haveSelectId;
		reLoadGrid(query);
	}
	
	//显示隐藏按钮
	if(tag){
		$("#saveBt").show();
	}else{
		$("#saveBt").hide();
	}
}

//设置多选的属性
function setGridMultiboxonly(flag){
    $("#dataGrid").setGridParam({multiboxonly:flag})
}

//保存
function saveBtClick(){
	var ids=$('#dataGrid').jqGrid('getGridParam','selarrrow');
  var objs = [];
  $.each(ids,function(i,value){
  	objs.push($("#dataGrid").jqGrid('getRowData', value ));
  });
	try {
		parent.callBack(objs);
	} catch (e) {
		console.log(e);
	}
}
//取消引用
function cancleSelect(){
	parent.callBack([]);
}