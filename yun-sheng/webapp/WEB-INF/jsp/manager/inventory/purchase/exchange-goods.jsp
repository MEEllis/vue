<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<jsp:include page="../../inventoryInclude/head.jsp"/>
<script type="text/javascript">
    //**********全局变量
    //基本目录
    var basePath = "${basePath}";
    var billsCode = "${billsCode}";
    var billId = '${billId}'
</script>
<style type="text/css">
    #imeiDr-modal .modal-header {
        background-color: #4e78a1;
        padding: 10px;
        color: #fff;
    }

    .imeiImport {
        padding: 6px 25px;
        background: #fff;
        border: 1px solid #ccc;
    }

    .imeiImport:hover {
        border: 1px solid #0099FF;
    }

    #imeiDr-modal .row {
        padding-bottom: 0;
    }

    .ui-pager-control {
        height: 38px;
    }

    .showBox > button {
        height: 34px;
    }
</style>
<script type="text/javascript" src="${basePath}/js/inventory/purchase/exchange-goods.js?v=${version}"></script>
<title>采购换货</title>
</head>
<body class="e-body-bg pageBill">
<input type="hidden" name="" id="dataGridRowId">
<div class="slideThree none">
    <input type="checkbox" value="0" id="slideThree" name="check"/>
    <label for="slideThree"></label>
</div>
<div id="AUTH" class="none" data-code="CGHHD"></div>
<div class="btn-toolbar" id="MenuTool" role="toolbar" data-code="CGHHD"></div>
<div class="pageBillForm gridTop">
    <form class="clearfix form-inline" role="form" id="topForm">
        <div id="billsCodeWrap" class="col-sm-3">
            <label class="width-25">单据编号:</label>
            <div class="input-group col-sm-8">
                <input type="text" class="form-control" name="billsCode" readonly>
                <input type="hidden" name="id" >
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
                <input type="hidden" class=" sectionId" name="sectionId" style="display: none;">
                <input type="text" class="form-control" name="sectionName">
            </div>
        </div>
        <div class="form-group col-sm-3">
            <label class="width-25"><i class="bitianX">*</i>往来单位:</label>
            <div class="input-group col-sm-8">
                <input type="text" class="form-control" name="contactUnitName">
                <input type="hidden" name="contactUnitId" >
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

        <div class="rightMap" >
            <img class="mr10">
            <img>
        </div>
        </form>
</div>
<div class="row gridBody" style="padding-top: 5px;padding-bottom: 5px;">
    <div class="none">
        <input type="hidden" id="dataGridGood" data-desc="商品名称模态框">
        <input type="hidden" id="dataGridStorageName" data-desc="仓库名称模态框">
    </div>
    <div class="col-md-12">
        <div class="gridType" style="width: 50px;float: left;text-align: center;">
            <div>换</div>
            <div>入</div>
            <div>信</div>
            <div>息</div>
        </div>
        <!-- /S 表体 -->
        <div style="overflow: hidden;">
            <!-- /S 表体 -->
            <div class="jqGrid_wrapper">
                <table id="dataGrid"></table>
            </div><!-- /E 表体 -->
        </div>
    </div>
</div>
<div class="row gridBody" style="padding-top: 3px;padding-bottom: 5px;">
    <div class="none">
        <input type="hidden" id="dataGrid2Good" data-desc="商品名称模态框">
        <input type="hidden" id="dataGrid2StorageName" data-desc="仓库名称模态框">
    </div>
    <div class="col-md-12">
        <div class="gridType" style="width: 50px;float: left;text-align: center;">
            <div style="margin-top: 60px;">换</div>
            <div>出</div>
            <div>信</div>
            <div>息</div>
        </div>
        <div style="overflow: hidden;">
            <div class="row">
                <div class="col-md-12">
                    <div class="form-horizontal" role="form" style="margin-top: 5px;">
                        <div class="form-group col-sm-4">
                            <label class="col-sm-4 control-label" style="font-weight: normal;">出库串号:</label>
                            <div class="col-sm-8 wiRes">
                                <input type="text" class="form-control searchImei" value="">
                            </div>
                        </div>

                        <div class="form-group col-sm-3" style="margin-bottom: 0px;">
                            <button type="button" class="btn imeiImport">串号导入</button>
                        </div>

                    </div>
                </div>
                <div class="col-md-3" style="display: none;">
                    <button type="button" class="btn btn-default" onclick="">引入原单</button>
                </div>
            </div>
            <!-- /S 表体 -->
            <div class="row" style="margin-left: 0px;margin-right: 0px;">
                <div class="jqGrid_wrapper">
                    <table id="dataGrid2"></table>
                </div><!-- /E 表体 -->
            </div>
        </div>
    </div>
</div>
<form class="pageBillBottom pt10 clearfix form-inline" role="form"  id="middleForm">
    <div class="form-group ">
        <label id="payrecetiptDetailInputTitle">补差款：</label>
        <input type="text" class="form-control" id="payReceiveAmount"
               onclick="openPayrecetiptDetailModal()" readonly="readonly">
    </div>
    <div class="form-group " style="display: none;">
        <label>整单折扣：</label>
        <input type="text" class="form-control" name="discountAmount" value="0"
               onkeyup='checkInput.checkNum(this,12);'/>
    </div>
    <div class="form-group ">
        <label  id="yingFuShouLable">应付金额：</label>
        <input type="text" class="form-control" name="yingFuAmount"readonly="readonly" value="0.00">
    </div>
    <div class="form-group ">
        <label id="weiFuShouLable">未付金额：</label>
        <input type="text" class="form-control" name="weiFuAmount"readonly="readonly" value="0.00">
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
                <input type="hidden"  name="createById" >
                <input type="text" class="form-control" name="createByName" disabled="disabled">
            </div>
            <div class="form-group">
                <label>修改人：</label>
                <input type="hidden"  name="updateById">
                <input type="text" class="form-control" name="updateByName" disabled="disabled">
            </div>
            <div class="form-group">
                <label>过账人：</label>
                <input type="hidden"  name="postBy" >
                <input type="text" class="form-control" name="postByName" disabled="disabled">
            </div>
            <div class="form-group">
                <label>红冲人：</label>
                <input type="hidden" name="invalidBy" >
                <input type="text" class="form-control" name="redByName" disabled="disabled">
            </div>
            <div class="form-group">
                <label>稽核人：</label>
                <input type="text" class="form-control" name="auditByName" disabled="disabled">
            </div>
        </div>
    </form>
</div>

<!-- 引用在库串号录入 -->
<div class="modal fade" id="inputStorageImeiModal" tabindex="-1" role="dialog" aria-hidden="false">
    <div class="modal-dialog" style="width:80%;" id="inputStorageImeiModal_body">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"> &times;</button>
                <h4 class="modal-title">
                    引入在库串号
                </h4>
            </div>
            <div class="modal-body" style="margin-bottom: 20px;">
                <div class="form-horizontal" role="form">
                    <!-- /S 表单控件  -->
                    <div class="form-group">
                        <!-- 商品名称 -->
                        <label class="control-label"
                               style="text-align: left;font-size: 16px;position: relative;left: 30px;"><span
                                style="font-weight: normal;">商品信息：</span><span
                                id="goodsnameTitle2">dfd适当的anp</span></label>
                        <label class="control-label"
                               style="text-align: left;font-size:16px;position: relative;left: 150px;"><span
                                style="font-weight: normal;">仓库名称：</span><span
                                id="storagenameTitle2">dfd适当的anp</span></label>
                        <input type="text" class="form-control" name="" id="dataGridRowId2" style="display: none;">
                        <input type="text" class="form-control" name="" id="dataGridIRow2" style="display: none;">
                        <button type="button" class="btn btn-w btn-info pull-right" onclick="saveInputImei()"
                                style="display: block;margin-left: 5px;margin-right: 18px;">保存
                        </button>
                        <button type="button" class="btn btn-warning pull-right" data-dismiss="modal"
                                style="display: block;margin-right: 10px;">取消
                        </button>
                    </div>
                </div>
                <div style="height: 30px;line-height: 30px;padding-left: 10px;padding-right: 10px;">
                    <span class="pull-left">在库串号信息</span>
                </div>

                <div style="padding-left: 0px;padding-right: 0px;float: left;" id="inputStorageImeiModal_grid4">
                    <!-- /S 表体 -->
                    <div class="jqGrid_wrapper">
                        <table id="dataGrid4"></table>
                    </div><!-- /E 表体 -->
                </div>
                <div style="padding-left: 0px;padding-right: 0px;float: left;width: 60px;"
                     id="inputStorageImeiModal_tools">
                    <div class="glyphicon glyphicon-fast-forward" onclick="inAllBtClick()"
                         style="margin-left: 22px;margin-bottom: 20px;margin-top: 20px;cursor: pointer;"></div>
                    <div class="glyphicon glyphicon-chevron-right" onclick="inBtClick()"
                         style="margin-left: 22px;margin-bottom: 20px;margin-top: 20px;cursor: pointer;"></div>
                    <div class="glyphicon glyphicon-fast-backward" onclick="outAllBtClick()"
                         style="margin-left: 22px;margin-bottom: 20px;margin-top: 20px;cursor: pointer;"></div>
                    <div class="glyphicon glyphicon-chevron-left" onclick="outBtClick()"
                         style="margin-left: 22px;margin-bottom: 20px;margin-top: 20px;cursor: pointer;"></div>
                </div>
                <div style="padding-left: 0px;padding-right: 0px;float: left;" id="inputStorageImeiModal_grid5">
                    <span style="position: absolute;margin-left: 20px;margin-top: -26px;">已选择数：<span id="havedInputNum">0</span></span>
                    <!-- /S 表体 -->
                    <div class="jqGrid_wrapper">
                        <table id="dataGrid5"></table>
                    </div><!-- /E 表体 -->
                </div>
                <div style="padding-left: 0px;padding-right: 0px;float: left;min-height: 180px;width: 170px;margin-left: 13px;"
                     id="inputStorageImeiModal_info">
                    <textarea id="inputStorageImeiModal_info_text"
                              style="background-color: rgb(235, 235, 228);width: 170px;"></textarea>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- 收付款明细录入 -->
<div class="modal fade" id="payrecetiptDetailModal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" style="width:600px;min-height: 500px;">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"> &times;</button>
                <h4 class="modal-title" id="payrecetiptDetailModalTitle">
                    付款方式
                </h4>
            </div>
            <div class="modal-body">
                <!-- /S 表体 -->
                <div class="jqGrid_wrapper">
                    <table id="dataGrid6"></table>
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
<!-- 回车事件，数据大于2弹出框 -->
<div class="modal fade" id="keyData" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" style="width:600px;min-height: 500px;">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"> &times;</button>
                <h4 class="modal-title" id="payrecetiptDetailModalTitle">
                    出库串号选择
                </h4>
            </div>
            <div class="modal-body">
                <ul class="imeiKey" id="imeiUl">
                </ul>
            </div>
            <!-- 模态框底部部分 -->
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div>
    </div>
</div>

