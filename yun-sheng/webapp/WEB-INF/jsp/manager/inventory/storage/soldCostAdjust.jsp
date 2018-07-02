<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<jsp:include page="../../inventoryInclude/head.jsp"/>
<link rel="stylesheet" type="text/css" href="${basePath}/js/jquery-easyui/themes/bootstrap/easyui.css?v=${version}">
<script type="text/javascript" src="${basePath}/js/jquery-easyui/jquery.easyui.min.js?v=${version}"></script>
<script src="${basePath}/js/inventory/storage/soldCostAdjust.js?v=${version}"></script>
<title>已售成本调整单</title>
<style type="text/css">
    #imeiDr-modal .row{
        padding-bottom: 0;
    }
    /*模糊查询显示的div*/
    .none-cx{
        max-width: 170px;
        position: relative;
        z-index: 1;
        background: #F4F8FA;
        height: auto;
        border: 1px solid #dfdfdf;
    }
    .none-cx>ul>li{
        padding-left: 10px;
        line-height: 30px;
        height: 30px;
    }
    .none-cx>ul{
        margin-bottom:0;
    }
    .none-cx>ul>li:hover{
        background: #65c294;
        cursor: pointer;
    }
</style>
</head>
<body class='e-body-bg'>
<!-------------------------------------主页面开始----------------------------------------->
<div  id="AUTH"  class="none" data-code="CBTZD"></div>
<div class="btn-toolbar " id="MenuTool" role="toolbar" data-code="CBTZD"></div>
<div class="collapse in" id="collapseExample">
    <div class="well clearfix">
        <form id="billsHeaderForm" novalidate="novalidate" class="form-inline">
            <%--单据id--%>
            <input type="hidden" name="orderId"/>
            <%--稽核状态--%>
            <input type="hidden" name="auditStatus"/>
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
                    <input type="text" class="form-control" name="billsDateStr" id="billsBeginDateStr"
                           data-bv-field="billsDateStr">
                </div>
            </div>

            <div class="form-group col-sm-3">
                <input type="hidden" name="sectionId"/>
                <label class="width-25"><i class="bitianX">*</i>部门名称:</label>
                <div class="input-group col-sm-8">
                    <input type="text" class="form-control" name="sectionName" id="sectionName"
                           data-bv-field="sectionName">
                </div>
            </div>

            <div class="form-group col-sm-3">
                <input type="hidden" name="managerId"/>
                <label class="width-25"><i class="bitianX">*</i>经手人:</label>
                <div class="input-group col-sm-8">
                    <input type="text" class="form-control" name="managerName" id="managerName" placeholder="部门名称先选"
                           readonly="readonly" data-bv-field="managerName">
                </div>
            </div>

            <div class="form-group col-sm-3">

                <label class="width-25"><i class="bitianX">*</i>调整原因:</label>
                <div class="input-group col-sm-8">
                    <select class="form-control" id="reasonId">

                    </select>
                </div>
            </div>
            <div class="form-group col-sm-3">
                <label class="width-25"><i class="bitianX">*</i>调整成本种类:</label>
                <div class="input-group col-sm-8">
                    <select class="form-control" id="adjustmentType">
                        <option value="2">公司成本</option>
                        <option value="3">部门考核价</option>
                        <option value="4">公司成本+部门考核价</option>
                    </select>
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
    <div class="none">
        <input type="hidden" id="dataGridGood" data-desc="商品名称模态框">
    </div>
    <div class="clearfix form-inline importWrap" style="height: 40px;">
        <div class="col-sm-3" >
            <span class="box_text2">出库串号：</span>
            <span class="box_input input-group">
	        <input id="otherOutstroNumIdStr" name="otherOutstroNumIdStr" class="form-control"  type="text" placeholder="串号录入,可右匹配"/>
	          <div class="none-cx" style="display: none;position: absolute;top:34px;width: 100%;">
						<ul id="imeiUl" style="max-height: 300px;"></ul>
              </div>
            </span>
        </div>
        <div class="col-sm-3">
            <button type="button" class="erp-btn-bg imeiImport">串号导入</button>
        </div>

        <div class="col-sm-6 tr" style="color: #9D9D9D;" id="dataGridDesc">

        </div>
    </div>
    <div class="grid-wrap" style="margin-top:10px">
        <table id="dataGrid" class="zxsaastable">
        </table>
    </div>
</div>
<!-------------------------------------表格结束----------------------------------------->

<!-------------------------------------主页面结束----------------------------------------->
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
                        <input type="text" name="redByName" class="form-control " readonly="readonly"/>
                    </div>
                </div>
                <div class="form-group col-sm-1">
                    <div class="billslog  none" id="billslog">单据日志</div>
                </div>
            </div>
        </div>
    </form>
</div>
<!-------------------------------------模态框开始----------------------------------------->
<!-- 红冲Modal -->
<div class="modal fade" id="redModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title" id="myModalLabel">红冲</h4>
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

<!-- 移动加权平均价-串号（数量）Modal -->
<div class="modal fade" id="valuationMethodsModal" role="dialog" >
    <div class="modal-dialog" role="document" style="width: 1100px;">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title" id="valuationMethodsLabel"></h4>
            </div>
            <div class="modal-body">
                <div class="form-inline">
                    <button type="button" class="erp-btn-lab valuationMethodsDel">删除</button>
                    <div class="form-group " style="margin-left: 20px;">
                        快速定位串号：
                    </div>
                    <div class="form-group ">
                        <input type="text" class="form-control valuationMethodsSearch" placeholder="扫码或输入串号回车">
                    </div>
                </div>
                <div class="grid-wrap" style="margin-top:10px">
                    <table id="valuationMethodsGrid" class="zxsaastable">
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="erp-btn-bg  valuationMethodsSave">确定</button>
                <button type="button" class="erp-btn-lab" data-dismiss="modal">取消</button>
            </div>
        </div>
    </div>
</div>
<!-------------------------------------模态框结束----------------------------------------->
<jsp:include page="../../inventoryInclude/foot.jsp"/>