var signName='其他出库单'
$(function(){
    var EventList=$({});//总线
    EventList.on({
        clearAll:function(){//清空表格内容
            $('#billsHeader input,#collapseExample input').val('');
            $('#outDepartmentName,#inDepartmentName').data('id',null);
            $('#managersName').val('').removeData()
            $("#grid").jqGrid("clearGridData");
        },
        draftSign:function(){//草稿单状态
            $('.slideThree').css('background','#D09E85');
            $('#billsDateString,#remark,#otherStorageId,#otherOutstroNumIdStr,.imeiImport,#save,#abandon,#print,#del').prop('disabled',false);
            $('#red,#print,#copy').prop('disabled',true);
            $('.inputAssPlus,.del,#add').css({
                'width':'auto',
                'overflow':'hidden'
            })
            $('#billsStautsImg').hide();
            $('#billsStautsImgPass').hide()
            $("#slideThree").prop('checked',false)
            reloadMenuBtn()
        },
        draftSignNull:function(){//草稿未查到数据状态
            $('.slideThree').css('background','#D09E85');
            $('#billsDateString,#otherStorageId,#remark,#otherOutstroNumIdStr,.imeiImport,#save').prop('disabled',false);
            $('#del,#red,#abandon,#print,#copy').prop('disabled',true);
            $('.inputAssPlus,.del,#add').css({
                'width':'auto',
                'overflow':'hidden'
            })
            $('#billsStautsImg').hide();
            $('#billsStautsImgPass').hide()
            $("#slideThree").prop('checked',false)
            reloadMenuBtn()
        },
        formalSign:function(){//正式状态
            $('.slideThree').css('background','#8BAEC7');
            $('#billsHeader input,#billsHeader select,#collapseExample input,#otherOutstroNumIdStr,.imeiImport,#abandon,#del').prop('disabled',true);
            $('#red,#remark,#save,#print,#copy').prop('disabled',false);
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
        },
        formalSignNull:function(){//正式未查询到数据状态
            $('.slideThree').css('background','#8BAEC7');
            $('#billsHeader input,#billsHeader select,#collapseExample input,#otherOutstroNumIdStr,.imeiImport,#red,#del,#abandon,#save,#remark,#print,#copy').prop('disabled',true);
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
        },
        PostingSign:function(){//过账状态
            $('.slideThree').css('background','#8BAEC7');
            $('#billsHeader input,#billsHeader select,#collapseExample input,#del,#print,#otherOutstroNumIdStr,.imeiImport,#abandon').prop('disabled',true);
            $('#print').prop('disabled',false);
            $('#remark').prop('disabled',false);
            $('#red,#copy').prop('disabled',false)
            $('.inputAssPlus,.del,#add').css({
                'width':0,
                'overflow':'hidden'
            })
            $('#filtrationChoose .inputAssPlus').css({
                'width':'auto',
                'overflow':'hidden'
            })
            $('#billsStautsImgPass').show()
            $("#slideThree").prop('checked',true)
            reloadMenuBtn()
        },
        redSign:function(){//红冲状态
            $('.slideThree').css('background','#8BAEC7');
            $('#billsHeader input,#billsHeader select,#collapseExample input,#del,#save,#print,#otherOutstroNumIdStr,.imeiImport,#red,#abandon').prop('disabled',true);
            $('#print').prop('disabled',false);
            $('.inputAssPlus,.del,#add').css({
                'width':0,
                'overflow':'hidden'
            })
            $('#filtrationChoose .inputAssPlus').css({
                'width':'auto',
                'overflow':'hidden'
            })
            $('#billsStautsImg').show();
            $('#billsStautsImgPass').hide()
            $("#slideThree").prop('checked',true)
            reloadMenuBtn()
        }
    })
    //出库串号表格
    $.jgrid.defaults.width = 1280;
    $.jgrid.defaults.responsive = true;
    $.jgrid.defaults.styleUI = 'Bootstrap';
    var lastrow = null,lastcell = null;
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
        var billsId = $.trim(functionObjExtent.getQueryString('billsId'));
        if(billsCode != ''){
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
            window.location.href=basePath+'/inventory/storage/stock/other/removal/main';
        })
        //保存
        $('#save').click(function(){
			$("#grid").jqGrid('saveCell',lastrow,lastcell);
            var obj=billsData();
            var urlParam=null;
            var canSave=true;
            var pc=true;
            if(!obj.sectionId){
                $.zxsaas_plus.showalert('warning','部门为空!');
                return false;
            }
            if(!obj.otherStorageClassId){
                $.zxsaas_plus.showalert('warning','出库方式为空!');
                return false;
            }
            if(!obj.billsDateStr){
                $.zxsaas_plus.showalert('warning','未填写日期!');
                return false;
            }
            if(!obj.detailList.length){
                $.zxsaas_plus.showalert('warning','表格为空!');
                return false;
            }

            var ids=$("#grid").jqGrid("getDataIDs");
            $.each(ids,function(i,val){
                var rowDataGoodsNum=$("#grid").jqGrid("getRowData",val).goodsNumber;
                var rowDataGoodsPrice=$("#grid").jqGrid("getRowData",val).price;
                if(rowDataGoodsNum<=0){
                    canSave=false;
                }
                if(rowDataGoodsPrice<0){
                    pc=false;
                }
            })
            if(canSave==false){
                $.zxsaas_plus.showalert('提示','出库商品数不能小于或等于0!');
                return false;
            }
            if(pc==false){
                $.zxsaas_plus.showalert('提示','单价不能为负数!');
                return false;
            }
            var $p=$('#grid').getCol('price');
            //判断价格是否为0
            var flag=false;
            for (var int = 0; int < $p.length; int++) {
                if ($.parseFloat($p[int]) == 0) {
                    flag = true
                }
            }
            if(flag==true){
                $.zxsaas_plus.showconfirm('提示','单据中存在价格为0的商品，是否确认保存',function () {
                    saveOtherOut()
                },function () {
                    return;
                })
            }else{
                saveOtherOut()
            }
            function  saveOtherOut() {
                if (canSave) {
                    if ($('#isDraft').val() == 1) {//草稿
                        if ($('#billsId').val() == '') {
                            urlParam = 'auth_add';
                        } else {
                            urlParam = 'auth_update';
                        }
                        $.request({
                            type: 'post',
                            url: basePath + '/inventory/storage/stock/other/removal/saveDraftOrder/' + urlParam,
                            data: {order: JSON.stringify(obj)},
                            dataType: 'json',
                            success: function (data) {
                                if (data.result == 1) {
                                    $('#billsId').val(data.data.orderId);
                                    if (data.data.orderId) {
                                        footDataRender(true, {
                                            billsId: data.data.orderId,
                                            isDraft: $('#isDraft').val()
                                        })
                                    }
                                    EventList.trigger('draftSign');
                                    $.zxsaas_plus.showalert('success', '保存成功！');
                                } else {
                                    $.zxsaas_plus.showalert('error', data.desc);
                                }
                            },
                            error: function () {
                                alert('请求失败！')
                            }
                        })
                    } else {//正式
                        $.request({
                            type: 'post',
                            url: basePath + '/inventory/storage/stock/other/removal/updateOfficialOrder',
                            data: {order: JSON.stringify(obj)},
                            dataType: 'json',
                            success: function (data) {
                                if (data.result == 1) {
                                    $('#billsId').val(data.data.orderId);
                                    if (data.data.orderId) {
                                        footDataRender(true, {
                                            billsId: data.data.orderId,
                                            isDraft: $('#isDraft').val()
                                        })
                                    }

                                    $.zxsaas_plus.showalert('success', '保存成功！');
                                } else {
                                    $.zxsaas_plus.showalert('error', data.desc);
                                }
                            },
                            error: function () {
                                alert('请求失败！')
                            }
                        })
                    }
                }
            }
        })
        //删除
        $("#del").click(function(){
            $.zxsaas_plus.showconfirm('提示','确定删除此草稿单?',function(){
                $.request({
                    type:'post',
                    url:basePath+'/inventory/storage/stock/other/removal/deleteDraftOrder',
                    data:{ids:$('#billsId').val()},
                    dataType:'json',
                    success:function(data){
                        if(data.result==1){
                            $.zxsaas_plus.showalert('success','删除成功!')
                                $('#first').click();

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
        $('#abandon').click(function(){
            var $p=$('#grid').getCol('price');
            //判断价格是否为0
            var flag=false;
            for (var int = 0; int < $p.length; int++) {
                if ($.parseFloat($p[int]) == 0) {
                    flag = true
                }
            }
            if(flag==true){
                $.zxsaas_plus.showconfirm('提示','单据中存在价格为0的商品，是否确认过账',function () {
                    otherOut()
                },function () {
                    return;
                })
            }else{
                otherOut()
            }
            function otherOut() {
                $.request({
                    type: 'post',
                    url: basePath + '/inventory/storage/stock/other/removal/executeDraftOrder',
                    data: {
                        id: $('#billsId').val(),
                        isDraft: $('#isDraft').val()
                    },
                    dataType: 'json',
                    success: function (data) {
                        if (data.result == 1) {
                            $('#isDraft').val(0)
                            var res = data.data.order;
                            $('#billsId').val(res.orderId);
                            if (res.orderId) {
                                footDataRender(true, {
                                    billsId: res.orderId,
                                    isDraft: $('#isDraft').val()
                                })
                            }
                            drawGrid(res)
                            EventList.trigger('PostingSign')
                            $('#slideThree').prop('checked', true);
                            $.zxsaas_plus.showalert('success', '过账成功!');
                        } else {
                            $.zxsaas_plus.showalert('error', data.desc);
                        }
                    },
                    error: function () {
                        alert('请求失败！')
                    }
                })
            }
        })
        //红冲日期
        // $('#hcTime').click(function(){
        //     getAuthList(setRedTime)
        // })
        function setRedTime(){
			var min = CompareDate(_authList.minDate, $("#billsDateString").val()) ? _authList.minDate : $("#billsDateString").val();
			$('#hcTime').datetimepicker({
				lang:"ch",           //语言选择中文
				format:"Y-m-d",      //格式化日期
				timepicker:false,    //关闭时间选项
				todayButton:false,    //关闭选择今天按钮
				maxDate:_authList.maxDate,
				minDate: min,
				value: min
			});
        }
        //红冲
        $('#red').click(function(billDate){
            $('#redModal').modal('show')
			getAuthList(setRedTime)
            if($('#hcTime').val()==undefined||""){
                $.zxsaas_plus.showalert('warning','请选择红冲时间');
            }
        })
        $('#redTime').click(function(){
            $('#redModal').modal('hide')
            $.request({
                type:'post',
                url:basePath+'/inventory/storage/stock/other/removal/redOfficialOrder',
                data:{
                    id:$('#billsId').val(),
                    redDateStr:$('#hcTime').val()
                },
                dataType:'json',
                success:function(data){
                    if(data.result==1){
                        var res=data.data.order;
                        $('#billsStatus').val(res.billsStatus);
                        billSearch('','',res.orderId)
                        EventList.trigger('redSign');
                        $.zxsaas_plus.showalert('success','红冲成功!');
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
            var templateURL= basePath + '/inventory/storage/stock/other/removal/print';
            var paras= {
                isDraft:$('#isDraft').val(),
                billsId:$('#billsId').val(),
                printType:$(this).data('type')
                // checkCost:hasPermissions
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
            /*$('#first').click();*/
            billSearch('',function(){
                $.zxsaas_plus.showalert('warning','未查询到匹配单据')
            })
        })
        $('#filReset').click(function(){//过滤重置
            var inputs=$('#filterForm').find('input');
            var slects=$('#filterForm').find('select')
            $.map(inputs, function(item, index){
                $(item).val('').data('id',null);
            });
            $.map(slects, function(item, index){
                $(item).val('').data('id',null);
                $(item).empty()
            });
        })

        //部门名称
        $("#filterOutName").storePlu({
            isStoreShow:false,
            isLoadDefaultName:0,
            checkMore: true,
            search: false,
            ifStore: false, // 控制部门选项
            changeStore:function(){
                var $obj=$("#filterOutName");
                $obj.data('id',$obj.data('sectionId'))
                storageName('#filterOutName','#filterStorageName');
            }
        });
        //往来单位
        $("#filterContactName").comModalsContactUnit({multiselect:true})
    }
    // 初始化 顶部表单
    function initTopForm(){
        //单据日期
        $('#billsDateString').datePlu({
            ajaxOpt:{
                async:false,
            },
            endDate: false,
        });
        //部门名称
        $("#departmentName").storePlu({
            isStoreShow:false,
            isLoadDefaultName:0,
            checkMore: false,
            search: false,
            ifStore: false, // 控制部门选项
            changeStore:function(){
                var $obj=$("#departmentName");
                $obj.data('id',$obj.data('sectionId'))
                $('#managersName').val('').removeData()
                $("#grid").jqGrid("clearGridData");
                InterfaceInventory.common.getDefaultStorgeList({
                    data:{sectionId:$obj.data('sectionId')},
                    success:function(data){
                        var storageList=data.data.storageList||[]
                        var storageItem=storageList[0]||{}
                        $('#grid').jqGrid('addRowData', 1, {
                            storageName:storageItem.name,
                            storageId:storageItem.storageId
                        });
                        gridSum()
                    }
                })
            }
        });
        //经办人
        $("#managersName").comModalsEmployeeBySection({
            sectionIds:'#departmentName'
        })
        //往来单位
        $("#contactName").comModalsContactUnit()
        //出库方式
        OutOfTheWay(false)
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
                        $('#abandon').trigger('click')
                    }
                },
                red:{
                    isShow: !isDraftOp,
                    click: function () {
                        $('#red').trigger('click')
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
            var templateURL= basePath + '/inventory/storage/stock/other/removal/print';
            var paras= {
                isDraft:$('#isDraft').val(),
                billsId:$('#billsId').val(),
                printType:type
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
        $('#grid').setColProp('storageName',{editable: !!isDraftOp})
        $('#grid').setColProp('goodsName',{editable: !!isDraftOp})
        $('#grid').setColProp('goodsNumber',{editable: !!isDraftOp})
        $('#grid').setColProp('price',{editable: !!isDraftOp})
    }

    //初始化 出库串号
    function initImeiDr(){
        imeiDr(); //串号导入
        $('.imeiImport').click(function(){
            var sectionId = $('#departmentName').data('id');
            if(sectionId == "" || sectionId == undefined ){
                $.zxsaas_plus.showalert('提示','请选择部门');
            }else{
                $('#imeiDr-modal').modal('show');
                $('.imeiDr_vone,.imeiDr_vtwo').val('');
                $('.imeiDr_num').text(0);
                $("#imeiDrGrid").clearGridData().trigger('reloadGrid').resize();
            }
        })
        $('.imeiDr_import').click(function(){
            $(".imeiDr_vtwo").val('');
            //拿到外层表格串号
            var sectionId = $('#departmentName').data('id');
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

                var addRow=function () {
                    delKongRow()
                    $('#add').click();
                    var dataIds = $("#grid").getDataIDs();
                    var num = dataIds.length;
                    var id=dataIds[num-1]
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
                        goodsNumber: 1,
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
                    }else{
//					判断是否同一仓库并且是否同一商品
                        var sign = -1;
                        for(var x = 0;x<t4.length;x++){
                            if(t4[x] == row.storageId && t5[x] == row.code){
                                sign = x;
                            }
                        }
                        if(sign == -1){
                            addRow()
                        }else{
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
                            $("#grid").setRowData(t3[sign],{
                                goodsNumber: optNum.length,
                                imeiIds: opt
                            });

                        }

                    }

                }

            })
            gridSum()
            checkIfManageImeiIcon()
        })
        //出库串号
        $('#otherOutstroNumIdStr').inputCombination().keyup(function(e){
            if(e.keyCode==13&&$(this).val()!=''){
                $("#grid").jqGrid("saveCell", lastrow, lastcell);
                $(this).blur();
                if($('#departmentName').data('id')==null){
                    $.zxsaas_plus.showalert('warning','请选择部门!');
                }else{
                    var ids=$("#grid").jqGrid("getDataIDs");
                    $.each(ids,function(i,val){
                        var rowData=$("#grid").jqGrid("getRowData",val);
                        if(rowData.storageId=='')$('#grid').jqGrid('delRowData', val);
                    })
                    $.request({
                        type:'post',
                        url:basePath+'/inventory/common/getStockGoodsImeiVoList',
                        dataType:'json',
                        data:{
                            sectionId:$('#departmentName').data('id'),
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
                        var sid=idxRowData.storageId;//仓库id
                        var pid=idxRowData.goodsId;//商品id
                        var arrval=idxRowData.imeiIds;//商品串号群明细
                        var num=Number(idxRowData.goodsNumber);//数量
                        if(val.storageId==sid){//如果仓库相同
                            if(val.goodsId==pid){//如果仓库相同且商品相同
                                appendSwitch=false;
                                var newArr=$.grep(arrval.split(','),function(n){return $.trim(n).length > 0;});
                                if($.inArray(val.imeiId.toString(),newArr)==-1){
                                    newArr.push(val.imeiId);
                                    $("#grid").jqGrid("setCell",rowid,"imeiIds",newArr);
                                    $("#grid").jqGrid("setCell",rowid,"goodsNumber",num+1);
                                    var allprice=idxRowData.price*(num+1);
                                    $("#grid").jqGrid("setCell",rowid,"amount",allprice);
                                }
                                return false;
                            }else{//如果仓库相同但商品不同
                                appendSwitch=true;
                            }
                        }else{
                            appendSwitch=true;
                        }
                    })
                    if(!ids.length||appendSwitch){
                        delKongRow()
                        var maxId = ids.length == 0 ? 0 : Math.max.apply(null,ids);
                        $('#grid').jqGrid('addRowData', maxId + 1, {
                            storageName:val.storageName,
                            goodsName:val.name,
                            categoryName:val.categoryName,
                            code:val.code,
                            brandName:val.brandName,
                            models:val.models,
                            color:val.color,
                            stockCount:val.stockCount,
                            goodsNumber:1,
                            remark:val.remark,
                            storageId:val.storageId,
                            goodsId:val.goodsId,
                            ifManageImei:val.ifManageImei,
                            imeiIds:[val.imeiId]
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
                    colNames: ['id','商品id','仓库id','仓库名称','商品类别', '操作', '串号', '辅助串号', '商品编码', '商品名称','商品品牌','型号','颜色', '备注','库存量','是否串号管理','税率','串号列表','引入订单表id'],
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
                        {name : 'orderDetailId',index : 'orderDetailId',sortable: false,hidden:true}
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
    }

    // 初始化表格
    function initTable(){
        $('#grid').jqGrid({
            datatype: "local",
            colNames:['操作', '<i class="bitianX">*</i>仓库名称','<i class="bitianX">*</i>商品名称', '现库存','<i class="bitianX">*</i>数量','<i class="bitianX">*</i>单价','金额','商品串号明细', '备注', '类别','商品编码','品牌','型号','颜色',
                '仓库id', 'goodsId','是否管理串号','明细id'],
            colModel:[
                {name: 'deliveryDo', index: 'deliveryDo', width: 70, align: 'center', formatter: addAndDelete, sortable: false},
                {name: 'storageName', index: 'storageName', width: 200, align: 'left', sorttype: 'string', sortable: false, editable: true, edittype: 'custom', editoptions: {
                    custom_element: function(value, option) {
                        return '<input value="' + value + '" readonly="readonly" class="form-control"/><span class="ckmc glyphicon glyphicon-plus" style="margin-left:-40px;margin-top:-25px;float:right;"></span>'
                    },
                    custom_value: function(value) {
                        return value.val();
                    }
                }
                },
                {name: 'goodsName', index: 'goodsName', width: 200, align: 'left', sorttype: 'string', sortable: false, editable: true, edittype: 'custom', editoptions: {
                    custom_element: function(value, options) {
                        return '<input value="'+value+'" type="text" readonly="readonly" class="form-control"/><span style="margin-left:-40px;margin-top:-25px;float:right;" class="spmc glyphicon glyphicon-plus colspan2" ></span>';
                    },
                    custom_value: function(value) {
                        return value.val();
                    }
                }
                },
                {name: 'stockCount', index: 'stockCount', width: 150, align: 'right', sorttype: 'integer', sortable: false},
                {name: 'goodsNumber', index: 'goodsNumber', width: 150, align: 'right', sorttype: 'integer',formatter:'number', formatoptions:{decimalPlaces:0},editable: true, sortable: false, editoptions: {
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
                    }
                    ]
                }
                },
                {name: 'price', index: 'price', width: 150, align: 'right', sorttype: 'int',formatter:'number', formatoptions:{decimalPlaces:2},editable: true, sortable: false, editoptions: {
                    onkeyup: "checkInput.checkNum(this,12)",
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
                    }
                    ]
                }
                },
                {name: 'amount', index: 'amount', width: 150, align: 'right', sorttype: 'int',formatter:'number', formatoptions:{decimalPlaces:2},sortable: false,},
                {name: 'imeiIds', index: 'imeiIds',hidden:true},
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
                    }
                    ]
                }
                },
                {name: 'categoryName', index: 'categoryName', width: 100, align: 'left', sortable: false},
                {name: 'code', index: 'code', width: 160, align: 'left', sortable: false},
                {name: 'brandName', index: 'brandName', width: 140, align: 'left', sortable: false},
                {name: 'models', index: 'models', width: 100, align: 'left', sortable: false},
                {name: 'color', index: 'color', width: 100, align: 'left', sortable: false},
                {name: 'storageId',index:'storageId',hidden:true},
                {name: 'goodsId',index:'goodsId',hidden:true},
                {name: 'ifManageImei',index:'ifManageImei',hidden:true},
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
            shrinkToFit:true,
            footerrow:true,
            userDataOnFooter:true,
            ondblClickRow: function(id){
            },
            beforeEditCell: function(rowid, cellname, v, iRow, iCol){
                lastrow = iRow;
                lastcell = iCol;
            },
            afterSaveCell: function(rowid, name, val, iRow, iCol){
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
            onCellSelect: function(rowid, index, cellcontent, e){
                var curColName=$.trim($(e.target).attr('aria-describedby')).replace('grid_','');
                if(curColName=='goodsNumber'){
                    $("#grid").jqGrid("saveCell",lastrow,lastcell);
                    var rowData=$('#grid').jqGrid("getRowData",rowid);
                    var ifim=rowData.ifManageImei;
                    if(ifim==1){//串号管理
                        $(this).setColProp('goodsNumber',{editable:false});
                        $('#numberChoose').modal('show');
                        $('#imeiGoodsName').val(rowData.goodsName)
                        $('#imeiStorageName').val(rowData.storageName)

                            $.ajaxPackage({
                                url:basePath+'/inventory/common/getStockGoodsImeiVoList',
                                data:{
                                    sectionId:$('#departmentName').data('id'),
                                    storageId:rowData.storageId,
                                    goodsId:rowData.goodsId
                                },
                                success:function (data) {
                                    var goodsImeiVoList=  data.data.goodsImeiVoList;
                                    $("#inlib").jqGrid("clearGridData");
                                    $("#inlib").setGridParam({data:goodsImeiVoList,datatype : "local",}).trigger('reloadGrid')
                                }
                            })

                            if(rowData.imeiIds==''){
                                $("#temp").jqGrid("clearGridData");
                            }else{
                                $.ajaxPackage({
                                    url:basePath+'/inventory/common/getImeiVoList',
                                    data:{
                                        imeiIds:rowData.imeiIds
                                    },
                                    success:function (data) {
                                        var imeiVoList=  data.data.imeiVoList;
                                        $("#temp").jqGrid("clearGridData");
                                        $("#temp").setGridParam({data:imeiVoList,datatype : "local",}).trigger('reloadGrid')
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
            afterInsertRow: function(rowid,e){
                //这里需要推迟执行，需要先执行表格的进入不可编辑状态
                setTimeout(function () {
                    //添加一行之后，需要把上一个行的仓库也带到本行中 , 这里可能是订单引入，订单引入，这里不需要（把上一个行的仓库也带到本行中）；
                    if (rowid > 1) {
                        var prevRowData =$('#grid').jqGrid('getRowData', rowid - 1);
                        var curRowData = $('#grid').jqGrid('getRowData', rowid);
                        if (prevRowData.storageId != "" && curRowData.storageId == "") {
                            $('#grid').jqGrid('setCell', rowid, 'storageId', prevRowData.storageId);
                            $('#grid').jqGrid('setCell', rowid, 'storageName', prevRowData.storageName);
                        }
                    }
                }, 0)
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
            gridSum();
        });
        //仓库选择
        $(document).on('click','.ckmc',function(){
            if($('#departmentName').data('id')!=undefined){
                $.request({
                    type:'post',
                    url:basePath+'/inventory/common/getStorageVoList',
                    dataType:'json',
                    data:{
                        sectionId:$('#departmentName').data('id')
                    },
                    success:function(data){
                        if(data.result==1){
                            var res=data.data.storageVoList;
                            if(!res.length){
                                $.zxsaas_plus.showalert('warning','条目为空！');
                            }else{
                                $('#ckmcChoose').modal('show');
                                $.fn.zTree.init($("#ckmcDataTree"),{
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
                                            if(treeNode.check_Child_State==-1){}
                                        },
                                        onDblClick:function(event, treeId, treeNode){
                                            if($(event.target).is('span')){
                                                if(treeNode.check_Child_State==-1){
                                                    $("#grid").jqGrid("saveCell",lastrow,lastcell);
                                                    var rowId = $("#grid").jqGrid("getGridParam", "selrow");

                                                    $("#grid").setRowData(rowId,{
                                                        'storageName':treeNode.name,
                                                        "goodsName":'&nbsp',
                                                        "stockCount":'&nbsp',
                                                        "goodsNumber":'&nbsp',
                                                        "imeiIds":'&nbsp',
                                                        "remark":'&nbsp',
                                                        'storageId':treeNode.storageId,
                                                        'goodsId':'&nbsp',
                                                        'ifManageImei':'&nbsp',
                                                        'categoryName':'&nbsp',
                                                        'code':'&nbsp',
                                                        'brandName':'&nbsp',
                                                        'models':'&nbsp',
                                                        'color':'&nbsp'
                                                    })

                                                    $('#ckmcChoose').modal('hide');
                                                }
                                            }
                                        }
                                    }
                                },res);
                                $.fn.zTree.getZTreeObj("ckmcDataTree").expandAll(true);
                            }
                        }else{
                            $.zxsaas_plus.showalert('error',data.desc);
                        }
                    },
                    error:function(){
                        alert('请求失败！')
                    }
                })
            }else{
                $.zxsaas_plus.showalert('warning','请选择部门！');
            }
        })
        //商品选择
        $(document).on('click','.spmc',function(){
            var rowId = $("#grid").jqGrid("getGridParam","selrow");
            var rowData = $("#grid").jqGrid("getRowData",rowId);
            if(rowData.storageId!=''){
                $.request({
                    type:'post',
                    url:basePath+'/inventory/common/getGoodsClassTreeNodeVoList',
                    dataType:'json',
                    data:{
                        sectionId:$('#departmentName').data('id'),
                        storageId:rowData.storageId
                    },
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
                                                    sectionId:$('#departmentName').data('id'),
                                                    storageIds:rowData.storageId,
                                                    goodsCategoryIds:treeNode.id,
                                                    queryKey:$('#proSearch').val()
                                                }
                                            }).trigger("reloadGrid");
                                            $("#grid").jqGrid("saveCell",lastrow,lastcell);
                                        }
                                    }
                                },res);
                                //$.fn.zTree.getZTreeObj("spmcDataTree").expandAll(true);
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
                        sectionId:$('#departmentName').data('id'),
                        storageIds:rowData.storageId
                    }
                }).trigger("reloadGrid");
            }else{
                $.zxsaas_plus.showalert('warning','请先选择仓库！');
            }
        })
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
            colNames:['编码','商品名称', '类别', '品牌', '型号','颜色','是否串号管理', '计价方式','库存数','备注', '商品id','串号id'],
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
                {name: 'imeiId', index: 'imeiId',hidden:true}
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
                addGoodName([rowid]);
                var row=$("#proTable").jqGrid("getRowData",rowid);
                var mainSelectID=$("#grid").getGridParam("selrow");
                $("#grid").jqGrid("saveCell",lastrow,lastcell);
                $("#grid").jqGrid("setCell",mainSelectID,"goodsName",row.name);
                $("#grid").jqGrid("setCell",mainSelectID,"goodsId",row.goodsId);
                $("#grid").jqGrid("setCell",mainSelectID,"stockCount",row.stockCount);
                $("#grid").jqGrid("setCell",mainSelectID,"ifManageImei",row.ifManageImei);
                $("#grid").jqGrid("setCell",mainSelectID,"goodsNumber",0);
                $("#grid").jqGrid("setCell",mainSelectID,"imeiIds",'&nbsp');
                $("#grid").jqGrid("setCell",mainSelectID,"remark",row.remark);
                $("#grid").jqGrid("setCell",mainSelectID,"categoryName",row.categoryName);
                $("#grid").jqGrid("setCell",mainSelectID,"code",row.code);
                $("#grid").jqGrid("setCell",mainSelectID,"brandName",row.brandName);
                $("#grid").jqGrid("setCell",mainSelectID,"models",row.models);
                $("#grid").jqGrid("setCell",mainSelectID,"color",row.color);

                var arr=[];
                if($('input:checkbox').eq('1').attr('checked')=='checked'){
                    $('#filterGoodsName').val(row.name).data('id',row.goodsId)
                }

                $('#goodsnameReferenceModal').modal('hide');
            },
            beforeEditCell: function(rowid, cellname, v, iRow, iCol){
                lastrow = iRow;
                lastcell = iCol;
            },
            afterSaveCell: function(rowid, cellname, value, iRow, iCol){},
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
            },
            loadComplete: function(data){
            },
            loadError: function(xhr,status,error){
            }
        })
        $('#goodsnameReferenceModal').on('shown.bs.modal', function (e) {
            $('.modalRight div').css('width','auto')
        })
        $('#DSearch').keyup(function(e){
            if(e.keyCode==13){
                var rowId = $("#grid").jqGrid("getGridParam","selrow");
                var rowData = $("#grid").jqGrid("getRowData",rowId);
                $("#proTable").jqGrid('setGridParam', {
                    datatype:'json',
                    postData:{
                        sectionId:$('#departmentName').data('id'),
                        storageIds:rowData.storageId,
                        queryKey:$('#DSearch').val()
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
        temp();
        function inLib(){
            $('#inlib').jqGrid({
                datatype: "local",
                colNames:['串号','辅助串号','串号id'],
                colModel:[
                    {name: 'imei', index: 'imei',align: 'center',sortable: false,width:200},
                    {name: 'auxiliaryImei', index: 'auxiliaryImei',align: 'center',sortable: false,width:200},
                    {name: 'imeiId', index: 'imeiId',align: 'center',sortable: false,hidden:true},
                ],
                responsive: false,
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
                height:$(window).height() * 0.45,
                rownumWidth:35,
                shrinkToFit:true,
                footerrow:false,
                userDataOnFooter:true,
                beforeEditCell: function(rowid, cellname, v, iRow, iCol){
                    lastrow = iRow;
                    lastcell = iCol;
                },loadComplete: function (data) {
                    $('#inlibPager_left').remove()
                    $('#inlibPager_center').attr('colspan',2)
                },
            })

        }
        function temp(){
            $('#temp').jqGrid({
                datatype: "local",
                colNames:['串号','辅助串号','串号id'],
                colModel:[
                    {name: 'imei', index: 'imei',align: 'center',sortable: false,width:200},
                    {name: 'auxiliaryImei', index: 'auxiliaryImei',align: 'center',sortable: false,width:200},
                    {name: 'imeiId', index: 'imeiId',align: 'center',sortable: false,hidden:true},
                ],
                responsive: false,
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
                height:$(window).height() * 0.45,
                rownumWidth:35,
                shrinkToFit:true,
                footerrow:false,
                userDataOnFooter:true,
                beforeEditCell: function(rowid, cellname, v, iRow, iCol){
                    lastrow = iRow;
                    lastcell = iCol;
                },loadComplete: function (data) {
                $('#tempPager_left').remove()
                $('#tempPager_center').attr('colspan',2)
            },
            })

        }

        $('#rightAll').click(function(){
            var inlibAllList = $("#inlib").getGridParam().data
            rightImei(inlibAllList)
        })
        $('#leftAll').click(function(){
            var inlibAllList = $("#temp").getGridParam().data
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
                }
                inlibSelsList.push(item)
            })
            rightImei(inlibSelsList)
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
        $('#numberChooseSure').click(function(){
            var arr=[];
            $.each($("#temp").getCol('imeiId',true),function(i,val){
                arr.push(val.value)
            })
            var str=arr.join(',');
            var selectID=$("#grid").getGridParam("selrow");
            var ids=$('#temp').jqGrid("getDataIDs");
            var rowDate=$('#grid').jqGrid("getRowData",$('#grid').getGridParam('selrow'))
            $("#grid").jqGrid("setCell",selectID,"goodsNumber",ids.length);
            var price=ids.length*rowDate.price
            $("#grid").jqGrid("setCell",selectID,"amount",price)
            if(str==''){
                $("#grid").jqGrid("setCell",selectID,"imeiIds",'&nbsp');
            }else{
                $("#grid").jqGrid("setCell",selectID,"imeiIds",str);
            }

            var sum_1=$("#grid").getCol('goodsNumber',false,'sum');
            $("#grid").footerData('set',{"goodsNumber":sum_1},false);
            var idxData=$("#grid").jqGrid("getRowData",$("#grid").getGridParam("selrow"));
            var tol=Number(idxData.price)*Number(idxData.goodsNumber);
            $("#grid").jqGrid("setCell",$("#grid").getGridParam("selrow"),"amount",tol);
            var sum=$("#grid").getCol('amount',false,'sum');
            $("#grid").footerData('set',{"amount":sum},false);

            $('#numberChoose').modal('hide');
        })
        function rightImei(inlibSelsList) {
            var addData=[]
            var arr=[];
            $.each($("#temp").getGridParam().data,function(j,jj){
                arr.push(jj.imei)
            })
            $.each(inlibSelsList,function(i,inlibRow){
                var item={
                    imei:inlibRow.imei,
                    auxiliaryImei:inlibRow.auxiliaryImei,
                    imeiId:inlibRow.imeiId,
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
        function leftImei(inlibSels) {
            var addData=[]
            var arr=[];
            $.each($("#inlib").getGridParam().data,function(j,jj){
                arr.push(jj.imei)
            })
            $.each(inlibSels,function(i,tempRow){
                var item={
                    imei:tempRow.imei,
                    auxiliaryImei:tempRow.auxiliaryImei,
                    imeiId:tempRow.imeiId,
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

    function storageName(strName,storageName){//仓库名称
        $.request({
            type:'post',
            url:basePath+'/inventory/common/getStorageVoList',
            dataType:'json',
            data:{
                sectionId:$(strName).data('id')
            },
            success:function(data){
                if(data.result==1){
                    var res=data.data.storageVoList;
                    if(storageName=="#filterStorageName"){
                        var html='<option value=""></option>'
                        $.each(res,function(i,val){
                            html+='<option value="'+val.storageId+'">'+val.name+'</option>';
                        })
                    }else {
                        $.each(res,function(i,val){
                            html+='<option value="'+val.storageId+'">'+val.name+'</option>';
                        })
                    }

                    $(storageName).html(html)
                }else{
                    $.zxsaas_plus.showalert('error',data.desc);
                }
            },
            error:function(){
                alert('请求失败！')
            }
        })

    }
    function ajaxDataFilter(responseData) {
        for(var i=0, m=responseData.length; i<m; i++){
            if(responseData[i].parentId==-2){
                responseData[i].open=true;
            }else{
                responseData[i].open=false;
            }
        }
    };

    function OutOfTheWay(asyncOpt,callback){
        async:asyncOpt,
            $.request({
                type:'post',
                url:basePath+'/inventory/common/getOtherOutInStorageClassVoList',
                dataType:'json',
                data:{
                    type:"1"
                },
                success:function(data){
                    if(data.result==1){
                        var res=data.data.classVoList
                        var html;
                        $.each(res,function(i,val){
                            html+='<option value="'+val.classId+'">'+val.name+'</option>';
                        })
                        $('#otherStorageId').html(html);
                        if(callback)callback();
                    }else{
                        $.zxsaas_plus.showalert('error',data.desc);
                    }
                },
                error:function(){
                    alert('请求失败！')
                }
            })
    }
    //数据格式化
    function fomatFloat(src,pos){
        return Math.round(src*Math.pow(10, pos))/Math.pow(10, pos);
    }
    function gridSum(){
        var $table=$("#grid");
        var ids = $table.getDataIDs();
        $.each(ids, function (i, value) {
            var currRow = $table.jqGrid('getRowData', value);
            $table.jqGrid('setCell', value, "amount", Number(currRow.price) * Number(currRow.goodsNumber));
        });

        var sum=$table.getCol('amount',false,'sum');
        $table.footerData('set',{"amount":$.formatFloat(sum,2)},false);
        var sum1=$("#grid").getCol('goodsNumber',false,'sum');
        $table.footerData('set',{"goodsNumber":sum1},false);
    }
    function footDataRender(asyncOpt,param){//页面底部信息请求加载
        var dft={
            bool:true
        }
        asyncOpt = $.extend(true,dft,asyncOpt);
        $.request({
            async:asyncOpt.bool,
            type:'post',
            url:basePath+'/inventory/storage/stock/other/removal/searchOrder',
            data:param,
            dataType:'json',
            success:function(data){
                if(data.result==1){
                    $('#footerCompany').val(data.data.order.companyName);
                    $('#footerCreate').val(data.data.order.createByName);
                    if(data.data.order.updateByName)$('#footerUpdate').val(data.data.order.updateByName);
                    if(data.data.order.postByName)$('#footerPost').val(data.data.order.postByName);
                    if(data.data.order.redByName)$('#footerBack').val(data.data.order.redByName);
                    gridSum();
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
        order.sectionId=$('#departmentName').data('id');
        order.contactUnitId=$('#contactName').data('id');
        order.otherStorageClassId=$('#otherStorageId').val();
        order.billsDateStr=$('#billsDateString').val();
        order.managerId=$('#managersName').data('id');
        order.remark=$('#remark').val();
        order.detailList=new Array();
        var ids=$("#grid").jqGrid("getDataIDs");
        $.each(ids,function(i,val){
            var rowdata=$('#grid').jqGrid("getRowData",val);
            order.detailList[i]={};
            order.detailList[i].storageId=rowdata.storageId;
            order.detailList[i].id=rowdata.id;
            order.detailList[i].goodsId=rowdata.goodsId;
            order.detailList[i].goodsNumber=rowdata.goodsNumber;
            order.detailList[i].imeiIds=rowdata.imeiIds;
            order.detailList[i].remark=rowdata.remark;
            order.detailList[i].price=rowdata.price;
            order.detailList[i].amount=rowdata.amount
        })
        return order
    }

    function billSearch(url_Code,failCallback,billsId,callbackObj){//单据查询
        url_Code=url_Code||''
        billsId=billsId||''
        var filParam={
            billsId:billsId,
            isDraft:$('#isDraft').val()||"",
            refBillsId:$('#billsId').val()||"",
            startTime:$('#startTimeStr').val()||"",
            sectionIds:$('#filterOutName').data('id')||"",
            contactsunitId:$('#filterContactName').data('id')||"",
            storageIds:$("#filterStorageName").val()||"",
            billsCode:$('#selBillsCode').val()||"",
            endTime:$('#endTimeStr').val()||"",
            remark:$('#selRemark').val()||"",
            imeiKey:$('#selImei').val()||""
        }
        $.request({
            async:true,
            type:'post',
            url:basePath+'/inventory/storage/stock/other/removal/searchOrder?queryCodeStr='+url_Code,
            data:filParam,
            dataType:'json',
            success:function(data){
                if(data.result==1){
                    var res=data.data.order;
                    $("#grid").jqGrid('setGridParam', {
                        ajaxGridOptions:{async:false},
                        url:basePath+'/inventory/storage/stock/other/removal/searchOrder?queryCodeStr='+url_Code,
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
        $('#departmentName').val(data.sectionName).data('id',data.sectionId);
        /*$('#filterOutName').val(data.sectionName).data('id',data.sectionId);*/

        $('#managersName').val(data.managerName).data('id',data.managerId);
        $('#billsDateString').val(data.billsDateStr);
        $('#storageId option[value='+data.otherStorageClassId+']').prop('selected',true);
        $('#contactName').val(data.contactUnitName).data('id',data.contactUnitId);
        if(data.otherStorageClassCode=='PKCK'){
            $('#otherStorageId').html('<option value="'+data.otherStorageClassId+'">'+data.otherStorageClassName+'</option>')
        }else{
            OutOfTheWay(false,function(){//入库方式
                $('#otherStorageId option[value='+data.otherStorageClassId+']').prop('selected',true);
            })
        }
        $('#remark').val(data.remark);
        $('#footerCompany').val(data.companyName);
        $('#footerCreate').val(data.createByName);
        $('#grid').clearGridData();
        addContact('#grid',data.detailList)
        data.updateByName?$('#footerUpdate').val(data.updateByName):$('#footerUpdate').val('');
        data.postByName?$('#footerPost').val(data.postByName):$('#footerPost').val('');
        data.redByName?$('#footerBack').val(data.redByName):$('#footerBack').val('');
        $('#isDraft').val()==1?EventList.trigger('draftSign'):EventList.trigger('formalSign');
        switch ($('#billsStatus').val()){
            case '6':
                //过账;
                EventList.trigger('PostingSign')
                break;
            case '7':
                //红冲;
                EventList.trigger('redSign')
                $('#remark').attr('disabled',false);
                break;
        }
    }
    //
    var addContact = function(name,dataList) {
        var selectedId = $(name).jqGrid("getGridParam", "selrow");
        var dataRow =dataList
        if (selectedId) {
            $(name).jqGrid("addRowData", "id", dataRow, "before", selectedId);

        } else {
            $(name).jqGrid("addRowData", "id", dataRow, "first");

        }
    };
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
            var dataRow = {
                'goodsName': proDataItem.name,
                'goodsId': proDataItem.goodsId,
                'stockCount': proDataItem.stockCount,
                'ifManageImei': proDataItem.ifManageImei,
                'goodsNumber': 0,
                'imeiIds': '&nbsp',
                'remark': proDataItem.remark,
                'categoryName': proDataItem.categoryName,
                'code': proDataItem.code,
                'brandName': proDataItem.brandName,
                'models': proDataItem.models,
                'color': proDataItem.color,
                'storageId':proDataItem.storageId,
                'storageName':proDataItem.storageName,
            };
            var flag=1;
            var cIndex;
            if(flag===1){
                if(i==0){
                    cIndex=Number(gridSelId);
                    $("#grid" + " #" + cIndex+"_goodsName").val(dataRow.goodsName);
                    $("#grid").jqGrid('setRowData', cIndex, dataRow, {});
                }else{
                    cIndex = $('#grid').jqGrid('getDataIDs').length + 1;
                    $('#grid').jqGrid('addRowData', cIndex, dataRow);
                }
            }
        }
        checkIfManageImeiIcon();
        $('#goodsnameReferenceModal').modal('hide');
        gridSum()
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

