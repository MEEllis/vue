/**
 * 仓库名称选择
 */

function initStorageName(depName){
		var setting = {  
	        data: {
				simpleData: {
					enable: true,
					idKey: "id",
					pIdKey: "pId",
					rootPId: null
				}
			},
			callback:{ beforeDblClick:storagezTree
			},
			view: {
				showIcon: false
			}
	    }; 
		
		 $.ajax({
	            type: 'Get',
	            url: basePath + '/jxc/storage/authorityAndTree/findIstorageTree',
	            data:{sectionId:$('#'+depName).val()},
	            dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
	            success: function (data) {
	                $.fn.zTree.init($("#ckmcDataTree"), setting, data);
//	                var str = $('#ckmcDataTree_1_switch').attr('class');
//	                //console.log(str); //button level0 switch roots_close
//	                var Class = str.replace('roots','center');
//	                $('#ckmcDataTree_1_switch').attr('class',Class);
	                
	                var zTree = $.fn.zTree.getZTreeObj("ckmcDataTree");
                	zTree.expandAll(true);//展开全部节点
	            },
	            error: function (msg) {
	                alert(" 数据加载失败！" + msg);
	            }
	        });
}
//仓库名称
function ckmcCheck(cellvalue, options, rowObject){
//				console.log(rowObject);
	return '<span class="ckmcCheck" data-dismiss="modal">' + cellvalue + '</span>';
};

$(document).on('click','.ckmcCheck',function(e){
//			console.log($(this).html() + '....' + rowId)
	$("#jqGrid_SubjectBalance").jqGrid('setCell', rowId, 'ckmc', $(this).html());
});




/***tree 仓库***/	
function storagezTree(event, treeId, treeNode) {
	if(treeId.obj == null) return false;
	if(num == '7' || num == '8' || num == '10' || num == '14'){
		$("#jqGrid_SubjectBalance").jqGrid("saveCell",lastrow,lastcell);
		$("#jqGrid_SubjectBalance").jqGrid('setCell',jqgridRowId,'storageName',treeId.name); 
		$("#jqGrid_SubjectBalance").jqGrid('setCell',jqgridRowId,'storageId',treeId.id); 
		$('#ckmcChoose').modal('hide');
		findStockNumber();
	}else if(num == '9' || num == '12'){
		$("#jqGrid_SubjectBalance").jqGrid("saveCell",lastrow,lastcell);
		$("#jqGrid_SubjectBalance").jqGrid('setCell',jqgridRowId,'storageName',treeId.name); 
		$("#jqGrid_SubjectBalance").jqGrid('setCell',jqgridRowId,'storageId',treeId.id); 
		$('#ckmcChoose').modal('hide');
	}else if(num == '44'){
		switch (tabNum) {
		case 1:
			$("#jqGrid_ImeiAdjust").jqGrid("saveCell",lastrow2,lastcell2);
			$("#jqGrid_ImeiAdjust").jqGrid('setCell',jqgridRowId,'storageName',treeId.name); 
			$("#jqGrid_ImeiAdjust").jqGrid('setCell',jqgridRowId,'storageId',treeId.id); 
			findStockNumber1();
			break;
		case 0:
			$("#jqGrid_SubjectBalance").jqGrid("saveCell",lastrow,lastcell);
			$("#jqGrid_SubjectBalance").jqGrid('setCell',jqgridRowId,'storageName',treeId.name); 
			$("#jqGrid_SubjectBalance").jqGrid('setCell',jqgridRowId,'storageId',treeId.id);
			findStockNumber();
			break;
		default:
			break;
		}
		$('#ckmcChoose').modal('hide');
	}
}
 
function showStorage(id){
	jqgridRowId = id;
	switch (num) {
	case '7':
		if($('#outDepartmentId').val() != ''){
			$('#ckmcChoose').modal('show');
			initStorageName('outDepartmentId');
		}else{
			$.zxsaas_plus.showalert("提示信息","请选择部门!");
		}
		break;
	case '8':
		if($('#outDepartmentId').val() != ''){
			$('#ckmcChoose').modal('show');
			initStorageName('outDepartmentId');
		}else{
			$.zxsaas_plus.showalert("提示信息","请选择部门!");
		}
		break;
	case '9':
		if($('#sectionId').val() != ''){
			$('#ckmcChoose').modal('show');
			initStorageName('sectionId');
		}else{
			$.zxsaas_plus.showalert("提示信息","请选择部门!");
		}
		break;
	case '10':
		if($('#sectionId').val() != ''){
			$('#ckmcChoose').modal('show');
			initStorageName('sectionId');
		}else{
			$.zxsaas_plus.showalert("提示信息","请选择部门!");
		}
		break;
	case '12':
		if($('#sectionId').val() != ''){
			$('#ckmcChoose').modal('show');
			initStorageName('sectionId');
		}else{
			$.zxsaas_plus.showalert("提示信息","请选择部门!");
		}
		break;
	case '14':
		if($('#sectionId').val() != ''){
			$('#ckmcChoose').modal('show');
			initStorageName('sectionId');
		}else{
			$.zxsaas_plus.showalert("提示信息","请选择部门!");
		}
		break;
	case '44':
		if($('#sectionId').val() != ''){
			$('#ckmcChoose').modal('show');
			initStorageName('sectionId');
		}else{
			$.zxsaas_plus.showalert("提示信息","请选择部门!");
		}
		break;
	default:
		$.zxsaas_plus.showalert("提示信息","请选择部门!");
		break;
	}
}
