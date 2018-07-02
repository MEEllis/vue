var n1 = [],n2 =[],n3 = [],n4 = [];
var printComObj=null;
$(document).ready(function(){
    getDefaultValues();
    $.each(CODELIST,function(i,v){
        var a = v.split('_')[1];
        if(a == 'LSKD'){
            n1.push(v);
        }else if(a == 'LSTHD'){
            n2.push(v);
        }else if(a == 'LSDJD'){
            n3.push(v);
        }else if(a == 'LSTDD'){
            n4.push(v);
        }else{
            console.log(v);
        }
    })
    if(n1.indexOf('B_LSKD_0002') == -1){
        $('.B_LSKD_0002').hide();
    }else{
        $('.B_LSKD_0002').show();
    }

    $('#storeInp').storePlu({
        saleManId:'saleInp',
        checkMore: true,
        search: false,
        gridId:'test1',
        treeId:'tree2'
    })
    $('#saleInp').storeSales({
        sectionId:'storeInp',
        checkMore: true,
        search: false,
        gridId:'test2',
        treeId:'tree3'
    })
    $('.goodsType').combobox({
        url:'/manager/component/goods/getGoodsClassTreeNodeVoList',
        param:{},
        id:'GoodsClassTree',
        placeholder:'请选择商品类别'
    })
    $('.startTime').datePlu({
        dateEnd:'.endTime',
        endDate:true,
        minTime: "1970-01-01",
        maxDateFlag:1,
        ifPermissions:false
    })
    // $('.redTime').datePlu({
    // 	endDate:false,
    // })
    $('#goodsInp').goodsPlu({
//		sectionId:'#storeInp',
        checkMore: true,
        search: false
    })
    $('.debtTime').datePlu({
        endDate:false,
        ifPermissions:false
    })
    $('.exitTime').datePlu({
        endDate:false
    })
    $('#debtSection').storePlu({
        saleManId:'debtMan',
        checkMore: false,
       // search: true,
        // gridId:'test10',
        // treeId:'tree11',
        changeStore:function () {
        var id=$("input[name='debtSection']").data('sectionId');
            //设置编辑器值
            $("input[name='debtSectionId']").val(id);
            $("input[name='debtManId']").val("");
            $("input[name='debtMan']").val("");
            getPay();
    }
    })
    $('#debtMan').comModalsEmployeeBySection({
        sectionIds:'input[name="debtSectionId"]',
        search: false,
        clickback:function(){
            var obj= $("input[name='debtMan']");
            //设置编辑器值
            $("input[name='debtMan']").val(obj.val());
            $("input[name='debtManId']").val(obj.data('id'));
        }
    })
    $('#exitstore').storePlu({
        saleManId:'exitMan',
        checkMore: false,
        search: true,
        gridId:'test5',
        treeId:'tree6'
    })
    $('#exitMan').storeSales({
        sectionId:'exitstore',
        checkMore: false,
        search: true
    })
//获取默认值
    function getDefaultValues(){
        var obj={
            success:function(data){
                $('input[name="debtSection"]').val(data.data.defaultSection.name)
                $('input[name="debtSectionId"]').val(data.data.defaultSection.sectionId)
                $('input[name="debtMan"]').val(data.data.defaultEmployee.name).data('id',data.data.defaultEmployee.employeeId)
                $('input[name="debtManId"]').val(data.data.defaultEmployee.employeeId)
            }
        }
        InterfaceInventory.common.getDefaultValues(obj);
    }
//	表格参数
    var retail = {
        LoadTableUrl: basePath + '/inventory/retail/cashier/loadRetailOrder',
        TableName: "#retailGrid", //显示表格名称。遵照css选择器书写
        pager: "#jqGridPager_retail",
        colNames : ['id','是否退货','稽核','单据号','往来单位','客户姓名','联系电话','门店Id','门店','营业员1Id','营业员','商品信息','营业员2Id','营业员2','应收金额','整单抹零','引入定金','已收款金额',
            '欠款','欠款值','分期贷款金额','运营商业务数量','运营商业务代收','增值服务金额','第三方抵扣金额','整单销售收入','会员卡号','备注',
            '凭证号','凭证号id','结算状态','单据状态','往来单位Id'],
        colModel : [
            {name:'orderId',index:'orderId',width:80,align:'center',hidden:true},
            {name:'isReturns',index:'isReturns', width:100,align:'center',sortable:false,formatter:
                function(cellvalue, options, rowObject){
                    if(cellvalue=="1"){
                        return "是";
                    }else{
                        return "";
                    }
                }
            },
            {name:'auditStatus',index:'auditStatus', width:100,align:'center',sortable:false,formatter: "select",editoptions : {value: "0:未稽核;1:已稽核;"}
            },
            {name:'billsCode',index:'billsCode', width:200,align:'center',sortable:false},
            {name:'contactUnitName',index:'contactUnitName', width:150,align:'center',sorttype:'string',sortable:false},
            {name:'memberName',index:'memberName', width:150,align:'center', sorttype:'string',sortable:false},
            {name:'memberTelephone',index:'memberTelephone', width:150,align:'center',sortable:false},
            {name:'sectionId',index:'sectionId', width:150,align:'center',sortable:false,hidden:true},
            {name:'sectionName',index:'sectionName', width:150,align:'center', sorttype:'string',sortable:false},
            {name:'saleManId1',index:'saleManId1', width:150,align:'center', sorttype:'string',sortable:false,hidden:true},
            {name:'saleManName1',index:'saleManName1', width:150,align:'center', sorttype:'string'},
            {name:'goodsName',index:'goodsName', width:150,align:'center', sorttype:'string'},
            {name:'saleManId2',index:'saleManId2', width:150,align:'center', sorttype:'string',sortable:false,hidden:true},
            {name:'saleManName2',index:'saleManName2', width:150,align:'center',sortable:false,hidden:true},
            {name:'totGoodsAmountStr',index:'totGoodsAmountStr', width:150,align:'center', sorttype:'string',sortable:false},
            {name:'reduceAmoutStr',index:'reduceAmoutStr', width:150,align:'center', sorttype:'string',sortable:false},
            {name:'referenceDepositStr',index:'referenceDepositStr', width:120,align:'center',sortable:false},
            {name:'totPayAmountStr',index:'totPayAmountStr', width:150,align:'center', sorttype:'string',sortable:false,
            },
            {name:'totRemDebtAmountStr',index:'totRemDebtAmountStr', width:150,align:'center',sortable:false},
            {name:'totRemDebtAmount',index:'totRemDebtAmount', width:150,align:'center',sortable:false,hidden:true},
            {name:'totInstallAmountStr',index:'totInstallAmountStr', width:150,align:'center',sortable:false},
            {name:'totBusCount',index:'totBusCount', width:150,align:'center', sorttype:'string',sortable:false},
            {name:'totBusAmountStr',index:'totBusAmountStr', width:150,align:'center', sorttype:'string',sortable:false},
            {name:'totServiceAmountStr',index:'totServiceAmountStr', width:150,align:'center', sorttype:'string'},
            {name:'totCouponAmountStr',index:'totCouponAmountStr', width:150,align:'center', sorttype:'string',sortable:false},
            {name:'totAmountStr',index:'totAmountStr', width:150,align:'center',sortable:false},
            {name:'memberCardNo',index:'memberCardNo', width:150,align:'center', sorttype:'string',sortable:false},
            {name:'remark',index:'remark', width:200,align:'center', sorttype:'string',sortable:false},
            {name:'voucherNo',classes:'billsCodeStyle',index:'voucherNo', width:200,align:'center', sorttype:'string',sortable:false},
            {name:'voucherId',hidden:true},
            {name:'clearStatus',hidden:true},
            {name:'billsStatus',hidden:true},
            {name:'contactsunitId',hidden:true}
        ]
    };
    var recede = {
        LoadTableUrl: basePath + '/inventory/retail/cashier/loadReturnOrder',
        TableName: "#recedeGrid", //显示表格名称。遵照css选择器书写
        pager: "#jqGridPager_recede",
        colNames : ['id','稽核','单据号','客户姓名','联系电话','往来单位','门店Id','门店','营业员1Id','营业员','商品信息','营业员2Id','营业员2','应退金额','整单抹零','退款金额'
            ,'未退金额',
            '增值服务退款金额','分期贷款金额','分期退款金额','运营商退款数量','运营商退款金额','第三方退回金额','销售收入冲减','会员卡号','原单编号','备注',
            '凭证号','凭证号id','单据状态'],
        colModel : [
            {name:'orderId',index:'orderId',width:80,align:'center',hidden:true},
            {name:'auditStatus',index:'auditStatus', width:100,align:'center',sortable:false,formatter: "select",editoptions : {value: "0:未稽核;1:已稽核;"}},
            {name:'billsCode',index:'billsCode', width:200,align:'center',sortable:false},
            {name:'memberName',index:'memberName', width:150,align:'center', sorttype:'string',sortable:false},
            {name:'memberTelephone',index:'memberTelephone', width:150,align:'center',sortable:false},
            {name:'contactUnitName',index:'contactUnitName', width:150,align:'center',sorttype:'string',sortable:false},
            {name:'sectionId',index:'sectionId', width:150,align:'center',sortable:false,hidden:true},
            {name:'sectionName',index:'sectionName', width:150,align:'center', sorttype:'string',sortable:false},
            {name:'saleManId1',index:'saleManId1', width:150,align:'center', sorttype:'string',sortable:false,hidden:true},
            {name:'saleManName1',index:'saleManName1', width:150,align:'center', sorttype:'string'},
            {name:'goodsName',index:'goodsName', width:150,align:'center', sorttype:'string'},
            {name:'saleManId2',index:'saleManId2', width:150,align:'center', sorttype:'string',sortable:false,hidden:true},
            {name:'saleManName2',index:'saleManName2', width:150,align:'center',sortable:false,hidden:true},
            {name:'totGoodsAmountStr',index:'totGoodsAmountStr', width:150,align:'center', sorttype:'string',sortable:false},
            {name:'reduceAmoutStr',index:'reduceAmoutStr', width:150,align:'center', sorttype:'string',sortable:false},
            {name:'totPayAmountStr',index:'totPayAmountStr', width:150,align:'center', sorttype:'string',sortable:false},
            {name:'totDebtAmountStr',index:'totDebtAmountStr', width:150,align:'center',sortable:false},
            {name:'totServiceAmountStr',index:'totServiceAmountStr', width:150,align:'center',sortable:false},
            {name:'totInstallAmountStr',index:'totInstallAmountStr', width:150,align:'center', sorttype:'string',sortable:false},
            {name:'installRefundAmount',index:'installRefundAmount', width:150,align:'center', sorttype:'string',sortable:false},
            {name:'totBusCount',index:'totBusCount', width:150,align:'center', sorttype:'string',sortable:false},
            {name:'totBusAmountStr',index:'totBusAmountStr', width:150,align:'center', sorttype:'string'},
            {name:'totCouponAmountStr',index:'totCouponAmountStr', width:150,align:'center', sorttype:'string',sortable:false},
            {name:'salesRevenueStr',index:'salesRevenueStr', width:150,align:'center',sortable:false},
            {name:'memberCardNo',index:'memberCardNo', width:150,align:'center', sorttype:'string',sortable:false},
            {name:'ydCode',index:'ydCode', width:200,align:'center', sorttype:'string',sortable:false},
            {name:'remark',index:'remark', width:200,align:'center', sorttype:'string',sortable:false},
            {name:'voucherNo',classes:'billsCodeStyle',index:'voucherNo', width:200,align:'center', sorttype:'string',sortable:false},
            {name:'voucherId',hidden:true},
            {name:'billsStatus',index:'billsStatus',width:80,align:'center',hidden:true}
        ]
    };
    var handsel = {
        LoadTableUrl: basePath + '/inventory/retail/cashier/loadDepositOrder',
        TableName: "#handselGrid", //显示表格名称。遵照css选择器书写
        pager: "#jqGridPager_handsel",
        colNames : ['id','稽核','单据类型','单据类型id','单据号','会员卡号','客户姓名','联系电话','门店Id','门店','营业员1Id','营业员',
            '制单人','制单时间','数量','定金','退定金额','已核销金额','定金结余','原单编号','备注','凭证号','凭证号id','单据状态','实收','应收'],
        colModel : [
            {name:'id',index:'id',width:80,align:'center',hidden:true},
            {name:'auditStatus',index:'auditStatus', width:100,align:'center',sortable:false,formatter: "select",editoptions : {value: "0:未稽核;1:已稽核;"}},
            {name:'typeName',index:'typeName', width:150,align:'center',sortable:false},
            {name:'typeId',index:'typeId', width:100,align:'center',sortable:false,hidden:true},
            {name:'billsCode',index:'billsCode', width:200,align:'center', sorttype:'string',sortable:false},
            {name:'memberCardNo',index:'memberCardNo', width:150,align:'center',sortable:false},
            {name:'memberName',index:'memberName', width:150,align:'center', sorttype:'string',sortable:false},
            {name:'memberTelephone',index:'memberTelephone', width:150,align:'center',sortable:false},
            {name:'sectionId',index:'sectionId', width:150,align:'center',sortable:false,hidden:true},
            {name:'sectionName',index:'sectionName', width:150,align:'center', sorttype:'string',sortable:false},
            {name:'saleManId1',index:'saleManId1', width:150,align:'center', sorttype:'string',sortable:false,hidden:true},
            {name:'saleManName1',index:'saleManName1', width:150,align:'center', sorttype:'string'},
            {name:'createBy',index:'createBy', width:150,align:'center', sorttype:'string',sortable:false},
            {name:'createDate',index:'createDate', width:150,align:'center', sorttype:'string',sortable:false},
            {name:'total',index:'total', width:150,align:'center', sorttype:'string',sortable:false},
            {name:'depositStr',index:'depositStr', width:150,align:'center',sortable:false},
            {name:'tdAmountStr',index:'tdAmountStr', width:150,align:'center',sortable:false},
            {name:'hxAmountStr',index:'hxAmountStr', width:150,align:'center', sorttype:'string',sortable:false},
            {name:'djjyAmountStr',index:'djjyAmountStr', width:150,align:'center', sorttype:'string',sortable:false},
            {name:'ydCode',index:'ydCode', width:200,align:'center', sorttype:'string',sortable:false},
            {name:'remark',index:'remark', width:200,align:'center', sorttype:'string',sortable:false},
            {name:'voucherNo',classes:'billsCodeStyle',index:'voucherNo', width:200,align:'center', sorttype:'string',sortable:false},
            {name:'voucherId',hidden:true},
            {name:'billsStatus',index:'billsStatus',width:80,align:'center',hidden:true},
            {name:'ssAmount',index:'ssAmount',width:80,align:'center',hidden:true},
            {name:'totalYsAmount',index:'totalYsAmount',width:80,align:'center',hidden:true},
        ]
    };
    retailmodal(retail);
    recedemodal(recede);
    handselmodal(handsel);
    locationhref();

//	零售单
    $(".retail").click(function(){
        $('.tab1').show();
        $('.spantab1').css('display','inline-block');
        $('.tab3').hide();
        $('.names').prop("placeholder","姓名、手机号、会员卡号");
        $(".search").attr("name","1");
        $("#retailGrid").resize();
        if(n1.indexOf('B_LSKD_0002') == -1){
            $('.B_LSKD_0002').hide();
        }else{
            $('.B_LSKD_0002').show();
        }

    })

//	退货单
    $(".recede").click(function(){
        $('.tab1').show();
        $('.spantab1').hide();
        $('.tab3').hide();
        $('.names').prop("placeholder","姓名、手机号、会员卡号");
        $(".search").attr("name","2");
        $("#recedeGrid").resize();
        if(n2.indexOf('B_LSTHD_0002') == -1){
            $('.B_LSTHD_0002').hide();
        }else{
            $('.B_LSTHD_0002').show();
        }
    })

//	定金单
    $(".handsel").click(function(){
        $('.tab3').show();
        $('.spantab1').hide();
        $('.tab1').hide();
        $('.names').prop("placeholder","姓名、手机号");
        $(".search").attr("name","3");
        $("#handselGrid").resize();
        if(n3.indexOf('B_LSDJD_0008') == -1 && n4.indexOf('B_LSTDD_0009') == -1 ){
            $('.B_LSKD_0002').hide();
        }else{
            $('.B_LSKD_0002').show();
        }
    })

//	重置
    $(".reset").click(function(){
        $("#navFrom")[0].reset();
        $('#storeInp').data('sectionId',"");
        $('#goodsInp').data('goodsId',"");
        $('#saleInp').data('employeeId',"");
        $('.goodsType').data('id','');
        $('#navFrom ul').html('')
        $("#navFrom table tbody .jqgrow").remove()
    })

//	零售新开单
    $(".newRetail").click(function(){
        window.parent.openWorkBoxByMenutext('零售开单',basePath + '/inventory/retail/delivery/main');
    })

//	退货新开单
    $(".newRecede").click(function(){
        window.parent.openWorkBoxByMenutext('零售退货单',basePath + '/inventory/retail/returnGoods/main');
    })

//	定金新开单
    $(".newHandsel").click(function(){
        window.parent.openWorkBoxByMenutext('零售定金单',basePath + '/retail/deposit/retailDepositMain');
    })

    $('.newOrder').click(function(){
        var name = $(".search").attr("name");
        if(name == 1){
            var flag = $('.newOrder').attr('flag');
            if(flag == "t"){
                window.parent.openWorkBoxByMenutext('零售定金单',basePath + '/retail/deposit/retailDepositMain');
            }else{
                window.parent.openWorkBoxByMenutext('零售开单',basePath + '/inventory/retail/delivery/main');
            }

        }else if(name == 2){
            window.parent.openWorkBoxByMenutext('零售退货单',basePath + '/inventory/retail/returnGoods/main');
        }else{
            var type = $('.payRemand').data('typeId');
            if(type == 48){
                window.parent.openWorkBoxByMenutext('零售定金单',basePath + '/retail/deposit/retailDepositMain');
            }else{
                window.parent.openWorkBoxByMenutext('零售退定单',basePath + '/retail/reDeposit/retailReDepositMain');
            }
        }
    })

//	单据日志
    $('.billslog').mouseover(function(){
        $('.billsdetail').show();
    }).mouseout(function(){
        $('.billsdetail').hide();
    })

    $('.paylog').mouseover(function(){
        $('.paydetail').show();
    }).mouseout(function(){
        $('.paydetail').hide();
    })


//	零售红冲
    $(".retailRed").click(function(){
        var ids = $("#retailGrid").jqGrid('getGridParam','selarrrow');
        var obj = $("#retailGrid").getRowData(ids);
        var name = $(".search").attr("name");
        if(ids.length != 1){
            $.zxsaas_plus.showalert("提示","请选择一条需要红冲的数据");
            return
        }
        if(name == "3"){
            $(".redSave").data('id',obj.id);
        }else{
            $(".redSave").data('id',obj.orderId);
        }
        codeDate(obj.billsCode,'.redTime');
        $('#redModal').modal('show');
    })

    //	退货红冲
    $(".recedeRed").click(function(){
        var ids = $("#recedeGrid").jqGrid('getGridParam','selarrrow');
        var obj = $("#recedeGrid").getRowData(ids);
        var name = $(".search").attr("name");
        if(ids.length != 1){
            $.zxsaas_plus.showalert("提示","请选择一条需要红冲的数据");
            return
        }
        codeDate(obj.billsCode,'.redTime');
        $(".redSave").data('id',obj.orderId);
        $('#redModal').modal('show');
    })

//	红冲
    $(".redSave").click(function(){
        var name = $(".search").attr("name");
        var obj = {};
        if(name == "3"){
            obj.billsId = $(".redSave").data('id');
            obj.billsType = $(".redSave").data('typeId');
            obj.redDate = $('.redTime').val();
            $.request({
                url: '/manager/inventory/retail/cashier/redReDepositOrder',
                type: "POST",
                datatype : "json",
                contentType: "application/json",
                data: JSON.stringify(obj),
                success: function (data) {
                    if(data.result==1){
                        $.zxsaas_plus.showalert("提示","红冲成功");
                        $("#handselGrid").trigger("reloadGrid");
                    }else{
                        $.zxsaas_plus.showalert("error",data.desc);
                    }
                    $('#redModal').modal('hide');
                },
                error: function (msg) {
                    $.zxsaas_plus.showalert("error"," 红冲失败！" + msg);
                }
            });
        }
        if(name == "1"){
            $.request({
                url: '/manager/inventory/retail/cashier/retailRcopyRetail',
                type: "POST",
                datatype : "json",
                data: {
                    id: $(".redSave").data('id'),
                    rcopyDate : $('.redTime').val()
                },
                success: function (data) {
                    if(data.result == 1){
                        $.zxsaas_plus.showalert("提示","红冲成功");
                        $("#retailGrid").trigger("reloadGrid");
                    }else{
                        $.zxsaas_plus.showalert("提示",data.desc);
                    }
                    $('#redModal').modal('hide');
                },
                error: function (msg) {
                    $.zxsaas_plus.showalert("error"," 红冲失败！" + msg);
                }
            });
        }
        if(name == "2"){
            $.request({
                url: '/manager/inventory/retail/cashier/retailRcopyReturn',
                type: "POST",
                datatype : "json",
                data: {
                    id: $(".redSave").data('id'),
                    rcopyDate : $('.redTime').val()
                },
                success: function (data) {
                    if(data.result == 1){
                        $.zxsaas_plus.showalert("提示","红冲成功");
                        $("#recedeGrid").trigger("reloadGrid");
                    }else{
                        $.zxsaas_plus.showalert("提示",data.desc);
                    }
                    $('#redModal').modal('hide');
                },
                error: function (msg) {
                    $.zxsaas_plus.showalert("error"," 红冲失败！" + msg);
                }
            });
        }

    })

//	查询
    $(".search").click(function(){
        $('.retailReturn,.debt,.retailCope,.retailRed,.recedeCope,.recedeRed,.handselReturn,.handselCopy,.handselRed').attr('disabled',false);
        var name = $(".search").attr("name");
        if(name == "1"){
            var obj = jsonMes();
            $("#retailGrid").jqGrid("setGridParam",{
                url: basePath + '/inventory/retail/cashier/loadRetailOrder',
                datatype:'json',
                page: 1,
                postData: obj
            }).trigger("reloadGrid");
        }else if(name == "2"){
            var obj = jsonMes();
            $("#recedeGrid").jqGrid("setGridParam",{
                url: basePath + '/inventory/retail/cashier/loadReturnOrder',
                datatype:'json',
                page: 1,
                postData: obj
            }).trigger("reloadGrid");
        }else{
            var obj = jsonMes2();
            $("#handselGrid").jqGrid("setGridParam",{
                url: basePath + '/inventory/retail/cashier/loadDepositOrder',
                datatype:'json',
                page: 1,
                postData: obj
            }).trigger("reloadGrid");
        }
    })

//	定金单单据查询
    $(".handselBill").change(function(){
        if($(this).val() == 50){
            $(".handselRemand").val('0');
            $(".handselRemand").prop('disabled',true);
            $(".handselSure").val('0');
            $(".handselSure").prop('disabled',true);
        }else{
            $(".handselRemand").prop('disabled',false);
            $(".handselSure").prop('disabled',false);
        }
        var obj = jsonMes2();
        $("#handselGrid").jqGrid("setGridParam",{
            url: basePath + '/inventory/retail/cashier/loadDepositOrder',
            datatype:'json',
            page: 1,
            postData: obj
        }).trigger("reloadGrid");
        $('.handselReturn,.handselCopy,.handselRed').attr('disabled',false);
    })

    $(".handselBill,.handselRemand,.handselSure").change(function(){
        var obj = jsonMes2();
        $("#handselGrid").jqGrid("setGridParam",{
            url: basePath + '/inventory/retail/cashier/loadDepositOrder',
            datatype:'json',
            page: 1,
            postData: obj
        }).trigger("reloadGrid");
        $('.handselReturn,.handselCopy,.handselRed').attr('disabled',false);
    })


    //	零售单收回欠款
    $(".debt").click(function(){
        var ids = $("#retailGrid").jqGrid('getGridParam','selarrrow');
        var obj = $("#retailGrid").getRowData(ids);
        var num = $("#retailGrid").jqGrid('getCell',ids[0],'clearStatus');
        if(ids.length != 1){
            $.zxsaas_plus.showalert("提示","请选择一条需要修改的数据");
            return
        }
        if(num == 1){
            $('.debtBox input').val("");
            $("#debtModal").modal('show');
            $('.debtqi').text(obj.totRemDebtAmountStr);
            $('.debtqi').attr("num",obj.totRemDebtAmount);
            $('.debtsi').text('0.00');
            // $('#debtSection').val(userSecName).data('sectionId',userSecId);
            codeDate(obj.billsCode,'.debtTime',false)
            $('.debtTime').attr('disabled',false);
            getPay();
        }else{
            $.zxsaas_plus.showalert("提示","此单据欠款已结清");
        }
    })

//	本单退定计算
    $('.exitRow input').change(function(){
        exitst();
    })

    function exitst(){
        var num = 0;
        $('.exitRow input').each(function(i,item){
            var val = $(item).val();
            if( val== ""){
                val =0;
            }
            num+= val*1
        })
        $('.exitblue').text(num.toFixed(2));
    }

//	收回欠款计算
    $('.inptab,.wipe').change(function(){
        inptabst();
    })

    function inptabst(){
        var num = 0;
        $('.debtRows>input').each(function(i,item){
            var val = $(item).val();
            if( val== ""){
                val =0;
            }
            num+= val*1
        })
        $('.debtsi').text(num.toFixed(2));
    }

//	收回欠款结算
    $(".debtSave").click(function(){
        var debtqi = $('.debtqi').attr('num')*1;
        var debtsi = $('.debtsi').text()*1;
        if($('#debtMan').val() == ""){
            $.zxsaas_plus.showalert("提示","请填写收款人");
            return
        }
        if(debtsi <= 0){
            $.zxsaas_plus.showalert("提示","收款金额必须大于0");
            return
        }
        if(debtqi < debtsi){
            $.zxsaas_plus.showalert("提示","收款金额不能大于欠款金额");
            return
        }
        var ids = $("#retailGrid").jqGrid('getGridParam','selarrrow');
        var obj = $("#retailGrid").getRowData(ids);
        var detailDraftList = [];
        if($("#postab .posval").length>0){
            $("#postab tbody tr").each(function(index,item){
                if($(item).find(".posval").val().trim() !== ""){
                    var detailDraft = {};
                    detailDraft.accountId = $(item).find(".posid").data("id");
                    detailDraft.accountType = $('.pos').data("accountType");
                    detailDraft.payreceiptAmout = $(item).find(".posval").val().trim();
                    detailDraftList.push(detailDraft);
                }
            });
        }
        if($("#otherstab .othersval").length>0){
            $("#otherstab tbody tr").each(function(index,item){
                if($(item).find(".othersval").val().trim() !== ""){
                    var detailDraft = {};
                    detailDraft.accountId = $(item).find(".othersid").data("id");
                    detailDraft.accountType = $('.others').data("accountType");
                    detailDraft.payreceiptAmout = $(item).find(".othersval").val().trim();
                    detailDraftList.push(detailDraft);
                }
            });
        }
        $('.inptab').each(function(i,item){
            if($(item).prop('disabled') == false && $(item).val().trim() !== ""){
                var detailDraft = {};
                detailDraft.accountId = $(item).data("id");
                detailDraft.accountType = $(item).data("accountType");
                detailDraft.payreceiptAmout = $(item).val().trim();
                detailDraftList.push(detailDraft);
            }
        })
        var data = {
            'sectionId' : $("#debtSection").data('sectionId')*1,
            'managersUid' : $("input[name='debtManId']").val()*1,
            'billsDate' : $(".debtTime").val(),
            'remark' : $(".debtRemark").val().trim(),
            'saleDiscount' : $(".wipe").val()*1,
            'contactsunitId' : obj.contactsunitId*1,
            'billsId' : obj.orderId*1,
            'detailDraftList' : detailDraftList
        }
        $.request({
            url: '/manager/inventory/retail/cashier/saveReceipt',
            type: "POST",
            datatype : "json",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (data) {
                if(data.result==1||data.desc=='保存失败,错误信息:单据生成成功，生成凭证失败'){
                    $('#debtModal').modal('hide');
                    $.zxsaas_plus.showalert("提示",'保存成功');
                    $("#retailGrid").trigger("reloadGrid");
                } else {
                    $.zxsaas_plus.showalert("error",data.desc);
                }
            },
            error: function (msg) {
                $.zxsaas_plus.showalert("error"," 数据保存失败！" + msg);
            }
        });
    })

    //	零售退定
    $("#exitSure").click(function(){
        var red = $('.exitred').text()*1;
        var blue = $('.exitblue').text()*1;

        if(red != blue){
            $.zxsaas_plus.showalert("提示","结算失败,应退金额与实退金额不符");
            return
        }
        if(red == 0){
            $.zxsaas_plus.showalert("提示","结算失败,应退金额与实退金额不能0");
            return
        }

        var ids = $("#handselGrid").jqGrid('getGridParam','selarrrow');
        var obj = $("#handselGrid").getRowData(ids);
        var detailDraftList = [];
        if($("#exitpostab .eposval").length>0){
            $("#exitpostab tbody tr").each(function(index,item){
                if($(item).find(".eposval").val().trim() !== ""){
                    var detailDraft = {};
                    detailDraft.accountId = $(item).find(".eposid").data("id");
                    detailDraft.accountType = $('.epos').data("accountType");
                    detailDraft.payreceiptAmout = $(item).find(".eposval").val().trim();
                    detailDraftList.push(detailDraft);
                }
            });
        }
        if($("#exitotherstab .eothersval").length>0){
            $("#exitotherstab tbody tr").each(function(index,item){
                if($(item).find(".eothersval").val().trim() !== ""){
                    var detailDraft = {};
                    detailDraft.accountId = $(item).find(".eothersid").data("id");
                    detailDraft.accountType = $('.eothers').data("accountType");
                    detailDraft.payreceiptAmout = $(item).find(".eothersval").val().trim();
                    detailDraftList.push(detailDraft);
                }
            });
        }
        $('.einptab').each(function(i,item){
            if($(item).prop('disabled') == false && $(item).val().trim() !== ""){
                var detailDraft = {};
                detailDraft.accountId = $(item).data("id");
                detailDraft.accountType = $(item).data("accountType");
                detailDraft.payreceiptAmout = $(item).val().trim();
                detailDraftList.push(detailDraft);
            }
        })

        // 封装参数
        var data = {
            'salesmanId' : $("#exitMan").data('employeeId'),	//办理人ID
            'billsDate' : $('.exitTime').val(),	//单据日期
            'sectionId' : $("#exitstore").data('sectionId'),//门店ID
            'billsAmount' : $('.exitred').text(),	//单据金额(退定金额合计)
            'sfAmount' : $('.exitblue').text(), //实付金额(付款金额合计)
            'memberId' : $('#exitTab').data('id'), //会员ID
            'customName' : $('.exitname').val(),//客户姓名
            'telephone' : $('.exitphone').val(),//联系电话
            'totalYfAmount' : $('.exitred').text(),//应付合计
            'remark' : $('.exitText').val(),//备注
            'depositMainId' : obj.id	//定金单ID
        };


        var goodsList = [];
        $("#exitTab tbody tr").each(function(i,item){
            var retailDepositDraft={};
            retailDepositDraft.depositMainId = $(item).attr("depositMainId");
            retailDepositDraft.depositId = $(item).attr("depositId");
            retailDepositDraft.goodsId = $(item).attr("goosId");
            retailDepositDraft.unsubscribeAmount = $(item).find(".exittd").val();
            retailDepositDraft.unsubscribeNum = $(item).find(".exitnum").val();
            retailDepositDraft.remark = $(item).attr("remark");
            goodsList.push(retailDepositDraft);
        });

        data.goodsList = goodsList;
        data.payList = detailDraftList;

        $.request({
            url: '/manager/inventory/retail/cashier/depositDetail',
            type: "POST",
            datatype : "json",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (data) {
                if(data.result==1||data.desc=='保存失败,错误信息:单据生成成功，生成凭证失败'){
                    $.zxsaas_plus.showalert("提示",'保存成功');
                    $('#exitModal').modal('hide');
                    $("#handselGrid").trigger("reloadGrid");
                } else {
                    $.zxsaas_plus.showalert("error",data.desc);
                }
            },
            error: function (msg) {
                $.zxsaas_plus.showalert("error"," 数据保存失败！" + msg);
            }
        });
    })

//	pos
    $(".pos").focus(function(){
        if($(this).data('show') == "true"){
            $(".posDiv").show();
            $(".othersDiv").hide();
            var h = $(".posDiv").height() + 60;
            $(".posDiv").css('top',"-"+ h +"px");
        }
    })

    $("#postAmountSure").click(function(){
        $(".posDiv").hide();
        var num = 0;
        $(".posval").each(function(){
            num+= $(this).val()*1;
        })
        $('.pos').val(num.toFixed(2));
        inptabst();
    })

    $('#postAmountNone').click(function(){
        $(".posDiv").hide();
    })

//	exitpos
    $(".epos").focus(function(){
        if($(this).data('show') == "true"){
            $(".exitpos").show();
            $(".exitother").hide();
            var h = $(".exitpos").height() + 60;
            $(".exitpos").css('top',"-"+ h +"px");
        }
    })

    $("#exitposSure").click(function(){
        $(".exitpos").hide();
        var num = 0;
        $(".eposval").each(function(){
            num+= $(this).val()*1;
        })
        $('.epos').val(num.toFixed(2));
        exitst();
    })

    $('#exitposNone').click(function(){
        $(".exitpos").hide();
    })

//	others
    $(".others").focus(function(){
        if($(this).data('show') == "true"){
            $(".othersDiv").show();
            $(".posDiv").hide();
            var h = $(".othersDiv").height() + 60;
            $(".othersDiv").css('top',"-"+ h +"px");
        }
    })

    $("#othersAmountSure").click(function(){
        $(".othersDiv").hide();
        var num = 0;
        $(".othersval").each(function(){
            num+= $(this).val()*1;
        })
        $('.others').val(num.toFixed(2));
        inptabst();
    })

    $('#othersAmountNone').click(function(){
        $(".othersDiv").hide();
    })

//	exitother
    $(".eothers").focus(function(){
        if($(this).data('show') == "true"){
            $(".exitother").show();
            $(".exitpos").hide();
            var h = $(".exitother").height() + 20;
            $(".exitother").css('top',"-"+ h +"px");
        }
    })

    $("#exitotherSure").click(function(){
        $(".exitother").hide();
        var num = 0;
        $(".eothersval").each(function(){
            num+= $(this).val()*1;
        })
        $('.eothers').val(num.toFixed(2));
        exitst();
    })

    $('#exitotherNone').click(function(){
        $(".exitother").hide();
    })

//	零售、定金保存备注修改
    $(".savePay").click(function(){
        var id = $(".savePay").attr('orderId');
        var rid = $(".savePay").attr('rid');
        var name = $(".savePay").attr('name');
        if(name == "retail"){
            rid = false;
        }
        var remark = $(".payRemark").val().trim();
        $.request({
            type: 'post',
            url: "/manager/inventory/retail/cashier/updateDepositRemark",
            data:{
                'orderId': id,
                'remark': remark
            },
            dataType: "json",
            success: function(data) {
                if(data.result == 1){
                    $('#payModal').modal('hide');
                    if(rid !== false){
                        $('#handselGrid').jqGrid('setCell',rid,'remark',remark);
                    }
                    $.zxsaas_plus.showalert("提示",data.desc);
                }else{
                    $.zxsaas_plus.showalert("提示",data.desc);
                }
            }
        });
    })

    //	零售、退货保存备注修改
    $(".savebills").click(function(){
        var id = $(".savebills").attr('orderId');
        var rid = $(".savebills").attr('rid');
        var name = $(".savebills").attr('name');
        var remark = $(".billsRemark").val().trim();
        if(name == "retail"){
            var url = "/manager/inventory/retail/cashier/updateRetailRemark";
            var table = "#retailGrid";
        }else{
            var url = "/manager/inventory/retail/cashier/updateReturnRemark";
            var table = "#recedeGrid";
        }
        $.request({
            type: 'post',
            url: url,
            data:{
                'orderId': id,
                'remark': remark
            },
            dataType: "json",
            success: function(data) {
                if(data.result == 1){
                    $('#billsModal').modal('hide');
                    $(table).jqGrid('setCell',rid,'remark',remark);
                    $.zxsaas_plus.showalert("提示",data.desc);
                }else{
                    $.zxsaas_plus.showalert("提示",data.desc);
                }
            }
        });
    })

//	零售单上一单
    $(".billsP").click(function(){
        var id = $('.billsRemand').data('order');
        var str = $(this).data('code');
        var type = $('.bills').attr('billstype');
        var name = $('.search').attr('name');
        if(name == 1){
            getRetail(id,str,type)
        }
        if(name == 2){
            getRetail(id,str,type)
        }
    });

//	定金单上一单
    $(".payP").click(function(){
        var id = $('.payRemand').data('order');
        var str = $(this).data('code');
        var name = $('.search').attr('name');
        if(name == 1){
            var type = "48";
        }
        if(name == 3){
            var type = $('.payRemand').data('typeId');

        }
        getHandsel(id,type,str,true);
    });

//	零售单下一单
    $(".billsN").click(function(){
        var id = $('.billsRemand').data('order');
        var type = $('.bills').attr('billstype');
        var str = $(this).data('code');
        var name = $('.search').attr('name');
        if(name == 1){
            getRetail(id,str,type)
        }
        if(name == 2){
            getRetail(id,str,type)
        }
    });

//	定金单下一单
    $(".payN").click(function(){
        var id = $('.payRemand').data('order');
        var str = $(this).data('code');
        var name = $('.search').attr('name');
        if(name == 1){
            var type = "48";
        }
        if(name == 3){
            var type = $('.payRemand').data('typeId');
        }
        getHandsel(id,type,str,true);
    });

//	本单退定
    $(".payRemand").click(function(){
        var id = $('.payRemand').data('order');
        var empId = $('#exitMan').data('id');
        var sectionId =  $("#exitstore").data('id')
        $('.exitred').text('0.00');
        $('.exitblue').text('0.00');
        $('#exitstore').data('sectionId',sectionId);
        // $("#exitstore").data('sectionId',userSecId);
        $("#exitMan").data('employeeId',empId);
        $('#exitModal').modal('show');
        $('#payModal').modal('hide');
        var txt = $('.pay').text();
        codeDate(txt,'.exitTime');
        getExit(id);
    });

//	零售本单退货
    $(".retailReturn").click(function(){
        var ids = $("#retailGrid").jqGrid('getGridParam','selarrrow');
        var obj = $("#retailGrid").getRowData(ids);
        if(ids.length!=1){
            $.zxsaas_plus.showalert("提示","请选择一条需要退定的数据");
        }else{
            window.parent.openWorkBoxByMenutext('零售退货单',basePath + '/inventory/retail/returnGoods/main?bId='+ obj.orderId,true);
        }
    });

    $(".billsRemand").click(function(){
        var orderId = $(".billsRemand").data('order');
        var status = $('.bills').text();
        if(status.split('_')[1] == "R"){
            $.zxsaas_plus.showalert("提示","红冲单不能退货");
            return
        }
        window.parent.openWorkBoxByMenutext('零售退货单',basePath + '/inventory/retail/returnGoods/main?bId='+ orderId,true);
    });

//	零售退货复制一单
    $(".recedeCope").click(function(){
        var ids = $("#recedeGrid").jqGrid('getGridParam','selarrrow');
        var obj = $("#recedeGrid").getRowData(ids);
        if(ids.length != 1){
            $.zxsaas_plus.showalert("提示","请选择一条需要复制的数据");
            return
        }
        window.parent.openWorkBoxByMenutext('零售退货单',basePath + '/inventory/retail/returnGoods/main?bId='+ obj.orderId +'&operateType=copes',true);
    });

//	定金单本单退定
    $(".handselReturn").click(function(){
        var ids = $("#handselGrid").jqGrid('getGridParam','selarrrow');
        var obj = $("#handselGrid").getRowData(ids);
        if(ids.length != 1){
            $.zxsaas_plus.showalert("提示","请选择一条需要退定的数据");
            return;
        }
        if(obj.typeId == 48){
            if(obj.djjyAmountStr > 0){
                $('.exitred').text("0.00");
                $('.exitblue').text("0.00");
                $('.exitRow input').val("");
                // $('#exitstore').val(userSecName);
                var sectionId = $('#exitstore').data('id');
                $("#exitstore").data('sectionId',sectionId);
                var empId = $('#exitMan').data('id');
                $("#exitMan").data('employeeId',empId);
                $('#exitModal').modal('show');
                $('.exitText').val(obj.remark);
                codeDate(obj.billsCode,'.exitTime');
                getExit(obj.id);
            }else{
                $.zxsaas_plus.showalert("提示","定金结余大于0的定金单才能退定");
            }
        }else{
            $.zxsaas_plus.showalert("提示","非定金单不能退定");
        }
    });

//	零售复制一单
    $(".retailCope").click(function(){
        var ids = $("#retailGrid").jqGrid('getGridParam','selarrrow');
        var obj = $("#retailGrid").getRowData(ids);
        if(ids.length != 1){
            $.zxsaas_plus.showalert("提示","请选择一条需要复制的数据");
            return
        }
        window.parent.openWorkBoxByMenutext('零售开单',basePath + '/inventory/retail/delivery/main?bId='+ obj.orderId,true);
    });


//	定金复制一单
    $(".handselCopy").click(function(){
        var ids = $("#handselGrid").jqGrid('getGridParam','selarrrow');
        var obj = $("#handselGrid").getRowData(ids);
        if(ids.length != 1){
            $.zxsaas_plus.showalert("提示","请选择一条需要复制的数据");
            return
        }
        if(obj.typeId == 48){
            window.parent.openWorkBoxByMenutext('零售定金单',basePath + '/retail/deposit/retailDepositMain?retailMainId='+ obj.id,true);
        }else{
            window.parent.openWorkBoxByMenutext('零售退定单',basePath + '/retail/reDeposit/retailReDepositMain?bId='+ obj.id,true);
        }
    });

    $(".copes").click(function(){
        var name = $('.search').attr('name');
        if(name == 1){
            var status = $('.bills').text();
            if(status.split('_')[1] == "R"){
                $.zxsaas_plus.showalert("提示","红冲单不能复制");
            }else{
                var flag = $('.newOrder').attr('flag');
                if(flag == "f"){
                    var orderId = $('.savebills').attr('orderid');
                    window.parent.openWorkBoxByMenutext('零售开单',basePath + '/inventory/retail/delivery/main?bId='+ orderId,true);
                }
                if(flag == "t"){
                    var id = $(".pay").attr('orderId');
                    window.parent.openWorkBoxByMenutext('零售定金单',basePath + '/retail/deposit/retailDepositMain?retailMainIdCopy='+ id,true);
                }
            }
        }
        if(name == 2){
            var id = $(".savebills").attr('orderid');
            window.parent.openWorkBoxByMenutext('零售退货单',basePath + '/inventory/retail/returnGoods/main?bId='+ id +'&operateType=copes',true);
        }
        if(name == 3){
            var id = $(".savePay").attr('orderId');
            var type = $('.payRemand').data('typeId');
            if(type == 48){
                window.parent.openWorkBoxByMenutext('零售定金单',basePath + '/retail/deposit/retailDepositMain?retailMainIdCopy='+ id,true);
            }else{
                window.parent.openWorkBoxByMenutext('零售退定单',basePath + '/retail/reDeposit/retailReDepositMain?bId='+ id,true);
            }
        }
    });

//	定金单红冲退定
    $(".handselRed").click(function(){
        var ids = $("#handselGrid").jqGrid('getGridParam','selarrrow');
        var obj = $("#handselGrid").getRowData(ids);
        if(ids.length != 1){
            $.zxsaas_plus.showalert("提示","请选择一条需要红冲的数据");
            return
        }
        if(obj.typeId == 50){
            codeDate(obj.billsCode,'.redTime');
            $(".redSave").data('id',obj.id);
            $(".redSave").data('typeId',obj.typeId);
            $('#redModal').modal('show');
        }else{
            $.zxsaas_plus.showalert("提示","非退定单不能红冲");
        }
    });

//	红冲
    $(".reds").click(function(){
        var name = $('.search').attr('name');
        if(name == 1){
            var id = $(".savebills").attr('orderId');
            var status = $('.copes').attr('billsStatus');
            if(status == 7){
                $.zxsaas_plus.showalert("提示","该单据已红冲");
            }else{
                var code = $('.bills').text();
                codeDate(code,'.redTime');
                $(".redSave").data('id',id);
                $('#redModal').modal('show');
            }
        }
        if(name == 2){
            var code = $('.bills').text();
            codeDate(code,'.redTime');
            var id = $(".savebills").attr('orderid');
            var type = 50;
            $(".redSave").data('id',id);
            $(".redSave").data('typeId',type);
            $('#redModal').modal('show');
        }
        if(name == 3){
            var code = $('.pay').text();
            codeDate(code,'.redTime');
            var id = $(".savePay").attr('orderid');
            var type = 50;
            $(".redSave").data('id',id);
            $(".redSave").data('typeId',type);
            $('#redModal').modal('show');
        }
    });

    //稽核、取消稽核
    $('.listAudit').click(function () {
        var $this=$(this)
        var billsId=''
        var name = $('.search').attr('name');
        var tableName='';
        var auditStatus=$this.data('auditstatus')
        var billsType=$this.data('billstype')
        //是否是模态框中的稽核
        var modal=$this.data('modal')
        if(name==1){
            tableName='#retailGrid'
        }
        else if(name==2){
            tableName='#recedeGrid'
        }
        else if(name==3){
            tableName='#handselGrid'
        }

        var selRowId = $(tableName).jqGrid('getGridParam','selarrrow');

        if(selRowId.length<1){
            $.zxsaas_plus.showalert('提示', "请勾选数据!");
            return false;
        }
        var mainIds=[];
        var mainBillsType=[]
        for(var i=0;i<selRowId.length;i++){
            var rowData = $(tableName).jqGrid('getRowData', selRowId[i]);
            if(!(rowData.billsStatus !=1 && rowData.auditStatus!=auditStatus)){
                if(auditStatus==1){
                    $.zxsaas_plus.showalert('提示', "只能对正式且未稽核单据稽核!");
                }else{
                    $.zxsaas_plus.showalert('提示', "只能对已稽核单据取消稽核!");
                }
                return false;
            }
            mainIds.push((rowData.orderId||rowData.id))

            if(name==3){
                mainBillsType.push(rowData.typeId)
                billsType=rowData.typeId
            }
        }


        if(mainIds.length>0){
            if(name==3 &&(functionObjExtent.unique(mainBillsType)).length>1){
                $.zxsaas_plus.showalert('提示', "只能选择同一种单据类型的单据进行批量操作!");
                return false;
            }


            var updateData={
                billsId:mainIds.join(','),
                auditStatus:auditStatus,
                billsType:billsType,
            }
            setAuditStatus(updateData,function () {
                $(tableName).jqGrid('clearGridData').trigger('reloadGrid')
            })
        }

    })
    //生成凭证
    $('.voucher').click(function () {
        var $this=$(this)

        var name = $('.search').attr('name');
        var tableName='';
        var menuCode=$this.data('menucode')
        if(name==1){
            tableName='#retailGrid'
        }
        else if(name==2){
            tableName='#recedeGrid'
        }
        else if(name==3){
            tableName='#handselGrid'
        }

        var selRowId = $(tableName).jqGrid('getGridParam','selarrrow');

        if(selRowId.length<1){
            $.zxsaas_plus.showalert('提示', "请勾选数据!");
            return false;
        }
        var mainIds=[];
        var mainBillsType=[]
        for(var i=0;i<selRowId.length;i++){
            var rowData = $(tableName).jqGrid('getRowData', selRowId[i]);
            if((rowData.billsStatus ==1)){
                $.zxsaas_plus.showalert('提示', "只能正式单据才能生成凭证!");
                return false;
            }
            mainIds.push((rowData.orderId||rowData.id))
            if(name==3){
                mainBillsType.push(rowData.typeId)

                if(rowData.typeId==48){
                    //零售定金单
                    menuCode='LSDJD'
                }else if(rowData.typeId==50){
                    //零售退定单
                    menuCode='LSTDD'
                }
            }
        }


        if(mainIds.length>0){
            if(name==3 &&(functionObjExtent.unique(mainBillsType)).length>1){
                $.zxsaas_plus.showalert('提示', "只能选择同一种单据类型的单据进行批量操作!");
                return false;
            }

            var updateData={
                billsIds:mainIds.join(','),
                menuCode:menuCode,
            }
            $.ajaxPackage({
                url:'/manager/inventory/common/batchSaveGenerateVoucher',
                data:updateData,
                success:function (data) {
                    $.zxsaas_plus.showalert('提示', data.data.executeResult);
                    $(tableName).jqGrid('clearGridData').trigger('reloadGrid')
                }
            })


        }

    })

//	打印
    $(".print").click(function(){
        var name = $('.search').attr('name');
        //退货单
        if(name == 2){
            var id = $(".billsRemand").data('order');
            $.printBills(basePath + '/inventory/retail/cashier/syttuihuo',{billsId:id});
        }
        //定金单
        if(name == 3){
            var id = $(".pay").attr('orderId');
            var type = $('.payRemand').data('typeId');
            if(type == 48){
                $.printBills(basePath + '/retail/print/dingjin',{billsId:id});
            }else{
                $.printBills(basePath + '/retail/print/tuiding',{billsId:id});
            }
        }
    });

   // 导出
    $(".retailExport").click(function(){
        var name = $('.search').attr('name');
        //开单
        if(name == 1){
            var obj = jsonMes();
            functionObjExtent.construtForm('/manager/inventory/retail/cashier/retailOrderExport', obj)
        }
        //退货单
        if(name == 2){
            var obj = jsonMes();
            functionObjExtent.construtForm('/manager/inventory/retail/cashier/retailRefundExport', obj)
        }
        //定金单
        if(name == 3){
            var obj = jsonMes();
            functionObjExtent.construtForm('/manager/inventory/retail/cashier/retailDepositExport', obj)
        }
    });
    // 打印
    printComObj = $('.printCom').comXiaoPiao();
});

function getPay(){
    var id = $('#debtSection').data('sectionId');
    if(id == ""){
        $.zxsaas_plus.showalert("error","请选择门店");
    }
    $.request({
        type: 'post',
        url: "/manager/inventory/retail/cashier/findAccountList",
        data:{
            'sectionId': id
        },
        dataType: "json",
        success: function(data) {
            var list = data.data.accountList;
            var postr = "";
            var otherstr = "";
            $('.cash,.alipay,.wechat').attr("disabled",true);
            var num = {a1 : 0,a2 : 0,a3 : 0,a4 : 0,a5 : 0};
            if(list.length == undefined){
                return
            }
            for(var i =0;i<list.length;i++){
                var n = list[i].accountType*1;
                switch(n){
                    case 1:
                        num.a1++;
                        $('.cash').data("id",list[i].accountId);
                        $('.cash').data('accountType',list[i].accountType);
                        $('.cash').attr("disabled",false);
                        break;
                    case 2:
                        num.a2++;
                        $('.pos').data("accountType",list[i].accountType);
                        postr += '<tr><td>'+ num.a2 +'</td><td class="posid" data-id='+ list[i].accountId +'>'+ list[i].accountName +
                            '</td><td><input type="text" class="form-control posval" onkeyup="checkInput.checkNum(this,12)" ></td></tr>';
                        break;
                    case 4:
                        num.a4++;
                        $('.alipay').data("id",list[i].accountId);
                        $('.alipay').data("accountType",list[i].accountType);
                        $('.alipay').attr("disabled",false);
                        break;
                    case 3:
                        num.a3++;
                        $('.wechat').data("id",list[i].accountId);
                        $('.wechat').data("accountType",list[i].accountType);
                        $('.wechat').attr("disabled",false);
                        break;
                    case 5:
                        num.a5++;
                        $('.others').data("id",list[i].accountId);
                        $('.others').data("accountType",list[i].accountType);
                        otherstr += '<tr><td>'+ num.a5 +'</td><td class="othersid" data-id='+ list[i].accountId +'>'+ list[i].accountName +
                            '</td><td><input type="text" class="form-control othersval" onkeyup="checkInput.checkNum(this,12)" ></td></tr>';
                        break;
                    default:
                        break;
                }
            }
            $('#postab tbody').html(postr);
            $('#otherstab tbody').html(otherstr);
            if(num.a2 == 0){
                $('.pos').data('show','false');
            }else{
                $('.pos').data('show','true');
            }
            if(num.a5 == 0){
                $('.others').data('show','false');
            }else{
                $('.others').data('show','true');
            }
        }
    });
}

function codeDate(obj,name,flag){
    var t = obj.split('-')[0];
    var reg = /[A-Z]/g;
    t = t.replace(reg,"");
    t = t.replace(t.substr(0,4),t.substr(0,4)+'-');
    t = t.replace(t.substr(0,7),t.substr(0,7)+'-');
	getAuthList(function () {
		var current_date = _authList.minDate;
		var min = CompareDate(current_date,t)?current_date:t;
		if(flag == false){
			$(name).datePlu({
				endDate:false,
				minTime: min,
				ifPermissions:false
			})
		}else{
			$(name).datePlu({
				endDate:false,
				minTime: min,
				defaultTime: min,
				ifPermissions:false
			})
		}
	})

}

function exitred(){
    var exittd = 0;
    $('.exittd').each(function(i,item){
        if($(item).val()==null){
            $(item).val("0");
        }
        exittd += $(item).val()*1
    })
    $('.exitred').text(exittd.toFixed(2));
}

function exitnum(obj,int,f){
    var t = $(obj).parent().prev().text()*1;
    var v = $(obj).val();
    if(v*1 < 0){
        $(obj).val('0')
        return
    }
    if(int == 1){
        v = parseInt(v);
    }else{
        v = parseFloat(v).toFixed(2);
    }
    if(isNaN(v)){
        $(obj).val("0");
    }else{
        if(v*1>=t){
            $(obj).val(t);
        }else{
            $(obj).val(v);
        }
        if(f == true){
            exitred()
        }
    }
}

var exitTab = $('#exitTab tbody tr').clone();
function getExit(id){
    $.request({
        type: 'post',
        url: "/manager/inventory/retail/cashier/loadReDepositDetailInfo",
        data:{
            'depositIds': id
        },
        dataType: "json",
        success: function(data) {
            if(data.result == 1){
                var list = data.data.accountList;
                var vo = data.data.customerVo;
                var goods = data.data.depositOrderList;
                $('.exitphone').val(vo.customerTel);
                $('.exitname').val(vo.customerName);
                if(list.length<1){
                    $('#exitTab tbody').html(exitTab);
                }else{
                    var exittr ="";
                    $.each(goods,function(i,item){
                        $('#exitTab').data('id',item.memberId);
                        item.configure = (item.configure == null)?"":item.configure;
                        exittr+= '<tr depositMainId='+ item.orderId + ' depositId='+ item.depositId +' goosId='+ item.id +
                            ' unsubscribeNum='+ item.unsubscribeNum + ' remark='+ item.remark +
                            '><td>'+ (i+1) + '</td><td class="shopMes"><div>'+ item.name +
                            '</div><div class="shopMesBox"><p class="shopp1">编码 :' + item.code +
                            '</p><p class="shopp1">型号 :' + item.models + '</p><p class="shopp2">颜色 :'+ item.color +
                            '</p><p class="shopp2">类别 :' + item.categoryName +
                            '</p><p class="shopp2">配置 :'+ item.configure +'</p></div></td><td>'+ item.code +
                            '</td><td>'+ item.retailPriceStr + '</td><td>'+ item.priceSumStr +
                            '</td><td>'+ item.total + '</td><td class="exittotal">'+ item.unsubscribeNum +
                            '</td><td><input type="text" class="form-control exitnum" onchange="exitnum(this,1,false)" value="0" /></td><td>'
                            + item.depositStr + '</td><td class="exitdj">'+ item.remainderAmountStr +
                            '</td><td><input type="text" class="form-control exittd" onchange="exitnum(this,2,true)" /></td><td>'
                            + item.saleManName1 +'</td><td>'+ item.remark + '</td></tr>'
                    });
                    $('#exitTab tbody').html(exittr);
                }

                var postr = "";
                var otherstr = "";
                $('.ecash,.ealipay,.ewechat').attr("disabled",true);
                var num = {a1 : 0,a2 : 0,a3 : 0,a4 : 0,a5 : 0};
                for(var i =0;i<list.length;i++){
                    var n = list[i].accountType*1;
                    switch(n){
                        case 1:
                            num.a1++;
                            $('.ecash').data("id",list[i].accountId);
                            $('.ecash').data('accountType',list[i].accountType);
                            $('.ecash').attr("disabled",false);
                            break;
                        case 2:
                            num.a2++;
                            $('.epos').data("accountType",list[i].accountType);
                            postr += '<tr><td>'+ num.a2 +'</td><td class="eposid" data-id='+ list[i].accountId +'>'+ list[i].accountName +
                                '</td><td><input type="text" class="form-control eposval" onkeyup="checkInput.checkNum(this,12)" ></td></tr>';
                            break;
                        case 4:
                            num.a4++;
                            $('.ealipay').data("id",list[i].accountId);
                            $('.ealipay').data("accountType",list[i].accountType);
                            $('.ealipay').attr("disabled",false);
                            break;
                        case 3:
                            num.a3++;
                            $('.ewechat').data("id",list[i].accountId);
                            $('.ewechat').data("accountType",list[i].accountType);
                            $('.ewechat').attr("disabled",false);
                            break;
                        case 5:
                            num.a5++;
                            $('.eothers').data("id",list[i].accountId);
                            $('.eothers').data("accountType",list[i].accountType);
                            otherstr += '<tr><td>'+ num.a5 +'</td><td class="eothersid" data-id='+ list[i].accountId +'>'+ list[i].accountName +
                                '</td><td><input type="text" class="form-control eothersval" onkeyup="checkInput.checkNum(this,12)" ></td></tr>';
                            break;
                        default:
                            break;
                    }
                }
                $('#exitpostab tbody').html(postr);
                $('#exitotherstab tbody').html(otherstr);
                if(num.a2 == 0){
                    $('.epos').data('show','false');
                }else{
                    $('.epos').data('show','true');
                }
                if(num.a5 == 0){
                    $('.eothers').data('show','false');
                }else{
                    $('.eothers').data('show','true');
                }
            }else{
                $.zxsaas_plus.showalert('提示',data.desc);
            }
        }
    });
}

function jsonMes(){
    var storeInp = $('#storeInp').data('sectionId');
    var goodsInp = $('#goodsInp').data('goodsId')||'';
    var isRed = $('.isRed').is(":checked")?"6,7":"6";
    var isDebt = $('.isDebt').is(":checked")?"1":"0";
    var obj = {
        startTime: $('.startTime').val(),
        endTime: $('.endTime').val(),
        accessSectionIds: storeInp,
        goodsIds: goodsInp,
        imeiOrBarcode: $('.imeis').val(),
        nameOrMobilePhoneOrCardNo: $('.names').val(),
        goodsCategoryId: $('.goodsType').data('id'),
        showTotRemDebtAmount: isDebt,
        auditStatus: $('#auditStatus').val(),
        isRedDashed: isRed
    }
    return obj
}

function jsonMes2(){
    var storeInp = $('#storeInp').data('sectionId');
    var saleInp = $('#saleInp').data('employeeId');
    var isRed = $('.isRed').is(":checked")?"6,7":"6";
    var obj = {
        startTime: $('.startTime').val(),
        endTime: $('.endTime').val(),
        accessSectionIds: storeInp,
        saleManId: saleInp,
        imeiOrBarcode: $('.imeis').val(),
        nameOrMobilePhone: $('.names').val(),
        billsCodeOrRemark: $('.CodeRemark').val(),
        auditStatus: $('#auditStatus').val(),
        isRedDashed: isRed,
        typeId: $('.handselBill').val(),
        isTD: $('.handselRemand').val(),
        isWC: $('.handselSure').val()
    }
    return obj
}

//本单退定
function deposit(id){
    $.request({
        type: 'post',
        url: "/manager/inventory/retail/cashier/depositDetail",
        data:{
            'id': id
        },
        dataType: "json",
        success: function(data) {
            console.log(data);
            if(data.result == 1){
                $.zxsaas_plus.showalert('提示',data.desc);
                $("#handselGrid").trigger("reloadGrid");
            }else{
                $.zxsaas_plus.showalert('提示',data.desc);
            }
        }
    });

}

//零售、退货单据
function getRetail(id,str,type){
    var obj = {
        id: id
    }
    if(str !== undefined){
        obj.page = str;
    }
    if(type !== undefined){
        obj.billsType = type;
    }
    var name = $('.search').attr('name');
    if(name == 1){
        loglist(id,'45','.billsdetail');
    }else if(name == 2){
        loglist(id,'46','.billsdetail');
    }
    getRetailServer(obj,function (data) {
        printComObj.setOption({
            billsId:data.data.obj.id,
            isJuHe:data.data.obj.payResultVo==null?false:true
        })
        printComObj.resetJuHe();

        var data = data.data.obj;
        var detail = (data.detailList == undefined)?"":data.detailList;
        var operator = (data.operatorList == undefined)?"":data.operatorList;
        var service = (data.serviceList == undefined)?"":data.serviceList;
        var coupon = (data.couponList == undefined)?"":data.couponList;
        var install = (data.installList == undefined)?"":data.installList;
        var payreceipt = (data.payreceiptList == undefined)?"":data.payreceiptList;
        data.memberTelephone = (data.memberTelephone == null)?"":data.memberTelephone;
        data.memberName = (data.memberName == null)?"":data.memberName;
        data.remark = (data.remark == null)?"":data.remark;

        if(data.oldBillsCode == null || data.oldBillsCode == ""){
            $('.oldbills').hide()
        }else{
            $('.oldbills').text('原单编号 ：'+ data.oldBillsCode).css('display','inline-block');
        }
        $('#billsModal .redimg').show()
        $('#billsModalForm').writeJson2Dom(data);
        $('#billsModal .redimg img').attr('')
        if (data.billsStatus == 7) {
            $('#billsModal .redimg img:eq(0)').attr('src', '/manager/images/status/statusRed.png');
        }
        if (data.auditStatus == 1) {
            $('#billsModal .redimg img:eq(1)').attr('src', '/manager/images/audit.png');
        } else {
            $('#billsModal .redimg img:eq(1)').attr('src', '/manager/images/auditNo.png');
        }

        if(data.billsStatus == 7){
            $('.billsRemand').hide();
            $('.reds').attr('disabled',true);
            if(data.billsCode.split('_')[1] == "R"){
                $('.copes').attr('disabled',true);
            }else{
                $('.copes').attr('disabled',false);
            }
        }else{
            $('.billsRemand').css('display','inline-block');
            $('.copes').attr('disabled',false);
            $('.reds').attr('disabled',false);
        }
        $('.reds').css('display','inline-block');
        // 按钮权限
        if(name == 1){
            $('.payNav .btn,.payRight i,.billslog,.savebills').hide();
            $.each(n1,function(i,v){
                $('.'+v).show();
            })
            if(n2.indexOf('B_LSTHD_0011') !== -1){
                $('.B_LSTHD_0011').show();
            }
            if(n2.indexOf('B_LSTDD_0010') !== -1){
                $('.B_LSTHD_0011').show();
            }
        }else if(name == 2){
            $('.payNav .btn,.payRight i,.billslog,.savebills').hide();
            $.each(n2,function(i,v){
                $('.'+v).show();
            })
        }

        $('.bills').text(data.billsCode);
        $('.bills').attr('billstype',data.billsType);
        $('.billsRemand').data('order',data.id);
        $('.billsRemark').val(data.remark);
        $('.copes').attr('billsStatus',data.billsStatus);

        $('.BbillsDate').text(data.billsDateStr);
        $('.BunitName').text(data.unitName);
        $('.BsectionName').text(data.sectionName);
        $('.BmanagerName').text(data.managerName);
        $('.BmemberTelephone').text(data.memberTelephone);
        $('.BmemberName').text(data.memberName);
        $('.BtotGoodsAmount').text(data.totGoodsAmount);
        $('.BtotAmount').text(data.totAmount);
        $('.Bbalance').text(data.totInstallAmount);
        $('.Breduce').text(data.reduceAmout);
        $("#memberScore").hide();
        if(Number(data.memberScoreMoney) > 0){
        $('.Bprom').text(data.memberScoreMoney);
            $("#memberScore").show();
        }
        $('.BtotPayAmount').text(data.totPayAmount);
        $('.BtotDebtAmount').text(data.totDebtAmount);

        if($('.search').attr('name') == 1){
            $('.thtab').hide();
            if(detail.length<1){
                $('#bills1').hide();
                $('.h_b1').hide();
            }else{
                var tr1 = "";
                var b1 = 0;
                $.each(detail,function(i,item){
                    var isF = (item.isGift == 0)?"":"checked";
                    var isT = (item.isInstall == 0)?"":"checked";
                    var imeistr ="";
                    if(item.imei != null){
                        imeistr += "主串："+item.imei
                    }
                    if(item.auxiliaryImei !=null){
                        imeistr += "<br />辅串："+item.auxiliaryImei
                    }

                    if(item.barCode != null){
                        imeistr += "<br />条码："+item.barCode
                    }
                    b1+=item.amount*1;

                    item.color = (item.color == null)?"":item.color;
                    item.categoryName = (item.categoryName == null)?"":item.categoryName;
                    item.goodsModels = (item.goodsModels == null)?"":item.goodsModels;
                    item.configure = (item.configure == null)?"":item.configure;
                    item.saleManName1 = (item.saleManName1 == null)?"":item.saleManName1;
                    item.saleManName2 = (item.saleManName2 == null)?"":item.saleManName2;
                    item.busName = (item.busName == null)?"":item.busName;
                    item.remark = (item.remark == null)?"":item.remark;

                    tr1+= '<tr><td>'+ (i+1) + '</td><td><input type="checkbox" disabled="disabled" '+ isF +
                        ' ></td><td class="shopMes"><div>'+ item.goodsName +
                        '</div><div class="shopMesBox"><p class="shopp1">编码 :' + item.goodsCode +
                        '</p><p class="shopp1">型号 :' + item.goodsModels + '</p><p class="shopp2">颜色 :'+ item.color +
                        '</p><p class="shopp2">类别 :' + item.categoryName +
                        '</p><p class="shopp2">配置 :'+ item.configure +'</p></div></td><td>'+ imeistr +
                        '</td><td>'+ item.goodsCount + '</td><td>'+ item.retailPrice +
                        '</td><td>'+ item.disCount + '</td><td>'+ item.disPrice +
                        '</td><td>'+ item.amount + '</td><td>'+ item.saleManName1 +
                        '</td><td>'+ item.saleManName2 + '</td><td>'+ item.busName +
                        '</td><td><input type="checkbox" disabled="disabled" '+ isT +
                        ' ></td><td>' + item.storageName +'</td><td>'+ item.remark + '</td></tr>'
                });
                $('.h_b1').show();
                $('.b1_zh').text(b1.toFixed(2));
                $('#bills1 tbody').html(tr1);
                $('#bills1').css('display','table');
            }

            if(operator.length<1){
                $('#bills2').hide();
                $('.h_b2').hide();
            }else{
                var tr2 = "";
                var b2s = 0,b2y = 0,b2k = 0,b2i= 0;
                $.each(operator,function(i,item){
                    item.unitName = (item.unitName == null)?"":item.unitName;
                    item.busName = (item.busName == null)?"":item.busName;
                    item.busAmount = (item.busAmount == null)?"":item.busAmount;
                    item.busNo = (item.busNo == null)?"":item.busNo;
                    item.tel = (item.tel == null)?"":item.tel;
                    item.telImei = (item.telImei == null)?"":item.telImei;
                    item.saleManName2 = (item.saleManName2 == null)?"":item.saleManName2;
                    item.qty = Number($.trim(item.qty));
                    item.commissionWill = (item.commissionWill == null)?"":item.commissionWill;
                    item.remark = (item.remark == null)?"":item.remark;

                    b2s+=item.busAmount*1;
                    b2k+=item.debuBond*1;
                    b2y+=item.commissionWill*1;
                    b2i+=item.qty*1;

                    tr2+= '<tr><td>'+ (i+1) + '</td><td>'+ item.unitName +
                        '</td><td>'+ item.busName + '</td><td>'+ item.busAmount +
                        '</td><td>'+ item.qty + '</td><td>'+ item.commissionWill +
                        '</td><td>'+ item.busNo + '</td><td>'+ item.tel +
                        '</td><td>'+ item.telImei + '</td><td>'+ item.debuBond +
                        '</td><td>'+ item.saleManName1 + '</td><td>'+ item.saleManName2+
                        '</td><td>'+ item.remark + '</td></tr>'
                });
                $('.h_b2').show();
                $('.b2_ss').text(b2s.toFixed(2));
                $('.b2_kj').text(b2k.toFixed(2));
                $('.b2_yj').text(b2y.toFixed(2));
                $('.b2_sl').text(b2i);
                $('#bills2 tbody').html(tr2);
                $('#bills2').css('display','table');
            }

            if(service.length<1){
                $('#bills3').hide();
                $('.h_b3').hide();
            }else{
                var tr3 = "";
                var b3s = 0;
                $.each(service,function(i,item){
                    item.orderno = (item.orderno == null)?"":item.orderno;
                    item.setPrice = (item.setPrice == null)?"":item.setPrice;
                    item.memberPrice = (item.memberPrice == null)?"":item.memberPrice;
                    item.goodsName = (item.goodsName == null)?"":item.goodsName;
                    item.imei = (item.imei == null)?"":item.imei;
                    item.userNum = (item.userNum == null)?"":item.userNum;
                    item.serviceDue = (item.serviceDue == null)?"":item.serviceDue;
                    item.saleManName1 = (item.saleManName1 == null)?"":item.saleManName1;
                    item.saleManName2 = (item.saleManName2 == null)?"":item.saleManName2;
                    item.remark = (item.remark == null)?"":item.remark;

                    var  userNum = item.userNum;
                    var  serviceDue = item.serviceDue;
                    if(userNum=="-1"){userNum=""}
                    if(serviceDue=="-1"){ serviceDue=""}

                    if(data.isVip=="1"){
                        if(item.mUserNum!=null){
                            userNum = item.mUserNum;
                        }
                    }
                    b3s+=item.serviceAmount*1;

                    tr3+= '<tr><td>'+ (i+1) + '</td><td>'+ item.serviceName +
                        '</td><td>'+ item.saleManName1 + '</td><td>'+ item.serviceAmount +
                        '</td><td>'+ item.stratDate + '</td><td>'+ item.orderno +
                        '</td><td>'+ item.setPrice + '</td><td>'+ item.memberPrice +
                        '</td><td>'+ item.goodsName + '</td><td>'+ item.imei +
                        '</td><td>'+ serviceDue + '</td><td>'+ userNum +
                        '</td><td>' + item.saleManName2 +'</td><td>'+ item.remark + '</td></tr>'
                });
                $('.h_b3').show();
                $('.b3_ss').text(b3s.toFixed(2));
                $('#bills3 tbody').html(tr3);
                $('#bills3').css('display','table');
            }

            if(coupon.length<1){
                $('#bills4').hide();
                $('.h_b4').hide();
            }else{
                var tr4 = "";
                var b4d = 0;
                var t4j = 0;
                $.each(coupon,function(i,item){
                    item.unitName = (item.unitName == null)?"":item.unitName;
                    item.settleAmount = (item.settleAmount == null)?"0":item.settleAmount;
                    item.couponName = (item.couponName == null)?"":item.couponName;
                    item.busNo = (item.busNo == null)?"":item.busNo;
                    item.saleManName1 = (item.saleManName1 == null)?"":item.saleManName1;
                    item.saleManName2 = (item.saleManName2 == null)?"":item.saleManName2;
                    item.remark = (item.remark == null)?"":item.remark;

                    b4d+=item.amount*1;
                    t4j+=item.settleAmount*1;

                    tr4+= '<tr><td>'+ (i+1) + '</td><td>'+ item.unitName +
                        '</td><td>'+ item.couponName + '</td><td>'+ item.amount +
                        '</td><td>'+ item.settleAmount + '</td><td>'+ item.busNo + '</td><td>'+ item.saleManName1 +
                        '</td><td>' + item.saleManName2 +'</td><td>'+ item.remark + '</td></tr>'
                });
                $('.h_b4').show();
                $('.b4_dx').text(b4d.toFixed(2));
                $('.b4_js').text(t4j.toFixed(2));
                $('#bills4 tbody').html(tr4);
                $('#bills4').css('display','table');
            }

            if(install.length<1){
                $('#bills5').hide();
                $('.h_b5').hide();
            }else{
                var tr5 = "";
                var b5j = 0,b5s = 0,b5d = 0,b5y = 0;
                $.each(install,function(i,item){
                    item.busNo = (item.busNo == null)?"":item.busNo;
                    item.imei = (item.imei == null)?"":item.imei;
                    item.saleManName1 = (item.saleManName1 == null)?"":item.saleManName1;
                    item.saleManName2 = (item.saleManName2 == null)?"":item.saleManName2;
                    item.monthsPay = (item.monthsPay == null)?"":item.monthsPay;
                    item.remark = (item.remark == null)?"":item.remark;

                    b5j+=item.amount*1;
                    b5s+=item.installAmount*1;
                    b5d+=item.installmentBalance;
                    b5y+=item.commissionWill;

                    tr5+= '<tr><td>'+ (i+1) + '</td><td>'+ item.unitName +
                        '</td><td>'+ item.instalName + '</td><td>'+ item.amount +
                        '</td><td>'+ item.installAmount + '</td><td>'+ item.installmentBalance +
                        '</td><td>'+ item.installmentCount + '</td><td>'+ item.commissionWill +
                        '</td><td>'+ item.busNo + '</td><td>'+ item.imei +
                        '</td><td>'+ item.saleManName1 + '</td><td>'+ item.saleManName2 +
                        '</td><td>' + item.monthsPay +'</td><td>'+ item.remark + '</td></tr>'
                });
                $('.h_b5').show();
                $('.b5_je').text(b5j.toFixed(2));
                $('.b5_sf').text(b5s.toFixed(2));
                $('.b5_dk').text(b5d.toFixed(2));
                $('.b5_yj').text(b5y.toFixed(2));
                $('#bills5 tbody').html(tr5);
                $('#bills5').css('display','table');
            }
        }else{
            $('.billsRemand').hide();
            $('.kdtab').hide();
            if(detail.length<1){
                $('#tds1').hide();
                $('.h_b1').hide();
            }else{
                var tr1 = "";
                var t1s = 0,t1j = 0;
                $.each(detail,function(i,item){
                    var isF = (item.isGift == 0)?"":"checked";
                    var isT = (item.isInstall == 0)?"":"checked";

                    item.imei = (item.imei == null)?"":item.imei;
                    item.auxiliaryImei = (item.auxiliaryImei == null)?"":item.auxiliaryImei;
                    item.color = (item.color == null)?"":item.color;
                    item.categoryName = (item.categoryName == null)?"":item.categoryName;
                    item.goodsModels = (item.goodsModels == null)?"":item.goodsModels;
                    item.configure = (item.configure == null)?"":item.configure;
                    item.saleManName1 = (item.saleManName1 == null)?"":item.saleManName1;
                    item.saleManName2 = (item.saleManName2 == null)?"":item.saleManName2;
                    item.busName = (item.busName == null)?"":item.busName;
                    item.remark = (item.remark == null)?"":item.remark;

                    t1s+=item.goodsCount*1;
                    t1j+=item.amount*1;

                    tr1+= '<tr><td>'+ (i+1) + '</td><td><input type="checkbox" disabled="disabled" '+ isF +
                        ' ></td><td>'+ item.storageName +
                        '</td><td class="shopMes"><div>'+ item.goodsName +
                        '</div><div class="shopMesBox"><p class="shopp1">编码 :' + item.goodsCode +
                        '</p><p class="shopp1">型号 :' + item.goodsModels + '</p><p class="shopp2">颜色 :'+ item.color +
                        '</p><p class="shopp2">类别 :' + item.categoryName +
                        '</p><p class="shopp2">配置 :'+ item.configure +
                        '</p></div></td><td>'+ item.imei +
                        '</td><td>'+ item.auxiliaryImei +
                        '</td><td>'+ item.goodsCount + '</td><td>'+ item.amount +
                        '</td><td>'+ item.saleManName1 + '</td><td>'+ item.saleManName2 +
                        '</td><td>'+ item.busName +
                        '</td><td><input type="checkbox" disabled="disabled" '+ isT +
                        ' ></td><td>'+ item.retailPrice +
                        '</td><td>'+ item.oldAmount +
                        '</td><td>'+ item.oldPrice +
                        '</td><td>'+ item.remark + '</td></tr>'
                });
                $('.h_b1').show();
                $('.t1_sl').text(t1s);
                $('.t1_je').text(t1j.toFixed(2));
                $('#tds1 tbody').html(tr1);
                $('#tds1').css('display','table');
            }

            if(operator.length<1){
                $('#tds2').hide();
                $('.h_b2').hide();
            }else{
                var tr2 = "";
                var t2j = 0;
                var t2s1 = 0;
                var t2s2 = 0;
                var t2s3 = 0;
                $.each(operator,function(i,item){
                    item.unitName = (item.unitName == null)?"":item.unitName;
                    item.busName = (item.busName == null)?"":item.busName;
                    item.busAmount = (item.busAmount == null)?"":item.busAmount;
                    item.busNo = (item.busNo == null)?"":item.busNo;
                    item.tel = (item.tel == null)?"":item.tel;
                    item.telImei = (item.telImei == null)?"":item.telImei;
                    item.saleManName2 = (item.saleManName2 == null)?"":item.saleManName2;
                    item.commissionWill = (item.commissionWill == null)?"":item.commissionWill;
                    item.remark = (item.remark == null)?"":item.remark;
                    item.qty = Number($.trim(item.qty))

                    t2j+=item.busAmount*1;
                    t2s1+=item.qty*1;
                    t2s2+=item.commissionWill*1;
                    t2s3+=item.debuBond*1;


                    tr2+= '<tr><td>'+ (i+1) + '</td><td>'+ item.unitName +
                        '</td><td>'+ item.busName +
                        '</td><td>'+ item.oldAmount +
                        '</td><td>'+ item.busAmount +
                        '</td><td>'+ Number(item.qty) +
                        '</td><td>'+ Number(item.commissionWill) +
                        '</td><td>'+ item.busNo +
                        '</td><td>'+ item.saleManName1 + '</td><td>'+ item.saleManName2+
                        '</td><td>'+ item.tel +
                        '</td><td>'+ item.telImei +
                        '</td><td>'+ item.debuBond +

                        '</td><td>'+ item.remark + '</td></tr>'
                });
                $('.h_b2').show();

                $('.t2_je').text(t2j.toFixed(2));
                $('.t2_sj1').text(t2s1);
                $('.t2_sj2').text(t2s2.toFixed(2));
                $('.t2_sj3').text(t2s3.toFixed(2));
                $('#tds2 tbody').html(tr2);
                $('#tds2').css('display','table');
            }

            if(service.length<1){
                $('#tds3').hide();
                $('.h_b3').hide();
            }else{
                var tr3 = "";
                var t3k = 0;
                $.each(service,function(i,item){
                    item.orderno = (item.orderno == null)?"":item.orderno;
                    item.setPrice = (item.setPrice == null)?"":item.setPrice;
                    item.memberPrice = (item.memberPrice == null)?"":item.memberPrice;
                    item.goodsName = (item.goodsName == null)?"":item.goodsName;
                    item.imei = (item.imei == null)?"":item.imei;
                    item.userNum = (item.userNum == null)?"":item.userNum;
                    item.serviceDue = (item.serviceDue == null)?"":item.serviceDue;
                    item.saleManName1 = (item.saleManName1 == null)?"":item.saleManName1;
                    item.saleManName2 = (item.saleManName2 == null)?"":item.saleManName2;
                    item.remark = (item.remark == null)?"":item.remark;
                    item.flowNo = (item.flowNo == null)?"":item.flowNo;

                    t3k+=item.serviceAmount*1;

                    var  userNum = item.userNum;
                    var  serviceDue = item.serviceDue;
                    if(userNum=="-1"){userNum=""}
                    if(serviceDue=="-1"){ serviceDue=""}

                    if(data.isVip=="1"){
                        if(item.mUserNum!=null){
                            userNum = item.mUserNum;
                        }
                    }

                    tr3+= '<tr><td>'+ (i+1) + '</td><td>'+ item.serviceName +
                        '</td><td>'+ item.saleManName1 + '</td><td>'+ item.serviceAmount +
                        '</td><td>'+ item.stratDate + '</td><td>'+ item.orderno +
                        '</td><td>'+ item.oldAmount +
                        '</td><td>'+ serviceDue + '</td><td>'+ userNum +
                        '</td><td>'+ item.goodsName + '</td><td>'+ item.imei +
                        '</td><td>'+ item.setPrice + '</td><td>'+ item.memberPrice +
                        '</td><td>' + item.saleManName2 +
                        '</td><td>' + item.flowNo +
                        '</td><td>'+ item.remark + '</td></tr>'
                });
                $('.h_b3').show();
                $('.t3_tk').text(t3k.toFixed(2));
                $('#tds3 tbody').html(tr3);
                $('#tds3').css('display','table');
            }

            if(coupon.length<1){
                $('#tds4').hide();
                $('.h_b4').hide();
            }else{
                var tr4 = "";
                var t4y = 0;
                var t4t = 0;
                var t4j = 0;
                $.each(coupon,function(i,item){
                    item.unitName = (item.unitName == null)?"":item.unitName;
                    item.settleAmount = (item.settleAmount == null)?"0":item.settleAmount;
                    item.couponName = (item.couponName == null)?"":item.couponName;
                    item.busNo = (item.busNo == null)?"":item.busNo;
                    item.saleManName1 = (item.saleManName1 == null)?"":item.saleManName1;
                    item.saleManName2 = (item.saleManName2 == null)?"":item.saleManName2;
                    item.remark = (item.remark == null)?"":item.remark;

                    t4y+=item.oldAmount*1;
                    t4t+=item.amount*1;
                    t4j+=item.settleAmount*1;

                    tr4+= '<tr><td>'+ (i+1) + '</td><td>'+ item.unitName +
                        '</td><td>'+ item.couponName +
                        '</td><td>'+ item.oldAmount +
                        '</td><td>'+ item.amount +
                        '</td><td>'+ item.settleAmount +
                        '</td><td>'+ item.busNo + '</td><td>'+ item.saleManName1 +
                        '</td><td>' + item.saleManName2 +'</td><td>'+ item.remark + '</td></tr>'
                });
                $('.h_b4').show();
                $('.t4_yd').text(t4y.toFixed(2));
                $('.t4_th').text(t4t.toFixed(2));
                $('.t4_js').text(t4j.toFixed(2));
                $('#tds4 tbody').html(tr4);
                $('#tds4').css('display','table');
            }

            if(install.length<1){
                $('#tds5').hide();
                $('.h_b5').hide();
            }else{
                var tr5 = "";
                var t5t = 0,t5s = 0,t5f = 0;
                $.each(install,function(i,item){
                    item.busNo = (item.busNo == null)?"":item.busNo;
                    item.imei = (item.imei == null)?"":item.imei;
                    item.saleManName1 = (item.saleManName1 == null)?"":item.saleManName1;
                    item.saleManName2 = (item.saleManName2 == null)?"":item.saleManName2;
                    item.monthsPay = (item.monthsPay == null)?"":item.monthsPay;
                    item.remark = (item.remark == null)?"":item.remark;
                    item.retType = (item.retType == 1)?"现金退款":"注销分期";

                    t5s+=item.installAmount*1;
                    t5f+=item.installmentBalance*1;
                    t5t+=item.refundAmount*1;

                    tr5+= '<tr><td>'+ (i+1) +
                        '</td><td>'+ item.retType + //退款方式
                        '</td><td>'+ item.unitName +
                        '</td><td>'+ item.instalName +
                        '</td><td>'+ item.amount +
                        '</td><td>'+ item.installAmount +
                        '</td><td>'+ item.installmentCount +
                        '</td><td>'+ item.installmentBalance +
                        '</td><td>'+ item.refundAmount +
                        '</td><td>'+ item.commissionWill +
                        '</td><td>'+ item.saleManName1 + '</td><td>'+ item.saleManName2 +
                        '</td><td>'+ item.busNo + '</td><td>'+ item.imei +
                        '</td><td>' + item.monthsPay +'</td><td>'+ item.remark + '</td></tr>'
                });
                $('.h_b5').show();
                $('.t5_sf').text(t5s.toFixed(2));
                $('.t5_fq').text(t5f.toFixed(2));
                $('.t5_tk').text(t5t.toFixed(2));
                $('#tds5 tbody').html(tr5);
                $('#tds5').css('display','table');
            }

        }

        $('.mespay').html("");
        if(payreceipt.length>0){
            $.each(payreceipt,function(i,item){
                switch(item.accountType){
                    case '1':
                        var p = "<p>"+ item.accountTypeName + " ： " + item.payreceiptAmout.toFixed(2) + "</p>";
                        break;
                    case '2':
                        var p = "<p>"+ item.accountName + " ： " + item.payreceiptAmout.toFixed(2) + "</p>";
                        break;
                    case '3':
                        var p = "<p>"+ item.accountTypeName + " ： " + item.payreceiptAmout.toFixed(2) + "</p>";
                        break;
                    case '4':
                        var p = "<p>"+ item.accountTypeName + " ： " + item.payreceiptAmout.toFixed(2) + "</p>";
                        break;
                    case '5':
                        var p = "<p>"+ item.accountName + " ： " + item.payreceiptAmout.toFixed(2) + "</p>";
                        break;
                    default:
                        break;
                }
                $('.mespay').append(p);
            });
        }
    })
}

function getRetailServer(obj,success) {
    $.request({
        type: 'post',
        url: "/manager/inventory/retail/delivery/loadDraftOrder",
        data: obj,
        dataType: "json",
        success: function(data) {
            if(data.result == 1){
                if(success){
                    success(data)
                }
            }else{
                $.zxsaas_plus.showalert('提示',data.desc);
            }
        }
    })
}

function loglist(id,type,box){
    $.request({
        type: 'post',
        url: "/manager/inventory/retail/cashier/queryBillsLog",
        data: {
            orderId: id,
            billsType: type
        },
        dataType: "json",
        success: function(data) {
            var log = data.data.logList;
            if(data.result == 1){
                $(box+" .dabox").remove();
                $.each(log,function(i,item){
                    var img = item.billsStatus==6?"statusPass.png":"statusRed.png";
                    var div = '<div class="dabox"><div class="daimg"><img src=/manager/images/status/'+ img +
                        ' /></div><div class="dashed"></div><i class="datime">'+ item.createDateStr +
                        '</i><p><font>操作类型：</font>'+ item.operateType +
                        '</p><p><font>操作员：</font>'+ item.createByName +
                        '</p><p><font>操作原因：</font>'+ item.operateResaon +
                        '</p></div>';
                    $(box).append(div);
                })
                if(log.length >0){
                    if(log[0].printCount == undefined){
                        $(box+" .logprint").text(0);
                    }else{
                        $(box+" .logprint").text(log[0].printCount);
                    }
                }

            }
        }
    });
}



var paytr = $('#payTab tbody tr').clone();
var backtr = $('#backTab tbody tr').clone();

//零售定金、定金单
function getRetailBills(id,str,flag){
    if(str == undefined){
        var obj = {
            orderId: id
        }
    }else{
        var obj = {
            orderId: id,
            CodeStr: str
        }
    }

    $.request({
        type: 'post',
        url: "/manager/inventory/retail/cashier/getRetailBillsByOrderId",
        data: obj,
        dataType: "json",
        success: function(data) {
            if(data.result == 1){
                var list = data.data.goods;
                var data = data.data.deposit;
                var payreceipt = data.payreceiptList;
                if(flag == true){
                    $('.billsRemand').data('order',data.orderId);
                }
                if(data.billsStatus == 7){
                    $('.redimg').show();
                    if(data.billsCode.split('_')[1] == "R"){
                        $('.copes').attr('disabled',true);
                    }else{
                        $('.copes').attr('disabled',false);
                    }
                }else{
                    $('.redimg').hide();
                    $('.copes').attr('disabled',false);
                }

                loglist(data.orderId,'48','.paydetail');

                // 按钮权限
                if(name == 1){
                    $('.payNav .btn,.paylog,.savePay').hide();
                    $.each(n3,function(i,v){
                        $('.'+v).show();
                    })
                    $('.payRight i,.reds').hide();
                }else if(name == 3){
                    $('.payNav .btn,.payRight i,.paylog,.savePay').hide();
                    $.each(n3,function(i,v){
                        $('.'+v).show();
                    })
                }

                $("#payModal").modal('show');
                $('.pay').text(data.billsCode);
                $('.pay').attr("orderId",data.orderId);
                $(".payRemark").val(data.remark);
                $('.savePay').attr('orderId',data.orderId);

                $('.mCreateDate').text(data.billsDate);
                $('.mSectionName').text(data.sectionName);
                $('.mSaleManName').text(data.saleManName1);
                $('.mMemberTelephone').text(data.memberTelephone);
                $('.mMemberName').text(data.memberName);
                $('.mTotalYsAmount').text(data.totalYsAmountStr);
                $('.mSsAmount').text(data.ssAmountStr);
                $('.payRemand').attr('order',id);

                $('.paypay').html("");
                if(payreceipt.length>0){
                    $.each(payreceipt,function(i,item){
                        switch(item.accountType){
                            case '1':
                                var p = "<p>"+ item.accountTypeName + " ： " + item.payreceiptAmout.toFixed(2) + "</p>";
                                break;
                            case '2':
                                var p = "<p>"+ item.accountName + " ： " + item.payreceiptAmout.toFixed(2) + "</p>";
                                break;
                            case '3':
                                var p = "<p>"+ item.accountTypeName + " ： " + item.payreceiptAmout.toFixed(2) + "</p>";
                                break;
                            case '4':
                                var p = "<p>"+ item.accountTypeName + " ： " + item.payreceiptAmout.toFixed(2) + "</p>";
                                break;
                            case '5':
                                var p = "<p>"+ item.accountName + " ： " + item.payreceiptAmout.toFixed(2) + "</p>";
                                break;
                            default:
                                break;
                        }
                        $('.paypay').append(p);
                    });
                }

                $('#backTab').hide();
                $('#payTab').css('display','table');

                if(list.length<1){
                    $('#payTab tbody').html(paytr);
                }else{
                    var paytr = "";
                    var num = 0;
                    $.each(list,function(i,item){
                        item.retailPriceStr = (item.retailPriceStr == null)?"":item.retailPriceStr;
                        item.configure = (item.configure == null)?"":item.configure;

                        num+=item.tdAmountStr*1;

                        paytr+= '<tr><td>'+ (i+1) + '</td><td class="shopMes"><div>'+ item.name +
                            '</div><div class="shopMesBox"><p class="shopp1">编码 :' + item.code +
                            '</p><p class="shopp1">型号 :' + item.models + '</p><p class="shopp2">颜色 :'+ item.color +
                            '</p><p class="shopp2">类别 :' + item.categoryName +
                            '</p><p class="shopp2">配置 :'+ item.configure +'</p></div></td><td>'+ item.code +
                            '</td><td>'+ item.retailPriceStr + '</td><td>'+ item.priceSumStr +
                            '</td><td>'+ item.total + '</td><td>'+ item.tdNum +
                            '</td><td>'+ item.depositStr + '</td><td>'+ item.remainderAmountStr +
                            '</td><td>'+ item.tdAmountStr + '</td><td>'+ item.saleManName1 +
                            '</td><td>'+ item.remark + '</td></tr>'
                    });
                    $('.paytd').text(num.toFixed(2));
                    $('#payTab tbody').html(paytr);

                }
            }else{
                $.zxsaas_plus.showalert('提示',data.desc);
            }
        }
    });

}

//定金单
function getHandsel(id,type,str,flag){
    if(str == undefined){
        var obj = {
            orderId: id,
            typeId: type
        }
    }else{
        var obj = {
            orderId: id,
            typeId: type,
            CodeStr: str
        }
    }
    loglist(id,type,'.paydetail');
    $.request({
        type: 'post',
        url: "/manager/inventory/retail/cashier/getDepositBillsByBillsCode",
        data: obj,
        dataType: "json",
        success: function(data) {
            if(data.result == 1){
                var list = data.data.goods;
                var data = data.data.deposit;
                var payreceipt = data.payreceiptList;
                if(flag == true){
                    $('.payRemand').data('order',data.orderId);
                }

                $('.pay').attr("orderId",data.orderId);
                $('.payRemand').data('typeId',data.typeId);
                $('#payModal .redimg').show()
                $('#billsModalForm').writeJson2Dom(data);
                $('#payModal .redimg img').attr('')
                if (data.billsStatus == 7) {
                    $('#payModal .redimg img:eq(0)').attr('src', '/manager/images/status/statusRed.png');
                }
                if (data.auditStatus == 1) {
                    $('#payModal .redimg img:eq(1)').attr('src', '/manager/images/audit.png');
                } else {
                    $('#payModal .redimg img:eq(1)').attr('src', '/manager/images/auditNo.png');
                }


                if(data.billsStatus == 7){
                    $('.reds').attr('disabled',true);
                    if(data.billsCode.split('_')[1] == "R"){
                        $('.copes').attr('disabled',true);
                    }else{
                        $('.copes').attr('disabled',false);
                    }
                }else{

                    $('.copes').attr('disabled',false);
                    $('.reds').attr('disabled',false);
                }

                if(data.typeId == 48){
                    $('.payst').text("应收");
                    $('.payft').text("实收");
                    $('.payNav .btn,.payRight i,.paylog,.savePay').hide();
                    $.each(n3,function(i,v){
                        $('.'+v).show();
                    })
                    $('.reds').hide();
                    $("#payModal .payRemand").show();
                    if(n4.indexOf('B_LSTDD_0011') == -1){
                        $('.B_LSTDD_0011').hide();
                    }else{
                        $('.B_LSTDD_0011').show();
                    }
                }else{
                    $('.payst').text("应付");
                    $('.payft').text("实付");
                    $('.reds').css('display','inline-block');
                    $('.payNav .btn,.payRight i,.paylog,.savePay').hide();
                    $.each(n4,function(i,v){
                        $('.'+v).show();
                    })
                    $("#payModal .payRemand").hide();
                }

                $('.pay').text(data.billsCode);
                $('.payRemark').val(data.remark);
                $('.mCreateDate').text(data.billsDate);
                $('.mSectionName').attr('sectionId',data.sectionId);
                $('.mSectionName').text(data.sectionName);
                $('.mSaleManName').text(data.saleManName1);
                $('.mMemberTelephone').text(data.memberTelephone);
                $('.mMemberName').text(data.memberName);
                $('.mTotalYsAmount').text(data.totalYsAmountStr);
                $('.mSsAmount').text(data.ssAmountStr);

                $('.paypay').html("");
                if(payreceipt.length>0){
                    $.each(payreceipt,function(i,item){
                        switch(item.accountType){
                            case '1':
                                var p = "<p>"+ item.accountTypeName + " ： " + item.payreceiptAmout.toFixed(2) + "</p>";
                                break;
                            case '2':
                                var p = "<p>"+ item.accountName + " ： " + item.payreceiptAmout.toFixed(2) + "</p>";
                                break;
                            case '3':
                                var p = "<p>"+ item.accountTypeName + " ： " + item.payreceiptAmout.toFixed(2) + "</p>";
                                break;
                            case '4':
                                var p = "<p>"+ item.accountTypeName + " ： " + item.payreceiptAmout.toFixed(2) + "</p>";
                                break;
                            case '5':
                                var p = "<p>"+ item.accountName + " ： " + item.payreceiptAmout.toFixed(2) + "</p>";
                                break;
                            default:
                                break;
                        }
                        $('.paypay').append(p);
                    });
                }

                if(type == 48){
                    $('#backTab').hide();
                    $('#payTab').css('display','table');
                    if(list.length<1){
                        $('#payTab tbody').html(paytr);
                    }else{
                        var paytr = "";
                        var num = 0;
                        $.each(list,function(i,item){
                            item.retailPriceStr = (item.retailPriceStr == null)?"":item.retailPriceStr;
                            item.configure = (item.configure == null)?"":item.configure;
                            item.models = (item.models == null)?"":item.models;

                            num+=item.tdAmountStr*1;

                            paytr+= '<tr><td>'+ (i+1) + '</td><td class="shopMes"><div>'+ item.name +
                                '</div><div class="shopMesBox"><p class="shopp1">编码 :' + item.code +
                                '</p><p class="shopp1">型号 :' + item.models + '</p><p class="shopp2">颜色 :'+ item.color +
                                '</p><p class="shopp2">类别 :' + item.categoryName +
                                '</p><p class="shopp2">配置 :'+ item.configure +'</p></div></td><td>'+ item.code +
                                '</td><td>'+ item.retailPriceStr + '</td><td>'+ item.priceSumStr +
                                '</td><td>'+ item.total + '</td><td>'+ item.tdNum +
                                '</td><td>'+ item.depositStr + '</td><td>'+ item.remainderAmountStr +
                                '</td><td>'+ item.tdAmountStr + '</td><td>'+ item.saleManName1 +
                                '</td><td>'+ item.remark + '</td></tr>'
                        });
                        $('.paytd').text(num.toFixed(2));
                        $('#payTab tbody').html(paytr);
                    }
                }
                if(type == 50){
                    $('#payTab').hide();
                    $('#backTab').css('display','table');
                    if(list.length<1){
                        $('#backTab tbody').html(backtr);
                    }else{
                        var backtr = "";
                        var num = 0;
                        $.each(list,function(i,item){
                            item.configure = (item.configure == null)?"":item.configure;
                            item.models = (item.models == null)?"":item.models;
                            num+=item.tdAmountStr*1;

                            backtr+= '<tr><td>'+ (i+1) + '</td><td class="shopMes"><div>'+ item.name +
                                '</div><div class="shopMesBox"><p class="shopp1">编码 :' + item.code +
                                '</p><p class="shopp1">型号 :' + item.models + '</p><p class="shopp2">颜色 :'+ item.color +
                                '</p><p class="shopp2">类别 :' + item.categoryName +
                                '</p><p class="shopp2">配置 :'+ item.configure +'</p></div></td><td>'+ item.saleManName1 +
                                '</td><td>'+ item.retailPriceStr + '</td><td>'+ item.unsubscribeNum + '</td><td>'+ item.tdAmountStr +
                                '</td><td>'+ item.remark + '</td></tr>'
                        });
                        $('.backtd').text(num.toFixed(2));
                        $('#backTab tbody').html(backtr);
                    }
                }
            }else{
                $.zxsaas_plus.showalert('提示',data.desc);
            }
        }
    });

}

function retailmodal(options) {
    $.jgrid.defaults.width = 1280;
    $.jgrid.defaults.responsive = true;
    $.jgrid.defaults.styleUI = 'Bootstrap';

    $(options.TableName).jqGrid({
//		url: options.LoadTableUrl,
        mtype: "GET",
        datatype: "json",
        jsonReader: {
            root: "data.rows",
            total: "data.total",
            records: "data.records",
            repeatitems: false
        },
        colNames: options.colNames,
        colModel: options.colModel,
        sortable: false,
        multiselect : true,	//复选框属性
        rownumbers:true,	//显示行号
        rowNum: 100,
        rowList: [100, 200, 500],
        pager: options.pager,
        viewrecords: true,
        width: "100%",
        height: $(window).height() * 0.5,
        autowidth: true,
        rownumWidth: 35, // the width of the row numbers columns
        shrinkToFit: false, //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
        beforeSelectRow: function(rowid,e){

        },
        onSelectAll:function(aRowids,status){

        },
        onCellSelect: function(rowid,iCol,cellcontent,e) {
            var data = $(e.currentTarget).getRowData(rowid);
            var curColName=$.trim($(e.target).attr('aria-describedby')).replace(options.TableName.replace('#','')+'_','');
            if (curColName == 'billsCode') {
                $('.billyt').text("应收");
                $('.billst').text("实收");
                $('.billqk').text("欠款");
                $("#billsModal").modal('show');
                $('.newOrder').attr("flag","f");
                $('.billsRemand').css('display','inline-block');
                $('.reds').css('display','inline-block');
                $('.savebills').attr('orderId',data.orderId);
                $('.savebills').attr('rid',rowid);
                $(".savebills").attr('name','retail');
                $('.bills').text(data.billsCode);
                getRetail(data.orderId);
            }
            else if (curColName == 'referenceDepositStr') {
                $('.payst').text("应收");
                $('.payft').text("实收");
                $('.newOrder').attr("flag","t");
                $(".reds").hide();
                $('.payP').hide();
                $('.payN').hide();
                $(".payRemand").hide();
                $(".billsRemand").data('order',data.orderId);
                $('.savePay').attr('orderId',data.orderId);
                $('.savePay').attr('rid',rowid);
                $(".savePay").attr('name','retail');
                $('.payRemand').attr('order',data.orderId);
                getRetailBills(data.orderId);
            }
            else if (curColName == 'voucherNo') {
                goVoucherNoPage(data.voucherId)
            }
        },
        onSelectRow: function(rowid,status){
            var obj = $('#retailGrid').getRowData(rowid);
            if(obj.billsStatus == 7){
                $('.retailReturn').attr('disabled',true);
                $('.debt').attr('disabled',true);
                $('.retailRed').attr('disabled',true);
                if(obj.billsCode.split('_')[1] == "R"){
                    $('.retailCope').attr('disabled',true);
                }else{
                    $('.retailCope').attr('disabled',false);
                }
            }else{
                $('.retailReturn').attr('disabled',false);
                $('.debt').attr('disabled',false);
                $('.retailCope').attr('disabled',false);
                $('.retailRed').attr('disabled',false);
            }
        },
        loadComplete: function(data){
            var rows = data.data.rows;
            $.each(rows,function(i,item){
                if(item.billsStatus == 7){
                    $("#retailGrid tr:eq("+ (i+1) + ")").css("color","red");
                }
            })
            checkAudit($(options.TableName))
        }
    })
}

function recedemodal(options) {
    $.jgrid.defaults.width = 1280;
    $.jgrid.defaults.responsive = true;
    $.jgrid.defaults.styleUI = 'Bootstrap';

    $(options.TableName).jqGrid({
//		url: options.LoadTableUrl,
        mtype: "GET",
        datatype: "json",
        jsonReader: {
            root: "data.rows",
            total: "data.total",
            records: "data.records",
            repeatitems: false
        },
        colNames: options.colNames,
        colModel: options.colModel,
        sortable: false,

        multiselect : true,	//复选框属性
        rownumbers:true,	//显示行号
        rowNum: 100,
        rowList: [100, 200, 500],
        pager: options.pager,
        viewrecords: true,
        width: "100%",
        height: $(window).height() * 0.5,
        autowidth: true,
        rownumWidth: 35, // the width of the row numbers columns
        shrinkToFit: false, //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
        beforeSelectRow: function(rowid,e){

        },
        onSelectAll:function(aRowids,status){

        },
        onCellSelect: function(rowid,iCol,cellcontent,e) {
            var data = $(e.currentTarget).getRowData(rowid);
            var curColName=$.trim($(e.target).attr('aria-describedby')).replace(options.TableName.replace('#','')+'_','');
            if (curColName == 'billsCode') {
                $('.billyt').text("应退");
                $('.billst').text("实退");
                $('.billqk').text("未退");
                $("#billsModal").modal('show');
                $('.reds').css('display','inline-block');
                $('.billsRemand').hide();
                $(".billsRemark").val(data.remark);
                $('.savebills').attr('orderId',data.orderId);
                $('.savebills').attr('rid',rowid);
                $(".savebills").attr('name','recede');
                $('.bills').text(data.billsCode);
                getRetail(data.orderId);
            }
            else if (curColName == 'voucherNo') {
                goVoucherNoPage(data.voucherId)
            }
        },
        onSelectRow: function(rowid,status){
            var obj = $('#recedeGrid').getRowData(rowid);
            if(obj.billsStatus == 7){
                if(obj.billsCode.split('_')[1] == "R"){
                    $('.recedeCope').attr('disabled',true);
                    $('.recedeRed').attr('disabled',true);
                }else{
                    $('.recedeCope').attr('disabled',false);
                    $('.recedeRed').attr('disabled',true);
                }
            }else{
                $('.recedeRed').attr('disabled',false);
                $('.recedeCope').attr('disabled',false);
            }
        },
        loadComplete: function(data){
            var rows = data.data.rows;
            $.each(rows,function(i,item){
                if(item.billsStatus == 7){
                    $("#recedeGrid tr:eq("+ (i+1) + ")").css("color","red");
                }
            })
            checkAudit($(options.TableName))
        }
    })
}

function handselmodal(options) {
    $.jgrid.defaults.width = 1280;
    $.jgrid.defaults.responsive = true;
    $.jgrid.defaults.styleUI = 'Bootstrap';

    $(options.TableName).jqGrid({
//		url: options.LoadTableUrl,
        mtype: "GET",
        datatype: "json",
        jsonReader: {
            root: "data.rows",
            total: "data.total",
            records: "data.records",
            repeatitems: false
        },
        colNames: options.colNames,
        colModel: options.colModel,
        sortable: false,
        multiselect : true,	//复选框属性
        rownumbers:true,	//显示行号
        rowNum: 100,
        rowList: [100, 200, 500],
        pager: options.pager,
        viewrecords: true,
        width: "100%",
        height: $(window).height() * 0.5,
        autowidth: true,
        rownumWidth: 35, // the width of the row numbers columns
        shrinkToFit: false, //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
        beforeSelectRow: function(rowid,e){

        },
        onSelectAll:function(aRowids,status){

        },
        onCellSelect: function(rowid,iCol,cellcontent,e) {
            var data = $(e.currentTarget).getRowData(rowid);
            var curColName=$.trim($(e.target).attr('aria-describedby')).replace(options.TableName.replace('#','')+'_','');
            if (curColName == 'billsCode') {
                $("#payModal").modal('show');
                $('.newOrder').attr("flag","f");
                $('.payP').css('display','inline-block');
                $('.payN').css('display','inline-block');
                $('.payRemand').data('typeId',data.typeId);
                $(".payRemand").data('order',data.id);
                $('.savePay').attr('orderId',data.id);
                $('.savePay').attr('rid',rowid);
                $('.savePay').attr('name','handsel');
                getHandsel(data.id,data.typeId);
            }
            else if (curColName == 'voucherNo') {
                goVoucherNoPage(data.voucherId)
            }
        },
        onSelectRow: function(rowid,status){
            var obj = $('#handselGrid').getRowData(rowid);
            if(obj.billsStatus == 7){
                $('.handselReturn').attr('disabled',true);
                $('.handselRed').attr('disabled',true);
                if(obj.billsCode.split('_')[1] == "R"){
                    $('.handselCopy').attr('disabled',true);
                }else{
                    $('.handselCopy').attr('disabled',false);
                }
            }else{
                $('.handselReturn').attr('disabled',false);
                $('.handselCopy').attr('disabled',false);
                $('.handselRed').attr('disabled',false);
            }
        },
        loadComplete: function(data){
            var rows = data.data.rows;
            $.each(rows,function(i,item){
                if(item.billsStatus == 7){
                    $("#handselGrid tr:eq("+ (i+1) + ")").css("color","red");
                }
            })
            checkAudit($(options.TableName))
        }
    })
}

//跳转凭证页面
function goVoucherNoPage(bid){
    if($.trim(bid)!=''){
        window.top.openWorkBoxByMenutext('填制凭证','/manager/cw/test/voucher?bId='+bid, true)
    }
}

//是否稽核
function checkAudit($table) {
    var ids = $table.getDataIDs();
    $.each(ids,function(i,keyId){
        var row = $table.getRowData(keyId);
        // 草稿单 要清除
        if(row.billsStatus == 1) {
            $table.setCell(keyId,"auditStatus",' ')
        }
        if(row.auditStatus == 0) {
            $table.setCell(keyId,"auditStatus",'','no-auditStatus')
        }else{
            $table.setCell(keyId,"auditStatus",'','yes-auditStatus')
        }
    })
}


function locationhref(){
    var localUrl = window.location.href;
    var url1 = localUrl.split("?")[1];
    if(url1 == undefined){
        return
    }
    var url2 = url1.split('=');
    if(url2[0] == "tabType"){
        if(url2[0] == 1){
            $('.retail').click();
            $(".search").attr("name","1");
        }
        if(url2[1] == 2){
            $('.recede').click();
            $(".search").attr("name","2");
            $('.spantab1').hide();
        }
    }

}

//零售稽核
function setAuditStatus(data,successBack) {
    $.ajaxPackage({
        url:'/manager/inventory/retail/updateAuditStatus',
        data:{
            billsId:data.billsId,
            auditStatus:data.auditStatus,
            billsType:data.billsType,
        },
        success:function(data){
            $.zxsaas_plus.showalert('success', "成功!");
            if(successBack){
                successBack(data)
            }
        }
    })
}