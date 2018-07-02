$(function() {
    initEvent()

    //初始化事件
    function initEvent() {
        loadmodal()
        funNodeOpt(1)
    }
    $('#ifTouch2').change(function(){
        $('.cf').hide()
        $('.gn').hide()
    })
    $('#ifTouch1').change(function(){
        $('.cf').show()
        $('.gn').show()
    })
    $('#touchType1').change(function(){
        $("#funNode").find("option:selected").text("");
        $("#funNode").empty();
        funNodeOpt(1)
    })
    $('#touchType2').change(function(){
        $("#funNode").find("option:selected").text("");
        $("#funNode").empty();
        funNodeOpt(2)
    })
    $('#funNode').change(function(){
       if($('#funNode').val()==3){
           loadDataTreeDom('KHXX')
       }else{
           loadDataTreeDom('LSXX')
       }
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
    function funNodeOpt(type) {
        $.ajax({
            type: "post",
            url: "/manager/inventory/common/getAllFunNode",
            dataType: "json",
            data:{type:type},
            success: function(data) {
                if (data.result == 1) {
                    var d = data.data.dataList;
                    $("#funNode").append('<option value="" selected="selected">请选择</option>');
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

    /*******************************显示禁用***********************************/
    $('#selStatus').change(function(){
        querySms()
    });
})
/************************新增、修改弹窗********************************/
var frCode=''
function modalUpdate(num){
    $('#tempateCode').next().html('');
    $('#tempateTitle').next().html('');
    $('#tempateContent').next().html('');
    $('#funNode').next().html('');
    loadDataTreeDom()
    $('#tempateContent').on('change', function(){
        frCode=$(this).val()
    })

    //num  1.新增     2.修改
    if(num == 1){
        //清空表单
         $('#saveOrUpdateForm').clearForm(true);
        $("#ifTouch1").attr("checked","checked");
        $("#touchType1").attr("checked","checked");
        $('.cf').show()
        $('.gn').show()
        $('#saveOrUpdateModal').modal('show');
        $('#myModalLabel').html('新增模板');
    }else if(num == 2){
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
            $('#funNode').val(gridData.funNode);
            if(gridData.ifTouch==1){
                $("#ifTouch1").attr("checked",true);
            }else {
                $("#ifTouch2").attr("checked",true);
                $('.cf').hide()
                $('.gn').hide()
            }
            if(gridData.touchType==0){
                $("#touchType1").attr("checked",true);
            }else {
                $("#touchType2").attr("checked",true);
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
    if(fu == ''){
        $('#funNode').next().html('必填!');
        return;
    }
    //调用存储方法
    var param = $('#saveOrUpdateForm').toJsonObject();
    param.tempateContent=$('#tempateContent').val();
    param.ifTouch=$("#ifTouch1").is(':checked')==true?1:0;
    if($("#ifTouch1").is(':checked')){
        param.touchType=$('#touchType1').is(':checked')==true?0:1;
        param.funNode=$('#funNode').val();
    }
    $.MsgBox('提示', '确定是否保存模板？', function () {
        $.request({
            url:  '/manager/system/sms/template/saveTemplate',
            type : 'post',
            data:param,//将对象转换为JSON字符串
            dataType : 'json',
            success: function (data) {
                if (data.result == 1) {
                    $.zxsaas_plus.showalert("success", "操作成功");
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

/*******************************启用、禁用、删除**********************************/
function disOrEnAccount(num){
    //批量启用0、禁用1、删除2
    //修改对应标志
    var status;
    if(num == 0){ status = 1; }else if(num == 1){ status = 0; }else if(num == 2){ status = 2;}
    var ids = $("#jqGrid_blocMessage").jqGrid('getGridParam','selarrrow');//选中的行ids
    var len = ids.length;
    //至少选中一行
    if(len == 0){
        if(num == 0){
            $.zxsaas_plus.showalert("错误","请勾选数据，再点击启用！");
        }else if(num == 1){
            $.zxsaas_plus.showalert("错误","请勾选数据，再点击禁用！");
        }else if(num == 2){
            $.zxsaas_plus.showalert("错误","请勾选数据，再点击删除！");
        }
        return false;
    }else{
        ids=String(ids)
        //弹窗提醒
        if(num == 0){
            $.MsgBox("提示","是否确定启用选中数据?",function(){
                $.request({
                    url: '/manager/system/sms/template/checkDisable',
                    type : 'post',
                    data:{ids:ids,status:status},//将对象转换为JSON字符串
                    dataType : 'json',
                    success: function (data) {
                        if (data.result == 1) {
                           $.zxsaas_plus.showalert("success", "启用成功");
                            querySms();
                        }else{
                            $.zxsaas_plus.showalert("提示", data.desc);
                        }
                    }
                });
            },function(){

            });
        }else if(num == 1){
            $.MsgBox("提示","是否确定禁用选中数据?",function(){
                $.request({
                    url: '/manager/system/sms/template/checkDisable',
                    type : 'post',
                    data:{ids:ids,status:status},//将对象转换为JSON字符串
                    dataType : 'json',
                    success: function (data) {
                        if (data.result == 1) {
                            $.zxsaas_plus.showalert("success", "禁用成功");
                            querySms();
                        }else{
                            $.zxsaas_plus.showalert("提示", data.desc);
                        }
                    }
                });
            },function(){

            });
        }else if(num == 2){
            $.MsgBox("提示","是否确定删除选中数据?",function(){
                $.request({
                    url: '/manager/system/sms/template/del',
                    type : 'post',
                    data:{'ids':ids},//将对象转换为JSON字符串
                    dataType : 'json',
                    success: function (data) {
                        if (data.result == 1) {
                            $.zxsaas_plus.showalert("success", "删除成功");
                            querySms();
                        }else{
                            $.zxsaas_plus.showalert("提示", data.desc);
                        }
                    }
                });
            },function(){

            });
        }
    }
}
function getParam() {
    var param = new Object();
    param.touchType = $('#touchTypes').val();
    param.disableFlag = $("#selStatus").is(':checked')==true?1:0;
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
/*******************************重置***********************************/
function resetFun(){
    location.reload();
}

//加载 右边树
var curr_class_id='';
var curr_class_code=''
var curr_class_name=''
function loadDataTreeDom(fieldTypeCode){
    var fieldType=fieldTypeCode==undefined?'':fieldTypeCode
    var obj={
        data:{ fieldTypeCode:fieldType},
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