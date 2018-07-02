$(document).ready(function(){
	var um = UM.getEditor('editor');
//    	表格参数
	var option = {
    		LoadTableUrl: '/manager/versionUpdate/getVersionUpdateList',
    		TableName: "#dataGrid", //显示表格名称。遵照css选择器书写
    		pager: "#jqGridPager",
    		colNames : ['id','版本编号','版本名称','更新地址','创建时间','更新内容','APP类型'], 
    		colModel : [
    		            {name:'id',index:'id',width:80,align:'center',hidden:true},
						{name:'versionCode',index:'versionCode', width:100,align:'center', sorttype:'string',sortable:false},
						{name:'versionName',index:'versionName', width:100,align:'center',sorttype:'string',sortable:false},
						{name:'url',index:'url',width:500,align:'left'},
						{name:'createDateString',index:'createDateString', width:200,align:'center'},
						{name:'content',index:'content',width:80,align:'center',hidden:true},
						{name:'type',index:'type',width:100,align:'center',formatter:function(cellvalue, options, rowObject){
							var nameValue="";
							if(cellvalue==0){
								nameValue="BOSS_APP";
							}else{
								nameValue=" "
							}
							return nameValue;
						}},
	                ]       
    	};
    loadmodal(option);
		
//	查询
	$('.search').click(function(){
		var obj = {
			page: 1,
			rows: 100,
			//noticeType: '0',
			versionName: $(".versionName").val(),
			versionCode:$(".versionCode").val(),
			type:$("#appType").val()
		}
		$("#dataGrid").jqGrid("setGridParam",{
			datatype:'json',
			page: 1,
			postData: obj
		}).trigger("reloadGrid"); 
	});
		
	$('#add').click(function(){
		$('#versionCode').val("");
		$('#versionName').val("");
		$('#appUrl').val("");
		$('#appType').val("");
		$('#appContent').val("");
		$('.ueSave').data('id','');
		$('#ueModal').modal('show');
	});
	
	$('.ueSave').click(function(){
		var t = $('#versionCode').val().trim();
		var versionName=$('#versionName').val().trim();
		var appUrl=$('#appUrl').val().trim();
		var appType=$('#appTypes').val().trim();
		var v = $("#appContent").val().trim();
		var id = $(this).data('id');
		if(t == ""){
			$.zxsaas_plus.showalert('提示',"版本编号不能为空");
			return
		}
		
		if(versionName == ""){
			$.zxsaas_plus.showalert('提示',"版本名称不能为空");
			return
		}
		if(appUrl == ""){
			$.zxsaas_plus.showalert('提示',"APP地址不能为空");
			return
		}
		if(appType == ""){
			$.zxsaas_plus.showalert('提示',"版本类型不能为空");
			return
		}
		if(v == ""){
			$.zxsaas_plus.showalert('提示',"内容不能为空");
			return
		}
		$.request({
			type: 'post',
			url: "/manager/versionUpdate/versionSave",
			data:{
				'type': appType,
				'versionName': versionName,
				'content': v,
				'url' :appUrl,
				'versionCode' :t,
				'id':id
			},
			dataType: "json",
			success: function(data) {
				if(data.result == 1){
					$('#versionName').val("");
					$('#versionName').val("");
					$('#appUrl').val("");
					$('#appType').val("");
					$('#appContent').val("");
					$('.ueSave').data('id','');
					$('#ueModal').modal('hide');
					$("#dataGrid").trigger('reloadGrid');
					$.zxsaas_plus.showalert('提示','操作成功');
				}else{
					$.zxsaas_plus.showalert('error',data.desc);
				}
			},
		   	error: function(){
		   		$.zxsaas_plus.showalert('error', data.desc);
		   	}
		});
	});
	
	$('.uedel').click(function(){
		//var v = um.getContent();
		var t = $('#versionCode').val().trim();
		var versionName=$('#versionName').val().trim();
		var appUrl=$('#appUrl').val().trim();
		var appType=$('#appTypes').val();
		var appContent=$('#appContent').val();
		if(appContent !== "" || t !== "" || versionName!=="" || appUrl !==""){
			$.zxsaas_plus.showconfirm('提示',"当前已输入，是否确定关闭",function(){
				$('#versionCode').val('');
				$('#versionName').val('');
				$('#appUrl').val('');
				$('#appType').val('');
				$('#appContent').val('');
				//um.setContent("");
				$('#ueModal').modal('hide');
			});
		}
		$('#ueModal').modal('hide');
	});
	
	$('#amend').click(function(){
		var ids = $("#dataGrid").jqGrid('getGridParam','selarrrow');
		var obj = $("#dataGrid").getRowData(ids);
		if(ids.length != 1){
			$.zxsaas_plus.showalert("提示","请选择一条需要修改的数据");
		}else{
			$('#versionCode').val(obj.versionCode);
			$('#versionName').val(obj.versionName);
			$('#appUrl').val(obj.url);
			var valu;
			if(obj.type =='BOSS_APP'){
				valu ="0";
			}
			$("#appTypes").find("option[value = '"+valu+"']").attr("selected","selected");
			$('#appContent').val(obj.content);
			$('.ueSave').data('id',obj.id);
			$('#ueModal').modal('show');
		}
	});
	
	$('#delete').click(function(){
		var ids = $("#dataGrid").jqGrid('getGridParam','selarrrow');
		if(ids.length < 1){
			$.zxsaas_plus.showalert("提示","请选择需要的数据");
		}else{
			$.request({
				type: 'post',
				url: "/manager/versionUpdate/deleteBossAppVersion",
				data:{
					'id': ids.join(','),
				},
				dataType: "json",
				success: function(data) {
					if(data.result == 1){
						$.zxsaas_plus.showalert('提示','删除成功');
						$("#dataGrid").trigger('reloadGrid');
					}else{
						$.zxsaas_plus.showalert('error',data.desc);
					}
				},
			   	error: function(){
			   		$.zxsaas_plus.showalert('error', data.desc);
			   	}
			});
		}
	});
	
});
    
function loadmodal(options) {
	$.jgrid.defaults.width = 1280;
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';

	$(options.TableName).jqGrid({
		url: options.LoadTableUrl,
		mtype: "GET",
		datatype: "json",
		jsonReader: {
			root: "data.versionlist.result",
			total: "data.total",
			records: "data.records",
			repeatitems: false
		},
		//postData:{noticeType: '0'},
		colNames: options.colNames,
		colModel: options.colModel,
		sortable: false,
		multiselect : true,	//复选框属性
		rownumbers:true,	//显示行号
		rowNum: 100,
		rowList: [100, 200, 500],
		pager: options.pager,
		viewrecords: true,
		cellEdit:true,
		width: "100%",
		height: $(window).height() * 0.6,
		autowidth: true,
		rownumWidth: 35, // the width of the row numbers columns
		shrinkToFit: false, //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
	})
}
