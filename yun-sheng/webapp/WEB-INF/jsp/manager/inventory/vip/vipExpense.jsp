<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<jsp:include page="../../inventoryInclude/head.jsp"/>
<link rel="stylesheet" href="${basePath}/css/inventory/finance/businessProcess/voucherManagement.css?v=${version}">
<script src="${basePath}/js/inventory/vip/vipExpense.js?v=${version}"></script>

<title>客户消费记录</title>
<style>
    #rpGrid tr td[aria-describedby="rpGrid_docWord"] {
        color: blue;
        cursor: pointer;
    }
    .modal .width-25 {
        width: 30%;
    }
</style>
</head>
<body>
<header>
    <div class="none" id="MENU_CODE">KHXFJL</div>
    <div id="AUTH" class="none" data-code="KHXFJL"></div>
    <form action="" class="form-inline clearfix" id="searchQuery">
        <div class="form-group col-sm-3">
            <label for="startDate" class="width-25">
                消费日期:
            </label>
            <div class="input-group col-sm-4">
                <input type="text" class="form-control" name="startDate" id="startDate" readonly
                       placeholder="请选择开始日期">
            </div>
            --
            <div class="input-group col-sm-4">
                <input type="text" class="form-control" name="endDate" id="endDate" readonly
                       placeholder="请选择结束日期">
            </div>
        </div>

        <div class="form-group col-sm-3">
            <label for="sectionIds" class="width-25">消费门店:</label>
            <div class="input-group col-sm-8">
                <input type="text" class="form-control" id="sectionIds" placeholder="请选择门店">
            </div>
        </div>

        <div class="form-group col-sm-3">
            <label for="goodsType" class='width-25'>商品类别:</label>
            <div class="input-group col-sm-8">
                <input type="text" class="form-control" id="goodsType" placeholder="请选择商品类别">
            </div>
        </div>

        <div class="form-group col-sm-3">
            <label for="goodsNames" class='width-25'>商品名称:</label>
            <div class="input-group col-sm-8">
                <input type="text" class="form-control" id="goodsNames" placeholder="请选择商品名称">
            </div>
        </div>

        <div class="form-group col-sm-3">
            <label for="customerInfo" class='width-25'>客户信息:</label>
            <div class="input-group col-sm-8">
                <input type="text" class="form-control" name="customerInfo" id="customerInfo" placeholder="客户姓名、电话、卡号">
            </div>
        </div>

        <div class="form-group col-sm-3">
            <label for="vipType" class="width-25">会员类型:</label>
            <div class="input-group col-sm-8">
                <input type="text" class="form-control" id="vipType" placeholder="请选择业务部门">
            </div>
        </div>

        <div class="form-group col-sm-3">
            <label for="shopMan" class='width-25'>营业员:</label>
            <div class="input-group col-sm-8">
                <input type="text" class="form-control" id="shopMan" placeholder="请选择营业员">
            </div>
        </div>

        <span id="moreTermList">
            <div class="form-group col-sm-3">
                <label for="consumeType" class='width-25'>消费类型:</label>
                <div class="input-group col-sm-8">
                    <input type="text" class="form-control" id="consumeType" >
                </div>
            </div>

            <div class="form-group col-sm-3">
                <label for="seek" class='width-25'>搜索:</label>
                <div class="input-group col-sm-8">
                    <input type="text" class="form-control" id="seek" placeholder="串号、辅助串号、单据编号、备注">
                </div>
            </div>

            <div class="form-group col-sm-3">
                <label for="operatorName" class='width-25'>运营商名称:</label>
                <div class="input-group col-sm-8">
                    <input type="text" class="form-control" id="operatorName" >
                </div>
            </div>

            <div class="form-group col-sm-3">
                <label for="addServiceName" class='width-25'>增值服务名称:</label>
                <div class="input-group col-sm-8">
                    <input type="text" class="form-control" id="addServiceName" >
                </div>
            </div>

            <div class="form-group col-sm-3" style="height: 35px;"></div>

            <div class="form-group col-sm-3">
                <label for="operatorCompany" class='width-25'>运营商单位:</label>
                <div class="input-group col-sm-8">
                    <input type="text" class="form-control" id="operatorCompany" >
                </div>
            </div>

            <div class="form-group col-sm-3">
                <label for="operatorService" class='width-25'>运营商业务名称:</label>
                <div class="input-group col-sm-8">
                    <input type="text" class="form-control" id="operatorService" >
                </div>
            </div>

            <div class="form-group col-sm-3">
                <div class="checkbox" style="margin-left:20%;line-height: 34px;">
                    <label>
                        <input type="checkbox" class="isred" style="float: left;margin: 11px 5px;"> 包含已红冲单据
                    </label>
                </div>
            </div>

        </span>

        <div class="form-group col-sm-3">
            <span style="margin-left:10%;"></span>
            <button type="button" class="btn btn-primary mr15 actionBtn none B_KHXFJL_0001" id="search">查询</button>
            <button type="button" class="btn btn-default reset mr15 actionBtn" onclick='resetFun()'>重置</button>
            <%--<span class="explain">说明</span>--%>
            <%--<div class="explainBox">--%>
            <%--1、列出零售业务单据涉及到的收款结算信息</br>--%>
            <%--2、点击“单据编号”或双击行可查看单据详细信息</br>--%>
            <%--</div>--%>
        </div>
        <%--<div class="cb" ></div>--%>

        <div class="moreTerm">
            更多条件<span class="moreTermIconUp moreTermIcon"></span><span class="moreTermIconDown moreTermIcon"></span>
        </div>

    </form>

</header>

<div id="promptBox">
    <div class="checkImgBox">
        <img src="${basePath}/images/inventory/common/checkImg.png"/>
        <h2>输入条件后,点击查询吧!</h2>
    </div>
    <%--<div class="explainImgBox" style="background:url('${basePath}/images/inventory/common/explain.png') no-repeat center center;background-size:contain;">--%>
    <%--1、对零售业务涉及到的“运营商业务”数据进行汇总，并提供多种系统预置方案</br>--%>
    <%--</div>--%>

</div>

<div class="loadingImgBox none"
     style="background:url('${basePath}/images/inventory/common/loading.gif') no-repeat center center;background-size:contain;"></div>
<div class="notFounImgBox none">
    <img src="${basePath}/images/inventory/common/notFoun.png" alt="">
</div>


<div id="rpContainer">
    <div class="actionContainer" style="padding: 15px 0;margin:15px 0;height: 44px;">
        <button type="button" class="btn btnColor B_KHXFJL_0002 none" id="export">导出</button>
        <button type="button" class="btn lineSet btnColor">列设置</button>
    </div>

    <table id="rpGrid"></table>
    <div id="rpGridPager"></div>
</div>


<div id="lineSet-modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title">列设置</h4>
            </div>
            <div class="modal-body" style="width:600px;">
                <table id='lineSetGrid'></table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default sureLineSet" data-dismiss="modal" onclick="sureLineSet()">
                    确认
                </button>
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div>
    </div>
</div>

</body>
</html>