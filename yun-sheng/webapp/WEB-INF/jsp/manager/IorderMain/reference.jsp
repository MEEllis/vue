<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>订单引入</title>

    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta http-equiv="description" content="This is my page">
    <jsp:include page="../Include/import.jsp"></jsp:include>
    <link rel="stylesheet" type="text/css" href="${basePath}/css/BillsImport/base.css"/>
    <style type="text/css">
        .form-group {
            margin-bottom: 0px;
        }

        .gridBody {
            padding: 15px;
            padding-top: 5px;
        }
        .editable{
            color: blue;
        }
    </style>
    <script type="text/javascript">
		//全局变量
		var basePath = "${basePath}";
		var gl_companyId = "${companyId}";

    </script>
</head>
<body>
<div style="position: absolute;top:0px;left:0px;width: 100%;height: 100%;z-index: 9999999;" id="loadingDiv">
    <div style="position: absolute;top:50%;left:50%;margin-left: -64px;margin-top: -64px;width:128px;height:128px;background-image: url(${basePath}/images/loading.gif);"></div>
</div>
<div class="container-fiuled" style="padding-top: 70px;">

    <div class="row gridBody">
        <div class="col-md-12">
            <!-- /S 表体 -->
            <div class="jqGrid_wrapper">
                <table id="dataGrid"></table>
                <div id="jqGridPager"></div>
            </div>
        </div>
    </div>
    <div class="row gridDetail">
        <div class="col-md-12">
            <!-- /S 表体 -->
            <div class="form-inline clearfix" style="line-height: 32px">
                <label style="float: left">单据明细 <span class="editable">（蓝色部分可操作）</span></label>
                <div class="form-group col-sm-3">

                    <label class='width-25'>
                        <div class="input-group" style="color: red;">
                            *
                        </div>
                        入库仓库:
                    </label>
                    <div class="input-group col-sm-8">
                        <input type="text" class="form-control" id="storageName">
                    </div>
                </div>
                <div class="fl ml15 storageBox" style="display: none;color: #34a4ff;">已操作 <span class="storageLen"></span>个仓库</div>
                <button type="button" class="btn btn-primary ml15 fl" onclick="sendDataToParentPage(1)">保存并切换仓库</button>
                <button type="button" class="btn btn-primary ml15 fl" onclick="sendDataToParentPage()">保存并退出</button>
                <button type="button" class="btn ml15 fl" onclick="cancleSelect()">取消</button>
                <div style="clear: both;"></div>
            </div>
            <div class="jqGrid_wrapper">
                <table id="dataGrid2"></table>
            </div>
        </div>
    </div>
</div>
<nav class="navbar navbar-default" role="navigation"
     style="padding-right:5px;position: fixed;top:0px;width: 100%;padding-top: 10px;">
    <div class="container-fluid">
        <div class="form-group" >
            <label class="col-sm-1 control-label" style="padding-right: 0px;line-height: 30px;">供应商名称:</label>
            <div class="col-sm-2" style="padding-left: 0px;padding-right: 0px;">
                <input type="text" class="form-control" name="contactsunitName" readonly="readonly">
                <input type="text" class="form-control" name="contactsunitId" style="display: none;">
            </div>
            <div class="col-sm-6" style="color: red;line-height: 33px">说明：请先选择要引入的订单，然后选择“入库仓库”，再进行入库操作</div>

        </div>
        <%--<div class="nav navbar-nav navbar-right">--%>
        <%--<button type="button" class="btn btn-primary navbar-btn" onclick="sendDataToParentPage()">保存</button>--%>
        <%--<button type="button" class="btn btn-default navbar-btn" onclick="cancleSelect()">取消</button>--%>
        <%--</div>--%>
    </div>
</nav><!-- /E 工具栏结束  -->

<div class="modal" id="storageNameModal" data-keyboard="true" data-backdrop="true">
    <div class="modal-dialog" style="width: 1000px;">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">
                    仓库选择
                </h4>
            </div>
            <div class="modal-body">
                <ul class="zTree" id="storageNameList"></ul>
            </div>
            <div class="modal-footer" style="text-align: center;">
                <button type="button" class="btn fr " data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary fr mr15" id="addCustomerBtn">保存</button>
            </div>
        </div>
    </div>
</div>

</body>
<!--加载自定义JS -->
<script type="text/javascript" charset="utf-8" src="${basePath}/js/inventoryCommonJs/gridConfig.js"></script>
<script type="text/javascript" charset="utf-8" src="${basePath}/js/inventoryCommonJs/validator.js"></script>

<script type="text/javascript" charset="utf-8" src="${basePath}/js/IorderMain/reference.js"></script>

</html>
