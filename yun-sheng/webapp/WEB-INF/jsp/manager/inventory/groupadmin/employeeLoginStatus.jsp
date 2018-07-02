<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<jsp:include  page="../../inventoryInclude/head.jsp"/>
<script src="${basePath}/js/inventory/finance/common.js?v=${version}"></script>
<script src="${basePath}/js/inventory/groupadmin/employeeLoginStatus.js?v=${version}"></script>
<title>用户数管理</title>
<style type="text/css">
    body{
        background:#FAFAFA;
        font-family: "微软雅黑";
        font-size: 14px;
        line-height: 1.42857143;
        color: #333;
    }
    #searchQuery{
        padding:1%;
        padding-bottom:0;
        box-shadow: 0px 11px 10px -6px #E7EAEC;
        position:relative;

    }
    .explain{
        color:#5183F1;
        height:34px;
        line-height:34px;
        cursor: pointer;
        position: absolute;
        right: 20px;
    }
    .explain:hover + .explainBox{
        display:block;
    }
    .explainBox{
        position: absolute;
        top: 45px;
        right: 0;
        padding: 10px;
        background: #fff;
        z-index: 20;
        box-shadow: 0px 0px 4px 4px #E7EAEC;
        border-radius: 5px;
        display: none;
    }
    .explainBox:before{
        content: '';
        display: block;
        position: absolute;
        height: 20px;
        transform: rotate(45deg);
        background: #fff;
        z-index: 0;
        right: 20px;
        top: -10px;
        width: 20px;
        box-shadow: -2px -2px 2px 2px #E7EAEC;
    }

    .actionBtn{
        padding:6px 30px;
    }
    .moreTerm{
        width:100px;
        height:40px;
        right:2%;
        bottom:-30px;
        text-align:center;
        color:#5184F1;
        line-height:40px;
        background-color:#fff;
        position:absolute;
        box-shadow: 0px 11px 10px -6px #E7EAEC;
        cursor: pointer;
        z-index:4;
    }
    #moreTermList{
        display:none;
    }
    .moreTerm:before{
        content:'';
        display:block;
        width:8px;
        height:40px;
        position:absolute;
        transform:skewX(-10deg);
        background:#fff;
        top:0;
        right:-4px;
    }
    .moreTerm:after{
        content:'';
        display:block;
        width:8px;
        height:40px;
        position:absolute;
        transform:skewX(10deg);
        background:#fff;
        left:-4px;
        top:0;
    }
    .moreTermIconUp{
        content:'';
        height:0;
        width:0;
        display:none;
        float: right;
        margin: 10px 10px 0 0;
        border:7px solid #5184F1;
        border-color:transparent transparent #5184F1 transparent;
    }
    .moreTermIconDown{
        content:'';
        height:0;
        width:0;
        float: right;
        margin: 15px 10px 0 0;
        border:7px solid #5184F1;
        border-color:#5184F1 transparent transparent transparent;
    }
    .ifInvalid,.ifContainsDisable{
        float:left;
        margin:11px 5px;
    }
    .checkImgBox{
        margin: 8% auto 0;
        width: 350px;
        text-align: center;
        font-size:30px;
    }

    .checkImgBox h2{
        margin-top:20px;
        color:#CDCDCD;
    }

    .explainImgBox{
        width:1000px;
        height:300px;
        margin:0 auto;
        padding: 100px;
        font-size: 20px;
    }
    .loadingImgBox{
        width:1000px;
        height:300px;
        position:absolute;
        left:0;
        right:0;
        top:35%;
        margin:0 auto;
    }
    .notFounImgBox{
        width:1000px;
        height:300px;
        position:absolute;
        left:0;
        right:0;
        top:30%;
        margin:0 auto;
    }
    .notFounImgBox:after{
        content:'查询无结果,请重新选择查询条件';
        display: block;
        position: absolute;
        bottom: -120px;
        height: 100px;
        width: 100%;
        text-align: center;
        font-size: 28px;
        color: #cdcdcd;

    }
    #rpContainer,#rpSubContainer{
        position:relative;
        padding:20px;
        box-sizing:border-box;
        display:none;
    }
    .gridTitle,.gridSubTitle{
        font-size:24px;
        text-align:center;
        margin:15px 0 ;
    }
    .sortType{
        font-size:20px;
        color:#BFBFBF;
    }
    .funBtnBox{
        position: absolute;
        margin: 15px 20px;
    }
    .iconBox{
        width: 30px;
        height: 20px;
        float: left;
    }
    .billsCodeStyle{
        color: blue;
        cursor: pointer;
    }

    #order-details-modal .order-title-wrap{
        background-color:#F5F6F7;
    }
    #order-details-modal .order-title-wrap .order-title{
        font-size:22px;
        font-weight: 600;
    }

    .showModalBtn .glyphicon,
    .showComboBox .glyphicon{
        color: #5184f0;
    }

    .btn-default {
        background-color: #fff;
    }

    .input-group-btn.showBox button:hover {
        background-color: #0099ff;
    }

    .showModalBtn .btn-default:hover .glyphicon,
    .showComboBox .btn-default:hover .glyphicon{
        color: #fff;
    }
</style>
</head>
<body>
<header>
    <div id="AUTH" data-code="KMMX" class="btnbox clearfix btn-group none">
    </div>
    <form action="" class="form-inline clearfix" id="searchQuery">
        <div class="form-group col-sm-3">
            <label class="width-25">公司名称:</label>
            <div class="input-group col-sm-8">
                <input type="text" class="form-control" id="OrganizationInput">
            </div>
        </div>

        <div class="form-group col-sm-3 ">
            <label  class="width-25">操作员:</label>
            <div class="input-group col-sm-8">
                <input type="text"  class="form-control" name="managerUname" id="managerUname" readonly="readonly" >
                <input type="hidden"  name="managersUid" id="managersUid" >
            </div>
        </div>

        <div class="form-group col-sm-3">
            <label class="width-25">当前状态:</label>
            <select id="status" class="form-control" >
                <option value="0">在线</option>
                <option value="1">离线</option>
                <option value="0,1">所有</option>
            </select>
        </div>

        <div class="form-group col-sm-3">
            <div class="form-group col-sm-9">
                <span style=""></span>
                <button type="button" class="btn btn-primary mr15 actionBtn" id="search">查询</button>
                <button type="button" class="btn btn-default reset mr15 actionBtn"  id="resetForm" >重置</button>
                <span class="explain">说明</span>
                <div class="explainBox ">
                    1、记录操作员当前是否通过浏览器正在访问系统</br>
                    2、默认显示正在通过浏览器访问系统的用户</br>
                    3、可对正在通过浏览器访问系统的用户做“强制退出”
                </div>
            </div>
        </div>

    </form>

</header>

<div id="promptBox" class="none">
    <div class="checkImgBox ">
        <img src="${basePath}/images/inventory/common/checkImg.png"/>
        <h2 >输入条件后,点击查询吧!</h2>
    </div>
    <div class="explainImgBox" style="background:url('${basePath}/images/inventory/common/explain.png') no-repeat center center;background-size:contain;"></div>

</div>

<div class="loadingImgBox none" style="background:url('${basePath}/images/inventory/common/loading.gif') no-repeat center center;background-size:contain;"></div>
<div class="notFounImgBox none" style="background:url('${basePath}/images/inventory/common/notFoun.png') no-repeat center center;background-size:contain;"></div>


<div id="rpContainer">
    <div id="rpContainerTop">
        <div class='gridTitle'>用户数管理</div>
        <div style="padding: 5px;font-size: 15px;">
            购买用户数：<span id="allNum" style="margin-right: 20px"></span>
            当前在线人数：<span id="currentNum"></span>
        </div>
    </div>

    <table id="rpGrid" class="jqgrid-table"></table>
    <div id="rpGridPager"></div>
</div>


</body>
<jsp:include  page="../../inventoryInclude/foot.jsp"/>