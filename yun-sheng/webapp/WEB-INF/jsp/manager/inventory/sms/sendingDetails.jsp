<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<jsp:include page="../../inventoryInclude/head.jsp"/>
<link rel="stylesheet" type="text/css" href="${basePath}/css/market/public.css?v=${version}" />
<link rel="stylesheet" type="text/css" href="${basePath}/js/jquery-easyui/themes/bootstrap/easyui.css?v=${version}">
<script type="text/javascript" src="${basePath}/js/jquery-easyui/jquery.easyui.min.js?v=${version}"></script>
<script src="${basePath}/js/jquery-form.js?v=${version}" type="text/javascript" charset="utf-8"></script>
<title>短信发送明细</title>
<script src="${basePath}/js/inventory/sms/sendingDetails.js?v=${version}"></script>
</head>
<style>
    #saveOrUpdateModal input, #saveOrUpdateModal select {
        height: 34px;
        border: 1px solid #cfcfcf;
        vertical-align: middle;
    }

</style>

<body class="e-body-bg">
<!-------------------------------------主页面开始----------------------------------------->
    <!-------------------------------------搜索条件开始----------------------------------------->
    <div class="none" id="AUTH" role="toolbar" data-code='DXFSMX'></div>

    <form action="" class="form-inline clearfix" id="searchQuery">
        <input type="hidden"  name="taskNum" id="taskNum">
        <!--单据类型-->
        <div class="form-group col-sm-3">
            <label class="width-25">提交日期:</label>
            <div class="input-group col-sm-4">
                <input type="text" class="form-control" name="billsBeginDateStr" id="startDate">
            </div>
            --
            <div class="input-group col-sm-4">
                <input type="text" class="form-control" name="billsEndDateStr" id="endDate">
            </div>
        </div>

        <div class="col-md-3 form-group ">
            <label class="width-25">部门名称:</label>
            <div class="input-group col-sm-8">
                <input type="text" class="form-control" id="sectionName"  id="sectionName">
            </div>
        </div>

        <div class="col-md-3 form-group ">
            <label class="width-25">提交人:</label>
            <div class="input-group col-sm-8">
                <input type="text" class="form-control"  name="managerUname" id="managerUname" placeholder=""
                       readonly="readonly"/>
            </div>
        </div>

        <%--<div class="col-md-3 form-group ">--%>
            <%--<label class="width-25">短信类型:</label>--%>
            <%--<div class="input-group col-sm-8">--%>
                <%--<select id="funNode" class="form-control">--%>
                    <%--<option value="">请选择</option>--%>
                <%--</select>--%>
            <%--</div>--%>
        <%--</div>--%>


        <div class="col-md-3 form-group ">
            <label class="width-25">提交状态:</label>
            <div class="input-group col-sm-8">
                <select id="sendStatus" class="form-control easyui-combotree" style="height: 34px;">
                </select>
            </div>
        </div>

        <div class="col-md-3 form-group ">
            <label class="width-25">发送状态:</label>
            <div class="input-group col-sm-8">
                <select id="sendNode" class="form-control">
                    <option value="">请选择状态</option>
                    <option value="DELIVRD">状态成功</option>
                    <option value="UNDELIV">状态失败</option>
                    <option value="EXPIRED">用户长时间关机或者不在服务区</option>
                </select>
            </div>
        </div>

        <div class="col-md-3 form-group ">
            <label class="width-25">关键字:</label>
            <div class="input-group col-sm-8">
                <input type="text" class="form-control" name="queryKey"  id="queryKey" placeholder="按标题、内容、失败原因模糊查询">
            </div>
        </div>

        <div class="form-group col-sm-3">
            <button type="button" class="col-sm-offset-3 erp-btn-bg" id="search">查询</button>
            <button type="button" class="erp-btn-lab" onclick="resetFun()">重置</button>
        </div>

    </form>

<!-------------------------------------表格开始----------------------------------------->
<div class="tablebox retailDetailTable" style="margin-top:20px">
    <div class="btn-toolbar" id="GridTool" role="toolbar" data-code="CXDXFSMX"></div>
    <div class="grid-wrap" style="margin-top:10px">
        <table id="jqGrid_blocMessage" class="zxsaastable">
        </table>
        <div id="jqGridPager"></div>
    </div>
</div>
<!-------------------------------------表格结束----------------------------------------->
<!-- 模态框（Modal） -->
<div class="modal" id="saveOrUpdateModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content" style="width:850px">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    &times;
                </button>
                <h4 class="modal-title" id="myModalLabel">
                    短信发送详情
                </h4>
            </div>
            <div class="modal-body" id="model-body">
                <div class="showTab">
                    <div class="current change">
                        <form id="saveOrUpdateForm"  class="form-horizontal clearfix">
                            <div class="row">
                                <div class="form-group">
                                    <label for="" class="control-label col-sm-2" ><i style="color: red">*</i>&nbsp;短信标题:</label>
                                    <div class="input-group col-sm-8" >
                                        <input type="text" id="tempateTitle" name="tempateTitle"  class="form-control" readonly/>
                                        <span style='color:red;'></span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                    <div class="form-group">
                                        <label for="" class="control-label col-sm-2" ><i style="color: red">*</i>&nbsp;短信内容:</label>
                                        <div class="input-group col-sm-8" >
                                            <textarea class="form-control" rows="5" id="tempateContent" name="tempateContent" readonly></textarea>
                                            <span style='color:red;'></span>
                                        </div>
                                    </div>
                            </div>
                            <div class="row">
                                <div class="form-group">
                                    <label for="" class="control-label col-sm-2" ><i style="color: red">*</i>&nbsp;目标号码:</label>
                                    <div class="input-group col-sm-8" >
                                        <textarea class="form-control" rows="4" id="tagreTel" name="tagreTel" readonly></textarea>
                                        <span style='color:red;'></span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div  class="form-group">
                                    <label for="" class=" col-sm-2" >&nbsp;&nbsp;提示:</label>
                                    <div class="input-group col-sm-8" >
                                    <p>为保证正常的行业短信能够顺利发送,避免短信群发时使用敏感词,特在此进行简单的说明。<br/>
                                        一、政治敏感及淫秽性违法违规类字眼。如：国家领导人姓名、涉黄信息等等；<br/>
                                        二、通讯业敏感类字眼。如：运营商名称、中国银联等；<br/>
                                        三、广告营销宣传类的敏感字眼。如：拨打、抽奖、热线、清仓、中奖等；<br/>
                                    </p>
                                    </div>
                                </div>
                            </div>

                        </form>
                        <span class="checkMsg"></span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<!-------------------------------------主页面结束----------------------------------------->
<jsp:include page="../../inventoryInclude/foot.jsp"/>

