//获取默认值
function getDefaultValues(){
    var obj={
        success:function(data){
            var deSe=data.data.defaultSection;
            var deEm=data.data.defaultEmployee;
            $('#billsHeader input[name="managersName"]').val(deEm.name).data('id',deEm.employeeId)
            var defaultStorage=data.data.defaultStorage||{}
            var ids=$('#grid').getDataIDs();
            $.each(ids,function(index,rowid){
                $('#grid').jqGrid("setCell",rowid,"storageName",defaultStorage.name);
                $('#grid').jqGrid("setCell",rowid,"storageId",defaultStorage.storageId);
            })
            if(signName=='商品移库单'){
                $('#DepartmentName').val(deSe.name).data('id',deSe.sectionId)
                RequestSection(true);
            }else if(signName=='其他入库单'){
                $('#DepartmentName').val(deSe.name).data('id',deSe.sectionId)
            }else if(signName=='其他出库单'){
                $('#departmentName').val(deSe.name).data('id',deSe.sectionId)
            }else if(signName=='同价调拨发货单' ||signName=='变价调拨发货单'){
                $('#billsHeader input[name="outDepartmentName"]').val(deSe.name).data('id',deSe.sectionId)
            }
        }
    }
    InterfaceInventory.common.getDefaultValues(obj);
}

function goHistory(){
    if(signName=='同价调拨发货单'){
        window.parent.openWorkBoxByMenutext("同价调拨发货单单据列表",
            '/manager/jxc/storage/allocate/documentList/samePricetransfer/historicaDoc?TypeName=1', false);
    }else if(signName=='变价调拨发货单'){
        window.parent.openWorkBoxByMenutext("变价调拨发货单单据列表",
            '/manager/jxc/storage/allocate/documentList/samePricetransfer/historicaDoc?TypeName=2', false);
    }else if(signName=='其他入库单'){
        window.parent.openWorkBoxByMenutext("其他入库单单据列表",
            '/manager/jxc/storage/allocate/documentList/samePricetransfer/historicaDoc?TypeName=5', false);
    }else if(signName=='其他出库单'){
        window.parent.openWorkBoxByMenutext("其他出库单单据列表",
            '/manager/jxc/storage/allocate/documentList/samePricetransfer/historicaDoc?TypeName=4', false);
    }else if(signName=='商品移库单'){
        window.parent.openWorkBoxByMenutext("商品移库单单据列表",
            '/manager/jxc/storage/allocate/documentList/samePricetransfer/historicaDoc?TypeName=3', false);
    }
}

//比较日期
function CompareDate(d1,d2){
	return ((new Date(d1.replace(/-/g,"\/"))) > (new Date(d2.replace(/-/g,"\/"))));
}

//仓储 获取日期权限的重写
function getAuthList(callback) {
    _authList.menuCode = $('#AUTH').attr('data-code');
    if (_authList.menuCode) {
        $.ajax({
            url: '/manager/inventory/common/getInventoryBillsDate',
            type: 'post',
            async:false,
            dataType: 'json',
            data: {
                'menuCode': _authList.menuCode
            },
            success: function (data) {
                var data = data.data;
                _authList.maxDate = data.maxDate;
                _authList.hasPermissions = data.hasPermissions;
                _authList.minDate = data.minDate;
                if(callback){
                    callback();
                }
            }
        })
    }
}

//删除空行
function delKongRow(){
    var $table=$("#grid");
    var ids=$table.jqGrid("getDataIDs");
    var len=ids.length
    if(len>0){
        var lastRowIndex=len-1
        var lastRowIds=ids[lastRowIndex]
        var rowData = $table.jqGrid('getRowData', lastRowIds)
        if(rowData.goodsId==""){
            $table.delRowData(lastRowIds);
        }
    }
}