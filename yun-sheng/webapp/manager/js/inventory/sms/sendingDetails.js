$(function() {
    initEvent()
    //初始化事件
    function initEvent() {
        initTopForm()

        // 跳转
        var duan = $.trim(functionObjExtent.getQueryString('duan'))
        if(duan==1){
            var statistics = localStorage.getItem('statistics')
            if(!!statistics){
                statistics=JSON.parse(statistics)
                $('#startDate').val(statistics.startDate)
                $('#endDate').val(statistics.endDate)
                $("#sectionName").data('id',statistics.sectionId).val(statistics.sectionName)
                $("#managerUname").data('id',statistics.sendUid).val(statistics.sendName)
                $("#sendNode").val(statistics.msmStatus)
                $('#sendStatus').combotree('setValue',statistics.sendStatus);
                $("#taskNum").val(statistics.taskNum);
                localStorage.removeItem('statistics');
                $('#search').trigger("click")
            }
        }
        else{
            localStorage.removeItem('statistics');
        }

        initMenuBtn()
          loadmodal()
    }
    // 初始化 顶部表单
    function initTopForm(){
        //载入日期组件
        $('#startDate').datePlu({
            dateEnd:'#endDate',
            endDate:true,
            minTime:"1970-01-01",
            ifPermissions:false,
        });

        //载入 部门组件
        $('#sectionName').storePlu({
            isStoreShow:false,
            checkMore: true,
            search: false,
            isLoadDefaultName:false,
            ifStore: false // 控制部门选项
        });

        //载入 提交人
        $("#managerUname").comModalsEmployee({
            multiselect:true,
            name:'提交人',
            girdParam:{
                empIsOperator:2
            }
        });

         //载入 提交状态
        $('#sendStatus').combotree({
            valueField: "id", //Value字段
            textField: "text", //Text字段
            multiple: true,
            // 发送状态 0：草稿单 1 已发送 2.发送失败
            data: [{ "id": 0, "text": "草稿单" }, { "id": 1, "text": "已发送" }, { "id": 2, "text": "发送失败"}],
            onCheck: function (node, checked) {
                //让全选不显示
                // $("#sendStatus").combotree("setText", $("#sendStatus").combobox("getText").toString().replace("全选,", ""));
            },
            onClick: function (node, checked) {
                //让全选不显示
                // $("#sendStatus").combotree("setText", $("#sendStatus").combobox("getText").toString().replace("全选,", ""));
            }
        });
    }

    //载入菜单组件
    function initMenuBtn() {
        var option = {
            btnGroupLeft: {
                export: {
                    isShow: true,
                    click: function () {
                        var options=getParam();
                        // options.projectId=projectId
                        functionObjExtent.construtForm('/manager/sms/center/send/record/exportSendDetail', options)
                    }
                },
                draftDel: {
                    isShow: true,
                    click: function () {
                        delBtClick()
                    }
                },
            },
        };
        menuBtn = new componentMenuBtn("#GridTool", option);

    }

    //删除按钮点击事件
    function delBtClick() {
        var selRowId = $("#jqGrid_blocMessage").jqGrid('getGridParam','selarrrow');
        if(selRowId.length<1){
            $.zxsaas_plus.showalert('提示', "请勾选数据!");
            return false;
        }

        $.MsgBox('删除提示', '确定要删除此单据!', function () {
            del()
        }, function () {
        });

        function del() {
            var mainIds=[];
            for(var i=0;i<selRowId.length;i++){
                var rowData = $("#jqGrid_blocMessage").jqGrid('getRowData', selRowId[i]);
                mainIds.push(rowData.id)
            }
            mainIds= String( mainIds.join(','))
            $.ajaxPackage({
                url:'/manager/sms/center/send/record/delRecord',
                data:{ids:mainIds},
                success:function (data) {
                    $.zxsaas_plus.showalert('success' ,"删除成功");
                    $('#search').trigger("click")
                }
            })
        }
    }

    // 短信类型
    funNodeOpt()
    function funNodeOpt() {
        $.ajax({
            type: "post",
            url: "/manager/inventory/common/getAllFunNode",
            dataType: "json",
            success: function(data) {
                if (data.result == 1) {
                    var d = data.data.dataList;
                    for (var i = 0; i < d.length; i++) {
                        var id = d[i].id;
                        var content = d[i].content;
                        var opt = "<option value='" + id + "'>" + content + "</option>";
                        $("#funNode").append(opt);
                    }
                }
            },
            error: function() {
                alert("系统异常，请稍后再试！")
            }
        });
    };

    function getParam() {
        var param = new Object();
        param.queryDateStr = $("#startDate").val();
        param.queryDateEnd=$("#endDate").val();
        param.createId=$('#managerUname').data("id");
        param.msmStatus=$('#sendNode').val();
        param.sendStatus=String($("#sendStatus").combotree("getValues"));
        param.sectionIds =$("#sectionName").data("sectionId")||'';
        param.queryKey = $("#queryKey").val();
        param.taskNum = $("#taskNum").val();
        return param
    }
    /*******************************条件查询***********************************/
    $("#search").click(function(){
        $("#jqGrid_blocMessage").jqGrid('setGridParam',{
            url:'/manager/sms/center/send/record/getSendDetail',
            postData:getParam(), //发送数据
            page:1
        }).trigger("reloadGrid"); //重新载入
    })

    /*******************************短信账户表格***********************************/
    function loadmodal() {
        $.jgrid.defaults.width = 1280;
        $.jgrid.defaults.responsive = true;
        $.jgrid.defaults.styleUI = 'Bootstrap';
        var colNames = ['记录id','部门id','部门名称','关联业务单号','任务编号','短信标题','短信内容','短信类型id','短信类型','提交状态id','提交状态','提交人','提交人id',
            '提交时间','提交条数','失败原因','发送状态','发送时间','接收手机号','运营商','失败原因'];
        var JqGridColModel=[
            {name:'id',index:'id',align:'center',sortable:false,hidden:true},
            {name:'sectionId',index:'sectionId',align:'center',sortable:false,hidden:true},
            {name:'sectionName',index:'sectionName',align:'left',width:100,sortable:false},
            {name:'businessNum',index:'businessNum',align:'center',width:150,sortable:false},
            {name:'taskNum',index:'taskNum',align:'center',width:150,sortable:false,classes: 'billsCodeStyle'},
            {name:'tempateTitle',index:'tempateTitle',align:'left',width:150,sortable:false},
            {name:'tempateContent',index:'tempateContent',align:'left',width:250,sortable:false},
            {name:'msgType',index:'msgType',align:'center',sortable:false,hidden:true},
            {name:'msgTypeName',index:'msgTypeName',align:'center',width:100,sortable:false},
            {name:'sendStatus',index:'sendStatus',align:'center',sortable:false,hidden:true},
            {name:'sendStatusName',index:'sendStatusName',align:'center',width:100,sortable:false},
            {name:'sendName',index:'sendName',align:'center',width:100,sortable:false},
            {name:'sendUid',index:'sendUid',align:'center',sortable:false,hidden:true},
            {name:'sendTimeStr',index:'sendTimeStr',width:150,align:'center',sortable:false},
            {name:'totalNum',index:'totalNum',width:100,align:'center',sortable:false},
            {name:'remark',index:'remark',align:'left',width:150,sortable:false},
            {name:'msmStatus',index:'msmStatus',align:'center',width:100,sortable:false},
            {name:'msmTimeStr',index:'msmTimeStr',align:'center',width:100,sortable:false},
            {name:'tagreTel',index:'tagreTel',align:'center',width:100,sortable:false},
            {name:'yun',index:'yun',align:'center',width:100,sortable:false},
            {name:'failRemark ',index:'failRemark ',width:100,align:'center',sortable:false},
        ];
        loadtable();
        //加载表格
        function loadtable(){
            $('#jqGrid_blocMessage').jqGrid({
                url:'/manager/sms/center/send/record/getSendDetail',
                mtype:"POST",
                datatype: "json",
                jsonReader  : {
                    root:"data.dataList",
                    page: "data.page",
                    total: "data.total",
                    records: "data.records",
                    repeatitems: false
                },
                cellEdit:true,
                colNames:colNames,
                colModel:JqGridColModel,
                sortable:false,
                rowNum: 50,
                rowList: [50,100, 300],
                rownumbers: true,	//显示行号
                pager:'#jqGridPager',
                viewrecords: true,
                multiselect:true,
                width: "100%" ,
                postData:getParam(),
                height: $(window).height()*0.65,
                autowidth:true,
                rownumWidth: 35, // the width of the row numbers columns
                shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
                ondblClickRow:function(id){
                    //双击进入编辑
                    var delid = id;

                },
                onCellSelect: function (rowid, iCol, contents, event) {
                    var $target = $(event.target)
                    var curColName
                    if ($.trim($target.attr('aria-describedby')) != '') {
                        curColName = $target.attr('aria-describedby').replace('jqGrid_blocMessage_', '');
                    } else {
                        curColName = $target.closest('td').attr('aria-describedby').replace('jqGrid_blocMessage_', '');
                    }
                    if (curColName == 'taskNum') {
                        var rowDate = $('#jqGrid_blocMessage').getRowData(rowid);
                        if($.trim(rowDate.taskNum)=='草稿单-点我编辑'){
                            var temp=$('#ifname').contents().context.URL
                            var str1 = temp.split("?") ;
                            var str  = str1[1].toString();

                            var goUrl= encodeURI( '/manager/sms/center/sign/sendSms?'+str[1]
                                + '&duan=1'
                                + '&from=查询短信发送明细'

                            )
                            localStorage.setItem('statistics',JSON.stringify({
                                id:rowDate.id,
                                tempateTitle:rowDate.tempateTitle,
                                tempateContent:rowDate.tempateContent,
                            }));
                            window.top.openWorkBoxByMenutext("短信发送", goUrl , true)
                        }else {
                            $.request({
                                url: '/manager/sms/center/send/record/getSendDetailPage',
                                type: 'post',
                                data: {id: rowDate.id,},//将对象转换为JSON字符串
                                dataType: 'json',
                                success: function (data) {
                                    if (data.result == 1) {
                                        $('#tempateTitle').val(data.data.recordDetail.tempateTitle);
                                        $('#tempateContent').val(data.data.recordDetail.tempateContent);
                                        $('#tagreTel').val(data.data.recordDetail.tagreTel);
                                        $('#saveOrUpdateModal').modal('show');
                                    } else {
                                        $.zxsaas_plus.showalert("提示", data.desc);
                                    }
                                }
                            })
                        }
                    }
                },
                onSelectRow:function(id){

                },
                beforeEditCell:function(rowid,cellname,v,iRow,iCol){
                    lastrow = iRow;
                    lastcell = iCol;

                },
                beforeSelectRow:function(rowid,e){

                },
                afterInsertRow: function (rowid, aData) { //新增一行之后

                },
                gridComplete: function() {

                },
                loadComplete:function(data){
                },
                loadError:function(xhr,status,error){
                }
            })

        }
    }
})
/*******************************重置***********************************/
function resetFun(){
    location.reload();
}
