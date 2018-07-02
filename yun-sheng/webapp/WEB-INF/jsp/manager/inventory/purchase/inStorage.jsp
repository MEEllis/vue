<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<jsp:include page="../../inventoryInclude/head.jsp"/>
<script type="text/javascript">
    //**********全局变量
    var billsCode = "${billsCode}";
    var billId = "${billId}"
</script>
<script src="${basePath}/js/inventory/purchase/inStorage.js?v=${version}"></script>
<title>采购入库</title>
</head>
<body class="e-body-bg pageBill">
<input type="hidden" name="" id="dataGridRowId">
<div class="slideThree none">
    <input type="checkbox" value="0" id="slideThree" name="check"/>
    <label for="slideThree"></label>
</div>
<div id="AUTH" class="none" data-code="CGRKD"></div>
<div class="btn-toolbar" id="MenuTool" role="toolbar" data-code="CGRKD"></div>
<div class="pageBillForm gridTop">
    <form class="clearfix form-inline" role="form" id="topForm">
        <div id="billsCodeWrap" class="col-sm-3">
            <label class="width-25">单据编号:</label>
            <div class="input-group col-sm-8">
                <input type="text" class="form-control" name="billsCode" readonly>
                <input type="text" class="form-control" name="id" style="display: none;">
                <input type="hidden" name="billsStatus">
                <input type="hidden" name="auditStatus">
            </div>
        </div>

        <div class="form-group col-sm-3">
            <label class="width-25"><i class="bitianX">*</i>单据日期:</label>
            <div class="input-group col-sm-8">
                <input type="text" class="form-control" name="billsDateStr" readonly>
            </div>
        </div>
        <div class="form-group col-sm-3">
            <label class="width-25"><i class="bitianX">*</i>部门名称:</label>
            <div class="input-group col-sm-8">
                <input type="text" class="form-control" name="sectionId" value="" style="display: none;">
                <input type="text" class="form-control" name="sectionName">
            </div>
        </div>

        <div class="form-group col-sm-3">
            <label class="width-25"><i class="bitianX">*</i>往来单位:</label>
            <div class="input-group col-sm-8">
                <input type="text" class="form-control" name="contactUnitName">
                <input type="text" class="form-control" name="contactUnitId" style="display: none;">
            </div>
        </div>
        <div class="form-group col-sm-3">
            <label class="width-25">应付余额:</label>
            <div class="input-group col-sm-8">
                <input type="text" name="yingFu" id="yingFu" value="" class="form-control" readonly="readonly"/>
            </div>
        </div>

        <div class="form-group col-sm-3">
            <label class="width-25">预付余额:</label>
            <div class="input-group col-sm-8">
                <input type="text" name="yuFu" id="yuFu" value="" class="form-control" readonly="readonly"/>
            </div>
        </div>

        <div class="form-group col-sm-3">
            <label class="width-25"><i class="bitianX">*</i>经手人:</label>
            <div class="input-group col-sm-8">
                <input type="text" class="form-control" name="managerId" style="display: none;">
                <input type="text" class="form-control" name="managerName">
            </div>
        </div>
        <div class="form-group col-sm-3">
            <label class="width-25">备注:</label>
            <div class="input-group col-sm-8">
                <input type="text" class="form-control" name="remark">
            </div>
        </div>
        <div class="rightMap">
            <img class="mr10">
            <img>
        </div>

    </form><!-- /E 表头  -->
</div>
<div class="row gridBody unAllEdit">
    <div class="none">
        <input type="hidden" id="dataGridGood" data-desc="商品名称模态框">
        <input type="hidden" id="dataGridStorageName" data-desc="仓库名称模态框">
    </div>
    <div class="col-md-12">
        <!-- /S 表体 -->
        <div class="jqGrid_wrapper" style="margin-left:15px">
            <table id="dataGrid"></table>
        </div><!-- /E 表体 -->
    </div>
</div>

<form class="pageBillBottom pt10 clearfix form-inline" role="form" id="middleForm">
    <div class="form-group ">
        <label>付款金额：</label>
        <input type="text" class="form-control" id="payReceiveAmount" name="payReceiveAmount"
               onclick="openPayrecetiptDetailModal()" readonly="readonly">
    </div>
    <div class="form-group ">
        <label>整单折扣：</label>
        <input type="text" class="form-control discount discountAmount" name="discountAmount" value="0.00"
               onkeyup='checkInput.checkNum(this,12);'/>
    </div>
    <div class="form-group ">
        <label>应付金额：</label>
        <input type="text" class="form-control" name="yingFuAmount"readonly="readonly" value="0.00">
    </div>
    <div class="form-group ">
        <label>未付金额：</label>
        <input type="text" class="form-control echMoney" name="weiFuAmount" readonly="readonly" value="0.00">
    </div>
</form>

<div class="pageBillBottom gridBottom">
    <form role="form" id="bottomForm">
        <div class="clearfix form-inline">
            <div class="form-group">
                <label>公司名称：</label>
                <input type="hidden"  name="companyId" >
                <input type="text" class="form-control" name="companyName" disabled="disabled">
            </div>
            <div class="form-group">
                <label >制单人：</label>
                <input type="hidden"  name="updateById" >
                <input type="text" class="form-control" name="createByName" disabled="disabled">
            </div>
            <div class="form-group">
                <label>修改人：</label>
                <input type="hidden"  name="updateById">
                <input type="text" class="form-control" name="updateByName" disabled="disabled">
            </div>
            <div class="form-group">
                <label>过账人：</label>
                <input type="text" class="form-control" name="postByName" disabled="disabled">
            </div>
            <div class="form-group">
                <label>红冲人：</label>
                <input type="text" class="form-control" name="redByName" disabled="disabled">
            </div>
            <div class="form-group">
                <label>稽核人：</label>
                <input type="text" class="form-control" name="auditByName" disabled="disabled">
            </div>
        </div>
    </form>
</div>

<!-- 订单引用 -->
<div class="modal fade" id="orderReferenceModal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" style="width:90%;">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"> &times;</button>
                <h4 class="modal-title">
                    订单引用
                </h4>
            </div>
            <div class="modal-body" style="padding: 0px;">
                <iframe name="orderReferenceFrame" class="referenceFrame" frameborder="0"
                        style="width: 100%;height:100%;padding: 0px;margin: 0px;;" src=""></iframe>
            </div>
        </div>
    </div>
</div>
<!-- 预付款明细录入 -->
<div class="modal fade" id="payrecetiptDetailModal" tabindex="-1" role="dialog" aria-hidden="false">
    <div class="modal-dialog" style="width: 600px;">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"> &times;</button>
                <h4 class="modal-title">
                    付款方式
                </h4>
            </div>
            <div class="modal-body">
                <!-- /S 表体 -->
                <div class="jqGrid_wrapper">
                    <table id="dataGrid2"></table>
                </div><!-- /E 表体 -->
            </div>
            <!-- 模态框底部部分 -->
            <div class="modal-footer">
                <button type="button" class="btn btn-default" onclick="savePayreceiptAmout()">保存</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div>
    </div>
</div>
<jsp:include page="../../inventoryInclude/foot.jsp"/>


