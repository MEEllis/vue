
/*集团会计科目.js*/
$(function(){
	sectionModal();
	subModal();
});

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
$(document).on('change','.xjll',function(e){
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
		$('.sfsk').attr('checked',true);
		$('.pwd').removeAttr('disabled');
	}else{
		$('.sfsk').attr('checked',false);
		$('.pwd').attr({'disabled':'disabled','checked':false});
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







