<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<jsp:include page="../../inventoryInclude/head.jsp"/>
<link rel="stylesheet" type="text/css" href="${basePath}/css/market/public.css?v=${version}" />
<link rel="stylesheet" type="text/css" href="${basePath}/css/begin_period/common_beginPeriod.css?v=${version}"/>
<script src="${basePath}/js/jquery.datetimepicker.js?v=${version}"></script>
<script src="${basePath}/js/ajaxfileupload.js?v=${version}"></script>
<script src="${basePath}/js/jquery-form.js?v=${version}" type="text/javascript" charset="utf-8"></script>
<title>短信发送</title>
<script src="${basePath}/js/inventory/sms/sendSms.js?v=${version}"></script>
<script src="${basePath}/js/inventory/sms/systemCom.js?v=${version}"></script>
</head>
<style>
    #searchCenter{
        box-shadow: 0px 11px 10px -6px #E7EAEC;
        position: relative;
        padding-left: 40px;
        padding-right: 40px;
    }
.remaining{
    color:green;
    padding:20px 30px;
}
</style>

<body  class='e-body-bg'>
<!-------------------------------------主页面开始----------------------------------------->
<div class="none" id="AUTH" role="toolbar" data-code='DXFS'></div>
<h4 style="font-weight: bold;padding:10px 30px;">历史发送模版</h4>
<div  class="" id="searchCenter">
    <div class="row">
    <div class="form-group col-sm-6" >
        <label class="box_text2">关键字：</label>
        <div class="col-sm-8">
        <div class="input-group" style="width:80%">
            <input type="text" id="queryText" name="queryText" class="form-control2"  placeholder="按标题、内容查询"  />
        </div>
        </div>
    </div>
    </div>
    <!-------------------------------------表格开始----------------------------------------->
    <div>
            <table id="rpGrid"></table>
            <div id="jqGridPager"></div>
    </div>
    <!-------------------------------------表格结束----------------------------------------->
</div>
<form class="" id="saveOrUpdateForm">
    <input type="hidden" id="tid">
    <h4 class="remaining">
        当前短信剩余<span id="remain">xxxx</span>条
    </h4>
    <div class="row">
    <div class="col-sm-7">
    <div class="form-group">
        <label for="" class="control-label col-sm-2" ><i style="color: red">*</i>&nbsp;模板标题:</label>
        <div class="input-group col-sm-8" >
            <input type="text" id="tempateTitle" name="tempateTitle"  class="form-control" placeholder="请输入短信标题"/>
            <span style='color:red;'></span>
        </div>
    </div>
    </div>
    </div>
    <div class="row">
    <div class="col-sm-7">
    <div class="form-group">
        <label for="" class="control-label col-sm-2" ><i style="color: red">*</i>&nbsp;模板内容:</label>
        <div class="input-group col-sm-8" >
            <textarea class="form-control" rows="5" id="tempateContent" name="tempateContent" placeholder="请输入短信内容"></textarea>
            <span style='color:red;'></span>
        </div>
    </div>
    </div>
    <div class="col-sm-5">
        <h5 style="font-weight: bold">字段选择</h5>
        <div class="left_tree">
            <ul id="TreeDom" class="ztree"></ul>
        </div>
    </div>
    </div>
    <div class="row">
    <div class="col-sm-7">
        <div class="form-group">
            <label for="" class="control-label col-sm-2" ><i style="color: red">*</i>&nbsp;目标号码:</label>
            <div class="input-group col-sm-8" >
                <textarea class="form-control" rows="4" id="tagreTel" name="tagreTel" placeholder="请输入手机号码，号码之间用逗号隔开"></textarea>
                <span style='color:red;'></span>
            </div>
        </div>
    </div>
    <div class="col-sm-5">
        <div>
            <p>提示：为保证正常的行业短信能够顺利发送，避免短信群发时使用敏感词，特在此进行简单的说明。<br/>
                一、政治敏感及淫秽性违法违规类字眼。如：国家领导人姓名、涉黄信息等等；<br/>
                二、通讯业敏感类字眼。如：运营商名称、中国银联等；<br/>
                三、广告营销宣传类的敏感字眼。如：拨打、抽奖、热线、清仓、中奖等；<br/>
            </p>
        </div>
    </div>
    </div>
    <div class="row">
        <button type="button" data-key="add" class="col-sm-offset-2 btn btn-primary" id="introduction">
            引入客户号码
        </button>
        <button type="button" data-key="add" class=" btn btn-primary" id="leadTxt" style="margin:10px 20px">
            txt导入
        </button>
        <button type="button" data-key="add" class="btn btn-primary" id="leadXls">
            excel导入
        </button>
        <a id=""  href="/manager/qichu/手机号导入模板.txt" download="手机号导入模板.txt" style="margin:10px 20px">
            txt导入模板下载
        </a>
        <a href="/manager/qichu/短信发送手机号导入模版.xls"  download="短信发送手机号导入模版.xls" id="">
            excel导入模板下载
        </a>
    </div>
    <div class="row" style="margin-top:30px">
        <div class="col-sm-7">
        <div class="form-group">
           <label for="" class="control-label col-sm-2" ><i style="color: red">*</i>&nbsp;发送时间:</label>
            <div class="input-group col-sm-8" >
            <label class="control-label col-sm-3" >
                <input type="radio" name="sendTime" id="jSend" value="" checked>
                立即发送
            </label>
            <label class="control-label col-sm-2" >
                <input type="radio" name="sendTime" id="sendTime" value="">
                预约发送
            </label>
                <%--<div class="col-sm-5 input-append date form_datetime">--%>
                    <%--<input size="16" type="text" value="" readonly>--%>
                    <%--<span class="add-on"><i class="icon-th"></i></span>--%>
                <%--</div>--%>
                <div class="input-group col-sm-5" >
                <input type="text" class="form-control yuTime date-time-icon" readonly="">
                </div>
            </div>
        </div>
        </div>
    </div>
    <div class="row" style="margin-top:30px">
        <button type="button" data-key="add" class="col-sm-offset-2 btn btn-primary" id="draft">
            保存草稿
        </button>
        <button type="button" data-key="add" class=" btn btn-success"  id="submit" style="margin:10px 20px">
            提&nbsp;交
        </button>
        <button type="button" data-key="add" class="btn btn-default" id="cancel">
           取&nbsp;消
        </button>
    </div>
</form>

<!-- 模态框（Modal） -->
<div class="modal fade bs-example-modal-lg" id="saveOrUpdateModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog  modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    &times;
                </button>
                <h4 class="modal-title" id="myModalLabel">
                    客户筛选
                </h4>
            </div>
            <div class="modal-body" id="model-body">
                <form action="" class="form-inline clearfix" id="searchQuery">

                    <div class="form-group col-sm-6">
                        <label for="joinDateBegin" style="width: 77px;">
                            加入日期:
                        </label>
                        <div class="input-group col-sm-4">
                            <input type="text" class="form-control date-time-icon" name="billsBeginDateStr" id="joinDateBegin" readonly
                                   placeholder="">
                        </div>
                        --
                        <div class="input-group col-sm-4">
                            <input type="text" class="form-control date-time-icon" name="billsEndDateStr" id="joinDateEnd" readonly
                                   placeholder="">
                        </div>
                    </div>

                    <div class="form-group col-sm-6">
                        <label for="latelyConsumptionDateBegin" class="width-25">
                            最近消费期间:
                        </label>
                        <div class="input-group col-sm-4">
                            <input type="text" class="form-control date-time-icon" name="billsBeginDateStr" id="latelyConsumptionDateBegin"
                                   readonly
                                   placeholder="">
                        </div>
                        --
                        <div class="input-group col-sm-4">
                            <input type="text" class="form-control date-time-icon" name="billsEndDateStr" id="latelyConsumptionDateEnd" readonly
                                   placeholder="">
                        </div>
                    </div>

                    <div class="form-group col-sm-6">
                        <label for="scoreBegin" style="width: 77px;">积分范围:</label>
                        <div class="input-group col-sm-4">
                            <input type="text" class="form-control" name="billsBeginDateStr" id="scoreBegin"
                                   onkeyup="this.value=this.value.replace(/\D/g,'')">
                        </div>
                        --
                        <div class="input-group col-sm-4">
                            <input type="text" class="form-control" name="billsEndDateStr" id="scoreEnd"
                                   onkeyup="this.value=this.value.replace(/\D/g,'')">
                        </div>
                    </div>

                    <div class="form-group col-sm-6">
                        <label for="birthDateBegin" class="width-25">生日范围:</label>
                        <div class="input-group col-sm-4">
                            <input type="text" class="form-control" name="billsBeginDateStr" id="birthDateBegin"
                                   placeholder="01-01" onkeyup="getday(this)" />
                        </div>
                        --
                        <div class="input-group col-sm-4">
                            <input type="text" class="form-control" name="billsEndDateStr" id="birthDateEnd"
                                   placeholder="12-31" onkeyup="getday(this)" />
                        </div>
                    </div>

                    <div class="form-group col-sm-6">
                        <label for="vipInfo" class='width-25'>客户信息:</label>
                        <div class="input-group col-sm-8">
                            <input type="text" class="form-control" id="vipInfo" placeholder="客户姓名,电话,卡号">
                        </div>
                    </div>

                    <div class="form-group col-sm-6">
                        <span style="margin-left:10%;"></span>
                        <button type="button" class="btn btn-primary mr15 actionBtn" id="search">查询</button>
                        <button type="button" class="btn btn-default reset mr15 actionBtn" id="resetSj">重置</button>
                    </div>

                </form>
                <%--表格--%>
                <div id="rpContainer">
                    <div class="actionContainer" style="padding: 15px 0;margin:15px 0;height: 44px;">
                        <button type="button" class="btn lineSet B_KHWH_0012 none">列设置</button>
                    </div>

                    <table id="rpGridHY"></table>
                    <div id="rpGridPager"></div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-info targetNum">确定</button>
                <button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>

<%--列设置--%>
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
                <button type="button" class="btn btn-default sureLineSet" data-dismiss="modal" >
                    确认
                </button>
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div>
    </div>
</div>

<!-- 导入模态框（Modal） -->
<div class="modal fade" id="into" tabindex="-1" role="dialog" aria-labelledby="intoModalLabel" aria-hidden="true">
    <div class="modal-dialog modalNine">
        <div class="modal-content " style=" width: 883px;">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    &times;
                </button>
                <h4 class="modal-title" id="intoModalLabel">
                    导入
                </h4>
            </div>
            <div class="modal-body">
                <p><span>上传文件:</span>
                    <input type="text" name=""  value="" class="des_file" />
                    <span class="file_container">上传<input type="file" id="file" name="file" class="file_ipt"/></span>
                    <span>(请按下载模板格式导入)</span>
                </p>

            </div>
            <div class="modal-footer">
                <a  class="btn btn-w btn-info lead_model" title="" data-dismiss="modal" >导入</a>
                <button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
            </div>

        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<!-------------------------------------主页面结束----------------------------------------->
<jsp:include page="../../inventoryInclude/foot.jsp"/>

