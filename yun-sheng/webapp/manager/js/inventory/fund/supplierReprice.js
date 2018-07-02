var dataGrid;
var valuationMethodsGrid;
$(function () {
    var lastrow,lastcell;//表格的 行 ，列
    var lastrowImei,lastcellImei; //商品串号的 行 ，列
    var isDraftOp=true;//草稿单状态  :  true ： 草稿单 ； false ： 正式单据
    var menuBtn;//菜单组
    init()
    function init() {
        initTable()
        initTopForm()
        initImeiDr()
        initValuationMethodsGrid()
        /*是否是：跳转单据*/
        var billsId = $.trim(functionObjExtent.getQueryString('billsId'))
        if(billsId!=''){
            var billsCode = $.trim(functionObjExtent.getQueryString('billsCode'))
            var copyFlag = $.trim(functionObjExtent.getQueryString('copyFlag'))
            //单据编号
            if(billsCode!=""){
                isDraftOp=false
            }else{
                isDraftOp=true
            }
            pageAjax({'billsId':billsId},function () {
                //复制一单
                if(copyFlag==1){
                    copyBills()
                }
            })
        }else{
            //新增
            getDefaultValues()
        }
        isBillslogShow()
        initMenuBtn()
    }
    //载入菜单组件
    function initMenuBtn(){
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
                        var data=getParams()
                        if(checkParam(data)==true){
                            return
                        }
                        $.ajaxPackage({
                            contentType:'application/json',
                            url:'/manager/inventory/fund/supplier/reprice/saveReprice',
                            data:JSON.stringify(data),
                            success:function(data){
                                $.zxsaas_plus.showalert('success',data.desc || "保存成功！当前页面商品库存已锁！");
                                var  billsId=data.data.billsId;
                                isDraftOp=true
                                pageAjax({'billsId':billsId})
                            }
                        })
                    }
                },
                draftDel: {
                    isShow: isDraftOp,
                    click: function () {
                        var params = $("#billsHeaderForm").toJsonObject();
                        var mainIds=  $.trim(params.id)
                        var billsStatus=  $.trim(params.billsStatus)
                        if(billsStatus!='1' || mainIds==""){
                            $.zxsaas_plus.showalert('提示','只能删除草稿单!');
                        }else{
                            $.zxsaas_plus.showconfirm('提示', "是否删除此草稿单？", function(){
                                $.ajaxPackage({
                                    type:'get',
                                    url:'/manager/inventory/fund/supplier/reprice/delReprice',
                                    data:{'mainIds':mainIds},
                                    success:function(data){
                                        $.zxsaas_plus.showalert('success',data.desc || "删除成功");
                                        isDraftOp=true
                                        setTimeout(function(){
                                            location.href =location.href.substring(0,location.href.indexOf('?'));
                                        },1500)
                                    }
                                })
                            });
                        }
                    }
                },
                draftPost: {
                    isShow: isDraftOp,
                    click: function () {
                        var params = $("#billsHeaderForm").toJsonObject();
                        var mainIds=  $.trim(params.id)
                        var billsStatus=  $.trim(params.billsStatus)
                        if(billsStatus!='1' || mainIds==""){
                            $.zxsaas_plus.showalert('提示','只能过账草稿单!');
                        }else{
                            $.ajaxPackage({
                                type:'get',
                                url:'/manager/inventory/fund/supplier/reprice/excutePost',
                                data:{'mainIds':mainIds},
                                success:function(data){
                                    $.zxsaas_plus.showalert('success',data.desc || "过账成功");
                                    isDraftOp=false
                                    pageAjax({'billsId':mainIds})
                                }
                            })
                        }
                    }
                },
                red:{
                    isShow: !isDraftOp,
                    click: function () {
                        var params = $("#billsHeaderForm").toJsonObject();
                        var id=  $.trim(params.id)
                        var billsStatus=  $.trim(params.billsStatus)
                        var isAudit=  $.trim(params.isAudit)
                        if(billsStatus!='1' && id!="" && isAudit==0){
                            var billsDateStr=  $.trim(params.billsCode)
                            codeDate(billsDateStr);
                            $('#redModal').modal('show');
                        }else{
                            $.zxsaas_plus.showalert('提示', "只能对已过账且未稽核单据红冲!");
                        }
                        function codeDate(obj){
                            var times = obj.split('-')[0];
                            var reg = /[A-Z]/g;
                            times = times.replace(reg,"");
                            times = times.replace(times.substr(0,4),times.substr(0,4)+'-');
                            times = times.replace(times.substr(0,7),times.substr(0,7)+'-');
                            getAuthList(function () {
								var min = CompareDate(_authList.minDate, times)?_authList.minDate:times;
								$('.redTime').datePlu({
									endDate:false,
									minTime: min,
									defaultTime: min
								})
							})

                        }
                    }
                },
                printDropdown:{
                    isShow: !isDraftOp,
                    list:[{
                        name:'串号明细',
                        click:function(){
                            print('default')
                        }
                     },{
                        name:'商品汇总（带串号）',
                        click:function(){
                            print('sumImei')
                        }
                    },{
                        name:'商品汇总',
                        click:function(){
                            print('sum')
                        }
                    }
                    ]
                },
                copy:{
                    isShow: !isDraftOp,
                    click: function () {
                        copyBills()
                    }
                },
                audit:{
                    isShow: !isDraftOp,
                    click: function () {
                        var params = $("#billsHeaderForm").toJsonObject();
                        var mainIds=  $.trim(params.id)
                        var billsStatus=  $.trim(params.billsStatus)
                        var isAudit=  $.trim(params.isAudit)
                        if(billsStatus!='1' && mainIds!="" && isAudit==0){
                            $.ajaxPackage({
                                type:'get',
                                url:'/manager/inventory/fund/supplier/reprice/updateAuditStatus',
                                data:{'mainIds':mainIds,'status':1},
                                success:function(data){
                                    $.zxsaas_plus.showalert('success',data.desc || "稽核成功");
                                    isDraftOp=false
                                    pageAjax({'billsId':mainIds})
                                }
                            })
                        }else{
                            $.zxsaas_plus.showalert('提示','只能对正式且未稽核单据稽核!');
                        }
                    }
                },
                auditCancle:{
                    isShow: !isDraftOp,
                    click: function () {
                        var params = $("#billsHeaderForm").toJsonObject();
                        var mainIds=  $.trim(params.id)
                        var billsStatus=  $.trim(params.billsStatus)
                        var isAudit=  $.trim(params.isAudit)
                        if(billsStatus !='1' && mainIds!="" && isAudit==1){
                            $.ajaxPackage({
                                type:'get',
                                url:'/manager/inventory/fund/supplier/reprice/updateAuditStatus',
                                data:{'mainIds':mainIds,'status':0},
                                success:function(data){
                                    $.zxsaas_plus.showalert('success',data.desc || "取消稽核成功");
                                    isDraftOp=false
                                    pageAjax({'billsId':mainIds})
                                }
                            })
                        }else{
                            $.zxsaas_plus.showalert('提示','只能对已稽核单据取消稽核!');
                        }
                    }
                },
                update:{
                    isShow: !isDraftOp,
                    click: function () {
                        var $grid= dataGrid.$grid;
                        $grid.jqGrid("saveCell", lastrow, lastcell);
                        //主表
                        var params = $("#billsHeaderForm").toJsonObject();
                        //明细数据
                        var detailList=[];
                        var List = dataGrid.getGridDataList();
                        for(var i=0;i<List.length;i++){
                            var item=List[i];
                            if(item.goodsId!=''){
                                var imeiList=JSON.parse(item.imeiList);
                                var arr=[];
                                for(var j=0;j<imeiList.length;j++){
                                    var imeiItem=imeiList[j];
                                    arr.push({
                                        id:imeiItem.id,
                                        goodsId:imeiItem.goodsId,
                                        remark:imeiItem.remark,
                                    })
                                }
                                detailList.push({
                                    mainId:item.id,
                                    goodsId:item.goodsId,
                                    valuationMethods:item.valuationMethods,
                                    remark:item.remark,
                                    imeiList:arr
                                })
                            }
                        }
                        var data= {
                            id:params.id,
                            remark: params.remark,
                            detailList: detailList,
                        };
                        $.ajaxPackage({
                            contentType:'application/json',
                            url:'/manager/inventory/fund/supplier/reprice/updateReprice',
                            data:JSON.stringify(data),
                            success:function(data){
                                $.zxsaas_plus.showalert('success',data.desc || "修改备注成功！");
                                var  billsId=data.data.billsId;
                                isDraftOp=false
                                pageAjax({'billsId':params.id})
                            }
                        })
                    }
                }
            },
            btnGroupRight: {
                history: {
                    isShow: true,
                    click: function () {
                        window.parent.openWorkBoxByMenutext("供应商保价单据列表",  '/manager/inventory/fund/supplier/reprice/historyMain', true);
                    }
                }
            }
        };
        menuBtn = new componentMenuBtn("#MenuTool", option);
        //保存红冲按钮
        $(".redSave").on("click",function(){
            var params = $("#billsHeaderForm").toJsonObject();
            var mainIds=  $.trim(params.id)
            var param={
                mainIds:mainIds,
                redDate:$(".redTime").val()
            };
            $.request({
                url:"/manager/inventory/fund/supplier/reprice/excuteRed",
                type : 'POST',
                dataType: "json",
                data:param,
                success:function(data){
                    if(data.result==1){
                        $.zxsaas_plus.showalert("success",data.desc || "红冲成功");
                        pageAjax({
                            billsId: mainIds,
                        });
                        $('#redModal').modal('hide');
                    }else{
                        $.zxsaas_plus.showalert("提示",data.desc);
                        $('#redModal').modal('show');
                    }

                }
            });
        });
        //打印
       function  print(tempKind) {
            var id = $("#billsHeaderForm input[name='id']").val();
            if(id==""){
                $.zxsaas_plus.showalert("提示","单据不存在");
                return
            }
            $.printBills('/manager/inventory/fund/supplier/reprice/printReprice',
                {
                    'billsId': id,
                    'tempKind': tempKind,
                }
            );
        }
    }
    //重载菜单组件
    function reloadMenuBtn() {
        var updateKey=['printDropdown','red','copy','update','audit','auditCancle'];
        var addkey=['draftPost','draftDel','draftSave'];
        var params = $("#billsHeaderForm").toJsonObject();
        var billsStatus=  $.trim(params.billsStatus)
        var isAudit=  $.trim(params.isAudit)
        if(isDraftOp == false){
            menuBtn.setShow(updateKey);
            menuBtn.setHide(addkey);
        }else{
            menuBtn.setHide(updateKey);
            menuBtn.setShow(addkey);
        }

        //判断是否禁用 红冲
        if(isDraftOp == false && billsStatus==7){
            menuBtn.setDisabledbtn("red");
        }else{
            menuBtn.setUndisabledbtn("red");
        }
        //判断是否禁用 复制
        if(isDraftOp == false){
            //单据：稽核状态
            if(isAudit==1){
                //启用：取消稽核，禁用：稽核
                menuBtn.setDisabledbtn("audit");
                menuBtn.setUndisabledbtn("auditCancle");
            }else{
                //启用：稽核，禁用：取消稽核
                menuBtn.setUndisabledbtn("audit");
                menuBtn.setDisabledbtn("auditCancle");
            }

        }else{
            menuBtn.setUndisabledbtn("audit");
            menuBtn.setUndisabledbtn("auditCancle");
        }
    }
    //复制一单
    function copyBills(){
        isDraftOp=true
        loadBillsStatusByIsDraftOp()
        reloadMenuBtn()
        isBillslogShow()
        //清空底部信息
        $('#bottomForm')[0].reset()
        $("#billsHeaderForm input[name='id']").val('')
        loadGood()
        function loadGood() {
            var goodsList=[];
            var ids = $('#dataGrid').getDataIDs();
            $.each(ids,function(i,keyId){
                var rowData = $('#dataGrid').getRowData(keyId);
                rowData.dataId=rowData.goodsId
                rowData.name=rowData.goodsName
                goodsList.push(rowData)
            })
            $('#dataGrid').jqGrid('clearGridData')
            var contactUnitId= $.trim($("input[name='contactsunitId']").val())
            var goodsId=[];
            for(var i=0;i<goodsList.length;i++){
                goodsId.push(goodsList[i].dataId);
            }
            var obj={
                menuCode:$('#AUTH').data('code'),
                contactUnitId:contactUnitId,
                goodsId:goodsId.toString()
            }
            $.ajaxPackage({
                'url':'/manager/component/goods/getStockImeiVoList',
                'data':obj,
                'success':function(data){
                    var list=data.data.dataList;
                    var $grid = dataGrid.$grid;
                    var cIndex;
                    for(var i=0;i<goodsList.length;i++){
                        var goods = goodsList[i];
                        goods.imeiList=[]
                        goods.costPrice=0
                        for(var j=0;j<list.length;j++){
                            var item = list[j];
                            if(goods.dataId==item.goodsId){
                                item.rePriceBalance=0; //财务成本保价差额
                                item.rePriceCost=item.costPrice; //保后财务成本
                                goods.imeiList.push(item)
                                goods.costPrice+=Number(item.costPrice)
                            }
                        }
                    }
                    for(var i=0;i<goodsList.length;i++){
                        var goods = goodsList[i];
                        if(Number(goods.imeiList.length)>0){
                            var dataRow ={
                                'goodsName':goods.name,
                                'goodsId':goods.dataId,
                                'models':goods.models,
                                'color':goods.color,
                                'configure':goods.configure,
                                'valuationMethods':goods.valuationMethods,
                                'imeiList':JSON.stringify(goods.imeiList),
                                'goodsNumber':goods.imeiList.length,
                                'costPrice': Number(goods.costPrice).toFixed(2),
                                'rePriceCost': Number(goods.costPrice).toFixed(2),
                                'rePriceBalance':goods.rePriceBalance,
                            };
                            cIndex=MyEiditGrid.getMaxRowid($grid) + 1;
                            $grid.jqGrid('addRowData', cIndex, dataRow);
                        }
                    }
                    kongRow()
                    lastcell=5
                    var ids = $('#dataGrid').getDataIDs();
                    $.each(ids,function(i,keyId){
                        var currRow = $('#dataGrid').getRowData(keyId);
                        gridImeiListSum(currRow,keyId)
                    })


                }
            })
        }
    }
    // 初始化 顶部表单
    function initTopForm() {
        //单据日期
        $('#billsBeginDateStr').datePlu({
            ajaxOpt:{
                async:false,
            },
            endDate: false,
        });
        //部门
        $("#sectionName").storePlu({
            isStoreShow:false,
            isLoadDefaultName:0,
            checkMore: false,
            search: false,
            ifStore: false, // 控制部门选项
            changeStore:function(){
                var id=$("#billsHeaderForm input[name='sectionName']").data('sectionId');
                //设置编辑器值
                $("input[name='sectionId']").val(id);
            }
        });
        //经办人
        $("#managerName").comModalsEmployeeBySection({
            sectionIds:'input[name="sectionId"]',
            clickback:function () {
                var obj= $("#managerName");
                //设置编辑器值
                $("input[name='managerId']").val(obj.data('id'));
            }
        })
        //往来单位
        $("#contactsunitName").comModalsContactUnit({
            clickback:function () {
                var obj= $("#contactsunitName");
                var id=obj.data('id');
                //设置编辑器值
                $("input[name='contactsunitId']").val(id)
                //切换往来单位余额
                initWLDWamount(id);
                dataGrid.clearDataGrid();
                dataGrid.addKongRow();
            }
        })
    }
    // 初始化表格
    function initTable(){
        //配置
        var paras = {
            gridId: 'dataGrid',
            colNames: [ '<i class="bitianX">*</i>商品名称', '<i class="bitianX">*</i>串号（数量）',
                '原财务成本总额', '<i class="bitianX">*</i>保后财务成本总额', '<i class="bitianX">*</i>保价总差额'
                , '备注', '型号', '颜色', '配置','商品id','计价方式','串号列表','单据id'],
            colModel: [
                {name: 'goodsName', width: 150, align: 'left', edittype: 'custom_bt_input', custom_element_bt_click: "openGoodsName",editable: true},
                {name: 'goodsNumber', width: 150, align: 'right' ,formatter: 'integer', editoptions:{
                    onkeyup: "functionObjExtent.checkInput.checkPositiveInteger(this,12)",
                    dataEvents: [
                        {
                        type: "focus",
                        fn: function(){
                            this.select()
                        }
                    }]
                }},
                {name: 'costPrice', width: 150,formatter: 'number', align: 'right'},
                {name: 'rePriceCost', width: 150, editable: true, align: 'right' ,formatter: 'number', editoptions:{
                    dataEvents: [{
                        type: "focus",
                        fn: function(){
                            this.select()
                        }
                    }]
                }},
                {name: 'rePriceBalance', width: 150, editable: true, align: 'right' ,formatter: 'number', editoptions:{
                    dataEvents: [{
                        type: "focus",
                        fn: function(){
                            this.select()
                        }
                    }]
                }},
                {name: 'remark', width: 150, align: 'left', editable: true,},
                {name: 'models', width: 150, align: 'left'},
                {name: 'color', width: 150, align: 'left'},
                {name: 'configure', width: 150, align: 'left'},
                {name: 'goodsId', hidden: true},
                {name: 'valuationMethods', hidden: true},
                {name: 'imeiList', hidden: true},
                {name: 'mainId', hidden: true},
            ],
            height: $(window).height() * 0.48,
            shrinkToFit: false,
        };
        //回调函数
        var callBackList = {
            onCellSelect: function (rowid, iCol, cellcontent, e) {
                var currRow = $("#dataGrid").jqGrid('getRowData', rowid);
                var aria = $(e.target).attr('aria-describedby').replace(paras.gridId+'_','')
                if (aria == 'goodsNumber' && currRow.goodsId!="") {
                    if(currRow.valuationMethods == 1){
                        dataGrid.$grid.setColProp("goodsNumber", {editable: false});
                        openImeiInputModal("dataGrid", rowid);//打开输入框
                    }
                   else{
                        dataGrid.$grid.setColProp("goodsNumber", {editable: true});
                    }
                }else if((aria=='costPrice' || aria=='rePriceCost') && isDraftOp==true ){
                    if(currRow.valuationMethods == 1){
                        dataGrid.$grid.setColProp(aria, {editable: true});
                    }else{
                        dataGrid.$grid.setColProp(aria, {editable: false});
                    }
                }
                lastcell = iCol;
            },
            afterEditCell: function (rowid, name, val, iRow, iCol) {//开始编辑
                lastrow = iRow;
                lastcell = iCol;
            },
            afterSaveCell: function (rowid, name, val, iRow, iCol) {//保存编辑
                lastrow = iRow;
                lastcell = iCol;
            },
            summary: function (rowid, name, val, iRow, iCol) {//统计处理
                gridSum(1)
            },
            getGridDataList: function (rows) {
                delete rows["op"];
                return rows;
            }
        };
        dataGrid = new MyEiditGrid(paras, callBackList);
        dataGrid.addKongRow()
        //商品
       $('#dataGridGood').comModalsStoreFilterGoods({
           clickback:function(goodsList){
               var $grid = dataGrid.$grid;
               var ids = $grid.getDataIDs();
               var gridSelDataRow=$grid.jqGrid("getRowData",dataGrid.lastrow);  //主表选中的行 数据
               var hasRepetGood=false //是否有重复商品，默认是没有
               var hasCurRow=false;//是否有当前行选中的重复商品，默认是没有
               $.each(ids, function (m, keyId) {
                   var rowData = $grid.jqGrid('getRowData', keyId);
                   for(var i=0;i<goodsList.length;i++){
                       var goodsItem=goodsList[i];
                       if(goodsItem.dataId==rowData.goodsId){

                           goodsList.splice(i, 1);
                           if(gridSelDataRow.goodsId==goodsItem.dataId){
                               hasCurRow=true;
                               break
                           }
                           hasRepetGood=true
                           break;
                       }
                   }
               });
               if(hasRepetGood==true){
                   $.zxsaas_plus.showalert('提示',"页面存在被选中的商品，已经去掉！");
               }
               addGood(goodsList,hasCurRow)
               $("#dataGridGood").removeData();

           }
       })
    }
    //添加商品
    function addGood(goodsList,hasCurRow) {
        if(goodsList.length>0){
            var contactUnitId= $.trim($("input[name='contactsunitId']").val())
            var girdParam=$('#'+$('#dataGridGood')[0].isObj.option.gridID).getGridParam().postData

            var goodsId=[];
            for(var i=0;i<goodsList.length;i++){
                goodsId.push(goodsList[i].dataId);
            }
            var obj={
                menuCode:$('#AUTH').data('code'),
                contactUnitId:contactUnitId,
                purchaseDateStart:$.trim(girdParam.purchaseDateStart),
                purchaseDateEnd:$.trim(girdParam.purchaseDateEnd),
                goodsId:goodsId.toString()
            }
            $.ajaxPackage({
                'url':'/manager/component/goods/getStockImeiVoList',
                'data':obj,
                'success':function(data){
                    var list=data.data.dataList;
                    for(var i=0;i<goodsList.length;i++){
                        var goods = goodsList[i];
                        goods.imeiList=[]
                        goods.costPrice=0
                        for(var j=0;j<list.length;j++){
                            var item = list[j];
                            if(goods.dataId==item.goodsId){
                                item.rePriceBalance=0; //财务成本保价差额
                                item.rePriceCost=item.costPrice; //保后财务成本
                                goods.imeiList.push(item)
                                goods.costPrice+=Number(item.costPrice)
                            }
                        }

                    }
                    addGoodInfo(goodsList,hasCurRow)
                }
            })
        }
        //添加商品
        function addGoodInfo(goodsList,hasCurRow) {
            var $grid = dataGrid.$grid;
            $grid.jqGrid('saveCell',lastrow,lastcell);
            var selRowId = $grid.jqGrid('getGridParam','selrow');
            var cIndex;
            for(var i=0;i<goodsList.length;i++){
                var goods = goodsList[i];
                var costPrice=Number(goods.costPrice).toFixed(2)
                var rePriceCost=costPrice
                var dataRow ={
                    'goodsName':goods.name,
                    'goodsId':goods.dataId,
                    'models':goods.models,
                    'color':goods.color,
                    'configure':goods.configure,
                    'valuationMethods':goods.valuationMethods,
                    'imeiList':JSON.stringify(goods.imeiList),
                    'goodsNumber':goods.imeiList.length,
                    'costPrice': costPrice,
                    'rePriceCost': rePriceCost,
                    'rePriceBalance':0,
                };
                if(i==0&&hasCurRow==false){
                    $grid.jqGrid('setRowData', selRowId, dataRow, {});
                    cIndex=selRowId;
                }else{
                    cIndex=MyEiditGrid.getMaxRowid($grid) + 1;
                    $grid.jqGrid('addRowData', cIndex, dataRow);
                }
            }
            kongRow()
        }
    }
    // 移动加权平均价-串号（数量）Modal
    function initValuationMethodsGrid() {
        //配置
        var paras = {
            gridId: 'valuationMethodsGrid',
            colNames: ['goodsId', '采购日期', '串号',
                '辅助串号', '原财务成本', '<i class="bitianX">*</i>保后财务成本<span class="pixia" data-key="rePriceCost" title="批量修改以下所有行">(批下)</span>'
                , '财务成本保价差额<span class="pixia" data-key="rePriceBalance" title="批量修改以下所有行">(批下)</span>'
                , '备注', '采购价', '入库日期','入库价','所在仓库','所在仓库id','imeiId','明细id'],
            colModel: [
                {name: 'goodsId', hidden: true,frozen:true},
                {name: 'purchaseDate', width: 100, align: 'center',frozen:true},
                {name: 'imei', width: 180, align: 'center',frozen:true},
                {name: 'auxiliaryImei', width: 190, align: 'center'},
                {name: 'costPrice', width: 110, align: 'right' ,formatter: 'number' },
                {name: 'rePriceCost', width: 150, editable: true, align: 'right' ,formatter: 'number', editoptions:{
                    dataEvents: [{
                        type: "focus",
                        fn: function(){
                            this.select()
                        }
                    }]
                }},
                {name: 'rePriceBalance', width: 170, editable: true, align: 'right' ,formatter: 'number', editoptions:{
                    dataEvents: [{
                        type: "focus",
                        fn: function(){
                            this.select()
                        }
                    }]
                    }
                },
                {name: 'remark',index: 'remark', width: 150, align: 'center', editable: true,},
                {name: 'purchasePrice', width: 150, align: 'center'},
                {name: 'inStorageDate', width: 150, align: 'center'},
                {name: 'inStoragePrice', width: 150, align: 'center'},
                {name: 'storageName', width: 150, align: 'center'},
                {name: 'storageId', hidden: true},
                {name: 'imeiId', hidden: true},
                {name: 'id', hidden: true},
            ],
            height: $(window).height() * 0.48,
            shrinkToFit: false,
            multiselect:true,

        };
        //回调函数
        var callBackList = {
            onCellSelect: function (rowid, iCol, cellcontent, e) {
            },
            afterEditCell: function (rowid, name, val, iRow, iCol) {//开始编辑
                lastrowImei = iRow;
                lastcellImei = iCol;
            },
            afterSaveCell: function (rowid, name, val, iRow, iCol) {//保存编辑
                lastrowImei = iRow;
                lastcellImei = iCol;
            },
            summary: function (rowid, name, val, iRow, iCol) {//统计处理
                valuationMethodsGridSum()
            },
            getGridDataList: function (rows) {
                    delete rows["op"];
                    return rows;
            }
        };
        valuationMethodsGrid = new MyEiditGrid(paras, callBackList);
        //输入框
        $('.valuationMethodsSearch').keyup(function (event) {
            if(event.keyCode == "13"){
                var _this=$(this)
                var txt = _this.val().trim().toUpperCase()
                _this.blur()
                var $grid= valuationMethodsGrid.$grid;
                $grid.jqGrid('saveCell',lastrowImei,lastcellImei);
                var ids = $grid.getDataIDs();
                $.each(ids, function (i, keyId) {
                    var currRow = $grid.jqGrid('getRowData', keyId);
                    if((currRow.imei.toUpperCase()).indexOf(txt)>-1){
                        $("#valuationMethodsGrid tr").removeClass('active')
                        //设置单元格高亮
                        var curTr= $("#valuationMethodsGrid #"+keyId);
                        curTr.addClass('active')
                        var hegiht=curTr[0].offsetTop;
                        $grid.parents(".ui-jqgrid-bdiv").scrollTop(hegiht);
                        return false;
                    }
                })
                setTimeout(function(){
                    _this.focus()
                    _this[0].select()
                })
            }
        })
        //确定
        $('.valuationMethodsSave').click(function () {
            valuationMethodsGrid.$grid.jqGrid('saveCell',lastrowImei,lastcellImei);
            var imeiList = valuationMethodsGrid.getGridDataList()
            var selRowId = dataGrid.$grid.jqGrid('getGridParam','selrow')
            var rePriceBalance=0;
            var costPrice=0;
            for(var i=0;i<imeiList.length;i++){
                var item=imeiList[i];
                rePriceBalance+=Number(item.rePriceBalance)
                costPrice+=Number(item.costPrice)
                if(item.id==''){
                    delete item.id
                }
            }
            dataGrid.$grid.jqGrid('setCell', selRowId, "imeiList",JSON.stringify(imeiList));
            dataGrid.$grid.jqGrid('setCell', selRowId, "rePriceBalance",rePriceBalance.toFixed(2));
            dataGrid.$grid.jqGrid('setCell', selRowId, "goodsNumber",imeiList.length);
            dataGrid.$grid.jqGrid('setCell', selRowId, "costPrice",costPrice.toFixed(2));
            dataGrid.$grid.jqGrid('setCell', selRowId, "rePriceCost",(Number(costPrice)-Number(rePriceBalance)).toFixed(2));
            gridSum()
            $('#valuationMethodsModal').modal('hide')
        })
        //批下
        $('.pixia').on('click',function () {
            if(isDraftOp==true){
                var key = $(this).data('key');
                var $grid = valuationMethodsGrid.$grid;
                $grid.jqGrid('saveCell', lastrowImei, lastcellImei);
                var selRowId = $grid.jqGrid('getGridParam', 'selrow');
                var currRow = $grid.jqGrid('getRowData', selRowId);
                var ids = $grid.getDataIDs();
                for (var i = ids.indexOf(selRowId) + 1; i < ids.length; i++) {
                    $grid.jqGrid('setCell', ids[i], key, Number(currRow[key]).toFixed(2));
                }
                valuationMethodsGridSum()
            }
        })
        //删除
        $('.valuationMethodsDel').on('click',function () {
            var $grid = valuationMethodsGrid.$grid;
            //这里是引用，所有要clone一份
            var selArrRow = $.extend([], $grid.jqGrid('getGridParam', 'selarrrow'));
            if(selArrRow.length<1){
                $.zxsaas_plus.showalert("提示","请选择一行！");
                return
            }
            $.zxsaas_plus.showconfirm('提示', "是否删除？", function () {

                $grid.jqGrid('saveCell', lastrowImei, lastcellImei);
                for (var i = 0; i < selArrRow.length; i++) {
                    $grid.jqGrid("delRowData", selArrRow[i]);
                }
                valuationMethodsGridSum()
            })
        })
    }
    //是否展示单据日志
    function isBillslogShow() {
        var $billslogID = $("#billslog");
        // 不展示单据日志
        $billslogID.hide();
        return;
        //是否是草稿单
        if (isDraftOp != 1) {
            $billslogID.show();
        }
    }
    //添加空行
    function kongRow(){
        var $grid = dataGrid.$grid;
        $grid.delRowData('dataGrid_addRowId');
        dataGrid.addKongRow();
        $grid.delRowData(MyEiditGrid.getMaxRowid($grid));
        gridSum()
    }
    var frozenFlag=false
    //打开串号模态框
    function openImeiInputModal(gridId, rowid) {
        var $gridId=$("#"+gridId)
        $gridId.jqGrid('saveCell',lastrow,lastcell);
        var currRow = $gridId.jqGrid('getRowData', rowid);
        $('#valuationMethodsLabel').text('串号详情-'+currRow.goodsName)
        valuationMethodsGrid.clearDataGrid();
        valuationMethodsGrid.$grid.setGridParam({data: JSON.parse(currRow.imeiList), rowNum: 10000}).trigger('reloadGrid').resize();
        valuationMethodsGridSum()
        $('#valuationMethodsModal').modal('show')
        if(frozenFlag==false) {
            setTimeout(function () {
                if (frozenFlag == false) {
                    valuationMethodsGrid.$grid.setGridParam({cellEdit: false})
                    $('#valuationMethodsGrid').jqGrid('setFrozenColumns');
                    frozenFlag = true
                    valuationMethodsGrid.$grid.setGridParam({cellEdit: true})
                }
            },150)
        }
    }
    /*
    合计
    isSum :是否需要计算串号明细
     */
    function gridSum(isSum){
        var $grid= dataGrid.$grid;
        var ids = $grid.getDataIDs();
        $.each(ids, function (i, keyId) {
            var currRow = $grid.jqGrid('getRowData', keyId);
            $("#dataGrid #" +  keyId+ " td[aria-describedby='dataGrid_goodsNumber']").removeClass('valuationMethodsIcon1').removeClass('valuationMethodsIcon2')
            //是否 为
            if (currRow.valuationMethods == '1') {
                $grid.jqGrid('setCell', keyId, "goodsNumber", '', 'valuationMethodsIcon1');
            } else if(currRow.valuationMethods == '2'){
                $grid.jqGrid('setCell', keyId, "goodsNumber", '', 'valuationMethodsIcon2');
                $grid.jqGrid('setCell', keyId, "costPrice", '-');
                $grid.jqGrid('setCell', keyId, "rePriceCost", '-');
            }


        });
        // 计算差额，保价后
        if((lastcell==5||lastcell==6)&&$.trim(isSum)=="1"){
            var keyId=$grid.jqGrid('getGridParam','selrow');
            var currRow = $grid.jqGrid('getRowData', keyId);
            gridImeiListSum(currRow,keyId)
        }
        //汇总
        var goodsNumber = $grid.getCol('goodsNumber', false, 'sum').toFixed(2);
        var costPrice = $grid.getCol('costPrice', false, 'sum').toFixed(2);
        var rePriceBalance =$grid.getCol('rePriceBalance', false, 'sum').toFixed(2);
        var rePriceCost = $grid.getCol('rePriceCost', false, 'sum').toFixed(2);
        $grid.footerData("set", {
            rn: "合计",
            goodsNumber: goodsNumber,
            costPrice: costPrice,
            rePriceBalance: rePriceBalance,
            rePriceCost: rePriceCost,
        });
    }
    //合计串号
    function gridImeiListSum(currRow,keyId) {
        var $grid= dataGrid.$grid;
        //6选择差额，  5:选择：保价后金额，
        if($.trim(currRow.goodsId)!="" && $.trim(currRow.valuationMethods)=="1"){
            //计算保价后
            if(lastcell==5){
                var rePriceBalance = Number(currRow.costPrice) - Number(currRow.rePriceCost);
                $grid.jqGrid('setCell', keyId, "rePriceBalance", Number(rePriceBalance).toFixed(2));
            }
            //计算差额
            else{
                var rePriceCost = Number(currRow.costPrice) - Number(currRow.rePriceBalance);
                $grid.jqGrid('setCell', keyId, "rePriceCost", Number(rePriceCost).toFixed(2));
            }
            currRow = $grid.jqGrid('getRowData', keyId);
            var imeiList=JSON.parse(currRow.imeiList);
            //详细差额
            var rePriceBalance;
            if(currRow.goodsNumber==0){
                rePriceBalance=0;
            }else{
                rePriceBalance=Math.floor((Number(currRow.rePriceBalance)/currRow.goodsNumber)*100)/100;
            }
            //最后的差额
            var yuE=(Number(currRow.rePriceBalance)-Number(rePriceBalance)*currRow.goodsNumber).toFixed(2)
            for(var i=0;i<imeiList.length;i++){
                var item=imeiList[i];
                item.rePriceBalance=rePriceBalance
                if(i==imeiList.length-1){
                    item.rePriceBalance=(Number(rePriceBalance)+Number(yuE)).toFixed(2)
                }
                item.rePriceCost=(Number(item.costPrice)-Number(item.rePriceBalance)).toFixed(2)

            }
            $grid.jqGrid('setCell', keyId, "imeiList", JSON.stringify(imeiList));
        }
    }
    //合计
    function valuationMethodsGridSum(){
        var $grid= valuationMethodsGrid.$grid;
        //汇总每一行
        var ids = $grid.getDataIDs();
        $.each(ids, function (i, value) {
            var currRow = $grid.jqGrid('getRowData', value);
            if(lastcellImei==9){
                var rePriceCost = Number(currRow.costPrice) - Number(currRow.rePriceBalance); //保价后金额
                $grid.jqGrid('setCell', value, "rePriceCost", Number(rePriceCost).toFixed(2));
            }else{
                var rePriceBalance = Number(currRow.costPrice) - Number(currRow.rePriceCost); //差额
                $grid.jqGrid('setCell', value, "rePriceBalance", Number(rePriceBalance).toFixed(2));
            }
        });
        //汇总
        var costPrice = $grid.getCol('costPrice', false, 'sum').toFixed(2);
        var rePriceBalance =$grid.getCol('rePriceBalance', false, 'sum').toFixed(2);
        var rePriceCost = $grid.getCol('rePriceCost', false, 'sum').toFixed(2);
        $grid.footerData("set", {
            rn: "合计",
            imei: ids.length+"（台）",
            costPrice: costPrice,
            rePriceBalance: rePriceBalance,
            rePriceCost: rePriceCost,
        });
    }
    //获取默认值
    function getDefaultValues(){
        var obj={
            success:function(data){
                var deSe=data.data.defaultSection;
                var deEm=data.data.defaultEmployee;
                $('#sectionName').val(deSe.name)
                $('#billsHeaderForm input[name="sectionId"]').val(deSe.sectionId)
                $('#managerName').val(deEm.name).data('id',deEm.employeeId)
                $('#billsHeaderForm input[name="managerId"]').val(deEm.employeeId)
            }
        }
        InterfaceInventory.common.getDefaultValues(obj);
    }
    //往来单位余额
    function initWLDWamount(id) {
        var obj={
            data:{
                contactUnitId:id,
            },
            success:function (data) {
                var amount = data.data.contactUnitAmountVo;
                $("#yingfAmount").val(amount.shouldPayBalance.toFixed(2));
                $("#yufAmount").val(amount.prePayBalance.toFixed(2));
            }
        }
        InterfaceInventory.common.getContactUnitAmountVo(obj)
    }
    //获取保存参数
    function getParams() {
        var $grid= dataGrid.$grid;
        $grid.jqGrid("saveCell", lastrow, lastcell);
        //主表
        var params = $("#billsHeaderForm").toJsonObject();
        //明细数据
        var detailList=[];
        var List = dataGrid.getGridDataList();
        for(var i=0;i<List.length;i++){
            var item=List[i];
            if(item.goodsId!=''){
                var imeiList=JSON.parse(item.imeiList);
                var arr=[];
                for(var j=0;j<imeiList.length;j++){
                        var imeiItem=imeiList[j];
                        arr.push({
                            storageId:imeiItem.storageId,
                            goodsId:imeiItem.goodsId,
                            remark:imeiItem.remark,
                            purchaseDate:imeiItem.purchaseDate,
                            inStorageDate:imeiItem.inStorageDate,
                            purchasePrice:imeiItem.purchasePrice,
                            inStoragePrice:imeiItem.inStoragePrice,
                            costPrice:imeiItem.costPrice,
                            rePriceCost:imeiItem.rePriceCost,
                            rePriceBalance:imeiItem.rePriceBalance,
                            imeiId:imeiItem.imeiId,
                            imei:imeiItem.imei,
                            auxiliaryImei :imeiItem.auxiliaryImei,
                        })
                    }
                detailList.push({
                    goodsId:item.goodsId,
                    goodsName:item.goodsName,
                    valuationMethods:item.valuationMethods,
                    goodsNumber:item.goodsNumber,
                    remark:item.remark,
                    costPrice:item.costPrice,
                    rePriceCost:item.rePriceCost,
                    rePriceBalance:item.rePriceBalance,
                    imeiList:arr
                })
            }
        }
        return {
            id:params.id,
            sectionId: params.sectionId,
            contactsunitId: params.contactsunitId,
            billsDate: $("#billsBeginDateStr").val(),
            managerId: params.managerId,
            remark: params.remark,
            detailList: detailList,
        };
    }
    //检查参数
    function checkParam(params) {
        if(params.detailList.length<1){
            $.zxsaas_plus.showalert("提示","没有商品明细！");
            return true
        }else{
            for(var i=0;i<params.detailList.length;i++){
                var item=params.detailList[i];
                if(item.goodsId!=''){
                    if(Number(item.rePriceCost)<0){
                        $.zxsaas_plus.showalert("提示",'商品：<'+item.goodsName+'>保后财务成本总额不能小于0');
                        return true
                    }
                    if(Number(item.rePriceCost)<0){
                        $.zxsaas_plus.showalert("提示",'商品：<'+item.goodsName+'>保后财务成本总额不能小于0');
                        return true
                    }
                    if(item.valuationMethods==1){
                        var imeiList=item.imeiList;
                        for(var j=0;j<imeiList.length;j++){
                            var imeiItem=imeiList[j];
                            if(Number(imeiItem.rePriceCost)<0){
                                $.zxsaas_plus.showalert("提示",'商品：<'+item.goodsName+'>明细保后财务成本总额不能小于0');
                                return true
                            }
                        }
                    }
                }
            }
        }
    }
    //分页查询ajax请求
    function pageAjax(param,callbackObj) {
        var locaParam={
            'isDraftOp':isDraftOp
        }
        var exParam=$.extend(false,locaParam,param)
       $.ajaxPackage({
           type:'get',
           contentType:'application/json',
           url:'/manager/inventory/fund/supplier/reprice/searchRepriceDetail',
           data:exParam,
           success:function(data){
               if (data.result == 1) {
                   var mainVo=data.data.mainVo;
                   clearAllData()
                   if (mainVo != null) {
                       fillTopData(mainVo)
                       fillTable(mainVo.detailList||[])
                       checkBillsStatus(mainVo)
                       reloadMenuBtn()
                       isBillslogShow()
                   }else {
                       $.zxsaas_plus.showalert('提示', "没有查询到单据!");
                   }
                   if(callbackObj){
                       callbackObj(data)
                   }
               }
           }
       })
    }
    ////清空数据
    function clearAllData(){
        dataGrid.$grid.jqGrid('clearGridData');
        $("#billsHeaderForm")[0].reset();
    }
    //填充表头（主信息数据）
    function fillTopData(billsHeader) {
        $("#billsHeaderForm").writeJson2Dom(billsHeader);
        $("#bottomForm").writeJson2Dom(billsHeader);
    }
    //填充表体（信息数据）
    function fillTable(detailList) {
        if(detailList!=undefined && detailList.length>0){
            for(var i=0;i<detailList.length;i++){
                detailList[i].imeiList=JSON.stringify(detailList[i].imeiList)
                dataGrid.$grid.jqGrid('addRowData', i+1,detailList[i], 'last');
            }
        }
        gridSum()
    }
    //检查单据状态
    function checkBillsStatus(mainVo) {
        //1 草稿 6 过账 7 红冲
        var billsStatus=mainVo.billsStatus
        var isAudit=mainVo.isAudit
        if(billsStatus==1){
            isDraftOp=true
            $('.rightMap img').removeAttr("src");
        }else{
            isDraftOp=false;
            var $searchFormID = $("#billsHeaderForm");
            $.ajaxPackage({
                url:'/manager/inventory/fund/supplier/reprice/getBillsLog',
                data:{mainId:$searchFormID.find("input[name='id']").val()},
                success:function (data) {
                    new logMes("#billslog",{
                        list:data.data.billsLogList
                    });
                }
            })

            if(billsStatus==6){
                $('.rightMap img:eq(0)').attr('src', '/manager/images/guozhang.png');
            }else if(billsStatus==7){
                $('.rightMap img:eq(0)').attr('src', '/manager/images/status/statusRed.png');
            }
            if(isAudit==1){
                $('.rightMap img:eq(1)').attr('src', '/manager/images/audit.png');
            }else{
                $('.rightMap img:eq(1)').attr('src', '/manager/images/auditNo.png');
            }
        }
        loadBillsStatusByIsDraftOp()
    }
    //根据 单据类型 显示，隐藏 按钮
    function loadBillsStatusByIsDraftOp() {
        var importWrap = $('.importWrap');
        var billsCodeWrap = $('#billsCodeWrap');
        var valuationMethodsDel = $('.valuationMethodsDel');
        var button  =  $("#billsHeaderForm :button");
        var rightMap  =  $(".rightMap");

        //是否是草稿单
        if(isDraftOp==true){
            importWrap.show()
            valuationMethodsDel.show()
            button.show()
            billsCodeWrap.hide()
            rightMap.hide()
            dataGrid.$grid.setGridParam().showCol("op");
            valuationMethodsGrid.$grid.setGridParam().showCol("op");

            dataGrid.addKongRow();
            dataGrid.$grid.delRowData(MyEiditGrid.getMaxRowid(dataGrid.$grid));
        }
        else {
            importWrap.hide()
            valuationMethodsDel.hide()
            button.hide()
            billsCodeWrap.show()
            rightMap.show()
            dataGrid.$grid.setGridParam().hideCol("op");
            valuationMethodsGrid.$grid.setGridParam().hideCol("op");
        }
        dataGrid.$grid.setColProp("goodsNumber", {editable: isDraftOp});
        dataGrid.$grid.setColProp("rePriceBalance", {editable: isDraftOp});
        dataGrid.$grid.setColProp("rePriceCost", {editable: isDraftOp});
        dataGrid.$grid.setColProp("goodsName", {editable: isDraftOp});
        valuationMethodsGrid.$grid.setColProp("rePriceBalance", {editable: isDraftOp});
        valuationMethodsGrid.$grid.setColProp("rePriceCost", {editable: isDraftOp});
    }
    //初始化 出库串号
    function initImeiDr(){
        imeiDr(); //串号导入
        $('.imeiImport').click(function(){
            var contactsunitId=$.trim($('#billsHeaderForm input[name="contactsunitId"]').val())
            if(contactsunitId==""){
                $.zxsaas_plus.showalert('warning','请选择往来单位!');
                return;
            }
            $('#imeiDr-modal').modal('show');
            $('.imeiDr_vone,.imeiDr_vtwo').val('');
            $('.imeiDr_num').text(0);
            $("#imeiDrGrid").clearGridData().resize().trigger('reloadGrid')
        })
        // 导入（按钮）
        $('.imeiDr_import').click(function(){
            $(".imeiDr_vtwo").val('');
            //拿到外层表格串号
            var contactsunitId = $('#billsHeaderForm input[name="contactsunitId"]').val();
            var ids = $('#dataGrid').getDataIDs();
            var arrs = [];
            $.each(ids,function(i,index){
                var row = $('#dataGrid').getRowData(index);
                var idJoin = row.imeiList.split(',');
                $.each(idJoin,function(j,item){
                    arrs.push(item+'_'+index);
                });
            })
            //开始添加串号
            var vone = $('.imeiDr_vone').val();
            var v1 = vone.split("\n");
            var str = '',vtr = '',arrn = [];
            var a1 = $("#imeiDrGrid").getCol('imei');
            var a2 = $("#imeiDrGrid").getCol('auxiliaryImei');
            $.each(v1,function(i,item){
                var toval = item.trim().toUpperCase();
                if(toval == ""){
                    return
                }
                if(a1.indexOf(toval) == -1 && a2.indexOf(toval) == -1){
                    str+=toval+';'
                    arrn.push(toval);
                    a1.push(toval);
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
                    'menuCode':$('#MenuTool').data('code'),
                    'contactUnitId':contactsunitId,
                    'imeiInputData': str
                },
                success: function (data) {
                    if(data.result==1){
                        var failed = data.data.failedResultList;
                        var list = data.data.successResultList;
                        var  exsitJqImeiData = $("#imeiDrGrid").getGridParam().data;
                        var ImeiData=exsitJqImeiData.concat(list)
                        $("#imeiDrGrid").setGridParam({data:ImeiData}).trigger('reloadGrid');
                        var num = $('#imeiDrGrid').getDataIDs();
                        $('.imeiDr_num').text(num.length);
                        var txt = $(".imeiDr_vtwo").val();
                        $.each(failed,function(i,item){
                            txt += item+'\n';
                        })
                        $(".imeiDr_vtwo").val(txt);
                    }else{
                        $.zxsaas_plus.showalert("error",data.desc);
                    }
                },
                error: function (msg) {
                    $.zxsaas_plus.showalert("error","！" + msg);
                }
            });
        })
        // 确认（按钮）
        $('.imeiDr_sure').click(function(){
            $('#imeiDr-modal').modal('hide');
            $('#dataGrid').jqGrid('saveCell',lastrow,lastcell);
            var dataIds = $('#dataGrid').getDataIDs();
            var num = dataIds.length;
//    	临时存储串号作对比
            var t1 = [],t2 = [],t3 = [],t4 = [],t5 = [];
            $.each(dataIds,function(i,index){
                var dataRow = $('#dataGrid').getRowData(index);
                t2.push(dataRow.goodsId);
                t3.push(index);
                t4.push(dataRow.storageId);
                t5.push(dataRow.code);
                var idJoin = dataRow.imeiList.split(',');
                $.each(idJoin,function(j,item){
                    t1.push(item+'_'+index);
                });
            });
//    	循环表格数据添加
            var ids = $("#imeiDrGrid").getDataIDs();
            $.each(ids,function(i,item){
                var row = $('#imeiDrGrid').getRowData(item);
                var imeiList=[{
                    'goodsId':row.goodsId,
                    'purchaseDate':row.purchaseDate,
                    'purchasePrice':row.purchasePrice,
                    'imei':row.imei,
                    'auxiliaryImei':row.auxiliaryImei,
                    'costPrice':row.costPrice,
                    'rePriceCost':row.costPrice,
                    'rePriceBalance':0,
                    'remark':row.remark,
                    'inStorageDate':row.inStorageDate,
                    'inStoragePrice':row.inStoragePrice,
                    'storageName':row.storageName,
                    'storageId':row.storageId,
                    'imeiId':row.imeiId,
                }];
                var addRow=function () {
                    $.each(ids,function(i,val){
                        var rowData=$('#dataGrid').jqGrid("getRowData",val);
                        if(rowData.goodsId==''){
                            $('#dataGrid').jqGrid('delRowData', val);
                        }
                    })
                    dataGrid.addKongRow()
                    var dataIds = $("#dataGrid").getDataIDs();
                    var num = dataIds.length;
                    var id=dataIds[num-1]
                    $('#dataGrid').setRowData(id,{
                        goodsId: row.goodsId,
                        goodsName: row.name,
                        costPrice: row.costPrice,
                        rePriceCost: row.costPrice,
                        remark: row.remark,
                        models: row.models,
                        color: row.color,
                        goodsNumber:1,
                        configure: row.configure,
                        imeiList: JSON.stringify(imeiList),
                        valuationMethods:row.valuationMethods,
                    });

                    t1.push(row.imeiId+'_'+id);
                    t2.push(row.goodsId);
                    t3.push(id);
                    t4.push(row.storageId);
                    t5.push(row.code);
                }
                if(t2.length <= 0){
                    addRow()
                }else{
//				判断商品是否存在
                    if(t2.indexOf(row.goodsId) == -1){
                        addRow()
                    }
                    else{
                        var sign = t2.indexOf(row.goodsId);
                        var existRow = $('#dataGrid').getRowData(t3[sign]);
                        var opt='';
                        if(existRow.imeiList == ""){
                             opt = imeiList;
                        }
                        else{
                            var idxImeiList =JSON.parse(existRow.imeiList);
                            var arrval=[];//主串，辅串
                            for(var m=0;m<idxImeiList.length;m++){
                                var idxImeiItem = idxImeiList[m];
                                if($.trim(idxImeiItem.imeiId)!=''){
                                    arrval.push(idxImeiItem.imeiId.toString())
                                }
                            }
                            //	判断是否已存在
                            if($.inArray(row.imeiId.toString(),arrval)==-1){
                                idxImeiList.push(imeiList[0])
                                opt = idxImeiList
                            }
                            else{
                                //存在直接返回
                                return
                            }
                        }

                        var allprice=Number(Number(existRow.costPrice)+Number(row.costPrice)).toFixed(2);
                        var reprice=Number(Number(allprice)-Number(existRow.rePriceBalance)).toFixed(2);
                        $('#dataGrid').setRowData(t3[sign],{
                            goodsNumber: opt.length,
                            costPrice:allprice,
                            rePriceCost:reprice,
                            imeiList:  JSON.stringify(opt)
                        });
                    }
                }
            })
            gridSum()
        })
        //出库串号
        $('#otherOutstroNumIdStr').inputCombination().keyup(function(e){
            if(e.keyCode==13&&$(this).val()!=''){
                $('#dataGrid').jqGrid("saveCell", lastrow, lastcell);
                var _this=$(this).blur();
                _this.blur();
                var contactsunitId=$.trim($('#billsHeaderForm input[name="contactsunitId"]').val())
                if(contactsunitId==""){
                    $.zxsaas_plus.showalert('warning','请选择往来单位!');
                    return;
                }
                var ids=$('#dataGrid').jqGrid("getDataIDs");
                $.each(ids,function(i,val){
                    var rowData=$('#dataGrid').jqGrid("getRowData",val);
                    if(rowData.goodsId=='')$('#dataGrid').jqGrid('delRowData', val);
                })
                $.request({
                    type:'post',
                    url:basePath+'/inventory/common/getStockGoodsImeiVoList',
                    dataType:'json',
                    data:{
                        'menuCode':$('#MenuTool').data('code'),
                        'contactUnitId':contactsunitId,
                        'queryKey':$(this).val()
                    },
                    success:function(data){
                        if(data.result==1){
                            var resArr=data.data.goodsImeiVoList;
                            if(!resArr.length){
                                $.zxsaas_plus.showalert('warning','条目为空！');
                            }else{
                                $.each(resArr,function(i,val){
                                    var appendSwitch=false;
                                    var ids=$('#dataGrid').getDataIDs();

                                    var imeiItem={
                                        'goodsId':val.goodsId,
                                        'purchaseDate':val.purchaseDate,
                                        'purchasePrice':val.purchasePrice,
                                        'imei':val.imei,
                                        'auxiliaryImei':val.auxiliaryImei,
                                        'costPrice':val.costPrice,
                                        'rePriceCost':val.costPrice,
                                        'rePriceBalance':0,
                                        'remark':val.remark,
                                        'inStorageDate':val.inStorageDate,
                                        'inStoragePrice':val.inStoragePrice,
                                        'storageName':val.storageName,
                                        'storageId':val.storageId,
                                        'imeiId':val.imeiId,
                                    }
                                    $.each(ids,function(j,rowid){
                                        var idxRowData=$('#dataGrid').jqGrid("getRowData",rowid);
                                        var goodsId=idxRowData.goodsId;//商品id
                                        var idxImeiList=JSON.parse(idxRowData.imeiList);//商品串号群明细
                                        var arrval=[];//主串，辅串
                                        for(var m=0;m<idxImeiList.length;m++){
                                            var idxImeiItem = idxImeiList[m];
                                            if($.trim(idxImeiItem.imeiId)!=''){
                                                arrval.push(idxImeiItem.imeiId.toString())
                                            }
                                        }
                                        var num=Number(idxRowData.goodsNumber);//数量
                                        if(val.goodsId==goodsId){
                                            appendSwitch=false;
                                            if($.inArray(val.imeiId.toString(),arrval)==-1){
                                                idxImeiList.push(imeiItem);
                                                var allprice=Number(Number(idxRowData.costPrice)+Number(val.costPrice)).toFixed(2);
                                                var reprice=Number(Number(allprice)-Number(idxRowData.rePriceBalance)).toFixed(2);
                                                $('#dataGrid').jqGrid("setCell",rowid,"goodsNumber",num+1);
                                                $('#dataGrid').jqGrid("setCell",rowid,"imeiList",JSON.stringify(idxImeiList));
                                                $('#dataGrid').jqGrid("setCell",rowid,"costPrice",allprice);
                                                $('#dataGrid').jqGrid("setCell",rowid,"rePriceCost",reprice);
                                            }
                                            return false;
                                        }
                                        else{//商品不同
                                            appendSwitch=true;
                                        }
                                    })
                                    if(!ids.length||appendSwitch){
                                        var maxId = ids.length == 0 ? 0 : Math.max.apply(null,ids);

                                        $('#dataGrid').jqGrid('addRowData', maxId + 1, {
                                            goodsName:val.name,
                                            goodsId:val.goodsId,
                                            models:val.models,
                                            color:val.color,
                                            configure:val.configure,
                                            valuationMethods:val.valuationMethods,
                                            goodsNumber:1,
                                            costPrice:val.costPrice,
                                            rePriceCost:val.costPrice,
                                            rePriceBalance:0,
                                            imeiList:JSON.stringify([imeiItem])
                                        });
                                    }
                                })
                            }
                            setTimeout(function(){
                                _this.val('').focus();
                            })
                            kongRow()
                        }else{
                            $.zxsaas_plus.showalert('error',data.desc);
                        }
                    },
                    error:function(){
                        alert('请求失败！')
                    }
                })

            }
        });
        //串号导入
        function imeiDr(opt){
            var def = {
                gridConfig: {
                    colNames: ['id','商品id','仓库id','仓库名称','商品类别', '操作', '串号', '辅助串号', '商品编码'
                        , '商品名称','商品品牌','型号','颜色', '备注','库存量','是否串号管理','税率','串号列表','引入订单表id'
                        ,'采购日期' ,'原财务成本' ,'采购价' ,'入库日期' ,'入库价','计价方式','配置'
                    ],
                    colModel: [
                        {name: 'imeiId', hidden: true},
                        {name: 'goodsId', index: 'goodsId', width: 1, align: 'center', sorttype: "string", hidden: true},
                        {name: 'storageId', index: 'storageId', width: 1, hidden: true},
                        {name: 'storageName', index: 'storageName', width: 1, hidden: true},
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
                        {name: 'salesOutstrorageImDraftList',hidden:true},
                        {name : 'orderDetailId',hidden:true},
                        {name : 'purchaseDate',hidden:true},
                        {name : 'costPrice',hidden:true},
                        {name : 'purchasePrice',hidden:true},
                        {name : 'inStorageDate',hidden:true},
                        {name : 'inStoragePrice',hidden:true},
                        {name : 'valuationMethods',hidden:true},
                        {name : 'configure',hidden:true},
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
                '<div style="height: 40px;line-height: 40px;">'+
                '<button type="button" class="erp-btn-lab mr15 imeiDr_import" >导入</button>' +
                '<button type="button" class="erp-btn-lab imeiDr_clear" >清空</button>' +
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
                '<button type="button" class="erp-btn-bg mr15 imeiDr_sure">确认</button>'+
                '<button type="button" class="erp-btn-lab" data-dismiss="modal">取消</button>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '</div>'
            );
            $("#imeiDrGrid").jqGrid({
                datatype : "local",
                mtype: "post",
                styleUI : 'Bootstrap',
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
    }
})
//jsp业务 调用
function openGoodsName() {
    var contactUnitId=$.trim($('#billsHeaderForm input[name="contactsunitId"]').val())
    if(contactUnitId===''){
        $.zxsaas_plus.showalert('提示', "请选择往来单位!");
        return
    }
    $('#dataGridGood').comModalsStoreFilterGoods('setOption',{
        'girdParam':{
            'queryKey':"",
            'typeId':"",
            'contactUnitId':contactUnitId,
            'menuCode':$('#AUTH').data('code'),
        }
    })
    $('#dataGridGood').next().trigger('click')
}
function imeiDelRow(id){
    $("#imeiDrGrid").delRowData(id);
    var num = $('#imeiDrGrid').getDataIDs();
    $('.imeiDr_num').text(num.length);
}