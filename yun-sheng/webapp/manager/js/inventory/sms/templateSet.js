$(function() {
    initEvent()

    //初始化事件
    function initEvent() {
        loadmodal()
        funNodeOpt()
    }
    $('.cf').show()
    $('.gn').show()
    $('#ifTouch2').change(function(){
        $('.cf').hide()
        $('.gn').hide()
    })
    $('#ifTouch1').change(function(){
        $('.cf').show()
        $('.gn').show()
        funNodeOpt()
    })

    /*******************************短信账户表格***********************************/
    function loadmodal() {
        $.jgrid.defaults.width = 1280;
        $.jgrid.defaults.responsive = true;
        $.jgrid.defaults.styleUI = 'Bootstrap';
        var colNames = ['模板id','模板编码','模板标题','模板内容','是否触发ID','是否触发','触发类型ID','触发类型','功能节点ID','功能节点','新增人id','新增人','新增时间','修改人ID','修改人','修改时间','是否禁用ID','是否禁用','备注'];
        var JqGridColModel=[
            {name:'id',index:'id',align:'center',sortable:false,hidden:true},
            {name:'tempateCode',index:'tempateCode',align:'left',sortable:false},
            {name:'tempateTitle',index:'tempateTitle',width:150,align:'left',sortable:false},
            {name:'tempateContent',index:'tempateContent',width:250,align:'left',sortable:false},
            {name:'ifTouch',index:'ifTouch',align:'center',hidden:true,sortable:false},
            {name:'ifTouchName',index:'ifTouchName',align:'center',sortable:false},
            {name:'touchType',index: 'touchType' ,sortable:false,hidden:true},
            {name:'touchTypeName',index: 'touchTypeName' ,align:'center',sortable:false},
            {name:'funNode',index: 'funNode' ,hidden:true,sortable:false},
            {name:'funNodeName',index: 'funNodeName',align:'center',sortable:false,},
            {name:'createUid',index:'createUid', align:'center',hidden:true,sortable:false},
            {name:'createName',index:'createName', align:'center',sortable:false},
            {name:'createTimeStr',index:'createTimeStr',width:200, align:'center',sortable:false},
            {name:'updateUid',index:'updateUid', align:'center',hidden:true,sortable:false},
            {name:'updateName',index:'updateName', align:'center',sortable:false},
            {name:'updateTimeStr',index:'updateTimeStr',width:200, align:'center',sortable:false},
            {name:'status',index:'status', align:'center',sortable:false,hidden:true},
            {name:'statusName',index:'statusName', align:'center',sortable:false,},
            {name:'remark',index:'remark', align:'center',sortable:false},
        ];
        loadtable();
        //加载表格
        function loadtable(){
            $('#jqGrid_blocMessage').jqGrid({
                url:'/manager/system/sms/template/getTempalteList',
                mtype:"POST",
                datatype: "json",
                jsonReader  : {
                    root:"data.dataList",
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
                rownumbers: true,	//显示行号
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
        function formatIfTouch(cellvalue, options, rowObject){
            return cellvalue == 1?"是":"否";
        }
        function formatStatus(cellvalue, options, rowObject){
            return cellvalue == 1?"启用":"禁用";
        }
    }

    /*******************************功能节点***********************************/
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

    }
})
/************************新增、修改弹窗********************************/
var frCode=''
function modalUpdate(num){
    $('#tempateCode').next().html('');
    $('#tempateTitle').next().html('');
    $('#tempateContent').next().html('');
    $('#touchType').next().html('');
    $('#funNode').next().html('');
    loadDataTreeDom()
    $('#tempateContent').on('change', function(){
        frCode=$(this).val()
    })
   if(num == 2){
        //修改
        $('#myModalLabel').html('修改');
        //判断选中
        var ids = $("#jqGrid_blocMessage").jqGrid('getGridParam','selarrrow');//选中的行id
        var len = ids.length;
        if(len == 0){
            $.zxsaas_plus.showalert("错误","请勾选一行数据!");
            return false;
        }else if(len != 1){
            $.zxsaas_plus.showalert("错误","一次只能修改一条信息!");
            return false;
        }else if(len == 1){
            var gridData = $("#jqGrid_blocMessage").jqGrid("getRowData",ids);//获取被选中的一行数据
            //赋值表头
            var params = $('#saveOrUpdateForm').formToArray();
            $(params).each(function(index,element){
                var key = element.name;
                var value = eval("gridData."+key);
                $('#'+key).val(value);
            });
            $('#tempateContent').val(gridData.tempateContent);
            $('#touchType').val(gridData.touchType);
            $('#funNode').val(gridData.funNode);
            if(gridData.ifTouch==1){
                $("#ifTouch").attr("checked",true);
            }else {
                $("#ifTouch").attr("checked",false);
            }

            $('#saveOrUpdateModal').modal('show');
        }
    }
}

/*****************************保存,确定**********************************/
function saveAndClose(){
    var  code = $('#tempateCode').val(),
        pa = $('#tempateTitle').val(),
        nu = $('#tempateContent').val(),
        ac = $('#touchType').val(),
        fu = $('#funNode').val();
    if(code == ''){
        $('#tempateCode').next().html('必填!');
        return;
    }
    if(pa == ''){
        $('#tempateTitle').next().html('必填!');
        return;
    }
    if(nu == ''){
        $('#tempateContent').next().html('必填!');
        return;
    }
    if(ac == ''){
        $('#touchType').next().html('必填!');
        return;
    }
    if(fu == ''){
        $('#funNode').next().html('必填!');
        return;
    }
    //调用存储方法
    var param = $('#saveOrUpdateForm').toJsonObject();
    param.tempateContent=$('#tempateContent').val();
    param.touchType=$('#touchType').val();
    param.funNode=$('#funNode').val();
    param.ifTouch=$("#ifTouch").is(':checked')==true?1:0;
    $.MsgBox('提示', '确定要修改此单据!', function () {
        $.request({
            url: '/manager/sms/center/template/updateTemplats',
            type : 'post',
            data:param,//将对象转换为JSON字符串
            dataType : 'json',
            success: function (data) {
                if (data.result == 1) {
                    $.zxsaas_plus.showalert("success", "修改成功");
                    querySms();
                    $('#saveOrUpdateModal').modal('hide');
                }else{
                    $.zxsaas_plus.showalert("提示", data.desc);
                }

            }
        });
    }, function () {
    });
}

function getParam() {
    var param = new Object();
    param.touchType = $('#touchTypes').val();
    param.queryKey=$.trim($("#queryText").val());
    return param
}
/*******************************条件查询***********************************/
function querySms(){
    $("#jqGrid_blocMessage").jqGrid('setGridParam',{
        url:'/manager/system/sms/template/getTempalteList',
        postData:getParam(), //发送数据
        page:1
    }).trigger("reloadGrid"); //重新载入
}
/*******************************显示禁用***********************************/
$('#selStatus').change(function(){
    querySms()
});
/*******************************重置***********************************/
function resetFun(){
    location.reload();
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
                                $.zxsaas_plus.showalert('提示', "此项不能为选!");
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