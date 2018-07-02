var signName='商品移库单'
$(function(){
    var EventList=$({});//总线
    EventList.on({
        clearAll:function(){//清空表格内容
            $('#billsHeader input,#collapseExample input').val('');
            $('#managersName').val('').removeData()
            $('#DepartmentName').data('id',null);
            $("#grid").jqGrid("clearGridData");
        },
        draftSign:function(){//草稿单状态
            $('.slideThree').css('background','#D09E85');
            $('#billsDateString,#outStorage,#inStorage,#remark,#otherOutstroNumIdStr,.imeiImport,#save,#del,#deliver,#print').prop('disabled',false);
            $('#print').prop('disabled',true);
            $('.inputAssPlus,.del,#add').css({
                'width':'auto',
                'overflow':'hidden'
            })
            $('#billsStautsImg').hide()
            $("#slideThree").prop('checked',false)
            reloadMenuBtn()
        },
        draftSignNull:function(){//草稿未查到数据状态
            $('.slideThree').css('background','#D09E85');
            $('#billsDateString,#outStorage,#inStorage,#remark,#otherOutstroNumIdStr,.imeiImport,#save').prop('disabled',false);
            $('#del,#deliver,#print,#copy').prop('disabled',true);
            $('.inputAssPlus,.del,#add').css({
                'width':'auto',
                'overflow':'hidden'
            })
            $('#billsStautsImg').hide()
            $("#slideThree").prop('checked',false)
            reloadMenuBtn()
        },
        formalSign:function(){//正式状态
            $('.slideThree').css('background','#8BAEC7');
            $('#billsHeader input,#billsHeader select,#collapseExample input,#otherOutstroNumIdStr,.imeiImport,#deliver,#del').prop('disabled',true);
            $('#remark,#save,#print,#copy').prop('disabled',false);
            $('.inputAssPlus,.del,#add').css({
                'width':0,
                'overflow':'hidden'
            })
            $('#filtrationChoose .inputAssPlus').css({
                'width':'auto',
                'overflow':'hidden'
            })
            $('#billsStautsImg').show()
            $("#slideThree").prop('checked',true)
            reloadMenuBtn()
        },
        formalSignNull:function(){//正式未查询到数据状态
            $('.slideThree').css('background','#8BAEC7');
            $('#billsHeader input,#billsHeader select,#collapseExample input,#otherOutstroNumIdStr,.imeiImport,#deliver,#del,#save,#remark,#print,#copy').prop('disabled',true);
            $('.inputAssPlus,.del,#add').css({
                'width':0,
                'overflow':'hidden'
            })
            $('#filtrationChoose .inputAssPlus').css({
                'width':'auto',
                'overflow':'hidden'
            })
            $('#billsStautsImg').hide()
            $("#slideThree").prop('checked',true)
            reloadMenuBtn()
        }
    })
    //表格
    $.jgrid.defaults.width = 1280;
    $.jgrid.defaults.responsive = true;
    $.jgrid.defaults.styleUI = 'Bootstrap';
    var lastrow = null,lastcell = null;
    var hasPermissions=false;//是否可以展示单价，金额的权限  ；默认 不显示
    init()
    // 初始化
    function init(){
        initMenuBtn()
        initMenu()
        initFilter()
        initTopForm()
        initTable()
        initImeiDr()
        initRender();
        initnumberChoose()
        getAuthList(function(){})
        //报表查询
        var billsId = $.trim(functionObjExtent.getQueryString('billsId'))
        if(billsCode!='' && billsId != ''){
            $("#slideThree").prop('checked',true)
            $('#isDraft').val(0)
            $('#selBillsCode').val(billsCode)
            billSearch("",'',billsId,function(){
                var copyFlag = functionObjExtent.getQueryString('copyFlag')
                if(copyFlag==1){
                    $('#copy').trigger('click')
                }

            })
        }
        else{
            //草稿单据
            if(billsId!=""){
                $("#slideThree").prop('checked',false)
                $('#isDraft').val(1)
                billSearch('','',billsId,'')
            }else{
                getDefaultValues()
                $("#add").trigger('click')
            }
        }
        //是否有权限看到单价和金额
        var obj={
            data:{
                menuCode:$("#AUTH").data('code'),
                funCode:'CKCBJ'
            },
            success:function(data){
                if(data.data.hasPermissions===true){
                    $("#grid").setGridParam().showCol("price").showCol("amount").trigger("reloadGrid");
                    hasPermissions=data.data.hasPermissions;
					if(billsCode=='' && billsId == ''){
						$("#add").trigger('click')
					}
                }

            }
        }
        InterfaceInventory.common.validateAccessToken(obj)
    }
    //获取默认值
    function getDefaultValues(){
        var obj={
            success:function(data){
                var deSe=data.data.defaultSection;
                var deEm=data.data.defaultEmployee;
                $('#DepartmentName').val(deSe.name).data('id',deSe.sectionId)
                $('#managersName').val(deEm.name).data('id',deEm.employeeId)
                RequestSection(true);
            }
        }
        InterfaceInventory.common.getDefaultValues(obj);
    }
    //初始化导入方法
    function initImeiEvent(){
        $('.imeiImport').click(function(){
            var sectionId = $('#DepartmentName').data('id');
            var storageId = $('#outStorage').val();
            if(storageId == "" || storageId == undefined ){
                $.zxsaas_plus.showalert('提示','请选择移出仓库');
            }else{
                $('#imeiDr-modal').modal('show');
                $('.imeiDr_vone,.imeiDr_vtwo').val('');
                $('.imeiDr_num').text(0);
                $("#imeiDrGrid").clearGridData().trigger('reloadGrid').resize();
            }
        })
        //导入
        $('.imeiDr_import').click(function(){
            $(".imeiDr_vtwo").val('');
            //拿到外层表格串号
            var sectionId = $('#DepartmentName').data('id');
            var storageId = $('#outStorage').val();
            var ids = $('#grid').getDataIDs();
            var arrs = [];
            $.each(ids,function(i,index){
                var row = $('#grid').getRowData(index);
                var idJoin = row.imeiIds.split(',');
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
                    sectionId: sectionId,
                    imeiInputData: str,
                    menuCode:$('#AUTH').data('code'),
                    showCost:hasPermissions==true?1:0 //权限：是否可以拉去价格
                },
                success: function (data) {
                    if(data.result==1){
                        var failed = data.data.failedResultList;
                        var list = data.data.successResultList;
                        var txt = $(".imeiDr_vtwo").val();
                        $.each(list,function(i,item){
                            if(item.storageId == storageId ){
                                $("#imeiDrGrid").addRowData(item.imeiId,item);
                            }else{
                                txt += '串号:['+ item.imei + ']在其他仓库['+ item.sectionName + ' ' + item.storageName + '],不允许出库!\n';
                            }
                        })
                        var num = $('#imeiDrGrid').getDataIDs();
                        $('.imeiDr_num').text(num.length);
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
        //导入确定
        $('.imeiDr_sure').click(function(){
            $('#imeiDr-modal').modal('hide');
            var dataIds = $("#grid").getDataIDs();
            var num = dataIds.length;
//    	临时存储串号作对比
            var t1 = [],t2 = [],t3 = [],t4 = [],t5 = [];
            $.each(dataIds,function(i,index){
                var dataRow = $('#grid').getRowData(index);
                t2.push(dataRow.goodsId);
                t3.push(index);
                t4.push(dataRow.storageId);
                t5.push(dataRow.code);
                var idJoin = dataRow.imeiIds.split(',');
                $.each(idJoin,function(j,item){
                    t1.push(item+'_'+index);
                });
            });
//    	循环表格数据添加
            var ids = $("#imeiDrGrid").getDataIDs();
            $.each(ids,function(i,item){
                var row = $('#imeiDrGrid').getRowData(item);
                var price =Number(functionObjExtent.delcommafy($.formatFloat(Number(row.costPrice),2)))
                var amount =price;
                var addRow=function(){
                    delKongRow()
                    $('#add').click();
                    var dataIds = $("#grid").getDataIDs();
                    var num = dataIds.length;
                    var id=dataIds[num-1]
                    //移动加权平均价
                    if(row.valuationMethods==2){
                        if(Number(row.totalAmount)>0){
                            price=Number(functionObjExtent.delcommafy($.formatFloat(row.totalAmount/row.stockCount,2)))
                            amount=price
                        }
                    }

                    $("#grid").setRowData(id,{
                        storageId: row.storageId,
                        storageName: row.storageName,
                        categoryName: row.categoryName,
                        code: row.code,
                        goodsName: row.name,
                        brandName: row.brandName,
                        models: row.models,
                        color: row.color,
                        stockCount: row.stockCount,
                        imeiIds: row.imeiId,
                        goodsId: row.goodsId,
                        remark: row.remark,
                        ifManageImei: row.ifManageImei,
                        valuationMethods: row.valuationMethods,
                        goodsNumber: 1,
                        'price':price,
                        'amount':amount
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
//					判断是否同一仓库并且是否同一商品
                        var sign = -1;
                        for(var x = 0;x<t4.length;x++){
                            if(t4[x] == row.storageId && t5[x] == row.code){
                                sign = x;
                            }
                        }
                        if(sign == -1){
                            addRow()
                        }
                        else{
                            var existRow = $('#grid').getRowData(t3[sign]);
                            if(existRow.imeiIds == ""){
                                var opt = row.imeiId;
                            }else{
//							判断是否已存在
                                var flag = true;
                                var int = existRow.imeiIds.split(',');
                                $.each(int,function(i,item){
                                    if(item == row.imeiId){
                                        flag = false;
                                        return
                                    }
                                })
                                if(flag == false){
                                    return
                                }else{
                                    var opt = existRow.imeiIds +','+row.imeiId;
                                }
                            }
                            var optNum = opt.split(',');
                            var currentGridAmount=Number(functionObjExtent.delcommafy($("#grid").jqGrid("getCell",t3[sign],"amount")))
                            var price =0;
                            var amountSum =currentGridAmount+Number(row.costPrice)
                            var amountSumStr =Number(functionObjExtent.delcommafy($.formatFloat(amountSum,2)))
                            var goodsNumber=optNum.length
                            if(amountSum>0){
                                price=Number(functionObjExtent.delcommafy($.formatFloat(amountSum/goodsNumber,2)))
                            }

                            //移动加权平均价
                            if(row.valuationMethods==2){
                                var gridRow=$("#grid").jqGrid("getRowData",t3[sign]);
                                price =gridRow.price;
                                amountSumStr=Number(functionObjExtent.delcommafy(gridRow.price))*goodsNumber
                            }

                            $("#grid").setRowData(t3[sign],{
                                goodsNumber: goodsNumber,
                                imeiIds: opt,
                                "price":price,
                                "amount":amountSumStr
                            });

                        }

                    }

                }

            })
            checkIfManageImeiIcon()
			gridSum()
        })
	}

    //初始化菜单栏
    function initMenu(){
        //查询
        $('.billSearch').click(function(){
            var _thisCode=$(this).data('code');
            billSearch(_thisCode,function(){
                switch (_thisCode){
                    case 'F':
                        $.zxsaas_plus.showalert('error','未查询到单据!');
                        break;
                    case 'P':
                        $.zxsaas_plus.showalert('error','没有上一单了!');
                        break;
                    case 'N':
                        $.zxsaas_plus.showalert('error','没有下一单了!');
                        break;
                    case 'L':
                        $.zxsaas_plus.showalert('error','未查询到单据!');
                        break;
                }
            })
        })
        //新增
        $('#new').click(function(){
            window.location.href=basePath+'/inventory/storage/products/move/main';
        })
        $('#save').click(function(){
			$("#grid").jqGrid('saveCell',lastrow,lastcell);
            var obj=billsData(),urlParam=null,canSave=true;
            if(!obj.sectionId){$.zxsaas_plus.showalert('warning','部门不能为空!');return false;}
            if(obj.moveOutStorageId==obj.moveInStorageId){$.zxsaas_plus.showalert('warning','移出与移入仓库不能相同!');return false;}
            if(!obj.billsDateStr){$.zxsaas_plus.showalert('warning','未填写日期!');return false;}
            if(!obj.detailList.length){$.zxsaas_plus.showalert('warning','调拨明细为空!');return false;}
            var ids=$("#grid").jqGrid("getDataIDs");
            $.each(ids,function(i,val){
                var rowDataGoodsNum=$("#grid").jqGrid("getRowData",val).goodsNumber;
                if(rowDataGoodsNum==0){
                    $.zxsaas_plus.showalert('warning','调拨数量不能为0!');
                    canSave=false;
                    return false;
                }
            })
            if(canSave){
                if($('#isDraft').val()==1){//草稿
                    urlParam=$('#billsId').val()==''?'auth_add':'auth_update';
                    $.request({
                        type:'post',
                        url:basePath+'/inventory/storage/products/move/saveDraftOrder/'+urlParam,
                        data:{order:JSON.stringify(obj)},
                        dataType:'json',
                        success:function(data){
                            if(data.result==1){
                                $('#billsId').val(data.data.orderId);
                                if(data.data.orderId){
                                    footDataRender(true,{
                                        billsId:data.data.orderId,
                                        isDraft:$('#isDraft').val()
                                    })
                                }
                                EventList.trigger('draftSign');
                                $.zxsaas_plus.showalert('success','保存成功！');
                            }else{
                                $.zxsaas_plus.showalert('error',data.desc);
                            }
                        },
                        error:function(){
                            alert('请求失败！')
                        }
                    })
                }else{//正式
                    $.request({
                        type:'post',
                        url:basePath+'/inventory/storage/products/move/updateOfficialOrder',
                        data:{order:JSON.stringify(obj)},
                        dataType:'json',
                        success:function(data){
                            if(data.result==1){
                                $('#billsId').val(data.data.orderId);
                                if(data.data.orderId){
                                    footDataRender(true,{
                                        billsId:data.data.orderId,
                                        isDraft:$('#isDraft').val()
                                    })
                                }
                                EventList.trigger('formalSign');
                                $.zxsaas_plus.showalert('success','保存成功！');
                            }else{
                                $.zxsaas_plus.showalert('error',data.desc);
                            }
                        },
                        error:function(){
                            alert('请求失败！')
                        }
                    })
                }
            }
        })
        //删除
        $("#del").click(function(){
            $.zxsaas_plus.showconfirm('提示','确定删除此草稿单?',function(){
                $.request({
                    type:'post',
                    url:basePath+'/inventory/storage/products/move/deleteDraftOrder',
                    data:{ids:$('#billsId').val()},
                    dataType:'json',
                    success:function(data){
                        if(data.result==1){
                            $.zxsaas_plus.showalert('success','删除成功!')
                                EventList.trigger('clearAll');
                                $('#isDraft').val(1)
                                billSearch('L',function(){
                                    EventList.trigger('draftSignNull');
                                    $.zxsaas_plus.showalert('error','未查询到单据!');
                                })

                        }else{
                            $.zxsaas_plus.showalert('error',data.desc);
                        }
                    },
                    error:function(){
                        alert('请求失败！')
                    }
                })
            });
        })
        //过账
        $('#deliver').click(function(){
            $.request({
                type:'post',
                url:basePath+'/inventory/storage/products/move/executeDraftOrder',
                data:{
                    id:$('#billsId').val(),
                    isDraft:$('#isDraft').val()
                },
                dataType:'json',
                success:function(data){
                    if(data.result==1){
                        $('#isDraft').val(0)
                        var res=data.data.order;
                        drawGrid(res)
                        $('#slideThree').prop('checked',true);
                        $.zxsaas_plus.showalert('success','过账成功!');
                    }else{
                        $.zxsaas_plus.showalert('error',data.desc);
                    }
                },
                error:function(){
                    alert('请求失败！')
                }
            })
        })
        //打印
        $('.printOpt').click(function(){
            var templateURL= basePath + '/inventory/storage/products/move/print';
            var paras= {
                isDraft:$('#isDraft').val(),
                billsId:$('#billsId').val(),
                printType:$(this).data('type'),
                checkCost:hasPermissions
            };
            $.printBills(templateURL,paras)
        })
        //过滤
        $('#filter').click(function(){
            $('#filtrationChoose').modal('show');
        })
        //复制
        $('#copy').click(function(){
            var code=$('#billsCode').val()
            if(code.indexOf('_R')>-1){
                $.zxsaas_plus.showalert('error','红冲R单据不允许复制!');
                return;
            }
            EventList.trigger('draftSign');
            $('#slideThree').prop('checked',false);
            //清空底部信息
            $('#bottomForm')[0].reset()
            $("#billsHeader input[name='billsCode']").val('')
            $('#billsId').val('')
            $('#isDraft').val(1)
            $('#billsStatus').val('')
        })
        //状态切换按钮
        $("#slideThree").click(function(){//单据切换按钮
            if($('#isDraft').val()==1){
                EventList.trigger('clearAll');
                $('#isDraft').val(0);
                $('.imeiImport').attr('disabled',true);
                billSearch('L',function(){
                    EventList.trigger('formalSignNull');
                    $.zxsaas_plus.showalert('error','未查询到单据!');
                })
            }else{
                EventList.trigger('clearAll');
                $('#isDraft').val(1);
                $('.imeiImport').attr('disabled',false);
                billSearch('L',function(){
                    EventList.trigger('draftSignNull');
                    $.zxsaas_plus.showalert('error','未查询到单据!');
                })
            }
        })
    }
    // 初始化 过滤
    function initFilter(){
        //过滤窗筛选条件
        $('#startTimeStr').inputCombination().click(function(){
            $(this).datetimepicker({
                maxDate:$('#endTimeStr').val()
            })
        });
        $('#startTimeStr').datetimepicker({
            lang: "ch", //语言选择中文
            format: "Y-m-d", //格式化日期
            timepicker: false, //关闭时间选项
            todayButton: false,//关闭选择今天按钮
        })
        $('#endTimeStr').inputCombination().click(function(){
            $(this).datetimepicker({
                minDate:$('#startTimeStr').val()
            })
        })
        $('#endTimeStr').datetimepicker({
            lang: "ch", //语言选择中文
            format: "Y-m-d", //格式化日期
            timepicker: false, //关闭时间选项
            todayButton: false,//关闭选择今天按钮
        })
        $('#selBillsCode,#selRemark,#selImei').inputCombination();
        $('#filSearch').click(function(){
            $('#filtrationChoose').modal('hide');
            $('#first').click()
        })
        $('#filReset').click(function(){//过滤重置
            var inputs=$('#filterForm').find('input');
            $.map(inputs, function(item, index){
                $(item).val('').data('id',null);
            });
        })
        //部门选择
        $("#departmentName").storePlu({
            isStoreShow:false,
            isLoadDefaultName:0,
            checkMore: true,
            search: false,
            ifStore: false, // 控制部门选项
            changeStore:function(){
                var $obj=$("#departmentName");
                $obj.data('id',$obj.data('sectionId'))
            }
        }).inputCombination();
    }
    // 初始化 顶部表单
    function initTopForm(){
        //部门选择
        $("#DepartmentName").storePlu({
            isStoreShow:false,
            isLoadDefaultName:0,
            checkMore: false,
            search: false,
            ifStore: false, // 控制部门选项
            changeStore:function(){
                var $obj=$("#DepartmentName");
                $obj.data('id',$obj.data('sectionId'))
                $('#managersName').val('').removeData()
                RequestSection(true);
                $("#grid").jqGrid("clearGridData");
            }
        })
        //单据日期
        $('#billsDateString').datePlu({
            ajaxOpt:{
                async:false,
            },
            endDate: false,
        });
        //移出仓库
        $('#outStorage').change(function(){
            $("#grid").jqGrid("clearGridData");
        })
        //经办人
        $("#managersName").comModalsEmployeeBySection({
            sectionIds:'#DepartmentName'
        })
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
                        $('#save').trigger('click')
                    }
                },
                draftDel: {
                    isShow: isDraftOp,
                    click: function () {
                        $('#del').trigger('click')
                    }
                },
                draftPost:{
                    isShow: !isDraftOp,
                    click: function () {
                        $('#deliver').trigger('click')
                    }
                },
                red:{
                    isShow: !isDraftOp,
                    click: function () {
                        $('#abandon').trigger('click')
                    }
                },
                printDropdown:{
                    isShow: !isDraftOp,
                    list:[{
                        name:'商品汇总',
                        click:function(){
                            print('numberDetail')
                        }
                    },{
                        name:'商品明细',
                        click:function(){
                            print('imeiDetail')
                        }
                    }]
                },
                copy:{
                    isShow: !isDraftOp,
                    click: function () {
                        $('#copy').trigger('click')
                    }
                },
                audit:{
                    isShow: !isDraftOp,
                    click: function () {
                        var topFormObj = $(".gridTop").toJsonObject();
                        $.ajaxPackage({
                            url: '/manager/jxc/storage/allocate/documentList/updateIsAudit',
                            data: {
                                'billsId':topFormObj.billsId,
                                'auditStatus':1,
                            },
                            success: function (data) {
                                $.zxsaas_plus.showalert('success', "稽核成功");
                                billSearch('','',topFormObj.billsId)
                            }
                        })
                    }
                },
                auditCancle:{
                    isShow: !isDraftOp,
                    click: function () {
                        var topFormObj = $(".gridTop").toJsonObject();
                        $.ajaxPackage({
                            url: '/manager/jxc/storage/allocate/documentList/updateIsAudit',
                            data: {
                                'billsId':topFormObj.billsId,
                                'auditStatus':0,
                            },
                            success: function (data) {
                                $.zxsaas_plus.showalert('success', "取消稽核成功");
                                billSearch('','',topFormObj.billsId)
                            }
                        })
                    }
                },
                update:{
                    isShow: !isDraftOp,
                    click: function () {
                        $('#save').trigger('click')
                    }
                },
            },
            btnGroupRight: {
                history: {
                    isShow: true,
                    click: function () {
                        goHistory()
                    }
                }
            }
        };
        menuBtn = new componentMenuBtn("#MenuTool", option);
        //打印
        function print(type) {
            var templateURL= basePath + '/inventory/storage/products/move/print';
            var paras= {
                isDraft:$('#isDraft').val(),
                billsId:$('#billsId').val(),
                printType:type,
                checkCost:hasPermissions
            };
            $.printBills(templateURL,paras)
        }
    }
    //重载菜单组件
    function reloadMenuBtn() {
        var isDraftOp=!$("#slideThree").is(':checked')
        var updateKey=['printDropdown','red','copy','update','audit','auditCancle'];
        var addkey=['draftDel','draftSave','draftPost'];
        var params = $("#billsHeader").toJsonObject();
        var isAudit=  $.trim(params.auditStatus)
        var billsStatus=  $.trim(params.billsStatus)
        $.pageDetailCommon.reloadMenuTool({
            isDraftOp:isDraftOp,
            isAudit:isAudit,
            billsStatus:billsStatus,
            menuBtn:menuBtn,
            billsCode:params.billsCode,
            updateKey:updateKey,
            addkey:addkey,
        })
        //判断是否禁用
        if(isDraftOp == false){
            //单据：稽核状态
            if(isAudit==1){
                $('#auditImg').attr('src', '/manager/images/audit.png');
            }else{
                $('#auditImg').attr('src', '/manager/images/auditNo.png');
            }
            $('#grid').setGridParam().hideCol("deliveryDo");
            $('.moveFlag').hide()
        }else{
            $('#auditImg').attr('src','')
            $('#grid').setGridParam().showCol("deliveryDo");
            $('.moveFlag').show()
        }
        $('#grid').setColProp('goodsName',{editable: !!isDraftOp})
        $('#grid').setColProp('goodsNumber',{editable: !!isDraftOp})
    }
    //初始化 出库串号
    function initImeiDr(){
        imeiDr()
        //出库串号
        $('#otherOutstroNumIdStr').inputCombination().keyup(function(e){
            if(e.keyCode==13&&$(this).val()!=''){
                $("#grid").jqGrid("saveCell", lastrow, lastcell);
                $(this).blur();
                if($('#DepartmentName').data('id')==null){
                    $.zxsaas_plus.showalert('warning','请选择部门!');
                }else{
                    var ids=$("#grid").jqGrid("getDataIDs");
                    $.each(ids,function(i,val){
                        var rowData=$("#grid").jqGrid("getRowData",val);
                        if(rowData.goodsId=='')$('#grid').jqGrid('delRowData', val);
                    })
                    $.request({
                        type:'post',
                        url:basePath+'/inventory/common/getStockGoodsImeiVoList',
                        dataType:'json',
                        data:{
                            sectionId:$('#DepartmentName').data('id'),
                            storageId:$('#outStorage').val(),
                            menuCode:$('#AUTH').data('code'),
                            queryKey:$(this).val()
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

                            }else{
                                $.zxsaas_plus.showalert('error',data.desc);
                            }
                        },
                        error:function(){
                            alert('请求失败！')
                        }
                    })
                }
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
                    var ids=$('#grid').getDataIDs();
                    $.each(ids,function(j,rowid){
                        var idxRowData=$("#grid").jqGrid("getRowData",rowid);
                        var pid=idxRowData.goodsId;//商品id
                        var arrval=idxRowData.imeiIds;//商品串号群明细
                        var num=Number(idxRowData.goodsNumber);//数量
                        if(val.goodsId==pid){//如果商品相同
                            appendSwitch=false;
                            var newArr=$.grep(arrval.split(','),function(n){return $.trim(n).length > 0;});
                            if($.inArray(val.imeiId.toString(),newArr)==-1){
                                newArr.push(val.imeiId);
                                var currentGridAmount=Number(functionObjExtent.delcommafy($("#grid").jqGrid("getCell",rowid,"amount")))
                                var price =0;
                                var amountSum =currentGridAmount+Number(val.costPrice)
                                var amountSumStr =Number(functionObjExtent.delcommafy($.formatFloat(amountSum,2)))
                                var goodsNumber=num+1
                                if(amountSum>0){
                                    price=Number(functionObjExtent.delcommafy($.formatFloat(amountSum/goodsNumber,2)))
                                }
                                //移动加权平均价
                                if(val.valuationMethods==2){
                                    var gridRow=$("#grid").jqGrid("getRowData",rowid);
                                    price =gridRow.price;
                                    amountSumStr=Number(functionObjExtent.delcommafy(gridRow.price))*goodsNumber
                                }
                                $("#grid").jqGrid("setCell",rowid,"imeiIds",newArr);
                                $("#grid").jqGrid("setCell",rowid,"goodsNumber",goodsNumber);
                                $("#grid").jqGrid("setCell",rowid,"price",price);
                                $("#grid").jqGrid("setCell",rowid,"amount",amountSumStr);
                            }
                            return false;
                        }else{//如果仓库相同但商品不同
                            appendSwitch=true;
                        }
                    })
                    if(!ids.length||appendSwitch){
                        var maxId = ids.length == 0 ? 0 : Math.max.apply(null,ids);
                        var price =Number(functionObjExtent.delcommafy($.formatFloat(Number(val.costPrice),2)))
                        var goodsNumber =1
                        var amount =price

                        //移动加权平均价
                        if(val.valuationMethods==2){
                            if(Number(val.totalAmount)>0){
                                price=Number(functionObjExtent.delcommafy($.formatFloat(val.totalAmount/val.stockCount,2)))
                                amount=price
                            }
                        }
                        delKongRow()
                        $('#grid').jqGrid('addRowData', maxId + 1, {
                            goodsName:val.name,
                            categoryName:val.categoryName,
                            code:val.code,
                            brandName:val.brandName,
                            models:val.models,
                            color:val.color,
                            goodsNumber:goodsNumber,
                            remark:val.remark,
                            goodsId:val.goodsId,
                            stockCount: val.stockCount,
                            ifManageImei:val.ifManageImei,
                            storageId: val.storageId,
                            imeiIds:[val.imeiId],
                            price:price,
                            amount:amount,
                        }, 'last');
                    }
                })
                calcPrice();
                $('#otherOutstroNumIdStr').val('').focus();
                checkIfManageImeiIcon();
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
                    colNames: ['id','商品id','仓库id','仓库名称','商品类别', '操作', '串号', '辅助串号', '商品编码', '商品名称','商品品牌','型号','颜色', '备注','库存量','是否串号管理','税率','串号列表','引入订单表id','成本价','库存数','商品总额','计价方式'],
                    colModel: [
                        {name: 'imeiId', index: 'imeiId', width: 1, hidden: true},
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
                        {name: 'salesOutstrorageImDraftList',index : 'salesOutstrorageImDraftList',sortable: false,hidden:true},
                        {name : 'orderDetailId',index : 'orderDetailId',sortable: false,hidden:true},
                        {name : 'costPrice',index : 'costPrice',sortable: false,hidden:true},
                        {name: 'stockCount', index: 'stockCount',align: 'center',sortable: true,width:100},
                        {name: 'totalAmount', index: 'totalAmount',hidden:true},
                        {name: 'valuationMethods', index: 'valuationMethods',hidden:true}
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

            initImeiEvent();

        }
    }
    // 初始化表格
    function initTable(){
        $('#grid').jqGrid({
            datatype: "local",
            colNames:['操作', '<i class="bitianX">*</i>商品名称', '现库存','<i class="bitianX">*</i>移库数量','商品串号明细','单价','金额', '备注','类别','商品编码', '品牌','型号','颜色',
                 'goodsId','是否管理串号','仓库id','计价方式','明细id'],
            colModel:[
                {name: 'deliveryDo', index: 'deliveryDo', width:80, align: 'center', formatter: addAndDelete, sortable: false},
                {name: 'goodsName', index: 'goodsName', width:200, align: 'left', sorttype: 'string', sortable: false, editable: true, edittype: 'custom', editoptions: {
                    custom_element: function(value, options) {
                        return '<input value="'+value+'" type="text" readonly="readonly" class="form-control"/><span style="margin-top:-25px;margin-left:-40px;" class="spmc glyphicon glyphicon-plus colspan2" ></span></span>';
                    },
                    custom_value: function(value) {
                        return value.val();
                    }
                }
                },
                {name: 'stockCount', index: 'stockCount', width: 70, align: 'right', sortable: false},
                {name: 'goodsNumber', index: 'goodsNumber', width:100, align: 'right', sorttype: 'integer',formatter:'number', formatoptions:{decimalPlaces:0},editable: true, sortable: false, editoptions: {
                    dataEvents: [{
                        type: "blur",
                        fn: function(){
                            $("#grid").jqGrid("saveCell", lastrow, lastcell);
                        }
                    },{
                        type: "focus",
                        fn: function(){
                            this.select()
                        }
                    }]
                }
                },
                {name: 'imeiIds', index: 'imeiIds',hidden:true},
                {name: 'price',index:'price' ,width: 100,align: 'right', sorttype: 'integer',formatter: 'number', formatoptions:{decimalPlaces:2}, sortable: false,hidden:true},
                {name: 'amount',index:'amount',width: 100,align: 'right', sorttype: 'integer',formatter: 'number', formatoptions:{decimalPlaces:2}, sortable: false,hidden:true},
                {name: 'remark', index: 'remark', width: 200, align: 'left', sorttype: 'string', editable: true, sortable: false, editoptions: {
                    dataEvents: [{
                        type: "blur",
                        fn: function(){
                            $("#grid").jqGrid("saveCell", lastrow, lastcell);
                        }
                    },{
                        type: "focus",
                        fn: function(){
                            this.select()
                        }
                    }]
                }
                },

                {name: 'categoryName', index: 'categoryName', width: 70, align: 'left', sortable: false},
                {name: 'code', index: 'code', width: 140, align: 'left', sortable: false},
                {name: 'brandName', index: 'brandName', width: 140, align: 'left', sortable: false},
                {name: 'models', index: 'models', width: 70, align: 'left', sortable: false},
                {name: 'color', index: 'color', width: 70, align: 'left', sortable: false},
                {name: 'goodsId',index:'goodsId',hidden:true},
                {name: 'ifManageImei',index:'ifManageImei',hidden:true},
                {name: 'storageId',index:'storageId',hidden:true},
                {name: 'valuationMethods',index:'valuationMethods',hidden:true},
                {name: 'id',hidden:true},
            ],
			rowNum:-1,
			sortable:false,
			rownumbers:true,
			cellsubmit:'clientArray', //单元格保存内容的位置
			editurl:'clientArray',
			viewrecords:true,
			multiselect:false,
			cellEdit:true,
			width:"100%",
			height:350,
			autowidth:true,
			rownumWidth:35,
			shrinkToFit:false,
			footerrow:true,
			userDataOnFooter:true,
            ondblClickRow: function(id){
            },
            beforeEditCell: function(rowid, cellname, v, iRow, iCol){
                lastrow = iRow;
                lastcell = iCol;
            },
            afterSaveCell: function(rowid,name,val,iRow,iCol){
                var currRow = $('#grid').jqGrid('getRowData', rowid);
                if(name == 'goodsNumber' && currRow.ifManageImei == "0"  && currRow.goodsName != ""){
                    if($.parseInt(val) > $.parseInt(currRow.stockCount) || $.parseInt(val) < 0){
                        //输入数量小于现库存
                        $.MsgBox('错误提示','不允许大于库存数或小于0！');
                        $('#grid').jqGrid('setCell', rowid ,"goodsNumber" ,'0');
                    }
                }
                gridSum()
            },
            onCellSelect: function(rowid, index,cellcontent, e){
                var curColName=$.trim($(e.target).attr('aria-describedby')).replace('grid_','');
                if(curColName=='goodsNumber'){
                    $("#grid").jqGrid("saveCell",lastrow,lastcell);
                    var rowData=$('#grid').jqGrid("getRowData",rowid);
                    var ifim=rowData.ifManageImei;
                    if(ifim==1){//串号管理
                        $(this).setColProp('goodsNumber',{editable:false});
                        $('#numberChoose').modal('show');
                        $('#imeiGoodsName').val(rowData.goodsName)
                        $('#imeiStorageName').val($('#outStorage').find("option:selected").text())
                            $.ajaxPackage({
                                url:basePath+'/inventory/common/getStockGoodsImeiVoList',
                                data:{
                                    sectionId:$('#DepartmentName').data('id'),
                                    storageId:$('#outStorage').val(),
                                    menuCode:$('#AUTH').data('code'),
                                    goodsId:rowData.goodsId
                                },
                                success:function (data) {
                                    var goodsImeiVoList=  data.data.goodsImeiVoList;
                                    $("#inlib").jqGrid("clearGridData");
                                    $("#inlib").setGridParam({data:goodsImeiVoList,datatype : "local",}).trigger('reloadGrid')
                                    setTimeout(function () {
                                        $("#inlib").resize()
                                    },150)
                                }
                            })
                            if(rowData.imeiIds==''){
                                $("#temp").jqGrid("clearGridData");
                            }else{
                                $.ajaxPackage({
                                    url:basePath+'/inventory/common/getImeiVoList',
                                    data:{
                                        imeiIds:rowData.imeiIds,
                                        //是否查询在库成本(1:查询;0:不查询,默认为0)
                                        queryStockCost:$('#isDraft').val(),
                                        menuCode:$('#AUTH').data('code')
                                    },
                                    success:function (data) {
                                        var imeiVoList=  data.data.imeiVoList;
                                        $("#temp").jqGrid("clearGridData");
                                        $("#temp").setGridParam({data:imeiVoList,datatype : "local",}).trigger('reloadGrid')
                                        setTimeout(function () {
                                            $("#temp").resize()
                                        },150)
                                    }
                                })
                            }
                    }else{
                        $(this).setColProp('goodsNumber',{editable:true});
                    }
                }
            },
            onSelectRow: function(id){
            },
            beforeSelectRow: function(rowid,e){
            },
            afterInsertRow: function(rowid, aData){ //新增一行之后
            },
            gridComplete:function(){
                $('.moveFlag').remove();
                var tdListTime = $('#grid').getGridParam('colModel');
                var tdHtml = $.map(tdListTime, function() {
                    return '<td></td>'
                }).join(" ");
                var html = "<tr class='moveFlag' style='height:40px;outline-style:none;'><td><span id='add' class='glyphicon glyphicon-plus-sign'></span></td>" + tdHtml + "</tr>"
                $('#grid tbody').append(html);

            },
            loadComplete: function(data){
            }
        })
        function addAndDelete(cellvalue, options, rowObjec) {
            var addAndDel = '<div class="operating"></span><span class="del glyphicon glyphicon-trash"></span></div>';
            return addAndDel;
        }
        //增删
        $(document).on('click', '#add', function(e) {
            var ids = $("#grid").getDataIDs();
            var maxId = ids.length == 0 ? 0 : Math.max.apply(null,ids);
            $('#grid').jqGrid('addRowData', maxId + 1, {
                storageName: '',
                goodsName: '',
                stockNumber: 0,
                goodsNumber: 0,
                remark: '',
                price: 0
            }, 'last');
        });
        $(document).on('click', '.del', function(e) {
            var rowId= $("#grid").jqGrid("getGridParam", "selrow");
            $('#grid').jqGrid('delRowData', rowId);
            gridSum()
        });
        //商品选择
        $(document).on('click','.spmc',function(){
            if($('#DepartmentName').data('id')!=undefined){
                $.request({
                    type:'post',
                    url:basePath+'/inventory/common/getGoodsClassTreeNodeVoList',
                    dataType:'json',
                    success:function(data){
                        if(data.result==1){
                            var res=data.data.goodsClassVoList;
                            if(!res.length){
                                $.zxsaas_plus.showalert('warning','条目为空！');
                            }else{
                                ajaxDataFilter(res);
                                $('#goodsnameReferenceModal').modal('show');
                                $.fn.zTree.init($("#spmcDataTree"),{
                                    data: {
                                        simpleData: {
                                            enable: true,
                                            idKey: "id",
                                            pIdKey: "parentId",
                                            rootPId: ''
                                        }
                                    },
                                    view: {
                                        showLine: true
                                    },
                                    callback: {
                                        onClick: function (event, treeId, treeNode) {
                                            $("#proTable").jqGrid('setGridParam', {
                                                datatype:'json',
                                                postData:{
                                                    sectionId:$('#DepartmentName').data('id'),
                                                    storageIds:$('#outStorage').val(),
                                                    goodsCategoryIds:treeNode.id,
                                                    menuCode:$("#AUTH").data('code'),
                                                    queryKey:$('#proSearch').val()
                                                }
                                            }).trigger("reloadGrid");
                                        }
                                    }
                                },res);
                                // $.fn.zTree.getZTreeObj("spmcDataTree").expandAll(true);
                            }
                        }else{
                            $.zxsaas_plus.showalert('error',data.desc);
                        }
                    },
                    error:function(){
                        alert('请求失败！')
                    }
                })
                $('#goodsnameReferenceModal').modal('show');
                $("#proTable").jqGrid('setGridParam', {
                    datatype:'json',
                    postData:{
                        sectionId:$('#DepartmentName').data('id'),
                        menuCode:$("#AUTH").data('code'),
                        storageIds:$('#outStorage').val()
                    }
                }).trigger("reloadGrid");
            }else{
                $.zxsaas_plus.showalert('warning','请先选择部门！');
            }
        })
        function ajaxDataFilter(responseData) {
            for(var i=0, m=responseData.length; i<m; i++){
                if(responseData[i].parentId==-2){
                    responseData[i].open=true;
                }else{
                    responseData[i].open=false;
                }
            }
        };
    }
    //商品引用
    function initRender(){
        $('#proTable').jqGrid({
            url:basePath+'/inventory/common/getStockGoodsVoPageList',
            mtype: "post",
            datatype: "local",
            jsonReader: {
                root: "data.stockGoodsVoList",
                total: "data.total",
                records: "data.records",
                repeatitems: false
            },
            colNames:['编码','商品名称', '类别', '品牌', '型号','颜色','是否串号管理', '计价方式','库存数','备注', '商品id','串号id','商品id','商品总额'],
            colModel:[
                {name: 'code', index: 'code',align: 'center',sortable: true,width:200},
                {name: 'name', index: 'name',align: 'center',sortable: true,width:200},
                {name: 'categoryName', index: 'categoryName',align: 'center',sortable: true,width:100},
                {name: 'brandName', index: 'brandName',align: 'center',sortable: true,width:100},
                {name: 'models', index: 'models',align: 'center',sortable: true,width:150},
                {name: 'color', index: 'color',align: 'center',sortable: true,width:100},
                {name: 'ifManageImei', index: 'ifManageImei',align: 'center',sortable: true,width:100,formatter:'select',editoptions:{value:"0:×;1:√"}},
                {name: 'valuationMethods', index: 'valuationMethods',align: 'center',sortable: true,width:200,formatter:'select',editoptions:{value:"1:个别计价法;2:移动加权平均价"}},
                {name: 'stockCount', index: 'stockCount',align: 'center',sortable: true,width:100},
                {name: 'remark', index: 'remark',align: 'center',sortable: true,width:200},
                {name: 'goodsId', index: 'goodsId',hidden:true},
                {name: 'imeiId', index: 'imeiId',hidden:true},
                {name: 'storageId', index: 'storageId',hidden:true},
                {name: 'totalAmount', index: 'totalAmount',hidden:true}
            ],
            sortable:true,
            rownumbers:true,
            cellsubmit:'clientArray', //单元格保存内容的位置
            editurl:'clientArray',
            rowNum:100,
            rowList:[100, 200, 500],
            pager:'#proPager',
            viewrecords:true,
            multiselect:true,
            multiboxonly:false,
            cellEdit:false,
            width:"auto",
            height:300,
            autowidth:true,
            rownumWidth:35,
            shrinkToFit:false,
            footerrow:false,
            userDataOnFooter:true,
            ondblClickRow: function(rowid){
                addGoodName([rowid])
            },
            beforeEditCell: function(rowid, cellname, v, iRow, iCol){
                lastrow = iRow;
                lastcell = iCol;
            },
            afterSaveCell: function(rowid, cellname, value, iRow, iCol){
                gridSum()
            },
            onCellSelect: function(id, index, e){
            },
            onSelectRow: function(id){
            },
            beforeSelectRow: function(rowid, e){
            },
            afterInsertRow: function(rowid, aData){ //新增一行之后
            },
            gridComplete:function(){
                $('.moveFlag').remove();
                var tdListTime = $('#grid').getGridParam('colModel');
                var tdHtml = $.map(tdListTime, function() {
                    return '<td></td>'
                }).join(" ");
                var html = "<tr class='moveFlag' style='height:40px;outline-style:none;'><td><span id='add' class='glyphicon glyphicon-plus-sign'></span></td>" + tdHtml + "</tr>"
                $('#grid tbody').append(html);
                if($("#slideThree").is(':checked')){
                    $('.moveFlag').hide()
                }else{
                    $('.moveFlag').show()
                }
            },
            loadComplete: function(data){
            },
            loadError: function(xhr,status,error){
            }
        })
        $('#goodsnameReferenceModal').on('shown.bs.modal', function (e) {
            $('.modalRight div').css('width','auto')
        })
        $('#proSearch').keyup(function(e){
            if(e.keyCode==13){
                var rowId = $("#grid").jqGrid("getGridParam","selrow");
                var rowData = $("#grid").jqGrid("getRowData",rowId);
                $("#proTable").jqGrid('setGridParam', {
                    datatype:'json',
                    postData:{
                        sectionId:$('#DepartmentName').data('id'),
                        storageIds:$('#outStorage').val(),
                        menuCode:$("#AUTH").data('code'),
                        queryKey:$('#proSearch').val()
                    }
                }).trigger("reloadGrid");
            }
        })
        //商品引用--- 确定按钮
        $('.goodsnameReferenceOk').bind('click',function(){
            var proSelIds=$('#proTable').jqGrid('getGridParam','selarrrow');
            addGoodName(proSelIds)
        })
    }
    //初始化 数量 模态框
    function initnumberChoose(){
        inLib()
        temp()
        function inLib(){
            $('#inlib').jqGrid({
                datatype: "local",
                colNames:['串号','辅助串号','串号id','成本价'],
                colModel:[
                    {name: 'imei', index: 'imei',align: 'center',sortable: false,width:200},
                    {name: 'auxiliaryImei', index: 'auxiliaryImei',align: 'center',sortable: false,width:200},
                    {name: 'imeiId', index: 'imeiId',align: 'center',sortable: false,hidden:true},
                    {name: 'costPrice', index: 'costPrice',align: 'center',sortable: false, sorttype: 'integer',formatter: 'number',hidden:true},
                ],
                rowNum:100,
                rowTotal: 1000000,
                rowList : [100,200,500],
                pager:"#inlibPager",
                sortable:false,
                rownumbers:true,
                cellsubmit:'clientArray', //单元格保存内容的位置
                editurl:'clientArray',
                viewrecords:true,
                multiselect:true,
                multiboxonly:false,
                cellEdit:false,
                width:"510",
                height:350,
                rownumWidth:35,
                shrinkToFit:true,
                footerrow:false,
                userDataOnFooter:true,
                ondblClickRow: function(rowid){
                },
                beforeEditCell: function(rowid, cellname, v, iRow, iCol){
                    lastrow = iRow;
                    lastcell = iCol;
                },loadComplete: function (data) {
                    $('#inlibPager_left').remove()
                    $('#inlibPager_center').attr('colspan',2)
                },

            })
            $('#numberChoose').on('shown.bs.modal', function (e) {
                $('.jqGrid_wrap div').css('width','auto')
            })
        }
        function temp(){
            $('#temp').jqGrid({
                datatype: "local",
                colNames:['串号','辅助串号','串号id','成本价'],
                colModel:[
                    {name: 'imei', index: 'imei',align: 'center',sortable: false,width:200},
                    {name: 'auxiliaryImei', index: 'auxiliaryImei',align: 'center',sortable: false,width:200},
                    {name: 'imeiId', index: 'imeiId',align: 'center',sortable: false,hidden:true},
                    {name: 'costPrice', index: 'costPrice',align: 'center',sortable: false, sorttype: 'integer',formatter: 'number',hidden:true},
                ],
                rowNum:100,
                rowTotal: 1000000,
                rowList : [100,200,500],
                pager:"#tempPager",
                sortable:false,
                rownumbers:true,
                cellsubmit:'clientArray', //单元格保存内容的位置
                editurl:'clientArray',
                viewrecords:true,
                multiselect:true,
                multiboxonly:false,
                cellEdit:false,
                width:"510",
                height:350,
                rownumWidth:35,
                shrinkToFit:true,
                footerrow:false,
                userDataOnFooter:true,
                ondblClickRow: function(rowid){
                },
                beforeEditCell: function(rowid, cellname, v, iRow, iCol){
                    lastrow = iRow;
                    lastcell = iCol;
                }
                ,loadComplete: function (data) {
                    $('#tempPager_left').remove()
                    $('#tempPager_center').attr('colspan',2)
            },
            })
            $('#numberChoose').on('shown.bs.modal', function (e) {
                $('.jqGrid_wrap div').css('width','auto')
            })
        }
        $('#rightAll').click(function(){
            var inlibAllList = $("#inlib").getGridParam().data
            rightImei(inlibAllList)
        })
        $('#rightPart').click(function(){
            var inlibSels=$("#inlib").jqGrid('getGridParam','selarrrow');
            var inlibSelsList=[]
            $.each(inlibSels,function(i,val){
                var tempRow=$("#inlib").jqGrid("getRowData",val);
                var item={
                    imei:tempRow.imei,
                    auxiliaryImei:tempRow.auxiliaryImei,
                    imeiId:tempRow.imeiId,
                    costPrice:tempRow.costPrice
                }
                inlibSelsList.push(item)
            })
            rightImei(inlibSelsList)
        })
        function rightImei(inlibAllList) {
            var addData=[]
            var arr=[];
            $.each($("#temp").getGridParam().data,function(j,jj){
                arr.push(jj.imei)
            })
            $.each(inlibAllList,function(i,inlibRow){
                var item={
                    imei:inlibRow.imei,
                    auxiliaryImei:inlibRow.auxiliaryImei,
                    imeiId:inlibRow.imeiId,
                    costPrice:inlibRow.costPrice
                }
                if($.inArray(item.imei,arr)==-1){
                    addData.push(item)
                }
            })
            var  exsitData = $("#temp").getGridParam().data;
            var mergeData=exsitData.concat(addData)
            $("#temp").jqGrid('clearGridData');
            $("#temp").setGridParam({data:mergeData,datatype : "local",}).trigger('reloadGrid');
            inlibChooseDiff()
        }

        function inlibChooseDiff(){//查找temp在库存中的相同条目，删除
            var libids=$("#inlib").getGridParam().data
            var arr=[];
            var addData=[]
            $.each($("#temp").getGridParam().data,function(j,jval){
                arr.push(jval.imei)
            })
            $.each(libids,function(i,libImei){
                if($.inArray(libImei.imei,arr)==-1){
                    addData.push(libImei)
                }
            })
            $("#inlib").jqGrid('clearGridData');
            $("#inlib").setGridParam({data:addData,datatype : "local",}).trigger('reloadGrid');
        }
        $('#leftAll').click(function(){
            var inlibAllList = $("#temp").getGridParam().data
            leftImei(inlibAllList)
        })
        $('#leftPart').click(function(){
            var inlibSels=$("#temp").jqGrid('getGridParam','selarrrow');
            var inlibSelsList=[]
            $.each(inlibSels,function(i,val){
                var tempRow=$("#temp").jqGrid("getRowData",val);
                var item={
                    imei:tempRow.imei,
                    auxiliaryImei:tempRow.auxiliaryImei,
                    imeiId:tempRow.imeiId,
                    costPrice:tempRow.costPrice
                }
                inlibSelsList.push(item)
            })
            leftImei(inlibSelsList)
        })

        function leftImei(inlibAllList) {
            var addData=[]
            var arr=[];
            $.each($("#inlib").getGridParam().data,function(j,jj){
                arr.push(jj.imei)
            })
            $.each(inlibAllList,function(i,tempRow){
                var item={
                    imei:tempRow.imei,
                    auxiliaryImei:tempRow.auxiliaryImei,
                    imeiId:tempRow.imeiId,
                    costPrice:tempRow.costPrice
                }
                if($.inArray(item.imei,arr)==-1){
                    addData.push(item)
                }
            })
            var  exsitData = $("#inlib").getGridParam().data;
            var mergeData=exsitData.concat(addData)
            $("#inlib").jqGrid('clearGridData');
            $("#inlib").setGridParam({data:mergeData,datatype : "local",}).trigger('reloadGrid');
            tempChooseDiff()
        }

        function tempChooseDiff(){//查找库存在temp中的相同条目，删除
            var tempids=$("#temp").getGridParam().data;
            var arr=[];
            var addData=[]
            $.each($("#inlib").getGridParam().data,function(j,jval){
                arr.push(jval.imei)
            })
            $.each(tempids,function(i,libImei){
                if($.inArray(libImei.imei,arr)==-1){
                    addData.push(libImei)
                }
            })
            $("#temp").jqGrid('clearGridData');
            $("#temp").setGridParam({data:addData,datatype : "local",}).trigger('reloadGrid');
        }
        //个别计价（模态框）：  确定
        $('#numberChooseSure').click(function(){
            var arr=[];
            var costPriceSum=0;
            var ids=$("#temp").getGridParam().data;
            $.each(ids,function(i,tempRow){
                arr.push(tempRow.imeiId)
                costPriceSum+=Number(functionObjExtent.delcommafy($.trim(tempRow.costPrice)))
            })
            var imeiIds=arr.join(',');
            var selectID=$("#grid").getGridParam("selrow");
            var goodsNumber=ids.length;
            var price;
            var gridRow=$("#grid").jqGrid("getRowData",selectID);
            //加权
            if(gridRow.valuationMethods==2){
                price =gridRow.price;
            }else{
                price=0
            }

            if(imeiIds==''){
                imeiIds='&nbsp';
            }
            else{
                //加权
                if(gridRow.valuationMethods==2){
                    costPriceSum=Number(functionObjExtent.delcommafy($.trim(gridRow.price)))*goodsNumber
                }else{
                    //个别计价
                    price=Number(functionObjExtent.delcommafy($.formatFloat((costPriceSum/goodsNumber),2)))
                }
            }


            var dataRow={
                goodsNumber:goodsNumber,
                imeiIds:imeiIds,
                price:price,
                amount:costPriceSum,
            }
            $("#grid").jqGrid('setRowData', selectID, dataRow, {});
            gridSum()
            $('#numberChoose').modal('hide');
        })


        //商品串号明细弹框状态管理
        $('#numberChoose').on('shown.bs.modal',function(){
            inlibChooseDiff()
            if($('#isDraft').val()==1){
                $('#rightAll,#leftAll,#rightPart,#leftPart').prop('disabled',false);
            }else{
                $('#rightAll,#leftAll,#rightPart,#leftPart').prop('disabled',true);
            }
        })
    }

    //汇总统计
    function gridSum(){
        var $table=$("#grid");
        var ids = $table.getDataIDs();
        $.each(ids, function (i, value) {
            var currRow = $table.jqGrid('getRowData', value);
            if(currRow.ifManageImei==0 && currRow.valuationMethods==2){
                $table.jqGrid('setCell', value, "amount", Number(functionObjExtent.delcommafy(currRow.price)) * Number(currRow.goodsNumber));
            }
        });
        var sum_1=$("#grid").getCol('goodsNumber',false,'sum');
        $("#grid").footerData('set',{"goodsNumber":sum_1},false);
        var sum_2=$table.getCol('amount',false,'sum');
        $table.footerData('set',{"amount":$.formatFloat(sum_2,2)},false);
    }
	//仓库
	function RequestSection(asyncOpt,storageCallback){
		var dft={
			bool:true
		}
		asyncOpt=$.extend(true,dft,asyncOpt);
    	$.request({
			async:asyncOpt.bool,
    		type:'post',
        	url:basePath+'/inventory/common/getStorageVoList',
        	data:{sectionId:$('#DepartmentName').data('id')},
        	dataType:'json',
        	success:function(data){
				if(data.result==1){
					var res=data.data.storageVoList;
					var html;
					$.each(res,function(i,val){
						html+='<option value="'+val.storageId+'">'+val.name+'</option>';
					})
					$('#outStorage,#inStorage').html(html)
					if(storageCallback)storageCallback();
				}else{
					$.zxsaas_plus.showalert('error',data.desc);
				}
    		},
    		error:function(){
    			alert('请求失败！')
    		}
    	})
	}
	function footDataRender(asyncOpt,param){//页面底部信息请求加载
		var dft={
			bool:true
		}
		asyncOpt = $.extend(true,dft,asyncOpt);
		$.request({
			async:asyncOpt.bool,
    		type:'post',
        	url:basePath+'/inventory/storage/products/move/searchOrder',
        	data:param,
        	dataType:'json',
        	success:function(data){
				if(data.result==1){
					$('#footerCompany').val(data.data.order.companyName);
					$('#footerCreate').val(data.data.order.createByName);
					if(data.data.order.updateByName)$('#footerUpdate').val(data.data.order.updateByName);
					if(data.data.order.cancelByName)$('#footerBack').val(data.data.order.cancelByName);
				}else{
					$.zxsaas_plus.showalert('error',data.desc);
				}
    		},
    		error:function(){
    			alert('请求失败！')
    		}
    	})
	}
	function billsData(){//单据保存
		var order={};
		order.orderId=$('#billsId').val();
		order.sectionId=$('#DepartmentName').data('id');
		order.managerId=$('#managersName').data('id');
		order.billsDateStr=$('#billsDateString').val();
		order.moveOutStorageId=$('#outStorage').val();
		order.moveInStorageId=$('#inStorage').val();
		order.remark=$('#remark').val();
		order.detailList=new Array();
		var ids=$("#grid").jqGrid("getDataIDs");
		$.each(ids,function(i,val){
			var rowdata=$('#grid').jqGrid("getRowData",val);
			order.detailList[i]={};
			order.detailList[i].goodsId=rowdata.goodsId;
			order.detailList[i].id=rowdata.id;
			order.detailList[i].goodsNumber=rowdata.goodsNumber;
			order.detailList[i].imeiIds=rowdata.imeiIds;
            order.detailList[i].price=functionObjExtent.delcommafy(rowdata.price);
            order.detailList[i].amount=rowdata.amount;
			order.detailList[i].remark=rowdata.remark;
		})
		return order
	}
    function billSearch(url_Code,failCallback,billsId,callbackObj){//单据查询
        url_Code=url_Code||''
        billsId=billsId||''
		var filParam={
            billsId:billsId,
			isDraft:$('#isDraft').val(),
			refBillsId:$('#billsId').val(),
			startTime:$('#startTimeStr').val(),
			sectionIds:$('#departmentName').data('id'),
			billsCode:$('#selBillsCode').val(),
			endTime:$('#endTimeStr').val(),
			remark:$('#selRemark').val(),
			goodsId:$('#selGoodsName').data('id'),
			imeiKey:$('#selImei').val()
		}
		$.request({
			async:true,
    		type:'post',
        	url:basePath+'/inventory/storage/products/move/searchOrder?queryCodeStr='+url_Code,
        	data:filParam,
        	dataType:'json',
        	success:function(data){
				if(data.result==1){
					var res=data.data.order;
					$("#grid").jqGrid('setGridParam', {
						ajaxGridOptions:{async:false},
						url:basePath+'/inventory/storage/products/move/searchOrder?queryCodeStr='+url_Code,
						postData:filParam,
						datatype:'json',  
						jsonReader: {
					        root: "data.order.detailList",
					        repeatitems: false,

					    }
					}).trigger("reloadGrid");
                    drawGrid(res)
                    if(callbackObj){
                        callbackObj(data.data)
                    }
				}else{
                    if(failCallback){
                        failCallback()
                    }
				}
    		},
    		error:function(){
    			alert('请求失败！')
    		}
    	})
	}
	function dataRender(data){//单据render
		$('#billsStatus').val(data.billsStatus)
		$('#auditStatus').val(data.auditStatus)
		$('#billsId').val(data.orderId);
		$('#billsCode').val(data.billsCode);
		$('#DepartmentName').val(data.sectionName).data('id',data.sectionId);
		$('#managersName').val(data.managerName).data('id',data.managerId);
		RequestSection(false,function(){
			$('#outStorage option[value='+data.moveOutStorageId+']').prop('selected',true);
			$('#inStorage option[value='+data.moveInStorageId+']').prop('selected',true);
		});//同步请求经手人信息
		$('#billsDateString').val(data.billsDateStr);
		$('#remark').val(data.remark);
		$('#otherOutstroNumIdStr').val('');
		$('#footerCompany').val(data.companyName);
		$('#footerCreate').val(data.createByName);
		data.updateByName?$('#footerUpdate').val(data.updateByName):$('#footerUpdate').val('');
		data.postByName?$('#footerPost').val(data.postByName):$('#footerPost').val('');
		data.cancelByName?$('#footerBack').val(data.cancelByName):$('#footerBack').val('');
        $('#isDraft').val()==1?EventList.trigger('draftSign'):EventList.trigger('formalSign');
		switch ($('#billsStatus').val()){
		case '8':
			//正式;
			EventList.trigger('formalSign')
			break;
		case '9':
			//作废;
			EventList.trigger('redSign')
			break;
		}
	}
	//渲染表格
	function drawGrid(res){
        dataRender(res)
        checkIfManageImeiIcon()
        gridSum()
	}
    //添加商品
    function addGoodName(proSelIds) {
        var proDataList = [];//弹出层选中的集合
        var gridSelId=$("#grid").getGridParam("selrow"); //主表选中的行
        var gridSelDataRow=$("#grid").jqGrid("getRowData",gridSelId);  //主表选中的行 数据
        var gridDataList=$("#grid").jqGrid("getRowData");  //主表的所有数据
        //获取 ： 弹出层选中的集合
        $.each(proSelIds,function(i,value){
            var rowData = $("#proTable").jqGrid('getRowData', value )
            rowData.storageId=gridSelDataRow.storageId;
            rowData.storageName=gridSelDataRow.storageName;
            proDataList.push(rowData);
        });
        $("#grid").jqGrid("saveCell",lastrow,lastcell);

        for(var i=0;i<proDataList.length;i++){
            var proDataItem=proDataList[i];
            var price=0; //单价
            var amount=0;//金额
            //移动加权平均价 ：
            if(proDataItem.valuationMethods==2){
                if(Number(proDataItem.totalAmount)>0){
                    price=Number(functionObjExtent.delcommafy($.formatFloat(proDataItem.totalAmount/proDataItem.stockCount,2)))
                }
            }

            var dataRow = {
                'goodsName': proDataItem.name,
                'goodsId': proDataItem.goodsId,
                'ifManageImei': proDataItem.ifManageImei,
                'goodsNumber': 0,
                'imeiIds': '&nbsp',
                'stockCount': proDataItem.stockCount,
                'remark': proDataItem.remark,
                'categoryName': proDataItem.categoryName,
                'code': proDataItem.code,
                'brandName': proDataItem.brandName,
                'models': proDataItem.models,
                'color': proDataItem.color,
                'storageId':proDataItem.storageId,
                'valuationMethods':proDataItem.valuationMethods,
                'price':price,
                'amount':amount
            };

            var flag=1;
            var cIndex;

            if(flag===1){
                if(i==0){
                    cIndex=Number(gridSelId);
                    $("#grid").jqGrid('setRowData', cIndex, dataRow, {});
                }else{
                    cIndex = $('#grid').jqGrid('getDataIDs').length + 1;
                    $('#grid').jqGrid('addRowData', cIndex, dataRow);
                }
            }
        }
        gridSum()
        checkIfManageImeiIcon();
        $('#goodsnameReferenceModal').modal('hide');


    }
    //检查IfManageImeiIcon
    function checkIfManageImeiIcon(){
        var $grid=$("#grid");
        var ids = $grid.getDataIDs();
        $.each(ids,function(i,value){
            var rowData = $grid.jqGrid('getRowData', value )
            //是否 为 串号商品
            if(rowData.ifManageImei=="1"){
                $grid.jqGrid('setCell', value, "goodsNumber", '', 'ifManageImeiIcon');
            } else {
                //jqgrid 找不到移除 calss 的方法。这里只能外界操作dom 的方式
                $("#grid #" + value + " td[aria-describedby='grid_goodsNumber']").removeClass('ifManageImeiIcon')
            }
        });
    }
})




function imeiDelRow(id){
    $("#imeiDrGrid").delRowData(id);
    var num = $('#imeiDrGrid').getDataIDs();
	$('.imeiDr_num').text(num.length);
}


