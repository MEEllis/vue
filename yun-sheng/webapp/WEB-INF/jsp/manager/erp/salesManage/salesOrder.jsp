<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <meta name="renderer" content="webkit"/>
    <meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE ; chrome=1"/>
    <link rel="stylesheet" href="${basePath}/css/bootstrap.css?v=${version}"/>
    <link rel="stylesheet" href="${basePath}/css/bootstrapValidator.css?v=${version}"/><!-- 验证 -->
    <link rel="stylesheet" href="${basePath}/css/cw/zTreeStyle/zTreeStyle_.css?v=${version}"/><!-- 树 -->
    <link rel="stylesheet" href="${basePath}/css/jquery-ui.css?v=${version}"/><!-- 表格 -->
    <link rel="stylesheet" href="${basePath}/css/ui.jqgrid-bootstrap.css?v=${version}"/><!-- 表格 -->
    <link rel="stylesheet" href="${basePath}/css/jquery.datetimepicker.css?v=${version}"/><!-- 日期 -->
    <link rel="stylesheet" href="${basePath}/css/base.css?v=${version}"/>
    <link rel="stylesheet" href="${basePath}/css/iconfont/iconfont.css?v=${version}"/>
    <link rel="stylesheet" href="${basePath}/css/bootstrap-datetimepicker.css?v=${version}"/>
    <%--新版公共样式表--%>
    <link rel="stylesheet" href="${basePath}/css/inventory/common.css?v=${version}"/>
    <title>销售订单</title>
    <script type="text/javascript">
        var billsCode = "${billsCode}";
    </script>
</head>

<body class="e-body-bg pageBill">
<!-------------------------------------主页面开始----------------------------------------->
<div >
    <div class="btn-toolbar" id="MenuTool" role="toolbar" data-code="XSDD"></div>
    <div id="AUTH" data-code="XSDD" class="none btn-group btnHundred" role="group">
        <button type="button" class="btn btn-default" onclick="firstPage()">首单</button>
        <button type="button" class="btn btn-default" onclick="backPage()">上一单</button>
        <button type="button" class="btn btn-default" onclick="nextPage()">下一单</button>
        <button type="button" class="btn btn-default" onclick="lastPage()">末单</button>
        <button type="button" class="btn btn-default" onclick="addBills()">新增</button>
        <button type="button" class="btn btn-default" onclick="saveBtnClick()">保存</button>
        <button type="button" class="btn btn-default delete" onclick="delBtClick()">删除</button>
        <button type="button" class="btn btn-default post" onclick="verfiy()">审核</button>
        <button type="button" class="btn btn-default invalid" id="2" onclick="invalidBtnClick(this.id)">强制完成</button>
        <button type="button" class="btn btn-default" onclick="print()">打印</button>
        <button type="button" class="btn btn-default" onclick="refreshBtClick()">刷新</button>
        <button type="button" class="btn btn-default" onclick="filterBtnClick();">过滤</button>
        <button type="button" class="btn btn-default copy" onclick="copyBtnClick();">复制</button>
        <div class="slideThree none">
            <input type="checkbox" value="0" id="slideThree" name="check"/>
            <label for="slideThree"></label>
        </div>
        <button type="button" class="btn btn-default btn-yindao-btn" style="float:right;"
                onclick="window.parent.openWorkBoxByMenutext('销售订单单据列表',  '/manager/inventory/sales/historyMain?billsType=18', true)">
            历史单据
        </button>

    </div>
    <div class="pageBillForm gridTop">
        <form id="billsHeaderForm" class="clearfix form-inline">
            <div class=" clearfix">
                <input type='hidden' name='' class='orderId'/>
                <input type='hidden' name='' class='orderSectionId'/>
                <input type='hidden' name='' class='unitIdOly'/>
                <input type='hidden' name='' class='goodsIdOly'/>
                <input type="hidden" name="billsStatus">
                <input type="hidden" name="auditStatus">

                <div id="billsCodeWrap" class="col-sm-3">
                    <label class="width-25">单据编号:</label>
                    <div class="input-group col-sm-8">
                        <input type="hidden" name="id"/>
                        <input type="text" class="form-control" name="billsCode" id="billsCode" readonly="readonly"/>
                    </div>
                </div>

                <div class="form-group col-sm-3">
                    <label class="width-25"><i class="bitianX">*</i>部门名称:</label>
                    <div class="input-group col-sm-8">
                        <input type="text" class="form-control" name="sectionName" id="sectionName" readonly="readonly">
                        <input type="hidden" name="sectionId" id="sectionId">
                    </div>
                </div>
                <div class="form-group col-sm-3">
                    <label class="width-25"><i class="bitianX">*</i>往来单位:</label>
                    <div class="input-group col-sm-8">
                        <input type="text" class="form-control" name="contactUnitName" id="contactUnitName"
                               readonly="readonly">
                        <input type="hidden" name="contactsunitId" id="contactsunitId">
                    </div>
                </div>
                <div class="form-group col-sm-3">
                    <label class="width-25"><i class="bitianX">*</i>单据日期:</label>
                    <div class="input-group col-sm-8">
                        <input type="text" class="form-control" name="billsDate" id="billsDate"
                               placeholder="年-月-日" onchange="refreshValidatorField('billsDate','#billsHeaderForm');"/>
                    </div>
                </div>

                <div class="form-group col-sm-3">
                    <label class="width-25">应收余额:</label>
                    <div class="input-group col-sm-8">
                        <input type="text" class="form-control" name="yingshouAmount" id="yingshouAmount"
                               readonly="readonly"/>
                    </div>
                </div>

                <div class="form-group col-sm-3">
                    <label class="width-25">预收余额:</label>
                    <div class="input-group col-sm-8">
                        <input type="text" class="form-control" name="yushouAmount" id="yushouAmount"
                               readonly="readonly"/>
                    </div>
                </div>
                <div class="form-group col-sm-3">
                    <label class="width-25"><i class="bitianX">*</i>经手人:</label>
                    <div class="input-group col-sm-8">
                        <input type="text" class="form-control" name="managerUname" id="managerUname"
                               placeholder="部门名称先选" readonly="readonly">
                        <input type="hidden" name="managerUid" id="managerUid">
                    </div>
                </div>

                <div class="form-group col-sm-3">
                    <label class="width-25">单备注:</label>
                    <div class="input-group col-sm-8">
                        <input type="text" name="remark" id="remark" value="" class="form-control"/>
                    </div>
                </div>

                <div class="rightMap">
                    <img class="mr10">
                    <img>
                </div>

            </div>
        </form>
    </div>
    <div class="tablebox retailDetailTable">
        <div class="none">
            <input type="hidden" id="dataGridAllGood" data-desc="全部商品名称模态框">
        </div>
        <div class="grid-wrap" style="margin-top:10px">
            <table id="dataGrid" class="zxsaastable">
            </table>
            <div id="jqGridPager"></div>
        </div>
    </div>
    <!-------------------------------------底部开始----------------------------------------->
    <div class="pageBillBottom pt10 clearfix form-inline" id="collapseExample">
        <div class="form-group ">
            <label>预收款金额：</label>
            <input type="text"
                   class="form-control"
                   readonly
                   placeholder="选择"
                   id="prepaymentAmount"
                   value="0.00"/>
        </div>
    </div>
    <form class="pageBillBottom gridBottom" id="gridFooter">
        <div class="clearfix form-inline" style="min-width:initial">
            <div class="form-group">
                <label>公司名称：</label>
                <input type="text" name="companyName" disabled  class="form-control"/>
            </div>
            <div class="form-group">
                <label>制单人：</label>
                <input type="text" name="createByName" disabled  class="form-control"/>
            </div>

            <div class="form-group">
                <label>修改人：</label>
                <input type="text" name="lastupdateByName" disabled  class="form-control"/>
            </div>
            <div class="form-group">
                <label>审核人：</label>
                <input type="text" name="auditorName" disabled class="form-control"/>
            </div>
            <div class="form-group">
                <label>强制完成人：</label>
                <input type="text" name="forceFinishName" disabled class="form-control"/>
            </div>
        </div>
    </form>
</div>
<!-------------------------------------底部结束----------------------------------------->
</body>

<script src="../js/jquery-1.12.4.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
<script src="../js/bootstrap.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
<script src="../js/jquery.jqGrid.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
<script src="../js/jquery.datetimepicker.full.js?v=${version}" type="text/javascript" charset="utf-8"></script>
<script src="../js/grid.locale-cn.js?v=${version}" type="text/javascript" charset="utf-8"></script>
<script src="../js/commonjs/xr.js?v=${version}" type="text/javascript" charset="utf-8"></script>
<script src="../js/zxsaas_plus.js?v=${version}" type="text/javascript" charset="utf-8"></script>
<script src="../js/cw/jquery.ztree.all-3.5.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
<script src="../html/muti_select/MultiSelectDropList.js?v=${version}" type="text/javascript" charset="utf-8"></script>
<script src="../js/commonjs/xr.js?v=${version}" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript" charset="utf-8" src="../js/commonjs/eidit-grid-test.js?v=${version}"></script>
<script src="../js/cw/bootstrap/js/bootstrap-dialog.min.js?v=${version}"></script>
<script src="../js/component.js?v=${version}" type="text/javascript" charset="utf-8"></script>
<script src="../js/erp/sales/sales-order.js?v=${version}" type="text/javascript" charset="utf-8"></script>
<script src="../js/erp/sales/common.js?v=${version}" type="text/javascript" charset="utf-8"></script>
<script src="../js/erp/sales/post-invalid.js?v=${version}" type="text/javascript" charset="utf-8"></script>
<script src="../js/erp/sales/print.js?v=${version}" type="text/javascript" charset="utf-8"></script>
<script src="../js/erp/sales/validator.js?v=${version}" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript" src="${basePath}/js/base.js?v=${version}"></script>
<!-- 验证 -->
<script src="${basePath}/js/bootstrapValidator.js?v=${version}" type="text/javascript" charset="utf-8"></script>
<script src="../js/cw/bootstrap/js/validator-company.js?v=${version}" type="text/javascript" charset="utf-8"></script>
<!-- 打印 -->

<script type="text/javascript" charset="utf-8" src="../js/jquery-migrate-1.2.1.min.js?v=${version}"></script>
<script type="text/javascript" charset="utf-8" src="../js/jquery.jqprint-0.3.js?v=${version}"></script>
<!-- 菜单权限验证 -->
<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
<script>
    $(function () {
        billsHeaderForm('#billsHeaderForm');
    })
</script>
</html>

<!-------------------------------------模态框开始----------------------------------------->
<!--付款方式选择选择弹出窗-->
<div class="modal fade" id="paymentWay" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog model-dialog2">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">付款方式</h4>
            </div>
            <div class="modal-body">
                <div class="container" style="width:100%">
                    <div class="details" style="width:100%">
                        <table class="zxsaastable" id='paymentWayModalGrid'></table>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-info" data-dismiss="modal" onblur="savePaymentWay()">保存</button>
                <button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
            </div>
        </div>
    </div>
    <!-- /.modal -->
</div>

<!-- 审核明细 -->
<div class="modal fade" id="checkDetailModal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" style="width:80%;">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"> &times;</button>
                <h4 class="modal-title">审核明细编辑</h4>
            </div>
            <div class="modal-body">
                <!-- /S 表体 -->
                <div class="jqGrid_wrapper">
                    <table id="checkDetailGrid"></table>
                </div><!-- /E 表体 -->
            </div>
            <!-- 模态框底部部分 -->
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" onclick="saveCheckDetail()">审核通过</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">审核不通过</button>
            </div>
        </div>
    </div>
</div>
<!-------------------------------------模态框结束----------------------------------------->

