<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<jsp:include page="../../inventoryInclude/head.jsp"/>
<link rel="stylesheet" type="text/css" href="${basePath}/css/market/public.css?v=${version}" />
<script src="${basePath}/js/jquery-form.js?v=${version}" type="text/javascript" charset="utf-8"></script>
<title>短信模版设置</title>
<script src="${basePath}/js/inventory/sms/templateSet.js?v=${version}"></script>
<script src="${basePath}/js/inventory/sms/systemCom.js?v=${version}"></script>
</head>
<style>
    #saveOrUpdateModal input, #saveOrUpdateModal select {
        height: 34px;
        border: 1px solid #cfcfcf;
        vertical-align: middle;
    }

</style>

<body style="padding:0 10px">
<!-------------------------------------主页面开始----------------------------------------->
<div class="well" style="padding:5px ">
    <div class="btn-toolbar"  role="toolbar">
        <div class="btn-group-left">
            <button type="button" data-key="draftSave" class="btn e-btn e-btn-left" onclick="modalUpdate(2)">
                <span class="iconfont icon-bianji"></span>修改
            </button>
        </div>
    </div>
    <!-------------------------------------搜索条件开始----------------------------------------->
    <form id="inquire_option">
        <div class="inputbox container-fluid clearfix">
            <div class="row">
                <div class="form-group col-sm-3">
                    <label for="" class="control-label col-sm-3" style="padding-top: 7px">触发类型:</label>
                    <div class="input-group col-sm-8" >
                        <select id="touchTypes" class="form-control">
                            <option value="">所有</option>
                            <option value="0">业务触发</option>
                            <option value="1">定时触发</option>
                        </select>
                    </div>
                </div>
                <div class="form-group col-sm-4" >
                    <span class="box_text2">关键字：</span><div class="col-sm-8">
                    <div class="input-group" style="width:80%">
                        <input type="text" id="queryText" name="queryText" class="form-control2"  placeholder="按模板标题、模板内容查询"  />
                    </div></div>
                </div>
                <div class=" form-group  col-sm-3">
                    <button type="button" class="erp-btn-bg" onclick="querySms()">查询</button>
                    <button type="button" class="erp-btn-lab" onclick="resetFun()">重置</button>
                </div>
            </div>
        </div>
    </form>

</div>
<!-------------------------------------表格开始----------------------------------------->
<div class="tablebox retailDetailTable">
    <div class="grid-wrap" style="margin-top:10px">
        <table id="jqGrid_blocMessage" class="zxsaastable">
        </table>
        <div id="jqGridPager"></div>
    </div>
</div>
<!-------------------------------------表格结束----------------------------------------->

<!-- 模态框（Modal） -->
<div class="modal fade" id="saveOrUpdateModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content" style="width:850px">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    &times;
                </button>
                <h4 class="modal-title" id="myModalLabel">
                    新增模板
                </h4>
            </div>
            <div class="modal-body" id="model-body">
                <div class="showTab">
                    <div class="current change">
                        <form id="saveOrUpdateForm"  class="form-horizontal clearfix">
                            <input type="hidden" id="id" name="id"/>
                            <div class="row">
                                <div class="col-sm-8">
                                    <div class="form-group">
                                        <label for="" class="control-label col-sm-3" ><i style="color: red">*</i>&nbsp;模板编码:</label>
                                        <div class="input-group col-sm-8" >
                                            <input type="text" id="tempateCode" name="tempateCode" onkeyup="value=value.replace(/[^\d]/g,'')"  class="form-control"/>
                                            <span style='color:red;'></span>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="" class="control-label col-sm-3" ><i style="color: red">*</i>&nbsp;模板标题:</label>
                                        <div class="input-group col-sm-8" >
                                            <input type="text" id="tempateTitle" name="tempateTitle"  class="form-control"/>
                                            <span style='color:red;'></span>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="" class="control-label col-sm-3" ><i style="color: red">*</i>&nbsp;模板内容:</label>
                                        <div class="input-group col-sm-8" >
                                            <textarea class="form-control" rows="3" id="tempateContent"></textarea>
                                            <span style='color:red;'></span>
                                        </div>
                                    </div>
                                    <div class="form-group ">
                                        <label for="" class="control-label col-sm-3" ><i style="color: red">*</i>&nbsp;是否触发:</label>
                                        <div class="input-group col-sm-8">
                                            <div class="radio col-sm-4">
                                                <label>
                                                    <input type="radio" name="ifTouch" id="ifTouch1" value="1" style="position:absolute;top:-3px" checked>
                                                    是
                                                </label>
                                            </div>
                                            <div class="radio  col-sm-4">
                                                <label>
                                                    <input type="radio" name="ifTouch" id="ifTouch2" value="0" style="position:absolute;top:-3px">
                                                    否
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group cf none">
                                        <label for="" class="control-label col-sm-3" ><i style="color: red">*</i>&nbsp;触发类型:</label>
                                        <div class="input-group col-sm-8" >
                                            <div class="radio col-sm-4">
                                                <label>
                                                    <input type="radio" name="touchType" id="touchType1" style="position:absolute;top:-3px" value="0" checked>
                                                    业务触发
                                                </label>
                                            </div>
                                            <div class="radio  col-sm-4">
                                                <label>
                                                    <input type="radio" name="touchType" id="touchType2" value="1" style="position:absolute;top:-3px">
                                                    定时触发
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group gn none">
                                        <label for="" class="control-label col-sm-3" ><i style="color: red">*</i>&nbsp;功能节点:</label>
                                        <div class="input-group col-sm-8" >
                                            <select id="funNode" class="form-control">

                                            </select>
                                            <span style='color:red;'></span>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label for="" class="control-label col-sm-3" >备注:</label>
                                        <div class="input-group col-sm-8" >
                                            <input type="text" id="remark" name="remark" onkeyup='checkInput.clearNoText(this,100);'  class="form-control"/>
                                            <span style='color:red;'></span>
                                        </div>
                                    </div>

                                </div>
                                <div class="col-sm-4">
                                    <h5 style="font-weight: bold">字段选择</h5>
                                    <div class="left_tree">
                                        <ul id="TreeDom" class="ztree"></ul>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <span class="checkMsg"></span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-info" onclick="saveAndClose();">确定</button>
                <button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<!-------------------------------------主页面结束----------------------------------------->
<jsp:include page="../../inventoryInclude/foot.jsp"/>

