var nameList = [];
var codeList = [];
var lastrow;
var lastcell;

$(document).on('blur','#startTimeStr,#endTimeStr',function(e){
    var startTime = new Date($('#startTimeStr').val().replace(/\-/g,'/'));
    var endTime = new Date($('#endTimeStr').val().replace(/\-/g,'/'));
    var flag = (endTime < startTime) ? false : true;
    if(!flag){
        $.zxsaas_plus.showalert("提示","结束日期必须晚于开始日期！");
        $(this).val('');
        return;
    }
});
//备注
function clearRemark(obj,num){
    if(obj.value.length > num){
        obj.value = obj.value.substring(0,num);
    }
}

$(function(){
    storageObj = new StorageObj(basePath);
    loadmodal();
    initDetail()
    initImeiVerify();
    initAllotData();
    initRejectData();

    $('.multi_select_audit').MSDL({
        'width': '152',
        'data':  ['已发货','已接收','拒收'],
        'ids': ['8','10','11'],
        'msg': '_audit',
        'defaultSelected':['已发货'],
        'defaultSelectedIds':['8'],
    });

    $('.multi_select_alloType').MSDL({
        'width': '152',
        'data': ['同价调拨发货单','变价调拨发货单'],
        'ids': ['7','8'],
        'msg':'_alloType'
    });

    $("#receiveDateString").datetimepicker({
        lang:"ch",           //语言选择中文
        format:"Y-m-d",      //格式化日期
        timepicker:false,    //关闭时间选项
        todayButton:false    //关闭选择今天按钮
    });
    //调入部门
    $('#filterOutName').storePlu({
        isStoreShow:false,
        isLoadDefaultName:0,
        checkMore: true,
        search: false,
        ifStore: false, // 控制部门选项
        changeStore:function(){
            $('#filterForm input[name="selInDepartmentIdStr"]').val($('#filterForm #filterOutName').data('sectionId'))
        }
    });
    //调出部门
    $('#filterInName').comModalsSection({
        multiselect:true,
        clickback:function(){
            $('#filterForm input[name="selOutDepartmentIdStr"]').val($('#filterForm #filterInName').data('id'))
        }
    });
    //经办人
    $("#managersName").comModalsEmployeeBySection({
        sectionIds:'#filterInName'
    })
    setTimeout(function(){
        official()
    },40)

});

/***init 经手人***/
function initManagers(){
    //部门选择后才能选择经手人
    $('#managersUid').removeAttr('disabled');
    $('#managersUid').html('');
    var selectHtml = '<option value=""></option>';
    storageObj.initManagers($('#selOutDepartmentIdStr').val(),function(data){
        var list = data.data.employeeVoList;
        if(list){
            $(list).each(function(index,yu){
                selectHtml += '<option value="'+yu.id+'">'+yu.name+'</option>';
            });
        }
    });
    $('#managersUid').append(selectHtml);
}

function loadmodal(){
    var options = {
        LoadBtnUrl: basePath+"/json/button.json", //按钮工具栏加载地址
        GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
        DelRowUrl: "", // 删除信息接口地址
        isSub:"",//是否有子级表格
        subLoadTableUrl:"",//子级表格数据来源地址
        TableName: "#jqGrid_SubjectBalance", //显示表格名称。遵照css选择器书写
        iconJsonUrl:"../json/icon.json",
        btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写
        pager:"#jqGridPager",
        LoadTableUrl:basePath + "/inventory/storage/price/transfer/receive/searchOrderPageList"
    };
    //需求：开始日期应清空
    $("#startTimeStr").datePlu({
		dateEnd:'#endTimeStr',
		endDate:true,
		minTime: "1970-01-01",
		ifPermissions:false,
        ajaxOpt:{
            async: false
        }
    }).val('');
    $("#datetimepickerStart2").datetimepicker({
        lang:"ch",           //语言选择中文
        format:"Y-m-d",      //格式化日期
        timepicker:false,    //关闭时间选项
        todayButton:false    //关闭选择今天按钮
    });
    $("#datetimepickerStart3").datetimepicker({
        lang:"ch",           //语言选择中文
        format:"Y-m-d",      //格式化日期
        timepicker:false,    //关闭时间选项
        todayButton:false    //关闭选择今天按钮
    });
    $("#datetimepickerStart4").datetimepicker({
        lang:"ch",           //语言选择中文
        format:"Y-m-d",      //格式化日期
        timepicker:false,    //关闭时间选项
        todayButton:false    //关闭选择今天按钮
    });

    $.jgrid.defaults.width = 1280;
    $.jgrid.defaults.responsive = true;
    $.jgrid.defaults.styleUI = 'Bootstrap';
    var lastsel='';//最后一次选中的行
    var colNames = ['单据编号','billsStatus','单据日期','单据状态','调出部门','调入部门','调拨总额','调出备注','接收备注','新增人','新增时间','发货人','发货时间','id','单据类型','调入部门id'];
    var JqGridColModel=[
        {name:'billsCode',index:'billsCode', width:160,align:'left',sortable:true,frozen : true},
        {name:'billsStatus',index:'billsStatus', width:250,align:'center',sortable:true,hidden:true},
        {name:'billsDateStr',index:'billsDateStr',width:100,align:'center',sortable:true,frozen : true,formatter:'date',formatoptions: {newformat:'Y-m-d'}},
        {name:'billsStatusName',index:'billsStatusName', width:100,align:'center',sortable:true, frozen : true},
        {name:'moveOutSectionName',index:'moveOutSectionName', width:200,align:'left',sortable:true},
        {name:'moveInSectionName',index:'moveInSectionName', width:200,align:'left',sortable:true},
        {name:'billsAmount',index:'billsAmount', width:100,align:'right',hidden:!checkCost,sortable:true,editrules: {number: true},
			formatter: 'number'},
        {name:'remark',index:'remark', width:200,align:'left',sortable:true,editoptions:{onkeyup:"clearRemark(this,100)"}},
        {name:'receiveRemark',index:'receiveRemark', width:200,align:'left',sortable:true},
        {name:'createByName',index:'createByName', width:100,align:'left',sortable:true},
        {name:'createDateStr',index:'createDateStr', width:200,align:'left',sortable:true},
        {name:'postByName',index:'postByName', width:100,align:'left',sortable:true},
        {name:'postDateStr',index:'postDateStr', width:200,align:'right',sortable:true},
        // {name:'rejectReason',index:'rejectReason', width:100,hidden:false,sortable:false,editoptions:{onkeyup:"clearRemark(this,100)"}},
        {name:'orderId',index:'orderId',hidden:true,sortable:false},
        {name:'billsType',index:'billsType',hidden:true,sortable:false},
        {name:'moveInSectionId',index:'moveInSectionId',hidden:true,sortable:false}
    ];
    loadtable();
    //加载表格
    function loadtable() {
        $(options.TableName).jqGrid({
            mtype: "post",
            datatype: "json",
            jsonReader: {
                root: "data.orderList",
                //	page: "data.page",
                total: "data.total",
                records: "data.records",
                repeatitems: false
            },
            colNames: colNames,
            colModel: JqGridColModel,
            sortable: true,
            rownumbers: true,
            cellsubmit: 'clientArray',//单元格保存内容的位置
            editurl: 'clientArray',
            rowNum: 100,
            postData:{
            	billsStatuses:8
            },
            rowList: [100, 200,500],
            pager: options.pager,
            viewrecords: true,
            multiselect: true,
            multiboxonly:true,
            cellEdit: false,		//点击行勾选复选框
            height: '150',
            width:'100%',
            rownumWidth: 35, // the width of the row numbers columns
            shrinkToFit: false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
            footerrow: true,  //设置表格显示表脚
            userDataOnFooter: true,//设置userData 显示在footer里
            ondblClickRow: function (id) {
            },
            onSelectRow: function (id) {
                var rowData = $("#jqGrid_SubjectBalance").jqGrid("getRowData", id);
				$('.Zmargin').show();
                showDetail1(rowData.orderId,rowData.billsStatus);
                /*选择行有背景色，显示明细*/
                $(arguments[2].target).parents('tr').siblings().removeClass('success');
                $(arguments[2].target).parents('tr').addClass('success');
            },
            beforeSelectRow:function() {
                $("#jqGrid_SubjectBalance").jqGrid('resetSelection');
                return(true);
            },

            afterInsertRow: function (rowid, aData) { //新增一行之后

            },
            gridComplete: function () {

            },
            loadComplete: function (data) {
                if ($.ac_cc(data)) return false;  //判断权限

                if ($('#receiveName').val() == '' || $('#receiveName').val() == null) {
                    $('#receiveName').val(data.data.receiveName);		//接收人
                }
                var arr = document.querySelectorAll('.number');
                for (var i = 0, len = arr.length; i < len; i++) {
                    (arr[i].dataset.rid == '') && (arr[i].className = 'number');
                    (arr[i].dataset.rid == '') && (arr[i].parentNode.dataset.target = '');
                }
                footerData();
            },
            loadError: function (xhr, status, error) {
            }
        })
		$(options.TableName).jqGrid('setFrozenColumns')
    }
    $("#cb_jqGrid_SubjectBalance").hide()
    $(window).bind('click', function saveEdit(e) {
        var rowId = $(e.target).parent("tr").attr("id");
        if (lastsel != "" && lastsel != rowId) { //用于点击其他地方保存正在编辑状态下的行
            if ($(e.target).closest(options.TableName).length == 0) {
                $(options.TableName).jqGrid('saveRow', lastsel);
                lastsel='';
            }
        }
    })
    /**
     * 修改表格底部
     */
    function footerData(){
        var footerNumber=$("#jqGrid_SubjectBalance").getCol('billsAmount',false,'sum');
        var f =Number(footerNumber);
        $("#jqGrid_SubjectBalance").jqGrid('footerData','set',{"billsAmount": f.toFixed(2)});
    }
//
//		//查询
//		$(document).on("click",".btn-group button[data-eventname='inquire']",function(event){
//			if(flag==true){
//			$.jgrid.GridDestroy(options.TableName);
//			loadtable();
//			}else{
//				flag=true;
//			}
//
//		});
//

//		$(document).on("click",".btn button[data-eventname='printbtn']",function(event){
//			$.zxsaas_plus.showalert("表格打印操作", "表格打印操作咱未完成，敬请期待");
//
//		});
//		$(document).on("click",".btnbox button[data-eventname='exportTablename']",function(event){
//			$.zxsaas_plus.showalert("表格导出操作", "表格导出操作咱未完成，敬请期待");
//
//		});


}
$(document).on('click','.detail',function(){
    $(".tableNone").attr("display","none");
});

//载入单据明细/汇总
function initDetail() {
    detail()
    gather()
    //明细
    function detail() {
        $('#jqGrid_detail').jqGrid({
            mtype:"POST",
            datatype : "local",
            jsonReader  : {
                root: "data.rows",
                total:"data.total",
                records:"data.records",
                repeatitems: false
            },
            styleUI: 'Bootstrap',
            shrinkToFit: false,
            viewrecords: true,
            width:"100%",
            autowidth:true,
            rownumbers:true,	//显示行号
            height: '270',
            rowNum: 10000,
            cellEdit: true,
            colNames: ['发货仓库名称','接收仓库名称', '商品类别名称', '商品编码','商品名称','串号',
                '辅助串号','数量','单价', '金额', '品牌', '型号', '颜色', "明细备注",'是否串号商品','billsStatus','单据id'
            ],
            colModel: [
                {name: 'storageOutName',index:'storageOutName', width: 150},
                {name: 'storageInName',index:'storageInName', width: 150},
                {name: 'categoryName',index:'categoryName', width: 150},
                {name: 'goodsCode',index:'goodsCode', width: 100},
                {name: 'goodsName',index:'goodsName', width: 200},
                {name: 'imei',index:'imei', width: 180},
                {name: 'auxiliaryImei',index:'auxiliaryImei', width: 180},
                {name: 'goodsNumber',index:'goodsNumber',align: 'right',width: 100},
                {name: 'price',index:'price', align: 'right', width: 100,hidden: !checkCost},
                {name: 'amount',index:'amount',align: 'right', width: 100,hidden: !checkCost},
                {name: 'brandName',index:'brandName', width: 100},
                {name: 'goodsModel',index:'goodsModel', width: 100},
                {name: 'colorName',index:'colorName', width: 100},
                {name: 'remark',index:'remark', width: 200},
                {name: 'ifManageImei',hidden: true },
                {name: 'billsStatus',hidden: true },
                {name: 'id',hidden: true },
            ],
            footerrow:true, //显示底部菜单
            beforeSelectRow: function(rowid,e){
            },
            onSelectAll:function(aRowids,status){
            },
            gridComplete: function() {
            },
            loadComplete:function(data){
                var footerSum=$("#jqGrid_detail").getCol('goodsNumber',false,'sum');
                var amount=$("#jqGrid_detail").getCol('amount',false,'sum');
                $("#jqGrid_detail").jqGrid('footerData','set',{"goodsNumber": footerSum,amount:amount,storageOutName:'合计'});
            }
        });
    }
    //汇总
    function gather() {
        $('#jqGrid_gather').jqGrid({
            mtype:"POST",
            datatype : "local",
            jsonReader  : {
                root: "data.rows",
                total:"data.total",
                records:"data.records",
                repeatitems: false
            },
            styleUI: 'Bootstrap',
            shrinkToFit: false,
            viewrecords: true,
            width:"100%",
            autowidth:true,
            rownumbers:true,	//显示行号
            height: '270',
            rowNum: 10000,
            cellEdit: true,
            colNames: ['发货仓库名称','接收仓库名称', '商品类别名称', '商品编码','商品名称',
               '数量','单价', '金额', '品牌', '型号', '颜色', "明细备注",'是否串号商品','billsStatus','单据id'
            ],
            colModel: [
                {name: 'storageOutName',index:'storageOutName', width: 150},
                {name: 'storageInName',index:'storageInName', width: 150},
                {name: 'categoryName',index:'categoryName', width: 150},
                {name: 'goodsCode',index:'goodsCode', width: 100},
                {name: 'goodsName',index:'goodsName', width: 200},
                {name: 'goodsNumber',index:'goodsNumber',align: 'right', width: 100},
                {name: 'price',index:'price',align: 'right', width: 100,hidden: !checkCost},
                {name: 'amount',index:'amount', align: 'right',width: 100,hidden: !checkCost},
                {name: 'brandName',index:'brandName', width: 100},
                {name: 'goodsModel',index:'goodsModel', width: 100},
                {name: 'colorName',index:'colorName', width: 100},
                {name: 'remark',index:'remark', width: 200},
                {name: 'ifManageImei',hidden: true },
                {name: 'billsStatus',hidden: true },
                {name: 'id',hidden: true },
            ],

            footerrow:true, //显示底部菜单
            onCellSelect:function(id, index, e){
                if(index == 6){
                    var rowData = $('#jqGrid_gather').jqGrid("getRowData", id);
                    initImeiModal(rowData.id,rowData.billsStatus);
                    $('.table').resize()
                    rowData.ifManageImei == '1' ? $('#imeiModal').modal('show') : $('#imeiModal').modal('hide');
                }


            },
            beforeSelectRow: function(rowid,e){
            },
            onSelectAll:function(aRowids,status){
            },
            gridComplete: function() {
            },
            loadComplete:function(data){
                var $grid=$("#jqGrid_gather");
                var ids = $grid.getDataIDs();
                $.each(ids,function(i,value){
                    var rowData = $grid.jqGrid('getRowData', value )
                    //是否 为 串号商品
                    if(rowData.ifManageImei=="1"){
                        $grid.jqGrid('setCell', value, "goodsNumber", '', 'ifManageImeiIcon');
                    } else {
                        //jqgrid 找不到移除 calss 的方法。这里只能外界操作dom 的方式
                        $("#jqGrid_gather #" + value + " td[aria-describedby='jqGrid_gather_goodsNumber']").removeClass('ifManageImeiIcon')
                    }

                });
                var footerSum=$("#jqGrid_gather").getCol('goodsNumber',false,'sum');
                var amount=$("#jqGrid_gather").getCol('amount',false,'sum');
                $("#jqGrid_gather").jqGrid('footerData','set',{"goodsNumber": footerSum,amount:amount,storageOutName:'合计'});
            }
        });
    }



    $(".retail").click(function(){
        $("#jqGrid_detail").resize();
    })
    $(".recede").click(function(){
        $("#jqGrid_gather").resize();
    })

    $("#jqGrid_imeiModal").jqGrid({
        mtype: "get",
        datatype: "local",
        jsonReader: {
            root: "data.rows",
            page: "data.page",
            total: "data.total",
            records: "data.records",
            repeatitems: false
        },
        colNames: ['串号', '辅助串号', '备注', 'id'],
        colModel: [
            {name: 'imei', index: 'imei', align: 'center', sortable: true, key: true},
            {name: 'auxiliaryImei', index: 'auxiliaryImei', align: 'center', sortable: true},
            {name: 'remark', index: 'remark', align: 'center', hidden: false, sortable: true},
            {name: 'id', index: 'id', hidden: true, sortable: true}
        ],
        sortable: true,
        rownumbers: true,
        cellsubmit: 'clientArray',//单元格保存内容的位置
        editurl: 'clientArray',
        rowNum: 10000,
        rowList: [1, 2, 10, 15, 20, 25, 40],
        pager: "#gridpager_imeiModal",
        viewrecords: true,
        multiselect: false,
        cellEdit: false,		//点击行勾选复选框
        height: $(window).height() * 0.45,
        autowidth: true,
        autoScroll: false,
        rownumWidth: 35, // the width of the row numbers columns
        shrinkToFit: true,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
        footerrow: false,  //设置表格显示表脚
        userDataOnFooter: false//设置userData 显示在footer里
    });
}


/**
 * 单据明细  选择行
 */
function showDetail1(id,billsStatus) {
    var url = '/manager/jxc/storage/allotReceptionAffim/allotDetail'
    $("#jqGrid_detail").jqGrid('setGridParam', {
        datatype: "json",
        url: url,
        postData: {id: id,billsStatus:billsStatus}, //发送数据
        page: 1
    }).trigger("reloadGrid").resize(); //重新载入

    $("#jqGrid_gather").jqGrid('setGridParam', {
        datatype: "json",
        url: url,
        postData: {id: id,billsStatus:billsStatus, searchOrder: 'HZCX'}, //发送数据
        page: 1
    }).trigger("reloadGrid").resize(); //重新载入

    if(billsStatus==8){
        $("#jqGrid_detail").setGridParam().showCol("storageOutName").hideCol("storageInName");
        $("#jqGrid_gather").setGridParam().showCol("storageOutName").hideCol("storageInName");
    }else if(billsStatus==10){
        $("#jqGrid_detail").setGridParam().hideCol("storageOutName").showCol("storageInName");
        $("#jqGrid_gather").setGridParam().hideCol("storageOutName").showCol("storageInName");
    }else {
        $("#jqGrid_detail").setGridParam().showCol("storageOutName").showCol("storageInName");
        $("#jqGrid_gather").setGridParam().showCol("storageOutName").showCol("storageInName");
    }
}
/**
 * 接收
 */
function initAllotData(){
    var setting = {
        data: {
            simpleData: {
                enable: true,
                idKey: "id",
                pIdKey: "pId",
                rootPId: null
            }
        },
        callback: {
            onClick: function (event, treeId, treeNode, msg) {
                controllAdd(treeNode.id);//通过id调用对应方法 重构表格
            }
        },
        view: {
            showIcon: false
        }
//			check: {
//					enable: true,
//					chkStyle: "checkbox",
//					chkboxType: { "Y": "ps", "N": "ps" }
//			}
    };

    rowId = $(this).data('rid');
    var options = {
        LoadBtnUrl: basePath+"/json/button.json", //按钮工具栏加载地址
        GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
        DelRowUrl: "", // 删除信息接口地址
        isSub:"",//是否有子级表格
        subLoadTableUrl:"",//子级表格数据来源地址
        TableName: "#jqGrid_tranReceive", //显示表格名称。遵照css选择器书写
        iconJsonUrl:"../json/icon.json",
        btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写
        pager:"#tran_pager"
    };
    $.jgrid.defaults.width = 1280;
    $.jgrid.defaults.responsive = true;
    $.jgrid.defaults.styleUI = 'Bootstrap';
    var lastsel='';//最后一次选中的行
    var rightClickColid="";//右键列id
    var rightClickColIndex=0;//右键index
    var mydata;
    var hid=false;
    var lock=false;
    var myobj=[];
    var colNames = ['单据编号','单据时间','单据状态','调出部门','调入部门','调拨总额','备注','新增人','新增时间','发货人','发货时间','id','拒收原因','接收人','接收时间','拒收人','拒收时间'];
    var JqGridColModel=[
        {name:'billsCode',index:'billsCode', align:'center',sortable:false,width:200},
        {name:'billsDateStr',index:'billsDateStr', align:'center',sortable:false,width:200},
        {name:'billsStatusName',index:'billsStatusName', align:'center',sortable:false,width:150},
        {name:'outDepartmentName',index:'outDepartmentName', align:'center',sortable:false,width:150},
        {name:'inDepartmentName',index:'inDepartmentName',align:'center',sortable:false,width:150},
        {name:'billsAmount',index:'billsAmount', align:'center',hidden:!checkCost ,sortable:false,editoptions:{onkeyup:"clearRemark(this,100)"},width:150},
        {name:'remark',index:'remark', align:'center',sortable:false,width:250},
        {name:'createByName',index:'createByName', align:'center',sortable:false,width:150},
        {name:'createDateStr',index:'createDateString', align:'center',sortable:false,width:250},
        {name:'postByName',index:'postName' ,align:'center',sortable:false,width:150},
        {name:'postDateStr',index:'postDateString', align:'center',sortable:false,width:250},
        {name:'id',index:'id',hidden:true,key:true,sortable:false,width:250},
        {name:'rejectionCause',index:'rejectionCause', hidden:true,sortable:false,editoptions:{onkeyup:"clearRemark(this,100)"},width:250},
        {name:'receiveBy',index:'receiveBy',hidden:true,sortable:false,width:250},
        {name:'receiveDateString',index:'receiveDateString',hidden:true,sortable:false,width:250},
        {name:'rejectionBy',index:'rejectionBy',hidden:true,sortable:false,width:250},
        {name:'rejectionDateString',index:'rejectionDateString',hidden:true,sortable:false,width:250}

    ];
    loadtable();
    //加载表格
    function loadtable(){
        $(options.TableName).jqGrid({
            url:options.LoadTableUrl,
            mtype:"GET",
            datatype: "json",
            jsonReader  : {
                root: "rows",
                repeatitems: false
            },
            colNames:colNames,
            colModel:JqGridColModel,
            sortable:false,
            rownumbers:true,//显示行号
            rowNum: 20,
            rowList: [20, 25, 40],
            pager:options.pager,
            viewrecords: true,	//是否要记录总数
            // multiselect : true,	//复选框属性
            //cellEdit:true,
            width: "100%" ,
            height: $(window).height()*0.23,
            autowidth:false,
            footerrow:true,  //设置表格显示表脚
            userDataOnFooter:true,//设置userData 显示在footer里
            rownumWidth: 35, // the width of the row numbers columns
            shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
            ondblClickRow:function(id){
                //双击进入编辑
                var delid = id;

            },
            onSelectRow:function(id){

            },
            beforeSelectRow:function(rowid,e){
                $(options.TableName).jqGrid('resetSelection');//设置单选  只能选中一行
            },
            afterInsertRow: function (rowid, aData) { //新增一行之后
                footerData();
            },
            gridComplete: function() {
                footerData();
            },
            loadComplete:function(data){
                if($.ac_cc(data)) return false;  //判断权限

                var len = data.rows.length;
                //表格加载完成 默认隐藏的列
//									$(options.TableName).setGridParam().hideCol("metaMoneySee");
//									$(options.TableName).setGridParam().hideCol("metaMoneyUpdate");
//									$(options.TableName).setGridParam().hideCol("clientSee");
            },
            loadError:function(xhr,status,error){
            },

        })
    }
    /**
     * 修改表格底部
     */
    function footerData(){
        var footerNumber=$("#jqGrid_tranReceive").getCol('billsAmount',false,'sum');
        $("#jqGrid_tranReceive").jqGrid('footerData','set',{"billsAmount": footerNumber});
    }
}
/**
 * 拒收
 */
function initRejectData(){

    rowId = $(this).data('rid');
    var options = {
        LoadBtnUrl: basePath+"/json/button.json", //按钮工具栏加载地址
        GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
        DelRowUrl: "", // 删除信息接口地址
        isSub:"",//是否有子级表格
        subLoadTableUrl:"",//子级表格数据来源地址
        TableName: "#jqGrid_tranRejection", //显示表格名称。遵照css选择器书写
        iconJsonUrl:"../json/icon.json",
        btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写
        pager:"#gridpager_tranRejection"
    };

    $.jgrid.defaults.width = 930;
    $.jgrid.defaults.responsive = true;
    $.jgrid.defaults.styleUI = 'Bootstrap';
    var colNames = ['操作','单据编号','billsStatus','单据状态','调出部门','调入部门','调拨总额','备注','拒收原因','新增人','新增时间','发货人','发货时间','id','realid','接收人','接收时间','拒收人','拒收时间'];
    var JqGridColModel=[
        {name:'deliveryDo',index:'deliveryDo', width:70,align:'center',formatter:edit},
        {name:'billsCode',index:'billsCode', align:'center',sortable:false,width:200},
        {name:'billsStatus',index:'billsStatus', align:'center',sortable:false,width:200,hidden:true,},
        {name:'billsStatusName',index:'billsStatusName', align:'center',sortable:false},
        {name:'outDepartmentName',index:'outDepartmentName', align:'center',sortable:false},
        {name:'inDepartmentName',index:'inDepartmentName',align:'center',sortable:false},
        {name:'billsAmount',index:'billsAmount', align:'center',hidden:!checkCost ,sortable:false},
        {name:'remark',index:'remark', align:'center',sortable:false,editable:false},
        {name:'rejectionCause',index:'rejectionCause', align:'center',sortable:false,editoptions:{dataEvents: [{type:'blur',fn:saveCell}],onkeyup:"clearRemark(this,100)"}},
        {name:'createName',index:'createName', align:'center',sortable:false},
        {name:'createDateString',index:'createDateString', align:'center',sortable:false},
        {name:'postName',index:'postName' ,align:'center',sortable:false},
        {name:'postDateString',index:'postDateString', align:'center',sortable:false},
        {name:'id',index:'id',hidden:true,sortable:false},
        {name:'realid',index:'realid',hidden:true,sortable:false},
        {name:'receiveBy',index:'receiveBy',hidden:true,sortable:false},
        {name:'receiveDateString',index:'receiveDateString',hidden:true,sortable:false},
        {name:'rejectionBy',index:'rejectionBy',hidden:true,sortable:false},
        {name:'rejectionDateString',index:'rejectionDateString',hidden:true,sortable:false}
    ];
    loadtable();
    function loadtable() {
        $(options.TableName).jqGrid({
            url: options.LoadTableUrl,
            mtype: "GET",
            datatype: "json",
            jsonReader: {
                root: "rows",
                repeatitems: false
            },
            cellsubmit: 'clientArray',//单元格保存内容的位置
            colNames: colNames,
            colModel: JqGridColModel,
            sortable: false,
            rownumbers: true,//显示行号
            rowNum: 20,
            rowList: [20, 25, 40],
            pager: options.pager,
            viewrecords: true,	//是否要记录总数
            // multiselect : true,	//复选框属性
            cellEdit: false,
            width: "100%",
            height: $(window).height() * 0.23,
            autowidth: true,
            footerrow: true,  //设置表格显示表脚
            userDataOnFooter: true,//设置userData 显示在footer里
            rownumWidth: 35, // the width of the row numbers columns
            shrinkToFit: false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
            ondblClickRow: function (id) {
                //双击进入编辑
                var delid = id;
            },
            onSelectRow: function (id) {
                var rowData = $("#jqGrid_tranRejection").jqGrid("getRowData", id);
            },
            beforeSelectRow: function (rowid, e) {
                $(options.TableName).jqGrid('resetSelection');//设置单选  只能选中一行
                lastrow1 = rowid;
            },
            beforeEditCell: function (rowid, cellname, v, iRow, iCol) {
                lastrow = iRow;
                lastcell = iCol;
            },
            afterInsertRow: function (rowid, aData) { //新增一行之后
                footerData();
            },
            gridComplete: function () {
                footerData();
            },
            loadComplete: function (data) {
                if ($.ac_cc(data)) return false;  //判断权限
                var len = data.rows.length;
            },
            loadError: function (xhr, status, error) {
            },
        })
    }


    /***save ***/
    function saveCell() {
        $("#jqGrid_tranRejection").jqGrid("saveCell", lastrow, lastcell);
    }
    /**
     * 修改表格底部
     */
    function footerData(){
        var footerNumber=$("#jqGrid_tranRejection").getCol('billsAmount',false,'sum');
        $("#jqGrid_tranRejection").jqGrid('footerData','set',{"billsAmount": footerNumber});
    }

    function edit(cellvalue, options, rowObjec){
        var addAndDel ='<div class="operating" data-id="' + options.rowId + '"><span style="cursor:pointer;margin-right:10px" class="icon-edit" id="icon-edit" title="修改" ></span></div>';
        return addAndDel;
    }
}
//修改一行
$(document).on("click",".icon-edit",function(e){
    //确定相应的表格id
    var tabId =$(this).parent().parents("table").attr("id");
    var rowId = $(this).parent().data('id');
    $("#"+tabId).setColProp('rejectionCause',{editable:true});
    $("#"+tabId).editRow(rowId,true);

});

//编辑单元格失焦后
var lastrow1="";
$(document).on("blur","input[role='textbox']",function(){
    var tId =$(this).parents("table").attr("id");
    var nowD =$(this).val();
    if(nowD!=""){
        $("#"+tId).jqGrid('saveRow',lastrow1);
        $("#"+tId).setColProp('rejectionCause',{editable:false});

    }else{
        $.zxsaas_plus.showalert("提示","拒收原因不能为空!");
        $("#"+tId).restoreRow(lastrow1);
        $("#"+tId).setColProp('rejectionCause',{editable:false});
    }
});

/**
 * 串号校验
 */
function initImeiVerify(){
    rowId = $(this).data('rid');
    var options = {
        LoadBtnUrl: basePath+"/json/button.json", //按钮工具栏加载地址
        LoadTableUrl: basePath + "/inventory/storage/price/transfer/receive/getImeiListInMain",
        GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
        DelRowUrl: "", // 删除信息接口地址
        isSub:"",//是否有子级表格
        subLoadTableUrl:"",//子级表格数据来源地址
        TableName: "#jqGrid_tranVerify", //显示表格名称。遵照css选择器书写
        iconJsonUrl:"../json/icon.json",
        btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写
        pager:"#gridpager_tranVerify"
    };
    $.jgrid.defaults.width = 930;
    $.jgrid.defaults.responsive = true;
    $.jgrid.defaults.styleUI = 'Bootstrap';
    var colNames = ['商品名称','串号','辅助串号','已校验'];
    var JqGridColModel=[
        {name:'goodsName',index:'goodsName', width:150,align:'center',sorttype:'string',sortable:false},
        {name:'imei',index:'imei', width:150,align:'center', sorttype:'string',sortable:false},
        {name:'auxiliaryImei',index:'auxiliaryImei', width:150, align:'center',sortable:false},
        {name:'verify',index:'verify', width:150,align:'center',sortable:false}
        //imeiId
    ];
    loadtable();
    function loadtable() {
        $(options.TableName).jqGrid({
            url: options.LoadTableUrl,
            mtype: "GET",
            datatype: "json",
            jsonReader: {
                root: "data.imeiVoList",
                repeatitems: false,
                id: '0'
            },
            colNames: colNames,
            colModel: JqGridColModel,
            sortable: false,
            rownumbers: true,//显示行号
            rowNum: 20,
            rowList: [20, 25, 40],
            pager: options.pager,
            pagerpos: 'left',
            viewrecords: true,	//是否要记录总数
            width: "100%",
            height: $(window).height() * 0.44,
            autowidth: true,
            rownumWidth: 35, // the width of the row numbers columns
            shrinkToFit: false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
            ondblClickRow: function (id) {
                //双击进入编辑
                var delid = id;

            },
            gridComplete: function () {
                var ids = $(options.TableName).jqGrid("getDataIDs");
            },
            loadComplete: function (data) {
                if ($.ac_cc(data)) return false;  //判断权限
                if (data.rows != null) {
                    verifytotal = data.rows.length;
                    notVerifyNum = data.rows.length;
                    $(data.rows).each(function (index, yu) {
                        verifyArr.push(yu.imei);
                    });
                    $('#verifytotal').html(verifytotal);
                    $('#notVerifyNum').html(notVerifyNum);
                    $('#verifySucceedNum').html(verifySucceedNum);
                    $('#notInVerifyNum').html(notInVerifyNum);
                    $('#hintStr').val(hintStr);  //提示信息
                    $('#imeiPut').val('');
                }
                $(options.TableName).setGridWidth(400);
            },
            loadError: function (xhr, status, error) {
            },
        })
    }
};

/***jqGrid 串号明细表格***/
function initImeiModal(id,billsStatus) {
    /**
     * 点击后生成单据明细
     */
    $("#jqGrid_imeiModal").jqGrid('setGridParam',{
        datatype: "json",
        url: basePath + "/jxc/storage/allotReceptionAffim/findImeiDetail",
        postData: {id: id,billsStatus:billsStatus}, //发送数据
        page: 1
    }).trigger("reloadGrid"); //重新载入
}


