$(function() {
    initEvent()

    //初始化事件
    function initEvent() {
        loadmodal()
        loadDataTreeDom();
        funNodeOpt()
    }
})

function getParam() {
    var param = new Object();
    param.touchType = $("#touchTypes").val();
    param.queryKey=$.trim($("#queryText").val());
    return param
}
/*******************************条件查询***********************************/
function querySms(){
        $("#jqGrid_blocMessage").jqGrid('setGridParam',{
            url:'/manager/sms/center/sign/getSignList',
            postData:getParam(), //发送数据
            page:1
        }).trigger("reloadGrid"); //重新载入
}

function funNodeOpt() {
    $.ajax({
        type: "post",
        url: "/manager/system/sms/getGroupSignatures",
        dataType: "json",
        success: function(data) {
            if (data.result == 1) {
                var d = data.data.signList;
                for (var i = 0; i < d.length; i++) {
                    var id = d[i].id;
                    var name = d[i].name;
                    var opt = "<option value='" + id + "'>" + name + "</option>";
                    $("#touchTypes").append(opt);
                }
            }
        },
        error: function() {
            alert("系统异常，请稍后再试！")
        }
    });

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
    var colNames = ['部门编码','部门名称','短信签名(可编辑)','短信签名ID','备注（可编辑）','集团ID','部门ID','默认签名','签名的ID'];
    var JqGridColModel=[
        {name:'code',index:'code',align:'center',sortable:false},
        {name:'sectionName',index:'sectionName',align:'center',sortable:false},
        {name:'name',index:'name',align:'center',sortable:false},
        {name:'id',index:'id',align:'center',sortable:false,hidden:true},
        {name:'remark',index:'remark',align:'center',sorttype:'string', editable:true, editoptions:{
            dataEvents:[
                {type:"blur",
                    fn:function(){
                     $("#jqGrid_blocMessage").saveCell(lastrow,lastcell);
                }
                }]
        }},
        {name:'groupId',index:'groupId',align:'center',sortable:false,hidden:true},
        {name:'sectionId',index:'sectionId',align:'center',sortable:false,hidden:true},
        {name:'defalutLogo',index:'defalutLogo',align:'center',sortable:false,hidden:true},
        {name:'parentId',index:'parentId',align:'center',sortable:false,hidden:true},
    ];
    loadtable();
    //加载表格
    function loadtable(){
        $('#jqGrid_blocMessage').jqGrid({
            url:'/manager/sms/center/sign/getSignList',
            mtype:"POST",
            datatype: "json",
            jsonReader  : {
                root:"data.signCenterVo.sginList",
                page: "data.page",
                total: "data.total",
                records: "data.records",
                repeatitems: false
            },
            cellEdit:true,
            colNames:colNames,
            colModel:JqGridColModel,
            sortable:false,
            rownumbers: true,	//显示行号
            rowNum: 50,
            rowList: [50,100, 300],
            pager:'#jqGridPager',
            viewrecords: true,
            multiselect:true,
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
                if(iCol == 3){
                    $.ajax({
                        type: "post",
                        url: "/manager/system/sms/getGroupSignatures",
                        dataType: "json",
                        success: function(data) {
                            var nameList = '<select class="form-control dxName"><option value="">请选择</option>';
                            if (data.result == 1) {
                                var d = data.data.signList;
                                for (var i = 0; i < d.length; i++) {
                                    var id = d[i].id;
                                    var name = d[i].name;
                                    var opt = "<option value='" + id + "'>" + name + "</option>";
                                    nameList += opt
                                }
                                    $("#jqGrid_blocMessage").setCell(rowid,'name', nameList+'</select>')
                                $('.dxName').on('change',function(){
                                    $("#jqGrid_blocMessage").setCell(rowid,'name',$(this).find("option:selected").text())
                                    $("#jqGrid_blocMessage").setCell(rowid,'parentId',$(this).val())
                                })
                            }
                        },
                        error: function() {
                            alert("系统异常，请稍后再试！")
                        }
                    });
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

//加载 左边树
var accounTypeCode='';
var curr_class_node =null;
var curr_class_code=''
function loadDataTreeDom(){
    var obj={
        success:function(data){
            var nodes = data.data.sectionVoList||[];
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
                            accounTypeCode=$.trim(treeNode.id);
                            curr_class_node = treeNode;
                            curr_class_code=treeNode.code;
                            AquerySerReward({
                                classifyId:accounTypeCode
                            });
                        }
                    }
                },nodes);
            treeObj.expandAll(true);
        }
    }
    InterfaceInventory.signature.getSectionTreeNodeVoList(obj);
}

function AquerySerReward(obj){
    $("#jqGrid_blocMessage").jqGrid('setGridParam',{
        url:'/manager/sms/center/sign/getSignList',
        postData:obj, //发送数据
        page:1
    }).trigger("reloadGrid"); //重新载入
}

function sigSave(){
    var param={}
    param.deFaultSignId=$('touchTypes').val()||'';
    param.sginList=$("#jqGrid_blocMessage").jqGrid("getRowData");
    $.request({
        url: '/manager/sms/center/sign/saveTemplats',
        type: 'post',
        data:JSON.stringify(param), //将对象转换为JSON字符串
        dataType: 'json',
        success: function (data) {
            if (data.result == 1) {

            } else {
                $.zxsaas_plus.showalert("提示", data.desc);
            }

        }
    });
}