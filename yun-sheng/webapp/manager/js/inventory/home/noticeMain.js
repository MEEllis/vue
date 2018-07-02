$(document).ready(function(){
	var um = UM.getEditor('editor');
//    	表格参数
	var option = {
    		LoadTableUrl: '/manager/inventory/notice/getNoticePageList',
    		TableName: "#dataGrid", //显示表格名称。遵照css选择器书写
    		pager: "#jqGridPager",
    		colNames : ['id','标题','发布人','发布时间','内容'], 
    		colModel : [
    		            {name:'id',index:'id',width:80,align:'center',hidden:true},
						{name:'title',index:'title', width:680,align:'left', sorttype:'string',sortable:false},
						{name:'createByName',index:'createByName', width:200,align:'center',sortable:false},
						{name:'createDateStr',index:'createDateStr', width:200,align:'center'},
						{name:'content',index:'content',width:80,align:'center',hidden:true},
	                ]       
    	};
    loadmodal(option);
		
//	查询
	$('.search').click(function(){
		var obj = {
			page: 1,
			rows: 100,
			noticeType: '0',
			queryKey: $(".keyWord").val()
		}
		$("#dataGrid").jqGrid("setGridParam",{
			datatype:'json',
			page: 1,
			postData: obj
		}).trigger("reloadGrid"); 
	});
		
	$('#add').click(function(){
		$('.ueInp').val("");
		$('.ueman').text('');
		um.setContent("");
		$('.ueSave').data('id','');
		$('#ueModal').modal('show');
	});
	
	$('.ueSave').click(function(){
		var t = $('.ueInp').val().trim();
		var v = um.getContent();
		var id = $(this).data('id');
		if(t == ""){
			$.zxsaas_plus.showalert('提示',"标题不能为空");
			return
		}
		if(v == ""){
			$.zxsaas_plus.showalert('提示',"内容不能为空");
			return
		}
		$.request({
			type: 'post',
			url: "/manager/inventory/notice/saveOrUpdateNotice/system_notice",
			data:{
				'noticeType': '0',
				'title': t,
				'content': v,
				'id': id
			},
			dataType: "json",
			success: function(data) {
				if(data.result == 1){
					$('.ueInp').val("");
					$('.ueman').text('');
					um.setContent("");
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
		var v = um.getContent();
		var t = $('.ueInp').val().trim();
		if(v !== "" || t !== ""){
			$.zxsaas_plus.showconfirm('提示',"当前已输入，是否确定关闭",function(){
				$('.ueInp').val("");
				um.setContent("");
				$('#ueModal').modal('hide');
			});
		}
	});
	
	$('#amend').click(function(){
		var ids = $("#dataGrid").jqGrid('getGridParam','selarrrow');
		var obj = $("#dataGrid").getRowData(ids);
		if(ids.length != 1){
			$.zxsaas_plus.showalert("提示","请选择一条需要修改的数据");
		}else{
			$('.ueInp').val(obj.title);
			$('.ueman').text(obj.createByName+'   '+obj.createDateStr);
			um.setContent(obj.content);
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
				url: "/manager/inventory/notice/deleteNotice/system_notice",
				data:{
					'noticeType': '0',
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

function getInfo(id){
	$.ajax({
		url:"/manager/inventory/notice/getNoticeInfo",
		type : 'POST',  
		dataType: "json",
		data: {id: id,noticeType:'0'},
		success:function(data){
		   if(data.result==1){
			   var vo = data.data.noticeVo;
			   $('.newTitle').text(vo.title);
			   $('.newMan').text(vo.createByName);
			   $('.newTime').text(vo.createDateStr);
			   $('.newBox').html(vo.content);
		   }else{
           		$.zxsaas_plus.showalert('error', data.desc);
           }
	   	},
	   	error: function(){
	   		$.zxsaas_plus.showalert('error', data.desc);
	   	}
	});
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
			root: "data.noticeVoList",
			total: "data.total",
			records: "data.records",
			repeatitems: false
		},
		postData:{noticeType: '0'},
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
		onCellSelect: function(rowid,iCol,cellcontent,e) {
			var data = $(e.currentTarget).getRowData(rowid);
			if (iCol == 3) {
				$("#newModal").modal('show');
				getInfo(rowid)
			}
		}
	})
}
