<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<jsp:include page="../../inventoryInclude/head.jsp"/>
<script src="${basePath}/js/inventory/fund/incomeBill.js?v=${version}"></script>
<title>收入单</title>
<style type="text/css">
    #imeiDr-modal .row {
        padding-bottom: 0;
    }
    .ui-jqgrid .ui-jqgrid-btable tbody tr.addRow td, .ui-jqgrid .ui-jqgrid-btable tbody tr.jqgrow td {
        overflow: hidden;
        white-space: unset;
        padding-right: 2px;
        line-height: 20px;
        padding: 5px;
    }
    .ui-jqgrid .ui-jqgrid-btable tbody tr.jqgfirstrow td{
        padding:0;
    }
    .btn-toolbar{
        margin-left: 0;
        margin-bottom: 5px;
    }
</style>
</head>
<body class='e-body-bg'>
<!-------------------------------------主页面开始----------------------------------------->
<div id="AUTH" class="none" data-code="SRD"></div>
<div class="btn-toolbar " id="MenuTool" role="toolbar" data-code="SRD"></div>
<div >
    <div style="padding: 19px;">
        <form id="billsHeaderForm"  class="form-inline clearfix">
            <%--单据id--%>
            <input type="hidden" name="id"/>
            <%--稽核状态--%>
            <input type="hidden" name="isAudit"/>
            <%--单据状态--%>
            <input type="hidden" name="billsStatus" value="1"/>

            <div id="billsCodeWrap" class="col-sm-3 none">
                <label class="width-25">单据编号:</label>
                <div class="input-group col-sm-8">
                    <input type="text" class="form-control" name="billsCode" id="billsCode" readonly="readonly"
                           style="padding:0"/>
                </div>
            </div>

            <div class="form-group col-sm-3">
                <label class="width-25"><i class="bitianX">*</i>单据日期:</label>
                <div class="input-group col-sm-8">
                    <input type="text" class="form-control" name="billsDateString" id="billsBeginDateStr"
                           data-bv-field="billsDate">
                </div>
            </div>

            <div class="form-group col-sm-3">
                <label class="width-25"><i class="bitianX">*</i>往来单位:</label>
                <div class="input-group col-sm-8">
                    <input type="text" class="form-control" name="contactsunitName" id="contactsunitName">
                </div>
            </div>

            <div class="form-group col-sm-3" style="line-height: 34px;">
                <label class="width-25"><i class="bitianX">*</i>结算方式:</label>
                <label class="mr15">
                    <input type="radio" name="settlementMode" checked class="settlementModeCash" value="1" style="float: left;margin:5px;"> 现金结算
                </label>
                <label class="">
                    <input type="radio"name="settlementMode" class="settlementModeDebt " value="0" style="float: left;"> 欠款
                </label>
            </div>

            <div class="form-group col-sm-3">
                <label class="width-25"><i class="bitianX">*</i>收款部门:</label>
                <div class="input-group col-sm-8">
                    <input type="text" class="form-control" name="sectionName" id="sectionName">
                </div>
            </div>

            <div class="form-group col-sm-3">
                <label class="width-25"><i class="bitianX">*</i>收款人:</label>
                <div class="input-group col-sm-8">
                    <input type="text" class="form-control" name="managersName" id="managerName" >
                    <span class="input-group-btn showModalBtn" ><button class="btn btn-default"
                                                                        type="button"><span
                            class="glyphicon glyphicon-option-horizontal"></span></button></span>
                </div>
            </div>
            <div class="form-group col-sm-3">
                <label class="width-25">收款金额:</label>
                <div class="input-group col-sm-8">
                    <input type="text" name="payAmountSum" id="payAmountSum" value="" class="form-control"
                           readonly="readonly"/>
                    <span class="input-group-btn showMoneyModalBtn" data-toggle="modal" data-target="#inpayMoneyModal" ><button class="btn btn-default"
                                                                                       type="button"><span
                            class="glyphicon glyphicon-option-horizontal"></span></button></span>
                </div>
            </div>

            <div class="form-group col-sm-3">
                <label class="width-25">备注:</label>
                <div class="input-group col-sm-8">
                    <input type="text" name="remark" id="remark" value="" class="form-control"/>
                </div>
            </div>



            <div class="rightMap" style="top: 2px;right: 250px;display: flex;">
                <img class="mr10" src=""/>
                <img src=""/>
            </div>

        </form>
    </div>
</div>

<!-------------------------------------表格开始----------------------------------------->
<div class="tablebox retailDetailTable">
    <div class="clearfix form-inline" style="height: 40px;">

        <div class="col-sm-3">
            <button type="button" class="erp-btn-bg quickAllot">快捷分配</button>
        </div>
    </div>
    <div class="grid-wrap" style="margin-top:10px">
        <div class="none">
            <input type="hidden" id="dataGridInpayType" data-desc="收入类别模态框" readonly="">
        </div>
        <table id="dataGrid" class="zxsaastable">

        </table>
    </div>
</div>
<!-------------------------------------表格结束----------------------------------------->
<!-------------------------------------底部开始----------------------------------------->
<div class="collapse in">
    <form id="bottomForm">
        <div class="inputbox container-fluid clearfix form-inline">
            <div class="row">
                <div class="form-group col-sm-2">
                    <label class="width-25">制单人 ：</label>
                    <div class="input-group col-sm-8">
                        <input type="text" name="createByName" class="form-control " readonly="readonly"/>
                    </div>
                </div>
                <div class="form-group col-sm-2">
                    <label class="width-25">过账人 ：</label>
                    <div class="input-group col-sm-8">
                        <input type="text" name="postByName" class="form-control " readonly="readonly"/>
                    </div>
                </div>
                <div class="form-group col-sm-2">
                    <label class="width-25">修改人 ：</label>
                    <div class="input-group col-sm-8">
                        <input type="text" name="updateByName" class="form-control " readonly="readonly"/>
                    </div>
                </div>
                <div class="form-group col-sm-2">
                    <label class="width-25">红冲人 ：</label>
                    <div class="input-group col-sm-8">
                        <input type="text" name="invalidByName" class="form-control " readonly="readonly"/>
                    </div>
                </div>
                <div class="form-group col-sm-2">
                    <label class="width-25">稽核人 ：</label>
                    <div class="input-group col-sm-8">
                        <input type="text" name="auditName" class="form-control " readonly="readonly"/>
                    </div>
                </div>

            </div>
        </div>
    </form>
</div>

<!-------------------------------------主页面结束----------------------------------------->

<!-------------------------------------模态框开始----------------------------------------->
<!-- 快捷分配Modal -->
<div class="modal fade" id="quickAllotModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document" style="width: 1100px;">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title" id="myModalLabel">快捷分配</h4>
            </div>
            <div class="modal-body">
                <div class="form-group" style="position: relative;top: -10000px;margin-top: -60px">
                    <label class="width-25">商品名称:</label>
                    <div class="input-group col-sm-8">
                        <input type="text" name="addSection" id="addSection" value="" class="form-control"/>
                    </div>
                </div>
                <div class="form-inline clearfix">
                    <div class="row">
                    <div class="form-group col-sm-4">
                        <input type="hidden" name="inpayTypeId" />
                        <label class="width-25">类别名称:</label>
                        <div class="input-group col-sm-8">
                            <input type="text" name="inpayType" id="inpayType" value="" class="form-control"/>
                            <%--<select type="text" class="form-control" name="inpayType" id="inpayType"  readonly="readonly" ></select>--%>
                        </div>
                    </div>
                    <span style="height: 34px;line-height: 34px;color: #00A4FC;" class="addSectionBtn">添加部门</span>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label class="width-25">待分配金额:</label>
                            <div class="input-group col-sm-8">
                                <input type="text" class="form-control" name="waitAllotMoney" id="waitAllotMoney" onkeyup="checkInput.checkNum(this,12)">
                            </div>
                        </div>
                        <div class="form-group col-sm-4">

                            <label class="input-group">
                                <input type="radio" checked  name="wrongState" value="0">
                                平均分配
                            </label>

                            <label class="input-group">
                                <input type="radio"  name="wrongState" value="1">
                                输入比例分配
                            </label>
                            <label class="input-group">
                                <button class="btn btn-primary allotBtn">分配</button>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="grid-wrap" style="margin-top:10px">
                    <table id="allotGrid" class="zxsaastable">
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary allotSave">确定</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            </div>
        </div>
    </div>
</div>

<!-- 收入金额Modal -->
<div class="modal fade" id="inpayMoneyModal" role="dialog">
    <div class="modal-dialog" role="document" style="width: 900px;">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title">收款方式</h4>
            </div>
            <div class="modal-body" style="width: 900px;">
                <table id="paymentGrid" class="zxsaastable"></table>
            </div>
            <div class="modal-footer">
                <button type="button" class="erp-btn-bg inpayMoneySave">确定</button>
                <button type="button" class="erp-btn-lab" data-dismiss="modal">取消</button>
            </div>
        </div>
    </div>
</div>

<!-- 红冲Modal -->
<div class="modal fade" id="redModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabela">红冲</h4>
            </div>
            <div class="modal-body">
                <div class="col-sm-3">
                    时间：
                </div>
                <div class="input-group col-sm-8">
                    <input type="text" class="form-control redTime">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary redSave">确定</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            </div>
        </div>
    </div>
</div>
<!-------------------------------------模态框结束----------------------------------------->
<jsp:include page="../../inventoryInclude/foot.jsp"/>