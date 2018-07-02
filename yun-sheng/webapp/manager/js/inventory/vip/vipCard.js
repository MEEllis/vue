var arrs = []; // 用于存储修改会员ids

$(function () {
    $.jgrid.defaults.width = 1280;
    $.jgrid.defaults.responsive = true;
    $.jgrid.defaults.styleUI = 'Bootstrap';
    

    //部门
    $('#storeInput').modalsbox({
        grid: {
            id: 'section',
            url: basePath + "/component/section/getAccessSectionVoPageList",
            param: {
                // 'sectionIsStore': 1
            }
        },
        tree: {
            id: 'sectionNameTree',
            url: basePath + "/component/section/getAccessSectionTreeNodeVoList",
            param: {
                // 'sectionIsStore': 1
            }
        },
        multiselect: false,
        placeholder: '部门',
    })
    
    //导出
	$("#export").click(function(){
		 window.location.href= "/manager/inventory/vip/card/export?vipInfo="
			 +$('#vipInfo').val().trim()+"&memberTypeIds="+$('#memberTypeIds').data('id')
			 +"&cardState="+$('.cardState').val()+"&usedState="+$('.usedState').val();
	});
	    

    //会员类型
    $('#memberTypeIds').combobox({
        id: 'memberTypeTree',
        url: basePath + '/inventory/vip/type/selectAllList',
        param: {},
        placeholder: '请选择会员类型',
    })

    //弹窗会员类型
    $('#modalType').combobox({
        id: 'modalTypeTree',
        url: basePath + '/inventory/vip/type/selectAllList',
        param: {},
        checkType: "radio",
        placeholder: '请选择会员类型',
    })

    // 会员类型表格加载
    $('#grid').jqGrid({
        url: "/manager/inventory/vip/card/selectList",
        mtype: "POST",
        datatype: "json",
        jsonReader: {
            root: "data.rows",
            total: "data.total",
            records: "data.records",

        },
        // gridview: true,
        colNames: ['id','客户资料id', '会员卡号', '会员卡类型', '卡状态', '使用状态', '持卡人', '手机号码', '卡密','发卡日期',
            '生效日期','失效日期','新增人','新增时间','修改人','修改时间'],
        colModel: [
            {name: "id", index: "id", width: "80px", align: "center", sortable: true, hidden: true},
            {name: "fid", index: "fid", width: "80px", align: "center", sortable: true, hidden: true},
            {name: "cardNum", index: "cardNum", width: "150px", align: "left", sortable: true}, //会员卡号
            {name: "cardTypeName",index: "cardTypeName", width: "150px", align: "left", sortable: true},//会员卡类型
            {name: "cardState",index: "cardState", width: "100px",align: "center",sortable: true,formatter: "select",editoptions:{value:"1:未发卡;2:已发卡;3:作废卡;"}},//卡状态
            {name: "vipState",index: "vipState", width: "100px",align: "center",sortable: true,formatter: "select",editoptions: {value:"1:启用;2:停用;3:挂失;"}},//使用状态
            {name: "vipName",index: "vipName", width: "120px",align: "center",sortable: true},//持卡人
            {name: "tel",index: "tel", width: "120px",align: "center",sortable: true},//手机号码
            {name: "password",index: "password", width: "120px",align: "center",sortable: true,
                formatter:function(cellvalue, options, rowObject){
                    return cellvalue == null?'':'******';
                }
            },//卡密
            {name: "issuingDate",index: "issuingDate", width: "120px",align: "center",sortable: true},//发卡日期
            {name: "effectiveDate",index: "effectiveDate", width: "120px",align: "center",sortable: true},//生效日期
            {name: "expirationDate",index: "expirationDate", width: "120px",align: "center",sortable: true},//失效日期
            {name: "addMan",index: "addMan", width: "120px",align: "center",sortable: true},//新增人
            {name: "addTime",index: "addTime", width: "120px",align: "center",sortable: true},//新增时间
            {name: "updateMan",index: "updateMan", width: "120px", align: "center", sortable: true}, //修改人
            {name: "updateTime",index: "updateTime", width: "120px", align: "center", sortable: true} //修改时间
        ],
        sortable: true,
        rownumbers: true,
        cellsubmit: 'clientArray',// 单元格保存内容的位置
        editurl: 'clientArray',
        rowNum: 100,
        rowList: [100,200,500],
        pager: '#gridPager',
        viewrecords: true,
        cellEdit: true,
        page: 1,
        footerrow: false,
        multiselect: true,
        multiboxonly: true,
        multiselectWidth: 50,
        height: $(window).height() * 0.5,
        autowidth: true,
        rownumWidth: 35, // the width of the row numbers columns
        shrinkToFit: false,  // 此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
        userDataOnFooter: true,// 设置userData 显示在footer里
        gridComplete: function () {
            $("#grid").setLabel(0, '序');
        }
    })

    $('#amend').click(function(){
        var ids = $('#grid').jqGrid('getGridParam','selarrrow');
        if(ids.length > 0) {
            var flag = true;
            arr = [];
            $.each(ids,function(i,v){
                var row = $('#grid').getRowData(v);
                if(row.fid !== ''){
                    flag = false;
                    return
                }
                arr.push(row.id);
            })
            if(flag){
                var treeObj = $.fn.zTree.getZTreeObj("modalTypeTree");
                if(treeObj !== null){
                    var nodes = treeObj.getSelectedNodes();
                    treeObj.checkNode(nodes);
                }
                $('#storeInput,#modalType').val('').data('id','');
                $('#amendModal').modal('show');
            }else{
                $.zxsaas_plus.showalert('提示','会员不允许修改');
            }
        }else{
            $.zxsaas_plus.showalert('提示','请选择需要修改的数据');
        }
    })

    // 修改保存
    $('#amendSave').click(function(){
        var storeInput = $('#storeInput').data('id');
        var modalType = $('#modalType').data('id');
        if(storeInput == ''){
            $.zxsaas_plus.showalert('warning','请选择制卡部门！')
            return
        }
        if(modalType == ''){
            $.zxsaas_plus.showalert('warning','请选择会员类型！')
            return
        }
        $.request({
            type: 'POST',
            url: '/manager/inventory/vip/card/updateCardInfo',
            data: {
                ids: arr,
                sectionId: storeInput,
                cardTypeId: modalType,
            },
            traditional: true,
            success:function(data){
                if(data.result == 1){
                    $('#amendModal').modal('hide');
                    $.zxsaas_plus.showalert('success',data.desc);
                    $('#grid').trigger('reloadGrid');
                }else{
                    $.zxsaas_plus.showalert('error',data.desc);
                }
            },
            error:function(){
                alert('请求失败！')
            }
        });

    })

    // 查询
    $('#search').click(function(){
        var obj = {
            vipInfo: $('#vipInfo').val().trim(),
            memberTypeIds: $('#memberTypeIds').data('id'),
            cardState: $('.cardState').val(),
            usedState: $('.usedState').val(),
        }
        $("#grid").jqGrid("setGridParam",{
            url: '/manager/inventory/vip/card/selectList',
            datatype:'json',
            page: 1,
            postData: obj
        }).trigger("reloadGrid");
    })

    // 重置
    $('#reset').click(function(){
        if($('#memberTypeIds').val() !== ''){
            var treeObj = $.fn.zTree.getZTreeObj("memberTypeTree");
            treeObj.checkAllNodes(false);
        }
        $('.form-inline input,.form-inline select').val('').data('id','');
    })

    // 未发卡操作
    $('.wfkbtn .btn').click(function(){
        var name = $(this).attr('name');
        var ids = $('#grid').jqGrid('getGridParam','selarrrow');
        if(ids.length > 0) {
            var flag = true;
            $.each(ids,function(i,v){
                var row = $('#grid').getRowData(v);
                if(row.fid == null || row.fid == ''){
                    // 此处不要删除
                }else{
                    flag = false
                    return
                }
            })
            var opt = {
                ids: ids,
            }
            var url = '/manager/inventory/vip/card/updateCardInfoState';
            if(name == 1){
                var desc= '已使用过的会员卡不允许作废';
                opt.state = 3;
            }else if(name == 2){
                opt.state = 1;
                var desc = '已使用过的会员卡不允许取消作废';
            }else{
                url = '/manager/inventory/vip/card/deleteCardInfo';
                flag = true;
            }
            if(flag){
                $.request({
                    type: 'POST',
                    url: url,
                    data: opt,
                    traditional: true,
                    success:function(data){
                        if(data.result == 1){
                            $.zxsaas_plus.showalert('success',data.desc);
                            $('#grid').trigger('reloadGrid');
                        }else{
                            $.zxsaas_plus.showalert('error',data.desc);
                        }
                    },
                    error:function(){
                        alert('请求失败！')
                    }
                });
            }else{
                $.zxsaas_plus.showalert('提示',desc);
            }

        }else{
            $.zxsaas_plus.showalert('提示','请选择卡片进行操作');
        }
    })

    // 已发卡操作
    $('.yfkbtn .btn').click(function(){
        var name = $(this).attr('name');
        var ids = $('#grid').jqGrid('getGridParam','selarrrow');
        if(ids.length > 0) {
            var flag = true;
            var arr = [];
            $.each(ids,function(i,v){
                var row = $('#grid').getRowData(v);
                arr.push(row.fid);
                if(row.fid == null || row.fid ==''){
                    flag = false
                    return
                }
            })
            var opt = {
                ids: arr,
            }
            var url = '/manager/inventory/vip/card/updateVipInfoState';
            if(name == 1){
                var desc= '未发会员卡不允许启用';
                opt.state = 1;
            }else if(name == 2){
                var desc = '未发会员卡不允许停用';
                opt.state = 2;
            }else{
                var desc = '未发会员卡不允许挂失';
                opt.state = 3;
            }
            if(flag){
                $.request({
                    type: 'POST',
                    url: url,
                    data: opt,
                    traditional: true,
                    success:function(data){
                        if(data.result == 1){
                            $.zxsaas_plus.showalert('success',data.desc);
                            $('#grid').trigger('reloadGrid');
                        }else{
                            $.zxsaas_plus.showalert('error',data.desc);
                        }
                    },
                    error:function(){
                        alert('请求失败！')
                    }
                });
            }else{
                $.zxsaas_plus.showalert('提示',desc);
            }

        }else{
            $.zxsaas_plus.showalert('提示','请选择卡片进行操作');
        }
    })

    // 制卡
    $('#card').click(function(){
        $.ajax({
            type: 'POST',
            url: basePath + '/inventory/vip/type/selectAllList',
            success:function(data){
                if(data.result == 1){
                    var list = data.data.dataList;
                    var op = '';
                    $.each(list,function(i,v){
                        op += '<option value='+ v.id +'>' + v.name + '</option>';
                    })
                    $('#typeNamePiles').html(op);
                }else{
                    $.zxsaas_plus.showalert('error',data.desc);
                }
            },
            error:function(){
                alert('请求失败！')
            }
        });
        $('#mkCardPileModal').modal('show');
    })

})
var lastrow,lastcell;

