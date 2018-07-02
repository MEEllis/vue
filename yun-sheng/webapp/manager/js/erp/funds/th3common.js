//载入菜单组件
function initMenuBtn() {
    var option = {
        btnGroupLeft: {
            add: {
                isShow: true,
                click: function () {
                    location.href =location.href.substring(0,location.href.indexOf('?'));
                }
            },
            draftSave: {
                isShow: true,
                click: function () {
                    $("#topForm").data('bootstrapValidator').resetForm();
                    save()
                }
            },
            draftDel: {
                isShow: true,
                click: function () {
                    delDraftBill()
                }
            },
            draftPost: {
                isShow: true,
                click: function () {
                    post()
                }
            },
            print: {
                click: function () {
                    print()
                }
            },
            red: {
                click: function () {
                    redDashedBtClick();
                }
            },
            copy: {
                click: function () {
                    copyBtClick()
                }
            },
            audit: {
                isShow: false,
                click: function () {
                    var params = $("#topForm").toJsonObject();
                    var mainIds = $.trim(params.id)
                    var billsStatus = $.trim(params.billsStatus)
                    var isAudit = $.trim(params.isAudit)
                    if (billsStatus != '1' && mainIds != "" && isAudit == 0) {
                        $.ajaxPackage({
                            url: '/manager/inventory/fund/updateAuditStatus',
                            data: {billsType: billsType, billsId: mainIds, 'auditStatus': 1},
                            success: function (data) {
                                isDraft = 0;
                                queryPage({'currAtId':mainIds,'queryDir':'refresh'});
                                $.zxsaas_plus.showalert('success', data.desc || "稽核成功");
                            }
                        })
                    } else {
                        $.zxsaas_plus.showalert('提示', '只能对正式且未稽核单据稽核!');
                    }
                }
            },
            auditCancle: {
                isShow: false,
                click: function () {
                    var params = $("#topForm").toJsonObject();
                    var mainIds = $.trim(params.id)
                    var billsStatus = $.trim(params.billsStatus)
                    var isAudit = $.trim(params.auditStatus)
                    if (billsStatus != '1' && mainIds != "" && isAudit == 1) {
                        $.ajaxPackage({
                            url: '/manager/inventory/fund/updateAuditStatus',
                            data: {billsType: billsType, billsId: mainIds, 'auditStatus': 0},
                            success: function (data) {
                                isDraft = 0;
                                queryPage({'currAtId':mainIds,'queryDir':'refresh'});
                                $.zxsaas_plus.showalert('success', data.desc || "取消稽核成功");
                            }
                        })
                    } else {
                        $.zxsaas_plus.showalert('提示', '只能对已稽核单据取消稽核!');
                    }
                }
            },
            update: {
                click: function () {
                    try {MyEiditGrid.currEditDataGrid.unAllEdit();} catch (e) {}
                    var $searchFormID = $("#topForm");
                    var detailList = [];
                    var tableName=$('#dataGrid6')
                    if($('#tab1-1').is(':hidden')){
                        tableName=$('#dataGrid')
                    }
                    var ids = tableName.getDataIDs();
                    $.each(ids, function (i, value) {
                        var row = tableName.jqGrid('getRowData', value);
                        var imeiListCC = JSON.parse(row.imeiList||'[]')
                        var imeiList=[]

                        for(var j=0;j<imeiListCC.length;j++){
                            imeiList.push({
                                id: imeiListCC[j]["id"],
                                remark:  imeiListCC[j]["remark"],
                            });
                        }
                        detailList.push({
                            id: row["id"],
                            remark: row["remark"],
                            imeiList:imeiList
                        });
                    });
                    var id= $searchFormID.find("input[name='id']").val();
                    var obj = {
                        url:'/manager/inventory/fund/updateRemark',
                        data:JSON.stringify({
                            billsId:id,
                            billsType:billsType,
                            remark: $searchFormID.find("input[name='remark']").val(),
                            detailList: detailList
                        }),
                        contentType:"application/json",
                        success: function (data) {
                            isDraft = 0;
                            queryPage({'currAtId':id,'queryDir':'refresh'});
                            $.zxsaas_plus.showalert('success', data.desc || "修改备注成功");
                        }
                    };
                    $.ajaxPackage(obj)
                }
            },
        },
        btnGroupRight: {
            history: {
                isShow: true,
                click: function () {
                    if(billsType==32){
                        window.parent.openWorkBoxByMenutext("供应商返利单单据列表",  '/manager/inventory/fund/historyMain?billsType='+billsType,false);
                    }else if(billsType==33){
                        window.parent.openWorkBoxByMenutext("客户价保单单据列表", '/manager/inventory/fund/historyMain?billsType='+billsType,false);
                    } else if(billsType==34){
                        window.parent.openWorkBoxByMenutext("客户返利单单据列表", '/manager/inventory/fund/historyMain?billsType='+billsType,false);
                    }

                }
            }
        }
    }
    menuBtn = new componentMenuBtn("#MenuTool", option);
}
function reloadMenuBtn() {
    var updateKey=['print','printDropdown','red','copy','update','next','end','audit','auditCancle'];
    var addkey=['draftPost','draftDel','draftSave'];
    var params = $("#topForm").toJsonObject();
    var billsStatus=  $.trim(params.billsStatus)
    var isAudit=  $.trim(params.auditStatus)
    $.pageDetailCommon.reloadMenuTool({
        isDraftOp:isDraft,
        isAudit:isAudit,
        billsStatus:billsStatus,
        menuBtn:menuBtn,
        billsCode:params.billsCode,
        updateKey:updateKey,
        addkey:addkey,
    })
    //判断是否禁用
    if(isDraft == false){
        //单据：稽核状态
        if(isAudit==1){
            $('#auditImg').attr('src', '/manager/images/audit.png');
        }else{
            $('#auditImg').attr('src', '/manager/images/auditNo.png');
        }
        $(".gridTop :button").hide();
        dataGrid.$grid.setGridParam({cellEdit:false});
        dataGrid3.$grid.setGridParam({cellEdit:false});
        dataGrid6.$grid.setGridParam({cellEdit:false});
    }else{
        $('#auditImg').attr('src','')
        $(".gridTop :button").show();
        dataGrid.$grid.setGridParam({cellEdit:true});
        dataGrid3.$grid.setGridParam({cellEdit:true});
        dataGrid6.$grid.setGridParam({cellEdit:true});
    }
    if(billsType==32){
        $("#outImeiWrap").comImeiOutModal('isDisable',!isDraft)
    }
}
//删除草稿单
function delDraftBill() {
    var models = $(".gridTop").toJsonObject();
    var billsId=  $.trim(models.id)
    if(models.billsCode!=""){
        $.zxsaas_plus.showalert('提示','只能删除草稿单!');
    }else{
        $.zxsaas_plus.showconfirm('提示', "是否删除此草稿单？", function(){
            $.ajaxPackage({
                url:'/manager/inventory/fund/deleteBills',
                data:{billsId:billsId,billsType:billsType},
                success:function(data){
                    queryDir  = "refresh";
                    isDraft=1;
                    $.zxsaas_plus.showalert('success',data.desc || "删除成功");
                    setTimeout(function(){
                        location.href =location.href.substring(0,location.href.indexOf('?'));
                    },1500)
                }
            })
        });
    }
}
//
function initDataGrid3(){
    //配置
    var paras = {
        gridId:'dataGrid3',
        addRow:{remark:''},
        colNames:['主串号',  '辅助串号', '备注','串号id'],
        colModel:
            [
                {name : 'imei',align:'left',sortable: false,hidden: false,editable:false},
                {name : 'auxiliaryImei',align:'left',sortable: false},
                {name : 'remark',align:'left',editable:true,sortable: false},
                {name : 'id',hidden: true,editable:true,sortable: false},
            ]
    };
    //回调函数
    var callBackList = {
        afterEditCell:function(rowid,name,val,iRow,iCol){//开始编辑

        },
        afterSaveCell:function(rowid,name,val,iRow,iCol){//保存编辑

        },
        summary:function(rowid,name,val,iRow,iCol){//统计处理

        },
        getGridDataList:function(rows){
            //筛出不合格行
            return $.map(rows,function(row){
                if($.trim(row.imei) != ""){
					delete row["id"];
                    return row;
                }
            });
        }
    };
    dataGrid3 = new MyEiditGrid(paras,callBackList);

}

//追加一行数据
function appenRow3(imeiObj){
    if(!dataGrid6.isCanEdit())return;
    if(!dataGrid3.isExistRow({imei:imeiObj.imei})){
        dataGrid3.addRowData(MyEiditGrid.getMaxRowid($("#dataGrid3"))+1,imeiObj);
        $('#currInputNum').html(dataGrid3.getGridDataList().length);
    }
}
//点击保存明细事件
function saveImeiInput(){
    try {MyEiditGrid.currEditDataGrid.unAllEdit();} catch (e) {}
    var rowid = parseInt($("#dataGridRowId").val().split("|")[1]) ;
    var gridId = $("#dataGridRowId").val().split("|")[0] ;
    var objs =dataGrid3.getGridDataList();

    if(objs.length > 0){
        $("#"+gridId).jqGrid('setCell', rowid ,"imeiList" ,JSON.stringify(objs));
        if(billsType==33){
            $("#"+gridId).jqGrid('setCell', rowid ,"surNum" ,objs.length);
        }else if(billsType==32 || billsType==34){
            $("#"+gridId).jqGrid('setCell', rowid ,"rebateNum" ,objs.length);
        }
        $('#imeiInputModal').modal('hide');

        Summary6();
    }
}
//点击保存明细事件
function canelSaveImeiInput(){
    $('#imeiInputModal').modal('hide');
}
//打开串号录入
function openImeiInputModal(gridId,rowid){
    try {MyEiditGrid.currEditDataGrid.unAllEdit();} catch (e) {}
    var currRow = $("#dataGrid6").jqGrid('getRowData', rowid);
    dataGrid3.clearDataGrid();
    $("#"+dataGrid3.gridId).resize()
    //获取已录入的串号
    if($.trim(currRow.imeiList) != ""){
        var instrorageImList = JSON.parse(currRow.imeiList);
        $("#currInputNum").html(instrorageImList.length);
        $.each(instrorageImList,function(i,obj){
            dataGrid3.addRowData(i,obj);
        });
    }else{
        $("#currInputNum").html(0);
    }

    dataGrid3.$grid.resize()

    //清空界面表单
    $("#goodsnameTitle").html("商品信息："+currRow.goodsName6);

    $('#imeiInputModal').modal('show');
    $("#dataGridRowId").val(gridId+"|"+rowid);
}
//往来单位余额
function initWLDWamount(id){
    var obj={
        data:{
            contactUnitId:id,
        },
        success:function (data) {
            var amount=data.data.contactUnitAmountVo;
            $("#yuFu").val(amount.prePayBalance);
            $("#yingFu").val(amount.shouldPayBalance);
            $("#yuShou").val(amount.preReceiptBalance);
            $("#yingShou").val(amount.shouldReceiptBalance);
        }
    }
    InterfaceInventory.common.getContactUnitAmountVo(obj)
}
//复制单据
function copyBtClick(){
    isDraft=1
    $("#topForm").data('bootstrapValidator').resetForm();
    //置空不能复制的属性
    var kong = {
        billsCode:"",
        id:"",
        billsStatus:"",
        auditStatus:"",
    }
    $(".gridTop").writeJson2Dom(kong);
    pageIndex = 0;pageCount = 0;//新增时 设置当前页为0  以便从第一张开始查询
    $("#redDashedBt").attr({"disabled":"disabled"});
    $("#saveAndPostBt").removeAttr("disabled");
    $(".gridTop input:not(:hidden)").not('input[name="billsCode"]').prop("readonly", false);
    $("#bottomForm input").val('');
    $.showBillsStatus("billsStautsImg","1");
    $(".gridTop :button").show();
    initData = getPageData();
    reloadMenuBtn()
    $.zxsaas_plus.showalert('success',"单据复制成功");
}
//获取查询表单数据
function getQueryData(){
    var data = $(".filterParamForm").toJsonObject();
    data.haveInvalid = $("input[name='haveInvalid']").is(':checked');
    delete data.billsCode
    return data;
}

function initDataGrid(){
    var paras
    var callBackList
    //客户价保单
    if(billsType==33){
         paras = {
            gridId:'dataGrid',
            addRow:{goodsId:'',goodsCode:'',goodsName:'',goodsBrandName:'',stockNumber:'',numControlFlag:'',imControlFlag:'',cxNum:'',cxPrice:'',price:'',remark:''},
            colNames:['仓库ID','仓库名称','商品ID','商品名称','价保总额','备注','是否串号管理','是否辅助串号管理','串号列表','明细id'],
            colModel:
                [
                    {name : 'storageId',index : 'storageId',align:'left',sortable: false,hidden: true,formatter:'integer'},
                    //{name : 'storageName' ,sortable: false,index : 'storageName',align:'left',editable:true,edittype:'custom',editoptions:{custom_element:my_inputxx, custom_value:my_valuexx}},
                    {name : 'storageName',sortable: false,index : 'storageName',align:'left',edittype:'custom_bt_input',custom_element_bt_click:"selectStorageReferenceOpen",editable:true},
                    {name : 'goodsId',index : 'goodsId',align:'left',sortable: false,hidden: true,formatter:'integer'},
                    {name : 'goodsName',sortable: false,index : 'goodsName',align:'left',edittype:'custom_bt_input',custom_element_bt_click:"selectReferenceOpen",editable:true},
                    {name : 'surAmount',index : 'surAmount',align:'right',hidden: false,editable:true,sortable: false,formatter:'number'},
                    {name : 'remark',index : 'remark',hidden: false,editable:true,sortable: false,editoptions:{readonly:false,onkeyup:"checkInput.clearNoText(this,100)"}},
                    {name : 'ifManageImei',index : 'ifManageImei',hidden: true,editable:true,sortable: false},
                    {name : 'ifEnableAuxliaryImei',index : 'ifEnableAuxliaryImei',hidden: true,editable:true,sortable: false},
                    {name : 'imeiList',index : 'imeiList',hidden: true,editable:true,sortable: false},
                    {name : 'id',hidden: true},
                ]
        };
        //回调函数
         callBackList = {
            afterEditCell:function(rowid,name,val,iRow,iCol){//开始编辑
            },
            afterSaveCell:function(rowid,name,val,iRow,iCol){//保存编辑
                Summary();
            },
            summary:function(rowid,name,val,iRow,iCol){//统计处理
            },
            getGridDataList:function(rows){
                //筛出不合格行
                return $.map(rows,function(row){
                    if(row.goodsName != "" && row.storageName != ""){
                        row.surAmount = parseFloat(row.surAmount).toFixed(2);
                        delete row["op"];
                        delete row["index"];
                        delete row["ifEnableAuxliaryImei"];
                        delete row["ifManageImei"];
                        delete row["ifEnableAuxliaryImei"];
                        delete row["imeiList"];
                        return row;
                    }
                });
            }
        };
    }
    //供应商返利单、客户返利单
    else if(billsType==32 || billsType==34){
        var colNames
        var colModel
        if(billsType==32){
            colNames=['仓库ID','仓库名称','商品ID','商品名称','返利数量','单台返利','返利总额','备注','是否串号管理','是否辅助串号管理','串号列表','单据明细id']
            colModel=[
                {name : 'storageId',index : 'storageId',align:'left',sortable: false,hidden: true,formatter:'integer'},
                {name : 'storageName',sortable: false,index : 'storageName',align:'left',edittype:'custom_bt_input',custom_element_bt_click:"selectStorageReferenceOpen",editable:true},
                {name : 'goodsId',index : 'goodsId',align:'left',sortable: false,hidden: true,formatter:'integer'},
                {name : 'goodsName',sortable: false,index : 'goodsName', align:'left',edittype:'custom_bt_input',custom_element_bt_click:"selectReferenceOpen",editable:true},
                {name : 'rebateNum',index : 'rebateNum',align:'right',hidden: false,editable:true,sortable: false,formatter:'integer',editoptions:{onkeyup:"checkInput.clearNoNum(this,10)"}
                    ,dataEvents: [{
                        type: "focus",
                        fn: function(){
                            this.select()
                        }
                    }]
                },
                {name : 'perAmount',index : 'perAmount',align:'right',editable:true,editrules:{number:true},formatter:'number',sortable: false,editoptions:{
                    onkeyup:"checkInput.checkNum(this,12)"}
                    ,dataEvents: [{
                    type: "focus",
                    fn: function(){
                        this.select()
                    }
                }]
                    },
                {name : 'rebateAmount',index : 'rebateAmount',align:'right',editable:false,editrules:{number:true}
                    ,formatter:'number',sortable: false,editoptions:{onkeyup:"checkInput.checkNum(this,12)"}},
                {name : 'remark',index : 'remark',align:'left',hidden: false,editable:true,sortable: false,editoptions:{readonly:false,onkeyup:"checkInput.clearNoText(this,100)"}},
                {name : 'ifManageImei',index : 'ifManageImei',hidden: true,editable:true,sortable: false},
                {name : 'ifEnableAuxliaryImei',index : 'ifEnableAuxliaryImei',hidden: true,editable:true,sortable: false},
                {name : 'imeiList',index : 'imeiList',hidden: true,editable:true,sortable: false},
                {name : 'id',hidden: true,editable:false,sortable: false},
            ]
        }else{
            colNames=['仓库ID','仓库名称','商品ID','商品名称','返利总额','备注','是否串号管理','是否辅助串号管理','串号列表','单据明细id']
            colModel=[
                {name : 'storageId',index : 'storageId',align:'left',sortable: false,hidden: true,formatter:'integer'},
                {name : 'storageName',sortable: false,index : 'storageName',align:'left',edittype:'custom_bt_input',custom_element_bt_click:"selectStorageReferenceOpen",editable:true},
                {name : 'goodsId',index : 'goodsId',align:'left',sortable: false,hidden: true,formatter:'integer'},
                {name : 'goodsName',sortable: false,index : 'goodsName', align:'left',edittype:'custom_bt_input',custom_element_bt_click:"selectReferenceOpen",editable:true},
                {name : 'rebateAmount',index : 'rebateAmount',align:'right',editable:true,editrules:{number:true}
                    ,formatter:'number',sortable: false,editoptions:{onkeyup:"checkInput.checkNum(this,12)"}},
                {name : 'remark',index : 'remark',hidden: false,editable:true,sortable: false,editoptions:{readonly:false,onkeyup:"checkInput.clearNoText(this,100)"}},
                {name : 'ifManageImei',index : 'ifManageImei',hidden: true,editable:true,sortable: false},
                {name : 'ifEnableAuxliaryImei',index : 'ifEnableAuxliaryImei',hidden: true,editable:true,sortable: false},
                {name : 'imeiList',index : 'imeiList',hidden: true,editable:true,sortable: false},
                {name : 'id',hidden: true,editable:false,sortable: false},
            ]
        }
        //配置
         paras = {
            gridId:'dataGrid',
            addRow:{goodsId:'',goodsCode:'',goodsName:'',goodsBrandName:'',stockNumber:'',numControlFlag:'',imControlFlag:'',cxNum:'',cxPrice:'',price:'',remark:''},
            colNames:colNames,
            colModel:colModel
        };

        //回调函数
         callBackList = {
            afterEditCell:function(rowid,name,val,iRow,iCol){//开始编辑
            },
            afterSaveCell:function(rowid,name,val,iRow,iCol){//保存编辑
                Summary();
                if(name == "storageName" || name == "goodsName"){
                    $("#dataGrid").jqGrid('setCell', rowid ,"stockNum",0);
                }
            },
            summary:function(rowid,name,val,iRow,iCol){//统计处理

            },
            getGridDataList:function(rows){
                //筛出不合格行
                return $.map(rows,function(row){
                    if(row.goodsName != "" && row.storageName != ""){
                        row.rebateAmount = parseFloat(row.rebateAmount).toFixed(2);
                        delete row["op"];
                        delete row["index"];
                        delete row["ifEnableAuxliaryImei"];
                        delete row["ifManageImei"];
                        delete row["ifEnableAuxliaryImei"];
                        delete row["imeiList"];
                        return row;
                    }
                });
            }
        };
    }

    dataGrid = new MyEiditGrid(paras,callBackList);
    dataGrid.clearDataGrid();dataGrid.addKongRow();
}