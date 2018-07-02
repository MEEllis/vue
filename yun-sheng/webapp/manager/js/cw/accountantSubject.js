
/*公司会计科目.js*/
$(function(){
	sectionModal();
	subModal();
});
var lastcell="",lastrow="";
/*主页科目树*/
function sectionModal(){
	var setting = {  
        data: {
			simpleData: {enable: true,idKey: "id",pIdKey: "pId",rootPId: null}
		},
		callback: {
			onCheck:zTreeOnCheck
		},
		view: {
			showIcon: false
		}
    }; 
	function zTreeOnCheck(event, treeId, treeNode) {
		 $.ajax({
	    	url:'' + treeNode.id,
	    	type:'GET',
	    	dataType:'JSON',
	    	contentType:'application/json;charset=utf-8',
	    	async:false,
	    	success:function(data){
	    		$('#jqGrid_subject').jqGrid('clearGridData');
//	    		for(var i = 0,len = data.data.contactsunitList.length;i<len;i ++){
//	    			$('#jqGrid_subject').jqGrid('addRowData',i,data.data.contactsunitList[i],'last');
//	    		}
		    }
	    });
	}; 
	 $.ajax({
            type: 'Get',
            url: '../../json/cw/accountSub.json',
            dataType: "json",
            success: function (data) {
                $.fn.zTree.init($('#subjectTree'), setting, data);
                var zTree = $.fn.zTree.getZTreeObj('subjectTree');
                zTree.expandAll(true);//展开全部节点
            },
            error: function (msg) {
                alert(" 数据加载失败！" + msg);
            }
        });
};

/*主表*/
function subModal(){
	var options = {
		LoadBtnUrl: "../../json/button.json", 
		LoadTableUrl: '../../json/cw/startBalance.json',
		TableName: '#jqGrid_subject',
		pager:'#jqGridPager_subject'
	};
		
	$.jgrid.defaults.width = 1280;
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';	
	var lastsel='';//最后一次选中的行
	var rightClickColid="";//右键列id
	var rightClickColIndex=0;//右键index
	var mydata;
	var hid=false;
	var lock=false;
	var myobj=[];
	var colNames = ['ID','科目编码','科目名称','级次','科目类型','余额方向','辅助项','使用状态','是否停用'];
	var JqGridColModel=[
						{name:'id',index:'id', width:100,align:'center', sorttype:'string',hidden:true},
						{name:'code',index:'code', width:200,align:'center', sorttype:'string',sortable:false},
						{name:'name',index:'name', width:200,align:'center', sorttype:'string',sortable:false},
						{name:'levev',index:'levev', width:100,align:'center', sorttype:'string',sortable:false},
						{name:'clazz',index:'clazz', width:200,align:'center', sorttype:'string',sortable:false},
						{name:'direction',index:'direction', width:100,align:'center', sorttype:"string",sortable:false},
						{name:'assist',index:'assist', width:200,align:'center', sorttype:"string",sortable:false},
						{name:'state',index:'state', width:100,align:'center', sorttype:"string",sortable:false},
						{name:'stop',index:'stop', width:100,align:'center', sorttype:'float',formatter:'select', editoptions:{value:"0:否;1:是"},sortable:false}
	                ];
		
	$(options.TableName).jqGrid({
		url:options.LoadTableUrl,
		mtype:"GET",
		datatype: "json",
		jsonReader  : {	
				root: "rows",
				repeatitems: false,
				page:'data.page',
				total:'data.pageCount',
				records:'data.totalCount'
					},
		colNames:colNames,          
        colModel:JqGridColModel,
        sortable:false,			            
        rownumbers:true,
        rowNum: 50,
        rowList: [50, 100, 200],
        pager:options.pager,
        viewrecords: true,
        multiselect:true,
        width: "100%" ,
        height: $(window).height()*0.65,
		autowidth:true,
		rownumWidth: 35, 
		shrinkToFit:false,
		ondblClickRow:function(){
			
		},
		beforeSelectRow:function(rowid,e){
//	       	$(options.TableName).jqGrid('resetSelection');//设置单选  只能选中一行
//	       	return(true);
      	},
      	beforeEditCell:function(rowid,cellname,v,iRow,iCol){
			lastrow = iRow;
			lastcell = iCol;
		},
		loadComplete:function(data){
			$(options.TableName).jqGrid('setLabel',0, '序号');
			
		}
	})
		
};

/*科目 新增 &&修改*/
$(document).on('click','.add,.update',function(e){
	if($(this).html() == '新增'){
		$('.clear').val('');
		$('input:checkbox').removeAttr('checked');
		
	}else{
		var ids = $('#jqGrid_subject').jqGrid('getGridParam','selarrrow');
		if(ids.length != 1){
			$.zxsaas_plus.showalert("错误","一次只能修改一条信息!");
			return false;
		}else{
			var rData = $('#jqGrid_subject').jqGrid('getRowData',ids);
			//填充数据
			$('.subjectCode').val(rData.code);
			$('.subjectName').val(rData.name);
			$('.subjectNo').val(rData.levev);
			$('.clazzSel option[value="' + rData.clazz + '"]').attr('select','selected');
			$('.dirSel option[value="' + rData.direction + '"]').attr('select','selected');
			
		}
		
	}
	$('#subjectModal').modal('show');
});

/*科目新增弹窗操作*/
//科目编码事件
$(document).on('blur','.subjectCode',function(e){
	var subjectName = $(this).val();
	if(subjectName.trim().length < 4){
		$('.clazzSel').removeAttr('disabled');
		$('.dirSel').removeAttr('disabled');
		
	}else{
		$('.clazzSel').attr('disabled','disabled');
		$('.dirSel').attr('disabled','disabled');
		//通过编码查询信息
		$.ajax({
			url : '' + subjectName.trim(),
			type : 'GET',
			dataType : 'JSON',
			contentType : 'application/json;charset=utf-8',
			success : function(data){
				//科目类型  余额方向  上级科目  辅助核算项 均继承父级
//				$('.clazzSel option[value="' + data.clazz + '"]').attr('select','selected');//科目类型
//				$('.dirSel option[value="' + data.direction + '"]').attr('select','selected');//余额方向
//				$('.parentSubInfo').html(data.parent);//上级科目
				
			}
		});
	}
});
//数量核算
$(document).on('change','.sjhs',function(e){
	$(this).is(':checked') ? $('.jldw').removeAttr('disabled') : $('.jldw').attr('disabled','disabled');
	$('.jldw').val('');
});
//是否受控科目
$(document).on('change','.sfsk',function(e){
	$(this).is(':checked') ? $('.pwd').removeAttr('disabled') : $('.pwd').attr('disabled','disabled');
	$('.pwd').attr('checked',false);
});
//辅助核算项
$(document).on('click','.hesuan',function(e){
	var hesuan = $('.hesuan'),count = 0;
	$.each(hesuan, function() {
		arguments[1].checked && count ++;
	});
	if(count){
		//$('.sfsk').attr('checked',true);
		$('.sfsk').removeAttr('disabled');
	}else{
		//$('.sfsk').attr('checked',false);
		$('.sfsk').attr({'disabled':'disabled','checked':false});
	}
});

/*科目 保存*/
$(document).on('click','.save',function(e){
	checkInput();//验证
	//保存操作
	
});

//检查输入
var checkInput = function(){
	var subjectCode = $('.subjectCode').val();
	var subjectName = $('.subjectName').val();
	var clazzSel = $('.clazzSel').val();
	var dirSel = $('.dirSel').val();
	if(subjectCode.trim() == '' || subjectName.trim() == '' || clazzSel == '' || dirSel == '' || clazzSel == null || dirSel == null){
		$.zxsaas_plus.showalert("错误","请完善资料!");
		return false;
	}
};

/*停用*/
$(document).on('click','.stop',function(e){
	var ids = $('#jqGrid_subject').jqGrid('getGridParam','selarrrow');
	$.each(ids,function(){
		var id = arguments[1];//通过id停用
		//调用停用接口
		
	});
});

/*删除*/
$(document).on('click','.delete',function(e){
	var ids = $('#jqGrid_subject').jqGrid('getGridParam','selarrrow');
	if(ids.length == 0){
		$.zxsaas_plus.showalert("错误","请选择需要删除的行!");
		return false;
	}else{
		$.zxsaas_plus.showconfirm("","是否确定删除选中数据?",function(){
			for(var i = 0,len = ids.length;i < len; i ++){
				$('#jqGrid_subject').jqGrid('delRowData',ids[0]);
				//调用接口  删除
				
			}
		},function(){
		
		});
	}
});

/*集团引用*/
$(document).on('click','.groupIntroduce',function(e){
	$("#groupModalGrid").trigger("reloadGrid");
	$('#groupRemCode').val('');
	$('#groupModal').modal('show');
	
	var setting = {  
        data: {
			simpleData: {enable: true,idKey: "id",pIdKey: "pId",rootPId: null}
		},
		callback: {
			onClick: zTreeOnClick
		},
		view: {
			showIcon: false
		}
    }; 
	//点击树节点查询
	function zTreeOnClick(event, treeId, treeNode) {
	   
	    $.ajax({
	    	url:'' + treeNode.id,
	    	type:'GET',
	    	dataType:'JSON',
	    	contentType:'application/json;charset=utf-8',
	    	async:false,
	    	success:function(data){
	    		$('#groupModalGrid').jqGrid('clearGridData');
//	    		for(var i = 0,len = data.data.contactsunitList.length;i<len;i ++){
//	    			$('#groupModalGrid').jqGrid('addRowData',i,data.data.contactsunitList[i],'last');
//	    		}
		    }
	    });
	};
	 $.ajax({
            type: 'Get',
            url: '../../json/cw/accountSub.json',
            dataType: "json",
            success: function (data) {
                $.fn.zTree.init($('#groupTreeData'), setting, data);
                var zTree = $.fn.zTree.getZTreeObj('groupTreeData');
                zTree.expandAll(true);//展开全部节点
            },
            error: function (msg) {
                alert(" 数据加载失败！" + msg);
            }
        });
        
    //加载表格
	var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl: '../../json/cw/unit.json',
		TableName: "#groupModalGrid", 
		pager:"#groupGridpager"
		};
			$.jgrid.defaults.width = 1280;
			$.jgrid.defaults.responsive = true;
			$.jgrid.defaults.styleUI = 'Bootstrap';	
			var lastsel='';//最后一次选中的行
			var rightClickColid="";//右键列id
			var rightClickColIndex=0;//右键index
			var mydata;
			var hid=false;
			var lock=false;
			var myobj=[];
			var colNames = ['ID','公司ID','级次','科目编码','科目名称','科目类型','余额方向'];
			var JqGridColModel=[
								{name:'id',index:'id', width:55,align:'center', sorttype:'string',hidden:true},
								{name:'companyId',index:'companyId', width:55,align:'center', sorttype:'string',hidden:true},
								{name:'jc',index:'jc', width:100,align:'center', sorttype:'string',sortable:false},
								{name:'code',index:'code', width:100,align:'center', sorttype:'string',sortable:false},
								{name:'name',index:'name', width:100,align:'center', sorttype:'string',sortable:false},
								{name:'clazz',index:'clazz', width:100,align:'center', sorttype:'string',sortable:false},
								{name:'direction',index:'direction', width:100,align:'center', sorttype:'string',sortable:false}
			                ];
			
			$(options.TableName).jqGrid({
				url:options.LoadTableUrl,
				mtype:"GET",
				datatype: "json",
				jsonReader  : {	
						root: "data.contactsunitList",
						repeatitems: false,
						page:'data.page',
						total:'data.pageCount',
						records:'data.totalCount'
							},
				colNames:colNames,          
	            colModel:JqGridColModel,
	            sortable:false,			            
	            rownumbers:true,
	            rowNum: 30,
	            rowList: [50, 100, 200],
	            pager:options.pager,
	            viewrecords: true,	
	            multiselect:true,
	            width: "100%" ,
	            height: $(window).height()*0.54,
				autowidth:true,
				rownumWidth: 35,
				shrinkToFit:false, 
				ondblClickRow:function(){
					var clickData = $(options.TableName).jqGrid('getRowData',arguments[0]);
					var clickId = clickData.id,
						clickName = clickData.name;
				},
				beforeEditCell:function(rowid,cellname,v,iRow,iCol){
					lastrow = iRow;
					lastcell = iCol;
				},
				loadComplete:function(data){
					$(options.TableName).jqGrid('setLabel',0, '序号');
					
				}
			})
});

/*集团引用参照  保存*/
$(document).on('click','.saveSub',function(e){
	//获取选中行
	var ids = $('#groupModalGrid').jqGrid('getGridParam','selarrrow'),
		subCode = [],
		subName = [];
	$.each(ids, function() {
		var rData = $('#groupModalGrid').jqGrid('getRowData',arguments[1]);//获取每行数据
		subCode.push(rData.code);
		subName.push(rData.name);
	});
	//调接口
	
	$('#subjectModal').modal('hide');
});

/*集团引用参照搜索*/
$(document).on('keyup','#groupRemCode',function(){
	$.ajax({
		url:'' + $(this).val(),
		type:'GET',
	 	dataType:'json',
	 	contentType:'application/json;charset=utf-8',
		success:function(data){
			var sData = data.data.xx;
			$('#groupModalGrid').jqGrid('clearGridData');
			if(sData.length == 0){
				$.zxsaas_plus.showalert("错误","没有匹配的数据!")
			}else{
				for(var i = 0,len = sData.length;i<len;i ++){
					$('#groupModalGrid').jqGrid('addRowData',i,sData[i],'last');
				}
			}
		}
	});
});

/*科目对照*/
$(document).on('click','.subjectContrast',function(e){
	var d = new Date();
	var year = d.getFullYear();
	subComparison('../../json/cw/ciqiong.json','#jqGrid_subComparison','jqGridPager_subComparison',true,(year - 1));//前一年
	subComparison('../../json/cw/ciqiong.json','#jqGrid_subComparisonRight','jqGridPager_subComparisonRight',false,year);//本年
	$('#subComparisonModal').modal('show');
});

/*科目对照 弹窗*/
function subComparison(url,tName,tPage,flag,year){
	var options = {
		LoadBtnUrl: "../../json/button.json", 
		LoadTableUrl: url,
		TableName: tName, 
		pager:tPage,
		};
		$.jgrid.defaults.width = 1280;
		$.jgrid.defaults.responsive = true;
		$.jgrid.defaults.styleUI = 'Bootstrap';	
		var lastsel='';
		var mydata;
		var hid=false;
		var lock=false;
		var myobj=[];
		var colNames = ['ID','科目编码','科目名称'];
		var JqGridColModel = [];
		var JqGridColModelOld=[
							{name:'id',index:'id', width:200,align:'center', sorttype:'int',hidden:true,sortable:false},
							{name:'subjectCode',index:'subjectCode', width:200,align:'center', sorttype:'string',editable:false,sortable:false},
							{name:'subjectName',index:'subjectName', width:200,align:'center', sorttype:'string',editable:false,sortable:false},
		                ];
		var JqGridColModelNew=[
							{name:'id',index:'id', width:200,align:'center', sorttype:'int',hidden:true,sortable:false},
							{name:'subjectCode',index:'subjectCode', width:200,align:'center', sorttype:'string',editable:true,sortable:false,editoptions:{dataEvents:[{type:"blur",fn:searchByCode}]}},
							{name:'subjectName',index:'subjectName', width:200,align:'center', sorttype:'string',editable:true,edittype:'custom',sortable:false,editoptions:{
									custom_element:function(value,options){
									 var html='<input type="text" class="form-control unitInput" style="border:0;text-align:center;width:96%;" value="' + value +'" /><span style="float:right;margin-top:-27px;margin-right:20px;" class="glyphicon glyphicon-plus" onclick="subChooseModal(this);" data-toggle="modal" data-target="" data-rId="' + options.rowId +'"></span>';
									 return $(html);
								},
									custom_value:function(value){
										return value.val();
									}
							}},
		                ];
		JqGridColModel = flag ? JqGridColModelOld : JqGridColModelNew;
	$(options.TableName).jqGrid({
		url:options.LoadTableUrl,
		mtype:"GET",
		datatype: "json",
		//datatype: "local",
		jsonReader  : {	
				root: "rows",
				repeatitems: false
					},
		colNames:colNames,          
        colModel:JqGridColModel,
        sortable:false,			            
        rownumbers:flag,
        cellsubmit: 'clientArray',//单元格保存内容的位置		
        editurl: 'clientArray',
        viewrecords: true,		           
       	cellEdit:!flag,
       	rowNum:10000000,
        width: "100%" ,
        height: $(window).height()*0.55,
		autowidth:true,
		rownumWidth: 35, 
		shrinkToFit:false, 
		beforeEditCell:function(rowid,cellname,v,iRow,iCol){
			lastrow = iRow;
			lastcell = iCol;
		},
		loadComplete:function(data){
			$(options.TableName).jqGrid('setLabel',0, '序号');
			/*设置二级表头哦*/
			$(options.TableName).jqGrid('setGroupHeaders', {
			    useColSpanStyle: true, 
			    groupHeaders:[
			    	{startColumnName: 'subjectCode', numberOfColumns: 2, titleText: '<em>' + year + '</em>'}
				    ]  
				  });
			}
			})
}


/*科目 参照*/
var lNum = '';
function subChooseModal(t){
	$("#unitModalGrid").trigger("reloadGrid");
	$('#subSearch').val('');
	lNum = $(t).data('rid');
	$('#subjectDirModal').modal('show');
	var setting = {  
        data: {
			simpleData: {enable: true,idKey: "id",pIdKey: "pId",rootPId: null}
		},
		callback: {
			onClick: zTreeOnClick
		},
		view: {
			showIcon: false
		}
    }; 
	//点击树节点查询
	function zTreeOnClick(event, treeId, treeNode) {
	   
	    $.ajax({
	    	url:'' + treeNode.id,
	    	type:'GET',
	    	dataType:'JSON',
	    	contentType:'application/json;charset=utf-8',
	    	async:false,
	    	success:function(data){
	    		$('#groupModalGrid').jqGrid('clearGridData');
//	    		for(var i = 0,len = data.data.contactsunitList.length;i<len;i ++){
//	    			$('#groupModalGrid').jqGrid('addRowData',i,data.data.contactsunitList[i],'last');
//	    		}
		    }
	    });
	};
	 $.ajax({
            type: 'Get',
            url: '../../json/cw/accountSub.json',
            dataType: "json",
            success: function (data) {
                $.fn.zTree.init($('#groupTreeData2'), setting, data);
                var zTree = $.fn.zTree.getZTreeObj('groupTreeData2');
                zTree.expandAll(true);//展开全部节点
            },
            error: function (msg) {
                alert(" 数据加载失败！" + msg);
            }
        });
	var options = {
			LoadBtnUrl: "../../json/button.json",
			LoadTableUrl: '../../json/cw/unit.json',
			TableName: "#unitModalGrid", 
			pager:"#unitGridpager"
			};
			$.jgrid.defaults.width = 1280;
			$.jgrid.defaults.responsive = true;
			$.jgrid.defaults.styleUI = 'Bootstrap';	
			var lastsel='';//最后一次选中的行
			var mydata;
			var hid=false;
			var lock=false;
			var myobj=[];
			var colNames = ['ID','公司ID','级次','科目编码','科目名称','科目类型','余额方向'];
			var JqGridColModel=[
								{name:'id',index:'id', width:55,align:'center', sorttype:'string',hidden:true},
								{name:'companyId',index:'companyId', width:55,align:'center', sorttype:'string',hidden:true},
								{name:'jc',index:'jc', width:100,align:'center', sorttype:'string',sortable:false},
								{name:'code',index:'code', width:100,align:'center', sorttype:'string',sortable:false},
								{name:'name',index:'name', width:100,align:'center', sorttype:'string',sortable:false},
								{name:'clazz',index:'clazz', width:100,align:'center', sorttype:'string',sortable:false},
								{name:'direction',index:'direction', width:100,align:'center', sorttype:'string',sortable:false}
			                ];
			
			console.log(lNum)
			$(options.TableName).jqGrid({
				url:options.LoadTableUrl,
				mtype:"GET",
				datatype: "json",
				jsonReader  : {	
						root: "data.contactsunitList",
						repeatitems: false,
						page:'data.page',
						total:'data.pageCount',
						records:'data.totalCount'
							},
				colNames:colNames,          
	            colModel:JqGridColModel,
	            sortable:false,			            
	            rownumbers:true,
	            rowNum: 10,
	            rowList: [50, 100, 200],
	            pager:options.pager,
	            viewrecords: true,	
//	            multiselect:true,
	            width: "100%" ,
	            height: $(window).height()*0.54,
				autowidth:true,
				rownumWidth: 35,
				shrinkToFit:false, 
				ondblClickRow:function(){
					var clickData = $(options.TableName).jqGrid('getRowData',arguments[0]);
					var clickId = clickData.id,
						clickName = clickData.name,
						clickCode = clickData.code;
					$('#jqGrid_subComparisonRight').jqGrid('saveCell',lastrow,lastcell);
					$('#jqGrid_subComparisonRight').jqGrid('setCell',lNum,'subjectCode',clickCode);
					$('#jqGrid_subComparisonRight').jqGrid('setCell',lNum,'subjectName',clickName);
					$('#subjectDirModal').modal('hide');
				},
				beforeEditCell:function(rowid,cellname,v,iRow,iCol){
					lastrow = iRow;
					lastcell = iCol;
				},
				loadComplete:function(data){
					$(options.TableName).jqGrid('setLabel',0, '序号');
					
				}
			})
}

/*科目参照搜索*/
$(document).on('keyup','#subSearch',function(){
	$.ajax({
		url:'' + $(this).val(),
		type:'GET',
	 	dataType:'json',
	 	contentType:'application/json;charset=utf-8',
		success:function(data){
			console.log(data);
			var sData = data.data.contactsunitList;
			$('#unitModalGrid').jqGrid('clearGridData');
			if(sData.length == 0){
				$.zxsaas_plus.showalert("错误","没有匹配的数据!");
			}else{
				for(var i = 0,len = sData.length;i<len;i ++){
					$('#unitModalGrid').jqGrid('addRowData',i,sData[i],'last');
				}
			}
		}
	});
});

/*科目对照弹窗 科目编码搜索*/
var searchByCode = function(){
	$.ajax({
		url:"" + $(this).val(),
		type:"get",
		dataType:'JSON',
		contentType:'application/json;charset=utf-8',
		success:function(data){
			if(!true){//有数据
				$('#jqGrid_subComparisonRight').jqGrid('saveCell',lastrow,lastcell);
				$('#jqGrid_subComparisonRight').jqGrid('setCell',$(this).attr('rowid'),'subjectCode',clickCode);
				$('#jqGrid_subComparisonRight').jqGrid('setCell',$(this).attr('rowid'),'subjectName',clickName);
			}else{
				$.zxsaas_plus.showalert("错误","没有匹配的数据!");
			}
			
		}
	});
}

/*差异科目*/
$(document).on('click','.subDiff',function(e){
	var d = new Date();
	var year = d.getFullYear();
	subComparison('../../json/cw/ciqiong.json','#jqGrid_subDiff','jqGridPager_subDiff',true,(year - 1));//前一年
	subComparison('../../json/cw/ciqiong.json','#jqGrid_subDiffRight','jqGridPager_subDiffRight',false,year);//本年
	$('#jqGrid_subDiffRight').jqGrid('setGridParam',{'cellEdit':false});
	$('#subDiffModal').modal('show');
	
});

/*科目信息*/
$(document).on('click','.subInfo',function(e){
	var id = $('#jqGrid_subDiffRight').jqGrid('getGridParam','selrow');
	if(id.length == 0){
		$.zxsaas_plus.showalert("错误","请选择需要删除的行!");
		return false;
	}else{
		//调用接口查询选中行详情  渲染页面数据
		
		
		$('.clear').attr('disabled',true);
		$('.save').attr('disabled',true);
		$('.saveAndAdd').attr('disabled',true);
		$('#subjectModal').modal('show');
		
	}
	
});


