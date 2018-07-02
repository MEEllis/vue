var billsDao = new Bills(basePath);
//初始化表格
var dataGrid = null;
var lastrow = null,lastcell = null;
$(function(){
    init()
    //初始化
    function init(){
        initUI();//初始化UI
        initDataGrid();//初始化表格
        initDataGrid4();//在库串号表
        initDataGrid5();//引入串号表
        initDataGrid6();//付款表
        initEvents();//初始化事件
        initStorageSelect();
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
        initFilter()
        initTable()
        initImeiImport()
    }
    // 初始化 顶部表单
    function initTopForm(){
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
                $("input[name='managersUid']").val("");
                $("input[name='managersName']").val("");
                $('#payrecetiptAmount').val(0);
                dataGrid6.$grid.jqGrid('clearGridData');
                dataGrid.clearDataGrid();
                dataGrid.addKongRow();
                currPayreceiptDetailList = [];
                onSectionChange(id)

            }
        });
        //经办人
        $("#topForm input[name='managersName']").comModalsEmployeeBySection({
            sectionIds:'input[name="sectionId"]',
            clickback:function () {
                var obj= $("#topForm input[name='managersName']");
                //设置编辑器值
                $("input[name='managersName']").val(obj.val());
                $("input[name='managersUid']").val(obj.data('id'));
            }
        })
        //往来单位
        $("#topForm input[name='contactsunitName']").comModalsContactUnit({
            clickback:function () {
                var obj= $("#topForm input[name='contactsunitName']");
                //设置编辑器值
                $("input[name='contactsunitName']").val(obj.val());
                $("input[name='contactsunitId']").val(obj.data('id'));
                //切换往来单位余额
                initWLDWamount(obj.data('id'));
            }
        })
    }
    // 初始化 过滤
    function initFilter() {
        //部门
        $("#sectionIdListStr").storePlu({
            isStoreShow:false,
            isLoadDefaultName:0,
            checkMore: true,
            search: false,
            ifStore: false, // 控制部门选项
            changeStore:function(){
                var id=$("#sectionIdListStr").data('sectionId');
                //设置编辑器值
                $("input[name='sectionIdListStr']").val(id);
            }
        });
        //往来单位
        $("#contactsunitIdListStr").comModalsContactUnit({
            multiselect:true,
            clickback:function () {
                var id=$("#contactsunitIdListStr").data('id');
                //设置编辑器值
                $("input[name='contactsunitIdListStr']").val(id);
            }
        })
        //商品名称
        $("#goodsNameIdListStr").comModalsAllGoods({
            multiselect:false,
            inStockMethod:1,
            clickback:function(goodsList){
                var id=$("#goodsNameIdListStr").data('id');
                //设置编辑器值
                $("input[name='goodsNameIdListStr']").val(id);
            }
        })
    }
    // 初始化表格
    function initTable(){
        //商品名称
        $("#dataGridGood").comModalsOutStoreGoods({
            clickback:function(goodsList){
                if(goodsList.length>0){
                    $("#dataGrid").jqGrid('saveCell',lastrow,lastcell);
                    var selRowId = $("#dataGrid").jqGrid('getGridParam','selrow');
                    var selRowData=  $("#dataGrid").jqGrid("getRowData",selRowId);

                    var cIndex
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
                            'ifManageImei': goods.ifManageImei==1?'true':'false',
                            'ifEnableAuxliaryImei':(goods.ifEnableAuxiliaryImei == 1 ?'true':'false'),
                            'imeiList': " ",
                            'currStorageNumber':goods.stockCount,
                            'goodsNumber':0,
                            "storageName":selRowData.storageName,
                            "storageId":selRowData.storageId,
                        }
                        if(i==0){
                            $("#dataGrid").jqGrid('setRowData', selRowId, dataRow, {});
                            cIndex=selRowId;
                        }else{
                            cIndex=MyEiditGrid.getMaxRowid($("#dataGrid")) + 1;
                            $("#dataGrid").jqGrid('addRowData', cIndex, dataRow);
                        }
                    }
                    checkIfManageImeiIcon()
                    var $grid = dataGrid.$grid;
                    $grid.delRowData('dataGrid_addRowId');
                    dataGrid.addKongRow();
                    $grid.delRowData(MyEiditGrid.getMaxRowid($grid));
                    Summary();
                }
                $("#dataGridGood").removeData();
            }
        })
        // 仓库
        $("#dataGridStorageName").comModalsStorage({
            clickback:function () {
                var $Obj=$("#dataGridStorageName");
                var selRowId=$("#dataGrid").jqGrid('getGridParam','selrow');
                var dataRow = {
                    'code':'',
                    'categoryName':'',
                    'brandName': '',
                    'models':'',
                    'color':'',
                    'goodsId':'',
                    'goodsName':'',
                    'discountRate': 100,
                    'taxRate':  '',
                    'ifManageImei':'false',
                    'ifEnableAuxliaryImei':'false',
                    'imeiList': " ",
                    'goodsNumber':0,
                    'currStorageNumber':0,
                    'storageId':$Obj.data('id'),
                    'storageName':$Obj.val()
                }
                //设置编辑器值
                $("#dataGrid").jqGrid('saveCell',lastrow,lastcell);
                $("#dataGrid").jqGrid('setRowData', selRowId, dataRow, {});
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
            var ids = $('#dataGrid').getDataIDs();
            $.each(ids,function(i,item){
                var row = $('#dataGrid').getRowData(item);
                if(row.currStorageNumber > 0 && row.imeiList !== ""){
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
            var dataIds = $("#dataGrid").getDataIDs();
            var num = dataIds.length;
//	    	临时存储串号作对比
            var t1 = [],t2 = [],t3 = [];
            $.each(dataIds,function(i,index){
                var dataRow = $('#dataGrid').getRowData(index);
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
                var oneId = $('#dataGrid tbody tr').eq(num).attr('id');
                var oneRow = $('#dataGrid').getRowData(oneId);
//				判断第一行是否为空
                if(num == 1 && oneRow.storageName == "" && oneRow.goodsName == ""){
                    var id = $('#dataGrid tbody tr').eq(num).attr('id');
                    var daraRow = $('#dataGrid').getRowData(id);
                    var saleArr = [];
                    var saleList = {
                        imei: row.imei,
                        auxiliaryImei: row.auxiliaryImei,
                        remark: row.remark
                    }
                    var exist = t1.indexOf(row.imei);
                    if(exist == -1){
                        saleArr.push(saleList);
                        $("#dataGrid").setRowData(id,{
                            storageId: row.storageId,
                            storageName: row.sectionName+'-'+row.storageName,
                            categoryName: row.categoryName,
                            code: row.code,
                            goodsName: row.name,
                            brandName: row.brandName,
                            models: row.models,
                            color: row.color,
                            currStorageNumber: row.stockCount,
                            goodsId: row.goodsId,
                            remark: row.remark,
                            ifManageImei: row.ifManageImei,
                            taxRate: row.taxRate,
                            goodsNumber: 1,
                            amount: '0.00',
                            taxAmount: '0.00',
                            taxPrice: "0.00",
                            taxLimit: "0.00",
                            price: "0.00",
                            discountAmount: "0.00",
                            discountedAmount: "0.00",
                            discountRate: "100.00",
                            ifEnableAuxliaryImei: row.ifEnableAuxiliaryImei==1?"true":"false",
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
                        var existRow = $('#dataGrid').getRowData(existId);
                        var opt = JSON.parse(existRow.imeiList);
                        opt.push(saleList);
                        $("#dataGrid").setRowData(existId,{
                            goodsNumber: opt.length,
                            imeiList: JSON.stringify(opt)
                        });
                    }

                }else{
                    var saleArr = [];
                    var saleList = {
                        imei: row.imei,
                        auxiliaryImei: row.auxiliaryImei,
                        remark: row.remark
                    }
                    var exist = t1.indexOf(row.imei);
                    if(exist == -1){
                        dataGrid.addKongRow();
                        num++;
                        var id = $('#dataGrid tbody tr').eq(num).attr('id');
                        var daraRow = $('#dataGrid').getRowData(id);
                        saleArr.push(saleList);
                        $("#dataGrid").setRowData(id,{
                            storageId: row.storageId,
                            storageName: row.sectionName+'-'+row.storageName,
                            categoryName: row.categoryName,
                            code: row.code,
                            goodsName: row.name,
                            brandName: row.brandName,
                            models: row.models,
                            color: row.color,
                            currStorageNumber: row.stockCount,
                            goodsId: row.goodsId,
                            remark: row.remark,
                            ifManageIMei: row.ifManageImei,
                            taxRate: row.taxRate,
                            goodsNumber: 1,
                            amount: '0.00',
                            taxAmount: '0.00',
                            taxPrice: "0.00",
                            taxLimit: "0.00",
                            price: "0.00",
                            discountAmount: "0.00",
                            discountedAmount: "0.00",
                            discountRate: "100.00",
                            ifEnableAuxliaryImei: row.ifEnableAuxiliaryImei==1?"true":"false",
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
                        var existRow = $('#dataGrid').getRowData(existId);
                        if(existRow.imeiList == ""){
                            var opt = [];
                        }else{
                            var opt = JSON.parse(existRow.imeiList);
                        }
                        opt.push(saleList);
                        $("#dataGrid").setRowData(existId,{
                            goodsNumber: opt.length,
                            imeiList: JSON.stringify(opt)
                        });
                    }

                }
            })
            Summary();
        })
    }
});

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


$("input[name='billsDiscount']").blur(function(){
    if($("input[name='billsDiscount']").val()){
        if($("input[name='billsDiscount']").val()<0){
            $("input[name='billsDiscount']").val("")
        }else{
            var billsDiscount=Number($("input[name='billsDiscount']").val()).toFixed(2)
            $("input[name='billsDiscount']").val(billsDiscount)

        }
    }
})

//打印单据
function print(){
    var id = $(".gridTop").toJsonObject().id;
    if(id=="")return;

    var tempKindDIV = $(
        '<fieldset class="fieLeft" id="form3">'+
        '<legend>打印模板类型</legend>'+
        '<div class="">'+
        '<label class="radio-inline"><input type="radio" name="printTempKind" value="showimei" checked>商品明细</label>'+
        '<label class="radio-inline"><input type="radio" name="printTempKind" value="noimei">商品汇总</label>'+
        '</div>'+
        '</fieldset>'
    )

    BootstrapDialog.show({
        title: '单据打印',
        message: tempKindDIV,
        buttons: [{label: '确定', cssClass: 'btn-primary',action: function(dialogItself) {dialogItself.close();todo();}},
            {label: '取消',action: function(dialogItself){dialogItself.close();}
            }]
    });
    function todo(){
        $.printBills(basePath + '/purchase/print/returnedGoods',
            {
                billsId:id,
                isDraftOp:$("#slideThree").is(':checked')?false:true,
                tempKind:tempKindDIV.find("input[name='printTempKind']:checked").val()
            }
        );
    }
}

/*************************分页 S******************************/

var pageIndex = 1;//页码
var pageSize =  1;//页大小
var pageCount = 0;//页码大小
var currPage = null;//当前页数据


var queryDir = "last";
var currAtId = "";

//首页
function firstPage(){
    if(checkIsEidited()){
        $.MsgBox("操作提示","当前单据未保存，继续操作将丢失当前变更数据，是否继续?",function(){
            todo();
        },function(){});return;
    }else{
        todo();
    }
    function todo(){
        queryDir  = "first";
        queryPage();
    }
}
//下一页
function nextPage(){
    if(checkIsEidited()){
        $.MsgBox("操作提示","当前单据未保存，继续操作将丢失当前变更数据，是否继续?",function(){
            todo();
        },function(){});return;
    }else{
        todo();
    }
    function todo(){
        queryDir  = "next";
        queryPage();
    }
}
//上一页
function backPage(){
    if(checkIsEidited()){
        $.MsgBox("操作提示","当前单据未保存，继续操作将丢失当前变更数据，是否继续?",function(){
            todo();
        },function(){});return;
    }else{
        todo();
    }
    function todo(){
        queryDir  = "back";
        queryPage();
    }
}
//末页
function lastPage(){
    if(checkIsEidited()){
        $.MsgBox("操作提示","当前单据未保存，继续操作将丢失当前变更数据，是否继续?",function(){
            todo();
        },function(){});return;
    }else{
        todo();
    }
    function todo(){
        queryDir  = "last";
        queryPage();
    }
}

//分页查询
function queryPage(callbackObj){

    //获取查询参数
    //************
    var model = {};

    model.page = pageIndex;
    model.rows = pageSize;
    model.billsType = "4";



    model.currAtId = $("#topForm input[name='id']").val();
    model.queryDir = queryDir;

    $.extend(model,getQueryData());
	if(billId != ''){
		model.id = billId;
		$("#slideThree").prop('checked',false)
	}
    if(billsCode != ""){
        model.billsCode = billsCode;
        $("#slideThree").prop('checked',true)
    }

    model.isDraftOp = $("#slideThree").is(':checked')?false:true;
    if(model.billsDateBegin != null && model.billsDateBegin != ""){
        model.billsDateBegin = model.billsDateBegin + " 00:00:00";
    }
    if(model.billsDateEnd != null && model.billsDateEnd != ""){
        model.billsDateEnd = model.billsDateEnd + " 23:59:59";
    }

    //后台查询
    $.request({
        url: this.basePath + '/IbillsMain/page/cgth_query',
        type : "post",
        dataType : 'json',
        data:model,
        success:function(data){
            var result = data.data;
            //清楚报表跳转过来定义的数据
            billsCode=''
            billId=''
            if(data.result != 1){$.MsgBox('错误提示', data.desc);return;};
            pageIndex = result.query.pageNumber;
            pageCount = result.total;
            if(result.rows.length>0){
                initPageData(result.rows[0]);
                checkIfManageImeiIcon()
            }else{
                if('back' == queryDir){
                    $.MsgBox('查询提示',"已是最前一页")
                }else if('next' == queryDir){
                    $.MsgBox('查询提示',"已是最后一页")
                }else{
                    $.MsgBox('查询提示',"没有查到数据");clearAllData();
                }
            }
            if(callbackObj){
                callbackObj(data.data)
            }
        }
    });
}

//填充页面页面数据
function initPageData(bills){
    getAuthList(initDealDate);
    $("#topForm").data('bootstrapValidator').resetForm();
    var formObj = bills;
    var outstrorageNumList = bills.outstrorageNumList;
    var payreceiptDetailList = bills.payreceiptDetailList;
    currPayreceiptDetailList = bills.payreceiptDetailList;
    initWLDWamount(bills.contactsunitId);
    //格式化数据
    formObj.billsDate = $.DateFormatFromTimestamp("yyyy-MM-dd",formObj.billsDate);

    //设置表单数据
    $(".gridTop").writeJson2Dom(formObj);
    $("input[name='billsDate']").val(formObj.billsDate);
    $(".gridBottom").writeJson2Dom(formObj);
    $("input[name='billsDiscount']").val(formObj.billsDiscount);

    //设置明细数据
    dataGrid.clearDataGrid();
    for ( var int = 0; int < outstrorageNumList.length; int++) {
        var row = outstrorageNumList[int];
        if(row.outstrorageImList.length>0){
            row.imeiList = JSON.stringify(row.outstrorageImList);
        }
        row.giftFlag = row.giftFlag == 1 ?true:false;
        //插入空数据的1行
        dataGrid.addRowData(int,row);
    }

    //设置收付款明细数据
    dataGrid6.clearDataGrid();$("#payrecetiptAmount").val(0);
    var allAount = 0;
    try {
        for ( var int = 0; int < payreceiptDetailList.length; int++) {
            var row = payreceiptDetailList[int];
            row.accountType = "现金";
            allAount = allAount + row.payreceiptAmout;
            //插入空数据的1行
            dataGrid6.addRowData(int,row);
        }
        $("#payrecetiptAmount").val(allAount.toFixed(2));
    } catch (e) {
    }

    Summary();
    Summary6();
    initData = getPageData();
    $.showBillsStatus("billsStautsImg",bills.billsStatus);
    if($("#slideThree").is(':checked')){

        $(".forceFinish,.print,.copyBills").removeAttr("disabled");
        $(".gridTop input:not(:hidden),.billsDiscount").prop("readonly", true);
        //正式单据修改
        $(".gridTop input[name='remark']").prop("readonly", false);
        $(".delBt,.checkBt,.orderImport,.billsImport").attr({"disabled":"disabled"});

        dataGrid.$grid.setGridParam({cellEdit:false});
        dataGrid6.$grid.setGridParam({cellEdit:false});
        dataGrid.$grid.hideCol("currStorageNumber");
    }
    else{
        //草稿单据修改
        if($(".gridTop").toJsonObject().id != ""){
            $(".gridTop input:not(:hidden),.billsDiscount").not('input[name="billsCode"]').prop("readonly", false);
            $(".gridTop input[name='remark']").prop("readonly", false);
        }else{
            $(".gridTop input:not(:hidden),.billsDiscount").not('input[name="billsCode"]').prop("readonly", false);
        }
        $(".delBt,.checkBt,.orderImport,.billsImport,.copyBills,.print").removeAttr("disabled");;
        $(".forceFinish").attr({"disabled":"disabled"});
        $(".print").attr({"disabled":"disabled"});

        dataGrid.$grid.setGridParam({cellEdit:true});
        dataGrid6.$grid.setGridParam({cellEdit:true});
        dataGrid.$grid.showCol("currStorageNumber");
    }
    $(".gridTop input:not(:hidden)").not('input[name="billsCode"],input[name="remark"],input[name="billsDate"],input[name="billsDiscount"]').prop("readonly", true);
    wResize();
    //已红冲的单据禁用红冲按钮
    if(bills.billsStatus == '7'){
        $(".forceFinish").attr({"disabled":"disabled"});
    }
};

/*************************分页 E******************************/
/*************************功能按钮事件 S******************************/

//新增钮点击事件
function addBtClick(){
    if(checkIsEidited()){
        $.MsgBox("操作提示","当前单据未保存，是否放弃保存",function(){
            location.href =location.href.substring(0,location.href.indexOf('?'));
        },function(){

        });
    }else{
        location.href =location.href.substring(0,location.href.indexOf('?'));
    }
}

//清空数据
function clearAllData(){

    currPayreceiptDetailList = [];
    $("#topForm").data('bootstrapValidator').resetForm();

    //**清理表单（表头和表尾）
    var kong = { billsAmount:0,
        billsDiscount:0,
        yingFuAmount:0,
        weiFuAmount:0,
        billsCode:"",
        billsDate:"",
        contactsunitId:"",
        contactsunitName:"",
        createBy:"",
        id:"",
        invalidBy:"",
        lastupdateBy:"",
        managersName:"",
        managersUid:"",
        postBy:"",
        remark:"",
        sectionId:"",
        sectionName:"",
        companyName:"",
        createByName:"",
        lastupdateByName:"",
        auditorName:"",
        forceFinishName:"",
        postByName:"",
        invalidByName:""
    }
    $(".gridTop").writeJson2Dom(kong);
    $("#middleForm").writeJson2Dom(kong);
    $(".gridBottom").writeJson2Dom(kong);
    $("#payrecetiptAmount").val(0);

    //一些代码
    dataGrid.clearDataGrid();dataGrid.addKongRow();
    dataGrid6.clearDataGrid();dataGrid6.addKongRow();

    pageIndex = 0;pageCount = 0;//新增时 设置当前页为0  以便从第一张开始查询

    Summary();
    Summary6();
    $("#yuFu").val(0);
    $("#yingFu").val(0);
    $("#yuShou").val(0);
    $("#yingShou").val(0);
    initData = getPageData();
    $.showBillsStatus("billsStautsImg","1");

}
//打开添加状态
function openAddState(){

    currPayreceiptDetailList = [];
    try {
        $("#topForm").data('bootstrapValidator').resetForm();
    } catch (e) {
    }
    if($("#slideThree").is(':checked')){
        $("#slideThree").unbind( "change" );
        $("#slideThree").click();
        //草稿切换按钮
        $("#slideThree").on("change", function () {
            onTheSwitchChange();
        })
    }
    //**清理表单（表头和表尾）
    var kong = { billsAmount:0,
        billsDiscount:0,
        yingFuAmount:0,
        weiFuAmount:0,
        billsCode:"",
        billsDate:"",
        contactsunitId:"",
        contactsunitName:"",
        createBy:"",
        id:"",
        invalidBy:"",
        lastupdateBy:"",
        managersName:"",
        managersUid:"",
        postBy:"",
        remark:"",
        sectionId:"",
        sectionName:"",
        companyName:"",
        createByName:"",
        lastupdateByName:"",
        auditorName:"",
        forceFinishName:"",
        postByName:"",
        invalidByName:""
    }
    $(".gridTop").writeJson2Dom(kong);
    $("#middleForm").writeJson2Dom(kong);
    $(".gridBottom").writeJson2Dom(kong);
    $("#payrecetiptAmount").val(0);
    $("#yuFu").val(0);
    $("#yingFu").val(0);
    $("#yuShou").val(0);
    $("#yingShou").val(0);

    dataGrid.$grid.setGridParam({cellEdit:true});
    dataGrid6.$grid.setGridParam({cellEdit:true});
    dataGrid.$grid.showCol("currStorageNumber");

    //一些代码
    dataGrid.clearDataGrid();dataGrid.addKongRow();
    dataGrid6.clearDataGrid();dataGrid6.addKongRow();
    //草稿单据修改
    $(".gridTop input:not(:hidden),.billsDiscount").not('input[name="billsCode"]').prop("readonly", false);
    $(".delBt,.checkBt,.forceFinish,.print,.orderImport,.billsImport,.copyBills").attr({"disabled":"disabled"});
    /*$('input[name="billsDate"]').val($.DateFormat(new Date(),"yyyy-MM-dd"));*/
    $(".billsImport").removeAttr("disabled");;
    $("#topForm :button").show();

    $(".gridTop input:not(:hidden)").not('input[name="billsCode"],input[name="remark"],input[name="billsDate"],input[name="billsDiscount"]').prop("readonly", true);

    pageIndex = 0;pageCount = 0;//新增时 设置当前页为0  以便从第一张开始查询

    Summary();
    Summary6();
    $("#yuFu").val(0);
    $("#yingFu").val(0);
    $("#yuShou").val(0);
    $("#yingShou").val(0);
    initData = getPageData();
    $.showBillsStatus("billsStautsImg","1");
    wResize();
    getDefaultValues()
}

//获取默认值
function getDefaultValues(){
    var obj={
        success:function(data){
            $('#topForm input[name="sectionName"]').val(data.data.defaultSection.name)
            $('#topForm input[name="sectionId"]').val(data.data.defaultSection.sectionId)
            $('#topForm input[name="managersName"]').val(data.data.defaultEmployee.name).data('id',data.data.defaultEmployee.employeeId)
            $('#topForm input[name="managersUid"]').val(data.data.defaultEmployee.employeeId)
        }
    }
    InterfaceInventory.common.getDefaultValues(obj);
}
//保存按钮点击事件
function saveBtClick(){
    try {
        MyEiditGrid.currEditDataGrid.unAllEdit();
    } catch (e) {
        // TODO: handle exception
    }
    if($("input[name='managersName']").val()==""){
        $.MsgBox('提示', '经办人不能为空');
        return;
    }
    //判断数量是否为0
    var ids=$('#dataGrid').jqGrid('getDataIDs')
    if(ids.length>0){
        for(var i=0;i<ids.length;i++){
            var rowData=$('#dataGrid').jqGrid('getRowData',ids[i])
            if(rowData.goodsNumber<=0){
                $.MsgBox('提示','数量不可小于或等于0');return
            }
           else if(rowData.price<0){
                $.MsgBox('提示','单价不可小于0');return;
            }
        }
    }

    var tableid=$('#dataGrid').getCol('goodsNumber');
    if(tableid<0 || tableid==0){
        $.MsgBox('提示','数量不可小于或等于0');
        return;
    }

    //表单验证
    $("#topForm").data('bootstrapValidator').validate();
    if(!($('#topForm').data('bootstrapValidator').isValid())){
        refreshValidator();
        return ;
    }

    //收付款金额和应收应付金额比较
    if($.parseFloat($("input[name='weiFuAmount']").val()) < 0){
        $.MsgBox('金额验证提示','未收金额不能为负数');
        return;
    }

    //表单
    var formObj = $(".gridTop").toJsonObject();
    $.extend(formObj,$(".gridBottom").toJsonObject());

    //判断是否是正式表保存
    if($("#slideThree").is(':checked')){
        formObj.billsDate = formObj.billsDate + " 00:00:00";
        billsDao.saveBillsRamark(formObj, function(data){
            if(data.result == 1){
                $.MsgBox('提示','单据备注保存成功');

                queryDir  = "refresh";
                initData = getPageData();
                queryPage();
            }else{
                $.MsgBox('出错提示',data.desc);
            }
        }, "cgth_update");
        return;
    }
    var model = getPageData();
    if(model.outstrorageNumList.length == 0){$.MsgBox('操作提示','明细为空');return;}
    //if(model.payreceiptDetailList.length == 0){$.MsgBox('操作提示','收付款为空');return;}
    billsDao.saveReturnedGoodsBills(model, function(data){
        if(data.result == 1){
            $.zxsaas_plus.showalert('success','保存成功');

            queryDir  = "refresh";
            $("#topForm input[name='id']").val(data.data.model.id);

            initData = getPageData();
            // lastPage();
            queryPage();
        }else{
            $.MsgBox('出错提示',data.desc);
        }
    });
}

//获取页面数据
function getPageData(){
    getAuthList(initDealDate);//初始化单据日期控件
    //表单
    var formObj = $(".gridTop").toJsonObject();
    formObj.billsDate=$("input[name='billsDate']").val()
    $.extend(formObj,$(".gridBottom").toJsonObject());

    //出库数量明细
    formObj.outstrorageNumList = dataGrid.getGridDataList();

    //预付款明细
    formObj.payreceiptDetailList = dataGrid6.getGridDataList();

    delete formObj["storageId"];

    //验证数据，提交保存
    //添加一些代码
    //code......
    var footerRow = $("#dataGrid").footerData("get");
    formObj.billsAmount = $.parseFloat(footerRow.taxAmount);
    formObj.billsDiscount = $.parseFloat($("input[name='billsDiscount']").val());
    formObj.discountedAmount = $.parseFloat(footerRow.discountedAmount);

    return formObj;
}

//删除按钮点击事件
function delBtClick(){

    $.MsgBox('删除提示','确定要删除此单据!',function(){del()},function(){});
    function del(){
        var topFormObj = $(".gridTop").toJsonObject();
        if(topFormObj.id != ""){
            var model = {};
            model.id = topFormObj.id;
            billsDao.delCgBills(model, function(data){
                if(data.result == 1){
                    lastPage();
                    $.MsgBox('提示','操作成功');
                }else{
                    $.MsgBox('出错提示',data.desc);
                }
            }, "cgth_delete");
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
    $.MsgBox('过账提示','确定过账此单据!',function(){todo()},function(){});
    function todo(){
        var topFormObj = $(".gridTop").toJsonObject();
        if(topFormObj.id != ""){
            //审核请求
            billsDao.saveCheckOrder({id:topFormObj.id}, function(data){
                if(data.result == 1){
                    $("#topForm input[name='id']").val(data.data.billsId);

                    $("#slideThree").unbind( "change" );
                    $("#slideThree").click();

                    queryDir  = "refresh";
                    queryPage();

                    //重新绑定事件
                    $("#slideThree").on("change", function () {
                        onTheSwitchChange();
                    })

                    $.zxsaas_plus.showalert('success','过账成功');
                }else{
                    $.MsgBox('出错提示',data.desc);
                }
            }, "cgth_gz");
        }else{
            $.MsgBox("消息提示","过账单据不存在!");
        }
    }
}

//红冲按钮点击事件
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
    dateInput.val($("input[name='billsDate']").val());

    dateInput.datetimepicker({
        lang:"ch",           //语言选择中文
        format:"Y-m-d",      //格式化日期
        minDate:$('input[name="billsDate"]').val(),
        timepicker:false,    //关闭时间选项
        todayButton:false,   //关闭选择今天按钮
        maxDate:_authList.maxDate,
        minDate:$("input[name='billsDate']").val(),
    })
    //dateInput.datetimepicker('setStartDate', '2017-01-01');
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
            billsDao.saveForceFinishOrder({id:topFormObj.id,invalidDate:dateInput.val()}, function(data){
                if(data.result == 1){
                    $.zxsaas_plus.showalert('success','红冲成功');
                    nextPage();
                }else{
                    $.MsgBox('出错提示',data.desc);
                }
            }, "cgth_red");
        }else{
            $.MsgBox("消息提示","红冲单据不存在!");
        }
    }
}

//过滤按钮点击事件
function filterBtClick(){
    $('#filterParamModalDialog').modal('show');

}

//刷新按钮点击事件
function refreshBtClick(){
    $.MsgBox("操作提示","确定刷新页面!",function(){
        queryDir  = "refresh";
        queryPage();
    },function(){});
}

//复制单据
function copyBtClick(){
    if(checkIsEidited()){
        $.MsgBox("操作提示","当前单据未保存，继续操作前请先保存");return;
    }
    $("#topForm").data('bootstrapValidator').resetForm();

    //判断是否是正式单据状态，是则改为草稿
    if($("#slideThree").is(':checked')){
        $("#slideThree").unbind( "change" );
        $("#slideThree").click();
        //草稿切换按钮
        $("#slideThree").on("change", function () {
            onTheSwitchChange();
        })
    }

    //置空不能复制的属性
    var kong = {
        billsCode:"",
        id:""
    }
    currPayreceiptDetailList = [];
    $(".gridTop").writeJson2Dom(kong);
    $("#payrecetiptAmount").val(0.00);Summary();
    dataGrid6.$grid.jqGrid('clearGridData');

    pageIndex = 0;pageCount = 0;//新增时 设置当前页为0  以便从第一张开始查询

    //草稿单据修改
    $(".gridTop input:not(:hidden),.billsDiscount").not('input[name="billsCode"]').prop("readonly", false);
    $(".delBt,.checkBt,.forceFinish").removeAttr("disabled");;
    $(".forceFinish").attr({"disabled":"disabled"});
    $("#topForm :button").show();

    //清空换出数据
    var ids=dataGrid.$grid.getDataIDs();
    $.each(ids,function(i,value){
        dataGrid.$grid.jqGrid('setCell', value ,"goodsNumber" ,0);
        dataGrid.$grid.jqGrid('setCell', value ,"imeiList" ," ");
    });
    dataGrid.$grid.showCol("currStorageNumber");

    dataGrid.$grid.setGridParam({cellEdit:true});
    dataGrid6.$grid.setGridParam({cellEdit:true});
    $.showBillsStatus("billsStautsImg","1");
    $.zxsaas_plus.showalert("success","单据复制成功!");
    wResize();
    Summary();
}

/*************************功能按钮事件 E******************************/

//检查页面是否有编辑过
var initData = null;
function checkIsEidited(){
//	if(initData != null)
//	   initData.payreceiptDetailList = dataGrid6.getGridDataList();
    return initData == null || _.isEqual(initData,getPageData())?false:true;
}

//初始化UI
function initUI(){
    //多选框
    $(".js-example-basic-multiple").select2({
        //data:data,
        'width': '153px',
        placeholder: "多选", //默认提示语
        language: "zh-CN"
    });


    //草稿切换按钮
    $("#slideThree").on("change", function () {
        onTheSwitchChange();
    })


    //草稿按钮
    $(document).on('click','#slideThree',function(){
        if($('.slideThree').hasClass('color7D5F50')){
            $('.imeiImport').attr('disabled','true');
        }else{
            $('.imeiImport').removeAttr('disabled');
        }
        $(".slideThree").toggleClass("color7D5F50");
        //  1   正式单据
        //  0   草稿单据
//		$('#slideThree').prop('checked') ? $('#slideThree').val('1') : $('#slideThree').val('0');
        if($('#slideThree').val() == 1){
            $('.deleteReceipts').attr('disabled','true');
            $('.transfer').attr('disabled','true');
            $('.redRush').removeAttr('disabled');
        }else{
            $('.deleteReceipts').removeAttr('disabled');
            $('.transfer').removeAttr('disabled');
            $('.redRush').attr('disabled','true');
        }
    })

    onTheSwitchChange();

    //初始化日期控件
    $("#billsDateBegin").val();
    $("#billsDateEnd").val();

    $("#billsDateBegin").datetimepicker({
        lang:"ch",           //语言选择中文
        format:"Y-m-d",      //格式化日期
        timepicker:false,    //关闭时间选项
        todayButton:false    //关闭选择今天按钮
    });
    $("#billsDateEnd").datetimepicker({
        lang:"ch",           //语言选择中文
        format:"Y-m-d",      //格式化日期
        timepicker:false,    //关闭时间选项
        todayButton:false    //关闭选择今天按钮
    });

    $("input[name='billsDate']").datetimepicker({
        lang:"ch",           //语言选择中文
        format:"Y-m-d",      //格式化日期
        timepicker:false,    //关闭时间选项
        todayButton:false    //关闭选择今天按钮
    }).on('blur', function (ev) {
        refreshValidatorField("billsDate");//刷新验证信息
    });
}

//重置查询表单
function resetQueryForm(){
    var form = {
        billsCode:"",
        billsDateBegin:"",
        billsDateEnd:"",
        imei:"",
        contactsunitIdListStr:"",
        goodsNameIdListStr:"",
        remark:"",
        sectionIdListStr:"",
        storageIdListStr:""
    }
    $(".filterParamForm").writeJson2Dom(form);
    $("#billsStatusCodeListStr").val("");
    $("#contactsunitIdListStr").val("");
    $("#sectionIdListStr").val("");
    $("#storageIdListStr").val("");
    $("#goodsNameIdListStr").val("");
}

//获取查询表单数据
function getQueryData(){
    var data = $(".filterParamForm").toJsonObject();
    data.billsStatusCodeListStr = $("#billsStatusCodeListStr").select2().val()==null?"":$("#billsStatusCodeListStr").select2().val().join(",");
    //data.storageIdListStr = $("#storageIdListStr").select2().val()==null?"":$("#storageIdListStr").select2().val().join(",");

    data.haveInvalid = $("input[name='haveInvalid']").is(':checked');
    return data;
}

function onTheSwitchChange(){
    try {
        if(checkIsEidited()){
            $.MsgBox('操作提示','当前页面数据未保存，是否放弃本次操作并打开一个新页面?',function(){
                initData = getPageData();
                todo();
            },function(){
                $("#slideThree").unbind("change");
                $("#slideThree").click();

                //草稿切换按钮
                $("#slideThree").on("change", function () {
                    onTheSwitchChange();
                })
            });
        }else{
            todo();
        }
        function todo(){
            if($("#slideThree").is(':checked')){
                $(".delBt,.checkBt").attr({"disabled":"disabled"});
                $(".forceFinish").removeAttr("disabled");
                $(".gridTop input:not(:hidden),.billsDiscount").prop("readonly", true);
                //正式单据修改
                $(".gridTop input[name='remark']").prop("readonly", false);
                $(".delBt,.checkBt,.orderImport,.billsImport").attr({"disabled":"disabled"});

                dataGrid.$grid.setGridParam({cellEdit:false});
                dataGrid6.$grid.setGridParam({cellEdit:false});
                dataGrid.$grid.hideCol("currStorageNumber");
            }else{
                //草稿单据修改
                if($(".gridTop").toJsonObject().id != ""){
                    $(".gridTop input:not(:hidden),.billsDiscount").not('input[name="billsCode"]').prop("readonly", false);
                    $(".gridTop input[name='remark']").prop("readonly", false);
                }else{
                    $(".gridTop input:not(:hidden),.billsDiscount").not('input[name="billsCode"]').prop("readonly", false);
                }

                $(".delBt,.checkBt,.forceFinish").removeAttr("disabled");;
                $(".forceFinish").attr({"disabled":"disabled"});
                $(".delBt,.checkBt,.orderImport,.billsImport,.copyBills").removeAttr("disabled");;

                dataGrid.$grid.setGridParam({cellEdit:true});
                dataGrid6.$grid.setGridParam({cellEdit:true});
                dataGrid.$grid.showCol("currStorageNumber");
            }

            $(".gridTop input:not(:hidden)").not('input[name="billsCode"],input[name="remark"],input[name="billsDate"],input[name="billsDiscount"]').prop("readonly", true);

            //固定不能修改的
            $(".gridTop input[name='billsCode']").prop("readonly", true);

            lastPage();
            wResize();
        }
    } catch (e) {
    }
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
                data:{keyWord:$.trim($('.searchImei').val()), storageMode:1},
                success:function(data){
                    if(data.result != 1){$.MsgBox('错误提示',data.desc);return;};
                    var obj=data.data.dataList[0];

                    if(data.data.dataList.length == 1){
                        if(obj.goodsStatus==1){
                            $.zxsaas_plus.showalert('提示',$('.searchImei').val()+'串号下的'+obj.goodsName+'商品已禁用')
                        }else{
                            var kkkk = {};
                            kkkk.imei = obj.imei;
                            kkkk.auxiliaryImei = obj.auxiliaryImei;
                            kkkk.storageId = obj.storageId+"";
                            kkkk.storageName = obj.storageName;
                            kkkk.taxRate = obj.taxRate;
                            kkkk.stockNum = obj.stockNum;
                            kkkk.goodsId = obj.goodsId+"";
                            kkkk.goodsName = obj.goodsName;
                            kkkk.brandName=obj.brandName;
                            kkkk.categoryName=obj.categoryName;
                            kkkk.code=obj.code;
                            kkkk.color=obj.color;
                            kkkk.models=obj.models;
                            imeiUlLiClick(kkkk);
                        }
                    }else if(data.data.dataList.length !=0){
                        var ulHtml = "";
                        for(var i=0;i<data.data.dataList.length;i++){
                            if(data.data.dataList[i].goodsStatus!=1){
                                ulHtml += '<li onclick = "imeiUlLiClick({'+
                                    'imei:\''+data.data.dataList[i].imei+'\','+
                                    'auxiliaryImei:\''+data.data.dataList[i].auxiliaryImei+'\','+
                                    'storageId:\''+data.data.dataList[i].storageId+'\','+
                                    'storageName:\''+data.data.dataList[i].storageName+'\','+
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
    $("input[name='billsDiscount']").bind('input propertychange', function() {
        SummaryBiaoJiao();
    });
}

//窗口大小改变
function wResize(){
    var winH = $(window).height();//浏览器高度
    var centerH = winH - 550;//中部高度
    if(centerH < 350){
        centerH = 350;
    }
    $('.none-cx').width($('.wiRes').width());
    $(".gridBody").height(centerH);
    $("#dataGrid").setGridHeight(centerH);
    $(".referenceFrame").height(winH - 300);
    $("iframe[name='billsReferenceFrame']").height(winH*0.8);
}


//打开仓库引用对话框
function selectStorageReferenceOpen(cellInfo){
    $('#dataGridStorageName').next().trigger('click')
}

//检查IfManageImeiIcon
function checkIfManageImeiIcon(){
    var $grid=$("#dataGrid");
    var ids = $grid.getDataIDs();
    $.each(ids,function(i,value){
        var rowData = $grid.jqGrid('getRowData', value )
        //是否 为 串号商品
        if(rowData.ifManageImei=='true'){
            $grid.jqGrid('setCell', value, "goodsNumber", '', 'ifManageImeiIcon');
        } else {
            //jqgrid 找不到移除 calss 的方法。这里只能外界操作dom 的方式
            $("#dataGrid #" + value + " td[aria-describedby='dataGrid_goodsNumber']").removeClass('ifManageImeiIcon')
        }
    });
}


function initDataGrid(){
    //配置
    var paras = {
        gridId:'dataGrid',
        shrinkToFit: false,
        addRow:{goodsId:'',goodsCode:'',categoryName:'',code:'',goodsName:'',brandName:'',models:'',color:'',cxSectionId:'',discountRate:100,stockNum:'',numControlFlag:'',imControlFlag:'',cxNum:'',cxDiscount:'',cxPrice:'',price:'',remark:''},
        colNames:[ '仓库ID','<i class="bitianX">*</i>仓库名称','商品ID','<i class="bitianX">*</i>商品名称','现库存数量', '<i class="bitianX">*</i>数量','<i class="red">*</i>单价'
            ,'金额','折扣率','折扣金额','折后金额','含税单价','含税金额','税率','税额', '商品备注',
            '类别','商品编码','品牌','型号','颜色',

            '是否串号管理','是否辅助串号管理','串号列表'],
        colModel:
            [
                {name : 'storageId',hidden: true},
                {name : 'storageName', width: 200, align: 'center',edittype:'custom_bt_input',custom_element_bt_click:"selectStorageReferenceOpen",editable:true},
                {name : 'goodsId',hidden: true},
                {name : 'goodsName', width: 200, align: 'center',edittype:'custom_bt_input',custom_element_bt_click:"selectReferenceOpen",editable:true},
                {name : 'currStorageNumber', width: 110, align: 'right'},
                {name : 'goodsNumber', width: 110, align: 'right',editable:true,
                    editoptions:{
                        onkeyup:"checkInput.clearNoNum(this,10)",
                        dataEvents: [{
                            type: "focus",
                            fn: function(){
                                this.select()
                            }
                        }]
                    }
                },
                {name : 'price', width: 110,align:'right',editable:true,editrules:{number:true},formatter:'number',
                    editoptions:{
                        onkeyup:"checkInput.checkNum(this,12)",
                        dataEvents: [{
                            type: "focus",
                            fn: function(){
                                this.select()
                            }
                        }]
                    }
                },
                {name : 'amount', width: 110,align:'right',editrules:{number:true},formatter:'number'},
                {name : 'discountRate',hidden: true,editable:true,editrules:{number:true},formatoptions: {suffix:"%"},formatter:'currency',editoptions:{onkeyup:"checkInput.checkNum(this,5)"}},
                {name : 'discountAmount',hidden: true,formatter:'number'},
                {name : 'discountedAmount',hidden: true,formatter:'number',editoptions:{onkeyup:"checkInput.checkNum(this,12)"}},
                {name : 'taxPrice',hidden: true,formatter:'number'},
                {name : 'taxAmount',hidden: true,formatter:'number'},
                {name : 'taxRate',hidden: true,editable:true,editrules:{number:true},formatoptions: {suffix:"%"},formatter:'currency',editoptions:{onkeyup:"checkInput.checkNum(this,5)"}},
                {name : 'taxLimit',hidden: true,formatter:'number'},
                {name : 'remark', width: 200,editable:true,editoptions:{onkeyup:"checkInput.clearNoText(this,100)"}},
                {name : 'categoryName', width: 100, align: 'center'},
                {name : 'code', width: 100, align: 'center'},
                {name : 'brandName', width: 100, align: 'center'},
                {name : 'models', width: 100, align: 'center'},
                {name : 'color', width: 100, align: 'center'},


                {name : 'ifManageImei',hidden: true},
                {name : 'ifEnableAuxliaryImei',hidden: true},
                {name : 'imeiList',hidden: true}
            ],
        shrinkToFit: false,
    };
    //回调函数
    var callBackList = {
        onCellSelect:function(rowid,iCol,cellcontent,e){
            var curColName=$(e.target).attr('aria-describedby').replace(paras.gridId+'_','');
            if(curColName == 'goodsNumber'){
                try {MyEiditGrid.currEditDataGrid.unAllEdit();} catch (e) {}
                var currRow = $("#dataGrid").jqGrid('getRowData', rowid);
                if(currRow.storageName == "" || currRow.goodsName == ""){
                    $.MsgBox("操作提示","请先选择仓库和商品");
                    $("#dataGrid").setColProp("goodsNumber",{editable:false});
                    return false;
                }
                if((currRow.ifManageImei == "true" || $.trim(currRow.imeiList) != "") && currRow.goodsId != ""){
                    $("#dataGrid").setColProp("goodsNumber",{editable:false});
                    openInputImeiModal("dataGrid",rowid);
                }else{
                    $("#dataGrid").setColProp("goodsNumber",{editable:true});
                }
            }
        },
        afterEditCell:function(rowid,name,val,iRow,iCol){//开始编辑
            lastrow = iRow;
            lastcell = iCol;
        },
        afterSaveCell:function(rowid,name,val,iRow,iCol){//保存编辑 	
            var currRow = $("#dataGrid").jqGrid('getRowData', rowid);
            if(name == 'goodsNumber' && currRow.ifManageImei != "true" && currRow.storageName != "" && currRow.goodsName != ""){
                if($.parseInt(val) > $.parseInt(currRow.currStorageNumber)){
                    //输入数量小于现库存
                    $.MsgBox('错误提示','出库数量不能大于现库存');
                    $("#"+paras.gridId).jqGrid('setCell', rowid ,"goodsNumber" ,currRow.currStorageNumber);
                }
            }
        },
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
                if($.notEmpty(row.storageId) && $.notEmpty(row.goodsId) && row.goodsId != "0" && row.storageId != "0" && row.goodsNumber != 0 ){
                    if($.notEmpty(row.imeiList)){
                        row.outstrorageImList = JSON.parse(row.imeiList);
                    }
                    row.goodsNumber = $.parseInt(row.goodsNumber) ;
                    row.amount = $.parseFloat(row.amount).toFixed(2);
                    delete row["goodsName"];
                    delete row["storageName"];
                    delete row["ifEnableAuxliaryImei"];
                    delete row["ifManageImei"];
                    delete row["ifEnableAuxliaryImei"];
                    delete row["currStorageNumber"];
                    delete row["imeiList"];
                    return row;
                }
            });
        }
    };
    dataGrid = new MyEiditGrid(paras,callBackList);

    function my_inputxx(value, options) {
        var html =  '<select class="form-control" >'+
            '</select>';
        var em = $(html);
        em.change(function(){
            $("#"+paras.gridId).jqGrid('setCell', options.rowId ,"storageId" ,em.children('option:selected').attr("sid"));
        });
        return em;
    }
    function my_valuexx(value) {
        return value.val();
    }
}

//打开引用对话框
function selectReferenceOpen(){
    var sectionId= $.trim($('#topForm  input[name="sectionId"]').val())
    if(sectionId===''){
        $.zxsaas_plus.showalert("提示", "请选择部门名称!");
        return
    }
    var selRowId = $("#dataGrid").jqGrid('getGridParam','selrow');
    var selRowData = $("#dataGrid").jqGrid('getRowData', selRowId);
    if(selRowData.storageId==''){
        $.zxsaas_plus.showalert("提示", "请选择仓库名称!");
        return
    }

    $('#dataGridGood').comModalsOutStoreGoods('setOption',{
        'girdParam':{
            'queryKey':"",
            'typeId':"",
            'sectionId':sectionId,
            'storageIds':selRowData.storageId,
            'menuCode':$('#AUTH').data('code'),
        }
    })
    $('#dataGridGood').next().trigger('click')
}


//汇总统计
function Summary(){
    //汇总每一行
    var ids=$("#dataGrid").getDataIDs();
    $.each(ids,function(i,value){
        var currRow = dataGrid.$grid.jqGrid('getRowData', value);

        var goodsNumber = $.parseInt(currRow.goodsNumber);//数量
        var amount = $.parseFloat(currRow.price)*goodsNumber; //金额
        var discountRate = $.parseFloat(currRow.discountRate)/100; //折扣率
        var discountPrice = $.parseFloat(currRow.price)*($.parseFloat(currRow.discountRate)/100); //折扣单价
        //var discountAmount = discountRate * amount;//折扣金额
        var discountedAmount = discountPrice * goodsNumber; //折后金额

        //税率录入
        var taxRate =  $.parseFloat(currRow.taxRate)/100;//税率
        var taxPrice = discountPrice * taxRate + discountPrice;//含税单价
        var taxAmount = taxPrice * goodsNumber;
        var taxLimit = (taxPrice - discountPrice)*goodsNumber;

        dataGrid.$grid.jqGrid('setCell', value ,"amount" ,amount.toFixed(2));
        dataGrid.$grid.jqGrid('setCell', value ,"discountedAmount" ,discountedAmount.toFixed(2));
        dataGrid.$grid.jqGrid('setCell', value ,"taxPrice" ,taxPrice.toFixed(2));
        dataGrid.$grid.jqGrid('setCell', value ,"taxAmount" ,taxAmount.toFixed(2));
        dataGrid.$grid.jqGrid('setCell', value ,"taxLimit" ,taxLimit.toFixed(2));

        $("#dataGrid #" + value+ " td[aria-describedby='dataGrid_goodsNumber']").removeClass('ifManageImeiIcon')
        //是否 为
        if (currRow.ifManageImei=='true') {
            dataGrid.$grid.jqGrid('setCell', value, "goodsNumber", '', 'ifManageImeiIcon');
        }
    });

    //汇总
    var sumGoodsNumber = dataGrid.$grid.getCol('goodsNumber', false, 'sum');
    var sumAmount = dataGrid.$grid.getCol('taxAmount', false, 'sum');
    var discountedAmount = dataGrid.$grid.getCol('discountedAmount', false, 'sum');
    var amount = dataGrid.$grid.getCol('amount', false, 'sum').toFixed(2);
    dataGrid.$grid.footerData("set",{index:"合计",goodsNumber:sumGoodsNumber,discountedAmount:discountedAmount,taxAmount:sumAmount,amount:amount});

    SummaryBiaoJiao();
}

//表角金额统计
function SummaryBiaoJiao(){
    var footerRow = $("#dataGrid").footerData("get");
    var taxAmount = $.parseFloat(footerRow.taxAmount);
    var payrecetiptAmount = $.parseFloat($("#payrecetiptAmount").val());
    var billsDiscount =  $.parseFloat($("input[name='billsDiscount']").val());
    if(isNaN(billsDiscount)){
        billsDiscount = 0;
        //$("input[name='billsDiscount']").val(0);
    }
    if(taxAmount > 0 && taxAmount-payrecetiptAmount<0){
        $.MsgBox("操作提示","收款金额不能大于应收金额！");
        $("#payrecetiptAmount").val("0.00");
    }else{
        $("input[name='yingFuAmount']").val((taxAmount).toFixed(2));
        $("input[name='weiFuAmount']").val((taxAmount - billsDiscount - payrecetiptAmount).toFixed(2));
    }
}
/**********************表格1 结束******************************************/

/**********************串号引入表格 开始******************************************/
//打开串号引入对话框
function openInputImeiModal(gridId,rowid){
//	if($("#slideThree").is(':checked'))return;
    try {MyEiditGrid.currEditDataGrid.unAllEdit();} catch (e) {}
    $('#inputStorageImeiModal').modal('show');
    $("#dataGridRowId2").val(gridId+"|"+rowid);

    var currRow = $("#"+gridId).jqGrid('getRowData', rowid);
    $("#goodsnameTitle2").html(currRow.goodsName);
    $("#storagenameTitle2").html(currRow.storageName);


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
        colNames:['串号',  '成本', '辅助串号'],
        colModel:
            [
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
                $("#"+gridId).jqGrid('setCell', rowid ,"currStorageNumber" ,data.data.dataList.length);
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
        colNames:['串号',  '辅助串号', '备注' ,'成本'],
        colModel:
            [
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


/**********************表格1 开始******************************************/

//切换部门，联动查询收付款账户信息
var currPayreceiptDetailList = [];
function onSectionChange(sectionId){

    //判断部门是否切换
    $.request({
        url: this.basePath + '/account/findSectionKsyAccount',
        type : "post",
        dataType : 'json',
        data:{'sectionId':sectionId},
        success:function(data){
            var result = data.data;
            if(data.result != 1){$('#payrecetiptDetailModal').modal('hide');$.MsgBox('错误提示',data.desc);return;};
            if(data.data.dataList.length == 0){$('#payrecetiptDetailModal').modal('hide');return;};

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
                        row.payreceiptAmout = currPayreceiptDetailList[int2].payreceiptAmout;
                    }
                }
            }
            initData = getPageData();//记录初始数据
        }
    });

}

//打开收付款明细录入
function openPayrecetiptDetailModal(){
    //if($("#slideThree").is(':checked'))return;
    if($("input[name='sectionId']").val() == ""){$.MsgBox("操作提示","请选择部门");return;};
    $('#payrecetiptDetailModal').modal('show');
    onSectionChange($("input[name='sectionId']").val());
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
                {name : 'payreceiptAmout',index : 'payreceiptAmout',align:'left',editable:true,sortable: false,formatter:'number',formatter:'number',editoptions:{onkeyup:"checkInput.checkNum(this,12)"}}
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
                if($.notEmpty(row.accountType,row.payreceiptAmout,row.accountName)){
                    delete row["accountName"];
                    row.payreceiptAmout = $.parseFloat(row.payreceiptAmout);
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
    $("#payrecetiptAmount").val(footerRow.payreceiptAmout);
    $('#payrecetiptDetailModal').modal('hide');
    currPayreceiptDetailList = dataGrid6.getGridDataList();
    SummaryBiaoJiao();
}

//汇总统计
function Summary6(){
    //名称
    var sumAmount = $("#dataGrid6").getCol('payreceiptAmout', false, 'sum');
    $("#dataGrid6").footerData("set",{index:"合计",payreceiptAmout:sumAmount});
}

/**********************表格1 结束******************************************/

/**********************串号搜索 开始******************************************/

function imeiUlLiClick(obj){
    var queryModel = {goodsId:obj.goodsId,storageId:obj.storageId};
    var imeiModel = {imei:obj.imei,auxiliaryImei:obj.auxiliaryImei};

    obj.ifManageImei = true;

    $(".searchImei").focus();
    $('.none-cx').hide();
    if(!dataGrid.isCanEdit())return;
    if(!dataGrid.isExistRow(queryModel)){

        obj.imeiList = JSON.stringify([imeiModel])
        obj.goodsNumber = 1;
        obj.discountRate = 100;
        obj.currStorageNumber = obj.stockNum;
        dataGrid.addRowData(MyEiditGrid.getMaxRowid($("#dataGrid"))+1,obj);
        Summary();
    }else{
        var row = dataGrid.getRowByModel(queryModel);
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
        Summary();
    }
    dataGrid.clearRowByPara({storageId:'',goodsId:''});
}
/**********************串号搜索 结束******************************************/

//加载刷新仓库列表
var currSectionStorageList = [];
function initStorageSelect(sId){
    $.request({
        type: 'post',
        url: basePath+'/Temployee/findKSYBM',
        dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
        success: function(data) {
            var list = data.data.dataList;

            currSectionStorageList = list;
            $("#storageSelect").html("");
            for ( var int = 0; int < list.length; int++) {
                $("#storageSelect").append('<option value="'+list[int].id+'">'+list[int].name+'</option>');
            }
        },
        error: function(msg) {
            alert(msg);
        }
    });
}

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
        }
    }
    InterfaceInventory.common.getContactUnitAmountVo(obj)
}
//不能为负数验证
$(document).on('blur','.billsDiscount',function(){
    var $m=$('input[name=weiFuAmount]').val();
    if(Number($m)<0){
        $.MsgBox('金额验证提示','未付金额不能为负数');
    }
})

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
        '<textarea class="form-control imeiDr_vone" style="height: 80px;resize:none" placeholder="一行一串号，若双串号则主辅串任一即可出库。例：\n A88888888888888 \n 869999999999999"></textarea>'+
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
        $(".imeiDr_vone").trigger('keydown')
    })

    $(".imeiDr_vone").setTextareaCount({
        width: "30px",
        bgColor: "#f2f2f2",
        color: "red",
        display: "block"
    }).parent().css('width','100%');
}

