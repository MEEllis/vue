var imeiInputObj = null;//串号录入（对象）
//初始化表格
var dataGrid = null;
var lastrow = null,lastcell = null;
//初始化表格
var dataGrid2 = null;
var lastrow2 = null,lastcell2 = null;
var billsType=3   //1:采购订单 2:采购入库单 3:采购换货单 4:采购退货单
$(function(){
    init()
    //初始化
    function init(){
        initDataGrid();//初始化表格
        initDataGrid2();//初始化表格2
        initDataGrid4();//在库串号表
        initDataGrid5();//引入串号表
        initDataGrid6();//付款表
        initEvents();//初始化事件
        imeiDr();//串号导入
        initEvent()
        billId=billId||functionObjExtent.getQueryString('billsId')
        //这里入口过多，这里进行适配。（优先读取后台注入的值）
        billsCode=billsCode||functionObjExtent.getQueryString('billsCode')
        //	是否从报表进入
        if (billId != ''  || billsCode != '') {
            var copyFlag = functionObjExtent.getQueryString('copyFlag')
            var checkFlag = functionObjExtent.getQueryString('checkFlag')
            queryPage(function () {
                //复制一单
                if(copyFlag==1){
                    copyBtClick()
                }else{
                    //审核一单
                    if(checkFlag==1){
                        openCheckDetailModal()
                    }
                }
            });
        } else {
            openAddState();
        }
    }
    //初始化事件
    function initEvent(){
        initTopForm()
        initTable()
        initImeiImport()
        initMenuBtn()
        getAuthList();
    }
    //载入菜单组件
    function initMenuBtn(){
        var isDraftOp=!$("#slideThree").is(':checked')
        var option = {
            btnGroupLeft: {
                add: {
                    isShow: true,
                    click: function () {
                        location.href =location.href.substring(0,location.href.indexOf('?'));
                    }
                },
                draftSave: {
                    isShow: isDraftOp,
                    click: function () {
                        saveBtClick()
                    }
                },
                draftDel: {
                    isShow: isDraftOp,
                    click: function () {
                        delBtClick()
                    }
                },
                draftPost: {
                    isShow: isDraftOp,
                    click: function () {
                        checkBtClick()
                    }
                },
                red:{
                    isShow: !isDraftOp,
                    click: function () {
                        forceFinishBtClick()
                    }
                },
                // print:{
                //     click: function () {
                //         print()
                //     }
                // },
				printDropdown:{
					list:[{
						name:'商品汇总',
						click:function(){
							print('noimei')
						}
					},{
						name:'商品明细',
						click:function(){
							print('showimei')
						}
					}]
				},
                copy:{
                    isShow: !isDraftOp,
                    click: function () {
                        copyBtClick()
                    }
                },
                audit:{
                    isShow: !isDraftOp,
                    click: function () {
                        var topFormObj = $(".gridTop").toJsonObject();
                        $.ajaxPackage({
                            url: '/manager/inventory/purchase/updateAuditStatus',
                            data: {
                                'billsType':billsType,
                                'billsId':topFormObj.id,
                                'auditStatus':1,
                            },
                            success: function () {
                                $.zxsaas_plus.showalert('success', "稽核成功");
                                queryPage();
                            }
                        })
                    }
                },
                auditCancle:{
                    isShow: !isDraftOp,
                    click: function () {
                        var topFormObj = $(".gridTop").toJsonObject();
                        $.ajaxPackage({
                            url: '/manager/inventory/purchase/updateAuditStatus',
                            data: {
                                'billsType':billsType,
                                'billsId':topFormObj.id,
                                'auditStatus':0,
                            },
                            success: function (data) {
                                $.zxsaas_plus.showalert('success', "取消稽核成功");
                                queryPage();
                            }
                        })
                    }
                },
                update:{
                    isShow: !isDraftOp,
                    click: function () {
                        saveBtClick()
                    }
                },
            },
            btnGroupRight: {
                history: {
                    isShow: true,
                    click: function () {
                        window.parent.openWorkBoxByMenutext("采购换货单单据列表",  '/manager/inventory/purchase/historyMain?billsType='+billsType, true);
                    }
                }
            }
        };
        menuBtn = new componentMenuBtn("#MenuTool", option);
    }
    // 初始化 顶部表单
    function initTopForm(){
        //单据日期
        $('input[name="billsDateStr"]').datePlu({
            ajaxOpt:{
                async:false,
            },
            endDate: false,
        });
        //部门
        $("#topForm input[name='sectionName']").storePlu({
            isStoreShow:false,
            isLoadDefaultName:0,
            checkMore: false,
            search: false,
            ifStore: false, // 控制部门选项
            changeStore:function(){
                var id=$("#topForm input[name='sectionName']").data('sectionId');
                //设置编辑器值
                $("input[name='sectionId']").val(id);
                $("input[name='managerId']").val("");
                $("input[name='managerName']").val("");
                $('#payReceiveAmount').val(0);
                $('#payReceiveAmount').val(0);
                dataGrid6.$grid.jqGrid('clearGridData');
                dataGrid2.clearDataGrid();
                dataGrid2.addKongRow();
                currPayreceiptDetailList = [];
                onSectionChange(id)
                InterfaceInventory.common.getDefaultStorgeList({
                    data:{sectionId:id},
                    success:function(data){
                        var storageList=data.data.storageList||[]
                        var storageItem=storageList[0]||{}
                        var ids=$('#dataGrid').getDataIDs();
                        $.each(ids,function(index,rowid){
                            $('#dataGrid').jqGrid("setCell",rowid,"storageName",storageItem.name);
                            $('#dataGrid').jqGrid("setCell",rowid,"storageId",storageItem.storageId);
                        })
                    }
                })


            }
        });
        //经办人
        $("#topForm input[name='managerName']").comModalsEmployeeBySection({
            sectionIds:'input[name="sectionId"]',
            clickback:function () {
                var obj= $("#topForm input[name='managerName']");
                //设置编辑器值
                $("input[name='managerName']").val(obj.val());
                $("input[name='managerId']").val(obj.data('id'));
            }
        })
        //往来单位
        $("#topForm input[name='contactUnitName']").comModalsContactUnit({
            clickback:function () {
                var obj= $("#topForm input[name='contactUnitName']");
                //设置编辑器值
                $("input[name='contactUnitName']").val(obj.val());
                $("input[name='contactUnitId']").val(obj.data('id'));
                //切换往来单位余额
                initWLDWamount(obj.data('id'));

                var ids = $('#dataGrid').getDataIDs();
                var goodsIdList=[]
                $.each(ids,function(i,keyId){
                    var rowData = $('#dataGrid').getRowData(keyId);
                    if(rowData.goodsId!=''){
                        goodsIdList.push(rowData.goodsId)
                    }
                })
                getPrice(goodsIdList,1)
            }
        })
    }
    // 初始化表格
    function initTable(){
        //串号模态框
        imeiInputObj = new comImeiInputModal();
        //换入信息商品名称
        $("#dataGridGood").comModalsAllGoods({
            inStockMethod:1,
            clickback:function(goodsList){
                if(goodsList.length>0){
                    $("#dataGrid").jqGrid('saveCell',lastrow,lastcell);
                    var selRowId = $("#dataGrid").jqGrid('getGridParam','selrow');
                    var selRowData=$("#dataGrid").jqGrid('getRowData',selRowId)
                    var cIndex;
                    for(var i=0;i<goodsList.length;i++){
                        var goods = goodsList[i];
                        var dataRow = {
                            'code':goods.code,
                            'categoryName':goods.categoryName,
                            'brandName': goods.brandName,
                            'models':goods.models,
                            'color':goods.color,
                            'goodsId':goods.dataId,
                            'goodsName':goods.name,
                            'discountRate': 100,
                            'taxRate':  goods.taxRate,
                            'ifManageImei': goods.ifManageImei,
                            'imeiList': " ",
                            'goodsNumber':0,
                            'ifEnableAuxliaryImei':goods.ifEnableAuxiliaryImei,
                            'imeiLength':goods.imeiLength,
                            'auxliaryImeiLength':goods.auxiliaryImeiLength,
                            'storageId':selRowData.storageId,
                            'storageName':selRowData.storageName,
                        };
                        if(i==0){
                            $("#dataGrid").jqGrid('setRowData', selRowId, dataRow, {});
                            cIndex=selRowId;
                        }else{
                            cIndex=MyEiditGrid.getMaxRowid(dataGrid.$grid) + 1;
                            dataGrid.$grid.jqGrid('addRowData', cIndex, dataRow);
                        }

                        //是否 为 串号商品
                        if (goods.ifManageImei == 1) {
                            $("#dataGrid").jqGrid('setCell', cIndex, "goodsNumber", 0, 'ifManageImeiIcon');
                        } else {
                            //jqgrid 找不到移除 calss 的方法。这里只能外界操作dom 的方式
                            $("#dataGrid #" +  cIndex+ " td[aria-describedby='dataGrid_goodsNumber']").removeClass('ifManageImeiIcon')
                        }
                    }
                    dataGrid.$grid.delRowData('dataGrid_addRowId');
                    dataGrid.addKongRow();
                    dataGrid.$grid.delRowData(MyEiditGrid.getMaxRowid(dataGrid.$grid));
                    Summary();

                    var goodsIdList=[]
                    for(var i=0;i<goodsList.length;i++){
                        goodsIdList.push(goodsList[i].dataId)
                    }

                    getPrice(goodsIdList)
                }
                $("#dataGridGood").removeData();
            }
        })
        // 换入信息仓库
        $("#dataGridStorageName").comModalsStorage({
            treeParams:{
                sectionIsStore:0
            },
            clickback:function () {
                var $Obj=$("#dataGridStorageName");
                var  selrowId=$("#dataGrid").jqGrid('getGridParam','selrow');
                //设置编辑器值
                $("#dataGrid").jqGrid('saveCell',lastrow,lastcell);
                $("#dataGrid").jqGrid('setCell', selrowId, "storageId", $Obj.data('id'));
                $("#dataGrid").jqGrid('setCell', selrowId, "storageName", $Obj.val());
                Summary();
                Summary2();
                $Obj.removeData();
            }
        })
        //换出信息商品名称
        $("#dataGrid2Good").comModalsOutStoreGoods({
            clickback:function(goodsList){
                if(goodsList.length>0){
                    $("#dataGrid2").jqGrid('saveCell',lastrow2,lastcell2);
                    var selRowId = $("#dataGrid2").jqGrid('getGridParam','selrow');
                    var selRowData=  $("#dataGrid2").jqGrid("getRowData",selRowId);
                    var cIndex
                    for(var i=0;i<goodsList.length;i++){
                        var goods = goodsList[i];//单选
                        var dataRow = {
                            'code':goods.code,
                            'categoryName':goods.categoryName,
                            'brandName': goods.brandName,
                            'models':goods.models,
                            'color':goods.color,
                            'goodsId':goods.dataId,
                            'goodsName2':goods.name,
                            'discountRate': 100,
                            'taxRate':  goods.taxRate,
                            'ifManageImei': goods.ifManageImei,
                            'imeiList': " ",
                            'goodsNumber':0,
                            'stockCount':goods.stockCount,
                            'ifEnableAuxliaryImei':goods.ifEnableAuxiliaryImei,
                            'imeiLength':goods.imeiLength,
                            'auxliaryImeiLength':goods.auxiliaryImeiLength,
                            "storageName2":selRowData.storageName2,
                            "storageId":selRowData.storageId,
                        }
                        if(i==0){
                            $("#dataGrid2").jqGrid('setRowData', selRowId, dataRow, {});
                            cIndex=selRowId;
                        }else{
                            cIndex=MyEiditGrid.getMaxRowid($("#dataGrid2")) + 1;
                            $("#dataGrid2").jqGrid('addRowData', cIndex, dataRow);
                        }
                    }
                    dataGrid2.$grid.delRowData('dataGrid2_addRowId');
                    dataGrid2.addKongRow();
                    dataGrid2.$grid.delRowData(MyEiditGrid.getMaxRowid(dataGrid2.$grid));
                    Summary2();
                }
                $("#dataGrid2Good").removeData();
            }
        })
        // 换出信息仓库
        $("#dataGrid2StorageName").comModalsStorage({
            treeParams:{
                sectionIsStore:0
            },
            clickback:function () {
                var $Obj=$("#dataGrid2StorageName");
                var  selRowId=$("#dataGrid2").jqGrid('getGridParam','selrow');
                var dataRow = {
                    'code':'',
                    'categoryName':'',
                    'brandName': '',
                    'models':'',
                    'color':'',
                    'goodsId':'',
                    'goodsName2':'',
                    'discountRate': 100,
                    'taxRate':  '',
                    'ifManageImei':'0',
                    'imeiList': " ",
                    'goodsNumber':0,
                    'stockCount':0,
                    'ifEnableAuxliaryImei':'false',
                    'imeiLength':'',
                    'auxliaryImeiLength':'',
                    'storageId':$Obj.data('id'),
                    'storageName2':$Obj.val()
                }
                //设置编辑器值
                $("#dataGrid2").jqGrid('saveCell',lastrow2,lastcell2);
                $("#dataGrid2").jqGrid('setRowData', selRowId, dataRow, {});
                Summary2();
                $Obj.removeData();
            }
        })

    }
    // 初始化串号导入
    function initImeiImport(){
        $('.imeiImport').click(function(){
            var sectionId = $('.sectionId').val();
            if(sectionId == ""){
                $.zxsaas_plus.showalert('提示','请选择部门');
            }else{
                $('#imeiDr-modal').modal('show');
                $('.imeiDr_vone,.imeiDr_vtwo').val('');
                $('.imeiDr_num').text(0);
                var ids = $('#imeiDrGrid').getDataIDs();
                arrs = [];
                $.each(ids,function(i,item){
                    var row = $('#imeiDrGrid').getRowData(item);
                    var index1 = arrs.indexOf(row.imei);
                    arrs.splice(index1, 1);
                })
                $("#imeiDrGrid").clearGridData().trigger('reloadGrid').resize();
            }
        })
        $('.imeiDr_import').click(function(){
            $(".imeiDr_vtwo").val('');
            //拿到外层表格串号
            var sectionId = $('.sectionId').val();
            var ids = $('#dataGrid2').getDataIDs();
            $.each(ids,function(i,item){
                var row = $('#dataGrid2').getRowData(item);
                if(row.stockCount > 0 && row.imeiList !== ""){
                    var vo = JSON.parse(row.imeiList);
                    $.each(vo,function(i,item){
                        if(item.imei !=="" && arrs.indexOf(item.imei) == -1){
                            arrs.push(item.imei);
                        }
                        if(item.auxiliaryImei !=="" && arrs.indexOf(item.auxiliaryImei) == -1){
                            arrs.push(item.auxiliaryImei);
                        }
                    });
                }
            })
            //开始添加串号
            var vone = $('.imeiDr_vone').val();
            var vtwo = $('.imeiDr_vtwo').val();
            var v1 = vone.split("\n");
            var str = '',vtr = '';
            $.each(v1,function(i,item){
                var toval = item.trim().toUpperCase();
                if(toval == ""){
                    return
                }
                if(arrs.indexOf(toval) == -1){
                    str+=toval+';'
                    arrs.push(toval);
                }else{
                    vtr+=toval+';'
                }
            })
            str = str.substring(0,str.length-1);
            if(str == ''){
                if(vtr !== "" ){
                    $('.imeiDr_vtwo').val(vtr+'已导入\n')
                }
                return
            }else{
                if(vtr !== "" ){
                    $('.imeiDr_vtwo').val(vtr+'已导入\n')
                }
            }
            $.request({
                type: "POST",
                url: '/manager/component/imei/validateOutStockImei',
                datatype : "json",
                data: {
                    sectionId: sectionId,
                    imeiInputData: str
                },
                success: function (data) {
                    if(data.result==1){
                        var failed = data.data.failedResultList;
                        var list = data.data.successResultList;
                        $.each(list,function(i,item){
                            $("#imeiDrGrid").addRowData(item.imeiId,item);
                        })
                        var num = $('#imeiDrGrid').getDataIDs();
                        $('.imeiDr_num').text(num.length);
                        var txt = $(".imeiDr_vtwo").val();
                        $.each(failed,function(i,item){
                            txt += item+'\n';
                        })
                        $(".imeiDr_vtwo").val(txt);
                        var a1 = $("#imeiDrGrid").getCol('imei');
                        var a2 = $("#imeiDrGrid").getCol('auxiliaryImei');
                        arrs = [];
                        $.each(a1,function(i,item){
                            arrs.push(item);
                            arrImei.push(item);
                        })
                        $.each(a2,function(i,item){
                            arrs.push(item);
                        })
                    }else{
                        $.zxsaas_plus.showalert("error",data.desc);
                    }
                },
                error: function (msg) {
                    $.zxsaas_plus.showalert("error","！" + msg);
                }
            });

        })
        $('.imeiDr_sure').click(function(){
            $('#imeiDr-modal').modal('hide');
            var dataIds = $("#dataGrid2").getDataIDs();
            var num = dataIds.length;
//	    	临时存储串号作对比
            var t1 = [],t2 = [],t3 = [];
            $.each(dataIds,function(i,index){
                var dataRow = $('#dataGrid2').getRowData(index);
                if(dataRow.storageId !== "" && dataRow.goodsId !== ""){
                    $.ajax({
                        url:"/manager/salesCommon/getStockImei",
                        type : "post",
                        dataType : 'json',
                        async: false,
                        data:{storageId: dataRow.storageId,goodsId: dataRow.goodsId},
                        success:function(data){
                            if(data.result == 1){
                                var vo = data.data.dataList;
                                $.each(vo,function(i,item){
                                    t1.push(item.imei);
                                    t2.push(item.auxiliaryImei);
                                    t3.push(index);
                                });
                            }
                        }
                    });
                }
            });
//	    	循环表格数据添加
            var ids = $("#imeiDrGrid").getDataIDs();
            $.each(ids,function(i,item){
                var row = $('#imeiDrGrid').getRowData(item);
                var oneId = $('#dataGrid2 tbody tr').eq(num).attr('id');
                var oneRow = $('#dataGrid2').getRowData(oneId);
//				判断第一行是否为空
                if(num == 1 && oneRow.storageName2 == "" && oneRow.goodsName2 == ""){
                    var id = $('#dataGrid2 tbody tr').eq(num).attr('id');
                    var daraRow = $('#dataGrid2').getRowData(id);
                    var saleArr = [];
                    var saleList = {
                        imei: row.imei,
                        imeiId: row.imeiId,
                        auxiliaryImei: row.auxiliaryImei,
                        remark: row.remark
                    }
                    var exist = t1.indexOf(row.imei);
                    if(exist == -1){
                        saleArr.push(saleList);
                        $("#dataGrid2").setRowData(id,{
                            storageId: row.storageId,
                            storageName2: row.sectionName+'-'+row.storageName,
                            categoryName: row.categoryName,
                            code: row.code,
                            goodsName2: row.name,
                            brandName: row.brandName,
                            models: row.models,
                            color: row.color,
                            stockCount: row.stockCount,
                            goodsId: row.goodsId,
                            remark: row.remark,
                            ifManageImei: row.ifManageImei,
                            taxRate: row.taxRate,
                            goodsNumber: 1,
                            amount: '0.00',
                            includingTaxAmount: '0.00',
                            includingTaxPrice: "0.00",
                            taxAmount: "0.00",
                            price: "0.00",
                            discountAmount: "0.00",
                            discountedAmount: "0.00",
                            discountRate: "100.00",
                            ifEnableAuxliaryImei: row.ifEnableAuxiliaryImei,
                            imeiList: JSON.stringify(saleArr)
                        });
                        //添加一行成功后增加此商品所有串号
                        $.ajax({
                            url:"/manager/salesCommon/getStockImei",
                            type : "post",
                            dataType : 'json',
                            async: false,
                            data:{storageId: row.storageId,goodsId: row.goodsId},
                            success:function(data){
                                if(data.result == 1){
                                    var vo = data.data.dataList;
                                    $.each(vo,function(i,item){
                                        t1.push(item.imei);
                                        t2.push(item.auxiliaryImei);
                                        t3.push(id);
                                    });
                                }
                            }
                        });
                    }else{
                        var existId = t3[exist];
                        var existRow = $('#dataGrid2').getRowData(existId);
                        var opt = JSON.parse(existRow.imeiList);
                        opt.push(saleList);
                        $("#dataGrid2").setRowData(existId,{
                            goodsNumber: opt.length,
                            imeiList: JSON.stringify(opt)
                        });
                    }

                }else{
                    var saleArr = [];
                    var saleList = {
                        imei: row.imei,
                        imeiId: row.imeiId,
                        auxiliaryImei: row.auxiliaryImei,
                        remark: row.remark
                    }
                    var exist = t1.indexOf(row.imei);
                    if(exist == -1){
                        dataGrid2.addKongRow();
                        num++;
                        var id = $('#dataGrid2 tbody tr').eq(num).attr('id');
                        var daraRow = $('#dataGrid2').getRowData(id);
                        saleArr.push(saleList);
                        $("#dataGrid2").setRowData(id,{
                            storageId: row.storageId,
                            storageName2: row.sectionName+'-'+row.storageName,
                            categoryName: row.categoryName,
                            code: row.code,
                            goodsName2: row.name,
                            brandName: row.brandName,
                            models: row.models,
                            color: row.color,
                            stockCount: row.stockCount,
                            goodsId: row.goodsId,
                            remark: row.remark,
                            ifManageImei: row.ifManageImei,
                            taxRate: row.taxRate,
                            goodsNumber: 1,
                            amount: '0.00',
                            includingTaxAmount: '0.00',
                            includingTaxPrice: "0.00",
                            taxAmount: "0.00",
                            price: "0.00",
                            discountAmount: "0.00",
                            discountedAmount: "0.00",
                            discountRate: "100.00",
                            ifEnableAuxliaryImei: row.ifEnableAuxiliaryImei,
                            imeiList: JSON.stringify(saleArr)
                        });
                        //添加一行成功后增加此商品所有串号
                        $.ajax({
                            url:"/manager/salesCommon/getStockImei",
                            type : "post",
                            dataType : 'json',
                            async: false,
                            data:{storageId: row.storageId,goodsId: row.goodsId},
                            success:function(data){
                                if(data.result == 1){
                                    var vo = data.data.dataList;
                                    $.each(vo,function(i,item){
                                        t1.push(item.imei);
                                        t2.push(item.auxiliaryImei);
                                        t3.push(id);
                                    });
                                }
                            }
                        });
                    }else{
                        var existId = t3[exist];
                        var existRow = $('#dataGrid2').getRowData(existId);
                        if(existRow.imeiList == ""){
                            var opt = [];
                        }else{
                            var opt = JSON.parse(existRow.imeiList);
                        }
                        opt.push(saleList);
                        $("#dataGrid2").setRowData(existId,{
                            goodsNumber: opt.length,
                            imeiList: JSON.stringify(opt)
                        });
                    }

                }
            })
            Summary2();
        })
    }
    //获取价格
    function getPrice(goodsIdList,isPrompt){
        var contactUnitId=$.trim($("input[name='contactUnitId']").val())
        var sectionId=$.trim($("input[name='sectionId']").val())
        var goodsId=goodsIdList.join(',')
        var updatePrice = function (priceList) {
            var ids = $('#dataGrid').getDataIDs();
            $.each(ids,function(i,keyId){
                var rowData = $('#dataGrid').getRowData(keyId);
                for(var j=0;j<priceList.length;j++){
                    var priceItem = priceList[j];
                    if(rowData.goodsId==priceItem.goodsId){
                        $('#dataGrid').jqGrid('setCell', keyId ,"price" ,priceItem.price);
                    }
                }
            })
            Summary()
        }
        if(sectionId!=''&&contactUnitId!=''&&goodsId.length>0){
            InterfaceInventory.common.getPurchaseGoodsPrice({
                data:{
                    'sectionId':sectionId,
                    'contactUnitId': contactUnitId,
                    'goodsId':goodsId
                },
                success:function (data) {
                    var priceList=data.data.dataList;
                    $("#dataGrid").jqGrid('saveCell',lastrow,lastcell);
                    if(data.data.updateFlag===true){
                        if(isPrompt==1){
                            $.MsgBox("操作提示","已成功切换往来单位，您需要更新采购单价吗？",function(){
                                updatePrice(priceList)
                            },function(){});
                        }else{
                            updatePrice(priceList)
                        }
                    }

                }
            })
        }
    }
});
//重载菜单组件
function reloadMenuBtn() {
    var isDraftOp=!$("#slideThree").is(':checked')
    var updateKey=['print','printDropdown','red','copy','update','audit','auditCancle'];
    var addkey=['draftPost','draftDel','draftSave'];
    var params = $("#topForm").toJsonObject();
    var billsStatus=  $.trim(params.billsStatus)
    var isAudit=  $.trim(params.auditStatus)
    $.pageDetailCommon.reloadMenuTool({
        isDraftOp:isDraftOp,
        isAudit:isAudit,
        billsStatus:billsStatus,
        menuBtn:menuBtn,
        billsCode:params.billsCode,
        updateKey:updateKey,
        addkey:addkey,
    })
}
var arrs = [],arrImei = [];
function imeiDelRow(id){
    var row = $('#imeiDrGrid').getRowData(id);
    var index1 = arrs.indexOf(row.imei);
    if(index1 !== -1){
        arrs.splice(index1, 1);
    }
    var index2 = arrs.indexOf(row.auxiliaryImei);
    if(index2 !== -1){
        arrs.splice(index2, 1);
    }
    $("#imeiDrGrid").delRowData(id);
    var num = $('#imeiDrGrid').getDataIDs();
    $('.imeiDr_num').text(num.length);
}

//打印单据
// function print(){
//     var id = $(".gridTop").toJsonObject().id;
//     if(id=="")return;
//
//     var tempKindDIV = $(
//         '<fieldset class="fieLeft" id="form3">'+
//         '<legend>打印模板类型</legend>'+
//         '<div class="">'+
//         '<label class="radio-inline"><input type="radio" name="printTempKind" value="showimei" checked>商品明细</label>'+
//         '<label class="radio-inline"><input type="radio" name="printTempKind" value="noimei">商品汇总</label>'+
//         '</div>'+
//         '</fieldset>'
//     )
//
//     BootstrapDialog.show({
//         title: '单据打印',
//         message: tempKindDIV,
//         buttons: [{label: '确定', cssClass: 'btn-primary',action: function(dialogItself) {dialogItself.close();todo();}},
//             {label: '取消',action: function(dialogItself){dialogItself.close();}
//             }]
//     });
//     function todo(){
//         $.printBills('/manager/inventory/purchase/exchange/print',
//             {
//                 billsId:id,
//                 printType:tempKindDIV.find("input[name='printTempKind']:checked").val()
//             }
//         )
//     }
// }

function print(type) {
	var id = $(".gridTop").toJsonObject().id;
	if (id == "") return;

	$.printBills('/manager/inventory/purchase/exchange/print',{
		billsId: id,
        isDraftOp:$("#slideThree").is(':checked')?false:true,
		printType:type
	})
}

/*************************分页 S******************************/

//分页查询
function queryPage(callbackObj){
    //获取查询参数
    //************
	if(billId != ''){
		$("#topForm input[name='id']").val(billId)
		$("#slideThree").prop('checked',false)
	}
    if(billsCode != ""){
        $("#slideThree").prop('checked',true)
    }

    var model = {
        isDraft:$("#slideThree").is(':checked') ? 0 :1,
        billsId:$("#topForm input[name='id']").val(),
    };
    pageAjax(model, callbackObj)
}

function pageAjax(param, callbackObj){
    //后台查询
    $.ajaxPackage({
        url:'/manager/inventory/purchase/exchange/searchOrder',
        data: param,
        success: function (data) {
            var result = data.data;
            //清楚报表跳转过来定义的数据
            billsCode= ''
            billId=''
            fillPageData(result.order);
            reloadMenuBtn()
            if(callbackObj){
                callbackObj(data.data)
            }
        }
    });
}

//填充页面页面数据
var currBillsCode = null;
function fillPageData(bills){
    $("#topForm").data('bootstrapValidator').resetForm();
    var formObj = bills;
    currBillsCode = bills.billsCode;
    var outDetailList = bills.outDetailList;
    var inDetailList = bills.inDetailList;
    bills.paymentReceivedOrderVo=bills.paymentReceivedOrderVo||{}
    var paymentReceivedOrderVo = bills.paymentReceivedOrderVo.detailList||[];
    currPayreceiptDetailList = paymentReceivedOrderVo;
    initWLDWamount(bills.contactUnitId);
    onSectionChange(bills.sectionId);
    //设置表单数据
    $(".gridTop").writeJson2Dom(formObj);
    $("input[name='billsDateStr']").val(formObj.billsDateStr);
    $(".gridBottom").writeJson2Dom(formObj);
    $("input[name='discountAmount']").val(formObj.discountAmount);

    //设置换出明细数据
    dataGrid2.clearDataGrid();
    for ( var int = 0; int < outDetailList.length; int++) {
        var row = outDetailList[int];
        if(row.imeiList.length>0){
            row.imeiList = JSON.stringify(row.imeiList);
        }
        row.giftFlag = row.giftFlag == 1 ?true:false;
        row.storageName2 = row.storageName;
        row.goodsName2 = row.goodsName;
        //插入空数据的1行
        dataGrid2.addRowData(int,row);
    }

    //设置换出明细数据
    dataGrid.clearDataGrid();
    for ( var int = 0; int < inDetailList.length; int++) {
        var row = inDetailList[int];
        var ifManageImeiIcon = "";
        if(row.imeiList.length>0){
            row.imeiList = JSON.stringify(row.imeiList);
        }
        //是否是串号
        if (row.ifManageImei == true) {
            ifManageImeiIcon = 'ifManageImeiIcon';
        }
        row.giftFlag = row.giftFlag == 1 ?true:false;
        //插入空数据的1行
        dataGrid.addRowData(int,row);
        //添加串号这个图标
        dataGrid.$grid.jqGrid('setCell', int, "goodsNumber", '', ifManageImeiIcon);
    }

    //设置收付款明细数据
    dataGrid6.clearDataGrid();
    var allAount = 0;$("#payReceiveAmount").val(0);
    if(paymentReceivedOrderVo!=null){
        for ( var int = 0; int < paymentReceivedOrderVo.length; int++) {
            var row = paymentReceivedOrderVo[int];
            allAount =accAdd(allAount,row.amount);
        }
    }
    $("#payReceiveAmount").val(allAount);
    Summary();
    Summary2();
    Summary();
    Summary6();
    initData = getPageData();
    if (bills.billsStatus == 6) {
        $('.rightMap img:eq(0)').attr('src', '/manager/images/guozhang.png');
    } else if (bills.billsStatus == 7) {
        $('.rightMap img:eq(0)').attr('src', '/manager/images/status/statusRed.png');
    }
    if (bills.auditStatus == 1) {
        $('.rightMap img:eq(1)').attr('src', '/manager/images/audit.png');
    } else {
        $('.rightMap img:eq(1)').attr('src', '/manager/images/auditNo.png');
    }
    loadBillsStatusByIsDraftOp()
}

function loadBillsStatusByIsDraftOp(){
    var billsCodeWrap = $('#billsCodeWrap');
    var button = $("#topForm :button");
    var rightMap = $(".rightMap");
    var isDraftOp=!$("#slideThree").is(':checked')
    //是否是草稿单
    if (isDraftOp == true) {
        billsCodeWrap.hide()
        button.show()
        rightMap.hide()
        dataGrid.$grid.setGridParam().showCol("op");
        dataGrid.addKongRow();
        dataGrid.$grid.delRowData(MyEiditGrid.getMaxRowid(dataGrid.$grid));
        dataGrid2.$grid.setGridParam().showCol("op");
        dataGrid2.addKongRow();
        dataGrid2.$grid.delRowData(MyEiditGrid.getMaxRowid(dataGrid2.$grid));
    } else {
        billsCodeWrap.show()
        button.hide()
        rightMap.show()
        dataGrid.$grid.setGridParam().hideCol("op");
        dataGrid.$grid.delRowData('dataGrid_addRowId');
        dataGrid2.$grid.setGridParam().hideCol("op");
        dataGrid2.$grid.delRowData('dataGrid_addRowId');
    }
    dataGrid.$grid.setColProp("storageName", {editable: isDraftOp});
    dataGrid.$grid.setColProp("goodsName", {editable: isDraftOp});
    dataGrid.$grid.setColProp("goodsNumber", {editable: isDraftOp});
    dataGrid.$grid.setColProp("price", {editable: isDraftOp});
    dataGrid2.$grid.setColProp("storageName", {editable: isDraftOp});
    dataGrid2.$grid.setColProp("goodsName", {editable: isDraftOp});
    dataGrid2.$grid.setColProp("goodsNumber", {editable: isDraftOp});
    dataGrid2.$grid.setColProp("price", {editable: isDraftOp});

}

/*************************分页 E******************************/
/*************************功能按钮事件 S******************************/

//打开添加状态
function openAddState(){
    currPayreceiptDetailList = [];
    try {
        $("#topForm").data('bootstrapValidator').resetForm();
    } catch (e) {
    }
    $("#payReceiveAmount").val(0);
    $("#yuFu").val(0);
    $("#yingFu").val(0);
    $("#yuShou").val(0);
    $("#yingShou").val(0);

    dataGrid.$grid.setGridParam({cellEdit:true});
    dataGrid2.$grid.setGridParam({cellEdit:true});
    dataGrid6.$grid.setGridParam({cellEdit:true});
    dataGrid2.$grid.showCol("stockCount");
    //一些代码
    dataGrid.clearDataGrid();dataGrid.addKongRow();
    dataGrid2.clearDataGrid();dataGrid2.addKongRow();
    dataGrid6.clearDataGrid();dataGrid6.addKongRow();
    //草稿单据修改
    $("#topForm :button").show();
    Summary();Summary2();
    Summary6();
    getDefaultValues()
}

//获取默认值
function getDefaultValues(){
    var obj={
        success:function(data){
            $('#topForm input[name="sectionName"]').val(data.data.defaultSection.name)
            $('#topForm input[name="sectionId"]').val(data.data.defaultSection.sectionId)
            $('#topForm input[name="managerName"]').val(data.data.defaultEmployee.name).data('id',data.data.defaultEmployee.employeeId)
            $('#topForm input[name="managerId"]').val(data.data.defaultEmployee.employeeId)
            var defaultStorage=data.data.defaultStorage||{}
            var ids=$('#dataGrid').getDataIDs();
            $.each(ids,function(index,rowid){
                $('#dataGrid').jqGrid("setCell",rowid,"storageName",defaultStorage.name);
                $('#dataGrid').jqGrid("setCell",rowid,"storageId",defaultStorage.storageId);
            })
        }
    }
    InterfaceInventory.common.getDefaultValues(obj);
}

//保存按钮点击事件
function saveBtClick(){
    try {MyEiditGrid.currEditDataGrid.unAllEdit();} catch (e) {}
    if($("input[name='managerName']").val()==""){
        $.MsgBox('提示', '经办人不能为空');
        return;
    }
    //表单验证
    $("#topForm").data('bootstrapValidator').resetForm();
    $("#topForm").data('bootstrapValidator').validate();
    if(!($('#topForm').data('bootstrapValidator').isValid())){
        refreshValidator();
        return ;
    }

    var model = getPageData();
    //判断是否是正式表保存
    if($("#slideThree").is(':checked')){
        var inDetailList=[];
        for(var i=0;i<model.inDetailList.length;i++){
            var detailItem=model.inDetailList[i];
            inDetailList.push({
                "id": detailItem.id,
                "remark":detailItem.remark,
            })
        }
        var outDetailList=[];
        for(var i=0;i<model.outDetailList.length;i++){
            var detailItem=model.outDetailList[i];
            outDetailList.push({
                "id": detailItem.id,
                "remark":detailItem.remark,
            })
        }
        var dataParam={
            "billsId": model.id,
            "billsType":billsType,
            "remark": model.remark,
            "inDetailList": inDetailList,
            "outDetailList": outDetailList,
        }
        $.ajaxPackage({
            contentType:'application/json',
            url:'/manager/inventory/purchase/updateRemark',
            data:JSON.stringify(dataParam),
            success:function(data){
                $.zxsaas_plus.showalert('success', '单据备注保存成功');
                queryPage();
            }
        })
        return false;
    }
    if(model.inDetailList.length == 0){$.MsgBox('操作提示','换入明细为空');return;}
    if(model.outDetailList.length == 0){$.MsgBox('操作提示','换出明细为空');return;}

     if(Number($("#middleForm input[name='weiFuAmount']").val())<0){
         $.MsgBox('操作提示',$('#weiFuShouLable').html()+'不能小于0');
         return;
     }
    var allImeis = getAllImei(model.inDetailList);
    for (var int = 0; int < model.inDetailList.length; int++) {
        var ddetail = model.inDetailList[int];

        //验证串号是否重复
        if($.trim(ddetail.imeiList) != ''){
            for (var int2 = 0; int2 < ddetail.imeiList.length; int2++) {
                var instrorageImListItem=ddetail.imeiList[int2]
                if(checkImeiIsRepeat(allImeis,instrorageImListItem.imei,ddetail.goodsName) || checkImeiIsRepeat(allImeis,instrorageImListItem.auxiliaryImei,ddetail.goodsName)){
                    return;
                }
            }
        }

        //验证数量和单据是否为0
        if(ddetail.goodsNumber == 0){
            $.MsgBox('校验提示', '换入明细里面 数量不能为0');
            return;
        }
        if(!$.notEmpty(ddetail.goodsId) || ddetail.goodsId == '0'){
            $.zxsaas_plus.showalert('提示','换入明细里面第'+(int+1)+'行商品未选择');
            return;
        }
        if(!$.notEmpty(ddetail.storageId) || ddetail.storageId=='0'){
            $.zxsaas_plus.showalert('提示','换入明细里面第'+(int+1)+'行仓库未选择');
            return;
        }
    }
    //验证明细数据的合法性
    for (var int = 0; int < model.outDetailList.length; int++) {
        var ddetail = model.outDetailList[int];
        //验证现库存是否大于等于数量
        if($.parseInt(ddetail.stockCount) < ddetail.goodsNumber){
            $.MsgBox('保存提示', '换出明细里面换出数量不能大于现库存量');return;
        }
        //验证数量和单据是否为0
        if(ddetail.goodsNumber == 0 ){
            $.MsgBox('校验提示', '换出明细里面 数量不能为0');
            return;
        }
        if(!$.notEmpty(ddetail.goodsId) || ddetail.goodsId == '0'){
            $.zxsaas_plus.showalert('提示','换出明细里面第'+(int+1)+'行商品未选择');
            return;
        }
        if(!$.notEmpty(ddetail.storageId) || ddetail.storageId=='0'){
            $.zxsaas_plus.showalert('提示','换出明细里面第'+(int+1)+'行仓库未选择');
            return;
        }
    }
    //换入
    var inDetailList=[];
    for(var i=0;i<model.inDetailList.length;i++){
        var detailItem=model.inDetailList[i];
        var imeiList=[];
        detailItem.imeiList=$.trim(detailItem.imeiList)==''?[]:detailItem.imeiList
        for(var j=0;j<detailItem.imeiList.length;j++){
            imeiList.push({
                imei:detailItem.imeiList[j].imei,
                auxiliaryImei:detailItem.imeiList[j].auxiliaryImei,
                remark:detailItem.imeiList[j].remark,
            })
        }
        var detailItem=model.inDetailList[i];
        inDetailList.push({
            "storageId": detailItem.storageId,
            "goodsId": detailItem.goodsId,
            "goodsNumber": detailItem.goodsNumber,
            "price": detailItem.price,
            "amount": detailItem.amount,
            "discountRate": detailItem.discountRate,
            "discountAmount": detailItem.discountAmount,
            "discountedAmount": detailItem.discountedAmount,
            "taxRate": detailItem.taxRate,//商品税率
            "taxAmount": detailItem.taxAmount,//税额
            "includingTaxPrice":$.parseFloat(Number(detailItem.includingTaxPrice)),
            "includingTaxAmount": $.parseFloat(Number(detailItem.includingTaxAmount)),
            "remark":detailItem.remark,
            "imeiList": imeiList
        })
    }
    //换出
    var outDetailList=[];
    for(var i=0;i<model.outDetailList.length;i++){
        var detailItem=model.outDetailList[i];
        var imeiList=[];
        detailItem.imeiList=$.trim(detailItem.imeiList)==''?[]:detailItem.imeiList
        for(var j=0;j<detailItem.imeiList.length;j++){
            imeiList.push({
                imeiId:detailItem.imeiList[j].imeiId,
                remark:detailItem.imeiList[j].remark,
            })
        }
        outDetailList.push({
            "storageId": detailItem.storageId,
            "goodsId": detailItem.goodsId,
            "goodsNumber": detailItem.goodsNumber,
            "price": detailItem.price,
            "amount": detailItem.amount,
            "discountRate": detailItem.discountRate,
            "discountAmount": detailItem.discountAmount,
            "discountedAmount": detailItem.discountedAmount,
            "taxRate": detailItem.taxRate,//商品税率
            "taxAmount": detailItem.taxAmount,//税额
            "includingTaxPrice":$.parseFloat(Number(detailItem.includingTaxPrice)),
            "includingTaxAmount": $.parseFloat(Number(detailItem.includingTaxAmount)),
            "remark":detailItem.remark,
            "imeiList":imeiList
        })
    }
    var paymentReceivedOrderVo={
        'detailList':[]
    }
    for(var i=0;i<model.paymentReceivedOrderVo.length;i++){
        var paymentReceivedItem=model.paymentReceivedOrderVo[i]
        if(paymentReceivedItem.amount>0){
            paymentReceivedOrderVo.detailList.push(paymentReceivedItem)
        }
    }
    var dataParam={
        "orderId": model.id,
        "billsDateStr": model.billsDateStr,
        "sectionId": model.sectionId,
        "contactUnitId": model.contactUnitId,
        "managerId": model.managerId,
        "remark": model.remark,
        "billsAmount": model.billsAmount,
        "discountAmount": model.discountAmount,
        "discountedAmount": model.discountedAmount,
        "payReceiveAmount": model.payReceiveAmount,
        "paymentReceivedOrderVo": paymentReceivedOrderVo,
        "inDetailList": inDetailList,
        "outDetailList": outDetailList,
    }
    var url='/manager/inventory/purchase/exchange/saveDraftOrder/auth_add'
    if($.trim(dataParam.orderId)!=''){
        url='/manager/inventory/purchase/exchange/saveDraftOrder/auth_update'
    }
    var flag=false;
    for (var int = 0; int < model.inDetailList.length; int++) {
        if ($.parseFloat(model.inDetailList[int].price) == 0) {
            flag = true
        }
    }
    for (var int = 0; int < model.outDetailList.length; int++) {
        if ($.parseFloat(model.outDetailList[int].price) == 0) {
            flag = true
        }
    }
    //验证串号
	$.ajaxPackage({
		url:'/manager/inventory/purchase/validatePurchaseExchange',
		data:{order:JSON.stringify(dataParam)},
		success:function(data){
			if(data.result == 1){
                if(data.data.validateResult == 'Error'){
					$.zxsaas_plus.showalert("操作提示",data.data.message);
                } else if(data.data.validateResult == 'Confirm'){
                    $.MsgBox("操作提示",data.data.message,function(){
                        if(flag==true){
                            $.zxsaas_plus.showconfirm('提示','单据中存在价格为0的商品，是否确认保存',function () {
                                todo()
                            },function () {
                                return;
                            })
                        }else{
                            todo()
                        }
                    },function(){});
                }else if(data.data.validateResult == 'Success'){
                    if(flag==true){
                        $.zxsaas_plus.showconfirm('提示','单据中存在价格为0的商品，是否确认保存',function () {
                            todo()
                        },function () {
                            return;
                        })
                    }else{
                        todo()
                    }
                }
            }
		}
	})
    function todo() {
        var queryKey='';
        for(var i=0;i<model.inDetailList.length;i++){
            var detailItem=model.inDetailList[i];
            if($.isArray(detailItem.imeiList)){
                for(var j=0;j<detailItem.imeiList.length;j++){
                    var itemItem = detailItem.imeiList[j];
                    var itemStr = itemItem.imei;
                    if ($.trim(itemItem.auxiliaryImei) != '') {
                        itemStr += ',' + itemItem.auxiliaryImei;
                    }
                    queryKey += itemStr+';'
                }
            }
        }
        if(queryKey!=''){
            queryKey=queryKey.substr(0,queryKey.length-1);
            $.validateImeiExisting({
                queryKey:queryKey,
                menuCode:$('#AUTH').data('code'),
                sectionId: $("#topForm input[name='sectionId']").val(),
                save:saveDraft
            })
        }else{
            saveDraft()
        }
	}

	function saveDraft() {
        $.ajaxPackage({
            url:url,
            data:{order:JSON.stringify(dataParam)},
            success:function (data) {
                $.zxsaas_plus.showalert('success', '保存成功');
                $("#topForm input[name='id']").val(data.data.orderId);
                queryPage();
            }
        })
    }
}

//验证串号是否存在
function checkImeiIsRepeat(allImeis,imei,goodsName){
    var checkNum = 0;
    if($.trim(imei) == '')return false;
    for (var i = 0; i < allImeis.length; i++) {
        if($.trim(allImeis[i].imei) == $.trim(imei) || $.trim(allImeis[i].auxiliaryImei) == $.trim(imei)){
            checkNum++;
        }
        if(checkNum > 1){
            $.MsgBox('明细串号校验提示','商品['+ goodsName +']的串号:'+$.trim(imei)+'存在重复');
            return true;
        }
    }
    return false;
}

//遍历明细获取串号列表
function getAllImei(inDetailList){
    var imeis = [];
    for (var int = 0; int < inDetailList.length; int++) {
        if($.trim(inDetailList[int].imeiList) != ''){
            for (var int2 = 0; int2 < inDetailList[int].imeiList.length; int2++) {
                imeis.push({imei:inDetailList[int].imeiList[int2].imei,auxiliaryImei:inDetailList[int].imeiList[int2].auxiliaryImei});
            }
        }
    }
    return imeis;
}
//获取页面数据
function getPageData(){
    //表单
    var formObj = $(".gridTop").toJsonObject();
    formObj.billsDateStr=$("input[name='billsDateStr']").val()
    $.extend(formObj,$(".gridBottom").toJsonObject());

    //入库数量明细
    formObj.inDetailList = dataGrid.getGridDataList();

    //出库数量明细
    formObj.outDetailList = dataGrid2.getGridDataList();

    //预付款明细
    formObj.paymentReceivedOrderVo = dataGrid6.getGridDataList();

    delete formObj["storageId"];

    //验证数据，提交保存
    //添加一些代码
    //code......
    var footerRow = $("#dataGrid").footerData("get");
    var footerRow2 = $("#dataGrid2").footerData("get");
    formObj.billsAmount =  parseFloat(parseFloat(footerRow.includingTaxAmount.replace(/\,/g, "")) - parseFloat(footerRow2.includingTaxAmount.replace(/\,/g, ""))).toFixed(2);
    formObj.discountAmount = parseFloat($("input[name='discountAmount']").val().replace(/\,/g, "")).toFixed(2);
    formObj.discountedAmount =  parseFloat($.parseFloat(footerRow.discountedAmount) - $.parseFloat(footerRow2.discountedAmount)).toFixed(2);
    formObj.payReceiveAmount = $.parseFloat($("#payReceiveAmount").val()).toFixed(2);  //付款|收款总金额
    if(formObj.discountedAmount < 0){
        formObj.discountedAmount = formObj.discountedAmount * -1
    }
    return formObj;
}

//删除按钮点击事件
function delBtClick(){

    $.MsgBox('删除提示','确定要删除此单据!',function(){del()},function(){});
    function del(){
        var topFormObj = $(".gridTop").toJsonObject();
        if(topFormObj.id != ""){
            $.ajaxPackage({
                url:'/manager/inventory/purchase/delivery/deleteDraftOrder',
                data:{billsId:topFormObj.id},
                success:function(){
                    $.zxsaas_plus.showalert('success' ,"删除成功！");
                    setTimeout(function(){
                        location.href =location.href.substring(0,location.href.indexOf('?'));
                    },1500)
                }
            })
        }else{
            $.MsgBox("消息提示","删除单据不存在!");
        }
    }
}

//过账按钮点击事件
function checkBtClick(){
    if(checkIsEidited()){
        $.MsgBox("操作提示","当前单据未保存，继续操作前请先保存");return;
    }
    var flag=false;
    for (var int = 0; int < initData.inDetailList.length; int++) {
        if ($.parseFloat(initData.inDetailList[int].price) == 0) {
            flag = true
        }
    }
    for (var int = 0; int < initData.outDetailList.length; int++) {
        if ($.parseFloat(initData.outDetailList[int].price) == 0) {
            flag = true
        }
    }

	//验证串号
    var topFormObj = $(".gridTop").toJsonObject();
	if(topFormObj.id != "") {
		$.ajaxPackage({
			url: '/manager/inventory/purchase/validatePurchaseExchangePost',
			data:{billsId: topFormObj.id},
			success: function (data) {
				if (data.result == 1) {
					if (data.data.validateResult == 'Error') {
						$.zxsaas_plus.showalert("操作提示", data.data.message);
					} else if (data.data.validateResult == 'Confirm') {
                        $.MsgBox("操作提示", data.data.message, function () {
							if (flag == true) {
								$.zxsaas_plus.showconfirm('提示', '单据中存在价格为0的商品，是否确认过账', function () {
									todo()
								}, function () {
									return;
								})
							} else {
								todo()
							}
						}, function () {
						});
					} else if (data.data.validateResult == 'Success') {
						if (flag == true) {
							$.zxsaas_plus.showconfirm('提示', '单据中存在价格为0的商品，是否确认过账', function () {
								todo()
							}, function () {
								return;
							})
						} else {
							todo()
						}
					}
				}
			}
		})
	}else{
		$.MsgBox("消息提示","过账单据不存在!");
	}

    function todo(){
        $.ajaxPackage({
            url:'/manager/inventory/purchase/exchange/executePostOrder',
			data:{billsId: topFormObj.id},
            success:function(data){
                zhishi(data.data.order)
                setTimeout(function () {
                    $.zxsaas_plus.showalert('success', "过账成功");
                }, 40)
            }
        })
    }
}
function zhishi(order) {
    $("#slideThree").prop('checked',true)
    $("#topForm input[name='id']").val(order.orderId)
    queryPage();
}

//红冲按钮点击事件FORCE_FINISH
function forceFinishBtClick(){
    if(checkIsEidited()){
        $.MsgBox("操作提示","当前单据未保存，继续操作前请先保存");return;
    }
    var dateInputDIV = $(
        '<div class="form-horizontal"><div class="form-group">' +
        '<label for="firstname" class="col-sm-5 control-label">红冲日期:</label>' +
        '<div class="col-sm-7" style="padding-left: 0px;">' +
        '<div class="input-group">' +
        '<input type="text" class="form-control" name="hcDate" readonly>' +
        '</div></div>' +
        '</div></div>'
    )
    var dateInput = dateInputDIV.find("input[name='hcDate']");
    dateInput.val($("input[name='billsDateStr']").val());

    dateInput.datetimepicker({
        lang:"ch",           //语言选择中文
        format:"Y-m-d",      //格式化日期
        minDate:$('input[name="billsDateStr"]').val(),
        timepicker:false,    //关闭时间选项
        todayButton:false,    //关闭选择今天按钮
        maxDate:_authList.maxDate,
        minDate:$("input[name='billsDateStr']").val(),
    });

    BootstrapDialog.show({
        title: '单据红冲',
        message: dateInputDIV,
        size:BootstrapDialog.SIZE_SMALL,
        buttons: [{label: '确定', cssClass: 'btn-primary',action: function(dialogItself) {dialogItself.close();todo();}},
            {label: '取消',action: function(dialogItself){dialogItself.close();}
            }]
    });

    function todo(){
        var topFormObj = $(".gridTop").toJsonObject();
        if(topFormObj.id != ""){
            $.ajaxPackage({
                url:'/manager/inventory/purchase/exchange/executeRedOrder',
                data:{billsId: topFormObj.id, redDateStr: dateInput.val()},
                success:function(data){
                    zhishi(data.data.order)
                    queryPage();
                    $.zxsaas_plus.showalert('success', "红冲成功");
                }
            })
        }else{
            $.MsgBox("消息提示","红冲单据不存在!");
        }
    }
}

//复制单据
function copyBtClick(){
    if(checkIsEidited()){
        $.MsgBox("操作提示","当前单据未保存，继续操作前请先保存");return;
    }
    $("#topForm").data('bootstrapValidator').resetForm();
    //置空不能复制的属性
    var kong = {
        billsCode:"",
        id:""
    }
    currPayreceiptDetailList = [];
    $(".gridTop").writeJson2Dom(kong);
    $("#payReceiveAmount").val(0.00);

    //清空换出数据
    var ids=dataGrid2.$grid.getDataIDs();
    $.each(ids,function(i,value){
        dataGrid2.$grid.jqGrid('setCell', value ,"goodsNumber" ,0);
        dataGrid2.$grid.jqGrid('setCell', value ,"imeiList" ," ");
    });
    $("#topForm :button").show();
    dataGrid2.$grid.showCol("stockCount");
    Summary2();
    $("#slideThree").prop('checked',false)
    loadBillsStatusByIsDraftOp()
    reloadMenuBtn()
    $('#bottomForm')[0].reset()
    $.zxsaas_plus.showalert("success", "单据复制成功!");
}

/*************************功能按钮事件 E******************************/

//检查页面是否有编辑过
var initData = null;
function checkIsEidited(){
    return initData == null || _.isEqual(initData,getPageData())?false:true;
}
//回车事件
$(document).on('keydown','.searchImei',function(even){
    if(even.keyCode==13){
        //右匹配  最少输入5位数或以上
        if($.trim($('.searchImei').val()) != "" && $("input[name='sectionId']").val() != ""){
            try {MyEiditGrid.currEditDataGrid.unAllEdit();} catch (e) {}
            //查询串号库存
            $.request({
                url: basePath + '/IstockIm/listByModel',
                type : "post",
                dataType : 'json',
                data:{
                    keyWord:$.trim($('.searchImei').val()),
                    storageMode:1
                },
                success:function(data){
                    if(data.result != 1){$.MsgBox('错误提示',data.desc);return;};
                    var obj=data.data.dataList[0];

                    if(data.data.dataList.length == 1){
                        if(obj.goodsStatus==1){
                            $.zxsaas_plus.showalert('提示',$('.searchImei').val()+'串号下的'+obj.goodsName+'商品已禁用')
                        }else{
                            var kkkk = {};
                            kkkk.imei = obj.imei;
                            kkkk.imeiId = obj.imeiId;
                            kkkk.auxiliaryImei = obj.auxiliaryImei;
                            kkkk.storageId = obj.storageId+"";
                            kkkk.storageName2 = obj.storageName;
                            kkkk.taxRate = obj.taxRate;
                            kkkk.stockNum = obj.stockNum;
                            kkkk.goodsId = obj.goodsId+"";
                            kkkk.goodsName2 = obj.goodsName;
                            kkkk.brandName=obj.brandName;
                            kkkk.categoryName=obj.categoryName;
                            kkkk.code=obj.code;
                            kkkk.color=obj.color;
                            kkkk.models=obj.models;
                            imeiUlLiClick(kkkk);
                        }
                    }else if(data.data.dataList.length != 0){
                        var ulHtml = "";
                        for(var i=0;i<data.data.dataList.length;i++){
                            if(data.data.dataList[i].goodsStatus!=1){
                                ulHtml += '<li onclick = "imeiUlLiClick({'+
                                    'imei:\''+data.data.dataList[i].imei+'\','+
                                    'imeiId:\''+data.data.dataList[i].imeiId+'\','+
                                    'auxiliaryImei:\''+data.data.dataList[i].auxiliaryImei+'\','+
                                    'storageId:\''+data.data.dataList[i].storageId+'\','+
                                    'storageName2:\''+data.data.dataList[i].storageName+'\','+
                                    'taxRate:\''+data.data.dataList[i].taxRate+'\','+
                                    'stockNum:\''+data.data.dataList[i].stockNum+'\','+
                                    'goodsId:\''+data.data.dataList[i].goodsId+'\','+
                                    'categoryName:\''+data.data.dataList[i].categoryName+'\','+
                                    'brandName:\''+data.data.dataList[i].brandName+'\','+
                                    'goodsName2:\''+data.data.dataList[i].goodsName+'\','+
                                    'code:\''+data.data.dataList[i].code+'\','+
                                    'color:\''+data.data.dataList[i].color+'\','+
                                    'models:\''+data.data.dataList[i].models+'\''+
                                    '})">'+data.data.dataList[i].imei+'</li>';
                            }
                        }
                        if(ulHtml==""){
                            $.zxsaas_plus.showalert('提示',$('.searchImei').val()+'串号下的所有商品已禁用')
                        }else{
                            $('#imeiUl').html(ulHtml);
                            $('#keyData').modal('show');
                        }

                    }
                    if(data.data.dataList.length == 0){
                        $.zxsaas_plus.showalert('提示','暂无数据');
                    }
                    Summary2()
                    $('.searchImei').val('');
                }
            });
        }
    }
});
//回车多数据选择
$(document).on('click','.imeiKey>li',function(){
    var $this=$(this).text();
    $('.searchImei').val($this);
    $('#keyData').modal('hide');
})

//初始化事件
function initEvents(){
    $(window).resize(wResize);//注册窗口改变事件
    wResize();
    $("input[name='discountAmount']").bind('input propertychange', function() {
        SummaryBiaoJiao();
    });
}

//窗口大小改变
function wResize(){
    var winH = $(window).height();//浏览器高度
    var centerH = winH - 555;//中部高度
    if(centerH < 580){
        centerH = 580;
    }
    $("#dataGrid").setGridHeight(centerH/2 - 88);
    $("#dataGrid2").setGridHeight(centerH/2 - 88);

    $("#dataGrid5").setGridHeight(centerH);
    $("#dataGrid4").setGridHeight(centerH);
    $(".referenceFrame").height(winH - 300);
}

/**********************表格1 开始******************************************/


function initDataGrid(){
    //配置
    var paras = {
        gridId:'dataGrid',
        addRow:{goodsId:'',goodsCode:'',goodsName:'',cxSectionId:'',discountRate:100,stockNum:'',numControlFlag:'',imControlFlag:'',cxNum:'',cxDiscount:'',cxPrice:'',price:'',remark:''},
        colNames:[ '仓库ID','<i class="bitianX">*</i>仓库名称','<i class="bitianX">*</i>商品名称', '<i class="bitianX">*</i>数量','<i class="bitianX">*</i>单价','金额'
          ,'折扣率','折扣金额','折后金额','含税单价', '含税金额','税率','税额', '商品备注'
            ,'商品ID','类别','商品编码','品牌','型号','颜色'
           ,'是否串号管理','是否辅助串号管理','串号列表','串号长度','辅助串号长度','id'],
        colModel:
            [
                {name : 'storageId',width: '200px',index : 'storageId',align:'left',sortable: false,hidden: true},
                {name : 'storageName',width: '200px',sortable: false,index : 'storageName',align:'left',edittype:'custom_bt_input',custom_element_bt_click:"selectStorageReferenceOpen",editable:true},
                {name : 'goodsName',width: '200px',sortable: false,index : 'goodsName',align:'left',edittype:'custom_bt_input',
                    custom_element_bt_click:"selectReferenceOpen",editable:true},
                {name : 'goodsNumber',width: '100px',index : 'goodsNumber',align:'right',editable:false,sortable: false,formatter:'integer',
                    editoptions:{
                        onkeyup:"checkInput.clearNoNum(this,10)",
                        dataEvents: [{
                            type: "blur",
                            fn: function(){
                                MyEiditGrid.currEditDataGrid.unAllEdit();
                            }
                        },{
                            type: "focus",
                            fn: function(){
                                this.select()
                            }
                        }]
                    }
                },
                {name : 'price',width: '100px',index : 'price',align:'right',editable:true,editrules:{number:true},formatter:'number',sortable: false,
                    editoptions:{
                        onkeyup:"checkInput.checkNum(this,12)",
                        dataEvents: [{
                            type: "blur",
                            fn: function(){
                                MyEiditGrid.currEditDataGrid.unAllEdit();
                            }
                        },{
                            type: "focus",
                            fn: function(){
                                this.select()
                            }
                        }
                        ]
                    }
                },
                {name : 'amount',width: '100px',index : 'amount',align:'right',editable:false,editrules:{number:true},formatter:'number',sortable: false},
                {name : 'discountRate',index : 'discountRate',hidden: true,editable:false,editrules:{number:true},formatoptions: {suffix:"%"},formatter:'currency',sortable: false,editoptions:{onkeyup:"checkInput.checkNum(this,5)"}},
                {name : 'discountAmount',index : 'discountAmount',hidden: true,editable:false,sortable: false,formatter:'number'},
                {name : 'discountedAmount',index : 'discountedAmount',hidden: true,editable:false,sortable: false,formatter:'number',editoptions:{onkeyup:"checkInput.checkNum(this,12)"}},
                {name : 'includingTaxPrice',index : 'includingTaxPrice',hidden: true,editable:false,sortable: false,formatter:'number'},
                {name : 'includingTaxAmount',index : 'includingTaxAmount',hidden: true,editable:false,sortable: false,formatter:'number'},
                {name : 'taxRate',index : 'taxRate',hidden: true,editable:false,formatoptions: {suffix:"%"},formatter:'currency',sortable: false,editoptions:{onkeyup:"checkInput.checkNum(this,5)"}},
                {name : 'taxAmount',index : 'taxAmount',hidden: true,editable:false,sortable: false,formatter:'number'},
                {name : 'remark',width: '200px',index : 'remark',hidden: false,editable:true,sortable: false,editoptions:{
                    onkeyup:"checkInput.clearNoText(this,100)",
                    dataEvents: [{
                        type: "blur",
                        fn: function(){
                            MyEiditGrid.currEditDataGrid.unAllEdit();
                        }
                    },{
                        type: "focus",
                        fn: function(){
                            this.select()
                        }
                    }]
                    }
                },

                {name : 'goodsId',index : 'goodsId',align:'left',sortable: false,hidden: true},
                {name : 'categoryName',width: '100px',index : 'categoryName',editable:false,sortable: false},
                {name : 'code',index : 'code',width: '100px',editable:false,sortable:false},

                {name : 'brandName',width: '100px',index : 'brandName',editable:false,sortable: false},
                {name : 'models',width: '100px',index : 'models',editable:false,sortable: false},
                {name : 'color',width: '100px',index : 'color',editable:false,sortable: false},

                       {name : 'ifManageImei',index : 'ifManageImei',hidden: true,editable:true,sortable: false},
                {name : 'ifEnableAuxliaryImei',index : 'ifEnableAuxliaryImei',hidden: true,editable:true,sortable: false},
                {name : 'imeiList',index : 'imeiList',hidden: true,editable:true,sortable: false},
                {name : 'imeiLength',index : 'imeiLength',hidden: true,editable:true,sortable: false,hidden: true},
                {name : 'auxliaryImeiLength',index : 'auxliaryImeiLength',hidden: true,editable:true,sortable: false,hidden: true},
                {name : 'id',hidden: true},
            ]
        ,shrinkToFit: false,
    };
    //回调函数
    var callBackList = {
        onCellSelect:function(rowid,iCol,cellcontent,e){
            var curColName=$(e.target).attr('aria-describedby').replace(paras.gridId+'_','');
            if(curColName == 'goodsNumber'){
                var currRow = $("#dataGrid").jqGrid('getRowData', rowid);

                //判断是否数量录入 并判断是否串号管理
                if((currRow.ifManageImei == "1" || $.trim(currRow.imeiList) != "") && currRow.goodsId != ""){
                    $("#dataGrid").setColProp("goodsNumber",{editable:false});
                    openImeiInputModal("dataGrid",rowid);//打开输入框
                }else{
                    $("#dataGrid").setColProp("goodsNumber",{editable:true});
                }
            }
        },
        afterEditCell:function(rowid,name,val,iRow,iCol){
            lastrow = iRow;
            lastcell = iCol;
        },
        afterSaveCell:function(rowid,name,val,iRow,iCol){},
        summary:function(rowid,name,val,iRow,iCol){//统计处理
            Summary();
        },
        afterInsertRow: function (rowid, rowdata) {
            //这里需要推迟执行，需要先执行表格的进入不可编辑状态
            setTimeout(function () {
                //添加一行之后，需要把上一个行的仓库也带到本行中 , 这里可能是订单引入，订单引入，这里不需要（把上一个行的仓库也带到本行中）；
                if (rowid > 0) {
                    var prevRowData = dataGrid.$grid.jqGrid('getRowData', rowid - 1);
                    var curRowData = dataGrid.$grid.jqGrid('getRowData', rowid);
                    if (prevRowData.storageId != "" && curRowData.storageId == "") {
                        dataGrid.$grid.jqGrid('setCell', rowid, 'storageId', prevRowData.storageId);
                        dataGrid.$grid.jqGrid('setCell', rowid, 'storageName', prevRowData.storageName);
                    }
                }
            }, 0)


        },
        getGridDataList:function(rows){
            //筛出不合格行
            return $.map(rows,function(row){
//				if($.notEmpty(row.storageId) && $.notEmpty(row.goodsId) && row.goodsId != "0" && row.storageId != "0" && row.goodsNumber != 0 ){
                if($.trim(row.imeiList) != ""){
                    row.imeiList = JSON.parse(row.imeiList);
                }
                row.goodsNumber = parseInt(row.goodsNumber) ;
                row.amount = $.parseFloat(row.amount).toFixed(2);
                delete row["imeiLength"];
                delete row["auxliaryImeiLength"];
                return row;
//				}
            });
        }
    };
    dataGrid = new MyEiditGrid(paras,callBackList);

}

//打开商品引用对话框
function selectReferenceOpen(){
    $('#dataGridGood').next().trigger('click')
}
//打开仓库引用对话框
function selectStorageReferenceOpen(cellInfo){
    $('#dataGridStorageName').next().trigger('click')
}

//汇总统计
function Summary(){
    //汇总每一行
    var ids=dataGrid.$grid.getDataIDs();
    $.each(ids,function(i,value){
        var currRow = dataGrid.$grid.jqGrid('getRowData', value);

        var goodsNumber = $.parseInt(currRow.goodsNumber);//数量
        var amount = Number(($.parseFloat(currRow.price)*goodsNumber).toFixed(2)); //金额
        var discountRate = $.parseFloat(currRow.discountRate)/100; //折扣率
        var discountPrice = Number(($.parseFloat(currRow.price)*discountRate).toFixed(2)); //折扣单价
        var discountedAmount = Number((discountPrice * goodsNumber).toFixed(2)); //折后金额

        //税率录入
        var taxRate =  $.parseFloat(currRow.taxRate)/100;//税率
        var includingTaxPrice = Number((discountPrice * taxRate + discountPrice).toFixed(2));//含税单价
        var taxAmount = Number((includingTaxPrice - discountPrice).toFixed(2))*goodsNumber;
        var includingTaxAmount =  Number((Number(discountedAmount * 100)/100 + Number(taxAmount * 100)/100).toFixed(2));

        dataGrid.$grid.jqGrid('setCell', value ,"amount" ,Number((Number(amount * 100)/100).toFixed(2)));
        dataGrid.$grid.jqGrid('setCell', value ,"discountedAmount" ,Number((Number(discountedAmount * 100)/100).toFixed(2)) );
        dataGrid.$grid.jqGrid('setCell', value ,"includingTaxPrice" , Number((Number(includingTaxPrice * 100)/100).toFixed(2)) );
        dataGrid.$grid.jqGrid('setCell', value ,"includingTaxAmount" , Number((Number(includingTaxAmount * 100)/100).toFixed(2)) );
        dataGrid.$grid.jqGrid('setCell', value ,"taxAmount" , Number((Number(taxAmount * 100)/100).toFixed(2) ));
    });

    //汇总
    var sumGoodsNumber = dataGrid.$grid.getCol('goodsNumber', false, 'sum').toFixed(2);
    var sumAmount = dataGrid.$grid.getCol('includingTaxAmount', false, 'sum').toFixed(2);
    var discountedAmount = dataGrid.$grid.getCol('discountedAmount', false, 'sum').toFixed(2);
    var amount = dataGrid.$grid.getCol('amount', false, 'sum').toFixed(2);
    dataGrid.$grid.footerData("set",{index:"合计",goodsNumber:sumGoodsNumber,discountedAmount:discountedAmount,includingTaxAmount:sumAmount,amount:amount});

    SummaryBiaoJiao();
}

/**********************表格1 结束******************************************/

function my_inputxx(value, options) {
    var html =  '<select class="form-control" >'+
        '</select>';
    var em = $(html);
    em.change(function(){
        $("#dataGrid").jqGrid('setCell', options.rowId ,"storageId" ,em.children('option:selected').attr("sid"));
    });
    return em;
}
function my_inputxx2(value, options) {
    var html =  '<select class="form-control" >'+
        '</select>';
    var em = $(html);
    em.change(function(){
        $("#dataGrid2").jqGrid('setCell', options.rowId ,"storageId" ,em.children('option:selected').attr("sid"));
    });
    return em;
}
function my_valuexx(value) {
    return value.val();
}

/**********************表格2 开始******************************************/


function initDataGrid2(){
    //配置
    var paras = {
        gridId:'dataGrid2',
        addRow:{goodsId:'',goodsCode:'',categoryName:'',code:'',goodsName:'',brandName:'',models:'',color:'',discountRate:100,cxSectionId:'',stockNum:'',numControlFlag:'',imControlFlag:'',cxNum:'',cxDiscount:'',cxPrice:'',price:'',remark:''},
        colNames:[ '仓库ID','<i class="bitianX">*</i>仓库名称','<i class="bitianX">*</i>商品名称','现库存数量', '<i class="bitianX">*</i>换出数量',
            '<i class="bitianX">*</i>单价','金额','折扣率','折扣金额','折后金额','含税单价',
            '含税金额','税率','税额', '商品备注','商品ID','类别','商品编码','品牌','型号','颜色','是否串号管理','是否辅助串号管理','串号列表','id'],
        colModel:
            [
                {name : 'storageId',index : 'storageId',align:'left',sortable: false,hidden: true},
                {name : 'storageName2',  width: '200px',sortable: false,index : 'storageName2',align:'left',edittype:'custom_bt_input',custom_element_bt_click:"selectStorageReferenceOpen2",editable:true},
                {name : 'goodsName2',  width: '200px',sortable: false,index : 'goodsName2',align:'left',edittype:'custom_bt_input',custom_element_bt_click:"selectReferenceOpen2",editable:true},
                {name : 'stockCount',  width: '100px',index : 'stockCount',align:'right',hidden: false,editable:false,sortable: false,formatter:'integer'},
                {name : 'goodsNumber',  width: '100px',index : 'goodsNumber',align:'right',editable:true,sortable: false,formatter:'integer',editoptions:{
                    onkeyup:"checkInput.clearNoNum(this,10)",
                    dataEvents: [{
                        type: "focus",
                        fn: function(){
                            this.select()
                        }
                    },{
                        type: "blur",
                        fn: function(){
                            MyEiditGrid.currEditDataGrid.unAllEdit();
                        }
                    }]
                }
                },
                {name : 'price',  width: '100px',index : 'price',align:'right',editable:true,editrules:{number:true},formatter:'number',sortable: false,editoptions:{
                    onkeyup:"checkInput.checkNum(this,12)",
                    dataEvents: [{
                        type: "blur",
                        fn: function(){
                            MyEiditGrid.currEditDataGrid.unAllEdit();
                        }
                    },{
                        type: "focus",
                        fn: function(){
                            this.select()
                        }
                    }
                    ]
                }
                },
                {name : 'amount',  width: '100px',index : 'amount',align:'right',editable:false,editrules:{number:true},formatter:'number',sortable: false},

                {name : 'discountRate',index : 'discountRate',hidden: true,editable:false,formatoptions: {suffix:"%"},formatter:'currency',sortable: false,editoptions:{onkeyup:"checkInput.checkNum(this,5)"}},
                {name : 'discountAmount',index : 'discountAmount',hidden: true,editable:false,sortable: false,formatter:'number'},
                {name : 'discountedAmount',index : 'discountedAmount',hidden: true,editable:false,sortable: false,formatter:'number',editoptions:{onkeyup:"checkInput.checkNum(this,12)"}},
                {name : 'includingTaxPrice',index : 'includingTaxPrice',hidden: true,editable:false,sortable: false,formatter:'number'},
                {name : 'includingTaxAmount',index : 'includingTaxAmount',hidden: true,editable:false,sortable: false,formatter:'number'},
                {name : 'taxRate',index : 'taxRate',hidden: true,editable:false,formatoptions: {suffix:"%"},formatter:'currency',sortable: false,editoptions:{onkeyup:"checkInput.checkNum(this,5)"}},
                {name : 'taxAmount',index : 'taxAmount',hidden: true,editable:false,sortable: false,formatter:'number'},

                {name : 'remark',  width: '200px',index : 'remark',hidden: false,editable:true,sortable: false
                    ,editoptions:{
                    onkeyup:"checkInput.clearNoText(this,100)",
                    dataEvents: [{
                        type: "blur",
                        fn: function(){
                            MyEiditGrid.currEditDataGrid.unAllEdit();
                        }
                    },{
                        type: "focus",
                        fn: function(){
                            this.select()
                        }
                    }
                    ]
                    }
                },
                {name : 'goodsId',index : 'goodsId',align:'left',sortable: false,hidden: true},
                {name : 'categoryName',  width: '100px',index : 'categoryName',editable:false,sortable: false},
                {name : 'code',  width: '100px',index : 'code',editable:false,sortable:false},
                      {name : 'brandName',  width: '100px',index : 'brandName',editable:false,sortable: false},
                {name : 'models',  width: '100px',index : 'models',editable:false,sortable: false},
                {name : 'color',  width: '100px',index : 'color',editable:false,sortable: false},

                {name : 'ifManageImei',index : 'ifManageImei',hidden: true,editable:true,sortable: false},
                {name : 'ifEnableAuxliaryImei',index : 'ifEnableAuxliaryImei',hidden: true,editable:true,sortable: false},
                {name : 'imeiList',index : 'imeiList',hidden: true,editable:true,sortable: false},
                {name : 'id',hidden: true},
            ]
        ,shrinkToFit: false,
    };
    //回调函数
    var callBackList = {
        onCellSelect:function(rowid,iCol,cellcontent,e){
            var curColName=$(e.target).attr('aria-describedby').replace(paras.gridId+'_','');
            if(curColName == 'goodsNumber'){
                try {MyEiditGrid.currEditDataGrid.unAllEdit();} catch (e) {}
                var currRow = $("#dataGrid2").jqGrid('getRowData', rowid);
                if(currRow.storageName2 == "" || currRow.goodsName2 == ""){
                    $.MsgBox("操作提示","请先选择仓库和商品");
                    $("#dataGrid2").setColProp("goodsNumber",{editable:false});
                    return false;
                }
                if((currRow.ifManageImei == "1" || $.trim(currRow.imeiList) != "") && currRow.goodsId != ""){
                    $("#dataGrid2").setColProp("goodsNumber",{editable:false});
                    openInputImeiModal("dataGrid2",rowid);
                }else{
                    $("#dataGrid2").setColProp("goodsNumber",{editable:true});
                }
            }
        },
        afterEditCell:function(rowid,name,val,iRow,iCol){
            lastrow2 = iRow;
            lastcell2 = iCol;
        },
        afterSaveCell:function(rowid,name,val,iRow,iCol){
            var currRow = $("#dataGrid2").jqGrid('getRowData', rowid);
            if(name == 'goodsNumber' && currRow.ifManageImei == false && currRow.storageName2 != "" && currRow.goodsName2 != ""){
                if($.parseInt(val) > $.parseInt(currRow.stockCount)){
                    //输入数量小于现库存
                    $.MsgBox('错误提示','出库数量不能大于现库存');
                    $("#"+paras.gridId).jqGrid('setCell', rowid ,"goodsNumber" ,currRow.stockCount);
                }
            }
        },
        summary:function(rowid,name,val,iRow,iCol){//统计处理
            Summary2();
        },
        afterInsertRow: function (rowid, rowdata) {
            //这里需要推迟执行，需要先执行表格的进入不可编辑状态
            setTimeout(function () {
                //添加一行之后，需要把上一个行的仓库也带到本行中 , 这里可能是订单引入，订单引入，这里不需要（把上一个行的仓库也带到本行中）；
                if (rowid > 1) {
                    var prevRowData = dataGrid2.$grid.jqGrid('getRowData', rowid - 1);
                    var curRowData = dataGrid2.$grid.jqGrid('getRowData', rowid);
                    if (prevRowData.storageId != "" && curRowData.storageId == "") {
                        dataGrid2.$grid.jqGrid('setCell', rowid, 'storageId', prevRowData.storageId);
                        dataGrid2.$grid.jqGrid('setCell', rowid, 'storageName2', prevRowData.storageName2);
                    }
                }
            }, 0)


        },
        getGridDataList:function(rows){
            //筛出不合格行
            return $.map(rows,function(row){
//				if($.notEmpty(row.goodsId,row.storageId) && row.goodsId != "0" && row.storageId != "0" && row.goodsNumber != 0 ){
                if($.notEmpty(row.imeiList)){
                    row.imeiList = JSON.parse(row.imeiList);
                }
                row.goodsNumber = parseInt(row.goodsNumber) ;
                row.amount = $.parseFloat(row.amount).toFixed(2);
                delete row["op"];
                delete row["index"];
                delete row["goodsName2"];
                delete row["storageName2"];
                delete row["ifEnableAuxliaryImei"];
                delete row["ifManageImei"];
                delete row["ifEnableAuxliaryImei"];
                return row;
//				}
            });
        }
    };
    dataGrid2 = new MyEiditGrid(paras,callBackList);

}

//汇总统计
function Summary2(){
    //汇总每一行
    var ids=dataGrid2.$grid.getDataIDs();
    $.each(ids,function(i,value){
        var currRow = dataGrid2.$grid.jqGrid('getRowData', value);

        var goodsNumber = $.parseInt(currRow.goodsNumber);//数量
        var amount = Number(($.parseFloat(currRow.price)*goodsNumber).toFixed(2)); //金额
        var discountRate = $.parseFloat(currRow.discountRate)/100; //折扣率
        var discountPrice = Number(($.parseFloat(currRow.price)*discountRate).toFixed(2)); //折扣单价
        var discountedAmount = Number((discountPrice * goodsNumber).toFixed(2)); //折后金额

        //税率录入
        var taxRate =  $.parseFloat(currRow.taxRate)/100;//税率
        var includingTaxPrice = Number((discountPrice * taxRate + discountPrice).toFixed(2));//含税单价
        var taxAmount = Number((includingTaxPrice - discountPrice).toFixed(2))* goodsNumber;

        var includingTaxAmount =  Number((Number(discountedAmount * 100)/100 + Number(taxAmount * 100)/100).toFixed(2));

        dataGrid2.$grid.jqGrid('setCell', value ,"amount" ,Number((Number(amount * 100)/100).toFixed(2)));
        dataGrid2.$grid.jqGrid('setCell', value ,"discountedAmount" ,Number((Number(discountedAmount * 100)/100).toFixed(2)) );
        dataGrid2.$grid.jqGrid('setCell', value ,"includingTaxPrice" , Number((Number(includingTaxPrice * 100)/100).toFixed(2)) );
        dataGrid2.$grid.jqGrid('setCell', value ,"includingTaxAmount" , Number((Number(includingTaxAmount * 100)/100 ).toFixed(2)));
        dataGrid2.$grid.jqGrid('setCell', value ,"taxAmount" , Number((Number(taxAmount * 100)/100).toFixed(2)) );


        //是否 为 串号商品
        if(currRow.ifManageImei==true){
            dataGrid2.$grid.jqGrid('setCell', value, "goodsNumber", '', 'ifManageImeiIcon');
        } else {
            //jqgrid 找不到移除 calss 的方法。这里只能外界操作dom 的方式
            $("#dataGrid2 #" + value + " td[aria-describedby='dataGrid2_goodsNumber']").removeClass('ifManageImeiIcon')
        }
    });

    //汇总
    var sumGoodsNumber = dataGrid2.$grid.getCol('goodsNumber', false, 'sum').toFixed(2);
    var sumAmount = dataGrid2.$grid.getCol('includingTaxAmount', false, 'sum').toFixed(2);
    var discountedAmount = dataGrid2.$grid.getCol('discountedAmount', false, 'sum').toFixed(2);
    var amount = dataGrid2.$grid.getCol('amount', false, 'sum').toFixed(2);
    dataGrid2.$grid.footerData("set",{index:"合计",goodsNumber:sumGoodsNumber,discountedAmount:discountedAmount,includingTaxAmount:sumAmount,amount:amount});

    SummaryBiaoJiao();

}

//表角金额统计
function SummaryBiaoJiao(){
    try {
        //计算退换总金额
        var footerRow = dataGrid.$grid.footerData("get");
        var footerRow2 = dataGrid2.$grid.footerData("get");

        //已红冲的单据
        if($(".gridTop").toJsonObject().billsCode.indexOf("_R") > 0){
            var includingTaxAmount = $.parseFloat(footerRow.includingTaxAmount) * (-1) - $.parseFloat(footerRow2.includingTaxAmount) * (-1);

            checkIsPayWayHcdj();

            var payReceiveAmount = $.parseFloat($("#payReceiveAmount").val())* (-1);
            var discountAmount =  $.parseFloat($("input[name='discountAmount']").val())* (-1);
            if(isNaN(discountAmount)){
                discountAmount = 0;
                //$("input[name='discountAmount']").val(0);
            }

            if(includingTaxAmount < 0){
                includingTaxAmount = includingTaxAmount * -1;
            }

            var yingFuAmount = includingTaxAmount;
            var weiFuAmount = includingTaxAmount - discountAmount - payReceiveAmount;

            $("input[name='yingFuAmount']").val(yingFuAmount.toFixed(2)*(-1));
            $("input[name='weiFuAmount']").val(weiFuAmount.toFixed(2)*(-1));
        }else{
            var includingTaxAmount = $.parseFloat(footerRow.includingTaxAmount) - $.parseFloat(footerRow2.includingTaxAmount);
            checkIsPayWay();
            if(includingTaxAmount < 0)includingTaxAmount = includingTaxAmount * -1;

            var payReceiveAmount = $.parseFloat($("#payReceiveAmount").val());
            var discountAmount =  $.parseFloat($("input[name='discountAmount']").val());
            if(isNaN(discountAmount)){
                discountAmount = 0;
            }
            var yingFuAmount = includingTaxAmount;
            var weiFuAmount = includingTaxAmount - discountAmount - payReceiveAmount;
            $("input[name='yingFuAmount']").val(yingFuAmount.toFixed(2));
            $("input[name='weiFuAmount']").val(weiFuAmount.toFixed(2));
        }
    } catch (e) {
        // TODO: handle exception
    }
}


//打开引用对话框
function selectReferenceOpen2(){
    var sectionId= $.trim($('#topForm  input[name="sectionId"]').val())
    if(sectionId===''){
        $.zxsaas_plus.showalert("提示", "请选择部门名称!");
        return
    }
    var selRowId = $("#dataGrid2").jqGrid('getGridParam','selrow');
    var selRowData = $("#dataGrid2").jqGrid('getRowData', selRowId);
    if(selRowData.storageId==''){
        $.zxsaas_plus.showalert("提示", "请选择仓库名称!");
        return
    }

    $('#dataGrid2Good').comModalsOutStoreGoods('setOption',{
        'girdParam':{
            'queryKey':"",
            'typeId':"",
            'sectionId':sectionId,
            'storageIds':selRowData.storageId,
            'menuCode':$('#AUTH').data('code'),
        }
    })
    $('#dataGrid2Good').next().trigger('click')
}

//打开仓库引用对话框
function selectStorageReferenceOpen2(){
    $('#dataGrid2StorageName').next().trigger('click')
}

//打开串号录入
function openImeiInputModal(gridId,rowid){
    try {MyEiditGrid.currEditDataGrid.unAllEdit();} catch (e) {}
    var currRow = $("#dataGrid").jqGrid('getRowData', rowid);
    var imeiList = [];
    var currAuxliaryImeiLength = '';
    //获取已录入的串号
    if ($.trim(currRow.imeiList) != "") {
        imeiList = JSON.parse(currRow.imeiList);
    }
    if (currRow.ifEnableAuxliaryImei == true) {
        currAuxliaryImeiLength = currRow.auxliaryImeiLength;//辅助串号长度
    }
    imeiInputObj.setOption({
        imeiList: imeiList,
        goodsName: currRow.goodsName,
        goodsID: currRow.goodsId,
        currImeiLength: currRow.imeiLength.trim(), // 默认当前的串号长度
        currAuxliaryImeiLength: currAuxliaryImeiLength.trim(),   // 默认当前的辅助串号长度
        isEnableAuxliaryImei: currRow.ifEnableAuxliaryImei == true ? true : false,   // true:辅助串号， false :没有辅助串号
        isEdit: !$("#slideThree").is(':checked'),
        appenRowCallback: appenRowCallback,
        saveImeiInputCallback: saveImeiInputCallback,
        exportImeiInputCallback: exportImeiInputCallback
    });
    imeiInputObj.reLoadDom();
    imeiInputObj.showModal();
    $("#dataGridRowId").val(gridId + "|" + rowid);
}
//获取表格详细数据
function getImeiList() {
    var imiData=getPageData();
    var imeiDataList=imiData.inDetailList;
    var imeiListDetailRow=[];
    if(imeiDataList!=undefined&&imeiDataList.length>0){
        for(var i=0;i<imeiDataList.length;i++){
            if($.isArray(imeiDataList[i].imeiList)){
                var imeiDataListDetail=imeiDataList[i].imeiList
                if(imeiDataListDetail.length>0){
                    var sdha=[]
                    for(var j=0;j<imeiDataListDetail.length;j++){
                        sdha.push(imeiDataListDetail[j])
                    }
                    imeiListDetailRow.push(sdha)
                }
            }else{
                imeiListDetailRow.push('')
            }
        }
    }
    return imeiListDetailRow;
}
//串号录入: 追加一行
function appenRowCallback(imei1, imei2) {
    //由于删除是 实时的，这里必须实时获取表格数据
    var imeiList=getImeiList();
    for (var i = 0; i < imeiList.length; i++) {
        for (var j = 0; j < imeiList[i].length; j++) {
            var item=imeiList[i][j];
            if(imei1!='' && (imei1 == item.imei || imei1 == item.auxiliaryImei) ){
                var desc= '本单据表体第' + (i + 1) + '行第' + (j + 1) + '列已录入过此串号:' + imei1;
                $.zxsaas_plus.showalert('warning',desc);
                return false;
            }
            if(imei2!='' && (imei2 == item.imei || imei2 == item.auxiliaryImei) ){
                var desc= '本单据表体第' + (i + 1) + '行第' + (j + 1) + '列已录入过此串号:' + imei2;
                $.zxsaas_plus.showalert('warning',desc);
                return false;
            }
        }
    }
    return true;
}
//串号录入: 点击 确定
function saveImeiInputCallback(objs) {
    try {MyEiditGrid.currEditDataGrid.unAllEdit();} catch (e) {}
    var rowid = parseInt($("#dataGridRowId").val().split("|")[1]);
    var gridId = $("#dataGridRowId").val().split("|")[0];
    $("#"+gridId).jqGrid('setCell', rowid ,"imeiList" ,JSON.stringify(objs));
    $("#"+gridId).jqGrid('setCell', rowid ,"goodsNumber" ,objs.length);
    Summary();
    Summary2();
}
//串号录入: 导入
function exportImeiInputCallback(exportArr) {
    var reLuru = '';
    var reLuruArr = [];
    var result = -1;
    //判断是否是引入的，如果是需要判断不能超过未引入量
    var imeiList=getImeiList()
    if (imeiList != [] && imeiList.length > 0 && result == -1) {
        for (var i = 0; i < imeiList.length; i++) {
            for (var j = 0; j < imeiList[i].length; j++) {
                for (var k = 0; k < exportArr.length; k++) {
                    var item = exportArr[k];
                    var toval = item.trim();
                    var tovalArr = toval.split(',');
                    var flag = 1;
                    for (var m = 0; m < tovalArr.length; m++) {
                        var tovalItem = tovalArr[m];
                        if ($.trim(imeiList[i][j].imei).toUpperCase() == tovalItem || $.trim(imeiList[i][j].auxiliaryImei).toUpperCase() == tovalItem) {
                            flag = 0;
                            break;
                        }
                    }
                    if (flag == 0) {
                        reLuru += '串号:[' + toval + ']在本单据表体第' + (i + 1) + '行第' + (j + 1) + '列已录入!\n';
                        result = 0;
                        reLuruArr.push(toval);
                    }
                }
            }
        }
    }
    return {
        result: result,
        reLuru: reLuru,
        reLuruArr: reLuruArr,
    };
}

/**********************表格1 结束******************************************/


/**********************串号引入表格 开始******************************************/
//打开串号引入对话框
function openInputImeiModal(gridId,rowid){
    try {MyEiditGrid.currEditDataGrid.unAllEdit();} catch (e) {}
    $('#inputStorageImeiModal').modal('show');
    $("#dataGridRowId2").val(gridId+"|"+rowid);

    var currRow = $("#"+gridId).jqGrid('getRowData', rowid);
    $("#goodsnameTitle2").html(currRow.goodsName2);
    $("#storagenameTitle2").html(currRow.storageName2);


    setDataGrid4();
    setDataGrid5();

    var width = $(window).width()*0.8;

    $("#inputStorageImeiModal_grid4").width((width-300)/2);
    $("#inputStorageImeiModal_grid5").width((width-300)/2);

    $("#dataGrid5").setGridWidth((width-300)/2);
    $("#dataGrid5").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });
    $("#dataGrid4").setGridWidth((width-300)/2);
    $("#dataGrid4").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });

    $("#dataGrid5").setGridHeight(300);
    $("#dataGrid4").setGridHeight(300);
    $("#inputStorageImeiModal_info_text").height(300);

    longInfo = 0;
    $("#inputStorageImeiModal_info_text").val("");
}

//点击保存引入串号事件
function saveInputImei(){
    if($("#slideThree").is(':checked'))return;
    if($('#havedInputNum').html() == "0"){
        return;
    }
    try {MyEiditGrid.currEditDataGrid.unAllEdit();} catch (e) {}
    var gridId = $("#dataGridRowId2").val().split("|")[0] ;
    var rowid = parseInt($("#dataGridRowId2").val().split("|")[1]) ;
    var objs = getObjListFromGrid5();

    $("#"+gridId).jqGrid('setCell', rowid ,"goodsNumber" ,objs.length);
    $("#"+gridId).jqGrid('setCell', rowid ,"imeiList" ,JSON.stringify(objs));

    $('#inputStorageImeiModal').modal('hide');
    Summary();
    Summary2();

}

//获取串号引入对象数组
function getObjListFromGrid5(){
    return dataGrid5.getGridDataList();
}

var longInfo = 0;
//移入所有按钮点击事件
function inAllBtClick(){
    if($("#slideThree").is(':checked'))return;
    var ids=$.map( $("#dataGrid4").jqGrid('getDataIDs'), function(obj){return parseInt(obj);});
    for ( var int = 0; int < ids.length; int++) {
        var row =  $("#dataGrid4").jqGrid('getRowData', ids[int] );
        if(! _.isEqual(row,{})){
            longInfo = longInfo + 1;
            $("#dataGrid5").jqGrid('addRowData',MyEiditGrid.getMaxRowid($("#dataGrid5"))+1,row);
            $("#dataGrid4").jqGrid("delRowData", ids[int] );
            $("#inputStorageImeiModal_info_text").val($("#inputStorageImeiModal_info_text").val()+(longInfo)+"、串号"+row.imei+"录入\r\n");
        }
    }
    $("#havedInputNum").html($("#dataGrid5").jqGrid('getDataIDs').length);
}

//移出所有按钮点击事件
function outAllBtClick(){
    if($("#slideThree").is(':checked'))return;
    var ids=$.map( $("#dataGrid5").jqGrid('getDataIDs'), function(obj){return parseInt(obj);});
    for ( var int = 0; int < ids.length; int++) {
        var row =  $("#dataGrid5").jqGrid('getRowData',  ids[int] );
        if(! _.isEqual(row,{})){
            longInfo = longInfo + 1;
            $("#dataGrid4").jqGrid('addRowData',MyEiditGrid.getMaxRowid($("#dataGrid4"))+1,row);
            $("#dataGrid5").jqGrid("delRowData", ids[int] );
            $("#inputStorageImeiModal_info_text").val($("#inputStorageImeiModal_info_text").val()+(longInfo)+"、串号"+row.imei+"移除\r\n");
        }
    }
    $("#havedInputNum").html($("#dataGrid5").jqGrid('getDataIDs').length);
}

//移入按钮点击事件
function inBtClick(){
    if($("#slideThree").is(':checked'))return;
    var ids=$.map( $("#dataGrid4").jqGrid('getGridParam','selarrrow'), function(obj){return parseInt(obj);});
    for ( var int = 0; int < ids.length; int++) {
        var row =  $("#dataGrid4").jqGrid('getRowData', ids[int] );
        if(! _.isEqual(row,{})){
            $("#dataGrid5").jqGrid('addRowData',MyEiditGrid.getMaxRowid($("#dataGrid5"))+1,row);
            $("#dataGrid4").jqGrid("delRowData", ids[int] );
        }
    }
    $("#havedInputNum").html($("#dataGrid5").jqGrid('getDataIDs').length);
}

//移出按钮点击事件
function outBtClick(){
    if($("#slideThree").is(':checked'))return;
    var ids=$.map( $("#dataGrid5").jqGrid('getGridParam','selarrrow'), function(obj){return parseInt(obj);});
    for ( var int = 0; int < ids.length; int++) {
        var row =  $("#dataGrid5").jqGrid('getRowData',  ids[int] );
        if(! _.isEqual(row,{})){
            $("#dataGrid4").jqGrid('addRowData',MyEiditGrid.getMaxRowid($("#dataGrid4"))+1,row);
            $("#dataGrid5").jqGrid("delRowData", ids[int] );
        }
    }
    $("#havedInputNum").html($("#dataGrid5").jqGrid('getDataIDs').length);
}

//初始化表格
var dataGrid4 = null;
function initDataGrid4(){
    var paras = {
        gridId:'dataGrid4',
        addRow:{imei:'',auxiliaryImei:'',remark:''},
        multiselect : true,
        noShowOp:false,
        colNames:['imeiId','串号',  '成本', '辅助串号'],
        colModel:
            [
                {name : 'imeiId',hidden: true},
                {name : 'imei',index : 'imei',align:'left',sortable: true,hidden: false,editable:false},
                {name : 'costPrice',index : 'costPrice',align:'left',editable:false,hidden: true,sortable: false},
                {name : 'auxiliaryImei',index : 'auxiliaryImei',align:'left',sortable: false}
            ]
    };
    var callBackList = {
        afterEditCell:function(rowid,name,val,iRow,iCol){},
        afterSaveCell:function(rowid,name,val,iRow,iCol){},
        summary:function(rowid,name,val,iRow,iCol){},
        getGridDataList:function(rows){
            //筛出不合格行
            return $.map(rows,function(row){
                if(row.imei != ""){
                    return row;
                }
            });
        }
    };
    dataGrid4 = new MyEiditGrid(paras,callBackList);
}

//去库存表查询串号
function setDataGrid4(){
    //清空
    $("#dataGrid4").jqGrid('clearGridData');
    var gridId = $("#dataGridRowId2").val().split("|")[0] ;
    var rowid = parseInt($("#dataGridRowId2").val().split("|")[1]) ;
    var currRow = $("#"+gridId).jqGrid('getRowData', rowid);

    //查询串号库存
    $.request({
        url: this.basePath + '/IstockIm/listByModel',
        type : "post",
        dataType : 'json',
        data:{storageId:currRow.storageId,goodsId:currRow.goodsId},
        success:function(data){
            if(data.result == 1){
                $.each(data.data.dataList,function(i,item){
                    if(!isHaveInput(item.imei)){
                        $("#dataGrid4").jqGrid('addRowData',i,item);
                    }
                });
                $("#"+gridId).jqGrid('setCell', rowid ,"stockCount" ,data.data.dataList.length);
            }else{
                $.MsgBox('出错提示',data.desc);
            }
        }
    });
    function isHaveInput(imei){
        if("" != $.trim(currRow.imeiList)){
            var imList = JSON.parse(currRow.imeiList);
            for ( var int = 0; int < imList.length; int++) {
                if(imList[int].imei == imei){
                    return true;
                }
            }
        }
        return false;
    }

}
//初始化表格
var dataGrid5 = null;
function initDataGrid5(){

    var paras = {
        gridId:'dataGrid5',
        addRow:{imei:'',auxiliaryImei:'',remark:''},
        multiselect : true,
        noShowOp:false,
        colNames:['imeiId','串号',  '辅助串号', '备注' ,'成本'],
        colModel:
            [
                {name : 'imeiId',hidden: true},
                {name : 'imei',index : 'imei',align:'left',sortable: true,hidden: false,editable:false},
                {name : 'auxiliaryImei',index : 'auxiliaryImei',align:'left',sortable: false},
                {name : 'remark',index : 'remark',align:'left',editable:true,sortable: false},
                {name : 'costPrice',index : 'costPrice',align:'left',editable:false,sortable: false,hidden: true}
            ]
    };
    var callBackList = {
        afterEditCell:function(rowid,name,val,iRow,iCol){},
        afterSaveCell:function(rowid,name,val,iRow,iCol){},
        summary:function(rowid,name,val,iRow,iCol){},
        getGridDataList:function(rows){
            //筛出不合格行
            return $.map(rows,function(row){
                delete row["costPrice"];
                delete row["index"];
                return row;
            });
        }
    };
    dataGrid5 = new MyEiditGrid(paras,callBackList);

}

function setDataGrid5(){
    //清空
    $("#dataGrid5").jqGrid('clearGridData');
    var gridId = $("#dataGridRowId2").val().split("|")[0] ;
    var rowid = parseInt($("#dataGridRowId2").val().split("|")[1]) ;
    var currRow = $("#"+gridId).jqGrid('getRowData', rowid);
    if("" != $.trim(currRow.imeiList)){
        var imList = JSON.parse(currRow.imeiList);
        $("#havedInputNum").html(imList.length);
        $.each(imList,function(i,obj){
            $("#dataGrid5").jqGrid('addRowData',i,obj);
        });
    }else{
        $("#havedInputNum").html(0);
    }

}

/**********************串号引入表格 结束******************************************/


/**********************收付款 开始******************************************/

//切换部门，联动查询收付款账户信息
var currPayreceiptDetailList = [];
function onSectionChange(sectionId,isShow){
    //判断部门是否切换
    $.request({
        url: this.basePath + '/account/findSectionKsyAccount',
        type : "post",
        dataType : 'json',
        data:{'sectionId':sectionId},
        success:function(data){
            var result = data.data;
            if(data.result != 1){$('#payrecetiptDetailModal').modal('hide');$.MsgBox('错误提示',data.desc);return;};
            if(data.data.dataList.length == 0){
                $('#payrecetiptDetailModal').modal('hide');
                if(isShow===1){
                    $.MsgBox('错误提示', '此部门未设置资金账户');
                }

                return;
            };
            //处理表格、
            dataGrid6.$grid.jqGrid('clearGridData');
            for ( var int = 0; int < data.data.dataList.length; int++) {
                if(data.data.dataList[int].status!=1&&data.data.dataList[int].status!=2){
                    var row = data.data.dataList[int];
                    row.accountType = row.accounTypeName;
                    row.accountId = row.id;
                    row.accountName = row.name;
                    getAmount(row);
                    //插入空数据的1行
                    dataGrid6.$grid.jqGrid('addRowData',MyEiditGrid.getMaxRowid(dataGrid6.$grid)+1,row);
                }
            }
            Summary6();
            function getAmount(row){
                for ( var int2 = 0; int2 < currPayreceiptDetailList.length; int2++) {
                    if(currPayreceiptDetailList[int2].accountId == row.id){
                        row.amount = currPayreceiptDetailList[int2].amount;
                    }
                }
            }
            initData = getPageData();//记录初始数据
        }
    });

}

function checkIsPayWayHcdj(){
    //计算退换总金额
    var footerRow = dataGrid.$grid.footerData("get");
    var footerRow2 = dataGrid2.$grid.footerData("get");

    var subAmount = parseFloat(footerRow.includingTaxAmount.replace(/\,/g, ""))*(-1) - parseFloat(footerRow2.includingTaxAmount.replace(/\,/g, ""))*(-1);
    if(subAmount>0){
        //付款
        $("#payrecetiptDetailModalTitle").html("付款方式");

        $("#yingFuShouLable").html("应付金额");
        $("#weiFuShouLable").html("未付金额");
    }else{
        //收款
        $("#payrecetiptDetailModalTitle").html("收款方式");

        $("#yingFuShouLable").html("应收金额");
        $("#weiFuShouLable").html("未收金额");
    }

}


function checkIsPayWay(){
    //计算退换总金额
    var footerRow = dataGrid.$grid.footerData("get");
    var footerRow2 = dataGrid2.$grid.footerData("get");

    var subAmount = parseFloat(footerRow.includingTaxAmount.replace(/\,/g, "")) - parseFloat(footerRow2.includingTaxAmount.replace(/\,/g, ""));
    if(subAmount>0){
        //付款
        $("#payrecetiptDetailModalTitle").html("付款方式");
        gL_RATIOG = -1;
        $("#yingFuShouLable").html("应付金额");
        $("#weiFuShouLable").html("未付金额");
    }else{
        //收款
        $("#payrecetiptDetailModalTitle").html("收款方式");
        gL_RATIOG = 1;
        $("#yingFuShouLable").html("应收金额");
        $("#weiFuShouLable").html("未收金额");
    }

}

//打开收付款明细录入
function openPayrecetiptDetailModal(){
    if($("input[name='sectionId']").val() == ""){$.MsgBox("操作提示","请选择部门");return;};
    $('#payrecetiptDetailModal').modal('show');
    onSectionChange($("input[name='sectionId']").val(),1);
    $("#dataGrid6").setGridWidth(567);
    $("#dataGrid6").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });
    try {MyEiditGrid.currEditDataGrid.unAllEdit();} catch (e) {}
}

//初始化表格
var dataGrid6 = null;
function initDataGrid6(){

    //配置
    var paras = {
        gridId:'dataGrid6',
        noShowOp:false,
        noShowAdd:true,
        addRow:{accountType:'',accountId:'',accountName:'',remark:''},
        colNames:['付款类别',  '账户ID', '账户名称', '付款金额'],
        colModel:
            [
                {name : 'accountType',sortable: false,index : 'accountType',align:'left',editable:false },
                {name : 'accountId',index : 'accountId',align:'left',sortable: false,hidden: true},
                {name : 'accountName',index : 'accountName',align:'left',editable:false,sortable: false},
                {name : 'amount',index : 'amount',align:'left',editable:true,sortable: false,formatter:'number',formatter:'number',editoptions:{onkeyup:"checkInput.checkNum(this,12)"}}
            ]
    };
    //回调函数
    var callBackList = {
        afterEditCell:function(rowid,name,val,iRow,iCol){//开始编辑
        },
        afterSaveCell:function(rowid,name,val,iRow,iCol){//保存编辑
        },
        summary:function(rowid,name,val,iRow,iCol){//统计处理
            Summary6();
        },
        getGridDataList:function(rows){
            //筛出不合格行
            return $.map(rows,function(row){
                if($.notEmpty(row.accountType,row.amount,row.accountName)){
                    delete row["accountName"];
                    delete row["accountType"];
                    row.amount = $.parseFloat(row.amount);
                    return row;
                }
            });
        }
    };
    dataGrid6 = new MyEiditGrid(paras,callBackList);

}

//点击保存明细事件
function savePayreceiptAmout(){
    if($("#slideThree").is(':checked'))return;
    try {MyEiditGrid.currEditDataGrid.unAllEdit();} catch (e) {}
    //汇总总金额
    var footerRow = $("#dataGrid6").footerData("get");
    $("#payReceiveAmount").val(footerRow.amount);
    $('#payrecetiptDetailModal').modal('hide');
    currPayreceiptDetailList = dataGrid6.getGridDataList();

    SummaryBiaoJiao();
}

//汇总统计
function Summary6(){
    //名称
    var sumAmount = $("#dataGrid6").getCol('amount', false, 'sum');
    $("#dataGrid6").footerData("set",{index:"合计",amount:sumAmount});
}
////////////////////////////////

var gL_RATIOG = 1;

//点击保存明细事件
function savePayreceiptAmout(){

    //汇总总金额
    var footerRow = $("#dataGrid6").footerData("get");
    $("#payReceiveAmount").val(footerRow.amount);
    currPayreceiptDetailList = dataGrid6.getGridDataList();
    $('#payrecetiptDetailModal').modal('hide');

    SummaryBiaoJiao();
}

//汇总统计
function Summary6(){
    //名称
    var sumAmount = $("#dataGrid6").getCol('amount', false, 'sum');
    $("#dataGrid6").footerData("set",{index:"合计",amount:sumAmount});
}

/**********************收付款 结束******************************************/
/**********************串号搜索 开始******************************************/

function imeiUlLiClick(obj){
    var queryModel = {goodsId:obj.goodsId,storageId:obj.storageId};
    var imeiModel = {
        imeiId:obj.imeiId,
        imei:obj.imei,auxiliaryImei:obj.auxiliaryImei};

    obj.ifManageImei = 1;

    $(".searchImei").focus();
    $('.none-cx').hide();
    if(!dataGrid2.isCanEdit())return;
    if(!dataGrid2.isExistRow(queryModel)){

        obj.imeiList = JSON.stringify([imeiModel])
        obj.goodsNumber = 1;
        obj.discountRate = 100;
        obj.stockCount = obj.stockNum;
        dataGrid2.addRowData(MyEiditGrid.getMaxRowid($("#dataGrid2"))+1,obj);
        Summary2();
    }else{
        var row = dataGrid2.getRowByModel(queryModel);
        var imeiList = $.trim(row.imeiList) == ""?[]:JSON.parse(row.imeiList);
        for ( var int = 0; int < imeiList.length; int++) {
            if(imeiList[int].imei == imeiModel.imei){
                $.MsgBox("消息提示","串号已经引入");
                return ;
            }
        }
        imeiList.push(imeiModel);
        $("#"+row.gridId).jqGrid('setCell', row.rowId ,"imeiList" ,JSON.stringify(imeiList));
        $("#"+row.gridId).jqGrid('setCell', row.rowId ,"goodsNumber" ,(parseInt(row.goodsNumber) + 1));
        Summary2();
    }
    dataGrid2.clearRowByPara({storageId:'',goodsId:''});
}
/**********************串号搜索 结束******************************************/

//往来单位余额
function initWLDWamount(id){
    var obj={
        data:{
            contactUnitId:id,
        },
        success:function (data) {
            var amount = data.data.contactUnitAmountVo;
            $("#yingFu").val(amount.shouldPayBalance.toFixed(2));
            $("#yuFu").val(amount.prePayBalance.toFixed(2));
            initData = getPageData();
        }
    }
    InterfaceInventory.common.getContactUnitAmountVo(obj)
}

//串号导入
function imeiDr(opt){
    var def = {
        gridConfig: {
            colNames: ['id','商品id','仓库id','仓库名称','部门名称','商品类别', '操作', '串号', '辅助串号', '商品编码', '商品名称','商品品牌','型号','颜色', '备注','库存量','是否串号管理','税率','串号列表','引入订单表id','是否启用辅串'],
            colModel: [
                {name: 'imeiId', index: 'imeiId', width: 1, hidden: true},
                {name: 'goodsId', index: 'goodsId', width: 1, align: 'center', sorttype: "string", hidden: true},
                {name: 'storageId', index: 'storageId', width: 1, hidden: true},
                {name: 'storageName', index: 'storageName', width: 1, hidden: true},
                {name: 'sectionName', index: 'sectionName', width: 1, hidden: true},
                {name: 'categoryName', index: 'categoryName', width: 1, hidden: true},
                {name: 'del', index: 'del', width:50,align: 'center', sortable: false,
                    formatter:function(cellvalue, options, rowObject){
                        return '<a class="btn" onclick="imeiDelRow('+ rowObject.imeiId +')"><i class="glyphicon glyphicon-trash"></i></a>'
                    },
                },
                {name: 'imei', index: 'imei', width: 140, align: 'left', sorttype: "string", sortable: false},
                {name: 'auxiliaryImei', index: 'auxiliaryImei', width: 140, align: 'left', sorttype: 'string', sortable: false},
                {name: 'code',index: 'code',width: 100, align: 'left', sorttype: 'string', sortable: false},
                {name: 'name',index: 'name',width: 200, align: 'left', sorttype: 'string', sortable: false},
                {name: 'brandName', index: 'brandName', width: 1, hidden: true},
                {name: 'models', index: 'models', width: 1, hidden: true},
                {name: 'color', index: 'color', width: 1, hidden: true},
                {name: 'remark', index: 'remark', width: 200, align: 'left', sortable: false},
                {name: 'stockCount', index: 'stockCount', width: 1, hidden: true},
                {name: 'ifManageImei', index: 'ifManageImei', width: 1, hidden: true},
                {name: 'taxRate', index: 'taxRate', width: 1, hidden: true},
                {name: 'salesOutstrorageImDraftList',index : 'salesOutstrorageImDraftList',sortable: false,hidden:true},
                {name : 'orderDetailId',index : 'orderDetailId',sortable: false,hidden:true},
                {name : 'ifEnableAuxiliaryImei',index : 'ifEnableAuxiliaryImei',sortable: false,hidden:true}
            ],
        }
    };
    opt = $.extend({}, def, opt);
    $(document.body).append(
        '<div id="imeiDr-modal" class="modal" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static" >'+
        '<div class="modal-dialog modal-lg" role="document">'+
        '<div class="modal-content">'+
        '<div class="modal-header">'+
        '<button type="button" data-dismiss="modal" class="close"><span aria-hidden="true">&times;</span></button>'+
        '<h4 class="modal-title imeiDr_title">串号导入</h4>'+
        '</div>'+
        '<div class="modal-body">'+
        '<div class="col-md-12">'+
        '<div class="row">'+
        '<div class="col-md-8" style="padding-left:0">EXCEL粘贴</div>'+
        '<div class="col-md-4" style="padding-left:0;padding-right: 0;">错误提示</div>'+
        '</div>'+
        '<div class="row">'+
        '<div class="col-md-8" style="padding-left:0">'+
        '<textarea class="form-control imeiDr_vone" style="height: 80px;resize:none;" placeholder="一行一串号，若双串号则主辅串任一即可出库。例：\n A88888888888888 \n 869999999999999"></textarea>'+
        '<div style="height: 40px;line-height: 40px;padding-top: 10px;">'+
        '<button type="button" class="btn imeiDr_import" style="padding: 6px 25px;background: #fff;border: 1px solid #ccc;margin-right: 20px;">导入</button>' +
        '<button type="button" class="btn imeiDr_clear" style="padding: 6px 25px;background: #fff;border: 1px solid #ccc;">清空</button>' +
        '</div>'+
        '</div>'+
        '<div class="col-md-4" style="padding-left:0;padding-right: 0;">'+
        '<textarea class="form-control imeiDr_vtwo" style="height: 120px;resize:none" ></textarea>'+
        '</div>'+
        '</div>'+
        '<div class="row" style="height: 40px;line-height: 55px;">已录入串号<font class="imeiDr_num">0</font>个</div>'+
        '<div class="row" style="margin-top:8px;">'+
        '<table id="imeiDrGrid" class="zxsaastable"></table>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '<div class="modal-footer">'+
        '<button type="button" class="btn btn-primary imeiDr_sure">确认</button>'+
        '<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'
    );
    $("#imeiDrGrid").jqGrid({
//        url: "/manager/component/imei/validateOutStockImei",
        mtype: "post",
        styleUI : 'Bootstrap',
        datatype: "json",
        jsonReader: {
            root: "data.dataList",
            total: "data.total",
            records: "data.records",
            repeatitems: false
        },
        colNames: opt.gridConfig.colNames,
        colModel: opt.gridConfig.colModel,
        sortable: false,
        rownumbers: true,	//显示行号
        rowNum: 9999,
        viewrecords: true,
        width: '100%',
        height: 300,
        autowidth: true,
        multiselect: false,
        rownumWidth: 50,
        shrinkToFit: false,
        gridComplete: function () {
            $("#imeiDrGrid").setLabel(0, '序号')
        }
    });
    $('.imeiDr_import,.imeiDr_clear').hover(function(){
        $(this).css('border','1px solid #0099FF');
    },function(){
        $(this).css('border','1px solid #ccc');
    })

    $('.imeiDr_clear').click(function(){
        $('.imeiDr_vone').val('');
        $('.imeiDr_vtwo').val('');
        $(".imeiDr_vone").trigger('keydown');
    })

    $(".imeiDr_vone").setTextareaCount({
        width: "30px",
        bgColor: "#f2f2f2",
        color: "red",
        display: "block"
    }).parent().css('width','100%');
}
