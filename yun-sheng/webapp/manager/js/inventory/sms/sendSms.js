var frCode=""
var mainPhone='';
$(function() {
    initEvent()
    getCustomProject('客户资料')
    remaining()
    //初始化事件
    function initEvent() {
        loadmodal()
        loadDataTreeDom()
        // 跳转
        var duan = $.trim(functionObjExtent.getQueryString('duan'))
        if(duan==1){
            var statistics = localStorage.getItem('statistics')
            if(!!statistics){
                statistics=JSON.parse(statistics)
                $("#tempateTitle").val(statistics.tempateTitle)
                $("#tempateContent").val(statistics.tempateContent)
                $("#tid").val(statistics.id)
                localStorage.removeItem('statistics');
                querySms()
            }
        }
        else{
            localStorage.removeItem('statistics');
        }
        // 短信内容改变
        $('#tempateContent').on('change', function(){
            frCode=$(this).val()
        })
        // 目标号码
        $('#tagreTel').on('change', function(){
            mainPhone=$(this).val()
        })
        // 预约时间
        $('.yuTime').datetimepicker({
            lang: "ch",           //语言选择中文
            format: "Y/m/d  H:i",      //格式化日期
            formatTime:'H:i',       // 设置时间时分的格式
            formatDate:'Y/m/d',     // 设置时间年月日的格式
            closeOnTimeSelect: true,       // true 设置timepicker可点击   false 设置timepicker不可点击
            closeOnWithoutClick: true,     // true 设置点击input可以隐藏datetimepicker   false 设置点击input不可以隐藏datetimepicker
            closeOnInputClick: true,      // true 设置点击input可以隐藏datetimepicker   false 设置点击input不可以隐藏datetimepicker  (会有闪动 先隐藏 再显示)
            timepicker: true,            // true 显示timepicker   false 隐藏timepicker
            datepicker: true,
            value:new Date(),
            minTime:'08:00',
            maxTime: '20:00',
        });

        //模糊查询
        $("#queryText").bind('input propertychange', function() {
            querySms();
        });

        // 引入客户号码模态框
        $('#introduction').click(function(){
            $('#saveOrUpdateModal').modal('show');
        })
      // 保存草稿
        $('#draft').click(function(){
            saveRecord();
            var param = $('#saveOrUpdateForm').toJsonObject();
            delete param.sendTime;
            param.sendType=$("#jSend").is(':checked')==true?0:1;
            if($("#jSend").is(':checked')==false){
                param.appointmentTimeStr=$('.yuTime').val()
            }
            param.sendStatus=0
            param.id=$("#tid").val()
            $.request({
                url: '/manager/sms/center/send/record/saveRecord',
                type : 'post',
                data:param,//将对象转换为JSON字符串
                dataType : 'json',
                success: function (data) {
                    if (data.result == 1) {
                        $.zxsaas_plus.showalert("提示", data.desc);
                        querySms();
                        $('#saveOrUpdateModal').modal('hide');
                    }else{
                        $.zxsaas_plus.showalert("提示", data.desc);
                    }

                }
            });
        })
       // 提交
        $('#submit').click(function(){
            saveRecord();
            var param = $('#saveOrUpdateForm').toJsonObject();
            delete param.sendTime;
            param.sendType=$("#jSend").is(':checked')==true?0:1;
            if($("#jSend").is(':checked')==false){
                param.appointmentTimeStr=$('.yuTime').val()
            }
            param.id=$("#tid").val()
            $.request({
                url: '/manager/sms/center/send/record/saveRecord',
                type : 'post',
                data:param,//将对象转换为JSON字符串
                dataType : 'json',
                success: function (data) {
                    if (data.result == 1) {
                        $.zxsaas_plus.showalert("提示", data.desc);
                        querySms();
                        $('#saveOrUpdateModal').modal('hide');
                    }else{
                        $.zxsaas_plus.showalert("提示", data.desc);
                    }

                }
            });
        })
     // 取消
        $('#cancel').click(function() {
            location.reload();
        })

        /*导入模态框*/
        $("#leadXls").click(function (e) {
            /*清空数据*/
            $(".file_ipt").val("");
            $(".des_file").val("");
            $('#intoModalLabel').html('xls导入');
            $('#into').modal('show');

        });
        $("#leadTxt").click(function (e) {
            /*清空数据*/
            $(".file_ipt").val("");
            $(".des_file").val("");
            $('#intoModalLabel').html('txt导入');
            $('#into').modal('show')

        });

        /*浏览(上传)*/
        $(document).on("change",".file_ipt",function(){
            $(".des_file").val($(this).val());
        });
        /*导入*/
        $(document).on("click",".lead_model",function(e){
            var fileName =$(".des_file").val();
            var fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
            if(fileExtension == "xls"||fileExtension == "txt"){
                // $.loading();
                $.ajaxFileUpload({
                    url : '/manager/sms/center/send/record/importData',
                    secureuri : false,
                    fileElementId : "file",
                    dataType : "json",
                    success : function(data) {
                        // data.str = undefined?0:data.sum;
                        // if(data.message==""){
                        //     $.zxsaas_plus.showalert("导入成功","总共导入："+data.sum);
                        // }else{
                        //     $.zxsaas_plus.showalert("导入成功","总共导入："+data.sum+"("+data.message+")");
                        // }
                        $('#tagreTel').val(data.str)
                        // $.loading(true);
                    },
                    error : function(data) {
                        //上传失败
                        if($.trim($(".des_file").val())=="")
                        {
                            $.zxsaas_plus.showalert("导入失败","请选择上传文件！");

                        }else{
                            $.zxsaas_plus.showalert("导入失败","上传文件失败！");
                        }
                        $.loading(true);
                    }
                });
            }else{
                if($.trim(fileName)=="")
                {
                    $.zxsaas_plus.showalert("提示","请选择上传文件！");

                }else{
                    $.zxsaas_plus.showalert("错误","请选择xls或txt格式文件上传！");
                }

            }
            e.preventDefault();
        });
 /********************选择客户号码 模态框开始***********************************/
        //加入日期
        $('#joinDateBegin').datetimepicker({
            lang: "ch",
            format: "Y-m-d",
            timepicker:false,
            todayButton:false
        })
        $('#joinDateEnd').datetimepicker({
            lang: "ch",
            format: "Y-m-d",
            timepicker:false,
            todayButton:false
        })

        //最近消费期间
        $('#latelyConsumptionDateBegin').datetimepicker({
            lang: "ch",
            format: "Y-m-d",
            timepicker:false,
            todayButton:false
        })

        $('#latelyConsumptionDateEnd').datetimepicker({
            lang: "ch",
            format: "Y-m-d",
            timepicker:false,
            todayButton:false
        })

        //查询条件积分范围
        $('#scoreBegin').blur(function () {
            if ($('#scoreEnd').val().trim() !== '' && $('#scoreBegin').val().trim() !== '') {
                testAmount()
            }
        })
        $('#scoreEnd').blur(function () {
            if ($('#scoreBegin').val().trim() !== '' && $('#scoreEnd').val().trim() !== '') {
                testAmount()
            }
        })
        function testAmount() {
            if (accSubtr($('#scoreEnd').val().trim(), $('#scoreBegin').val().trim()) * 1 >= 0) {
                return true;
            } else {
                $.zxsaas_plus.showalert("提示", "结束积分小于开始积分，请重新输入!");
                $('#scoreEnd').val('');
                return false
            }
        }

        //查询表格参数
        function getParams() {
            var params = {
                'joinDateBegin': $('#joinDateBegin').val(),
                'joinDateEnd': $('#joinDateEnd').val(),
                'latelyConsumptionDateBegin': $('#latelyConsumptionDateBegin').val(),
                'latelyConsumptionDateEnd': $('#latelyConsumptionDateBegin').val(),
                'scoreBegin': $('#scoreBegin').val(),
                'scoreEnd': $('#scoreEnd').val(),
                'birthDateBegin': $('#birthDateBegin').val(),
                'birthDateEnd': $('#birthDateEnd').val(),
                'vipInfo': $('#vipInfo').val()
            }
            if($('.isVip').is(':checked')){
                params.isVip = 0;
            }
            return params;
        }

        //查询
        $('#search').click(function () {
            var url = '/manager/inventory/vip/info/selectList'
            searchDetail(getParams(), url, {})
        })

    }

    //列设置
    $('.lineSet').click(function(){
        $('#lineSet-modal').modal('show');
        $("#lineSetGrid").jqGrid('setGridParam', {
            url :'/manager/erp/projectAndColumn/getColumns',
            postData:{
                'rpMainId': projectId
            }
        }).trigger("reloadGrid");
    })

    //列设置表格
    $("#lineSetGrid").jqGrid({
        mtype:"POST",
        datatype : "json",
        viewrecords:true,
        rowNum : 400,
        width: "100%" ,
        height: $(window).height()*0.55,
        colNames:['id','报表列字段','是否显示','code'],
        colModel:[
            {name:"id",width:'150px',align:"center",sortable:false,hidden:true},
            {name:"name",width:'150px',align:"center",sortable:false},
            {name:"isShow",width:'150px',align:"center",sortable:false,formatter: "checkbox",formatoptions:{disabled:false},edittype:'checkbox',editoptions:{value:'1:0'}},
            {name:"code",width:'150px',align:"center",sortable:false,hidden:true},
        ],
        jsonReader: {
            repeatitems: false,
            root:'data.columnVoList',
        },
        gridComplete:function(){
            $('table th').css('text-align','center')
            $('#lineSetGrid')
        },
    });

    //列设置确认
    $('.sureLineSet').click(function() {
        var valList = $('#lineSetGrid').getRowData()
        var ids = $("#lineSetGrid").jqGrid('getDataIDs');
        var rowData = $("#lineSetGrid").jqGrid('getRowData', ids[ids.length - 1]);
        valList.push(rowData)
        $.ajax({
            url: '/manager/erp/projectAndColumn/updateColumns',
            dataType: 'json',
            type: 'post',
            data: {
                'flag':false,
                'valList': JSON.stringify(valList)
            },
            success: function (data) {
                if (data.data.status == '1') {
                    $.jgrid.gridUnload("rpGridHY");

                    $("#search").click()
                }
            }
        })
    })

    //重置
   $('#resetSj').click(function() {
        $('#searchQuery')[0].reset()
        $('#searchQuery input').data('id', '')
        $('#startPeriod,#endPeriod').val('').prop('disabled', true)
        $('#startDate,#endDate').prop('disabled', false)
    })

   //客户查询方法
    function searchDetail(params, url, options) {
        $('.lineSet').show()
        $('.notFounImgBox').hide()
        $('#rpContainer').show()
        $('.loadingImgBox').show()
        $('#promptBox').hide()
        var def = {
            multiselect: true, //是否多选
            sortable: true,//是否排序
            merge: false,//是否合并
            gotoable: false,//是否跳转
            rows: '100'//默认数量

        }
        def = $.extend({}, def, options)
        var alignArr = ['', 'left', 'center', 'right'];
        $.ajax({
            url: '/manager/finance/common/getReportHead',
            dataType: 'json',
            type: 'post',
            data: {
                'projectId':projectId,
            },
            success: function (data) {
                if (data.result == '-999') {
                    $('#rpContainer').hide()
                    $('.notFounImgBox').hide()
                    return
                }
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
                    colModel.push({
                        name: v.code,
                        index: v.code,
                        width: v.columnSize,
                        align: alignArr[v.align],
                        hidden: !v.isShow,
                        id: v.id,
                        sortable: def.sortable,
                        cellattr: function (rowId, tv, rawObject, cm, rdata) {
                            return 'id=\'' + v.code + rowId + "\'";
                        }
                    });
                });

                $.jgrid.gridUnload("rpGridHY");

                $("#rpGridHY").jqGrid({
                    mtype: "POST",
                    url: url,
                    postData: params,
                    datatype: "json",
                    shrinkToFit: false,
                    pager: "#rpGridPager",
                    rowNum: def.rows,
                    autowidth: true,
                    rownumbers: true, // show row numbers
                    rownumWidth: 50, // the width of the row numbers columns
                    width: "100%",
                    height: $(window).height() * 0.5,
                    sortable: def.sortable,
                    viewrecords: true,
                    sortorder: "desc",
                    colNames: colName,
                    footerrow: true,
                    userDataOnFooter: true,
                    colModel: colModel,
                    multiselect: def.multiselect,
                    jsonReader: {
                        repeatitems: false,
                        root: 'data.rows',
                        total: 'data.total',
                        page: 'data.page',
                        records: 'data.records'
                    },
                    gridComplete: function () {
                        $('table th').css('text-align', 'center')
                        $('#rpGridHY').resize()

                        if (mergeArr.length > 0 && def.merge) {
                            Merger("rpGrid", mergeArr);
                        }
                    },
                    onCellSelect: function (rowid, index, contents, event) {

                    },
                    loadComplete: function (data) {
                        $('#rpGridHY').resize()
                        if (Object.keys(data.data).length == 0 ) {
                            $('#rpContainer').hide()
                            $('.loadingImgBox').hide()
                            $('.notFounImgBox').show()

                        } else {
                            $('.loadingImgBox').hide()
                            $('.notFounImgBox').hide()
                            $('#rpContainer').show()
                        }
                        //分页滚动条 置顶
                        $("#rpGridHY").parents(".ui-jqgrid-bdiv")[0].scrollTop = 0;
                    },
                    ondblClickRow: function (id) {

                    },
                });
            }
        })
    }

    // 选中号码数据
    $('.targetNum').click(function(){
        var selRowId = $("#rpGridHY").jqGrid('getGridParam','selarrrow');
        if(selRowId.length<1){
            $.zxsaas_plus.showalert('提示', "请勾选数据!");
            return false;
        }
        var mainIds=[]
        for(var i=0;i<selRowId.length;i++){
            var rowData = $("#rpGridHY").jqGrid('getRowData', selRowId[i]);
            mainIds.push(rowData.consumerPhone)
            mainIds.join(',')
            mainPhone+=mainIds;
            $('#tagreTel').val(mainPhone)
        }
    })
    /********************选择客户号码 模态框结束***********************************/
})


function getParam() {
    var param = new Object();
    param.queryKey = $("#queryText").val();
    return param
}

function querySms(){
    $("#rpGrid").jqGrid('setGridParam',{
        url:'/manager/sms/center/send/record/getRecordList',
        postData:getParam(), //发送数据
        page:1
    }).trigger("reloadGrid"); //重新载入
}
/*******************************短信账户表格***********************************/
function loadmodal() {
    $.jgrid.defaults.width = 1280;
    $.jgrid.defaults.responsive = true;
    $.jgrid.defaults.styleUI = 'Bootstrap';
    var colNames = ['记录id','短信标题','短信内容','目标号码','发送类型','集团id'];
    var JqGridColModel=[
        {name:'id',index:'id',align:'center',sortable:false,hidden:true},
        {name:'tempateTitle',index:'tempateTitle',align:'center',width:250,sortable:false},
        {name:'tempateContent',index:'tempateContent',align:'left',width:500,sortable:false},
        {name:'tagreTel',index:'tagreTel',align:'center',sortable:false,hidden:true},
        {name:'sendType',index:'sendType',align:'left',sortable:false,hidden:true},
        {name:'groupId',index:'groupId',align:'left',sortable:false,hidden:true},
    ];
    loadtable();
    //加载表格
    function loadtable(){
        $('#rpGrid').jqGrid({
            url:'/manager/sms/center/send/record/getRecordList',
            mtype:"POST",
            datatype: "json",
            jsonReader  : {
                root:"data.recordList",
                page: "data.page",
                total: "data.total",
                records: "data.records",
                repeatitems: false
            },
            colNames:colNames,
            colModel:JqGridColModel,
            sortable:false,
            rowNum: 50,
            rowList: [50,100, 300],
            pager:'#jqGridPager',
            viewrecords: true,
            multiselect:true,
            multiboxonly:true,
            rownumbers: true,	//显示行号
            width: "100%" ,
            postData:getParam(),
            height: $(window).height()*0.2,
            autowidth:true,
            rownumWidth: 50, // the width of the row numbers columns
            shrinkToFit:true,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
            ondblClickRow:function(id){
                //双击进入编辑
                var delid = id;

            },
            onCellSelect: function (rowid, iCol, contents, event) {

            },
            onSelectRow:function(rowid){
                    var gridData = $("#rpGrid").jqGrid("getRowData", rowid);//获取被选中的一行数据
                    //赋值表头
                    var params = $('#saveOrUpdateForm').formToArray();
                    $(params).each(function (index, element) {
                        var key = element.name;
                        var value = eval("gridData." + key);
                        $('#' + key).val(value);
                    });
            },

            beforeSelectRow:function(rowid,e){
                $("#rpGrid").jqGrid('resetSelection');
                return(true);
            },
            afterInsertRow: function (rowid, aData) { //新增一行之后

            },
            gridComplete: function() {
                $("#rpGrid").setLabel(0, '序号')
                $("#jqgh_rpGrid_cb").hide();
                return(true);
            },
            loadComplete:function(data){

            },
            loadError:function(xhr,status,error){
            }
        })
    }
}
//加载 右边树
var curr_class_id='';
var curr_class_code=''
var curr_class_name=''
function loadDataTreeDom(){
    var obj={
        success:function(data){
            var nodes = data.data.dataList||[];
            for(var i=0;i<nodes.length;i++){
                nodes[i].pId=nodes[i].parentId
            }
            var treeObj = $.fn.zTree.init($("#TreeDom"),
                {data: {simpleData: {enable: true}},
                    view: {
                        showLine: true
                    },
                    callback:{
                        onClick: function(event, treeId, treeNode){
                            curr_class_id=$.trim(treeNode.id);
                            if(curr_class_id==1){
                                $.zxsaas_plus.showalert('提示', "此项不能选!");
                                return false;
                            }
                            curr_class_node = treeNode;
                            curr_class_code=treeNode.code;
                            curr_class_name=treeNode.name;
                            frCode+='{'+curr_class_code+'}';
                            $('#tempateContent').val(frCode)
                        }
                    }
                },nodes);
            treeObj.expandAll(true);
        }
    }
    InterfaceInventory.SystemTemplate.getMsgField(obj);
}

// 剩余条数
function remaining(){
    var groupId=''
    $.ajaxPackage({
        url:'/manager/sms/center/send/record/getMsnNum',
        data:{groupId:groupId},
        success:function (data) {
            $('#remain').text(data.data.num)
        }
    })
}

function saveRecord(){
    var pa = $('#tempateTitle').val(),
        nu = $('#tempateContent').val(),
        ac = $('#tagreTel').val()
    if(pa == ''){
        $.zxsaas_plus.showalert('提示', "短信标题不能为空!");
        return false;
    }
    if(nu == ''){
        $.zxsaas_plus.showalert('提示', "短信内容不能为空!");
        return false;
    }
    if(ac == ''){
        $.zxsaas_plus.showalert('提示', "目标号码不能为空!");
        return false;
    }
}


