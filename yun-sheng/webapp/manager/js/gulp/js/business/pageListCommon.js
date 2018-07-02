//  历史单据列表查询页面公共方法
!function ($) {
    var getGoInfo={
        'GYSBJD':{
            detailText:'供应商保价单',
            detailUrl:'/manager/inventory/fund/supplier/reprice/main',
        },
        'CGHHD':{
            detailText:'采购换货单',
            detailUrl:'/manager/inventory/purchase/exchange/main',
        },
        'CGRKD':{
            detailText:'采购入库单',
            detailUrl:'/manager/inventory/purchase/delivery/main',
        },
        'CGDD':{
            detailText:'采购订单',
            detailUrl:'/manager/purchase/order',
        },
        'CGTHD':{
            detailText:'采购退货单',
            detailUrl:'/manager/inventory/purchase/refund/main',
        },
        'XSDD':{
            detailText:'批发订单',
            detailUrl:'/manager/salesOrder/show',
        },
        'XSD':{
            detailText:'批发单',
            detailUrl:'/manager/salesOut/show',
        },
        'XSHHD':{
            detailText:'批发换货单',
            detailUrl:'/manager/salesExchange/show',
        },
        'XSTHD':{
            detailText:'批发退货单',
            detailUrl:'/manager/salesRefund/show',
        },
        'TJDBFHD':{
            detailText:'同价调拨发货单',
            detailUrl:'/manager/inventory/storage/samePrice/transfer/main',
        },
        'BJDBFHD':{
            detailText:'变价调拨发货单',
            detailUrl:'/manager/inventory/storage/changePrice/transfer/main',
        },
        'SPYKD':{
            detailText:'商品移库单',
            detailUrl:'/manager/inventory/storage/products/move/main',
        },
        'QTRKD':{
            detailText:'其他入库单',
            detailUrl:'/manager/inventory/storage/stock/other/incoming/main',
        },
        'QTCKD':{
            detailText:'其他出库单',
            detailUrl:'/manager/inventory/storage/stock/other/removal/main',
        },
        'ZJTZD':{
            detailText:'资金调整单',
            detailUrl:'/manager/inventory/fund/adjust/main',
        },
        'YSTKD':{
            detailText:'预收退款单',
            detailUrl:'/manager/inventory/fund/inPayment/refund/recRefund/main',
        },
        'YFTKD':{
            detailText:'预付退款单',
            detailUrl:'/manager/inventory/fund/inPayment/refund/payRefund/main',
        },
        'FKD':{
            detailText:'付款单',
            detailUrl:'/manager/funds/payment/initPayment',
        },
        'SKD':{
            detailText:'收款单',
            detailUrl:'/manager/funds/payment/initPayee',
        },
        'YFKD':{
            detailText:'预付款单',
            detailUrl:'/manager/funds/payment/planPayment',
        },
        'YSKD':{
            detailText:'预收款单',
            detailUrl:'/manager/funds/payment/planPayee',
        },
        'GYSFLD':{
            detailText:'供应商返利单',
            detailUrl:'/manager/funds/supplierRebate',
        },
        'KHJBD':{
            detailText:'客户价保单',
            detailUrl:'/manager/funds/clientReprice',
        },
        'KHFLD':{
            detailText:'客户返利单',
            detailUrl:'/manager/funds/clientRebate',
        },
        'YHD':{
			detailText:'要货单',
			detailUrl:'/manager/inventory/storage/needGoods/main',
        }
    };
    $.pageListCommon={
        //初始化红冲
        initRedModal:function () {
            var _tem=`<!-- 红冲Modal -->
                    <div class="modal fade" id="redModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                            aria-hidden="true">&times;</span></button>
                                    <h4 class="modal-title" id="myModalLabel">红冲</h4>
                                </div>
                                <div class="modal-body">
                                    <div class="col-sm-3">
                                        时间：
                                    </div>
                                    <div class="input-group col-sm-8">
                                        <input type="text" class="form-control redTime">
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-primary redSave">确定</button>
                                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                                </div>
                            </div>
                        </div>
                    </div>`
            $('body').append(_tem)
            //保存红冲按钮
        },
        //初始化列设置
        initSetModal:function () {
            var _tem=` <!-- 列设置Modal -->
                    <div id="lineSet-modal" class="modal" tabindex="-1" role="dialog" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                        <h4 class="modal-title">列设置</h4>
                                    </div>
                                    <div class="modal-body" style="width:600px;">
                                        <table id='lineSetGrid'></table>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="erp-btn-bg sureLineSet" data-dismiss="modal" onclick="sureLineSet()">确认</button>
                                        <button type="button" class="erp-btn-lab" data-dismiss="modal">关闭</button>
                                    </div>
                                </div>
                            </div>
                        </div>`
            $('body').append(_tem)
            $("#lineSetGrid").jqGrid({
                styleUI: 'Bootstrap',
                mtype: "POST",
                datatype: "local",
                viewrecords: true,
                rowNum: 400,
                width: "100%",
                height: $(window).height() * 0.55,
                colNames: ['id', '报表列字段', '是否显示', 'code'],
                colModel: [
                    {name: "id", width: '40px', align: "center", sortable: false, hidden: true},
                    {name: "name", width: '250px', align: "center", sortable: false},
                    {
                        name: "isShow",
                        width: '250px',
                        align: "center",
                        sortable: false,
                        formatter: "checkbox",
                        formatoptions: {disabled: false},
                        edittype: 'checkbox',
                        editoptions: {value: '1:0'}
                    },
                    {name: "code", width: '40px', align: "center", sortable: false, hidden: true},
                ],
                jsonReader: {
                    repeatitems: false,
                    root: 'data.columnVoList',
                },
                gridComplete: function () {
                    $('#lineSet-modal th').css('text-align', 'center')
                    $('#lineSetGrid').resize()
                },
            });

            var startGapX, endGapX
            //拖动事件回调
            $('#ysContainer').mouseup(function (event) {
                endGapX = event.clientX - $(this).offset().left
                if (startGapX - endGapX != 0) {
                    setTimeout(function () {
                        var colModel = $("#rpGrid").jqGrid('getGridParam', 'colModel')
                        var colIds = []
                        for (var i = 1; i < colModel.length; i++) {
                            colIds.push({'id': colModel[i].id})
                        }
                        $.ajax({
                            url:'/manager/erp/projectAndColumn/updateColumns',
                            dataType: 'json',
                            type: 'post',
                            data: {
                                flag : true,
                                valList: JSON.stringify(colIds)
                            },
                            success: function (data) {

                            }
                        })

                    }, 1000)
                }

            });

            $('#ysContainer').mousedown(function (event) {
                startGapX = event.clientX - $(this).offset().left
            })
        },
        /*
         IgnoreValidation: 是否忽略验证
        * */
        initMenuBtn:function (Menu, IgnoreValidation) {
            var pageKey=$('#GridTool').data('code')
            Menu= Menu==undefined?{}:Menu;
            IgnoreValidation= IgnoreValidation==undefined?{}:IgnoreValidation;
            var GridToolOption = {
                btnGroupLeft: {
                    ColumnSettings:{
                        isShow: true,
                        click:function(){
                            $('#lineSet-modal').modal('show');
                            $("#lineSetGrid").jqGrid('setGridParam', {
                                datatype: "json",
                                url:'/manager/erp/projectAndColumn/getColumns',
                                postData: {
                                    'rpMainId':  projectId
                                }
                            }).trigger("reloadGrid");
                            if(Menu.ColumnSettings){
                                Menu.ColumnSettings()
                            }
                        }
                    },
                    export: {
                        isShow: true,
                        click: function () {
                            if(Menu.export){
                                Menu.export()
                            }
                        }
                    },
                    add: {
                        isShow: true,
                        click: function () {
                            window.parent.openWorkBoxByMenutext(getGoInfo[pageKey].detailText, getGoInfo[pageKey].detailUrl, true);
                            if(Menu.add){
                                Menu.add()
                            }
                        }
                    },
                    draftDel: {
                        isShow: true,
                        click: function () {
                            var selRowId = $("#rpGrid").jqGrid('getGridParam','selarrrow');
                            if(selRowId.length<1){
                                $.zxsaas_plus.showalert('提示', "请勾选数据!");
                                return false;
                            }
                            var mainIds=[];
                            for(var i=0;i<selRowId.length;i++){
                                var rowData = $("#rpGrid").jqGrid('getRowData', selRowId[i]);
                                if(rowData.billsStatus !=1 && rowData.billsStatus !=14 && rowData.billsStatus !=15){
                                    $.zxsaas_plus.showalert('提示', "只能删除草稿单!");
                                    return false;
                                }
                                mainIds.push(rowData.billsId)
                            }
                            $.zxsaas_plus.showconfirm('提示', "是否删除此草稿单？", function(){
                                if(Menu.draftDel){
                                    Menu.draftDel(mainIds.join(','))
                                }
                            });

                        }
                    },
                    draftPost: {
                        isShow: true,
                        click: function () {
                            var selRowId = $("#rpGrid").jqGrid('getGridParam','selarrrow');
                            if(selRowId.length<1){
                                $.zxsaas_plus.showalert('提示', "请勾选数据!");
                                return false;
                            }else if(selRowId.length>1){
                                $.zxsaas_plus.showalert('提示', "只能过账一条数据!");
                                return false;
                            }
                            var mainIds=[];
                            for(var i=0;i<selRowId.length;i++){
                                var rowData = $("#rpGrid").jqGrid('getRowData', selRowId[i]);
                                if(rowData.billsStatus !=1 ){
                                    $.zxsaas_plus.showalert('提示', "只能过账草稿单!");
                                    return false;
                                }
                                mainIds.push(rowData.billsId)
                            }
                            if(Menu.draftPost){
                                Menu.draftPost(mainIds.join(','))
                            }

                        }
                    },
                    shipments:{
                        isShow: true,
                        click: function () {
                            var selRowId = $("#rpGrid").jqGrid('getGridParam','selarrrow');
                            if(selRowId.length<1){
                                $.zxsaas_plus.showalert('提示', "请勾选数据!");
                                return false;
                            }else if(selRowId.length>1){
                                $.zxsaas_plus.showalert('提示', "只能发货一条数据!");
                                return false;
                            }
                            var mainIds=[];
                            for(var i=0;i<selRowId.length;i++){
                                var rowData = $("#rpGrid").jqGrid('getRowData', selRowId[i]);
                                if(rowData.billsStatus !=1 ){
                                    $.zxsaas_plus.showalert('提示', "只能发货草稿单!");
                                    return false;
                                }
                                mainIds.push(rowData.billsId)
                            }
                            if(Menu.shipments){
                                Menu.shipments(mainIds.join(','))
                            }

                        }
                    },
                    red: {
                        isShow: true,
						click: function click() {
							//desc(IgnoreValidation) 这里是后续拓展
							if (IgnoreValidation.red === true) {
								if (Menu.redValidation) {
									Menu.redValidation();
								}
								return false;
							}
							var selRowId = $("#rpGrid").jqGrid('getGridParam', 'selarrrow');
							if (selRowId.length < 1) {
								$.zxsaas_plus.showalert('提示', "请勾选数据!");
								return false;
							} else if (selRowId.length > 1) {
								$.zxsaas_plus.showalert('提示', "只能红冲一条数据!");
								return false;
							} else {
								var mainIds = [];
								var rowData = $("#rpGrid").jqGrid('getRowData', selRowId);
								if (!(rowData.billsStatus == 6 && rowData.auditStatus == '0')) {
									$.zxsaas_plus.showalert('提示', "只能对已过账且未稽核单据红冲!");
									return false;
								}

								mainIds.push(rowData.billsId);
								$('#redModal').modal('show');
								$('.redSave').data('billsId', mainIds.toString());
								var min = CompareDate(_authList.minDate, rowData.billsDateStr) ? _authList.minDate : rowData.billsDateStr;
								$('.redTime').datePlu({
									endDate:false,
									ifPermissions: false,
									minTime: min,
									defaultTime: min
								})
							}
						}
                    },
                    copy: {
                        isShow: true,
                        click: function () {
                            var selRowId = $("#rpGrid").jqGrid('getGridParam','selarrrow');
                            if(selRowId.length>1){
                                $.zxsaas_plus.showalert('提示', "只能复制一条数据!");
                                return
                            }else if(selRowId.length<1){
                                $.zxsaas_plus.showalert('提示', "请勾选数据!");
                                return false;
                            }
                            var selRowData = $("#rpGrid").jqGrid('getRowData', selRowId);
                            if(selRowData.billsStatus == 7 && selRowData.billsCode.indexOf('_') != -1){
                                $.zxsaas_plus.showalert('提示', "不能复制红冲单据!");
                                return false;
                            }
                            if(selRowData.billsStatus == 1){
                                $.zxsaas_plus.showalert('提示', "只能复制单据状态为“已过账、已红冲原单”的单据!");
                                return false;
                            }
                            if(selRowData.billsStatus == 14 || selRowData.billsStatus == 15){
								$.zxsaas_plus.showalert('提示', "只能复制单据状态为“已提交”的单据!");
								return false;
                            }

                            var billsId=$.trim(selRowData.billsId)
                            var billsCode=$.trim(selRowData.billsCode)
                            window.parent.openWorkBoxByMenutext(getGoInfo[pageKey].detailText,
                                getGoInfo[pageKey].detailUrl+'?billsId='+billsId+'&copyFlag=1'+'&billsCode='+billsCode
                                ,true);
                        }
                    },
					submit: {
						isShow: true,
						click: function () {
							var selRowId = $("#rpGrid").jqGrid('getGridParam','selarrrow');
							if (selRowId.length < 1) {
								$.zxsaas_plus.showalert('提示', "请勾选数据!");
								return false;
							}
							var mainIds=[];
							for(var i=0;i<selRowId.length;i++){
								var rowData = $("#rpGrid").jqGrid('getRowData', selRowId[i]);
								if(rowData.billsStatus !=14 && rowData.billsStatus !=15){
									$.zxsaas_plus.showalert('提示', "只能对未提交单据提交!");
									return false;
								}
								mainIds.push(rowData.billsId)
							}
							if(Menu.submit){
								Menu.submit(mainIds.join(','))
							}
						}
					},
					revoke: {
						isShow: true,
						click: function () {
							var selRowId = $("#rpGrid").jqGrid('getGridParam','selarrrow');
							if (selRowId.length < 1) {
								$.zxsaas_plus.showalert('提示', "请勾选数据!");
								return false;
							}
							var mainIds=[];
							for(var i=0;i<selRowId.length;i++){
								var rowData = $("#rpGrid").jqGrid('getRowData', selRowId[i]);
								if(rowData.billsStatus !=13){
									$.zxsaas_plus.showalert('提示', "只能撤回已提交单据!");
									return false;
								}
								mainIds.push(rowData.billsId)
							}
							if(Menu.revoke){
								Menu.revoke(mainIds.join(','))
							}
						}
					},
                    //审核
                    check:{
                        isShow: true,
                        click: function () {
                            var selRowId = $("#rpGrid").jqGrid('getGridParam','selarrrow');
							if(Menu.check){
								Menu.check(selRowId);
							}else{
                                if(selRowId.length>1){
                                    $.zxsaas_plus.showalert('提示', "只能审核一条数据!");
                                    return
                                }else if(selRowId.length<1){
                                    $.zxsaas_plus.showalert('提示', "请勾选数据!");
                                    return false;
                                }
								var selRowData = $("#rpGrid").jqGrid('getRowData', selRowId);
                                if(selRowData.billsStatus !=1){
                                    $.zxsaas_plus.showalert('提示', "只能对草稿单进行审核!");
                                    return false;
                                }
                                var billsId=$.trim(selRowData.billsId)
                                window.parent.openWorkBoxByMenutext(getGoInfo[pageKey].detailText,
                                    getGoInfo[pageKey].detailUrl+'?billsId='+billsId+'&checkFlag=1'
                                    ,true);
                            }

                        }
                    },
					uncheck: {
						isShow: true,
						click: function () {
							var selRowId = $("#rpGrid").jqGrid('getGridParam','selarrrow');
							if(selRowId.length<1){
								$.zxsaas_plus.showalert('提示', "请勾选数据!");
								return false;
							}
							var mainIds=[];
							for(var i=0;i<selRowId.length;i++){
								var rowData = $("#rpGrid").jqGrid('getRowData', selRowId[i]);
								if(rowData.billsStatus != 2){
									$.zxsaas_plus.showalert('提示', "只能对已审核单据进行反审核!");
									return false;
								}
								mainIds.push(rowData.billsId)
							}
							if(Menu.uncheck){
								Menu.uncheck(mainIds.join(','))
							}
						}
					},
                    //强制
                    mandatory:{
                        isShow: true,
                        click: function () {
                            var selRowId = $("#rpGrid").jqGrid('getGridParam','selarrrow');
                            var selRowData = $("#rpGrid").jqGrid('getRowData', selRowId);
                                if (selRowId.length < 1) {
                                    $.zxsaas_plus.showalert('提示', "请勾选数据!");
                                    return false;
                                }
                                else if (selRowId.length > 1) {
                                    $.zxsaas_plus.showalert('提示', "一次只能强制完成一条数据");
                                    return false;
                                }

                                if (Menu.mandatory) {
                                    var data = {
                                        id: selRowData.billsId,
                                        date: selRowData.billsDateStr
                                    }
                                    Menu.mandatory(data)
                                }
                        }

                        },
                    audit: {
                        isShow: true,
                        click: function () {
                            var selRowId = $("#rpGrid").jqGrid('getGridParam','selarrrow');
                            if(selRowId.length<1){
                                $.zxsaas_plus.showalert('提示', "请勾选数据!");
                                return false;
                            }
                            var mainIds=[];
                            for(var i=0;i<selRowId.length;i++){
                                var rowData = $("#rpGrid").jqGrid('getRowData', selRowId[i]);
                                if(!(rowData.billsStatus !=1 && rowData.auditStatus=='0')){
                                    $.zxsaas_plus.showalert('提示', "只能对正式且未稽核单据稽核!");
                                    return false;
                                }
                                mainIds.push(rowData.billsId)
                            }
                            if(Menu.audit){
                                Menu.audit(mainIds.join(','))
                            }
                        }
                    },
                    auditCancle: {
                        isShow: true,
                        click: function () {
                            var selRowId = $("#rpGrid").jqGrid('getGridParam','selarrrow');
                            if(selRowId.length<1){
                                $.zxsaas_plus.showalert('提示', "请勾选数据!");
                                return false;
                            }
                            var mainIds=[];
                            for(var i=0;i<selRowId.length;i++){
                                var rowData = $("#rpGrid").jqGrid('getRowData', selRowId[i]);
                                if(!(rowData.billsStatus !=1 && rowData.auditStatus=='1')){
                                    $.zxsaas_plus.showalert('提示', "只能对已稽核单据取消稽核!");
                                    return false;
                                }
                                mainIds.push(rowData.billsId)
                            }
                            if(Menu.auditCancle){
                                Menu.auditCancle(mainIds.join(','))
                            }
                        }
                    },
                    voucher: {
                        isShow: true,
                        click: function () {
                            var selRowId = $("#rpGrid").jqGrid('getGridParam','selarrrow');
                            if(selRowId.length<1){
                                $.zxsaas_plus.showalert('提示', "请勾选数据!");
                                return false;
                            }
                            var mainIds=[];
                            for(var i=0;i<selRowId.length;i++){
                                var rowData = $("#rpGrid").jqGrid('getRowData', selRowId[i]);
                                if((rowData.billsStatus ==1)){
                                    $.zxsaas_plus.showalert('提示', "只能正式单据才能生成凭证!");
                                    return false;
                                }
                                mainIds.push(rowData.billsId)
                            }
                            $.ajaxPackage({
                                url:'/manager/inventory/common/batchSaveGenerateVoucher',
                                data:{billsIds:mainIds.join(','),'menuCode':pageKey},
                                success:function (data) {
                                    $.zxsaas_plus.showalert('提示', data.data.executeResult);
                                    $.pageListCommon.reloadTable()
                                }
                            })
                        }
                    }
                }
            }
            new componentMenuBtn("#GridTool", GridToolOption);

            $(".redSave").off('click').on("click",function(){
                var data={
                    id:$(this).data('billsId'),
                    redDate:$('.redTime').val()
                }
                if(Menu.red){
                    Menu.red(data)
                }
            });
        },
        searchDetail: function (params, url, options) {
            var pageKey=$('#GridTool').data('code')
            options = options==undefined?{}:options;
            var alignArr = ['', 'left', 'center', 'right'];
            var def = {
                sortable: true,//是否排序
                footerrow:true,
                multiselect: true, //是否多选
                gotoable: true,//是否跳转
                merge: false,//是否合并
            }
            def = $.extend({}, def, options)
            jQuery("#rpGrid").jqGrid("clearGridData");
            //获取头部
            $.ajaxPackage({
                url: "/manager/finance/common/getReportHead",
                data: {'projectId': projectId},
                success: function (data) {
                    var colName = [];
                    var colModel = [];
                    var groupHeader = [];
                    var mergeArr = [];
                    var complexData = {
                        colName: colName,
                        colModel: colModel,
                        groupHeader: groupHeader
                    };
                    $.each(data.data.colModel, function (k, v) {
                        colName.push(v.defualname);
                        var addJson = {
                            name: v.code,
                            index: v.code,
                            width: v.columnSize,
                            align: alignArr[v.align],
                            hidden: !v.isShow,
                            id: v.id,
                            sortable: def.sortable,
                            cellattr: function (rowId, tv, rawObject, cm, rdata) {
                            },
                        };
                        //稽核
                        if (v.code == "auditStatus") {
                            addJson.formatter = "select";
                            addJson.editoptions = {value: "0:未稽核;1:已稽核;"};
                        }
                        //单据编号
                        else if(v.code == "billsCode"){
                            addJson.classes='billsCodeStyle'
                            addJson.formatter=function(cellvalue, options, rowObject){
                                var links=''
                                if($.trim(rowObject.billsCode)==''){
                                    links='草稿单-点我编辑'
                                }else{
                                    links=cellvalue
                                }
                                return  links
                            }
                        }
                        //单据编号
                        else if(v.code == "billsCode"){
                            addJson.classes='billsCodeStyle'
                        }
                        //单据编号
                        else if(v.code == "voucherNo"){
                            addJson.classes='billsCodecss'
                        }
                        //单据状态
                        else if(v.code == "billsStatus"){
                            addJson.formatter = "select";
                            addJson.editoptions = {value: "1:草稿;2:已审核;3:入库中;4:已完成;5:强制完成;6:已过账;7:已红冲;8:已发货;9:作废;10:已接收;11:拒收;12:出库中;13:已提交;14:已撤回;15:未提交;"};
                        }
                        colModel.push(addJson);
                    });
                    for (var i = 0; i < data.data.colModel.length; i++) {
                        if (data.data.colModel[i].dataType == 'String' && data.data.colModel[i].isShow) {
                            mergeArr.push(data.data.colModel[i].code)
                        }
                        if (data.data.colModel[i].dataType == 'Number') {
                            break;
                        }
                    }

                    $.jgrid.gridUnload("rpGrid");
                    $("#rpGrid").jqGrid({
                        styleUI: 'Bootstrap',
                        mtype: "POST",
                        url: url,
                        postData: params,
                        datatype: "json",
                        jsonReader: {
                            repeatitems: false,
                            root: 'data.dataList',
                            total: 'data.total',
                            page: 'data.page',
                            records: 'data.records'
                        },
                        rowNum: 100,
                        rowList: [100, 200, 500],
                        viewrecords: true,
                        shrinkToFit:false,
                        autowidth: true,
                        rownumWidth: 50, // the width of the row numbers columns
                        rownumbers: true,	//显示行号
                        width: '100%',
                        height: $(window).height() * 0.4,
                        pager: '#rpGridPager',
                        colNames: colName,
                        colModel: colModel,
                        userDataOnFooter: true,
                        footerrow: def.footerrow, //显示底部菜单
                        multiselect: def.multiselect,
                        sortable: def.sortable,
                        multiboxonly : true,
                        cellEdit: true,
                        gridComplete:function(){
                            $('#rpGrid').resize()
                            if (mergeArr.length > 0 && def.merge) {
                                Merger("rpGrid", mergeArr);
                            }
                        },
                        loadComplete: function (data) {
                            $('#rpGrid').resize()
                            $("#rpGrid").footerData("set",{rn:"合计"});
                            var footerData = data.data.totalVo;
                            $(this).footerData("set", footerData, false);
                            if (data.result == 1) {
                                var $table= $('#rpGrid')
                                var ids = $table.getDataIDs();
                                $.each(ids,function(i,keyId){
                                    var row = $table.getRowData(keyId);
                                    var curTr= $("#rpGrid #"+keyId);
                                    if(row.billsStatus == 7){
                                        curTr.css("color","red");
                                    }else{
                                        curTr.css("color","");
                                    }
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

                                //数据请求成功之后，若果有要操作数据的行为，在这里执行
                                if (def.loadComplete) {
                                    def.loadComplete(data)
                                }


                                //分页滚动条 置顶
                                $("#rpGrid").parents(".ui-jqgrid-bdiv")[0].scrollTop = 0;
                            } else {
                                $.zxsaas_plus.showalert("提示", data.desc);
                            }
                        },
                        onCellSelect:function (rowid, index, contents, event) {
                            if (def.gotoable) {
                                var info = $("#rpGrid").getRowData(rowid)
                                var billsCode = info.billsCode == '草稿单-点我编辑' ? '' : info.billsCode
                                var tarName=$(event.target).attr('aria-describedby')||'';
                                if ( tarName== 'rpGrid_billsCode' ) {
                                    window.top.openWorkBoxByMenutext(getGoInfo[pageKey].detailText,
                                        getGoInfo[pageKey].detailUrl+ '?billsId='+info.billsId+'&billsCode='+billsCode, true)
                                }else if(tarName== 'rpGrid_voucherNo'){
                                    if($.trim(info.voucherId)!=""){
                                        window.top.openWorkBoxByMenutext("填制凭证",
                                            "/manager/cw/test/voucher"+ '?billsId='+info.voucherId+'&bId='+info.voucherId, true)
                                    }

                                }
                            }
                            if (def.onCellSelect) {
                                def.onCellSelect(rowid, index, contents, event);
                            }
                        },
                        resizeStop: function (newwidth, index) {
                            var columnId
                            var profitIndex
                            if(def.multiselect){
                                profitIndex=2
                            }else{
                                profitIndex=1
                            }
                            columnId = data.data.colModel[index-profitIndex].id;
                            $.ajaxPackage({
                                url: '/manager/erp/projectAndColumn/updateColumnSize',
                                data: {
                                    'columnId': columnId,
                                    'columnSize': newwidth,
                                },
                                success: function (data) {

                                },
                            })
                        }
                    });
                    //数据请求成功之后，若果有要操作数据的行为，在这里执行
                    if (def.headCallback) {
                        def.headCallback()
                    }
                    $("#rpGrid").jqGrid('bindKeys', '');
                }
            });
        },
        resetFun:function(){
            $("#searchQuery")[0].reset();
            $("#searchQuery input").data({'id':'','sectionId':''});
            if($("#searchQuery input.easyui-combotree").length>0){
                $("#searchQuery input.easyui-combotree").combotree("clear")
            }
            $('#isContainsRedbills').prop('disabled',false)
            $('#startDate').datePlu({
                dateEnd:'#endDate',
                endDate:true,
                minTime:"1970-01-01",
                ifPermissions:false,
            })
            $('#searchQuery ul').html('')
            $("#searchQuery table tbody .jqgrow").remove()
        },
        reloadTable:function(){
            setTimeout(function () {
                $('#rpGrid').trigger("reloadGrid");
            },150)
        },
    }
}(jQuery);