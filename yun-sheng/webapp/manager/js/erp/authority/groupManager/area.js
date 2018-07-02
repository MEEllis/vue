
//数据访问对象
var areaDao = new Area(basePath);
var kong = {
	code:"",
	groupId:gl_groupId,
	name:"",
	parentId:"",
	remark:"",
	status:false
}
//初始化
$(function(){
	initTree();//初始化树
	initGrid();//初始化表格
	initEvents();//初始化事件
})

//窗口大小改变
function wResize(){
	$("#dataTree").height($(window).height()-230);
	$("#dataTree").width(200);
	$("#dataGrid").setGridHeight($(window).height()-250);
	$("#dataGrid").setGridWidth($(window).width()-290); 
	$("#dataGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
}

//初始化事件
function initEvents(){

	//模糊查询
    $("#areaKeyWord").bind('input propertychange', function() {  
    	reLoadGrid();
    });
    
    //查询参数 ：是否包含禁用状态
	$("#areaStatusCheckbox").change(function(){
		reLoadGrid();
	});
	
	//添加按钮点击事件
	$("#addBtn").click(function(){
		$(".codeAdd").next().html('');
		$(".nameAdd").next().html('');
		$(".codeUp").next().html('');
		$(".nameUp").next().html('');
		$('#addModalDialog').modal('show');
		if(curr_tree_selectId != ""){
			$('#addParentIdTree').combotree('setValue',curr_tree_selectId); 
		}
	});
	
	//修改按钮点击事件
	$("#eiditBtn").click(function(){
		$(".codeAdd").next().html('');
		$(".nameAdd").next().html('');
		$(".codeUp").next().html('');
		$(".nameUp").next().html('');
		var obj = getCurrRow();
		obj.status = obj.status == ""?"false":"true";
		if(obj != null){
			$('#eiditModalDialog').modal('show');
			$("#eiditModalDialog").writeJson2Dom(obj);
			$('#eiditParentIdTree').combotree('setValue',obj.parentId); 
		}else{
			$.MsgBox('提示消息','请选择要编辑的行'); 
		}
	});
	
	//删除按钮点击事件
	$("#delBtn").click(function(){
		
		//获取选择的行 多选
		var objs = getCurrRows();
		if(objs.length > 0){
			var ids = $.map(objs,function(obj){ return obj.id; })
			$.MsgBox('删除确认','是否确定删除',function(){
				areaDao.del(ids.join(","),function(data){
					if(data.result == 1){
						 $.MsgBox('提示消息','删除成功'); 
						 reLoadClassTree();reLoadGrid(currPage);
					}else{
						 $.MsgBox('提示消息',data.desc);
					}
				});
			},function(){});
		}else{
			$.MsgBox('提示消息','请选择要删除的行'); 
		}
	});
	
	//启用按钮点击事件
	$("#enabledBtn").click(function(){
		//获取选择的行 多选
		var objs = getCurrRows();
		if(objs.length > 0){
			var ids = $.map(objs,function(obj){ return obj.id; })
			$.MsgBox('启用确认','是否确定启用',function(){
				areaDao.enabled(ids.join(","),function(data){
					if(data.result == 1){
						 $.MsgBox('提示消息','启用成功'); 
						 reLoadGrid(currPage);
						    $('#eiditParentIdTree').combotree('reload');
						    $('#addParentIdTree').combotree('reload');
					}else{
						 $.MsgBox('提示消息',data.desc);
					}
				});
			},function(){});
		}else{
			$.MsgBox('提示消息','请选择要删除的行'); 
		}
	});
	
	//禁用按钮点击事件
	$("#disEnabledBtn").click(function(){
		//获取选择的行 多选
		var objs = getCurrRows();
		if(objs.length > 0){
			var ids = $.map(objs,function(obj){ return obj.id; })
			$.MsgBox('禁用确认','是否确定禁用',function(){
				areaDao.disEnabled(ids.join(","),function(data){
					if(data.result == 1){
						 $.MsgBox('提示消息','禁用成功'); 
						 reLoadGrid(currPage);
						    $('#eiditParentIdTree').combotree('reload');
						    $('#addParentIdTree').combotree('reload');
					}else{
						 $.MsgBox('提示消息',data.desc);
					}
				});
			},function(){});
		}else{
			$.MsgBox('提示消息','请选择要删除的行'); 
		}
	});
	
	//保存并添加
	$("#addBtnAndAdd").click(function(){
		var area = $('.codeAdd').val().trim(),
		na = $('.nameAdd').val().trim();
		if(area == ''){
			$(".codeAdd").next().html('必填!');
			return;
		}
		if(na == ''){
			$('.nameAdd').next().html('必填!');
			return;
		}
		areaDao.add(getAddFormData(),function(data){
			if(data.result == 1){
				 $.MsgBox('提示消息','保存成功'); 
				 //清空表单
				 $("#addModalDialog").writeJson2Dom(kong);
				 reLoadClassTree();reLoadGrid();
			}else{
				 $.MsgBox('提示消息',data.desc);
			}
		});
	});
	//保存并关闭
	$("#addBtnAndClose").click(function(){
		var area = $('.codeAdd').val().trim(),
		na = $('.nameAdd').val().trim();
		if(area == ''){
			$(".codeAdd").next().html('必填!');
			return;
		}
		if(na == ''){
			$('.nameAdd').next().html('必填!');
			return;
		}
		areaDao.add(getAddFormData(),function(data){
			if(data.result == 1){
				 $.MsgBox('提示消息','保存成功'); 
				 //清空表单
				 $("#addModalDialog").writeJson2Dom(kong);
				 $('#addModalDialog').modal('hide');
				 reLoadClassTree();reLoadGrid();
			}else{
				 $.MsgBox('提示消息',data.desc);
			}
		});
	});
	
	//保存
	$("#saveDataBtn").click(function(){
		var area = $('.codeUp').val().trim(),
			na = $('.nameUp').val().trim();
		if(area == ''){
			$(".codeUp").next().html('必填!');
			return;
		}
		if(na == ''){
			$('.nameUp').next().html('必填!');
			return;
		}
		areaDao.save(getSaveFormData(),function(data){
			if(data.result == 1){
				 $.MsgBox('提示消息','保存成功');
				 $('#eiditModalDialog').modal('hide');
				 reLoadClassTree();reLoadGrid(currPage);
			}else{
				 $.MsgBox('提示消息',data.desc);
			}
		});
	});
	
	$(".codeAdd").focus(function(e){
		$(this).next().html('');
	});
	$(".nameAdd").focus(function(e){
		$(this).next().html('');
	});
	$(".codeUp").focus(function(e){
		$(this).next().html('');
	});
	$(".nameUp").focus(function(e){
		$(this).next().html('');
	});
	
	//注册窗口改变事件
	$(window).resize(wResize);
	wResize();
}

//初始化树
var curr_tree_selectId = "";
function initTree(){
	//树设置参数
	var setting = {
		data: {//数据属性设置
			simpleData: {enable: true,idKey: "id",pIdKey: "pid",rootPId: null}
		},
        async: {//从后台获取数据
            enable: true,
            url: basePath+'/Tarea/findTree2',
            autoParam:[],
            dataFilter: null
        },
		callback: {//回调事件设置
			onClick: function(event, treeId, treeNode, msg) {
				if(treeNode.id != -1){
				    curr_tree_selectId = Number(treeNode.id);
				}else{
					curr_tree_selectId = "";
					
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
	function formatterDate(cellvalue, options, rowObject){
		var date = new Date();
		date.setTime(cellvalue);
		return $.DateFormat(date,"yyyy-MM-dd");// hh:mm:ss
	}
	$("#dataGrid").jqGrid({
		url: basePath + '/Tarea/page',
        datatype : "json",
        colNames : [ 'ID',  '区域编码', '区域名称', '所属上级区域', '所属上级区域','层级编码','上级层级编码','是否禁用','备注','新增人','新增人','新增时间','修改人','修改人','修改时间'],
        colModel : [ 
                     {name : 'id',index : 'id',align:'center',width:50,hidden: true},
                     {name : 'code',index : 'code',align:'left'}, 
                     {name : 'name',index : 'name',align:'left'}, 
                     {name : 'parentId',index : 'parentId',align:'left',hidden: true},
                     {name : 'parentName',index : 'parentName',align:'left'},
                     {name : 'layerCode',index : 'layerCode',align:'left',hidden: false},
                     {name : 'parentLayerCode',index : 'parentLayerCode',align:'left',hidden: true},
                     {name : 'status',index : 'status',align:'left',formatter:formatterStatus},
                     {name : 'remark',index : 'remark',align:'left'},
                     {name : 'createUid',index : 'createUid',hidden: true},
                     {name : 'createName',index : 'createName',hidden: false},
                     {name : 'createTime',index : 'createTime',hidden: false,formatter:formatterDate},
                     {name : 'updateUid',index : 'updateUid',hidden: true},
                     {name : 'updateName',index : 'updateName',hidden: false},
                     {name : 'updateTime',index : 'updateTime',hidden: false,formatter:formatterDate}
                   ],
        styleUI: 'Bootstrap',
        pager : '#jqGridPager',
        jsonReader: { root: "data.rows", total: "data.total",records: "data.records",repeatitems: false},
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
		ondblClickRow:function(){
			$("#eiditBtn").click();
		},
        postData:getQueryModel(),
        loadComplete:function(data){
        	try {
				if(data.result == 1){
					currPage = data.data.page;
					wResize();
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
var sortColumns ="LAYER_CODE";
function getQueryModel(){
	var postData = $("#dataGrid").jqGrid("getGridParam", "postData");
    $.each(postData, function (k, v) {
        delete postData[k];
    });
    var model = {};
    model.groupId = gl_groupId;

    //***其它参数
    model.keyWord = $.trim($("#areaKeyWord").val());
    model.selectTreeClassId = curr_tree_selectId ;
    model.sortColumns = sortColumns;
    model.haveDisEnableStatus = $('#areaStatusCheckbox').is(':checked')==true?1:0;
	return model;
}

//获取添加表单数据
function getAddFormData(){
	
	var obj = $("#addModalDialog").toJsonObject();
	obj.status = (obj.status == undefined?0:1);
	return obj;
}

//获取保存表单数据
function getSaveFormData(){
	var obj = $("#eiditModalDialog").toJsonObject();
	obj.status = (obj.status == undefined?0:1);
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
		$.MsgBox('操作提示','请只选中一行数据');
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

//重新加载数据
function reLoadGrid(page){
	page = _.isUndefined(page)?1:page;
    $("#dataGrid").jqGrid('setGridParam',{  
        datatype:'json',  
        postData:getQueryModel(),
        page:page  
    }).trigger("reloadGrid"); //重新载入  
}

//重新加载树
function reLoadClassTree(){
	var objTree = $.fn.zTree.getZTreeObj("dataTree");
    objTree.reAsyncChildNodes(null, "refresh"); 
    
    $('#eiditParentIdTree').combotree('reload');
    $('#addParentIdTree').combotree('reload');
    
}