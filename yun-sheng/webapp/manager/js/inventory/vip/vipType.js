$(function () {
    $.jgrid.defaults.width = 1280;
    $.jgrid.defaults.responsive = true;
    $.jgrid.defaults.styleUI = 'Bootstrap';

    // 会员类型表格加载
    $('#grid').jqGrid({
        url: "/manager/inventory/vip/type/selectList",
        mtype: "POST",
        datatype: "json",
        jsonReader: {
            root: "data.rows",
            total: "data.total",
            records: "data.records",

        },
        // gridview: true,
        colNames: ['id', '类型名称', '类型编码', '积分', '折扣', '增值服务', '禁用', '备注'],
        colModel: [
            {name: "id", index: "id", width: "80px", align: "center", sortable: false, hidden: true},
            {name: "typeName", index: "typeName", width: "120px", align: "left", sortable: false}, //类型名称
            {name: "typeCode", width: "120px", align: "left", sortable: false},//类型编码
            {
                name: "isScore",
                width: "100px",
                align: "center",
                sortable: false,
                formatter: "select",
                editoptions: {value: "0: ;1:√;"}
            },//积分
            {
                name: "isRebate",
                width: "100px",
                align: "center",
                sortable: false,
                formatter: "select",
                editoptions: {value: "0: ;1:√;"}
            }, // 折扣
            {
                name: "isService",
                width: "100px",
                align: "center",
                sortable: false,
                formatter: "select",
                editoptions: {value: "0: ;1:√;"}
            }, //增值服务
            {
                name: "isStop",
                width: "100px",
                align: "center",
                sortable: false,
                formatter: "select",
                editoptions: {value: "0: ;1:√;"}
            }, //禁用
            {name: "remark", width: "200px", align: "center", sortable: false} //备注
        ],
        sortable: false,
        rownumbers: true,
        cellsubmit: 'clientArray',// 单元格保存内容的位置
        editurl: 'clientArray',
        rowNum: 9999,
        // pager: '#gridPager',
        viewrecords: true,
        // cellEdit: true,
        page: 1,
        width: '',
        footerrow: false,
        multiselect: true,
        multiboxonly: true,
        multiselectWidth: 50,
        height: $(window).height() * 0.5,
        autowidth: true,
        rownumWidth: 35, // the width of the row numbers columns
        shrinkToFit: false,  // 此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
        userDataOnFooter: false,// 设置userData 显示在footer里
        gridComplete: function () {
            $("#grid").setLabel(0, '序');
        }
    })

    // 新增积分表格
    $('#integralGrid').jqGrid({
        // url: "/manager/inventory/vip/type/saveInfo",
        mtype: "POST",
        datatype: "json",
        jsonReader: {
            root: "data.rows.tsspList",
            total: "data.total",
            records: "data.records",

        },
        // gridview: true,
        colNames: ['id', '操作', '商品类别', '消费金额（元）', '积分','商品类别id'],
        colModel: [
            {name: "id", index: "id", width: "60px", align: "center", sortable: false, hidden: true},
            {name: "del", index: "del", width: "60px", align: "center", sortable: false,
                formatter:function(cellvalue, options, rowObject){
                    return '<a class="btn" onclick="integralDelRow('+ options.rowId +')"><i class="glyphicon glyphicon-trash"></i></a>'
                },
            },
            {name: "goodsclassName", width: "200px", align: "left", editable:false,sortable: false,
                formatter:function(cellvalue, options, rowObject){
                    var inp =  	'<div class="form-group ">'+
                                    '<div class="input-group">'+
                                        '<input type="text" class="form-control" id="'+options.rowId+'_goodsclassName" placeholder="请选择商品类别" >'+
                                    '</div>'+
                                '</div>'
                    return inp;
                },
            },
            {name: "aomunt", width: "120px", align: "left", sortable: false,editable:true,formatter: "number",editoptions:{onblur:"integralBlur()"}},
            {name: "score", width: "120px", align: "center", sortable: false,editable:true,editoptions:{
                dataEvents:[
                        {type:"blur",fn:function(){
                            var v = $(this).val()*1;
                            if(isNaN(v)){
                                $(this).val(0);
                            }else{
                                $(this).val(v.toFixed(0));
                            }
                            $('#integralGrid').saveCell(lastrow,lastcell);
                        }}
                    ]
                }
            },
            {name: "goodsclassId", width: "120px", align: "left", sortable: false,hidden: true}
        ],
        sortable: false,
        rownumbers: true,
        cellsubmit: 'clientArray',// 单元格保存内容的位置
        editurl: 'clientArray',
        rowNum: 9999,
        // pager: '#rpGridPager',
        viewrecords: true,
        cellEdit: true,
        page: 1,
        width: '',
        footerrow: false,
        multiselect: false,
        multiboxonly: false,
        multiselectWidth: 68,
        height: $(window).height() * 0.5,
        autowidth: true,
        rownumWidth: 35, // the width of the row numbers columns
        shrinkToFit: false,  // 此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
        userDataOnFooter: false,// 设置userData 显示在footer里
        afterEditCell:function(rowid,name,val,iRow,iCol){//开始编辑
            lastrow = iRow;
            lastcell = iCol;
        },
        onCellSelect:function (rowid,iCol,cellcontent,e) {

        },
        gridComplete: function () {
            $("#integralGrid").setLabel(0, '序');
        }
    })

    // 折扣设置表格
    $('#discountGrid').jqGrid({
        // url: "/manager/inventory/vip/type/saveInfo",
        mtype: "POST",
        datatype: "json",
        jsonReader: {
            root: "data.rows.tsspList",
            total: "data.total",
            records: "data.records",

        },
        // gridview: true,
        colNames: ['id', '操作', '商品类别', '折扣率','商品类别id'],
        colModel: [
            {name: "id", index: "id", width: "60px", align: "center", sortable: false, hidden: true},
            {name: "del", index: "del", width: "60px", align: "center", sortable: false,
                formatter:function(cellvalue, options, rowObject){
                    return '<a class="btn" onclick="discountDelRow('+ options.rowId +')"><i class="glyphicon glyphicon-trash"></i></a>'
                },
            },
            {name: "goodsclassName", width: "200px", align: "left", sortable: false,
                formatter:function(cellvalue, options, rowObject){
                    var inp =  	'<div class="form-group ">'+
                        '<div class="input-group">'+
                        '<input type="text" class="form-control" id="'+options.rowId+'_goodsclassName2" placeholder="请选择商品类别" >'+
                        '</div>'+
                        '</div>'
                    return inp;
                },
            },
            {name: "disCount", width: "120px", align: "left", sortable: false,editable:true,editoptions:{
                dataEvents:[
                        {type:"blur",fn:function(){
                            var v = $(this).val()*1;
                            if(isNaN(v)){
                                $(this).val('100');
                            }else{
                                $(this).val(v.toFixed(0));
                            }
                            $('#discountGrid').saveCell(lastrow,lastcell);
                        }}
                    ]
                }
            },
            {name: "goodsclassId", width: "120px", align: "left", sortable: false,hidden: true}
        ],
        sortable: false,
        rownumbers: true,
        cellsubmit: 'clientArray',// 单元格保存内容的位置
        editurl: 'clientArray',
        rowNum: 9999,
        // pager: '#rpGridPager',
        viewrecords: true,
        cellEdit: true,
        page: 1,
        width: '',
        footerrow: false,
        multiselect: false,
        multiboxonly: false,
        multiselectWidth: 60,
        height: $(window).height() * 0.5,
        autowidth: true,
        rownumWidth: 35, // the width of the row numbers columns
        shrinkToFit: false,  // 此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
        userDataOnFooter: true,// 设置userData 显示在footer里
        afterEditCell:function(rowid,name,val,iRow,iCol){//开始编辑
            lastrow = iRow;
            lastcell = iCol;
        },
        gridComplete: function () {
            $("#discountGrid").setLabel(0, '序');
        }
    })

    // 新增增值表格
    $('#addserveGrid').jqGrid({
        url: "/manager/member/cardType/selectaddServiceList",
        mtype: "POST",
        datatype: "json",
        postData: {
            isStop: 0,
            choose: true
        },
        jsonReader: {
            root: "data.rows",
            total: "data.total",
            records: "data.records",

        },
        // gridview: true,
        colNames: ['id','服务名称','服务期限(月)','有效期可服务次数','会员效期内可服务次数','预售价','会员价','关联串号','备注'],
        colModel: [
            {name:'id',index:'id', width:100,align:'center',sortable:false,hidden:true},
            {name:'serviceName',index:'serviceName', width:120,align:'center',sortable:false},//服务名称
            {name:'serviceDue',index:'serviceDue', width:100,align:'center',sortable:false,
                formatter:function(cellvalue, options, rowObject){
                    return cellvalue == 0?'永久':cellvalue;
                },
            },//服务期限
            {name:'userNum',index:'userNum', width:160,align:'center',sortable:false,
                formatter:function(cellvalue, options, rowObject){
                    return cellvalue == 0?'不限':cellvalue;
                },
            },//有效期可服务次数
            {name:'swcs',index:'swcs', width:160,align:'center',sortable:false,editable:true,editoptions: {
                dataEvents: [
                    {
                        type: "blur", fn: function () {
                            var v = $(this).val() * 1;
                            var id = $(this).prop('id');
                            id = id.substring(0,1)-1;
                            var ids = $('#addserveGrid').getDataIDs();
                            var num = $('#addserveGrid').getCell(ids[id],'userNum');
                            if (isNaN(v) || v < 0) {
                                $(this).val(num);
                            } else {
                                if(num == '不限'){
                                    $(this).val(v.toFixed(0));
                                }else{
                                    if(v > num){
                                        $(this).val(num);
                                    }else{
                                        $(this).val(v.toFixed(0));
                                    }
                                }
                            }
                            $('#addserveGrid').saveCell(lastrow, lastcell);
                        }
                    }]
                }
            }, //会员效期内可服务次数
            {name:'setPrice',index:'setPrice', width:100,align:'center',sortable:false},//预售价
            {name:'ssbz',index:'ssbz', width:100,align:'center',sortable:false,editable:true,editoptions:{
                dataEvents: [
                    {
                        type: "blur", fn: function () {
                        var v = $(this).val() * 1;
                        var id = $(this).prop('id');
                        id = id.substring(0,1)-1;
                        var ids = $('#addserveGrid').getDataIDs();
                        var num = $('#addserveGrid').getCell(ids[id],'setPrice');
                        if (isNaN(v) || v < 0) {
                            $(this).val(num);
                        } else {
                            if(num == '不限'){
                                $(this).val(v.toFixed(2));
                            }else{
                                if(v > num){
                                    $(this).val(num);
                                }else{
                                    $(this).val(v.toFixed(2));
                                }
                            }
                        }
                        $('#addserveGrid').saveCell(lastrow, lastcell);
                        }
                    }]
                }
            },//会员价
            {name:'ifIm',index:'ifIm', width:100,align:'center',sortable:false,formatter:'select', editoptions:{value:"1:√;0:"}},//是否关联串号
            {name:'remark',index:'remark', width:100,align:'center',sortable:false},//备注
        ],
        sortable: false,
        rownumbers: true,
        cellsubmit: 'clientArray',// 单元格保存内容的位置
        editurl: 'clientArray',
        rowNum: 9999,
        // pager: '#rpGridPager',
        viewrecords: true,
        cellEdit: true,
        page: 1,
        width: '',
        footerrow: false,
        multiselect: true,
        multiboxonly: true,
        multiselectWidth: 40,
        height: $(window).height() * 0.5,
        autowidth: true,
        rownumWidth: 35, // the width of the row numbers columns
        shrinkToFit: false,  // 此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
        userDataOnFooter: true,// 设置userData 显示在footer里
        afterEditCell:function(rowid,name,val,iRow,iCol){//开始编辑
            lastrow = iRow;
            lastcell = iCol;
        },
        onSelectRow: function(rowid,status){
            if(status){
                var row = $('#addserveGrid').getRowData(rowid);
                $('#addserveGrid').setRowData(rowid,{
                    swcs: row.userNum,
                    ssbz: row.setPrice,
                })
            }
        },
        gridComplete: function () {
            $("#addserveGrid").setLabel(0, '序');
        }
    })

    $('#add').click(function(){
        $('#addModal').modal('show');
        $('.addSave').data('id','');
        $('.vipAddtitle').text('会员类型-新增');
        $('.ever').attr('checked',true);
        $('.month ').attr('disabled',true);
        clearModal();
    })

    $('.addservice').click(function(){
        window.parent.openWorkBoxByMenutext('增值服务设置','/manager/member/cardType/toAddService');
    })

    // 查询
    $('#search').click(function(){
        var val = $('#vipType').val().trim();
        $("#grid").jqGrid("setGridParam",{
            url: '/manager/inventory/vip/type/selectList',
            datatype:'json',
            page: 1,
            postData: {keyword:val}
        }).trigger("reloadGrid");
    })

    $('#vipType').keyup(function(e){
        if (e.keyCode == 13) {
            $('#search').click()
        }
    })

	/**
	 * 导出
	 */
	$('#export').click(function () {
		var val = $('#vipType').val().trim();
		var url = '/manager/inventory/vip/type/selectVipTypeExport?keyword='+val;
		window.location.href= url;
	})

    // 删除
    $('#del').click(function(){
        var ids = $('#grid').jqGrid('getGridParam','selarrrow');
        if(ids.length !== 1){
            $.zxsaas_plus.showalert('提示','请选择一条需要删除的数据');
        }else{
            $.zxsaas_plus.showconfirm('提示','是否确认删除？',function(){
                $.request({
                    type: 'POST',
                    url: '/manager/inventory/vip/type/deleteInfo',
                    traditional: true,
                    data: {
                        id: ids,
                    },
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
            })
        }

    })

    // 启用
    $('#using').click(function(){
        var ids = $('#grid').jqGrid('getGridParam','selarrrow');
        if(ids.length<1){
            $.zxsaas_plus.showalert('提示','请选择需要启用的数据');
            return
        }
        $.request({
            type: 'POST',
            url: '/manager/inventory/vip/type/updateState',
            traditional: true,
            data: {
                ids: ids,
                state: 0,
            },
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
    })

    // 禁用
    $('#off').click(function(){
        var ids = $('#grid').jqGrid('getGridParam','selarrrow');
        if(ids.length<1){
            $.zxsaas_plus.showalert('提示','请选择需要禁用的数据');
            return
        }
        $.request({
            type: 'POST',
            url: '/manager/inventory/vip/type/updateState',
            traditional: true,
            data: {
                ids: ids,
                state: 1,
            },
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
    })


    // 新增保存
    $('.addSave').click(function(){
        var obj ={
            typeCode: $('.typeCode').val().trim(),
            typeName: $('.typeName').val().trim(),
            activeTime: $('.ever').is(':checked')?-1:$('.month').val(),
            amount: $('.amount').val()*1,
            remark: $('.remark').val().trim(),
            isScore: $('.integral').is(':checked')?1:0,
            isRebate: $('.discount').is(':checked')?1:0,
            isService: $('.addserve').is(':checked')?1:0,
            scoreList: [],
            discountList: [],
            serviceRelList: [],
        };
        var id = $(this).data('id');
        if(id !== undefined && id !== ''){
            obj.id = id;
        }
        if(obj.isScore == 1){
            obj.integralOffset = $('.np1').val()*1;
            obj.amountOffset = $('.np2').val()*1;
            obj.amountMake = $('.np3').val()*1;
            obj.integralMake = $('.np4').val()*1;
            var scoreIds = $('#integralGrid').getDataIDs();
            $.each(scoreIds,function(i,v){
                var row = $('#integralGrid').getRowData(v);
                if(row.goodsclassId !== ""){
                    var data = {
                        aomunt: row.aomunt*1,
                        score: row.score*1,
                        disCount: 0,
                        type: 1,
                        goodsclassId: row.goodsclassId*1,
                    }
                    obj.scoreList.push(data);
                }
            })
        }
        if(obj.isRebate == 1){
            var disinp = $('.disinp').val().trim()*1;
            obj.disCount = disinp;
            var discountIds = $('#discountGrid').getDataIDs();
            $.each(discountIds,function(i,v){
                var row = $('#discountGrid').getRowData(v);
                if(row.goodsclassId !== ""){
                    var data = {
                        aomunt: 0,
                        score: 0,
                        disCount: row.disCount*1,
                        type: 2,
                        goodsclassId: row.goodsclassId*1,
                    }
                    obj.discountList.push(data);
                }
            })
        }
        if(obj.isService == 1){
            var discountIds = $('#addserveGrid').jqGrid('getGridParam','selarrrow');
            $.each(discountIds,function(i,v){
                var row = $('#addserveGrid').getRowData(v);
                var data = {
                    serviceId: row.id*1,
                    feeScale: row.ssbz*1,
                    muserNum: row.swcs=='不限'?-1:row.swcs*1,
                }
                obj.serviceRelList.push(data);
            })
        }
        flag = true;
        isSure();
        if(flag == true){
            $.request({
                type: 'POST',
                url: '/manager/inventory/vip/type/saveInfo',
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(obj),
                success:function(data){
                    if(data.result == 1){
                        var rows = data.data.rows;
                        $('#addModal').modal('hide');
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
        }

    })

    // 修改
    $('#amend').click(function(){
        var ids = $('#grid').jqGrid('getGridParam','selarrrow');
        if(ids.length == 1){
            $('.vipAddtitle').text('会员类型-修改');
            $('#addModal').modal('show');
            clearModal();
            $('.sli').removeClass('slimove');
            var id = $('#grid').getCell(ids,'id');
            $('.addSave').data('id',id);
            $.request({
                type: 'POST',
                url: '/manager/inventory/vip/type/selectOne',
                data: {id: ids[0]},
                success:function(data){
                    if(data.result == 1){
                        var vo = data.data.data;
                        $('.typeCode').val(vo.typeCode);
                        $('.typeName').val(vo.typeName);
                        if(vo.activeTime == -1){
                            $('.ever').attr('checked',true);
                            $('.month').val('');
                        }else{
                            $('.ever').attr('checked',false);
                            $('.month').val(vo.activeTime).attr('disabled',false);
                        }
                        $('.amount').val(vo.amount);
                        $('.remark').val(vo.remark);
                        if(vo.isScore == 1){
                            $('.integral').attr('checked',true);
                            $('.integralLi,.integralBox').show();
                            $('.np1').val(vo.integralOffset);
                            $('.np2').val(vo.amountOffset);
                            $('.np3').val(vo.amountMake);
                            $('.np4').val(vo.integralMake);
                            $.each(vo.scoreList,function(i,v){
                                integralNum = i+1;
                                $('#integralGrid').addRowData(integralNum,v);
                                $('#'+integralNum+'_goodsclassName').combobox({
                                    id:'goodsBrandsTree'+integralNum,
                                    url: "/manager/component/goods/getGoodsClassTreeNodeVoList",
                                    param:{
                                        // 'empId':empId,
                                    },
                                    checkType: "radio",
                                    placeholder:'商品名称',
                                    callback: function(id){
                                        var num = $(this)[0].id;
                                        num = num.substring(num.length-1,num.length);
                                        var ids = $('#integralGrid').getCol('goodsclassId');
                                        for(var i=0; i<ids.length; i++) {
                                            if(ids[i] == '') {
                                                ids.splice(i, 1);
                                                break;
                                            }
                                        }
                                        $.request({
                                            url: '/manager/inventory/vip/type/selectGoodsClassCheck',
                                            type: "POST",
                                            data: {"ids": ids,"id":id},
                                            traditional: true,
                                            success: function (data) {
                                                if(data.result == 1){
                                                    $('#integralGrid').setRowData(num,{
                                                        goodsclassId: id,
                                                    })
                                                }else{
                                                    $('#'+integralNum+'_goodsclassName').val('').data('id','');
                                                    $.zxsaas_plus.showalert("error",data.desc);
                                                }
                                            },
                                            error: function (msg) {
                                                $.zxsaas_plus.showalert("提示","操作有误！");
                                            }
                                        });
                                    }
                                })
                                $('#'+integralNum+'_goodsclassName').val(v.goodsclassName).data('id',v.goodsclassId);
                            })
                        }else{
                            $('.integral').attr('checked',false);
                        }

                        if(vo.isRebate == 1){
                            $('.discount').attr('checked',true);
                            $('.discountLi,.discountBox').show();
                            $('.disinp').val(vo.disCount);
                            $.each(vo.discountList,function(i,v){
                                discountNum = i+1;
                                $('#discountGrid').addRowData(discountNum,v);
                                $('#'+discountNum+'_goodsclassName2').combobox({
                                    id:'goodsBrandsTree2'+discountNum,
                                    url: "/manager/component/goods/getGoodsClassTreeNodeVoList",
                                    param:{
                                        // 'empId':empId,
                                    },
                                    checkType: "radio",
                                    placeholder:'商品名称',
                                    callback: function(id){
                                        var num = $(this)[0].id;
                                        num = num.substring(num.length-1,num.length);
                                        var ids = $('#discountGrid').getCol('goodsclassId');
                                        for(var i=0; i<ids.length; i++) {
                                            if(ids[i] == '') {
                                                ids.splice(i, 1);
                                                break;
                                            }
                                        }
                                        $.request({
                                            url: '/manager/inventory/vip/type/selectGoodsClassCheck',
                                            type: "POST",
                                            data: {"ids": ids,"id":id},
                                            traditional: true,
                                            success: function (data) {
                                                if(data.result == 1){
                                                    $('#discountGrid').setRowData(num,{
                                                        goodsclassId: id,
                                                    })
                                                }else{
                                                    $('#'+discountNum+'_goodsclassName2').val('').data('id','');
                                                    $.zxsaas_plus.showalert("error",data.desc);
                                                }
                                            },
                                            error: function (msg) {
                                                $.zxsaas_plus.showalert("提示","操作有误！");
                                            }
                                        });
                                    }
                                })
                                $('#'+discountNum+'_goodsclassName2').val(v.goodsclassName).data('id',v.goodsclassId);
                            })
                        }else{
                            $('.discount').attr('checked',false);
                        }

                        if(vo.isService == 1){
                            $('.addserve').attr('checked',true);
                            $('.addserveLi,.addserveBox').show();
                            $.each(vo.serviceRelList,function(i,v){
                                $('#addserveGrid').setSelection(v.serviceId);
                                $('#addserveGrid').setRowData(v.serviceId,{'swcs':v.muserNum==-1?'不限':v.muserNum,'ssbz':v.feeScale});
                            })
                        }else{
                            $('.addserve').attr('checked',false);
                        }

                        if(vo.isRebate == 1){
                            $('.sli').removeClass('slimove');
                            $('.integralLi').addClass('slimove');
                        }else{
                            if(vo.isRebate == 1){
                                $('.sli').removeClass('slimove');
                                $('.discountLi').addClass('slimove');
                            }else{
                                if(vo.isService == 1){
                                    $('.sli').removeClass('slimove');
                                    $('.addserveLi').addClass('slimove');
                                }
                            }
                        }
                    }else{
                        $.zxsaas_plus.showalert('error',data.desc);
                    }
                },
                error:function(){
                    alert('请求失败！')
                }
            });
        }else{
            $.zxsaas_plus.showalert('提示','请选择一条需要修改的数据');
        }
    })

    $('.ever').click(function(){
        if($(this).is(':checked')){
            $('.month').attr('disabled',true).val('');
        }else{
            $('.month').attr('disabled',false);
        }
    })

    // 正整数input
    $('.numinp').change(function(){
        var v = parseInt($(this).val().trim());
        if(isNaN(v)){
            $(this).val('');
        }else{
            $(this).val(v);
        }
    })

    // 保留两位小数input
    $('.numfixinp').change(function(){
        var v = $(this).val().trim()*1;
        v = v.toFixed(2);
        if(isNaN(v)){
            $(this).val('');
        }else{
            $(this).val(v);
        }
    })

    $('.labbox').click(function(){
        if($('.integral').is(':checked')){
            integralShow()
        }else{
            $('.integralLi,.integralBox').hide();
        }
        if($('.discount').is(':checked')){
            discountShow()
        }else{
            $('.discountLi,.discountBox').hide();
        }
        if($('.addserve').is(':checked')){
            addserveShow()
        }else{
            $('.addserveLi,.addserveBox').hide();
        }
    })

    $('.integralLi').click(function(){
        integralShow()
    })

    $('.discountLi').click(function(){
        discountShow()
    })

    $('.addserveLi').click(function(){
        addserveShow()
    })

    // 积分设置新增行
    $('.addIntegral').click(function(){
        integralNum++;
        $('#integralGrid').jqGrid('addRowData',integralNum,{
            id: integralNum,
        });
        $('#'+integralNum+'_goodsclassName').combobox({
            id:'goodsBrandsTree'+integralNum,
            url: "/manager/component/goods/getGoodsClassTreeNodeVoList",
            param:{
                // 'empId':empId,
            },
            checkType: "radio",
            placeholder:'商品名称',
            callback: function(id){
                var num = $(this)[0].id;
                num = num.substring(num.length-1,num.length);
                var ids = $('#integralGrid').getCol('goodsclassId');
                var arrIds = $('#integralGrid').getCol('id');
                var index = arrIds.indexOf(num);
                ids.splice(index, 1);
                for(var i=0; i<ids.length; i++) {
                    if(ids[i] == '') {
                        ids.splice(i, 1);
                        break;
                    }
                }
                if(ids == undefined || ids.length == 0){
                    ids = '';
                }
                $.request({
                    url: '/manager/inventory/vip/type/selectGoodsClassCheck',
                    type: "POST",
                    data: {"ids": ids,"id":id},
                    traditional: true,
                    success: function (data) {
                        if(data.result == 1){
                            $('#integralGrid').setRowData(num,{
                                goodsclassId: id,
                            })
                        }else{
                            $('#'+integralNum+'_goodsclassName').val('').data('id','');
                            $.zxsaas_plus.showalert("error",data.desc);
                        }
                    },
                    error: function (msg) {
                        $.zxsaas_plus.showalert("提示","操作有误！");
                    }
                });
            }
        })
    })

    // 折扣设置新增行
    $('.adddiscount').click(function(){
        discountNum++;
        $('#discountGrid').jqGrid('addRowData',discountNum,{
            id: discountNum,
        });
        $('#'+discountNum+'_goodsclassName2').combobox({
            id:'goodsBrandsTree2'+discountNum,
            url: "/manager/component/goods/getGoodsClassTreeNodeVoList",
            param:{
                // 'empId':empId,
            },
            checkType: "radio",
            placeholder:'商品名称',
            callback: function(id){
                var num = $(this)[0].id;
                num = num.substring(num.length-1,num.length);
                var ids = $('#discountGrid').getCol('goodsclassId');
                var arrIds = $('#integralGrid').getCol('id');
                var index = arrIds.indexOf(num);
                ids.splice(index, 1);
                for(var i=0; i<ids.length; i++) {
                    if(ids[i] == '') {
                        ids.splice(i, 1);
                        break;
                    }
                }
                if(ids == undefined || ids.length == 0){
                    ids = '';
                }
                $.request({
                    url: '/manager/inventory/vip/type/selectGoodsClassCheck',
                    type: "POST",
                    data: {"ids": ids,"id":id},
                    traditional: true,
                    success: function (data) {
                        if(data.result == 1){
                            $('#discountGrid').setRowData(num,{
                                goodsclassId: id,
                            })
                        }else{
                            $('#'+discountNum+'_goodsclassName2').val('').data('id','');
                            $.zxsaas_plus.showalert("error",data.desc);
                        }
                    },
                    error: function (msg) {
                        $.zxsaas_plus.showalert("提示","操作有误！");
                    }
                });
            }
        })
    })

})
var lastrow,lastcell;
var integralNum = 0,discountNum = 0;
var flag = true;

function clearModal(){
    $('#integralGrid').clearGridData();
    $('#discountGrid').clearGridData();
    $('#addserveGrid').trigger('reloadGrid');
    $('.sli,.mbox>div').hide();
    $('#addModal input,.remark').val('');
    $('.labbox input').attr("checked", false);
}

function integralShow(){
    $('.integralLi,.integralBox').show();
    $('.discountBox,.addserveBox').hide();
    $('.integralLi').addClass('slimove');
    $('.discountLi,.addserveLi').removeClass('slimove');
}

function discountShow(){
    $('.discountLi,.discountBox').show();
    $('.integralBox,.addserveBox').hide();
    $('.discountLi').addClass('slimove');
    $('.integralLi,.addserveLi').removeClass('slimove');
}

function addserveShow(){
    $('.addserveLi,.addserveBox').show();
    $('.integralBox,.discountBox').hide();
    $('.addserveLi').addClass('slimove');
    $('.discountLi,.integralLi').removeClass('slimove');
}


//效验必填
function isSure(){
    if($('.typeCode').val().trim() == ''){
        $.zxsaas_plus.showalert('提示','会员类型编码不能为空');
        flag = false
        return
    }
    if($('.typeName').val().trim() == ''){
        $.zxsaas_plus.showalert('提示','会员类型名称不能为空');
        flag = false
        return
    }
    var activeTime = $('.ever').is(':checked')?-1:$('.month').val();
    if(activeTime == ''){
        $.zxsaas_plus.showalert('提示','有效期不能为空');
        flag = false
        return
    }
    if($('.discount').is(':checked')){
        if($('.disinp').val().trim() == ''){
            $.zxsaas_plus.showalert('提示','折扣设置中通用设置不能为空');
            flag = false
            return
        }
    }

}

function integralBlur(){
    $('#integralGrid').jqGrid("saveCell",lastrow,lastcell);
}

function scoreBlur(opt){
    var v = $(opt).val()*1;
    var id = $(opt).prop('id');
    id = id.substring(0,1);
    if(isNaN(v)){
        $('#integralGrid').setCell(id,'score',0);
    }else{
        $('#integralGrid').setCell(id,'score',v.toFixed(0));
    }
    $('#integralGrid').saveCell(lastrow,lastcell);
    $("#integralGrid").setColProp("score",{editable:true});
}

function discountBlur(){
    $('#discountGrid').jqGrid("saveCell",lastrow,lastcell);
}

function integralDelRow(id){
    var row = $('#integralGrid').getRowData(id);
    $("#integralGrid").delRowData(id);
}

function discountDelRow(id){
    var row = $('#discountGrid').getRowData(id);
    $("#discountGrid").delRowData(id);
}