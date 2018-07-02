$(function() {
    initEvent()
    //初始化事件
    function initEvent() {
        //时间
        $('#startDate').datePlu({
            dateEnd:'#endDate',
            endDate:true,
            minTime:"1970-01-01",
            ifPermissions:false,
        });
          loadmodal()
    }
})

function getParam() {
    var param = new Object();
    param.queryDateStr = $("#startDate").val();
    param.queryDateEnd=$("#endDate").val();
    return param
}
/*******************************条件查询***********************************/
function querySms(){
    $("#jqGrid_blocMessage").jqGrid('setGridParam',{
        url:'/manager/sms/center/send/record/sendStatements',
        postData:getParam(), //发送数据
        page:1
    }).trigger("reloadGrid"); //重新载入
}

/*******************************重置***********************************/
function resetFun(){
    location.reload();
}
/*******************************短信账户表格***********************************/
function loadmodal() {
    $.jgrid.defaults.width = 1280;
    $.jgrid.defaults.responsive = true;
    $.jgrid.defaults.styleUI = 'Bootstrap';
    var colNames = ['发生日期','业务类型','充值条数','消费条数','结余条数'];
    var JqGridColModel=[
        {name:'createTimeStr',index:'createTimeStr',align:'center',sortable:false},
        {name:'businessTypeName',index:'businessTypeName',align:'center',sortable:false},
        {name:'rechargeNum',index:'name',align:'center',sortable:false},
        {name:'consumerNumber',index:'consumerNumber',align:'center',sortable:false},
        {name:'jyNum',index:'jyNum',align:'center',sortable:false},
    ];
    loadtable();
    //加载表格
    function loadtable(){
        $('#jqGrid_blocMessage').jqGrid({
            url:'/manager/sms/center/send/record/sendStatements',
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
            pager:'#jqGridPager',
            viewrecords: true,
            multiselect:true,
            rownumbers: true,	//显示行号
            userDataOnFooter: true,
            footerrow: true, //显示底部菜单
            width: "100%" ,
            postData:getParam(),
            height: $(window).height()*0.65,
            autowidth:true,
            rownumWidth: 35, // the width of the row numbers columns
            shrinkToFit:true,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
            ondblClickRow:function(id){
                //双击进入编辑
                var delid = id;

            },
            onCellSelect: function (rowid, iCol, contents, event) {
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
            	console.log(data);
                $('.footrow td:first-child').html('合计');
                var rowNum = parseInt($('#jqGrid_blocMessage').getGridParam('records'), 10);
                if (rowNum > 0) {
                    $(".ui-jqgrid-sdiv").show();
                    var footerData = data.data.totalRecharge;
                    $(this).footerData("set", footerData, false);
                }
                else {
                    $(".ui-jqgrid-sdiv").hide();
                }
            },
            loadError:function(xhr,status,error){
            }
        })

    }
}
