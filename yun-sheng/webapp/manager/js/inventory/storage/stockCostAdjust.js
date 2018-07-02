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
        initValuationMethodsGrid()
        initTopForm()
        initImeiDr()

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
                        var url='/manager/inventory/storage/cost/adjustment/saveDraftOrder/auth_add'
                        if(data.orderId!=''){
                            url='/manager/inventory/storage/cost/adjustment/saveDraftOrder/auth_update'
                        }
                        $.ajaxPackage({
                            url:url,
                            data:{order:JSON.stringify(data)},
                            success:function(data){
                                $.zxsaas_plus.showalert('success',data.desc || "保存成功！当前页面商品库存已锁！");
                                var  billsId=data.data.orderId;
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
                        var mainIds=  $.trim(params.orderId)
                        var billsStatus=  $.trim(params.billsStatus)
                        if(billsStatus!='1' || mainIds==""){
                            $.zxsaas_plus.showalert('提示','只能删除草稿单!');
                        }else{
                            $.zxsaas_plus.showconfirm('提示', "是否删除此草稿单？", function(){
                                $.ajaxPackage({
                                    type:'get',
                                    url:'/manager/inventory/storage/cost/adjustment/deleteDraftOrder',
                                    data:{'billsId':mainIds},
                                    success:function(data){
                                        $.zxsaas_plus.showalert('success',data.desc || "删除成功");
                                        isDraftOp=true
                                        pageAjax({'queryCodeStr':'L'})
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
                        var mainIds=  $.trim(params.orderId)
                        var billsStatus=  $.trim(params.billsStatus)
                        if(billsStatus!='1' || mainIds==""){
                            $.zxsaas_plus.showalert('提示','只能过账草稿单!');
                        }else{
                            $.ajaxPackage({
                                type:'get',
                                url:'/manager/inventory/storage/cost/adjustment/executePostOrder',
                                data:{'billsId':mainIds},
                                success:function(data){
                                    $.zxsaas_plus.showalert('success',data.desc || "过账成功");
                                    isDraftOp=false
                                    pageAjax({'billsId':mainIds})
                                }
                            })
                        }
                    }
                },
              /*  red:{
                    isShow: !isDraftOp,
                    click: function () {
                        var id = $("#billsHeaderForm input[name='orderId']").val();
                        var billsDateStr = $("#billsHeaderForm input[name='billsCode']").val();
                        if(id==""){
                            $.zxsaas_plus.showalert("提示","单据不存在");
                            return
                        }
                        codeDate(billsDateStr);
                        $('#redModal').modal('show');

                        function codeDate(obj){
                            var times = obj.split('-')[0];
                            var reg = /[A-Z]/g;
                            times = times.replace(reg,"");
                            times = times.replace(times.substr(0,4),times.substr(0,4)+'-');
                            times = times.replace(times.substr(0,7),times.substr(0,7)+'-');
                            $('.redTime').datePlu({
                                endDate:false,
                                minTime: times,
                                defaultTime: times
                            })
                        }
                    }
                },*/
                print:{
                    isShow: !isDraftOp,
                    click:function () {
                        var adjustmentType=$('#adjustmentType').val()
                        if(adjustmentType==1){
                            print('cost')
                        }else if(adjustmentType==2){
                            print('companyCost')
                        }else if(adjustmentType==3){
                            print('sectionCost')
                        }else if(adjustmentType==5){
                            print('allCost')
                        }
                    }
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
                        var mainIds=  $.trim(params.orderId)
                        var billsStatus=  $.trim(params.billsStatus)
                        var auditStatus=  $.trim(params.auditStatus)
                        if(billsStatus!='1' && mainIds!="" && auditStatus==0){
                            $.ajaxPackage({
                                type:'get',
                                url:'/manager/inventory/storage/cost/adjustment/executeAuditOrder',
                                data:{'billsId':mainIds,'status':1},
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
                        var mainIds=  $.trim(params.orderId)
                        var billsStatus=  $.trim(params.billsStatus)
                        var auditStatus=  $.trim(params.auditStatus)
                        if(billsStatus !='1' && mainIds!="" && auditStatus==1){
                            $.ajaxPackage({
                                type:'get',
                                url:'/manager/inventory/storage/cost/adjustment/executeAuditOrder',
                                data:{'billsId':mainIds,'status':0},
                                success:function(data){
                                    $.zxsaas_plus.showalert('success',data.desc || "取消稽核成功");
                                    isDraftOp=false
                                    pageAjax({'billsId':mainIds})
                                }
                            })
                        }else{
                            $.zxsaas_plus.showalert('提示','只能对已稽核单据取消稽查!');
                        }
                    }
                },
                update:{
                    isShow: !isDraftOp,
                    click: function () {
                        var $grid= dataGrid.$grid;
                        $grid.jqGrid("saveCell", lastrow, lastcell);
                        var data=getParams()
                        $.ajaxPackage({
                            url:'/manager/inventory/storage/cost/adjustment/updateOfficialOrder',
                            data:{'order':JSON.stringify(data)},
                            success:function(data){
                                $.zxsaas_plus.showalert('success',data.desc || "修改备注成功！");
                                isDraftOp=false
                                pageAjax({'billsId':data.data.orderId})
                            }
                        })
                    }
                }
            },
            btnGroupRight: {
                history: {
                    isShow: true,
                    click: function () {
                        window.parent.openWorkBoxByMenutext("库存成本调整单据列表",  '/manager/inventory/storage/cost/adjustment/orderList', true);
                    }
                }
            }
        };
        menuBtn = new componentMenuBtn("#MenuTool", option);
        //保存红冲按钮
        $(".redSave").on("click",function(){
            var params = $("#billsHeaderForm").toJsonObject();
            var mainIds=  $.trim(params.orderId)
            var param={
                billsId:mainIds,
                redDateStr:$(".redTime").val()
            };
            $.request({
                url:"/manager/inventory/storage/cost/adjustment/executeRedOrder",
                type : 'POST',
                dataType: "json",
                data:param,
                success:function(data){
                    if(data.result==1){
                        $.zxsaas_plus.showalert("提示",data.desc || "红冲成功");
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
            var id = $("#billsHeaderForm input[name='orderId']").val();
            if(id==""){
                $.zxsaas_plus.showalert("提示","单据不存在");
                return
            }
            $.printBills('/manager/inventory/storage/cost/adjustment/print',
                {
                    'billsId': id,
                    'printType': tempKind,
                }
            );
        }
    }
    //重载菜单组件
    function reloadMenuBtn() {
        var updateKey=['print','red','copy','update','audit','auditCancle'];
        var addkey=['draftPost','draftDel','draftSave'];
        var params = $("#billsHeaderForm").toJsonObject();
        var billsStatus=  $.trim(params.billsStatus)
        var auditStatus=  $.trim(params.auditStatus)
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
            //单据：稽查状态
            if(auditStatus==1){
                //启用：取消稽查，禁用：稽查
                menuBtn.setDisabledbtn("audit");
                menuBtn.setUndisabledbtn("auditCancle");
            }else{
                //启用：稽查，禁用：取消稽查
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
        $("#billsHeaderForm input[name='orderId']").val('')

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
            var goodsId=[];
            for(var i=0;i<goodsList.length;i++){
                goodsId.push(goodsList[i].dataId);
            }
            var obj={
                menuCode:$('#AUTH').data('code'),
                adjustmentType:$('#adjustmentType').val(),
                goodsId:goodsId.join(',')
            }
            $.ajaxPackage({
                'url':'/manager/component/goods/getStockImeiVoList',
                'data':obj,
                'success':function(data){
                    var ajList=data.data.dataList;
                    var $grid = dataGrid.$grid;
                    var cIndex;
                    for(var i=0;i<goodsList.length;i++){
                        var goods = goodsList[i];
                        goods.imeiList=[]
                        goods.costAmount=0
                        goods.costAmountAfter=0
                        goods.costAmountBalance=0
                        goods.companyCostAmount=0
                        goods.companyCostAmountAfter=0
                        goods.companyCostAmountBalance=0
                        goods.sectionCostAmount=0
                        goods.sectionCostAmountAfter=0
                        goods.sectionCostAmountBalance=0
                        goods.goodsNumber=0
                        for(var j=0;j<ajList.length;j++){
                            var ajItem = ajList[j];
                            if(goods.dataId==ajItem.goodsId){
                                var num=Number(ajItem.stockCount)
                                ajItem.costAmount=Number(ajItem.costPrice)*num; //保后财务成本
                                ajItem.costAmountBalance=0; //财务成本保价差额
                                ajItem.costAmountAfter=ajItem.costAmount; //保后财务成本

                                ajItem.companyCostAmount=Number(ajItem.companyCostPrice)*num; //保后公司成本
                                ajItem.companyCostAmountBalance=0; //公司成本差额
                                ajItem.companyCostAmountAfter=ajItem.companyCostAmount; //保后公司成本

                                ajItem.sectionCostAmount=Number(ajItem.sectionCostPrice)*num; //保后部门成本
                                ajItem.sectionCostAmountBalance=0; //部门成本保价差额
                                ajItem.sectionCostAmountAfter=ajItem.sectionCostAmount; //保后部门成本
                                ajItem.goodsNumber=num;
                                ajItem.inStorageDateStr=ajItem.inStorageDate;
                                ajItem.purchaseDateStr=ajItem.purchaseDate;

                                goods.imeiList.push(ajItem)
                                goods.costAmount+=Number(ajItem.costAmount)
                                goods.companyCostAmount+=Number(ajItem.companyCostAmount)
                                goods.sectionCostAmount+=Number(ajItem.sectionCostAmount)
                                goods.goodsNumber+=Number(ajItem.goodsNumber);
                            }
                        }
                        goods.costAmountAfter=Number(goods.costAmount)
                        goods.companyCostAmountAfter=Number(goods.companyCostAmount)
                        goods.sectionCostAmountAfter=Number(goods.sectionCostAmount)
                    }


                    for(var i=0;i<goodsList.length;i++){
                        var goods = goodsList[i];
                        if(Number(goods.goodsNumber)>0){
                            var dataRow ={
                                'goodsName':goods.name,
                                'goodsId':goods.dataId,
                                'models':goods.models,
                                'color':goods.color,
                                'configure':goods.configure,
                                'valuationMethods':goods.valuationMethods,
                                'imeiList':JSON.stringify(goods.imeiList),
                                'goodsNumber':goods.goodsNumber,
                                'costAmount': Number(goods.costAmount),
                                'costAmountAfter': Number(goods.costAmountAfter),
                                'costAmountBalance':Number(goods.costAmountBalance),
                                'companyCostAmount': Number(goods.companyCostAmount),
                                'companyCostAmountAfter': Number(goods.companyCostAmountAfter),
                                'companyCostAmountBalance':Number(goods.companyCostAmountBalance),

                                'sectionCostAmount': Number(goods.sectionCostAmount),
                                'sectionCostAmountAfter': Number(goods.sectionCostAmountAfter),
                                'sectionCostAmountBalance':Number(goods.sectionCostAmountBalance),
                            };
                            cIndex=MyEiditGrid.getMaxRowid($grid) + 1;
                            $grid.jqGrid('addRowData', cIndex, dataRow);
                        }
                    }
                    kongRow()
                    var ids = $('#dataGrid').getDataIDs();
                    $.each(ids,function(i,keyId){
                        var currRow = $('#dataGrid').getRowData(keyId);
                        for(var j=0;j<3;j++){
                            if(i==0){
                                lastcell=5

                            }else if(i==1){
                                lastcell=8
                            }else{
                                lastcell=11
                            }
                            gridImeiListSum(currRow,keyId)
                        }
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
        //调整原因
        InterfaceInventory.common.getCostAdjustmentReasonVoList({
            async:false,
            success:function(data){
                var res=data.data.reasonVoList;
                var html='';
                $.each(res,function(i,val){
                    html+='<option value="'+val.reasonId+'">'+val.name+'</option>';
                })
                $('#reasonId').html(html)
            }
        })
        //调整成本种类
        $('#adjustmentType').on('change',function () {
            var $this=$(this)
            var dataGridDesc=$('#dataGridDesc')
            var costAmountArr=['costAmount','costAmountBalance','costAmountAfter']
            var companyCostAmountArr=['companyCostAmount','companyCostAmountAfter','companyCostAmountBalance']
            var sectionCostAmountArr=['sectionCostAmount','sectionCostAmountAfter','sectionCostAmountBalance']
            dataGrid.$grid.setGridParam().hideCol(costAmountArr).hideCol(companyCostAmountArr).hideCol(sectionCostAmountArr)
            var key=$this.val()
            if(key==1){//财务成本
                dataGrid.$grid.setGridParam().showCol(costAmountArr)
                dataGridDesc.text('说明:可调整所有在库商品')
            }else{
                dataGridDesc.text('说明:仅可调整个别计价在库串号商品')
                if(key==2){//公司成本
                    dataGrid.$grid.setGridParam().showCol(companyCostAmountArr)
                }else if(key==3){//部门成本
                    dataGrid.$grid.setGridParam().showCol(sectionCostAmountArr)
                }else{//财务成本+公司成本+部门成本
                    dataGrid.$grid.setGridParam().showCol(costAmountArr).showCol(companyCostAmountArr)
                }
            }
        })
        //开启一键均价
        $('#averagPrice').on('change',function (){
            var $this= $(this)
            var flag=$this.is(":checked")
            dataGrid.$grid.jqGrid('saveCell',lastrow,lastcell);
            valuationMethodsGrid.$grid.jqGrid('saveCell',lastrowImei,lastcellImei);
            dataGrid.$grid.setColProp('costAmount',{editable: !flag})
            dataGrid.$grid.setColProp('costAmountBalance',{editable: !flag})
            dataGrid.$grid.setColProp('costAmountAfter',{editable: !flag})
            dataGrid.$grid.setColProp('companyCostAmount',{editable: !flag})
            dataGrid.$grid.setColProp('companyCostAmountAfter',{editable: !flag})
            dataGrid.$grid.setColProp('companyCostAmountBalance',{editable: !flag})
            dataGrid.$grid.setColProp('sectionCostAmount',{editable: !flag})
            dataGrid.$grid.setColProp('sectionCostAmountAfter',{editable: !flag})
            dataGrid.$grid.setColProp('sectionCostAmountBalance',{editable: !flag})
            valuationMethodsGrid.$grid.setColProp('costAmount',{editable: !flag})
            valuationMethodsGrid.$grid.setColProp('costAmountBalance',{editable: !flag})
            valuationMethodsGrid.$grid.setColProp('costAmountAfter',{editable: !flag})
            valuationMethodsGrid.$grid.setColProp('companyCostAmount',{editable: !flag})
            valuationMethodsGrid.$grid.setColProp('companyCostAmountAfter',{editable: !flag})
            valuationMethodsGrid.$grid.setColProp('companyCostAmountBalance',{editable: !flag})
            valuationMethodsGrid.$grid.setColProp('sectionCostAmount',{editable: !flag})
            valuationMethodsGrid.$grid.setColProp('sectionCostAmountAfter',{editable: !flag})
            valuationMethodsGrid.$grid.setColProp('sectionCostAmountBalance',{editable: !flag})
            if(flag){
                var $grid= dataGrid.$grid;
                var ids = $grid.getDataIDs();
                $.each(ids,function(i,keyId){
                    var rowData =$grid.getRowData(keyId);
                    for(var j=0;j<3;j++){
                        if(j==0){
                            lastcell=5
                            $grid.jqGrid('setCell', keyId, "costAmountBalance",0);
                        }else if(j==1){
                            lastcell=8
                            $grid.jqGrid('setCell', keyId, "companyCostAmountBalance",0);
                        }else{
                            lastcell=11
                            $grid.jqGrid('setCell', keyId, "sectionCostAmountBalance",0);
                        }
                        gridImeiListSum(rowData,keyId,1)
                    }
                })
                gridSum()
            }
        })

        $('#adjustmentType').trigger('change')
    }
    // 初始化表格
    function initTable(){
        //配置
        var paras = {
            gridId: 'dataGrid',
            colNames: [ '<i class="bitianX">*</i>商品名称', '<i class="bitianX">*</i>串号（数量）',
                '原财务成本总额', '<i class="bitianX">*</i>调整财务成本总差额', '<i class="bitianX">*</i>调后财务成本总额',
                '原公司成本总额', '<i class="bitianX">*</i>调整公司成本总差额', '<i class="bitianX">*</i>调后公司成本总额',
                '原部门成本总额', '<i class="bitianX">*</i>调整部门成本总差额', '<i class="bitianX">*</i>调后部门成本总额',
                 '备注', '型号', '颜色', '配置','商品id','计价方式','串号列表','单据id'],
            colModel: [
                {name: 'goodsName', width: 150, align: 'left', edittype: 'custom_bt_input', custom_element_bt_click: "openGoodsName",editable: true},
                {name: 'goodsNumber', width: 150, align: 'right' ,formatter: 'integer'},

                {name: 'costAmount', width: 150,formatter: 'number', align: 'right'},
                {name: 'costAmountBalance', width: 150, editable: true, align: 'right' ,formatter: 'number', editoptions:{
                    dataEvents: [{
                        type: "focus",
                        fn: function(){
                            this.select()
                        }
                    }]
                }},
                {name: 'costAmountAfter', width: 150, editable: true, align: 'right' ,formatter: 'number', editoptions:{
                    dataEvents: [{
                        type: "focus",
                        fn: function(){
                            this.select()
                        }
                    }]
                }},

                {name: 'companyCostAmount', width: 150,formatter: 'number', align: 'right'},
                {name: 'companyCostAmountBalance', width: 150, editable: true, align: 'right' ,formatter: 'number', editoptions:{
                    dataEvents: [{
                        type: "focus",
                        fn: function(){
                            this.select()
                        }
                    }]
                }},
                {name: 'companyCostAmountAfter', width: 150, editable: true, align: 'right' ,formatter: 'number', editoptions:{
                    dataEvents: [{
                        type: "focus",
                        fn: function(){
                            this.select()
                        }
                    }]
                }},

                {name: 'sectionCostAmount', width: 150,formatter: 'number', align: 'right'},
                {name: 'sectionCostAmountBalance', width: 150, editable: true, align: 'right' ,formatter: 'number', editoptions:{
                    dataEvents: [{
                        type: "focus",
                        fn: function(){
                            this.select()
                        }
                    }]
                }},
                {name: 'sectionCostAmountAfter', width: 150, editable: true, align: 'right' ,formatter: 'number', editoptions:{
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
                {name: 'billsMainId', hidden: true},
            ],
            height: $(window).height() * 0.48,
            shrinkToFit: false,
        };
        //回调函数
        var callBackList = {
            onCellSelect: function (rowid, iCol, cellcontent, e) {
                var currRow = $("#dataGrid").jqGrid('getRowData', rowid);
                if (iCol == 3 && currRow.goodsId!="") {
                    openImeiInputModal("dataGrid", rowid);//打开输入框
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
        $('#dataGridGood').comModalsStoreGoodByStorageIds({
            clickback:function(goodsList){
                var $grid = dataGrid.$grid;
                var ids = $grid.getDataIDs();
                var hasRepetGood=false //是否有重复商品，默认是没有
                var gridSelDataRow=$grid.jqGrid("getRowData",dataGrid.lastrow);  //主表选中的行 数据
                var hasCurRow=false;//是否有当前行选中的重复商品，默认是没有
                $.each(ids, function (m, keyId) {
                    var rowData = $grid.jqGrid('getRowData', keyId);
                    for(var i=0;i<goodsList.length;i++){
                        var goodsItem=goodsList[i];
                        if(goodsItem.dataId==rowData.goodsId){
                            goodsList.splice(i, 1);
                            if(gridSelDataRow.goodsId==goodsItem.dataId){
                                hasCurRow=true;
                                break;
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
            var girdParam=$('#'+$('#dataGridGood')[0].isObj.option.gridID).getGridParam().postData

            var goodsId=[];
            for(var i=0;i<goodsList.length;i++){
                goodsId.push(goodsList[i].dataId);
            }
            var obj={
                menuCode:$('#AUTH').data('code'),
                storageIds:$.trim(girdParam.storageIds),
                adjustmentType:$('#adjustmentType').val(),
                goodsId:goodsId.join(',')
            }
            $.ajaxPackage({
                'url':'/manager/component/goods/getStockImeiVoList',
                'data':obj,
                'success':function(data){
                    var ajList=data.data.dataList;
                    for(var i=0;i<goodsList.length;i++){
                        var goods = goodsList[i];
                        goods.imeiList=[]
                        goods.costAmount=0
                        goods.costAmountAfter=0
                        goods.costAmountBalance=0
                        goods.companyCostAmount=0
                        goods.companyCostAmountAfter=0
                        goods.companyCostAmountBalance=0
                        goods.sectionCostAmount=0
                        goods.sectionCostAmountAfter=0
                        goods.sectionCostAmountBalance=0
                        goods.goodsNumber=0
                        for(var j=0;j<ajList.length;j++){
                            var ajItem = ajList[j];
                            if(goods.dataId==ajItem.goodsId){
                                var num=Number(ajItem.stockCount)
                                ajItem.costAmount=Number(ajItem.costPrice)*num; //保后财务成本
                                ajItem.costAmountBalance=0; //财务成本保价差额
                                ajItem.costAmountAfter=ajItem.costAmount; //保后财务成本

                                ajItem.companyCostAmount=Number(ajItem.companyCostPrice)*num; //保后公司成本
                                ajItem.companyCostAmountBalance=0; //公司成本差额
                                ajItem.companyCostAmountAfter=ajItem.companyCostAmount; //保后公司成本

                                ajItem.sectionCostAmount=Number(ajItem.sectionCostPrice)*num; //保后部门成本
                                ajItem.sectionCostAmountBalance=0; //部门成本保价差额
                                ajItem.sectionCostAmountAfter=ajItem.sectionCostAmount; //保后部门成本
                                ajItem.goodsNumber=num;
                                ajItem.inStorageDateStr=ajItem.inStorageDate;
                                ajItem.purchaseDateStr=ajItem.purchaseDate;

                                goods.imeiList.push(ajItem)
                                goods.costAmount+=Number(ajItem.costAmount)
                                goods.companyCostAmount+=Number(ajItem.companyCostAmount)
                                goods.sectionCostAmount+=Number(ajItem.sectionCostAmount)
                                goods.goodsNumber+=Number(ajItem.goodsNumber);
                            }
                        }
                        goods.costAmountAfter=Number(goods.costAmount)
                        goods.companyCostAmountAfter=Number(goods.companyCostAmount)
                        goods.sectionCostAmountAfter=Number(goods.sectionCostAmount)
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
                var dataRow ={
                    'goodsName':goods.name,
                    'goodsId':goods.dataId,
                    'models':goods.models,
                    'color':goods.color,
                    'configure':goods.configure,
                    'valuationMethods':goods.valuationMethods,
                    'imeiList':JSON.stringify(goods.imeiList),
                    'goodsNumber':goods.goodsNumber,

                    'costAmount': Number(goods.costAmount),
                    'costAmountAfter': Number(goods.costAmountAfter),
                    'costAmountBalance':Number(goods.costAmountBalance),

                    'companyCostAmount': Number(goods.companyCostAmount),
                    'companyCostAmountAfter': Number(goods.companyCostAmountAfter),
                    'companyCostAmountBalance':Number(goods.companyCostAmountBalance),

                    'sectionCostAmount': Number(goods.sectionCostAmount),
                    'sectionCostAmountAfter': Number(goods.sectionCostAmountAfter),
                    'sectionCostAmountBalance':Number(goods.sectionCostAmountBalance),
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
            colNames: ['goodsId', '采购日期', '串号','辅助串号','部门名称','所在仓库','现库存',
                '原财务成本', '财务成本调整差额<span class="pixia" data-key="costAmountBalance" title="批量修改以下所有行">(批下)</span>',
                '<i class="bitianX">*</i>调后财务成本<span class="pixia" data-key="costAmountAfter" title="批量修改以下所有行">(批下)</span>',

                 '原公司成本', '公司成本调整差额<span class="pixia" data-key="companyCostAmountBalance" title="批量修改以下所有行">(批下)</span>',
                '<i class="bitianX">*</i>调后公司成本<span class="pixia" data-key="companyCostAmountAfter" title="批量修改以下所有行">(批下)</span>',

                '原部门成本','部门成本调整差额<span class="pixia" data-key="sectionCostAmountBalance" title="批量修改以下所有行">(批下)</span>',
                '<i class="bitianX">*</i>调后部门成本<span class="pixia" data-key="sectionCostAmountAfter" title="批量修改以下所有行">(批下)</span>',
                 '备注', '采购价', '入库日期','入库价','供应商','供应商id','所在仓库id','imeiId','sectionId'],
            colModel: [
                {name: 'goodsId', hidden: true,frozen:true},
                {name: 'purchaseDateStr', width: 100, align: 'center',frozen:true},
                {name: 'imei', width: 180, align: 'center',frozen:true},
                {name: 'auxiliaryImei', width: 190, align: 'center'},
                {name: 'sectionName', width: 150, align: 'center'},
                {name: 'storageName', width: 150, align: 'center'},
                {name: 'goodsNumber', width: 190, align: 'center'},

                {name: 'costAmount', width: 110, align: 'right' ,formatter: 'number' },
                {name: 'costAmountBalance', width: 170, editable: true, align: 'right' ,formatter: 'number', editoptions:{
                    dataEvents: [{
                        type: "focus",
                        fn: function(){
                            this.select()
                        }
                    }]
                }},
                {name: 'costAmountAfter', width: 170, editable: true, align: 'right' ,formatter: 'number', editoptions:{
                    dataEvents: [{
                        type: "focus",
                        fn: function(){
                            this.select()
                        }
                    }]
                }},

                {name: 'companyCostAmount', width: 110, align: 'right' ,formatter: 'number' },
                {name: 'companyCostAmountBalance', width: 170, editable: true, align: 'right' ,formatter: 'number', editoptions:{
                    dataEvents: [{
                        type: "focus",
                        fn: function(){
                            this.select()
                        }
                    }]
                }},
                {name: 'companyCostAmountAfter', width: 170, editable: true, align: 'right' ,formatter: 'number', editoptions:{
                    dataEvents: [{
                        type: "focus",
                        fn: function(){
                            this.select()
                        }
                    }]
                }},

                {name: 'sectionCostAmount', width: 110, align: 'right' ,formatter: 'number' },
                {name: 'sectionCostAmountBalance', width: 170, editable: true, align: 'right' ,formatter: 'number', editoptions:{
                    dataEvents: [{
                        type: "focus",
                        fn: function(){
                            this.select()
                        }
                    }]
                }},
                {name: 'sectionCostAmountAfter', width: 170, editable: true, align: 'right' ,formatter: 'number', editoptions:{
                    dataEvents: [{
                        type: "focus",
                        fn: function(){
                            this.select()
                        }
                    }]
                }},

                {name: 'remark',index: 'remark', width: 150, align: 'center', editable: true,},
                {name: 'purchasePrice', width: 150, align: 'center'},
                {name: 'inStorageDateStr', width: 150, align: 'center'},
                {name: 'inStoragePrice', width: 150, align: 'center'},

                {name: 'contactUnitName', width: 150, align: 'center'},
                {name: 'contactUnitId', hidden: true},
                {name: 'storageId', hidden: true},
                {name: 'imeiId', hidden: true},
                {name: 'sectionId', hidden: true},
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
            var costAmount=0;
            var costAmountBalance=0;
            var companyCostAmount=0;
            var companyCostAmountBalance=0;
            var sectionCostAmount=0;
            var sectionCostAmountBalance=0;
            var goodsNumber=0
            for(var i=0;i<imeiList.length;i++){
                var item=imeiList[i];
                costAmount+=Number(item.costAmount)
                costAmountBalance+=Number(item.costAmountBalance)

                companyCostAmount+=Number(item.companyCostAmount)
                companyCostAmountBalance+=Number(item.companyCostAmountBalance)

                sectionCostAmount+=Number(item.sectionCostAmount)
                sectionCostAmountBalance+=Number(item.sectionCostAmountBalance)
                goodsNumber+=Number(item.goodsNumber)
            }

            var dataRow ={
                'imeiList':JSON.stringify(imeiList),
                'goodsNumber':goodsNumber,
                'costAmount':costAmount.toFixed(2),
                'costAmountBalance':costAmountBalance.toFixed(2),
                'costAmountAfter':(Number(costAmount)+Number(costAmountBalance)).toFixed(2),
                'companyCostAmount':companyCostAmount.toFixed(2),
                'companyCostAmountBalance':companyCostAmountBalance.toFixed(2),
                'companyCostAmountAfter':(Number(companyCostAmount)+Number(companyCostAmountBalance)).toFixed(2),
                'sectionCostAmount':sectionCostAmount.toFixed(2),
                'sectionCostAmountBalance':sectionCostAmountBalance.toFixed(2),
                'sectionCostAmountAfter':(Number(sectionCostAmount)+Number(sectionCostAmountBalance)).toFixed(2),
            };
            dataGrid.$grid.jqGrid('setRowData', selRowId, dataRow, {});
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
            var $grid=valuationMethodsGrid.$grid;
            //这里是引用，所有要clone一份
            var selArrRow = $.extend([], $grid.jqGrid('getGridParam', 'selarrrow'));
            if(selArrRow.length<1){
                $.zxsaas_plus.showalert("提示","请选择一行！");
                return
            }
            $.zxsaas_plus.showconfirm('提示', "是否删除？", function(){

                $grid.jqGrid('saveCell',lastrowImei,lastcellImei);
                //这里是引用，所有要clone一份

                for(var i=0;i<selArrRow.length;i++){
                    $grid.jqGrid("delRowData", selArrRow[i]);
                }
                valuationMethodsGridSum()
            });


        })
    }
    //是否展示单据日志
    function isBillslogShow() {
        var $billslogID = $("#billslog");
        $billslogID.hide();
        // 不展示单据日志
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
        var key=$('#adjustmentType').val()

        var yiDongLie=['goodsNumber','sectionName']
        var costPriceArr=['costAmount','costAmountBalance','costAmountAfter']
        var companyCostPriceArr=['companyCostAmount','companyCostAmountAfter','companyCostAmountBalance']
        var sectionCostPriceArr=['sectionCostAmount','sectionCostAmountAfter','sectionCostAmountBalance']
        var costPriceComArr=['purchaseDateStr','imei','auxiliaryImei','purchasePrice','inStorageDateStr','inStoragePrice','contactUnitName']
        valuationMethodsGrid.$grid.setGridParam().hideCol(yiDongLie).hideCol(costPriceArr).hideCol(companyCostPriceArr).hideCol(sectionCostPriceArr).hideCol(costPriceComArr)
        if(key==1){//财务成本
            //个别计价
            var imeiList=JSON.parse(currRow.imeiList)
            if(currRow.valuationMethods==1){
                valuationMethodsGrid.$grid.setGridParam().showCol(costPriceComArr).hideCol(yiDongLie)
            }else if(currRow.valuationMethods==2&&imeiList[0].imei!=null){
                valuationMethodsGrid.$grid.setGridParam().showCol(costPriceComArr).hideCol(yiDongLie)
            }else{
                valuationMethodsGrid.$grid.setGridParam().hideCol(costPriceComArr).showCol(yiDongLie)
            }
            valuationMethodsGrid.$grid.setGridParam().showCol(costPriceArr).hideCol('auxiliaryImei')
        }else{
            valuationMethodsGrid.$grid.setGridParam().showCol(costPriceComArr)
            if(key==2){//公司成本
                valuationMethodsGrid.$grid.setGridParam().showCol(companyCostPriceArr)
            }else if(key==3){//部门成本
                valuationMethodsGrid.$grid.setGridParam().showCol(sectionCostPriceArr)
            }else{//财务成本+公司成本
                valuationMethodsGrid.$grid.setGridParam().showCol(costPriceArr).showCol(companyCostPriceArr)
            }
        }
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
            //是否 为 串号商品
            if (currRow.valuationMethods == '1') {
                $grid.jqGrid('setCell', keyId, "goodsNumber", '', 'valuationMethodsIcon1');
            } else if(currRow.valuationMethods == '2'){
                $grid.jqGrid('setCell', keyId, "goodsNumber", '', 'valuationMethodsIcon2');
            }
        });
        // 计算差额，保价后
        if($.trim(isSum)=="1"){
            var keyId=$grid.jqGrid('getGridParam','selrow');
            var currRow = $grid.jqGrid('getRowData', keyId);
            gridImeiListSum(currRow,keyId)
        }
        //汇总
        var goodsNumber = $grid.getCol('goodsNumber', false, 'sum').toFixed(2);

        var costAmount = $grid.getCol('costAmount', false, 'sum').toFixed(2);
        var costAmountAfter = $grid.getCol('costAmountAfter', false, 'sum').toFixed(2);
        var costAmountBalance = $grid.getCol('costAmountBalance', false, 'sum').toFixed(2);

        var companyCostAmount =$grid.getCol('companyCostAmount', false, 'sum').toFixed(2);
        var companyCostAmountAfter = $grid.getCol('companyCostAmountAfter', false, 'sum').toFixed(2);
        var companyCostAmountBalance = $grid.getCol('companyCostAmountBalance', false, 'sum').toFixed(2);

        var sectionCostAmount =$grid.getCol('sectionCostAmount', false, 'sum').toFixed(2);
        var sectionCostAmountAfter = $grid.getCol('sectionCostAmountAfter', false, 'sum').toFixed(2);
        var sectionCostAmountBalance = $grid.getCol('sectionCostAmountBalance', false, 'sum').toFixed(2);
        $grid.footerData("set", {
            rn: "合计",
            goodsNumber: goodsNumber,
            costAmount: costAmount,
            costAmountAfter: costAmountAfter,
            costAmountBalance: costAmountBalance,

            companyCostAmount: companyCostAmount,
            companyCostAmountAfter: companyCostAmountAfter,
            companyCostAmountBalance: companyCostAmountBalance,

            sectionCostAmount: sectionCostAmount,
            sectionCostAmountAfter: sectionCostAmountAfter,
            sectionCostAmountBalance: sectionCostAmountBalance,
        });
    }
    /*
   合计
   averag :是否是一键均价
    */
    function gridImeiListSum(currRow,keyId,averag) {
        var $grid= dataGrid.$grid;
        //5:选择差额，6  选择：保价后金额，
        if($.trim(currRow.goodsId)!=""){
            currRow = $grid.jqGrid('getRowData', keyId);
            var imeiList=JSON.parse(currRow.imeiList);
            if(lastcell==5 || lastcell==6){
                if(lastcell==5){//财务成本调整差额
                    var costAmountAfter = Number(currRow.costAmount) + Number(currRow.costAmountBalance);
                    $grid.jqGrid('setCell', keyId, "costAmountAfter", Number(costAmountAfter).toFixed(2));
                }
                else if(lastcell==6){//调整后财务成本
                    var costAmountBalance = Number(currRow.costAmountAfter)-Number(currRow.costAmount) ;
                    $grid.jqGrid('setCell', keyId, "costAmountBalance", Number(costAmountBalance).toFixed(2));
                }
                currRow = $grid.jqGrid('getRowData', keyId);
                if(averag){
                    //详细差额
                    var costAmountAfter;
                    if(currRow.goodsNumber==0){
                        costAmountAfter=0;
                    }else{
                        costAmountAfter=Math.floor((Number(currRow.costAmount)/currRow.goodsNumber)*100)/100;
                    }
                    //最后的差额
                    var yuE=(Number(currRow.costAmount)-Number(costAmountAfter)*currRow.goodsNumber).toFixed(2)
                    for(var i=0;i<imeiList.length;i++){
                        var item=imeiList[i];
                        item.costAmountAfter=Number(costAmountAfter)*item.goodsNumber
                        if(i==imeiList.length-1){
                            item.costAmountAfter=((Number(costAmountAfter))*item.goodsNumber+Number(yuE)).toFixed(2)
                        }
                        item.costAmountBalance=(Number(item.costAmountAfter)-Number(item.costAmount)).toFixed(2)
                    }
                    $grid.jqGrid('setCell', keyId, "imeiList", JSON.stringify(imeiList));
                }else{
                    //详细差额
                    var costPriceBalance;
                    if(currRow.goodsNumber==0){
                        costPriceBalance=0;
                    }else{
                        costPriceBalance=Math.floor((Number(currRow.costAmountBalance)/currRow.goodsNumber)*100)/100;
                    }
                    //最后的差额
                    var yuE=(Number(currRow.costAmountBalance)-Number(costPriceBalance)*currRow.goodsNumber).toFixed(2)
                    for(var i=0;i<imeiList.length;i++){
                        var item=imeiList[i];
                        item.costAmountBalance=Number(costPriceBalance)*item.goodsNumber
                        if(i==imeiList.length-1){
                            item.costAmountBalance=((Number(costPriceBalance))*item.goodsNumber+Number(yuE)).toFixed(2)
                        }
                        item.costAmountAfter=(Number(item.costAmount)+Number(item.costAmountBalance)).toFixed(2)
                    }
                    $grid.jqGrid('setCell', keyId, "imeiList", JSON.stringify(imeiList));
                }


            }
            if(lastcell==8 || lastcell==9){
                if(lastcell==8){//公司成本调整差额
                    var companyCostAmountAfter = Number(currRow.companyCostAmount) + Number(currRow.companyCostAmountBalance);
                    $grid.jqGrid('setCell', keyId, "companyCostAmountAfter", Number(companyCostAmountAfter).toFixed(2));
                }
                else if(lastcell==9){ //调整后公司成本
                    var companyCostAmountBalance = Number(currRow.companyCostAmountAfter) - Number(currRow.companyCostAmount) ;
                    $grid.jqGrid('setCell', keyId, "companyCostAmountBalance", Number(companyCostAmountBalance).toFixed(2));
                }
                currRow = $grid.jqGrid('getRowData', keyId);
                if(averag){
                    //详细差额
                    var companyCostAmountAfter;
                    if(currRow.goodsNumber==0){
                        companyCostAmountAfter=0;
                    }else{
                        companyCostAmountAfter=Math.floor((Number(currRow.companyCostAmount)/currRow.goodsNumber)*100)/100;
                    }
                    //最后的差额
                    var yuE=(Number(currRow.companyCostAmount)-Number(companyCostAmountAfter)*currRow.goodsNumber).toFixed(2)
                    for(var i=0;i<imeiList.length;i++){
                        var item=imeiList[i];
                        item.companyCostAmountAfter=Number(companyCostAmountAfter)*item.goodsNumber
                        if(i==imeiList.length-1){
                            item.companyCostAmountAfter=((Number(companyCostAmountAfter))*item.goodsNumber+Number(yuE)).toFixed(2)
                        }
                        item.companyCostAmountBalance=(Number(item.companyCostAmountAfter)-Number(item.companyCostAmount)).toFixed(2)
                    }
                    $grid.jqGrid('setCell', keyId, "imeiList", JSON.stringify(imeiList));
                }else{
                    //详细差额
                    var companyCostPriceBalance;
                    if(currRow.goodsNumber==0){
                        companyCostPriceBalance=0;
                    }else{
                        companyCostPriceBalance=Math.floor((Number(currRow.companyCostAmountBalance)/currRow.goodsNumber)*100)/100;
                    }
                    //最后的差额
                    var yuE=(Number(currRow.companyCostAmountBalance)-Number(companyCostPriceBalance)*currRow.goodsNumber).toFixed(2)
                    for(var i=0;i<imeiList.length;i++){
                        var item=imeiList[i];
                        item.companyCostAmountBalance=Number(companyCostPriceBalance)*item.goodsNumber
                        if(i==imeiList.length-1){
                            item.companyCostAmountBalance=((Number(companyCostPriceBalance)+Number(yuE))*item.goodsNumber).toFixed(2)
                        }
                        item.companyCostAmountAfter=(Number(item.companyCostAmount)+ Number(item.companyCostAmountBalance)).toFixed(2)
                    }
                    $grid.jqGrid('setCell', keyId, "imeiList", JSON.stringify(imeiList));
                }
            }
            if(lastcell==11 || lastcell==12){

                if(lastcell==11){//调整
                    var sectionCostAmountAfter = Number(currRow.sectionCostAmount) + Number(currRow.sectionCostAmountBalance);
                    $grid.jqGrid('setCell', keyId, "sectionCostAmountAfter", Number(sectionCostAmountAfter).toFixed(2));
                }
                else if(lastcell==12){ //调整后部门成本
                    var sectionCostAmountBalance = Number(currRow.sectionCostAmountAfter)-Number(currRow.sectionCostAmount)  ;
                    $grid.jqGrid('setCell', keyId, "sectionCostAmountBalance", Number(sectionCostAmountBalance).toFixed(2));
                }
                currRow = $grid.jqGrid('getRowData', keyId);
                if(averag){
                    //详细差额
                    var sectionCostAmountAfter;
                    if(currRow.goodsNumber==0){
                        sectionCostAmountAfter=0;
                    }else{
                        sectionCostAmountAfter=Math.floor((Number(currRow.sectionCostAmount)/currRow.goodsNumber)*100)/100;
                    }
                    //最后的差额
                    var yuE=(Number(currRow.sectionCostAmount)-Number(sectionCostAmountAfter)*currRow.goodsNumber).toFixed(2)
                    for(var i=0;i<imeiList.length;i++){
                        var item=imeiList[i];
                        item.sectionCostAmountAfter=Number(sectionCostAmountAfter)*item.goodsNumber
                        if(i==imeiList.length-1){
                            item.sectionCostAmountAfter=((Number(sectionCostAmountAfter))*item.goodsNumber+Number(yuE)).toFixed(2)
                        }
                        item.sectionCostAmountBalance=(Number(item.sectionCostAmountAfter)-Number(item.sectionCostAmount)).toFixed(2)
                    }
                    $grid.jqGrid('setCell', keyId, "imeiList", JSON.stringify(imeiList));
                }else {
                    //详细差额
                    var sectionCostPriceBalance;
                    if (currRow.goodsNumber == 0) {
                        sectionCostPriceBalance = 0;
                    } else {
                        sectionCostPriceBalance = Math.floor((Number(currRow.sectionCostAmountBalance) / currRow.goodsNumber) * 100) / 100;
                    }
                    //最后的差额
                    var yuE = (Number(currRow.sectionCostAmountBalance) - Number(sectionCostPriceBalance) * currRow.goodsNumber).toFixed(2)
                    for (var i = 0; i < imeiList.length; i++) {
                        var item = imeiList[i];
                        item.sectionCostAmountBalance = Number(sectionCostPriceBalance) * item.goodsNumber
                        if (i == imeiList.length - 1) {
                            item.sectionCostAmountBalance = ((Number(sectionCostPriceBalance) + Number(yuE)) * item.goodsNumber).toFixed(2)
                        }
                        item.sectionCostAmountAfter = (Number(item.sectionCostAmount) + Number(item.sectionCostAmountBalance)).toFixed(2)
                    }
                    $grid.jqGrid('setCell', keyId, "imeiList", JSON.stringify(imeiList));
                }
            }
        }
    }
    //合计
    function valuationMethodsGridSum(){
        var $grid= valuationMethodsGrid.$grid;
        //汇总每一行
        var ids = $grid.getDataIDs();
        $.each(ids, function (i, value) {
            var currRow = $grid.jqGrid('getRowData', value);
            if(lastcellImei==11){//财务成本保价差额
                var costAmountAfter = Number(currRow.costAmount) + Number(currRow.costAmountBalance); //保价后金额
                $grid.jqGrid('setCell', value, "costAmountAfter", Number(costAmountAfter).toFixed(2));
            }
            else if(lastcellImei==12){//保后财务成本
                var costAmountBalance =Number(currRow.costAmountAfter) - Number(currRow.costAmount)  ; //差额
                $grid.jqGrid('setCell', value, "costAmountBalance", Number(costAmountBalance).toFixed(2));
            }
            else if(lastcellImei==14){//公司成本调整差额
                var companyCostAmountAfter = Number(currRow.companyCostAmount) + Number(currRow.companyCostAmountBalance); //差额
                $grid.jqGrid('setCell', value, "companyCostAmountAfter", Number(companyCostAmountAfter).toFixed(2));
            }
            else if(lastcellImei==15){//调整后公司成本
                var companyCostAmountBalance = Number(currRow.companyCostAmountAfter)-Number(currRow.companyCostAmount); //差额
                $grid.jqGrid('setCell', value, "companyCostAmountBalance", Number(companyCostAmountBalance).toFixed(2));
            }
            else if(lastcellImei==17){//部门成本调整差额
                var sectionCostAmountAfter = Number(currRow.sectionCostAmount) + Number(currRow.sectionCostAmountBalance); //差额
                $grid.jqGrid('setCell', value, "sectionCostAmountAfter", Number(sectionCostAmountAfter).toFixed(2));
            }
            else if(lastcellImei==18){//调整后部门成本
                var sectionCostAmountBalance =Number(currRow.sectionCostAmountAfter) - Number(currRow.sectionCostAmount); //差额
                $grid.jqGrid('setCell', value, "sectionCostAmountBalance", Number(sectionCostAmountBalance).toFixed(2));
            }
        });

        //汇总
        var costAmount = $grid.getCol('costAmount', false, 'sum').toFixed(2);
        var costAmountBalance =$grid.getCol('costAmountBalance', false, 'sum').toFixed(2);
        var costAmountAfter = $grid.getCol('costAmountAfter', false, 'sum').toFixed(2);

        var companyCostAmount = $grid.getCol('companyCostAmount', false, 'sum').toFixed(2);
        var companyCostAmountBalance =$grid.getCol('companyCostAmountBalance', false, 'sum').toFixed(2);
        var companyCostAmountAfter = $grid.getCol('companyCostAmountAfter', false, 'sum').toFixed(2);

        var sectionCostAmount = $grid.getCol('sectionCostAmount', false, 'sum').toFixed(2);
        var sectionCostAmountBalance =$grid.getCol('sectionCostAmountBalance', false, 'sum').toFixed(2);
        var sectionCostAmountAfter = $grid.getCol('sectionCostAmountAfter', false, 'sum').toFixed(2);

        var goodsNumber = $grid.getCol('goodsNumber', false, 'sum');
        var textGoodsNumber=goodsNumber+"（台）"
        $grid.footerData("set", {
            rn: "合计",
            imei: textGoodsNumber,
            goodsNumber: textGoodsNumber,
            costAmount: costAmount,
            costAmountBalance: costAmountBalance,
            costAmountAfter: costAmountAfter,

            companyCostAmount: companyCostAmount,
            companyCostAmountBalance: companyCostAmountBalance,
            companyCostAmountAfter: companyCostAmountAfter,

            sectionCostAmount: sectionCostAmount,
            sectionCostAmountBalance: sectionCostAmountBalance,
            sectionCostAmountAfter: sectionCostAmountAfter,
        });
        $('#valuationMethodsModal .frozen-sdiv td[aria-describedby="valuationMethodsGrid_imei"]').text(textGoodsNumber).attr('title',textGoodsNumber)
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
                        sectionId:imeiItem.sectionId,
                        contactUnitId :imeiItem.contactUnitId,
                        storageId:imeiItem.storageId,
                        goodsId:imeiItem.goodsId,
                        imeiId:imeiItem.imeiId,
                        imei:imeiItem.imei,
                        auxiliaryImei :imeiItem.auxiliaryImei,

                        goodsNumber:imeiItem.goodsNumber,
                        id:imeiItem.id,
                        remark:imeiItem.remark,
                        purchaseDateStr:imeiItem.purchaseDateStr,
                        inStorageDateStr:imeiItem.inStorageDateStr,
                        purchasePrice:imeiItem.purchasePrice,
                        inStoragePrice:imeiItem.inStoragePrice,

                        costAmount:imeiItem.costAmount,
                        costAmountBalance:imeiItem.costAmountBalance,
                        costAmountAfter:imeiItem.costAmountAfter,

                        companyCostAmount:imeiItem.companyCostAmount,
                        companyCostAmountBalance:imeiItem.companyCostAmountBalance,
                        companyCostAmountAfter:imeiItem.companyCostAmountAfter,

                        sectionCostAmount:imeiItem.sectionCostAmount,
                        sectionCostAmountBalance:imeiItem.sectionCostAmountBalance,
                        sectionCostAmountAfter:imeiItem.sectionCostAmountAfter,


                    })
                }
                detailList.push({
                    goodsId:item.goodsId,
                    goodsName:item.goodsName,
                    valuationMethods:item.valuationMethods,
                    goodsNumber:item.goodsNumber,
                    remark:item.remark,
                    costAmount:item.costAmount,
                    costAmountBalance:item.costAmountBalance,
                    costAmountAfter:item.costAmountAfter,
                    companyCostAmount:item.companyCostAmount,
                    companyCostAmountBalance:item.companyCostAmountBalance,
                    companyCostAmountAfter:item.companyCostAmountAfter,
                    sectionCostAmount:item.sectionCostAmount,
                    sectionCostAmountBalance:item.sectionCostAmountBalance,
                    sectionCostAmountAfter:item.sectionCostAmountAfter,
                    imeiList:arr
                })

            }
        }
        return {
            orderId:params.orderId,
            sectionId: params.sectionId,
            managerId: params.managerId,
            remark: params.remark,
            reasonId: $("#reasonId").val(),
            adjustmentType: $("#adjustmentType").val(),
            billsDateStr: $("#billsBeginDateStr").val(),
            detailList: detailList,
        };
    }
    //检查参数
    function checkParam(params) {
        if(params.detailList.length<1){
            $.zxsaas_plus.showalert("提示","没有商品明细！");
            return true
        }else{
            var  adjustmentType =$('#adjustmentType').val()
            for(var i=0;i<params.detailList.length;i++){
                var item=params.detailList[i];
                if(item.goodsId!=''){
                    if(adjustmentType==1 || adjustmentType==5){
                        if(Number(item.costAmountAfter)<0){
                            $.zxsaas_plus.showalert("提示",'商品：<'+item.goodsName+'>保后财务成本总额不能小于0');
                            return true
                        }
                        if(item.valuationMethods==1){
                            var imeiList=item.imeiList;
                            for(var j=0;j<imeiList.length;j++){
                                var imeiItem=imeiList[j];
                                if(Number(imeiItem.costAmountAfter)<0){
                                    $.zxsaas_plus.showalert("提示",'商品：<'+item.goodsName+'>明细保后财务成本总额不能小于0');
                                    return true
                                }
                            }
                        }
                    }
                    if(adjustmentType==2 || adjustmentType==5){
                        if(Number(item.companyCostAmountAfter)<0){
                            $.zxsaas_plus.showalert("提示",'商品：<'+item.goodsName+'>保后公司成本总额不能小于0');
                            return true
                        }
                        if(item.valuationMethods==1){
                            var imeiList=item.imeiList;
                            for(var j=0;j<imeiList.length;j++){
                                var imeiItem=imeiList[j];
                                if(Number(imeiItem.companyCostAmountAfter)<0){
                                    $.zxsaas_plus.showalert("提示",'商品：<'+item.goodsName+'>明细保后公司成本总额不能小于0');
                                    return true
                                }
                            }
                        }
                    }
                    if(adjustmentType==3 || adjustmentType==5){
                        if(Number(item.sectionCostAmountAfter)<0){
                            $.zxsaas_plus.showalert("提示",'商品：<'+item.goodsName+'>保后部门成本总额不能小于0');
                            return true
                        }
                        if(item.valuationMethods==1){
                            var imeiList=item.imeiList;
                            for(var j=0;j<imeiList.length;j++){
                                var imeiItem=imeiList[j];
                                if(Number(imeiItem.sectionCostAmountAfter)<0){
                                    $.zxsaas_plus.showalert("提示",'商品：<'+item.goodsName+'>明细保后部门成本总额不能小于0');
                                    return true
                                }
                            }
                        }
                    }

                }
            }
        }
    }
    //分页查询ajax请求
    function pageAjax(param,callbackObj) {
        $.ajaxPackage({
            url:'/manager/inventory/storage/cost/adjustment/searchOrder',
            data:param,
            success:function(data){
                if (data.result == 1) {
                    var mainVo=data.data.order;
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
        $('#reasonId').val(billsHeader.reasonId)
        $('#adjustmentType').val(billsHeader.adjustmentType)
        $('#adjustmentType').trigger('change')
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
        var auditStatus=mainVo.auditStatus
        if(billsStatus==1){
            isDraftOp=true
            $('.rightMap img').removeAttr("src");
        }else{
            isDraftOp=false;
            var $searchFormID = $("#billsHeaderForm");
            $.ajaxPackage({
                url:'/manager/inventory/fund/supplier/reprice/getBillsLog',
                data:{mainId:$searchFormID.find("input[name='orderId']").val()},
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
            if(auditStatus==1){
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

        dataGrid.$grid.setColProp("costAmountBalance", {editable: isDraftOp});
        dataGrid.$grid.setColProp("costAmountAfter", {editable: isDraftOp});
        dataGrid.$grid.setColProp("ccompanyCostAmountBalance", {editable: isDraftOp});
        dataGrid.$grid.setColProp("companyCostAmountAfter", {editable: isDraftOp});
        dataGrid.$grid.setColProp("sectionCostAmountBalance", {editable: isDraftOp});
        dataGrid.$grid.setColProp("sectionCostAmountAfter", {editable: isDraftOp});
        dataGrid.$grid.setColProp("goodsName", {editable: isDraftOp});
        valuationMethodsGrid.$grid.setColProp("costAmountBalance", {editable: isDraftOp});
        valuationMethodsGrid.$grid.setColProp("costAmountAfter", {editable: isDraftOp});
        valuationMethodsGrid.$grid.setColProp("ccompanyCostAmountBalance", {editable: isDraftOp});
        valuationMethodsGrid.$grid.setColProp("companyCostAmountAfter", {editable: isDraftOp});
        valuationMethodsGrid.$grid.setColProp("sectionCostAmountBalance", {editable: isDraftOp});
        valuationMethodsGrid.$grid.setColProp("sectionCostAmountAfter", {editable: isDraftOp});
    }
    //初始化 出库串号
    function initImeiDr(){
        imeiDr(); //串号导入
        $('.imeiImport').click(function(){
            $('#imeiDr-modal').modal('show');
            $('.imeiDr_vone,.imeiDr_vtwo').val('');
            $('.imeiDr_num').text(0);
            $("#imeiDrGrid").clearGridData().resize().trigger('reloadGrid')
        })
        // 导入（按钮）
        $('.imeiDr_import').click(function(){
            $(".imeiDr_vtwo").val('');
            //拿到外层表格串号
            var adjustmentType = $('#adjustmentType').val();
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
                    'adjustmentType':adjustmentType,
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
                    'sectionId':row.sectionId,
                    'sectionName':row.sectionName,
                    'storageName':row.storageName,
                    'storageId':row.storageId,
                    'contactUnitId':row.contactUnitId,
                    'contactUnitName':row.contactUnitName,

                    'purchaseDateStr':row.purchaseDate,
                    'purchasePrice':row.purchasePrice,
                    'imei':row.imei,
                    'auxiliaryImei':row.auxiliaryImei,
                    'remark':row.remark,
                    'inStorageDateStr':row.inStorageDate,
                    'inStoragePrice':row.inStoragePrice,

                    'imeiId':row.imeiId,
                    'goodsNumber':1,
                    'costAmount':row.costPrice,
                    'costAmountAfter':row.costPrice,
                    'costAmountBalance':0,
                    'companyCostAmount':row.companyCostPrice,
                    'companyCostAmountAfter':row.companyCostPrice,
                    'companyCostAmountBalance':0,
                    'sectionCostAmount':row.sectionCostPrice,
                    'sectionCostAmountAfter':row.sectionCostPrice,
                    'sectionCostAmountBalance':0,
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
                        remark: row.remark,
                        models: row.models,
                        color: row.color,
                        goodsNumber:1,
                        configure: row.configure,
                        imeiList: JSON.stringify(imeiList),
                        valuationMethods:row.valuationMethods,
                        costAmount: row.costPrice,
                        costAmountBalance: 0,
                        costAmountAfter: row.costPrice,
                        'companyCostAmount':row.companyCostPrice,
                        'companyCostAmountAfter':row.companyCostPrice,
                        'companyCostAmountBalance':0,
                        'sectionCostAmount':row.sectionCostPrice,
                        'sectionCostAmountAfter':row.sectionCostPrice,
                        'sectionCostAmountBalance':0,
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
                                var imeiItem=imeiList[0]
                                if(existRow.valuationMethods==1){
                                    idxImeiList.push(imeiItem);
                                }else{
                                    //移动加权
                                    var sameStorage=false ; //是否是相同的仓库
                                    for(var m=0;m<idxImeiList.length;m++){
                                        var idsImeiItem=idxImeiList[m]
                                        if(idsImeiItem.storageId==imeiItem.storageId){
                                            idsImeiItem.goodsNumber=Number(idsImeiItem.goodsNumber)+Number(imeiItem.goodsNumber)
                                            idsImeiItem.costAmount=Number(idsImeiItem.costAmount)+Number(imeiItem.costAmount)
                                            idsImeiItem.costAmountAfter=Number(idsImeiItem.costAmountAfter)+Number(imeiItem.costAmountAfter)
                                            idsImeiItem.companyCostAmount=Number(idsImeiItem.companyCostAmount)+Number(imeiItem.companyCostAmount)
                                            idsImeiItem.companyCostAmountAfter=Number(idsImeiItem.companyCostAmountAfter)+Number(imeiItem.companyCostAmountAfter)
                                            idsImeiItem.sectionCostAmount=Number(idsImeiItem.sectionCostAmount)+Number(imeiItem.sectionCostAmount)
                                            idsImeiItem.sectionCostAmountAfter=Number(idsImeiItem.sectionCostAmountAfter)+Number(imeiItem.sectionCostAmountAfter)
                                            sameStorage=true
                                            break;
                                        }
                                    }
                                    if(sameStorage==false){
                                        idxImeiList.push(imeiItem);
                                    }
                                }
                                opt = idxImeiList
                            }
                            else{
                                //存在直接返回
                                return
                            }
                        }
                        var allCostAmount=Number(Number(existRow.costAmount)+Number(row.costPrice)).toFixed(2);
                        var allCostAmountAfter=Number(Number(allCostAmount)+Number(existRow.costAmountBalance)).toFixed(2);

                        var allCompanyCostAmount=Number(Number(existRow.companyCostAmount)+Number(row.companyCostPrice)).toFixed(2);
                        var allCompanyCostAmountAfter=Number(Number(allCompanyCostAmount)+Number(existRow.companyCostAmountBalance)).toFixed(2);

                        var allSectionCostAmount=Number(Number(existRow.sectionCostAmount)+Number(row.sectionCostPrice)).toFixed(2);
                        var allSectionCostAmountAfter=Number(Number(allSectionCostAmount)+Number(existRow.sectionCostAmountBalance)).toFixed(2);

                        $('#dataGrid').setRowData(t3[sign],{
                            goodsNumber: Number(existRow.goodsNumber)+1,
                            imeiList:  JSON.stringify(opt),
                            costAmount:Number(allCostAmount),
                            costAmountAfter:Number(allCostAmountAfter),

                            companyCostAmount:Number(allCompanyCostAmount),
                            companyCostAmountAfter:Number(allCompanyCostAmountAfter),

                            sectionCostAmount:Number(allSectionCostAmount),
                            sectionCostAmountAfter:Number(allSectionCostAmountAfter),
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
                var adjustmentType=$.trim($('#adjustmentType').val())
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
                        'adjustmentType':adjustmentType,
                        'queryKey':$(this).val()
                    },
                    success:function(data){
                        if(data.result==1){
                            var resArr=data.data.goodsImeiVoList;
                            if(!resArr.length){
                                $.zxsaas_plus.showalert('warning','条目为空！');
                            }else{
                                $('#imeiUl').html('');
                                var ulHtml=''
                                for(var i=0;i<resArr.length;i++){
                                    var resItem=resArr[i]
                                    ulHtml += '<li class="imeiUlList" data-info = "'+JSON.stringify(resItem).replace(/"/g,"'")+'">'+resItem.imei+'</li>';
                                }
                                $('#imeiUl').html(ulHtml);
                                $('#imeiUl').delegate("li.imeiUlList", "click", function () {
                                    var _this=$(this);
                                    imeiUlLiClick(_this.data('info'))
                                });
                                $('.none-cx').show();
                                //如果只有一条记录直接录入
                                if(resArr.length==1){
                                    imeiUlLiClick(JSON.stringify(resArr[0]));
                                }
                            }
                            // setTimeout(function(){
                            //     _this.val('').focus();
                            // })
                            // kongRow()
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

        function imeiUlLiClick(info) {
            var oneData=JSON.parse(info.replace(/'/g,'"'))
            $('#otherOutstroNumIdStr').blur()[0].select(); //设置选中，方便下次扫码清空
            $('.none-cx').hide();
            if(oneData){
                var resArr=[oneData]
                $.each(resArr,function(i,val){
                    var appendSwitch=false;
                    var ids=$('#dataGrid').getDataIDs();

                    var imeiItem={
                        'goodsId':val.goodsId,
                        'sectionId':val.sectionId,
                        'sectionName':val.sectionName,
                        'storageName':val.storageName,
                        'storageId':val.storageId,
                        'contactUnitId':val.contactUnitId,
                        'contactUnitName':val.contactUnitName,
                        'purchaseDateStr':val.purchaseDate,
                        'purchasePrice':val.purchasePrice,
                        'inStorageDateStr':val.inStorageDate,
                        'inStoragePrice':val.inStoragePrice,
                        'imei':val.imei,
                        'auxiliaryImei':val.auxiliaryImei,
                        'remark':val.remark,
                        'imeiId':val.imeiId,
                        'goodsNumber':1,
                        'costAmount':val.costPrice,
                        'costAmountAfter':val.costPrice,
                        'costAmountBalance':0,
                        'companyCostAmount':val.companyCostPrice,
                        'companyCostAmountAfter':val.companyCostPrice,
                        'companyCostAmountBalance':0,
                        'sectionCostAmount':val.sectionCostPrice,
                        'sectionCostAmountAfter':val.sectionCostPrice,
                        'sectionCostAmountBalance':0,
                    }
                    $.each(ids,function(j,rowid){
                        var existRow=$('#dataGrid').jqGrid("getRowData",rowid);
                        var goodsId=existRow.goodsId;//商品id
                        var sid=existRow.storageId;//仓库id
                        var idxImeiList=JSON.parse(existRow.imeiList);//商品串号群明细
                        var arrval=[];//主串，辅串
                        for(var m=0;m<idxImeiList.length;m++){
                            var idxImeiItem = idxImeiList[m];
                            if($.trim(idxImeiItem.imeiId)!=''){
                                arrval.push(idxImeiItem.imeiId.toString())
                            }
                        }
                        var num=Number(existRow.goodsNumber);//数量
                        if(val.goodsId==goodsId){
                            appendSwitch=false;
                            if($.inArray(val.imeiId.toString(),arrval)==-1){
                                var allCostAmount=Number(Number(existRow.costAmount)+Number(val.costPrice)).toFixed(2);
                                var allCostAmountAfter=Number(Number(allCostAmount)+Number(existRow.costAmountBalance)).toFixed(2);
                                var allCompanyCostAmount=Number(Number(existRow.companyCostAmount)+Number(val.companyCostPrice)).toFixed(2);
                                var allCompanyCostAmountAfter=Number(Number(allCompanyCostAmount)+Number(existRow.companyCostAmountBalance)).toFixed(2);
                                var allSectionCostAmount=Number(Number(existRow.sectionCostAmount)+Number(val.sectionCostPrice)).toFixed(2);
                                var allSectionCostAmountAfter=Number(Number(allSectionCostAmount)+Number(existRow.sectionCostAmountBalance)).toFixed(2);
                                //个别计价
                                if(existRow.valuationMethods==1){
                                    idxImeiList.push(imeiItem);
                                }else{
                                    //移动加权
                                    var sameStorage=false ; //是否是相同的仓库
                                    for(var m=0;m<idxImeiList.length;m++){
                                        var idsImeiItem=idxImeiList[m]
                                        if(idsImeiItem.storageId==imeiItem.storageId){
                                            idsImeiItem.goodsNumber=Number(idsImeiItem.goodsNumber)+Number(imeiItem.goodsNumber)
                                            idsImeiItem.costAmount=Number(idsImeiItem.costAmount)+Number(imeiItem.costAmount)
                                            idsImeiItem.costAmountAfter=Number(idsImeiItem.costAmountAfter)+Number(imeiItem.costAmountAfter)
                                            idsImeiItem.companyCostAmount=Number(idsImeiItem.companyCostAmount)+Number(imeiItem.companyCostAmount)
                                            idsImeiItem.companyCostAmountAfter=Number(idsImeiItem.companyCostAmountAfter)+Number(imeiItem.companyCostAmountAfter)
                                            idsImeiItem.sectionCostAmount=Number(idsImeiItem.sectionCostAmount)+Number(imeiItem.sectionCostAmount)
                                            idsImeiItem.sectionCostAmountAfter=Number(idsImeiItem.sectionCostAmountAfter)+Number(imeiItem.sectionCostAmountAfter)
                                            sameStorage=true;
                                            break;
                                        }
                                    }

                                    if(sameStorage==false){
                                        idxImeiList.push(imeiItem);
                                    }
                                }

                                $('#dataGrid').setRowData(rowid,{
                                    goodsNumber: num+1,
                                    imeiList:  JSON.stringify(idxImeiList),
                                    costAmount:Number(allCostAmount),
                                    costAmountAfter:Number(allCostAmountAfter),
                                    companyCostAmount:Number(allCompanyCostAmount),
                                    companyCostAmountAfter:Number(allCompanyCostAmountAfter),
                                    sectionCostAmount:Number(allSectionCostAmount),
                                    sectionCostAmountAfter:Number(allSectionCostAmountAfter),
                                });

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
                            imeiList:JSON.stringify([imeiItem]),
                            'costAmount':val.costPrice,
                            'costAmountAfter':val.costPrice,
                            'costAmountBalance':0,
                            'companyCostAmount':val.companyCostPrice,
                            'companyCostAmountAfter':val.companyCostPrice,
                            'companyCostAmountBalance':0,
                            'sectionCostAmount':val.sectionCostPrice,
                            'sectionCostAmountAfter':val.sectionCostPrice,
                            'sectionCostAmountBalance':0,
                        });
                    }
                })
                calcPrice();
                $('#otherOutstroNumIdStr').val('').focus();
                kongRow()
                gridSum()
            }

        }

        //计算价格
        function calcPrice(){
            $("#grid").jqGrid("saveCell", lastrow, lastcell);
            var ids = $("#grid").getDataIDs();
            $.each(ids, function (i, value) {
                var row = $("#grid").jqGrid('getRowData', value);
                var amount=Number(row["goodsNumber"])*Number(row["price"]);
                $("#grid").jqGrid('setRowData', value, {amount:amount}, {});
            });
            gridSum()
        }
        //串号导入
        function imeiDr(opt){
            var def = {
                gridConfig: {
                    colNames: ['id','商品id','仓库id','仓库名称','商品类别', '操作', '串号', '辅助串号', '商品编码'
                        , '商品名称','商品品牌','型号','颜色', '备注','库存量','是否串号管理','税率','串号列表','引入订单表id'
                        ,'采购日期' ,'原财务成本' ,'采购价' ,'入库日期' ,'入库价','计价方式','配置'
                        ,'contactUnitId','contactUnitName' ,'sectionId','sectionName','companyCostPrice','sectionCostPrice'
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
                        {name : 'contactUnitId',hidden:true},
                        {name : 'contactUnitName',hidden:true},
                        {name : 'sectionId',hidden:true},
                        {name : 'sectionName',hidden:true},
                        {name : 'companyCostPrice',hidden:true},
                        {name : 'sectionCostPrice',hidden:true},
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
    $('#dataGridGood').comModalsStoreGoodByStorageIds('setOption',{
        'girdParam':{
            'queryKey':"",
            'typeId':"",
            'menuCode':$('#AUTH').data('code'),
            'adjustmentType':$('#adjustmentType').val()
        },
    })
    $('#dataGridGood').next().trigger('click')
}
function imeiDelRow(id){
    $("#imeiDrGrid").delRowData(id);
    var num = $('#imeiDrGrid').getDataIDs();
    $('.imeiDr_num').text(num.length);
}