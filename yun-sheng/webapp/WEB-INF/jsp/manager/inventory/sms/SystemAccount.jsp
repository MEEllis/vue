<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<jsp:include page="../../inventoryInclude/head.jsp"/>
    <link rel="stylesheet" type="text/css" href="${basePath}/css/market/public.css?v=${version}" />
     <script src="${basePath}/js/jquery-form.js?v=${version}" type="text/javascript" charset="utf-8"></script>
    <title>系统短信账号</title>
<script src="${basePath}/js/inventory/sms/SystemAccount.js?v=${version}"></script>
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
        <button type="button" data-key="add" class="btn e-btn e-btn-left" onclick="modalUpdate(1)">
            <span class="iconfont icon-xinzeng"></span>新增账号
        </button>
        <button type="button" data-key="draftSave" class="btn e-btn e-btn-left" onclick="modalUpdate(2)">
            <span class="iconfont icon-bianji"></span>修改
        </button>
         <button type="button" data-key="check" class="btn e-btn e-btn-left" onclick="topUp()">
             <span class="iconfont icon-chongzhi"></span>充值
         </button>
        <button type="button" data-key="draftDel" class="btn e-btn e-btn-left" onclick="disOrEnAccount(2)">
            <span class="iconfont icon-shanchu"></span>删除
        </button>
        <button type="button" data-key="mandatory" class="btn e-btn e-btn-left" onclick="disOrEnAccount(0)">
          <span class="iconfont icon-qiyong"></span>启用
        </button>
        <button type="button" data-key="print" class="btn e-btn e-btn-left" onclick="disOrEnAccount(1)">
            <span class="iconfont icon-tingyong"></span>禁用
        </button>
        </div>
    </div>
    <!-------------------------------------搜索条件开始----------------------------------------->
    <form id="inquire_option">
        <div class="inputbox container-fluid clearfix">
            <div class="row">
                <div class="form-group col-sm-6" >
                    <span class="box_text2">关键字：</span><div class="col-sm-8">
                    <div class="input-group"><input type="text" id="queryText" name="queryText" class="form-control2"  placeholder="按关联集团、短信账号、备注模糊过滤"  /></div></div>
                </div>
                <div class=" form-group col-sm-2">
                    <label>显示禁用：
                        <input type="checkbox" id="selStatus" name="selStatus" class="double">
                    </label>
                </div>
                <div class=" form-group  col-sm-4">
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
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    &times;
                </button>
                <h4 class="modal-title" id="myModalLabel">
                   新增账号
                </h4>
            </div>
            <div class="modal-body" id="model-body">
                <div class="showTab">
                    <div class="current change">
                        <form id="saveOrUpdateForm"  class="form-horizontal clearfix">
                            <input type="hidden" id="id" name="id"/>
                                <div class="form-group">
                                    <label for="" class="control-label col-sm-3" ><i style="color: red">*</i>&nbsp;关联集团:</label>
                                    <div class="input-group col-sm-8">
                                        <input type="text" class="form-control" name="groupId" id="groupId" style="display: none;">
                                        <input type="text" class="form-control" name="groupName" id="groupName">
                                        <span style='color:red;'></span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="control-label col-sm-3" ><i style="color: red">*</i>&nbsp;短信账号:</label>
                                    <div class="input-group col-sm-8" >
                                        <input type="text" id="accountCode" name="accountCode"  class="form-control"/>
                                        <span style='color:red;'></span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-sm-3" ><i style="color: red">*</i>&nbsp;密码:</label>
                                    <div class="input-group col-sm-8" >
                                        <input type="text" id="accountPassword" name="accountPassword" onkeyup='checkInput.checkStrNum(this,32);'  class="form-control"/>
                                        <span style='color:red;'></span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="control-label col-sm-3" ><i style="color: red">*</i>&nbsp;初始条数:</label>
                                    <div class="input-group col-sm-8" >
                                        <input type="text" id="msgNumber" name="msgNumber" onkeyup="value=value.replace(/[^\d]/g,'')"  class="form-control"/>
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
                                <%--<div class="form-group">--%>
                                    <%--<label for="" class="control-label col-sm-3" ><i style="color: red">*</i>&nbsp;短信签名:</label>--%>
                                    <%--<div class="input-group col-sm-8" >--%>
                                        <%--<input type="text" id="accountName" name="accountName" onblur='checkInput.clearNoText(this,100);'  class="form-control" style="width:70%"/>--%>
                                        <%--<span style='color:red;'></span>--%>
                                        <%--<button type="button" class="btn btn-primary" onclick="addRow();" style="margin-left: 10px">新增签名</button>--%>
                                    <%--</div>--%>
                                <%--</div>--%>
                                <div class=row">
                                    <!-- /S 表体 -->
                                    <div class="jqGrid_wrapper" style="margin-left:15px">
                                        <table id="dataGrid"></table>
                                    </div><!-- /E 表体 -->
                                </div>

                        </form>
                        <span class="checkMsg"></span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-info" onclick="saveAndCloseTotherstorageClass();">确定</button>
                <button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<!-- 充值模态框（Modal） -->
<div class="modal fade" id="topUpModal" tabindex="-1" role="dialog" aria-labelledby="myModal" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    &times;
                </button>
                <h4 class="modal-title" id="myModal">
                   充值
                </h4>
            </div>
            <div class="modal-body">
                <div class="showTab">
                    <div class="current change">
                        <form id="topUpForm"  class="form-horizontal clearfix">
                            <%--<input type="hidden" id="id" name="id"/>--%>
                            <div class="form-group">
                                <label for="" class="control-label col-sm-3" ><i style="color: red">*</i>&nbsp;充值条数:</label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control" onkeyup="value=value.replace(/[^\d]/g,'')" name="topUpNumber" id="topUpNumber">
                                    <span style='color:red;'></span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="" class="control-label col-sm-3" ><i style="color: red">*</i>&nbsp;业务类型:</label>
                                <div class="input-group col-sm-8" >
                                    <select id="BusinessTypes" class="form-control">
                                        <option value="1">充值</option>
                                        <option value="2">充值调整</option>
                                        <option value="3">失败返回</option>
                                        <option value="4">赠送</option>
                                    </select>
                                    <span style='color:red;'></span>
                                </div>
                            </div>
                                <div class="form-group">
                                    <label for="" class="control-label col-sm-3" >备注:</label>
                                    <div class="input-group col-sm-8" >
                                        <input type="text" name="remark" id="remarkc" onkeyup='checkInput.clearNoText(this,100);'  class="form-control"/>
                                        <span style='color:red;'></span>
                                    </div>
                                </div>
                        </form>
                        <span class="checkMsg"></span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-info" onclick="topUpSave()">确定</button>
                <button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<!-- 签名列表模态框（Modal） -->
<div id="signatureModal" class="modal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">签名列表</h4>
            </div>
            <div class="modal-body">
                <h4 class="currentGoods"></h4>
                    <table id='signatureGrid'></table>
                     <div id="signaturePager"></div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal" id="giveSet">关闭</button>
            </div>
        </div>
    </div>
</div>
<!-- 充值记录模态框（Modal） -->
<div id="recordModal" class="modal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">充值记录</h4>
            </div>
            <div class="modal-body">
                <table id='recordGrid'></table>
                <div id="recordPager"></div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div>
    </div>
</div>
<!-------------------------------------主页面结束----------------------------------------->
<jsp:include page="../../inventoryInclude/foot.jsp"/>

